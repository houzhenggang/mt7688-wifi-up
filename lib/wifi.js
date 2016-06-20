"use strict";
var S = require('string');
var child_process = require('child_process');

var WiFi = module.exports = function() {
	this.ap = {
		enc: '',
		name: '',
		passwd: ''
	};
	this.wifiscan = '';
};

WiFi.prototype.uciscan = function(finish) {
	var self = this;

	child_process.exec('iwinfo ra0 scan|grep ESSID', function(err, wifiscan, stderr) {
			self.wifiscan = wifiscan;
			if(typeof(finish)=='function'){
				return finish(null, 'done.');
			}
	});
}

WiFi.prototype.cache = function(list, finish) {
	var self = this;
	for (var index in list) {
		var obj = list[index];
		if(S(self.wifiscan).contains(obj.name)){
			self.ap.enc = obj.enc;
			self.ap.name = obj.name;
			self.ap.passwd = obj.passwd;
			if(typeof(finish)=='function'){
				return finish(null, self.ap);
			}
		}
	}
	if(self.ap.name == ''){
		if(typeof(finish)=='function'){
			return finish(null, '');
		}
	}
}

WiFi.prototype.uciset = function(finish) {
	var self = this;
	var command = 'uci set wireless.sta.ssid=' + self.ap.name;
	child_process.exec(command, function(err, setssid, stderr) {
		command = 'uci set wireless.sta.encryption=' + self.ap.enc;
		child_process.exec(command, function(err, setenc, stderr) {
			if(self.ap.enc == 'psk2'){
				command = 'uci set wireless.sta.key=' + self.ap.passwd;
				child_process.exec(command, function(err, setkey, stderr) {
					if(typeof(finish)=='function'){
						return finish(null, 'done.');
					}
				});
			}
			else if(self.ap.enc == 'wep'){
				command = 'uci set wireless.sta.key1=' + self.ap.passwd;
				child_process.exec(command, function(err, setkey1, stderr) {
					command = 'uci set wireless.sta.key=1';
					child_process.exec(command, function(err, setkey, stderr) {
						if(typeof(finish)=='function'){
							return finish(null, 'done.');
						}
					});
				});
			}
			else{
				if(typeof(finish)=='function'){
					return finish(null, 'Not support!');
				}
			}
		});
	});
}

WiFi.prototype.wifiup = function(finish) {
	var self = this;
	var command = 'uci set wireless.sta.disabled=0';
	child_process.exec(command, function(err, wifi, stderr) {
		command = 'uci commit';
		child_process.exec(command, function(err, commit, stderr) {
			command = 'wifi';
			child_process.exec(command, function(err, wifi, stderr) {
				if(typeof(finish)=='function'){
					return finish(null, 'done.');
				}
			});
		});
	});
}
