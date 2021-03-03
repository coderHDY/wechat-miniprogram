// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("userInfo").where({
    "_openid": wxContext.OPENID
  }).update({
    data: {
      defaultIndex: event.defaultIndex
    }
  })
}