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
      let id = event.currentTarget.dataset.id;
      let pages = getCurrentPages();
      let url = pages[pages.length-1].route;
      if(url === "pages/chooseModifyProduct/chooseModifyProduct"){
        this.modifyProduct(id);
        return
      }
      wx.navigateTo({
        url: '../../pages/detail/detail?id='+id
      })
    },
    wait() {
      wx.showToast({
        title: '添加地址中....',
        duration: 2000,
        icon: "loading",
        mask: true
      })
    },
    modifyProduct(id){
      wx.navigateTo({
        url: '../../pages/modifyProduct/modifyProduct?id='+id,
      })
    }
  }
})
