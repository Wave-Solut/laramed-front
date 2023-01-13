<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-5 mx-3">
        <h4 class="text-white">New Country</h4>
      </div>
      <div
        class="text-right col-lg-6 d-flex flex-column justify-content-center"
      ></div>
    </div>
    <div class="row mt-8">
      <div class="mt-4 col-lg-12 mt-lg-0 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="font-weight-bolder">ATC</h5>
            <div class="row">
              <span
                class="text-xs mb-4"
                :class="isError ? 'text-danger' : 'text-success'"
                >{{ errMessage }}
              </span>
              <div class="col-12 col-sm-6">
                <label>Atc Code</label>
                <input class="form-control" type="text" v-model="vatc.name" />
              </div>
              <div class="col-12 col-sm-6">
                <label>Atc Description</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="vatc.description"
                />
              </div>

              <div class="col-12 col-sm-6">
                <label>Parent</label>
                <select
                  id="choices-atc-edit"
                  class="form-control"
                  name="choices-atc"
                  :v-model="vatc.parent_id"
                >
                  <option disabled selected>Select Atc</option>
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
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="row">
                <div class="col-lg-12">
                  <div class="d-flex justify-content-end">
                    <button
                      class="mb-0 btn bg-gradient-success btn-sm me-2"
                      type="button"
                      name="button"
                      @click="saveAtc"
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
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import axios from "axios";

export default {
  name: "AddAtc",

  data() {
    return {
      config: {
        allowInput: true,
      },
      vatc: {
        name: "",
        description: "",
        parent_id: "0",
      },
      isResult: false,
      isError: false,
      errMessage: "",
    };
  },
  mounted() {
    this.getChoices("choices-atc-edit");
  },
  async created() {
    await this.$store.dispatch("loadAtcs");
  },
  computed: {
    atcs() {
      return this.$store.state.atcs;
    },
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

    async saveAtc() {
      await axios
        .post("/atc", this.vatc)
        .then(({ data }) => {
          console.log(data.message);
          this.errMessage = data.message;
          this.vatc.name = data.atc.name;
          this.vatc.description = data.atc.description;
          this.vatc.parent_id = data.atc.parent_id;
          this.isResult = true;
        })
        .catch(({ data }) => {
          this.errMessage = data.message;
          this.isError = true;
          this.isResult = true;
        })
        .finally(() => {
          //alert("form created");
        });
    },
  },
};
</script>
