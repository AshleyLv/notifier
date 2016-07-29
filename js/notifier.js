
;(function($){
	var counter;
	var method = {
		init:function(type,title,content,duration,url){
			var container = this.createContainer();
			this.createNotification(type,title,content,container,duration);
		},
		createContainer:function(){
			if($('#notifier-container').length>0){
				counter += 1;
				return $('#notifier-container');
			} else {
				counter = 0;
				var element = this._createElement('div',{id:'notifier-container',class:'notify container'});
				document.body.appendChild(element);
				return $('#notifier-container');
			}
		},
		createNotification:function(type,title,content,container,duration){
			var itemId = 'notifier-item-'+counter;
			var itemEl = this._createElement('div',{class:'notify item ' + type,id:itemId});
			var titleEl = this._createElement('div',{class:'header'});
			var contentEl = this._createElement('div',{class:'content'});
			var clsEl = this._createElement('a', {class:'close-btn'});
			var iconEl = this._createElement('div',{class:'img img-' + type});
			
			
			titleEl.innerHTML = title;
			contentEl.innerHTML = content;
			clsEl.innerHTML = 'x';
			clsEl.addEventListener('click', function() {
			   method.closeNotification(itemId);
			});
			itemEl.appendChild(clsEl);
			itemEl.appendChild(titleEl);
			itemEl.appendChild(iconEl);
			itemEl.appendChild(contentEl);
			container.append(itemEl);
			setTimeout(function(){
				$(itemEl).addClass('show-notifier');
			},100);
			if(duration>0){
				setTimeout(function(){
					method.closeNotification(itemId);
				},duration);
			}
			
		},
		closeNotification(currentEl){
			$('#' + currentEl).removeClass('show-notifier');
			setTimeout(function() {
				$('#' + currentEl).remove();
		      }, 600);
		},
		_createElement : function(el,attrs){
			var element = document.createElement(el);
			 for (var prop in attrs) {
				 element.setAttribute(prop, attrs[prop]);
			 }
			 return element;
			
		}
	};
	$.notifier = function(type,title,content,duration){
		return method.init(type,title,content,duration);
	};
})(jQuery);