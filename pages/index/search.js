// search.js
var util = require('../../utils/util.js');
const config = require('../../utils/config');
var cityList = require('cityList').cityList;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2017-8-25',
    endDate: '2017-8-25',
    budget: '',
    school: '',
    hobby: '',
    _dest:'',

    _work: '',
    index_work:0,
    array_work:['互联网','金融','房地产','保险','汽车','教育','媒体','医疗','能源','制造','其他'],

    sex:['男','女'],
    _sex:'',

    _purpose:'',
    purpose: ['找向导', '找旅伴'],

    _travel: '',
    index_travel:0,
    array_travel:['购物','度假','观光','文化探索','探访亲友','商务','其他'],

    _star: '',
    index_star: 0,
    array_star: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],

    _study: '',
    index_study: 0,
    array_study: ['专科', '本科', '硕士', '博士'],

    _language: '',
    items:[
      { value: '0', name: '普通话'},
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

    _taste: '',
    taste: [
      { value: '0', name: '川菜'},
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
    // disabled:false,
    show:false,
    show_taste: false,

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

  bindDateChange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  dest:function(e){
    console.log(e)
    this.setData({
      _dest:e.detail.value
    })
  },
  sex: function (e) {
    console.log(e)
    this.setData({
      _sex: e.detail.value
    })
  },
  work_change:function(e){
    console.log(e)
    var array_work = this.data.array_work
    this.setData({
      index_work: e.detail.value,
      _work: array_work[e.detail.value]
    })
  },

  travel_change: function (e) {
    console.log(e)
    var array_travel = this.data.array_travel
    this.setData({
      index_travel: e.detail.value,
      _travel: array_travel[e.detail.value]
    })
  },

  star_change: function (e) {
    console.log(e)
    var array_star = this.data.array_star
    this.setData({
      index_star: e.detail.value,
      _star: array_star[e.detail.value]
    })
  },

  study_change: function (e) {
    console.log(e)
    var array_study = this.data.array_study
    this.setData({
      index_study: e.detail.value,
      _study: array_study[e.detail.value]
    })
  },
  school: function (e) {
    this.setData({
      school: e.detail.value
    })
    console.log(this.data.school)
  },
  budget: function (e) {
    this.setData({
      budget: e.detail.value
    })
    console.log(this.data.school)
  },
  hobby: function () {
    this.setData({
      hobby: e.detail.value
    })
    console.log(this.data.school)
  },
  search: function () {
    var work = this.data._work, userId = wx.getStorageSync('userId'), travel = this.data._travel,
      star = this.data._star, school = this.data.school,
      study = this.data._study, hobby = this.data.hobby,
      language = this.data._language, taste = this.data._taste,
      startTime = this.data.startDate, endTime = this.data.endDate,
      area = this.data.address.resideprovince + '-' + this.data.address.residecity,
      budget = this.data.budget, sex = this.data._sex,type=this.data._dest
      wx.request({
        url: config.host + '/Info/search',
        data: {
          type:type,
          startTime: startTime,
          endTime: endTime,
          area: area,
          hobby: hobby,
          sex: sex,
          constellation: star,
          education: study,
          language: language,
          flavor: taste,
          budget: budget,
          workNature: work,
          touristNature: travel,
          school: school,
        },
        header: { 'Content-Type': 'application/json' },
        method: 'POST',
        success: function (e) {
          console.log(e)
          wx.setStorageSync('searchResoult', e.data.data)
          console.log(wx.getStorageSync('searchResoult'))
          wx.navigateTo({
            url: 'search_Result',
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    
  },
  
  showDetail:function(){
    this.setData({
      show:!this.data.show,
    })
  },  
  languageChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      _language: e.detail.value
    })
  },
  tasteChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  },
  showDetail_taste:function(){
    this.setData({
      show_taste: !this.data.show_taste,
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