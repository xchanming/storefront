"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[98094],{8094:(t,e,i)=>{i.r(e),i.d(e,{default:()=>l});var s=i(4335),a=i(4059);class l extends s.A{static #t=this.options={stylingEnabled:!0,styleCls:"was-validated",hintCls:"invalid-feedback",debounceTime:"150",eventName:"ValidateEqual",equalAttr:"data-form-validation-equal",lengthAttr:"data-form-validation-length",lengthTextAttr:"data-form-validation-length-text",requiredAttr:"data-form-validation-required"};init(){if(!1===this._isFormElement())throw Error("Element is not of type <form>");this.options.stylingEnabled&&this._setNoValidate(),this._registerEvents()}_isFormElement(){return"form"===this.el.tagName.toLowerCase()}_setNoValidate(){this.el.setAttribute("novalidate","")}_registerEvents(){this.options.stylingEnabled&&this.el.addEventListener("submit",this._onFormSubmit.bind(this)),this._registerValidationListener(this.options.equalAttr,this._onValidateEqualTrigger.bind(this),["change"]),this._registerValidationListener(this.options.equalAttr,a.A.debounce(this._onValidateEqual.bind(this),this.options.debounceTime),[this.options.eventName]),this._registerValidationListener(this.options.lengthAttr,this._onValidateLength.bind(this),["change"]),this._registerValidationListener(this.options.requiredAttr,this._onValidateRequired.bind(this),["change"])}_registerValidationListener(t,e,i){let s=this.el.querySelectorAll(`[${t}]`);s&&s.forEach(t=>{i.forEach(i=>{t.removeEventListener(i,e),t.addEventListener(i,e)})})}_onFormSubmit(t){let e=this.el.checkValidity();!1===e&&(t.preventDefault(),t.stopPropagation()),this.el.classList.add(this.options.styleCls),this.$emitter.publish("beforeSubmit",{validity:e})}_onValidateEqualTrigger(t){let e=t.target.getAttribute(this.options.equalAttr),i=this.el.querySelectorAll(`[${this.options.equalAttr}='${e}']`);i[1].value.trim().length>0&&i.forEach(e=>{e.dispatchEvent(new CustomEvent(this.options.eventName,{target:t.target}))}),this.$emitter.publish("onValidateEqualTrigger")}_onValidateEqual(t){let e=t.target.getAttribute(this.options.equalAttr),i=this.el.querySelectorAll(`[${this.options.equalAttr}='${e}']`),s=!0;[...i].reduce((t,e)=>{t.value.trim()!==e.value.trim()&&(s=!1)}),i.forEach(t=>{s?this._setFieldToValid(t,this.options.equalAttr):this._setFieldToInvalid(t,this.options.equalAttr)}),this.$emitter.publish("onValidateEqual")}_onValidateLength(t){let e=t.target,i=e.value.trim(),s=t.target.getAttribute(this.options.lengthAttr),a=e.nextElementSibling;i.length<s?(this._setFieldToInvalid(e,this.options.lengthAttr),a&&a.hasAttribute(this.options.lengthTextAttr)&&a.classList.add(this.options.hintCls)):(this._setFieldToValid(e,this.options.lengthAttr),a&&a.hasAttribute(this.options.lengthTextAttr)&&a.classList.remove(this.options.hintCls)),this.$emitter.publish("onValidateLength")}_onValidateRequired(t){let e=t.target;""===e.value.trim()?this._setFieldToInvalid(e,this.options.requiredAttr):this._setFieldToValid(e,this.options.requiredAttr),this.$emitter.publish("onValidateRequired")}_setFieldToInvalid(t,e){this._showInvalidMessage(t,e),t.setAttribute("invalid",!0),this.$emitter.publish("setFieldToInvalid")}_showInvalidMessage(t,e){let i=t.parentElement;i&&this.options.stylingEnabled&&i.classList.add(this.options.styleCls);let s=t.getAttribute(`${e}-message`);s&&(i.querySelector(".js-validation-message")||t.insertAdjacentHTML("afterEnd",`<div class="invalid-feedback js-validation-message" data-type="${e}">${s}</div>`),t.setCustomValidity(s)),this.$emitter.publish("showInvalidMessage")}_setFieldToValid(t,e){this._hideInvalidMessage(t,e),t.removeAttribute("invalid"),t.setCustomValidity(""),this.$emitter.publish("setFieldToValid")}_hideInvalidMessage(t,e){let i=t.parentElement;if(i&&this.options.stylingEnabled&&i.classList.remove(this.options.styleCls),i){let t=i.querySelector(`.js-validation-message[data-type=${e}]`);t&&t.remove()}this.$emitter.publish("hideInvalidMessage")}}}}]);