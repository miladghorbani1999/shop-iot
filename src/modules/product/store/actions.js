import axios from 'axios'
import { SET_PRODUCTS_MUTATIONS } from './types'

export default {
  async getProducts (context, { text }) {
    const { data } = await axios.get('http://127.0.0.1:8000/api/list-products')

    context.commit(SET_PRODUCTS_MUTATIONS, data.data)

    context.dispatch('log', text)

    // console.log(context.rootGetters['userName/name'])
    // console.log(context.rootState.userName.user.name)
    // context.dispatch('userName/userLog', null, { root: true })
    // context.commit('userName/SET_USER', null, { root: true })
  },
  log(ctx, payload) {
    console.log(payload)
  }
}
