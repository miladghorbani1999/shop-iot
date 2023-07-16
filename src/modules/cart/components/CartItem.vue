<template>
  <div v-if="item" class="cart__item">
    <div class="cart__row">
      <div class="cart__image">
        <a href="" class="cart__image-link">
          <img
            :src="item['images']['data'][0]['link'][0]"
            alt=""
            class="cart__image-img"
          />
        </a>
      </div>
      <div class="cart__details">
        <h5 class="cart__details-h5">
          <router-link
            :to="{ name: 'Product', params: { id: item.id } }"
            class="cart__details-link"
          >
            {{ item.title_fa }}
          </router-link>
        </h5>
        <p>قیمت:
          {{ formattedPrice(item.price) }}
          تومان
        </p>
        <div class="cart__deatils-code">
          تعداد :{{ item.quantity }}
        </div>
      </div>
      <div class="cart__amounts">
        <div class="cart__amounts-div">
          <input
            type="number"
            class="txt"
            placeholder="quantity"
            v-model.number="quantity"
            max="1000"
            min="1"
          />
          <button
            @click="changeQuantity({ product: item, quantity })"
            class="btn btn--brand btn--boxshadow"
            style="margin-right: 1rem"
            type="button"
          >
            افزودن به سبد خرید
          </button>
          <button
            type="button"
            @click="removeItem(item)"
            class="cart__amounts-remove"
            style="cursor: pointer"
          >
            حذف
          </button>
        </div>
      </div>
      <div class="cart__total">
        <div class="cart__total-div">
          <h6 class="cart__total-title">جمع محصول</h6>
          {{ formattedPrice(item.price * item.quantity) }}
          تومان
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CartItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      quantity: this.item.quantity
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
    ...mapActions('cart', ['changeQuantity', 'removeItem'])
  },
  mounted() {
    console.log(this.item)
  }
}
</script>

<style></style>
