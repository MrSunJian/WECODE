// comment.js
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
    index:0,
    star: ["../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png", "../../pic/xingxinghui.png"],
    _veto:true,
    veto:'否',
    imgList: [],
    num_list:3,
    showAdd:true
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
    if (e.detail.value=="是"){
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
      count: that.data.num_list,
      success: function(res) {
        // res.tempFilePaths.forEach(that.push(res)); 
        for (var i = 0, n= res.tempFilePaths.length;i<n;i++){
          var imgList=that.data.imgList
          imgList.push(res.tempFilePaths[i]);
          // console.log(res.tempFilePaths);
          that.setData({
            imgList: imgList,
            num_list: that.data.num_list-n
          })
          console.log(that.data.num_list)
          if(that.data.imgList.length>=3){
            that.setData({
              showAdd:false
            })
          }
        }
      },
    })
  },
  push(res){
    // console.log(res);
    this.data.imgList.push(res);
    console.log(this.data.imgList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderId:options.orderid
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