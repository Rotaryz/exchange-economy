import request from '@utils/http'

export default {
  /**
   * 会议列表[v1.5.3]
   * @param data
   * @param loading
   * @returns {*}
   */
  meetingList(args) {
    const url = `/business/meeting/meeting/index`
    return request.get({url, ...args})
  },
  /**
   * 会议列表[v1.5.3]
   * @param data
   * @param loading
   * @returns {*}
   */
  getCourseList(args) {
    const url = `/business/course/course/index`
    return request.get({url, ...args})
  },
  /**
   * 页面详情
   * @param data
   * @param loading
   * @returns {*}
   */
  pageDetail(args) {
    const url = `/business/content/module/page`
    return request.get({ url, ...args })
  },
  /**
   * 会议详情[v1.5.3]
   * @param data
   * @param loading
   * @returns {*}
   */
  getGoodsDetail(args) {
    const url = `/business/meeting/meeting/show`
    return request.get({ url, ...args })
  },
  /**
   * 解析手机号码[v1.5.5]
   * @param data
   * @param loading
   * @returns {*}
   */
  getWechatMobile(args) {
    const url = `/business/business-customer/customer/get-mobile`
    return request.post({ url, ...args })
  },
  /**
   * 下单[v1.5.5]
   * @param data
   * @param loading
   * @returns {*}
   */
  createOrder(args) {
    const url = `/business/meeting-order/order/create`
    return request.post({ url, ...args })
  },
  /**
   * 下单[v1.5.5]
   * @param data
   * @param loading
   * @returns {*}
   */
  saveMobile(args) {
    const url = `/business/business-customer/customer/set-mobile`
    return request.get({ url, ...args })
  }
}
