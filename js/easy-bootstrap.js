//TEXTBOX
(function(){
    var methods = {
        init : function(opciones) {
			opciones = $.extend({
				required: false,
				label: "",
				icon: "",
				placeholder: "",
				type: "text",
				disabled: false,
				readonly: false,
				helpBlock: "",
			}, opciones);

			var textbox = $(this);
			var idTextbox = textbox.attr('id');
			var textboxrequired = opciones.required;
			var textboxLabel = opciones.label;
			var textboxIcon = opciones.icon;
			var textboxPlaceholder = opciones.placeholder;
			var textboxType = opciones.type;
			var textboxDisabled = opciones.disabled;
			var textboxReadOnly = opciones.readonly;
			var helpBlock = opciones.helpBlock;

			textbox.data("data",{
				idTextbox: idTextbox,
				textboxrequired: textboxrequired,
				textboxLabel: textboxLabel,
				textboxIcon: textboxIcon,
				textboxPlaceholder: textboxPlaceholder,
				textboxType: textboxType,
				textboxDisabled: textboxDisabled,
				textboxReadOnly: textboxReadOnly,
				helpBlock: helpBlock
			});

			textbox.attr('name', idTextbox);
			textbox.addClass('form-control');
			textbox.attr('placeholder',textboxPlaceholder);
			textbox.attr('type',textboxType);
			textbox.attr('disabled',textboxDisabled);
			textbox.attr('readonly',textboxReadOnly);

			textbox.wrap('<div id="fg-'+ idTextbox +'" class="form-group has-feedback">');
			if ( textboxrequired !== false ){
				textbox.attr('required',true);
			}
			if ( textboxLabel !== "" ){
				textbox.before('<label class="control-label" for="'+idTextbox+'" >'+ textboxLabel+'</label>');
			}
			
			if ( textboxIcon !== "" ){
				textbox.after('<span class="'+ textboxIcon +' form-control-feedback" aria-hidden="true"></span>');
			}


			// EVENTOS
			$(this).on('keyup',function(e) {
		        if (opciones.onChange !== undefined) {
		          opciones.onChange(e);
		        }
			});

		    
        },
        setValue : function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	var idTextbox = textbox.data("data").idTextbox
        	textbox.val(opciones).triggerHandler("keyup");
        	$('#fg-'+idTextbox).removeClass('has-error');
        },
        getValue : function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	return textbox.val();
        },
        clear : function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	var idTextbox = textbox.data("data").idTextbox
        	textbox.val("").triggerHandler("keyup");
        },
        destroy : function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	var idTextbox = textbox.data("data").idTextbox
        	$('#fg-'+idTextbox).remove();
        },
        disabled: function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	textbox.attr('disabled',opciones);
        },
        readonly: function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	textbox.attr('readonly',opciones);
        },
        hidden: function(opciones){
        	var textbox = $(this);
        	if (typeof textbox.data("data") === 'undefined'){
        		$.error( 'El elemento no es un objeto textbox de easy-bootstrap.' );
        		return;
        	}
        	var idTextbox = textbox.data("data").idTextbox
        	$('#fg-'+idTextbox).attr('hidden','"'+opciones+'+');
        },
    };
	$.fn.textbox = function ( opciones ){

        if ( methods[opciones] ) {
            return methods[ opciones ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof opciones === 'object' || ! opciones ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'No existe el metodo '+  opciones  +' en easyBootstrap-textbox' );
        } 
	};
})();

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