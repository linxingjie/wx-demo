var app = getApp()
Page({
  data: {
    list: [],
    currentPage: 1
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: app.globalData.url + '/WebTrainingLesson/getLessonListForSamrtAPP',
      data: {
        orgId: app.globalData.orgId,
        lessonType: 0,
        currentPage: this.data.currentPage + 1,
        rows: 10,
        isTime: 0,
        lessonId: 0,
      },

      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          for (var i = 0; i < res.data.data.dataItems.length; i++) {
            if (!res.data.data.dataItems[i].ICON_URL) {
              res.data.data.dataItems[i].ICON_URL = "../../../images/doctor/default-doctor.png";
            } else if (res.data.data.dataItems[i].ICON_URL.indexOf("http://") > -1) {
              res.data.data.dataItems[i].ICON_URL = res.data.data.dataItems[i].ICON_URL;
            }
            else {
              res.data.data.dataItems[i].ICON_URL = app.globalData.fileUrl + result[2].doctorList.dataItems[i].ICON_URL;
            }
          }

          that.setData({
            loading: false,
            currentPage: that.data.currrentPage + 1,
            list: that.data.list.concat([{ header: "第" + this.data.PageIndex + "页" }]).concat(res.data.data.dataItems)
          })
        } else {

          wx.showToast({
            title: '没有更多了',
            icon: 'loading',
            duration: 1000
          });

          that.setData({
            loading: false,
          })
        }

      }
    })
  },
  onLoad: function () {
    var app = getApp();
    var that = this
    wx.request({
      url: app.globalData.url + '/WebTrainingLesson/getLessonListForSamrtAPP',
      data: {
        orgId: app.globalData.orgId,
        lessonType: 0,
        currentPage: 1,
        rows: 10,
        isTime: 0,
        lessonId: 0,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.status === 200) {
          console.log(res.data.data)
          that.setData({
            list: res.data.data.dataItems
          })
        }

      }
    })
  }
})