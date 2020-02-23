import {request} from "../../request/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },


  //获取商品详情数据
  getGoodsDetail(goods_id){
    request({
      url:"https://api.zbztb.cn/api/public/v1/goods/detail",
      data: {goods_id}
    }).then(result=>{
      console.log(result)
      this.setData({
        goodsObj:result.data.message
      })
    })
  }

})