"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[37098],{7098:(e,t,r)=>{r.d(t,{DRACOLoader:()=>i});var o=r(9451);let s=new WeakMap;class i extends o.Loader{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,r,s){let i=new o.FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,e=>{this.parse(e,t,s)},r,s)}parse(e,t,r){this.decodeDracoFile(e,t,null,null,o.SRGBColorSpace).catch(r)}decodeDracoFile(e,t,r,s,i=o.LinearSRGBColorSpace){let a={attributeIDs:r||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!r,vertexColorSpace:i};return this.decodeGeometry(e,a).then(t)}decodeGeometry(e,t){let r;let o=JSON.stringify(t);if(s.has(e)){let t=s.get(e);if(t.key===o)return t.promise;if(0===e.byteLength)throw Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i=this.workerNextTaskID++,a=e.byteLength,n=this._getWorker(i,a).then(o=>(r=o,new Promise((o,s)=>{r._callbacks[i]={resolve:o,reject:s},r.postMessage({type:"decode",id:i,taskConfig:t,buffer:e},[e])}))).then(e=>this._createGeometry(e.geometry));return n.catch(()=>!0).then(()=>{r&&i&&this._releaseTask(r,i)}),s.set(e,{key:o,promise:n}),n}_createGeometry(e){let t=new o.BufferGeometry;e.index&&t.setIndex(new o.BufferAttribute(e.index.array,1));for(let r=0;r<e.attributes.length;r++){let s=e.attributes[r],i=s.name,a=s.array,n=s.itemSize,l=new o.BufferAttribute(a,n);"color"===i&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=a instanceof Float32Array==!1),t.setAttribute(i,l)}return t}_assignVertexColorSpace(e,t){if(t!==o.SRGBColorSpace)return;let r=new o.Color;for(let t=0,o=e.count;t<o;t++)r.fromBufferAttribute(e,t).convertSRGBToLinear(),e.setXYZ(t,r.r,r.g,r.b)}_loadLibrary(e,t){let r=new o.FileLoader(this.manager);return r.setPath(this.decoderPath),r.setResponseType(t),r.setWithCredentials(this.withCredentials),new Promise((t,o)=>{r.load(e,t,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e="object"!=typeof WebAssembly||"js"===this.decoderConfig.type,t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(t=>{let r=t[0];e||(this.decoderConfig.wasmBinary=t[1]);let o=a.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let e=new Worker(this.workerSourceURL);e._callbacks={},e._taskCosts={},e._taskLoad=0,e.postMessage({type:"init",decoderConfig:this.decoderConfig}),e.onmessage=function(t){let r=t.data;switch(r.type){case"decode":e._callbacks[r.id].resolve(r);break;case"error":e._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(e)}else this.workerPool.sort(function(e,t){return e._taskLoad>t._taskLoad?-1:1});let r=this.workerPool[this.workerPool.length-1];return r._taskCosts[e]=t,r._taskLoad+=t,r})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,""!==this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),this}}function a(){let e,t;onmessage=function(r){let o=r.data;switch(o.type){case"init":e=o.decoderConfig,t=new Promise(function(t){e.onModuleLoaded=function(e){t({draco:e})},DracoDecoderModule(e)});break;case"decode":let s=o.buffer,i=o.taskConfig;t.then(e=>{let t=e.draco,r=new t.Decoder;try{let e=function(e,t,r,o){let s,i;let a=o.attributeIDs,n=o.attributeTypes,l=t.GetEncodedGeometryType(r);if(l===e.TRIANGULAR_MESH)s=new e.Mesh,i=t.DecodeArrayToMesh(r,r.byteLength,s);else if(l===e.POINT_CLOUD)s=new e.PointCloud,i=t.DecodeArrayToPointCloud(r,r.byteLength,s);else throw Error("THREE.DRACOLoader: Unexpected geometry type.");if(!i.ok()||0===s.ptr)throw Error("THREE.DRACOLoader: Decoding failed: "+i.error_msg());let d={index:null,attributes:[]};for(let r in a){let i,l;let c=self[n[r]];if(o.useUniqueIDs)l=a[r],i=t.GetAttributeByUniqueId(s,l);else{if(-1===(l=t.GetAttributeId(s,e[a[r]])))continue;i=t.GetAttribute(s,l)}let u=function(e,t,r,o,s,i){let a=i.num_components(),n=r.num_points()*a,l=n*s.BYTES_PER_ELEMENT,d=function(e,t){switch(t){case Float32Array:return e.DT_FLOAT32;case Int8Array:return e.DT_INT8;case Int16Array:return e.DT_INT16;case Int32Array:return e.DT_INT32;case Uint8Array:return e.DT_UINT8;case Uint16Array:return e.DT_UINT16;case Uint32Array:return e.DT_UINT32}}(e,s),c=e._malloc(l);t.GetAttributeDataArrayForAllPoints(r,i,d,l,c);let u=new s(e.HEAPF32.buffer,c,n).slice();return e._free(c),{name:o,array:u,itemSize:a}}(e,t,s,r,c,i);"color"===r&&(u.vertexColorSpace=o.vertexColorSpace),d.attributes.push(u)}return l===e.TRIANGULAR_MESH&&(d.index=function(e,t,r){let o=3*r.num_faces(),s=4*o,i=e._malloc(s);t.GetTrianglesUInt32Array(r,s,i);let a=new Uint32Array(e.HEAPF32.buffer,i,o).slice();return e._free(i),{array:a,itemSize:1}}(e,t,s)),e.destroy(s),d}(t,r,new Int8Array(s),i),a=e.attributes.map(e=>e.array.buffer);e.index&&a.push(e.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:e},a)}catch(e){console.error(e),self.postMessage({type:"error",id:o.id,error:e.message})}finally{t.destroy(r)}})}}}}}]);