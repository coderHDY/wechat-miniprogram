
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    showGoods:[],
    page:10
  },
  getBanners(){
    const banners=wx.cloud.database().collection("banners")
    banners.get().then(res=>{
      this.setData({
        banners:res.data
      })
    })
  },
  getShowGoods(){
    const products=wx.cloud.database().collection("products")
    products.orderBy("update","desc").limit(this.data.page).get().then(res=>{
      this.setData({
        showGoods:res.data,
        page:this.data.page+10
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners(),
    this.getShowGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getShowGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})