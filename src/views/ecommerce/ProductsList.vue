<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">All Products</h5>
                <p class="mb-0 text-xs"></p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <a
                    href="./add-product"
                    class="mb-0 btn bg-gradient-success btn-sm"
                    target="_blank"
                    >+&nbsp; New Product</a
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
                            @change="uploadExcel"
                            id="excel"
                            type="file"
                            class="custom-file-input"
                          />
                          <label class="custom-file-label" for="excel">{{
                            fileName
                          }}</label>

                          <input
                            type="file"
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
                            @click="importExcel"
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
              <table id="products-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Atc</th>
                    <th>Active Substances</th>
                    <th>Forms</th>
                    <th>Agency product number</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.productInfo.id">
                    <td>
                      <div class="d-flex">
                        <div class="my-auto form-check">
                          <input
                            id="customCheck1"
                            class="form-check-input"
                            type="checkbox"
                          />
                        </div>

                        <p class="my-auto ms-3 text-xs">
                          {{ product.productInfo.branded_name }}
                        </p>
                      </div>
                    </td>
                    <td class="text-xs">
                      {{ product.productInfo.categoryName }}
                    </td>
                    <td class="text-xs">$ {{ product.productInfo.price }}</td>
                    <td class="text-xs">
                      {{ product.productInfo.atc }}
                      <span
                        data-toggle="tooltip"
                        data-placement="right"
                        :title="product.productInfo.atcDescription"
                      >
                        <i class="fas fa-info-circle"></i>
                      </span>
                    </td>
                    <td class="text-xs">
                      <span
                        v-for="substance in product.substances"
                        :key="substance.id"
                        style="width: 100%; display: block"
                      >
                        {{ substance.name }}</span
                      >
                    </td>
                    <td class="text-xs">
                      <span
                        v-for="form in product.forms"
                        :key="form.id"
                        style="width: 100%; display: block"
                      >
                        {{ form.name }} - {{ form.volume }}
                      </span>
                    </td>

                    <td class="text-xs">
                      {{ product.productInfo.product_number }}
                    </td>
                    <td class="text-xs">
                      <span
                        v-for="country in product.countries"
                        :key="country.id"
                        style="width: 100%; display: block"
                      >
                        {{ country.name }}</span
                      ><br />
                    </td>
                    <td class="text-xs">
                      <span class="badge badge-success badge-sm">In Stock</span>
                    </td>
                    <td class="text-xs d-flex text-center">
                      <router-link
                        :to="{
                          name: 'Product Info',
                          params: { id: product.productInfo.id },
                        }"
                      >
                        <button
                          type="button"
                          class="btn btn btn-outline-dark btn-xs mx-2"
                        >
                          <i class="fas fa-eye text-secondary"></i>
                        </button>
                      </router-link>

                      <router-link
                        :to="{
                          name: 'Edit Product',
                          params: { id: product.productInfo.id },
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
                        @click="deleteProduct(product.productInfo.id)"
                      >
                        <i class="fas fa-trash text-secondary"> </i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Atc</th>
                    <th>Active Substances</th>
                    <th>Forms</th>
                    <th>Agency product number</th>
                    <th>Country</th>
                    <th>Status</th>
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
import axios from "axios";

export default {
  name: "ProductsList",
  props: {},
  data() {
    return {
      fileName: "",
      attachment: "",
    };
  },
  mounted() {
    if (document.getElementById("products-list")) {
      const dataTableSearch = new DataTable("#products-list", {
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
    deleteProduct(productId) {
      this.$store.dispatch("deleteProduct", productId);
    },
  },

  importExcel() {
    this.$Progress.start();
    this.import
      .post("/api/barang/import")
      .then((data) => {
        console.log(data.data);
        this.$Progress.finish();
      })
      .catch(() => {
        this.$Progress.fail();
      });
  },
  uploadExcel(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    // console.log(file);
    if (
      file["type"] ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      this.fileName = file["name"];
      //this.import.excel = file;
      reader.onloadend = (file) => {
        console.log(file);
        this.import.excel = reader.result;
      };
      reader.readAsDataURL(file);
      //this.import.excel = file;
      console.log(this.import.excel);
    } else {
      /* Swal.fire({
        type: "warning",
        title: "Format file salah",
      });*/
    }
  },
  submitFile() {
    alert("clicked");
    this.formData = new FormData();
    this.formData.append("name", this.fileName);
    this.formData.append("file", this.$refs.file.files[0]);

    axios
      .post("productsfile", this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // handle success response
        console.log(response);
      })
      .catch((error) => {
        // handle failed response
        console.log(error);
      });
  },
  async created() {
    await this.$store.dispatch("loadProducts");
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
