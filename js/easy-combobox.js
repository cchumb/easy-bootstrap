/**
 * Created by Guillermo Hampp on 14/07/2017.
 */
//combobox
(function () {
    var methods = {
        init: function (opciones) {
            opciones = $.extend({
                required: false,
                id: "",
                idField: "id",
                fieldText: "value",
                urldir: false,
                disabled: false,
                readonly: false,
                data: null,

            }, opciones);

            var combobox = $(this);

            var idCombobox = combobox.attr('id');

            combobox.data("data", {
                idCombobox: idCombobox,
                urldir: opciones.urldir,
                idField: opciones.idField,
                fieldText: opciones.fieldText,
                comboboxDisabled: opciones.disabled,
                comboboxReadOnly: opciones.readonly,
                dataArray: opciones.data

            });
            combobox.addClass('form-control');


            if (combobox.data("data").urldir !== false) {
                $.ajax({
                    url: combobox.data("data").urldir,
                    beforeSend: function () {
                        if (opciones.beforeLoad !== undefined) {
                            opciones.beforeLoad(opciones);
                            combobox
                                .append($("<option></option>")
                                    .val(opciones[combobox.data("data").idField])
                                    .html(opciones[combobox.data("data").fieldText]));

                        }
                    },
                    success: function (result) {

                        $.each(result, function (key, value) {
                            combobox
                                .append($("<option></option>")
                                    .val(result[key][combobox.data("data").idField])
                                    .html(result[key][combobox.data("data").fieldText]));
                        });
                        if (opciones.loadSuccesData !== undefined) {
                        }

                    }
                });
            }
            //cargo los datos , si desde la configuracion del combobox se envia un array
            if (combobox.data("data").dataArray !== null) {
                var valores = combobox.data("data").dataArray

                var strJson = JSON.stringify(valores);
                var parsedData = JSON.parse(strJson);
                $.each(parsedData, function (key, value) {
                    combobox
                        .append($("<option></option>")
                            .val(parsedData[key][combobox.data("data").idField])
                            .html(parsedData[key][combobox.data("data").fieldText]));
                });


            }


            combobox.attr('name', idCombobox);
            combobox.addClass('form-control');
            combobox.attr('disabled', combobox.data("data").disabled);
            combobox.attr('readonly', combobox.data("data").readonly);
            /////////////////////////////////////eventos//////////////////////////////////////////
            $(this).on('keyup', function (e) {
                if (opciones.onChange !== undefined) {
                    opciones.onChange(e);
                }
            });


        },


        /////////////////////////////////////metodos//////////////////////////////////////////
        //setea el "value" del combobox
        setValue: function (opciones) {
            var combobox = $(this);

            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                $.error('No hay ningun parametro.');
                return;
            }

            combobox.val(opciones)
        },
        setText: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                $.error('No hay ningun parametro.');
                return;
            }

            combobox.append($("<option></option>").html(opciones))
            // $.each(opciones, function( value) {
            //     console.log(value)
            //
            // });
            //combobox.val(opciones);
            // combobox.text(opciones)

        },
        //devuelve el ID seleccionado
        getValue: function () {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            return combobox.val()

        },
        //devuelve el texto seleccionado
        getText: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            return combobox.find(":selected").text();
        },
        //devuelve un array con todos los datos del combobox
        getValues: function (opciones) {
            var combobox = $(this);
            var data = {};
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }

            combobox.find("option").each(function (key, value) {
                data[key] = $(value).html()
            });
            Object.assign({}, data);
            return JSON.stringify(data);

        },
        //recibe un array con los datos
        setValues: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                $.error('No hay ningun parametro.');
                return;
            }
            //Comprueba que tipo de array es, si es tipo diccionario parsea e inserta los datos
            var stringJ = JSON.stringify(opciones);

            if (opciones.constructor === Object) {//si recibe un Json

                $.each(opciones, function (key, value) {

                    combobox
                        .append($("<option ></option>")
                            .val(opciones[key][combobox.data("data").idField])
                            .html(opciones[key][combobox.data("data").fieldText])
                        );

                });
            } else {//Si no crea tipo diccionario  cuyo index es id y value

                var valores = [];
                $.each(opciones, function (index, values) {

                    valores.push({
                        id: index,
                        value: values
                    });
                });
                var strJson = JSON.stringify(valores);
                var parsedData = JSON.parse(strJson);

                $.each(parsedData, function (key, value) {
                    combobox
                        .append($("<option></option>")
                            .val(parsedData[key][combobox.data("data").idField])
                            .html(parsedData[key][combobox.data("data").fieldText]));
                });

            }

        },
        //limpia el combobox
        clear: function (opciones) {
            var combobox = $(this);

            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            combobox.empty();
        },
        //recarga los datos, o recarga segun el parametro
        reload: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                if (combobox.data("data").urldir !== false) {
                    $.ajax({
                        url: combobox.data("data").urldir,
                        success: function (result) {

                            $.each(result, function (key, value) {
                                combobox
                                    .append($("<option></option>")
                                        .val(result[key][combobox.data("data").idField])
                                        .html(result[key][combobox.data("data").fieldText]));
                            });
                        }
                    });
                }
            } else {
                $(this).combobox('clear');
                $.ajax({
                    url: opciones,
                    success: function (result) {
                        $.each(result, function (key, value) {
                            combobox
                                .append($("<option></option>")
                                    .val(result[key][combobox.data("data").idField])
                                    .html(result[key][combobox.data("data").fieldText]));
                        });
                    }
                });

            }
        },
        select: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                $.error('No hay ningun parametro.');
                return;
            }
            combobox.val(opciones).change()
        },
        unselect: function (opciones) {
            var combobox = $(this);
            if (typeof combobox.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            if (jQuery.type(opciones) === "undefined") {
                $.error('No hay ningun parametro.');
                return;
            }

            combobox.val(1);
        }

    };


//$.("#combobox").combobox('setValue',valor)

    $.fn.combobox = function (opciones) {

        if (methods[opciones]) {
            return methods[opciones].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opciones === 'object' || !opciones) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('No existe el metodo ' + opciones + ' en easyBootstrap-textbox');
        }
    };
}());

