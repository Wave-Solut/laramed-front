<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-5 mx-3">
        <h4 class="text-white">New Product</h4>
        <p class="text-white"></p>
      </div>
      <div
        class="text-right col-lg-6 d-flex flex-column justify-content-center"
      ></div>
    </div>
    <div class="row">
      <div class="mt-4 col-lg-7 mt-lg-0 mb-4">
        <div class="card">
          <div class="card-body">
            <span
              class="error_message text-xs mb-4"
              v-show="isResponse"
              :class="isErrorInsert ? 'text-danger' : 'text-success'"
            >
              {{ errMessage }}
            </span>
            <h5 class="font-weight-bolder">Product Informations</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Branded Name</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="productInformations.branded_name"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>Category</label>
                <select
                  id="choices-category-edit"
                  class="form-control text-xs"
                  name="choices-category"
                  v-model="productInformations.category_id"
                >
                  <option></option>
                  <option
                    class="text-xs"
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
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
                  v-model="productInformations.atc"
                >
                  <option></option>
                  <option
                    class="text-xs"
                    v-for="atc in atcs"
                    :value="atc.id"
                    :key="atc.id"
                  >
                    {{ atc.name }}: {{ atc.description }}
                  </option>
                </select>
              </div>
            </div>
            <h5 class="mt-4">Forms</h5>
            <div class="row">
              <div
                class="row"
                v-for="(pform, index) in productForms"
                :key="index"
              >
                <div class="col-6">
                  <label :for="`data[${index}]form`">Form </label>
                  <select
                    v-bind:id="`choices-form-edit-${index}`"
                    class="form-control"
                    :name="`data[${index}]form`"
                    v-model="pform.form_id"
                  >
                    <option></option>
                    <option
                      class="text-xs"
                      v-for="form in forms"
                      :value="form.id"
                      :key="form.id"
                    >
                      {{ form.name }}
                    </option>
                  </select>
                </div>
                <div class="col-4">
                  <label :for="`data[${index}]volume`" class="">Volume</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="i.e. 5 ml"
                    v-model="pform.volume"
                  />
                </div>

                <div class="col-2 mt-2 d-flex justify-content-center p-4">
                  <button
                    class="mb-0 btn btn-outline-dark btn-xs"
                    type="button"
                    name="button"
                    v-on:click="productForms.splice(index, 1)"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div class="col-3 mt-2">
                <button
                  class="mb-0 btn bg-gradient-success btn-xs me-2"
                  type="button"
                  name="button"
                  v-on:click="productForms.push({})"
                >
                  Add
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label class="mt-4">Marketing Authorization Holder</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="productInformations.marketing_auth_holder"
                />
              </div>
              <div class="col-6">
                <label class="mt-4">Product Number</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="productInformations.product_number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <h5 class="font-weight-bolder">Substances</h5>
              <div class="col-6">
                <label>Substance</label>

                <input
                  class="form-control"
                  type="text"
                  placeholder=""
                  v-model="productSubstances.name"
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
                  v-model="productCountries.country_id"
                >
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
                <input
                  class="form-control"
                  type="number"
                  v-model="productInformations.price"
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
                    <button
                      class="mb-0 btn bg-gradient-success btn-sm me-2"
                      type="button"
                      name="button"
                      @click="createProduct"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b>{{ productInformations }}</b>
      <b>{{ productSubstances }}</b>
      <b>{{ productForms }}</b>
      <b>{{ productCountries }}</b>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import axios from "axios";
export default {
  name: "AddProduct",

  components: {},
  data() {
    return {
      productObject: [],

      productInformations: {
        branded_name: "",
        category_id: "",
        atc: "",
        marketing_auth_holder: "",
        product_number: "",
        price: "",
        user_id: this.$store.state.auth.user.id,
      },
      productForms: [
        {
          product_id: "",
          form_id: "",
          volume: "",
        },
      ],
      productSubstances: {
        name: "",
      },
      productCountries: {
        product_id: "",
        country_id: "",
      },
      productInsertedId: "",
      substanceInsertedId: "",
      isErrorInsert: false,
      isResponse: false,
      errMessage: "Product Created Successfully",
      config: {
        allowInput: true,
      },
      axios_config: {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {},
      },
    };
  },
  mounted() {
    this.getChoices("choices-category-edit");
    this.getChoices("choices-atc-edit");
    this.getChoices("choices-form-edit-0");
    this.getChoices("choices-form-edit-1");
    this.getChoices("choices-form-edit-2");
    this.getChoices("choices-form-edit-3");
    this.getChoices("choices-form-edit-4");
    //this.getChoices("choices-substance-edit");
    this.getChoices("choices-currency-edit");

    if (document.getElementById("choices-countries-edit")) {
      var countries = document.getElementById("choices-countries-edit");
      const countriesSelected = new Choices(countries, {
        removeItemButton: true,
        allowHTML: true,
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
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          searchPlaceholderValue: "Type here",
          removeItemButton: true,
        });
      }
    },

    async createProduct() {
      await axios
        .post("product", this.productInformations, this.axios_config)
        .then(({ data }) => {
          this.productInsertedId = data.product.id;
          this.updateProductId();
          this.createSubstance();
        })
        .catch(({ data }) => {
          this.errMessage = data.messsage;
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
    async createProductCountries() {
      await axios
        .post("productcountry", this.productCountries, this.axios_config)
        .then(({ data }) => {
          console.log(data.messsage);
          this.isErrorInsert = false;
          this.isResponse = true;
        })
        .catch(({ data }) => {
          this.errMessage = data.messsage;
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
    async createProductForms() {
      await axios
        .post("productform", this.productForms, this.axios_config)
        .then(({ data }) => {
          console.log(data.messsage);
          this.createProductCountries();
        })
        .catch(({ data }) => {
          this.errMessage = data.messsage;
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
    async createProductSubstance() {
      await axios
        .post("productsubstance", this.productSubstances, this.axios_config)
        .then(({ data }) => {
          console.log(data.messsage);
          this.createProductForms();
        })
        .catch(({ data }) => {
          //alert(data.message)
          this.errMessage = data.messsage;
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
    async createSubstance() {
      await axios
        .post("substance", this.productSubstances, this.axios_config)
        .then(({ data }) => {
          console.log(data.messsage);

          this.substanceInsertedId = data.substance.id;
          this.productSubstances.substance_id = this.substanceInsertedId;
          this.productSubstances.product_id = this.productInsertedId;

          this.createProductSubstance();
        })
        .catch(({ data }) => {
          this.errMessage = data.messsage;
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
    async updateProductId() {
      this.productSubstances.product_id = this.productInsertedId;
      this.productCountries.product_id = this.productInsertedId;
      await this.productForms.forEach(this.setProductInsertedId);
    },
    setProductInsertedId(item) {
      item.product_id = this.productInsertedId;
    },
  },
  async created() {
    await this.$store.dispatch("loadAtcs");
    await this.$store.dispatch("loadCategories");
    await this.$store.dispatch("loadForms");
    await this.$store.dispatch("loadCountries");
  },
  computed: {
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
