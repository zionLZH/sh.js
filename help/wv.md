# wv 窗口管理

## *Null* wv.open(*String* path, *Object* extras)
说明：根据 path 创建或跳转到指定路径，当 extras 存在时同步传递附加数据（*注：当runtime 为 RUNTIME_WEB 时为跳转到该 path，则当前页面的数据将消失！即等同于loaction.herf = path*。）

*String* path

*Object* extras <Object/Null>

##### 示例代码
```
sh.wv.open('/news/info.html',{
  id: '000000'
});
```

## *Null* wv.switch(*String* path) *[RUNTIME_WXAPP]*

*String* path

说明：根据 path 切换底部导航栏 (*注：需要环境 RUNTIME_WXAPP*)

##### 示例代码
```
sh.wv.switch('/tab/index');
```
## *WebviewObject* wv.find(*String* path) *[RUNTIME_PLUS]*

*String* path

说明：根据 path 查找对应webview，找到返回对应webview，找不到返回null （*注：需要环境 RUNTIME_PLUS *）
##### 示例代码
```
var wv = sh.wv.find('/news/info.html')
if(!wv){
  console.log('/news/info.html is not found')
  return false;
}
```

## *Null* wv.close()
说明：关闭当前webview/page,RUNTIME_WEB状态下为后退页面。
##### 示例代码
```
sh.wv.close()
```

## *Object* wv.extras()
说明：取出 wv.open 中传递的extras，通过 . 操作符获取对应数据 （*注： RUNTIME_WXAPP 下无法获取，需要在生命周期函数onload中自行获取*）
##### 示例代码
```
sh.wv.open('/news/info.html',{
  id: '000000'
});
// now on /news/info.html
var newId = sh.wv.extras().id
console.log(newId)
// newId -> '000000'
```
