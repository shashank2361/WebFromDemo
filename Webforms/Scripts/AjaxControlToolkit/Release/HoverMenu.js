Type.registerNamespace("Sys.Extended.UI"),Sys.Extended.UI.HoverMenuBehavior=function(e){Sys.Extended.UI.HoverMenuBehavior.initializeBase(this,[e]),this._hoverBehavior=null,this._popupBehavior=null,this._mouseEnterHandler=null,this._mouseLeaveHandler=null,this._unhoverHandler=null,this._hoverHandler=null,this._inHover=null,this._oldClass=null,this._popupElement=null,this._onShowJson=null,this._onHideJson=null,this._popupElement=null,this._hoverCssClass=null,this._offsetX=0,this._offsetY=0,this._popDelay=100,this._hoverDelay=0,this._popupPosition=null},Sys.Extended.UI.HoverMenuBehavior.prototype={initialize:function(){Sys.Extended.UI.HoverMenuBehavior.callBaseMethod(this,"initialize"),this._hoverHandler=Function.createDelegate(this,this._onHover),this._unhoverHandler=Function.createDelegate(this,this._onUnhover),this._mouseEnterHandler=Function.createDelegate(this,this._onmouseover),this._mouseLeaveHandler=Function.createDelegate(this,this._onmouseout);var e=this.get_element();$addHandler(e,"mouseover",this._mouseEnterHandler),$addHandler(e,"mouseout",this._mouseLeaveHandler),this._popupElement&&(this._popupBehavior=$create(Sys.Extended.UI.PopupBehavior,{id:this.get_id()+"_PopupBehavior"},null,null,this._popupElement),this._popupPosition?this._popupBehavior.set_positioningMode(Sys.Extended.UI.HoverMenuPopupPosition.Absolute):this._popupBehavior.set_positioningMode(Sys.Extended.UI.HoverMenuPopupPosition.Center),this._onShowJson&&this._popupBehavior.set_onShow(this._onShowJson),this._onHideJson&&this._popupBehavior.set_onHide(this._onHideJson),this._hoverBehavior=$create(Sys.Extended.UI.HoverBehavior,{id:this.get_id()+"_HoverBehavior",hoverDelay:this._hoverDelay,unhoverDelay:this._popDelay,hoverElement:this._popupElement},null,null,e),this._hoverBehavior.add_hover(this._hoverHandler),this._hoverBehavior.add_unhover(this._unhoverHandler))},dispose:function(){this._onShowJson=null,this._onHideJson=null,this._popupBehavior&&(this._popupBehavior.dispose(),this._popupBehavior=null),this._popupElement&&(this._popupElement=null),this._mouseEnterHandler&&$removeHandler(this.get_element(),"mouseover",this._mouseEnterHandler),this._mouseLeaveHandler&&$removeHandler(this.get_element(),"mouseout",this._mouseLeaveHandler),this._hoverBehavior&&(this._hoverHandler&&(this._hoverBehavior.remove_hover(this._hoverHandler),this._hoverHandler=null),this._unhoverHandler&&(this._hoverBehavior.remove_hover(this._unhoverHandler),this._unhoverHandler=null),this._hoverBehavior.dispose(),this._hoverBehavior=null),Sys.Extended.UI.HoverMenuBehavior.callBaseMethod(this,"dispose")},_getLeftOffset:function(){var e=$common.getLocation(this.get_element()).x,t=$common.getLocation(this.get_popupElement().offsetParent).x,s=0;switch(this._popupPosition){case Sys.Extended.UI.HoverMenuPopupPosition.Left:s=-1*this._popupElement.offsetWidth;break;case Sys.Extended.UI.HoverMenuPopupPosition.Right:s=this.get_element().offsetWidth}return s+e-t+this._offsetX},_getTopOffset:function(){var e=$common.getLocation(this.get_element()).y,t=$common.getLocation(this.get_popupElement().offsetParent).y,s=0;switch(this._popupPosition){case Sys.Extended.UI.HoverMenuPopupPosition.Top:s=-1*this._popupElement.offsetHeight;break;case Sys.Extended.UI.HoverMenuPopupPosition.Bottom:s=this.get_element().offsetHeight}return e-t+s+this._offsetY},_onHover:function(){if(!this._inHover){var e=new Sys.CancelEventArgs;this.raise_showing(e),e.get_cancel()||(this._inHover=!0,this.populate(),this._popupBehavior.show(),"none"==$common.getCurrentStyle(this._popupElement,"display")&&(this._popupElement.style.display="block"),this._popupBehavior.set_x(this._getLeftOffset()),this._popupBehavior.set_y(this._getTopOffset()),this.raise_shown(Sys.EventArgs.Empty))}},_onUnhover:function(){var e=new Sys.CancelEventArgs;this.raise_hiding(e),e.get_cancel()||(this._inHover=!1,this._resetCssClass(),this._popupBehavior.hide(),this.raise_hidden(Sys.EventArgs.Empty))},_onmouseover:function(){var e=this.get_element();this._hoverCssClass&&e.className!=this._hoverCssClass&&(this._oldClass=e.className,e.className=this._hoverCssClass)},_onmouseout:function(){this._resetCssClass()},_resetCssClass:function(){var e=this.get_element();!this._inHover&&this._hoverCssClass&&e.className==this._hoverCssClass&&(e.className=this._oldClass)},get_onShow:function(){return this._popupBehavior?this._popupBehavior.get_onShow():this._onShowJson},set_onShow:function(e){this._popupBehavior?this._popupBehavior.set_onShow(e):this._onShowJson=e,this.raisePropertyChanged("onShow")},get_onShowBehavior:function(){return this._popupBehavior?this._popupBehavior.get_onShowBehavior():null},onShow:function(){this._popupBehavior&&this._popupBehavior.onShow()},get_onHide:function(){return this._popupBehavior?this._popupBehavior.get_onHide():this._onHideJson},set_onHide:function(e){this._popupBehavior?this._popupBehavior.set_onHide(e):this._onHideJson=e,this.raisePropertyChanged("onHide")},get_onHideBehavior:function(){return this._popupBehavior?this._popupBehavior.get_onHideBehavior():null},onHide:function(){this._popupBehavior&&this._popupBehavior.onHide()},get_popupElement:function(){return this._popupElement},set_popupElement:function(e){this._popupElement!=e&&(this._popupElement=e,this.get_isInitialized()&&this._hoverBehavior&&this._hoverBehavior.set_hoverElement(this._popupElement),this.raisePropertyChanged("popupElement"))},get_hoverCssClass:function(){return this._hoverCssClass},set_hoverCssClass:function(e){this._hoverCssClass!=e&&(this._hoverCssClass=e,this.raisePropertyChanged("hoverCssClass"))},get_HoverCssClass:function(){return Sys.Extended.Deprecated("get_HoverCssClass","get_hoverCssClass"),this.get_hoverCssClass()},set_HoverCssClass:function(e){Sys.Extended.Deprecated("set_HoverCssClass","set_hoverCssClass"),this.set_hoverCssClass(e)},get_offsetX:function(){return this._offsetX},set_offsetX:function(e){this._offsetX!=e&&(this._offsetX=e,this.raisePropertyChanged("offsetX"))},get_OffsetX:function(){return Sys.Extended.Deprecated("get_OffsetX()","get_offsetX()"),this.get_offsetX()},set_OffsetX:function(e){Sys.Extended.Deprecated("set_OffsetX(value)","set_offsetX(value)"),this.set_offsetX(e)},get_offsetY:function(){return this._offsetY},set_offsetY:function(e){this._offsetY!=e&&(this._offsetY=e,this.raisePropertyChanged("offsetY"))},get_OffsetY:function(){return Sys.Extended.Deprecated("get_OffsetY()","get_offsetY()"),this.get_offsetY()},set_OffsetY:function(e){Sys.Extended.Deprecated("set_OffsetY(value)","set_offsetY(value)"),this.set_offsetY(e)},get_popupPosition:function(){return this._popupPosition},set_popupPosition:function(e){this._popupPosition!=e&&(this._popupPosition=e,this.raisePropertyChanged("popupPosition"))},get_PopupPosition:function(){return Sys.Extended.Deprecated("get_PopupPosition()","get_popupPosition()"),this.get_popupPosition()},set_PopupPosition:function(e){Sys.Extended.Deprecated("set_PopupPosition(value)","set_popupPosition(value)"),this.set_popupPosition(e)},get_popDelay:function(){return this._popDelay},set_popDelay:function(e){this._popDelay!=e&&(this._popDelay=e,this.raisePropertyChanged("popDelay"))},get_PopDelay:function(){return Sys.Extended.Deprecated("get_PopDelay","get_popDelay"),this.get_popDelay()},set_PopDelay:function(e){Sys.Extended.Deprecated("set_PopDelay","set_popDelay"),this.set_popDelay(e)},get_hoverDelay:function(){return this._hoverDelay},set_hoverDelay:function(e){this._hoverDelay!=e&&(this._hoverDelay=e,this.raisePropertyChanged("hoverDelay"))},get_HoverDelay:function(){return Sys.Extended.Deprecated("get_HoverDelay","get_hoverDelay"),this.get_hoverDelay()},set_HoverDelay:function(e){Sys.Extended.Deprecated("set_HoverDelay","set_hoverDelay"),this.set_hoverDelay(e)},add_showing:function(e){this.get_events().addHandler("showing",e)},remove_showing:function(e){this.get_events().removeHandler("showing",e)},raise_showing:function(e){var t=this.get_events().getHandler("showing");t&&t(this,e)},raiseShowing:function(e){Sys.Extended.Deprecated("raiseShowing(eventArgs)","raise_showing(eventArgs)"),this.raise_showing(e)},add_shown:function(e){this.get_events().addHandler("shown",e)},remove_shown:function(e){this.get_events().removeHandler("shown",e)},raise_shown:function(e){var t=this.get_events().getHandler("shown");t&&t(this,e)},raiseShown:function(e){Sys.Extended.Deprecated("raiseShown(eventArgs)","raise_shown(eventArgs)"),this.raise_shown(e)},add_hiding:function(e){this.get_events().addHandler("hiding",e)},remove_hiding:function(e){this.get_events().removeHandler("hiding",e)},raise_hiding:function(e){var t=this.get_events().getHandler("hiding");t&&t(this,e)},raiseHiding:function(e){Sys.Extended.Deprecated("raiseHiding(eventArgs)","raise_hiding(eventArgs)"),this.raise_hiding(e)},add_hidden:function(e){this.get_events().addHandler("hidden",e)},remove_hidden:function(e){this.get_events().removeHandler("hidden",e)},raise_hidden:function(e){var t=this.get_events().getHandler("hidden");t&&t(this,e)},raiseHidden:function(e){Sys.Extended.Deprecated("raiseHidden(eventArgs)","raise_hidden(eventArgs)"),this.raise_hidden(e)}},Sys.Extended.UI.HoverMenuBehavior.registerClass("Sys.Extended.UI.HoverMenuBehavior",Sys.Extended.UI.DynamicPopulateBehaviorBase),Sys.Extended.UI.HoverMenuPopupPosition=function(){throw Error.invalidOperation()},Sys.Extended.UI.HoverMenuPopupPosition.prototype={Center:0,Top:1,Left:2,Bottom:3,Right:4},Sys.Extended.UI.HoverMenuPopupPosition.registerEnum("Sys.Extended.UI.HoverMenuPopupPosition");