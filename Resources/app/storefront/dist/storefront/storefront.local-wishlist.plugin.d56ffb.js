"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[37863],{1369:(t,e,s)=>{s.d(e,{A:()=>a});var r=s(1452);class o{constructor(){this._storage={}}setItem(t,e){return this._storage[t]=e}getItem(t){return Object.prototype.hasOwnProperty.call(this._storage,t)?this._storage[t]:null}removeItem(t){return delete this._storage[t]}key(t){return Object.values(this._storage)[t]||null}clear(){return this._storage={}}}class i{constructor(){this._storage=null,this._chooseStorage(),this._validateStorage()}_chooseStorage(){return i._isSupported("localStorage")?this._storage=window.localStorage:i._isSupported("sessionStorage")?this._storage=window.sessionStorage:r.A.isSupported()?this._storage=r.A:this._storage=new o}static _isSupported(t){try{let e="__storage_test";return window[t].setItem(e,"1"),window[t].removeItem(e),!0}catch(t){return!1}}_validateStorage(){if("function"!=typeof this._storage.setItem)throw Error('The storage must have a "setItem" function');if("function"!=typeof this._storage.getItem)throw Error('The storage must have a "getItem" function');if("function"!=typeof this._storage.removeItem)throw Error('The storage must have a "removeItem" function');if("function"!=typeof this._storage.key)throw Error('The storage must have a "key" function');if("function"!=typeof this._storage.clear)throw Error('The storage must have a "clear" function')}getStorage(){return this._storage}}let a=Object.freeze(new i).getStorage()},6917:(t,e,s)=>{s.d(e,{A:()=>o});var r=s(4335);class o extends r.A{init(){this.products={}}load(){this.$emitter.publish("Wishlist/onProductsLoaded",{products:this.products})}has(t){return!!this.products[t]}add(t){this.products[t]=new Date().toISOString(),this.$emitter.publish("Wishlist/onProductAdded",{products:this.products,productId:t})}remove(t){delete this.products[t],this.$emitter.publish("Wishlist/onProductRemoved",{products:this.products,productId:t})}getCurrentCounter(){return this.products?Object.keys(this.products).length:0}getProducts(){return this.products}}},7863:(t,e,s)=>{s.r(e),s.d(e,{default:()=>a});var r=s(1369),o=s(6917),i=s(1452);class a extends o.A{init(){this.cookieEnabledName="wishlist-enabled",this.storage=r.A,super.init(),this._registerEvents()}load(){this.products=this._fetch(),super.load()}add(t,e){if(window.useDefaultCookieConsent&&!i.A.getItem(this.cookieEnabledName)){window.location.href=e.afterLoginPath,this.$emitter.publish("Wishlist/onLoginRedirect");return}super.add(t),this._save()}remove(t){super.remove(t),this._save()}_fetch(){if(window.useDefaultCookieConsent&&!i.A.getItem(this.cookieEnabledName)&&this.storage.removeItem(this._getStorageKey()),this.getCurrentCounter()>0)return this.products;let t=this.storage.getItem(this._getStorageKey());if(!t)return{};try{let e=JSON.parse(t);return e instanceof Object?e:{}}catch{return{}}}_save(){null===this.products||0===this.getCurrentCounter()?this.storage.removeItem(this._getStorageKey()):this.storage.setItem(this._getStorageKey(),JSON.stringify(this.products))}_getStorageKey(){return"wishlist-"+(window.salesChannelId||"")}_registerEvents(){let t=window.PluginManager.getPluginInstances("AccountGuestAbortButton");t&&t.forEach(t=>{t.$emitter.subscribe("guest-logout",()=>{this.storage.removeItem(this._getStorageKey())})})}}}}]);