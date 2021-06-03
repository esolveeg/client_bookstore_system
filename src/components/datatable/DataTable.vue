<template>
  <div class="card animated  fadeInUp ">
    <div class="card-content" style="overflow-x:scroll">
      <div>
        <div>
          <div class="tableFilters">
            <div class="tableFilters-flex" style="display:flex">
              <div class="search-input-field">
                <input
                  class="input"
                  @input="dataTable.search($event.target.value)"
                  :value="dataTable.params.search"
                  type="text"
                  :placeholder="$t('search_table')"
                />
              </div>
              <div
                class="input-field "
                style="width:100%"
                v-for="filter in selects"
                :key="filter.param"
              >
                <select
                  id="branches"
                  @change="dataTable.filterData($event.target.value, filter)"
                  v-model="dataTable.params.branch"
                >
                  <option value="" disabled="none">{{ $t("branches") }}</option>
                  <option value="">{{ $t("none") }}</option>
                  <option value="store">{{ $t("store") }}</option>
                  <option
                    :value="val.id"
                    v-for="val in filter.data"
                    :key="val.id"
                    >{{ val.name }}</option
                  >
                </select>
                <label for="branches">{{ $t("branches") }}</label>
              </div>
              <div class="switch" v-for="filter in switchers" :key="filter.id">
                <label>
                  {{ filter.name }}
                  <input
                    type="checkbox"
                    v-model="filter.value"
                    @change="dataTable.filterData(filter.value, filter)"
                  />
                  <span class="lever"></span>
                </label>
              </div>
              <div
                class="input-field"
                style="width:100%"
                v-for="filter in dates"
                :key="filter.id"
              >
                <div class="datepicker-trigger">
                  <input
                    type="text"
                    id="datepicker-trigger"
                    placeholder="Select dates"
                  />

                  <AirbnbStyleDatepicker
                    :trigger-element-id="'datepicker-trigger'"
                    :mode="'range'"
                    :fullscreen-mobile="true"
                    :endDate="new Date()"
                    @date-one-selected="
                      (val) => {
                        dateOneSelected(val);
                      }
                    "
                    @date-two-selected="
                      (val) => {
                        dateTwoSelected(val);
                      }
                    "
                  />
                </div>
              </div>
            </div>

            <div class="input-field">
              <select
                id="show"
                @change="dataTable.changeCount($event.target.value)"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
              <label>{{ $t("show") }}</label>
            </div>
          </div>
          <table class="table data-table">
            <thead>
              <tr>
                <th>
                  <label class="checkbox">
                    <input
                      id="selectAll"
                      type="checkbox"
                      v-model="dataTable.allChecked"
                      @change="dataTable.selectAll()"
                    />
                    <span></span>
                  </label>
                </th>
                <!-- <th
          v-for="column in columns"
          :key="column.name"
          @click="$emit('sort', column.name)"
          :class="sortKey === column.name ? sortOrder : 'sorting'"
          :style="'width:' + column.width + ';' + 'cursor:pointer;'"
        >
          {{ $t(`${column.label}`) }}
        </th> -->

                <th
                  v-for="column in dataTable.columns"
                  @click="dataTable.sort(column)"
                  :key="column"
                >
                  {{ $t(column) }}
                </th>
                <th>
                  {{ $t("actions") }}
                </th>
              </tr>
            </thead>
            <tbody v-if="!dataTable.isLoading">
              <div v-if="dataTable.totalRows == 0">
                {{ $t("no-data") }}
              </div>
              <tr
                v-else
                v-for="val in dataTable.data"
                :key="val.id"
                :class="{
                  danger: tableName == 'orders' && val.deleted_at !== null,
                  danger2: tableName == 'products' && val.qty < 0,
                }"
              >
                <td>
                  <label>
                    <input
                      class="checkbox"
                      type="checkbox"
                      name="checkbox[]"
                      @change="dataTable.select()"
                      :value="val[identifer]"
                      v-model="dataTable.checkedItems"
                    />
                    <span></span>
                  </label>
                </td>
                <td v-for="column in dataTable.columns" :key="column">
                  {{ val[column] }}
                </td>
                <td>
                  <a
                    v-if="dataTable.canView"
                    @click.prevent="
                      $router.push({
                        name: `${tableName}.view`,
                        params: { id: parseInt(val.id) },
                      })
                    "
                    class="btn waves-effect waves-light actions-btn view"
                    ><i class="material-icons hide-on-med-and-up bold"
                      >remove_red_eye</i
                    ><span class="hide-on-small-onl text-white"
                      >{{ $t("plain_view") }}
                      <i class="material-icons">remove_red_eye</i></span
                    ></a
                  >
                  <a
                    v-if="dataTable.canEdit"
                    @click.prevent="
                      $router.push({
                        name: `${tableName}.edit`,
                        params: { id: val.id },
                      })
                    "
                    class="btn waves-effect waves-light actions-btn edit"
                    ><i class="material-icons hide-on-med-and-up bold">edit</i
                    ><span class="hide-on-small-onl text-white"
                      >{{ $t("plain_edit") }}
                      <i class="material-icons">edit</i></span
                    ></a
                  >
                  <a
                    v-if="tableName == 'transactions' && val.approved == 0"
                    @click.prevent="
                      $router.push({
                        name: `${tableName}.approve`,
                        params: { id: val.id },
                      })
                    "
                    class="btn waves-effect waves-light actions-btn approve"
                    ><i class="material-icons hide-on-med-and-up bold"
                      >done_all</i
                    ><span class="hide-on-small-onl text-white"
                      >{{ $t("approve") }}
                      <i class="material-icons">done_all</i></span
                    ></a
                  >
                  <a
                    v-if="tableName == 'orders' && val.deleted_at == null"
                    @click.prevent="refundOrder(val.id)"
                    class="btn waves-effect waves-light actions-btn teal"
                    ><i class="material-icons hide-on-med-and-up bold"
                      >keyboard_return</i
                    ><span class="hide-on-small-onl text-white"
                      >{{ $t("refund") }}
                      <i class="material-icons">keyboard_return</i></span
                    ></a
                  >
                  <a
                    v-if="dataTable.canDelete"
                    @click.prevent="
                      dataTable.delete($modal, { id: val.id, name: val.name })
                    "
                    class="btn waves-effect waves-light actions-btn danger"
                    ><i class="material-icons hide-on-med-and-up bold">delete</i
                    ><span class="hide-on-small-onl text-white"
                      >{{ $t("delete") }}
                      <i class="material-icons">delete</i></span
                    ></a
                  >
                </td>
              </tr>
            </tbody>
            <tfoot v-if="dataTable.total !== 0">
              <tr>
                <td>total : {{ dataTable.total }}</td>
              </tr>
            </tfoot>
          </table>
          <ul class="pagination flex-center mt-30">
            <span
              class="page-state"
              v-if="
                dataTable.params.offset + 1 + dataTable.params.no <
                  dataTable.totalRows
              "
              >{{
                `from ${dataTable.params.offset + 1} to ${dataTable.params
                  .offset +
                  1 +
                  dataTable.params.no} of ${dataTable.totalRows}`
              }}
            </span>
            <span class="page-state" v-else
              >{{
                `from ${dataTable.params.offset + 1} to ${
                  dataTable.totalRows
                } of ${dataTable.totalRows}`
              }}
            </span>
            <li class="flex-center" @click="dataTable.prev()">
              <a class="flex-center"
                ><i class="material-icons">chevron_left</i></a
              >
            </li>
            <li class="waves-effect">
              <a>{{ dataTable.currentPage }}</a>
            </li>

            <li class="flex-center" @click="dataTable.next()">
              <a class="flex-center"
                ><i class="material-icons">chevron_right</i></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DataTable from "@/classes/DataTable.js";
