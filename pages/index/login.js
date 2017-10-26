// login.js
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PhoneNum:'',
    pwd:''
  },
  forget:function(){
    wx.navigateTo({
      url: 'reset1',
    })
  },
  regist:function(){
    wx.navigateTo({
      url: 'regist',
    })
  },
  PhoneNum:function(e){
    this.setData({
      PhoneNum:e.detail.value
    })
  },
  pwd:function(e){
    this.setData({
      pwd: e.detail.value
    })
  },
  login:function(){
    var PhoneNum = this.data.PhoneNum, pwd = this.data.pwd
    wx.request({
      url: config.host +'/Login/login',
      data: { mobile: PhoneNum,password:pwd },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        var userId = e.data.data.userId
        if(e.data.status==1){
          wx.setStorage({
            key:"userId",
            data: userId
          })
         
        }else{
          wx.showModal({
            title: '',
            content: '您输入的账号密码不一致，请重新输入',
            showCancel:false
          })
        }
      },
      fail:function(e){
        console.log(e)
      },
      complete:function(){
        wx.reLaunch({
          url: 'index',
        })
      }
    })
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