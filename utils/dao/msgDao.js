import Promise from '../es6-promise.min.js';

function getApi(url){
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
function getAccess_token(){
  return new Promise(function (resolve, reject) {
  wx.request({
    url:"https://api.weixin.qq.com/cgi-bin/token" ,
    data: {
      grant_type:"client_credential",
      appid: "wx71e309c371ada475",
      secret: "fbcb27efcb309ab2dc6217108c396ba6",
    },
    method:"GET",
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      console.log(res.data)
      resolve(res.data)
    },
    fail(e) {
      reject(e)
    }
  });
});
};

function sendTemplateMessage(openId,access_token, form_id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      "url": "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + access_token,
      data:{
        "touser": openId,
        "template_id": "Z8yMs9CsH4y0ap7mAWU9Dur_c9_jGS6tcfUNAEbs1dE",
        "page": "pages/index/index",
        "form_id": form_id,
        "data": {
          "keyword1": {
            "value": "339208499"
          },
          "keyword2": {
            "value": "广州市海珠区新港中路397号"
          },
          "keyword3": {
            "value": "腾讯微信总部"
          },
          "keyword4": {
            "value": "2015年01月05日 12:30"
          }
        },
        "emphasis_keyword": "keyword1.DATA",
      },
      method: "POST",
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        resolve(res.data)
      },
      fail(e) {
        reject(e)
      }
    });
  });
};

export const request = (method = 'GET') => (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    });
  })
}
export const get = request('GET');
export const post = request('POST');
module.exports = {
  getApi: getApi,
  getAccess_token:getAccess_token,
  sendTemplateMessage: sendTemplateMessage,

}