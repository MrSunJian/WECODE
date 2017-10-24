// myInfo.js
const config = require('../../utils/config');
const util = require('../../utils/util.js');
const cityList = require('cityList').cityList;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../pic/touxiang.png',
    Name:'',
    Age:'',
    idcard:'',
    area:'',
    tag1:'',
    tag2:'',
    tag3:'',
    tag4:'',
    tag5:'',


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
  next:function(){
    var src=this.data.src,name= this.data.Name, age = this.data.Age, idcard = this.data.idcard,
      area = this.data.address.resideprovince + '-' + this.data.address.residecity,
    tag1 = this.data.tag1, tag2 = this.data.tag2, tag3 = this.data.tag3, tag4 = this.data.tag4, tag5 = this.data.tag5,
    userId = wx.getStorageSync('userId')
    console.log(src)
    console.log(userId)
    wx.uploadFile({
      url: config.host +'/User/uploadHeadImg',
      filePath: src,
      name:'headImg',
      formData:{
        userId: userId,
        name: 'headImg',
      },
      success:function(e){
        console.log(e)
        var data=JSON.parse(e.data)
        wx.setStorage({
            key:"headImg",
            data:data.rawUrl_path
          })
      },
      fail:function(e){
        console.log("222")
        console.log(e)
      }
    })
    wx.request({
      url: config.host +'/Login/reg1',
      data: { 
        userId: userId,
        headImg: src,
        age:age,
        idNumber: idcard,
        area:area,
        selfEvaluation:[tag1,tag2,tag3,tag4,tag5],
        truename: name,
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (e) {
        console.log(e)
      },
      fail:function(e){
        console.log(e)
      }
    })
    
    wx.navigateTo({
      url: 'myInfo2',
    })
  },
  skip:function(){
    wx.switchTab({
      url: 'tourist'
    })
  },
  changePic:function(){
    var that=this
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          src: tempFilePaths[0]
        })
      },
    })
  },
  Name:function(e){
    this.setData({
      Name: e.detail.value
    })
  },
  Age: function (e) { 
    this.setData({
      Age: e.detail.value
    })
  },
  idcard: function (e) { 
    this.setData({
      idcard: e.detail.value
    })
  },
  tag1: function (e) { 
    this.setData({
      tag1: e.detail.value
    })
  },
  tag2: function (e) { 
    this.setData({
      tag2: e.detail.value
    })
  },
  tag3: function (e) { 
    this.setData({
      tag3: e.detail.value
    })
  },
  tag4: function (e) { 
    this.setData({
      tag4: e.detail.value
    })
  },
  tag5: function (e) {
    this.setData({
      tag5: e.detail.value
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