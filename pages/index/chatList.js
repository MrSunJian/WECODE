// chatList.js
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    hidden: true,
    messageList:[],
    // toast1Hidden: true,
    // toastText: "",
    
  },
  changeInput:function(){
   
  },
  // toast1Change: function () {
  //   this.setData({
  //     toast1Hidden: true
  //   })
  // },
  refesh:function(){
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  goChatroom:function(e){
    console.log(e)
    var _self = this,newlist = _self.data.messageList,index = e.currentTarget.dataset.index
    // console.log(e)
    newlist[index].readCount = 0;
    _self.setData({
      messageList: newlist
    })
    // console.log(e.currentTarget.dataset.index)
    // console.log(e.target.dataset.name)
   
    wx.navigateTo({
      url: 'message?receiveuserid=' + e.currentTarget.dataset.receiveuserid + '&&receivename=' + e.currentTarget.dataset.receivename + '&&messageid=' + e.currentTarget.dataset.messageid,
    })
  },
  // toast1Change: function () {
  //   this.setData({
  //     toast1Hidden: true
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this, userId = wx.getStorageSync('userId')
    console.log(userId)
    if(userId==''){
      wx.redirectTo({
        url: 'login',
      })
    }else{
      wx.request({
        url: config.host + '/Message/getList',
        data: { userId: userId },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success: function (e) {
          console.log(e)
          _self.setData({
            messageList: e.data.data
          })
          console.log(_self.data.messageList[1].receiveUserHeadImg)
          console.log(_self.data.messageList[1].receiveUserId)
        },
        fail:function(e){
          console.log(e)
        }
      })
    }
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
    console.log("hide")
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
    wx.showLoading({
      title: '正在刷新...',
    })
    var _self = this, userId = wx.getStorageSync('userId')
    console.log(userId)
    if (userId == '') {
      wx.redirectTo({
        url: 'login',
      })
    } else {
      wx.request({
        url: config.host + '/Message/getList',
        data: { userId: userId },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success: function (e) {
          console.log(e)
          _self.setData({
            messageList: e.data.data
          })
          console.log(_self.data.messageList[1].receiveUserHeadImg)
          console.log(_self.data.messageList[1].receiveUserId)
        },
        fail: function (e) {
          console.log(e)
        },
        complete:function(){
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})