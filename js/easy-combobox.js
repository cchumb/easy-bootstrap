/**
 * Created by Guillermo Hampp on 14/07/2017.
 */
//combobox
(function(){
    var methods = {
        init: function (opciones) {
            opciones = $.extend({
            required: false,
            //data:"",
            id:"",
            idField:"id",
            fieldText:"value",
            urldir: false,
            disabled:false,
            readonly:false,
            },opciones);

            var combobox = $(this);

            var idCombobox = combobox.attr('id');

            combobox.data("data",{
                idCombobox:idCombobox,
                urldir: opciones.urldir,
                idField:opciones.idField,
                fieldText:opciones.fieldText,
                comboboxDisabled:opciones.disabled,
                comboboxReadOnly:opciones.readonly,
            });
            combobox.addClass('form-control');

            if (combobox.data("data").urldir !== false){

                $.ajax({
                    url: combobox.data("data").urldir,
                    success: function(result){

                        $.each(result, function(key, value) {
                            combobox
                                .append($("<option></option>")
                                    .val(result[key][combobox.data("data").idField])
                                    .html(result[key][combobox.data("data").fieldText]));
                        });
                }});
            }
            combobox.attr('name', idCombobox);
            combobox.addClass('form-control');
            combobox.attr('disabled',combobox.data("data").disabled);
            combobox.attr('readonly',combobox.data("data").readonly);

        },
        //setea el value del combobox
        setValue : function(opciones){
            var combobox = $(this);

            if (typeof combobox.data("data") === 'undefined'){
                $.error( 'El elemento no es un objeto combobox de easy-bootstrap.' );
                return;
            }
            var assignedRoleId = new Array();
            combobox.find('option').each(function(){
                assignedRoleId.push(this.value);
            });
            console.log(assignedRoleId)
            combobox.attr('key',opciones)
            //setea con el valor de opciones el combobox
            combobox.val(opciones)
        },
    }


//$.("#combobox").combobox('setValue',valor)

    $.fn.combobox = function ( opciones ){

        if ( methods[opciones] ) {
            return methods[ opciones ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof opciones === 'object' || ! opciones ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'No existe el metodo '+  opciones  +' en easyBootstrap-textbox' );
        }
    };
}());