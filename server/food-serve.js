const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

//使用cors 允许跨域
app.use(cors());
//能解析urlencode格式的post请求体参数
app.use(express.urlencoded({ extended: false }));
//能解析json格式的请求体参数
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log(`please visit 3000/`);
  console.log("running on 3000...");
});
