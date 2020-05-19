Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    realInfo:null,
    bindInfo:null,
  },

  load:false,
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    const userInfo=wx.getStorageSync("userInfo");
    this.setData({userInfo});
    const realInfo=wx.getStorageSync("realInfo");
    this.setData({realInfo});
    const bindInfo=wx.getStorageSync("bindInfo");
    this.setData({bindInfo});
  },

  handleGetUserInfo(e) {
    console.log(e)
    const { userInfo } = e.detail;
    this.setData({userInfo});
    wx.setStorageSync("userInfo", userInfo);

    var that=this
    //success方法指向闭包，所以this属于闭包，由此在success回调函数里是不能直接使用this.xxx()的
    // 如果我们要使用的话，可以在闭包之外先把this赋值给另一个变量。
    const db=wx.cloud.database();
    db.collection("User").where({
      userInfo: this.data.userInfo,
    }).get({
      success: function(res) {
        console.log("取");
        console.log(res.data);
        if(res.data!=[]){
          that.storeSyncData(res.data[0]);
        }
      }
    })
   },

  storeSyncData(data){
    const realInfo=data.realInfo;
    wx.setStorageSync("realInfo",realInfo);
    this.setData({realInfo});
    const bindInfo=data.bindInfo;
    wx.setStorageSync("bindInfo",bindInfo);
    this.setData({bindInfo});
  },


})