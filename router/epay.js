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
        var  submitBaseUrl = 'http://localhost:8080'
        // var submitBaseUrl= 'https://react-demo-express-api.vercel.app'
        // // if (referer && referer.indexOf('localhost') === -1) {
        // if (referer !== 'http://localhost:8080') {
        //     submitBaseUrl = 'https://react-demo-express-api.vercel.app'
        // }
        // 2). 返回支付表单脚本
        const scriptPath = path.join(__dirname, '../assets/js/payment-form.js');

        const pk = `-----BEGIN PUBLIC KEY-----
        MIIBCgKCAQEAx4FzgLG9gR1CPKIqHlQ9zQPhGgf1KA9kIadngwvh+XelU2XGWX0R
        Rgqw0xkx76I+Hj79QydCTEWPqGqP0hn2SrBYfvr2TKAFbFZP1r28bpI/pXTyuBWC
        a2c5fNp40cQDx567aJ2YFcVc0i/TIh0tBVMENeOWujerKCa/Agao2Me4IJW69olY
        MBBIScupEivF1dBc9hSS/LdPpWJ1fhgFvnWMY7Eozwdm5ccwRkI9wQAaD8pskgwu
        l8e29UYvlmCa4MD8fgHK83j7YKitjEkgvgXneaEb/Q0tAk3HNucbYZYjU19NdFUO
        6Wmar8q4dnNRPqtBJOh1yKLSUZP1AaMz5wIDAQAB
        -----END PUBLIC KEY-----`

        fs.readFile(scriptPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading script file: ${err}`);
                return res.status(500).send(`Internal Server Error: ${err}, ${scriptPath}`);
            }
            res.set('Content-Type', 'application/javascript');
            
            // 根据 id 从数据库或者通过获取金额
            getTransactionAmount(id, (err, amount) => {
                var nData = data.replace(/\$\$PK\$\$/g, pk).replace(/\$\$Amount\$\$/g, `$${amount}.00`).replace(/\$\$SubmitUrl\$\$/g, `${submitBaseUrl}/api/epay/submit-form`)
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
    res.send({
        status: 'ok'
    });
});

module.exports = router