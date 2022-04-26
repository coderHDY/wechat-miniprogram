// pages/user/user.js
Page({
  data: {
    user:{},
    isAdministrator:null,
    isShowLogin:true
  },
  toAddProduct(){
    wx.navigateTo({
      url: '../addProduct/addProduct',
    })
  },
  findServer(){
    wx.navigateTo({
      url: '../server/server',
    })
  },
  seeMyOrders(){
    wx.navigateTo({
      url:"../myOrders/myOrders"
    })
  },
  seeMyAddress(){
    wx.navigateTo({
      url: '../myAddress/myAddress',
    })
  },
  seeAllOrders(){
    wx.navigateTo({
      url: '../seeAllOrders/seeAllOrders',
    })
  }, 
   getUserProfile(e) {
    wx.getUserProfile({
      desc: '是否同意获取您的头像及昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          user:res.userInfo,
          isShowLogin:false
        })
        this.login()
      }
    })
  },
  login(){
    wx.cloud.callFunction({
      name:"checkAdministrator"
    }).then(res => {
      this.setData({
        isAdministrator:res.result
      })
    })
  },
  addType(){
    wx.navigateTo({
      url: '../addType/addType',
    })
  },
  modifyProduct:function(){
    wx.navigateTo({
      url: '../chooseModifyProduct/chooseModifyProduct',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
    }).then(res=>{
      this.setData({
        user:res.userInfo
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})