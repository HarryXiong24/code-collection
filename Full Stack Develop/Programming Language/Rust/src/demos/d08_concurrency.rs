use crate::log::{note, show, title};
use std::sync::mpsc;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant};

/// Concurrency — threads + message passing + shared state; "fearless concurrency" made safe by the type system.
/// Key points:
///   1. thread::spawn starts an OS thread, join waits and retrieves the return value.
///   2. channel (mpsc): multi-producer single-consumer, transferring ownership of data via "communication".
///   3. Arc<Mutex<T>>: share mutable state across threads, Arc counts the sharing, Mutex provides mutual exclusion.
///   4. Data races are blocked at compile time by the ownership/borrow rules, not blown up at runtime.
pub fn run() {
    title("08 Concurrency (threads + message passing)");

    note("thread::spawn + join: run concurrently, wait for all to finish");
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
    show("number of concurrent results", results.len());
    show("concurrent time ≈ the slowest one (ms)", start.elapsed().as_millis());

    note("channel: share data via communication, sending transfers ownership");
    let (tx, rx) = mpsc::channel();
    for i in 0..3 {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(i * 10).unwrap();
        });
    }
    drop(tx); // close the last sender so the rx iteration can end
    let mut got: Vec<i32> = rx.iter().collect();
    got.sort();
    show("channel received", &got);

    note("Arc<Mutex<T>>: safely share mutable state across threads");
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..100 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut n = c.lock().unwrap();
            *n += 1; // critical section
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    show("100 threads each +1", *counter.lock().unwrap());

    note("fearless concurrency: data races are blocked by the type system at compile time");
}
