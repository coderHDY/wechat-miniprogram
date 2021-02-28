//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'teamall-6g4mhcmf5d49f086',
        traceUser: true,
      })
    }
    this.globalData = {
      cart: []
    }
  },
  //-------------------更新购物车-------------------------
  updateCart(cart) {
    this.globalData.cart = cart
  },
  //----------------------清空购物车--------------------------
  clearCart() {
    this.globalData.cart = []
  },
  //---------------删除掉购买量为 0 的商品-----------------
  initOrder() {
    console.log(this.globalData.cart)
    const cart = this.globalData.cart.filter(item => {
      return item.num !== 0
    })
    return cart
  },
  //------------------购买后清空购物车已买的商品-----------------
  afterBuy() {
    const cart = this.globalData.cart.filter(item => {
      return item.num === 0
    })
    this.globalData.cart = cart
  },
})