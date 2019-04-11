var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    art: {},
    body: "",
    talks: []
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    });

    // // 评论弹出层动画创建
    // this.animation = wx.createAnimation({
    //   duration: 400, // 整个动画过程花费的时间，单位为毫秒
    //   timingFunction: "ease", // 动画的类型
    //   delay: 0 // 动画延迟参数
    // })

  },
  onLoad (options) {
    var that = this
    let app = getApp();
  
    wx.request({
      url: app.globalData.url + '/Doctor/getDoctorById',
      data : {
        str: options.USER_ID,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if(res.data.status === 200){
          console.log(res.data.status)
          WxParse.wxParse('details', 'html', res.data.data.doctorDetails, that, 5);
        }
    
         that.setData({
           art: res.data.data
         })
      }
    })
  }
  
})