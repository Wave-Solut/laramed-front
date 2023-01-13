<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card my-5">
          <div class="card-header p-3 pb-0 mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6>Order Details</h6>
                <p class="text-sm mb-0">
                  Order no.
                  <b>{{ enquiryData.enquiryinfo.id }}</b> from
                  <b>{{ enquiryData.enquiryinfo.created_at }}</b>
                </p>
              </div>
              <argon-button
                color="secondary"
                variant="gradient"
                class="ms-auto mb-0"
                >Invoice</argon-button
              >
            </div>
            <span
              class="badge badge-sm"
              :class="
                enquiryData.enquiryinfo.status === 'Delivred'
                  ? 'badge-success'
                  : enquiryData.enquiryinfo.status === 'In Progress'
                  ? 'badge-info '
                  : 'badge-danger'
              "
              >{{ enquiryData.enquiryinfo.status }}</span
            >
          </div>
          <div class="card-body p-3 pt-0">
            <hr class="horizontal dark mt-0 mb-4" />
            <div class="row">
              <h6 class="text-lg my-2">
                {{ enquiryData.product.productinfo.branded_name }} (
                <b>
                  {{ enquiryData.product.form.name }} -
                  {{ enquiryData.product.productForm.volume }} </b
                >)
              </h6>
              <div class="col-lg-6 col-md-6 col-12 mb-3">
                <div
                  class="card card-body border card-plain border-radius-lg d-flex"
                >
                  <h6 class="mb-3">Product Informations</h6>
                  <div>
                    <p class="text-xs">
                      ATC Code:
                      <b>
                        {{ enquiryData.product.atc.name }} - ({{
                          enquiryData.product.atc.description
                        }})</b
                      >
                    </p>
                    <p class="text-xs">
                      Category:
                      <b> {{ enquiryData.product.category.name }} </b>
                    </p>
                    <p class="text-xs">
                      Marketing Auth Holder:
                      <b>
                        {{
                          enquiryData.product.productinfo.marketing_auth_holder
                        }}
                      </b>
                    </p>
                    <p class="text-xs">
                      Product Number:
                      <b>
                        {{ enquiryData.product.productinfo.product_number }}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 mb-3">
                <div
                  class="card card-body border card-plain border-radius-lg d-flex"
                >
                  <h6 class="mb-3">Pack Informations</h6>
                  <p class="text-xs">
                    Form and Volume :
                    <b>
                      {{ enquiryData.product.form.name }} -
                      {{ enquiryData.product.productForm.volume }}
                    </b>
                  </p>
                  <p class="text-xs">
                    Pack size:
                    <b>{{ enquiryData.enquiryinfo.pack_size }}</b> / Packs
                  </p>
                  <p class="text-xs">
                    Quantity :
                    <b>{{ enquiryData.enquiryinfo.quantity }}</b> Packs
                  </p>
                  <p class="text-xs">
                    Target Market(s) :
                    <b
                      v-for="country in enquiryData.countries"
                      :key="country.id"
                      >{{ country.name }}</b
                    >
                  </p>
                </div>
              </div>
            </div>
            <hr class="horizontal dark mt-4 mb-4" />
            <div class="row">
              <div class="col-lg-3 col-md-6 col-12">
                <h6 class="mb-3">Track order</h6>
                <div class="timeline timeline-one-side">
                  <div class="timeline-block mb-3">
                    <span class="timeline-step">
                      <i class="ni ni-bell-55 text-secondary"></i>
                    </span>
                    <div class="timeline-content">
                      <h6 class="text-dark text-sm font-weight-bold mb-0">
                        Order received
                      </h6>
                      <p
                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                      >
                        22 DEC 7:20 AM
                      </p>
                    </div>
                  </div>
                  <div class="timeline-block mb-3">
                    <span class="timeline-step">
                      <i class="ni ni-html5 text-secondary"></i>
                    </span>
                    <div class="timeline-content">
                      <h6 class="text-dark text-sm font-weight-bold mb-0">
                        Generate order id #1832412
                      </h6>
                      <p
                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                      >
                        22 DEC 7:21 AM
                      </p>
                    </div>
                  </div>
                  <div class="timeline-block mb-3">
                    <span class="timeline-step">
                      <i class="ni ni-cart text-secondary"></i>
                    </span>
                    <div class="timeline-content">
                      <h6 class="text-dark text-sm font-weight-bold mb-0">
                        Order transmited to courier
                      </h6>
                      <p
                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                      >
                        22 DEC 8:10 AM
                      </p>
                    </div>
                  </div>
                  <div class="timeline-block mb-3">
                    <span class="timeline-step">
                      <i
                        class="ni ni-check-bold text-success text-gradient"
                      ></i>
                    </span>
                    <div class="timeline-content">
                      <h6 class="text-dark text-sm font-weight-bold mb-0">
                        Order delivered
                      </h6>
                      <p
                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                      >
                        22 DEC 4:54 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-6 col-12">
                <h6 class="mb-3">Payment Status</h6>

                <div class="d-flex align-items-center mb-4">
                  <argon-button
                    :color="
                      enquiryData.enquiryinfo.payment_status === 'Paid'
                        ? 'success'
                        : enquiryData.enquiryinfo.payment_status ===
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
                        enquiryData.enquiryinfo.payment_status === 'Paid'
                          ? 'fa-check'
                          : enquiryData.enquiryinfo.payment_status ===
                            'Waiting Payment'
                          ? 'fa-exclamation-triangle'
                          : enquiryData.enquiryinfo.payment_status ===
                            'Refunded'
                          ? 'fa-undo'
                          : 'fa-times'
                      "
                      aria-hidden="true"
                    ></i>
                  </argon-button>
                  <span class="text-xs">{{
                    enquiryData.enquiryinfo.payment_status
                  }}</span>
                </div>
                <h6 class="mb-3">Billing Information</h6>
                <ul class="list-group">
                  <li
                    class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="mb-3 text-sm">
                        {{ enquiryData.customer.full_name }}
                      </h6>
                      <span class="mb-2 text-xs">
                        Company Name:
                        <span class="text-dark font-weight-bold ms-2"
                          >Viking Burrito</span
                        >
                      </span>
                      <span class="mb-2 text-xs">
                        Email Address:
                        <span class="text-dark ms-2 font-weight-bold">{{
                          enquiryData.customer.email
                        }}</span>
                      </span>
                      <span class="text-xs">
                        VAT Number:
                        <span class="text-dark ms-2 font-weight-bold"
                          >FRB1235476</span
                        >
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-12 ms-auto">
                <h6 class="mb-3">Order Summary</h6>
                <div class="d-flex justify-content-between">
                  <span class="mb-2 text-sm">Product Price:</span>
                  <span class="text-dark font-weight-bold ms-2"
                    >${{ enquiryData.product.productinfo.price }}</span
                  >
                </div>
                <div class="d-flex justify-content-between">
                  <span class="mb-2 text-sm">Quantity:</span>
                  <span class="text-dark ms-2 font-weight-bold">{{
                    enquiryData.enquiryinfo.quantity
                  }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-sm">Taxes:</span>
                  <span class="text-dark ms-2 font-weight-bold">$0.00</span>
                </div>
                <div class="d-flex justify-content-between mt-4">
                  <span class="mb-2 text-lg">Total:</span>
                  <span class="text-dark text-lg ms-2 font-weight-bold"
                    >${{ enquiryData.enquiryinfo.total_enquiry }}</span
                  >
                </div>
              </div>
              <hr class="horizontal dark mt-4 mb-4" />
              <div class="col-lg-5 col-12">
                <div class="justify-content-left mb-2">
                  <label>Update Status</label>
                  <select
                    id="choices-status-edit"
                    class="form-control"
                    name="choices-status"
                    v-model="enqstatus.enquiryStatus"
                  >
                    <option
                      class="text-xs"
                      v-for="statusValue in statusList"
                      :value="statusValue"
                      :key="statusValue"
                      :selected="statusValue === enqstatus.enquiryStatus"
                    ></option>
                  </select>
                  <span>Chosen item: {{ enqstatus.enquiryStatus }}</span>
                </div>
                <div class="justify-content-left mb-2">
                  <label>Update Payment Status</label>
                  <select
                    id="choices-pstatus-edit"
                    class="form-control"
                    name="choices-pstatus"
                    v-model="enqstatus.enquiryPaymentStatus"
                  >
                    <option
                      class="text-xs"
                      v-for="pstatusValue in pstatusList"
                      :value="pstatusValue"
                      :key="pstatusValue"
                      :selected="statusValue == enqstatus.enquiryPaymentStatus"
                    >
                      {{ pstatusValue }}
                    </option>
                  </select>
                  <span>Chosen item: {{ enqstatus.enquiryPaymentStatus }}</span>
                </div>
              </div>
              <div class="col-lg-5 col-12 ms-auto">
                <div class="d-flex justify-content-end">
                  <button
                    class="mb-0 btn bg-gradient-success btn-sm"
                    type="button"
                    name="button"
                    @click="saveEnquiry"
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
    <b>{{ enquiryData }}</b>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import Choices from "choices.js";
import axios from "axios";

export default {
  name: "EnquiryDetails",
  components: {
    ArgonButton,
  },
  data() {
    return {
      enqstatus: {
        enquiryStatus: "",
        enquiryPaymentStatus: "",
      },

      statusList: ["In Progress", "Delivred", "Canceled"],
      pstatusList: ["Waiting Payment", "Paid", "Refunded", "Canceled"],
    };
  },
  async created() {
    await this.$store.dispatch("loadEnquiry", this.$route.params.id);
    this.enqstatus.enquiryStatus = this.$store.state.enquiry.enquiryinfo.status;
    this.enqstatus.enquiryPaymentStatus =
      this.$store.state.enquiry.enquiryinfo.payment_status;
  },
  computed: {
    enquiryData() {
      return this.$store.state.enquiry;
    },
  },
  mounted() {
    this.getChoices("choices-status-edit");
    this.getChoices("choices-pstatus-edit");
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          allowHTML: true,
          removeItemButton: true,
        });
      }
    },
    async saveAtc() {
      console.log(this.$route.params.id);

      await axios
        .put("/enquiry/" + this.$route.params.id, this.enqstatus)
        .then(({ data }) => {
          console.log(data.message);
          this.errMessage = data.message;
          this.isResult = true;
        })
        .catch(({ data }) => {
          this.errMessage = data.message;
          this.isError = true;
          this.isResult = true;
        })
        .finally(() => {
          //this.vatc.name = this.$store.state.country.name;
        });
    },
  },
};
</script>
