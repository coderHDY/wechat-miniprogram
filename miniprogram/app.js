//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'jiejiegao-5gll7u0m03a03d02',
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      // console.log(res)
    })
    this.initUserInfo()
    this.globalData = {
      cart: [],
      userInfos: [],
      defaultAddress: {}
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
  //----------------初始化用户信息-----------------
  initUserInfo() {
    wx.cloud.callFunction({
      name: "seeMyAddress"
    }).then(res => {
      const userInfos = res.result.data[0]
      let defaultAddress
      if (userInfos) {
        defaultAddress = userInfos.address[userInfos.defaultIndex]
      } else {
        defaultAddress = {}
      }
      this.globalData.userInfos = userInfos
      this.globalData.defaultAddress = defaultAddress
    })
  }
})