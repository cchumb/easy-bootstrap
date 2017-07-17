// BUTTON
(function(){

    var methods = {
        init : function(opciones) {
			opciones = $.extend({
				text: "Btn",
				type: "button",
				theme: "default",
				icon: "",
				disabled: false,
				tooltip: "",
			}, opciones);

			var button = $(this);
			var idButton = button.attr('id');
			var buttonText = opciones.text;
			var buttonType = opciones.type;
			var buttonTheme = opciones.theme;
			var buttonIcon = opciones.icon;
			var buttonDisabled = opciones.disabled;
			var buttonTooltip = opciones.tooltip;

			button.data("data",{
				idButton:       idButton,
				buttonText:     buttonText,
				buttonType:     buttonType,
				buttonTheme:    buttonTheme,
				buttonIcon:     buttonIcon,
				buttonDisabled: buttonDisabled,
				buttonTooltip:  buttonTooltip,
			});


			button.addClass('btn btn-'+ button.data('data').buttonTheme);
			button.attr('type', button.data('data').buttonType);
			button.attr('disabled', button.data('data').buttonDisabled);


			console.log(button.data('data').buttonTooltip);
			if ( button.data('data').buttonTooltip !== "" ){
				button.attr('data-tooltip', button.data('data').buttonTooltip);
			}

			if ( button.data('data').buttonIcon !== "" ){
				button.html( '<li class="' + button.data('data').buttonIcon + '" </li> ' + button.data('data').buttonText);
			}else{
				button.text(button.data('data').buttonText);
			}


			// EVENTOS
			$(this).on('click',function(e) {
		        if (opciones.onClick !== undefined) {
		          opciones.onClick(e);
		        }
			});


		},
        setValue : function(opciones){
        	var button = $(this);
        	if (typeof button.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto button de easy-bootstrap.' );
        		return;
        	}
        	button.text(opciones);
        },
        setTheme : function(opciones){
        	var button = $(this);
        	if (typeof button.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto button de easy-bootstrap.' );
        		return;
        	}
        	button.removeClass('btn-'+ button.data('data').buttonTheme);
        	button.data('data').buttonTheme = opciones;
        	button.addClass('btn-'+ button.data('data').buttonTheme);
        },
        disabled: function(opciones){
        	var button = $(this);
        	if (typeof button.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto button de easy-bootstrap.' );
        		return;
        	}
        	button.attr('disabled',opciones);
        },

	};


	$.fn.button = function( opciones ){
        if ( methods[opciones] ) {
            return methods[ opciones ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof opciones === 'object' || ! opciones ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'No existe el metodo '+  opciones  +' en easyBootstrap-button' );
        } 
	};

})();

//FORM
(function(){
	var methods = {
		validate: function( callback){
			var result = true;
			$( ".easyBootstrap-textbox" ).each(function( e ) {
				var textbox = $( this );
				var idTextbox = textbox.data("data").idTextbox
				var textboxrequired = textbox.data("data").textboxrequired
				$("#fg-"+idTextbox).removeClass("has-error");
				$("#hb-"+idTextbox).remove();
				if ( textboxrequired === true ){
					if ( textbox.val() === "" ){
						$("#fg-"+idTextbox).addClass("has-error");
						$("#fg-"+idTextbox).append('<span id="hb-'+ idTextbox +'" class="help-block">Complete este campo.</span>');
						result = false;
					}
				}
			});

			if (typeof callback === 'function'){
				callback.call(this, result);
			}
			
		},
	}

	$.fn.form = function ( opciones, callback ){
        if ( methods[opciones] ) {
            return methods[ opciones ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else {
            $.error( 'No existe el metodo '+  opciones  +' en easyBootstrap-form' );
        } 
	};
})();