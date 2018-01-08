# Sh.js

Sh.js 是一款前端跨平台兼容方法库，针对多平台环境下常用的方法进行封装处理，并且予以改良，可实现一套代码，多平台过渡处理。
  
 
# 前言
Sh.js 前身是我自己封装的Autoc，由于工作需要，有时候需要一套代码实现微信公众号，H5App兼容使用，为了更好的平台过渡，我根据自己的使用封装了一款跨平台兼容方法库，其中囊括了前端开发者常用方法，由于需要参与微信小程序开发，我又对于Autoc进行重构，成为了现在的Sh.js，相对以前的Autoc来说，Sh.js一方面具备更好的兼容性，另一方面则提供更好的扩展方法。

Sh.js 全称为SmartHtml.js，通过简单的配置实现更好的平台兼容处理，从而减少开发者的工作量。

# 帮助文档
  
### 基础方法
- [extend()](https://github.com/zionLZH/sh.js/blob/master/help/base.md#null--extendstring-name-function-constructor)  
- [root()](https://github.com/zionLZH/sh.js/blob/master/help/base.md#null--rootstring-name-function-func)  
- [plus()](https://github.com/zionLZH/sh.js/blob/master/help/base.md#null--plusfunction-func)  
- [err()](https://github.com/zionLZH/sh.js/blob/master/help/base.md#null--errstring-str)  
- [log()](https://github.com/zionLZH/sh.js/blob/master/help/base.md#null--logstring-str) 
- [CONF](https://github.com/zionLZH/sh.js/blob/master/help/base.md#object--conf)  
  
### 类型扩展
- [String.format()](https://github.com/zionLZH/sh.js/blob/master/help/String.md#stringformatstr1-str2-str3-)  
  
### 扩展模块
- [storage*](https://github.com/zionLZH/sh.js/blob/master/help/storage.md)  
- [wv*](https://github.com/zionLZH/sh.js/blob/master/help/wv.md)  
- [http*](https://github.com/zionLZH/sh.js/blob/master/help/http.md)  
- [check*](https://github.com/zionLZH/sh.js/blob/master/help/check.md)  
  
# 测试报告

### 支持浏览器
  
Web browser (Safari/Chrome/Firefox/Opera/Edge/Webkit)  

Mobile browser (Safari/Chrome/Edge/QQ浏览器/微信内嵌浏览器/QQ内嵌浏览器/淘宝内嵌浏览器/支付宝内嵌浏览器/微信小程序/UC浏览器/Opera/Opera Mini/Opera Beta/Webkit)  

Hybrid browser (html5Plus Runtime)  

Other browser (支持ES5以及HTML5标准储存方法即可)  


注：
- 处于无痕浏览模式可能会导致 Storage 方法无法使用。  
- Html5Plus Runtime下提前注入部分机型可能会导致 Wv 方法无法使用。  
  
  
### 测试机型
IOS8/IOS9/IOS10/IOS11: iPhone 5, iPhone6, iPhone6Plus, iPhone7,  iPhone7Plus

Android 8.0: Nexus6Plus

Android 7.1: Nexus6Plus, OnePlus3, OnePlus3T, OnePlus5, Pixel, Pixel2

Android 7.0: Nexus6Plus, OnePlus3, OnePlus3T, OnePlus5, Pixel, Pixel2,

Android 6.0: Nexus6Plus, OnePlus3, OnePlus3T, OnePlus5, Pixel, Pixel2, 魅族E, 魅蓝Note5, 魅蓝Note2, 小米Max, 小米Note, 小米5, 小米5s, 红米Note3, 荣耀6, 荣耀Meta8, 荣耀V9, 努比亚?, 三星A8，OppoR9, OppoR9s, OppoR11, 红米5

Android 5.0: 魅蓝Note1, 魅族4Pro, 红米Note3(5.0.2)

Android 4.3: 联想?, 荣耀4X, VivoX5si


