// explor.js
var cityList = require('cityList').cityList;
var app = getApp()
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,


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
  goChatroom: function (e) {
    wx.navigateTo({
      url: 'message?receiveuserid=' + e.currentTarget.dataset.id + '&&typeid=' + e.currentTarget.dataset.typeid + '&&type=' + e.currentTarget.dataset.type + '&&receivename=' + e.currentTarget.dataset.receivename,
    })
  },
  goToInfo:function(e){
    wx.navigateTo({
      url: 'wanted?uid=' + e.currentTarget.dataset.id + '&&typeid=' + e.currentTarget.dataset.typeid + '&&type=' + e.currentTarget.dataset.type,
    })
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新...',
      icon:'loading'
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
  confirm:function(){
    var userId = wx.getStorageSync('userId'), area = this.data.address.resideprovince + '-' + this.data.address.residecity
    if (this.data.address.resideprovince!==''){
      wx.request({
        url: config.host + '/Info/find',
        data: { userId: userId, area: area },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success: function (e) {
          console.log(e)
        },
      })
    } 
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('userId'),_that=this
    if (userId == '') {
      wx.redirectTo({
        url: 'login',
      })
    } else {
      wx.request({
        url: config.host +'/Info/find',
        data: { userId:userId },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (e) {
          console.log(e)
          _that.setData({
            list:e.data.msg
          })  
        },
        fail: function (e) {
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
    wx.showLoading({
      title: '正在刷新...',
    })
    var userId = wx.getStorageSync('userId'), _that = this
    wx.request({
      url: config.host + '/Info/find',
      data: { userId: userId },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (e) {
        console.log(e)
        _that.setData({
          list: e.data.msg
        })
      },
      fail: function (e) {
        console.log(e)
      },
      complete:function(){
        wx.hideLoading()
      }
    })
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