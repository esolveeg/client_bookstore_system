(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ec63544"],{"0d14":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-group mb-4 input-field"},[a("label",{staticClass:"block font-normal uppercase tracking-wide text-xs mb-1",attrs:{for:t.fieldName}},[t._v(t._s(t.$t(t.fieldName)))]),"checkbox"===t.type?a("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:"checkbox"},domProps:{value:t.field,checked:Array.isArray(t.field)?t._i(t.field,t.field)>-1:t.field},on:{input:function(e){return t.update(e.target.value)},change:function(e){var a=t.field,r=e.target,s=!!r.checked;if(Array.isArray(a)){var o=t.field,i=t._i(a,o);r.checked?i<0&&(t.field=a.concat([o])):i>-1&&(t.field=a.slice(0,i).concat(a.slice(i+1)))}else t.field=s}}}):"radio"===t.type?a("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:"radio"},domProps:{value:t.field,checked:t._q(t.field,t.field)},on:{input:function(e){return t.update(e.target.value)},change:function(e){t.field=t.field}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.field,expression:"field"}],staticClass:"border px-4 py-2 w-full rounded bg-gray-200 autocomplete",attrs:{id:t.fieldName,autocomplete:"off",autofocus:"",type:t.type},domProps:{value:t.field,value:t.field},on:{input:[function(e){e.target.composing||(t.field=e.target.value)},function(e){return t.update(e.target.value)}]}}),t.hasErr?a("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.errMsg))}}):t._e(),t.hasError&&!t.hasErr?a("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.errorMsg))}}):t._e()])},s=[],o=(a("4de4"),a("b0c0"),a("d3b7"),a("e25e"),a("ac1f"),a("841c"),a("4d5c")),i=a.n(o),n=a("4360"),c=a("5118"),d={props:["fieeld","url","params","fieldName","type","hasErr","errMsg"],data:function(){return{hasError:!1,field:"",data:[],errorMsg:""}},methods:{getData:function(){var t=this;return new Promise((function(e,a){t.$http.get(t.url,{params:t.params}).then((function(a){e(a.data),t.autocomplete(a.data.data),t.data=a.data.data})).catch((function(t){a(t)}))}))},toObject:function(t){for(var e={},a=0;a<t.length;++a)void 0!==t[a]&&(e[t[a].name]=null),void 0!==t[a]&&(e[t[a].isbn]=null);return e},autocomplete:function(t){var e=this,a=document.querySelector(".autocomplete"),r=this.toObject(t),s={data:r,onAutocomplete:function(t){e.getProduct(t),e.field=""}};i.a.Autocomplete.init(a,s);var o=i.a.Autocomplete.getInstance(a);o.open()},getProduct:function(t){var e=[];return e=isNaN(parseInt(t))?this.data.filter((function(e){return e.name===t?e:""})):this.data.filter((function(e){return e.isbn===t?e:""})),e},getProductIsbn:function(t){var e=this;this.$http("product/".concat(t)).then((function(t){e.field="",n["a"].dispatch("order/setProduct",t.data)}))},update:function(t){n["a"].commit("order/setDisablBtn",!0),this.params.search=t;var e={regex:/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/};e.regex.test(t)||""==t?this.getProductIsbn(t):this.getData(),Object(c["setTimeout"])((function(){n["a"].commit("order/setDisablBtn",!1)}),2e3),this.$emit("input",t)}}},l=d,u=a("2877"),f=Object(u["a"])(l,r,s,!1,null,null,null);e["a"]=f.exports},"3f2d":function(t,e,a){},"6b67":function(t,e,a){"use strict";var r=a("3f2d"),s=a.n(r);s.a},aade:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",[a("div",{attrs:{id:"invoice-POS"}},[a("center",{attrs:{id:"top"}},[a("div",{staticClass:"info"},[a("h2",{staticClass:"hresete"},[t._v("Readerscorner")]),a("img",{staticStyle:{width:"120px",height:"auto"},attrs:{src:"http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"}})])]),a("div",{attrs:{id:"mid"}},[a("div",{staticClass:"info"},[a("h2",{staticClass:"hresete"},[t._v("Info")]),t._m(0),t.order.id?a("p",[t._v("Invoice no : #"+t._s(t.order.id)),a("br")]):t._e(),t._v(" --\x3e "),a("p",[t._v("Invoice Date : #"+t._s(t.now)),a("br")])])]),a("div",{attrs:{id:"bot"}},[a("div",{attrs:{id:"table"}},[a("table",[t._m(1),t._l(t.products,(function(e,r){return a("tr",{key:r,staticClass:"service"},[a("td",{staticClass:"tableitem"},[a("p",{staticClass:"itemtext"},[t._v(t._s(e.name))])]),a("td",{staticClass:"tableitem"},[a("p",{staticClass:"itemtext"},[t._v("EGP"+t._s(e.purchased_price))])]),a("td",{staticClass:"tableitem"},[a("p",{staticClass:"itemtext"},[t._v(t._s(e.qty))])]),a("td",{staticClass:"tableitem"},[a("p",{staticClass:"itemtext"},[t._v(" EGP"+t._s(e.purchased_price*e.qty)+" ")])])])})),a("tr",{staticClass:"tabletitle"},[a("td"),a("td"),t._m(2),a("td",{staticClass:"payment"},[a("h2",{staticClass:"hresete"},[t._v("EGP"+t._s(parseInt(t.order.total)))])])]),a("tr",{staticClass:"tabletitle"},[a("td"),a("td"),t._m(3),a("td",{staticClass:"payment"},[a("h2",{staticClass:"hresete"},[t._v("EGP"+t._s(parseInt(t.order.total)))])])])],2)])])],1)]),a("div",{staticClass:"col s12 mt-65"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row mt-4"},[a("div",{staticClass:"col s12 m12 l12"},[a("h5",{staticClass:"form-title"},[a("i",{staticClass:"material-icons app-header-icon text-top"},[t._v("perm_identity")]),t._v(" "+t._s(t.$t(t.title,{fregment:t.fregment}))+" ")]),a("div",{staticClass:"card animated  fadeInLeft "},[a("div",{staticClass:"card-content"},[a("form",{attrs:{autocomplete:"off"},on:{keydown:function(e){return t.form.errors.clear(e.target.id)},submit:function(e){return e.preventDefault(),t.onSubmit()}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12 l6"},[a("auto-complete",{staticClass:"font-sans",attrs:{field:t.product,url:"products",params:t.autoCompleteParams,fieldName:"product",type:"text",hasErr:t.form.errors.has("product"),errMsg:t.form.errors.get("product")},model:{value:t.product,callback:function(e){t.product=e},expression:"product"}}),t.branch?t._e():a("div",{staticClass:"row",staticStyle:{"margin-top":"20px"}},[a("div",{staticClass:"input-field col s12"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.branch,expression:"form.branch"}],attrs:{id:"branch"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"branch",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v(t._s(t.$t("none")))]),t._l(t.allBranches,(function(e){return a("option",{key:"from_"+e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2),a("label",{staticClass:"active",staticStyle:{top:"0 !important"},attrs:{for:"branch"}},[t._v(t._s(t.$t("branch")))]),t.form.errors.has("branch")?a("span",{staticClass:"msg is-danger",domProps:{textContent:t._s(t.$t(t.form.errors.get("branch")))}}):t._e()])]),a("text-field",{staticClass:"font-sans",attrs:{field:t.form.note,validation:t.noteValidation,fieldName:"note",type:"text",hasErr:t.form.errors.has("note"),errMsg:t.form.errors.get("note")},model:{value:t.form.note,callback:function(e){t.$set(t.form,"note",e)},expression:"form.note"}})],1),a("div",{staticClass:"col s12 l6"},[a("div",{staticClass:"row"},[a("div",{staticClass:"input-field col s12"},[a("div",{staticClass:"products"},[t._v(" "+t._s(t.$t("products"))+" ")]),a("div",{staticClass:"invoice__table"},[a("table",{staticClass:"highlight responsive-table"},[a("thead",[a("tr",[a("th",{attrs:{"data-field":"no"}},[t._v(t._s(t.$t("no")))]),a("th",{attrs:{"data-field":"item"}},[t._v(t._s(t.$t("item")))]),a("th",{attrs:{"data-field":"uprice"}},[t._v(" "+t._s(t.$t("unit_price"))+" ")]),a("th",{attrs:{"data-field":"price"}},[t._v(t._s(t.$t("qty")))]),a("th",{attrs:{"data-field":"price"}},[t._v(t._s(t.$t("total")))])])]),a("tbody",[t._l(t.products,(function(e,r){return a("tr",{key:r},[a("td",[t._v(t._s(r+1)+".")]),a("td",[t._v(t._s(e.name))]),a("td",[t._v("EGP"+t._s(e.purchased_price))]),a("td",[a("div",{staticClass:"counter"},[a("input",{staticClass:"border-none w2",domProps:{value:e.qty},on:{input:function(a){return t.qtyUpdated(a,e)}}})])]),a("td",[t._v(" EGP"+t._s(e.purchased_price*e.qty)+" ")]),a("td",[a("i",{staticClass:"material-icons",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.deleteProduct(r)}}},[t._v("delete")])])])})),a("tr",{staticClass:"border-none"},[a("td",{attrs:{colspan:"3"}}),a("td",[t._v(t._s(t.$t("subtotal"))+":")]),a("td",[t._v("EGP"+t._s(t.total))])])],2)])])])])])]),a("submit-btn",{attrs:{isDisabled:t.form.errors.any()||t.disablBtn||0==t.products.length,isLoading:t.form.isLoading,title:"save"}})],1)])])])])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v("Email : info@readerscorner.co"),a("br")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"tabletitle"},[a("td",{staticClass:"item"},[a("h2",{staticClass:"hresete"},[t._v("Item")])]),a("td",{staticClass:"Hours"},[a("h2",{staticClass:"hresete"},[t._v("Price")])]),a("td",{staticClass:"Hours"},[a("h2",{staticClass:"hresete"},[t._v("Qty")])]),a("td",{staticClass:"Rate"},[a("h2",{staticClass:"hresete"},[t._v("Sub Total")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{staticClass:"Rate"},[a("h2",{staticClass:"hresete"},[t._v("subtotal")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{staticClass:"Rate"},[a("h2",{staticClass:"hresete"},[t._v("Total")])])}],o=(a("99af"),a("4160"),a("0d03"),a("d3b7"),a("159b"),a("96cf"),a("284c")),i=a("63f6"),n=a("bc8c"),c=a("0d14"),d=a("4360"),l=a("09a9"),u=a("4d5c"),f=a.n(u),m={name:"edit-add-orders",data:function(){var t=new Date,e=t.getHours()+":"+t.getMinutes()+":"+t.getSeconds(),a="",r=new i["a"]({note:"",now:e,order:[],products:[],branch:"",total:0});return{title:"create_order",printing:!1,order:{},now:e,product:a,path:[{title:"outcoming orders",route:"outcomingorders.index"}],fregment:"",autoCompleteParams:{offset:0,no:10,sort_by:"",sort_func:""},form:r,noteValidation:[{message:"max_250",regex:/^.{0,250}$/}],btns:[]}},mounted:function(){this.loadSelects(),this.$route.params.id&&this.getOrder()},computed:{products:function(){return d["a"].getters["order/products"]},disablBtn:function(){return d["a"].getters["order/disablBtn"]},allBranches:function(){return d["a"].getters["order/allBranches"]},branch:function(){return localStorage.getItem("branch")?localStorage.getItem("branch"):""},total:function(){return d["a"].getters["order/outTtotal"]}},components:{"text-field":n["a"],"submit-btn":l["a"],"auto-complete":c["a"]},methods:{loadSelects:function(){var t=document.querySelectorAll("select");t.forEach((function(t){setTimeout((function(){f.a.FormSelect.init(t,{})}),2e3)}))},qtyUpdated:function(t,e){d["a"].commit("order/updateQty",{product:e,data:t.target.value})},printData:function(t){var e=this;this.printing=!0,setTimeout((function(){for(var a=document.getElementById("invoice-POS").innerHTML,r="",s=0,i=Object(o["a"])(document.querySelectorAll('link[rel="stylesheet"], style'));s<i.length;s++){var n=i[s];r+=n.outerHTML}var c=window.open("","","left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");c.document.write("<!DOCTYPE html>\n              <html>\n                <head>\n                  ".concat(r,"\n                  <style>\n                    #invoice-POS{\n                      display:block !important;\n                    }\n                  </style>\n                </head>\n                <body>\n                  ").concat(a,"\n                </body>\n              </html>")),c.document.close(),c.focus(),c.print(),c.close(),t?e.$router.push({name:"orders.index"}):location.reload()}),1e3)},selectBranch:function(t){this.form.branch=t},setProduct:function(){},deleteProduct:function(t){d["a"].commit("order/deleteProduct",t)},onSubmit:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.form.total=this.total,e.next=3,regeneratorRuntime.awrap(this.products);case 3:this.form.products=e.sent,this.branch&&(this.form.branch=this.branch),this.$route.params.id?this.form.post("outorder/".concat(this.$route.params.id,"/edit")).then((function(e){t.order=e.order,t.products=e.products,t.printData(!0)})):this.form.post("outorder").then((function(e){t.order=e.order,t.products=e.products,t.printData(!1)}));case 6:case"end":return e.stop()}}),null,this)},getOrder:function(){var t=this;this.$http.get("outorder/".concat(this.$route.params.id)).then((function(e){t.form.note=e.data.order.note,t.form.branch=e.data.order.branch_id,t.form.total=e.data.order.total,t.order=e.data.order,d["a"].dispatch("order/setProducts",e.data.products),t.form.products=e.data.products}))}},beforeDestroy:function(){d["a"].commit("order/setProducts",[])}},p=m,h=(a("6b67"),a("2877")),v=Object(h["a"])(p,r,s,!1,null,null,null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-7ec63544.d3468216.js.map