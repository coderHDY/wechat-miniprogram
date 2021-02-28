// miniprogram/pages/newOrder/newOrder.js
import area from "../../assets/area"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: {},
    order: [],
    name: "",
    phone: "",
    address: null,
    addressDetail: "",
    showArea: false,
    order:[]
  },

  //----------------------------------获取城市文件--------------------------------
  onLoad: function (options) {
    this.setData({
      area: area
    })
  },
  //----------------------------------获取订单信息--------------------------------
  onShow: function () {
    this.setData({
      order: getApp().initOrder()
    })
  },
  showCitys() {
    this.setData({
      showArea: true
    })
  },
  hideCitys() {
    this.setData({
      showArea: false
    })
  },
  chooseCity(event) {
    this.setData({
      address: {
        province: event.detail.values[0],
        city: event.detail.values[1],
        area: event.detail.values[2]
      }
    })
    this.hideCitys()
  },
  createNewOrder() {
    if (this.data.name.trim() !== "" && this.data.phone.length === 11 && this.data.address !== null && this.data.addressDetail.trim() !== "") {
      wx.cloud.database().collection("orders").count().then(res => {
        const orderId = res.total + 3000
        const price = this.data.order.reduce((preVal, item) => {
          return item.num * item.product.price + preVal
        }, 0)
        const order = {
          name: this.data.name,
          phone: this.data.phone,
          city: this.data.address,
          address: this.data.addressDetail,
          products: this.data.order,
          price,
          orderId
        }
        wx.cloud.database().collection("orders").add({
          data: order
        }).then(res => {
          wx.showToast({
            title: '下单成功',
            duration: 2000
          })
          wx.showToast({
            title: '下单成功',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({})
          }, 2000)
          getApp().clearCart()
        })
      })
    } else {
      wx.showToast({
        title: '输入不正确，请检查！',
        icon: "none"
      })
    }
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {}
})