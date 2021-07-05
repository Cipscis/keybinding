(()=>{"use strict";class e extends Array{constructor(e){if("string"!=typeof e)throw new RangeError("KeyBind: Constructor argument must be a string");super(0);const t=e.trim().split(/\s+/g);for(const e of t)this.push(e)}toString(){return this.join(" ")}match(e){if(e.length!==this.length)return!1;for(const[t,n]of e.entries()){const e=this[t];if(!n.match(e))return!1}return!0}}const t=Object.freeze({alt:/\balt\+/g,ctrl:/\b(control|ctrl|command|cmd|meta)\+/g,shift:/\bshift\+/g}),n=Object.freeze({space:" ",spacebar:" ",up:"arrowup",right:"arrowright",down:"arrowdown",left:"arrowleft",esc:"escape"});class r{constructor(e){if(!("key"in e))throw new RangeError("KeyPress: key is a required option");this.key=e.key,this.modifiers={altKey:e.altKey||!1,ctrlKey:e.metaKey||e.ctrlKey||!1,shiftKey:e.shiftKey||!1}}match(e){const r={altKey:!1,ctrlKey:!1,shiftKey:!1};t.alt.test(e)&&(r.altKey=!0,e=e.replace(t.alt,"")),t.ctrl.test(e)&&(r.ctrlKey=!0,e=e.replace(t.ctrl,"")),t.shift.test(e)&&(r.shiftKey=!0,e=e.replace(t.shift,""));for(const e in r)if(r[e]&&!this.modifiers[e])return!1;return e.toLowerCase()===this.key.toLowerCase()||n[e.toLowerCase()]===this.key.toLowerCase()}}const s={},o=Object.freeze({allowInInput:!1}),i=(t,n,s)=>{const i=Object.assign({},o,s),c=new e(t),a=[];return function(e){if(["Alt","Control","Meta","Shift"].includes(e.key))return;if(!i.allowInInput&&l(document.activeElement))return;if(u(document.activeElement))return;const t=new r(e);a.push(t),a.length>c.length&&a.shift(),c.match(a)&&(a.splice(0),n.apply(this,arguments))}},c=(e,t,n)=>{e in s||(s[e]=[]);const r=s[e];if(r.find((e=>e.fn===t)))return;const o=i(e,t,n);document.addEventListener("keydown",o),r.push({fn:t,fnWrapper:o})},a=(e,t)=>{const n=s[e];if(!n)return;const r=n.findIndex((e=>e.fn===t)),o=n[r];document.removeEventListener("keydown",o.fnWrapper),n.splice(r,1)},l=function(e){const t=e.nodeName.toLowerCase();let n=!1;if(["textarea","select"].includes(t))n=!0;else if("input"===t){n=!0;const t=(e.attributes.type?.value||"text").toLowerCase();["button","checkbox","color","file","hidden","image","radio","range","reset","submit"].includes(t)&&(n=!1)}else e.isContentEditable&&(n=!0);return n},u=function(e){let t=!1;return"input"===e.nodeName.toLowerCase()&&"password"===(e.attributes.type?.value||"text").toLowerCase()&&(t=!0),t},d=e=>t=>{document.querySelector(".js-text-message").textContent=e};c("a",d("You pressed the 'a' key")),c("ctrl+m",d("You pressed Ctrl + 'm'"),{allowInInput:!0});const f="up up down down left right left right b a enter",h=d("Hey, stop cheating!");c(f,h),document.querySelector(".js-unbind-sequence").addEventListener("click",(e=>a(f,h)));const p=d("You pressed the 'k' key");document.querySelector(".js-bind").addEventListener("click",(e=>c("k",p,{allowInInput:!0}))),document.querySelector(".js-unbind").addEventListener("click",(e=>a("k",p)))})();
//# sourceMappingURL=bundle.js.map