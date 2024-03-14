import{K as P,L as g,m as E,a as d,_ as S,j as A,o as m,c as v,b as t,f as n,g as i,n as c,e as r,i as u,p as T,k as L,l as $,s as k,J as V}from"./index-hsfrgDbZ.js";import{p as h}from"./pageStore-k9wnXxe7.js";var R={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",VITE_EMAILJS_SERVICE_ID:"service_akj018u",VITE_EMAILJS_TEMPLATE_ID_CONTACT_US:"template_o8blnrh",VITE_EMAILJS_PUBLIC_KEY:"aGG0jyz8scVC5nDvC",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:M}=R,f=P("adminStore",{state:()=>({loginSuccess:null}),getters:{},actions:{initializeAdmin(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)adminAccount\s*\=\s*([^;]*).*$)|^.*$/,"$1");g.defaults.headers.common.Authorization=e},postApiUserCheck(){const e=`${M}/v2/api/user/check`;return g.post(e).then(s=>(this.loginSuccess=s.data.success,s)).catch(s=>{throw this.loginSuccess=s.response.data.success,s})}}});var N={VITE_BASE_URL:"https://vue3-course-api.hexschool.io",VITE_API_PATH:"orli-hexschool",VITE_EMAILJS_SERVICE_ID:"service_akj018u",VITE_EMAILJS_TEMPLATE_ID_CONTACT_US:"template_o8blnrh",VITE_EMAILJS_PUBLIC_KEY:"aGG0jyz8scVC5nDvC",BASE_URL:"/glow-candle/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_BASE_URL:U}=N,B={data(){return{}},computed:{...E(h,["nowPage"])},methods:{adminLogout(){const e=`${U}/v2/logout`;this.$http.post(e).then(s=>{const l=new Date;l.setSeconds(l.getSeconds()-1),document.cookie=`adminAccount=; expires=${l.toUTCString()}`,this.$router.push({name:"login"}),this.showAlertMessage(!0,s.data.message)}).catch(s=>{this.showAlertMessage(!1,s.response.data.message)})},...d(h,["changeNowPage"]),...d(A,["showAlertMessage"])}},p=e=>(T("data-v-3cf53ff8"),e=e(),L(),e),b={class:"col-2 bg-main-medium side-bar-height px-3"},D={class:"d-flex justify-content-center my-3"},y=p(()=>t("img",{src:$,alt:"",width:"70"},null,-1)),j={class:"list-group"},z={class:"list-group-item"},J={class:"list-group-item"},O={class:"list-group-item"},x={class:"list-group-item"},G={class:"list-group-item"},K={class:"m-3 d-flex justify-content-center align-items-center"},H=p(()=>t("span",{class:"material-icons"},"logout",-1)),Y=p(()=>t("span",null,"登出",-1)),q=[H,Y];function F(e,s,l,I,w,_){const a=u("RouterLink");return m(),v("div",b,[t("div",D,[n(a,{class:c({active:e.nowPage==="首頁"}),onClick:s[0]||(s[0]=o=>e.changeNowPage("首頁")),to:{name:"home"}},{default:i(()=>[y]),_:1},8,["class"])]),t("ul",j,[t("li",z,[n(a,{class:c(["list-group-item",{active:e.nowPage==="後台管理"}]),onClick:s[1]||(s[1]=o=>e.changeNowPage("後台管理")),to:{name:"admin"}},{default:i(()=>[r("後台管理")]),_:1},8,["class"])]),t("li",J,[n(a,{class:c(["list-group-item",{active:e.nowPage==="訂單管理"}]),onClick:s[2]||(s[2]=o=>e.changeNowPage("訂單管理")),to:{name:"adminOrders"}},{default:i(()=>[r("訂單管理")]),_:1},8,["class"])]),t("li",O,[n(a,{class:c(["list-group-item",{active:e.nowPage==="產品管理"}]),onClick:s[3]||(s[3]=o=>e.changeNowPage("產品管理")),to:{name:"adminProducts"}},{default:i(()=>[r("產品管理")]),_:1},8,["class"])]),t("li",x,[n(a,{class:c(["list-group-item",{active:e.nowPage==="優惠券管理"}]),onClick:s[4]||(s[4]=o=>e.changeNowPage("優惠券管理")),to:{name:"adminCoupons"}},{default:i(()=>[r("優惠券管理")]),_:1},8,["class"])]),t("li",G,[n(a,{class:c(["list-group-item",{active:e.nowPage==="文章管理"}]),onClick:s[5]||(s[5]=o=>e.changeNowPage("文章管理")),to:{name:"adminArticles"}},{default:i(()=>[r("文章管理")]),_:1},8,["class"])])]),t("div",K,[t("button",{type:"button",class:"btn btn-outline-spec d-flex justify-content-center align-items-center",onClick:s[6]||(s[6]=(...o)=>_.adminLogout&&_.adminLogout(...o))},q)])])}const Q=S(B,[["render",F],["__scopeId","data-v-3cf53ff8"]]),W={data(){return{}},components:{AdminNavbar:Q},computed:{...E(f,["loginSuccess"])},methods:{...d(V,["pushToast"]),...d(f,["initializeAdmin","postApiUserCheck"]),...d(A,["showAlertMessage"])},mounted(){this.initializeAdmin(),this.postApiUserCheck().then(()=>{this.loginSuccess&&this.pushToast({title:"登入成功",style:"bg-deep-gray"})}).catch(e=>{this.loginSuccess||(this.$router.push({name:"login"}),this.showAlertMessage(!1,e.response.data.message))})}},X={key:1,class:"d-flex"};function Z(e,s,l,I,w,_){const a=u("PageLoading"),o=u("AdminNavbar"),C=u("RouterView");return e.loginSuccess?(m(),v("div",X,[n(o),n(C)])):(m(),k(a,{key:0}))}const te=S(W,[["render",Z]]);export{te as default};
