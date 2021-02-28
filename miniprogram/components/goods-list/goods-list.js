// components/goods-list/goods-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showGoods:{
      type:Array,
      value:[]
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
    toDetail(event){
      wx.navigateTo({
        url: '../../pages/detail/detail?id='+event.currentTarget.dataset.id
      })
    },
  }
})
