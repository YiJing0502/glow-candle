import{m as l,a as i,_ as p,o as a,c as o,F as _,r as m,n,b as t,t as r,d as u,p as h,i as b}from"./index-b5Mq9qPg.js";import{t as d}from"./toastsStore-4YbyuFGs.js";const f={computed:{...l(d,["toastMessages"])},methods:{...i(d,["clearToast"])}},y=s=>(h("data-v-fbcc689d"),s=s(),b(),s),$={class:"toast-container end-0 p-3 fixed",style:{"z-index":"1500"}},v={class:"toast-header"},k={class:"me-auto"},S=y(()=>t("small",{class:"text-body-secondary"},"剛剛",-1)),C=["onClick"],I={key:0,class:"toast-body"};function T(s,g,B,M,w,x){return a(),o("div",$,[(a(!0),o(_,null,m(s.toastMessages,(e,c)=>(a(),o("div",{key:`toast${c}`,class:n(["toast show",`toast${c}`]),role:"alert"},[t("div",v,[t("span",{class:n([`${e.style}`,"p-2 rounded me-2"])},null,2),t("strong",k,r(e.title),1),S,t("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close",onClick:z=>s.clearToast(c)},null,8,C)]),e.content?(a(),o("div",I,r(e.content),1)):u("",!0)],2))),128))])}const V=p(f,[["render",T],["__scopeId","data-v-fbcc689d"]]);export{V as T};
