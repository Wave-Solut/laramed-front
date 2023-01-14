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
                      >{{ category.name }}</a
                    >
                  </li>
                </ul>
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

import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
    AppFooter,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.state.showSidenav = false;
    this.$store.state.showNavbar = false;

    setNavPills();
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
    /*isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    },*/
  },
  methods: {
    ...mapMutations(["toggleDefaultLayout"]),
  },
};
</script>
