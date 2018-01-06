# 基础方法

## *Null* extend(*String* name, *Function* constructor)
说明：将 module 挂载到 Sh 的根部，并且可公开使用，执行方法之后 sh.js 会创建对应constructor并且传入 sh 自身以及配置对象。  
*String* name  
*Function* constructor(*Object* $, *Object* CONF)  
##### 示例代码. 
```  
sh.extend('test', function($, CONF){  
  this.hello = function(){
    console.log('Hello Word')
  }
})   
```
##### 调用方法
`sh.test.hello();`
  
  
## *Null* root(*String* name, *Function* func)
说明：将方法挂载到 sh 的根部， 并且可公开使用，执行方法之后 sh.js 会将对应function添加在 sh 根部。
*String* name
*Function* func
##### 示例代码
```
sh.root('hello', function(){
  console.log('Hello Word')
})
```
##### 调用方法
`sh.hello();`
  
  
## *Null* plus(*Function* func)
说明：此方法仅在RUNTIME_PLUS下生效，当页面plus生效时将自动调用 func 方法。
*Function* func
##### 示例代码
```
sh.plus(function(){
  plus.nativeUI.toast('Hello Word')
})
```
  
  
## *Null* err(*String* str)
说明：输出一段错误提示
*String* str
##### 示例代码
```
sh.err('Error')
```
  
  
## *Null* log(*String* str)
说明：输出一段提示
*String* str
##### 示例代码
```
sh.log('Hello Word')
```

## Object CONF{}
说明：Sh.js 配置对象，此对象会传递给每一个挂载在根部的 moudle。
CONF = {  
  runtime: <RUNTIME_WEB / RUNTIME_PLUS / RUNTIME_WXAPP>
}
##### 示例代码
````
//设置当前运行环境为web浏览器
sh.CONF.runtime = sh.RUNTIME_WEB
````







