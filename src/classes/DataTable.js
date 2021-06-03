import http from "../axios/index.js";
import store from "../store/index.js";
// src/axios/index.js
export default class DataTable {
  constructor(params, url, execlude, filters, title) {
    this.params = params;
    this.checkedItems = [];
    this.columns = [];
    this.currentPage = parseInt(params.offset) / parseInt(params.no) + 1;
    this.canAdd = this.permissions().includes(`create_${title}`);
    this.canEdit = this.permissions().includes(`edit_${title}`);
    this.canDelete = this.permissions().includes(`delete_${title}`);
    this.canView = this.permissions().includes(`view_${title}`);
    this.data = [];
    this.allChecked = false;
    this.isLoading = false;
    this.url = url;
    this.execlude = execlude;
    this.filters = filters;
    this.totalRows = 0;
    this.total = 0;
    this.tableName = title;
  }
  permissions() {
    return JSON.parse(localStorage.getItem("permissons"));
  }

  reset() {
    this.params.offset = 0;
    this.currentPage = 1;
    this.total = 0;
    this.getData();
  }
  select() {
    this.allChecked = this.checkedItems.length == this.data.length;
  }
  selectAll() {
    if (this.allChecked) {
      this.data.forEach((d) => {
        this.checkedItems.push(d.isbn);
      });
      return;
    }

    this.checkedItems = [];
  }

  changeCount(val) {
    this.params.no = val;
    this.reset();
  }
  search(val) {
    this.params.search = val;
    let regex = { regex: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/ };
    if (regex.regex.test(val) || val == "") {
      this.reset();
      return;
    }
    setTimeout(() => {
      this.reset();
    }, 1000);
  }

  getColumns(data) {
    this.columns = Object.keys(data[0]);
  }
  sort(column) {
    if (this.params.sort_by == column) {
      this.params.sort_func = this.params.sort_func == "DESC" ? "ASC" : "DESC";
      this.reset();
      return;
    }
    this.params.sort_by = column;
    this.reset();
  }

  next() {
    if (this.params.offset + this.params.no < this.totalRows) {
      this.params.offset = this.params.offset + this.params.no;
      this.total = 0;
      this.getData().then(() => this.currentPage++);
    }
  }

  delete(modal, item) {
    store.dispatch("ui/showDeleteModal", {
      modal,
      table: this.tableName,
      item,
    });
  }
  dateFilter(val, param) {
    this.params[`${param}`] = val;

    // this.getData()
  }
  prev() {
    if (this.currentPage !== 1) {
      this.params.offset = this.params.offset - this.params.no;
      this.total = 0;
      this.getData().then(() => this.currentPage--);
    }
  }

  filterData(value, filter) {
    this.params[`${filter.param}`] = value;
    localStorage.setItem(`${this.url}_${filter.param}`, value);
    this.reset();
  }
  fromSelected(val) {
    if (val) {
      this.params.from = `${val.replace(/-/g, ":")} 00:00:00:0000`;
      this.reset();
    }
  }
  toSelected(val) {
    if (val) {
      this.params.to = `${val.replace(/-/g, ":")} 23:59:59:0000`;
      this.reset();
    }
  }
  getData() {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      let from = localStorage.getItem(`${this.url}_from`);
      from = from ? `${from} 00:00:00:0000` : yesterday;
      let to = localStorage.getItem(`${this.url}_to`);
      to = to ? `${to} 23:59:59:0000` : today;
      let branch = localStorage.getItem(`${this.url}_branch`);
      this.params.branch = branch;
      this.params.from = from;
      this.params.to = to;
      this.isLoading = true;
      http
        .get(this.url, { params: this.params })
        .then((response) => {
          this.onSuccess(response.data);
          resolve(response.data);

          if (this.tableName == "orders") {
            response.data.data.forEach((t) => {
              if (t.total && t.deleted_at == null) {
                this.total = parseInt(this.total) + parseInt(t.total);
              }
            });
          }
        })
        .catch((error) => {
          this.onFail(error.response.data);
          reject(error);
        });
    });
  }

  getFiltersData() {
    return new Promise((resolve) => {
      this.filters.forEach((filter) => {
        let data = [];
        if (filter.type == "select") {
          data = JSON.parse(localStorage.getItem(filter.url));
          filter.data = data;
        }
        resolve(data);
      });
    });
  }

  onSuccess(data) {
    this.isLoading = false;
    // let d = data.data.map(item => {
    //   Object.keys(this.execlude).forEach(val =>{
    //   delete item[`${this.execlude[val]}`]
    //   });
    //   return item
    // });
    this.data = data.data;
    this.totalRows = data.count;
    this.getColumns(data.data);
  }
  onFail() {}
}
