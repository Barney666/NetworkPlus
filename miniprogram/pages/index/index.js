Page({

  /**
   * 页面的初始数据
   */
  data: {
    HomeNavigation: [
      {
        id: 0,
        name: "新闻",
        isActive: true    /*注意这里的true不是字符串!*/
      },
      {
        id: 1,
        name: "数据",
        isActive: false
      },
      {
        id: 2,
        name: "文献",
        isActive: false
      }
    ]
  },

  //自定义事件 用来接收子组件传递的数据的
  handleItemChange(e){
    const {index} = e.detail;    //相当于 const index=e.detail.index;
    let {HomeNavigation} = this.data;
    HomeNavigation.forEach( (v,i) => i===index?v.isActive=true:v.isActive=false );
    this.setData({HomeNavigation})
  
  }

  
})