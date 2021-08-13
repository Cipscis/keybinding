(()=>{"use strict";class e extends Array{constructor(e){if("string"!=typeof e)throw new RangeError("KeyBind: Constructor argument must be a string");super(0);const t=e.trim().split(/\s+/g);for(const e of t)this.push(e)}toString(){return this.join(" ")}match(e){if(e.length!==this.length)return!1;for(const[t,n]of e.entries()){const e=this[t];if(!n.match(e))return!1}return!0}}const t=Object.freeze({alt:/\balt\+/g,ctrl:/\b(control|ctrl|command|cmd|meta)\+/g,shift:/\bshift\+/g}),n=new Map([["space"," "],["spacebar"," "],["up","arrowup"],["right","arrowright"],["down","arrowdown"],["left","arrowleft"],["esc","escape"]]);class r{key;modifiers;constructor(e){if(!("key"in e))throw new RangeError("KeyPress: key is a required option");this.key=e.key,this.modifiers={altKey:e.altKey||!1,ctrlKey:e.metaKey||e.ctrlKey||!1,shiftKey:e.shiftKey||!1}}match(e){const r={altKey:!1,ctrlKey:!1,shiftKey:!1};let s;for(s in t.alt.test(e)&&(r.altKey=!0,e=e.replace(t.alt,"")),t.ctrl.test(e)&&(r.ctrlKey=!0,e=e.replace(t.ctrl,"")),t.shift.test(e)&&(r.shiftKey=!0,e=e.replace(t.shift,"")),r)if(r[s]&&!this.modifiers[s])return!1;return e.toLowerCase()===this.key.toLowerCase()||n.get(e.toLowerCase())===this.key.toLowerCase()}}const s=new Map,o=Object.freeze({allowInInput:!1}),i=(t,n,s)=>{const i=Object.assign({},o,s),c=new e(t),a=[];return function(e,...t){if(["Alt","Control","Meta","Shift"].includes(e.key))return;if(!i.allowInInput&&l(document.activeElement))return;if(u(document.activeElement))return;const s=new r(e);a.push(s),a.length>c.length&&a.shift(),c.match(a)&&(a.splice(0),n.apply(this,[e,...t]))}},c=(e,t,n)=>{s.has(e)||s.set(e,new Map);const r=s.get(e);if(r.has(t))return;const o=i(e,t,n);document.addEventListener("keydown",o),r.set(t,o)},a=(e,t)=>{const n=s.get(e);if(!n)return;const r=n.get(t);r&&(document.removeEventListener("keydown",r),n.delete(t))},l=function(e){let t=!1;if(e instanceof HTMLElement)if(e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)t=!0;else if(e instanceof HTMLInputElement){t=!0;const n=(e.type||"text").toLowerCase();["button","checkbox","color","file","hidden","image","radio","range","reset","submit"].includes(n)&&(t=!1)}else e.isContentEditable&&(t=!0);return t},u=function(e){let t=!1;return e instanceof HTMLInputElement&&"password"===(e.type||"text").toLowerCase()&&(t=!0),t},f=e=>t=>{document.querySelector(".js-text-message").textContent=e};c("a",f("You pressed the 'a' key")),c("ctrl+m",f("You pressed Ctrl + 'm'"),{allowInInput:!0});const d="up up down down left right left right b a enter",h=f("Hey, stop cheating!");c(d,h),document.querySelector(".js-unbind-sequence").addEventListener("click",(e=>a(d,h)));const y=f("You pressed the 'k' key");document.querySelector(".js-bind").addEventListener("click",(e=>c("k",y,{allowInInput:!0}))),document.querySelector(".js-unbind").addEventListener("click",(e=>a("k",y)))})();
//# sourceMappingURL=main.bundle.js.map