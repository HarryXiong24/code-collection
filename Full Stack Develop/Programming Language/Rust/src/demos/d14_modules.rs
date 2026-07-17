use crate::log::{note, show, title};

/// 模块与可见性 —— mod 组织代码，默认私有，pub 才导出；Cargo 管理包(crate)。
/// 要点：
///   1. mod 定义模块，可内联也可拆成文件；模块可嵌套。
///   2. 一切默认「私有」，加 pub 才对外可见 —— 和另外三门语言默认公开相反。
///   3. 用路径 a::b::c 访问；use 引入名字避免每次写全路径。
///   4. crate 是编译单元（一个库或二进制），由 Cargo.toml 定义。

// 内联模块：默认私有，pub 才导出
mod shapes {
    pub const PI: f64 = 3.14159;

    pub fn circle_area(r: f64) -> f64 {
        PI * square(r) // 同模块内可用私有函数
    }

    // 没有 pub → 模块外不可见
    fn square(x: f64) -> f64 {
        x * x
    }

    // 嵌套模块
    pub mod inner {
        pub fn hello() -> &'static str {
            "from inner"
        }
    }
}

pub fn run() {
    title("14 模块与可见性");

    note("mod 定义模块；默认私有，pub 才导出");
    show("shapes::PI", shapes::PI);
    show("shapes::circle_area(2.0)", shapes::circle_area(2.0));

    note("私有项 shapes::square 在模块外无法访问 —— 编译期挡住");

    note("嵌套模块用 :: 路径访问");
    show("shapes::inner::hello()", shapes::inner::hello());

    note("use 引入名字，之后可直接调用");
    use shapes::circle_area;
    show("use 后直接调用", circle_area(1.0));

    note("Cargo：一个 crate = 一个编译单元；src/ 下每个文件是一个模块");
}
