var moment = require("../../../utils/moment.js")
var msgDao = require("../../../utils/dao/msgDao.js");
var status = true;
var app = getApp();
Page({
  data: {
    list: {},
    token1:"",
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
    });
  },
  onFormMsg() {
    var form_id = form_id
    var that = this;
  
  },
  modalcnt: function (e) {
      var that = this;
      console.log("点击请求的id："+e.detail.formId)
    var formId = e.detail.formId;
    console.log(e)
    console.log("点击获取的课程id："+e.detail.target.dataset.id)
    if (e.detail.target.dataset.id){
      wx.showModal({
        title: '提示',
        content: '立即报名参加：' + e.detail.target.dataset.id,
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.url + "/WebTrainingLesson/lessonEnrollForSamrtAPP",
              data: {
                lessonId: e.detail.target.dataset.id,
                openid: app.globalData.openid
              },
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                if (res.data.status === 200) {

                  wx.showToast({
                    title: '报名成功',
                    icon: 'success',
                    duration: 2000
                  });

                  msgDao.getAccess_token().then((res) => {
                    console.log("access_token" + res);
                    console.log("formId:" + formId)
                    if (res.access_token) {
                      msgDao.sendTemplateMessage(app.globalData.openid,res.access_token, formId).then((res) => {
                        console.log("msg:" + res);
                      })
                    }
                  });
                } else {
                  console.log("点击失败："+res.data.msg);
                }
              },
              fail: function (res) {
                console.log("请求失败："+ res)
              }
            })

            wx.navigateTo({
              url: '../teach/teach'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      }


  }  
})
