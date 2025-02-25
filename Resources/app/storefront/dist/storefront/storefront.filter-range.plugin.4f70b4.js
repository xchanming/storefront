"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[66981],{3701:(t,e,i)=>{i.d(e,{A:()=>n});var s=i(4335);class n extends s.A{static #t=this.options={parentFilterPanelSelector:".cms-element-product-listing-wrapper",dropdownSelector:".filter-panel-item-dropdown"};_init(){super._init(),this._validateMethods();let t=document.querySelector(this.options.parentFilterPanelSelector);this.listing=window.PluginManager.getPluginInstanceFromElement(t,"Listing"),this.listing.registerFilter(this),this._preventDropdownClose()}_preventDropdownClose(){let t=this.el.querySelector(this.options.dropdownSelector);t&&t.addEventListener("click",t=>{t.stopPropagation()})}_validateMethods(){if("function"!=typeof this.getValues)throw Error(`[${this._pluginName}] Needs the method "getValues"'`);if("function"!=typeof this.getLabels)throw Error(`[${this._pluginName}] Needs the method "getLabels"'`);if("function"!=typeof this.reset)throw Error(`[${this._pluginName}] Needs the method "reset"'`);if("function"!=typeof this.resetAll)throw Error(`[${this._pluginName}] Needs the method "resetAll"'`)}}},6981:(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var s=i(3701),n=i(4156),r=i.n(n);class o extends s.A{static #t=this.options=r()(s.A.options,{inputMinSelector:".min-input",inputMaxSelector:".max-input",inputInvalidCLass:"is-invalid",inputTimeout:500,minKey:"min-price",maxKey:"max-price",lowerBound:0,unit:"€",errorContainerClass:"filter-range-error",containerSelector:".filter-range-container",snippets:{filterRangeActiveMinLabel:"",filterRangeActiveMaxLabel:"",filterRangeErrorMessage:"",filterRangeLowerBoundErrorMessage:""}});init(){this._container=this.el.querySelector(this.options.containerSelector),this._inputMin=this.el.querySelector(this.options.inputMinSelector),this._inputMax=this.el.querySelector(this.options.inputMaxSelector),this._timeout=null,this._hasError=!1,this._registerEvents()}_registerEvents(){this._inputMin.addEventListener("input",this._onChangeInput.bind(this)),this._inputMax.addEventListener("input",this._onChangeInput.bind(this))}_onChangeInput(){clearTimeout(this._timeout),this._timeout=setTimeout(()=>{this._isInputInvalid()?this._setError(this._getErrorMessageTemplate("filterRangeErrorMessage")):this._isInputLowerBoundInvalid()?this._setError(this._getErrorMessageTemplate("filterRangeLowerBoundErrorMessage")):this._removeError(),this.listing.changeListing()},this.options.inputTimeout)}getValues(){let t={};return t[this.options.minKey]=this._inputMin.value,t[this.options.maxKey]=this._inputMax.value,t}_isInputInvalid(){return parseFloat(this._inputMin.value)>parseFloat(this._inputMax.value)}_isInputLowerBoundInvalid(){return parseFloat(this._inputMin.value)<this.options.lowerBound||parseFloat(this._inputMax.value)<this.options.lowerBound}_getErrorMessageTemplate(t){return`<div class="${this.options.errorContainerClass}">${this.options.snippets[t]}</div>`}_setError(t){this._hasError||(this._inputMin.classList.add(this.options.inputInvalidCLass),this._inputMax.classList.add(this.options.inputInvalidCLass),this._container.insertAdjacentHTML("afterend",t),this._hasError=!0)}_removeError(){this._inputMin.classList.remove(this.options.inputInvalidCLass),this._inputMax.classList.remove(this.options.inputInvalidCLass);let t=this.el.querySelector(`.${this.options.errorContainerClass}`);t&&t.remove(),this._hasError=!1}setValuesFromUrl(t){let e=!1;return Object.keys(t).forEach(i=>{i===this.options.minKey&&(this._inputMin.value=t[i],e=!0),i===this.options.maxKey&&(this._inputMax.value=t[i],e=!0)}),e}getLabels(){let t=[];return this._inputMin.value.length||this._inputMax.value.length?(this._inputMin.value.length&&t.push({label:`${this.options.snippets.filterRangeActiveMinLabel} ${this._inputMin.value} ${this.options.unit}`,id:this.options.minKey}),this._inputMax.value.length&&t.push({label:`${this.options.snippets.filterRangeActiveMaxLabel} ${this._inputMax.value} ${this.options.unit}`,id:this.options.maxKey})):t=[],t}reset(t){t===this.options.minKey&&(this._inputMin.value=""),t===this.options.maxKey&&(this._inputMax.value=""),this._removeError()}resetAll(){this._inputMin.value="",this._inputMax.value="",this._removeError()}}}}]);