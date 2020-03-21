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
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      // url:"https://api.zbztb.cn/api/public/v1/goods/detail",
      data: {goods_id}
    }).then(result=>{
      const goodsMessage=result.data.message;
      this.setData({
        goodsObj:{
          goods_id:goodsMessage.goods_id,
          goods_name:goodsMessage.goods_name,
          goods_price:goodsMessage.goods_price,
          // 注意iPhone不支持webp这种图片格式 显示不出来 得改webp => jpg
          goods_introduce:goodsMessage.goods_introduce.replace(/\.webp/g,'.jpg'),
          // goods_introduce:goodsMessage.goods_introduce,
          pics:goodsMessage.pics
        }
      })
    })
  },

  // 点击轮播图，放大预览
  handlePreviewImage(e){
    const urls=this.data.goodsObj.pics.map(v=>v.pics_mid)   //要预览的图片数组
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,   //相当于current:current 后面的current是上面那个常量
      urls,
    });
  },

  //点击"加入购物车"
  handleCartAdd(){
    let cart=wx.getStorageSync("cart")||[];    //获取缓存中的购物车-->数组形式
    let index=cart.findIndex(v=>v.goodsObj.goods_id===this.data.goodsObj.goods_id)    //判断商品对象是否存在于购物车数组中
    if(index===-1){   //第一次添加
      this.data.num=1;      //没有就自动添加num属性
      cart.push(this.data);
    }
    else{    //已经存在于购物车数组中
      cart[index].num++;
    }
    wx.setStorageSync("cart",cart);     //把购物车重新添加回缓存中
    wx.showToast({
      title:'加入成功',
      icon:'success',
      mask:true       //true防止用户一直疯狂点击
    })
  }


})















