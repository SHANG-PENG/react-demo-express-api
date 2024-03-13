var path = require('path');
var fs = require('fs');
var express = require('express')
var router = express.Router()

router.get('/load-form', (req, res) => {
    const { a } = req.query;
    const scriptPath = path.join(__dirname, '../assets/js/js-form.js'); // 替换为你的脚本文件的路径  

    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading script file: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        res.set('Content-Type', 'application/javascript'); // 设置响应头的内容类型  
        res.send(data); // 发送脚本内容  
    });
});

module.exports = router