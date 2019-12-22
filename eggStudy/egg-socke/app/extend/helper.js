/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-12-19 11:50:54
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2019-12-19 13:44:31
 * @Description: 数据格式化
 {
  data: {
    action: 'exchange',  // 'deny' || 'exchange' || 'broadcast'
    payload: {},
  },
  meta:{
    timestamp: 1512116201597,
    client: 'nNx88r1c5WuHf9XuAAAB',
    target: 'nNx88r1c5WuHf9XuAAAB'
  },
}
 */
module.exports = {
  parseMsg (action, payload = {}, meteadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now()
    }, meteadata)
    return {
      meta,
      data: {
        action,
        payload
      }
    }
  }
}