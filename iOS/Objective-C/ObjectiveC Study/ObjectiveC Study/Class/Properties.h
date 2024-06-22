//
//  Properties.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//


#ifndef Properties_h
#define Properties_h

/*
 @public : 在任何地方都能直接访问对象的成员变量
 @private : 只能在当前类的对象方法中直接访问
 @protected : 可以在当前类及其子类的对象方法中直接访问
 @package : 只要处在同一个框架中，就能直接访问对象的成员变量
 
 @interface 和 @implementaton 里都声明成员变量，但是一般是 @interface 里面声明，而且 @interface 和 @implementaton 里不能声明同名的成员变量
 @interface 中声明的成员变量默认是 @protected
 @implementation 中声明的成员变默认是 @private
*/

@interface PPerson : NSObject

{
    @public // 在任何地方都能直接访问对象成员变量
    int _age;
    
    @private // 只能在当前类的对象方法中直接访问
    int _height;
    
    @protected //能在当前类和子类的对象方法中直接访问(默认)
    int _weight;
    int _money;
}


// @Property: 可以自动生成某个成员变量的 get 和 set 声明，但是使用 @Property 声明的变量只能是 @protected 类型
/*
     在 Objective-C 中，`@property` 后面的参数（属性修饰符）用于指定属性的行为和内存管理语义。常见的属性修饰符有以下几种：

     ### 属性修饰符

     1. **原子性（Atomicity）**
         - `atomic`（默认）：确保属性访问是线程安全的。会在生成的存取方法中添加同步锁，以防止多线程竞争。
         - `nonatomic`：不保证线程安全，性能较高，因为不使用同步锁。

     2. **内存管理语义（Memory Management Semantics）**
         - `strong`：持有属性值。适用于引用计数的对象类型。`strong`修饰符表示对对象的强引用，保留该对象，直到引用计数变为零。
         - `weak`：不持有属性值。当所引用的对象被销毁时，属性值自动设置为 `nil`。适用于防止循环引用。
         - `assign`：直接赋值，不改变对象的引用计数。适用于基本数据类型（如 `int`、`float`）。
         - `copy`：创建属性值的副本。适用于字符串等不可变对象，以确保属性值的唯一性和独立性。
         - `retain`（MRC 使用）：增加属性值的引用计数。

     3. **读写权限（Read-Write Permissions）**
         - `readwrite`（默认）：生成 getter 和 setter 方法。
         - `readonly`：只生成 getter 方法，不生成 setter 方法，表示该属性是只读的。

     4. **方法命名（Method Naming）**
         - `getter=methodName`：指定 getter 方法的名称。
         - `setter=methodName`：指定 setter 方法的名称。

     ### 示例

     ```objective-c
     @interface MyClass : NSObject

     @property (nonatomic, strong) NSString *name;           // 强引用，非线程安全
     @property (nonatomic, weak) id<Delegate> delegate;      // 弱引用，非线程安全
     @property (nonatomic, assign) int age;                  // 基本类型，非线程安全
     @property (nonatomic, copy) NSString *identifier;       // 复制对象，非线程安全
     @property (atomic, readonly) NSString *info;            // 只读，线程安全
     @property (nonatomic, getter=isActive) BOOL active;     // 自定义 getter 方法名
     @property (nonatomic, setter=setCustomName:) NSString *customName; // 自定义 setter 方法名

     @end
     ```

     ### 具体解释

     1. **`@property (nonatomic, strong) NSString *name;`**
         - `nonatomic`：非线程安全。
         - `strong`：强引用，持有对象。

     2. **`@property (nonatomic, weak) id<Delegate> delegate;`**
         - `nonatomic`：非线程安全。
         - `weak`：弱引用，不持有对象，当对象被销毁时，属性值会自动设置为 `nil`。

     3. **`@property (nonatomic, assign) int age;`**
         - `nonatomic`：非线程安全。
         - `assign`：直接赋值，适用于基本数据类型。

     4. **`@property (nonatomic, copy) NSString *identifier;`**
         - `nonatomic`：非线程安全。
         - `copy`：复制对象，适用于不可变对象，确保属性值的独立性。

     5. **`@property (atomic, readonly) NSString *info;`**
         - `atomic`：线程安全。
         - `readonly`：只读，生成 getter 方法，不生成 setter 方法。

     6. **`@property (nonatomic, getter=isActive) BOOL active;`**
         - `nonatomic`：非线程安全。
         - `getter=isActive`：自定义 getter 方法名为 `isActive`。

     7. **`@property (nonatomic, setter=setCustomName:) NSString *customName;`**
         - `nonatomic`：非线程安全。
         - `setter=setCustomName:`：自定义 setter 方法名为 `setCustomName:`。

     这些修饰符帮助开发者更好地控制属性的行为、内存管理和方法命名，从而编写出更加健壮和可维护的代码。
 
 */
@property NSString* sex;

- (void)setHeight:(int)height;
- (int)height;
- (void)test;

@end

void testProperties(void);

#endif /* Properties_h */
