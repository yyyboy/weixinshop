// pages/menu5/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str_u_login: '',
    str_u_id: '',
    str_u_name: ''

  },
  toReg: function() {
    wx.navigateTo({
      url: '/pages/menu5/zhanghao/reg',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'u_login',
      success: function(res) {
        that.setData({
          str_u_login: res.data
        })
      },
    })
    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          str_u_id: res.data
        })
      },
    })
    wx.getStorage({
      key: 'u_name',
      success: function(res) {
        that.setData({
          str_u_name: res.data
        })
      },
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  getWxinfo: function() {
    var myid = "";
    var mynicheng = "";
    var mytouxiang = ""

    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo.nickName)
        mynicheng = res.userInfo.nickName;
        mytouxiang = res.userInfo.avatarUrl
      }
    })
    wx.login({
      success(res) {
        console.log("res.code:" + res.code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx08739ef7b03462e1',
            secret: "f7b7669b59cde8d4e8d9aed1cd4884eb",
            js_code: res.code,
            grant_type: 'authorization_code'

          },
          method: "GET",
          success: function(res) {
            console.log(res.data),
              console.log("用户openid:"+res.data.openid)
            myid = res.data.openid
            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu-weixin.asp',
              data: {
                wx_openid: myid,
                wx_nicheng: mynicheng,
                wx_touxiang: mytouxiang
              },
              success: function (res) {
                console.log(res.data)
                wx.setStorage({
                  key: 'u_login',
                  data: 'yes',
                })
                wx.setStorage({
                  key: 'u_id',
                  data: res.data.uid,
                  success:function(){
                    wx.reLaunch({
                      url: '/pages/menu5/index',
                    })
                  }
                })
              
              }
            })
          }
        })
      }
    })


  },
  xinxijump:function(){
    wx.navigateTo({
      url: '/pages/menu2/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})