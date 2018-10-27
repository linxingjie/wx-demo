var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    art: {},
    PPTurl : ""
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: ''
    })
  },
  onLoad (options) {
    var that = this
    let app = getApp();
    this.id = options.id
  
    wx.request({
      url: app.globalData.url + '/WebTrainingLesson/getLessonDetail',
      data : {
        Id: options.id,
        orgId: app.globalData.orgId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if(res.data.status === 200){
          console.log(res.data)
          WxParse.wxParse('details', 'html', res.data.data.lessonIntroduction, that, 5);
          var PPTurl = '';
          if (res.data.data.fileList !== [] && res.data.data.fileList.length >0){
            PPTurl ="https"+ res.data.data.fileList[0].path.slice(4);
            // console.log(PPTurl)
          }
          that.setData({
            art: res.data.data,
            PPTurl: PPTurl
          })
        }
    

      }
    })
  },
  bindPPT: function () {

      wx.showToast({
      title: '加载中，请稍候',
      icon: 'loading',
      duration: 2000
      });

    wx.downloadFile({
      // url: 'https://cynthianc.github.io/images/123.pdf',
      url: this.data.PPTurl,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
            console.log(res)
          },
          fail: function (res) {
            console.log('fail')
            console.log(res)
          },
          complete: function (res) {
            console.log('complete')
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log('fail')
        console.log(res)
      },
      complete: function (res) {
        console.log('complete')
        console.log(res)
      }
    })
  },
  modalcnt: function () {
    wx.showModal({
      title: '提示',
      content: '是否预约报名',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }  

})