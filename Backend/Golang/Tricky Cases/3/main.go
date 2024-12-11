package main

// 在函数有多个返回值时，只要有一个返回值有命名，其他的也必须命名。如果有多个返回值必须加上括号()；如果只有一个返回值且命名也必须加上括号()。这里的第一个返回值有命名 sum，第二个没有命名，所以错误。
// func funcMui(x,y int)(sum int,error){
// 		return x+y,nil
// }

// 不能通过编译。append() 的第二个参数不能直接使用 slice，需使用 … 操作符，将一个切片追加到另一个切片上：append(s1,s2…)。或者直接跟上元素，形如：append(s1,1,2,3)。
// func demo1() {
//     s1 := []int{1, 2, 3}
//     s2 := []int{4, 5}
//     s1 = append(s1, s2)
//     fmt.Println(s1)
// }
