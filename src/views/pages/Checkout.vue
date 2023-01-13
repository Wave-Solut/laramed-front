<template>
  <navbar />
  <div
    class="page-header position-relative"
    :style="{
      backgroundImage:
        'url(' + require('../../assets/img/pricing-header-bg.jpg') + ')',
      backgroundSize: 'cover',
    }"
  >
    <span class="mask bg-gradient-success opacity-6"></span>
    <div class="container pb-10 pb-lg-9 pt-7 postion-relative z-index-2">
      <div class="row">
        <div class="mx-auto text-center col-md-6 mt-4">
          <h3 class="text-white">Send Enquiry</h3>
          <p class="text-white">Get Response ASAP!</p>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-n11">
    <div
      class="container"
      v-for="product in product"
      :key="product.productinfo.id"
    >
      <div class="row mt-n8">
        <div class="mb-5 multisteps-form">
          <!--progress bar-->

          <div class="row">
            <div class="mx-auto my-5 col-12 col-lg-8">
              <div class="multisteps-form__progress">
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="User Info"
                  :class="activeStep >= 0 ? activeClass : ''"
                  @click="activeStep = 0"
                >
                  <span class="text-white">Product Selection</span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Address"
                  :class="activeStep >= 1 ? activeClass : ''"
                  @click="activeStep = 1"
                >
                  <span class="text-white"
                    >Deal type & markets of interest</span
                  >
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Order Info"
                  :class="activeStep === 2 ? activeClass : ''"
                  @click="activeStep = 2"
                >
                  <span class="text-white">Purchase forecast </span>
                </button>
              </div>
            </div>
          </div>
          <!--form panels-->
          <div class="row">
            <div class="m-auto col-12 col-lg-8">
              <form class="multisteps-form__form">
                <!--single form panel-->
                <product-choice
                  v-if="activeStep === 0"
                  v-bind:product="product"
                />
                <!--single form panel-->
                <deal-and-market
                  :class="activeStep === 1 ? activeClass : ''"
                  v-bind:countries="countries"
                  @passData="GetcData($event)"
                />
                <!--single form panel-->
                <purchase-forecast
                  v-bind:product="product"
                  v-bind:forms="forms"
                  ref="pf"
                  @passData="GetpfData($event)"
                  :class="activeStep === 2 ? activeClass : ''"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span
    class="error_message text-xs mb-4"
    v-show="isResponse"
    :class="isErrorInsert ? 'text-danger' : 'text-success'"
  >
    {{ errMessage }}
  </span>
  <b>{{ productInfoEnquiry }}</b>
  <b>{{ pfInfo }}</b>

  <app-footer />
</template>
<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import ProductChoice from "../applications/wizard/componentsCheckout/ProductChoice.vue";
import DealAndMarket from "../applications/wizard/componentsCheckout/DealAndMarket.vue";
import PurchaseForecast from "../applications/wizard/componentsCheckout/PurchaseForecast.vue";
import axios from "axios";

export default {
  name: "Checkout",
  components: {
    Navbar,
    AppFooter,
    ProductChoice,
    PurchaseForecast,
    DealAndMarket,
  },

  data() {
    return {
      activeClass: "js-active position-relative",
      activeStep: 0,
      formSteps: 2,
      pfInfo: "",
      productInfoEnquiry: {
        product_id: this.$route.params.id,
        customer_id: this.$store.state.auth.user.id,
        comment: "",
        pack_size: "",
        quantity: "",
        target_markets: "",
      },
      isResponse: false,
      isErrorInsert: false,
      errMessage: "Enquiry Sent",
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
    this.$store.state.showSidenav = false;
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = false;
    setNavPills();
  },
  async created() {
    await this.$store.dispatch("loadProduct", this.$route.params.id);
    await this.$store.dispatch("loadCountries");
    await this.$store.dispatch("loadForms");
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    countries() {
      return this.$store.state.countries;
    },
    forms() {
      return this.$store.state.forms;
    },
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1;
      } else {
        this.activeStep -= 1;
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },

    GetpfData(data) {
      //this.productInfoEnquiry.form_id = data.form_id;
      this.productInfoEnquiry.pack_size = data.pack_size;
      this.productInfoEnquiry.quantity = data.product_quantity;
      this.storeEnquiry();
    },
    GetcData(data) {
      this.productInfoEnquiry.target_markets = data.countries;
      this.productInfoEnquiry.comment = data.comment;
    },
    async storeEnquiry() {
      await axios
        .post("enquiry", this.productInfoEnquiry, this.axios_config)
        .then(({ data }) => {
          console.log(data.status);
          this.isResponse = true;
        })
        .catch(({ response }) => {
          this.errMessage = response.data.message;
          //console.log(response);
          this.isErrorInsert = true;
          this.isResponse = true;
        })
        .finally(() => {
          //alert("login finish ")
        });
    },
  },
  beforeUnmount() {
    this.$store.state.showFooter = true;
    if (this.$store.state.isPinned === false) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      sidenav_show.classList.remove("g-sidenav-hidden");
      sidenav_show.classList.add("g-sidenav-pinned");
      this.$store.state.isPinned = true;
    }
  },
};
</script>
