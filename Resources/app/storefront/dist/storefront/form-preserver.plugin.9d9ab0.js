"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["form-preserver.plugin"],{7642:(e,t,r)=>{r.d(t,{Z:()=>a});var s=r(1374);class o{setItem(e,t){return this._storage[e]=t}getItem(e){return Object.prototype.hasOwnProperty.call(this._storage,e)?this._storage[e]:null}removeItem(e){return delete this._storage[e]}key(e){return Object.values(this._storage)[e]||null}clear(){return this._storage={}}constructor(){this._storage={}}}class i{_chooseStorage(){return i._isSupported("localStorage")?this._storage=window.localStorage:i._isSupported("sessionStorage")?this._storage=window.sessionStorage:s.Z.isSupported()?this._storage=s.Z:this._storage=new o}static _isSupported(e){try{let t="__storage_test";return window[e].setItem(t,"1"),window[e].removeItem(t),!0}catch(e){return!1}}_validateStorage(){if("function"!=typeof this._storage.setItem)throw Error('The storage must have a "setItem" function');if("function"!=typeof this._storage.getItem)throw Error('The storage must have a "getItem" function');if("function"!=typeof this._storage.removeItem)throw Error('The storage must have a "removeItem" function');if("function"!=typeof this._storage.key)throw Error('The storage must have a "key" function');if("function"!=typeof this._storage.clear)throw Error('The storage must have a "clear" function')}getStorage(){return this._storage}constructor(){this._storage=null,this._chooseStorage(),this._validateStorage()}}let a=Object.freeze(new i).getStorage()},3848:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h});var s=r(9610),o=r(4049),i=r(9568),a=r(7642);let n="checkbox",l="select-multiple";class h extends i.Z{init(){this.storage=a.Z,this.storedKeys=[],this._prepareElements(),this._registerFormEvent()}_prepareElements(){let e=this.el.elements,t=o.Z.querySelectorAll(document,':not(form) > [form="'.concat(this.el.id,'"]'),this.options.strictMode);e=Array.from(e),this.formElements=e.concat(Array.from(t)),this.formElements.forEach(e=>{let t=e.type;this.options.ignoredElementTypes.includes(t)||(this._registerFormElementEvent(e),this._setElementValue(e,t))})}_registerFormElementEvent(e){let t=s.Z.debounce(this._onInput.bind(this),this.options.delay);if(this.options.elementTypesForInputEvent.includes(e.type)){e.addEventListener("input",t);return}e.addEventListener("change",this._onChange.bind(this))}_setElementValue(e,t){let r=this._generateKey(e.name),s=this.storage.getItem(r);if(null!==s){if(this.storedKeys.push(r),t===n){e.checked=s;return}if(t===l){this._setMultiSelectValues(e,s);return}if("radio"===t){s===e.value&&(e.checked=!0);return}e.value=s}}_onInput(e){this._setToStorage(e.target)}_onChange(e){this._setToStorage(e.target)}_setToStorage(e){let t=this._generateKey(e.name);this.storedKeys.push(t);let r=e.type;if(r===n){e.checked?this.storage.setItem(t,!0):this.storage.removeItem(t);return}if(r===l){this._storeMultiSelect(e,t);return}if(""!==e.value){this.storage.setItem(t,e.value);return}this.storage.removeItem(t)}_storeMultiSelect(e,t){let r=e.selectedOptions;if(0===r.length){this.storage.removeItem(t);return}let s=Array.from(r).map(e=>e.value);this.storage.setItem(t,s)}_setMultiSelectValues(e,t){let r=t.split(","),s=e.options;for(let e=0;e<s.length;e++){let t=s[e];r.includes(t.value)&&(t.selected=!0)}}_registerFormEvent(){this.el.addEventListener("submit",()=>this._clearStorage()),this.el.addEventListener("reset",()=>this._clearStorage())}_clearStorage(){this.storedKeys.forEach(e=>{this.storage.removeItem(e)})}_generateKey(e){return"".concat(this.el.id,".").concat(e)}}h.options={strictMode:!1,ignoredElementTypes:["button","file","hidden","image","password","reset","submit"],elementTypesForInputEvent:["date","datetime-local","email","month","number","search","tel","text","textarea","time","week","url"],delay:300}}}]);