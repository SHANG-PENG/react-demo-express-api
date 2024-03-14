var express = require('express')
var router = express.Router()
var path = require('path');
var fs = require('fs');

var { getRandomInt } = require('../common/utility');

router.get('/load-form', (req, res) => {
    const { gid } = req.query;
    console.log('gid:', gid);
    // 1). 根据这个 gid 获取基本信息 & 做校验

    // 2). 返回支付表单脚本
    const scriptPath = path.join(__dirname, '../assets/js/payment-form.js');

    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading script file: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        res.set('Content-Type', 'application/javascript');

        var nData = data.replace('$$Amount$$', `$${getRandomInt(1, 100)}.00`).replace('$$SubmitUrl$$', 'http://localhost:8080/api/epay/submit-form')
        res.send(nData); // 发送脚本内容  
    });
});

router.post('/submit-form', (req, res) => {
    const jsonData = req.body;
    // 解密获取基本信息并校验
    res.send("ok");
});

module.exports = router