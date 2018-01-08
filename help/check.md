# check 数据校验

## *Boolean* check.isNoEmpty(*String/Object/Array* data)
说明：当data为 [ ]、{ }、" "、' '、纯空格，即判断为空值

*String/Object/Array* data
##### 示例代码
```
sh.check.isNoEmpty({})
// -> false
sh.check.isNoEmpty('Hello')
// -> true
```

## *Boolean* check.isMail(*String* str)
说明：判断 str 是否为一个合法邮箱

*String* str
##### 示例代码
```
sh.check.isMail('')
// -> false
sh.check.isMail('zion@igeede.com')
// -> true
```

## *Boolean* check.isPhone(*String* str)
说明：判断 str 是否为一个合法手机号

*String* str
##### 示例代码
```
sh.check.isPhone('')
// -> false
sh.check.isPhone('15815200000')
// -> true
```

## *Boolean* check.isId(*String* str)
说明：判断 str 是否为一个合法的Id，长度需大于6位，且允许邮箱作为Id

*String* str
##### 示例代码
```
sh.check.isId('')
// -> false
sh.check.isId('zion@igeede.com')
// -> true
```

## *Boolean* check.isPwd(*String* str)
说明：判断 str 是否为一个合法的密码，长度需大于6位，且允许邮箱，网址作为密码

*String* str
##### 示例代码
```
sh.check.isPwd('')
// -> false
sh.check.isPwd('zion@igeede.com')
// -> true
```

## *Boolean* check.all(*[Object]* group)
说明：根据传入的表单数组进行遍历，从而判断表单数据

*[Object]* group
```
group :
        {mail: str}
        {pwd: str}
        {id: str}
        {phone: str}
        {empty: str}
```

##### 示例代码
```
sh.check.all([
  {mail: 'zion@igeede.com'},
  {pwd: 'zion@igeede.com'},
  {id: 'zionLZH'},
  {phone: '15815200000'}
])
// -> true
```

## *Object* check.checkFrom(*String* group)
说明：根据表单组查找对应dom元素并且验证数据，RUNTIME_WXAPP下由于不支持dom查找，直接返回校验通过。

*String* group

##### DOM格式
```
<input type="text" data-check="GroupId-ItemName-DataType" />
<input type="text" data-check="表单名称-项目名称-数据类型" />
```

##### 示例Html
```
<input type="text" data-check="zion-id-id" value="zion@igeede.com"/>
<input type="text" data-check="zion-pwd-pwd" value="zion@igeede.com"/>
<input type="text" data-check="zion-pwd2-pwd" value="zion@igeede.com"/>
<input type="text" data-check="zion-mail-mail" value="zion@igeede.com"/>
```

##### 示例代码
返回格式：
ret = {status: true, key: '', value: '', data: {}}
```
var ret = sh.check.checkFrom('zion');
if(!ret.status){
  //表单校验错误，此时ret.key为项目名称，ret.value为对应值
  console.log(ret.key,ret.value)
  return;
}
//校验通过,ret.data为表单内容，可以通过 . 操作符取出内容
//如：ret.data.id、ret.data.mail、ret.data.pwd、ret.data.pwdw2、
console.log(ret.data)


```
