// Author: Christian Chumbita
(function(){
    var methods = {
        init : function(opciones) {
			opciones = $.extend({
                titel: '',
                striped: false,
                bordered: false,
                hover: false,
                urldir: '',
                columns: [[ { name: "", title: "", filter: false} ]],
                pageList: [10],
                pagination: false,
                rownumbers: false,
                filter: false,
                selectRow: false,
                multiSelect: false,
                hidden: false,
                export: false,
			}, opciones);
           // console.log(opciones.columns);

			var datagrid = $(this);

			datagrid.data("data",{
                idDatagrid: datagrid.attr('id'),
                title: opciones.title,
                striped: opciones.striped,
                bordered: opciones.bordered,
                hover: opciones.hover,
                urldir: opciones.urldir,
                columns: opciones.columns,
                pageList: opciones.pageList,
                pagination: opciones.pagination,
                rownumbers: opciones.rownumbers,
                filter: opciones.filter,
                selectRow: opciones.selectRow,
                multiSelect: opciones.multiSelect,
                hidden: opciones.hidden,
                export: opciones.export,
			});

            datagrid.addClass('table');
            datagrid.css( 'cursor', 'default' );
            datagrid.addClass('text-center');

            if ( datagrid.data('data').striped === true ){
                datagrid.addClass('table-striped');
            }
            if ( datagrid.data('data').bordered === true ){
                datagrid.addClass('table-bordered');
            }
            if ( datagrid.data('data').hover === true ){
                datagrid.addClass('table-hover');
            }


            datagrid.wrap('<div id="ct-'+ datagrid.data('data').idDatagrid +'">');

            
                var filterRules = '';
                if ( datagrid.data('data').filter === false ){
                    filterRules = 'disabled';
                }

                head = '<div class="row">';

                head += '<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">';
                head += '   <div class="input-group">';
                head += '       <span class="input-group-addon">';
                head += '           <span class="glyphicon glyphicon-eye-open"></span>';
                head += '       </span>';
                head += '       <div class="form-group has-feedback">';
                head += '           <select class="form-control input-sm" id="clist-' + datagrid.data('data').idDatagrid + '"></select>';
                head += '       </div>';
                head += '   </div>';
                head += '</div>';

                head += '<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">';
                head += '   <div class="input-group">';
                head += '       <span class="input-group-addon">';
                head += '           <span class="glyphicon glyphicon-th-list"></span>';
                head += '       </span>';
                head += '       <div class="form-group has-feedback">';
                head += '           <select class="form-control input-sm"  id="cpage-' + datagrid.data('data').idDatagrid + '"></select>';
                head += '       </div>';
                head += '   </div>';
                head += '</div>';

                head += '<div class="col-lg-2 col-md-2 hidden-sm hidden-xs">';
                head += '   <div class="btn-group" role="group" aria-label="...">';
                head += '       <button type="button" class="btn btn-default input-sm" id="buttonPreviuos-'+datagrid.data('data').idDatagrid+'"><span class="glyphicon glyphicon-triangle-left"></span></button>';
                head += '       <button type="button" class="btn btn-default input-sm" id="buttonNext-'+datagrid.data('data').idDatagrid+'"><span class="glyphicon glyphicon-triangle-right"></span></button>';
                head += '   </div>';
                head += '</div>';
                head += '<div class="col-lg-3 col-md-3 col-sm-1 hidden-sm hidden-xs">';
                head += '   <div id="lt-' + datagrid.data('data').idDatagrid + '">';
                head += '   </div>';
                head += '</div>';
                head += '<div class="col-lg-3 col-md-3 col-sm-3 text-right">';
                head += '   <div class="btn-group" role="group" aria-label="...">';
                head += '       <button '+filterRules+' type="button" class="btn btn-default" id="buttonViewFilter-'+datagrid.data('data').idDatagrid+'"><span class="glyphicon glyphicon-filter"></span></button>';
                
                if ( datagrid.data('data').export === true ){
                    head += '       <a class="btn btn-default" href="#" id="buttonExport-'+datagrid.data('data').idDatagrid+'"><span class="glyphicon glyphicon-save"></span></a>';
                }

                head += '           <button type="button" class="btn btn-default" id="buttonRefresh-'+datagrid.data('data').idDatagrid+'"><span class="glyphicon glyphicon-refresh"></span></button>';
                head += '       </div>';
                head += '   </div>';
                head += '</div>';
                head += '<br>';

                $('#ct-'+ datagrid.data('data').idDatagrid).prepend(head);

            

            var popoverFilter = "";
            if (  datagrid.data('data').filter === true){
                popoverFilter = '<div class="row"><div class="col-lg-12"><h3>'+datagrid.data('data').title+'</h3><hr><table class="table text-center"><thead ><th class="text-center"></th><th class="text-center">Oculto</th><th class="text-center">Filtrar</th></thead><tbody>';
            }
            
            head = "";
            head = '<thead id="thead-'+datagrid.data('data').idDatagrid+'"><tr>';
            if ( datagrid.data('data').rownumbers === true){
                head += '<th class="active text-center">#</th>';
            }

            $.each( datagrid.data("data").columns[0], function( i, val ) {

                var classHidden = '';
                if ( val.hidden === true ){
                    classHidden = 'hidden = "hidden"'
                }else{
                    if ( val.filter === true ){
                        var checkFilter = $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid +':checked').length;
                        if ( checkFilter > 0 ){
                            classHidden = 'hidden = "hidden"'
                        }
                    }
                }
              head += '<th class="text-center" '+classHidden+'>' + val.title + '</th>';
              var checkEnabled = '';
              if (  datagrid.data('data').filter === true && val.filter === true){
                if ( val.hidden === true ){
                    checkEnabled = 'disabled';
                }
                popoverFilter += '<tr><td><b>'+ val.title + '</b></td><td><label class="checkbox-inline"><input type="checkbox" id="checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid+'" value="option1" '+checkEnabled+'>  </label></td><td><input class="form-control" type="text" id="inputFilter-'+val.name+'-'+datagrid.data('data').idDatagrid+'"></input></td> </tr>';
              }
            });

            head += "</tr></thead>";
            datagrid.append(head);

            $.each(datagrid.data('data').pageList, function(key, value) {
                $('#clist-'+datagrid.data('data').idDatagrid)
                         .append($("<option></option>")
                         .attr("value",value)
                         .text(value))
                
            });
            if (  datagrid.data('data').filter === true){
                popoverFilter += '</tbody></table></div></div>';
            }
            $('#ct-'+ datagrid.data('data').idDatagrid).append('<div id="modalFiltro-'+datagrid.data('data').idDatagrid+'" class="easy-modal"><div class="easy-modal-content" id="modalFiltroContent-'+datagrid.data('data').idDatagrid+'"><div class="easy-modal-body">'+popoverFilter+'</div><hr><div class="row text-center"><button type="button" id="buttonAcceptFilter-'+datagrid.data('data').idDatagrid+'" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span> Aplicar</button>  <button type="button" id="buttonClearFilter-'+datagrid.data('data').idDatagrid+'" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span> Limpiar</button></div></div></div>');

            loadData(datagrid);

            // EVENTOS
            $("#clist-"+ datagrid.data('data').idDatagrid).on('change',function(e) {
                $('#cpage-'+data.idDatagrid).empty();
                loadData(datagrid);
            });
            $("#cpage-"+ datagrid.data('data').idDatagrid).on('change',function(e) {
                loadData(datagrid);
            });

            $('#buttonViewFilter-'+datagrid.data('data').idDatagrid).on('click',function(e) {
                $('#modalFiltro-'+datagrid.data('data').idDatagrid).fadeIn(400);
                var handler = function(e) {
                  if ( e.key === 'Escape' ){
                    $(document).unbind('keyup', handler);
                    $('#modalFiltro-'+datagrid.data('data').idDatagrid).fadeOut(400); 
                  }
                };
                $(document).bind('keyup', handler);
            });

            $('#buttonAcceptFilter-'+datagrid.data('data').idDatagrid).on('click',function(e) {
                $('#modalFiltro-'+datagrid.data('data').idDatagrid).fadeOut(400);
                var cambios = false;
                $.each( datagrid.data("data").columns[0], function( i, val ) {
                    if ( val.filter === true ){
                        var checkFilter = $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid +':checked').length;
                        if ( checkFilter > 0 ){
                            cambios = true;
                        }
                        if ( $('#inputFilter-'+val.name+'-'+datagrid.data('data').idDatagrid).val() !== "" ){
                            cambios = true;
                        }
                    }

                });
                if ( cambios === true ){
                    $('#buttonViewFilter-'+datagrid.data('data').idDatagrid).removeClass('btn-default').addClass('btn-danger').animateCss('swing');
                }else{
                    $('#buttonViewFilter-'+datagrid.data('data').idDatagrid).removeClass('btn-danger').addClass('btn-default');
                }
                $('#cpage-'+data.idDatagrid).empty();
                $('#clist-'+data.idDatagrid).empty();
                loadData(datagrid);
            });


            $('#buttonClearFilter-'+datagrid.data('data').idDatagrid).on('click',function(e) {
                var cambios = false;
                $.each( datagrid.data("data").columns[0], function( i, val ) {
                    if ( val.filter === true ){
                        var checkFilter = $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid +':checked').length;
                        if ( checkFilter > 0 ){
                            $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid).prop("checked", false);
                            cambios = true;
                        }
                        if ( $('#inputFilter-'+val.name+'-'+datagrid.data('data').idDatagrid).val() !== "" ){
                            $('#inputFilter-'+val.name+'-'+datagrid.data('data').idDatagrid).val("");
                            cambios = true;
                        }
                    }

                });
                if ( cambios === false ){
                    $('#buttonClearFilter-'+datagrid.data('data').idDatagrid).animateCss('bounce');
                }
                
            });

            $('#buttonRefresh-'+datagrid.data('data').idDatagrid).on('click',function(e) {
                loadData(datagrid);
            });

            $('#buttonExport-'+datagrid.data('data').idDatagrid).on('click',function(e) {
                var args = [$('#ct-'+ datagrid.data('data').idDatagrid +'>table'), 'export.xls'];
                exportTableToCSV.apply(this, args);
            });

            $('#buttonPreviuos-'+ datagrid.data('data').idDatagrid).on('click',function(e) {
                var x = parseInt($('#cpage-'+data.idDatagrid).val());
                if ( x < 2 ){
                    return;
                }
                x--;
                $('#cpage-'+data.idDatagrid).val(x);
                loadData(datagrid);
            });

            $('#buttonNext-'+ datagrid.data('data').idDatagrid).on('click',function(e) {
                var x = parseInt($('#cpage-'+data.idDatagrid).val());
                var xUltimo = parseInt( $('#cpage-'+data.idDatagrid + ' option:last-child').val() );
                if ( x >= xUltimo ){
                    return;
                }
                x++;
                $('#cpage-'+data.idDatagrid).val(x);
                loadData(datagrid);
            });

    function exportTableToCSV($table, filename) {
        var xls = '<table>';
        xls += '<thead><tr>';
        $("#table1 thead tr th").each(function (index) {
            if ( $(this).attr('hidden') !== 'hidden' ){
             xls += '<th style="border: 1px solid black; background-color: #0080FF; color:white; height: 50px; text-align: center;">'+ $(this).text() + '</th>';
            };
        });
        xls += '</tr></thead>';
        xls += '<tbody>';
        $("#table1 tbody tr").each(function (index) {
            xls += '<tr>';
            $(this).find('td').each(function (index) {
                if ( $(this).attr('hidden') !== 'hidden' ){
                    xls += '<td style="border: 1px solid black; height: 30px; width: auto;">' + $(this).text() + '</td>';
                }
                

            });
            xls += '</tr>';
        });
        xls += '</tbody>';
        xls += '</table>';
       // console.log(xls);

            var blob = new Blob([xls], { type: 'text/excel;charset=utf8' });
            var csvUrl = URL.createObjectURL(blob);
                $( this )
                    .attr({
                        'download': filename,
                        'href': csvUrl
                    });

    }

        },          
        getSelectedRow : function(opciones){
            var datagrid = $(this);
            if (typeof datagrid.data("data") === 'undefined'){
                $.error( 'El elemento no es un objeto datagrid de easy-bootstrap.' );
                return;
            }
            var result = "";
            var row = $('#'+data.idDatagrid+' tbody tr.active2 ' );
            var rowLength = $('#'+data.idDatagrid+' tbody tr.active2 ').length;
            var name = "";
            var primerI = 0;

            if ( rowLength <= 0 ){
                return;
            }
            if ( datagrid.data('data').multiSelect === false ){
                result = "{";
                $.each( row.find('td'), function( i, val ) {
                    
                    if ( $(this).attr('data-name') !== undefined ){
                        primerI++;
                        name = $(this).attr('data-name');
                        if (primerI === 1){
                            result += '"'+ name + '" : "' + $(this).text()+'"';
                        }else{
                            result += ',"' + name + '" : "' + $(this).text()+'"';
                        }

                    }
                });
                result += '}';
                result = JSON.parse(result);
            }else{
                $.each( row, function( i, val ) {
                    result += "{";
                    primerI = 0;
                    $.each( $(this).find('td'), function( j, val2 ) {
                            if ( $(this).attr('data-name') !== undefined ){
                            primerI++;
                            name = $(this).attr('data-name');
                            if (primerI === 1){
                                result += '"'+ name + '" : "' + $(this).text()+'"';
                            }else{
                                result += ',"' + name + '" : "' + $(this).text()+'"';
                            }
                            
                            result += '';
                        }
                    });
                    if ( row.length === (i + 1) ){
                        result += '}';
                    } else{
                        result += '},';
                    }
                });
                result = JSON.parse("["+result+"]");
            }
            return result;
        },
    };


    function loadData(datagrid){
        data = datagrid.data("data");
        $('#buttonNext-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#buttonPreviuos-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#buttonViewFilter-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#buttonRefresh-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#buttonExport-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#clist-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        $('#cpage-'+ datagrid.data('data').idDatagrid).attr('disabled', true);
        var selectedRows = data.pageList[0];
        var selectedPage = 1;
        if ( $('#clist-'+data.idDatagrid + ' option').length > 1){
            selectedRows = $('#clist-'+data.idDatagrid).val();
        }else{
            $.each(data.pageList, function(key, value) {
                $('#clist-'+datagrid.data('data').idDatagrid)
                         .append($("<option></option>")
                         .attr("value",value)
                         .text(value))
                
            });
        }
        if ( $('#cpage-'+data.idDatagrid + ' option').length > 1){
            selectedPage = parseInt($('#cpage-'+data.idDatagrid).val());
        }else
            head = "";
            head = '<tr>';
            if ( datagrid.data('data').rownumbers === true){
                head += '<th class="active text-center">#</th>';
            }

        $.each( datagrid.data("data").columns[0], function( i, val ) {
            var classHidden = '';
            if ( val.hidden === true ){
                classHidden = 'hidden = "hidden"'
            }else{
                if ( val.filter === true ){
                    var checkFilter = $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid +':checked').length;
                    if ( checkFilter > 0 ){
                        classHidden = 'hidden = "hidden"'
                    }
                }
            }

          head += '<th class="text-center" '+classHidden+'>' + val.title + '</th>';
        });

        head += "</tr></thead>";
        $('#thead-'+data.idDatagrid).empty();
        $('#thead-'+data.idDatagrid).append(head);
        $("#" + data.idDatagrid + "-tbody").remove();
        $('#ct-'+ data.idDatagrid).append('<div align="center" id="spin-'+ data.idDatagrid + '"><div class="loader"></div>Espere</div>');
        var jsonText = "";
        if ( data.filter === true  ){
            var datos = [];
            $.each( datagrid.data("data").columns[0], function( i, val ) {
                if ( val.filter === true ){
                    if ( $('#inputFilter-'+val.name+'-'+data.idDatagrid).val() !== "" ){
                        datos.push({
                            'name': val.name,
                            'op': "",
                            'value': $('#inputFilter-'+val.name+'-'+data.idDatagrid).val()
                        });
                    }
                }

            });
            var jsonText = JSON.stringify(datos);
        }
        $.ajax({
            url: data.urldir,
            datatype: "json",
            method: "POST",
            data: { rows: selectedRows, page: selectedPage, filterRules: jsonText},
            success: function(result){
                var countRows = 1;
                if ( data.pagination === true ){
                    var countRows = ((parseInt(selectedPage) * parseInt(selectedRows)) - parseInt(selectedRows) ) + 1;
                 //   alert(parseInt(selectedPage));
                }
                
            tbody = '<tbody id="' + data.idDatagrid + '-tbody" >';

                $.each(result['rows'], function(key, value) {
                    tbody += '<tr>';
                        if ( data.rownumbers === true){
                            tbody += '<td class="active">'+countRows+'</td>';
                            countRows ++;
                        }
                    $.each( data.columns[0], function( i, val ) {
                        var classHidden = '';
                        if ( val.hidden === true ){
                            classHidden = 'hidden = "hidden"'
                        }else{
                            if ( val.filter === true ){
                                var checkFilter = $('#checkOculto-'+val.name+'-'+datagrid.data('data').idDatagrid +':checked').length;
                                if ( checkFilter > 0 ){
                                    classHidden = 'hidden = "hidden"'
                                }
                            }
                        }
                        var textValue = value[val.name];
                        if ( textValue === null ){
                            textValue = '';
                        }
                        tbody += '<td data-name="'+val.name+'" '+classHidden+'>' + textValue + '</td>';
                    });
                    tbody += '</tr>';
                });
                tbody += "</tbody>";
                $("#spin-" + data.idDatagrid).remove();
                datagrid.append(tbody);
                $("#lt-"+ data.idDatagrid).empty();
                $("#lt-"+ data.idDatagrid).append('Total: <mark>' + result['total'] + '</mark> registros.');

                if ( $('#cpage-'+data.idDatagrid + ' option').length <= 0 ){

                    var totalPage = Math.round(result['total'] / selectedRows);
                    if ( (totalPage * selectedRows ) < parseInt(result['total'])){
                        totalPage++;
                    }
                    for (var i = 1 ; i <= totalPage ; i++) {
                        $('#cpage-'+data.idDatagrid)
                             .append($("<option></option>")
                             .attr("value",i)
                             .text(i))
                    }
                }
                if ( $('#clist-'+data.idDatagrid + ' option').length <= data.pageList.length ){
                        $('#clist-'+data.idDatagrid)
                         .append($("<option></option>")
                         .attr("value",result['total'])
                         .text(result['total']))
                }

                if ( data.selectRow === true ){
                    
                  $('#'+data.idDatagrid+' tbody tr' ).on('click', function(event){
                        if ( data.multiSelect !== true ){
                            $('#'+data.idDatagrid+' tbody tr' ).removeClass('active2');
                            $(this).addClass('active2');
                        }else{
                            if ( $( this ).hasClass('active2') === true ){
                                $( this).removeClass('active2');
                            }else{
                                $(this).addClass('active2');
                            }
                        }
                    });
                }
                $('#buttonNext-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#buttonPreviuos-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#buttonViewFilter-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#buttonRefresh-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#buttonExport-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#clist-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
                $('#cpage-'+ datagrid.data('data').idDatagrid).attr('disabled', false);
        }});
    }

	$.fn.datagrid = function ( opciones ){

        if ( methods[opciones] ) {
            return methods[ opciones ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof opciones === 'object' || ! opciones ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'No existe el metodo '+  opciones  +' en easyBootstrap-datagrid' );
        } 
	};
})();