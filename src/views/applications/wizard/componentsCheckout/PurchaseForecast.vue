<template>
  <div
    class="p-3 bg-white card multisteps-form__panel border-radius-xl"
    data-animation="FadeIn"
  >
    <div class="text-left row">
      <div class="mx-auto col-12">
        <h5 class="font-weight-normal">Purchase Forecast</h5>
      </div>
    </div>

    <div class="multisteps-form__content">
      <div class="mt-4 row">
        <div class="mt-4 col-12 col-sm-6 mt-sm-0 text-start">
          <label>Available Form </label>
          <input
            class="mb-3 multisteps-form__input form-control"
            type="text"
            placeholder="I.e. 20 "
            v-for="form in product.forms"
            :value="form.name"
            :key="form.id"
            disabled
          />

          <!-- <select
            id="choices-form"
            class="form-control"
            name="choices-form"
            v-model="form_id"
          >
            <option
              v-for="form in product.forms"
              :value="form.id"
              :key="form.id"
            >
              {{ form.name }} {{ form.volume }}
            </option>
          </select>
          {{ form_id }}-->
        </div>

        <div class="mt-4 col-12 col-sm-6 mt-sm-0 text-start">
          <label>Pack Size</label>
          <select
            id="choices-pack"
            class="form-control"
            name="choices-pack"
            v-model="pack_size"
          >
            <option
              v-for="pack in product.sizes"
              :value="pack.size"
              :key="pack.size"
            >
              {{ pack.size }}
            </option>
          </select>

          <!--<input
            class="mb-3 multisteps-form__input form-control"
            type="number"
            placeholder="I.e. 20 "
            v-model="pack_size"
          />-->
        </div>

        <div class="mt-4 col-12 col-sm-6 mt-sm-0 text-start">
          <label>Quantity</label>
          <input
            class="multisteps-form__input form-control"
            type="number"
            placeholder="Eg. quantity"
            v-model="product_quantity"
          />
        </div>
      </div>
      <div class="mt-4 button-row d-flex">
        <!--<button
          class="mb-0 btn bg-gradient-light js-btn-prev"
          type="button"
          title="Prev"
          @click="$parent.prevStep"
        >
          Prev
        </button>-->

        <button
          class="mb-0 btn bg-gradient-dark ms-auto"
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
import Choices from "choices.js";
export default {
  name: "PurchaseForecast",

  props: {
    product: {
      type: Array,
    },
    forms: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
  },
  data() {
    return {
      form_id: "",
      product_quantity: "",
      pack_size: "",
      product_name: this.product.productinfo.branded_name,
      product_form: this.product.forms[0].name,
      config: {
        allowInput: true,
      },
    };
  },
  watch: {
    pack_size() {
      this.$emit("passData", {
        product_quantity: this.product_quantity,
        pack_size: this.pack_size,
        product_name: this.product_name,
        product_form: this.product_form,
      });
    },
    product_quantity() {
      this.$emit("passData", {
        product_quantity: this.product_quantity,
        pack_size: this.pack_size,
        product_name: this.product_name,
        product_form: this.product_form,
      });
    },
  },
  mounted() {
    this.getChoices("choices-pack");
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);

        return new Choices(element, {
          allowHTML: true,
          searchPlaceholderValue: "Type here",
        });
      }
    },
  },
};
</script>
