// pages/diet/diet.js
const db = wx.cloud.database();
Page({
  data: {
    tempImg: [],
    fileIDs: [],
    inputVal: null,
    inputShowed: null,
    realInfo: null,
    energyInfo:[]
  },

  onLoad: function (options) {
    const realInfo=wx.getStorageSync("realInfo");
    this.setData({realInfo});
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    // getList(this);
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    // getList(this);
  },
  inputTyping: function (e) {
    var that=this;
    this.setData({
      inputVal: e.detail.value
    });
    if(e.detail.value!==""){
      //搜索数据
      db.collection("Food_Energy").where({   //官方文档中并没有模糊查询的功能，但是有正则表达式的功能
        Name:{
          $regex:'.*' + e.detail.value + '.*',		// 中间是要查询的内容 ‘.*’等同于SQL中的‘%’
          $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get({
        success: function(res) {
          console.log("模糊查询");
          console.log(res.data);
          if(res.data!=[]){
            that.setData({       // 必须用setData不能用赋值的方式，不然无法直接直接显示出来
              energyInfo: res.data
            })
          }
        }
      });
    }
  },

  uploadImgHandle: function () {
    wx.chooseImage({
      count: 9,     //最多就让传9张 默认值也是9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          tempImg: tempFilePaths
        })
      }
    })
  },

  submit: function () {
    wx.showLoading({
      title: '提交中',
    });
    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.tempImg.length; i++) {
      let filePath = this.data.tempImg[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
    }
    Promise.all(promiseArr).then(res => {
      db.collection('Diet').add({
        data: {
          realName:this.data.realInfo.realName,
          date:new Date().toLocaleString(),
          fileIDs: this.data.fileIDs //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
        }
      })
          .then(res => {
            console.log(res);
            wx.hideLoading();
            wx.showToast({
              title: '提交成功',
            })
          })
          .catch(error => {
            console.log(error)
          })
    })
  },
})

