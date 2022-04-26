// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const productsCollection=cloud.database().collection("products");
    const id = event.id;
    productsCollection.where({
      "_id":id
    }).remove().catch(err=>{
      return(err)
    })
  }