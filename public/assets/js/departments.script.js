let province = (function (_document, $) {

    // Cache DOM
    let $document = $(document);

    _getAllDepartments();

    // Get All Departments and add to Province Menu List
    function _getAllDepartments() {
        $.ajax({
            type: "GET",
            url: "/departments/show",
            contentType: "application/json",
            data: JSON.stringify(),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {
                if(response.departments != undefined) {
                    response.departments.forEach((department) => {
                        $document.find('#departments').append("<li class='has-sub h5 departmentList' data-id='"+department.DepartamentoId+"'>"+
                            "<a href='#' class='menu-item'><span class='menu-title'>"+department.Departamento+"</span></a></li>");

                        _listDocumentTypesByDepartmentId(department.DepartamentoId);
                        //Adicionar Departamentos na Modal para Criar caixas
                        $document.find("#NomeDepartamento").append('<option value="'+department.DepartamentoId+'">'+department.Departamento+"</option>");
                        // $document.find("#NomeProvincia").append(_listDocumentTypesByDepartmentId(department.DepartamentoId));
                    });

                    // Bind events
                    $document.find('.departmentList').on('click', _handleDepartmentClick);
                }
            },
            error: function (response) {
                console.log(response)
            }
        });
    }

    // Handle Documtent Types when the Department is listed;
    async function _listDocumentTypesByDepartmentId(departmentId) {
        const selectedDepartment = $document.find(`#departments .departmentList[data-id="${departmentId}"]`);

        try {
            const { documentTypes } = await $.ajax({
                type: "GET",
                url: "/departments/document-types/" + departmentId,
                contentType: "application/json",
                data: JSON.stringify(),
                dataType: "json",
                async: true,
                cache: false,
            });

            console.log(documentTypes, selectedDepartment);

            selectedDepartment.append('<ul class="menu-content"></ul>');

            documentTypes.forEach(({ TipoDocumentoId, Designacao }) => {
                selectedDepartment.find('.menu-content').append(`<li class="sgq-list-boxes-by-documenttype" data-id="${TipoDocumentoId}">
                                        <a class="menu-item" href="#">${Designacao}</a>
                                    </li>`);
                $document.find("#NomeProvincia").append('<option value="'+TipoDocumentoId+'">'+Designacao+"</option>");
            });

            $document.find('.sgq-list-boxes-by-documenttype').off('click').on('click', _getAllBoxesByDocumentType);

        } catch (e) {
            console.log(e);
        }
    }

    function _handleDepartmentClick(event){
        let departmentId = event.currentTarget.getAttribute('data-id');
        let $departmentList = $document.find('.departmentList');

        // console.log(departmentId);

        home.setTotalDocumentsCount('');
        $departmentList.removeClass('active');
        $departmentList.find('a').css('background', 'transparent');
        // SET Department ACTIVE
        $document.find(this).addClass('active');
        // $document.find('.main-menu.menu-dark .navigation>li .active>a');
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

        // Clear search box
        $document.find('#boxSearch').val("");

    }

    function _getAllBoxesByDocumentType() {
        const documentTypeId = $(this).attr('data-id');

        $.ajax({
            type: "GET",
            url: `/boxes/${documentTypeId}`,
            contentType: "application/json",
            data: JSON.stringify(),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {
                if (response.boxes != undefined) {
                    home.clearDiv('accordionCryptoTypes');

                    // Clear details div
                    home.clearDiv('details_div');
                    home.addDiv('details_div', 'details');

                    //Total de documentos por provincia
                    response.boxes.length ? $('#totalProvince').text(response.boxes.length) : $('#totalProvince').text('');
                    localStorage.setItem('provinceSet', documentTypeId);

                    response.boxes.forEach((box, index) => {

                        localStorage.setItem('province', box.TipoDocumento);


                        //console.log("ISSO É o QUÊ? ",box.TipoDocumento);

                        console.log(box.TipoDocumento);
                        home.addDiv('accordionCryptoTypes', 'province_boxes');
                        $document.find('#province_boxes').append(appendProvinceBoxes(box, index));
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

                    $document.find('#province_boxes').append(`<h1>Não existe(m) Caixa(s) neste Orgão</h3>`);
                    toastr.warning('Não existe(m) Caixa(s) neste Orgão', 'Aviso!', { "timeOut": 5000 });
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

    function getDepartmentById(departmentId) {

        $.ajax({
            type: "GET",
            url: "/get-box-province/"+departmentId+"",
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
                    localStorage.setItem('provinceSet', departmentId);

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
        // let btnRemove = document.cookie.indexOf('Administrador') !== -1 ?
        //                         "<div class='remove-box-btn mt-1 ml-1' >"+
        //                             "<i class='ft-trash-2 remove-box danger' data-id='"+box.CaixaId+"' data-toggle='modal' data-target='#confirm' title='Remover'  style='font-size: 25px;'></i>"
        //                         + "</div>"
        //                         : "";

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
        getDepartmentById,
        appendProvinceBoxes
    }

})(Document, jQuery);