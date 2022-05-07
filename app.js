var mysql = require('mysql');  //调用MySQL模块
/* 引入express框架 */
const express = require('express');
const app = express();

/* 引入cors */
const cors = require('cors');
app.use(cors());

/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//创建一个connection
var connection = mysql.createConnection({
  host: '127.0.0.1',       //主机
  user: 'root',            //MySQL认证用户名
  password: 'cumin',
  port: '3306',
  database: 'cumin_km'
});

//创建一个connection
connection.connect();

// 数据库插入操作
app.post("/insertinfo", (req, res) => {
  let {
    id,
    name,
    sex,
    birthday,
    idCard,
    joinDate,
    number,
    salary,
    grade,
    department
  } = req.body
  console.log(req.body)
  // 数据库插入操作
  connection.query(`
    INSERT INTO cuminposts 
    VALUES
    ('${id}','${name}','${sex}','${birthday}','${idCard}','${joinDate}','${number}','${salary}','${grade}','${department}')
  `, (err, result, fields) => {
    if (err) {
      console.log("ID重复，重新输入ID")
      return

    }
  })
  // 响应
  res.send("insert ok")
})

// 数据库删除操作
app.delete("/deleteinfo", (req, res) => {
  let { id } = JSON.parse(JSON.stringify(req.body))
  console.log(id)
  connection.query(`delete from cuminposts where id = ${id}`, (err, result, fields) => {
    if (err) console.log("!!deleteinfo ERROR!!")
    res.send({ status: 200, msg: "删除成功" })
  })
})

// 修改数据库信息
app.post('/updatainfo', (req, res) => {
  console.log(req.body)
  const {
    id,
    name,
    sex,
    birthday,
    idCard,
    joinDate,
    number,
    salary,
    grade,
    department
  } = req.body
  connection.query(`update cuminposts set 
  name='${name}',
  sex='${sex}',
  birthday='${birthday}',
  idCard='${idCard}',
  joinDate='${joinDate}',
  number='${number}',
  salary='${salary}',
  grade='${grade}',
  department='${department}'
  where id=${id};`,
    (err, result, fields) => {
      if (err) console.log('updatainfo ERROR!!!!!', err)
      console.log(result)
    })

  res.send({ status: 200, msg: "updata success" })
})

// 获取数据信息 |  获取数据库全部员工信息
app.get('/queryinfo', (req, res) => {
  connection.query('select * from cuminposts', (err, result, fields) => {
    if (err) console.log('@ERR', err)
    res.send({ status: 200, result })
  })
})

// 获取某个组别信息
app.get('/querydepartment', (req, res) => {
  const { d } = req.query
  connection.query(`select * from cuminposts where department='${d}'`, (err, result, fields) => {
    if (err) console.log('@ERR', err)
    res.send({ status: 200, msg: result })
  })
})

// 搜索接口
app.post('/searchinfo', (req, res) => {
  let { name } = JSON.parse(JSON.stringify(req.body))
  console.log(name)
  connection.query(`select * from cuminposts where name='${name}'`, (err, result, fields) => {
    if (err) console.log('@ERR', err)
    res.send({ status: 200, msg: result })
  })
})


/**
 * @获取数据库全部员工信息 
 * @限制获取数据 
 * @提供给分页功能接口
 */

// 每页展示：6 的情况
// let [a, b] =
//   let[a, b] =
//   let[a, b] =
//   hIndex(index){
//     // index索引从零开始，index +1即为当前数据序号
//     // 1 = 1
//     // 2 = 2
//     this.cuurentPage <= 1 ? this.cuurentPage = 1 : this.cuurentPage
// // 如果当前不是第一页数据
// if (this.cuurentPage != 1) {
//   // index + 1 + (( 当前页 - 1) * 每页展示条数)
//   // 比如是第二页数据 1 + ((2 - 1)*5) = 6,第二页数据也就是从序号6开始


//   // 第一页 1 = 0
//   // 第二页 2 = 5
//   // 第三页 3  = 10
     // 4

//   let a = ((this.cuurentPage - 1) * this.pagesize)

// }
// // 否则直接返回索引+1作为序号
// }

// 1  -> 0-5 5条数据
// 2  -> 6-10
// 3  -> 12-17
app.get('/getlimitlist', (req, res) => {
  let { index, count } = req.query
  connection.query(`select * from cuminposts limit ${index},${count}`, (err, result, fields) => {
    if (err) console.log('@ERR', err)
    res.send(result)
  })
})



//关闭connection
// connection.end();
app.listen(2022, () => {
  console.log('[connection success] prot: http://localhost:2022')
})