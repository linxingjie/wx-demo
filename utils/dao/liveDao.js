import Promise from '../es6-promise.min.js';

function getLiveList() {
  return new Promise(function (resolve, reject) {
    let app = getApp();
    wx.request({
      url: app.globalData.apiurl + '/tool/Live/getLiveList',
      data: {},
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.status === 200) {
          console.log(res.data.data)
          resolve(res.data.data);
          // wx.setStorageSync('token', res.data.data.token)
        } else {
          console.log(res.data.msg)
          reject(res.data.msg)
        }
      },
      fail(e) {
        reject(e)
      }
    });
  });
};







module.exports = {
  getLiveList

}