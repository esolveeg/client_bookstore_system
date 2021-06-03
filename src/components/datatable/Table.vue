<template>
  <div class="card animated  fadeInUp ">
    <div class="card-content" style="overflow-x:scroll">
      <div>
        <div>
          <div class="tableFilters">
            <div class="search-input-field">
              <input
                class="input"
                type="text"
                v-model="tableData.search"
                :placeholder="$t('search_table')"
              />
            </div>

            <div class="input-field">
              <select id="show" v-model="tableData.length">
                <option
                  v-for="(records, index) in perPage"
                  :key="index"
                  :value="records"
                  >{{ records }}</option
                >
              </select>
              <label>{{ $t("show") }}</label>
            </div>
          </div>
          <TableHead
            :status="checkAllStatus"
            :columns="columns"
            :sortKey="sorting[0].field"
            :sortOrder="sorting[0].order"
            @sort="sortBy"
            @update="checkStatus"
          >
            <tbody v-if="data.data.length > 0">
              <tr v-for="data in data.data" :key="data.id">
                <td>
                  <label>
                    <input
                      class="checkbox"
                      v-model="checkedItems"
                      type="checkbox"
                      name="checkbox[]"
                      :value="data.id"
                    />
                    <span></span>
                  </label>
                </td>
                <td v-for="column in columns" :key="column.dbname">
                  <span v-if="column.sub">
                    <span v-if="data[column.dbname]">{{
                      data[column.dbname][column.sub]
                    }}</span></span
                  >
                  <span v-else-if="data[column.dbname]">
                    <span v-if="column.dbname == 'branch_id'">
                      {{ getBranch(data[column.dbname]) }}
                    </span>
                    <span v-else> {{ data[column.dbname] }}</span>
                  </span>

                  <span v-else> </span>
                </td>
                <td>
                  <div>
                    <a
                      v-if="canView"
                      @click.prevent="$emit('goToView', data['id'])"
                      class="btn waves-effect waves-light actions-btn view"
                      ><i class="material-icons hide-on-med-and-up bold"
                        >remove_red_eye</i
                      ><span class="hide-on-small-onl text-white"
                        >{{ $t("plain_view") }}
                        <i class="material-icons">remove_red_eye</i></span
                      ></a
                    >
                    <a
                      v-if="canDelete"
                      class="btn waves-effect waves-light actions-btn danger modal-trigger"
                      @click.prevent="
                        $emit('setDeleteData', {
                          id: data['id'],
                          name: data['name']
                        })
                      "
                      ><i class="material-icons hide-on-med-and-up bold"
                        >delete</i
                      ><span class="hide-on-small-onl text-white"
                        >{{ $t("delete") }}
                        <i class="material-icons">delete</i></span
                      ></a
                    >
                    <div
                      v-if="$route.name !== 'orders.index'"
                      class="display-inline"
                    >
                      <a
                        v-if="canEdit"
                        @click.prevent="$emit('goToEdit', data['id'])"
                        class="btn waves-effect waves-light actions-btn edit"
                        ><i class="material-icons hide-on-med-and-up bold"
                          >edit</i
                        ><span class="hide-on-small-onl text-white"
                          >{{ $t("plain_edit") }}
                          <i class="material-icons">edit</i></span
                        ></a
                      >
                    </div>
                    <div v-else class="display-inline">
                      <a
                        v-if="compareDate(data.created_at)"
                        @click.prevent="$emit('goToEdit', data['id'])"
                        class="btn waves-effect waves-light actions-btn edit"
                        ><i class="material-icons hide-on-med-and-up bold"
                          >edit</i
                        ><span class="hide-on-small-onl text-white"
                          >{{ $t("plain_edit") }}
                          <i class="material-icons">edit</i></span
                        ></a
                      >
                    </div>
                    <a
                      v-if="canApprove && !data['approved']"
                      @click.prevent="$emit('goToApprove', data['id'])"
                      class="btn waves-effect waves-light actions-btn approve"
                      ><i class="material-icons hide-on-med-and-up bold"
                        >done_all</i
                      ><span class="hide-on-small-onl text-white"
                        >{{ $t("approve") }}
                        <i class="material-icons">done_all</i></span
                      ></a
                    >
                  </div>
                  <slot :name="data['name']" :id="data['id']"></slot>
                </td>
              </tr>
            </tbody>

            <div class="not-found" v-else>{{ $t("no-data") }}</div>
          </TableHead>
          <pagination
            :pagination="data.paginatorInfo"
            @prev="page--"
            @goTo="goTo"
            @next="page++"
          >
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHead from "@/components/datatable/TableHead.vue";
import Pagination from "@/components/datatable/Pagination.vue";
import M from "materialize-css";
import moment from "moment";
export default {
  name: "dataTbale",
  components: {
    TableHead,
    Pagination
    // Actions
  },
  props: [
    "columns",
    "canApprove",
    "sorting",
    "data",
    "canView",
    "canDelete",
    "canEdit"
  ],
  data() {
    return {
      checkAllStatus: false
    };
  },
  store: {
    checkedItems: "selected_ids",
    perPage: "perPage",
    page: "current_page",
    tableData: "tableData"
  },
  methods: {
    loadSelects() {
      setTimeout(() => {
        let selects = document.querySelector("#show");
        // console.log('selcet' , selects)
        M.FormSelect.init(selects, {});
      }, 3000);
    },
    getBranch(id) {
      if (id == 1) {
        return "point90";
      }
      if (id == 2) {
        return "cfc";
      }
    },
    compareDate(date) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return moment(date).isSame(today, "day") ||
        moment(date).isSame(tomorrow, "day")
        ? true
        : false;
    },
    sortBy(key) {
      this.sorting[0].field = key;
      this.sorting[0].order = this.sorting[0].order == "ASC" ? "DESC" : "ASC";
    },
    goTo(page) {
      this.page = page;
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value);
    },
    checkStatus(status) {
      this.checkAllStatus = status;
    }
  },

  watch: {
    checkAllStatus: {
      handler(status) {
        status
          ? this.data.data.forEach(data => {
              this.checkedItems.push(data.id);
            })
          : (this.checkedItems = []);
      }
    }
  },
  mounted() {
    this.canView ? this.canView : "";
    this.loadSelects();
  }
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
</style>
