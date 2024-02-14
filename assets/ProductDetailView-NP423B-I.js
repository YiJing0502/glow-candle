import{_ as M,m as b,i as w,c as l,f as N,a as e,F as d,j as g,t as c,l as y,v as D,b as p,r as f,o as i,d as C}from"./index-zAkwafHT.js";import{c as v}from"./cartsStore-jI2campF.js";import{s as E}from"./stringStore-bgGk0xh6.js";var x={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:P,VITE_API_PATH:S}=x,L={data(){return{currentNum:1,isLoading:!1,showData:{},serverMessage:{message:"",success:!0}}},computed:{...b(v,["cartsData","isSmLoading","storeMessage"])},methods:{plusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>=1&&this.currentNum<this.showData.inventory){this.currentNum+=1;return}this.currentNum>=this.showData.inventory&&(this.serverMessage.message="很抱歉，不能超出此庫存量",this.serverMessage.success=!1,this.$refs.resultModal.openModal())},minusNum(){if(this.currentNum=parseInt(this.currentNum,10),this.currentNum>1){this.currentNum-=1;return}this.currentNum<=1&&(this.serverMessage.message="很抱歉，最低數量為1",this.serverMessage.success=!1,this.$refs.resultModal.openModal())},blurNum(r){this.currentNum=parseInt(r.target.value,10),this.currentNum>this.showData.inventory?(this.currentNum=this.showData.inventory,this.serverMessage.message="很抱歉，不能超出此庫存量",this.serverMessage.success=!1,this.$refs.resultModal.openModal()):this.currentNum<=0?(this.currentNum=1,this.serverMessage.message="很抱歉，最低數量為1",this.serverMessage.success=!1,this.$refs.resultModal.openModal()):Number.isNaN(this.currentNum)&&(this.currentNum=1,this.serverMessage.message="請輸入有效的數字",this.serverMessage.success=!1,this.$refs.resultModal.openModal())},validateQuantity(r,t){const a=parseInt(r,10);return a>t?(this.serverMessage.message=`無法將所選的數量加入到購物車，因為已經超過庫存的${t}件商品`,this.serverMessage.success=!1,this.$refs.resultModal.openModal(),!1):a<0?(this.serverMessage.message="無法將所選的數量加入到購物車，因為商品數量不得低於1",this.serverMessage.success=!1,this.$refs.resultModal.openModal(),!1):!0},validateCartQuantity(r,t,a){for(let n=0;n<this.cartsData.length;n+=1){const s=this.cartsData[n];if(s.product.id===r){if(s.qty>=a)return this.serverMessage.message=`無法將所選的數量加入到購物車，因為購物車已經有${s.qty}件商品，請至購物車頁面查看`,this.serverMessage.success=!1,this.$refs.resultModal.openModal(),!1;if(s.qty+parseInt(t,10)>=a+1)return this.serverMessage.message=`無法將所選的數量加入到購物車，因為購物車已經有${s.qty}件商品，加入所選的數量會超過庫存，請重新選擇後再送出`,this.serverMessage.success=!1,this.$refs.resultModal.openModal(),!1}}return!0},async goToPostCart(r,t,a){try{await this.goToGetCart(!1),this.validateQuantity(t,a)&&this.validateCartQuantity(r,t,a)&&(await this.postCart(r,parseInt(t,10)),await this.goToGetCart(!1))}catch(n){this.showErrMessage(n)}},getProduct(){const{id:r}=this.$route.params;this.isLoading=!0;const t=`${P}/v2/api/${S}/product/${r}`;this.$http.get(t).then(a=>{this.showData={...a.data.product};const{splitStringByNewline:n}=E();this.showData.content=n(this.showData.content),this.isLoading=!1}).catch(a=>{this.showErrMessage(a),this.$router.push({name:"front404",params:{pathMatch:this.$route.path.split("/").slice(1)},query:this.$route.query,hash:this.$route.hash})})},async goToGetCart(r=!0){try{await this.getCart(r)}catch(t){this.showErrMessage(t)}},showErrMessage(r){this.serverMessage.message=r.response.data.message,this.serverMessage.success=r.response.data.success,this.$refs.resultModal.openModal()},...w(v,["getCart","postCart"])},watch:{$route(r){this.$router.push(r.path)}},mounted(){this.getProduct(),this.getCart(!1)}},T={key:1,class:"container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r"},k={class:"row position-relative"},B={class:"col me-5"},V=["src"],I=["src"],A={class:"col"},R={class:"d-flex justify-content-between"},q=e("hr",null,null,-1),U={class:"mt-3 mb-3"},Q={class:"d-flex"},G={class:"bg-white d-flex w-50 mb-3 gap-3 border"},j=["disabled"],F=["disabled"],H={class:"d-flex align-items-end ms-3"},O={key:0,class:"d-flex mb-3 position-relative"},$=e("button",{type:"button",class:"btn btn-solid-spec w-100 btn-lg"},"正在加入購物車",-1),z={key:1,class:"d-flex mb-3"},J=e("hr",null,null,-1),K={class:"accordion"},W={class:"accordion-item"},X=e("h2",{class:"accordion-header",id:"ProductContentSection"},[e("button",{class:"accordion-button collapsed fs-5 fw-semibold",type:"button","data-bs-toggle":"collapse","data-bs-target":"#ProductContentDetails","aria-expanded":"false","aria-controls":"ProductContentDetails"}," 內容 ")],-1),Y={id:"ProductContentDetails",class:"accordion-collapse collapse show","aria-labelledby":"ProductContentSection"},Z={class:"accordion-body"},ss=e("br",null,null,-1);function es(r,t,a,n,s,u){const m=f("VueLoading"),_=f("ResultModal");return i(),l(d,null,[s.isLoading?(i(),N(m,{key:0,active:s.isLoading,"background-color":"#EBEAE4","is-full-page":!0,color:"#52504B"},null,8,["active"])):(i(),l("div",T,[e("div",k,[e("div",B,[e("img",{src:s.showData.imageUrl,alt:"",class:"img-fluid"},null,8,V),(i(!0),l(d,null,g(s.showData.imagesUrl,(o,h)=>(i(),l("img",{key:h,src:o,alt:"",class:"img-fluid"},null,8,I))),128))]),e("div",A,[e("div",R,[e("p",null,c(s.showData.category),1),e("p",null,c(s.showData.unit),1)]),e("h4",null,c(s.showData.title),1),q,e("p",null,c(s.showData.description),1),e("h4",U,"NT$ "+c(s.showData.price),1),e("div",Q,[e("div",G,[e("button",{disabled:s.currentNum===1,type:"button",class:"btn btn-lg",onClick:t[0]||(t[0]=(...o)=>u.minusNum&&u.minusNum(...o))},"-",8,j),y(e("input",{type:"number",class:"form-control border-white shadow-none text-center","onUpdate:modelValue":t[1]||(t[1]=o=>s.currentNum=o),onBlur:t[2]||(t[2]=(...o)=>u.blurNum&&u.blurNum(...o))},null,544),[[D,s.currentNum,void 0,{number:!0}]]),e("button",{disabled:s.currentNum===s.showData.inventory,type:"button",class:"btn btn-lg",onClick:t[3]||(t[3]=(...o)=>u.plusNum&&u.plusNum(...o))},"+",8,F)]),e("p",H,"目前庫存："+c(s.showData.inventory),1)]),r.isSmLoading===s.showData.id?(i(),l("div",O,[p(m,{active:r.isSmLoading===s.showData.id,"is-full-page":!1,color:"#52504B",width:30,height:30},null,8,["active"]),$])):(i(),l("div",z,[e("button",{type:"button",class:"btn btn-solid-spec w-100 btn-lg",onClick:t[4]||(t[4]=o=>u.goToPostCart(s.showData.id,s.currentNum,s.showData.inventory))},"加入購物車")])),J,e("div",K,[e("div",W,[X,e("div",Y,[e("div",Z,[e("p",null,[(i(!0),l(d,null,g(s.showData.content,(o,h)=>(i(),l("span",{key:h},[C(c(o),1),ss]))),128))])])])])])])])])),p(_,{ref:"resultModal","server-message":s.serverMessage},null,8,["server-message"])],64)}const os=M(L,[["render",es]]);export{os as default};
