import { isArray } from "util";
export default class Errors {
  constructor() {
    this.errors = {};
  }
  get(field) {
    if (this.errors[field]) {
      if (isArray(this.errors[field])) {
        return this.errors[field][0];
      }
      return this.errors[field];
    }
  }

  any() {
    return Object.keys(this.errors).length > 0;
  }

  clear(field) {
    delete this.errors["general"];

    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }

  record(errors) {
    this.errors = errors;
  }

  has(field) {
    return this.errors.hasOwnProperty(field);
  }
}
