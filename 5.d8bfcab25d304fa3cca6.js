(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Tr4x:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return r})),n.d(e,"d",(function(){return d}));var l=n("Ip0R"),o=n("CcnG");class i{constructor(t,e){this._document=e;const n=this._textarea=this._document.createElement("textarea"),l=n.style;l.position="fixed",l.top=l.opacity="0",l.left="-999em",n.setAttribute("aria-hidden","true"),n.value=t,this._document.body.appendChild(n)}copy(){const t=this._textarea;let e=!1;try{if(t){const n=this._document.activeElement;t.select(),t.setSelectionRange(0,t.value.length),e=this._document.execCommand("copy"),n&&n.focus()}}catch(n){}return e}destroy(){const t=this._textarea;t&&(t.parentNode&&t.parentNode.removeChild(t),this._textarea=void 0)}}let r=(()=>{class t{constructor(t){this._document=t}copy(t){const e=this.beginCopy(t),n=e.copy();return e.destroy(),n}beginCopy(t){return new i(t,this._document)}}return t.\u0275fac=function(e){return new(e||t)(o.sc(l.d))},t.\u0275prov=Object(o.lc)({factory:function(){return new t(Object(o.sc)(l.d))},token:t,providedIn:"root"}),t})();const c=new o.q("CKD_COPY_TO_CLIPBOARD_CONFIG");let u=(()=>{class t{constructor(t,e,n){this._clipboard=t,this._ngZone=e,this.text="",this.attempts=1,this.copied=new o.n,this._pending=new Set,n&&null!=n.attempts&&(this.attempts=n.attempts)}copy(t=this.attempts){if(t>1){let e=t;const n=this._clipboard.beginCopy(this.text);this._pending.add(n);const l=()=>{const t=n.copy();t||!--e||this._destroyed?(this._currentTimeout=null,this._pending.delete(n),n.destroy(),this.copied.emit(t)):this._currentTimeout=this._ngZone.runOutsideAngular(()=>setTimeout(l,1))};l()}else this.copied.emit(this._clipboard.copy(this.text))}ngOnDestroy(){this._currentTimeout&&clearTimeout(this._currentTimeout),this._pending.forEach(t=>t.destroy()),this._pending.clear(),this._destroyed=!0}}return t.\u0275fac=function(e){return new(e||t)(o.oc(r),o.oc(o.z),o.oc(c,8))},t.\u0275dir=o.kc({type:t,selectors:[["","cdkCopyToClipboard",""]],hostBindings:function(t,e){1&t&&o.tc("click",(function(){return e.copy()}))},inputs:{text:["cdkCopyToClipboard","text"],attempts:["cdkCopyToClipboardAttempts","attempts"]},outputs:{copied:"cdkCopyToClipboardCopied"}}),t})(),d=(()=>{class t{}return t.\u0275mod=o.nc({type:t}),t.\u0275inj=o.mc({factory:function(e){return new(e||t)}}),t})()},ZEpu:function(t,e,n){"use strict";n.r(e),n.d(e,"DashboardModuleNgFactory",(function(){return G}));var l=n("CcnG"),o=function(){return function(){}}(),i=n("pMnS"),r=n("ltgo"),c=n("7KAL"),u=n("9gLZ"),d=n("Ip0R"),s=n("28z2"),a=n("iII6"),p=function(){function t(t,e,n,l){var o=this;this.viewportRuler=t,this.firebaseService=e,this.router=n,this.route=l,this.draggable=!1,this.filter=null,this.dropListEnterPredicate=function(t,e){if(e===o.placeholder)return!0;if(e!==o.activeContainer)return!1;var n=o.placeholder.element.nativeElement,l=t.dropContainer.element.nativeElement,i=e.element.nativeElement,r=b(i.parentElement.children,o.source?n:l),c=b(i.parentElement.children,i);return o.source||(o.sourceIndex=r,o.source=t.dropContainer,n.style.width=l.clientWidth+"px",n.style.height=l.clientHeight+"px",l.parentElement.removeChild(l)),o.targetIndex=c,o.target=e,n.style.display="",i.parentElement.insertBefore(n,c>r?i.nextSibling:i),o.placeholder.enterPredicate(t,e),!1},this.target=null,this.source=null}return t.prototype.ngOnInit=function(){var t=this;this.profileCardSub=this.firebaseService.getCardFolder().subscribe((function(e){t.items=e.collectionList,console.log("dashboard: "+JSON.stringify(e))}))},t.prototype.ngAfterViewInit=function(){var t=this.placeholder.element.nativeElement;t.style.display="none",t.parentElement.removeChild(t)},t.prototype.ngOnDestroy=function(){this.profileCardSub.unsubscribe()},t.prototype.routeToEdit=function(t){this.router.navigate([t],{relativeTo:this.route})},t.prototype.add=function(){this.router.navigate(["edit-card"])},t.prototype.dragMoved=function(t){var e=this,n=this.getPointerPositionOnPage(t.event);this.listGroup._items.forEach((function(t){(function(t,e,n){var l=t.element.nativeElement.getBoundingClientRect();return n>=l.top&&n<=l.bottom&&e>=l.left&&e<=l.right})(t,n.x,n.y)&&(e.activeContainer=t)}))},t.prototype.dropListDropped=function(){if(this.target){var t=this.placeholder.element.nativeElement,e=t.parentElement;t.style.display="none",e.removeChild(t),e.appendChild(t),e.insertBefore(this.source.element.nativeElement,e.children[this.sourceIndex]),this.target=null,this.source=null,this.sourceIndex!==this.targetIndex&&Object(r.k)(this.items,this.sourceIndex,this.targetIndex)}},t.prototype.getPointerPositionOnPage=function(t){var e=function(t){return t.type.startsWith("touch")}(t)?t.touches[0]||t.changedTouches[0]:t,n=this.viewportRuler.getViewportScrollPosition();return{x:e.pageX-n.left,y:e.pageY-n.top}},t}();function b(t,e){return Array.prototype.indexOf.call(t,e)}var h=n("ZYCi"),f=l.xb({encapsulation:0,styles:[[".btn-float[_ngcontent-%COMP%]{background-color:#0c9}"]],data:{}});function g(t){return l.bc(0,[(t()(),l.zb(0,0,null,null,14,"div",[["cdkDropList",""],["class","col-sm-6 col-md-4 col-6 cdk-drop-list"]],[[1,"id",0],[2,"cdk-drop-list-disabled",null],[2,"cdk-drop-list-dragging",null],[2,"cdk-drop-list-receiving",null]],[[null,"cdkDropListDropped"]],(function(t,e,n){var l=!0;return"cdkDropListDropped"===e&&(l=!1!==t.component.dropListDropped()&&l),l}),null,null)),l.yb(1,147456,[[2,4]],0,r.f,[l.l,r.h,l.h,c.b,[2,u.b],[3,r.d],[2,r.a]],{enterPredicate:[0,"enterPredicate"]},{dropped:"cdkDropListDropped"}),l.Tb(256,null,r.d,void 0,[]),l.Tb(2048,null,r.c,null,[r.f]),(t()(),l.zb(4,16777216,null,null,10,"div",[["cdkDrag",""],["class","profile-card cdk-drag"]],[[2,"cdk-drag-disabled",null],[2,"cdk-drag-dragging",null]],[[null,"cdkDragMoved"],[null,"click"]],(function(t,e,n){var l=!0,o=t.component;return"cdkDragMoved"===e&&(l=!1!==o.dragMoved(n)&&l),"click"===e&&(l=!1!==o.routeToEdit(t.context.$implicit.collectionName)&&l),l}),null,null)),l.Tb(6144,null,r.b,null,[r.e]),l.yb(6,4866048,null,3,r.e,[l.l,[3,r.c],d.d,l.z,l.Q,[2,r.a],[2,u.b],r.h,l.h,[8,null]],{disabled:[0,"disabled"]},{moved:"cdkDragMoved"}),l.Ub(603979776,3,{_handles:1}),l.Ub(603979776,4,{_previewTemplate:0}),l.Ub(603979776,5,{_placeholderTemplate:0}),(t()(),l.zb(10,0,null,null,3,"div",[["class","profile-card-bg"]],null,null,null,null,null)),(t()(),l.zb(11,0,null,null,2,"div",[["class","profile-card-name"]],null,null,null,null,null)),(t()(),l.zb(12,0,null,null,1,"div",[],null,null,null,null,null)),(t()(),l.Yb(13,null,[" "," "])),(t()(),l.zb(14,0,null,null,0,"div",[["class","profile-card-body"]],null,null,null,null,null))],(function(t,e){var n=e.component;t(e,1,0,n.dropListEnterPredicate),t(e,6,0,!n.draggable)}),(function(t,e){t(e,0,0,l.Ob(e,1).id,l.Ob(e,1).disabled,l.Ob(e,1)._dropListRef.isDragging(),l.Ob(e,1)._dropListRef.isReceiving()),t(e,4,0,l.Ob(e,6).disabled,l.Ob(e,6)._dragRef.isDragging()),t(e,13,0,e.context.$implicit.collectionName||"\xa0")}))}function m(t){return l.bc(0,[l.Ub(402653184,1,{listGroup:0}),l.Ub(402653184,2,{placeholder:0}),(t()(),l.zb(2,0,null,null,15,"div",[["class",""]],null,null,null,null,null)),(t()(),l.zb(3,0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),l.Yb(-1,null,["\u4ea4\u53cb\u8cc7\u6599\u593e"])),(t()(),l.zb(5,0,null,null,1,"button",[["class","btn btn-float"]],null,[[null,"click"]],(function(t,e,n){var l=!0;return"click"===e&&(l=!1!==t.component.add()&&l),l}),null,null)),(t()(),l.zb(6,0,null,null,0,"i",[["class","fa fa-plus"]],null,null,null,null,null)),(t()(),l.zb(7,0,null,null,10,"div",[["cdkDropListGroup",""],["class","example-container"]],null,null,null,null,null)),l.yb(8,147456,[[1,4]],0,r.g,[],null,null),l.Tb(2048,null,r.d,null,[r.g]),(t()(),l.zb(10,0,null,null,7,"div",[["class","row"]],null,null,null,null,null)),(t()(),l.zb(11,0,null,null,3,"div",[["cdkDropList",""],["class","col-sm-6 col-md-4 col-6 cdk-drop-list"]],[[1,"id",0],[2,"cdk-drop-list-disabled",null],[2,"cdk-drop-list-dragging",null],[2,"cdk-drop-list-receiving",null]],[[null,"cdkDropListDropped"]],(function(t,e,n){var l=!0;return"cdkDropListDropped"===e&&(l=!1!==t.component.dropListDropped()&&l),l}),null,null)),l.Tb(6144,null,r.c,null,[r.f]),l.yb(13,147456,[[2,4]],0,r.f,[l.l,r.h,l.h,c.b,[2,u.b],[3,r.d],[2,r.a]],{enterPredicate:[0,"enterPredicate"]},{dropped:"cdkDropListDropped"}),l.Tb(256,null,r.d,void 0,[]),(t()(),l.ib(16777216,null,null,2,null,g)),l.yb(16,278528,null,0,d.j,[l.Q,l.M,l.s],{ngForOf:[0,"ngForOf"]},null),l.Qb(0,s.a,[])],(function(t,e){var n=e.component;t(e,13,0,n.dropListEnterPredicate),t(e,16,0,l.Zb(e,16,0,l.Ob(e,17).transform(n.items,n.filter)))}),(function(t,e){t(e,11,0,l.Ob(e,13).id,l.Ob(e,13).disabled,l.Ob(e,13)._dropListRef.isDragging(),l.Ob(e,13)._dropListRef.isReceiving())}))}function v(t){return l.bc(0,[(t()(),l.zb(0,0,null,null,1,"ng-component",[],null,null,null,m,f)),l.yb(1,4440064,null,0,p,[c.c,a.a,h.l,h.a],null,null)],(function(t,e){t(e,1,0)}),null)}var y=l.vb("ng-component",p,v,{},{},[]),C=n("iutN"),_=n("z5nN"),M=n("gIcY"),k=n("eO+G"),x=n("9b/N"),O={title:"Dashboard"},D=function(){return n.e(6).then(n.bind(null,"YbfM")).then((function(t){return t.CardFolderModuleNgFactory}))},T=function(){return function(){}}(),w=n("hrfs"),L=n("xtZt"),E=function(){function t(){}return t.forRoot=function(){return{ngModule:t,providers:[]}},t}(),P=n("Ux3T"),z=n("YEUz"),I=n("dlst"),R=n("fPVg"),S=n("DQlY"),j=n("Tr4x"),N=n("xCnN"),U=n("hhfa"),Y=n("8aBz"),F=n("Ht+U"),G=l.wb(o,[],(function(t){return l.Lb([l.Mb(512,l.j,l.ab,[[8,[i.a,y,C.a,_.a,_.b]],[3,l.j],l.x]),l.Mb(4608,M.s,M.s,[]),l.Mb(4608,d.m,d.l,[l.u]),l.Mb(4608,r.h,r.h,[d.d,l.z,c.c,r.j]),l.Mb(4608,M.d,M.d,[]),l.Mb(4608,k.a,k.a,[]),l.Mb(4608,x.c,x.c,[]),l.Mb(1073742336,M.r,M.r,[]),l.Mb(1073742336,M.g,M.g,[]),l.Mb(1073742336,h.p,h.p,[[2,h.u],[2,h.l]]),l.Mb(1073742336,T,T,[]),l.Mb(1073742336,w.a,w.a,[]),l.Mb(1073742336,L.e,L.e,[]),l.Mb(1073742336,E,E,[]),l.Mb(1073742336,d.c,d.c,[]),l.Mb(1073742336,c.a,c.a,[]),l.Mb(1073742336,r.i,r.i,[]),l.Mb(1073742336,s.b,s.b,[]),l.Mb(1073742336,M.o,M.o,[]),l.Mb(1073742336,P.f,P.f,[]),l.Mb(1073742336,u.a,u.a,[]),l.Mb(1073742336,k.e,k.e,[z.b,[2,k.b],[2,d.d]]),l.Mb(1073742336,x.d,x.d,[]),l.Mb(1073742336,I.e,I.e,[]),l.Mb(1073742336,R.c,R.c,[]),l.Mb(1073742336,S.e,S.e,[]),l.Mb(1073742336,j.d,j.d,[]),l.Mb(1073742336,N.b,N.b,[]),l.Mb(1073742336,U.c,U.c,[]),l.Mb(1073742336,Y.c,Y.c,[]),l.Mb(1073742336,o,o,[]),l.Mb(1024,h.j,(function(){return[[{path:"",component:p,data:O},{path:":folder",loadChildren:D}]]}),[]),l.Mb(256,P.a,{separatorKeyCodes:[F.g]},[])])}))},iII6:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var l=n("mrSG"),o=n("26FU"),i=n("tZZt"),r=n("67Y/"),c=n("CcnG"),u=n("wD+u"),d=function(){function t(t,e){this.firestore=t,this.authenticationService=e,this.profileCardsSnapSub=new o.a(""),this.uid=this.authenticationService.getCurrentUser().uid}return t.prototype.getCardFolder=function(){return this.firestore.collection("users-folder").doc(this.uid).set({collectionList:[{collectionName:"cards-folder"},{collectionName:"emc"}]}),this.firestore.collection("users-folder").doc(this.uid).snapshotChanges().pipe(Object(r.a)((function(t){return t.payload.data()})))},t.prototype.getProfileCards=function(t){return this.firestore.collection("users-folder").doc(this.uid).collection(t).snapshotChanges().pipe(Object(r.a)((function(t){return t.map((function(t){var e=t.payload.doc.data(),n=t.payload.doc.id;return Object(l.__assign)({id:n},e)}))})))},t.prototype.addProfileCard=function(t,e){this.firestore.collection("users-folder").doc(this.uid).collection(t).add(Object(l.__assign)({},e)).then((function(){console.log("add profile card to "+t+"!!")}))},t.prototype.setProfileCard=function(t,e,n){this.firestore.collection("users-folder").doc(this.uid).collection(t).doc(e).set(Object(l.__assign)({},n)).then((function(){console.log("add profile card to "+t+"!!")}))},t.prototype.deleteProfileCard=function(t){this.firestore.collection("users-folder").doc(this.uid).collection("cards-folder").doc(t).delete().then((function(){console.log("delete profile card")}))},t.\u0275prov=c.lc({factory:function(){return new t(c.sc(u.a),c.sc(i.a))},token:t,providedIn:"root"}),t}()}}]);