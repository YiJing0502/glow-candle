import{_ as y,m as w,a as S,c,f as l,g,d as b,n as i,h as n,o as d,b as e,e as p,p as V,j as C}from"./index-vSMGsHVG.js";import{p as f}from"./pageStore-jPQB3cvG.js";const k={data(){return{messageData:{email:"",message:""},isSent:!1}},computed:{...w(f,["nowPage"])},methods:{goToPostMessage(){this.isSent=!0,this.$refs.form.resetForm()},...S(f,["changeNowPage"])}},s=a=>(V("data-v-de4b838c"),a=a(),C(),a),I=s(()=>e("div",{class:"container-fluid bg-main-medium py-5 text-center"},[e("h5",{class:""},"訂單相關問題，請交由官方 LINE@ 詢問"),e("h6",{class:"mb-3"},"客服時間： 週一至週五 09:00~17:00"),e("button",{class:"btn btn-solid-dpgray",type:"button"},"LINE@ 官方客服")],-1)),N={key:0,class:"container message py-5"},P=s(()=>e("h2",{class:"mb-3"},"聯繫我們",-1)),D=s(()=>e("p",null,"謝謝您的主動聯絡，請留下要諮詢的問題，我們會用以下資訊進行回覆。",-1)),F={class:"mb-3"},T=s(()=>e("label",{for:"exampleFormControlInput1",class:"form-label"},"電子信箱",-1)),L={class:"mb-3"},B=s(()=>e("label",{for:"exampleFormControlTextarea1",class:"form-label"},"留言",-1)),E=s(()=>e("button",{class:"w-100 btn btn-solid-spec btn-lg",type:"submit"},"送出",-1)),q={key:1,class:"container message py-5 my-5 text-center bg-main-spec container-rounded text-main-light"},M=s(()=>e("h2",{class:"mb-3"},"已傳送您的留言",-1)),R=s(()=>e("h5",{class:"mb-3"},"我們將儘速回覆您",-1)),U=s(()=>e("div",{class:"container message"},[e("h4",{class:"mb-3"},"更多我們的詳細資訊"),e("p",null,"公司名稱： 光輝時刻有限公司"),e("p",null,"統一編號：08765445"),e("p",null,[p(" 聯絡信箱： "),e("a",{class:"text-deep-gray",href:"mailto:glow.2023@gmail.com"},"glow.2023@gmail.com")]),e("p",null,[p(" 聯絡電話： "),e("a",{class:"text-deep-gray",href:"tel:0988000999"},"0988000999")]),e("p",null,"營業時間：週一至週五 09:00~17:00")],-1));function j(a,o,z,A,t,h){const u=n("vee-field"),_=n("vee-error-message"),v=n("vee-form"),x=n("RouterLink");return d(),c("div",null,[I,t.isSent?b("",!0):(d(),c("div",N,[l(v,{ref:"form",onSubmit:h.goToPostMessage},{default:g(({errors:m})=>[P,D,e("div",F,[T,l(u,{name:"電子信箱",type:"email",class:i(["form-control",{"is-invalid":m.電子信箱}]),modelValue:t.messageData.email,"onUpdate:modelValue":o[0]||(o[0]=r=>t.messageData.email=r),rules:"required|email",id:"exampleFormControlInput1",placeholder:"輸入您的電子信箱"},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"電子信箱"})]),e("div",L,[B,l(u,{as:"textarea",name:"留言",class:i([{"is-invalid":m.留言},"form-control"]),rules:"max:800|required",modelValue:t.messageData.message,"onUpdate:modelValue":o[1]||(o[1]=r=>t.messageData.message=r),placeholder:"輸入您的訊息。若是詢問店內特定商品，請留下商品名稱，也歡迎您留下電子信箱以外的聯絡方式，謝謝！",id:"exampleFormControlTextarea1",rows:"10"},null,8,["class","modelValue"]),l(_,{class:"invalid-feedback",name:"留言"})]),E]),_:1},8,["onSubmit"])])),t.isSent?(d(),c("div",q,[M,R,l(x,{to:{name:"home"},class:i(["btn btn-solid-main btn-lg",{active:a.nowPage==="首頁"}]),onClick:o[2]||(o[2]=m=>a.changeNowPage("首頁")),"aria-current":"page"},{default:g(()=>[p(" 返回首頁 ")]),_:1},8,["class"])])):b("",!0),U])}const J=y(k,[["render",j],["__scopeId","data-v-de4b838c"]]);export{J as default};
