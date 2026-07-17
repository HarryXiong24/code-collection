use crate::log::{note, show, title};
use std::sync::mpsc;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant};

/// 并发 —— 线程 + 消息传递 + 共享状态，「无畏并发」由类型系统保证安全。
/// 要点：
///   1. thread::spawn 起系统线程，join 等待并取回返回值。
///   2. channel（mpsc）：多生产者单消费者，用「通信」传递数据的所有权。
///   3. Arc<Mutex<T>>：跨线程共享可变状态，Arc 计数共享、Mutex 互斥。
///   4. 数据竞争在编译期就被所有权/借用规则挡下，不是运行时才炸。
pub fn run() {
    title("08 并发（线程 + 消息传递）");

    note("thread::spawn + join：并发跑，等全部结束");
    let start = Instant::now();
    let handles: Vec<_> = (0..3)
        .map(|i| {
            thread::spawn(move || {
                thread::sleep(Duration::from_millis(30));
                format!("task{i}(30ms)")
            })
        })
        .collect();
    let results: Vec<String> = handles.into_iter().map(|h| h.join().unwrap()).collect();
    show("并发结果数", results.len());
    show("并发耗时≈最慢那个(ms)", start.elapsed().as_millis());

    note("channel：用通信共享数据，发送即转移所有权");
    let (tx, rx) = mpsc::channel();
    for i in 0..3 {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(i * 10).unwrap();
        });
    }
    drop(tx); // 关掉最后一个发送端，rx 迭代才会结束
    let mut got: Vec<i32> = rx.iter().collect();
    got.sort();
    show("channel 收到", &got);

    note("Arc<Mutex<T>>：安全地跨线程共享可变状态");
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..100 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut n = c.lock().unwrap();
            *n += 1; // 临界区
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    show("100 线程各 +1", *counter.lock().unwrap());

    note("无畏并发：数据竞争在编译期就被类型系统挡下");
}
