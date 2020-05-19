// pages/realInfo/realInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    realInfo:{
      realName:null,
      age:null,
      wechat:null
    },
  },

  realInput(e){
    console.log(e)
    var property = e.currentTarget.dataset.index;
    this.data.realInfo[property]=e.detail.value;
  },

  confirm(e){
    console.log(this.data.realInfo);
    wx.setStorageSync("realInfo",this.data.realInfo);
  }

})