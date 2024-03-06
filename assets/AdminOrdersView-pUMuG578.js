import{a as M,m as L,M as q,_ as U,o,c as d,b as e,e as i,f as T,t as r,d as _,F as k,r as x,n as S,w as j,H as F,g as b,h as g,l as B}from"./index-b5Mq9qPg.js";import{t as R}from"./timeStore-ZePc6pQ3.js";import{t as N}from"./toastsStore-4YbyuFGs.js";import{P as H}from"./PageBtn-bW9t-vCy.js";import{s as J}from"./stringStore-LrVTlJvJ.js";import{T as z}from"./TwoTabs-ftDsZ2o7.js";import{D as G,S as K}from"./StatusMessage-Cqwc79SE.js";var Q={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:W,VITE_API_PATH:X}=Q,Y={data(){return{inEditOrderMode:!1,updatedShowData:{},showCreateAt:"",showPaidDate:"",showProductsArray:[],showOrderMessage:[],originalShowData:{},tabs:[{label:"訂單資訊"},{label:"訂購資訊"}]}},props:["showData"],emits:["order-updated"],components:{TwoTabs:z},methods:{putOrder(){const n=JSON.parse(JSON.stringify(this.updatedShowData)),a=Object.keys(n.products);let u=0;a.forEach(t=>{const l=n.products[t],p=l.product.price*l.qty,h={id:l.id,product_id:l.product_id,total:l.product.price*l.qty,final_total:p,qty:l.qty,product:l.product};l.coupon&&(h.final_total=Number.parseInt(p*l.coupon.percent/100,10),h.coupon=l.coupon),u+=h.final_total,n.products[t]=h}),n.total=u,n.paid_date===void 0&&n.is_paid===!0&&(n.paid_date=this.dayToTimestamp10Code(this.currentDate));const v=`${W}/v2/api/${X}/admin/order/${n.id}`;this.$http.put(v,{data:n}).then(t=>{this.hideModal(),this.$emit("order-updated"),this.inEditOrderMode=!1,this.handleServerResponse(!0,t.data.message)}).catch(t=>{this.handleServerResponse(!1,t.response.data.message)})},editOrder(){this.originalShowData=JSON.parse(JSON.stringify(this.updatedShowData)),this.inEditOrderMode=!0},cancelChangeOrder(){this.updatedShowData=this.originalShowData,this.inEditOrderMode=!1},isPhone(n){return/^(09)[0-9]{8}$/.test(n)?!0:"請輸入正確的行動電話號碼"},openModal(){this.modal.show()},hideModal(){this.modal.hide()},handleServerResponse(n,a){const u=n?"bg-deep-gray":"bg-main-spec";this.pushToast({title:a,style:u})},...M(R,["dayToTimestamp10Code","timestamp10CodeToDay"]),...M(J,["splitStringByNewline"]),...M(N,["pushToast"])},watch:{showData(){this.updatedShowData=JSON.parse(JSON.stringify(this.showData)),this.showCreateAt=this.timestamp10CodeToDay(this.updatedShowData.create_at),this.showPaidDate=this.updatedShowData.is_paid?this.timestamp10CodeToDay(this.updatedShowData.paid_date):"",this.showOrderMessage=this.updatedShowData.message?this.splitStringByNewline(this.updatedShowData.message):[],this.showProductsArray=this.updatedShowData.products?Object.values(this.updatedShowData.products):[],this.inEditOrderMode=!1}},computed:{...L(R,["currentDate"])},mounted(){this.modal=new q(this.$refs.modal)}},Z={ref:"modal",class:"modal fade",id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},$={class:"modal-dialog modal-xl"},ee={class:"modal-content"},te={class:"modal-header"},se={class:"modal-title fs-5",id:"staticBackdropLabel"},ae={class:""},oe={key:1,disabled:"",type:"button",class:"btn"},de={key:0,class:"modal-body"},le={class:"row mt-3"},ne={key:0,class:"col-8"},re=e("h6",null,[e("strong",null,"收件人名稱")],-1),ie=e("h6",null,[e("strong",null,"電子信箱")],-1),ce=e("h6",null,[e("strong",null,"行動電話號碼")],-1),ue=e("h6",null,[e("strong",null,"收件地址")],-1),he=e("h6",null,[e("strong",null,"訂單備註")],-1),pe={key:0},me={key:1},_e={key:1,class:"col-8"},ge={class:"mb-3"},be=e("label",{for:"user_name",class:"form-label"},[b("收件人名稱 "),e("span",{class:"text-main-spec fw-bold"},"*")],-1),fe={class:"mb-3"},De=e("label",{for:"user_email",class:"form-label"},[b("電子信箱 "),e("span",{class:"text-main-spec fw-bold"},"*")],-1),we={class:"mb-3"},ye=e("label",{for:"user_tel",class:"form-label"},[b("行動電話號碼 "),e("span",{class:"text-main-spec fw-bold"},"*")],-1),Oe={class:"mb-3"},ve=e("label",{for:"user_address",class:"form-label"},[b("收件地址 "),e("span",{class:"text-main-spec fw-bold"},"*")],-1),Se={class:"mb-3"},Me=e("label",{for:"message",class:"form-label"},"訂單備註",-1),ke={class:"col-4"},Ae={key:0},Te={key:0,class:"text-main-spec fw-bold"},xe={key:1,class:"text-deep-gray"},Pe={key:1},Ce={class:"form-check"},Ee={for:"is_paid",class:"form-check-label"},Ve={key:0,class:"text-main-spec fw-bold"},Re={key:1,class:"text-deep-gray"},Be={class:"table"},Ue=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"圖片"),e("th",{scope:"col"},"類別"),e("th",{scope:"col"},"名稱"),e("th",{scope:"col"},"數量"),e("th",{scope:"col"},"價格"),e("th",{scope:"col"},"小計"),e("th",{scope:"col"},"總額"),e("th",{scope:"col"},"備註")])],-1),Ne=["src"],Ie={key:0},Le={key:1},qe=["src"],je=e("td",null,"...",-1),Fe=e("td",null,"...",-1),He=e("td",null,"...",-1),Je={colspan:"8"},ze={class:"float-end"},Ge={key:0,class:"fs-3"},Ke={key:1,class:"fs-2"},Qe={class:"modal-footer"},We={key:1,type:"submit",class:"btn btn-solid-spec"};function Xe(n,a,u,v,t,l){const p=g("vee-field"),h=g("vee-error-message"),P=g("TwoTabs"),C=g("vee-form");return o(),d("div",Z,[e("div",$,[e("div",ee,[i(C,{onSubmit:l.putOrder},{default:T(({errors:f})=>[e("div",te,[e("h1",se,r(t.updatedShowData.num)+"｜訂單編號："+r(t.updatedShowData.id),1),e("div",ae,[t.inEditOrderMode?_("",!0):(o(),d("button",{key:0,type:"button",class:"btn",onClick:a[0]||(a[0]=(...s)=>l.editOrder&&l.editOrder(...s))}," 編輯訂單 ")),t.inEditOrderMode?(o(),d("button",oe,"編輯訂單中")):_("",!0),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:a[1]||(a[1]=(...s)=>l.cancelChangeOrder&&l.cancelChangeOrder(...s))})])]),t.updatedShowData.user?(o(),d("div",de,[i(P,{tabs:t.tabs},{0:T(()=>[e("div",le,[t.inEditOrderMode?(o(),d("div",_e,[e("div",ge,[be,i(p,{type:"text",name:"收件人",class:S(["form-control",{"is-invalid":f.收件人}]),rules:"required|max:15",id:"user_name",placeholder:"請輸入收件人名稱",modelValue:t.updatedShowData.user.name,"onUpdate:modelValue":a[2]||(a[2]=s=>t.updatedShowData.user.name=s)},null,8,["class","modelValue"]),i(h,{class:"invalid-feedback",name:"收件人"})]),e("div",fe,[De,i(p,{type:"email",class:S(["form-control",{"is-invalid":f.電子信箱}]),id:"user_email",rules:"email|required",name:"電子信箱",placeholder:"請輸入電子信箱",modelValue:t.updatedShowData.user.email,"onUpdate:modelValue":a[3]||(a[3]=s=>t.updatedShowData.user.email=s)},null,8,["class","modelValue"]),i(h,{class:"invalid-feedback",name:"電子信箱"})]),e("div",we,[ye,i(p,{type:"tel",name:"行動電話",rules:l.isPhone,class:S(["form-control",{"is-invalid":f.行動電話}]),id:"user_tel",placeholder:"請輸入行動電話號碼",modelValue:t.updatedShowData.user.tel,"onUpdate:modelValue":a[4]||(a[4]=s=>t.updatedShowData.user.tel=s)},null,8,["rules","class","modelValue"]),i(h,{class:"invalid-feedback",name:"行動電話"})]),e("div",Oe,[ve,i(p,{type:"text",name:"收件地址",class:S(["form-control",{"is-invalid":f.收件地址}]),rules:"required|max:100",id:"user_address",placeholder:"請輸入收件地址",modelValue:t.updatedShowData.user.address,"onUpdate:modelValue":a[5]||(a[5]=s=>t.updatedShowData.user.address=s)},null,8,["class","modelValue"]),i(h,{class:"invalid-feedback",name:"收件地址"})]),e("div",Se,[Me,i(p,{as:"textarea",name:"訂單備註",type:"text",class:S(["form-control",{"is-invalid":f.訂單備註}]),id:"message",placeholder:"請輸入訂單備註",rules:"max:800",modelValue:t.updatedShowData.message,"onUpdate:modelValue":a[6]||(a[6]=s=>t.updatedShowData.message=s)},null,8,["class","modelValue"]),i(h,{class:"invalid-feedback",name:"訂單備註"})])])):(o(),d("div",ne,[e("div",null,[re,e("p",null,r(t.updatedShowData.user.name),1)]),e("div",null,[ie,e("p",null,r(t.updatedShowData.user.email),1)]),e("div",null,[ce,e("p",null,r(t.updatedShowData.user.tel),1)]),e("div",null,[ue,e("p",null,r(t.updatedShowData.user.address),1)]),e("div",null,[he,this.updatedShowData.message?(o(),d("div",pe,[(o(!0),d(k,null,x(t.showOrderMessage,(s,m)=>(o(),d("p",{key:m},r(s),1))),128))])):(o(),d("p",me,"無訂單備註"))])])),e("div",ke,[t.inEditOrderMode?(o(),d("ul",Pe,[e("li",null,[e("p",null,r(t.showCreateAt)+" 創立",1)]),e("li",null,[e("div",Ce,[j(e("input",{type:"checkbox",class:"form-check-input",id:"is_paid","onUpdate:modelValue":a[7]||(a[7]=s=>t.updatedShowData.is_paid=s)},null,512),[[F,t.updatedShowData.is_paid]]),e("label",Ee,[t.updatedShowData.is_paid?(o(),d("span",Ve,r(t.showPaidDate)+" 已付款",1)):(o(),d("span",Re,"未付款"))])])])])):(o(),d("ul",Ae,[e("li",null,[e("p",null,r(t.showCreateAt)+" 創立",1)]),e("li",null,[t.updatedShowData.is_paid?(o(),d("span",Te,r(t.showPaidDate)+" 已付款",1)):(o(),d("span",xe,"未付款"))])]))])])]),1:T(()=>[e("table",Be,[Ue,e("tbody",null,[!t.inEditOrderMode&&t.updatedShowData.products?(o(!0),d(k,{key:0},x(t.showProductsArray,s=>{var m,D,w,y,O;return o(),d("tr",{key:s.id},[e("td",null,[e("img",{src:(m=s.product)==null?void 0:m.imageUrl,alt:"",width:"50"},null,8,Ne)]),e("td",null,r((D=s.product)==null?void 0:D.category),1),e("td",null,r((w=s.product)==null?void 0:w.title),1),e("td",null,[e("strong",null,r(s==null?void 0:s.qty),1)]),e("td",null,r((y=s.product)==null?void 0:y.price),1),e("td",null,r(s.total),1),e("td",null,[e("strong",null,r(s==null?void 0:s.final_total),1)]),e("td",null,[s.coupon?(o(),d("div",Ie,[e("p",null,[b(" 使用 "),e("strong",null,r((O=s.coupon)==null?void 0:O.title),1),b(" 優惠券 ")]),e("p",null,[b(" 折扣"),e("strong",null,"-"+r(s.total-s.final_total),1),b("元 ")])])):(o(),d("span",Le,"無"))])])}),128)):(o(!0),d(k,{key:1},x(t.showProductsArray,s=>{var m,D,w,y,O,c,A;return o(),d("tr",{key:s.id},[e("td",null,[e("img",{src:(m=s.product)==null?void 0:m.imageUrl,alt:"",width:"50"},null,8,qe)]),e("td",null,r((D=s.product)==null?void 0:D.category),1),e("td",null,r((w=s.product)==null?void 0:w.title),1),e("td",null,[i(p,{name:((y=s.product)==null?void 0:y.title)+"產品數量",class:S(["form-control",{"is-invalid":f[((O=s.product)==null?void 0:O.title)+"產品數量"]}]),rules:"required|numeric|integer|min_value:1",type:"text",modelValue:s.qty,"onUpdate:modelValue":I=>s.qty=I,modelModifiers:{number:!0}},null,8,["name","class","modelValue","onUpdate:modelValue"]),i(h,{class:"invalid-feedback",name:((c=s.product)==null?void 0:c.title)+"產品數量"},null,8,["name"])]),e("td",null,r((A=s.product)==null?void 0:A.price),1),je,Fe,He])}),128))]),e("tfoot",null,[e("tr",null,[e("td",Je,[e("p",ze,[b(" 訂單總金額：NT$ "),t.inEditOrderMode?(o(),d("strong",Ke," ... ")):(o(),d("strong",Ge,r(t.updatedShowData.total),1))])])])])])]),_:2},1032,["tabs"])])):_("",!0),e("div",Qe,[t.inEditOrderMode?(o(),d("button",{key:0,type:"button",class:"btn btn-normal-dpgray",onClick:a[8]||(a[8]=(...s)=>l.cancelChangeOrder&&l.cancelChangeOrder(...s))}," 取消 ")):_("",!0),t.inEditOrderMode?(o(),d("button",We,"更新")):_("",!0),t.inEditOrderMode?_("",!0):(o(),d("button",{key:2,type:"button",class:"btn btn-solid-spec",onClick:a[9]||(a[9]=(...s)=>l.hideModal&&l.hideModal(...s))}," 關閉 "))])]),_:1},8,["onSubmit"])])])],512)}const Ye=U(Y,[["render",Xe]]);var Ze={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:E,VITE_API_PATH:V}=Ze,$e={data(){return{isLoading:!1,adminOrdersData:[],serverMessage:{message:"",success:!0},showData:{}}},components:{PageBtn:H,OrderModal:Ye,DeleteModal:G,StatusMessage:K},computed:{},methods:{getOrderData(n){const a=this.adminOrdersData.orders.find(u=>u.id===n);this.showData=a,this.showData.title=`${this.showData.user.name}的訂單`},getAdminOrderModal(n){this.getOrderData(n),this.$refs.orderModal.openModal()},goToChangePage(n){this.getAdminOrders(n)},getAdminDelOrdersModal(){this.showData={title:"所有訂單"},this.$refs.deleteOrdersModal.openModal()},deleteAdminOrders(){const n=`${E}/v2/api/${V}/admin/orders/all`;this.$http.delete(n).then(a=>{this.getAdminOrders(),this.$refs.deleteOrdersModal.hideModal(),this.pushToast({title:a.data.message,style:"bg-deep-gray"})}).catch(a=>{this.handleServerResponse(!1,a.response.data.message)})},getAdminDelOrderModal(n){this.getOrderData(n),this.$refs.deleteOrderModal.openModal()},deleteAdminOrder(){const{id:n}=this.showData,a=`${E}/v2/api/${V}/admin/order/${n}`;this.$http.delete(a).then(u=>{this.getAdminOrders(),this.$refs.deleteOrderModal.hideModal(),this.pushToast({title:u.data.message,style:"bg-deep-gray"})}).catch(u=>{this.handleServerResponse(!1,u.response.data.message)})},getAdminOrders(n=1){const a=n.toString(),u=`${E}/v2/api/${V}/admin/orders`;this.$http.get(u,{params:{page:a}}).then(v=>{this.adminOrdersData=v.data,this.isLoading=!1}).catch(v=>{this.handleServerResponse(!1,v.response.data.message)})},handleServerResponse(n,a){this.serverMessage.success=n,this.serverMessage.message=a,this.$refs.resultModal.openModal()},...M(R,["dayToTimestamp10Code","timestamp10CodeToDay"]),...M(N,["pushToast"])},mounted(){this.isLoading=!0,this.getAdminOrders()}},et={key:1,class:"container"},tt={key:1,class:"row mt-4"},st={class:"col d-flex justify-content-end"},at={key:2,class:"table mt-4"},ot=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"創立日期"),e("th",{scope:"col"},"付款狀態"),e("th",{scope:"col"},"收件人名稱"),e("th",{scope:"col"},"電子信箱"),e("th",{scope:"col"},"行動電話號碼"),e("th",{scope:"col"},"收件地址"),e("th",{scope:"col"},"操作")])],-1),dt={scope:"row"},lt={key:0,class:"text-main-spec fw-bold"},nt={key:1,class:"text-deep-gray"},rt={class:"d-flex justify-content-start align-items-center"},it=["onClick"],ct=["onClick"],ut={key:3,class:"d-flex justify-content-center mt-4"},ht={"aria-label":"Page navigation example"},pt={class:"pagination",id:"pageid"};function mt(n,a,u,v,t,l){var m,D,w,y,O;const p=g("PageLoading"),h=g("StatusMessage"),P=g("PageBtn"),C=g("OrderModal"),f=g("DeleteModal"),s=g("ResultModal");return o(),d(k,null,[t.isLoading?(o(),B(p,{key:0})):(o(),d("div",et,[((m=t.adminOrdersData.orders)==null?void 0:m.length)===0?(o(),B(h,{key:0,class:"mt-4"},{default:T(()=>[b(r("需等待訂單進入。"))]),_:1})):_("",!0),((D=t.adminOrdersData.orders)==null?void 0:D.length)*((w=t.adminOrdersData.pagination)==null?void 0:w.total_pages)>1?(o(),d("div",tt,[e("div",st,[e("button",{type:"button",class:"btn btn-solid-spec",onClick:a[0]||(a[0]=(...c)=>l.getAdminDelOrdersModal&&l.getAdminDelOrdersModal(...c))}," 刪除所有訂單 ")])])):_("",!0),((y=t.adminOrdersData.orders)==null?void 0:y.length)!==0?(o(),d("table",at,[ot,e("tbody",null,[(o(!0),d(k,null,x(t.adminOrdersData.orders,c=>(o(),d("tr",{key:c.id},[e("th",dt,r(c.num),1),e("td",null,r(n.timestamp10CodeToDay(c.create_at)),1),e("td",null,[c.is_paid?(o(),d("span",lt,"已付款")):(o(),d("span",nt,"未付款"))]),e("td",null,r(c.user.name),1),e("td",null,r(c.user.email),1),e("td",null,r(c.user.tel),1),e("td",null,r(c.user.address),1),e("td",null,[e("div",rt,[e("button",{class:"btn btn-sm btn-normal-medium block w-50",type:"button",onClick:A=>l.getAdminDelOrderModal(c.id)}," 刪除 ",8,it),e("button",{class:"btn btn-sm btn-normal-medium block w-50",type:"button",onClick:A=>l.getAdminOrderModal(c.id)}," 查看 ",8,ct)])])]))),128))])])):_("",!0),t.adminOrdersData&&t.adminOrdersData.pagination&&((O=t.adminOrdersData.orders)==null?void 0:O.length)!==0?(o(),d("div",ut,[e("nav",ht,[e("ul",pt,[i(P,{"prev-is-enabled":t.adminOrdersData.pagination.has_pre,"next-is-enabled":t.adminOrdersData.pagination.has_next,totalPage:t.adminOrdersData.pagination.total_pages,"current-page":t.adminOrdersData.pagination.current_page,onChangePrevPage:a[1]||(a[1]=c=>l.getAdminOrders(t.adminOrdersData.pagination.current_page-1)),onChangeNextPage:a[2]||(a[2]=c=>l.getAdminOrders(t.adminOrdersData.pagination.current_page+1)),onChangePage:l.goToChangePage},null,8,["prev-is-enabled","next-is-enabled","totalPage","current-page","onChangePage"])])])])):_("",!0)])),i(C,{ref:"orderModal","show-data":t.showData,onOrderUpdated:l.getAdminOrders},null,8,["show-data","onOrderUpdated"]),i(f,{ref:"deleteOrderModal","show-data":t.showData,onDeleteFunction:l.deleteAdminOrder},null,8,["show-data","onDeleteFunction"]),i(f,{ref:"deleteOrdersModal","show-data":t.showData,onDeleteFunction:l.deleteAdminOrders},null,8,["show-data","onDeleteFunction"]),i(s,{ref:"resultModal","server-message":t.serverMessage},null,8,["server-message"])],64)}const Ot=U($e,[["render",mt]]);export{Ot as default};
