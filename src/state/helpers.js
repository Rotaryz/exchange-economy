import { mapGetters, mapActions, mapMutations } from 'vuex'

export const globalComputed = {
  ...mapGetters('global', ['statusBarHeight', '$vw', '$systemInfo', '$discountStandard', '$discountVersatile', '$discountPartner'])
}

export const globalMethods = {
  ...mapMutations('global', ['SET_NAVIGATION_CONFIG', 'SET_VW', 'SET_SYSTEM_INFO']),
  ...mapActions('global', ['getPriceTemplate'])
}
//
// export const cartComputed = {
//   ...mapGetters('cart', ['count'])
// }
//
export const goodsComputed = {
  ...mapGetters('goods', ['linkList'])
}
//
export const goodsMethods = {
  ...mapActions('goods', ['setLinkList'])
}
//
// export const cartMethods = {
//   ...mapActions('cart', ['setCartCount'])
// }
//
// export const jwtComputed = {
//   ...mapGetters('jwt', ['token', 'userInfo'])
// }
//
// export const jwtMethods = {
//   ...mapActions('jwt', ['setToken', 'setUserInfo'])
// }
