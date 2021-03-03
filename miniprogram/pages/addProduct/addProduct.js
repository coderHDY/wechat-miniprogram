
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    price: 100,
    description: "",
    fileSmall: [],
    fileList: [],
    types: [],
    currentType: 0
  },
  onSwitchChange(event){
    this.setData({
      currentType:event.detail
    })
  },
  getTypes(){
    wx.cloud.database().collection("types").get().then(res=>{
      const types=[]
      res.data.forEach((item,index)=>{
        types.push({
          text:item.type,
          value:index
        })
      })
      this.setData({
        types
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  afterReadSmall(event) {
    const {
      file
    } = event.detail;
    const timestamp = new Date() * 1
    const path = 'imgs/products/' + timestamp + (file.url).slice(-8)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.cloud.uploadFile({
      cloudPath: path, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      }
    }).then(res => {
      // 上传完成需要更新 fileSmall
      const fileSmall = this.data.fileSmall;
      fileSmall.push({
        file,
        url: res.fileID
      });
      this.setData({
        fileSmall
      });
    }).catch(err => {
      console.log(err)
    })
  },
  delImgSmall(event) {
    console.log("event:")
    console.log(event)
    wx.cloud.deleteFile({
      fileList: [event.detail.file.url]
    }).then(() => {
      const fileSmall = this.data.fileSmall
      fileSmall.splice(event.detail.index, 1)
      this.setData({
        fileSmall
      })
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    const timestamp = new Date() * 1
    const path = 'imgs/products/' + timestamp + (file.url).slice(-8)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.cloud.uploadFile({
      cloudPath: path, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      }
    }).then(res => {
      // 上传完成需要更新 fileList
      const fileList = this.data.fileList;
      fileList.push({
        file,
        url: res.fileID
      });
      this.setData({
        fileList
      });
    }).catch(err => {
      console.log(err)
    })
  },
  delImg(event) {
    console.log("event:")
    console.log(event)
    wx.cloud.deleteFile({
      fileList: [event.detail.file.url]
    }).then(() => {
      const fileList = this.data.fileList
      fileList.splice(event.detail.index, 1)
      this.setData({
        fileList
      })
    })
  },
  addProduct() {
    const products = wx.cloud.database().collection("products")
    const type=this.data.types[this.data.currentType].text
    products.add({
      data: {
        type: type,
        name: this.data.name,
        price: this.data.price,
        description: this.data.description,
        smallImg: this.data.fileSmall[0],
        banners: this.data.fileList,
        update: new Date() * 1
      }
    }).then(res => {
      wx.showToast({
        title: '添加商品成功',
        duration: 2000
      })
      this.setData({
        name: '',
        price: 100,
        description: "",
        fileSmall: [],
        fileList: [],
        currentType: 0
      })
    })
  },
  onShow(){
    this.getTypes()
  }
})