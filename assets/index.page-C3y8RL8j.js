import{d as _,e,m as l,f as c,g as p,n as r,o as h,q as g,h as M,r as P,s as u,t as b,M as x,i as y,j as f,u as v}from"./index-HjqQL4lh.js";const o=class o{constructor(){this.imageSrc="",this.imageAlt="",this.title=""}};o.ɵfac=function(t){return new(t||o)},o.ɵcmp=_({type:o,selectors:[["app-banner"]],inputs:{imageSrc:"imageSrc",imageAlt:"imageAlt",title:"title"},decls:5,vars:3,consts:[[1,"banner"],[1,"banner-image",3,"src","alt"],[1,"banner-content"]],template:function(t,n){t&1&&(e(0,"section",0),l(1,"img",1),e(2,"div",2)(3,"h1"),c(4),p()()()),t&2&&(r(),h("src",n.imageSrc,P)("alt",n.imageAlt),r(3),g(n.title))},dependencies:M(o,[]),styles:[`.banner[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  height: 400px;
  padding-top: 64px;
  margin-top: 0;
}
.banner[_ngcontent-%COMP%]   .banner-image[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner[_ngcontent-%COMP%]   .banner-content[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
}
.banner[_ngcontent-%COMP%]   .banner-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 2.5rem;
}
@media (max-width: 600px) {
  .banner[_ngcontent-%COMP%] {
    height: 250px;
  }
  .banner[_ngcontent-%COMP%]   .banner-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 2rem;
  }
}`]});let m=o;function w(C,i){if(C&1&&(e(0,"div",2),l(1,"img",5),e(2,"div",6)(3,"h3"),c(4),p(),e(5,"p"),c(6),p()()()),C&2){const t=i.$implicit;r(),h("src",t.image,P)("alt",t.title),r(3),g(t.title),r(2),g(t.description)}}const s=class s{constructor(){this.title="ویلاهای پرطرفدار",this.properties=[]}};s.ɵfac=function(t){return new(t||s)},s.ɵcmp=_({type:s,selectors:[["app-featured-properties"]],inputs:{title:"title",properties:"properties"},decls:10,vars:1,consts:[[1,"property-listings"],[1,"properties-grid"],[1,"property-card"],[1,"more-properties-button"],["mat-raised-button","","routerLink","/properties","color","accent"],[1,"property-image",3,"src","alt"],[1,"property-info"]],template:function(t,n){t&1&&(e(0,"section",0)(1,"h2"),c(2),p(),e(3,"div",1),u(4,w,7,4,"div",2,v),p(),e(6,"div",3)(7,"a",4),c(8,"مشاهده تمام ویلاها"),p()()(),l(9,"router-outlet")),t&2&&(r(2),g(n.title),r(2),b(n.properties))},dependencies:M(s,[x,y,f]),styles:[`.property-listings[_ngcontent-%COMP%] {
  padding: 2rem;
}
.property-listings[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2.5rem;
}
.property-listings[_ngcontent-%COMP%]   .properties-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1200px) {
  .property-listings[_ngcontent-%COMP%]   .properties-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .property-listings[_ngcontent-%COMP%]   .properties-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .property-listings[_ngcontent-%COMP%]   .properties-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%] {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%]   .property-info[_ngcontent-%COMP%] {
  padding: 1rem;
  text-align: center;
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
}
.property-listings[_ngcontent-%COMP%]   .property-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
.property-listings[_ngcontent-%COMP%]   .more-properties-button[_ngcontent-%COMP%] {
  text-align: center;
  margin-top: 2rem;
}`]});let d=s;const a=class a{constructor(){this.properties=[{image:"/images/3.jpg",title:"ویلا دوبلکس مدرن(  شمالی )",description:"۵۰۰ متر تا دریا، سکوت و آرامش"},{image:"/images/1.jpeg",title:"ویلا دوبلکس مدرن( جنوبی )",description:"۳ اتاق خواب، استخر و پارکینگ"},{image:"/images/pamchal/3.JPEG",title:"فلت مدرن  ۱۶۰ متری",description:"دنج و با صفا و آرام ده دقیقه تا ساحل، فرنیش کامل"},{image:"/images/shirinbol/4.jpg",title:"ویلا باغ لوکس",description:"شیک، دنج، سرسبز، خلوت و آرام"}]}};a.ɵfac=function(t){return new(t||a)},a.ɵcmp=_({type:a,selectors:[["app-home"]],decls:2,vars:2,consts:[["imageSrc","/images/index-banner.jpeg","imageAlt","Toghdar Banner","title","ویلاهای ساحلی فرح آباد"],[3,"title","properties"]],template:function(t,n){t&1&&l(0,"app-banner",0)(1,"app-featured-properties",1),t&2&&(r(),h("title","ویلاهای ویژه")("properties",n.properties))},dependencies:M(a,[m,d,y,f]),styles:[`[_nghost-%COMP%] {
  display: block;
}`]});let O=a;export{O as default};
