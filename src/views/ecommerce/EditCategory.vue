<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-5 mx-3">
        <h4 class="text-white">{{ category.name }} | id : {{ category.id }}</h4>
      </div>
      <div
        class="text-right col-lg-6 d-flex flex-column justify-content-center"
      ></div>
    </div>
    <div class="row mt-8">
      <div class="mt-4 col-lg-12 mt-lg-0 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="font-weight-bolder">Category</h5>
            <div class="row">
              <span
                class="text-xs mb-4"
                :class="isError ? 'text-danger' : 'text-success'"
                >{{ errMessage }}</span
              >
              <div class="col-12 col-sm-6">
                <label>Category Name</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="vcategory.name"
                />
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
                      @click="saveCategory"
                    >
                      Save
                    </button>

                    <button
                      class="mb-0 btn btn-outline-dark btn-sm"
                      type="button"
                      name="button"
                      @click="deleteCategory"
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
import axios from "axios";

export default {
  name: "EditCategory",

  data() {
    return {
      config: {
        allowInput: true,
      },
      vcategory: {
        name: "",
      },
      isResult: false,
      isError: false,
      errMessage: "",
    };
  },
  mounted() {},
  methods: {
    deleteCategory() {
      console.log(this.$route.params.id);
      this.$store.dispatch("deleteCategory", this.$route.params.id);
    },

    saveCategory() {
      console.log(this.$route.params.id);

      axios
        .put("/category/" + this.$route.params.id, this.vcategory)
        .then(({ data }) => {
          console.log(data.message);
          this.errMessage = data.message;
          this.vcategory.name = data.category.name;
          this.isResult = true;
        })
        .catch(({ data }) => {
          this.errMessage = data.message;
          this.isError = true;
          this.isResult = true;
        })
        .finally(() => {
          //this.vcategory.name = this.$store.state.category.name;
        });
    },
  },
  async created() {
    console.log("The id is: " + this.$route.params.id);
    await this.$store.dispatch("loadCategory", this.$route.params.id);
    this.vcategory.name = this.$store.state.category.name;
  },
  computed: {
    category() {
      return this.$store.state.category;
    },
  },
};
</script>
