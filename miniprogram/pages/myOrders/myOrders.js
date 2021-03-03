// miniprogram/pages/myOrders/myOrders.js
import {
  formatDate
} from "../../services/service"
Page({
  data: {
    orders: []
  },
  //-----------------------生命周期函数------------------
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "seeMyOrders"
    }).then(res => {
      res.result.data.forEach(item => {
        item.date = formatDate(item.date, "yyyy-MM-dd hh:mm:ss")
      })
      this.setData({
        orders: res.result.data
      })
    })
  },

  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})