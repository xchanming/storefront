"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[52139],{2139:(i,e,t)=>{t.r(e),t.d(e,{default:()=>p});var s=t(8077);class l{static #i=this.options={zoomSliderPositionAttribute:"data-zoom-product-slider-position",gallerySliderSelector:".gallery-slider-row",zoomModalSelector:"[data-zoom-modal]",zoomModalActionsSelector:".zoom-modal-actions",zoomSliderDisabledClass:"gallery-slider-canvas-disabled"};constructor(i){if(this.plugin=i,!this.plugin.el)return;let e=this.plugin.el.closest(l.options.gallerySliderSelector);if(!e)return;let t=e.querySelector(l.options.zoomModalSelector);if(!t)return;this.zoomModalElement=t,this.zoomModalPlugin=window.PluginManager.getPluginInstanceFromElement(this.zoomModalElement,"ZoomModal"),this.zoomModalPlugin.$emitter.subscribe("initSlider",()=>{this.plugin.initViewer(!0)})}initViewer(){this.sliderPlugin=this.zoomModalPlugin.gallerySliderPlugin,this.tnsSlider=this.sliderPlugin?._slider,(this.tnsSlider?.getInfo().index??0)==this.plugin.sliderIndex&&(this.changeZoomActionsVisibility(!1),this.plugin.startRendering()),this.initEventListeners()}initEventListeners(){this.tnsSlider?.events.on("indexChanged",this.indexChangedEvent.bind(this)),this.sliderPlugin?.$emitter.subscribe("rebuild",this.rebuildEvent.bind(this))}rebuildEvent(i){this.plugin.setReady(!1),this.plugin.el=i.target.querySelector(`[${l.options.zoomSliderPositionAttribute}="${this.plugin.sliderIndex}"]`),this.plugin.initViewer(!1),this.initViewer()}indexChangedEvent(i){this.plugin.sliderIndex==i.index?setTimeout(()=>{this.plugin.sliderIndex==this.tnsSlider.getInfo().index&&(this.changeZoomActionsVisibility(!1),this.plugin.startRendering())},500):(this.changeZoomActionsVisibility(!0),this.plugin.stopRendering())}changeZoomActionsVisibility(i){let e=document.querySelector(l.options.zoomModalActionsSelector);i?e?.classList.remove("d-none"):e?.classList.add("d-none")}removeDisabled(){this.plugin.el?.parentElement?.parentElement?.classList.remove(l.options.zoomSliderDisabledClass)}}var n=t(5469),o=t(4161),r=t(7073),a=t(9183),d=t(9943),h=t(6896);class p extends s.Z{async init(){await (0,h.n)(),this.el&&(this.sliderIndex=Number(this.options.sliderPosition),this.SpatialZoomGallerySliderRenderUtil=new l(this),this.SpatialZoomGallerySliderRenderUtil.removeDisabled(),this.initViewer(!0))}initViewer(){let i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(super.initViewer(i),this.renderer?.setClearColor(16777215,0),this.camera?.position.set(0,.6,1.2),this.camera?.lookAt(0,0,0),void 0!=this.spatialOrbitControlsUtil&&this.spatialOrbitControlsUtil.dispose(),this.camera&&this.renderer&&(this.spatialOrbitControlsUtil=new r.Z(this.camera,this.renderer.domElement)),this.spatialMovementNoteUtil=new a.Z(this),this.spatialCanvasSizeUpdateUtil=new n.Z(this),(void 0==this.spatialLightCompositionUtil||i)&&(this.spatialLightCompositionUtil?.dispose(),this.scene&&(this.spatialLightCompositionUtil=new d.Z(this.scene,this.options.lightIntensity))),(void 0==this.spatialObjectLoaderUtil||i)&&(this.spatialObjectLoaderUtil=new o.Z(this)),null==this.model||i){let i=this.options.modelUrl;if(null==i)return;this.spatialObjectLoaderUtil.loadSingleObjectByUrl(i,{center:!0,clampSize:!0,clampMaxSize:{x:window.innerWidth/window.innerHeight,y:1,z:window.innerWidth/window.innerHeight}}).then(i=>{this.model=i,this.scene?.add(this.model),this.setReady(!0)}).catch(()=>{this.el?.parentElement?.parentElement?.classList.add("gallery-slider-canvas-disabled")})}else this.setReady(!0);this.SpatialZoomGallerySliderRenderUtil?.initViewer()}preRender(i){this.spatialCanvasSizeUpdateUtil?.update(),this.spatialOrbitControlsUtil?.update()}postRender(i){}constructor(...i){super(...i),this.model=null}}}}]);