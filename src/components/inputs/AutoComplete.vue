<template>
  <div class="form-group mb-4 input-field">
    <label
      :for="fieldName"
      class="block font-normal uppercase tracking-wide text-xs mb-1"
      >{{ $t(fieldName) }}</label
    >
    <input
      :type="type"
      :id="fieldName"
      v-model="field"
      :value="field"
      @input="update($event.target.value)"
      autocomplete="off"
      class="border px-4 py-2 w-full rounded bg-gray-200 autocomplete"
      autofocus
    />
    <span v-if="hasErr" class="msg is-danger" v-text="$t(errMsg)"></span>
    <span
      v-if="hasError && !hasErr"
      class="msg is-danger"
      v-text="$t(errorMsg)"
    ></span>
  </div>
</template>

<script>
import M from "materialize-css";
import store from "@/store/index";
import { setTimeout } from "timers";

export default {
  props: ["fieeld", "url", "params", "fieldName", "type", "hasErr", "errMsg"],
  data() {
    return {
      hasError: false,
      field: "",
      data: [],
      errorMsg: ""
    };
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(this.url, { params: this.params })
          .then(response => {
            resolve(response.data);
            this.autocomplete(response.data.data);
            this.data = response.data.data;
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    toObject(arr) {
      let rv = {};
      for (var i = 0; i < arr.length; ++i) {
        arr[i] !== undefined ? (rv[arr[i].name] = null) : "";
        arr[i] !== undefined ? (rv[arr[i].isbn] = null) : "";
      }
      return rv;
    },

    autocomplete(list) {
      let elem = document.querySelector(".autocomplete");
      let data = this.toObject(list);
      let options = { data };
      options.onAutocomplete = val => {
        this.getProduct(val);
        this.field = "";
      };
      M.Autocomplete.init(elem, options);
      let instance = M.Autocomplete.getInstance(elem);
      instance.open();
    },
    getProduct(isbn) {
      let product = [];
      if (!isNaN(parseInt(isbn))) {
        // const store = store;
        product = this.data.filter(d => {
          return d.isbn === isbn ? d : "";
          // eslint-disable-next-line no-unreachable
          store.dispatch("order/setProductIsbn", product[0]);
        });
      } else {
        product = this.data.filter(d => {
          return d.name === isbn ? d : "";
          // eslint-disable-next-line no-unreachable
          store.dispatch("order/setProductName", product[0]);
        });
      }
      return product;
    },
    getProductIsbn(isbn) {
      this.$http(`product/${isbn}`).then(response => {
        this.field = "";
        store.dispatch("order/setProduct", response.data);
      });
    },
    update(val) {
      store.commit("order/setDisablBtn", true);
      this.params.search = val;
      let regex = { regex: /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/ };
      if (regex.regex.test(val) || val == "") {
        this.getProductIsbn(val);
      } else {
        this.getData();
      }
      setTimeout(() => {
        store.commit("order/setDisablBtn", false);
      }, 2000);
      this.$emit("input", val);
    }
  }
};
</script>

<style></style>
