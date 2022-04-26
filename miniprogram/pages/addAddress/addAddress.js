// miniprogram/pages/addAddress/addAddress.js

Page({
  data: {

  },
  // 等待添加
  wait() {
    wx.showToast({
      title: '添加地址中....',
      duration: 2000,
      icon: "loading",
      mask: true
    })
  },
  addAddress() {
    const infoBox = this.selectComponent("#info-box")
    const userInfo = infoBox.getInfo()
    this.wait()
    wx.cloud.callFunction({
      name: "addAddress",
      data: {
        userInfo
      }
    }).then(res => {
      getApp().initUserInfo()
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    })
  }
})