var express = require('express')
var router = express.Router()
var path = require('path');
var fs = require('fs');

var privateDecrypt = require('../common/rsa').privateDecrypt;

var { getRandomInt } = require('../common/utility');
var getTransactionAmount = require('../db/amount').getTransactionAmount;

// ToDo Payment Form 加载失败的问题

router.get('/load-form', (req, res) => {
    const { gid, id } = req.query;
    // 1). 根据这个 gid 获取基本信息 & 做校验

    // const referer = req.headers.referer;

    try {
        // var  submitBaseUrl = 'http://localhost:8080'
        var submitBaseUrl = 'https://react-demo-express-api.vercel.app'

        // 2). 返回支付表单脚本
        const scriptPath = path.join(__dirname, '../assets/js/payment-form.js');

        fs.readFile(scriptPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading script file: ${err}`);
                return res.status(500).send(`Internal Server Error: ${err}, ${scriptPath}`);
            }
            res.set('Content-Type', 'application/javascript');

            // 根据 id 从数据库或者通过获取金额
            getTransactionAmount(id, (err, amount) => {
                var nData = data.replace(/\$\$Amount\$\$/g, `$${amount}.00`).replace(/\$\$SubmitUrl\$\$/g, `${submitBaseUrl}/api/epay/submit-form`)
                res.send(nData); // 发送脚本内容  
            });
        });
    } catch (error) {
        console.log('error', error)
        res.send(error)
    }
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