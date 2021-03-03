// pages/home/childComp/homeSwiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bannerTap(event) {
      wx.navigateTo({
        url: '../../pages/detail/detail?id=' + event.currentTarget.dataset.link,
      })
    }
  }
})