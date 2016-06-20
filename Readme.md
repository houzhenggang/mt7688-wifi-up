mt7688-wifi-up
=================

Connect the WiFi network for MTK 7688 duo.

Features
-

* Support the PSK and the WEP.

Installation
-

Install directly via NPM

```sh
$ npm install mt7688-wifi-up
```

Getting started
-

### Write the main application (app.js)

```sh
"use strict";
var WiFi = require('mt7688-wifi-up');
var List = [
  {enc: 'psk2', name: 'test1', passwd: 'test1'},
  {enc: 'wep', name: 'test2', passwd: '3434343434'},
  {enc: 'psk2', name: 'test3', passwd: 'test3'},
  {enc: 'psk2', name: 'test4', passwd: 'test4'},
  {enc: 'psk2', name: 'test5', passwd: 'test5'},
  {enc: 'psk2', name: 'test6', passwd: 'test6'},
]
var wifi = new WiFi();

wifi.uciscan(function(){
  wifi.cache(List, function(err, ap){
    wifi.uciset(function(){
      wifi.wifiup(function(){});
    });
  });
});
```

### Run the main application (app.js)

```sh
$ node app.js
```


License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2016 Wesley Tsai<<wesleyboy42@gmail.com>>
