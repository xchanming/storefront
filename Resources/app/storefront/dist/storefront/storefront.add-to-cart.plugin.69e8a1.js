"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[72701],{2701:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var i=r(4335),s=r(1088);class a extends i.A{static #e=this.options={redirectSelector:'[name="redirectTo"]',redirectParamSelector:'[data-redirect-parameters="true"]',redirectTo:"frontend.cart.offcanvas"};init(){if(this._getForm(),!this._form)throw Error(`No form found for the plugin: ${this.constructor.name}`);this._prepareFormRedirect(),this._registerEvents()}_prepareFormRedirect(){try{let e=this._form.querySelector(this.options.redirectSelector),t=this._form.querySelector(this.options.redirectParamSelector);e.value=this.options.redirectTo,t.disabled=!0}catch(e){}}_getForm(){this.el&&"FORM"===this.el.nodeName?this._form=this.el:this._form=this.el.closest("form")}_registerEvents(){this.el.addEventListener("submit",this._formSubmit.bind(this))}_formSubmit(e){e.preventDefault();let t=this._form.getAttribute("action"),r=s.A.serialize(this._form);this.$emitter.publish("beforeFormSubmit",r),this._openOffCanvasCarts(t,r)}_openOffCanvasCarts(e,t){window.PluginManager.getPluginInstances("OffCanvasCart").forEach(r=>this._openOffCanvasCart(r,e,t))}_openOffCanvasCart(e,t,r){e.openOffCanvas(t,r,()=>{this.$emitter.publish("openOffCanvasCart")})}}},1088:(e,t,r)=>{r.d(t,{A:()=>i});class i{static serialize(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];if("FORM"!==e.nodeName){if(t)throw Error("The passed element is not a form!");return{}}return new FormData(e)}static serializeJson(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=i.serialize(e,t);if(!(r instanceof FormData)&&0===Object.keys(r).length||r instanceof FormData&&0===Array.from(r.entries()).length)return{};let s={};for(let[e,t]of r.entries())s[e]=t;return s}}}}]);