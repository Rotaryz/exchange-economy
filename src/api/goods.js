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
  }
}
