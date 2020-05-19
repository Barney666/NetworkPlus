// pages/game_category/game_category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"记忆力",
        isActive:true
      },
      {
        id: 1,
        value: "注意力",
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
  },

  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },

})