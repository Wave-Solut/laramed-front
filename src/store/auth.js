import axios from "axios";
import router from "../router";

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: [],
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
  },
  actions: {
    async login({ commit }, userId) {
      return await axios
        .get("/user/" + userId)
        .then(({ data }) => {
          commit("SET_USER", data.user);
          console.log(data.user);
          commit("SET_AUTHENTICATED", true);
          router.push({ name: "Welcome" });
        })
        .catch((data) => {
          console.log(data);
          localStorage.removeItem("token", null);
          commit("SET_USER", {});
          commit("SET_AUTHENTICATED", false);
          router.push({ name: "signin cover" });
        });
    },
    async afterLogin({ commit }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await commit("SET_USER", JSON.parse(localStorage.getItem("user")));
      await commit("SET_AUTHENTICATED", true);
    },
    logout({ commit }) {
      delete axios.defaults.headers.common["Authorization"];
      commit("SET_USER", {});
      commit("SET_AUTHENTICATED", false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
};
