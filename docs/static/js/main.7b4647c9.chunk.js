(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},128:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(7),c=a.n(l),r=a(18),i=a(42),s=a(57),u=a(74),g=a(75),h=a.n(g),d=(a(100),a(26)),p=a(27),m=a(30),b=a(28),f=a(29),v=a(76),E=a.n(v),k=a(77),j=a.n(k),y=a(78),S=a.n(y),O=a(79),w=a.n(O),C=(a(101),a(55)),x=a.n(C),A=a(80),T=a(81),q=a(31),G=a(52),L=a.n(G),P=a(82),W=a(166),B=a(169),R=a(170),z=a(168),F=a(162),I=a(165),N=a(174),_=a(171),J=a(172),D=a(167),H=a(56),M=a.n(H),$=function(e){function t(e){var a;return Object(d.a)(this,t),a=Object(m.a)(this,Object(b.a)(t).call(this,e)),console.log(a.props),a.state={q:"",searchWebsiteType:"google",exportType:"googleSlide",pushEnable:!1,loading:!1},a.generateSlideSubmit=a.generateSlideSubmit.bind(Object(q.a)(a)),a.onSelectChanged=a.onSelectChanged.bind(Object(q.a)(a)),a.onPushChecked=a.onPushChecked.bind(Object(q.a)(a)),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"generateSlideSubmit",value:function(e){if(this.setState({loading:!0}),M.a.Permission.has())this.generateSlideRequest();else{var t=this;M.a.Permission.request(function(){t.generateSlideRequest()},function(){t.generateSlideRequest()})}e.preventDefault()}},{key:"onSelectChanged",value:function(e){console.log(e),this.setState(Object(T.a)({},e.target.name,e.target.value))}},{key:"generateSlideRequest",value:function(){var e=Object(A.a)(x.a.mark(function e(){var t;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(this.state),e.next=3,L.a.post("https://ufnk35q9zh.execute-api.ap-northeast-1.amazonaws.com/dev/hello",this.state);case 3:t=e.sent,this.setState({loading:!1}),console.log(t);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"onPushChecked",value:function(e,t){console.log(e),console.log(t),this.setState({pushEnable:t})}},{key:"render",value:function(){var e=this;this.props.googleAccount;return o.a.createElement(F.a,null,o.a.createElement(R.a,{label:"slide titles",placeholder:"\u30b9\u30e9\u30a4\u30c9\u306b\u3057\u305f\u3044\u753b\u50cf\u306e\u30ad\u30fc\u30ef\u30fc\u30c9\u3092,(\u30ab\u30f3\u30de\u533a\u5207\u308a)\u3067\u5165\u529b\u3057\u3066\u3044\u3063\u3066\u304f\u3060\u3055\u3044",fullWidth:!0,onChange:function(t){return e.setState({q:t.target.value})}}),o.a.createElement(P.Collapse,{isOpened:!0},o.a.createElement(_.a,{htmlFor:"age-simple"},"Age"),o.a.createElement(z.a,{onChange:this.onSelectChanged,autoWidth:!0,name:"searchWebsiteType",value:this.state.searchWebsiteType},o.a.createElement(J.a,{value:"google"},"Google\u753b\u50cf\u691c\u7d22"),o.a.createElement(J.a,{value:"twitter"},"Twitter"),o.a.createElement(J.a,{value:"flickr"},"Flickr"),o.a.createElement(J.a,{value:"instagram"},"Instagram")),o.a.createElement(I.a,null,"Label + placeholder"),o.a.createElement(z.a,{onChange:this.onSelectChanged,name:"exportType",value:this.state.exportType},o.a.createElement(J.a,{value:"googleSlide"},"Google Slide"),o.a.createElement(J.a,{value:"html"},"HTML")),o.a.createElement(N.a,{control:o.a.createElement(B.a,{checked:this.state.pushEnable,onChange:this.onPushChecked}),label:"\u51fa\u6765\u4e0a\u304c\u3063\u305f\u3089\u30d7\u30c3\u30b7\u30e5\u901a\u77e5\u3067\u304a\u77e5\u3089\u305b\u3059\u308b"})),o.a.createElement(W.a,{variant:"contained",size:"large",fullWidth:!0,color:"primary",onClick:this.generateSlideSubmit,disabled:this.state.loading},this.state.loading?o.a.createElement(D.a,null):"\u4f5c\u6210\u3059\u308b"))}}]),t}(o.a.Component),K=a(83),Q=a.n(K),U=function(e){function t(e){var a;return Object(d.a)(this,t),a=Object(m.a)(this,Object(b.a)(t).call(this,e)),console.log(a.props),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"responseGoogle",value:function(e){console.log(e),this.props.googleLogin(e)}},{key:"render",value:function(){return o.a.createElement(Q.a,{clientId:"534985088008-oqr6to2iu26j6eh2r7kiiqjbvmrdo194.apps.googleusercontent.com",buttonText:"Login",responseType:"id_token code",accessType:"online",onSuccess:this.responseGoogle,onFailure:this.responseGoogle,cookiePolicy:"single_host_origin"})}}]),t}(o.a.Component),V=function(e){function t(e){return Object(d.a)(this,t),Object(m.a)(this,Object(b.a)(t).call(this,e))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("video",{autoPlay:!0,loop:!0,muted:!0,poster:w.a,id:"bgvid"},o.a.createElement("source",{src:S.a,type:"video/webm"}),o.a.createElement("source",{src:j.a,type:"video/mp4"})),o.a.createElement(U,null),o.a.createElement("img",{src:E.a,className:"App-logo",alt:"logo"}),o.a.createElement($,null)))}}]),t}(o.a.Component),X={googleLogin:function(){return{type:"GoogleAccount"}}};var Y=Object(i.b)(function(e){return e},function(e){return{googleLogin:function(t){e(X.googleLogin(t))}}})(V);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z={googleAccount:{}};var ee={key:"root",storage:h.a},te=Object(s.a)(ee,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z;switch((arguments.length>1?arguments[1]:void 0).type){case"GoogleAccount":return{googleAccount:e.googleAccount};default:return e}}),ae=Object(r.c)(te),ne=Object(s.b)(ae);c.a.render(o.a.createElement(i.a,{store:ae},o.a.createElement(u.a,{loading:null,persistor:ne},o.a.createElement(Y,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},76:function(e,t,a){e.exports=a.p+"static/media/AutoSlideGeneratorLogo.f86f89da.png"},77:function(e,t,a){e.exports=a.p+"static/media/Background.a0534386.mp4"},78:function(e,t,a){e.exports=a.p+"static/media/Background.04c3c683.webm"},79:function(e,t,a){e.exports=a.p+"static/media/Background.0707892f.jpg"},89:function(e,t,a){e.exports=a(128)}},[[89,1,2]]]);
//# sourceMappingURL=main.7b4647c9.chunk.js.map