"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[29092],{9749:(e,t,s)=>{s.d(t,{A:()=>a});let r=Object.freeze(new class{constructor(){this._domParser=new DOMParser}replaceFromMarkup(e,t){let s=e;"string"==typeof s&&(s=this._createMarkupFromString(s)),"string"==typeof t&&(t=[t]),this._replaceSelectors(s,t)}replaceElement(e,t){return("string"==typeof e&&(e=document.querySelectorAll(e)),"string"==typeof t&&(t=document.querySelectorAll(t)),e instanceof NodeList&&t instanceof NodeList&&t.length>e.length)?(t.forEach(t=>{e.forEach(e=>{e.innerHTML&&e.className===t.className&&(t.innerHTML=e.innerHTML)})}),!0):e instanceof NodeList&&e.length?(e.forEach((e,s)=>{e.innerHTML&&(t[s].innerHTML=e.innerHTML)}),!0):t instanceof NodeList&&t.length?(t.forEach(t=>{e.innerHTML&&(t.innerHTML=e.innerHTML)}),!0):!!t&&!!e&&!!e.innerHTML&&(t.innerHTML=e.innerHTML,!0)}_replaceSelectors(e,t){t.forEach(t=>{let s=e.querySelectorAll(t),r=document.querySelectorAll(t);this.replaceElement(s,r)})}_createMarkupFromString(e){return this._domParser.parseFromString(e,"text/html")}});class a{static replaceFromMarkup(e,t){r.replaceFromMarkup(e,t)}static replaceElement(e,t){return r.replaceElement(e,t)}}},9092:(e,t,s)=>{s.r(t),s.d(t,{default:()=>o});var r=s(4335),a=s(9068),n=s(9749),i=s(3343);class o extends r.A{static #e=this.options={router:"",captchaRefreshIconId:"#basic-captcha-content-refresh-icon",captchaImageId:"#basic-captcha-content-image",basicCaptchaInputId:"#basic-captcha-input",basicCaptchaFieldId:"#basic-captcha-field",invalidFeedbackMessage:"Incorrect input. Please try again.",formId:"",preCheckRoute:{}};init(){this._getForm(),this._form&&(window.formValidation.addErrorMessage("basicCaptcha",this.options.invalidFeedbackMessage),this.formPluginInstances=window.PluginManager.getPluginInstancesFromElement(this._form),this._httpClient=new a.A,this._onLoadBasicCaptcha(),this._registerEvents())}_registerEvents(){this.el.querySelector(this.options.captchaRefreshIconId).addEventListener("click",this._onLoadBasicCaptcha.bind(this)),this._form.addEventListener("submit",this.validateCaptcha.bind(this))}_onLoadBasicCaptcha(){let e=this.el.querySelector(this.options.captchaImageId);i.A.create(e);let t=`${this.options.router}?formId=${this.options.formId}`;this._httpClient.get(t,t=>{this.formValidating=!1;let s=new DOMParser().parseFromString(t,"text/html");n.A.replaceElement(s.querySelector(this.options.captchaImageId),e),i.A.remove(e)})}async validateCaptcha(e){e.preventDefault();let t=this.el.querySelector(this.options.basicCaptchaInputId).value,s=JSON.stringify({formId:this.options.formId,shopware_basic_captcha_confirm:t}),r=await fetch(this.options.preCheckRoute.path,{method:"POST",body:s,headers:{"Content-Type":"application/json"}}),a=!!(await r.json()).session,n=this._form.checkValidity();if(!a){let e=this.el.querySelector(this.options.basicCaptchaInputId);window.formValidation.setFieldInvalid(e,["basicCaptcha"]),this._onLoadBasicCaptcha(),this._form.dispatchEvent(new CustomEvent("removeLoader"))}a&&n&&(this._isCmsForm()?this.formPluginInstances.get("FormCmsHandler")._submitForm():this._form.submit())}_isCmsForm(){return this.formPluginInstances.has("FormCmsHandler")}_getForm(){this.el&&"FORM"===this.el.nodeName?this._form=this.el:this._form=this.el.closest("form")}}},9068:(e,t,s)=>{s.d(t,{A:()=>r});class r{constructor(){this._request=null,this._errorHandlingInternal=!1}get(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/json",r=this._createPreparedRequest("GET",e,s);return this._sendRequest(r,null,t)}post(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let a=this._createPreparedRequest("POST",e,r);return this._sendRequest(a,t,s)}delete(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let a=this._createPreparedRequest("DELETE",e,r);return this._sendRequest(a,t,s)}patch(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let a=this._createPreparedRequest("PATCH",e,r);return this._sendRequest(a,t,s)}abort(){if(this._request)return this._request.abort()}setErrorHandlingInternal(e){this._errorHandlingInternal=e}_registerOnLoaded(e,t){t&&(!0===this._errorHandlingInternal?(e.addEventListener("load",()=>{t(e.responseText,e)}),e.addEventListener("abort",()=>{console.warn(`the request to ${e.responseURL} was aborted`)}),e.addEventListener("error",()=>{console.warn(`the request to ${e.responseURL} failed with status ${e.status}`)}),e.addEventListener("timeout",()=>{console.warn(`the request to ${e.responseURL} timed out`)})):e.addEventListener("loadend",()=>{t(e.responseText,e)}))}_sendRequest(e,t,s){return this._registerOnLoaded(e,s),e.send(t),e}_getContentType(e,t){return e instanceof FormData&&(t=!1),t}_createPreparedRequest(e,t,s){return this._request=new XMLHttpRequest,this._request.open(e,t),this._request.setRequestHeader("X-Requested-With","XMLHttpRequest"),s&&this._request.setRequestHeader("Content-type",s),this._request}}},3343:(e,t,s)=>{s.d(t,{A:()=>n});var r=s(5683);let a="element-loader-backdrop";class n extends r.A{static create(e){e.classList.add("has-element-loader"),n.exists(e)||(n.appendLoader(e),setTimeout(()=>{let t=e.querySelector(`.${a}`);t&&t.classList.add("element-loader-backdrop-open")},1))}static remove(e){e.classList.remove("has-element-loader");let t=e.querySelector(`.${a}`);t&&t.remove()}static exists(e){return e.querySelectorAll(`.${a}`).length>0}static getTemplate(){return`
        <div class="${a}">
            <div class="loader" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `}static appendLoader(e){e.insertAdjacentHTML("beforeend",n.getTemplate())}}},5683:(e,t,s)=>{s.d(t,{A:()=>n,c:()=>a});let r="loader",a={BEFORE:"before",AFTER:"after",INNER:"inner"};class n{constructor(e,t=a.BEFORE){this.parent=e instanceof Element?e:document.body.querySelector(e),this.position=t}create(){if(!this.exists()){if(this.position===a.INNER){this.parent.innerHTML=n.getTemplate();return}this.parent.insertAdjacentHTML(this._getPosition(),n.getTemplate())}}remove(){this.parent.querySelectorAll(`.${r}`).forEach(e=>e.remove())}exists(){return this.parent.querySelectorAll(`.${r}`).length>0}_getPosition(){return this.position===a.BEFORE?"afterbegin":"beforeend"}static getTemplate(){return`<div class="${r}" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`}static SELECTOR_CLASS(){return r}}}}]);