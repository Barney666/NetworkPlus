// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('User').doc(event.familyId).update({
      data: {
        bindInfo: {
          familyName: event.realName,
        }
      }
    })
  } catch(e) {
    console.error(e)
  }

  try {
    await db.collection('User').doc(event.selfId).update({
      data:{
        userInfo:event.userInfo,
        realInfo:event.realInfo,
        bindInfo:event.bindInfo,
      }
    })
  } catch(e) {
    console.error(e)
  }

}