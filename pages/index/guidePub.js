// guidePub.js
const config = require('../../utils/config');
var util = require('../../utils/util.js');
var cityList = require('./cityList').cityList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '2017-8-25',
    startDate2:'',
    endDate: '2017-8-25',
    cancelDate:'2018-1-1',

    _travel: '',
    index_travel: 0,
    array_travel: ['购物', '度假', '观光', '文化探索', '探访亲友', '商务', '其他'],


    price:'',
    experience:'',
    language:'',
    activity:'',

    address: {},
    showArea: false,
    currentTab: 1,
    country: [],
    residecity: [],
    resideprovince: [],

    curr_pro: '',
    curr_cit: '',
    curr_cou: '',
  },
  travel_change:function(e){
    console.log(e)
    var array_travel = this.data.array_travel
    this.setData({
      index_travel: e.detail.value,
      _travel: array_travel[e.detail.value]
    })
  },
  price:function(e){
    this.setData({
      price:e.detail.value
    })
  },
  experience:function(e){
    this.setData({
      experience: e.detail.value
    })
  },
  language:function(e){
    this.setData({
      language: e.detail.value
    })
  },
  activity:function(e){
    this.setData({
      activity: e.detail.value
    })
  },
  
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value,
      startDate2: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindShixiaoChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cancelDate: e.detail.value
    })
  },
  pub: function () {
    var startTime = this.data.startDate, endTime = this.data.endDate, price = this.data.price, experience = this.data.experience,
      cancelDate = this.data.cancelDate, language = this.data.language, activity = this.data.activity,
      userId = wx.getStorageSync('userId'), area = this.data.address.resideprovince + '-' + this.data.address.residecity ,
      touristNature=this.data._travel
      // console.log(area)
      wx.request({
        url: config.host +'/Publish/publishGuide',
        data:{
          startTime: startTime,
          endTime: endTime,
          price: price,
          closeTime: cancelDate,
          tongue: language,
          area: area,
          activity: activity,
          userId: userId,
          experience: experience,
          touristNature: touristNature
        },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success: function (e) {
          console.log(e)
          wx.switchTab({
            url: 'explor'
          })
        },
        fail: function (e) {
          console.log(e)
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
  
  },
  //选择省市
  choosearea: function () {

    let result = this.data.address;
    var currentTab = 1;
    if (result.country) {
      currentTab = 3;
    } else if (result.residecity) {
      currentTab = 3;
    } else if (result.resideprovince) {
      currentTab = 1;
    } else {
      currentTab = 1;
    }

    let resideprovince = [];
    let residecity = [];
    let country = [];

    cityList.forEach((item) => {
      resideprovince.push({
        name: item.name
      });
      if (item.name == result.resideprovince) {
        item.city.forEach((item) => {
          residecity.push({
            name: item.name
          });
          if (item.name == result.residecity) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      showArea: true,
      resideprovince: resideprovince,
      residecity: residecity,
      country: country,

      currentTab: currentTab,
      curr_pro: result.resideprovince || '请选择',
      curr_cit: result.residecity || '请选择',
      curr_cou: result.country || '请选择',
    });
  },
  areaClose: function () {
    this.setData({
      showArea: false
    });
  },
  //点击省选项卡
  resideprovince: function (e) {
    this.setData({
      currentTab: 1
    });
  },
  //点击市选项卡
  residecity: function () {
    this.setData({
      currentTab: 2
    });
  },
  country: function () {
    this.setData({
      currentTab: 3
    });
  },
  //点击选择省
  selectResideprovince: function (e) {
    let residecity = [];
    let country = [];
    let name = e.currentTarget.dataset.itemName;

    cityList.forEach((item) => {
      if (item.name == name) {
        item.city.forEach((item, index) => {
          residecity.push({
            name: item.name
          });
          if (index == 0) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 2,
      residecity: residecity,
      country: country,
      curr_pro: e.currentTarget.dataset.itemName,
      curr_cit: '请选择',
      curr_cou: '',
    });
  },
  //点击选择市
  selectResidecity: function (e) {
    let country = [];
    let name = e.currentTarget.dataset.itemName;
    cityList.forEach((item) => {
      if (item.name == this.data.curr_pro) {
        item.city.forEach((item, index) => {
          if (item.name == name) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 3,
      country: country,
      curr_cit: e.currentTarget.dataset.itemName,
      curr_cou: '请选择',
    });
  },
  //点击选择区
  selectCountry: function (e) {
    this.data.curr_cou = e.currentTarget.dataset.itemName;

    this.data.address.resideprovince = this.data.curr_pro;
    this.data.address.residecity = this.data.curr_cit;
    this.data.address.country = this.data.curr_cou;
    this.setData({
      showArea: false,
      curr_cou: this.data.curr_cou,
      address: this.data.address
    });
  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current + 1
    });
  }
})