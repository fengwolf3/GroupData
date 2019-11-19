//index.js
//获取应用实例
const app = getApp()
var wxValidate = require('../../assets/js/wxValidate.js').wxValidate;

Page({
  data: {
    flowProcessList: ["预约登记", "单位授权认证", "客户经理确认", "实施办理","结果反馈"],
    index:'',
    arrayGsd: ['新罗', '漳平', '永定', '上杭', '武平', '长汀', '连城'],
    arrayTc: ['套餐一', '套餐二', '套餐三'],
    home_county:'',
    formData: {
      home_county: {
        value: "",
        error: false,
        tips: ""
      },
      group_name: {
        value: "",
        error: false,
        tips: ""
      },
      contact_name: {
        value: "",
        error: false,
        tips: ""
      },
      phone: {
        value: "",
        error: false,
        tips: ""
      },
      product_name: {
        value: "",
        error: false,
        tips: ""
      },
      fileUpload: {
        value: "",
        error: false,
        tips: ""
      },
      word: {
        value: "",
        error: false,
        tips: ""
      }
    },
    formStatus: {
      submitting: false
    }
  },

  onLoad: function (options) {
    this.wxValidate = new wxValidate({
      //定义规则，必填项和正则判断规则
      rules: {
        home_county: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        group_name: {
          required: true,
          minlength: 2,
          maxlength: 30
        },
        contact_name: {
          required: false,
          minlength:0,
          maxlength: 10
        },
        phone: {
          required: true,
          mobile: true
        },
        product_name: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        fileUpload: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        word: {
          required: false,
          minlength: 0,
          maxlength: 120
        }
      },
      tips: {
        home_county: {
          required: "必填",
          minlength: "输入2~10个字符",
          maxlength: "输入2~10个字符"
        },
        group_name: {
          required: "必填",
          minlength: "输入2~10个字符",
          maxlength: "输入2~10个字符"
        },        
        phone: {
          required: "必填",
          mobile: "无效的手机号"
        },
        product_name: {
          required: "必填",
          minlength: "输入2~10个字符",
          maxlength: "输入2~10个字符"
        },
        fileUpload:{
          required: "必填",
          minlength: "输入2~10个字符",
          maxlength: "输入2~10个字符"
        }
      }
    });
  },

  // 表单数据绑定
  updateFormData: function (e) {
    var name = e.target.dataset.name,
      value = e.detail.value,
      key = "formData." + name + ".value",
      opts = {};
    opts[key] = value;
    this.setData(opts);
  },
  // 更新表单验证结果
  updateErrorData: function (errorData) {
    var key = "formData." + errorData.name,
      opts = {};

    opts[key + '.value'] = errorData.value;
    opts[key + '.error'] = !errorData.valid; // error === !valid
    opts[key + '.tips'] = errorData.tips;

    this.setData(opts);
  },
  // 表单验证
  formCheck: function (e) {
    var minlength = '';
    var maxlength = '';
    var result = this.wxValidate.formCheck(e);
    this.updateErrorData(result);
  },

  // 表单提交
  formSubmit: function (e) {
    var minlength = '';
    var maxlength = '';
    console.log("表单内容",e)
    var that = this;
    var formData = e.detail.value;
    var result = this.wxValidate.formCheckAll(formData);
    
    
    console.log("表单提交formData", formData);
    console.log("表单提交result", result)
    wx.showLoading({
      title: '发布中...',
    })
    wx.cloud.callFunction({
      name:'formsubmit',
      data: {
        time: getApp().getNowFormatDate(),
        home_county: this.data.formData.home_county,
        group_name: formData.group_name,
        contact_name: formData.contact_name,
        msisdn: formData.msisdn,
        product_name: this.data.formData.product_name,
        word: formData.word,
      },
      success: res => {
        wx.hideLoading()
        console.log('发布成功', res)
      }
    })
    // const db = wx.cloud.database()
    // db.collection('groupdata').add({
    //   data: {
    //     time: getApp().getNowFormatDate(),
    //     home_county: this.data.formData.home_county,
    //     group_name: formData.group_name,
    //     contact_name: formData.contact_name,
    //     msisdn: formData.msisdn,
    //     product_name: this.data.formData.product_name,
    //     word: formData.word,
    //   },
    //   success: res => {
    //     wx.hideLoading()
    //     console.log('发布成功', res)

    //   },
    //   fail: err => {
    //     wx.hideLoading()
    //     wx.showToast({
    //       icon: 'none',
    //       title: '网络不给力....'
    //     })
    //     console.error('发布失败', err)
    //   }
    // })

  },
  wxValidate: null  ,

  bindPickerGsd: function (e) {    
    console.log('归属地已选择，携带值为', e.detail.value)
    console.log('归属地选择:', this.data.arrayGsd[e.detail.value])    
    this.setData({
      indexGsd: e.detail.value     
    })   
    this.data.formData.home_county = this.data.arrayGsd[e.detail.value]
  },

  bindPickerTc: function (e) {
    this.setData({
      indextc: e.detail.value
    })
    this.data.formData.product_name = this.data.arrayTc[e.detail.value]
  },

  openSuccess: function () {
    console.log("msg_success被调用")
    wx.navigateTo({
      url: '/pages/msg_success/msg_success'
    })
  },

  uploader(e){
    console.log("上传文件",e)
    wx.navigateTo({
      url: '/pages/uploader/uploader'
    })
  }
})
