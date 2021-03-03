import Toast from '@vant/weapp/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
  },

  methods: {
    onChange(e) {
      this.setData({
        value: e.detail,
      });
    },
    onSearch() {
      if(this.data.value.trim() === ""){
        wx.showToast({
          title: '搜索字不能为空',
          icon:"none"
        })
      }else{
        wx.navigateTo({
          url: '../../pages/searchPage/searchPage?searchKey='+this.data.value
        })
      }
    }
  }
})
