"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[10753],{753:(t,e,s)=>{s.r(e),s.d(e,{default:()=>r});var i=s(9568),o=s(5206),l=s(4049),n=s(2628);class r extends i.Z{static #t=this.options={debounceTime:125,activeCls:"is-open",hiddenCls:"hidden",closeSelector:".js-close-flyout-menu",mainNavigationId:"mainNavigation",flyoutIdDataAttribute:"data-flyout-menu-id",triggerDataAttribute:"data-flyout-menu-trigger"};init(){this._debouncer=null,this._triggerEls=this.el.querySelectorAll(`[${this.options.triggerDataAttribute}]`),this._closeEls=this.el.querySelectorAll(this.options.closeSelector),this._flyoutEls=this.el.querySelectorAll(`[${this.options.flyoutIdDataAttribute}]`),this._hasOpenedFlyouts=!1,this._registerEvents()}_registerEvents(){let t=o.Z.isTouchDevice()?"touchstart":"click",e=o.Z.isTouchDevice()?"touchstart":"mouseenter",s=o.Z.isTouchDevice()?"touchstart":"mouseleave";document.addEventListener("keydown",t=>{!0===this._hasOpenedFlyouts&&("Escape"===t.code||27===t.keyCode)&&this._debounce(this._closeAllFlyouts)});let i=document.getElementsByTagName("main")[0];i&&i.addEventListener("focusin",()=>{this._debounce(this._closeAllFlyouts)}),this._triggerEls.forEach(t=>{let i=l.Z.getDataAttribute(t,this.options.triggerDataAttribute);t.addEventListener(e,this._openFlyoutById.bind(this,i,t)),t.addEventListener("keydown",e=>{("Enter"===e.code||13===e.keyCode)&&(e.preventDefault(),e.stopPropagation(),this._hasOpenedFlyouts?(this._closeAllFlyouts(),this._hasOpenedFlyouts=!1):(this._openFlyoutById(i,t,e),this._hasOpenedFlyouts=!0))}),t.addEventListener(s,()=>this._debounce(this._closeAllFlyouts))}),this._closeEls.forEach(e=>{e.addEventListener(t,this._closeAllFlyouts.bind(this))}),o.Z.isTouchDevice()||this._flyoutEls.forEach(t=>{t.addEventListener("mousemove",()=>this._clearDebounce()),t.addEventListener("mouseleave",()=>this._debounce(this._closeAllFlyouts))})}_openFlyout(t,e){this._isOpen(e)||(this._closeAllFlyouts(),t.classList.add(this.options.activeCls),e.classList.add(this.options.activeCls),this._hasOpenedFlyouts=!0),this.$emitter.publish("openFlyout")}_closeFlyout(t,e){this._isOpen(e)&&(t.classList.remove(this.options.activeCls),n.Z.isActive("ACCESSIBILITY_TWEAKS")&&(t.classList.add(this.options.hiddenCls),t.style.removeProperty("top")),e.classList.remove(this.options.activeCls),this._hasOpenedFlyouts=!1),this.$emitter.publish("closeFlyout")}_openFlyoutById(t,e,s){let i=this.el.querySelector(`[${this.options.flyoutIdDataAttribute}='${t}']`);if(i){if(n.Z.isActive("ACCESSIBILITY_TWEAKS")){let t=parseInt(getComputedStyle(e).getPropertyValue("padding-bottom"),10);i.style.top=`${this.el.offsetHeight+t}px`,i.classList.remove(this.options.hiddenCls)}this._debounce(this._openFlyout,i,e)}this._isOpen(e)||r._stopEvent(s),this.$emitter.publish("openFlyoutById")}_closeAllFlyouts(){this.el.querySelectorAll(`[${this.options.flyoutIdDataAttribute}]`).forEach(t=>{let e=this._retrieveTriggerEl(t);this._closeFlyout(t,e)}),this.$emitter.publish("closeAllFlyouts")}_retrieveTriggerEl(t){let e=l.Z.getDataAttribute(t,this.options.flyoutIdDataAttribute,!1);return this.el.querySelector(`[${this.options.triggerDataAttribute}='${e}']`)}_isOpen(t){return t.classList.contains(this.options.activeCls)}_debounce(t){for(var e=arguments.length,s=Array(e>1?e-1:0),i=1;i<e;i++)s[i-1]=arguments[i];this._clearDebounce(),this._debouncer=setTimeout(t.bind(this,...s),this.options.debounceTime)}_clearDebounce(){clearTimeout(this._debouncer)}static _stopEvent(t){t&&t.cancelable&&(t.preventDefault(),t.stopImmediatePropagation())}}}}]);