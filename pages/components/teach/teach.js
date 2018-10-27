 var moment = require("../../../utils/moment.js")
var status = true;
var app = getApp();
Page({
  data: {
    list: {},
    // status: status
  },
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   // title: this.title
    // })
  },
  onLoad: function () {
    var app = getApp();
    var that = this
    // this.title = options.title
    // this.id = options.id
    wx.request({
      url: app.globalData.url + '/WebTrainingLesson/getLessonListForSamrtAPP',
      data: {
        orgId: app.globalData.orgId,
        lessonType: 0,
        currentPage: 1,
        rows: 20,
        isTime: 0,
        lessonId: 0,
        openid: app.globalData.openid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.status === 200) {
          for (let i = 0; i < res.data.data.dataItems.length; i++) {
            res.data.data.dataItems[i].lessonStartTime = moment(res.data.data.dataItems[i].lessonStartTime).format("YYYYMMDD HH:ss:mm")
            
            if (res.data.data.dataItems[i].isEnroll ===1){
              res.data.data.dataItems[i].isEnroll = ""
            }else{
              res.data.data.dataItems[i].isEnroll = "true"
            }
            
          }
          console.log(res.data.data)
          that.setData({
            list: res.data.data.dataItems
          })
        }
      }
    })
  },

//    toastShow: function (event) {
//     console.log("触发了点击事件，弹出toast")
//     // status = false
//     //  this.setData({ status: status　 })　
// 　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
//      wx.showToast({
//        title: '报名成功',
//        icon: 'success',
//        duration: 2000
//      });
//   },
    modalcnt: function (e) {
      var that = this;
      console.log(e.currentTarget.dataset.id)
      if (e.currentTarget.dataset.id){
        wx.request({
          url: app.globalData.url + '/WebTrainingLesson/getLessonDetail',
          data: {
            Id: e.currentTarget.dataset.id,
            orgId: app.globalData.orgId
          },
          headers: {
            'Content-Type': 'application/json'
          },
          success(res) {
            if (res.data.status === 200) {
              console.log(res.data)
              // that.setData({
              //   art: res.data.data,
              //   PPTurl: PPTurl
              // });
              wx.showModal({
                title: '提示',
                content: '立即报名参加：' + res.data.data.lessonName,
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: app.globalData.url + "/WebTrainingLesson/lessonEnrollForSamrtAPP",
                      data:{
                        lessonId: e.currentTarget.dataset.id,
                        openid: app.globalData.openid
                      },
                      method:"POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                        if (res.data.status === 200) {
                          console.log(res.data)
                        }else{
                          console.log(res.data)
                        }
                      },
                      fail: function (res) {
                      }
                    })

                    console.log('用户点击确定')
                    wx.showToast({
                      title: '报名成功',
                      icon: 'success',
                      duration: 2000
                    });

                    wx.navigateTo({
                      url: '../teach/teach'
                    })

                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              console.log(res.data);
            }
          }
        })
      }


  }  
})
