"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["cookie-permission.plugin"],{1697:(e,t,i)=>{i.r(t),i.d(t,{default:()=>r});var o=i(9568),s=i(1374),n=i(9610),h=i(5206);class r extends o.Z{init(){this._button=this.el.querySelector(this.options.buttonSelector),this._isPreferenceSet()||(this._setBodyPadding(),this._registerEvents())}_isPreferenceSet(){return!!s.Z.getItem(this.options.cookieName)||(this._showCookieBar(),!1)}_showCookieBar(){this.el.style.display="block",this.$emitter.publish("showCookieBar")}_hideCookieBar(){this.el.style.display="none",this.$emitter.publish("hideCookieBar")}_registerEvents(){if(this._button){let e=h.Z.isTouchDevice()?"touchstart":"click";this._button.addEventListener(e,this._handleDenyButton.bind(this))}window.addEventListener("resize",n.Z.debounce(this._setBodyPadding.bind(this),this.options.resizeDebounceTime),{capture:!0,passive:!0})}_handleDenyButton(e){e.preventDefault();let{cookieExpiration:t,cookieName:i}=this.options;this._hideCookieBar(),this._removeBodyPadding(),s.Z.setItem(i,"1",t),this.$emitter.publish("onClickDenyButton")}_calculateCookieBarHeight(){return this.el.offsetHeight}_setBodyPadding(){document.body.style.paddingBottom=this._calculateCookieBarHeight()+"px",this.$emitter.publish("setBodyPadding")}_removeBodyPadding(){document.body.style.paddingBottom="0",this.$emitter.publish("removeBodyPadding")}}r.options={cookieExpiration:30,cookieName:"cookie-preference",buttonSelector:".js-cookie-permission-button",resizeDebounceTime:200}}}]);