<template>
  <div
    class="p-3 bg-white card multisteps-form__panel border-radius-xl js-active position-relative"
    data-animation="FadeIn"
  >
    <div class="text-left row">
      <div class="mx-auto col-12">
        <h5 class="font-weight-normal">Product informations</h5>
        <p>Product : {{ product.productinfo.branded_name }}</p>

        <p class="text-bold text-xs mx-3">ATC Code :</p>
        <p class="text-bold text-xs mx-6">
          <small class="text-muted text-xs me-2">
            • {{ product.productinfo.atc }} - ({{
              product.productinfo.atcDescription
            }})
          </small>
        </p>

        <p class="text-bold text-xs mx-3">Available Form(s) :</p>

        <p
          class="text-bold text-xs mx-6"
          v-for="form in product.forms"
          :key="form.id"
        >
          <small class="text-muted text-xs me-2">
            • {{ form.name }} - {{ form.volume }}
          </small>
        </p>
        <p class="text-bold text-xs mx-3">Active Substance :</p>
        <p class="text-bold text-xs mx-6">
          <small
            class="text-muted text-xs"
            v-for="substance in product.substances"
            :key="substance.id"
          >
            • {{ substance.name }}
          </small>
        </p>
      </div>
    </div>
    <div class="multisteps-form__content">
      <div class="mt-3 row">
        <div class="col-12 col-sm-12"></div>
        <div class="mt-4 col-12 col-sm-12 mt-sm-0 text-start"></div>
      </div>
      <div class="mt-4 button-row d-flex">
        <button
          class="mb-0 btn bg-gradient-dark ms-auto js-btn-next"
          type="button"
          title="Next"
          @click="$parent.nextStep"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductChoice",
  props: {
    product: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>
