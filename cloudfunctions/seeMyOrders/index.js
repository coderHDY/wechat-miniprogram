// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const ordersCollection=cloud.database().collection("orders")
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await ordersCollection.where({
    _openid:wxContext.OPENID
  }).orderBy("date","desc").get()
}