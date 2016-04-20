'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/core/render/api');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var bind_1 = require('./bind');
var event_dispatcher_1 = require('angular2/src/web_workers/ui/event_dispatcher');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        this._bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        this._eventDispatcher = new event_dispatcher_1.EventDispatcher(this._bus.to(messaging_api_1.EVENT_CHANNEL), this._serializer);
        broker.registerMethod("renderComponent", [api_1.RenderComponentType, serializer_1.PRIMITIVE], bind_1.bind(this._renderComponent, this));
        broker.registerMethod("selectRootElement", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._selectRootElement, this));
        broker.registerMethod("createElement", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createElement, this));
        broker.registerMethod("createViewRoot", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createViewRoot, this));
        broker.registerMethod("createTemplateAnchor", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createTemplateAnchor, this));
        broker.registerMethod("createText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createText, this));
        broker.registerMethod("projectNodes", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._projectNodes, this));
        broker.registerMethod("attachViewAfter", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._attachViewAfter, this));
        broker.registerMethod("detachView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._detachView, this));
        broker.registerMethod("destroyView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._destroyView, this));
        broker.registerMethod("setElementProperty", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementProperty, this));
        broker.registerMethod("setElementAttribute", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementAttribute, this));
        broker.registerMethod("setBindingDebugInfo", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setBindingDebugInfo, this));
        broker.registerMethod("setElementClass", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementClass, this));
        broker.registerMethod("setElementStyle", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementStyle, this));
        broker.registerMethod("invokeElementMethod", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._invokeElementMethod, this));
        broker.registerMethod("setText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._setText, this));
        broker.registerMethod("listen", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listen, this));
        broker.registerMethod("listenGlobal", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listenGlobal, this));
        broker.registerMethod("listenDone", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._listenDone, this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    MessageBasedRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer, render_store_1.RenderStore, api_1.RootRenderer])
    ], MessageBasedRenderer);
    return MessageBasedRenderer;
}());
exports.MessageBasedRenderer = MessageBasedRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXRWa25iRlpwLnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1CQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELDRCQUF5Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3ZFLDJCQUF1RCw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ3BHLG9CQUEwRCw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3pGLDhCQUE4QywrQ0FBK0MsQ0FBQyxDQUFBO0FBRTlGLHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixpQ0FBOEIsOENBQThDLENBQUMsQ0FBQTtBQUM3RSw2QkFBMEIsOENBQThDLENBQUMsQ0FBQTtBQUN6RSx1Q0FBMEMsd0RBQXdELENBQUMsQ0FBQTtBQUduRztJQUdFLDhCQUFvQixjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsYUFBMkI7UUFGM0IsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQzFELGtCQUFhLEdBQWIsYUFBYSxDQUFjO0lBQUcsQ0FBQztJQUVuRCxvQ0FBSyxHQUFMO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUFhLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUFhLENBQUMsRUFBRSxJQUFJLENB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ZS9kaSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBQUklNSVRJVkUsIFJlbmRlclN0b3JlT2JqZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtSb290UmVuZGVyZXIsIFJlbmRlcmVyLCBSZW5kZXJDb21wb25lbnRUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7RVZFTlRfQ0hBTk5FTCwgUkVOREVSRVJfQ0hBTk5FTH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7YmluZH0gZnJvbSAnLi9iaW5kJztcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlcic7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfZXZlbnREaXNwYXRjaGVyOiBFdmVudERpc3BhdGNoZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBwcml2YXRlIF9idXM6IE1lc3NhZ2VCdXMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcm9vdFJlbmRlcmVyOiBSb290UmVuZGVyZXIpIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdmFyIGJyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9idXMuaW5pdENoYW5uZWwoRVZFTlRfQ0hBTk5FTCk7XG4gICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcih0aGlzLl9idXMudG8oRVZFTlRfQ0hBTk5FTCksIHRoaXMuX3NlcmlhbGl6ZXIpO1xuXG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwicmVuZGVyQ29tcG9uZW50XCIsIFtSZW5kZXJDb21wb25lbnRUeXBlLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3JlbmRlckNvbXBvbmVudCwgdGhpcykpO1xuXG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2VsZWN0Um9vdEVsZW1lbnRcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2VsZWN0Um9vdEVsZW1lbnQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVFbGVtZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVFbGVtZW50LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlVmlld1Jvb3RcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVWaWV3Um9vdCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZVRlbXBsYXRlQW5jaG9yXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlVGVtcGxhdGVBbmNob3IsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVUZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVUZXh0LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwicHJvamVjdE5vZGVzXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9wcm9qZWN0Tm9kZXMsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJhdHRhY2hWaWV3QWZ0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2F0dGFjaFZpZXdBZnRlciwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImRldGFjaFZpZXdcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fZGV0YWNoVmlldywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImRlc3Ryb3lWaWV3XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9kZXN0cm95VmlldywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudFByb3BlcnR5LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudEF0dHJpYnV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEJpbmRpbmdEZWJ1Z0luZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEJpbmRpbmdEZWJ1Z0luZm8sIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50Q2xhc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRDbGFzcywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRTdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudFN0eWxlLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiaW52b2tlRWxlbWVudE1ldGhvZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5faW52b2tlRWxlbWVudE1ldGhvZCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldFRleHRcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRUZXh0LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwibGlzdGVuXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9saXN0ZW4sIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJsaXN0ZW5HbG9iYWxcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9saXN0ZW5HbG9iYWwsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJsaXN0ZW5Eb25lXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2xpc3RlbkRvbmUsIHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbmRlckNvbXBvbmVudChyZW5kZXJDb21wb25lbnRUeXBlOiBSZW5kZXJDb21wb25lbnRUeXBlLCByZW5kZXJlcklkOiBudW1iZXIpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLl9yb290UmVuZGVyZXIucmVuZGVyQ29tcG9uZW50KHJlbmRlckNvbXBvbmVudFR5cGUpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLCByZW5kZXJlcklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdFJvb3RFbGVtZW50KHJlbmRlcmVyOiBSZW5kZXJlciwgc2VsZWN0b3I6IHN0cmluZywgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3IpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVsZW1lbnQocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50LCBuYW1lKSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVWaWV3Um9vdChyZW5kZXJlcjogUmVuZGVyZXIsIGhvc3RFbGVtZW50OiBhbnksIGVsSWQ6IG51bWJlcikge1xuICAgIHZhciB2aWV3Um9vdCA9IHJlbmRlcmVyLmNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50KTtcbiAgICBpZiAodGhpcy5fcmVuZGVyU3RvcmUuc2VyaWFsaXplKGhvc3RFbGVtZW50KSAhPT0gZWxJZCkge1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodmlld1Jvb3QsIGVsSWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVRlbXBsYXRlQW5jaG9yKHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5jcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50KSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVUZXh0KHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCB2YWx1ZTogc3RyaW5nLCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5jcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQsIHZhbHVlKSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9qZWN0Tm9kZXMocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLnByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50LCBub2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2hWaWV3QWZ0ZXIocmVuZGVyZXI6IFJlbmRlcmVyLCBub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIuYXR0YWNoVmlld0FmdGVyKG5vZGUsIHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGV0YWNoVmlldyhyZW5kZXJlcjogUmVuZGVyZXIsIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIuZGV0YWNoVmlldyh2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lWaWV3KHJlbmRlcmVyOiBSZW5kZXJlciwgaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50LCB2aWV3QWxsTm9kZXMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlld0FsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdG9yZS5yZW1vdmUodmlld0FsbE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50UHJvcGVydHkocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVmFsdWU6IHN0cmluZykge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudENsYXNzKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkOiBib29sZWFuKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQsIGNsYXNzTmFtZSwgaXNBZGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudFN0eWxlKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50LCBtZXRob2ROYW1lLCBhcmdzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFRleHQocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZykge1xuICAgIHJlbmRlcmVyLnNldFRleHQocmVuZGVyTm9kZSwgdGV4dCk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW4ocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICB2YXIgdW5yZWdpc3RlckNhbGxiYWNrID0gcmVuZGVyZXIubGlzdGVuKHJlbmRlckVsZW1lbnQsIGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChldmVudCkgPT4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyRWxlbWVudCwgbnVsbCwgZXZlbnROYW1lLCBldmVudCkpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVucmVnaXN0ZXJDYWxsYmFjaywgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5HbG9iYWwocmVuZGVyZXI6IFJlbmRlcmVyLCBldmVudFRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIHZhciB1bnJlZ2lzdGVyQ2FsbGJhY2sgPSByZW5kZXJlci5saXN0ZW5HbG9iYWwoXG4gICAgICAgIGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsXG4gICAgICAgIChldmVudCkgPT4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQobnVsbCwgZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnQpKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bnJlZ2lzdGVyQ2FsbGJhY2ssIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuRG9uZShyZW5kZXJlcjogUmVuZGVyZXIsIHVubGlzdGVuQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7IHVubGlzdGVuQ2FsbGJhY2soKTsgfVxufVxuIl19