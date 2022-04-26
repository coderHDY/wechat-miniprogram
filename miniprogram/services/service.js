// 上传图片函数
export function upImg() {
  wx.chooseImage({
    success:(res)=> {
      const timestamp = new Date()
      const tempFilePath = res.tempFilePaths
      tempFilePath.forEach((item,index)=>{
        wx.cloud.uploadFile({
        cloudPath:'imgs/products/'+ (timestamp * 1) + index + '.jpg',
        filePath: item, // 文件路径
      }).then(res => {
        return res.fileID
      }).catch(error => {
      })
      })
    },
    fail:err=>{
      console.log(err)
    }
  })
}
//删除云端图片(id数组)
export function delImg(cloudIds){
  wx.cloud.deleteFile({
    fileList: cloudIds,
    success: res => {
      // console.log(res.fileList)
    },
    fail: console.error
  })
}
//格式化时间
export function formatDate(date, fmt) {
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str: padLeftZero(str));
    }
  }
  return fmt
};

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
