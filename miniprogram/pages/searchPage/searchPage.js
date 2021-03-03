// miniprogram/pages/searchPage/searchPage.js.
const db = wx.cloud.database();
Page({
  data: {
    value: "",
    showGoods: [],
    isEmpty: false
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch(event) {
    const key=event.currentTarget.dataset.key.trim()
    if( key=== ""){
      wx.showToast({
        title: '搜索字不能为空',
      })
    }else{
      this.search(key)
    }
  },
  search(searchKey) {
    db.collection("products").where({
      name: db.RegExp({
        regexp: searchKey
      })
    }).get().then(res => {
      this.setData({
        showGoods: res.data
      });
      this.setData({
        isEmpty: this.data.showGoods.length === 0 ? true : false
      })
    })
  },
  // 生命周期函数----------------------
  onLoad: function (options) {
    this.setData({
      value: options.searchKey
    })
    this.search(options.searchKey)
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

  },
  onShareAppMessage: function () {

  }
})