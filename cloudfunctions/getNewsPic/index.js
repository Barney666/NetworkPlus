// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
 
// 云函数入口函数
exports.main = async (event, context) => {
  const fileID = ["cloud://youth-ky2ez.796f-youth-ky2ez-1301271089/IMG_9520.JPG	"]
  return await cloud.getTempFileURL({
    fileList:fileID
  })
}  