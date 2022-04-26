// miniprogram/pages/myAddress/myAddress.js
Page({
  data: {
    radio: 0,
    userInfos: {},
    address:[]
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    if (name !== this.data.radio) {
      this.inifyIndex(name)
    }
  },
  // 更改云端、本地及全局的defaultIndex
  inifyIndex(value) {
    //更改云端defaultIndex
    wx.cloud.callFunction({
      name: "changeDefaultIndex",
      data: {
        defaultIndex: value
      }
    }).then(() => {
      getApp().initUserInfo()
    })
    this.setData({
      radio: value
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  delAddress(event) {
    // 先在本地制作样本，然后传到云端覆盖
    const index = event.currentTarget.dataset.index;
    const newUserInfos = this.data.userInfos;
    const newAddress = newUserInfos.address;
    const radio = this.data.radio;
    // 如果删除最后一个地址，改变radio指向
    newAddress.splice(index, 1)
    if (radio * 1 >= newAddress.length) {
      this.inifyIndex(0)
    }
    // 本地删除该地址
    this.setData({
      userInfos: newUserInfos,
      address:newAddress
    })
    // 云端删除该地址
    wx.cloud.callFunction({
      name: "updataMyAddress",
      data: {
        newAddress
      }
    }).then(res => {
      // console.log(res)
    })
  },
  //------------------生命周期函数--监听页面加载-------------------
  onLoad: function (options) {

  },
  onShow: function () {
    //每次更改数据
    const userInfos = getApp().globalData.userInfos
    this.setData({
      userInfos,
      radio: userInfos.defaultIndex,
      address:userInfos.address
    })

  },
})