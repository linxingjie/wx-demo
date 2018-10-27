var WxParse = require('../../wxParse/wxParse.js')
var moment = require('../../../utils/moment.js')
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
      url: app.globalData.url + '/Dept/getDeptByOrgIdWithToken',
      data: {
        token : "1",
        orgId: app.globalData.orgId,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          if(res.data.data[0].id){
            wx.request({
              url: app.globalData.url + '/Dept/getDeptById',
              data:{
                idstr: res.data.data[0].id,
                token : "1"
              },
              headers: {
                'Content-Type': 'application/json'
              },
              success(res){

                if(res.data.status === 200){
                  res.data.data.dataItems[0].CREATE_TIME= moment(res.data.data.dataItems[0].CREATE_TIME.time).format("YYYY-MM-DD");
                  WxParse.wxParse('body', 'html', res.data.data.dataItems[0].CONTENT_DETAILS, that, 5);
                  that.setData({
                    art: res.data.data.dataItems[0]
                  })
                }
              },
              fail(res){
                console.log("调用查询科室详情内容"+res.data.msg);
              }
            })
          }
        }
      },
      fail(res){
        console.log("调用查询科室id"+res.data.msg);
      }
    })
  }
})