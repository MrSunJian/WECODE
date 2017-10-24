// regist.js

var util = require('../../utils/util.js');
var cityList = require('cityList').cityList;
var app = getApp();
const config = require('../../utils/config');
function countdown(that) {

  var second = that.data.count
  if (second == 0) {
    that.setData({
      count: "获取验证码",
      getCheck: false
    })
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      count: second - 1
    });
    countdown(that);
  }, 1000)
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:'获取验证码',
    nickName:'',
    sex:'',
    phoneNum:'',
    checkNum:'',
    password:'',
    getCheck:false,
    check:false,

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
  sexChange:function(e){
    console.log(e.detail.value)
    this.setData({
      sex:e.detail.value
    })
  },
  getCheckcode:function(){
    var phoneNum = this.data.phoneNum
    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
    if (reg.test(phoneNum)){
      this.setData({
        count:60,
        getCheck:true
      })
      countdown(this);
      wx.request({
        url: config.host +'/Login/code',
        data: { mobile: phoneNum},
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (e) {
          console.log(e)
        }
      })
    }else{
      wx.showModal({
        title: '',
        content: '请填写正确的手机号！',
        showCancel: false
      })
    }
  },
  
  attention:function(){
    wx.navigateTo({
      url: 'attention'
    })
  },
  confirm:function(){  
    var nickName = this.data.nickName, sex = this.data.sex, area = this.data.address.resideprovince + '-' + this.data.address.residecity,
      phoneNum = this.data.phoneNum,  password = this.data.password, check = this.data.check, checkNum = this.data.checkNum;
    // if (nickName !== '' && sex !== '' && area !== '' && phoneNum !== '' &&  password!==''&&check==true){
      // wx.request({
      //   url: config.host+'/Login/reg',
      //   data:{
      //     nickname:nickName,
      //     sex:sex,
      //     area: area,
      //     mobile:phoneNum,
      //     password:password,
      //     code:checkNum
      //   },
      //   header:{'Content-Type': 'application/x-www-form-urlencoded'},
      //   method:'POST',
      //   success:function(e){
      //     console.log(e);
      //     wx.setStorage({
      //       key:"userId",
      //       data:"4"
      //     })
          wx.navigateTo({
            url: 'myInfo'
          })
        // },
        // fail:function(e){
        //   console.log(e)
        // }
      // })      
    // }else{
    //   wx.showModal({
    //     title: '',
    //     content:'请填写所有的信息',
    //     showCancel:false
    //   })
    // }

  },
  nickName:function(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  sex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  region: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  checkNum: function (e) {
    this.setData({
      checkNum: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  agree:function(e){
    console.log(e.detail.value)
    this.setData({
      check:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(config.host)
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