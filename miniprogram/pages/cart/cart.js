Page({
  //-----------------------------------页面的初始数据---------------------------------
  data: {
    cart: [],
    totalPrice: 0
  },
  calcPrice() {
    const totalPrice = this.data.cart.reduce((preVal, item) => {
      return item.product.price * item.num + preVal
    }, 0)
    this.setData({
      totalPrice: totalPrice * 100
    })
  },
  newOrder() {
    if (this.data.totalPrice !== 0) {
      wx.navigateTo({
        url: '../newOrder/newOrder',
      })
    } else {
      wx.showToast({
        title: '请选择商品',
        duration:1500,
        icon:"none"
      })
    }
  },
  delNum(event) {
    const index = event.currentTarget.dataset.index
    const cart = this.data.cart
    if (cart[index].num < 1) return
    cart[index].num -= 1
    this.setData({
      cart
    })
    getApp().updateCart(cart)
    this.calcPrice()
  },
  addNum(event) {
    const index = event.currentTarget.dataset.index
    const cart = this.data.cart
    if (cart[index].num > 98) return
    cart[index].num += 1
    this.setData({
      cart
    })
    getApp().updateCart(cart)
    this.calcPrice()
  },
  //------------------------------ 生命周期函数--监听页面加载-------------------------
  onShow: function (options) {
    this.setData({
      cart: getApp().globalData.cart
    });
    this.calcPrice()
  },

  //-------------------------------------用户点击右上角分享------------
  onShareAppMessage: function () {

  }
})