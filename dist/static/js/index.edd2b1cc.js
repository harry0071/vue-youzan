webpackJsonp([4],{"035s":function(t,n){},"97Sy":function(t,n){},EAqx:function(t,n){},OgVB:function(t,n){},TFhR:function(t,n,i){"use strict";var e={hotLists:"/index/hotLists",bannerLists:"/index/bannerLists",kinds:"/category/kinds",items:"/category/items",searchHotItems:"/search/hotItems",goodsDetail:"/goods/details",goodsDeal:"/goods/deal",cartLists:"/cart/lists",mylists:"/address/mylists"};for(var s in e)e[s]="https://easy-mock.com/mock/5b0f9157b6b9de5a525896c6/youzan"+e[s];n.a=e},"U/rD":function(t,n,i){"use strict";var e=i("mw3O"),s=(i.n(e).a.parse(location.search.substring(1)).page,[{name:"有赞",icon:"icon-home",link:"index.html"},{name:"分类",icon:"icon-category",link:"category.html"},{name:"购物车",icon:"icon-cart",link:"cart.html"},{name:"我",icon:"icon-user",link:"member.html"}]),a={props:["pageIndex"],data:function(){return{navConfig:s}}},o={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"bottom-nav"},[i("ul",t._l(t.navConfig,function(n,e){return i("li",{class:{active:e==t.pageIndex}},[i("a",{attrs:{href:n.link}},[i("i",{class:n.icon}),i("div",[t._v(t._s(n.name))])])])}))])},staticRenderFns:[]};var c={components:{FooterNav:i("VU/8")(a,o,!1,function(t){i("xGLe")},null,null).exports}};n.a=c},U67u:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i("97Sy"),s=(i.n(e),i("bCKv")),a=i.n(s),o=i("OgVB"),c=(i.n(o),i("/Lyv")),r=i.n(c),l=i("035s"),u=(i.n(l),i("eChN")),d=(i.n(u),i("7+uW")),m=i("mtWM"),h=i.n(m),f=i("TFhR"),g=i("U/rD"),p=i("gN+L");document.documentElement.clientWidth>768&&r.a.confirm("您似乎正在使用PC端，是否跳转到手机预览模式?").then(function(t){location.href="http://harry0071.coding.me/device-mock?color=yellow&site=http://harry0071.coding.me/youzan"}),d.default.use(a.a);new d.default({el:"#app",components:{Swipe:p.a},data:{lists:null,pageNum:1,notloading:!1,allLoaded:!1,bannerLists:null},mixins:[g.a],created:function(){this.getBannerLists()},methods:{getHotLists:function(){var t=this;this.notloading||(this.notloading=!0,h.a.get(f.a.hotLists,{params:{pageNum:this.pageNum,limit:8}}).then(function(n){var i=n.data.lists;t.lists?t.lists=t.lists.concat(i):t.lists=i,t.pageNum++,t.pageNum>5?t.allLoaded=!0:t.notloading=!1}).catch(function(t){document.write(t)}))},getBannerLists:function(){var t=this;h.a.get(f.a.bannerLists).then(function(n){var i=n.data;return t.bannerLists=i.lists}).catch(function(t){document.write(t)})}}})},eChN:function(t,n){},"gN+L":function(t,n,i){"use strict";var e=i("DNVT"),s=(i("mgS3"),{name:"swipe",props:["bannerLists"],mounted:function(){new e.a(".swiper-container",{pagination:{el:".swiper-pagination",clickable:!0},loop:!0,autoplay:{delay:4e3,disableOnInteraction:!1}})}}),a={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"swiper-container"},[n("div",{staticClass:"swiper-wrapper"},this._l(this.bannerLists,function(t){return n("div",{staticClass:"swiper-slide"},[n("a",{staticClass:"js-no-follow",attrs:{href:t.link}},[n("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])})),this._v(" "),n("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var o=i("VU/8")(s,a,!1,function(t){i("EAqx")},null,null);n.a=o.exports},mgS3:function(t,n){},xGLe:function(t,n){}},["U67u"]);