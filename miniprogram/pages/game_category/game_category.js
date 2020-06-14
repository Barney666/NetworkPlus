// pages/game_category/game_category.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"注意力",
        isActive:true
      },
      {
        id: 1,
        value: "记忆力",
        isActive: false
      },
      {
        id: 2,
        value: "反应速度",
        isActive: false
      },
      {
        id: 3,
        value: "计算能力",
        isActive: false
      }
    ],
    gridNumArray:["3x3","4x4","5x5","6x6"],
    gridNumArray_Memory_Matrix:["5x5","6x6","7x7"]
  },

  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  //选方格大小
  gridNumPick_Schulte(e){
    console.log(e);
    var index=e.detail.value;
    var gameGridNum=(parseInt(index)+3)*(parseInt(index)+3);   //不parseInt会直接拼接
    console.log(gameGridNum)
    wx.navigateTo({
      url:"../schulte/schulte?gameGridNum="+gameGridNum
    })
  },
  gridNumPick_Memory_Matrix(e){
    console.log(e);
    var index=e.detail.value;
    var gameGridNum=(parseInt(index)+5)*(parseInt(index)+5);   //不parseInt会直接拼接
    console.log(gameGridNum);
    wx.navigateTo({
      url:"../memory_matrix/memory_matrix?gameGridNum="+gameGridNum
    })
  }

})