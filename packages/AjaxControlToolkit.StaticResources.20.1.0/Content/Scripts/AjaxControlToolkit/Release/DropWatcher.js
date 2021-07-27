function callbackSuccessStub(t,e){var i=e.split(":"),a=i[0],r=$find(a);r&&r._onCallbackSuccess(t,i[1])}function callbackErrorStub(t,e){var i=e.split(":"),a=i[0],r=$find(a);alert("error"),r&&r._onCallbackError(t,i[1])}Type.registerNamespace("Sys.Extended.UI"),Sys.Extended.UI.RepeatDirection=function(){throw Error.invalidOperation()},Sys.Extended.UI.RepeatDirection.prototype={Vertical:0,Horizontal:1},Sys.Extended.UI.RepeatDirection.registerEnum("Sys.Extended.UI.RepeatDirection"),Sys.Extended.UI.DragDropList=function(t){Sys.Extended.UI.DragDropList.initializeBase(this,[t]),this._acceptedDataTypes=[],this._isDragging=null,this._dataType=null,this._dragMode=Sys.Extended.UI.DragMode.Move,this._dragVisual=null,this._direction=Sys.Extended.UI.RepeatDirection.Vertical,this._emptyTemplate=null,this._emptyTemplateInstance=null,this._dropCueTemplate=null,this._dropCueTemplateInstance=null,this._floatContainerInstance=null,this._originalParent=null,this._originalNextSibling=null,this._originalZIndex=null,this._originalOpacity=null,this._currentContext=null,this._data=null},Sys.Extended.UI.DragDropList.IsValidDataType=function(t){return!!(t&&"string"==typeof t&&t.length>=4)&&"HTML"===t.substring(0,4)},Sys.Extended.UI.DragDropList.prototype={get_data:function(){return this._data},set_data:function(t){this._data=t},initialize:function(){Sys.Extended.UI.DragDropList.callBaseMethod(this,"initialize"),this.get_element().__dragDropList=this,Sys.Extended.UI.DragDropManager.registerDropTarget(this)},startDragDrop:function(t,e,i){this._isDragging||(this._isDragging=!0,this._currentContext=e,i?this._dragVisual=i:i=this.createDragVisual(t),Sys.Extended.UI.DragDropManager.startDragDrop(this,i,e,!(Sys.Browser.agent==Sys.Browser.InternetExplorer&&Sys.Browser.version>7&&0!=Sys.Browser.documentMode)))},createDragVisual:function(t){this._dragMode===Sys.Extended.UI.DragMode.Copy?this._dragVisual=t.cloneNode(!0):this._dragVisual=t;Sys.Extended.UI.DragDropManager._getInstance().getScrollOffset(t,!0);this._dragVisual.preDragWidth=this._dragVisual.style.width,this._dragVisual.preDragHeight=this._dragVisual.style.height,this._dragVisual.style.width=t.offsetWidth+"px",this._dragVisual.style.height=t.offsetHeight+"px",this._originalOpacity=this._dragVisual.style.opacity,this._dragVisual.style.opacity="0.4",this._dragVisual.style.filter="progid:DXImageTransform.Microsoft.BasicImage(opacity=0.4);",this._originalZIndex=this._dragVisual.style.zIndex,this._dragVisual.style.zIndex=Sys.Extended.UI.zIndex.DropWatcherDragVisual,this._originalParent=this._dragVisual.parentNode,this._originalNextSibling=Sys.Extended.UI.DragDropManager._getInstance().getNextSibling(this._dragVisual);var e=$common.getLocation(t),i=this._getFloatContainer();return $common.setLocation(i,e),Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._dragVisual)&&this._dragVisual.parentNode.removeChild(this._dragVisual),i.appendChild(this._dragVisual),i},get_emptyTemplate:function(){return this._emptyTemplate},set_emptyTemplate:function(t){this._emptyTemplate=t},get_dragDataType:function(){return this._dataType},set_dragDataType:function(t){this._dataType=t},getDragData:function(t){return t},get_dragMode:function(){return this._dragMode},set_dragMode:function(t){this._dragMode=t},dispose:function(){Sys.Extended.UI.DragDropManager.unregisterDropTarget(this),this.get_element().__dragDropList=null,Sys.Extended.UI.DragDropList.callBaseMethod(this,"dispose")},onDragStart:function(){this._validate()},onDrag:function(){},onDragEnd:function(t){if(this._floatContainerInstance?(this._dragMode===Sys.Extended.UI.DragMode.Copy?this._floatContainerInstance.removeChild(this._dragVisual):(this._dragVisual.style.filter="",""===this._originalOpacity?this._dragVisual.style.removeProperty("opacity"):this._dragVisual.style.opacity=this._originalOpacity,""===this._originalZIndex?this._dragVisual.style.removeProperty("z-index"):this._dragVisual.style.zIndex=this._originalZIndex,null!=this._dragVisual.preDragWidth&&(this._dragVisual.style.width=this._dragVisual.preDragWidth,this._dragVisual.preDragWidth=null),null!=this._dragVisual.preDragHeight&&(this._dragVisual.style.height=this._dragVisual.preDragHeight,this._dragVisual.preDragHeight=null),t?(this._dragVisual.parentNode.removeChild(this._dragVisual),null!=this._originalNextSibling?this._originalParent.insertBefore(this._dragVisual,this._originalNextSibling):this._originalParent.appendChild(this._dragVisual)):this._dragVisual.parentNode===this._floatContainerInstance&&this._dragVisual.parentNode.removeChild(this._dragVisual)),document.body.removeChild(this._floatContainerInstance)):this._dragVisual.parentNode.removeChild(this._dragVisual),!t&&this._data&&this._dragMode===Sys.Extended.UI.DragMode.Move){var e=this.getDragData(this._currentContext);this._data&&e&&Array.remove(this._data,e)}this._isDragging=!1,this._validate()},get_direction:function(){return this._direction},set_direction:function(t){this._direction=t},get_acceptedDataTypes:function(){return this._acceptedDataTypes},set_acceptedDataTypes:function(t){"string"==typeof t?this._acceptedDataTypes=t.split(","):this._acceptedDataTypes=t},get_dropCueTemplate:function(){return this._dropCueTemplate},set_dropCueTemplate:function(t){this._dropCueTemplate=t},get_dropTargetElement:function(){return this.get_element()},canDrop:function(t,e,i){for(var a=0;a<this._acceptedDataTypes.length;a++)if(this._acceptedDataTypes[a]===e)return!0;return!1},drop:function(t,e,i){if(Sys.Extended.UI.DragDropList.IsValidDataType(e)&&t===Sys.Extended.UI.DragMode.Move){dragVisual=i;var a=this._findPotentialNextSibling(dragVisual);this._setDropCueVisible(!1,dragVisual),dragVisual.parentNode.removeChild(dragVisual),a?this.get_element().insertBefore(dragVisual,a):this.get_element().appendChild(dragVisual)}else this._setDropCueVisible(!1)},onDragEnterTarget:function(t,e,i){Sys.Extended.UI.DragDropList.IsValidDataType(e)&&(this._setDropCueVisible(!0,i),this._validate())},onDragLeaveTarget:function(t,e,i){Sys.Extended.UI.DragDropList.IsValidDataType(e)&&(this._setDropCueVisible(!1),this._validate())},onDragInTarget:function(t,e,i){Sys.Extended.UI.DragDropList.IsValidDataType(e)&&this._setDropCueVisible(!0,i)},_setDropCueVisible:function(t,e){if(this._dropCueTemplate)if(t){if(!this._dropCueTemplateInstance){document.createDocumentFragment();this._dropCueTemplateInstance=this._dropCueTemplate.cloneNode(!0)}var i=this._findPotentialNextSibling(e);Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._dropCueTemplateInstance)?Sys.Extended.UI.DragDropManager._getInstance().getNextSibling(this._dropCueTemplateInstance)!==i&&(this.get_element().removeChild(this._dropCueTemplateInstance),i?this.get_element().insertBefore(this._dropCueTemplateInstance,i):this.get_element().appendChild(this._dropCueTemplateInstance)):(i?this.get_element().insertBefore(this._dropCueTemplateInstance,i):this.get_element().appendChild(this._dropCueTemplateInstance),this._dropCueTemplateInstance.style.width=e.offsetWidth+"px",this._dropCueTemplateInstance.style.height=e.offsetHeight+"px")}else this._dropCueTemplateInstance&&Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._dropCueTemplateInstance)&&this.get_element().removeChild(this._dropCueTemplateInstance)},_findPotentialNextSibling:function(t){for(var e,i=$common.getBounds(t),a=0===this._direction,r=this.get_element().firstChild;null!==r;r=r.nextSibling)if(r.innerHTML&&r!==this._dropCueTemplateInstance&&r!==this._emptyTemplateInstance&&(e=$common.getBounds(r),!a&&i.x<=e.x||a&&i.y<=e.y))return r;return null},_validate:function(){for(var t=null==this._dropCueTemplateInstance||!Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._dropCueTemplateInstance),e=0,i=this.get_element().firstChild;null!==i;i=i.nextSibling)i.innerHTML&&i!==this._emptyTemplateInstance&&i!==this._dropCueTemplateInstance&&e++;e>0&&(t=!1),this._setEmptyTemplateVisible(t)},_setEmptyTemplateVisible:function(t){this._emptyTemplate&&(t?this._emptyTemplateInstance?Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._emptyTemplateInstance)||this.get_element().appendChild(this._emptyTemplateInstance):this._emptyTemplateInstance=this._emptyTemplate.createInstance(this.get_element()).instanceElement:this._emptyTemplateInstance&&Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._emptyTemplateInstance)&&this.get_element().removeChild(this._emptyTemplateInstance))},_getFloatContainer:function(){if(this._floatContainerInstance)Sys.Extended.UI.DragDropManager._getInstance().hasParent(this._floatContainerInstance)||document.body.appendChild(this._floatContainerInstance);else{this._floatContainerInstance=document.createElement(this.get_element().tagName);var t="0px 0px 0px 0px";this._floatContainerInstance.style.position="absolute",this._floatContainerInstance.style.padding=t,this._floatContainerInstance.style.margin=t,this._floatContainerInstance.className="dragVisualContainer",document.body.appendChild(this._floatContainerInstance)}return this._floatContainerInstance}},Sys.Extended.UI.DragDropList.registerClass("Sys.Extended.UI.DragDropList",Sys.Extended.UI.BehaviorBase,Sys.Extended.UI.IDragSource,Sys.Extended.UI.IDropTarget,Sys.IDisposable),Sys.Extended.UI.DragDropWatcher=function(t){Sys.Extended.UI.DragDropWatcher.initializeBase(this,[t]),this._childList=new Array,this._inProgressDrops=new Object,this._postbackCode=null,this._callbackCssStyle=null,this._argReplaceString=null,this._argContextString=null,this._argErrorString=null,this._argSuccessString=null},Sys.Extended.UI.DragDropWatcher.prototype={dispose:function(){Sys.Extended.UI.DragDropWatcher.callBaseMethod(this,"dispose")},initialize:function(){Sys.Extended.UI.DragDropWatcher.callBaseMethod(this,"initialize"),this._saveChildOrder()},add_reorderComplete:function(t){this.get_events().addHandler("reorderComplete",t)},remove_reorderComplete:function(t){this.get_events().removeHandler("reorderComplete",t)},raiseReorderComplete:function(){var t=this.get_events().getHandler("reorderComplete");t&&t(this,Sys.EventArgs.Empty)},findChild:function(t,e){for(var i=0,a=t.childNodes,r=0;r<a.length;r++){var s=a[r];if(null!=s&&"LI"==s.nodeName){if(s.id==e)return i;i++}}return-1},canDrop:function(t,e,i){if(this._inProgressDrops&&this._inProgressDrops.length>0)return!1;var a=Sys.Extended.UI.DragDropWatcher.callBaseMethod(this,"canDrop",[t,e,i]);if(a){for(var r,s=$common.getBounds(i),n=!1,o=this.get_element(),l=o.firstChild;null!=l&&!n;l=l.nextSibling)if(l.id){if(r=$common.getBounds(l),s.y<=r.y)break;n=l.id.lastIndexOf("Insert",l.id.length-6)!=-1}a=!n}return a},drop:function(t,e,i){Sys.Extended.UI.DragDropWatcher.callBaseMethod(this,"drop",[t,e,i]);var a=i.id;if(this._postbackCode&&a){var r=this.findChild(this.get_element(),a);Sys.Debug.assert(r!=-1,String.format(Sys.Extended.UI.Resources.ReorderList_DropWatcherBehavior_NoChild,a));var s=this._getSavedChildIndex(a);r!=-1&&r!=s&&(this._saveChildOrder(),this.doPostBack(a,r,s))}},_setupDropState:function(t,e,i){if(t){var a=$get(t);this._inProgressDrops[t]={oldCss:a.className,newIndex:e,oldIndex:i},this._callbackCssStyle&&(a.className=this._callbackCssStyle)}},_onDropCallback:function(t){if(t){this.set_ClientState("true");var e=this._inProgressDrops[t];if(e){var i=$get(t);this._callbackCssStyle&&(i.className=e.oldCss),delete this._inProgressDrops[t]}return e}},doPostBack:function(t,e,i){var a=this._inProgressDrops[t];if(!a){var r="reorder:"+t+":"+i.toString()+":"+e.toString(),s=this._postbackCode.replace(this._argReplaceString,r);this._argSuccessString&&(s=s.replace(this._argSuccessString,"callbackSuccessStub")),this._argErrorString&&(s=s.replace(this._argErrorString,"callbackErrorStub")),this._argContextString&&(s=s.replace(this._argContextString,this.get_id()+":"+t)),this._setupDropState(t,e,i),window.setTimeout(s,0)}},_onCallbackSuccess:function(t,e){t&&t.length>0?this._onCallbackError(t,e):(this._onDropCallback(e),this.raiseReorderComplete())},_onCallbackError:function(t,e){var i=this._onDropCallback(e);(i.oldIndex||i.newIndex)&&(this._saveChildOrder(),this.doReorder(i.newIndex,i.oldIndex,!0)),alert(String.format(Sys.Extended.UI.Resources.ReorderList_DropWatcherBehavior_CallbackError,t))},doReorder:function(t,e,i){var a=this.get_element(),r=this._childList;if(t>=0&&r.length>t&&t!=e){var s=$get(r[t]),n=this._inProgressDrops[s.id];if(n)return;if(s){e>t&&e++;var o=e>=r.length;try{a.removeChild(s)}catch(t){}if(o)a.appendChild(s);else{var l=$get(r[e]);a.insertBefore(s,l)}i?(this._saveChildOrder(),this.raiseReorderComplete()):this.doPostBack(s.id,e,t)}}},getItem:function(t){return this._childList||this._saveChildOrder(),this._childList[t]},_getSavedChildIndex:function(t){if(this._childList&&t)for(var e=0;e<this._childList.length;e++)if(t==this._childList[e])return e;return-1},_saveChildOrder:function(){var t=this.get_element();if(t){var e=t.childNodes;this._childList=[];for(var i=0,a=0;a<e.length;a++)e[a]&&e[a].parentNode===t&&e[a].tagName&&"li"==e[a].tagName.toLowerCase()&&(this._childList[i++]=e[a].id)}},get_argReplaceString:function(){return this._argReplaceString},set_argReplaceString:function(t){this._argReplaceString!=t&&(this._argReplaceString=t,this.raisePropertyChanged("argReplaceString"))},get_argContextString:function(){return this._argContextString},set_argContextString:function(t){this._argContextString!=t&&(this._argContextString=t,this.raisePropertyChanged("argContextString"))},get_argErrorString:function(){return this._argErrorString},set_argErrorString:function(t){this._argErrorString!=t&&(this._argErrorString=t,this.raisePropertyChanged("argErrorString"))},get_argSuccessString:function(){return this._argSuccessString},set_argSuccessString:function(t){this._argSuccessString!=t&&(this._argSuccessString=t,this.raisePropertyChanged("argSuccessString"))},get_postbackCode:function(){return this._postbackCode},set_postbackCode:function(t){this._postbackCode!=t&&(this._postbackCode=t,this.raisePropertyChanged("postbackCode"))},get_callbackCssStyle:function(){return this._callbackCssStyle},set_callbackCssStyle:function(t){this._callbackCssStyle!=t&&(this._callbackCssStyle=t,this.raisePropertyChanged("callbackCssStyle"))}},Sys.Extended.UI.DragDropWatcher.registerClass("Sys.Extended.UI.DragDropWatcher",Sys.Extended.UI.DragDropList);