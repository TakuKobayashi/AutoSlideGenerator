(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,t,n){e.exports=n.p+"static/media/AutoSlideGeneratorLogo.f86f89da.png"},43:function(e,t,n){e.exports=n.p+"static/media/Background.a0534386.mp4"},44:function(e,t,n){e.exports=n.p+"static/media/Background.04c3c683.webm"},45:function(e,t,n){e.exports=n.p+"static/media/Background.0707892f.jpg"},50:function(e,t,n){e.exports=n(89)},61:function(e,t,n){},62:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(10),c=n.n(r),i=n(4),s=n(14),u=n(26),l=n(40),p=n(41),m=n.n(p),g=(n(61),n(5)),d=n(6),f=n(9),b=n(7),h=n(8),v=n(42),j=n.n(v),O=n(43),y=n.n(O),w=n(44),E=n.n(w),S=n(45),k=n.n(S),A=(n(62),n(24)),x=n.n(A),q=n(46),G=n(13),L=(n(28),n(47)),N=n.n(L),B=n(48),R=n(25),C=n.n(R),P=function(e){function t(e){var n;return Object(g.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).generateSlideSubmit=n.generateSlideSubmit.bind(Object(G.a)(n)),n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"generateSlideSubmit",value:function(e){if(C.a.Permission.has())this.generateSlideRequest();else{var t=this;C.a.Permission.request(function(){t.generateSlideRequest()},function(){t.generateSlideRequest()})}e.preventDefault()}},{key:"generateSlideRequest",value:function(){var e=Object(q.a)(x.a.mark(function e(){var t;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("https://dte2prfam4.execute-api.ap-northeast-1.amazonaws.com/AutoSlideGenerator"),e.next=3,N.a.post("https://dte2prfam4.execute-api.ap-northeast-1.amazonaws.com/AutoSlideGenerator/slide/generate");case 3:t=e.sent,console.log(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.googleAccount;return a.a.createElement("form",{onSubmit:this.generateSlideSubmit,className:"pure-form"},a.a.createElement("div",null,JSON.stringify(e)),a.a.createElement("input",{type:"text",name:"q"}),a.a.createElement(B.Collapse,{isOpened:!0},a.a.createElement("div",null,"Random content")),a.a.createElement("input",{type:"submit",value:"\u4f5c\u6210\u3059\u308b",className:"pure-button pure-button-primary"}))}}]),t}(a.a.Component),J=n(49),z=n.n(J),I=function(e){function t(e){var n;return Object(g.a)(this,t),n=Object(f.a)(this,Object(b.a)(t).call(this,e)),console.log(n.props),n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"responseGoogle",value:function(e){console.log(e),this.props.googleLogin(e)}},{key:"render",value:function(){return a.a.createElement(z.a,{clientId:"534985088008-oqr6to2iu26j6eh2r7kiiqjbvmrdo194.apps.googleusercontent.com",buttonText:"Login",accessType:"offline",onSuccess:this.responseGoogle,onFailure:this.responseGoogle,cookiePolicy:"single_host_origin"})}}]),t}(a.a.Component),T=function(e){function t(e){return Object(g.a)(this,t),Object(f.a)(this,Object(b.a)(t).call(this,e))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("video",{autoPlay:!0,loop:!0,muted:!0,poster:k.a,id:"bgvid"},a.a.createElement("source",{src:E.a,type:"video/webm"}),a.a.createElement("source",{src:y.a,type:"video/mp4"})),a.a.createElement(I,null),a.a.createElement("img",{src:j.a,className:"App-logo",alt:"logo"}),a.a.createElement(P,null)))}}]),t}(a.a.Component),W={googleLogin:function(){return{type:"GoogleAccount"}}};var _=Object(s.b)(function(e){return e},function(e){return{googleLogin:function(t){e(W.googleLogin(t))}}})(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D={googleAccount:{}};var F={key:"root",storage:m.a},$=Object(u.a)(F,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D;switch((arguments.length>1?arguments[1]:void 0).type){case"GoogleAccount":return{googleAccount:e.googleAccount};default:return e}}),H=Object(i.c)($),K=Object(u.b)(H);c.a.render(a.a.createElement(s.a,{store:H},a.a.createElement(l.a,{loading:null,persistor:K},a.a.createElement(_,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[50,1,2]]]);
//# sourceMappingURL=main.0134cdc3.chunk.js.map