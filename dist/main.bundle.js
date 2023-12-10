"use strict";(self.webpackChunkweather_app=self.webpackChunkweather_app||[]).push([[179],{28:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(537),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([n.id,"/* Reset */\n*, *::before, *::after {\n    box-sizing: border-box;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    font: inherit;\n}\n\nbody {\n    min-height: 100vh;\n}\n\nimg, picture, svg, video {\n    display: block;\n    max-width: 100%;\n}\n\n/* Custom */\n:root {\n    --dark-mode-bg-color: hsl(0, 0%, 12%)\n}\n\n/* Header */\n\n/* Main */\n\n/* Footer */\nfooter {\n    grid-row: 5;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: flex-end;\n}\n\n.fa-square-github,\n.fa-square-github:active,\n.fa-square-github:visited, \na {\n    color: white;\n    text-decoration: none;\n}","",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA,UAAU;AACV;IACI,sBAAsB;AAC1B;;AAEA;IACI,SAAS;IACT,UAAU;IACV,aAAa;AACjB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,cAAc;IACd,eAAe;AACnB;;AAEA,WAAW;AACX;IACI;AACJ;;AAEA,WAAW;;AAEX,SAAS;;AAET,WAAW;AACX;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,qBAAqB;AACzB;;AAEA;;;;IAII,YAAY;IACZ,qBAAqB;AACzB",sourcesContent:["/* Reset */\n*, *::before, *::after {\n    box-sizing: border-box;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    font: inherit;\n}\n\nbody {\n    min-height: 100vh;\n}\n\nimg, picture, svg, video {\n    display: block;\n    max-width: 100%;\n}\n\n/* Custom */\n:root {\n    --dark-mode-bg-color: hsl(0, 0%, 12%)\n}\n\n/* Header */\n\n/* Main */\n\n/* Footer */\nfooter {\n    grid-row: 5;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: flex-end;\n}\n\n.fa-square-github,\n.fa-square-github:active,\n.fa-square-github:visited, \na {\n    color: white;\n    text-decoration: none;\n}"],sourceRoot:""}]);const s=i},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var u=0;u<n.length;u++){var A=[].concat(n[u]);r&&i[A[0]]||(void 0!==a&&(void 0===A[5]||(A[1]="@layer".concat(A[5].length>0?" ".concat(A[5]):""," {").concat(A[1],"}")),A[5]=a),t&&(A[2]?(A[1]="@media ".concat(A[2]," {").concat(A[1],"}"),A[2]=t):A[2]=t),o&&(A[4]?(A[1]="@supports (".concat(A[4],") {").concat(A[1],"}"),A[4]=o):A[4]="".concat(o)),e.push(A))}},e}},537:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[e].concat([a]).join("\n")}return[e].join("\n")}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],s=0;s<n.length;s++){var c=n[s],u=r.base?c[0]+r.base:c[0],A=a[u]||0,d="".concat(u," ").concat(A);a[u]=A+1;var f=t(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)e[f].references++,e[f].updater(p);else{var l=o(p,r);r.byIndex=s,e.splice(s,0,{identifier:d,updater:l,references:1})}i.push(d)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var c=r(n,o),u=0;u<a.length;u++){var A=t(a[u]);0===e[A].references&&(e[A].updater(),e.splice(A,1))}a=c}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},910:(n,e,t)=>{var r=t(379),o=t.n(r),a=t(795),i=t.n(a),s=t(569),c=t.n(s),u=t(565),A=t.n(u),d=t(216),f=t.n(d),p=t(589),l=t.n(p),h=t(28),v={};v.styleTagTransform=l(),v.setAttributes=A(),v.insert=c().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=f(),o()(h.Z,v),h.Z&&h.Z.locals&&h.Z.locals}},n=>{n(n.s=910)}]);
//# sourceMappingURL=main.bundle.js.map