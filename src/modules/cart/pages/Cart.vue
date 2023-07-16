<template>
  <main class="main">
    <div class="container">
      <div class="cart">
        <h1 class="cart__title">سبد خرید</h1>
        <form action="">
          <p v-if="items.length < 1">your cart is empty</p>
          <CartItem v-for="item in items" :key="item.id" :item="item"/>
        </form>
        <div class="cart__info">
          <!--          <div class="cart__coupon">-->
          <!--            <form action="">-->
          <!--              <div class="cart__coupon-div">-->
          <!--                <input-->
          <!--                  type="text"-->
          <!--                  placeholder="enter coupon code"-->
          <!--                  class="cart__coupon-input"-->
          <!--                />-->
          <!--                <button class="btn-coupon">apply</button>-->
          <!--              </div>-->
          <!--            </form>-->
          <!--          </div>-->
          <div class="cart__table">
            <table>
              <tbody>
              <tr>
                <th>جمع کالا</th>
                <td>{{ formattedPrice(subtotal) }}
                  تومان
                </td>
              </tr>
              <!--                <tr>-->
              <!--                  <th>هزینه ارسال</th>-->
              <!--                  <td>{{ formattedPrice(tax) }}-->
              <!--                    تومان-->
              <!--                  </td>-->
              <!--                </tr>-->
              <!--                <tr>-->
              <!--                  <th>discount</th>-->
              <!--                  <td class="text-red">0</td>-->
              <!--                </tr>-->
              <tr>
                <th>جمع فاکتور</th>
                <td class="text-blue">{{ formattedPrice(total) }}</td>
              </tr>
              </tbody>
            </table>
            <input v-model="rfid" class="btn btn-rf" placeholder="کارت به rfid نزدیک کنید"/>
            <button style="display: block" @click="submitItem"
                    class="btn btn--brand btn--boxshadow">پرداخت
            </button>
            <button v-if="message!=null" style="display: block" class="btn btn--danger">
              {{ message }}
            </button>
            <button v-if="success!=null" style="display: block" class="btn btn--success">
              {{ success }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import CartItem from '../components/CartItem'
import axios from "axios";
export default {
  name: 'Cart',

  components: {
    CartItem
  },

  computed: {
    ...mapState('cart', ['items']),
    ...mapActions('cart', ['removeItem']),

    ...mapGetters('cart', ['subtotal', 'tax', 'total'])
  },
  data() {
    return {
      rfid: null,
      message: null,
      success: null,
    }
  },
  methods: {
    formattedPrice(price) {
      let p = String(price).split('.');
      return this.comma(p[0])
    },
    comma(num) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    },
    submitItem() {
      if (this.items.length < 0 || this.rfid == null) {
        this.message = "سبد خرید یا rfid خالی است."
        return;
      }

      let ids = this.items.map(function (item) {
        return {
          'p_id': item.id,
          'count': item.quantity,
        };
      })

      axios
        .post('http://0.0.0.0:8000/api/buy', {
          rfid: this.rfid,
          product_ids: ids,
        })
        .then((response) => {

          if (response.data.success === true) {

            this.success = response.data.message;
            this.message = null;
            this.items.map( (item)=>{
              actions.removeItem(item)
            })
          } else {
            this.message = response.data.message;
          }
        })
        .catch(function (response) {
        })
    }
  },
  mounted() {
    // setInterval(function () {
    //   let data = axios
    //     .get('http://0.0.0.0:8000/api/rfid')
    //     .then(function (response) {
    //       this.rfid = response.data.message;
    //     })
    //     .catch(function (response) {
    //
    //     })
    // },2000);
  },
  ...mapActions('cart', ['removeItem'])
}
</script>

<style>

.btn-rf {
  display: block;
  border: 1px solid;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn--danger {
  background-color: red;
  display: block;
  width: 100%;
  text-align: right;
  color: white;
  font-size: 14px;
  border: 5px;
  margin-top: 15px;
}

.btn--success {
  background-color: green;
  display: block;
  width: 100%;
  text-align: right;
  color: white;
  font-size: 14px;
  border: 5px;
  margin-top: 15px;
}
</style>
