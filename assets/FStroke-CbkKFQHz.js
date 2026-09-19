import{r as e,s as t,t as n,u as r}from"./jsx-runtime-CYw-Im19.js";import{a as i,n as a,t as o}from"./OrbitControls-C-HClrqf.js";import{t as s}from"./Environment-C6iVRj83.js";var c=r(t(),1),l=n();function u(){let{scene:e}=a(`/showroom-1/models/Four_stroke6.glb`);return(0,l.jsx)(`primitive`,{object:e,scale:1,position:[0,0,0],rotation:[0,0,0]})}function d(){return(0,l.jsxs)(`div`,{style:{width:`100vw`,height:`100vh`,position:`relative`,background:`
          linear-gradient(
            to bottom,
            #55c7df 0%,
            #087da8 18%,
            #064d78 45%,
            #032b50 70%,
            #01152d 100%
          )
        `},children:[(0,l.jsx)(e,{to:`/`,style:{position:`absolute`,top:`20px`,left:`20px`,zIndex:10,padding:`12px 18px`,background:`#111`,color:`white`,textDecoration:`none`,borderRadius:`10px`,border:`1px solid #333`,fontFamily:`Arial, sans-serif`},children:`← Back to Showroom`}),(0,l.jsx)(`div`,{style:{position:`absolute`,top:`120px`,right:`20px`,zIndex:10,padding:`12px 18px`,background:`#2cf803`,color:`black`,borderRadius:`10px`,border:`1px solid #333`,fontFamily:`Arial, sans-serif`,fontSize:`14px`},children:`Mouse to scroll and zoom`}),(0,l.jsx)(i,{orthographic:!0,camera:{position:[0,0,10],zoom:100},children:(0,l.jsxs)(c.Suspense,{fallback:null,children:[(0,l.jsx)(`ambientLight`,{intensity:1}),(0,l.jsx)(`directionalLight`,{position:[5,5,5],intensity:2}),(0,l.jsx)(u,{}),(0,l.jsx)(s,{preset:`warehouse`}),(0,l.jsx)(o,{makeDefault:!0})]})})]})}export{d as default};