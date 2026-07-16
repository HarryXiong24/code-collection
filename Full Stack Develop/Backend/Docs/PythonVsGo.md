# Python & Go 语法对比

## Map(Dict) 的增删改查

### 创建一个 map

```go
myMap := make(map[string]int) // 创建一个空的map
```

```python
my_dict = {}
```

### 添加或更新键值对

```go
myMap["key1"] = 1 // 添加或更新键为"key1"的值为1
```

```python
my_dict['key'] = 'new_value'
```

### 获取键对应的值

```go
value := myMap["key1"] // 获取键为"key1"的值
```

```python
# 通过键获取对应的值
value = my_dict['key']

# 使用`get()`方法获取对应的值（如果键不存在，则返回默认值）
value = my_dict.get('key', default_value)
```

### 删除键值对

```go
delete(myMap, "key1") // 删除键为"key1"的键值对
```

```python
del my_dict['key']
```

### 检查键是否存在

```go
value, exists := myMap["key1"] // 检查键为"key1"的键值对是否存在，并将值赋给value，exists为true表示存在，false表示不存在
```

```python
value = my_dict['key1']

value = my_dict.get('key2', 'default_value')
```

### 遍历

```go
// 遍历map
for key, value := range m {
    fmt.Println(key, value)
}
```

```python
# 遍历字典的键
my_dict = {"a": 1, "b": 2, "c": 3}
for key in my_dict:
    print(key)

# 遍历字典的值：
my_dict = {"a": 1, "b": 2, "c": 3}
for value in my_dict.values():
    print(value)

# 遍历字典的键值对
my_dict = {"a": 1, "b": 2, "c": 3}

for key, value in my_dict.items():
    print(key, value)
```

## Set 的增删改查

### python

1. 创建一个集合：

```python
my_set = set()
```

2. 添加元素到集合：

```python
my_set.add(1)
my_set.add(2)
my_set.add(3)
```

3. 从集合中删除元素：

```python
my_set.remove(2)  # 删除元素2
my_set.discard(3)  # 删除元素3
```

4. 更新集合：

```python
my_set.update([4, 5, 6])  # 添加多个元素到集合
```

5. 查找元素是否存在于集合中：

```python
if 1 in my_set:
    print("元素1存在于集合中")
else:
    print("元素1不存在于集合中")
```

6. 遍历集合：

```python
for item in my_set:
    print(item)
```

### go

go 中没有 set 类型，使用 map 类型来模拟 set，遇到相同值的元素则不能插入

## 数据类型转换

### python

在 Python 中，可以使用以下函数进行数据类型转换：

1. int(x)：将 x 转换为整数。
2. float(x)：将 x 转换为浮点数。
3. str(x)：将 x 转换为字符串。
4. list(x)：将 x 转换为列表。
5. tuple(x)：将 x 转换为元组。
6. set(x)：将 x 转换为集合。
7. dict(x)：将 x 转换为字典。

```python
# int()：将一个数值或字符串转换为整数类型
num = int("10")
print(num)  # 输出：10

# float()：将一个数值或字符串转换为浮点数类型
num = float("3.14")
print(num)  # 输出：3.14

# str()：将一个对象转换为字符串类型
num = 10
string_num = str(num)
print(string_num)  # 输出："10"

# bool()：将一个值转换为布尔类型
bool_value = bool(1)
print(bool_value)  # 输出：True

# list()：将一个可迭代对象转换为列表类型
string = "Hello"
list_string = list(string)
print(list_string)  # 输出：['H', 'e', 'l', 'l', 'o']

# tuple()：将一个可迭代对象转换为元组类型
list_num = [1, 2, 3]
tuple_num = tuple(list_num)
print(tuple_num)  # 输出：(1, 2, 3)

# set()：将一个可迭代对象转换为集合类型
list_num = [1, 2, 2, 3, 3]
set_num = set(list_num)
print(set_num)  # 输出：{1, 2, 3}

# dict()：将一个可迭代对象转换为字典类型
list_pairs = [("name", "John"), ("age", 25)]
dict_info = dict(list_pairs)
print(dict_info)  # 输出：{'name': 'John', 'age': 25}
```

此外，还可以使用以下函数进行特定类型之间的转换：

1. ord(x)：将字符 x 转换为对应的 ASCII 值。
2. chr(x)：将 ASCII 值 x 转换为对应的字符。
3. bin(x)：将整数 x 转换为二进制字符串。
4. hex(x)：将整数 x 转换为十六进制字符串。
5. oct(x)：将整数 x 转换为八进制字符串。

### go

```go
// 将整数转换为浮点数
var num int = 10
var floatNum float64 = float64(num)

// 将浮点数转换为整数
var floatNum float64 = 10.5
var num int = int(floatNum)

// 将整数转换为字符串
var num int = 10
var str string = strconv.Itoa(num)

// 将字符串转换为整数
var str string = "10"
num, _ := strconv.Atoi(str)

// 将字符串转换为浮点数
var str string = "10.5"
floatNum, _ := strconv.ParseFloat(str, 64)

// 将布尔值转换为字符串
var b bool = true
var str string = strconv.FormatBool(b)

// 将字符串转换为布尔值
var str string = "true"
b, _ := strconv.ParseBool(str)
```
