var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(express.json());
app.use(bodyParser.json());

// 处理 GET 请求 / 返回 hello 
app.get('/', (req, res) => {
    res.send("hello world!")
});

app.post('/csp-report', (req, res) => {
    const body = req.body;
    console.log('CSP Violation Report:', req.body['csp-report']);
    res.setHeader('Content-Type', 'application/csp-report'); 
    res.status(200).send(body);
});

// app.post('/csp-violation-report-endpoint', (req, res) => {
//   console.log('CSP Violation Report:', req.body['csp-report']);
//   // 这里可以将报告存储到数据库或日志文件中
//   res.sendStatus(204); // 返回 204 No Content
// });

// 服务端口号
const port = 3000;
// 监听端口号
app.listen(port, () => {
    console.log(`node服务已启动 端口号为： ${port}`);
});

