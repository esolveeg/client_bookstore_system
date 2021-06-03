<template>
  <div class="row">
    <Breadcrumbs :title="title" :path="path" :fregment="fregment" />
    <div class="col s12 mt-65">
      <div class="container">
        <!-- Current balance & total transactions cards-->
        <div class="row mt-4">
          <div class="col s12 m12 l12">
            <!-- Current Balance -->
            <h5 class="form-title">
              <i class="material-icons app-header-icon text-top"
                >perm_identity</i
              >
              {{ $t(title, { fregment }) }}
            </h5>

            <div class="card animated  fadeInLeft ">
              <div class="card-content">
                <form @submit.prevent="submitted()">
                  <div class="card-alert danger card" v-if="validationError">
                    <div class="card-content">
                      <p>
                        <i class="material-icons">error</i>{{ validationError }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12 l6">
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('isbn') }"
                        >
                          <i
                            class="material-icons prefix isbn-clear"
                            @click="isbn = ''"
                            >clear</i
                          >
                          <input
                            v-model="product"
                            id="isbn"
                            type="text"
                            class="input-isbn autocomplete"
                            autocomplete="off"
                          />
                          <label
                            for="isbn"
                            class="label-isbn"
                            :class="isbn ? 'active' : ''"
                            >{{ $t("product") }}</label
                          >
                          <div class="message">
                            <span
                              v-if="this.qtyIncreased"
                              class="success-text"
                              >{{ $t("qty_increased") }}</span
                            >
                            <span
                              v-if="this.productAlreadyAdded"
                              class="error-text"
                              >{{ $t("poduct_already_add") }}</span
                            >
                            <span
                              v-if="this.productAdded"
                              class="success-text"
                              >{{ $t("poduct_added_successfully") }}</span
                            >
                            {{ validation.firstError("isbn") }}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('note') }"
                        >
                          <input v-model="note" id="note" type="text" />
                          <label for="note" :class="note ? 'active' : ''">{{
                            $t("note")
                          }}</label>
                          <div class="message">
                            {{ validation.firstError("note") }}
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="!isPos">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('branch') }"
                        >
                          <select id="branch" v-model="branch">
                            <option value="" disabled="none">{{
                              $t("select_branch")
                            }}</option>
                            <option
                              v-for="branch in allBranches"
                              :key="branch.id"
                              :value="branch.id"
                              >{{ branch.name }}</option
                            >
                          </select>
                          <label
                            for="branches"
                            :class="branch ? 'active' : ''"
                            >{{ $t("branches") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("branch") }}
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div
                          class="input-field col s12"
                          :class="{ error: validation.hasError('supplier') }"
                        >
                          <select id="supplier" v-model="supplier">
                            <option value="" disabled="none">{{
                              $t("select_supplier")
                            }}</option>
                            <option
                              v-for="supplier in allSuppliers"
                              :key="supplier.id"
                              :value="supplier.id"
                              >{{ supplier.name }}</option
                            >
                          </select>
                          <label
                            for="supplier"
                            :class="supplier ? 'active' : ''"
                            >{{ $t("suppliers") }}</label
                          >
                          <div class="message">
                            {{ validation.firstError("supplier") }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 l6">
                      <div class="row">
                        <div class="input-field col s12">
                          <div class="products">
                            {{ $t("products") }}
                          </div>

                          <div class="invoice__table">
                            <table class="highlight responsive-table">
                              <thead>
                                <tr>
                                  <th data-field="no">{{ $t("subtotal") }}</th>
                                  <th data-field="item">{{ $t("item") }}</th>
                                  <th data-field="uprice">
                                    {{ $t("unit_price") }}
                                  </th>
                                  <th data-field="price">{{ $t("qty") }}</th>
                                  <th data-field="price">{{ $t("total") }}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(product, index) in products"
                                  :key="index"
                                >
                                  <td>{{ index + 1 }}.</td>
                                  <td>{{ product.name }}</td>
                                  <td>EGP{{ product.purchased_price }}</td>
                                  <td>
                                    <div class="counter">
                                      <!-- <i class="material-icons" @click="increaseQty(index)">add</i>   -->
                                      <input
                                        class="border-none w2"
                                        v-model="qtys[index]"
                                      />
                                      <!-- <i class="material-icons" @click="decreaseQty(index)">delete</i> -->
                                    </div>
                                  </td>
                                  <td>
                                    EGP{{
                                      product.purchased_price * qtys[index]
                                    }}
                                  </td>
                                  <td>
                                    <i
                                      class="material-icons"
                                      @click="removeProduct(index)"
                                      style="cursor:pointer"
                                      >delete</i
                                    >
                                  </td>
                                </tr>
                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td>{{ $t("subtotal") }}:</td>
                                  <td>EGP{{ total }}</td>
                                </tr>
                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td class="cyan white-text pl-1">
                                    {{ $t("total") }}
                                  </td>
                                  <td class="cyan strong white-text">
                                    EGP{{ parseInt(total) }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s12">
                      <button
                        class="btn create cyan waves-effect waves-light left"
                        type="submit"
                        disabled="disabled"
                        name="action"
                      >
                        {{ $t("save") }}
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrdersMixin from "@/mixins/EditAddOutcomingOrdersMixin.js";

export default {
  name: "edit-add-roles",
  mixins: [OrdersMixin]
};
</script>
<style scoped>
@import url("../../sass/components/_invoice.scss");
.isbn-clear {
  left: auto;
  right: 0;
  cursor: pointer;
}
.input-isbn {
  margin-right: 4.5rem;
  margin-left: 0rem !important;
}
.label-isbn {
  margin-left: 0 !important;
}
.counter {
  width: 50px;
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.counter i {
  cursor: pointer;
}
.w2 {
  width: 30px;
}
</style>
