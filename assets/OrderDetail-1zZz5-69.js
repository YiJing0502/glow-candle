import{_ as w,a as h,m as v,c as n,s as D,b as e,f as p,g as r,j as k,i as g,o as a,e as d,F as m,r as f,t as o,d as _}from"./index-vqMCxPcU.js";import{o as y}from"./ordersStore-sBaTlsWD.js";import{p as P}from"./pageStore-WDAUXcEC.js";import{B as C}from"./BasicCollapse-0gj7YJ6w.js";import"./stringStore-VmjzZWDG.js";import"./timeStore-c4AXIEpu.js";const $={data(){return{useCoupon:!1,couponCode:"",checkOrderInfo:!1,orderData:{data:{user:{name:null,email:null,tel:null,address:null},message:null}}}},components:{BasicCollapse:C},methods:{changeToProductPage(s,l){this.changeNowPage(l),this.$router.push({name:"product",params:{id:s}})},async goToGetOrder(){try{const s=await this.getOrder(this.$route.params.id);s.data.order===null&&(this.$router.push({name:"front404",params:{pathMatch:this.$route.path.split("/").slice(1)},query:this.$route.query,hash:this.$route.hash}),this.showAlertMessage(!1,"找不到此筆訂單")),s.data.order.is_paid||this.showAlertMessage(!0,"訂單已建立，請點擊付款按鈕付款")}catch(s){this.showAlertMessage(!1,s.response.data.message)}},async goToPostPayOrder(s){try{const l=await this.postPayOrder(s);await this.goToGetOrder(),this.showAlertMessage(!0,l.data.message)}catch(l){this.showAlertMessage(!1,l.response.data.message)}},...h(y,["getOrder","postPayOrder"]),...h(k,["showAlertMessage"]),...h(P,["changeNowPage"])},computed:{...v(y,["isLoading","showData","userData","productData","couponData"])},mounted(){this.goToGetOrder()}},T={key:1,class:"container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"},O=e("div",{class:"d-flex align-items-center justify-content-center mb-3"},[e("h2",{class:"text-center border-secondary pb-2 fw-bold"},"訂單詳情")],-1),N={class:"row row-cols-1 row-cols-lg-2"},I={class:"col"},S={class:"accordion"},j={class:"col col-sm-2 col-lg-3 d-flex align-items-center"},B=["onClick","src","alt"],A={class:"col col-sm-10 col-lg-9"},M={class:"d-flex"},q=["onClick"],x={key:0},L={class:"fw-bold"},V={class:"d-flex justify-content-between"},G=e("p",null,"訂單編號",-1),F={class:"d-flex justify-content-between"},E=e("p",null,"訂單建立日",-1),R={class:"d-flex justify-content-between"},U=e("p",null,"訂單付款日期",-1),z={key:0},H={key:1},J=e("div",{class:"d-flex justify-content-between"},[e("p",null,"運費"),e("p",null,"免運費")],-1),K={key:0,class:"d-flex justify-content-between"},Q=e("p",null,"使用優惠券",-1),W={class:"fw-bold"},X=e("hr",null,null,-1),Y={class:"d-flex justify-content-between mb-3"},Z=e("p",null,"總付款金額",-1),ee={class:"text-end"},se={key:1,class:"d-flex mb-3"},te={key:2,class:"d-flex mb-3"},oe=e("button",{type:"button",class:"btn btn-solid-dpgray w-100 btn-lg border",disabled:""}," 已完成付款 ",-1),ae=[oe],ne={class:"col"},le={class:"accordion"},de=e("p",null,"收件人名稱",-1),re=e("hr",null,null,-1),ie=e("p",null,"電子信箱",-1),ce=e("hr",null,null,-1),ue=e("p",null,"行動電話號碼",-1),he=e("hr",null,null,-1),pe=e("p",null,"收件地址",-1),_e=e("hr",null,null,-1),ge={class:"mb-3"},me=e("p",null,"訂單備註",-1),fe={key:0},ye=e("br",null,null,-1);function be(s,l,we,ve,De,i){const b=g("PageLoading"),c=g("BasicCollapse");return a(),n("div",null,[s.isLoading?(a(),D(b,{key:0})):(a(),n("div",T,[O,e("div",N,[e("div",I,[e("div",S,[p(c,{uniqueId:"ShoppingCartSection",open:!0},{header:r(()=>[d(" 購物車 ")]),body:r(()=>[(a(!0),n(m,null,f(s.productData,t=>(a(),n("div",{class:"row mb-3",key:t.id},[e("div",j,[e("img",{role:"button",onClick:u=>i.changeToProductPage(t.product.id,t.product.category),src:t.product.imageUrl,alt:t.product.title,class:"img-fluid"},null,8,B)]),e("div",A,[e("div",M,[e("h6",{class:"text-link-deep-gray",role:"button",onClick:u=>i.changeToProductPage(t.product.id,t.product.category)},o(t.product.title),9,q)]),e("p",null,[d(" 單價NT$ "+o(parseInt(t.product.price))+" / 小計NT$ "+o(parseInt(t.total))+" ",1),t.final_total!==t.total?(a(),n("span",x," / 優惠價NT$ "+o(parseInt(t.final_total)),1)):_("",!0)]),e("p",null,[d(" 數量： "),e("span",L,o(t.qty),1)])])]))),128))]),_:1}),p(c,{uniqueId:"OrderConfirmationSection",open:!0},{header:r(()=>[d(" 訂單確認 ")]),body:r(()=>[e("div",V,[G,e("p",null,o(s.showData.id),1)]),e("div",F,[E,e("p",null,o(s.showData.create_at),1)]),e("div",R,[U,s.showData.paid_date?(a(),n("p",H,o(s.showData.paid_date),1)):(a(),n("p",z,"尚未付款"))]),J,s.couponData?(a(),n("div",K,[Q,e("p",null,[d(" 已使用 "),e("span",W,o(s.couponData.title),1),d(" 優惠券 ")])])):_("",!0),X,e("div",Y,[Z,e("h4",ee,"NT$ "+o(parseInt(s.showData.total)),1)]),s.showData.is_paid?(a(),n("div",te,ae)):(a(),n("div",se,[e("button",{type:"button",class:"btn btn-solid-spec w-100 btn-lg",onClick:l[0]||(l[0]=t=>i.goToPostPayOrder(s.showData.id))}," 點我付款 ")]))]),_:1})])]),e("div",ne,[e("div",le,[p(c,{uniqueId:"RecipientInformationSection",open:!0},{header:r(()=>[d(" 收件資料 ")]),body:r(()=>[e("div",null,[de,e("p",null,o(s.userData.name),1)]),re,e("div",null,[ie,e("p",null,o(s.userData.email),1)]),ce,e("div",null,[ue,e("p",null,o(s.userData.tel),1)]),he,e("div",null,[pe,e("p",null,o(s.userData.address),1)]),_e,e("div",ge,[me,e("p",null,[s.showData.message===void 0?(a(),n("span",fe,"無訂單備註")):_("",!0),(a(!0),n(m,null,f(s.showData.message,(t,u)=>(a(),n("span",{key:u},[d(o(t),1),ye]))),128))])])]),_:1})])])])]))])}const Ne=w($,[["render",be]]);export{Ne as default};
