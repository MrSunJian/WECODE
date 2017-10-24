// message.js
const config = require('../../utils/config');
var app = getApp()
var getData = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    messageId:0,
    userInfo: {},
    userMessage:'', 
    messageId:0,
    messageList:[],
    receiveUserId:'',
    userId:'',
    toView:'',
    type:'',
    typeId:'',
    orderId:'',
    tipMessage:'',
    show:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  sorry:function(){
    var orderId = this.data.orderId
    if(orderId==''){
      wx.showModal({
        title: '提示',
        content: '对方还未选择勾搭成功哦',
        showCancel:false
      })
    }else{
      wx.request({
        url: config.host +'/order/refuse',
        data: { orderId:orderId},
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success:function(e){
          console.log(e)
        }
      })
    }
  },
  message:function(e){
    this.setData({
      userMessage: e.detail.value
    })
  },
  sendMessage:function(){
    console.log(this.data.messageId)
    if (!this.data.userMessage.trim()) return;
    var _self = this, msg = this.data.userMessage, userId = this.data.userId, receiveUserId = this.data.receiveUserId;
    wx.request({
      url: config.host +'/Message/send',
      data: { 
        userId: userId, 
        receiveUserId: receiveUserId,
        info: msg ,
        type:1
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        if(e.data.status==1){
          console.log('发送成功')
          var t = _self.data.messageList, messageId = _self.data.messageId + 1;
          t.push({
            headImg: wx.getStorageSync('headImg'),
            info: msg,
            messageId: messageId,
            receiveUserId: receiveUserId,
            type: 1,
            userId: userId
          })
          _self.setData({
            messageList: t,
            userMessage:'',
            messageId: messageId
          })
          var toView = messageId
          wx.setStorage({
            key: userId + receiveUserId,
            data: _self.data.messageList,
            success:function(){
              setTimeout(function(){
                _self.setData({
                  toView: toView
                })
              },100)
            }
          })
          console.log(_self.data.messageId)
          console.log(_self.data.toView)
        }else{
          wx.showModal({
            title: '',
            content: '发送消息失败，请重试',
            showCancel:false
          })
        }
       
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  wanted:function(){
    var userId = this.data.userId, toUserId = this.data.receiveUserId,type=this.data.type,typeId=this.data.typeId,
    orderId=this.data.orderId
    if(orderId==''){
      wx.request({
        url: config.host +'/order/send',
        data:{
          userId: userId,
          toUserId: toUserId,
          type: type,
          typeId: typeId
        },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success:function(e){
          wx.showModal({
            title: '',
            content: '对方已收到你的勾搭，请静候佳音吧',
            showCancel:false
          })
        }
      })
    }else{
      wx.request({
        url: config.host +'/order/agree',
        data: { orderId: orderId },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success:function(e){
          console.log(e)
        }
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    console.log(this.data.messageId)
    wx.setNavigationBarTitle({
      title: options.receivename
    })
    var _self = this, userId = wx.getStorageSync('userId'), receiveUserId = options.receiveuserid, 
      receivename=options.receivename
    var storageInfo = wx.getStorageSync(userId + receiveUserId)
    console.log(storageInfo)
    console.log(receiveUserId)
    var num = storageInfo.length
    console.log(num)
    // var messageId = storageInfo[num-1].messageId
    // if (num>=0){
    //   // setTimeout(function(){
    //   _self.setData({  
    //       toView: storageInfo[num - 1].messageId,
    //     }) 
    //     console.log(_self.data.toView)
    //   // }, 10)
    // }
    _self.setData({
      // messageId: messageId,
      type:options.type,
      typeId:options.typeId,
      receiveUserId: receiveUserId,
      userId: userId,
      // messageList: storageInfo || []
    })
    console.log(_self.data.messageId)
    console.log(_self.data.toView)
    console.log('aaaa')
    wx.request({
      url: config.host + '/Message/get',
      data: { userId: userId, receiveUserId: receiveUserId, messageId: _self.data.messageId },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        if(e.data.data.orderInfo!==''){
          if (e.data.data.orderInfo.status==1){
            _self.setData({
              show:true,
              orderId: e.data.data.orderInfo.orderId,
              tipMessage:"对方已经选择勾搭成功了哦，尽快做出回应吧"
            })
          } else if (e.data.data.orderInfo.status == 3){
            _self.setData({
              show: true,
              orderId: e.data.data.orderInfo.orderId,
              tipMessage: "对方已经选择勾搭，尽快做出回应吧"
            })
          }
          
        }
        console.log(e.data.data.msgInfo)
        var num = e.data.data.msgInfo.length
        var t = _self.data.messageList
        console.log(t)
        if (num > 0) {
          for (var m = 0; m < num - 1; m++) {
            var messageData = e.data.data.msgInfo[m];
            t.push(messageData)
          }
          var toView = e.data.data.msgInfo[num - 1].messageId - 1
          _self.setData({
            messageList: t,
            messageId: e.data.data.msgInfo[num - 1].messageId,
            toView: toView
          })
          console.log(_self.data.toView)
          wx.setStorage({
            key: userId + receiveUserId,
            data: _self.data.messageList,
          })
        }

      },
      fail: function (e) {
        console.log(e)
      }
    })
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    
    
  },
  
  choosePic: function () {
    console.log(this.data.messageId)
    var _self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths, userId = _self.data.userId, 
          receiveUserId = _self.data.receiveUserId, messageId = _self.data.messageId;
        wx.uploadFile({
          url: config.host +'/Common/upload',
          filePath: tempFilePaths[0],
          name:'mesFile',
          formData:{
            name: 'mesFile',
            mesFile:'file'
          },
          success:function(e){
            console.log(e)
            var getData=JSON.parse(e.data)
            var tmpPath = getData.data.rawUrl_path
            console.log(getData)
            console.log(tmpPath)
            wx.request({
              url: config.host + '/Message/send',
              data: {
                userId: userId,
                receiveUserId: receiveUserId,
                info: tmpPath ,
                type: 2
              },
              header: { 'Content-Type': 'application/json' },
              method: 'POST',
              success: function (e) {
                console.log(e)
                if (e.data.status == 1) {
                  console.log('发送成功')
                  var t = _self.data.messageList, messageId = _self.data.messageId + 1;
                  console.log(tmpPath)
                  t.push({
                    headImg: wx.getStorageSync('headImg'),
                    info: tmpPath,
                    messageId: messageId,
                    receiveUserId:receiveUserId,
                    type: 2,
                    userId: userId
                  })
                  _self.setData({
                    messageList: t,
                    messageId: messageId
                  })
                  var toView = messageId
                  wx.setStorage({
                    key: userId + receiveUserId,
                    data: _self.data.messageList,
                    success: function () {
                      setTimeout(function () {
                        _self.setData({
                          toView: toView
                        })
                      }, 100)
                    }
                  })
                  console.log(_self.data.messageId)
                  console.log(_self.data.toView)
                } else {
                  wx.showModal({
                    title: '',
                    content: '发送消息失败，请重试',
                    showCancel: false
                  })
                }
              },
              fail: function (e) {
                console.log(e)
              }
            })
            console.log(_self.data.messageId)
          },
          fail:function(e){
            console.log(e)
          }
        })
        
        
        
        
      }
    })
    
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _self = this
    // var timer = setInterval(function () {
    //   var userId = _self.data.userId, receiveUserId = _self.data.receiveUserId, messageId = _self.data.messageId
    //   wx.request({
    //     url: config.host + '/Message/get',
    //     data: { userId: userId, receiveUserId: receiveUserId, messageId: messageId },
    //     header: { 'Content-Type': 'application/json' },
    //     method: 'POST',
    //     success: function (e) {
    //       console.log(e.data.data.length)
    //       var num = e.data.data.length
    //       var t = _self.data.messageList
    //       console.log(t)
    //       if (num > 0) {
    //         for (var m = 0; m < num - 1; m++) {
    //           var messageData = e.data.data[m];
    //           t.push(messageData)
    //         }
    //         var toView = e.data.data[num - 1].messageId - 1
    //         _self.setData({
    //           messageList: t,
    //           messageId: e.data.data[num - 1].messageId,
    //           toView: toView
    //         })
    //         console.log(_self.data.toView)
    //         wx.setStorage({
    //           key: userId + receiveUserId,
    //           data: _self.data.messageList,
    //         })
    //       }
    //     },
    //     fail: function (e) {
    //       console.log(e)
    //     }
    //   });
    // }, 100)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer)
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
    
    
   
    // getInfo();
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