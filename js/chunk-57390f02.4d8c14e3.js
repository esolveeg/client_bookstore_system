(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57390f02"],{5950:function(t,e,s){},"65ca":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"printTable",staticStyle:{padding:"2mm",margin:"0 auto",width:"430px",background:"#FFF","font-family":"'Muli', sans-serif"},attrs:{id:"invoice-POS"}},[t._m(0),s("div",{staticStyle:{"min-height":"80px","border-bottom":"1px solid #EEE"},attrs:{id:"mid"}},[t._m(1),s("div",{staticClass:"info",staticStyle:{display:"block","margin-left":"0"}},[s("p",{staticStyle:{"font-size":"1.2em",color:"#000","line-height":"1.2em"}},[t._v(" Invoice no : #"+t._s(this.id)),s("br")])])]),s("div",{staticStyle:{"min-height":"50px","border-bottom":"1px solid #EEE"},attrs:{id:"bot"}},[s("div",{attrs:{id:"table"}},[s("table",{staticStyle:{width:"100%","border-collapse":"collapse"}},[t._m(2),t._l(t.products,(function(e,a){return s("tr",{key:a,staticClass:"service",staticStyle:{"border-bottom":"1px solid #EEE"}},[s("td",{staticClass:"tableitem",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("p",{staticClass:"itemtext",staticStyle:{"font-size":".9em",color:"#000","line-height":"1.2em"}},[t._v(" "+t._s(e.name)+" ")])]),s("td",{staticClass:"tableitem",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("p",{staticClass:"itemtext",staticStyle:{"font-size":".9em",color:"#000","line-height":"1.2em"}},[t._v(" "+t._s(t.qtys[a])+" ")])]),s("td",{staticClass:"tableitem",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("p",{staticClass:"itemtext",staticStyle:{"font-size":".9em",color:"#000","line-height":"1.2em"}},[t._v(" EGP"+t._s(e.price)+" ")])]),s("td",{staticClass:"tableitem",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("p",{staticClass:"itemtext",staticStyle:{"font-size":".9em",color:"#000","line-height":"1.2em"}},[t._v(" EGP"+t._s(e.price*t.qtys[a])+" ")])])])})),s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(3),s("td",{staticClass:"payment",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h4",{staticStyle:{"text-align":"left"}},[t._v("EGP"+t._s(t.total))])])]),t.discount?s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),"percent"==t.discountType?s("td",{staticClass:"Rate",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h4",{staticStyle:{"text-align":"left"}},[t._v(" "+t._s(t.$t("discountPercent",{percent:t.discount}))+" ")])]):s("td",{staticClass:"Rate",staticStyle:{border:"1px solid #EEE"}},[s("h4",{staticStyle:{"text-align":"left"}},[t._v(t._s(t.$t("discount"))+":")])]),s("td",{staticClass:"payment",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("EGP"+t._s(parseInt(t.discountValue))+":")])])]):t._e(),t.discountValue?s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(4),s("td",{staticClass:"payment",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("EGP"+t._s(parseInt(t.total-t.discountValue)))])])]):s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(5),s("td",{staticClass:"payment",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("EGP"+t._s(t.total))])])])],2)]),t._m(6)])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{"tex-align":"center","min-height":"100px","border-bottom":"1px solid #EEE"},attrs:{id:"top"}},[s("div",{staticClass:"logo",staticStyle:{"text-align":"center"}},[s("img",{staticStyle:{width:"120px",height:"auto"},attrs:{src:"http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"}})]),s("div",{staticClass:"info"},[s("h2",{staticStyle:{"text-align":"center","font-size":"2em","font-weight":"300","line-height":"2em",color:"#000"}},[t._v(" READERSCORNER ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"info",staticStyle:{display:"block","margin-left":"0"}},[s("h2",{staticStyle:{"font-size":"2em","font-weight":"300","line-height":"2em",color:"#000"}},[t._v(" Contact Info ")]),s("p",{staticStyle:{"font-size":"1.2em",color:"#000","line-height":"1.2em"}},[t._v(" Email : info@readerscorner.co"),s("br")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",{staticClass:"tabletitle",staticStyle:{padding:"5px","font-size":".9em"}},[s("td",{staticClass:"item",staticStyle:{padding:"5px 0 5px 15px",width:"24mm",border:"1px solid #EEE"}},[s("h2",[t._v("Item")])]),s("td",{staticClass:"Hours",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("Qty")])]),s("td",{staticClass:"Rate",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("price")])]),s("td",{staticClass:"Rate",staticStyle:{padding:"5px 0 5px 15px",border:"1px solid #EEE"}},[s("h2",[t._v("total")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("h4",{staticStyle:{"text-align":"left",border:"1px solid #EEE"}},[t._v("subtotal:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{staticStyle:{border:"1px solid #EEE"}},[s("h4",{staticStyle:{"text-align":"left"}},[t._v("Total:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{staticStyle:{border:"1px solid #EEE"}},[s("h4",[t._v("Total")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{"text-align":"center"},attrs:{id:"legalcopy"}},[s("p",{staticClass:"legal",staticStyle:{"font-size":"1.2em",color:"#000","line-height":"1.2em"}},[s("strong",[t._v("Thank you for your purchase!")]),t._v(" "),s("br"),t._v(" you can make more further purchases from our website"),s("br"),s("strong",[t._v(" Readerscorner.co. ")])])])}],r={name:"resete",props:["products","qtys","id","tota","discountValue","discount","discountType","total"]},o=r,n=s("2877"),c=Object(n["a"])(o,a,i,!1,null,"36da5a5c",null);e["a"]=c.exports},"7a4d":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",[s("div",{attrs:{id:"invoice-POS"}},[s("center",{attrs:{id:"top"}},[s("div",{staticClass:"info"},[s("h2",{staticClass:"hresete"},[t._v("Readerscorner")]),s("img",{staticStyle:{width:"120px",height:"auto"},attrs:{src:"http://readerscorner.co/storage/settings/May2019/S3fivD7C4Y2oXfnGaEsa.png"}})])]),s("div",{attrs:{id:"mid"}},[s("div",{staticClass:"info"},[s("h2",{staticClass:"hresete"},[t._v("Info")]),t._m(0),t.customer&&t.customer.name?s("p",[t._v(" customer: "+t._s(t.customer.name)),s("br")]):t._e(),t.customer&&t.customer.email?s("p",[t._v(" customer email: "+t._s(t.customer.email)),s("br")]):t._e(),t.id?s("p",[t._v("Invoice no : #"+t._s(t.id)),s("br")]):t._e(),s("p",[t._v("Invoice Date : #"+t._s(t.now)),s("br")])])]),s("div",{attrs:{id:"bot"}},[s("div",{attrs:{id:"table"}},[s("table",[t._m(1),t._l(t.products,(function(e,a){return s("tr",{key:a,staticClass:"service"},[s("td",{staticClass:"tableitem"},[s("p",{staticClass:"itemtext"},[t._v(t._s(e.name))])]),s("td",{staticClass:"tableitem"},[s("p",{staticClass:"itemtext"},[t._v("EGP"+t._s(e.price))])]),s("td",{staticClass:"tableitem"},[s("p",{staticClass:"itemtext"},[t._v(t._s(t.qtys[a]))])]),s("td",{staticClass:"tableitem"},[s("p",{staticClass:"itemtext"},[t._v("EGP"+t._s(e.price*t.qtys[a]))])])])})),s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(2),s("td",{staticClass:"payment"},[s("h2",{staticClass:"hresete"},[t._v("EGP"+t._s(t.total))])])]),t.discount?s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(3),"percent"==this.discountType?s("td",{staticClass:"payment"},[s("h2",{staticClass:"hresete"},[t._v("%"+t._s(t.discount))])]):s("td",{staticClass:"payment"},[s("h2",{staticClass:"hresete"},[t._v(t._s(parseInt(t.discountValue)))])])]):t._e(),s("tr",{staticClass:"tabletitle"},[s("td"),s("td"),t._m(4),s("td",{staticClass:"payment"},[s("h2",{staticClass:"hresete"},[t._v(" EGP"+t._s(parseInt(t.total-t.discountValue))+" ")])])])],2)])])],1)]),s("Breadcrumbs",{attrs:{title:t.title,path:t.path,fregment:t.fregment}}),s("div",{staticClass:"col s12 mt-65"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-4"},[s("div",{staticClass:"col s12 m12 l12"},[s("h5",{staticClass:"form-title"},[s("i",{staticClass:"material-icons app-header-icon text-top"},[t._v("perm_identity")]),t._v(" "+t._s(t.$t(t.title,{fregment:t.fregment}))+" ")]),s("div",{staticClass:"card animated  fadeInLeft "},[s("div",{staticClass:"card-content"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.submitted()}}},[t.validationError?s("div",{staticClass:"card-alert danger card"},[s("div",{staticClass:"card-content"},[s("p",[s("i",{staticClass:"material-icons"},[t._v("error")]),t._v(t._s(t.validationError)+" ")])])]):t._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col s12 l6"},[s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("isbn")}},[s("i",{staticClass:"material-icons prefix isbn-clear active",on:{click:function(e){t.isbn=""}}},[t._v("clear")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.product,expression:"product"}],staticClass:"input-isbn autocomplete",attrs:{id:"isbn",type:"text",autocomplete:"off",autofocus:""},domProps:{value:t.product},on:{input:function(e){e.target.composing||(t.product=e.target.value)}}}),s("label",{staticClass:"label-isbn active",class:t.isbn?"active":"",attrs:{for:"isbn"}},[t._v(t._s(t.$t("product")))]),s("div",{staticClass:"message"},[this.qtyIncreased?s("span",{staticClass:"success-text"},[t._v(t._s(t.$t("qty_increased")))]):t._e(),this.productAlreadyAdded?s("span",{staticClass:"error-text"},[t._v(t._s(t.$t("poduct_already_add")))]):t._e(),this.productAdded?s("span",{staticClass:"success-text"},[t._v(t._s(t.$t("poduct_added_successfully")))]):t._e(),t._v(" "+t._s(t.validation.firstError("isbn"))+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.discountType,expression:"discountType"}],attrs:{id:"type"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.discountType=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"",disabled:"none"}},[t._v(t._s(t.$t("discount_type")))]),s("option",{attrs:{value:"value"}},[t._v(t._s(t.$t("value")))]),s("option",{attrs:{value:"percent"}},[t._v(t._s(t.$t("percent")))])]),s("label",{class:t.discountType?"active":"",attrs:{for:"type"}},[t._v(t._s(t.$t("discount_type")))]),s("div",{staticClass:"message"},[t._v(" "+t._s(t.validation.firstError("type"))+" ")])])]),this.discountType?s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("discount")}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.discount,expression:"discount"}],attrs:{id:"discount",type:"text"},domProps:{value:t.discount},on:{input:function(e){e.target.composing||(t.discount=e.target.value)}}}),s("label",{class:t.discount?"active":"",attrs:{for:"discount"}},[t._v(t._s(t.$t("discount")))]),s("div",{staticClass:"message"},[t._v(" "+t._s(t.validation.firstError("discount"))+" ")])])]):t._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("note")}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.note,expression:"note"}],attrs:{id:"note",type:"text"},domProps:{value:t.note},on:{input:function(e){e.target.composing||(t.note=e.target.value)}}}),s("label",{class:t.note?"active":"",attrs:{for:"note"}},[t._v(t._s(t.$t("note")))]),s("div",{staticClass:"message"},[t._v(" "+t._s(t.validation.firstError("note"))+" ")])])]),t.isPos?t._e():s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("branch")}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.branch,expression:"branch"}],attrs:{id:"branch"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.branch=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"",disabled:"none"}},[t._v(t._s(t.$t("select_branch")))]),t._l(t.allBranches,(function(e){return s("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2),s("label",{class:t.branch?"active":"",attrs:{for:"branches"}},[t._v(t._s(t.$t("branches")))]),s("div",{staticClass:"message"},[t._v(" "+t._s(t.validation.firstError("branch"))+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("customer")}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.customer,expression:"customer"}],attrs:{id:"customer"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.customer=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"",disabled:"none"}},[t._v(t._s(t.$t("select_customer")))]),t._l(t.allCustomers,(function(e){return s("option",{key:e.id,domProps:{value:e}},[t._v(t._s(e.name))])}))],2),s("label",{class:t.customer?"active":"",attrs:{for:"customers"}},[t._v(t._s(t.$t("customers")))]),s("div",{staticClass:"message"},[t.points?s("span",[t._v(" "+t._s(t.$t("points"))+t._s(t.points)+" ")]):t._e(),t._v(" "+t._s(t.validation.firstError("customer"))+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12",class:{error:t.validation.hasError("payment")}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.payment,expression:"payment"}],attrs:{id:"payment"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.payment=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"",disabled:"none"}},[t._v(t._s(t.$t("payment_method")))]),t._l(t.payments.length,(function(e){return s("option",{key:e,domProps:{value:t.payments[e-1]}},[t._v(t._s(t.$t(t.payments[e-1])))])}))],2),s("label",{class:t.customer?"active":"",attrs:{for:"customers"}},[t._v(t._s(t.$t("customers")))]),s("div",{staticClass:"message"},[t._v(" "+t._s(t.validation.firstError("customer"))+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.remainHere,expression:"remainHere"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.remainHere)?t._i(t.remainHere,null)>-1:t.remainHere},on:{change:function(e){var s=t.remainHere,a=e.target,i=!!a.checked;if(Array.isArray(s)){var r=null,o=t._i(s,r);a.checked?o<0&&(t.remainHere=s.concat([r])):o>-1&&(t.remainHere=s.slice(0,o).concat(s.slice(o+1)))}else t.remainHere=i}}}),s("span",[t._v(t._s(t.$t("remain_here")))])])])])]),s("div",{staticClass:"col s12 l6"},[s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("div",{staticClass:"products"},[t._v(" "+t._s(t.$t("products"))+" ")]),s("div",{staticClass:"invoice__table"},[s("table",{staticClass:"highlight responsive-table"},[s("thead",[s("tr",[s("th",{attrs:{"data-field":"no"}},[t._v(t._s(t.$t("no")))]),s("th",{attrs:{"data-field":"item"}},[t._v(t._s(t.$t("item")))]),s("th",{attrs:{"data-field":"uprice"}},[t._v(" "+t._s(t.$t("unit_price"))+" ")]),s("th",{attrs:{"data-field":"price"}},[t._v(t._s(t.$t("qty")))]),s("th",{attrs:{"data-field":"price"}},[t._v(t._s(t.$t("total")))])])]),s("tbody",[t._l(t.products,(function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(a+1)+".")]),s("td",[t._v(t._s(e.name))]),s("td",[t._v("EGP"+t._s(e.price))]),s("td",[s("div",{staticClass:"counter"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.qtys[a],expression:"qtys[index]"}],staticClass:"border-none w2",domProps:{value:t.qtys[a]},on:{input:function(e){e.target.composing||t.$set(t.qtys,a,e.target.value)}}})])]),s("td",[t._v("EGP"+t._s(e.price*t.qtys[a]))]),s("td",[s("i",{staticClass:"material-icons",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.removeProduct(a)}}},[t._v("delete")])])])})),s("tr",{staticClass:"border-none"},[s("td",{attrs:{colspan:"3"}}),s("td",[t._v(t._s(t.$t("subtotal"))+":")]),s("td",[t._v("EGP"+t._s(t.total))])]),t.discount?s("tr",{staticClass:"border-none"},[s("td",{attrs:{colspan:"3"}}),"percent"==this.discountType?s("td",[t._v(" "+t._s(t.$t("discountPercent",{percent:this.discount}))+" ")]):s("td",[t._v(t._s(t.$t("discount")))]),s("td",[t._v(t._s(parseInt(t.discountValue)))])]):t._e(),s("tr",{staticClass:"border-none"},[s("td",{attrs:{colspan:"3"}}),s("td",{staticClass:"cyan white-text pl-1"},[t._v(" "+t._s(t.$t("total"))+" ")]),s("td",{staticClass:"cyan strong white-text"},[t._v(" EGP"+t._s(parseInt(t.total-t.discountValue))+" ")])])],2)])])])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("button",{staticClass:"btn create cyan waves-effect waves-light left",attrs:{type:"submit",disabled:"disabled",name:"action"}},[t._v(" "+t._s(t.$t("save"))+" "),s("i",{staticClass:"material-icons right"},[t._v("send")])])])])])])])])])])])],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v("Email : info@readerscorner.co"),s("br")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",{staticClass:"tabletitle"},[s("td",{staticClass:"item"},[s("h2",{staticClass:"hresete"},[t._v("Item")])]),s("td",{staticClass:"Hours"},[s("h2",{staticClass:"hresete"},[t._v("Price")])]),s("td",{staticClass:"Hours"},[s("h2",{staticClass:"hresete"},[t._v("Qty")])]),s("td",{staticClass:"Rate"},[s("h2",{staticClass:"hresete"},[t._v("Sub Total")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{staticClass:"Rate"},[s("h2",{staticClass:"hresete"},[t._v("subtotal")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{staticClass:"Rate"},[s("h2",{staticClass:"hresete"},[t._v("discount")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{staticClass:"Rate"},[s("h2",{staticClass:"hresete"},[t._v("Total")])])}],r=(s("99af"),s("4de4"),s("4160"),s("caad"),s("c975"),s("a434"),s("b0c0"),s("e25e"),s("2532"),s("159b"),s("284c")),o=s("85f2"),n=s("65ca"),c=s("4d5c"),l=s.n(c),d=s("c1df"),u=s.n(d),p=s("bc3a"),v=s.n(p),m=s("95b1"),h=s.n(m),_=s("f2b3"),f=h.a.Validator,y={components:{Breadcrumbs:o["a"],Resete:n["a"]},data:function(){var t=u()().format();return{now:t,points:"",path:[{title:"orders",route:"orders.index"}],order:{},note:"",printing:!1,payment:"cash",payments:["cash","card"],discount:"",total:0,remainHere:!0,discountType:"",qtyIncreased:!1,isValue:"",isPercent:"",isbn:"",customer:"",product:"",productsIds:[],discountValue:0,qtys:[],productAlreadyAdded:!1,productAdded:!1,products:[],allCustomers:[],id:null,allBranches:[],allProducts:[],title:"create_order",validationError:"",fregment:""}},store:{branch:"branch_id",userId:"userId",isPos:"isPos"},validators:{note:function(t){return f.value(t).maxLength(250)},discount:function(t){return f.value(t).digit().maxLength(4)},total:function(t){return f.value(t).required().digit().maxLength(5)},products:function(t){return f.value(t).required()}},apollo:{order:function(){return{query:_["X"],variables:function(){return{id:parseInt(this.$route.params.id)}},result:function(t){var e=this,s=t.data.order;this.note=s.note,this.discount=s.discount,this.total=s.total,this.payment=s.payment,this.customer=s.customer?s.customer:"",this.branch=s.branch?s.branch.id:"",s.products.forEach((function(t){e.products.push(t),e.productsIds.push(t.id)})),s.productsPivot.forEach((function(t){e.qtys.push(t.qty)})),this.title="edit"}}},allBranches:function(){return{query:_["a"]}},me:{query:_["W"],result:function(t){var e=t.data.me;e.employee.branch.id&&(this.branch=e.employee.branch.id)}},allProducts:function(){return{query:_["c"],result:function(t){var e=this,s=t.data.allProducts,a=document.querySelectorAll(".autocomplete"),i=this.toObject(s),r={data:i,onAutocomplete:function(t){e.product=t}};l.a.Autocomplete.init(a,r)}}},allCustomers:function(){return{query:_["b"]}}},watch:{"validation.errors":function(){var t=this,e=document.querySelector(".input-field button");this.validation.errors.length>0?e.setAttribute("disabled","disabled"):this.order?e.removeAttribute("disabled"):setTimeout((function(){t.validation.touchedRecords.length>1&&e.removeAttribute("disabled")}),2e3)},qtys:function(){for(var t=0,e=0;e<this.qtys.length;++e)this.products[e].qty=this.qtys[e],t+=this.products[e].price*this.products[e].qty;this.total=t},discountType:function(){"value"==this.discountType?(this.isValue=!0,this.isPercent=!1):"percent"==this.discount&&(this.isPercent=!0,this.isValue=!1)},products:function(){var t=0;this.products.forEach((function(e){t+=e.price*e.qty})),this.total=t},customer:function(){this.getPoints(this.customer.id)},discount:function(){"value"==this.discountType?this.discountValue=this.discount:"percent"==this.discountType&&(this.discountValue=this.total*this.discount/100)},product:function(){var t=this,e=this.allProducts.filter((function(e){if(null!==t.product)return e.isbn==t.product||e.name==t.product?e:""})),s=document.querySelector(".input-field button");if(s.setAttribute("disabled","disabled"),e[0]){var a=document.querySelector(".autocomplete-content");if(a&&(a.style.opacity=0),this.productsIds.includes(e[0].id)){var i=this.productsIds.indexOf(e[0].id);this.productAlreadyAdded=!1,this.qtyIncreased=!0,this.productAdded=!1,this.qtys[i]=this.qtys[i]+1;var r=this.products[i].price;this.total=this.total+r,setTimeout((function(){t.qtyIncreased=!1,t.product=""}),1e3)}else this.qtys.push(1),this.productAdded=!0,e[0].qty=this.qtys[this.qtys.length-1],this.products.push(e[0]),this.productsIds.push(e[0].id),setTimeout((function(){t.productAdded=!1}),3e3),this.product="";setTimeout((function(){t.validation.touchedRecords.length>1&&s.removeAttribute("disabled")}),4e3)}}},methods:{getPoints:function(t){var e=this;v.a.get("http://localhost:8000/points/".concat(t),{},{}).then((function(t){e.points=t.data,e.points>e.total?2==e.payments.length&&e.payments.push("points"):3==e.payments.length&&(e.payment="points"==e.payment?"cash":e.payment,e.payments.pop()),e.loadSelects()}))},printData:function(){var t=this;this.printing=!0,setTimeout((function(){for(var e=document.getElementById("invoice-POS").innerHTML,s="",a=0,i=Object(r["a"])(document.querySelectorAll('link[rel="stylesheet"], style'));a<i.length;a++){var o=i[a];s+=o.outerHTML}var n=window.open("","","left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");n.document.write("<!DOCTYPE html>\n              <html>\n                <head>\n                  ".concat(s,"\n                  <style>\n                    #invoice-POS{\n                      display:block !important;\n                    }\n                  </style>\n                </head>\n                <body>\n                  ").concat(e,"\n                </body>\n              </html>")),n.document.close(),n.focus(),n.print(),n.close(),t.discount="",t.total=0,t.discountType="",t.isValue="",t.isPercent="",t.isbn="",t.note="",t.customer="",t.product="",t.productsIds=[],t.discountValue=0,t.qtys=[],t.productAlreadyAdded=!1,t.productAdded=!1,t.products=[]}),1e3)},removeProduct:function(t){var e=this;this.products=this.products.filter((function(s){return s!==e.products[t]?s:""})),this.qtys.splice(t,1),this.productsIds=this.productsIds.filter((function(s){return s!==e.productsIds[t]?s:""}))},resetForm:function(){this.loadSelects()},increaseQty:function(t){this.qtys[t]=this.qtys[t]+1,this.qtys=this.qtys},decreaseQty:function(t){this.qtys[t]=this.qtys[t]-1},toObject:function(t){console.log("arr"),console.log(t);for(var e={},s=0;s<t.length;++s)void 0!==t[s]&&(e[t[s].name]=null),void 0!==t[s]&&(e[t[s].isbn]=null);return console.log("rv"),console.log(e),e},loadSelects:function(){var t=document.querySelectorAll("select"),e=l.a.FormSelect.getInstance(t);e&&e.destroy(),setTimeout((function(){l.a.FormSelect.init(t,{})}),2e3)},submitted:function(){this.order?this.updateOrder():this.createOrder()},updateOrder:function(){var t=this;this.$apollo.mutate({mutation:_["nb"],variables:{order:parseInt(this.$route.params.id),qtys:this.qtys,payment:this.payment,created_by:this.userId,products:this.productsIds,note:this.note,discount:parseInt(this.discountValue),total:parseInt(this.total)-parseInt(this.discountValue),customer:this.customer.id,branch:this.branch}}).then((function(){t.printData(),l.a.toast({html:"".concat(t.$t("updated_successfully",{name:t.$t("order")})),classes:"success toast",displayLength:2e3}),t.$router.push({name:"orders.index"})}))},createOrder:function(){var t=this;this.$apollo.mutate({mutation:_["l"],variables:{created_by:parseInt(this.userId),note:this.note,payment:this.payment,discount:parseInt(this.discountValue),total:parseInt(this.total)-parseInt(this.discountValue),customer:this.customer.id,qtys:this.qtys,branch:this.branch,products:this.productsIds}}).then((function(){t.printData(),l.a.toast({html:"".concat(t.$t("created_successfully",{name:t.$t("order")})),classes:"success toast",displayLength:3e3}),!t.remainHere&&t.$router.push({name:"orders.index"})}))}},mounted:function(){this.loadSelects()}},b={name:"edit-add-roles",mixins:[y]},C=b,g=(s("7eef"),s("2877")),x=Object(g["a"])(C,a,i,!1,null,null,null);e["default"]=x.exports},"7eef":function(t,e,s){"use strict";var a=s("5950"),i=s.n(a);i.a},c975:function(t,e,s){"use strict";var a=s("23e7"),i=s("4d64").indexOf,r=s("b301"),o=[].indexOf,n=!!o&&1/[1].indexOf(1,-0)<0,c=r("indexOf");a({target:"Array",proto:!0,forced:n||c},{indexOf:function(t){return n?o.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-57390f02.4d8c14e3.js.map