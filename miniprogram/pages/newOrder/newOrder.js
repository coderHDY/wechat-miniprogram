// miniprogram/pages/newOrder/newOrder.js
import area from "../../assets/area"
Page({
  data: {
    area: {},
    order: [],
    defaultAddress: {},
    showArea: false
  },

  //----------------------------------获取城市文件--------------------------------
  onLoad: function (options) {
    this.setData({
      area: area,
    })
  },
  //----------------------------------获取订单信息--------------------------------
  onShow: function () {
    const defaultAddress = getApp().globalData.defaultAddress
    this.setData({
      order: getApp().initOrder(),
      defaultAddress: defaultAddress
    })
  },
  showCitys() {
    wx.hideKeyboard()
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
  // 获取锁定的收件人信息，并判断是否变化
  getLockUserInfo() {
    const lockUserInfo = this.selectComponent("#newInfo").getInfo()
    // 判断是否有变化
    if (this.checkInput(lockUserInfo)) {
      if (JSON.stringify(lockUserInfo) !== JSON.stringify(this.data.defaultAddress)) {
        // 有变化询问是否加入地址
        wx.showModal({
          cancelColor: 'cancelColor',
          title: "是否保存新地址？"
        }).then(res => {
          if (res.confirm === true) {
            // 保存地址操作
            wx.cloud.callFunction({
              name: "addAddress",
              data: {
                userInfo: lockUserInfo
              }
            }).then(()=>{
              getApp().initUserInfo()
            })
          }
          this.createNewOrder(lockUserInfo)
        })
      } else {
        this.createNewOrder(lockUserInfo)
      }
    } else {
      this.showInputErr()
    }
  },
  checkInput(lockUserInfo) {
    return lockUserInfo.name.trim() !== "" && lockUserInfo.phone.length === 11 && lockUserInfo.address !== null && lockUserInfo.addressDetail.trim() !== ""
  },
  showInputErr() {
    wx.showToast({
      title: '输入不正确，请检查！',
      icon: "none"
    })
  },
  // 创建新订单
  createNewOrder(lockUserInfo) {
    // mask  防止重复下单
    wx.showToast({
      title: '下单中...',
      icon: "loading",
      mask: true
    })
    //计算 orderID
    wx.cloud.database().collection("orders").count().then(res => {
      const orderId = res.total + 3000
      const price = this.data.order.reduce((preVal, item) => {
        return item.num * item.product.price + preVal
      }, 0)
      const date = new Date() * 1
      // 合成订单对象
      const order = {
        userInfo: lockUserInfo,
        products: this.data.order,
        delivery: "",
        isPaied: false,
        price,
        orderId,
        date
      }
      // 添加订单
      wx.cloud.database().collection("orders").add({
        data: order
      }).then(res => {
        wx.hideToast({})
        wx.showToast({
          title: '下单成功',
          duration: 2000,
          mask: true
        })
        setTimeout(() => {
          wx.navigateBack({})
        }, 2000)
        getApp().clearCart()
      })
    })
  }
})