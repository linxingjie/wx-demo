import Promise from '../es6-promise.min.js';

function getApi(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      data: {},
      header: { 'Content-Type': 'application/json' },
      success(res) {
        resolve(res.data)
      },
      fail(e) {
        reject(e)
      }
    });
  });
};

function AccountLogin() {
  return new Promise(function (resolve, reject) {
    let app =getApp();
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
          resolve(res.data.data.token);
          // wx.setStorageSync('token', res.data.data.token)
        }else{
          console.log(res.data.msg)
        }
      },
      fail(e){
        reject(e)
      }
    });
  });
};

function getMenusCascadeWithToken(token){
  return new Promise(function (resolve, reject) {
    let app = getApp();
    wx.request({
      url: app.globalData.url + '/WebNavmenu/getMenusCascadeWithToken',
      data: {
        code: "news",
        orgId: app.globalData.orgId,
        token: token
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {

          console.log(res.data.data);
          resolve(res.data.data.id);
          // wx.setStorageSync('token', res.data.data.token)
        }else{
          console.log(res.data.msg)
        }
      },
      fail(e) {
        reject(e)
      }
    });
  });
};

function getAllNewsByOrgIdWithToken(token, getMenusCascadeWithToken_id, currentPage = 1, rows=10,status="all"){
  return new Promise(function (resolve, reject) {
    let app = getApp();
    wx.request({//根据id 获取新闻
      url: app.globalData.url + '/WebContext/getAllNewsByOrgIdWithToken',
      data: {
        classId: getMenusCascadeWithToken_id,
        orgId: app.globalData.orgId,
        currentPage: currentPage,
        rows: rows,
        status: status,
        token: token
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          console.log("msgData:"+ res.data.data);
          resolve(res.data.data);
        } else {
          console.log(res.data);
        }
      },
      fail(e) {
        reject(e)
      }
    })
  });
};


module.exports = {
  getApi: getApi,
  AccountLogin,
  getMenusCascadeWithToken,
  getAllNewsByOrgIdWithToken
}