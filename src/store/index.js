import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import VuexPersistence from "vuex-persist";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import router from "../router";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

let cart = window.localStorage.getItem("cart");
//let cartCount = window.localStorage.getItem("cartCount");

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isRTL: false,
    color: "",
    sidebarType: "bg-white",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    bootstrap,
    products: [],
    categories: [],
    atcs: [],
    countries: [],
    forms: [],
    substances: [],
    product: [],
    category: [],
    atc: [],
    form: [],
    substance: [],
    country: [],
    enquiries: [],
    enquiry: [],
    users: [],
    user: [],
    cart: cart ? JSON.parse(cart) : [],
    //cartCount: cartCount ? parseInt(cartCount) : 0,
    cartCount: 0,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector("#app");

      if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        sidenav_show.classList.contains("g-sidenav-hidden")
      ) {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      } else if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        sidenav_show.classList.contains("g-sidenav-pinned")
      ) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        window.innerWidth < 1200
      ) {
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    setSidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleDefaultLayout(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    SAVE_PRODUCTS(state, products) {
      state.products = products;
    },

    SAVE_PRODUCT(state, product) {
      state.product = product;
    },
    DELETE_PRODUCT(state, productId) {
      let products = state.products.filter((p) => p.id != productId);
      state.products = products;
    },
    SAVE_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SAVE_CATEGORY(state, category) {
      state.category = category;
    },
    DELETE_CATEGORY(state, categoryId) {
      let categories = state.categories.filter((p) => p.id != categoryId);
      state.categories = categories;
    },
    SAVE_ATCS(state, atcs) {
      state.atcs = atcs;
    },
    SAVE_ATC(state, atc) {
      state.atc = atc;
    },
    DELETE_ATC(state, atcId) {
      let atcs = state.atcs.filter((p) => p.id != atcId);
      state.atcs = atcs;
    },
    SAVE_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SAVE_COUNTRY(state, country) {
      state.country = country;
    },
    DELETE_COUNTRY(state, countryId) {
      let countries = state.countries.filter((p) => p.id != countryId);
      state.countries = countries;
    },
    SAVE_FORMS(state, forms) {
      state.forms = forms;
    },
    SAVE_FORM(state, form) {
      state.form = form;
    },
    DELETE_FORM(state, formtId) {
      let forms = state.forms.filter((p) => p.id != formtId);
      state.forms = forms;
    },
    SAVE_SUBSTANCES(state, substances) {
      state.substances = substances;
    },
    SAVE_SUBSTANCE(state, substance) {
      state.substance = substance;
    },
    DELETE_SUBSTANCE(state, substanceId) {
      let substances = state.substances.filter((p) => p.id != substanceId);
      state.substances = substances;
    },
    SAVE_ENQUIRIES(state, enquiries) {
      state.enquiries = enquiries;
    },
    SAVE_ENQUIRY(state, enquiry) {
      state.enquiry = enquiry;
    },
    SAVE_USERS(state, users) {
      state.users = users;
    },

    SAVE_USER(state, user) {
      state.user = user;
    },
    DELETE_USER(state, userId) {
      let users = state.users.filter((p) => p.id != userId);
      state.users = users;
    },
    ADD_TO_CART(state, item) {
      //console.log(item.title);
      state.cart.push(item);
      state.cartCount++;
    },
    REMOVE_FROM_CART(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        //let product = state.cart[index];
        state.cartCount -= state.cartCount;

        state.cart.splice(index, 1);
      }
    },
    // Persist Cart
    SAVE_CART(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
      window.localStorage.setItem("cartCount", state.cartCount);
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("setSidebarType", payload);
    },
    addToCart({ commit }, item) {
      commit("ADD_TO_CART", item);
      commit("SAVE_CART");
    },
    removeFromCart({ commit }, item) {
      commit("REMOVE_FROM_CART", item);
      commit("SAVE_CART");
    },
    emptyCart({ commit }) {
      this.state.cart = [];
      this.state.cartCount = 0;
      commit("SAVE_CART");
    },
    async loadProducts({ commit }) {
      await axios
        .get("/products")
        .then((result) => {
          commit("SAVE_PRODUCTS", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadVendorProducts({ commit }, userId) {
      await axios
        .get("/products/" + userId)
        .then((result) => {
          commit("SAVE_PRODUCTS", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async createProduct(productData) {
      try {
        await axios.post("/product/", {
          productData,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadProduct({ commit }, idproduct) {
      console.log(idproduct);
      return await axios
        .get("/product/" + idproduct)
        .then((result) => {
          commit("SAVE_PRODUCT", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteProduct({ commit }, product) {
      commit("DELETE_PRODUCT", product.id);
    },
    async loadCategories({ commit }) {
      return await axios
        .get("/categories")
        .then((result) => {
          commit("SAVE_CATEGORIES", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadCategory({ commit }, idcategory) {
      return await axios
        .get("/category/" + idcategory)
        .then(({ data }) => {
          commit("SAVE_CATEGORY", data.category);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteCategory({ commit }, idcat) {
      return await axios
        .delete("/category/" + idcat)
        .then(({ data }) => {
          console.log(data);
          commit("DELETE_CATEGORY", idcat);
          router.push({ name: "Categories List" });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadAtcs({ commit }) {
      return await axios
        .get("/atcs")
        .then((result) => {
          commit("SAVE_ATCS", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadAtc({ commit }, idatc) {
      return await axios
        .get("/atc/" + idatc)
        .then(({ data }) => {
          commit("SAVE_ATC", data.atc);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteAtc({ commit }, idatc) {
      return await axios
        .delete("/atc/" + idatc)
        .then(({ data }) => {
          console.log(data);
          commit("DELETE_ATC", idatc);
          router.push({ name: "Atcs List" });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadCountries({ commit }) {
      return await axios
        .get("/countries")
        .then((result) => {
          commit("SAVE_COUNTRIES", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadCountry({ commit }, idcountry) {
      return await axios
        .get("/country/" + idcountry)
        .then(({ data }) => {
          commit("SAVE_COUNTRY", data.country);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteCountry({ commit }, idcountry) {
      return await axios
        .delete("/country/" + idcountry)
        .then(({ data }) => {
          console.log(data);
          commit("DELETE_COUNTRY", idcountry);
          router.push({ name: "Countries List" });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadForms({ commit }) {
      return await axios
        .get("/forms")
        .then((result) => {
          commit("SAVE_FORMS", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadForm({ commit }, idform) {
      return await axios
        .get("/form/" + idform)
        .then(({ data }) => {
          commit("SAVE_FORM", data.form);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteForm({ commit }, idform) {
      return await axios
        .delete("/form/" + idform)
        .then(({ data }) => {
          console.log(data);
          commit("DELETE_FORM", idform);
          router.push({ name: "Forms List" });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadSubstances({ commit }) {
      return await axios
        .get("/substances")
        .then((result) => {
          commit("SAVE_SUBSTANCES", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadSubstance({ commit }, idsubstance) {
      return await axios
        .get("/substance/" + idsubstance)
        .then(({ data }) => {
          commit("SAVE_SUBSTANCE", data.substance);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteSubstance({ commit }, idsubstance) {
      return await axios
        .delete("/substance/" + idsubstance)
        .then(({ data }) => {
          console.log(data);
          commit("DELETE_SUBSTANCE", idsubstance);
          router.push({ name: "Substances List" });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadEnquiries({ commit }, idUser) {
      return await axios
        .get("/enquiries/" + idUser)
        .then((result) => {
          commit("SAVE_ENQUIRIES", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadEnquiry({ commit }, idenquiry) {
      return await axios
        .get("/enquiry/" + idenquiry)
        .then((result) => {
          commit("SAVE_ENQUIRY", result.data.enquiry);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadUsers({ commit }) {
      await axios
        .get("/users")
        .then((result) => {
          commit("SAVE_USERS", result.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async loadUser({ commit }, iduser) {
      // console.log(iduser);
      return await axios
        .get("/user/" + iduser)
        .then((result) => {
          commit("SAVE_USER", result.data.user);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    async deleteUser({ commit }, user) {
      commit("DELETE_USER", user.id);
    },
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getCategories: (state) => state.categories,
    getCategory: (state) => state.category,
    getAtcs: (state) => state.atcs,
    getAtc: (state) => state.atc,
    getForms: (state) => state.forms,
    getForm: (state) => state.form,
    getSubstances: (state) => state.substances,
    getSubstance: (state) => state.substance,
    getCountries: (state) => state.countries,
    getCountry: (state) => state.country,
    getEnquiries: (state) => state.enquiries,
    getEnquiry: (state) => state.enquiry,
    getCart: (state) => state.cart,
  },
  plugins: [
    vuexLocal.plugin,
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],

  modules: {
    auth,
  },
});
