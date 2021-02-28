// pages/detail/detail.js
import {
  formatDate
} from "../../services/service"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWindow: false,
    product: {},
    num: 1,
    disabledDown: true,
    disabledUp: false,
    tip:"加入购物车",
    isBuyNow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("products").doc(options.id).get().then(res => {
      res.data.update = formatDate(res.data.update, "yyyy-MM-dd hh:mm:ss")
      this.setData({
        product: res.data
      })
    })
  },
  showBuyNow() {
    this.setData({
      tip:"立即购买",
      isBuyNow:true
    })
    this.showPopup()
  },
  showAddCart(){
    this.setData({
      tip:"加入购物车",
      isBuyNow:false
    })
    this.showPopup()
  },
  onClickButton() {
    console.log('点击按钮');
  },
  showPopup() {
    this.setData({
      showWindow: true
    });
  },
  onClose() {
    this.setData({
      showWindow: false
    });
  },
  up() {
    this.setData({
      num: this.data.num + 1
    });
    if (this.data.disabledDown) {
      this.setData({
        disabledDown: false
      })
    }
    if (this.data.num > 98) {
      this.setData({
        disabledUp: true
      })
    }
  },
  down() {
    this.setData({
      num: this.data.num - 1
    });
    if (this.data.disabledUp) {
      this.setData({
        disabledUp: false
      })
    }
    if (this.data.num < 2) {
      this.setData({
        disabledDown: true
      })
    }
  },
  findServer(){
    wx.navigateTo({
      url: '../server/server',
    })
  },
  addCart() {
    const cart = getApp().globalData.cart
    let cartItem = cart.find(item => {
      return item.id === this.data.product._id
    })
    if (!cartItem) {
      cartItem = {
        id: this.data.product._id,
        product: this.data.product,
        num: this.data.num
      }
      cart.push(cartItem)
    } else {
      cartItem.num += this.data.num;
    }
    wx.showToast({
      title: '添加购物车成功！',
      duration: 3000
    })
    this.onClose()
  },
  buyNow(){
    const cart=[{
      id: this.data.product._id,
      product: this.data.product,
      num: this.data.num
    }]
    getApp().updateCart(cart)
      wx.navigateTo({
        url: '../newOrder/newOrder',
      })
  },
  //------------------生命周期函数--监听页面初次渲染完成-------------
  onShow: function () {

    this.onClose()
  },
  onHide: function () {

  },
  onUnload: function () {

  }
})