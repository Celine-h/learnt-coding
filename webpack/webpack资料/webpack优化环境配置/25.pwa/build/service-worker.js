if(!self.define){const e=async e=>{if("require"!==e&&(e+=".js"),!i[e]&&(await new Promise(async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}),!i[e]))throw new Error(`Module ${e} didn’t register its module`);return i[e]},s=async(s,i)=>{const r=await Promise.all(s.map(e));i(1===r.length?r[0]:r)};s.toUrl=e=>`./${e}`;const i={require:Promise.resolve(s)};self.define=(s,r,o)=>{i[s]||(i[s]=new Promise(async i=>{let t={};const c={uri:location.origin+s.slice(1)},n=await Promise.all(r.map(s=>"exports"===s?t:"module"===s?c:e(s))),d=o(...n);t.default||(t.default=d),i(t)}))}}define("./service-worker.js",["./workbox-28dd2658"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/built.80ef72694f.css",revision:"7ff9c6b357e2218f8a40d4d7bce69c52"},{url:"index.html",revision:"20cb21799d6684e935d41236ef0f415b"},{url:"js/built.8b7ced3051.js",revision:"2823ca69f051676b27d11512d4b88d94"}],{})}));
//# sourceMappingURL=service-worker.js.map
