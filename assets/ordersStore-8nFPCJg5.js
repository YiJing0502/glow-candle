import{K as D,L as h}from"./index-hsfrgDbZ.js";import{s as _}from"./stringStore-9FlS5_2e.js";import{t as f}from"./timeStore-HNaeKCH6.js";var E={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",VITE_EMAILJS_SERVICE_ID:"service_akj018u",VITE_EMAILJS_TEMPLATE_ID_CONTACT_US:"template_o8blnrh",VITE_EMAILJS_PUBLIC_KEY:"aGG0jyz8scVC5nDvC",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:d,VITE_API_PATH:p}=E,I=D("ordersStore",{state:()=>({isLoading:!1,showData:{},userData:{},productData:[],couponData:{}}),getters:{},actions:{postOrder(a){return new Promise((s,o)=>{const e=`${d}/v2/api/${p}/order`;h.post(e,a).then(t=>{s(t)}).catch(t=>{o(t)})})},getOrder(a){return new Promise((s,o)=>{this.isLoading=!0;const e=`${d}/v2/api/${p}/order/${a}`;h.get(e).then(t=>{t.data.order!==null&&(this.processOrderData(t.data.order),this.isLoading=!1),s(t)}).catch(t=>{o(t),this.isLoading=!1})})},postPayOrder(a){return new Promise((s,o)=>{const e=`${d}/v2/api/${p}/pay/${a}`;this.isLoading=!0,h.post(e).then(t=>{s(t),this.isLoading=!1}).catch(t=>{o(t),this.isLoading=!1})})},processOrderData(a){const{create_at:s,id:o,is_paid:e,message:t,paid_date:i,products:r,total:n,user:c}=a;this.showData={create_at:s,id:o,is_paid:e,paid_date:i,total:n,message:t};const{timestamp10CodeToDay:u}=f();if(this.showData.create_at=u(s),this.showData.paid_date!==void 0&&(this.showData.paid_date=u(i)),this.showData.message!==void 0){const{splitStringByNewline:l}=_();this.showData.message=l(this.showData.message)}this.processUserData(c),this.processProductData(r)},processUserData(a){this.userData=JSON.parse(JSON.stringify(a))},processProductData(a){this.productData=[],a&&typeof a=="object"&&Object.keys(a).forEach(s=>{const{final_total:o,id:e,product:t,product_id:i,qty:r,total:n}=a[s],c={final_total:o,id:e,product:t,product_id:i,qty:r,total:n};this.productData.push(c),a[s].coupon!==void 0&&(this.couponData=a[s].coupon)}),this.couponData===null||this.couponData===void 0?this.couponData=null:Object.keys(this.couponData).length===0&&(this.couponData=null)}}});export{I as o};