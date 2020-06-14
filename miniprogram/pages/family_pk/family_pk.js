// pages/family_pk/family_pk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realInfo:null,
    bindInfo:null,
    selfRecord:[],
    familyRecord:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const realInfo=wx.getStorageSync("realInfo");
    this.setData({realInfo});
    const bindInfo=wx.getStorageSync("bindInfo");
    this.setData({bindInfo});

    var that=this;
    const db=wx.cloud.database();

    db.collection("Schulte").where({   //取自己的
      name: this.data.realInfo.realName,
    }).get({
      success: function(res) {
        console.log("取");
        console.log(res.data);
        if(res.data!=[]){
          that.setData({
            selfRecord:res.data
          })
        }
      }
    });

    console.log(this.data.bindInfo.familyName)
    db.collection("Schulte").where({   //取亲人的
      name: this.data.bindInfo.familyName,
    }).get({
      success: function(res) {
        console.log("取");
        console.log(res.data);
        if(res.data!=[]){
          that.setData({
            familyRecord:res.data
          })
        }
      }
    });

  },


})