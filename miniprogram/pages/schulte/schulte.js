// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grid_num: null,
    game_arr: null,
    base_arr: null,
    now_num: 1,
    seconds: 0,
    time: '00:00:00',
    cost: 0,
    count: null,
    wrong: 0,      //0是不显示 1是正确 -1是错误
    realName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let grid_num=options.gameGridNum;   //接受传过来的grid大小
    this.setData({
      grid_num: parseInt(grid_num)
    });
    this.timing(this);
    this.gameNumber(this.data.grid_num);
    this.data.realName=wx.getStorageSync("realInfo").realName;
  },

  /* 点击数字 */
  chooseNum: function (event) {
    // console.log(event.currentTarget.dataset.num);
    var num_choose = event.currentTarget.dataset.num;
    var idx = event.currentTarget.dataset.index;
    var nowNum = this.data.now_num
    var game_arr = this.data.game_arr;

    if (num_choose === nowNum) {
      console.log('选中数字为：', num_choose, '正确数字为：', nowNum, 'idx:', idx);
      this.setData({
        wrong: 1
      });
      this.deleteWrong();
      if (nowNum === this.data.grid_num) {
        this.stopCount(); //结束计时
        //提示游戏通关
        wx.showToast({
          title: '成功完成',
          icon: 'success',
          duration: 2000    //提示的延迟时间
        });
        //往数据库里存游戏记录
        const db=wx.cloud.database();
        db.collection("Schulte").add({
          data:{
            name:this.data.realName,
            date:new Date().toLocaleString(),
            num:Math.sqrt(parseInt(this.data.grid_num)),
            seconds:this.data.seconds
          }
        }).then(res=>{
          console.log("存")
          console.log(res)
        })
      }
      game_arr[idx].checked = true;
      this.setData({
        now_num: nowNum + 1,
        game_arr: game_arr
      })
    }
    else{
      var time=parseInt(this.data.seconds);
      this.setData({
        wrong: -1     //提示他点错了
      });
      this.deleteWrong();
    }
  },
  // 过1s删除提示
  deleteWrong(){
    var that=this;
    setTimeout(function () {
      console.log("----deleteRemind----");
      that.setData({
        wrong: 0
      })
    }, 1000);
  },


  /* 计时器 ------------------------------------------------------*/
  timing: function (that) {
    var seconds = that.data.seconds
    if (seconds > 21599) {
      that.setData({
        time: '6小时，不想继续了gg'
      });
      return;
    }
    that.count = setTimeout(function () {
      that.setData({
        seconds: seconds + 1
      });
      that.timing(that);
    }, 1000)
    that.formatSeconds(that)
  },
  /* 输出计时文字 */
  formatSeconds: function (that) {
    var mins = 0,
        hours = 0,
        seconds = that.data.seconds,
        time = ''
    if (seconds < 60) {

    } else if (seconds < 3600) {
      mins = parseInt(seconds / 60)
      seconds = seconds % 60
    } else {
      mins = parseInt(seconds / 60)
      seconds = seconds % 60
      hours = parseInt(mins / 60)
      mins = mins % 60
    }
    that.setData({
      time: that.formatTime(hours) + ':' + that.formatTime(mins) + ':' + that.formatTime(seconds)
    });
  },
  /* 数字是个位，前面补足0 */
  formatTime: function (num) {
    if (num < 10)
      return '0' + num
    else
      return num + ''
  },
  /* 停止计时 */
  stopCount: function () {
    var $this = this;
    let t = $this.count;
    let time = $this.data.seconds;
    clearTimeout(t);
    console.log('结束游戏，游戏时长为：', time, '秒');
  },
  /* 重启游戏 */
  returnGame: function () {
    var $this = this
    this.setData({
      game_arr: null,
      base_arr: null,
      now_num: 1,
      seconds: 0,
      time: '00:00:00',
      cost: 0,
      count: null,
      wrong:false
    })
    this.gameNumber($this.data.grid_num);

    this.stopCount();
    this.timing($this);
  },
  /* 生成随机排序数组 */
  shuffle: function (arr) {
    let cards = arr.slice(0);
    let len = cards.length;
    for (var i = 0; i < len - 1; i++) {
      var randomIndex = Math.floor(Math.random() * (len - 1 - i));
      var itemAtIndex = cards[randomIndex];
      cards[randomIndex] = cards[len - 1 - i];
      cards[len - 1 - i] = itemAtIndex;
    }
    console.log(cards);
    this.setData({
      game_arr: cards,
      base_arr: arr
    })
    return cards;
  },
  gameNumber: function (grid_num) {
    var new_arr = [];
    for (var i = 1; i <= grid_num; i++) {
      let obj = {
        num: i,
        checked: false
      }
      new_arr.push(obj);
    }
    this.shuffle(new_arr);

  }
})