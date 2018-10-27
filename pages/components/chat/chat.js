let app = getApp()
Page({
  data: {
    focus: false,
    resText: "", 
    switchName:""
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    let { resText, switchName } = e.detail.value;
    if (resText){
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      resText,
      switchName
    })
  }
  
})
