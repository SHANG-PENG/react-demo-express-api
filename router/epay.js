var express = require('express')
var router = express.Router()
var path = require('path');
var fs = require('fs');

var privateDecrypt = require('../common/rsa').privateDecrypt;

var { getRandomInt } = require('../common/utility');
var getTransactionAmount = require('../db/amount').getTransactionAmount;

router.get('/load-form', (req, res) => {
    const { gid, id } = req.query;
    // 1). 根据这个 gid 获取基本信息 & 做校验
    
    // 2). 返回支付表单脚本
    const scriptPath = path.join(__dirname, '../assets/js/payment-form.js');

    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading script file: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        res.set('Content-Type', 'application/javascript');

        // 根据 id 从数据库获取金额
        getTransactionAmount(id, (err, amount) => {
            var nData = data.replace('$$Amount$$', `$${amount}.00`).replace('$$SubmitUrl$$', 'http://localhost:8080/api/epay/submit-form')
            res.send(nData); // 发送脚本内容  
        });
    });
});

router.post('/submit-form', (req, res) => {
    const jsonData = req.body;
    console.log('submit-form: ', jsonData);
    console.log('submit-form-data: ', jsonData.data);
    var data = privateDecrypt(jsonData.data);
    console.log('submit-form-decrypt: ', data);

    // 解密获取基本信息并校验
    res.send("ok");
});

module.exports = router