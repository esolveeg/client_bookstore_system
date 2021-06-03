<template>
  <div class="card animated  fadeInUp ">
    <div class="card-content">
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
              <select v-model="tableData.length">
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
            <tbody>
              <tr v-for="data in users.data" :key="data.id">
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
                  {{ data[column.dbname] }}
                </td>
                <td>
                  <Actions
                    @del="setData"
                    :name="data['name']"
                    :id="data['id']"
                  />
                </td>
              </tr>
            </tbody>
          </TableHead>
          <pagination
            :pagination="users.paginatorInfo"
            @prev="page--"
            @goTo="goTo"
            @next="page++"
          >
          </pagination>
        </div>
      </div>
    </div>
    <!-- <delete-modal :name="deletedName" @submitted="deleteUser" /> -->
  </div>
</template>

<script>
import TableHead from "@/components/datatable/TableHead.vue";
import Pagination from "@/components/datatable/Pagination.vue";
import Actions from "@/components/tables/actions/User.vue";
// import DeleteModal from "@/components/modals/DeleteModal.vue";
// import gql from "graphql-tag";
import { usersQuery } from "@/graphql/queries/queries.js";

import M from "materialize-css";
export default {
  name: "usersTbale",
  components: {
    TableHead,
    Pagination,
    Actions
  },

  data() {
    let columns = [
      { label: "name", name: "Name", dbname: "name" },
      { label: "email", name: "Email", dbname: "email" },
      { label: "created_at", name: "created_at", dbname: "created_at" }
    ];
    let sorting = [{ field: "name", order: "ASC" }];

    return {
      columns,
      sorting,
      checkAllStatus: false,
      page: 1,
      users: [],
      perPage: ["10", "20", "30", "50"],
      tableData: {
        length: 10,
        search: "",
        column: 0
      }
    };
  },
  store: {
    checkedItems: "selected_ids"
  },

  apollo: {
    users: {
      query: usersQuery,
      // fetchPolicy: 'cache-and-network',
      variables() {
        return {
          first: this.tableData.length,
          page: this.page,
          orderBy: this.sorting,
          search: this.tableData.search
        };
      },
      deep: true,
      pollInterval: 1000
    }
  },
  methods: {
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
    },
    setData(data) {
      this.deletedName = data.name;
      this.deletedId = data.id;
    }
  },

  watch: {
    checkAllStatus: {
      handler(status) {
        status
          ? this.users.data.forEach(data => {
              this.checkedItems.push(data.id);
            })
          : (this.checkedItems = []);
      }
    }
  },
  mounted() {
    let selects = document.querySelectorAll("select");
    let options = document.querySelectorAll("option");
    M.FormSelect.init(selects, options);
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
</style>
