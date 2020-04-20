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

// //自定义事件 用来接收子组件传递的数据的
// handleItemChange(e){
//   const {index} = e.detail;    //相当于 const index=e.detail.index;
//   let {HomeNavigation} = this.data;
//   HomeNavigation.forEach( (v,i) => i===index?v.isActive=true:v.isActive=false );
//   this.setData({HomeNavigation})
//
//}