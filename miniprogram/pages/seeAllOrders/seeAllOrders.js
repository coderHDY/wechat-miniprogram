// miniprogram/pages/seeAllOrders/seeAllOrders.js
import {
  formatDate
} from "../../services/service"
const orders = wx.cloud.database().collection("orders")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    skip: 7
  },
  copy(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.data,
    })
  },
  changePay(event) {
    const index = event.currentTarget.dataset.index
    const id = event.currentTarget.dataset.id
    const isPaied = !this.data.orders[index].isPaied
    // 更改数据库
    orders.where({
      _id: id
    }).update({
      data:{
        isPaied
      }
    }).then(()=>{
      // 更改界面
      const newOrders = this.data.orders
      newOrders[index].isPaied = isPaied
      this.setData({
        orders:newOrders
      })
    })
  },
  getOrder(skip) {
    orders.limit(skip).orderBy("date", "desc").get().then(res => {
      res.data.forEach(item => {
        item.date = formatDate(item.date, "yyyy-MM-dd hh:mm:ss")
      })
      this.setData({
        orders: res.data,
        skip: this.data.skip + 10
      })
    })
  },
  // 更改快递信息
  setDellivery(event){
    wx.cloud.database().collection("orders").where({
      "_id":event.currentTarget.dataset.id
    }).update({
      data:{
        delivery:event.detail.value
      }
    })
  },
  //---------------- 生命周期函数--监听页面加载--------------------
  onLoad: function (options) {
    this.getOrder(this.data.skip)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrder(this.data.skip)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})