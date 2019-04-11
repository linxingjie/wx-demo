var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    art: {},
    body: "",
  },
  onReady() {
    // wx.setNavigationBarTitle({
    //   title: '详情页面'
    // })
  },
  onLoad(options) {
    let app = getApp();

    var that = this
    wx.request({
      url: app.globalData.url + '/WebIndexMCenter/getWebIndexMCenter',
      data: {
        orgId: app.globalData.orgId,

      },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          // body = res.data.data[0].description;
          // // res.data.data[0].description = app.convertHtmlToText(body)\\
          var url = '';
          if (res.data.data[0].description){
             url = "<img src=' " + res.data.data[0].description + "'/>"
          }
          
          WxParse.wxParse('body', 'html', url, that, 5);
          // console.log(res.data.data[0].description)
          that.setData({
            art: res.data.data[0]
          })
        }
      }
    })
  }
})