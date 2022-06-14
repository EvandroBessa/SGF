let province = (function (_document, $) {

    // Cache DOM
    let $document = $(document);

    _getAllProvinces();

    // Get All Provinces and add to Province Menu List
    function _getAllProvinces() {
        $.ajax({
            type: "GET",
            url: "/get-province",
            contentType: "application/json",
            data: JSON.stringify(),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {
                if(response.province != undefined){
                    response.province.forEach(province => {
                        $document.find('#departments').append("<li class='menu-item h5 provinceList' data-id='"+province.ProvinciaId+"'>"+
                            "<a href='#'><span class='menu-title' data-i18n='Transactions'>"+province.Provincia+"</span></a></li>");

                        //Adicionar Provincias na Modal para Criar caixas
                        $document.find("#NomeProvincia").append('<option value="'+province.ProvinciaId+'">'+province.Provincia+"</option>");
                    });

                    // Bind events
                    $document.find('.provinceList').on('click', _handleProvinceClick);
                }
            },
            error: function (response) {
                console.log(response)
            }
        });
    }

    function _handleProvinceClick(event){
        let provinciaId = event.currentTarget.getAttribute('data-id');
        let $provinceList = $document.find('.provinceList');

        home.setTotalDocumentsCount('');
        $provinceList.removeClass('active');
        $provinceList.find('a').css('background', 'transparent');
        // SET Province ACTIVE
        $document.find(this).addClass('active');
        $document.find('.main-menu.menu-dark .navigation>li .active>a').css('background', '#36a9f3');

        home.hideDetailsDiv();

        $document.find('#user-container').addClass('hidden');
        $document.find('#box-row').removeClass('hidden');
        $document.find('#box-container').addClass('hidden');
        $document.find('#provinceStatsContainer').addClass('hidden');
        $document.find('#userStatsContainer').addClass('hidden');
        $document.find('#globalGraphContainer').addClass('hidden');
        $document.find('#monthlyStatsContainer').addClass('hidden');
        $document.find('#monthlyUserStatsContainer').addClass('hidden');
        $document.find('#provinceUserStatsContainer').addClass('hidden');

        getProvinceById(provinciaId);

        // Clear search box
        $document.find('#boxSearch').val("");

    }

    function getProvinceById(provinciaId){

        $.ajax({
            type: "GET",
            url: "/get-box-province/"+provinciaId+"",
            contentType: "application/json",
            data: JSON.stringify(),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {

                if(response.province != undefined){

                    home.clearDiv('accordionCryptoTypes');

                    // Clear details div
                    home.clearDiv('details_div');
                    home.addDiv('details_div', 'details');

                    //Total de documentos por provincia
                    response.province.length ? $('#totalProvince').text(response.province.length) : $('#totalProvince').text('');
                    localStorage.setItem('provinceSet', provinciaId);

                    response.province.forEach((province, index) => {

                        localStorage.setItem('province', province.Provincia);

                        console.log(province.Provincia)
                        home.addDiv('accordionCryptoTypes', 'province_boxes');
                        $document.find('#province_boxes').append(appendProvinceBoxes(province, index));
                    });

                    home.addScroll('accordionCryptoTypes');

                    // Add event listener to remove icon
                    $('.remove-box').on('click', function(element){
                        // element.stopPropagation(); //Prevent parent from being called
                        let boxId = element.currentTarget.getAttribute('data-id');
                
                        $document.find('#remBoxId').remove(); // remove doc id if exists
                        $document.find('#remDocId').remove(); // remove doc id if exists
                        $document.find('#confirm').append(`<input type='hidden' id='remBoxId' value='${boxId}'/>`);
                        $document.find('#confirmTitle').text('Eliminando Caixa');
                    });

                }else{

                    console.log(response.error)
                    home.clearDiv('accordionCryptoTypes');
                    home.addDiv('accordionCryptoTypes', 'province_boxes');
                    // $('#documents_types').append('<h5 class="danger">'+response.error+'</h5>');

                    $document.find('#province_boxes').append(`<h1>Não existe(m) Caixa(s) nesta Provincia</h3>`);
                    toastr.warning('Não existe(m) Caixa(s) nesta Provincia', 'Aviso!', { "timeOut": 5000 });
                }

                home.clearDiv('accordionCrypto');
                home.clearDiv('accordionCryptoDocs');
                home.clearDiv('iframeMain');
            },
            error: function (response) {
                console.log(response)
            }
        });
    }

    function appendProvinceBoxes(box, index){

        //Append remove button if admin
        let btnRemove = document.cookie.indexOf('Administrador') !== -1 ? 
                                "<div class='remove-box-btn mt-1 ml-1' >"+
                                    "<i class='ft-trash-2 remove-box danger' data-id='"+box.CaixaId+"' data-toggle='modal' data-target='#confirm' title='Remover'  style='font-size: 25px;'></i>"
                                + "</div>"
                                : "";

        let boxData =   "<div class='box_div' id='box_"+box.CaixaId+"' style='display: flex; justify-content: space-between;'>"+
                            "<div class='card accordion collapse-icon accordion-icon-rotate box-card w-100' data-id="+box.CaixaId+" data-name='"+box.Designacao+"''>"+
                                "<a id='heading31' data-toggle='collapse' href='#accordionBTC"+index+"' aria-expanded='true' aria-controls='accordionBTC"+index+"' class='card-header bg-info p-1 bg-lighten-1'>"+
                                    "<div class='card-title lead white'>"+ box.Designacao +"</div>"+
                                "</a>"+
                                "<div id='accordionBTC"+index+"' role='tabpanel' data-parent='#accordionCryptoTypes' aria-labelledby='heading31' class='collapse' aria-expanded='true'>"+
                                    "<div id='folder_div"+box.CaixaId+"'>" +
                                        "<div id='folders"+box.CaixaId+"'></div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"
        return boxData;
    }

    return {
        getProvinceById,
        appendProvinceBoxes
    }

})(Document, jQuery);