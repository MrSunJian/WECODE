// pages/index/me.js
const config = require('../../utils/config');
var formatTime = require('../../utils/util').formatTime;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo:{},
    imgList: [],
    left:(150+35*3),
    state1:true,
    state2: false,
    state3: false,
    state4:false,
    list:[],

    tag1:"稳重",
    tag2:"踏实",
    tag3:"有上进心",
    tag4: "幽默",
    tag5: "帅气",
    tag6: "很有担当",
    age:"24",
    xingzuo:"狮子座",
    school:"北京联合大学",
    hobby:"吃喝玩乐",
    taste:"微辣",
    gzxingzhi:"程序猿",
    language:"含普",
    xingyong:"750",
    idNum:"已提供",
    pingjia:"这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多的代码，可以有更多的方法来实现，但是，冗余的代码不应该是前端编程里的主流思想。",
    fabu_data:{
      search:[ 
        {
          startTime:'2017-10-01',
          endTime:'2017-10-07',
          place:'成都',
          state:'寻找旅伴中...',
          comment:''
        },
        {
          startTime: '2017-11-01',
          endTime: '2017-11-07',
          place: '成都',
          state: '寻找旅伴中...',
          price:'500',
          comment: '这种方式，相对比较容易理解'
        }
      ],
      played:[
        {
        startTime:'2016-10-01',
        endTime:'2016-10-07',
        place: '云南丽江',
        star: '2',
        pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
        comment:'这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多'
        },
        {
          startTime: '2016-11-01',
          endTime: '2016-11-07',
          place: '云南丽江',
          star: '1',
          price:'500',
          pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
          comment: '这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多'
        },
        {
          startTime: '2016-10-01',
          endTime: '2016-10-07',
          place: '云南丽江',
          star: '2',
          pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
          comment: ''
        }
      ]
    },
    msg:{
      trip:[
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment:'2'
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: '3',
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: "1",
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: "",
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: "",
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: "4",
        },
        {
          tag: 0,
          name: "孙建",
          Idcard: "123456123456781234",
          price: "500",
          time: "2017-07-30",
          place: "杭州市",
          comment: "5",
        }
      ]
    }

  },
  level_up:function(){
    wx.navigateTo({
      url: 'regist',
    })
  },
  click_fabu:function(){
    this.setData({
      state1: true,
      state2: false,
      state3: false,
      state4: false,
    })
  },
  click_info: function () {
    this.setData({
      state1: false,
      state2: true,
      state3: false,
      state4: false,
    })
  },
  click_tuji: function () {
    this.setData({
      state1: false,
      state2: false,
      state3: true,
      state4: false,
    })
  },
  click_trip: function () {
    this.setData({
      state1: false,
      state2: false,
      state3: false,
      state4: true,
    })
  },
  goComment:function(e){
    wx.navigateTo({
      url: 'comment?touserid='+e.currentTarget.dataset.touserid,
    })
  },
  login:function(){
    wx.navigateTo({
      url: 'login',
    })
  },
  add: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      success: function (res) {
        for (var i = 0, n = res.tempFilePaths.length; i < n; i++) {
          var imgList = that.data.imgList, userId = wx.getStorageSync('userId'), tmpPath = res.tempFilePaths[i]
          console.log(tmpPath)
          wx.uploadFile({
            url: config.host + '/User/photo',
            name:'userPhoto',
            filePath: tmpPath,
            formData:{
              userId:userId,
              name: 'userPhoto'
            },
            success:function(e){
              console.log(e)
            },
          })
          
          imgList.unshift(res.tempFilePaths[i]);
          // console.log(res.tempFilePaths);
          that.setData({
            imgList: imgList
          })
        }
      },
    })
  },
  big_pic:function(e){
    var cur=e.target.dataset.src
    console.log(cur)
    wx.previewImage({
      current:cur,
      urls: this.data.imgList,
    })
  },
 
  // gotomessage:function(e){
  //   wx.navigateTo({
  //     url: 'message?name=' + e.currentTarget.dataset.name + "&id=" + e.currentTarget.dataset.id,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this, userId = wx.getStorageSync('userId')
    //加载图集
    wx.request({
      url: config.host +'/user/getPhotos',
      data: { userId: 4 },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (e) {
        console.log(e.data.data)
        for (var n = e.data.data.length, i = n; i >0; i--){
          var imgList = that.data.imgList
          imgList.unshift(e.data.data[i-1].path);
          // console.log(res.tempFilePaths);
          that.setData({
            imgList: imgList
          })
        }
      }
    })
    //加载个人信息
    wx.request({
      url: config.host + '/user/getInfo',
      data: { userId: 4 },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        that.setData({
          myInfo:e.data.data
        })
      }
    })
    //行程单
    wx.request({
      url: config.host +'/order/getList',
      data: { userId: 4 },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        Date.prototype.format = function (format) {
          var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
          }
          if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
          return format;
        },
        console.log(e)
        var list = e.data.data
  
        console.log(new Date(list[0].typeInfo.startTime).format('yyyy-MM-dd'))
        that.setData({
          list:list
        })
      }
    })
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