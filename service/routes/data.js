var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';//路径配置需要注意最后的反斜杠'/'

/* GET home page. */
//读取数据模块  供客户端调用
//接口路径：data/read?type=it
//相当于data/read?type=it.json
router.get('/read', function(req, res, next) {
	var type = req.param('type') || '';
	fs.readFile(PATH + type + '.json', function(err, data){
		if(err){
			return res.send({
				status: 0,
				info:'读取文件出现异常'
			});
		}
		var COUNT = 50;
		//TODO: try
		var obj = [];
		try{
			obj = JSON.parse(data.toString());
		}
		catch(e){
			obj = [];
		} 
		if(obj.length > COUNT){
			obj = obj.slice(0, COUNT);
		}
		return res.send({
			status:1,
			data:obj

		});
	});
});

//数据存储模块 后台开发使用
//从get改为post有利于在其他地方使用post
router.post('/write', function(reg, res, next){
	//文件名
	var type = reg.param('type') || '';
	//关键字段
	var url = reg.param('url') || '';
	var title = reg.param('title') || '';
	var img = reg.param('img') || '';
	if(!type || !url || !title || !img){
		return res.send({
			status:0,
			info:'提交的字段不全'
		});
	};
	var filePath = PATH + type + '.json';
	//1.读取文件
	fs.readFile(filePath, function(err, data){
		if(err){
			return res.send({
				status:0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());
		//代表每一条记录
		var obj = {
			img: img,
			url: url,
			title: title,
			id: guidGenerate,
			time: new Date()
		};
		arr.splice(0, 0, obj);
		//2.写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function(err){
			if(err){
				return res.send({
					status: 0,
					info: '写入文件失败'

				});
			}
			return res.send({
				status:1,
				data: obj

			}); 
		});

	});	
});


//阅读模块写入接口 后台开发使用
router.post('/write_config', function(req, res, next){
	//TODO: 后期进行提交数据的验证
	//防xss攻击 
	//npm install xss
	//require('xss')
	//var str = xss(name)
    var data = req.body.data;
    //TODO: try catch
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    //写入文件
    fs.writeFile(PATH + 'config.json', newData, function(err){
    	if(err){
    		return res.send({
    			status: 0,
    			info:'写入数据异常'

    		});
    	}
    	return res.send({
    		status: 1,
    		info: obj
    	});
    });
});


//guid
function guidGenerate() {
	return 'xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Match.random() * 16 | 0,
		  v = c == 'x' ? r : (r & 0x3 | 0x8);
		  return  v.tostring(16);
	}).toUpperCase();
}


module.exports = router;













