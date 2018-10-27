//index.js
//获取应用实例
var moment = require("../../utils/moment.js")
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-1.jpg',
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-2.jpg',
      'http://cs.file.haiyizhilian.com/yfxx/yfxx-3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navItems:[
      {
        name:'孕妇学校简介',
        url:'abstract'
      },
      {
        name:'科室介绍',
        url:'section',
        isSplot:true
      },
      {
        name:'名医荟萃',
        url:'doctor'
      },
      {
        name:'线上课程',
        url:'list'
      },
      {
        name:'线下课程预约',
        url:'teach',
        isSplot: true
      },
      {
        name: '最新课程表',
        url: 'course'
      }
    ],
    id :"",
    currentPage: 1,
    openid:null,
    sesssion_key:null
  },
  onLoad: function () {

      this.getNewsList();
      this.getOpenId();

  },
  getNewsList:function(){
    var that = this
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
          // wx.setStorageSync('token', res.data.data.token)
          wx.request({//调用获取新闻 id
            url: app.globalData.url + '/WebNavmenu/getMenusCascadeWithToken',
            data: {
              code: "news",
              orgId: app.globalData.orgId,
              token: getToken
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success(res) {
              if (res.data.status === 200) {
                that.setData({
                  id: res.data.data.id
                })

                wx.request({//根据id 获取新闻
                  url: app.globalData.url + '/WebContext/getAllNewsByOrgIdWithToken',
                  data: {
                    classId: res.data.data.id,
                    orgId: app.globalData.orgId,
                    currentPage: 1,
                    rows: 10,
                    status: "all",
                    token: getToken
                  },

                  headers: {
                    'Content-Type': 'application/json'
                  },
                  success(res) {
                    if (res.data.status === 200) {
                      for (let i = 0; i < res.data.data.dataItems.length; i++) {
                        res.data.data.dataItems[i].createTime = moment(res.data.data.dataItems[i].createTime.time).format("YYYY-MM-DD")
                      }
                      that.setData({
                        // banner: res.data.top_stories,
                        list: [{ header: "活动分享" }].concat(res.data.data.dataItems),
                        currentPage: 1,
                      })
                    } else {
                      console.log(res.data);
                    }
                  }
                })

              } else {
                console.log(res)
              }
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      }
    });
  },
  loadMore(e) {
    // if (this.data.list.length === 0) return
    var that = this
    that.setData({ loading: true })

    if(app.globalData.token === null){
      wx.request({
        url: that.globalData.url + '/Account/login',
        data: {
          userName: 'wangxiaoyu',
          userPwd: '123456',
          orgId: that.globalData.orgId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          if (res.data.status === 200) {
          app.globalData.token = res.data.data.token;
            wx.request({
              url: app.globalData.url + '/WebContext/getAllNewsByOrgIdWithToken',
              data: {
                classId: that.data.id,
                orgId: app.globalData.orgId,
                currentPage: that.data.currentPage + 1,
                rows: 10,
                status: "all",
                token: res.data.data.token
              },

              headers: {
                'Content-Type': 'application/json'
              },
              success(res) {
                if (res.data.status === 200) {

                  for (let i = 0; i < res.data.data.dataItems.length; i++) {
                    res.data.data.dataItems[i].createTime = moment(res.data.data.dataItems[i].createTime.time).format("YYYY-MM-DD")
                  }

              that.setData({
                    loading: false,
                    currentPage: that.data.currentPage + 1,
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
          }
        },
        fail(res) {
          console.log(res);
        }
      })

    }else{
      wx.request({
        url: app.globalData.url + '/WebContext/getAllNewsByOrgIdWithToken',
        data: {
          classId: that.data.id,
          orgId: app.globalData.orgId,
          currentPage: that.data.currentPage + 1,
          rows: 10,
          status: "all",
          token: app.globalData.token
        },

        headers: {
          'Content-Type': 'application/json'
        },
        success(res) {
          if (res.data.status === 200) {

            for (let i = 0; i < res.data.data.dataItems.length; i++) {
              res.data.data.dataItems[i].createTime = moment(res.data.data.dataItems[i].createTime.time).format("YYYY-MM-DD")
            }

            that.setData({
              loading: false,
              currentPage: that.data.currentPage + 1,
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
    }
  },
  getOpenId:function(){
    var self = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("登录获取用户凭证：" + res.code);
          //发起网络请求
          wx.request({
            url: app.globalData.apiurl+'/SmartApp/getOpenidAndKey',
            data: {
              js_code: res.code,
            },
            method:"GET",
            success: function (res) {
              if (res.data.status === 200) {
                app.globalData.openid =res.data.data.openid;
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
