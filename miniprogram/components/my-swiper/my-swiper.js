// pages/home/childComp/homeSwiper.js
Component({
  properties: {
    banners: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    bannerTap(event) {
      wx.navigateTo({
        url: '../../pages/detail/detail?id=' + event.currentTarget.dataset.link,
      })
    }
  }
})