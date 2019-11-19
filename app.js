//app.js
App({
  onLaunch: function () {
    
    //云开发初始化
    if (!wx.cloud) {
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env: "lycmcc-3l7kt",
        traceUser: true,
      })
    }
  },

  globalData: {
    userInfo: null,
    contact_name:''
  },

  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+
      " " + date.getHours() + seperator1 + date.getMinutes() + seperator1+ date.getSeconds();

    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    //   " " + date.getHours() + seperator2 + date.getMinutes() +
    //   seperator2 + date.getSeconds();
    return currentdate;
  },


})