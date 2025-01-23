import{v as m,H as P,V as O,G as b,I as w,x as I,J as T,d as k,e,z as F,s as x,g as r,K as u,n as i,o as _,F as $,t as f,L as v,h as L,C as B,M as V,O as E,j as H,P as S,Q as j,S as A,T as q,B as z,U as D,W as g,X as R,f as s,Y as U,E as d,q as h,m as p,r as Y,Z as G}from"./index-HjqQL4lh.js";import{M as J}from"./card-DDDY7WPI.js";const y=(o,n)=>n.id,K=(o,n)=>n.propertyId,Q=o=>["/properties",o];function W(o,n){if(o&1){const t=q();e(0,"a",4),z("click",function(){const l=D(t).$implicit,M=g();return R(M.scrollToCategory(l))}),s(1),r()}if(o&2){const t=n.$implicit,a=g();U("active",a.activeCategory===t.id),i(),d(" ",t.name," ")}}function X(o,n){o&1&&(e(0,"div",10),p(1,"mat-icon",17),e(2,"span"),s(3,"دارای باغچه"),r()())}function Z(o,n){if(o&1&&(e(0,"mat-card",7),p(1,"img",8),e(2,"mat-card-content")(3,"h3"),s(4),r(),e(5,"div",9)(6,"div",10),p(7,"mat-icon",11),e(8,"span"),s(9),r()(),e(10,"div",10),p(11,"mat-icon",12),e(12,"span"),s(13),r()(),e(14,"div",10),p(15,"mat-icon",13),e(16,"span"),s(17),r()(),e(18,"div",10),p(19,"mat-icon",14),e(20,"span"),s(21),r()(),u(22,X,4,0,"div",10),r(),e(23,"p",15),s(24),r()(),e(25,"mat-card-actions")(26,"a",16),s(27,"جزئیات بیشتر"),r()()()),o&2){const t=n.$implicit;i(),_("src",t.coverImage,Y)("alt",t.title),i(3),h(t.title),i(5),d("",t.plotArea," متر مربع"),i(4),d("",t.plotArea," متر مربع"),i(4),d("",t.bedrooms," خواب"),i(4),d("",t.bathrooms," سرویس"),i(),v(t.landscape?22:-1),i(2),d(" قیمت: ",t.price," تومان "),i(2),_("routerLink",G(10,Q,t.propertyId))}}function N(o,n){o&1&&p(0,"mat-divider")}function tt(o,n){if(o&1&&(e(0,"section",5)(1,"h2"),s(2),r(),e(3,"div",6),x(4,Z,28,12,"mat-card",7,K),r()(),u(6,N,1,0,"mat-divider")),o&2){const t=n.$implicit,a=n.$index,l=n.$count;_("id",t.id),i(2),h(t.name),i(2),f(t.properties),i(2),v(a!==l-1?6:-1)}}function nt(o,n){if(o&1&&(e(0,"div",3),x(1,tt,7,3,null,null,y),r()),o&2){const t=g();i(),f(t.categories)}}const c=class c{constructor(){this.http=m(P),this.viewportScroller=m(O),this.breakpointObserver=m(b),this.categories=[],this.activeCategory="",this.isHandset$=this.breakpointObserver.observe(w.Handset).pipe(I(n=>n.matches),T())}ngOnInit(){this.http.get("/data/property-listings.json").subscribe({next:n=>{this.categories=n.categories},error:n=>{}})}ngAfterViewInit(){const n=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(this.activeCategory=a.target.id)})},{rootMargin:"-20% 0px -80% 0px"});this.categories.forEach(t=>{const a=document.getElementById(t.id);a&&n.observe(a)})}scrollToCategory(n){document.getElementById(n.id)?.scrollIntoView({behavior:"smooth"})}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=k({type:c,selectors:[["app-properties-list"]],decls:8,vars:4,consts:[[1,"properties-container"],["mode","side",1,"categories-nav",3,"opened"],["mat-list-item","",3,"active"],[1,"properties-content"],["mat-list-item","",3,"click"],[3,"id"],[1,"property-grid"],["appearance","outlined",1,"property-card"],["mat-card-image","",1,"property-image",3,"src","alt"],[1,"property-features"],[1,"feature"],["svgIcon","square_foot"],["svgIcon","foundation"],["svgIcon","bed"],["svgIcon","bathtub"],[1,"price"],["mat-button","","color","primary",3,"routerLink"],["svgIcon","landscape"]],template:function(t,a){t&1&&(e(0,"mat-sidenav-container",0)(1,"mat-sidenav",1),F(2,"async"),e(3,"mat-nav-list"),x(4,W,2,3,"a",2,y),r()(),e(6,"mat-sidenav-content"),u(7,nt,3,0,"div",3),r()()),t&2&&(i(),_("opened",!$(2,2,a.isHandset$)),i(3),f(a.categories),i(3),v(a.categories?7:-1))},dependencies:L(c,[B,J,V,E,H,S,j,A]),styles:[`.property-features[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0;
}

.feature[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mat-text-secondary-color);
}
.feature[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
}

.price[_ngcontent-%COMP%] {
  margin-top: 16px;
  font-weight: 500;
}

.properties-container[_ngcontent-%COMP%] {
  height: calc(100vh - 64px);
  overflow: hidden;
}

.properties-content[_ngcontent-%COMP%] {
  padding: 24px 32px;
  overflow-y: auto;
}

.categories-nav[_ngcontent-%COMP%] {
  width: 280px;
  padding: 24px 0;
  border-radius: 0;
}
.categories-nav[_ngcontent-%COMP%]   mat-nav-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

section[_ngcontent-%COMP%] {
  margin-bottom: 48px;
  scroll-margin-top: 80px;
}

.property-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin: 24px 0;
}

.property-card[_ngcontent-%COMP%] {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  transition: transform 0.2s ease-in-out;
}
.property-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
}

.property-image[_ngcontent-%COMP%] {
  object-fit: cover;
  height: 200px;
  width: 100%;
  border-radius: 16px 16px 0 0;
}

mat-card-content[_ngcontent-%COMP%] {
  flex-grow: 1;
  padding: 16px;
}

mat-card-actions[_ngcontent-%COMP%] {
  padding: 8px 16px 16px;
}

mat-divider[_ngcontent-%COMP%] {
  margin: 48px 0;
}

@media (max-width: 1024px) {
  .property-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .properties-content[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .property-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}`]});let C=c;export{C as default};
