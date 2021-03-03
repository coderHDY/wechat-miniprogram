// miniprogram/pages/addType/addType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },
  addType(){
    if(this.data.value.trim() !== ""){
      wx.cloud.database().collection("types").add({
        data:{
          type:this.data.value.trim()
        }
      }).then(()=>{
        wx.showToast({
          title: '添加成功',
          mask:true,
          duration:1000
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      })
    }else{
      wx.showToast({
        title: '种类不能为空',
        icon:"none",
        duration:1500
      })
    }
  }
})