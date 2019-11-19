//初始化数据库
const db = wx.cloud.database()
const _ = db.command

let app = getApp();

Page({
    data: {
        files: [],
        fileIDs:[]
    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            count:9,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files[0] // 需要预览的图片http链接列表
        })
    },

  //上传图片到云存储  
  uploadFile() {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];//pages.length就是该集合长度 -1就是最后一个活动的页面，也就是当前页面。 -2就是上一个活动的页面，也即是跳过来的页面
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推
    var group_name = prePage.data.formData.group_name.value//取上页data里的数据也可以修改
    console.log("上一个页面的值", prePage.data.formData)
    console.log("group_name", group_name)
    console.log("formData", prePage.data.formData)
  
    const promiseArr=[]
    for (let i=0;i<this.data.files.length;i++){
      let filePath=this.data.files[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名

      promiseArr.push(new Promise((reslove,reject)=>{
        wx.cloud.uploadFile({
          cloudPath: "groupdata/" + group_name + "/" + app.getNowFormatDate() + "-"+ i+suffix,
          filePath:filePath
        }).then(res=>{
          console.log("授权文件上传成功")          
        })
        reslove()
      }).catch(err=>{
        console.log("授权文件上传失败",err)
      }))
    }
    
    // Promise.all(promiseArr).then(res => {
    //   db.collection('groupdata').add({
    //     data: {
    //       fileIDs: this.data.fileIDs //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
    //     }
    //   })
    //     .then(res => {
    //       console.log(res)
    //       wx.hideLoading()
    //       wx.showToast({
    //         title: '提交成功',
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }),
    

    wx.navigateBack({
      url:"pages/index/index"
    })
  },
  
})