# 类型扩展

## String
### String.format(str1, str2, str3, ...)
说明：正则String中的 %s% 并且对应替换成 format 方法传入的值
##### 示例代码
```
var str = 'Hello %s%,Hello %s%.'
console.log(
    str.format('Word', 'China')
)
// 'Hello %s%,Hello %s%.' >> 'Hello Word,Hello China'
```

