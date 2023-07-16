<template>
  <section v-if="product" class="tab__section tab__section--compare">
    <p>
      {{product.review.description}}
    </p>

  </section>
</template>

<script>
export default {
  props: {
    product: Object,
  }
}
</script>

<style></style>
