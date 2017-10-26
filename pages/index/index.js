//index.js
//获取应用实例
var util = require('../../utils/util.js');
const config = require('../../utils/config');
var cityList = require('./cityList').cityList;
var app = getApp()
Page({
  data: {
    array: ['找导游','找旅友'],
    objectArray: ['找导游', '找旅友', '找导游/找旅友'],
    index:2,
    startDate:"",
    endDate:"2017-9-16",
    purpose:"找导游/找旅友",
    page:1,
    suggest:[],
    type:1,
    
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
  
  
  search:function(){
    var userId = wx.getStorageSync('userId')
    if (userId == '') {
      wx.redirectTo({
        url: 'login',
      })
    } else {
      wx.navigateTo({
        url: 'search',
      })
    }
  },
  change:function(){
    var that = this, page = this.data.page
    wx.request({
      url: config.host + '/info/getRecommend',
      data: { page: page },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        if(e.data.data!==''){
          that.setData({
            suggest: e.data.data,
            page: page + 1
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '没有更多了哦',
            showCancel:false
          })
        }
      }
    })
  },
  imgTap:function(e){
    console.log(e)
    var userId = wx.getStorageSync('userId')
    if (userId == '') {
      wx.redirectTo({
        url: 'login',
      })
    } else {
      wx.navigateTo({
        url: 'wanted?uid=' + e.currentTarget.dataset.uid + '&&typeid=' + e.currentTarget.dataset.typeid + '&&type=' + e.currentTarget.dataset.type ,
      })
    }
  },
  onLoad: function () {
    var nowDate = util.formatTime(new Date());
    this.setData({
      startDate: nowDate,
    });
    var that = this,page=this.data.page
    wx.request({
      url: config.host +'/info/getRecommend',
      data: { page: page },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        console.log(e)
        that.setData({
          suggest:e.data.data,
          page:page+1
        })
      }
    })

  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  purposeChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      type:e.detail.value+1
    })
    var _that=this,type = this.data.index + 1, startTime = this.data.startDate, endTime = this.data.endDate,
      area = this.data.address.resideprovince + '-' + this.data.address.residecity
    wx.request({
      url: config.host +'/Info/search',
      data: { 
        type:type,
        startTime: startTime,
        endTime: endTime,
        area: area
       },
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
      success:function(e){
        _that.setData({
          suggest:e.data.data
        })
      }
    })
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
});
