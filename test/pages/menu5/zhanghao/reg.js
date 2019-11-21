// pages/menu5/zhanghao/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:""
  },
  formsubmit:function(e){
    var that = this;
    console.log("用户提交了表单信息")
    console.log(e.detail.value)
    console.log("用户名"+e.detail.value.uname)
    var uname = e.detail.value.uname;
    var upwd1 = e.detail.value.upwd1;
    var upwd2 = e.detail.value.upwd2;
    if(uname.length >0 && upwd1.length>0&&upwd2.length>0)
    {
        if(upwd1==upwd2){
          this.setData({ error: "请填写完整的账号密码信息" })
          that.setData({error:''})
          //提交数据
          wx.request({
            url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu.asp',
            data:{
              yhm:uname,
              mm:upwd1
            },
            success:function(res){
              console.log(res.data)
              if(res.data.zt=="yes"){
                console.log("注册成功"+res.data.xinxi+",用户id："+res.data.uid)
                wx.setStorage({
                  key: 'u_login',
                  data: 'yes',
                })
                wx.setStorage({
                  key: 'u_id',
                  data: res.data.uid,
                })
                wx.setStorage({
                  key: 'u_name',
                  data: uname,
                  success:function(){
                    wx.switchTab({
                      url: '/pages/menu5/index',
                    })
                  }
                })

              }else if(res.data.zt=="no"){
                console.log("注册失败," + res.data.xinxi + ",用户id：" + res.data.uid)
              }
            }
          })
        }
        else{
          that.setData({ error: "两次密码不一致" })
        }
    }else{
           that.setData({error:"请填写完整的账号密码信息"})
    }
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