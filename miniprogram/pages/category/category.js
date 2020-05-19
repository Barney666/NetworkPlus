
Page({

  data: {
    dataList:[],   
    // leftMenuList:[],
    rightContent:[],
    currentIndex:0,    //被点击的左侧菜单
    scrollTop:0    //右侧滚动条距离顶部的距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const json=wx.getStorageSync("json");
    if(!json){
      this.getJson();
    }
    else{  //有旧的数据  定义过期时间 5min
      if( Date.now()-json.time > 5*1000*60  ){  //过期了
        this.getJson(); 
      }
      else{    //旧数据没过期
        this.json=json.data;
        this.setData({ dataList: this.json.JsonData.message });
        this.setData({ rightContent: this.json.JsonData.message[0].children });
      }
    } 
  },

  //获取json数据
  getJson(){
    this.json = require("../../shopData.js");
    wx.setStorageSync("json", { time: Date.now(), data: this.json });
    this.setData({ dataList: this.json.JsonData.message });
    this.setData({ rightContent: this.json.JsonData.message[0].children });
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;//获取被点击的标题身上的索引
    let rightContent = this.json.JsonData.message[index].children;
    this.setData({
      currentIndex: index,      //给data中的currentIndex赋值
      rightContent,
      scrollTop: 0    //右侧滚动条距离顶部的值
    })
    
    
  }




})