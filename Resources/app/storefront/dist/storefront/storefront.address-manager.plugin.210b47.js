"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[46473],{6473:(e,t,s)=>{s.r(t),s.d(t,{default:()=>l});var r=s(4335),i=s(9068),n=s(8860),o=s(44);let a="shipping",d="billing";class l extends r.A{static #e=this.options={activeBillingAddressId:null,activeShippingAddressId:null,initialTab:null,addressModalDialogScrollableClass:"modal-dialog-scrollable",addressModalDialogSelectorClass:"modal-dialog-address",dropdownSelector:".dropdown",addressEditFormSelector:".address-manager-modal-address-form",shippingAddressTabSelector:"#shipping-address-tab",billingAddressTabSelector:"#billing-address-tab",shippingTabPaneSelector:"#shipping-address-tab-pane",billingTabPaneSelector:"#billing-address-tab-pane",addressManagerModalSelector:".address-manager-modal",addressEditCancelSelector:".address-form-create-cancel",addressEditSubmitSelector:".address-form-create-submit",setDefaultAddressSelector:".address-manager-modal-set-default-address",addressEditorFormSubmitSelector:"#address-manager-modal-address-form",currentShippingIdSelector:".address-manager-modal-currentShippingId",currentBillingIdSelector:".address-manager-modal-currentBillingId",addressSelectItemSelector:".address-manager-select-address",addressManagerUrl:"/widgets/account/address-manager",addressSwitchUrl:"/account/address/switch"};init(){[a,d].includes(this.options.initialTab)||(console.warn(`[AddressManagerPlugin] options.initialTab was expected to be 'billing' or 'shipping', got '${this.options.initialTab}'`),this.options.initialTab=a),this.el.removeEventListener("click",this._getModal.bind(this)),this.el.addEventListener("click",this._getModal.bind(this)),this._client=new i.A,this._registerEvents()}_registerEvents(){document.querySelectorAll(this.options.addressEditFormSelector).forEach(e=>{e.addEventListener("click",this._onRenderAddressForm.bind(this,e))}),document.querySelectorAll(this.options.setDefaultAddressSelector).forEach(e=>{e.addEventListener("click",this._onChangeDefaultAddress.bind(this,e))}),document.querySelectorAll(this.options.addressSelectItemSelector).forEach(e=>{e.addEventListener("click",this._onSetRadioInputActive.bind(this,e))}),document.querySelector(this.options.shippingAddressTabSelector)?.addEventListener("click",this._onSwitchToShippingTab.bind(this)),document.querySelector(this.options.billingAddressTabSelector)?.addEventListener("click",this._onSwitchToBillingTab.bind(this)),document.querySelector(this.options.addressEditorFormSubmitSelector)?.addEventListener("submit",this._onSaveChanges.bind(this)),document.querySelector(this.options.addressEditCancelSelector)?.addEventListener("click",this._onEditAddressCancel.bind(this))}_getModal(e){e.preventDefault(),this._btnLoader=new o.A(e.currentTarget),this._btnLoader.create(),this._client.get(this.options.addressManagerUrl,e=>{this._renderModal(e),this._registerEvents()})}_renderModal(e){let t=new n.A(e);t.open(()=>this._btnLoader.remove(),0);let s=t.getModal();s.children[0].classList.add(this.options.addressModalDialogScrollableClass,this.options.addressModalDialogSelectorClass),this.options.initialTab===d?(s.querySelector(this.options.billingAddressTabSelector).checked=!0,this._onSwitchToBillingTab()):s.querySelector(this.options.shippingAddressTabSelector).checked=!0,window.PluginManager.initializePlugins()}_onSwitchToBillingTab(){document.querySelector(this.options.billingAddressTabSelector).checked=!0,document.querySelector(this.options.shippingTabPaneSelector).classList.remove("show","active"),document.querySelector(this.options.billingTabPaneSelector).classList.add("show","active")}_onSwitchToShippingTab(){document.querySelector(this.options.shippingAddressTabSelector).checked=!0,document.querySelector(this.options.billingTabPaneSelector).classList.remove("show","active"),document.querySelector(this.options.shippingTabPaneSelector).classList.add("show","active")}_onSaveChanges(e){e.preventDefault(),this._client.post(e.currentTarget.action,new FormData(e.target),(e,t)=>{if(204===t.status)return location.reload();this._replaceModalContent(e)})}_onSetRadioInputActive(e,t){if(t.target.closest(this.options.dropdownSelector))return;let s=e.querySelector('input[type="radio"]').value,r=e.querySelector('input[type="radio"]')?.dataset?.addressType;if(!s||!r){console.warn("[AddressManagerPlugin] Radio input is missing id or address type");return}r===a?document.querySelector(this.options.currentShippingIdSelector).value=s:document.querySelector(this.options.currentBillingIdSelector).value=s,e.querySelector('input[type="radio"]').checked=!0}_onChangeDefaultAddress(e){let t=e?.dataset?.addressId,s=e?.dataset?.addressType;if(!t||!s){console.warn("[AddressManagerPlugin] Default button is missing address id or type attribute");return}this._client.post(this.options.addressSwitchUrl,JSON.stringify({id:t,type:s}),e=>this._replaceModalContent(e,s))}_onRenderAddressForm(e){let t=e?.dataset?.addressId,s=e?.dataset?.addressType;if(!s){console.warn("[AddressManagerPlugin] Form is missing address type attribute");return}this._client.post(`${this.options.addressManagerUrl}${t?`/${t}`:""}?type=${s}`,"",e=>this._replaceModalContent(e))}_onEditAddressCancel(e){let t=e.currentTarget?.dataset?.addressType;this._client.get(this.options.addressManagerUrl,e=>this._replaceModalContent(e,t))}_replaceModalContent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,s=new DOMParser().parseFromString(e,"text/html").querySelector("body").children;document.querySelector(this.options.addressManagerModalSelector).parentElement.replaceChildren(...s),t===d&&this._onSwitchToBillingTab(),window.PluginManager.initializePlugins(),this._registerEvents()}}},9068:(e,t,s)=>{s.d(t,{A:()=>r});class r{constructor(){this._request=null,this._errorHandlingInternal=!1}get(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/json",r=this._createPreparedRequest("GET",e,s);return this._sendRequest(r,null,t)}post(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("POST",e,r);return this._sendRequest(i,t,s)}delete(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("DELETE",e,r);return this._sendRequest(i,t,s)}patch(e,t,s){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";r=this._getContentType(t,r);let i=this._createPreparedRequest("PATCH",e,r);return this._sendRequest(i,t,s)}abort(){if(this._request)return this._request.abort()}setErrorHandlingInternal(e){this._errorHandlingInternal=e}_registerOnLoaded(e,t){t&&(!0===this._errorHandlingInternal?(e.addEventListener("load",()=>{t(e.responseText,e)}),e.addEventListener("abort",()=>{console.warn(`the request to ${e.responseURL} was aborted`)}),e.addEventListener("error",()=>{console.warn(`the request to ${e.responseURL} failed with status ${e.status}`)}),e.addEventListener("timeout",()=>{console.warn(`the request to ${e.responseURL} timed out`)})):e.addEventListener("loadend",()=>{t(e.responseText,e)}))}_sendRequest(e,t,s){return this._registerOnLoaded(e,s),e.send(t),e}_getContentType(e,t){return e instanceof FormData&&(t=!1),t}_createPreparedRequest(e,t,s){return this._request=new XMLHttpRequest,this._request.open(e,t),this._request.setRequestHeader("X-Requested-With","XMLHttpRequest"),s&&this._request.setRequestHeader("Content-type",s),this._request}}},77:(e,t,s)=>{s.d(t,{Ay:()=>h,Kq:()=>a});var r=s(4632);let i="modal-backdrop",n="modal-backdrop-open",o="no-scroll",a=350,d={ON_CLICK:"backdrop/onclick"};class l{constructor(){return l.instance||(l.instance=this),l.instance}create(e){this._removeExistingBackdrops(),document.body.insertAdjacentHTML("beforeend",this._getTemplate());let t=document.body.lastChild;document.documentElement.classList.add(o),setTimeout(function(){t.classList.add(n),"function"==typeof e&&e()},75),this._dispatchEvents()}remove(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;this._getBackdrops().forEach(e=>e.classList.remove(n)),setTimeout(this._removeExistingBackdrops.bind(this),e),document.documentElement.classList.remove(o)}_dispatchEvents(){let e=r.A.isTouchDevice()?"touchstart":"click";document.addEventListener(e,function(e){e.target.classList.contains(i)&&document.dispatchEvent(new CustomEvent(d.ON_CLICK))})}_getBackdrops(){return document.querySelectorAll(`.${i}`)}_removeExistingBackdrops(){!1!==this._exists()&&this._getBackdrops().forEach(e=>e.remove())}_exists(){return document.querySelectorAll(`.${i}`).length>0}_getTemplate(){return`<div class="${i}"></div>`}}let c=Object.freeze(new l);class h{static create(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;c.create(e)}static remove(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;c.remove(e)}static SELECTOR_CLASS(){return i}}},44:(e,t,s)=>{s.d(t,{A:()=>i});var r=s(5683);class i extends r.A{constructor(e,t="before"){if(super(e,t),!this._isButtonElement()&&!this._isAnchorElement())throw Error("Parent element is not of type <button> or <a>")}create(){super.create(),this._isButtonElement()?this.parent.disabled=!0:this._isAnchorElement()&&this.parent.classList.add("disabled")}remove(){super.remove(),this._isButtonElement()?this.parent.disabled=!1:this._isAnchorElement()&&this.parent.classList.remove("disabled")}_isButtonElement(){return"button"===this.parent.tagName.toLowerCase()}_isAnchorElement(){return"a"===this.parent.tagName.toLowerCase()}}},5683:(e,t,s)=>{s.d(t,{A:()=>n,c:()=>i});let r="loader",i={BEFORE:"before",AFTER:"after",INNER:"inner"};class n{constructor(e,t=i.BEFORE){this.parent=e instanceof Element?e:document.body.querySelector(e),this.position=t}create(){if(!this.exists()){if(this.position===i.INNER){this.parent.innerHTML=n.getTemplate();return}this.parent.insertAdjacentHTML(this._getPosition(),n.getTemplate())}}remove(){this.parent.querySelectorAll(`.${r}`).forEach(e=>e.remove())}exists(){return this.parent.querySelectorAll(`.${r}`).length>0}_getPosition(){return this.position===i.BEFORE?"afterbegin":"beforeend"}static getTemplate(){return`<div class="${r}" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`}static SELECTOR_CLASS(){return r}}},8860:(e,t,s)=>{s.d(t,{A:()=>o});var r=s(77);let i="js-pseudo-modal",n="js-pseudo-modal-template-root-element";class o{constructor(e,t=!0,s=".js-pseudo-modal-template",r=".js-pseudo-modal-template-content-element",i=".js-pseudo-modal-template-title-element"){this._content=e,this._useBackdrop=t,this._templateSelector=s,this._templateContentSelector=r,this._templateTitleSelector=i}open(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.Kq;this._hideExistingModal(),this._create(),setTimeout(this._open.bind(this,e),t)}close(){let e=this.getModal();this._modalInstance=bootstrap.Modal.getInstance(e),this._modalInstance.hide()}getModal(){return this._modal||this._create(),this._modal}updatePosition(){this._modalInstance.handleUpdate()}updateContent(e,t){this._content=e,this._setModalContent(e),this.updatePosition(),"function"==typeof t&&t.bind(this)()}_hideExistingModal(){try{let e=document.querySelector(`.${i} .modal`);if(!e)return;let t=bootstrap.Modal.getInstance(e);if(!t)return;t.hide()}catch(e){console.warn(`[PseudoModalUtil] Unable to hide existing pseudo modal before opening pseudo modal: ${e.message}`)}}_open(e){this.getModal(),this._modal.addEventListener("hidden.bs.modal",this._modalWrapper.remove),this._modal.addEventListener("shown.bs.modal",e),this._modal.addEventListener("hide.bs.modal",()=>{document.activeElement instanceof HTMLElement&&document.activeElement.blur()}),this._modalInstance.show()}_create(){this._modalMarkupEl=document.querySelector(this._templateSelector),this._createModalWrapper(),this._modalWrapper.innerHTML=this._content,this._modal=this._createModalMarkup(),this._modalInstance=new bootstrap.Modal(this._modal,{backdrop:this._useBackdrop}),document.body.insertAdjacentElement("beforeend",this._modalWrapper)}_createModalWrapper(){this._modalWrapper=document.querySelector(`.${i}`),this._modalWrapper||(this._modalWrapper=document.createElement("div"),this._modalWrapper.classList.add(i))}_createModalMarkup(){let e=this._modalWrapper.querySelector(".modal");if(e)return e;let t=this._modalWrapper.innerHTML;return this._modalWrapper.innerHTML=this._modalMarkupEl.innerHTML,this._setModalContent(t),this._modalWrapper.querySelector(".modal")}_setModalTitle(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";try{this._modalWrapper.querySelector(this._templateTitleSelector).innerHTML=e}catch(e){}}_setModalContent(e){let t=this._modalWrapper.querySelector(this._templateContentSelector);t.innerHTML=e;let s=t.querySelector(`.${n}`);if(s){this._modalWrapper.querySelector(`.${n}`).replaceChildren(s);return}try{let e=t.querySelector(this._templateTitleSelector);e&&(this._setModalTitle(e.innerHTML),e.parentNode.removeChild(e))}catch(e){}}}}}]);