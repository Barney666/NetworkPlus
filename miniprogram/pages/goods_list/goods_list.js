
import {request} from "../../request/request.js";

Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  totalPages:1,   //总页数 默认1

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  //获取商品列表数据
  getGoodsList(){
    request({
      url:"https://api.zbztb.cn/api/public/v1/goods/search",
      data: this.QueryParams
    }).then(result =>{
      const total=result.data.message.total;
      this.totalPages=Math.ceil(total/this.QueryParams.pagesize);    //计算此分类的总页数
      this.setData({
        goodsList:[...this.data.goodsList,...result.data.message.goods]  //拼接数组（多页拼接）
      })
    })
  },

  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },

  //页面上滑 滚动条触底事件【加载下一页】
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有下一页了哥'})
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新事件
  onPullDownRefresh(){
    this.setData({goodsList:[]})
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
 
})