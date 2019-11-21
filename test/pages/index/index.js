//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ad_img1: "http://www.yaoyiwangluo.com/img/ad-top1.jpg",
    ad_img2: "http://www.yaoyiwangluo.com/img/ad.png",
    jieguo: true,
    ren: ["张三", "李四", "王五", "麻溜"],
    /*轮播图*/
    /*静态
    images: ["http://www.yaoyiwangluo.com/upload/ban1.jpg", "http://www.yaoyiwangluo.com/upload/ban2.jpg"],
    */
    /*动态*/
    images:[],
    indicatordots :true,
    vertical :false,
    autoplay :true,
    /*列表信息*/
    xinxis:[],
    /*最新数据*/
    zuixins:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var that = this
    wx: wx.request({
      url: 'http://www.yaoyiwangluo.com/wxshop/100-guanggao-xianshi.html',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
      success: function(res) {
        console.log(res.data)
        if (res.data == "yes") {
          console.log("返回值是yes，xianshi图片")
        } else if (res.data = "no") {
          console.log("返回值是yes，buxianshi图片")
        }
        that.setData({
          jieguo: false
        })
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wxshop/100-lunbotupian-link.html',
          success:function(res){
            that.setData({
              images:res.data
            })
          }
        })
      }
    })
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_news_list.asp',
      success:function(res){
        that.setData({
          xinxis:res.data
        })
      }
    })
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_CpList_top4.asp',
      success:function(res){
        that.setData({
          zuixins:res.data
        })
      }
    })
  },
  jumpall:function(){
    wx.switchTab({
      url: '/pages/menu3/index',
    })
  }

})