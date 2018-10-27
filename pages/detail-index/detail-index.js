var WxParse = require('../wxParse/wxParse.js')
var moment = require("../../utils/moment.js")
Page({
  data: {
    art: {},
    body: "",
    PPTurl : ""
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '新闻详情'
    })
  },
  onLoad (options) { 
    var that = this
    let app = getApp();
    this.id = options.id
    if (app.globalData.token === null){
      wx.request({
        url: app.globalData.url + '/Account/login',
        data: {
          userName: 'wangxiaoyu',
          userPwd: '123456',
          orgId: app.globalData.orgId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          if (res.data.status === 200) {
            var getToken = res.data.data.token;
            app.globalData.token = res.data.data.token;
            console.log(res.data.data.token)
            wx.request({
              url: app.globalData.url + '/WebContext/getWebContextByIdWithToken',
              data: {
                Id: options.id,
                orgId: app.globalData.orgId,
                token: res.data.data.token
              },
              headers: {
                'Content-Type': 'application/json'
              },
              success(res) {
                if (res.data.status === 200) {
                  res.data.data[0].createTime = moment(res.data.data[0].createTime.time).format("YYYY-MM-DD")
                  WxParse.wxParse('details', 'html', res.data.data[0].details, that, 5);
                  that.setData({
                    art: res.data.data[0],
                    // PPTurl: PPTurl
                  })
                }
              }
            })
          }
        }
      })

    }else{
      wx.request({
        url: app.globalData.url + '/WebContext/getWebContextByIdWithToken',
        data: {
          Id: options.id,
          orgId: app.globalData.orgId,
          token: app.globalData.token
        },
        headers: {
          'Content-Type': 'application/json'
        },
        success(res) {
          if (res.data.status === 200) {

            res.data.data[0].createTime = moment(res.data.data[0].createTime.time).format("YYYY-MM-DD")

            WxParse.wxParse('details', 'html', res.data.data[0].details, that, 5);
            that.setData({
              art: res.data.data[0],
            })
          }
        }
      })
    }
  }

})