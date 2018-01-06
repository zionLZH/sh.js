# storage 数据储存

## *Null*  storage.set(*String* key, *Json/String* value)
说明：根据 key 创建本地数据储存并且将 value 写入，此储存为持久储存，当用户执行数据清理、缓存清理、卸载应用时会被清除

*String* key

*Json/String* value
##### 示例代码
```
sh.storage.set('username', 'zion')
sh.storage.set('token', 'zion')
sh.storage.set('userData', {
  phone: '',
  photo: '',
  mark: '',
})
```

## *Json/String* storage.get(*String* key)
说明：根据 key 从本地数据储存检索数据，并且根据数据格式选择返回 Json 或 String

*String* key
##### 示例代码
```
var userData = sh.storage.get('userData')
var username = sh.storage.get('username')
// username -> 'zion'
// userData -> {phone: '', photo: '', mark: ''}
```

## *Null* storage.del(*String* key)
说明： 根据 key 从本地数据储存删除指定键值对 ( key-value )

*String* key
##### 示例代码
```
sh.storage.del('username')
var username = sh.storage.get('username')
// username -> null
```

## *Null* storage.clear(*Boolean* force)
说明：清除本地数据储存中所有键值对 ( key-value )，您需要确定此操作(force:true)

*Boolean* force <true/false>
##### 示例代码
```
sh.storage.clear(false)
sh.storage.clear()
//Fail
sh.storage.clear(true)
//Ok
```

