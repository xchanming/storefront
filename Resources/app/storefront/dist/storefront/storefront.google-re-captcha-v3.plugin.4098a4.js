"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[42422],{2188:(t,i,e)=>{e.d(i,{A:()=>n});var s=e(4335);class n extends s.A{init(){if(this._getForm(),this._form){if(this.grecaptchaInput=this.el.querySelector(this.options.grecaptchaInputSelector),!this.grecaptchaInput)throw Error("Input field for Google reCAPTCHA is missing!");this.grecaptcha=window.grecaptcha,this._formSubmitting=!1,this.formPluginInstances=window.PluginManager.getPluginInstancesFromElement(this._form),this._setGoogleReCaptchaHandleSubmit(),this._registerEvents()}}getGreCaptchaInfo(){}onFormSubmit(){}_getForm(){return this.el&&"FORM"===this.el.nodeName?(this._form=this.el,!0):(this._form=this.el.closest("form"),this._form)}_registerEvents(){this.formPluginInstances?this.formPluginInstances.forEach(t=>{t.$emitter.subscribe("beforeSubmit",this._onFormSubmitCallback.bind(this))}):this._form.addEventListener("submit",this._onFormSubmitCallback.bind(this))}_submitInvisibleForm(){if(!this._form.checkValidity())return;this.$emitter.publish("beforeGreCaptchaFormSubmit",{info:this.getGreCaptchaInfo(),token:this.grecaptchaInput.value});let t=!1;this.formPluginInstances.forEach(i=>{"function"==typeof i.sendAjaxFormSubmit&&!1!==i.options.useAjax&&(t=!0,i.sendAjaxFormSubmit())}),t||this._form.submit()}_onFormSubmitCallback(){this._formSubmitting||(this._formSubmitting=!0,this.onFormSubmit())}_setGoogleReCaptchaHandleSubmit(){this.formPluginInstances.forEach(t=>{"function"==typeof t.sendAjaxFormSubmit&&!1!==t.options.useAjax&&(t.formSubmittedByCaptcha=!0)})}}},2422:(t,i,e)=>{e.r(i),e.d(i,{default:()=>n});var s=e(2188);class n extends s.A{static #t=this.options={siteKey:null,grecaptchaInputSelector:".grecaptcha_v3-input"};init(){super.init()}onFormSubmit(){this.grecaptcha.ready(this._onGreCaptchaReady.bind(this))}getGreCaptchaInfo(){return{version:"GoogleReCaptchaV3"}}_onGreCaptchaReady(){this.grecaptcha.execute(this.options.siteKey,{action:"submit"}).then(t=>{this.$emitter.publish("onGreCaptchaTokenResponse",{info:this.getGreCaptchaInfo(),token:t}),this.grecaptchaInput.value=t,this._formSubmitting=!1,this._submitInvisibleForm()})}}}}]);