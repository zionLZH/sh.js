# http 网络请求

## *Null* http.get(*Object* Options)
说明：根据 Options 内配置发起Get请求，不支持JSONP，使用前需要注意以下几点：

- 普通网页需要符合同源请求
- 微信小程序中需要确定域名已经添加到安全域名中
- Plus环境可直接跨域请求
- 安卓内网页请将网页放在 assets 目录下，并且设置运行file路径跨域请求，且设置JavaScriptEnable为true，否则参考第一点。

*Object* Options

```
Options:{
  url: <String>,
  data: <Object>,
  success: <Function>,
  error: <Function>,
}
```

##### 示例代码
```
sh.http.get({
  url: 'http://127.0.0.1/login',
  data:{
    username: '',
    password: '',
  },
  success: function(data){
    console.log(data)
  },
  error: function(err){
    console.log(err)
  }
})
```

## *Null* http.post(*Object* Options)
说明：根据 Options 内配置发起Post请求，不支持JSONP，使用前需要注意以下几点：

- 普通网页需要符合同源请求
- 微信小程序中需要确定域名已经添加到安全域名中
- Plus环境可直接跨域请求
- 安卓内网页请将网页放在 assets 目录下，并且设置运行file路径跨域请求，且设置JavaScriptEnable为true，否则参考第一点。

*Object* Options
```
Options:{
  url: <String>,
  data: <Object>,
  success: <Function>,
  error: <Function>,
}
```
##### 示例代码
```
sh.http.post({
  url: 'http://127.0.0.1/login',
  data:{
    username: '',
    password: '',
  },
  success: function(data){
    console.log(data)
  },
  error: function(err){
    console.log(err)
  }
})
```


