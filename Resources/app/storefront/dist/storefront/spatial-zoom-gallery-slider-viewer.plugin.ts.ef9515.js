"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["spatial-zoom-gallery-slider-viewer.plugin.ts"],{2139:(i,e,t)=>{t.r(e),t.d(e,{default:()=>u});var l=t(8077);class s{initViewer(){var i,e,t;this.sliderPlugin=this.zoomModalPlugin.gallerySliderPlugin,this.tnsSlider=(i=this.sliderPlugin)===null||void 0===i?void 0:i._slider,((t=(e=this.tnsSlider)===null||void 0===e?void 0:e.getInfo().index)!==null&&void 0!==t?t:0)==this.plugin.sliderIndex&&(this.changeZoomActionsVisibility(!1),this.plugin.startRendering()),this.initEventListeners()}initEventListeners(){var i,e;(i=this.tnsSlider)===null||void 0===i||i.events.on("indexChanged",this.indexChangedEvent.bind(this)),(e=this.sliderPlugin)===null||void 0===e||e.$emitter.subscribe("rebuild",this.rebuildEvent.bind(this))}rebuildEvent(i){this.plugin.setReady(!1),this.plugin.el=i.target.querySelector("[".concat(s.options.zoomSliderPositionAttribute,'="').concat(this.plugin.sliderIndex,'"]')),this.plugin.initViewer(!1),this.initViewer()}indexChangedEvent(i){this.plugin.sliderIndex==i.index?setTimeout(()=>{this.plugin.sliderIndex==this.tnsSlider.getInfo().index&&(this.changeZoomActionsVisibility(!1),this.plugin.startRendering())},500):(this.changeZoomActionsVisibility(!0),this.plugin.stopRendering())}changeZoomActionsVisibility(i){let e=document.querySelector(s.options.zoomModalActionsSelector);i?null==e||e.classList.remove("d-none"):null==e||e.classList.add("d-none")}removeDisabled(){var i,e,t;(t=this.plugin.el)===null||void 0===t||(e=t.parentElement)===null||void 0===e||(i=e.parentElement)===null||void 0===i||i.classList.remove(s.options.zoomSliderDisabledClass)}constructor(i){if(this.plugin=i,!this.plugin.el)return;let e=this.plugin.el.closest(s.options.gallerySliderSelector);if(!e)return;let t=e.querySelector(s.options.zoomModalSelector);if(!t)return;this.zoomModalElement=t,this.zoomModalPlugin=window.PluginManager.getPluginInstanceFromElement(this.zoomModalElement,"ZoomModal"),this.zoomModalPlugin.$emitter.subscribe("initSlider",()=>{this.plugin.initViewer(!0)})}}s.options={zoomSliderPositionAttribute:"data-zoom-product-slider-position",gallerySliderSelector:".gallery-slider-row",zoomModalSelector:"[data-zoom-modal]",zoomModalActionsSelector:".zoom-modal-actions",zoomSliderDisabledClass:"gallery-slider-canvas-disabled"};var n=t(5469),o=t(4161),r=t(7073),d=t(9183),a=t(9943),h=t(6896);class u extends l.Z{async init(){await (0,h.n)(),this.el&&(this.sliderIndex=Number(this.options.sliderPosition),this.SpatialZoomGallerySliderRenderUtil=new s(this),this.SpatialZoomGallerySliderRenderUtil.removeDisabled(),this.initViewer(!0))}initViewer(){var i,e,t,l,s;let h=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(super.initViewer(h),(i=this.renderer)===null||void 0===i||i.setClearColor(16777215,0),(e=this.camera)===null||void 0===e||e.position.set(0,.6,1.2),(t=this.camera)===null||void 0===t||t.lookAt(0,0,0),void 0!=this.spatialOrbitControlsUtil&&this.spatialOrbitControlsUtil.dispose(),this.camera&&this.renderer&&(this.spatialOrbitControlsUtil=new r.Z(this.camera,this.renderer.domElement)),this.spatialMovementNoteUtil=new d.Z(this),this.spatialCanvasSizeUpdateUtil=new n.Z(this),(void 0==this.spatialLightCompositionUtil||h)&&((s=this.spatialLightCompositionUtil)===null||void 0===s||s.dispose(),this.scene&&(this.spatialLightCompositionUtil=new a.Z(this.scene,this.options.lightIntensity))),(void 0==this.spatialObjectLoaderUtil||h)&&(this.spatialObjectLoaderUtil=new o.Z(this)),null==this.model||h){let i=this.options.modelUrl;if(null==i)return;this.spatialObjectLoaderUtil.loadSingleObjectByUrl(i,{center:!0,clampSize:!0,clampMaxSize:{x:window.innerWidth/window.innerHeight,y:1,z:window.innerWidth/window.innerHeight}}).then(i=>{var e;this.model=i,(e=this.scene)===null||void 0===e||e.add(this.model),this.setReady(!0)}).catch(()=>{var i,e,t;(t=this.el)===null||void 0===t||(e=t.parentElement)===null||void 0===e||(i=e.parentElement)===null||void 0===i||i.classList.add("gallery-slider-canvas-disabled")})}else this.setReady(!0);(l=this.SpatialZoomGallerySliderRenderUtil)===null||void 0===l||l.initViewer()}preRender(i){var e,t;(e=this.spatialCanvasSizeUpdateUtil)===null||void 0===e||e.update(),(t=this.spatialOrbitControlsUtil)===null||void 0===t||t.update()}postRender(i){}constructor(...i){super(...i),this.model=null}}}}]);