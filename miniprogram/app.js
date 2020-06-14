App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({      /* 不加这个调用不了云函数 */
      traceUser: true, 
    })
  },

})
