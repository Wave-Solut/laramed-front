<template>
  <div
    class="p-3 bg-white card multisteps-form__panel border-radius-xl"
    data-animation="FadeIn"
  >
    <div class="text-left row">
      <div class="mx-auto col-12">
        <h5 class="font-weight-normal">Deal type and markets of interest</h5>
      </div>
    </div>
    <div class="multisteps-form__content">
      <div class="row text-start">
        <div class="mt-3 col-12 col-md-12 ms-auto">
          <label>Market(s) of interest</label>
          <select
            id="choices-country"
            class="form-control"
            name="choices-country"
            v-model="country_id"
            multiple
          >
            <option
              v-for="country in countries"
              :value="country.id"
              :key="country.id"
            >
              {{ country.code }} - {{ country.name }}
            </option>
          </select>
          {{ productCountryEnquiry }}

          <label>Comments</label>
          <textarea
            class="multisteps-form__textarea form-control"
            type="text"
            placeholder="Your Comments "
            v-model="comment"
          />
          {{ comment }}
        </div>
      </div>
      <div class="row">
        <div class="mt-4 button-row d-flex col-12">
          <button
            class="mb-0 btn bg-gradient-light js-btn-prev"
            type="button"
            title="Prev"
            @click="$parent.prevStep"
          >
            Prev
          </button>
          <button
            class="mb-0 btn bg-gradient-dark ms-auto js-btn-next"
            type="button"
            title="Next"
            @click="$parent.nextStep"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import Choices from "choices.js";

export default {
  name: "DealAndMarket",
  components: {},
  props: {
    countries: {
      type: Array,
    },
  },
  data() {
    return {
      country_id: "",
      comment: "",

      config: {
        allowInput: true,
      },
    };
  },
  methods: {},
  watch: {
    country_id() {
      this.$emit("passData", {
        countries: this.country_id,
        comment: this.comment,
      });
    },
    comment() {
      this.$emit("passData", {
        countries: this.country_id,
        comment: this.comment,
      });
    },
  },
  mounted() {
    if (document.getElementById("choices-country")) {
      var country = document.getElementById("choices-country");
      new Choices(country, {
        removeItemButton: true,
        allowHTML: true,
        searchEnabled: true,
      });
    }

    if (document.getElementById("editor")) {
      new Quill("#editor", {
        theme: "snow", // Specify theme in configuration
      });
    }
  },
};
</script>
