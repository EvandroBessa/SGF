let printer = (function(){
  
    $('#print-card').on('click', function(event){

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

        let docInfo = $(document).find('#doc-infoContent');

        docInfo.find('.form-group')
            .css('margin-bottom', '1.5rem')

        docInfo.find('.row')
            .css('display', 'flex')
            .css('flex-wrap', 'wrap')
            .css('margin-right', '-15px')
            .css('margin-left', '-15px')

        // $('.details-card').css('transform', 'scale(1.6)');
        
        let cardInfo = $('.details-card').html();

        $.ajax({
            method: 'POST',
            url: '/printer',
            data: {
                content: cardInfo
            },
            success: function(response) {
                console.log('Printer response: ', response);
            },
            error: function(response) {
                console.log('Printer error: ', response);
            }
        });

        docInfo.find('.row').removeAttr('style');

        return
        let scale = 2;
        let marginRight = dataType === 'box-content' ? 2 : 1;
        let marginLeft = -28;
        let marginTop = dataType === 'box-content' ? 23.5 : 17.5;

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
})()