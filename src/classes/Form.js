import Errors from "./Errors";
import http from "../axios/index";

export default class Form {
  constructor(data) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
    this.isLoading = false;
  }
  validate() {
    // console.log(this.validation)
  }
  reset() {
    for (let field in this.originalData) {
      this[field] = "";
    }

    this.errors.clear();
  }

  post(url) {
    return this.submit("post", url);
  }

  get(url) {
    return this.submit("get", url);
  }

  patch(url) {
    return this.submit("patch", url);
  }

  delete(url) {
    return this.submit("delete", url);
  }

  put(url) {
    return this.submit("put", url);
  }

  data() {
    let data = {};
    for (let property in this.originalData) {
      data[property] = this[property];
    }
    return data;
  }

  submit(requestType, url) {
    return new Promise((resolve, reject) => {
      this.isLoading = true;

      http[requestType](url, this.data())
        .then(response => {
          this.onSuccess();
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data);
          reject(error);
        });
    });
  }

  onSuccess() {
    this.reset();
    // this.isLoading = false;
    // this.isLoading(false)
  }

  onFail(error) {
    if (error[["errors"]]) {
      // console.log(error[['error']])
      // this.errors.record(error[["errors"]]);
      // this.isLoading = false;
      return;
    }
    this.errors.record({ general: error[["message"]] });
    this.isLoading = false;
  }
}
