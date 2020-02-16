
var data=require("../../shopData.js")


Page({

  data: {
    dataList:[],   
    // leftMenuList:[],
    rightContent:[],
    currentIndex:0    //被点击的左侧菜单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ dataList: data.JsonData.message} );
    this.setData({ rightContent: data.JsonData.message[0].children });
    // this.setShopData();
    // let leftMenuList = this.dataList.map(v => v.cat_name);
    // this.setData({ leftMenuList });
  },

  //直接在wxml里做处理了
  // setShopData(){
  //   let leftMenuList = this.dataList.map(v => v.cat_name);
  //   this.setData({ leftMenuList });
  // }


})