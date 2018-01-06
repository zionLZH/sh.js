# 基础方法

#### *Null* extend(*String* name, *Function* constructor)
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
  
  
#### *Null* root(*String* name, *Function* func)
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








