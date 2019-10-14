import HTTP from '@utils/http'
import { showLoading, hideLoading, showToast } from '@utils/wechat'
import { baseURL, ERR_OK, TIME_OUT } from '@utils/config'
import { silentAuthorization } from './common'
import storage from '@utils/storage'
import $$routes from '@utils/routes'

const COMMON_HEADER = {
  'Authorization': storage('token'),
  'BusinessAuthorization': storage('businessToken')
}
let ErrorNum = 0

HTTP.init(http => {
  http.config.timeout = TIME_OUT
  http.config.headers = COMMON_HEADER
  http.config.baseURL = baseURL.api
})

HTTP.setCallback({
  // 请求前处理
  beforeRequest({loading = true}) {
    if (loading) {
      showLoading()
    }
  },
  // 请求拦截
  willRequest(request) {
    return request
  },
  // 响应拦截
  willResponse(response) {
    return response
  },
  // 请求完成后的逻辑处理
  responseFulfilled(res, { url, loading = true, toast = true, doctor }) {
    // 可自定义处理loading
    if (typeof loading === 'function') {
      loading(res)
    } else if (loading) {
      hideLoading()
    }
    // 错误处理
    if (res.error_code !== ERR_OK) {
      // 1 code码处理
      errorCodeHandle(res.error_code, url, res.message)
      // 2 可自定义处理toast错误
      if (typeof toast === 'function') {
        toast(res)
      } else if (toast) {
        if (res.error_code !== 10000 && res.error_code !== 2040201) {
          showToast(res.message)
        }
      }
      // 3 错误处理
      console.error(url + ' <<<<<<接口异常>>>>> ' + JSON.stringify(res))
      if (typeof doctor === 'function') {
        doctor(res, url)
      } else {
        throw res
      }
    }
    return res
  }
})

// 错误码处理
function errorCodeHandle(code, url, msg) {
  switch (code) {
    // 登录凭证失效的时候
    case 10000:
      console.log(code)
      if (ErrorNum <= 0) {
        silentAuthorization()
        ErrorNum = -1
      }
      ErrorNum++
      break
    // 管理人员登录凭证失效的时候
    case 2040101:
      console.log(code)
      wx.redirectTo({ url: $$routes.work.WORK_LOGIN })
      break
    // 管理人员登录凭证失效的时候
    case 2040201:
      wx.navigateTo({ url: $$routes.work.VERIFY_RESULT + `?status=0&errorMsg=${msg}` })
      break
    case 2600101: // 活动不存在
    case 2010101: // 商品不存在
    case 2020101: // 服务不存在
      // wx.redirectTo({ url: $$routes.main.PAGE_MISSING })
      break
    case 2010102: // 商品已下架
    case 2020102: // 服务已下架
    case 2600102: // 活动已下架、结束
    case 3500105: // 大转盘活动实效
    case 2800101: // 会议删除
      wx.redirectTo({ url: $$routes.main.MEETING_ERROR })
      break
    case 2800102: // 会议下架
      wx.redirectTo({ url: $$routes.main.MEETING_ERROR })
      break
    default:
      break
  }
}
