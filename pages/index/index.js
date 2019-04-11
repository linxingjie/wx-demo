//index.js
//获取应用实例
var moment = require("../../utils/moment.js")
let userDao = require("../../utils/dao/userDao.js");

var app = getApp()
Page({
  data: {
    loading: true,
    page: 1,
    pages: 0,
    list: [],
    imgUrls: [
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-1.jpg',
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-2.jpg',
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navItems: [
      {
        name: '简介',
        url: 'abstract'
      },
      {
        name: '科室介绍',
        url: 'section',
        isSplot: true
      },
      {
        name: '名医荟萃',
        url: 'doctor'
      },
      {
        name: '线上课程',
        url: 'list'
      },
      {
        name: '线下课程预约',
        url: 'teach',
        isSplot: true
      },
      {
        name: '最新课程表',
        url: 'course'
      }
    ],
    id: "",
    openid: null,
    sesssion_key: null
  },
  onLoad: function () {

    this.getNewsList(1);
    this.getOpenId();

  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (this.data.page < this.data.pages) {
      this.getNewsList(this.data.page + 1)
    } else {
      this.setData({
        loading: false
      })

    }
  },

  getNewsList: function (pageNo) {//登录+获取token、 getMenusCascadeWithToken获取id、getAllNewsByOrgIdWithToken获取新闻数据
    var that = this;

    that.setData({
      loading: true
    });
    console.log(this.data.loading)

    userDao.AccountLogin().then((res) => {
      // console.log("TOKEN:"+res);
      let token = res;
      userDao.getMenusCascadeWithToken(token).then((data) => {
        // console.log("getMenusCascadeWithToken_id:"+ data);
        let getMenusCascadeWithToken_id = data;
        userDao.getAllNewsByOrgIdWithToken(token, getMenusCascadeWithToken_id, pageNo).then((data) => {
          console.log(data)
          for (let i of data.dataItems) {
            i.createTime = moment(i.createTime.time).format("YYYY-MM-DD")
          }
          that.setData({
            // banner: res.data.top_stories,
            list: this.data.list.concat(data.dataItems),
            page: pageNo,
            pages: data.totalItems / 10,
          })


        }).catch((err) => {
          console.log("msgData：" + err);
        });
      }).catch((err) => {
        console.log("getMenusCascadeWithToken_id" + err);
      })
    }).catch((err) => {
      console.log("loginErr:" + err);
    });
  },
  getOpenId: function () {
    var self = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("登录获取用户凭证：" + res.code);
          //发起网络请求
          wx.request({
            url: app.globalData.apiurl + '/SmartApp/getOpenidAndKey',
            data: {
              js_code: res.code,
            },
            method: "GET",
            success: function (res) {
              if (res.data.status === 200) {
                app.globalData.openid = res.data.data.openid;
                console.log("openid:" + res.data.data.openid)
              }
            },
            fail: function (res) {
              console.log("登录绑定" + res.errMsg)
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log("login():" + res.data)
      }
    });
  }


})
