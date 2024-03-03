var express = require('express');
var sql = require("mssql");
//设计时使用的数据库
var config = {
    user: 'sa',  
    password: '123456',   
    server: 'localhost',  
    database: 'node-test',   
    encrypt:false   
};

//查询对应的表 用于验证登录
exports.login=function(type,callback){
  let table
  if(type===1){
    table='customer'
  }
  else{
    table='employee'
  }
    sql.connect(config).then(()=>{
        new sql.Request().query(`select * from ${table}`).then(recordset=>{
          callback(null,recordset.recordset)
        }).catch(err=>{
          callback(err)
        })
    }).catch(err=>{
        callback(err)
    })
}

//用于更新对应表的信息
exports.update=function(data,callback){
  let table;
  if(data.type===1){
    table='customer'
  }
  else{
    table='employee'
  }
  sql.connect(config).then(()=>{
    //sql语句中修改的值是否需要用引号，可以根据数据库中规定其值的类型判断，若是字符串需要加入引号，若是数字或者布尔值，不需要
    let sqlStr=`update ${table} set username='${data.username}',pwd='${data.pwd}',gender='${data.gender}' where tele='${data.tele}'`
    // console.log(sqlStr);//检查sql语句
    new sql.Request().query(sqlStr).then(result=>{
      callback(null,result.rowsAffected)
    }).catch(err=>{
      // console.log(err);
      callback(err)
    })
  }).catch(err=>{
    console.log(2);
    callback(err)
  })
}

//用于查询菜单
exports.getMenu=function(callback){
  sql.connect(config).then(()=>{
    let sqlStr='select * from menu'
    new sql.Request().query(sqlStr).then(result=>{
      callback(null,result.recordsets[0])
    }).catch(err=>{
      // console.log(1);
      callback(err)
    })
  }).catch(err=>{
    // console.log(2);
    callback(err)
  })
}

//添加订单信息-订单表
exports.addOrder=function(orderID,data,callback){
  sql.connect(config).then(()=>{
    //table是sql中的保留字，若自定义字段重名需要用[]括起来进行使用
    let sqlStr=`insert into bill (orderID,tele,totalMoney,tableNum,orderTime) values (${orderID},${data.tele},${data.totalMoney},'${data.table}','${data.orderTime}')`
    new sql.Request().query(sqlStr).then(()=>{
      callback(null)
    }).catch(err=>{
      console.log(err);
      callback(err)
    })
  }).catch(err=>{
    callback(err)
  })
}

//添加订单信息-点菜详情表
exports.addDishDetail=function(orderID,data,callback){
  sql.connect(config).then(()=>{
    let sqlStr=`insert into dishDetail values(${orderID},'${data.id}',${data.num})`
    new sql.Request().query(sqlStr).then(()=>{
      callback(null)
    }).catch(err=>{
      callback(err)
    })
  }).catch(err=>{
    callback(err)
  })
}

//查看某个客人的订单
exports.checkbill=function(tele){
  return new Promise((res,rej)=>{
    sql.connect(config).then(()=>{
      let sqlStr=`select * from v_bc where tele=${tele}`
      new sql.Request().query(sqlStr).then((result)=>{
        res(result.recordsets[0])
      }).catch(err=>{
        rej(err)
      })
    }).catch(err=>{
      rej(err)
    })
  })
}

//查看某个订单的详情
exports.checkdetail=function(orderID){
  return new Promise((resolve,reject)=>{
    sql.connect(config).then(()=>{
      let sqlStr=`select name,num from v_dm where orderID=${orderID}`
      new sql.Request().query(sqlStr).then(result=>{
        resolve(result.recordset)
      }).catch(err=>{
        reject(err)
      })
    }).catch(err=>{
      reject(err)
    })
  })
}
//订单详情拼接
exports.detail=function(data){
  return new Promise(res=>{
    let detail=''
    data.forEach(item=>{
      detail+=item.name+'*'+item.num+'、'
    })
    detail=detail.slice(0,detail.length-1)
    res(detail)
  })
}

//查看所有订单
exports.checkAllBill=function(){
  return new Promise((res,rej)=>{
    sql.connect(config).then(()=>{
      let sqlStr='select * from v_bc'
      new sql.Request().query(sqlStr).then((result)=>{
        res(result.recordsets[0])
      }).catch(err=>{
        rej(err)
      })
    }).catch(err=>{
      rej(err)
    })
  })
}

//修改订单状态
exports.flagChange=function(orderID,flag,callback){
  sql.connect(config).then(()=>{
    let sqlStr=`update bill set flag=${flag} where orderID=${orderID}`
    new sql.Request().query(sqlStr).then(result=>{
      callback(null)
    }).catch(err=>{
      callback(err)
    })
  }).catch(err=>{
    callback(err)
  })
}

