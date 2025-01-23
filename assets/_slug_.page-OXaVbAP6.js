import{v as l,w as d,x as p,y as _,d as g,e as a,f as i,z as m,g as c,B as f,n as o,E as r,F as h,h as y,i as b,j as C,l as k}from"./index-HjqQL4lh.js";const v=["slug",""],t=class t{constructor(){this.route=l(d),this.slug=this.route.paramMap.pipe(p(n=>n.get("slug"))),this.count=_(0),this.route,this.slug;const s=this.count;function e(){s.set(s()+1)}this.add=e.bind(this)}};t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["","slug",""],["Slug"]],attrs:v,decls:6,vars:4,consts:[[1,"container"],[3,"click"]],template:function(e,n){e&1&&(a(0,"h2"),i(1),m(2,"async"),c(),a(3,"div",0)(4,"button",1),f("click",function(){return n.add()}),i(5),c()()),e&2&&(o(),r("Current Magic Type: ",h(2,2,n.slug),""),o(4),r("Clicked ",n.count()," times"))},dependencies:y(t,[b,C]),styles:[`.container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
}

button[_ngcontent-%COMP%] {
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}`],changeDetection:k.OnPush});let u=t;export{u as default};
