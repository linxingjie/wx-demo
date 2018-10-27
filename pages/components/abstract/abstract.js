var WxParse = require('../../wxParse/wxParse.js')
let app = getApp();
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
    var that = this
    wx.request({
      url: app.globalData.url + '/Org/getOrganazationInfoByIdWithToken',
      data: {
        id: app.globalData.orgId,
        token: app.globalData.token
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          // body = res.data.data[0].description;
          // res.data.data[0].description = app.convertHtmlToText(body)
          WxParse.wxParse('body', 'html', res.data.data.details, that, 5);
          // console.log(res.data.data[0].description)
          that.setData({
            art: res.data.data
          })
        }
      }
    })
  }
})