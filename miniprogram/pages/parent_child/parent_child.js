Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },


  onShow: function () {
    const userInfo=wx.getStorageSync("userInfo");    // 这块得先判断是否已经登陆
    this.setData({userInfo})
  },
})