<template>
  <section class="tab__section tab__section--featrues">
    <div v-if="product"
         v-for="(attr, index) in this.product['attributes']['data']"
         class="tab__section-field">
      <div class="col-3">
        <h6 class="tab__section-name">{{attr['title']}}</h6>
      </div>
      <div class="col-9">
        <div class="tab__section-value">{{attr['values']['data'][0]['value']}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    product:Object
  }
}
</script>

<style></style>
