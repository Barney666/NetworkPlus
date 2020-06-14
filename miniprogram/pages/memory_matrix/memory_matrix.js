// // pages/memory_matrix/memory_matrix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    grid_num: null,
    select_num:3,     //从3个开始
    select_arr: null,
    game_arr:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let grid_num=options.gameGridNum;   //接受传过来的grid大小
    this.setData({
      grid_num: parseInt(grid_num)
    });
    this.createShuffle();
    this.data.realName=wx.getStorageSync("realInfo").realName;
    this.showRight();
  },

  createShuffle(){
    let gridNum=this.data.grid_num;
    let selectNum=this.data.select_num;
    var arr=[];
    for(var i = 0; i < gridNum; i++){
      if(i<selectNum){   //要点击的
        let obj = {
          num: 1,
          animationMain: null,   //默认正面在上面
          animationBack: null,
          rotated:false    //是否被用户翻转
        };
        arr[i]=obj;
      }
      else{
        let obj = {
          num: 0,
          animationMain: null,   //默认正面在上面
          animationBack: null,
          rotated:false    //是否被用户翻转
        };
        arr[i]=obj;
      }
    }
    for (var i = 0; i < gridNum - 1; i++) {    //打乱数组
      var randomIndex = Math.floor(Math.random() * (gridNum - 1 - i));
      var itemAtIndex = arr[randomIndex];
      arr[randomIndex] = arr[gridNum - 1 - i];
      arr[gridNum - 1 - i] = itemAtIndex;
    }
    var select_arr=[];
    for(var i = 0; i < gridNum; i++){
      if(arr[i].num==1){
        select_arr.push(i);
      }
    }
    this.setData({
      select_arr:select_arr,
      game_arr:arr,
    })
  },

  showRight(){    //展示应该点哪个
    var that=this;
    that.animation_main = wx.createAnimation({
      duration:400,
      timingFunction:'linear'
    });
    that.animation_back = wx.createAnimation({
      duration:400,
      timingFunction:'linear'
    });
    wx.showToast({
      title:"3 !",
      icon:"none",
      duration:1000
    });
    setTimeout(function () {
      wx.showToast({
        title:"2 !",
        icon:"none",
        duration:1000
      });
    },1000);
    setTimeout(function () {
      wx.showToast({
        title:"1 !",
        icon:"none",
        duration:1000
      });
    },2000);
    setTimeout(function () {
      for(var index=0;index<that.data.select_num;index++){
        that.animation_main.rotateY(180).step();
        that.animation_back.rotateY(0).step();
        that.setData({         //动态获取index然后再用字符串拼起来，设置对象的某个属性时外面的''和[]不能省
          ['game_arr['+that.data.select_arr[index]+'].animationMain']: that.animation_main.export(),
          ['game_arr['+that.data.select_arr[index]+'].animationBack']: that.animation_back.export(),
        })
      }
      setTimeout(function () {
        for(var index=0;index<that.data.select_num;index++){
          that.animation_main.rotateY(0).step();
          that.animation_back.rotateY(-180).step();
          that.setData({         //动态获取index然后再用字符串拼起来，设置对象的某个属性时外面的''和[]不能省
            ['game_arr['+that.data.select_arr[index]+'].animationMain']: that.animation_main.export(),
            ['game_arr['+that.data.select_arr[index]+'].animationBack']: that.animation_back.export(),
          })
        }
      },2000);
    },3000);
  },

  rotateFn(e) {   //用户点击卡片将其反转
    var id = e.currentTarget.dataset.id;
    var index=e.currentTarget.dataset.index;
    this.animation_main = wx.createAnimation({
      duration:400,
      timingFunction:'linear'
    });
    this.animation_back = wx.createAnimation({
      duration:400,
      timingFunction:'linear'
    });
    // 点击正面
    if (id==1) {
      if(this.data.game_arr[index].num==1){
        var newScore=this.data.score+10;
        this.animation_main.rotateY(180).step();
        this.animation_back.rotateY(0).step();
        this.setData({         //动态获取index然后再用字符串拼起来，设置对象的某个属性时外面的''和[]不能省
          ['game_arr['+index+'].animationMain']: this.animation_main.export(),
          ['game_arr['+index+'].animationBack']: this.animation_back.export(),
          ['game_arr['+index+'].rotated']: true,
          score:newScore
        })
      }
      else{
        var newScore=this.data.score-5;
        this.animation_main.rotateY(180).step();
        this.animation_back.rotateY(0).step();
        this.setData({         //动态获取index然后再用字符串拼起来，设置对象的某个属性时外面的''和[]不能省
          ['game_arr['+index+'].animationMain']: this.animation_main.export(),
          ['game_arr['+index+'].animationBack']: this.animation_back.export(),
        })
        var that=this;
        setTimeout(function () {
          that.animation_main.rotateY(0).step();
          that.animation_back.rotateY(-180).step();
          that.setData({
            ['game_arr['+index+'].animationMain']: that.animation_main.export(),
            ['game_arr['+index+'].animationBack']: that.animation_back.export(),
            score:newScore
          })
        },600);
      }
    }
    else{    // 点击背面 防止用户乱点出bug用的 正常不会有这个 只是上面id==1的两种情况
      this.animation_main.rotateY(0).step();
      this.animation_back.rotateY(-180).step();
      this.setData({
        ['game_arr['+index+'].animationMain']: this.animation_main.export(),
        ['game_arr['+index+'].animationBack']: this.animation_back.export(),
      })
    }

    var end=true;
    for(var i=0;i<this.data.select_num;i++){
      if(this.data.game_arr[this.data.select_arr[i]].rotated===false){
        end=false;
        break;
      }
    }
    if(end){   // 下一个
      wx.showToast({
        title: '正确！',
        icon: 'success',
        duration: 1000,
        mask:true
      });
      var that=this;
      setTimeout(function () {
        for(var i=0;i<that.data.select_num;i++) {
          that.animation_main.rotateY(0).step();
          that.animation_back.rotateY(-180).step();
          that.setData({
            ['game_arr[' + that.data.select_arr[i] + '].animationMain']: that.animation_main.export(),
            ['game_arr[' + that.data.select_arr[i] + '].animationBack']: that.animation_back.export(),
          });
        }
      },1000);
      setTimeout(function () {
        var nextNum=that.data.select_num+1;
        if(nextNum<=that.data.grid_num/2){
          that.setData({
            select_num:nextNum
          });
        }
        that.createShuffle();
        that.showRight();
      },1400);
    }
  },

  stopCount(){
    const db=wx.cloud.database();
    db.collection("Memory_Matrix").add({
      data:{
        name:this.data.realName,
        date:new Date().toLocaleString(),
        num:Math.sqrt(parseInt(this.data.grid_num)),
        score:this.data.score
      }
    }).then(res=>{
      console.log("存")
      console.log(res)
      wx.showToast({
        title:'成功！',
        duration:1000,
        mask:true
      })
    });
  },

  restart(){
    var that=this;
    for(var i=0;i<that.data.select_num;i++) {
      if(this.data.game_arr[this.data.select_arr[i]].rotated===true){
        that.animation_main.rotateY(0).step();
        that.animation_back.rotateY(-180).step();
        that.setData({
          ['game_arr[' + that.data.select_arr[i] + '].animationMain']: that.animation_main.export(),
          ['game_arr[' + that.data.select_arr[i] + '].animationBack']: that.animation_back.export(),
        });
      }
    }
    this.setData({
      score:0,
      select_num:3,     //从3个开始
      select_arr: null,
      game_arr:null,
    });
    wx.showToast({
      title:'已重新开始!',
      duration:1000,
      mask:true
    });
    setTimeout(function () {
      that.createShuffle();
      that.showRight();
    },1000);

  },

})

