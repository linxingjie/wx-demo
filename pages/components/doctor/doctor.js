//index.js
//获取应用实例

var app = getApp()
var utils = require('../../../utils/util.js')
Page({
  data: {
    list: [],
    total:"",

    loading: true,
    page: 1,
    pages: 0,


    duration: 2000,
    PageIndex : 1,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,


    inputShowed: false,
    inputVal: ""
  },
  //事件处理函数
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  errorFunction: function (event) {
    console.log(event)
    var index = event.currentTarget.dataset.index
    var img = 'list[' + index + '].ICON_URL'
    this.setData({
      [img]: 'http://cs.file.haiyizhilian.com/yfxx/default-doctor-index.png'
    })  
  },

  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },

  onLoad() {
    this.getDoctorList(1);
  },
  getDoctorList: function (pageNo) {
    let that = this
    wx.request({
      url: app.globalData.url + '/Doctor/getDoctorList',
      data: {
        isRecom: true,
        orgId: app.globalData.orgId,
        PageIndex: pageNo,
        PageSize: 10
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
              res.data.data.dataItems[i].ICON_URL = app.globalData.fileUrl + res.data.data.dataItems[i].ICON_URL;
            }
          }

          that.setData({
            // banner: res.data.top_stories,
            list: that.data.list.concat(res.data.data.dataItems),
            total: res.data.data.totalItems,
            page: pageNo,
            pages: res.data.data.totalItems / 10,
          })
        }

      }
    })
  }
})
