"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[34603],{4603:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var r=s(4335),i=s(3121),n=s(1088),o=s(9068),a=s(4059);class c extends r.A{static #e=this.options={useAjax:!1,ajaxContainerSelector:!1,changeTriggerSelectors:null,delayChangeEvent:null,autoFocus:!0,focusHandlerKey:"form-auto-submit"};init(){if(this.formSubmittedByCaptcha=!1,this._getForm(),!this._form)throw Error(`No form found for the plugin: ${this.constructor.name}`);if(this._client=new o.A,this.options.useAjax&&!this.options.ajaxContainerSelector)throw Error(`[${this.constructor.name}] The option "ajaxContainerSelector" must be given when using ajax.`);if(this.options.changeTriggerSelectors&&!Array.isArray(this.options.changeTriggerSelectors))throw Error(`[${this.constructor.name}] The option "changeTriggerSelectors" must be an array of selector strings.`);this._registerEvents(),this._resumeFocusState()}_getForm(){this.el&&"FORM"===this.el.nodeName?this._form=this.el:this._form=this.el.closest("form")}_registerEvents(){if(this.options.useAjax){let e=this.options.delayChangeEvent?a.A.debounce(this._onSubmit.bind(this),this.options.delayChangeEvent):this._onSubmit.bind(this);this._form.removeEventListener("change",e),this._form.addEventListener("change",e)}else{let e=this.options.delayChangeEvent?a.A.debounce(this._onChange.bind(this),this.options.delayChangeEvent):this._onChange.bind(this);this._form.removeEventListener("change",e),this._form.addEventListener("change",e),window.addEventListener("pagehide",()=>{i.A.remove()})}}_targetMatchesSelector(e){return!!this.options.changeTriggerSelectors.find(t=>e.target.matches(t))}_onChange(e){this._updateRedirectParameters(),(!this.options.changeTriggerSelectors||this._targetMatchesSelector(e))&&(this._saveFocusState(e.target),this._submitNativeForm())}_submitNativeForm(){this.$emitter.publish("beforeChange"),this._form.submit(),i.A.create()}_onSubmit(e){e.preventDefault(),i.A.create(),this.$emitter.publish("beforeSubmit"),this._saveFocusState(e.target),this.formSubmittedByCaptcha||this.sendAjaxFormSubmit()}sendAjaxFormSubmit(){let e=n.A.serialize(this._form),t=this._form.getAttribute("action");this._client.post(t,e,this._onAfterAjaxSubmit.bind(this))}_onAfterAjaxSubmit(e){i.A.remove(),document.querySelector(this.options.ajaxContainerSelector).innerHTML=e,window.PluginManager.initializePlugins(),this.$emitter.publish("onAfterAjaxSubmit")}_updateRedirectParameters(){let e=Object.fromEntries(new URLSearchParams(window.location.search).entries()),t=n.A.serialize(this._form);Object.keys(e).filter(e=>!t.has(`redirectParameters[${e}]`)).map(t=>this._createInputForRedirectParameter(t,e[t])).forEach(e=>{this._form.appendChild(e)})}_createInputForRedirectParameter(e,t){let s=document.createElement("input");return s.setAttribute("type","hidden"),s.setAttribute("name",`redirectParameters[${e}]`),s.setAttribute("value",t),s}_saveFocusState(e){if(this.options.autoFocus){if(this.options.useAjax){window.focusHandler.saveFocusState(this.options.focusHandlerKey,`[data-focus-id="${e.dataset.focusId}"]`);return}window.focusHandler.saveFocusStatePersistent(this.options.focusHandlerKey,`[data-focus-id="${e.dataset.focusId}"]`)}}_resumeFocusState(){if(this.options.autoFocus){if(this.options.useAjax){window.focusHandler.resumeFocusState(this.options.focusHandlerKey);return}window.focusHandler.resumeFocusStatePersistent(this.options.focusHandlerKey)}}}},9068:(e,t,s)=>{s.d(t,{A:()=>r});class r{constructor(){this._request=null,this._errorHandlingInternal=!1}get(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/json",r=this._createPreparedRequest("GET",e,s);return this._sendRequest(r,null,t)}post(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("POST",e,r);return this._sendRequest(i,t,s)}delete(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("DELETE",e,r);return this._sendRequest(i,t,s)}patch(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("PATCH",e,r);return this._sendRequest(i,t,s)}abort(){if(this._request)return this._request.abort()}setErrorHandlingInternal(e){this._errorHandlingInternal=e}_registerOnLoaded(e,t){t&&(!0===this._errorHandlingInternal?(e.addEventListener("load",()=>{t(e.responseText,e)}),e.addEventListener("abort",()=>{console.warn(`the request to ${e.responseURL} was aborted`)}),e.addEventListener("error",()=>{console.warn(`the request to ${e.responseURL} failed with status ${e.status}`)}),e.addEventListener("timeout",()=>{console.warn(`the request to ${e.responseURL} timed out`)})):e.addEventListener("loadend",()=>{t(e.responseText,e)}))}_sendRequest(e,t,s){return this._registerOnLoaded(e,s),e.send(t),e}_getContentType(e,t){return e instanceof FormData&&(t=!1),t}_createPreparedRequest(e,t,s){return this._request=new XMLHttpRequest,this._request.open(e,t),this._request.setRequestHeader("X-Requested-With","XMLHttpRequest"),s&&this._request.setRequestHeader("Content-type",s),this._request}}},77:(e,t,s)=>{s.d(t,{Ay:()=>u,Kq:()=>a});var r=s(4632);let i="modal-backdrop",n="modal-backdrop-open",o="no-scroll",a=350,c={ON_CLICK:"backdrop/onclick"};class h{constructor(){return h.instance||(h.instance=this),h.instance}create(e){this._removeExistingBackdrops(),document.body.insertAdjacentHTML("beforeend",this._getTemplate());let t=document.body.lastChild;document.documentElement.classList.add(o),setTimeout(function(){t.classList.add(n),"function"==typeof e&&e()},75),this._dispatchEvents()}remove(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;this._getBackdrops().forEach(e=>e.classList.remove(n)),setTimeout(this._removeExistingBackdrops.bind(this),e),document.documentElement.classList.remove(o)}_dispatchEvents(){let e=r.A.isTouchDevice()?"touchstart":"click";document.addEventListener(e,function(e){e.target.classList.contains(i)&&document.dispatchEvent(new CustomEvent(c.ON_CLICK))})}_getBackdrops(){return document.querySelectorAll(`.${i}`)}_removeExistingBackdrops(){!1!==this._exists()&&this._getBackdrops().forEach(e=>e.remove())}_exists(){return document.querySelectorAll(`.${i}`).length>0}_getTemplate(){return`<div class="${i}"></div>`}}let l=Object.freeze(new h);class u{static create(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;l.create(e)}static remove(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;l.remove(e)}static SELECTOR_CLASS(){return i}}},1088:(e,t,s)=>{s.d(t,{A:()=>r});class r{static serialize(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];if("FORM"!==e.nodeName){if(t)throw Error("The passed element is not a form!");return{}}return new FormData(e)}static serializeJson(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],s=r.serialize(e,t);if(!(s instanceof FormData)&&0===Object.keys(s).length||s instanceof FormData&&0===Array.from(s.entries()).length)return{};let i={};for(let[e,t]of s.entries())i[e]=t;return i}}},5683:(e,t,s)=>{s.d(t,{A:()=>n,c:()=>i});let r="loader",i={BEFORE:"before",AFTER:"after",INNER:"inner"};class n{constructor(e,t=i.BEFORE){this.parent=e instanceof Element?e:document.body.querySelector(e),this.position=t}create(){if(!this.exists()){if(this.position===i.INNER){this.parent.innerHTML=n.getTemplate();return}this.parent.insertAdjacentHTML(this._getPosition(),n.getTemplate())}}remove(){this.parent.querySelectorAll(`.${r}`).forEach(e=>e.remove())}exists(){return this.parent.querySelectorAll(`.${r}`).length>0}_getPosition(){return this.position===i.BEFORE?"afterbegin":"beforeend"}static getTemplate(){return`<div class="${r}" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`}static SELECTOR_CLASS(){return r}}},3121:(e,t,s)=>{s.d(t,{A:()=>a});var r=s(5683),i=s(77);class n extends r.A{constructor(){super(document.body)}create(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];!this.exists()&&e&&(i.Ay.create(),document.querySelector(`.${i.Ay.SELECTOR_CLASS()}`).insertAdjacentHTML("beforeend",r.A.getTemplate()))}remove(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];super.remove(),e&&i.Ay.remove()}}let o=Object.freeze(new n);class a{static create(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];o.create(e)}static remove(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];o.remove(e)}}}}]);