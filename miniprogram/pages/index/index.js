Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    realInfo: {},
    bindInfo: {}
  },


  onShow: function () {
    const userInfo=wx.getStorageSync("userInfo");
    this.setData({userInfo});
    const realInfo=wx.getStorageSync("realInfo");
    this.setData({realInfo});
    const bindInfo=wx.getStorageSync("bindInfo");
    this.setData({bindInfo});
  },

  onTabItemTap(options) {
    if(this.data.userInfo.avatarUrl==undefined || this.data.realInfo.realName==undefined || this.data.bindInfo.familyName==undefined){
      wx.showToast({
        title: '不完善个人信息是无法使用的哦！',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 3000,
        mask:true
      });
      setTimeout(function () {
        wx.switchTab({
          url:"../self/self"
        })
      }, 3000);
    }
  },

  goDiet(){
    wx.navigateTo({
      url:'../diet/diet'
    })
  }
})

// //自定义事件 用来接收子组件传递的数据的
// handleItemChange(e){
//   const {index} = e.detail;    //相当于 const index=e.detail.index;
//   let {HomeNavigation} = this.data;
//   HomeNavigation.forEach( (v,i) => i===index?v.isActive=true:v.isActive=false );
//   this.setData({HomeNavigation})
//
//}