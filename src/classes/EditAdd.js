import http from "../axios/index.js";
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
  }
  permissions() {
    return JSON.parse(localStorage.getItem("permissons"));
  }
  delete() {}
  reset() {
    this.params.offset = 0;
    this.currentPage = 1;
    this.getData();
  }
  select() {
    this.allChecked = this.checkedItems.length == this.data.length;
  }
  selectAll() {
    if (this.allChecked) {
      this.data.forEach(d => {
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
    // console.log(this.permissions());
    console.log(this.permissions().includes("create_orders"));
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
      this.getData().then(() => this.currentPage++);
    }
  }

  prev() {
    // console.log(this.params.offset)
    if (this.currentPage !== 1) {
      this.params.offset = this.params.offset - this.params.no;
      this.getData().then(() => this.currentPage--);
    }
  }

  filterData(value, filter) {
    this.params[`${filter.param}`] = value;
    this.reset();
  }
  getData() {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      http
        .get(this.url, { params: this.params })
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data);
          reject(error);
        });
    });
  }

  getFiltersData() {
    return new Promise(resolve => {
      this.filters.forEach(filter => {
        if (filter.type == "select") {
          http.get(filter.url).then(response => {
            resolve(response.data);
            filter.data = response.data;
          });
        }
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
  onFail(error) {
    console.log(error);
  }
}
