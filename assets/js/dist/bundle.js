(()=>{"use strict";const e=function(){const e={},n={_isFocusOnInput:function(){let e=document.activeElement,n=e.nodeName.toLowerCase(),t=["input","textarea","select"].includes(n);if("input"===n){let n=e.attributes.type.value.toLowerCase();["color","radio","checkbox"].includes(n)&&(t=!1)}else e.isContentEditable&&(t=!0);return t},_bindFn:function(n,t,r){document.addEventListener("keydown",r),e[n]||(e[n]=[]),e[n].push({fn:t,fnWrapper:r})},bind:function(e,t,r,i){if("string"!=typeof e)throw new TypeError("The key parameter to bind must be a string.");e=e.toLowerCase(),n._bindFn(e,t,(function(o){(r||!n._isFocusOnInput()||i)&&o.key&&o.key.toLowerCase()===e&&(i&&!o.ctrlKey||!1===t.apply(this,arguments)&&(o.preventDefault(),o.stopPropagation()))}))},unbind:function(n,t){let r=e[n];if(r){let e;for(e=0;e<r.length&&r[e].fn!==t;e++);e<r.length&&(document.removeEventListener("keydown",r[e].fnWrapper),r.splice(e,1))}},_getSequenceArgs:function(e,n,t,r){let i=Array.prototype.splice.call(arguments,0),o=i[0];return r=i[i.length-1],Array.isArray(o)||(o=i.splice(0,i.length-1)),{keys:o,fn:r}},bindSequence:function(e,t,r,i){let o=n._getSequenceArgs.apply(this,arguments),u=o.keys,s=[];if(i=o.fn,u.length>1){let e=function(e){let t=e.key.toLowerCase();if(!n._isFocusOnInput()&&("shift"!==t&&s.push(t),s.length>u.length&&s.shift(),t===u[u.length-1])){let n;for(n=0;n<u.length&&u[n]===s[n];n++);n===u.length&&!1===i.apply(this,arguments)&&(e.preventDefault(),e.stopPropagation())}},t=u.join(",");n._bindFn(t,i,e)}},unbindSequence:function(e,t,r,i){let o=n._getSequenceArgs.apply(this,arguments),u=o.keys.join(",");i=o.fn,n.unbind(u,i)}};return{bind:n.bind,unbind:n.unbind,bindSequence:n.bindSequence,unbindSequence:n.unbindSequence}}(),{bind:n,unbind:t,bindSequence:r,unbindSequence:i}=e,o=e=>n=>{n.preventDefault(),document.querySelector(".js-text-message").textContent=e},u=["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a","enter"],s=o("Hey, stop cheating!");n("a",o("You pressed the 'a' key")),n("m",o("You pressed Ctrl + 'm'"),!0,!0),r(u,s),document.querySelector(".js-unbind-sequence").addEventListener("click",(e=>i(u,s)));const c=o("You pressed the 'k' key");document.querySelector(".js-bind").addEventListener("click",(e=>n("k",c,!0))),document.querySelector(".js-unbind").addEventListener("click",(e=>t("k",c)))})();
//# sourceMappingURL=bundle.js.map