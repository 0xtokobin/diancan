var SQL=require('./sql-server')
var express = require('express');
var router=express.Router()
var DT=require('./API/DT')

function tokenSave(cur,data,type){
  for(let k in cur){
    if(k!=='type'){
      cur[k]=data[k]
    }else{
      cur[k]=type
    }
  }
}

//登录验证
router.post('/login',(req,res)=>{
  const user=req.body
  const current={
    tele:'',
    username:'',
    pwd:'',
    gender:'',
    pic:'',
    type:0
  }
  SQL.login(user.type,(err,data)=>{
    if(err){
      return res.send({logintype:500})
    }
    let index=data.findIndex(item=>item.tele===user.tele)
    if(index!==-1){
      if(user.pwd===data[index].pwd){
        tokenSave(current,data[index],user.type)
        return res.send({logintype:1,token:current})
      }
      else{
        return res.send({logintype:0})
      }
    }
    else{
      return res.send({logintype:-1})
    }
  })
})

//更新个人信息
router.post('/updateInfo',(req,res)=>{
  let data=req.body
  SQL.update(data,(err,result)=>{
    if(err){
      return res.send({state:500,msg:'请稍后再试'})
    }
    if(result[0]===1){
      return res.send({state:200,msg:'修改成功'})
    }
    return res.send({state:201,msg:'修改失败'})
    
  })
})

//获取菜单信息
router.get('/getMenu',(req,res)=>{
    SQL.getMenu((err,data)=>{
      if(err){
        return res.send({state:500})
      }
      res.send({state:200,menu:data})
    })
})

//用户结账时提交订单，需要向下单表和订单表插入数据
router.post('/checkout',(req,res)=>{
  let data=req.body
  let orderID=DT.getDate(1)+data.table
  let orders=data.orders
  //增加时间属性
  data.orderTime=DT.getDate(2)
  console.log(typeof data.orderTime);
  SQL.addOrder(orderID,data,(err)=>{
    if(err){
      return res.send({state:500})
    }
  })
  orders.forEach(item => {
    SQL.addDishDetail(orderID,item,(err)=>{
      if(err){
        return res.send({state:500})
      }
    })
  })
  res.send({state:200})
})

//用户订单页渲染
router.get('/cgb',(req,res)=>{
  let tele=req.query.tele
  SQL.checkbill(tele).then(data1=>{
    data1.forEach((item,index)=>{
      SQL.checkdetail(item.orderID).then(data2=>{
        SQL.detail(data2).then(detail=>{
          item.detail=detail
          if(index===data1.length-1){
            res.send({state:200,bill:data1})
          }
        })
      }).catch(err=>{
        res.send({state:500,error:err})
      })
    })
  }).catch(err=>{
    res.send({state:500,error:err})
  })
})

//员工端(包括员工和老板)页面渲染
router.get('/egb',(req,res)=>{
  SQL.checkAllBill().then(res1=>{
    res1.forEach((item,index)=>{
      SQL.checkdetail(item.orderID).then(res2=>{
        SQL.detail(res2).then(res3=>{
          item.detail=res3
          if(index===res1.length-1){
            res.send({state:200,bill:res1})
          }
        })
      }).catch(err=>{
        res.send({state:500,error:err})
      })
    })
  }).catch(err=>{
    res.send({state:500,error:err})
  })
})

//更新订单状态
router.post('/flagChange',(req,res)=>{
  let data=req.body
  SQL.flagChange(data.orderID,data.flag,(err)=>{
    if(err){
      res.send({state:500,error:err})
    }
    res.send({state:200})
  })
})

module.exports=router