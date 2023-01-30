<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="main-content main-content-bg mt-0">
    <div
      class="page-header position-relative"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container pb-10 pb-lg-9 pt-7 postion-relative z-index-2">
        <div class="row justify-content-center">
          <div class="row">
            <div class="mx-auto text-center col-md-6 mt-4">
              <h3 class="text-white">Pharma PIPELINE</h3>
              <p class="text-white">
                The largest B2B pharmaceutical products marketplace
              </p>
            </div>
          </div>
          <div class="row">
            <div class="mx-auto text-center col-lg-8 col-md-6 col-7">
              <div class="mt-5 nav-wrapper position-relative z-index-2">
                <ul
                  id="tabs-pricing"
                  class="flex-row p-1 nav nav-pills nav-fill"
                  role="tablist"
                >
                  <li
                    class="nav-item"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <a
                      id="tabs-iconpricing-tab-1"
                      class="mb-0 nav-link active"
                      data-bs-toggle="tab"
                      href="#monthly"
                      role="tab"
                      aria-controls="monthly"
                      aria-selected="true"
                      @click="selectedCategory(category.id, category.name)"
                      >{{ category.name }}</a
                    >
                  </li>
                </ul>
              </div>
              <div
                class="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-white"
              >
                {{ categorySelected }}
              </div>

              <div class="row mt-5">
                <div class="col-md-12 mx-auto">
                  <div class="input-group">
                    <input
                      class="form-control border rounded-pill"
                      type="search"
                      id="example-search-input"
                      placeholder="Search.. 86000 Products+"
                      v-model="keyword"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mt-4">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="d-flex justify-content-start">
                      <div class="row">
                        <div class="mx-auto text-center col-md-12 mt-4">
                          <h3 class="text-gray-700">Filters</h3>
                        </div>
                        <div class="mx-auto col-md-12 mt-4">
                          <p class="text-gray-700">ATC</p>
                          <select
                            id="choices-atc-edit"
                            class="form-control"
                            name="choices-atc"
                            v-on:change="selectedValuesAtc"
                            multiple
                          >
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
                        <div class="mx-auto col-md-12 mt-4">
                          <p class="text-gray-700">Form</p>
                          <select
                            id="choices-form-edit"
                            class="form-control"
                            name="choices-form"
                            v-model="selectedValuesForm.svf"
                            multiple
                          >
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
                        <div class="mx-auto col-md-12 mt-4">
                          <p class="text-gray-700">Countries</p>
                          <select
                            id="choices-country-edit"
                            class="form-control"
                            name="choices-country"
                            v-model="selectedValuesCountry.svc"
                            multiple
                          >
                            <option
                              class="text-xs"
                              v-for="country in countries"
                              :value="country.id"
                              :key="country.id"
                            >
                              {{ country.name }}: {{ country.code }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-8 mt-4">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="row">
                  <div class="col-lg-12">
                    <div>
                      <p class="text-sm text-center">
                        <small class="text-muted"
                          >{{ Products.length }} Product(s) for sale</small
                        >
                      </p>
                      <div
                        class="card mb-3"
                        v-for="product in Products"
                        :key="product.product.id"
                      >
                        <div class="row">
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">
                                {{ product.product.branded_name }}
                              </h5>
                              <hr />
                              <div>
                                <p
                                  class="text-xs text-gray-500 text-left"
                                  v-for="form in product.forms"
                                  :key="form.id"
                                >
                                  <small class="text-muted text-xs"
                                    >{{ form.name }} - {{ form.volume }}
                                  </small>
                                </p>
                              </div>
                              <hr />
                              <p class="text-bold text-xs">
                                Product Country :
                                <small
                                  class="text-muted text-xs d-bloc"
                                  v-for="country in product.countries"
                                  :key="country.id"
                                  >{{ country.name }}-{{ country.code }}
                                </small>
                              </p>

                              <p class="text-bold text-xs">
                                Category :
                                <small class="text-muted text-xs"
                                  >{{ product.product.categoryName }}
                                </small>
                              </p>
                              <p class="text-bold text-xs">
                                Agency product number :
                                <small class="text-muted text-xs"
                                  >{{ product.product.product_number }}
                                </small>
                              </p>
                              <p class="text-bold text-xs">
                                Marketing-authorisation holder :
                                <small class="text-muted text-xs"
                                  >{{ product.product.marketing_auth_holder }}
                                </small>
                              </p>
                              <p class="text-bold text-xs">
                                ATC Code :
                                <small class="text-muted text-xs"
                                  >{{ product.product.atc }} ({{
                                    product.product.atcDescription
                                  }}
                                  )
                                </small>
                              </p>
                              <p class="text-bold text-xs">
                                Active Substance :
                                <small
                                  class="text-muted text-xs"
                                  v-for="substance in product.substances"
                                  :key="substance.id"
                                  >{{ substance.name }}
                                </small>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4 mt-4">
                            <div class="text-center">
                              <p class="card-text mb-1">
                                Average price {{ product.product.price }}/ pack
                              </p>

                              <router-link
                                :to="{
                                  name: 'Checkout Page',
                                  params: { id: product.product.id },
                                }"
                                class="px-0 nav-link font-weight-bold"
                                :class="
                                  isNavFixed && !darkMode
                                    ? ' opacity-8 text-dark'
                                    : 'text-white'
                                "
                              >
                                <button
                                  class="my-1 mx-2 btn bg-gradient-warning btn-sm me-2 w-80"
                                  type="button"
                                  name="button"
                                >
                                  <span class="d-sm-inline">Send Enquiry</span>
                                </button>
                              </router-link>

                              <p class="card-text mb-2">
                                <small class="text-muted text-xs"
                                  >Manufacturer usually replies 6 days</small
                                >
                              </p>
                            </div>
                            <div class="text-left mt-4 me-3">
                              <p class="card-text mb-1">
                                Manufacturer #MI-{{ product.product.user_id }}
                              </p>
                              <p class="text-xs text-gray-500 text-left">
                                A pharmaceutical manufacturer based in the EU
                                that is active in 10+ countries selling its
                                products in Europe, CIS, Asia, and the East for
                                20+ years. The production facilities are cGMP
                                compliant. The main dosage forms are solid
                                dosage forms. The company provides documentation
                                in CTD/eCTD format and stability studies. The
                                company has several branches in Europe.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import Choices from "choices.js";

