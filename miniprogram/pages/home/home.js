
Page({
  data: {
    banners:[],
    showGoods:[],
    page:10,
  },
  getBanners(){
    const banners=wx.cloud.database().collection("banners");
    banners.limit(6).get().then(res=>{
      this.setData({
        banners:res.data
      })
    })
  },
  getShowGoods(){
    const products=wx.cloud.database().collection("products")
    products.orderBy("update","desc").limit(this.data.page).limit(10).get().then(res=>{
      this.setData({
        showGoods:res.data,
        page:this.data.page+10
      })
    })
  },
  //------------- 生命周期函数------------------
  onLoad: function (options) {
    this.getBanners(),
    this.getShowGoods()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    this.getShowGoods()
  },
  onShareAppMessage: function () {

  }
})