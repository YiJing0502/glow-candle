import{a as f,_ as T,i as I,o as r,c as i,b as t,w as k,v as x,t as u,m as A,q as N,f as l,g,d as h,I as B,h as p,e as c,F as L,r as U,n as v,L as O}from"./index-vSMGsHVG.js";import{o as j}from"./ordersStore-O30sE3QA.js";import{c as D}from"./cartsStore-NtTr1LIM.js";import{p as G}from"./pageStore-jPQB3cvG.js";import{C as Q}from"./ContactUsDetails-sO20KPN-.js";import{B as E}from"./BasicCollapse-SNN3S7y7.js";import"./stringStore-mamKbLwN.js";import"./timeStore-5fwm0uwE.js";const F={data(){return{currentNum:1,currentQty:1}},props:["inventory","id","qty","productCartId"],emits:["putNum"],methods:{plusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>=1&&this.currentNum<this.inventory){this.currentNum+=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum);return}this.currentNum>=this.inventory&&this.showAlertMessage(!1,"很抱歉，不能超出此庫存量")},minusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>1){this.currentNum-=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum);return}this.currentNum<=1&&this.showAlertMessage(!1,"很抱歉，最低數量為1")},blurNum(e){if(this.currentNum=parseInt(e.target.value,10),this.currentNum>this.inventory){this.currentNum=this.inventory,this.$emit("putNum",this.productCartId,this.id,this.currentNum),this.showAlertMessage(!1,"很抱歉，不能超出此庫存量");return}if(this.currentNum<=0){this.currentNum=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum),this.showAlertMessage(!1,"很抱歉，最低數量為1");return}if(this.currentNum!==this.currentQty){if(Number.isNaN(this.currentNum)){this.showAlertMessage(!1,"請輸入有效的數字"),this.currentNum=this.currentQty;return}this.$emit("putNum",this.productCartId,this.id,this.currentNum)}},...f(I,["showAlertMessage"])},watch:{qty(e){this.currentNum=e,this.currentQty=e}},mounted(){this.qty>this.inventory&&this.$emit("putNum",this.productCartId,this.id,this.inventory),this.currentNum=this.qty,this.currentQty=this.qty}},R={class:""},J={class:"bg-white d-flex mb-3 border btns-max-width"},z=["disabled"],H=["disabled"],K={class:"d-flex align-items-end"};function W(e,s,b,_,a,n){return r(),i("div",R,[t("div",J,[t("button",{disabled:a.currentNum===1,type:"button",class:"btn",onClick:s[0]||(s[0]=(...m)=>n.minusNum&&n.minusNum(...m))},"-",8,z),k(t("input",{type:"number",class:"form-control border-white shadow-none text-center fw-bold","onUpdate:modelValue":s[1]||(s[1]=m=>a.currentNum=m),onBlur:s[2]||(s[2]=(...m)=>n.blurNum&&n.blurNum(...m))},null,544),[[x,a.currentNum,void 0,{number:!0}]]),t("button",{disabled:a.currentNum===b.inventory,type:"button",class:"btn",onClick:s[3]||(s[3]=(...m)=>n.plusNum&&n.plusNum(...m))}," + ",8,H)]),t("p",K,"目前庫存："+u(b.inventory),1)])}const X=T(F,[["render",W],["__scopeId","data-v-ece9a255"]]),Y={data(){return{useCoupon:!1,couponCode:"",checkOrderInfo:!1,orderData:{data:{user:{name:null,email:null,tel:null,address:null},message:null}},doesPostCart:!1}},components:{QuantityControlButtons:X,ContactUsDetails:Q,BasicCollapse:E},methods:{isPhone(e){return/^(09)[0-9]{8}$/.test(e)?!0:"請輸入正確的行動電話號碼"},changeToProductPage(e,s){this.changeNowPage(s),this.$router.push({name:"product",params:{id:e}})},async goToGetCart(e=!0){try{await this.getCart(e)}catch(s){this.showAlertMessage(!1,s.response.data.message)}},async goToPutCart(e,s,b){try{const _=await this.putCart(e,s,b);await this.goToGetCart(!1),this.pushToast({title:_.data.message,style:"bg-deep-gray"})}catch(_){this.showAlertMessage(!1,_.response.data.message)}},async goToDeleteCart(e){try{const s=await this.deleteCart(e);await this.goToGetCart(!1),this.pushToast({title:s.data.message,style:"bg-deep-gray"})}catch(s){this.showAlertMessage(!1,s.response.data.message)}},async goToDeleteCarts(){try{const e=await this.deleteCarts();await this.goToGetCart(),this.pushToast({title:e.data.message,style:"bg-deep-gray"})}catch(e){this.showAlertMessage(!1,e.response.data.message)}},async goToPostCoupon(){try{const e=await this.postCoupon(this.couponCode);await this.goToGetCart(!1),this.pushToast({title:e.data.message,style:"bg-deep-gray"})}catch(e){this.showAlertMessage(!1,e.response.data.message)}},async goToPostOrder(){this.doesPostCart=!0;try{const e=await this.postOrder(this.orderData);this.$router.push({name:"payment",params:{id:e.data.orderId}}),this.$nextTick(()=>{this.goToGetCart(!1),this.$refs.form.resetForm()})}catch(e){this.showAlertMessage(!1,e.response.data.message)}},...f(D,["getCart","putCart","deleteCart","deleteCarts","postCoupon"]),...f(j,["postOrder"]),...f(B,["pushToast"]),...f(G,["changeNowPage"]),...f(I,["showAlertMessage"])},computed:{...A(D,["isLoading","isSmLoading","cartsData","allCartsData"])},mounted(){if(this.goToGetCart(),window.sessionStorage.getItem("orderData")){const e=window.sessionStorage.getItem("orderData");this.orderData=JSON.parse(e)}},beforeUnmount(){if(this.doesPostCart)window.sessionStorage.removeItem("orderData");else{const e=JSON.stringify(this.orderData);window.sessionStorage.setItem("orderData",e)}}},Z={key:1,class:"container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"},$=t("div",{class:"d-flex align-items-center justify-content-center mb-3"},[t("h2",{class:"text-center border-secondary pb-2 fw-bold"},"結帳")],-1),tt={class:"row row-cols-1 row-cols-lg-2"},et={class:"col"},st={class:"accordion"},ot={key:0,class:""},at=t("p",null,"目前購物車內沒有產品 😄",-1),rt={key:1,class:""},nt={class:"col col-sm-2 col-lg-3 d-flex align-items-center justify-content-center"},lt=["onClick","src","alt"],it={class:"col col-sm-10 col-lg-9"},dt={class:"d-flex justify-content-between"},ut=["onClick"],ct=["onClick"],mt={key:0},ht={key:0,class:"d-flex mb-3"},pt={class:"d-flex justify-content-between"},gt=t("p",null,"產品總金額",-1),ft=t("div",{class:"d-flex justify-content-between"},[t("p",null,"運費"),t("p",null,"免運費")],-1),bt={key:0},_t={key:0,class:"d-flex justify-content-between"},yt=t("p",null,"優惠代碼",-1),Ct={key:1,class:"mb-3"},vt=t("p",{class:"w-25"},"優惠代碼",-1),Nt={class:"d-flex justify-content-between align-items-center"},wt={key:1,class:"d-flex justify-content-between"},kt=t("p",null,"使用優惠券",-1),Dt=t("hr",null,null,-1),Tt={key:2,class:"d-flex justify-content-between"},It=t("p",null,"總付款金額",-1),xt={class:"text-end"},Vt={key:3,class:""},Pt={class:"d-flex justify-content-between"},St=t("p",null,"總付款金額",-1),Mt={class:"text-decoration-line-through"},qt={class:"text-end"},At={class:"col"},Bt={class:"accordion"},Lt={class:"mb-3"},Ut=t("label",{for:"user",class:"form-label"},[c("收件人名稱 "),t("span",{class:"text-main-spec fw-bold"},"*")],-1),Ot={class:"mb-3"},jt=t("label",{for:"email",class:"form-label"},[c("電子信箱 "),t("span",{class:"text-main-spec fw-bold"},"*")],-1),Gt={class:"mb-3"},Qt=t("label",{for:"phone",class:"form-label"},[c("行動電話號碼 "),t("span",{class:"text-main-spec fw-bold"},"*")],-1),Et={class:"mb-3"},Ft=t("label",{for:"address",class:"form-label"},[c("收件地址 "),t("span",{class:"text-main-spec fw-bold"},"*")],-1),Rt={class:"mb-3"},Jt=t("label",{for:"orderMessage",class:"form-label"},"訂單備註",-1),zt={class:"form-check mb-3"},Ht=t("label",{for:"is_enabled",class:"form-check-label"},[t("span",{class:"text-main-spec fw-bold"},"我已確認以下內容："),t("span",null,[t("br"),c("提醒您，送出訂單後，將無法修改訂單內容，並前往付款流程，請您確定無誤後再送出😄")])],-1),Kt=t("div",{class:"bg-light-gray text-deep-gray px-3 py-2 mb-3"},[t("h6",null,"免運服務"),t("span",null,"我們的產品付款採用「線上信用卡」付款後出貨，運送採用「宅配到府」免運服務，讓您輕鬆購買、安心收貨。")],-1),Wt={class:"d-flex mb-3"},Xt=["disabled"];function Yt(e,s,b,_,a,n){const m=p("PageLoading"),V=p("RouterLink"),P=p("VueLoading"),S=p("QuantityControlButtons"),w=p("BasicCollapse"),M=p("ContactUsDetails"),y=p("vee-field"),C=p("vee-error-message"),q=p("vee-form");return r(),i("div",null,[e.isLoading?(r(),N(m,{key:0})):(r(),i("div",Z,[$,t("div",tt,[t("div",et,[t("div",st,[l(w,{uniqueId:"ShoppingCartSection",open:!0},{header:g(()=>[c(" 購物車 ")]),body:g(()=>[e.cartsData.length===0?(r(),i("div",ot,[at,l(V,{to:{name:"products",query:{category:"全部產品"}},class:"btn btn-solid-spec w-100 btn-lg"},{default:g(()=>[c(" 繼續購物 ")]),_:1})])):(r(),i("div",rt,[(r(!0),i(L,null,U(e.cartsData,o=>(r(),i("div",{class:"row mb-3 position-relative",key:o.id},[l(P,{active:o.product.id===e.isSmLoading||o.id===e.isSmLoading,"is-full-page":!1,color:"#52504B"},null,8,["active"]),t("div",nt,[t("img",{role:"button",onClick:d=>n.changeToProductPage(o.product.id,o.product.category),src:o.product.imageUrl,alt:o.product.title,class:"img-fluid",width:"150"},null,8,lt)]),t("div",it,[t("div",dt,[t("h6",{class:"text-link-deep-gray",role:"button",onClick:d=>n.changeToProductPage(o.product.id,o.product.category)},u(o.product.title),9,ut),t("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:d=>n.goToDeleteCart(o.id)},null,8,ct)]),t("p",null,[c(" 單價NT$ "+u(parseInt(o.product.price))+" / 小計NT$ "+u(parseInt(o.total))+" ",1),o.final_total!==o.total?(r(),i("span",mt," /優惠價NT$ "+u(parseInt(o.final_total)),1)):h("",!0)]),l(S,{inventory:o.product.inventory,id:o.product_id,qty:o.qty,"product-cart-id":o.id,onPutNum:n.goToPutCart},null,8,["inventory","id","qty","product-cart-id","onPutNum"])])]))),128)),e.cartsData.length>1?(r(),i("div",ht,[t("button",{type:"button",class:"btn btn-outline-mdgray w-100",onClick:s[0]||(s[0]=(...o)=>n.goToDeleteCarts&&n.goToDeleteCarts(...o))}," 清空購物車 ")])):h("",!0)]))]),_:1}),e.cartsData.length!==0?(r(),N(w,{key:0,uniqueId:"OrderConfirmationSection",open:!0},{header:g(()=>[c(" 訂單確認 ")]),body:g(()=>[t("div",pt,[gt,t("p",null,"NT$ "+u(parseInt(e.allCartsData.total)),1)]),ft,e.allCartsData.useCoupon?h("",!0):(r(),i("div",bt,[a.useCoupon?a.useCoupon?(r(),i("div",Ct,[vt,t("div",Nt,[k(t("input",{type:"text",class:"form-control",id:"category",placeholder:"請填入優惠代碼","onUpdate:modelValue":s[2]||(s[2]=o=>a.couponCode=o)},null,512),[[x,a.couponCode]]),t("button",{type:"button",class:"w-25 btn btn-outline-dpgray ms-3",onClick:s[3]||(s[3]=(...o)=>n.goToPostCoupon&&n.goToPostCoupon(...o))}," 使用 "),t("button",{type:"button",class:"w-25 btn btn-outline-dpgray ms-3",onClick:s[4]||(s[4]=o=>a.useCoupon=!1)}," 取消 ")])])):h("",!0):(r(),i("div",_t,[yt,t("button",{type:"button",class:"btn btn-outline-dpgray",onClick:s[1]||(s[1]=o=>a.useCoupon=!0)}," 使用優惠代碼 ")]))])),e.allCartsData.useCoupon?(r(),i("div",wt,[kt,t("p",null," 優惠 NT$ "+u(parseInt(e.allCartsData.total,10)-parseInt(e.allCartsData.final_total,10)),1)])):h("",!0),Dt,e.allCartsData.useCoupon?e.allCartsData.useCoupon?(r(),i("div",Vt,[t("div",Pt,[St,t("h5",Mt," NT$ "+u(parseInt(e.allCartsData.total)),1)]),t("h4",qt,"NT$ "+u(parseInt(e.allCartsData.final_total)),1)])):h("",!0):(r(),i("div",Tt,[It,t("h4",xt,"NT$ "+u(parseInt(e.allCartsData.total)),1)]))]),_:1})):h("",!0)])]),t("div",At,[t("div",Bt,[e.cartsData.length===0?(r(),N(M,{key:0})):h("",!0),e.cartsData.length!==0?(r(),N(w,{key:1,uniqueId:"RecipientInformationSection",open:!0},{header:g(()=>[c(" 收件資料 ")]),body:g(()=>[l(q,{ref:"form",onSubmit:n.goToPostOrder},{default:g(({errors:o})=>[t("div",Lt,[Ut,l(y,{type:"text",name:"收件人",class:v(["form-control",{"is-invalid":o.收件人}]),rules:"required|max:15",id:"user",placeholder:"請填入收件人真實姓名，以確保順利收件",modelValue:a.orderData.data.user.name,"onUpdate:modelValue":s[5]||(s[5]=d=>a.orderData.data.user.name=d)},null,8,["class","modelValue"]),l(C,{class:"invalid-feedback",name:"收件人"})]),t("div",Ot,[jt,l(y,{type:"email",class:v(["form-control",{"is-invalid":o.電子信箱}]),id:"email",rules:"email|required",name:"電子信箱",placeholder:"請填入訂單通知Email (訂單資訊將以此E-mail通知您)",modelValue:a.orderData.data.user.email,"onUpdate:modelValue":s[6]||(s[6]=d=>a.orderData.data.user.email=d)},null,8,["class","modelValue"]),l(C,{class:"invalid-feedback",name:"電子信箱"})]),t("div",Gt,[Qt,l(y,{type:"tel",name:"行動電話",rules:n.isPhone,class:v(["form-control",{"is-invalid":o.行動電話}]),id:"phone",placeholder:"請填入收件人行動電話號碼 (供配送人員聯絡)",modelValue:a.orderData.data.user.tel,"onUpdate:modelValue":s[7]||(s[7]=d=>a.orderData.data.user.tel=d)},null,8,["rules","class","modelValue"]),l(C,{class:"invalid-feedback",name:"行動電話"})]),t("div",Et,[Ft,l(y,{type:"text",name:"收件地址",class:v(["form-control",{"is-invalid":o.收件地址}]),id:"address",rules:"required|max:100",placeholder:"送貨地點目前僅提供：台灣、台灣外島宅配",modelValue:a.orderData.data.user.address,"onUpdate:modelValue":s[8]||(s[8]=d=>a.orderData.data.user.address=d)},null,8,["class","modelValue"]),l(C,{class:"invalid-feedback",name:"收件地址"})]),t("div",Rt,[Jt,l(y,{as:"textarea",name:"訂單備註",class:v(["w-100 form-control",{"is-invalid":o.訂單備註}]),id:"orderMessage",rows:"5",placeholder:"管理室代收/電話聯絡時間...",rules:"max:800",modelValue:a.orderData.data.message,"onUpdate:modelValue":s[9]||(s[9]=d=>a.orderData.data.message=d)},null,8,["class","modelValue"]),l(C,{class:"invalid-feedback",name:"訂單備註"})]),t("div",zt,[k(t("input",{type:"checkbox",class:"form-check-input",id:"is_enabled","onUpdate:modelValue":s[10]||(s[10]=d=>a.checkOrderInfo=d)},null,512),[[O,a.checkOrderInfo]]),Ht]),Kt,t("div",Wt,[t("button",{type:"submit",class:"border btn btn-solid-spec w-100 btn-lg",disabled:!a.checkOrderInfo}," 結帳 ",8,Xt)])]),_:1},8,["onSubmit"])]),_:1})):h("",!0)])])])]))])}const ne=T(Y,[["render",Yt]]);export{ne as default};
