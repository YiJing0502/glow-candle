import{m as l,a as i,_ as p,o as a,c as o,F as _,r as m,C as n,b as t,t as r,f as u,E as h,G as b}from"./index-cg-IyFeF.js";import{t as d}from"./toastsStore-B6sLTJKo.js";const f={computed:{...l(d,["toastMessages"])},methods:{...i(d,["clearToast"])}},y=s=>(h("data-v-fbcc689d"),s=s(),b(),s),$={class:"toast-container end-0 p-3 fixed",style:{"z-index":"1500"}},v={class:"toast-header"},k={class:"me-auto"},C=y(()=>t("small",{class:"text-body-secondary"},"剛剛",-1)),S=["onClick"],I={key:0,class:"toast-body"};function T(s,g,B,M,w,x){return a(),o("div",$,[(a(!0),o(_,null,m(s.toastMessages,(e,c)=>(a(),o("div",{key:`toast${c}`,class:n(["toast show",`toast${c}`]),role:"alert"},[t("div",v,[t("span",{class:n([`${e.style}`,"p-2 rounded me-2"])},null,2),t("strong",k,r(e.title),1),C,t("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close",onClick:z=>s.clearToast(c)},null,8,S)]),e.content?(a(),o("div",I,r(e.content),1)):u("",!0)],2))),128))])}const N=p(f,[["render",T],["__scopeId","data-v-fbcc689d"]]);export{N as T};
