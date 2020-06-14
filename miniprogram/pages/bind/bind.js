// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    realInfo:null,
    bindInfo:{
      selfIdentity:null,
      familyIdentity:null,
      familyName:null,
      familyWechat:null,
      intimate:90
    },
    index:null,
    identityArray:[
        "父亲-儿子","父亲-女儿","母亲-儿子","母亲-女儿","爷爷-孙子","爷爷-孙女","奶奶-孙子","奶奶-孙女",
        "外公-外孙","外公-外孙女", "外婆-外孙","外婆-外孙女",

        "儿子-父亲","女儿-父亲","儿子-母亲","女儿-母亲","孙子-爷爷","孙女-爷爷","孙子-奶奶","孙女-奶奶",
        "外孙-外公","外孙女-外公", "外孙-外婆","外孙女-外婆",

        "其他"
    ],
    selfId:null,
    familyId:null,

    onOff:false
},



  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    const realInfo=wx.getStorageSync("realInfo");
    this.setData({realInfo});
    const userInfo=wx.getStorageSync("userInfo");
    this.setData({userInfo});

    var that=this;
    const db=wx.cloud.database();
    db.collection("User").where({
      realInfo:{
        "wechat":this.data.realInfo.wechat,
      }
    }).get({
      success: function(res) {
        console.log("取自己的");
        console.log(res.data);
        if(res.data!=[]){
          that.setData({       // 必须用setData不能用赋值的方式，不然无法直接直接显示出来
            bindInfo:res.data[0].bindInfo,
            selfId:res.data[0]._id,
          })
          wx.setStorageSync("bindInfo",that.data.bindInfo);
        }
      }
    })
  },

  onShow: function(){
    var that=this;
    setTimeout(function(){
      that.setData({onOff:true});
    },1500);
  },


  realInput(e){
    console.log(e)
    var property = e.currentTarget.dataset.index;
    this.data.bindInfo[property]=e.detail.value;
  },

  identityPick(e){
    console.log(e);
    this.setData({
      index:e.detail.value
    })
  },

  confirm(e){
    this.data.bindInfo.selfIdentity=this.data.identityArray[this.data.index].split("-")[0];
    this.data.bindInfo.familyIdentity=this.data.identityArray[this.data.index].split("-")[1];
    console.log(this.data.bindInfo);
    wx.setStorageSync("bindInfo",this.data.bindInfo);

    const db=wx.cloud.database();
    var userInfo=wx.getStorageSync("userInfo");
    var realInfo=wx.getStorageSync("realInfo");

    if(userInfo!=null && realInfo!=null){
      wx.showToast({

      })
      db.collection("User").add({    //存自己的
        data:{
          userInfo:userInfo,
          realInfo:realInfo,
          bindInfo:this.data.bindInfo,
        }
      }).then(res=>{
        console.log("存")
        console.log(res)
      })
      db.collection("User").add({    //存家人的
        data:{
          realInfo:{
            "wechat": this.data.bindInfo.familyWechat
          },
          bindInfo:{
            "selfIdentity":this.data.bindInfo.familyIdentity,
            "familyIdentity":this.data.bindInfo.selfIdentity,
            "familyWechat":this.data.realInfo.wechat,
            "familyName":this.data.realInfo.realName,
            "intimate":this.data.bindInfo.intimate,
          }
        }
      }).then(res=>{
        console.log("存")
        console.log(res)
        wx.switchTab({
          url:"../self/self"
        })
      })

    }
  },


  async updateDatabase(){
    wx.showToast({
      title: '绑定成功！',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000,
      mask:true
    });
    //找familyId
    var that=this;
    const db=wx.cloud.database();
    await db.collection("User").where({
      realInfo:{
        "wechat":wx.getStorageSync("bindInfo").familyWechat,
      }
    }).get().then(res=>{
      console.log("取家人的");
      console.log(res.data);
      if(res.data!=[]){
        that.setData({       // 必须用setData不能用赋值的方式，不然无法直接直接显示出来
          familyId:res.data[0]._id,
        })
      }
      console.log(this.data.selfId);
      console.log(this.data.familyId);
      //根据familyId更新他的familyName
      //自己的userInfo和realInfo更新到自己的库里面
      wx.cloud.callFunction({
        name:'updateDatabase',
        data:{
          familyId:this.data.familyId,
          realName:this.data.realInfo.realName,
          selfId:this.data.selfId,
          userInfo:this.data.userInfo,
          realInfo:this.data.realInfo,
          bindInfo:this.data.bindInfo,
        },
        success: res => {
          console.log('更新数据成功')
          wx.switchTab({
            url:"../self/self"
          })
        }
      })
    })
  },



})