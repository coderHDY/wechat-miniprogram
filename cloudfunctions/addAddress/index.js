// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const _ = cloud.database().command;
// 云函数入口函数
exports.main = async (event, context) => {
  // return event
  const wxContext = cloud.getWXContext();
  const userInfoCollection=cloud.database().collection("userInfo");
  //查询有没有已有地址 异步函数返回有问题！
   userInfoCollection.where({
    "_openid":wxContext.OPENID
  }).count().then(res=>{
    if( res.total !== 0){
      //update
      return userInfoCollection.where({
        "_openid":wxContext.OPENID
      }).update({
        data:{
          address:_.push(event.userInfo)
        }
      })
    }else{
      //add
      const newUserInfo=event.userInfo
      return userInfoCollection.add({
        data:{
          "_openid":wxContext.OPENID,
          address:[newUserInfo]
        }
      })
    }
  })
  //有就push，没有就add
}