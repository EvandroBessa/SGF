let documents = (function (_document, $) {
    // Cache DOM
    let $document = $(_document);
    let $docSearchInput = $document.find("#docSearch");
    let $docParentDiv = $document.find("#accordionCrypto");
    let $confirmDiv = $document.find("#confirm");
    let $dropdownMenu = $document.find(".dropdown-menu");
    let $formValidateBtn = $document.find("#validate-btn");
    let $validationForm = $document.find("#form-validate");
    let $setValidateBtn = $validationForm.find("#switchery2");
    let userRole = $.cookie("role");

    // Bind events
    $document.on("click", ".docsList", _appendDocumentImage);
    $docSearchInput.on("keyup", _handleDocSearchInputKeyUp);
    $docSearchInput.on("change", _handleDocSearchInputChange);
    $document.on("click", ".remove-doc", _handleDocRemove);
    $document.find("#btn_yes").on("click", _removeDoc);
    $document.on("click", "#refreshDocs", _handleDocRefresh);
    $document.on("click", ".resetSocioStatus", _resetSocioStatus);
    $document.on("click", ".doc-status", _filterDocs);
    $validationForm.on("submit", _handleValidationFormSubmit);
    // $document.find('.docsList').on('click', _loadDocuments);

    // Submit Socios form
    function _handleValidationFormSubmit(event) {
        event.preventDefault();

        let doc_id = $document.find("#doc_id").val();
        let status_flag = $document.find("#status_flag").val();

        _updateSocios(doc_id, status_flag);
    }

    // Append images on doc click
    function _appendDocumentImage(event) {
        let id = event.currentTarget.getAttribute("data-id");
        _loadDocuments(event);
        $.ajax({
            type: "GET",
            url: `/animal_image/${id}`,
            data: {},
            dataType: "JSON",
            success: function (response) {
                console.log('XXXXXX:',response);
                // const { document } = response;

                if (response.length !== 0) {

                    response.map(({ Documento, imagem }) => {
                         _loadDocuments(event);
                         console.log('XXXXXX1:',imagem);
                        $document.find("#iframeContent").html(`<iframe src="data:application/pdf;base64,${imagem}" frameborder="0" width="100%" height="100%"></iframe>`);
                    });
                }
            },
        });
    }

    function _handleDocSearchInputKeyUp(event) {
        let searchString = $docSearchInput.val().toUpperCase();

        if (event.keyCode === 13 && searchString) {
            _searchDoc(searchString);
        } else if (event.keyCode === 8 && searchString === "") {
            $docParentDiv.children("div").remove();

            let folderId = localStorage.getItem("folderName");

            if (folderId) getSociosByFolder(folderId);

            home.setTotalDocumentsCount("");
        }
    }

    // Clear search if input text is cut
    function _handleDocSearchInputChange() {
        let searchString = $docSearchInput.val();

        if (searchString === "") {
            $docParentDiv.children("div").remove();
            home.setTotalDocumentsCount("");
        }
    }

    function _searchDoc(searchString) {
        $.ajax({
            type: "GET",
            url: "/search-doc/" + searchString + "",
            data: JSON.stringify(),
            dataType: "json",
            success: function (response) {
                console.log("Folder Search: ", response.socios);
                home.clearDiv("accordionCrypto");
                home.addDiv("accordionCrypto", "docs");

                if (response.socios !== undefined) {
                    home.setTotalDocumentsCount(response.socios.length);

                    console.log("Search length ", response.socios.length);

                    // Append filter buttons
                    $docParentDiv.prepend(`
                                    <div class="row">
                                        <div class="col-5 pr-0">
                                            <div class="btn-group w-50 mb-2">
                                                <button type="button" class="btn btn-info text-uppercase h-4" style='background-color: #0f5a37 !important;'>Filtrar</button>
                                                <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item doc-status" id='get-validated' filter-type='validated' href="#">Validado</a>
                                                    <a class="dropdown-item doc-status" filter-type='not_validated' href="#">Não Validado</a>
                                                    <a class="dropdown-item doc-status" filter-type='both' href="#">Todos</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col pl-0">
                                            <div class="w-100 bg-white pl-1 rounded d-flex align-items-center mb-2" style="height: 40px">
                                                <span>Total de Documentos <strong id="filterTotalDoc" class="bg-info text-white rounded font-weight-normal" style="padding: 4px;">---</strong> </span>
                                            </div>
                                        </div>
                                    </div>
                                    `);

                    home.addScroll("docs");

                    $document
                        .find("#filterTotalDoc")
                        .text(response.socios.length); //Docs not validated

                    response.socios.map((socio, index) => {
                        appendSociosInfo(socio);
                    });

                    $(".card-content").map((index, div) => {
                        div.style.display = "flex";
                    });
                } else {
                    console.log(response.error);
                    home.setTotalDocumentsCount(0);
                    $document
                        .find("#docs")
                        .append(`<h1>${response.error}</h3>`);
                    // toastr.warning('Não existe(m) documento(s) nesta Pasta', 'Aviso!', { "timeOut": 2500 });
                }

                home.clearDiv("iframeMain");
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    function getSociosByFolder(folderId, validated = false) {
        $.ajax({
            type: "GET",
            url: "/area-animal/" + folderId + "",
            data: JSON.stringify(),
            dataType: "json",
            success: function (response) {
                home.clearDiv("accordionCrypto");
                home.addDiv("accordionCrypto", "docs");

                console.log("Requisição de Documentos: ", response);

                if (response.length !== 0) {
                    // SET SELECTED FOLDER NAME Only if document is not validated
                    localStorage.setItem("folderName", folderId);
                    home.setTotalDocumentsCount(response.length);

                    // Append filter buttons
                    $docParentDiv.prepend(`
                                    <div class="row">
                                        <div class="col-5 pr-0">
                                            <div class="btn-group w-50 mb-2">
                                                <button type="button" class="btn btn-success text-uppercase h-4 "  style='background-color: #0f5a37 !important;'>Filtrar</button>
                                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split"  style='background-color: #0f5a37 !important;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item doc-status" id='get-validated' folderId='${folderId}' filter-type='validated' href="#">Validado</a>
                                                    <a class="dropdown-item doc-status" filter-type='not_validated' href="#">Não Validado</a>
                                                    <a class="dropdown-item doc-status" filter-type='both' href="#">Todos</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col pl-0">
                                            <div class="w-100 bg-white pl-1 rounded d-flex align-items-center mb-2" style="height: 40px">
                                                <span>Total de Animais <strong id="filterTotalDoc" class="bg-success text-white rounded font-weight-normal" style="background-color: #0f5a37 !important; padding: 4px;">---</strong> </span>
                                            </div>
                                        </div>
                                    </div>
                                    `);

                    home.addScroll("docs");

                    console.log(folderId);
                    $document
                        .find("#filterTotalDoc")
                        .text(response.length); //Docs not validated

                    response.map((document) => {
                        console.log("o que é isso:  ",document);
                        appendSociosInfo(document);
                    });

                    $(".card-content").map((index, div) => {
                        div.style.display = "flex";
                    });
                } else {
                    home.setTotalDocumentsCount(0);
                    localStorage.setItem("folderName", ""); //Clear local storage value
                    $("#docs").append(
                        `<h1>Não existe(m) Animal(s) nesta Área de Conservação</h3>`
                    );
                }

                home.clearDiv("iframeMain");
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    function _handleDocRemove(event) {
        // event.stopPropagation(); //Prevent parent from being called
        let docId = event.currentTarget.getAttribute("data-id");
        let docBox = event.currentTarget.getAttribute("data-box");
        let docFolder = event.currentTarget.getAttribute("data-folder");
        let docProvince = event.currentTarget.getAttribute("data-province");

        console.log(docProvince);
        $document.find("#remDocId").remove(); // remove doc id if exists
        $document.find("#remBoxId").remove(); // remove box id if exists
        $document.find("#remDocBox").remove(); // remove if exists
        $document.find("#remDocFolder").remove(); // remove if exists
        $document.find("#remDocProvince").remove(); // remove if exists
        $confirmDiv.append(
            `<input type='hidden' id='remDocId' value='${docId}'/>`
        );
        $confirmDiv.append(
            `<input type='hidden' id='remDocBox' value='${docBox}'/>`
        );
        $confirmDiv.append(
            `<input type='hidden' id='remDocFolder' value='${docFolder}'/>`
        );
        $confirmDiv.append(
            `<input type='hidden' id='remDocProvince' value='${docProvince}'/>`
        );
        $document.find("#confirmTitle").text("Eliminando Animal");
    }

    function _removeDoc() {
        let docId = $document.find("#remDocId").val();
        let docBox = $document.find("#remDocBox").val();
        let docFolder = $document.find("#remDocFolder").val();
        let docProvince = $document.find("#remDocProvince").val();
        let totalDocs = parseInt($document.find("#totalDocs").text());
        let totalDocsFiltered = parseInt(
            $document.find("#filterTotalDoc").text()
        );

        if (docId) {
            $.ajax({
                type: "DELETE",
                url: `/remove-doc/${docId}/${docFolder}/${docBox}/${docProvince}`,
                contentType: "application/json",
                data: JSON.stringify(),
                dataType: "json",
                async: true,
                cache: false,
                success: function (response) {
                    if (response.mensagem != undefined) {
                        toastr.success(response.mensagem, "Notificação!", {
                            showMethod: "slideDown",
                            hideMethod: "slideUp",
                            timeOut: 1000,
                            onHidden: function () {
                                $document.find(".btn_no").trigger("click");

                                // Only execute function if password change was a success
                                // getSociosByFolder(localStorage.getItem('folderName'), true);

                                // take
                                home.setTotalDocumentsCount(totalDocs - 1);
                                $document
                                    .find("#filterTotalDoc")
                                    .text(totalDocsFiltered - 1);
                                $document.find("#doc_" + docId).remove();
                            },
                        });
                    } else {
                        toastr.warning(
                            "Ocorreu um erro no sistema.",
                            "Aviso!",
                            {
                                timeOut: 5000,
                            }
                        );
                    }
                },
                error: function (response) {
                    console.log(response);
                },
            });
        }
    }

    function _handleDocRefresh() {
        let folderId = localStorage.getItem("folderName");
        let searchString = $docSearchInput.val().toUpperCase();

        console.log(folderId, searchString);
        folderId && searchString === "" ? getSociosByFolder(folderId) : null;
        searchString ? _searchDoc(searchString) : null;
    }

    function _filterDocs(event) {
        let filterType = event.currentTarget.getAttribute("filter-type");
        let $validated_ = $document.find(".VALIDADO_");
        let $validated__ = $document.find(".VALIDADO__btn");
        let $notValidated_ = $document.find(".NAO_VALIDADO_btn");
        let $notValidated__ = $document.find(".NAO_VALIDADO");
        let $validating_ = $document.find(".EM_VERIFICACAO");
        let $validating__ = $document.find(".EM_VERIFICACAO_btn");
        let $docsFilteredCount = $document.find("#filterTotalDoc");

        switch (filterType) {
            case "validated":
                console.log("here", filterType);
                $docsFilteredCount.text($validated_.length);
                $validated_.removeClass("hidden");
                $validated__.removeClass("hidden");
                $notValidated__.addClass("hidden");
                $notValidated_.addClass("hidden");
                $validating_.addClass("hidden");
                $validating__.addClass("hidden");
                // $validated_.remove();
                break;
            case "not_validated":
                console.log("here", filterType);
                $docsFilteredCount.text($notValidated__.length); //Docs not validated
                $validated_.addClass("hidden");
                $validated__.addClass("hidden");
                $notValidated__.removeClass("hidden");
                $notValidated_.removeClass("hidden");
                $validating_.addClass("hidden");
                $validating__.addClass("hidden");
                break;
            case "both":
                console.log("here", filterType);
                $docsFilteredCount.text($(".docsList").length); //Total Docs
                $validated_.removeClass("hidden");
                $validated__.removeClass("hidden");
                $notValidated__.removeClass("hidden");
                $notValidated_.removeClass("hidden");
                $validating_.removeClass("hidden");
                $validating__.removeClass("hidden");
                break;
            case "date_created":
                console.log("here", filterType);
                break;
            default:
                console.log("NADA");
                break;
        }
    }

    function _addDocContent(documento) {
        //Format name for easy reference call
         let not = documento.nome_vulgar.split(" ")[0];
        let validated = documento.nome_vulgar.split(" ")[1]
            ? documento.nome_vulgar.split(" ")[1]
            : "";
        let status = not + "_" + validated;
        //Append remove button if admin
        let btnRemove =
            userRole !== "Administrador"
                ? "<div class='remove-doc-btn mt-3 ml-1 " +
                  status +
                  "_btn' >" +
                  "<i class='ft-trash-2 remove-doc danger' data-id='" +
                  documento.id +
                  "' data-box='" +
                  documento.nome_cientifico +
                  "' data-folder='" +
                  documento.nome_vulgar +
                  "'" +
                  " data-province='" +
                  documento.nome_vulgar +
                  "' data-toggle='modal' data-target='#confirm' title='Remover'  style='font-size: 25px;'></i>" +
                  "</div>"
                : "";

                console.log("VERRRRRR: ", documento);

        // let Documento = JSON.parse(documento.Documento.replace(/\[|\]/g, ""));
        // console.log("VERRRRRR: ", documento);
        let box =
            documento.nome_vulgar !== undefined
                ? documento.nome_vulgar
                : localStorage.getItem("boxName");
        let folder =
            documento.nome_cientifico !== undefined
                ? documento.nome_cientifico
                : localStorage.getItem("folder");

        return (
            "<div class='card-body p-0 docsList " + status +
            "' data-id='" + documento.id +
            "' " +
            " data-nomeAssoc='" + `${documento.nome_cientifico ? documento.nome_cientifico : ""}` +
            "'data-numAssoc='" + `${documento.nome_vulgar ? documento.nome_vulgar : ""}` +
            "' " +
            " data-nBI='" + `${documento.tempo_vida ? documento.tempo_vida : ""}` +
            "' data-estado='" + `${
                documento.tempo_vida
                    ? documento.tempo_vida
                    : "NAO VALIDADO"
            }` + "' " + " data-nPai='" + `${documento.nome_vulgar ? documento.nome_vulgar : ""}` +
            "' data-nMae='" + `${documento.nome_cientifico ? documento.nome_cientifico : ""}` +
            "' " + " data-Orgao='" + `${documento.tempo_vida ? documento.tempo_vida : ""}` +
            "' data-toggle='modal' data-target='#xlarge' > " + "<div class='media-list list-group' id='docs_content" +
            documento.id + "'>" +
            "<div class='list-group-item list-group-item-action lst-animal media p-1'>" +
            "<div class='media-left'>" +
            "<p class='text-bold-600 m-0' id='doc_name'>" + `${documento.nome_vulgar}` + "</p>" +
            "<h6 class='font-small-2 text-muted mb-0' id='doc_name'>" +
            `${documento.nome_cientifico ? documento.nome_cientifico : ""}` +
            "</h6>" +
            "<h6 class='font-small-2 text-muted mb-0' id='doc_name'>" +
            `${documento.tempo_vida ? documento.tempo_vida : ""}` +
            "</h6>" +
            "<h6 class='font-small-2 text-muted mb-0' id='doc_name'>" +
            `${box}` +
            "</h6>" +
            "<h6 class='font-small-2 text-muted mb-0' id='doc_name'>" +
            `${folder}` +
            "</h6>" +
            "<h6 class='font-small-3 mb-0 " +
            `${
                documento.tempo_vida === "VALIDADO"
                    ? "text-success"
                    : "text-danger"
            }` +
            "' id='doc_name'>" +
            `${documento.tempo_vida ? documento.tempo_vida : ""}` +
            "</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            btnRemove
        );
    }

    function appendSociosInfo(socio) {
        let pointerEvents =
            userRole === "Administrador" && socio.tempo_vida !== "VALIDADO"
                ? "pointer-events: auto;"
                : "pointer-events: none;";
        return $("#docs").append(
            "<div class='documents' id='doc_" +
                socio.id +
                "'>" +
                "<div class='card-content' id='card-content" +
                socio.id +
                "'>" +
                _addDocContent(socio) +
                "</div>" +
                "</div>"
        );
    }



    function _updateSocios(doc_id, status_flag) {
        let docValidated = $validationForm.find("#switchery2")[0].checked;

        let sociosFormData = {
            NomeAssociado: $validationForm
                .find("#NomeAssociado")
                .val()
                .toUpperCase(),
            NumeroInscricao: $validationForm.find("#NumeroInscricao").val(),
            NBi: $validationForm.find("#NBi").val().toUpperCase(),
            NomePai: $validationForm.find("#NomePai").val().toUpperCase(),
            NomeMae: $validationForm.find("#NomeMae").val().toUpperCase(),
            Orgao: $validationForm.find("#Orgao").val().toUpperCase(),
            Validado: docValidated,
        };

        if (docValidated || status_flag === "VALIDADO") {
            $.ajax({
                type: "PUT",
                url: "/socios-update/" + doc_id + "",
                data: sociosFormData,
                dataType: "json",
                success: function (response) {
                    console.log("Response1:", response.document.length);
                    // if (response.socios.rowsAffected[0] === 1) {
                    if (response.document.length === 1) {
                        toastr.success(
                            response.mensagem,
                            "Documento Verificado!",
                            {
                                showMethod: "slideDown",
                                hideMethod: "slideUp",
                                timeOut: 700,
                                onHidden: function () {
                                    let $validationModal =
                                        $document.find("#xlarge");

                                    $validationModal
                                        .find(".close")
                                        .removeClass("resetSocioStatus"); // Remove class to avoid resetting status
                                    $validationModal
                                        .find(".close")
                                        .trigger("click"); // Trigger click to close Modal
                                    $validationModal
                                        .find(".close")
                                        .addClass("resetSocioStatus"); // Add back resetSocioStatus class

                                    _getDoc(doc_id);
                                },
                            }
                        );

                        $validationForm[0].reset();
                    } else {
                        toastr.error(response.mensagem, "Erro!", {
                            timeOut: 5000,
                        });
                    }
                },
            });
        } else {
            toastr.error("O campo Validado é obrigatório.", "Notificação!", {
                timeOut: 5000,
            });
        }
    }

    function _appendUpdatedSocio(socio) {
        $("#card-content" + socio.SocioId + " div").remove(); //remove old div content

        return $("#card-content" + socio.SocioId).append(_addDocContent(socio));
    }

    function _getDoc(doc_id) {
        $.ajax({
            type: "GET",
            url: "/documents/" + doc_id,
            data: JSON.stringify(),
            dataType: "json",
            success: function (response) {
                if (response.docs !== undefined) {
                    response.docs.map((socio, index) => {
                        _appendUpdatedSocio(socio);
                    });

                    $document.find(".card-content").map((index, div) => {
                        div.style.display = "flex";
                    });
                }
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    function _resetSocioStatus() {
        let docId = $document.find("#doc_id").val();
        let status = '';

        _setSociosTempStatus(docId, false, status);
        box.setValidatedDisabled();
    }


    /**
     * @params [documentData: Object]
     * @Description load Document information to Modal "Validation" like fields and document Image(s);
     */



    function _loadDocuments(event) {

    let docId = event.currentTarget.getAttribute('data-id');
    let nomeAssociado = event.currentTarget.getAttribute('data-nomeassoc');
    let NumeroAssociado = event.currentTarget.getAttribute('data-numassoc');
    let nBI = event.currentTarget.getAttribute('data-nbi');
    let orgao = event.currentTarget.getAttribute('data-orgao');
    let nomePai = event.currentTarget.getAttribute('data-npai');
    let nomeMae = event.currentTarget.getAttribute('data-nmae');
    let estadoDoc = event.currentTarget.getAttribute('data-estado');
    status = estadoDoc;

    // Disable save and validate button for NORMAL USERS, if document is already validated
    if(userRole !== 'Administrador' && estadoDoc === 'VALIDADO')
    {
        $dropdownMenu.css('pointer-events', 'none');
        $formValidateBtn.css('pointer-events', 'none');

    } else{
        $dropdownMenu.css('pointer-events', 'auto');
        $formValidateBtn.css('pointer-events', 'auto');
    }

    _setValidateFormValues({nomeAssociado, NumeroAssociado, nBI, orgao, nomePai, nomeMae, estadoDoc, docId});

    home.clearDiv('iframeMain');
    home.addDiv('iframeMain', 'iframeContent');

    $document.find('#doc_id').remove(); //Remove doc_id if present
    $document.find('#status_flag').remove(); //Remove status if present
    $document.find('#form-validate').append("<input type='hidden' id='doc_id' class='form-control' name='' value='"+docId+"'>"); //Append doc id for update
    $document.find('#form-validate').append("<input type='hidden' id='status_flag' class='form-control' name='' value='"+estadoDoc+"'>"); //Append status for update

  }

    // function _setValidateFormValues(dados) {
    //     const {
    //         nomeAssociado,
    //         NumeroAssociado,
    //         nBI,
    //         orgao,
    //         nomePai,
    //         nomeMae,
    //         estadoDoc,
    //         docId,
    //     } = dados;

    //     $validationForm.find("#NomeAssociado").val(nomeAssociado);
    //     $validationForm.find("#NumeroInscricao").val(NumeroAssociado);
    //     $validationForm.find("#NBi").val(nBI);
    //     $validationForm.find("#NomePai").val(nomePai);
    //     $validationForm.find("#NomeMae").val(nomeMae);
    //     $validationForm.find("#Orgao").val(orgao);

    //     estadoDoc === "NAO VALIDADO" || estadoDoc === "EM VERIFICACAO"
    // //         ? $setValidateBtn.prop("checked", false)
    //         : $setValidateBtn.prop("checked", true);

    //     $setValidateBtn.prop("checked")
   // //         ? box.setValidatedChecked()
    //         : box.setValidatedDisabled();

    //     _setSociosTempStatus(docId, true, estadoDoc);
    // }

    // function _setSociosTempStatus(doc_id, statusValidate, status) {
    //     let docValidated = $setValidateBtn[0].checked;
    //     let statusFlag = statusValidate ? "EM VERIFICACAO" : "NAO VALIDADO";

    //     console.log(
    //         "Temporary document update ",
    //         doc_id,
    //         status,
    //         "Checked: ",
    //         docValidated,
    //         " status update: ",
    //         statusFlag
    //     );

    //     if (!docValidated && status !== "VALIDADO") {
    //         $.ajax({
    //             type: "PUT",
    //             url: "/set-socios-status/" + doc_id + "",
    //             data: { statusFlag },
    //             dataType: "json",
    //             success: function (response) {
    //                 if (response.socios.rowsAffected[0] === 1) {
    //                     console.log(
    //                         "Socios Update: ",
    //                         response.socios.rowsAffected[0]
    //                     );
    //                 } else {
    //                     console.log(response.error);
    //                 }
    //             },
    //         });
    //     }
    // }


    function _setValidateFormValues(dados){
        const {nomeAssociado, NumeroAssociado, nBI, orgao, nomePai, nomeMae, estadoDoc, docId} = dados;
        console.log("DADOS: ",dados);

        $validationForm.find("#NomeAssociado").val(nomeAssociado);
        $validationForm.find("#NumeroInscricao").val(NumeroAssociado);
        $validationForm.find("#NBi").val(nBI);
        $validationForm.find("#NomePai").val(nomePai);
        $validationForm.find("#NomeMae").val(nomeMae);
        $validationForm.find("#Orgao").val(orgao);

        // estadoDoc === 'NAO VALIDADO' || estadoDoc === 'EM VERIFICACAO' ? $setValidateBtn.prop('checked', false)
        //   : $setValidateBtn.prop('checked', true);

        // $setValidateBtn.prop('checked') ? box.setValidatedChecked() : box.setValidatedDisabled();

        // _setSociosTempStatus(docId, true, estadoDoc);
      }


    function _setSociosTempStatus(doc_id, statusValidate, status){

        let docValidated = $setValidateBtn[0].checked;
        let statusFlag = statusValidate ? 'EM VERIFICACAO' : 'NAO VALIDADO';

        console.log('Temporary document update ', doc_id, status, 'Checked: ', docValidated, ' status update: ', statusFlag)

        if(!docValidated && status !== 'VALIDADO'){
            $.ajax({
                type: "PUT",
                url: "/set-socios-status/"+doc_id+"",
                data: { statusFlag },
                dataType: "json",
                success: function (response) {

                    if(response.socios.rowsAffected[0] === 1){
                        console.log('Socios Update: ', response.socios.rowsAffected[0]);
                    }else {
                        console.log(response.error)
                    }
                }
            });
        }

      }

    return {
        getSociosByFolder,
    };
})(Document, jQuery);
