import{_ as M,o as n,c as r,b as e,l as y,v as x,t as c,d as l,F as C,r as p,a as w,m as S,g as E,w as D,j as O,f as m,e as N,n as f,p as U,k as P}from"./index-5K09qu-D.js";import{o as j}from"./ordersStore-vkUIQ3oU.js";import{c as k}from"./cartsStore-dN7IAnwJ.js";import"./stringStore-Je80w83I.js";import"./timeStore-sqbh4huS.js";const q={data(){return{currentNum:1,currentQty:1,serverMessage:{message:"",success:!0}}},props:["inventory","id","qty","productCartId"],emits:["putNum"],methods:{plusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>=1&&this.currentNum<this.inventory){this.currentNum+=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum);return}this.currentNum>=this.inventory&&this.showErrMessage("很抱歉，不能超出此庫存量")},minusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>1){this.currentNum-=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum);return}this.currentNum<=1&&this.showErrMessage("很抱歉，最低數量為1")},blurNum(t){if(this.currentNum=parseInt(t.target.value,10),this.currentNum>this.inventory){this.currentNum=this.inventory,this.$emit("putNum",this.productCartId,this.id,this.currentNum),this.showErrMessage("很抱歉，不能超出此庫存量");return}if(this.currentNum<=0){this.currentNum=1,this.$emit("putNum",this.productCartId,this.id,this.currentNum),this.showErrMessage("很抱歉，最低數量為1");return}if(this.currentNum!==this.currentQty){if(Number.isNaN(this.currentNum)){this.showErrMessage("請輸入有效的數字"),this.currentNum=this.currentQty;return}this.$emit("putNum",this.productCartId,this.id,this.currentNum)}},showErrMessage(t){this.serverMessage.message=t,this.serverMessage.success=!1,this.$refs.resultModal.openModal()}},watch:{qty(t){this.currentNum=t,this.currentQty=t}},mounted(){this.qty>this.inventory&&this.$emit("putNum",this.productCartId,this.id,this.inventory),this.currentNum=this.qty,this.currentQty=this.qty}},B={class:"d-flex"},L={class:"bg-white d-flex w-50 mb-3 gap-3 border"},R=["disabled"],G=["disabled"],Q={class:"d-flex align-items-end ms-3"};function A(t,s,h,v,a,i){const g=p("ResultModal");return n(),r(C,null,[e("div",B,[e("div",L,[e("button",{disabled:a.currentNum===1,type:"button",class:"btn btn-lg",onClick:s[0]||(s[0]=(...u)=>i.minusNum&&i.minusNum(...u))}," - ",8,R),y(e("input",{type:"number",class:"form-control border-white shadow-none text-center","onUpdate:modelValue":s[1]||(s[1]=u=>a.currentNum=u),onBlur:s[2]||(s[2]=(...u)=>i.blurNum&&i.blurNum(...u))},null,544),[[x,a.currentNum,void 0,{number:!0}]]),e("button",{disabled:a.currentNum===h.inventory,type:"button",class:"btn btn-lg",onClick:s[3]||(s[3]=(...u)=>i.plusNum&&i.plusNum(...u))}," + ",8,G)]),e("p",Q,"目前庫存："+c(h.inventory),1)]),l(g,{ref:"resultModal","server-message":a.serverMessage},null,8,["server-message"])],64)}const F=M(q,[["render",A]]),z={data(){return{useCoupon:!1,couponCode:"",checkOrderInfo:!1,orderData:{data:{user:{name:null,email:null,tel:null,address:null},message:null}},serverMessage:{message:"",success:!0}}},components:{QuantityControlButtons:F},methods:{isPhone(t){return/^(09)[0-9]{8}$/.test(t)?!0:"請輸入正確的行動電話號碼"},async goToGetCart(t=!0){try{await this.getCart(t)}catch(s){this.showErrMessage(s)}},async goToPutCart(t,s,h){try{await this.putCart(t,s,h),await this.goToGetCart(!1)}catch(v){this.showErrMessage(v)}},async goToDeleteCart(t){try{await this.deleteCart(t),await this.goToGetCart(!1)}catch(s){this.showErrMessage(s)}},async goToDeleteCarts(){try{await this.deleteCarts(),await this.goToGetCart()}catch(t){this.showErrMessage(t)}},async goToPostCoupon(){try{await this.postCoupon(this.couponCode),await this.goToGetCart(!1)}catch(t){this.showErrMessage(t)}},async goToPostOrder(){try{const t=await this.postOrder(this.orderData);this.$router.push({name:"payment",params:{id:t.data.orderId}}),await this.goToGetCart(!1)}catch(t){this.showErrMessage(t)}},showErrMessage(t){t&&t.response&&t.response.data!==void 0?(this.serverMessage.message=t.response.data.message,this.serverMessage.success=t.response.data.success,this.$refs.resultModal.openModal()):(this.serverMessage.message="未被定義的錯誤",this.serverMessage.success=!1,this.$refs.resultModal.openModal())},...w(k,["getCart","putCart","deleteCart","deleteCarts","postCoupon"]),...w(j,["postOrder"])},computed:{...S(k,["isLoading","isSmLoading","cartsData","allCartsData"])},mounted(){this.goToGetCart()}},H={key:1,class:"container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r"},J=e("div",{class:"d-flex align-items-center justify-content-center mb-3"},[e("h2",{class:"text-center border-bottom border-secondary pb-2 w-25"},"結帳")],-1),K={class:"row"},W={class:"col"},X={class:"accordion",id:"accordionPanelsStayOpenExample"},Y={class:"accordion-item"},Z=e("h2",{class:"accordion-header",id:"ShoppingCartSection"},[e("button",{class:"accordion-button fs-5 fw-semibold text-deep-gray",type:"button","data-bs-toggle":"collapse","data-bs-target":"#ShoppingCartDetails","aria-expanded":"true","aria-controls":"ShoppingCartDetails"}," 購物車 ")],-1),$={id:"ShoppingCartDetails",class:"accordion-collapse collapse show","aria-labelledby":"ShoppingCartSection"},ee={class:"accordion-body"},te={key:0,class:""},se=e("p",null,"目前購物車內沒有商品 😄",-1),oe={key:1,class:""},ae={class:"col-3 d-flex align-items-center"},ne=["src","alt"],re={class:"col-9"},le={class:"d-flex"},ie=["onClick"],de={key:0},ce={key:0,class:"d-flex mb-3"},ue={key:0,class:"accordion-item"},me=e("h2",{class:"accordion-header",id:"OrderConfirmationSection"},[e("button",{class:"accordion-button fs-5 fw-semibold collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#OrderConfirmationDetails","aria-expanded":"false","aria-controls":"OrderConfirmationDetails"}," 訂單確認 ")],-1),pe={id:"OrderConfirmationDetails",class:"accordion-collapse collapse show","aria-labelledby":"OrderConfirmationSection"},he={class:"accordion-body"},be={class:"d-flex justify-content-between"},_e=e("p",null,"商品總金額",-1),fe=e("div",{class:"d-flex justify-content-between"},[e("p",null,"運費"),e("p",null,"免運費")],-1),ge={key:0},ve={key:0,class:"d-flex justify-content-between"},ye=e("p",null,"優惠代碼",-1),Ce={key:1,class:"mb-3"},Ne=e("p",{class:"w-25"},"優惠代碼",-1),we={class:"d-flex justify-content-between align-items-center"},De={key:1,class:"d-flex justify-content-between"},ke=e("p",null,"使用優惠券",-1),Me=e("hr",null,null,-1),xe={key:2,class:"d-flex justify-content-between"},Ie=e("p",null,"總付款金額",-1),Te={class:"text-end"},Ve={key:3,class:""},Se={class:"d-flex justify-content-between"},Ee=e("p",null,"總付款金額",-1),Oe={class:"text-decoration-line-through"},Ue={class:"text-end"},Pe={class:"col"},je={class:"accordion",id:"accordionPanelsStayOpenExample"},qe={key:0,class:"accordion-item"},Be=P('<h2 class="accordion-header" id="ContactUsSection"><button class="accordion-button collapsed fs-5 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#ContactUsDetails" aria-expanded="false" aria-controls="ContactUsDetails"> 聯絡我們 </button></h2><div id="ContactUsDetails" class="accordion-collapse collapse show" aria-labelledby="ContactUsSection"><div class="accordion-body"><div class="d-flex justify-content-between"><p>聯絡信箱</p><p>glow.2023@gmail.com</p></div><div class="d-flex justify-content-between"><p>聯絡電話</p><p>0988000999</p></div><div class="d-flex justify-content-between mb-3"><p>營業時間</p><p>週一至週五 09:00~17:00</p></div><div class="row mb-3"><div class="col d-flex flex-column align-items-center"><span class="material-icons-outlined fs-1 mb-3"> local_shipping </span><span>免費標準配送</span></div><div class="col d-flex flex-column align-items-center"><span class="material-icons-outlined fs-1 mb-3"> redeem </span><span>七日內免費退貨</span></div><div class="col d-flex flex-column align-items-center"><span class="material-icons-outlined fs-1 mb-3"> enhanced_encryption </span><span>安全購物</span></div></div></div></div>',2),Le=[Be],Re={key:1,class:"accordion-item"},Ge=e("h2",{class:"accordion-header",id:"RecipientInformationSection"},[e("button",{class:"accordion-button fs-5 fw-semibold",type:"button","data-bs-toggle":"collapse","data-bs-target":"#RecipientInformationDetails","aria-expanded":"true","aria-controls":"RecipientInformationDetails"}," 收件資料 ")],-1),Qe={id:"RecipientInformationDetails",class:"accordion-collapse collapse show","aria-labelledby":"RecipientInformationSection"},Ae={class:"accordion-body"},Fe={class:"mb-3"},ze=e("label",{for:"category",class:"form-label"},"收件人名稱",-1),He={class:"mb-3"},Je=e("label",{for:"email",class:"form-label"},"電子信箱",-1),Ke={class:"mb-3"},We=e("label",{for:"phone",class:"form-label"},"行動電話號碼",-1),Xe={class:"mb-3"},Ye=e("label",{for:"address",class:"form-label"},"收件地址",-1),Ze={class:"mb-3"},$e=e("p",null,"訂單備註",-1),et={class:"form-check mb-3"},tt=e("label",{for:"is_enabled",class:"form-check-label"},[e("span",{class:"text-main-spec fw-bold"},"我已確認以下內容："),e("span",null,[e("br"),N("提醒您，送出訂單後，將無法修改訂單內容，並前往付款流程，請您確定無誤後再送出😄")])],-1),st=e("div",{class:"bg-medium-gray text-deep-gray px-3 py-2 mb-3"},[e("h6",null,"免運服務"),e("span",null,"我們的商品付款採用「線上信用卡」付款後出貨，運送採用「宅配到府」免運服務，讓您輕鬆購買、安心收貨。")],-1),ot={class:"d-flex mb-3"},at=["disabled"];function nt(t,s,h,v,a,i){const g=p("VueLoading"),u=p("router-link"),I=p("QuantityControlButtons"),b=p("vee-field"),_=p("vee-error-message"),T=p("vee-form"),V=p("ResultModal");return n(),r(C,null,[t.isLoading?(n(),E(g,{key:0,active:t.isLoading,"background-color":"#EBEAE4","is-full-page":!0,color:"#52504B"},null,8,["active"])):(n(),r("div",H,[J,e("div",K,[e("div",W,[e("div",X,[e("div",Y,[Z,e("div",$,[e("div",ee,[t.cartsData.length===0?(n(),r("div",te,[se,l(u,{to:{name:"products"},class:"btn btn-solid-spec w-100 btn-lg"},{default:D(()=>[N(" 繼續購物 ")]),_:1})])):(n(),r("div",oe,[(n(!0),r(C,null,O(t.cartsData,o=>(n(),r("div",{class:"row mb-3 position-relative",key:o.id},[l(g,{active:o.product.id===t.isSmLoading||o.id===t.isSmLoading,"is-full-page":!1,color:"#52504B"},null,8,["active"]),e("div",ae,[e("img",{src:o.product.imageUrl,alt:o.product.title,class:"img-fluid"},null,8,ne)]),e("div",re,[e("div",le,[e("h6",null,c(o.product.title),1),e("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:d=>i.goToDeleteCart(o.id)},null,8,ie)]),e("p",null,[N(" 單價NT$ "+c(parseInt(o.product.price))+" / 小計NT$ "+c(parseInt(o.total))+" ",1),o.final_total!==o.total?(n(),r("span",de," /優惠價NT$ "+c(parseInt(o.final_total)),1)):m("",!0)]),l(I,{inventory:o.product.inventory,id:o.product_id,qty:o.qty,"product-cart-id":o.id,onPutNum:i.goToPutCart},null,8,["inventory","id","qty","product-cart-id","onPutNum"])])]))),128)),t.cartsData.length>1?(n(),r("div",ce,[e("button",{type:"button",class:"btn btn-outline-mdgray w-100",onClick:s[0]||(s[0]=(...o)=>i.goToDeleteCarts&&i.goToDeleteCarts(...o))}," 清空購物車 ")])):m("",!0)]))])])]),t.cartsData.length!==0?(n(),r("div",ue,[me,e("div",pe,[e("div",he,[e("div",be,[_e,e("p",null,"NT$ "+c(parseInt(t.allCartsData.total)),1)]),fe,t.allCartsData.useCoupon?m("",!0):(n(),r("div",ge,[a.useCoupon?a.useCoupon?(n(),r("div",Ce,[Ne,e("div",we,[y(e("input",{type:"text",class:"form-control",id:"category",placeholder:"請填入優惠代碼","onUpdate:modelValue":s[2]||(s[2]=o=>a.couponCode=o)},null,512),[[x,a.couponCode]]),e("button",{type:"button",class:"w-25 btn btn-outline-dpgray ms-3",onClick:s[3]||(s[3]=(...o)=>i.goToPostCoupon&&i.goToPostCoupon(...o))}," 使用 "),e("button",{type:"button",class:"w-25 btn btn-outline-dpgray ms-3",onClick:s[4]||(s[4]=o=>a.useCoupon=!1)}," 取消 ")])])):m("",!0):(n(),r("div",ve,[ye,e("button",{type:"button",class:"btn btn-outline-dpgray",onClick:s[1]||(s[1]=o=>a.useCoupon=!0)}," 使用優惠代碼 ")]))])),t.allCartsData.useCoupon?(n(),r("div",De,[ke,e("p",null," 優惠 NT$ "+c(parseInt(t.allCartsData.total,10)-parseInt(t.allCartsData.final_total,10)),1)])):m("",!0),Me,t.allCartsData.useCoupon?t.allCartsData.useCoupon?(n(),r("div",Ve,[e("div",Se,[Ee,e("h5",Oe," NT$ "+c(parseInt(t.allCartsData.total)),1)]),e("h4",Ue,"NT$ "+c(parseInt(t.allCartsData.final_total)),1)])):m("",!0):(n(),r("div",xe,[Ie,e("h4",Te,"NT$ "+c(parseInt(t.allCartsData.total)),1)]))])])])):m("",!0)])]),e("div",Pe,[e("div",je,[t.cartsData.length===0?(n(),r("div",qe,Le)):m("",!0),t.cartsData.length!==0?(n(),r("div",Re,[Ge,e("div",Qe,[e("div",Ae,[l(T,{onSubmit:i.goToPostOrder},{default:D(({errors:o})=>[e("div",Fe,[ze,l(b,{type:"text",name:"收件人",class:f(["form-control",{"is-invalid":o.收件人}]),rules:"required|max:15",id:"category",placeholder:"請填入收件人真實姓名，以確保順利收件",modelValue:a.orderData.data.user.name,"onUpdate:modelValue":s[5]||(s[5]=d=>a.orderData.data.user.name=d)},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"收件人"})]),e("div",He,[Je,l(b,{type:"email",class:f(["form-control",{"is-invalid":o.電子信箱}]),id:"email",rules:"email|required",name:"電子信箱",placeholder:"請填入訂單通知Email (訂單資訊將以此E-mail通知您)",modelValue:a.orderData.data.user.email,"onUpdate:modelValue":s[6]||(s[6]=d=>a.orderData.data.user.email=d)},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"電子信箱"})]),e("div",Ke,[We,l(b,{type:"text",name:"行動電話",rules:i.isPhone,class:f(["form-control",{"is-invalid":o.行動電話}]),id:"phone",placeholder:"請填入收件人行動電話號碼 (供配送人員聯絡)",modelValue:a.orderData.data.user.tel,"onUpdate:modelValue":s[7]||(s[7]=d=>a.orderData.data.user.tel=d)},null,8,["rules","class","modelValue"]),l(_,{class:"invalid-feedback",name:"行動電話"})]),e("div",Xe,[Ye,l(b,{type:"text",name:"收件地址",class:f(["form-control",{"is-invalid":o.收件地址}]),id:"address",rules:"required|max:50",placeholder:"送貨地點目前僅提供：台灣、台灣外島宅配",modelValue:a.orderData.data.user.address,"onUpdate:modelValue":s[8]||(s[8]=d=>a.orderData.data.user.address=d)},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"收件地址"})]),e("div",Ze,[$e,l(b,{as:"textarea",name:"訂單備註",class:f(["w-100 form-control",{"is-invalid":o.訂單備註}]),id:"orderMessage",rows:"5",placeholder:"管理室代收/電話聯絡時間...",rules:"max:800",modelValue:a.orderData.data.message,"onUpdate:modelValue":s[9]||(s[9]=d=>a.orderData.data.message=d)},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"訂單備註"})]),e("div",et,[y(e("input",{type:"checkbox",class:"form-check-input",id:"is_enabled","onUpdate:modelValue":s[10]||(s[10]=d=>a.checkOrderInfo=d)},null,512),[[U,a.checkOrderInfo]]),tt]),st,e("div",ot,[e("button",{type:"submit",class:"border btn btn-solid-spec w-100 btn-lg",disabled:!a.checkOrderInfo}," 結帳 ",8,at)])]),_:1},8,["onSubmit"])])])])):m("",!0)])])])])),l(V,{ref:"resultModal","server-message":a.serverMessage},null,8,["server-message"])],64)}const ut=M(z,[["render",nt]]);export{ut as default};
