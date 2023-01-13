<template>
  <div class="container-fluid py-4">
    <div class="d-sm-flex justify-content-between">
      <div>
        <!--<argon-button color="white" variant="outline">New order</argon-button>-->
      </div>
      <div class="d-flex">
        <div class="dropdown d-inline">
          <argon-button
            id="navbarDropdownMenuLink2"
            color="white"
            variant="outline"
            class="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >Filters</argon-button
          >
          <ul
            class="dropdown-menu dropdown-menu-lg-start px-2 py-3"
            aria-labelledby="navbarDropdownMenuLink2"
            style
          >
            <li>
              <a class="dropdown-item border-radius-md" href="javascript:;"
                >Status: Paid</a
              >
            </li>
            <li>
              <a class="dropdown-item border-radius-md" href="javascript:;"
                >Status: Refunded</a
              >
            </li>
            <li>
              <a class="dropdown-item border-radius-md" href="javascript:;"
                >Status: Canceled</a
              >
            </li>
            <li>
              <hr class="horizontal dark my-2" />
            </li>
            <li>
              <a
                class="dropdown-item border-radius-md text-danger"
                href="javascript:;"
                >Remove Filter</a
              >
            </li>
          </ul>
        </div>
        <argon-button
          class="btn-icon ms-2 export"
          size
          color="white"
          variant="outline"
          data-type="csv"
        >
          <span class="btn-inner--icon">
            <i class="ni ni-archive-2"></i>
          </span>
          <span class="btn-inner--text">Export CSV</span>
        </argon-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card mt-4">
          <div class="table-responsive">
            <table id="order-list" class="table table-flush">
              <thead class="thead-light">
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="enquiry in enquirylist"
                  :key="enquiry.enquiryinfo.id"
                >
                  <td>
                    <div class="d-flex align-items-center">
                      <argon-checkbox />
                      <p class="text-xs font-weight-bold ms-2 mb-0">
                        #{{ enquiry.enquiryinfo.id }}
                      </p>
                    </div>
                  </td>
                  <td class="font-weight-bold">
                    <span class="my-2 text-xs">
                      {{ enquiry.enquiryinfo.created_at }}</span
                    >
                  </td>
                  <td class="text-xs font-weight-bold">
                    <div class="d-flex align-items-center">
                      <span
                        class="badge badge-sm"
                        :class="
                          enquiry.enquiryinfo.status === 'Delivred'
                            ? 'badge-success'
                            : enquiry.enquiryinfo.status === 'In Progress'
                            ? 'badge-info '
                            : 'badge-danger'
                        "
                        >{{ enquiry.enquiryinfo.status }}</span
                      >
                    </div>
                  </td>
                  <td class="text-xs font-weight-bold">
                    <div class="d-flex align-items-center">
                      <argon-button
                        :color="
                          enquiry.enquiryinfo.payment_status === 'Paid'
                            ? 'success'
                            : enquiry.enquiryinfo.payment_status ===
                              'Waiting Payment'
                            ? 'info'
                            : 'danger'
                        "
                        variant="outline"
                        class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                      >
                        <i
                          class="fas"
                          :class="
                            enquiry.enquiryinfo.payment_status === 'Paid'
                              ? 'fa-check'
                              : enquiry.enquiryinfo.payment_status ===
                                'Waiting Payment'
                              ? 'fa-exclamation-triangle'
                              : enquiry.enquiryinfo.payment_status ===
                                'Refunded'
                              ? 'fa-undo'
                              : 'fa-times'
                          "
                          aria-hidden="true"
                        ></i>
                      </argon-button>
                      <span class="text-xs">{{
                        enquiry.enquiryinfo.payment_status
                      }}</span>
                    </div>
                  </td>
                  <td class="text-xs font-weight-bold">
                    <div class="d-flex align-items-center">
                      <span>{{ enquiry.customer.full_name }}</span>
                    </div>
                  </td>
                  <td class="text-xs font-weight-bold">
                    <span class="my-2 text-xs">{{
                      enquiry.product.branded_name
                    }}</span>
                  </td>
                  <td class="text-xs font-weight-bold">
                    <span class="my-2 text-xs"
                      >${{ enquiry.enquiryinfo.total_enquiry }}</span
                    >
                  </td>
                  <td class="text-xs font-weight-bold">
                    <router-link
                      :to="{
                        name: 'Enquiry Details',
                        params: { id: enquiry.enquiryinfo.id },
                      }"
                    >
                      <argon-button
                        color="success"
                        variant="outline"
                        class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                      >
                        <i class="fas fa-eye" aria-hidden="true"></i>
                      </argon-button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import img1 from "../../../assets/img/team-2.jpg";
import img2 from "../../../assets/img/team-1.jpg";
import img3 from "../../../assets/img/team-3.jpg";
import img4 from "../../../assets/img/team-4.jpg";
import img5 from "../../../assets/img/team-5.jpg";
import img6 from "../../../assets/img/ivana-squares.jpg";

export default {
  name: "OrderList",
  components: {
    ArgonButton,
    ArgonCheckbox,
  },
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  mounted() {
    if (document.getElementById("order-list")) {
      const dataTableSearch = new DataTable("#order-list", {
        searchable: true,
        fixedHeight: false,
        perPageSelect: false,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function (el) {
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
  },
  async created() {
    await this.$store.dispatch("loadEnquiries");
  },
  computed: {
    enquirylist() {
      return this.$store.state.enquiries;
    },
  },
};
</script>
