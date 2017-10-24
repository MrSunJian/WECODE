// resset1.js
const config = require('../../utils/config');
function countdown(that) {

  var second = that.data.count
  if (second == 0) {
    that.setData({
      count: "获取验证码",
      getCheck: false
    })
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      count: second - 1
    });
    countdown(that);
  }, 1000)
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: '获取验证码',
    getCheck: false,
    phoneNum:'',
    code:'',
    secret:'',
    confirmSecret:'',

  },
  phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCheckcode: function () {
    var phoneNum = this.data.phoneNum
    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
    if (reg.test(phoneNum)) {
      this.setData({
        count: 60,
        getCheck: true
      })
      countdown(this);
      wx.request({
        url: config.host + '/Login/code',
        data: { mobile: phoneNum },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (e) {
          console.log(e)
        }
      })
    } else {
      wx.showToast({
        title: '请填写正确的手机号！',
        icon: 'success'
      })
    }
  },
  code:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  secret: function (e) {
    this.setData({
      secret: e.detail.value
    })
  },
  confirm: function (e) {
    this.setData({
      confirmSecret: e.detail.value
    })
  },
  reset2:function(){
    var s1 = this.data.secret, s2 = this.data.confirmSecret, mobile = this.data.phoneNum, code = this.data.code
    if (s1 == s2) {
      wx.request({
        url: config.host +'/Login/resetPwd',
        data: { mobile:mobile,code:code,password:s1},
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (e) {
          if(e.data.status==0){
            wx.showModal({
              title: '错误',
              content: e.data.msg,
              showCancel: false,
            })
          } else if (e.data.status == 1){
            wx.showModal({
              title: '成功',
              content: '密码修改成功，请登录',
              showCancel: false,
            }),
            wx.navigateBack({
              delta: 1
            })
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
    } else {
      wx.showModal({
        title: '错误',
        content: '两次输入的密码不一致，请重新输入',
        showCancel: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})