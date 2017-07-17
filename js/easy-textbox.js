// Author: Christian Chumbita
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
        disable: function(opciones){
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