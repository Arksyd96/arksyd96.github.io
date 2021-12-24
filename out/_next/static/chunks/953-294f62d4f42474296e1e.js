"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[953],{9888:function(n,e,t){var i,r=t(92809),o=t(52209),a=t(67294),c=t(22636),l=t(85893);function s(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}var d=c.Z.canvas(i||(i=(0,o.Z)(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: -1;\n    width: 100%;\n    min-height: 100vh;\n    background-image: linear-gradient(to bottom,  black 20%, rgb(87, 111, 116));\n"])));e.Z=function(n){var e=(0,a.useRef)(null),t=null,i=null,o=[],c=null,h=!1,u=function(){var n=.5*(Math.random()+1);return{x:Math.random()*t.width,y:Math.random()*t.height,radius:2*n+1.5,opacity:n,color:"#aaa",velocity:{x:30*(Math.random()-.5),y:30*(Math.random()-.5)}}},f=Date.now(),p=function n(){i.clearRect(0,0,t.width,t.height),i.globalAlpha=1;var e=Date.now(),r=e-f;f=e,t&&(o.forEach((function(n,e){!function(n,e){(n.x>t.width||n.x<0)&&(n.velocity.x=-n.velocity.x),(n.y>t.height||n.y<0)&&(n.velocity.y=-n.velocity.y),n.x+=n.velocity.x*e,n.y+=n.velocity.y*e}(n,r/1e3),function(n){i.beginPath(),i.arc(n.x,n.y,n.radius,0,2*Math.PI),i.fillStyle=n.color,i.globalAlpha=n.opacity,i.fill()}(n),function(n,e){for(var t=e+1;t<o.length;t++){var r=o[t],a=Math.abs(r.x-n.x),c=Math.abs(r.y-n.y),l=Math.sqrt(a*a+c*c),s=n.radius+r.radius;l<=110&&l>s&&(i.beginPath(),i.strokeStyle=n.color,i.globalAlpha=(110-l)/110*n.opacity*r.opacity,i.lineWidth=.7,i.moveTo(n.x,n.y),i.lineTo(r.x,r.y),i.stroke())}}(n,e)})),requestAnimationFrame(n))},x=function(n){c.x=n.clientX+n.clientX/t.width*10,c.y=n.clientY},g=(0,a.useState)({width:0,height:0}),b=g[0],m=g[1];return(0,a.useEffect)((function(){function n(){m({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}}),[]),(0,a.useEffect)((function(){return t=e.current,i=t.getContext("2d"),h||(!function(){for(var e=n.enableParticles?t.width*t.height/6e3:0,i=0;i<e;i++){var r=u();o.push(r)}(c=u()).color="orange",c.redius=2.5,c.opacity=.7,c.velocity.x=0,c.velocity.y=0,o.push(c)}(),h=!0),requestAnimationFrame(p),window.addEventListener("mousemove",x),function(){return window.removeEventListener("mousemove",x)}}),[b,n.enableParticles]),(0,l.jsx)(d,function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?s(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}({width:b.width,height:b.height,ref:e},n))}},87121:function(n,e,t){var i,r,o=t(52209),a=(t(67294),t(22636)),c=t(17625),l=t(51417),s=t(51436),d=t(85893),h=a.Z.div({position:"fixed",right:"15px",top:"40%",display:"flex",flexDirection:"column"}),u=a.Z.a(i||(i=(0,o.Z)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 24px;\n    width: 40px;\n    height: 40px;\n    border: 1px solid #FFFFFF;\n    text-decoration: none;\n    margin: 5px 5px;\n    background: transparent;\n    border-radius: 100%;\n    cursor: pointer;\n    transition: background 0.1s ease-in;\n    :hover {\n        background: orange;\n        border: 1px solid orange;\n    }\n    @media (max-width: 768px) {\n        display: none;\n    }\n"]))),f=(0,a.Z)(c.G)(r||(r=(0,o.Z)(["\n    color: #FFFFFF;\n"])));e.Z=function(){var n=[{href:"mailto:aghiles.kebaili.1998@gmail.com",icon:s.FU$},{href:"https://www.linkedin.com/in/aghiles-kebaili/",icon:l.D9H},{href:"https://github.com/Arksyd96",icon:l.zhw}];return(0,d.jsx)(h,{children:n.map((function(n,e){return(0,d.jsx)(u,{href:n.href,target:0!==e?"_blank":"",children:(0,d.jsx)(f,{icon:n.icon})},e)}))})}},71472:function(n,e,t){var i,r=t(52209),o=(t(67294),t(22636)),a=t(85893),c=o.Z.input(i||(i=(0,r.Z)(['\n    appearance: none;\n    cursor: pointer;\n    :focus {\n        outline: none;\n    }\n    height: 32px;\n    width: 52px;\n    border-radius: 16px;\n    display: inline-block;\n    position: fixed;\n    top: 12vh;\n    right: 15px;\n    margin: 0;\n    border: 2px solid #474755;\n    background: white;\n    transition: all 0.2s ease;\n    z-index: 12;\n    :after {\n        content: "";\n        position: absolute;\n        top: 2px;\n        left: 2px;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        background: black;\n        box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);\n        transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);\n    }\n    :checked {\n        border-color: orange;\n        background-color: orange;\n        :after {\n            background: white;\n            transform: translatex(20px);\n        }\n    }\n    @media (max-width: 768px) {\n        top: 8vh;\n        left: 15px;\n    }\n'])));e.Z=function(n){return(0,a.jsx)(c,{type:"checkbox",defaultChecked:!0,onClick:n.onClick})}},94022:function(n,e,t){var i,r=t(52209),o=(t(67294),t(22636)),a=t(85893),c=o.Z.footer(i||(i=(0,r.Z)(["\n    display: flex;\n    width: 100%;\n    height: 10vh;\n    background: transparent;\n    backdrop-filter: blur(4px);\n    color: orange;\n    box-shadow: rgba(50, 50, 93, 0.25) 0px -13px 27px -5px, rgba(80, 80, 80, 0.3) 0px -8px 16px -8px;\n    align-items: center;\n    justify-content: center;\n"])));e.Z=function(n){return(0,a.jsx)(c,{children:"Designed and built with \u2764\ufe0f by Kebaili Aghiles."})}},52986:function(n,e,t){var i,r,o,a,c,l=t(66311),s=t(52209),d=t(22636),h=t(41664),u=t(67294),f=t(85893),p=d.Z.header((function(n){return"\n    position: fixed;\n    top: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-direction: row;\n    width: 100%;\n    height: 10vh;\n    padding: 0 10%;\n    box-sizing: border-box;\n    align-self: center;\n    transition: all 0.5s ease;\n    backdrop-filter: blur(6px);\n    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,\n        rgba(80, 80, 80, 0.3) 0px 8px 16px -8px;\n    background-color: rgba(20, 20, 20, 0.5);\n    z-index: 11;\n    @media (max-width: 768px) {\n        padding: 0 5%;\n        height: 6vh;\n    }\n"})),x=d.Z.ul(i||(i=(0,s.Z)(["\n    display: flex;\n    list-style: none;\n    flex-direction: row;\n"]))),g=d.Z.div(r||(r=(0,s.Z)(["\n    display: flex;\n    width: 10%;\n    height: 100%;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-position: center;\n    cursor: pointer;\n    @media (max-width: 1024px) {\n        width: 15%;\n    }\n    @media (max-width: 768px) {\n        width: 20%;\n    }\n"]))),b=d.Z.a(o||(o=(0,s.Z)(['\n    color: #FFFFFF;\n    text-decoration: none;\n    font-weight: bold;\n    transition: width 0.5s ease, color 0.5s ease;\n    cursor: pointer;\n    margin-left: 30px;\n    :hover {\n        color: orange;\n    }\n    :before {\n        color: orange;\n        content: "','";\n    }\n    @media (max-width: 768px) {\n        font-size: 1.8rem;\n        font-weight: normal;\n        margin: 10px;\n    }\n'])),(function(n){return void 0!==n.number?n.number+". ":""})),m=d.Z.div(a||(a=(0,s.Z)(["\n    background-color: transparent;\n    transform: ",';\n    transition: all 0.2s ease;\n    :after {\n        content: "\\2807";\n        position: relative;\n        right: -5px;\n        font-size: 2.5em;\n        font-weight: bold;\n        color: #ffffff;\n    }\n'],["\n    background-color: transparent;\n    transform: ",';\n    transition: all 0.2s ease;\n    :after {\n        content: "\\\\2807";\n        position: relative;\n        right: -5px;\n        font-size: 2.5em;\n        font-weight: bold;\n        color: #ffffff;\n    }\n'])),(function(n){return n.isOpen?"rotate(0deg)":"rotate(90deg)"})),w=d.Z.div(c||(c=(0,s.Z)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 8vh;\n    right: 15px;\n    width: 60vw;\n    background-color: rgba(50, 50, 50, 0.6);\n    box-shadow: 0px 0px 4px 4px rgba(150, 150, 150, 0.35);\n    backdrop-filter: blur(6px);\n    border-radius: 2px;\n    padding: 1vw;\n    box-sizing: border-box;\n    transform: ",";\n    transition: all 0.5s ease;\n"])),(function(n){return n.isOpen?"translateX(0)":"translateX(120%)"}));e.Z=function(n){var e=u.useState(!1),t=(0,l.Z)(e,2),i=t[0],r=t[1],o=u.useState(!1),a=(0,l.Z)(o,2),c=a[0],s=a[1];(0,u.useEffect)((function(){window.innerWidth<768&&r(!0)}),[]);return(0,f.jsxs)(p,{children:[(0,f.jsx)(g,{className:"logo-container",onClick:function(){window.scrollTo(0,0)}}),(0,f.jsx)("nav",{children:(0,f.jsx)(x,{children:n.blog?i?null:(0,f.jsx)(h.default,{href:"/",children:(0,f.jsx)(b,{number:"1",children:"Home"})}):i?(0,f.jsxs)(u.Fragment,{children:[(0,f.jsx)(m,{isOpen:c,onClick:function(){return s(!c)}}),(0,f.jsxs)(w,{isOpen:c,children:[(0,f.jsx)(b,{href:"https://github.com/Arksyd96",children:"My Github"}),(0,f.jsx)(b,{href:"https://www.linkedin.com/in/aghiles-kebaili/",children:"LinkedIn"}),(0,f.jsx)(b,{href:"#contact",children:"Contact me"})]})]}):(0,f.jsxs)(u.Fragment,{children:[(0,f.jsx)(b,{number:"1",href:"#curriculum",children:"Curriculum"}),(0,f.jsx)(b,{number:"2",href:"#projects",children:"Projects"}),(0,f.jsx)(b,{number:"3",href:"#contact",children:"Contact"}),(0,f.jsx)(h.default,{href:"/blog",children:(0,f.jsx)(b,{number:"4",children:"Blog"})})]})})})]})}},18611:function(n,e,t){var i,r=t(52209),o=(t(67294),t(22636)),a=t(85893),c=o.Z.main(i||(i=(0,r.Z)(["\n    margin: 0 10%;\n    box-sizing: border-box;\n"])));e.Z=function(n){return(0,a.jsx)(c,{blog:n.blog,children:n.children})}},42619:function(n,e,t){var i,r=t(52209),o=t(67294),a=t(22636),c=t(85893),l=a.Z.section(i||(i=(0,r.Z)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    position: relative;\n    top: ",";\n    color: #ffffff;\n    min-height: ",";\n    opacity: 0;\n    transition: all 0.6s ease-in-out;\n    @media (max-width: 768px) {\n        top: ",";\n        min-height: ",";\n        margin-top: 4vh;\n    }\n"])),(function(n){return n.invert?"-50px":"50px"}),(function(n){return n.minHeight}),(function(n){return n.invert?"-50px":"200px"}),(function(n){return n.minHeight})),s={top:0,opacity:1};e.Z=function(n){var e=(0,o.useState)(!n.apply),t=e[0],i=e[1],r=(0,o.useCallback)((function(){var e=window.innerWidth<768;window.scrollY>=n.offset-(e?200:0)&&i(!0)}));return(0,o.useEffect)((function(){return"home"===n.id&&i(!0),window.addEventListener("scroll",r),function(){window.removeEventListener("scroll",r)}})),(0,c.jsx)(l,{style:t?s:null,invert:n.invert,minHeight:n.minHeight,id:n.id,children:n.children})}}}]);