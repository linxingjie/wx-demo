Page({
  data: {
    list: {}
  },
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   title: this.title
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
        openid :app.globalData.openid
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
