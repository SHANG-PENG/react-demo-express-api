var express = require('express');
var app = express();
var cors = require('cors');

var epayRouter = require('./router/epay');
var merchantRouter = require('./router/merchant');

app.use(express.json());

const allowedOrigins = [
    "http://localhost:2401",
    "http://localhost:8080",
    "http://localhost:8001",
    "http://localhost:8002",
    "http://127.0.0.1:8080",
    "https://react-demo-merchant.vercel.app",
    "https://react-demo-express-api.vercel.app",
    "https://go-ms-apgs-payment-form-git-dev-aldelo.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        // 检查 origin 是否在允许的列表中  
        if (!origin) return callback(null, true); // 允许不带 origin 的请求（如本地开发）  
        if (allowedOrigins.indexOf(origin) !== -1) {
            // 如果允许的列表中包含 origin，则允许请求  
            callback(null, true);
        } else {
            // 否则，不允许请求  
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // 如果需要携带凭证（cookies, HTTP认证及客户端SSL证明等），设置为true
    optionsSuccessStatus: 200, // 一些遗留浏览器需要200作为响应  
};

app.use(cors(corsOptions));

// 处理 GET 请求 / 返回 hello 
app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/epay', epayRouter);
app.use('/api/merchant', merchantRouter);

// 服务端口号
const port = 8080;
// 监听端口号
app.listen(port, () => {
    console.log(`node服务已启动 端口号为： ${port}`);
});

