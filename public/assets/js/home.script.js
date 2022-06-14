let home = (function (_document, $) {

    // Cache DOM
    let $document = $(_document);
    let userRole = $.cookie('role');

    function clearDiv(divId){
        $('#'+divId+'').children('div').remove();
    }

    function addDiv(divMain, divContent){
        (divContent === 'iframeContent') ? $('#'+divMain+'').append('<div id='+divContent+' style="height: 80vh;"></div>')
            : $('#'+divMain+'').append('<div id='+divContent+'></div>');
    }

    function showDetailsDiv(){
        $('.details-card').removeClass('hidden');
        $('#print-card').removeClass('hidden');
    }

    function hideDetailsDiv(){
        $('.details-card').addClass('hidden');
        $('#print-card').addClass('hidden');
    }

    function centerDiv(div){
        $('#'+div)[0].style.display = 'flex';
        $('#'+div)[0].style.flexDirection = 'column';
        $('#'+div)[0].style.justifyContent = 'center';
        $('#'+div)[0].style.alignItems = 'center';
    }

    function addScroll(div){
        // style="height: 458px; padding: 10px; overflow-y: auto;"
        return $('#'+div+'')
                    .css('height', '458px')
                    .css('overflow-y', 'auto');
    }

    function setTotalDocumentsCount(number){
        return $document.find('#totalDocs').text(number);
    }

    // Print card info
    $document.find('#print-card').on('click', function(event){

        let cardInfo = $('.details-card').html();
        let dataType = $('#doc-infoContent').data('type');

        /** POSITION SETTINGS FOR SMALL STICKERS */
        // let scale = 1.7;
        // let marginRight = dataType === 'box-content' ? 2 : 1;
        // let marginLeft = -10;
        // let marginTop = dataType === 'box-content' ? 39 : 33.5;

        /** PRINT SETTINGS FOR SMALL STICKERS */
        // $('#sigarq-print')
        //     .css('display', 'block')
        //     .css('transform', 'scale('+scale+')')
        //     // .css('transform', 'scale('+scale+') rotate(90deg)')
        //     .css('margin-right', ''+marginRight+'%')
        //     .css('margin-top', ''+marginTop+'%')
        //     .css('margin-left', ''+marginLeft+'%')
        //     .css('width', '500px');

        let isBox = dataType === 'box-content' ? true : false;
        let scale = isBox ? 1.8 : 1.65;
        let marginRight = 4.5;
        let marginLeft = -25;
        let marginTop = isBox ? 13 : 8.7;

        $('#sigarq-app').css('display', 'none');

        /** PRINT SETTINGS FOR LARGE STICKERS */
        $('#sigarq-print')
        .css('display', 'block')
        .css('transform', 'scale('+scale+')')
        // .css('transform', 'scale('+scale+') rotate(90deg)')
        .css('margin-right', ''+marginRight+'%')
        .css('margin-top', ''+marginTop+'%')
        .css('margin-left', ''+marginLeft+'%')
        .css('width', '500px');


        $('body').css('background-color', 'white');
        $('body').addClass('d-flex justify-content-center');
        $('footer > p').css('display', 'none');

        $('#sigarq-print').html(cardInfo);
        $('#sigarq-print > div.card-content')
        .css('border-radius', '20px')
        .css('border', '2px solid #000');

        window.print();

        $('#sigarq-app').css('display', 'block');
        $('#sigarq-print')
        .css('display', 'none')
        .css('transform', '')
        .css('margin-right', '')
        .css('margin-top', '')

        $('#sigarq-print > div.card-content')
        .css('border-radius', '')
        .css('border', '');

        $('body').css('background-color', '');
        $('body').removeClass('d-flex justify-content-center');
        $('footer > p').css('display', '');

    });

    // Check user role
    if(userRole === 'AdminDigitalizacao'){
        $document.find('#user-container').addClass('hidden');
        $document.find('#box-row').addClass('hidden');
        $document.find('#box-container').addClass('hidden');
        $document.find('#provinceStatsContainer').addClass('hidden');
        $document.find('#province_menu').addClass('hidden');
        $document.find('#status-filter').addClass('hidden');
        $document.find('#verifier-filter').addClass('hidden');
        // $('#gestao_menu_box').addClass('hidden');
        // $('#province-stats-link').addClass('hidden');
        $document.find('#userStatsContainer').removeClass('hidden');
        $document.find('#user-stats-title').text('Estatísticas - Documentos Digitalizados Por Utilizadores Por Dia');
        $document.find('#province-stats-title').text('Estatísticas - Documentos Digitalizados Por Provincia');
        $document.find('#user-stats').attr('admin-dig', true);
        $document.find('#date_verified').attr('admin-dig', true);
        $document.find('#year_verified').attr('admin-dig', true);
        $document.find('#province-stats').attr('admin-dig', true);
        $document.find('#monthly-perUser-stats').attr('admin-dig', true);
        $document.find('#province-perUser-stats').attr('admin-dig', true);
        $document.find('#perfilVerificador').attr('disabled', true);
        $document.find('#monthly-stats').text('Digitalizados - Mensal');
        $document.find('#province-stats').text('Digitalizados - Provincias');


    } else if(userRole === 'Verificador'){
        $document.find('#gestao_menu').addClass('hidden');
        $document.find('#stats_menu').addClass('hidden');
        // $document.find('#province_menu').addClass('hidden');
    } else {
        $document.find('#addBoxModal').addClass('hidden');
        $document.find('#addNomeCaixa').attr('disabled', true);
        $document.find('#NomeProvincia').attr('disabled', true);
        $document.find('#perfilDigitalizador').attr('disabled', true);
        $document.find('#digitizer-filter').addClass('hidden');
        $document.find('#monthly-stats').text('Verificados - Mensal');
        $document.find('#province-stats').text('Verificados - Provincias');
        $('select#letraCaixa').prop('disabled', true);
    }

    localStorage.clear();

    return {
        setTotalDocumentsCount,
        clearDiv,
        addDiv,
        addScroll,
        centerDiv,
        showDetailsDiv,
        hideDetailsDiv
    }

})(Document, jQuery);