import DataTable from "@/classes/DataTable.js";
import M from "materialize-css";
import store from "@/store/index";
import { setTimeout } from "timers";
export default {
  name: "databTable",
  data() {
    return {
      title: "products",
      btns: [],

      dateOne: "",
      dateTwo: "",
      dataTable: new DataTable(
        {
          offset: 0,
          to: "",
          from: "",
          no: 10,
          branch: "",
          sort_by: "",
          sort_func: "",
          search: "",
        },
        this.url,
        this.execlude,
        this.filters,
        this.tableName,
      ),
    };
  },
  props: ["url", "execlude", "tableName", "filters", "identifer"],
  computed: {
    selects() {
      return this.dataTable.filters.filter((filter) => {
        return filter.type == "select";
      });
    },
    dates() {
      return this.dataTable.filters.filter((filter) => {
        return filter.type == "date";
      });
    },
    switchers() {
      return this.dataTable.filters.filter((filter) => {
        return filter.type == "switcher";
      });
    },
  },
  methods: {
    getData() {
      this.dataTable.getData();
    },
    refundOrder(id) {
      store.commit("order/SetRefundedOrder", id);
      this.$modal.show("modal-refund");
    },
    dateOneSelected(val) {
      if (val) {
        this.dataTable.fromSelected(val);
        localStorage.setItem(`${this.url}_from`, val);
      }
    },
    dateTwoSelected(val) {
      if (val) {
        this.dataTable.toSelected(val);
        localStorage.setItem(`${this.url}_to`, val);
      }
    },
    loadSelects() {
      let selects = document.querySelectorAll("select");
      selects.forEach((select) => {
        setTimeout(() => {
          M.FormSelect.init(select, {});
        }, 2000);
      });
    },
  },
  created() {
    this.getData();
    let branch = localStorage.getItem("branch")
      ? localStorage.getItem("branch")
      : "";
    if (branch) {
      this.dataTable.params[`branch`] = branch;
    }
  },
  mounted() {
    this.dataTable.getFiltersData().then(() => {
      setTimeout(() => {
        this.loadSelects();
      }, 3000);
    });
  },
};
</script>

<style lang="scss" scoped>
.tableFilters {
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;

  & .input-field {
    width: 80px;
  }
  & .search-input-field {
    width: 200px;
  }
}

.select-wrapper + label {
  font-size: 1rem;
}
tbody tr td:not(:last-child) {
  font-family: "Muli", sans-serif !important;
}
.btn:not(:last-child) {
  margin-inline-end: 1rem;
  @media screen And (max-width: 1200px) {
    margin-block-end: 1rem;
    margin-inline-end: 0;
  }
  @media screen AND (max-width: 992px) {
    margin-block-end: 0rem;
  }
}
.btn.view {
  background-color: #343a40;
}
.btn.approve {
  background-color: #ff4081;
}
.btn span {
  color: #fff;
}
.not-found {
  position: absolute;
  text-align: center;
  margin: 2rem 0;
  width: 100%;
  font-size: 1.6rem;
}
.tableFilters .tableFilters-flex {
  display: flex;
  & div:not(:last-child) {
    margin-inline-end: 50px;
  }
}
a {
  cursor: pointer;
  user-select: none;
}
.flex-center {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.mt-30 {
  margin-top: 30px;
}
.page-state {
  margin-inline-end: 2rem;
}
tr.danger2 {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
