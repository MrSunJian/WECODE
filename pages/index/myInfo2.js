// myInfo2.js
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _work: '',
    index_work:0,
    array_work: ['互联网', '金融', '房地产', '保险', '汽车', '教育', '媒体', '医疗', '能源', '制造', '其他'],

    school:'',
    hobby:'',

    _study:'',
    index_study: 0,
    array_study: ['专科', '本科', '硕士', '博士'],

    _travel:'',
    index_travel: 0,
    array_travel: ['购物', '度假', '观光', '文化探索', '探访亲友', '商务', '其他'],

    _star:'',
    index_star: 0,
    array_star: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],

    index_study: 0,
    array_study: ['专科', '本科', '硕士', '博士'],

    _language:[],
    items: [
      { value: '0', name: '普通话' },
      { value: '1', name: '小语种' },
      { value: '2', name: '英语' },
      { value: '3', name: '东北话' },
      { value: '4', name: '陕西话' },
      { value: '5', name: '广东话' },
      { value: '6', name: '江浙话' },
      { value: '7', name: '福建话' },
      { value: '8', name: '湖南话' },
      { value: '9', name: '江西话' },
      { value: '10', name: '客家话' },
      { value: '11', name: '其他' },
    ],
    _taste:[],
    taste: [
      { value: '0', name: '川菜' },
      { value: '1', name: '粤菜' },
      { value: '2', name: '闽菜' },
      { value: '3', name: '湘菜' },
      { value: '4', name: '鲁菜' },
      { value: '5', name: '苏菜' },
      { value: '6', name: '浙菜' },
      { value: '7', name: '徽菜' },
      { value: '8', name: '偏甜' },
      { value: '9', name: '偏辣' },
      { value: '10', name: '偏咸' },
      { value: '11', name: '偏酸' },
    ],

    _zhima:'',
    index_zhima:0,
    zhima:['<600','600-650','650-700','700-720','720-750','750-780','780-800','>800'],
    
  },
  star_change: function (e) {
    var array_star = this.data.array_star
    console.log(array_star[e.detail.value])
    this.setData({
      index_star: e.detail.value,
      _star: array_star[e.detail.value]
    })
  },
  work_change: function (e) {
    var array_work = this.data.array_work
    console.log(array_work[e.detail.value])
    this.setData({
      index_work: e.detail.value,
      _work: array_work[e.detail.value]
    })
  },
  zhima_change:function(e){
    var zhima = this.data.zhima
    console.log(zhima[e.detail.value])
    this.setData({
      index_zhima: e.detail.value,
      _zhima: zhima[e.detail.value]
    })
  },
  
  showDetail: function () {
    this.setData({
      show: !this.data.show,
    })
  }, 
  showDetail_taste: function () {
    this.setData({
      show_taste: !this.data.show_taste,
    })
  },
  languageChange: function (e) {
    // var _that=this
    // var L=this.data.language
    // L.push(this.data.items[e.detail.value])
    console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      _language: e.detail.value
    })
    // if (e.detail.value.length>3){
    //   wx.showToast({
    //     title: '最多可选3个',
    //   })
      // e.detail.value.
      // console.log(e)
      // this.setData({
      //   disabled:true,
      // })
    // }
  },
  tasteChange: function (e) {
    console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      _taste: e.detail.value
    })
  },
  school:function(e){
    this.setData({
      school:e.detail.value
    })
    console.log(this.data.school)
  },
  hobby:function(e){
    this.setData({
      hobby: e.detail.value
    })
    console.log(this.data.hobby)
  },
  study_change: function (e) {
    var array_study = this.data.array_study
    console.log(array_study[e.detail.value])
    this.setData({
      index_study: e.detail.value,
      _study: array_study[e.detail.value]
    })
  },
  next: function () {
    var work = this.data._work, userId = wx.getStorageSync('userId'),
      star = this.data._star, school = this.data.school,
      study = this.data._study, hobby = this.data.hobby,zhima=this.data._zhima,
      language = this.data._language,taste=this.data._taste
     wx.request({
       url: config.host +'/login/reg2',
       data:{
         userId:userId,
         constellation:star,
         school:school,
         education:study,
         hobby:hobby,
         flavor:taste,
         workNature:work,
         language:language,
         zhima:zhima
       },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        wx.navigateTo({
          url: 'myInfo3',
        })
      },
      fail:function(e){
        console.log(e)
      }
     })

      // console.log(work);
      
  },
  skip: function () {
    wx.switchTab({
      url: 'tourist'
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