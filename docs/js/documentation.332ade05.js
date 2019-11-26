(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["documentation"],{"00d1":function(t,e,n){},"102b":function(t,e,n){},3069:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"documentation flex flex-1"},[n("MazSidebar",{attrs:{width:250},model:{value:t.hasLeftSidebarOpen,callback:function(e){t.hasLeftSidebarOpen=e},expression:"hasLeftSidebarOpen"}},[n("LeftSidebarContent")],1),n("div",{staticClass:"documentation__container flex-1"},[n("div",{staticClass:"flex justify-content-between px-5 py-3"},[n("h2",[t._v(" "+t._s(t._f("capitalize")(t.currentComponent))+" ")]),n("MazBtn",{attrs:{size:"sm"},on:{click:t.showOptions}},[t._v(" Show options ")])],1),n("router-view",{staticClass:"px-5 py-3"}),n("NavFooter")],1),n("MazSidebar",{attrs:{width:500,right:"",absolute:"","no-close-btn":""},model:{value:t.hasRightSidebarOpen,callback:function(e){t.hasRightSidebarOpen=e},expression:"hasRightSidebarOpen"}},[n("div",{staticClass:"p-2"},[n("h3",{staticClass:"mb-2"},[t._v(" "+t._s(t._f("capitalize")(t.currentComponent))+" ")]),n("h4",{staticClass:"mb-2"},[t._v(" Props API ")]),n("table",[n("tr",[n("th",[t._v("Props")]),n("th",[t._v("Type")]),n("th",[t._v("Default")])]),t._l(t.currentProps,(function(e,a){return n("tr",{key:a,staticClass:"prop"},[n("td",[t._v(t._s(e[0]))]),n("td",[t._v(t._s(e[1].type.name))]),n("td",[t._v(" "+t._s(("function"===typeof e[1].default?e[1].default.name:!1===e[1].default?"false":e[1].default)||"null")+" ")])])}))],2)])])],1)},s=[],o=(n("fb6a"),n("b0c0"),n("4fad"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"left-sidebar-content p-4 h-100"},[n("h3",{staticClass:"mb-3"},[t._v(" Development ")]),t._l(t.routesStartedDoc,(function(e){return n("router-link",{key:e.name,staticClass:"menu-item btn btn-white btn-sm mb-2 w-100",attrs:{to:{name:e.name}}},[t._v(" "+t._s(t._f("capitalize")(t.getRouteName(e.path)))+" ")])})),n("h3",{staticClass:"my-3"},[t._v(" Components ")]),n("div",{staticClass:"left-sidebar-content__content"},t._l(t.routesComponents,(function(e){return n("router-link",{key:e.name,staticClass:"menu-item btn btn-white btn-sm mb-2 w-100",attrs:{to:{name:e.name}}},[t._v(" "+t._s(t._f("capitalize")(t.getRouteName(e.path)))+" ")])})),1)],2)}),i=[],r=(n("4de4"),n("ed08")),c={name:"LeftSidebarContent",computed:{routesStartedDoc:function(){return this.$router.options.routes.filter((function(t){return"/documentation"===t.path}))[0].children.filter((function(t){return"Install"===t.name||"GetStarted"===t.name}))},routesComponents:function(){return this.$router.options.routes.filter((function(t){return"/documentation"===t.path}))[0].children.filter((function(t){return"Install"!==t.name&&"GetStarted"!==t.name}))}},methods:{getRouteName:function(t){return Object(r["b"])(t,"-"," ")}}},l=c,u=(n("3d5d"),n("2877")),f=Object(u["a"])(l,o,i,!1,null,"04f60018",null),d=f.exports,m=n("cef0"),p=n("34e9"),h={name:"Documentation",components:{LeftSidebarContent:d,MazBtn:p["a"],MazInput:p["d"],MazPhoneNumberInput:p["f"],MazSelect:p["g"],MazSwitch:p["j"],MazCheckbox:p["b"],MazDialog:p["c"],MazLoader:p["e"],MazSidebar:p["h"],MazSpinner:p["i"],MazTransitionExpand:p["k"],NavFooter:m["a"]},data:function(){return{hasLeftSidebarOpen:!0,hasRightSidebarOpen:!1}},computed:{currentComponent:function(){return this.$route.name.slice(0,-3)},currentProps:function(){return Object.entries(this.$options.components[this.currentComponent].props)}},methods:{showOptions:function(){this.hasRightSidebarOpen=!this.hasRightSidebarOpen}}},b=h,_=(n("87cd"),Object(u["a"])(b,a,s,!1,null,"0e886e9c",null));e["default"]=_.exports},"3d5d":function(t,e,n){"use strict";var a=n("00d1"),s=n.n(a);s.a},"5c1b":function(t,e,n){},"87cd":function(t,e,n){"use strict";var a=n("102b"),s=n.n(a);s.a},cef0:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"nav-footer flex-fixed",attrs:{role:"contentinfo"}},[n("nav",{staticClass:"nav-footer-content container flex align-center justify-content-between py-4"},[n("div",{staticClass:"flex flex-direction-column"},[n("RouterLink",{attrs:{to:{name:"Documentation"}}},[t._v(" Documentation ")])],1),t._m(0),n("SocialButtons",{staticClass:"flex align-center"})],1),t._m(1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav-footer-content__logo"},[a("img",{staticClass:"nav-footer-content__logo__img",attrs:{src:n("4ffd"),alt:"logo-loic-mazuel"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-footer-subs py-2"},[n("div",{staticClass:"container flex flex-end"},[n("a",{staticClass:"flex align-center",attrs:{href:"https://www.loicmazuel.com/",target:"_blank"}},[n("p",{staticClass:"fs-14"},[t._v(" © Loïc Mazuel | Website made with VueJS ")])])])])}],o=n("2eb3"),i={name:"NavFooter",components:{SocialButtons:o["a"]}},r=i,c=(n("def4"),n("2877")),l=Object(c["a"])(r,a,s,!1,null,"29ccc0b0",null);e["a"]=l.exports},def4:function(t,e,n){"use strict";var a=n("5c1b"),s=n.n(a);s.a}}]);
//# sourceMappingURL=documentation.332ade05.js.map