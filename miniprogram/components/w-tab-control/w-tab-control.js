// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 横向的一个bar，控制页面内分页效果
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:0
    }
  },
  externalClasses:["tab-control"],

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(event){
      if(this.data.currentIndex!==event.currentTarget.dataset.index){
        const index=event.currentTarget.dataset.index;
        const item=event.currentTarget.dataset.item
        this.setData({
          currentIndex:index
        })
        this.triggerEvent("tabChange",{index,item})
      }
    }
  }
})
