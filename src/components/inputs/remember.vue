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
                                  <th data-field="no">{{ $t("no") }}</th>
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
                                  <td>EGP{{ product.price }}</td>
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
                                  <td>EGP{{ product.price * qtys[index] }}</td>
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
                                <tr class="border-none" v-if="discount">
                                  <td colspan="3"></td>
                                  <td v-if="this.discountType == 'percent'">
                                    {{
                                      $t("discountPercent", {
                                        percent: this.discount
                                      })
                                    }}
                                  </td>
                                  <td v-else>{{ $t("discount") }}</td>
                                  <td>{{ parseInt(discountValue) }}</td>
                                </tr>
                                <tr class="border-none">
                                  <td colspan="3"></td>
                                  <td class="cyan white-text pl-1">
                                    {{ $t("total") }}
                                  </td>
                                  <td class="cyan strong white-text">
                                    EGP{{ parseInt(total - discountValue) }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
