// components/new-info/new-info.js
import area from "../../assets/area"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:{
        name: "",
        phone: "",
        address: null,
        addressDetail: ""
      }
    }
  },

  data: {
    area: {},
    name: "",
    phone: "",
    address: null,
    addressDetail: "",
    showArea: false
  },

  //-----------------------组件的方法列表------------
  methods: {
    showCitys() {
      wx.hideKeyboard()
      this.setData({
        showArea: true
      })
    },
    hideCitys() {
      this.setData({
        showArea: false
      })
    },
    chooseCity(event) {
      this.setData({
        address: {
          province: event.detail.values[0],
          city: event.detail.values[1],
          area: event.detail.values[2]
        }
      })
      this.hideCitys()
    },
    initUserInfo(){
      this.setData({
        name: this.properties.userInfo.name,
        phone: this.properties.userInfo.phone,
        address:  this.properties.userInfo.address,
        addressDetail:  this.properties.userInfo.addressDetail,
      })
    },
    //输出用户输入的信息
    getInfo(){
      this.setData({
        lockUserInfo:{
          address:  this.data.address,
          addressDetail:  this.data.addressDetail,
          name: this.data.name,
          phone: this.data.phone,
        }
      })
      return this.data.lockUserInfo
    }
  },
  observers:{
    userInfo(newVal){
      if(JSON.stringify(newVal) !== "{}"){
        this.initUserInfo()
      }
    }
  },
  created(){
    this.setData({
      area: area,
    })
    this.initUserInfo()
  }
})
