import{j as a}from"./index-cg-IyFeF.js";const h=a("toastsStore",{state:()=>({toastMessages:[]}),actions:{showToast(){setTimeout(()=>{this.toastMessages.shift()},6e3)},clearToast(s){this.toastMessages.splice(s,1)},pushToast(s){const{style:t="success",title:e,content:o}=s;this.toastMessages.push({style:t,title:e,content:o}),this.showToast()}}});export{h as t};
