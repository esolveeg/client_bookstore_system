(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76554fd2"],{"0d14":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form-group mb-4 input-field"},[r("label",{staticClass:"block font-normal uppercase tracking-wide text-xs mb-1",attrs:{for:t.fieldName}},[t._v(t._s(t.$t(t.fieldName)))]),"checkbox"===t.type?r("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:"checkbox"},domProps:{value:t.field,checked:Array.isArray(t.field)?t._i(t.field,t.field)>-1:t.field},on:{input:function(e){return t.update(e.target.value)},change:function(e){var r=t.field,a=e.target,s=!!a.checked;if(Array.isArray(r)){var n=t.field,o=t._i(r,n);a.checked?o<0&&(t.field=r.concat([n])):o>-1&&(t.field=r.slice(0,o).concat(r.slice(o+1)))}else t.field=s}}}):"radio"===t.type?r("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:"radio"},domProps:{value:t.field,checked:t._q(t.field,t.field)},on:{input:function(e){return t.update(e.target.value)},change:function(e){t.field=t.field}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:t.type},domProps:{value:t.field,value:t.field},on:{input:[function(e){e.target.composing||(t.field=e.target.value)},function(e){return t.update(e.target.value)}]}}),t.hasErr?r("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.errMsg))}}):t._e(),t.hasError&&!t.hasErr?r("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.errorMsg))}}):t._e()])},s=[],n=(r("4de4"),r("b0c0"),r("d3b7"),r("e25e"),r("ac1f"),r("841c"),r("4d5c")),o=r.n(n),i=r("4360"),c=r("5118"),d={props:["fieeld","url","params","fieldName","type","hasErr","errMsg"],data:function(){return{hasError:!1,field:"",data:[],errorMsg:""}},methods:{getData:function(){var t=this;return new Promise((function(e,r){t.$http.get(t.url,{params:t.params}).then((function(r){e(r.data),t.autocomplete(r.data.data),t.data=r.data.data})).catch((function(t){r(t)}))}))},toObject:function(t){for(var e={},r=0;r<t.length;++r)void 0!==t[r]&&(e[t[r].name]=null),void 0!==t[r]&&(e[t[r].isbn]=null);return e},autocomplete:function(t){var e=this,r=document.querySelector(".autocomplete"),a=this.toObject(t),s={data:a,onAutocomplete:function(t){e.getProduct(t),e.field=""}};o.a.Autocomplete.init(r,s);var n=o.a.Autocomplete.getInstance(r);n.open()},getProduct:function(t){var e=[];return e=isNaN(parseInt(t))?this.data.filter((function(e){return e.name===t?e:""})):this.data.filter((function(e){return e.isbn===t?e:""})),e},getProductIsbn:function(t){var e=this;this.$http("product/".concat(t)).then((function(t){e.field="",i["a"].dispatch("order/setProduct",t.data)}))},update:function(t){i["a"].commit("order/setDisablBtn",!0),this.params.search=t;var e={regex:/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/};e.regex.test(t)||""==t?this.getProductIsbn(t):this.getData(),Object(c["setTimeout"])((function(){i["a"].commit("order/setDisablBtn",!1)}),2e3),this.$emit("input",t)}}},l=d,u=r("2877"),p=Object(u["a"])(l,a,s,!1,null,null,null);e["a"]=p.exports},"8ae1":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col s12 mt-65"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row mt-4"},[r("div",{staticClass:"col s12 m12 l12"},[r("h5",{staticClass:"form-title"},[r("i",{staticClass:"material-icons app-header-icon text-top"},[t._v("perm_identity")]),t._v(" "+t._s(t.$t(t.title,{fregment:t.fregment}))+" ")]),r("div",{staticClass:"card animated  fadeInLeft "},[r("div",{staticClass:"card-content"},[r("form",{attrs:{autocomplete:"off"},on:{keydown:function(e){return t.form.errors.clear(e.target.id)},submit:function(e){return e.preventDefault(),t.onSubmit()}}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col s12 l6"},[r("auto-complete",{staticClass:"font-sans",attrs:{url:"products",params:t.autoCompleteParams,fieldName:"product",type:"text",hasErr:t.form.errors.has("product"),errMsg:t.form.errors.get("product")}}),"transactions.approve"!=t.$route.name?r("div",{staticClass:"row",staticStyle:{"margin-top":"20px"}},[r("div",{staticClass:"input-field col s12"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.form.branch,expression:"form.branch"}],attrs:{id:"payment"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"branch",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:""}},[t._v(t._s(t.$t("none")))]),t._l(t.allBranches,(function(e){return r("option",{key:"from_"+e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2),r("label",{staticClass:"active",staticStyle:{top:"0 !important"},attrs:{for:"branch"}},[t._v(t._s(t.$t("branch")))]),t.form.errors.has("branch")?r("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.form.errors.get("branch")))}}):t._e()])]):t._e(),"transactions.approve"==t.$route.name||t.branch?t._e():r("div",{staticClass:"row",staticStyle:{"margin-top":"20px"}},[r("div",{staticClass:"input-field col s12"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.form.from_branch,expression:"form.from_branch"}],attrs:{id:"payment"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"from_branch",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:""}},[t._v(t._s(t.$t("none")))]),t._l(t.allBranches,(function(e){return r("option",{key:"from_"+e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2),r("label",{staticClass:"active",staticStyle:{top:"0 !important"},attrs:{for:"from_branch"}},[t._v(t._s(t.$t("from_branch")))]),t.form.errors.has("from_branch")?r("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.form.errors.get("from_branch")))}}):t._e()])]),"transactions.approve"==t.$route.name?r("div",{staticClass:"row",staticStyle:{"margin-top":"20px"}},[r("div",{staticClass:"input-field col s12"},[r("div",{staticClass:"switch"},[r("label",[t._v(" "+t._s(t.$t("confirm_approve"))+" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmApprove,expression:"confirmApprove"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.confirmApprove)?t._i(t.confirmApprove,null)>-1:t.confirmApprove},on:{change:function(e){var r=t.confirmApprove,a=e.target,s=!!a.checked;if(Array.isArray(r)){var n=null,o=t._i(r,n);a.checked?o<0&&(t.confirmApprove=r.concat([n])):o>-1&&(t.confirmApprove=r.slice(0,o).concat(r.slice(o+1)))}else t.confirmApprove=s}}}),r("span",{staticClass:"lever"})])])])]):t._e()],1),r("div",{staticClass:"col s12 l6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"input-field col s12"},[r("div",{staticClass:"products"},[t._v(" "+t._s(t.$t("products"))+" ")]),r("div",{staticClass:"invoice__table"},[r("table",{staticClass:"highlight responsive-table"},[r("thead",[r("tr",[r("th",{attrs:{"data-field":"no"}},[t._v(t._s(t.$t("no")))]),r("th",{attrs:{"data-field":"item"}},[t._v(t._s(t.$t("item")))]),r("th",{attrs:{"data-field":"uprice"}},[t._v(" "+t._s(t.$t("unit_price"))+" ")]),r("th",{attrs:{"data-field":"price"}},[t._v(t._s(t.$t("qty")))])])]),r("tbody",t._l(t.products,(function(e,a){return r("tr",{key:a},[r("td",[t._v(t._s(a+1)+".")]),r("td",[t._v(t._s(e.name))]),r("td",[t._v("EGP"+t._s(e.price))]),r("td",[r("div",{staticClass:"counter"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"product.qty"}],staticClass:"border-none w2",domProps:{value:e.qty},on:{input:function(r){r.target.composing||t.$set(e,"qty",r.target.value)}}})])]),r("td",[r("i",{staticClass:"material-icons",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.deleteProduct(a)}}},[t._v("delete")])])])})),0)])])])])])]),t.form.branch&&t.confirmApprove?r("submit-btn",{attrs:{isDisabled:t.form.errors.any()||t.disablBtn,isLoading:t.form.isLoading,title:"save"}}):r("submit-btn",{attrs:{isDisabled:!0,title:"save"}})],1),"transactions.approve"==t.$route.name?r("div",{staticClass:"row"},[r("div",{staticClass:"col s12 l12"},[r("div",{staticClass:"row"},[r("div",{staticClass:"input-field col s12"},[r("div",{staticClass:"products"},[t._v(" "+t._s(t.$t("report"))+" ")]),r("div",{staticClass:"invoice__table"},[r("table",{staticClass:"highlight responsive-table"},[t._m(0),r("tbody",[t._l(t.reportProducts,(function(e,a){return r("tr",{key:a,class:t.getPivotQty(e.isbn)==t.getQty(e.isbn)?"success":"danger"},[r("td",[t._v(t._s(a+1)+".")]),r("td",[t._v(t._s(e.isbn))]),r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(t.getQty(e.isbn)))]),r("td",[t._v(" "+t._s(t.getPivotQty(e.isbn)-parseInt(t.getQty(e.isbn)))+" ")]),r("td",[t.getPivotQty(e.isbn)==t.getQty(e.isbn)?r("span",[t._v(" "+t._s(t.$t("approved"))+" ")]):t.getPivotQty(e.isbn)>t.getQty(e.isbn)?r("span",[t._v(" "+t._s(t.$t("plus"))+" ")]):r("span",[t._v(" "+t._s(t.$t("minus"))+" ")])]),r("td",{staticStyle:{cursor:"pointer"},on:{click:function(r){return t.approveProduct(e)}}},[r("i",{staticClass:"material-icons"},[t._v("check")])])])})),t._l(t.notFoundProducts,(function(e,a){return r("tr",{key:a,staticClass:"danger"},[r("td",[t._v(" "+t._s(t.reportProducts.length+a+1)+". ")]),r("td",[t._v(t._s(e.isbn))]),r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(t.getQty(e.isbn)))]),r("td",[t._v(t._s(parseInt(t.getQty(e.isbn))))]),r("td",[t._v(" "+t._s(t.$t("notfound_in_transaction"))+" ")])])})),t._l(t.notApproved,(function(e,a){return r("tr",{key:a,staticClass:"danger"},[r("td",[t._v(" "+t._s(t.reportProducts.length+t.notFoundProducts.length+a+1)+". ")]),r("td",[t._v(t._s(e))]),r("td",[t._v(t._s(t.getName(e)))]),r("td",[t._v(t._s(t.getQty(e)))]),r("td",[t._v(t._s(parseInt(t.getQty(e))))]),r("td",[t._v(" "+t._s(t.$t("notfound_in_check"))+" ")])])}))],2)])])])])])]):t._e()])])])])])])])},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",{attrs:{"data-field":"no"}},[t._v("No")]),r("th",{attrs:{"data-field":"isbn"}},[t._v("Isbn")]),r("th",{attrs:{"data-field":"item"}},[t._v("Item")]),r("th",{attrs:{"data-field":"qty"}},[t._v("Qty")]),r("th",{attrs:{"data-field":"difference"}},[t._v("difference")]),r("th",{attrs:{"data-field":"status"}},[t._v("status")]),r("th",{attrs:{"data-field":"status"}},[t._v("approve")])])])}],n=(r("99af"),r("4de4"),r("4160"),r("b0c0"),r("d3b7"),r("159b"),r("96cf"),r("284c")),o=r("63f6"),i=r("0d14"),c=r("4360"),d=r("09a9"),l=r("4d5c"),u=r.n(l),p={name:"edit-add-orders",data:function(){return{title:"create_transaction",reportProducts:[],printing:!1,confirmApprove:!1,percent:0,order:{},path:[{title:"transactions",route:"transactions.index"}],fregment:"",autoCompleteParams:{offset:0,no:10,sort_by:"",sort_func:""},form:new o["a"]({products:[],from_branch:"",branch:"",approved:0}),btns:[]}},watch:{},mounted:function(){this.$route.params.id&&this.getTransaction(),"transactions.approve"!=this.$route.name&&(this.confirmApprove=!0),this.loadSelects()},computed:{products:function(){return c["a"].getters["order/products"]},disablBtn:function(){return c["a"].getters["order/disablBtn"]},allBranches:function(){return c["a"].getters["order/allBranches"]},branch:function(){return localStorage.getItem("branch")?localStorage.getItem("branch"):""}},components:{"submit-btn":d["a"],"auto-complete":i["a"]},methods:{approveProduct:function(t){var e=!1;this.products.forEach((function(r){r.id==t.id&&(e=!0)})),!e&&this.products.push(t)},getQty:function(t){var e=this.products.filter((function(e){return e.isbn==t?e:""}));return e[0]?e[0].qty:0},getName:function(t){var e=this.products.filter((function(e){return e.isbn==t?e:""}));return e[0].name},getPivotQty:function(t){var e=this.reportProducts.filter((function(e){return e.isbn==t?e:""}));return e[0]?e[0].qty:0},loadSelects:function(){var t=document.querySelectorAll("select");t.forEach((function(t){setTimeout((function(){u.a.FormSelect.init(t,{})}),2e3)}))},printData:function(){this.printing=!0,setTimeout((function(){for(var t=document.getElementById("invoice-POS").innerHTML,e="",r=0,a=Object(n["a"])(document.querySelectorAll('link[rel="stylesheet"], style'));r<a.length;r++){var s=a[r];e+=s.outerHTML}var o=window.open("","","left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");o.document.write("<!DOCTYPE html>\n              <html>\n                <head>\n                  ".concat(e,"\n                  <style>\n                    #invoice-POS{\n                      display:block !important;\n                    }\n                  </style>\n                </head>\n                <body>\n                  ").concat(t,"\n                </body>\n              </html>")),o.document.close(),o.focus(),o.print(),o.close(),location.reload()}),1e3)},selectBranch:function(t){this.form.branch=t},selectFromBranch:function(t){this.form.from_branch=t},setProduct:function(){},deleteProduct:function(t){c["a"].commit("order/deleteProduct",t)},onSubmit:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.products);case 2:this.form.products=e.sent,this.$route.params.id?("transactions.approve"==this.$route.name&&(this.form.approved=1),this.form.post("transaction/".concat(this.$route.params.id,"/edit")).then((function(e){t.transaction=e.transaction,t.products=e.products,u.a.toast({html:"".concat(t.$t("edited_successfully",{name:"transaction"})),classes:"success toast",displayLength:3e3}),c["a"].commit("order/setProducts",[]),t.$router.push({name:"transactions.index"})}))):this.form.post("transaction/create").then((function(e){t.transaction=e.transaction,t.products=e.products,u.a.toast({html:"".concat(t.$t("created_successfully",{name:"transaction"})),classes:"success toast",displayLength:3e3}),c["a"].commit("order/setProducts",[]),t.$router.push({name:"transactions.index"})}));case 4:case"end":return e.stop()}}),null,this)},getTransaction:function(){var t=this;this.$http.get("transaction/".concat(this.$route.params.id)).then((function(e){if("transactions.approve"==t.$route.name)return t.reportProducts=e.data.products,t.form.from_branch=e.data.transaction.from_branch,void(t.form.branch=e.data.transaction.branch_id);t.form.products=e.data.products,t.form.from_branch=e.data.transaction.from_branch,t.form.branch=e.data.transaction.branch_id,c["a"].dispatch("order/setProducts",e.data.products)}))}},beforeDestroy:function(){c["a"].commit("order/setProducts",[])}},f=p,m=(r("db91"),r("2877")),v=Object(m["a"])(f,a,s,!1,null,null,null);e["default"]=v.exports},db91:function(t,e,r){"use strict";var a=r("e7ec"),s=r.n(a);s.a},e7ec:function(t,e,r){}}]);
//# sourceMappingURL=chunk-76554fd2.3c187a2d.js.map