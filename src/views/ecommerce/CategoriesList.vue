<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">All Categories</h5>
                <p class="mb-0 text-xs"></p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <a
                    href="./add-category"
                    class="mb-0 btn bg-gradient-success btn-sm"
                    target="_blank"
                    >+&nbsp; New Category</a
                  >
                  <button
                    type="button"
                    class="mx-1 mb-0 btn btn-outline-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import"
                  >
                    Import
                  </button>
                  <div
                    id="import"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Import CSV
                          </h5>
                          <i class="fas fa-upload ms-3"></i>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p>You can browse your computer for a file.</p>
                          <input
                            type="text"
                            placeholder="Browse file..."
                            class="mb-3 form-control"
                          />
                          <div class="form-check">
                            <input
                              id="importCheck"
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="importCheck"
                              >I accept the terms and conditions</label
                            >
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="categories-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>Category Id</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="category in categories" :key="category.id">
                    <td>
                      <div class="d-flex">
                        <div class="my-auto form-check">
                          <input
                            id="customCheck1"
                            class="form-check-input"
                            type="checkbox"
                          />
                        </div>

                        <p class="my-auto ms-3 text-xs">{{ category.id }}</p>
                      </div>
                    </td>
                    <td class="text-xs">{{ category.name }}</td>

                    <td class="text-xs d-flex text-center">
                      <router-link
                        :to="{
                          name: 'Edit Category',
                          params: { id: category.id },
                        }"
                      >
                        <button
                          type="button"
                          class="btn btn btn-outline-dark btn-xs mx-2"
                        >
                          <i class="fas fa-user-edit text-secondary"></i>
                        </button>
                      </router-link>

                      <button
                        type="button"
                        class="btn btn btn-outline-dark btn-xs mx-2"
                        @click="deleteCategory(category.id)"
                      >
                        <i class="fas fa-trash text-secondary"> </i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Category Id</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";

export default {
  name: "CategoriesList",
  props: {},
  data() {
    return {};
  },
  mounted() {
    if (document.getElementById("categories-list")) {
      const dataTableSearch = new DataTable("#categories-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 7,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "soft-ui-" + type,
          };

          if (type === "csv") {
            data.columnDelimiter = "|";
          }

          dataTableSearch.export(data);
        });
      });
    }
    // setTooltip(this.$store.state.bootstrap);
  },

  methods: {
    async deleteCategory(categoryId) {
      await this.$store.dispatch("deleteCategory", categoryId);
    },
  },
  async created() {
    await this.$store.dispatch("loadCategories");
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>
