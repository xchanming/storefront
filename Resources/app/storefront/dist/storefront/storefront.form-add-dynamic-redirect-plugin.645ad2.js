"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[40672],{672:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var i=r(4335);class a extends i.A{static #e=this.options={redirectTo:window.activeRoute,redirectParameter:window.activeRouteParameters};init(){this.el.addEventListener("submit",this._onSubmit.bind(this))}_onSubmit(){this._createInputForRedirectTo();let e=JSON.parse(this.options.redirectParameter);for(let t in e){let r=this._createInputForRedirectParameter(t,e[t]);this.el.appendChild(r)}}_createInputForRedirectTo(){let e=document.createElement("input");e.setAttribute("type","hidden"),e.setAttribute("name","redirectTo"),e.setAttribute("value",this.options.redirectTo),this.el.appendChild(e)}_createInputForRedirectParameter(e,t){let r=document.createElement("input");return r.setAttribute("type","hidden"),r.setAttribute("name",`redirectParameters[${e}]`),r.setAttribute("value",t),r}}}}]);