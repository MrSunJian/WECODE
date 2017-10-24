// pages
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: (150 + 35 * 3),
    state1: true,
    state2: false,
    state3: false,
    imgList:[],
    myInfo: {},
    userId:'',
    myId:'',
    typeId:'',
    type:'',
    zan:false,

    name: "孙建",
    sex: "男",
    level: "v4",
    num_zan: "324651",
    place: "宣城",
    tag1: "稳重",
    tag2: "踏实",
    tag3: "有上进心",
    tag4: "幽默",
    tag5: "帅气",
    tag6: "很有担当",
    age: "24",
    xingzuo: "狮子座",
    school: "北京联合大学",
    hobby: "吃喝玩乐",
    taste: "微辣",
    gzxingzhi: "程序猿",
    language: "含普",
    xingyong: "750",
    idNum: "已提供",
    pingjia: "这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多的代码，可以有更多的方法来实现，但是，冗余的代码不应该是前端编程里的主流思想。",
    fabu_data: {
      search: {
        startTime: '2017-10-01',
        endTime: '2017-10-07',
        place: '成都',
        state: '寻找旅伴中...'
      },
      played: [
        {
          startTime: '2016-10-01',
          endTime: '2016-10-07',
          place: '云南丽江',
          star: '2',
          pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
          comment: '这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多'
        },
        {
          startTime: '2016-10-01',
          endTime: '2016-10-07',
          place: '云南丽江',
          star: '2',
          pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
          comment: '这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多'
        },
        {
          startTime: '2016-10-01',
          endTime: '2016-10-07',
          place: '云南丽江',
          star: '2',
          pic: ['../../pic/bgpic.png', '../../pic/bgpic.png', '../../pic/bgpic.png'],
          comment: '这种方式，相对比较容易理解，实现起来相对也更可控一点。但是这个方法在实现代码上会花更多的时间。用更多'
        }
      ]
    }

  },
  perfect:function(){
    console.log("aaaaa")
    var _that=this
    wx.request({
      url: config.host +'/User/praise',
      data:{
        userId: _that.data.myId,
        toUserId: _that.data.userId
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        console.log(e)
        if(e.data.status==1&&e.data.msg!=="您已经点过赞"){
          var praise=_that.data.myInfo
          praise.praise = praise.praise+1
          _that.setData({
            zan:true,
            myInfo:praise
          })
        } else if (e.data.msg == "您已经点过赞"){
          wx.showModal({
            title: '',
            content: '您已经为对方点过赞了哦',
            showCancel:false
          })
        }
      }
    })
  },
  goChatroom: function (e) {
    wx.navigateTo({
      url: 'message?receiveuserid=' + e.currentTarget.dataset.uid + '&&typeid=' + e.currentTarget.dataset.typeid + '&&type=' + e.currentTarget.dataset.type + '&&receivename=' + e.currentTarget.dataset.receivename,
    })
  },
  click_fabu: function () {
    this.setData({
      state1: true,
      state2: false,
      state3: false,
    })
  },
  click_info: function () {
    this.setData({
      state1: false,
      state2: true,
      state3: false,
    })
  },
  click_tuji: function () {
    this.setData({
      state1: false,
      state2: false,
      state3: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this, userId = options.uid,myId=wx.getStorageSync('userId'),typeId=options.typeid,type=options.type
    console.log(myId)
    this.setData({
      userId: userId,
      myId:myId,
      typeId:typeId,
      type:type
    })
    //加载个人信息
    wx.request({
      url: config.host + '/user/getInfo',
      data: { userId: userId },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        that.setData({
          myInfo: e.data.data
        })
      }
    })
    //加载图集
    wx.request({
      url: config.host + '/user/getPhotos',
      data: { userId: userId },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e.data.data)
        for (var n = e.data.data.length, i = n; i > 0; i--) {
          var imgList = that.data.imgList
          imgList.unshift(e.data.data[i - 1].path);
          // console.log(res.tempFilePaths);
          that.setData({
            imgList: imgList
          })
        }
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