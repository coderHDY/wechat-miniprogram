// pages/categories/categories.js
Page({
  data: {
    types:[],
    currentIndex:0,
    show: false,
    activeKey: 0,
    goodsList:[]
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  changeType(event){
    this.setData({
      currentIndex:event.target.dataset.index
    }),
    this.getGoods()
    this.onClose()
  },
  getTypes(){
    wx.cloud.database().collection("types").get().then(res=>{
      const types=[]
      res.data.forEach(item=>{
        types.push(item.type)
      })
      this.setData({
        types
      })
      this.getGoods()
    })
  },
  getGoods(){
    const produsts=wx.cloud.database().collection("products");
    const currentType=this.data.types[this.data.currentIndex]
    console.log(currentType)
    produsts.where({
      type:currentType
    }).get().then(res=>{
      this.setData({
        goodsList:res.data
      })
    })
  },
  //---------------------------- 生命周期函数--监听页面加载-------------------
  onLoad: function (options) {
    this.getTypes()
  },
  //------------------------------ 页面上拉触底事件的处理函数-----------------
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})