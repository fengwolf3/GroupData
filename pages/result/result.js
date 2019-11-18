// pages/result/result.js
const db = wx.cloud.database();
const _=db.command;

Page({
  query: function(){
    console.log("query");
    // db.collection('groupdata').get().then(console.log)
   
    // db.collection('groupdata').where({
    //   group_name:"龙岩移动业响"
    // }).get().then(console.log)

    console.log("*********指定字段查询********")
    // db.collection('groupdata')
    // .field({
    //   group_name:true,
    //   product_name:true,
    //   time:true
    // }).get().then(console.log).catch(console.error)
    
    // 正则表达式查询
    db.collection('groupdata').where({
      group_name:new db.RegExp({
        regexp:'龙岩移动业响',
        options:'i'
      })
    }).get().then(console.log)


  }
})