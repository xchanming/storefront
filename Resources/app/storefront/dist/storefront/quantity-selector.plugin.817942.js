"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["quantity-selector.plugin"],{1358:(i,t,e)=>{e.r(t),e.d(t,{default:()=>n});var a=e(9568),s=e(4049);class n extends a.Z{init(){this._input=s.Z.querySelector(this.el,"input.js-quantity-selector"),this._btnPlus=s.Z.querySelector(this.el,".js-btn-plus"),this._btnMinus=s.Z.querySelector(this.el,".js-btn-minus"),this.options.ariaLiveUpdates&&this._initAriaLiveUpdates(),this._registerEvents()}_initAriaLiveUpdates(){this.ariaLiveContainer=this.el.nextElementSibling,this.ariaLiveContainer&&this.ariaLiveContainer.hasAttribute("aria-live")&&(this.ariaLiveText=this.ariaLiveContainer.dataset.ariaLiveText,this.ariaLiveProductName=this.ariaLiveContainer.dataset.ariaLiveProductName,"onload"===this.options.ariaLiveUpdateMode&&window.setTimeout(this._updateAriaLive.bind(this),1e3))}_registerEvents(){this._btnPlus.addEventListener("click",this._stepUp.bind(this)),this._btnMinus.addEventListener("click",this._stepDown.bind(this)),this._input.addEventListener("keydown",i=>{if(13===i.keyCode)return i.preventDefault(),this._triggerChange(),!1})}_triggerChange(i){let t=new Event("change",{bubbles:!0,cancelable:!1});this._input.dispatchEvent(t),"live"===this.options.ariaLiveUpdateMode&&this._updateAriaLive(),"up"===i?this._btnPlus.dispatchEvent(t):"down"===i&&this._btnMinus.dispatchEvent(t)}_stepUp(){let i=this._input.value;this._input.stepUp(),this._input.value!==i&&this._triggerChange("up")}_stepDown(){let i=this._input.value;this._input.stepDown(),this._input.value!==i&&this._triggerChange("down")}_updateAriaLive(){if(!this.options.ariaLiveUpdates||!this.ariaLiveText||!this.ariaLiveContainer)return;let i=this._input.value,t=this.ariaLiveText.replace(this.options.ariaLiveTextValueToken,i);this.options.ariaLiveTextProductToken&&this.ariaLiveProductName&&(t=t.replace(this.options.ariaLiveTextProductToken,this.ariaLiveProductName)),this.ariaLiveContainer.innerHTML=t}}n.options={ariaLiveUpdates:!0,ariaLiveUpdateMode:"live",ariaLiveTextValueToken:"%quantity%",ariaLiveTextProductToken:"%product%"}}}]);