#  README

## Table of contents

### Basic

1. Basic

### Class

1. Class
2. Method
3. Encapsulate
4. ClassMethod
5. Self
6. Inheritance
7. Super
8. Polymorphism

## Note

随着自动引用计数（ARC, Automatic Reference Counting）的引入和新版 Objective-C 的发展，一些旧的内存管理语法和技术已经逐渐被淘汰或不再推荐使用。以下是一些已经不怎么使用的语法和技术：

### 1. 手动内存管理
在 ARC 之前，开发者需要手动管理对象的内存，包括使用 `retain`、`release` 和 `autorelease` 方法。ARC 自动处理这些操作，因此这些方法已经不再需要或推荐使用。

**旧语法：**
```objective-c
MyObject *obj = [[MyObject alloc] init];
[obj retain];
// 使用 obj
[obj release];
```

**新语法（ARC）：**
```objective-c
MyObject *obj = [[MyObject alloc] init];
// 使用 obj，ARC 会自动管理引用计数
```

### 2. `NSAutoreleasePool`
在 ARC 环境下，`@autoreleasepool` 块取代了 `NSAutoreleasePool`，使得内存管理更加简洁和现代化。

**旧语法：**
```objective-c
NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
// 代码块
[pool drain];
```

**新语法（ARC）：**
```objective-c
@autoreleasepool {
    // 代码块
}
```

### 3. 属性声明中的 `retain` 和 `assign` 关键字
在 ARC 环境下，`strong` 和 `weak` 关键字取代了 `retain` 和 `assign`，更好地表达了对象的内存管理语义。

**旧语法：**
```objective-c
@property (nonatomic, retain) NSString *name;
@property (nonatomic, assign) NSInteger age;
```

**新语法（ARC）：**
```objective-c
@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger age; // 对于基本类型，仍然使用 assign
@property (nonatomic, weak) id<Delegate> delegate;
```

### 4. `dealloc` 方法中的内存管理代码
在 ARC 环境下，不需要在 `dealloc` 方法中手动释放对象，因为 ARC 会自动处理。这意味着大部分情况下不需要重写 `dealloc` 方法，除非你需要在对象销毁时执行其他清理操作。

**旧语法：**
```objective-c
- (void)dealloc {
    [_name release];
    [_delegate release];
    [super dealloc];
}
```

**新语法（ARC）：**
```objective-c
- (void)dealloc {
    // 在这里不需要释放实例变量
    // 仅在需要时进行其他清理操作
}
```

### 5. `@synthesize` 和 `@dynamic`
ARC 引入后，编译器会自动生成属性的存取方法，通常不需要显式使用 `@synthesize`。然而，如果你需要自定义 getter 或 setter 方法，仍然可以使用它。

**旧语法：**
```objective-c
@synthesize name = _name;
```

**新语法（ARC）：**
```objective-c
// 编译器自动生成存取方法
```

### 总结

ARC 和新版 Objective-C 的引入极大地简化了内存管理，使得代码更加简洁和安全。以下是主要的变化总结：

1. **手动内存管理**：淘汰 `retain`、`release` 和 `autorelease`。
2. **自动释放池**：使用 `@autoreleasepool` 取代 `NSAutoreleasePool`。
3. **属性声明**：使用 `strong` 和 `weak` 取代 `retain` 和 `assign`。
4. **dealloc 方法**：不再需要手动释放对象。
5. **属性合成**：大多数情况下不需要显式使用 `@synthesize`。

这些变化让开发者可以更专注于逻辑实现，而不是内存管理。

