<template>
  <div
    class="py-4 container-fluid"
    v-for="product in product"
    :key="product.productinfo.id"
  >
    <div class="row">
      <div class="col-lg-5 mx-3">
        <h4 class="text-white">
          {{ product.productinfo.branded_name }} | id :
          {{ product.productinfo.id }}
        </h4>
        <p class="text-white text-xs">
          <span v-for="form in product.forms" :key="form.id">
            {{ form.name }} - {{ form.volume }} <br />
          </span>
        </p>
      </div>
      <div
        class="text-right col-lg-6 d-flex flex-column justify-content-center"
      ></div>
    </div>
    <div class="row">
      <div class="mt-4 col-lg-7 mt-lg-0 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="font-weight-bolder">Product Informations</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Branded Name</label>
                <input
                  class="form-control"
                  type="text"
                  :value="product.productinfo.branded_name"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>Category</label>
                <select
                  id="choices-category-edit"
                  class="form-control"
                  name="choices-category"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    :selected="category.id == product.productinfo.categoryId"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="col-sm-6 mt-4">
                <label>ATC</label>
                <select
                  id="choices-atc-edit"
                  class="form-control"
                  name="choices-atc"
                >
                  <option
                    v-for="atc in atcs"
                    :value="atc.id"
                    :key="atc.id"
                    :selected="atc.id == product.productinfo.atcId"
                  >
                    {{ atc.name }}: {{ atc.description }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <h5 class="mt-4">Forms</h5>
              <div class="row" v-for="pform in product.forms" :key="pform.id">
                <div class="col-8">
                  <label>Form </label>
                  <select
                    id="choices-form-edit"
                    class="form-control"
                    name="choices-form"
                  >
                    <option
                      v-for="form in forms"
                      :value="form.id"
                      :key="form.id"
                      :selected="form.id == pform.id"
                    >
                      {{ form.name }}
                    </option>
                  </select>
                </div>

                <div class="col-12">
                  <label class="mt-4">Pack Size</label>

                  <select
                    id="choices-packsize-edit"
                    class="form-control"
                    name="choices-sizes"
                    multiple
                  >
                    <option
                      v-for="psize in product.sizes"
                      :value="psize.size"
                      :key="psize.size"
                      selected
                    >
                      {{ psize.size }}
                    </option>
                    <option v-for="size in 1000" :value="size" :key="size">
                      {{ size }}
                    </option>
                  </select>
                </div>

                <div class="col-6">
                  <label class="">Volume</label>
                  <input
                    class="form-control"
                    type="number"
                    :value="pform.volume"
                    placeholder="i.e. 5 ml"
                  />
                </div>
                <div class="col-6">
                  <label>Unit</label>

                  <select
                    id="choices-unit-edit"
                    class="form-control"
                    name="choices-unit"
                    v-model="pform.unit"
                  >
                    <option class="text-xs">ml</option>
                    <option class="text-xs">mg</option>
                    <option class="text-xs">L</option>
                    <option class="text-xs">g</option>
                  </select>
                </div>
              </div>

              <div class="col-6">
                <label class="mt-4">Marketing Authorization Holder</label>
                <input
                  class="form-control"
                  type="text"
                  :value="product.productinfo.marketing_auth_holder"
                />
              </div>
              <div class="col-6">
                <label class="mt-4">Product Number</label>
                <input
                  class="form-control"
                  type="text"
                  :value="product.productinfo.product_number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card">
          <div class="card-body">
            <div
              class="row"
              v-for="substance in product.substances"
              :key="substance.id"
            >
              <h5 class="font-weight-bolder">Substances</h5>
              <div class="col-6">
                <label>Substance</label>

                <input
                  class="form-control"
                  type="text"
                  :value="substance.name"
                  placeholder="i.e. 5 ml"
                />
                <!--<select
                  id="choices-substance-edit"
                  class="form-control"
                  name="choices-substance"
                >
                  <option :value=substance.id >{{substance.name}}</option>
                  
                </select>-->
              </div>

              <div class="col-6" style="display: none">
                <label class="">Strength</label>
                <input
                  class="form-control"
                  type="text"
                  value=""
                  placeholder="i.e. 50 mg"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="mt-4">Countries</label>
                <select
                  id="choices-countries-edit"
                  class="form-control"
                  name="choices-countries"
                  multiple
                >
                  <option
                    v-for="pcountry in product.countries"
                    :value="pcountry.id"
                    :key="pcountry.id"
                    selected
                  >
                    {{ pcountry.code }}-{{ pcountry.name }}
                  </option>
                  <option
                    v-for="country in countries"
                    :value="country.id"
                    :key="country.id"
                  >
                    {{ country.code }} - {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <div class="row">
              <h5 class="font-weight-bolder">Pricing</h5>
              <div class="col-6">
                <label>Price</label>
                <!--</input>:value=(parseFloat(product.productinfo.price).toFixed(2)/100).toFixed(2)-->
                <input
                  class="form-control"
                  type="number"
                  :value="product.productinfo.price"
                />
              </div>
              <div class="col-6">
                <label>Currency</label>
                <select
                  id="choices-currency-edit"
                  class="form-control"
                  name="choices-sizes"
                >
                  <option value="usd" selected>USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-body">
            <div class="row">
              <h5 class="font-weight-bolder">Actions</h5>
              <div class="row">
                <div class="col-lg-12">
                  <div class="d-flex justify-content-end">
                    <router-link
                      :to="{
                        name: 'Product Info',
                        params: { id: product.productinfo.id },
                      }"
                    >
                      <button
                        class="mb-0 btn bg-gradient-success btn-sm me-2"
                        type="button"
                        name="button"
                      >
                        Save
                      </button>
                    </router-link>

                    <button
                      class="mb-0 btn btn-outline-dark btn-sm"
                      type="button"
                      name="button"
                      @click="deleteProduct(product.productinfo.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";

export default {
  name: "EditProduct",
  data() {
    return {
      config: {
        allowInput: true,
      },
    };
  },
  mounted() {
    this.getChoices("choices-category-edit");
    this.getChoices("choices-atc-edit");
    this.getChoices("choices-form-edit");
    this.getChoices("choices-unit-edit");
    this.getChoices("choices-currency-edit");

    if (document.getElementById("choices-countries-edit")) {
      var countries = document.getElementById("choices-countries-edit");
      const countriesSelected = new Choices(countries, {
        removeItemButton: true,
        searchEnabled: true,
        allowHTML: true,
        searchPlaceholderValue: "Type here",
      });

      countriesSelected.setChoices(
        [
          /*{
            value: "Two",
            label: "Out of Stock",
            selected: true,
          },*/
        ],
        "value",
        "label",
        false
      );
    }
    if (document.getElementById("choices-packsize-edit")) {
      var sizes = document.getElementById("choices-packsize-edit");
      const sizesSelected = new Choices(sizes, {
        removeItemButton: true,
        searchEnabled: true,
        allowHTML: true,
        searchPlaceholderValue: "Type here",
      });

      sizesSelected.setChoices(
        [
          /*{
            value: "Two",
            label: "Out of Stock",
            selected: true,
          },*/
        ],
        "value",
        "label",
        false
      );
    }
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);

        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          searchPlaceholderValue: "Type here",
        });
      }
    },
  },
  async created() {
    console.log("The id is: " + this.$route.params.id);
    await this.$store.dispatch("loadProduct", this.$route.params.id);
    await this.$store.dispatch("loadAtcs");
    await this.$store.dispatch("loadCategories");
    await this.$store.dispatch("loadForms");
    await this.$store.dispatch("loadCountries");
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    atcs() {
      return this.$store.state.atcs;
    },
    categories() {
      return this.$store.state.categories;
    },
    forms() {
      return this.$store.state.forms;
    },
    countries() {
      return this.$store.state.countries;
    },
  },
};
</script>
