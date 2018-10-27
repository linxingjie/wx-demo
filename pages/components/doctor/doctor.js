//index.js
//获取应用实例

var app = getApp()
var utils = require('../../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    PageIndex : 1,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: app.globalData.url + '/Doctor/getDoctorList',
      data: {
        isRecom: true,
        orgId: app.globalData.orgId,
        PageIndex: that.data.PageIndex+1,
        PageSize: 10
      },

      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if(res.data.status === 200){
        for (var i = 0; i < res.data.data.dataItems.length; i++) {
          if (!res.data.data.dataItems[i].ICON_URL) {
            res.data.data.dataItems[i].ICON_URL = "http://cs.file.haiyizhilian.com/yfxx/default-doctor-index.png";
          } else if (res.data.data.dataItems[i].ICON_URL.indexOf("http://") > -1) {
            res.data.data.dataItems[i].ICON_URL = res.data.data.dataItems[i].ICON_URL;
          }
          else {
            res.data.data.dataItems[i].ICON_URL = app.globalData.fileUrl + result[2].doctorList.dataItems[i].ICON_URL;
          }
        }
        
        that.setData({
          loading: false,
          PageIndex: that.data.PageIndex + 1,
          list: that.data.list.concat([{ header: "第"+this.data.PageIndex+"页" }]).concat(res.data.data.dataItems)
        })
      }else {
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
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad() {
    let that = this
    wx.request({
      url: app.globalData.url + '/Doctor/getDoctorList',
      data:{
        isRecom: true,
        orgId: app.globalData.orgId,
        PageIndex: 1,
        PageSize: 10
      },

      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if(res.data.status === 200 ){
          for (var i = 0; i<res.data.data.dataItems.length;i++){
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
            // banner: res.data.top_stories,
            list: [{ header: "第1页" }].concat(res.data.data.dataItems),
            PageIndex: 1,
          })
        }



      }
    })
    this.index = 1
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  }
})