import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "Marketplace",
  config: {
    allowInput: true,
  },
  components: {
    Navbar,
    AppFooter,
  },
  data() {
    return {
      keyword: null,
      Products: [],
      Categories: [],
      Atcs: [],
      Forms: [],
      Countries: [],
      categorySelected: null,
      idc: null,
      urlHasSetting: false,
      valc: null,
      selectedValuesAtc: {
        sva: null,
      },
      selectedValuesForm: {
        svf: null,
      },
      selectedValuesCountry: {
        svc: null,
      },
    };
  },
  watch: {
    keyword() {
      this.getResults();
    },
    selectedValuesAtc() {
      this.getResults();
    },
    selectedValuesForm() {
      this.getResults();
    },
    selectedValuesCountry() {
      this.getResults();
    },
  },
  async mounted() {
    this.$store.state.showSidenav = false;
    this.$store.state.showNavbar = false;
    setNavPills();
    await this.$store.dispatch("loadAtcs");
    this.getChoices("choices-atc-edit");
    this.getChoices("choices-form-edit");
    this.getChoices("choices-country-edit");
  },
  async created() {
    this.$store.state.hideConfigButton = true;
    this.toggleDefaultLayout();
    await this.$store.dispatch("loadCategories");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayout();
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    atcs() {
      return this.$store.state.atcs;
    },
    forms() {
      return this.$store.state.forms;
    },
    countries() {
      return this.$store.state.countries;
    },
  },
  methods: {
    ...mapMutations(["toggleDefaultLayout"]),
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

    selectedCategory: function (idc, valc) {
      this.categorySelected = valc;
      this.idc = idc;

      axios
        .get("/product/searchcategory", { params: { category: idc } })
        .then((res) => (this.Products = res.data))
        .catch((error) => {
          console.log(error);
        });
    },
    getResults() {
      axios
        .get("/product/livesearch", {
          params: {
            keyword: this.keyword,
            category: this.idc,
            sva: this.selectedValuesAtc.sva,
            svf: this.selectedValuesForm.svf,
            svc: this.selectedValuesCountry.svc,
          },
        })
        .then((res) => (this.Products = res.data))
        .catch((error) => {
          console.log(error);
        });
    },
    getCategories() {
      axios
        .get("/categorylist")
        .then((res) => (this.Categories = res.data.data))
        .catch((error) => {
          console.log(error);
        });
    },

    getAtcs() {
      axios
        .get("/atclist")
        .then((res) => (this.Atcs = res.data.data))
        .catch((error) => {
          console.log(error);
        });
    },
    getCountries() {
      axios
        .get("/countrylist")
        .then((res) => (this.Countries = res.data))
        .catch((error) => {
          console.log(error);
        });
    },
    getForms() {
      axios
        .get("/formlist")
        .then((res) => (this.Forms = res.data))
        .catch((error) => {
          console.log(error);
        });
    },
    customLabel({ name, description }) {
      return `${name} – ${description}`;
    },
    customCountryLabel({ code, name }) {
      return `${code} – ${name}`;
    },
  },
};
</script>
