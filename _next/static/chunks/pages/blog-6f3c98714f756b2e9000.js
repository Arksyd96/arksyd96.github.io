(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{2695:function(n,e,t){"use strict";t.r(e);t(1664),t(5935);var i=t(2986),r=t(8611),o=t(1846),c=t(7121),a=t(9888),l=t(2619),s=t(5893),u=t(9980)(),h=t(6649);u.use(h,{throwOnError:!1,errorColor:" #cc0000"});e.default=function(){return(0,s.jsxs)("div",{className:"App",children:[(0,s.jsx)(i.Z,{minimal:!0}),(0,s.jsxs)(r.Z,{children:[(0,s.jsx)(c.Z,{}),(0,s.jsx)(a.Z,{}),(0,s.jsx)(l.Z,{id:"blog-homepage",offset:0,minHeight:"90vh",invert:!0,children:"Still in construction"})]}),(0,s.jsx)(o.Z,{})]})}},9888:function(n,e,t){"use strict";var i,r=t(2809),o=t(2209),c=t(7294),a=t(4514),l=t(5893);function s(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}var u=a.Z.canvas(i||(i=(0,o.Z)(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: -1;\n    width: 100%;\n    min-height: 100vh;\n    background-image: linear-gradient(to bottom, "," 20%, rgb(87, 111, 116));\n"])),(function(n){return n.lightmode?"rgb(220, 220, 220)":"black"}));e.Z=function(n){var e=(0,c.useRef)(null),t=null,i=null,o=[],a=null,h=!1,d=function(){var e=.5*(Math.random()+1);return{x:Math.random()*t.width,y:Math.random()*t.height,radius:2*e+1.5,opacity:e,color:n.lightmode?"rgb(50, 50, 50)":"#aaa",velocity:{x:30*(Math.random()-.5),y:30*(Math.random()-.5)}}},f=Date.now(),p=function n(){i.clearRect(0,0,t.width,t.height),i.globalAlpha=1;var e=Date.now(),r=e-f;f=e,t&&(o.forEach((function(n,e){!function(n,e){(n.x>t.width||n.x<0)&&(n.velocity.x=-n.velocity.x),(n.y>t.height||n.y<0)&&(n.velocity.y=-n.velocity.y),n.x+=n.velocity.x*e,n.y+=n.velocity.y*e}(n,r/1e3),function(n){i.beginPath(),i.arc(n.x,n.y,n.radius,0,2*Math.PI),i.fillStyle=n.color,i.globalAlpha=n.opacity,i.fill()}(n),function(n,e){for(var t=e+1;t<o.length;t++){var r=o[t],c=Math.abs(r.x-n.x),a=Math.abs(r.y-n.y),l=Math.sqrt(c*c+a*a),s=n.radius+r.radius;l<=110&&l>s&&(i.beginPath(),i.strokeStyle=n.color,i.globalAlpha=(110-l)/110*n.opacity*r.opacity,i.lineWidth=.7,i.moveTo(n.x,n.y),i.lineTo(r.x,r.y),i.stroke())}}(n,e)})),requestAnimationFrame(n))},x=function(n){a.x=n.clientX+n.clientX/t.width*10,a.y=n.clientY},g=(0,c.useState)({width:0,height:0}),b=g[0],m=g[1];return(0,c.useEffect)((function(){function n(){m({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}}),[]),(0,c.useEffect)((function(){return t=e.current,i=t.getContext("2d"),h||(!function(){for(var n=t.width*t.height/6e3,e=0;e<n;e++){var i=d();o.push(i)}(a=d()).color="orange",a.redius=2.5,a.opacity=.7,a.velocity.x=0,a.velocity.y=0,o.push(a)}(),h=!0),requestAnimationFrame(p),window.addEventListener("mousemove",x),function(){return window.removeEventListener("mousemove",x)}}),[b]),(0,l.jsx)(u,function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?s(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}({lightmode:n.lightmode,width:b.width,height:b.height,ref:e},n))}},7121:function(n,e,t){"use strict";var i,r,o=t(2209),c=(t(7294),t(4514)),a=t(7625),l=t(1417),s=t(9398),u=t(5893),h=c.Z.div({position:"fixed",right:"15px",top:"40%",display:"flex",flexDirection:"column"}),d=c.Z.a(i||(i=(0,o.Z)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 24px;\n    width: 40px;\n    height: 40px;\n    border: 1px solid #FFFFFF;\n    text-decoration: none;\n    margin: 5px 5px;\n    background: transparent;\n    border-radius: 100%;\n    cursor: pointer;\n    transition: background 0.1s ease-in;\n    :hover {\n        background: orange;\n        border: 1px solid orange;\n    }\n"]))),f=(0,c.Z)(a.G)(r||(r=(0,o.Z)(["\n    color: #FFFFFF;\n"])));e.Z=function(){var n=[{href:"mailto:aghiles.kebaili.1998@gmail.com",icon:s.FU$},{href:"https://www.linkedin.com/in/aghiles-kebaili/",icon:l.D9H},{href:"https://github.com/Arksyd96",icon:l.zhw}];return(0,u.jsx)(h,{children:n.map((function(n,e){return(0,u.jsx)(d,{href:n.href,target:0!==e?"_blank":"",children:(0,u.jsx)(f,{icon:n.icon})},e)}))})}},1846:function(n,e,t){"use strict";var i,r=t(2209),o=(t(7294),t(4514)),c=t(5893),a=o.Z.footer(i||(i=(0,r.Z)(["\n    display: flex;\n    width: 100%;\n    height: 10vh;\n    background: transparent;\n    backdrop-filter: blur(4px);\n    color: orange;\n    box-shadow: rgba(50, 50, 93, 0.25) 0px -13px 27px -5px, rgba(80, 80, 80, 0.3) 0px -8px 16px -8px;\n    align-items: center;\n    justify-content: center;\n"])));e.Z=function(n){return(0,c.jsx)(a,{children:"Designed and built with \u2764\ufe0f by Kebaili Aghiles."})}},2986:function(n,e,t){"use strict";var i,r,o=t(2209),c=t(4514),a=t(1664),l=t(7294),s=t(5893),u=c.Z.header({position:"fixed",top:"0",display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",width:"100%",height:"10vh",padding:"0 10%",boxSizing:"border-box",alignSelf:"center",transition:"all .5s ease",backdropFilter:"blur(6px)",boxShadow:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(80, 80, 80, 0.3) 0px 8px 16px -8px",backgroundColor:"rgba(20, 20, 20, 0.5)",zIndex:"11"}),h=c.Z.ul({display:"flex",listStyle:"none",flexDirection:"row"}),d=c.Z.div(i||(i=(0,o.Z)(["\n    display: flex;\n    width: 8%;\n    height: 50%;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-position: center;\n    cursor: pointer;\n"]))),f=c.Z.a(r||(r=(0,o.Z)(["\n    color: #FFFFFF;\n    text-decoration: none;\n    font-weight: bold;\n    transition: width .5s ease, color .5s ease;\n    cursor: pointer;\n    margin-left: 30px;\n    :hover {\n        color: orange;\n    }\n    :before {\n        content: '",". ';\n        color: orange;\n    }\n"])),(function(n){return n.number}));e.Z=function(n){return(0,s.jsxs)(u,{children:[(0,s.jsx)(d,{className:"logo-container",onClick:function(){window.scrollTo(0,0)}}),(0,s.jsx)("nav",{children:(0,s.jsx)(h,{children:n.minimal?(0,s.jsx)(a.default,{href:"/",children:(0,s.jsx)(f,{number:"1",children:"Home"})}):(0,s.jsxs)(l.Fragment,{children:[(0,s.jsx)(f,{number:"1",href:"#curriculum",children:"Curriculum"}),(0,s.jsx)(f,{number:"2",href:"#projects",children:"Projects"}),(0,s.jsx)(f,{number:"3",href:"#contact",children:"Contact"}),(0,s.jsx)(a.default,{href:"/blog",children:(0,s.jsx)(f,{number:"4",children:"Blog"})})]})})})]})}},8611:function(n,e,t){"use strict";t(7294);var i=t(4514),r=t(5893),o=i.Z.main({margin:"0% 10%",boxSizing:"border-box"});e.Z=function(n){return(0,r.jsx)(o,{children:n.children})}},2619:function(n,e,t){"use strict";var i,r=t(2209),o=t(7294),c=t(4514),a=t(5893),l=c.Z.section(i||(i=(0,r.Z)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    position: relative;\n    top: ",";\n    color: #ffffff;\n    min-height: ",";\n    opacity: 0;\n    transition: all 0.6s ease-in-out;\n"])),(function(n){return n.invert?"-50px":"50px"}),(function(n){return n.minHeight})),s={top:0,opacity:1};e.Z=function(n){var e=(0,o.useState)(!n.apply),t=e[0],i=e[1],r=(0,o.useCallback)((function(){window.scrollY>=n.offset&&i(!0)}),[n.offset]);return(0,o.useEffect)((function(){return window.addEventListener("scroll",r),function(){window.removeEventListener("scroll",r)}})),(0,a.jsx)(l,{style:t?s:null,invert:n.invert,minHeight:n.minHeight,id:n.id,children:n.children})}},5809:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return t(2695)}])}},function(n){n.O(0,[774,523,112,32,208,888,179],(function(){return e=5809,n(n.s=e);var e}));var e=n.O();_N_E=e}]);