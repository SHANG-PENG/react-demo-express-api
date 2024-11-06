var express = require('express');
var app = express();

app.use(express.json());

// 处理 GET 请求 / 返回 hello 
app.get('/', (req, res) => {
    res.send("hello world!")
});

app.post('/csp-report', (req, res) => {
    const body = req.body;
    console.log('csp-report body: ', JSON.stringify(body))
    res.status(200).send(JSON.stringify(body));
});

// 服务端口号
const port = 3000;
// 监听端口号
app.listen(port, () => {
    console.log(`node服务已启动 端口号为： ${port}`);
});

