/**
 * Created by Guillermo Hampp on 19/07/2017.
 */
(function () {

    var methods = {
        init: function (opciones) {
            opciones = $.extend({
                required: false,
                id: "",
                value: 1,
                min: null,
                max: null,
                increment: 1,
                editable: true,
                disabled: false,
                readOnly: false,
                urlDir: false,
                idField: "id",
                fieldText: "value"

            }, opciones);

            var spinner = $(this);
            var idSpinner = spinner.attr('id');

            // spinner.append(
            //     $('<div id="content-spinner" class="input-group minShadow text-center">')
            //         .append('<span class="input-group-btn "> <button id="button_spiner1" type="button" class="btn btn-primary spinnerBtn spinnerBtnDown " data-dir="down"><span class="glyphicon glyphicon-minus"></span></button></span>')
            //         .append('<input id="input-spinner" class="form-control text-center inputSpinner"></input>')
            //         .append('<span id="sp" class="input-group-btn "> <button id="button_spiner2" type="button" class="btn btn-primary spinnerBtn spinnerBtnUp " data-dir="up"><span class="glyphicon glyphicon-plus"></span></button> </span>')
            // );


            // $('<div id="content-spinner" class="input-group minShadow text-center"> <span class="input-group-btn ">' +
            //      ' <button id="button_spiner1" type="button" class="btn btn-primary spinnerBtn spinnerBtnDown " data-dir="down">' +
            //     '<span class="glyphicon glyphicon-minus"></span></button></span>').appendTo(spinner);
            // spinner.addClass("form-control text-center inputSpinner");
            //  $( '<span id="sp" class="input-group-btn "> <button id="button_spiner2" type="button" class="btn btn-primary spinnerBtn spinnerBtnUp " data-dir="up">' +
            //     '<span class="glyphicon glyphicon-plus"></span></button> </span>').appendTo(spinner);



            spinner.wrap('<div id="fg-' + idSpinner + '" class="form-group">');
            spinner.wrap('<div id="contentSpinner-' + idSpinner + '"class="input-group minShadow text-center">')
                .before('<span class="input-group-btn "><button id="btn1Spinner-' + idSpinner + '" type="button" class="btn btn-primary spinnerBtn spinnerBtnDown " data-dir="down"><span class="glyphicon glyphicon-minus"></span></button></span>')
                .after('<span id="sp" class="input-group-btn "> <button id="btn2Spinner-' + idSpinner + '" type="button" class="btn btn-primary spinnerBtn spinnerBtnUp " data-dir="up">' +
                        '<span class="glyphicon glyphicon-plus"></span></button> </span>');

            //spinner.before('<button id="button_spiner1" type="button" class="btn btn-primary spinnerBtn spinnerBtnDown " data-dir="down"><span class="glyphicon glyphicon-minus"></span></button></span>');

            spinner.data("data", {
                idSpinner: idSpinner,
                value: opciones.value,
                min: opciones.min,
                max: opciones.max,
                increment: opciones.increment,
                editable: opciones.editable,
                disabled: opciones.disabled,
                spinnerReadOnly: opciones.readOnly,
                urlDir: opciones.urlDir,
                idField: opciones.idField,
                fieldText: opciones.fieldText

            });

            //spinner.addClass('form-control');
            spinner.attr('name');
            spinner.attr('value', spinner.data("data").value);
            spinner.attr('min', spinner.data("data").min);
            spinner.attr('max', spinner.data("data").max);
            spinner.attr('increment', spinner.data("data").increment);
            spinner.attr('editable', spinner.data("data").editable);
            spinner.attr('disabled', spinner.data("data").disabled);
            spinner.attr('readonly', spinner.data("data").spinnerReadOnly)
            if (spinner.data("data").value !== '') {
                input = spinner.find('input')
                input.val(spinner.data("data").value);
            }
            spinner.attr('idField', spinner.data("data").idField);
            spinner.attr('fieldText', spinner.data("data").fieldText);

            //controla si el incremento seteado no sea mayor al maximo
            if (parseInt(spinner.data("data").increment) > parseInt(spinner.data("data").max)) {
                $("#fg-" + idSpinner).addClass("has-error");
                $("#fg-" + idSpinner).append('<span id="hb-' + idSpinner + '" class="help-block">El incremento es mayor al Maximo</span>');
                return;
            }
            var action;
            $("#btn2Spinner-" + idSpinner).mousedown(function () {
                btn = $(this);
                input = spinner;
                btn.closest('#contentSpinner-' + idSpinner).find('button').prop("disabled", false);
                //si se presiona el boton down (+)
                action = setInterval(function () {
                    if (spinner.data("data").max == undefined || parseInt(input.val()) < parseInt(spinner.data("data").max)) {
                        input.val(parseInt(input.val()) + parseInt(spinner.data("data").increment));
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 100);
            }).mouseup(function () {
                clearInterval(action);
            });
            $("#btn1Spinner-" + idSpinner).mousedown(function () {
                btn = $(this);
                input = spinner;
                btn.closest('#contentSpinner-' + idSpinner).find('button').prop("disabled", false);
                //si se presiona el boton up (+)
                action = setInterval(function () {
                    if (spinner.attr('min') == undefined || parseInt(input.val()) > parseInt(spinner.attr('min'))) {
                        input.val(parseInt(input.val()) - parseInt(spinner.data("data").increment));
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 100);

            }).mouseup(function () {
                clearInterval(action);
            });
            input.keypress(function (e) {

                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
            });

            if (spinner.data("data").editable === false) {
                input.attr('readonly', true);
            }

            if (spinner.data("data").data !== false) {
                var almacenamiento = 0;
                $.ajax({
                    url: spinner.data("data").urlDir,
                    success: function (result) {
                        var numeros = [];
                        $.each(result, function (key, value) {
                            numeros[key] = result[key][spinner.data("data").fieldText];
                        });
                        var max = Math.max.apply(Math, numeros);
                        var min = Math.min.apply(Math, numeros);
                        spinner.data("data").max = max
                        spinner.attr('min',min)
                    }
                })
            }
            if (spinner.data("data").disabled === true) {
                $("#content-spinner :input").attr("disabled", true);

            }
            if (spinner.data("data").spinnerDisabled === false) {
                $("#content-spinner :input").attr("disabled", true);
            }
            //evento se dispara cuando se apreta el boton de incrementar
            $("#button_spiner2").on('mouseup', function (e) {
                if (opciones.spinUp !== undefined) {
                    opciones.spinUp(e);
                }
            });
            //evento se dispara cuando se apreta el boton de decrement
            $("#button_spiner1").on('mousedown', function (e) {
                if (opciones.spinDown !== undefined) {
                    opciones.spinDown(e);
                }
            })
        },
        //toma el valor actual del spinner
        getValue: function () {
            var spinner = $(this);
            if (typeof spinner.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            return spinner.val();
        },
        //setea el valor del spinner
        setValue: function (value) {
            var spinner = $(this);
            if (typeof spinner.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            $("#input-spinner").val(value);
        },
        //limpia el valor y lo vuelve al por defecto
        clear: function () {
            var spinner = $(this);
            if (typeof spinner.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }

            spinner.val(spinner.data("data").value);


        },
        //transforma en disabled el spinner
        disable: function () {
            var spinner = $(this);
            if (typeof spinner.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            $("#content-spinner :input").attr("disabled", true)
        },
        //vuelve enable el spinner
        enable: function () {
            var spinner = $(this);
            if (typeof spinner.data("data") === 'undefined') {
                $.error('El elemento no es un objeto combobox de easy-bootstrap.');
                return;
            }
            $("#content-spinner :input").attr("disabled", false)
        },
    };

    $.fn.spinner = function (opciones) {

        if (methods[opciones]) {
            return methods[opciones].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opciones === 'object' || !opciones) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('No existe el metodo ' + opciones + ' en easyBootstrap-textbox');
        }
    };
}());
