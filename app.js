const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// 服务端口号
const port = 8080;

app.use(express.json());

// 处理 GET 请求 / 返回 hello 
app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/get', (req, res) => {
    const { a } = req.query;
    const scriptPath = path.join(__dirname, 'assets/js/js-form.js'); // 替换为你的脚本文件的路径  

    rsaTesting();
    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading script file: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        res.set('Content-Type', 'application/javascript'); // 设置响应头的内容类型  
        res.send(data); // 发送脚本内容  
    });

});

app.post('/post', (req, res) => {
    const jsonData = req.body;
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`node服务已启动 端口号为： ${port}`);
});

