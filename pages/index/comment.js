// comment.js
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    index:5,
    star: ["../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png"],
    _veto:true,
    veto:'否',
    imgList: [],
    num_list:3,
    showAdd:true,
    comment:'',
    toUserId:'',
    myInfo:'',
    zan: false,
  },
  star_click:function(e){
    console.log(e);
    this.setData({
      index:e.currentTarget.dataset.index,
    })
  },
  veto:function(e){
    // console.log(e.detail.value)
    var veto = e.detail.value,_that=this
    if (veto=="是"){
      wx.showModal({
        title:'确定使用一票否决',
        content:'每个女生之后5次机会,本次确定使用吗？',
        success:function(e){
          // console.log(e)
          if(e.confirm==true){
            _that.setData({
              veto: veto,
              _veto: false,
            })
          }else{
            _that.setData({
              veto: "否",
              _veto:true,
            })
          }
          console.log(_that.data.veto)
        },
      })
    }
    
  },
  chooseImg:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)       
          var imgList = that.data.imgList, tmpPath = res.tempFilePaths[0]
          wx.showLoading({
            title: '图片上传中',
          })
          wx.uploadFile({
            url: config.host + '/Common/upload',
            name: 'evaluate',
            filePath: tmpPath,
            formData: {
              name: 'evaluate'
            },
            success: function (e) {
              console.log(e)
              var data = JSON.parse(e.data)
              console.log(data.data)
              console.log(data.data.rawUrl_path)
              imgList.push(res.tempFilePaths[0]);
              // console.log(res.tempFilePaths);
              that.setData({
                imgList: imgList,
                num_list: that.data.num_list - 1
              })
              console.log(that.data.num_list)
              if (that.data.imgList.length >= 3) {
                that.setData({
                  showAdd: false
                })
              }
            },
            fail:function(e){
              console.log(e)
            },
            complete:function(){
              wx.hideLoading()
            }
          })
      },
    })
  },
  comment:function(e){
    this.setData({
      comment:e.detail.value
    })
  },
  push(res){
    // console.log(res);
    this.data.imgList.push(res);
    console.log(this.data.imgList);
  },
  pub:function(e){
    var userId=wx.getStorageSync('userId'),orderId=this.data.orderId,
    star=this.data.index,path=this.data.imgList,isVeto=this.data.veto
    wx.request({
      url: config.host +'/Order/evaluate',
      data: { 
        userId: userId,
        orderId: orderId,
        star: star,
        path: path,
        isVeto: isVeto
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        console.log(e)
        if(e.data.status==1){
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  perfect: function () {
    console.log("aaaaa")
    var _that = this,userId=wx.getStorageSync('userId')
    wx.request({
      url: config.host + '/User/praise',
      data: {
        userId: 4,
        toUserId: _that.data.toUserId
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        if (e.data.status == 1 && e.data.msg !== "您已经点过赞") {
          var praise = _that.data.myInfo
          praise.praise = praise.praise + 1
          _that.setData({
            zan: true,
            myInfo: praise
          })
        } else if (e.data.msg == "您已经点过赞") {
          wx.showModal({
            title: '',
            content: '您已经为对方点过赞了哦',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    this.setData({
      orderId:options.orderid,
      toUserId:options.touserid
    })
    var toUserId=this.data.toUserId
    wx.request({
      url: config.host+'/User/getInfo',
      data: {
        userId: userId,
      },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        console.log(e)
        that.setData({
          myInfo: e.data.data
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