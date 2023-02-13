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

              <button
                type="button"
                class="mx-1 mb-0 btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#chat"
                @click="getChatHistory"
                v-show="this.userRole === 'customer'"
              >
                Contact Vendor
                <i class="fa fa-comment-o me-1"></i>
              </button>
              <button
                type="button"
                class="mx-1 mb-0 btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#chat"
                @click="getChatHistory"
                v-show="this.userRole === 'vendor'"
              >
                Contact Customer
                <i class="fa fa-comment-o me-1"></i>
              </button>
              <button
                type="button"
                class="mx-1 mb-0 btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#chat"
                @click="getChatHistory"
                v-show="this.userRole === 'admin'"
              >
                View Chat
                <i class="fa fa-comment-o me-1"></i>
              </button>
              <div
                id="chat"
                class="modal fade"
                tabindex="-1"
                aria-hidden="true"
              >
                <div class="modal-dialog mt-lg-10">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 id="ModalLabel" class="modal-title">Chat</h5>
                      <i class="fa fa-comment-o ms-3"></i>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="card my-2">
                        <div
                          class="card-header p-3 me-4"
                          style="max-height: 250px; overflow-y: auto"
                        >
                          <div
                            class="card my-4"
                            v-for="message in chats"
                            :key="message.id"
                          >
                            <div class="card-header p-3 text-right">
                              <span class="text-xs me-2">
                                [{{ message.created_at }}] :
                              </span>
                              <span
                                class="text-xs text-gray-900"
                                v-show="message.from_user === current_user"
                              >
                                {{ this.userRole }}
                              </span>
                              <span
                                class="text-xs"
                                v-show="!(message.from_user === current_user)"
                                ><small>Partner</small>
                              </span>
                              <span class="text-xs mx-3">
                                {{ message.content }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <textarea
                        v-show="!(this.userRole == 'admin')"
                        type="text"
                        placeholder="Your Message"
                        class="mb-3 form-control"
                        v-model="enqChat.content"
                      />
                      <div
                        class="form-check"
                        v-show="!(this.userRole == 'admin')"
                      >
                        <input
                          id="chatCheck"
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          checked="false"
                        />

                        <label class="custom-control-label" for="chatCheck"
                          >I accept the terms and conditions and I confirm that
                          i didn't communicate any contact informations
                        </label>
                      </div>
                    </div>
                    <div
                      class="modal-footer"
                      v-show="!(this.userRole == 'admin')"
                    >
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
                        @click="sendMessage"
                      >
                        Send
                        <i class="fa fa-paper-plane me-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span
              class="badge badge-sm"
              :class="
                enquiryData.enquiryinfo.status === 'Delivred'
                  ? 'badge-success'
                  : enquiryData.enquiryinfo.status === 'In Progress'
                  ? 'badge-info '
                  : enquiryData.enquiryinfo.status ===
                    'Waiting for Vendor Approval'
                  ? 'badge-warning '
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
              <div class="col-lg-6 col-md-6 col-12">
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
              <div class="col-lg-6 col-12 ms-auto">
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
              <div
                class="col-lg-5 col-12"
                v-show="!(this.userRole === 'customer')"
              >
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
                  <!--<span>Chosen item: {{ enqstatus.enquiryStatus }}</span>-->
                </div>
              </div>
              <div class="col-lg-5 col-12 ms-auto">
                <div class="d-flex justify-content-end">
                  <button
                    v-show="!(this.userRole === 'customer')"
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
  </div>
</template>

<script>
import Choices from "choices.js";
import axios from "axios";

export default {
  name: "EnquiryDetails",
  components: {},

  data() {
    return {
      chats: [],
      current_user: "",
      userRole: "",
      enqstatus: {
        enquiryStatus: "",
      },
      enqChat: {
        enquiry_id: "",
        content: "",
        from_user: "",
        to_user: "",
      },

      statusList: [
        "Select Status",
        "Waiting for Vendor Approval",
        "In Progress",
        "Delivred",
        "Canceled",
      ],
    };
  },
  async created() {
    await this.$store.dispatch("loadEnquiry", this.$route.params.id);
    this.enqstatus.enquiryStatus = this.$store.state.enquiry.enquiryinfo.status;
    this.userRole = this.$store.state.auth.user.role;
    this.current_user = this.$store.state.auth.user.id;
    this.enqChat.enquiry_id = this.$store.state.enquiry.enquiryinfo.id;

    if (this.userRole === "vendor") {
      this.enqChat.from_user = this.$store.state.enquiry.enquiryinfo.vendor_id;
      this.enqChat.to_user = this.$store.state.enquiry.enquiryinfo.customer_id;
    } else if (this.userRole === "customer") {
      this.enqChat.from_user =
        this.$store.state.enquiry.enquiryinfo.customer_id;
      this.enqChat.to_user = this.$store.state.enquiry.enquiryinfo.vendor_id;
    }
  },
  computed: {
    enquiryData() {
      return this.$store.state.enquiry;
    },
  },
  mounted() {
    this.getChoices("choices-status-edit");
  },
  methods: {
    showSwal(type) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Update Enquiry status",
          text: "Status has been submitted!",
          type: type,
        });
      }
    },
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          allowHTML: true,
          removeItemButton: true,
        });
      }
    },
    async saveEnquiry() {
      await axios
        .put("/enquiry/" + this.$route.params.id, this.enqstatus)
        .then(({ data }) => {
          this.showSwal("success-message");
          console.log(data.message);
          this.errMessage = data.message;
          this.isResult = true;
          window.location.reload();
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
    async getChatHistory() {
      await axios
        .get("/chat/" + this.$store.state.enquiry.enquiryinfo.id)
        .then(({ data }) => {
          this.chats = data;
          console.log(data);
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
    async sendMessage() {
      await axios
        .post("chat", this.enqChat)
        .then(({ data }) => {
          this.enqChat.content = "";
          this.getChatHistory();
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
