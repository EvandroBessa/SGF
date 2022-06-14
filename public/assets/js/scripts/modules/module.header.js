/**
 * @source Sigarq ECM
 * @version 1.0.0
 * @name module.header.js
 * @description Inicializa todos os módulos script da aplicação
 * @author ©Interdigitos, Lda. - Euclides Dry'C - erosario@intergigitos.co.ao
 * @author: https://www.linkedin.com/in/euclidesdry/
 */

(function (window, document, $) {
    $(window).on('load', function () {
        // Moment Config
        moment.locale('pt-br');

        // selectors
        let sgqGlobalSearchBarOverlayer = $(document).find('#sgq-global-searchBar-overlayer'),
            sgqGlobalSearchBarResultsBox = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-results'),
            sgqGlobalSearchBarHistoryBox = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-history'),
            headerSearchBoxGlobal = $(document).find('#sgq-global-searchbox'),
            headerSearchBoxGlobalIcon = $(document).find('.sgq-global-searchbox-icon'),
            sgqGlobalSearchBarModal = $(document).find('#sgq-global-searchBar-modal'),
            sgqGlobalSearchBarModalBox = sgqGlobalSearchBarModal.find('.sgq-gSB-modal-box'),
            // Selector vars
            sgqGlobalSearchBarSelectLimit = sgqGlobalSearchBarOverlayer.find('#sgq-gSB-select-limit'),
            sgqGlobalSearchBarOverlay = sgqGlobalSearchBarResultsBox.find('.sgq-gSB-results-overlay');
        // button selectors ->
        let searchBarBoxGlobalCloseButton = $(document).find('[sgq-handle-global-searchBar="close"]'),
            sgqGlobalSearchBarModalCloseButton = $(document).find('[sgq-gSB-handle-modal="close"]');

        // Timer Vars
        var globalSearchTimeout;
        let globalSearchLoadingTimeout;
        let globalSearchLoadingStopTimeout;

        // Definindo o scroll dos documentos na modal
        const modalFolderListPS = new PerfectScrollbar('#sgq-gSB-modal-box-folder-list-vertical-scroll');
        const modalDocumentListPS = new PerfectScrollbar('#sgq-gSB-modal-box-document-list-vertical-scroll');
        const modalDocumentInfoPS = new PerfectScrollbar('#sgq-gSB-modal-box-document-info-vertical-scroll');

        // ___  Responsividade dos elementos
        responsivity(sgqGlobalSearchBarModal, sgqGlobalSearchBarModalBox, $(window));

        $(window).bind('resize', function () {
            responsivity(sgqGlobalSearchBarModal, sgqGlobalSearchBarModalBox, $(this));
        });

        // Inicializando o Módulo Header
        $.sigarq.header = {
            globalSearchBar: {
                init: function (options) {
                    // global Vars
                    let defaults = {
                        hideForNonAdmin: false,
                    },
                        gSearchBar = this,
                        gSBOptions = options || {};

                    let settings = $.extend({}, defaults, gSBOptions);

                    // handlers
                    /* Handler abrir Global SearchBar */
                    headerSearchBoxGlobal.on('focusin', (e) => {
                        if (!gSearchBar.isOpened()) {
                            gSearchBar.open();
                        }
                    });

                    /* Handler click fechar Global SearchBar */
                    searchBarBoxGlobalCloseButton.on('click', function () {
                        if (gSearchBar.isOpened()) {
                            gSearchBar.close();
                        }
                    });

                    /* Handler selecionar o limit maximo de itens a serem retornados pela pesquisa */
                    sgqGlobalSearchBarSelectLimit.find('.custom-control-label').on('click', function () {
                        let inputSelected = $(this).closest('.custom-control.custom-radio').find('input');
                        const selectedLimit = inputSelected.attr('sgq-data-limit');
                        //Definir Limite
                        gSearchBar.setSearchLimit(selectedLimit);
                    });

                    headerSearchBoxGlobal.on('keyup', function () {
                        let searchString = headerSearchBoxGlobal.val();
                        let searchLimit = gSearchBar.getSearchLimit();

                        // Verificar se o campo de pesquisa está vazio, se estiver, mostrar a mensagem de pesquisa.
                        if (!gSearchBar.isEmpty()) {
                            sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'hide');
                            // Esperar .8s na digitação pelo termo de pesquisa para trazer o resultado
                            clearTimeout(globalSearchTimeout);
                            globalSearchTimeout = setTimeout(() => {
                                gSearchBar.loadingProcess();
                                // Buscar pos resultado da pesquisa pelo termo de pesquisa e o limite
                                gSearchBar.inserSearchToResultsBox(searchString, searchLimit);
                            }, 800);

                        } else { // do contrário;
                            sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'show');
                            sgqGlobalSearchBarOverlay.find('.sgq-gSB--searchBar-overlayer-returned-text').html('Insira algum Termo de Pesquisa <br> para obter os seus resultados.');
                            // Parar a animação de carregamento
                            gSearchBar.loadingProcess('stop', false);
                        }
                    });

                    headerSearchBoxGlobal.on('keydown', function () {
                        clearTimeout(globalSearchTimeout);
                    });

                    sgqGlobalSearchBarModalCloseButton.on('click', function () {
                        gSearchBar.closeModal();
                    });

                    // Handler selecionar um Documento, uma Pasta ou uma Caixa retornado pela pesquisa
                    $(document).on('click', '.sgq-gSB-results-returned-item', function () {
                        // handlers
                        const handleBox = $(this).attr('sgq-data-modal-handle-box');
                        const handleFolder = $(this).attr('sgq-data-modal-handle-folder');
                        const handleDocument = $(this).attr('sgq-data-modal-handle-document');
                        // ID's
                        const provinceId = $(this).attr('sgq-data-modal-provinceid');
                        const boxId = $(this).attr('sgq-data-modal-boxid');
                        const folderId = $(this).attr('sgq-data-modal-folderid');
                        // Nomes e Designações
                        const provincia = $(this).attr('sgq-data-modal-province');
                        const designacaoCaixa = $(this).attr('sgq-data-modal-boxname');
                        const designacaoPasta = $(this).attr('sgq-data-modal-foldername');
                        const nomeAssociado = $(this).attr('sgq-data-modal-nomeassociado');

                        // Verificar se uma caixa foi selecionada nos items de pesquisa
                        if (handleBox && handleBox.trim() != '') {
                            // Definir o ID da Provincia & Caixa na Modal
                            gSearchBar.setModalProvinceId(provinceId);
                            gSearchBar.setModalBoxId(handleBox);
                            // Deixar o ID da Pasta e Documento no valor nulo
                            gSearchBar.setModalFolderId('0');
                            gSearchBar.setModalDocumentId('0');
                            // Definir a Designação da Provincia e Caixa na Modal
                            gSearchBar.setModalProvince(provincia);
                            gSearchBar.setModalBox(designacaoCaixa);
                            gSearchBar.setModalFolder(false);
                            gSearchBar.setModalDocument(false);
                            gSearchBar.setModalTotalDocumentFounded(false);
                            // salvar a pesquisa da pasta no Histórico:
                            gSearchBar.saveSearchHistory('box', {
                                provinceId: provinceId,
                                boxId: handleBox
                            });
                        }

                        // Verificar se uma pasta foi selecionada nos items de pesquisa
                        if (handleFolder && handleFolder.trim() != '') {
                            // Definir o ID da Caixa de da Pasta na Modal
                            gSearchBar.setModalProvinceId(provinceId);
                            gSearchBar.setModalBoxId(boxId);
                            gSearchBar.setModalFolderId(handleFolder);
                            // Deixar o ID do Documento no valor nulo
                            gSearchBar.setModalDocumentId('0');
                            // Definir a Designação da Provincia, Caixa e Pasta na Modal
                            gSearchBar.setModalProvince(provincia);
                            gSearchBar.setModalBox(designacaoCaixa);
                            gSearchBar.setModalFolder(designacaoPasta);
                            gSearchBar.setModalDocument(false);
                            // salvar a pesquisa da pasta no Histórico:
                            gSearchBar.saveSearchHistory('folder', {
                                provinceId: provinceId,
                                boxId: boxId,
                                folderId: handleFolder
                            });
                        }

                        // Verificar se um documento foi selecionad0 nos items de pesquisa
                        if (handleDocument && handleDocument.trim() != '') {
                            // Definir o ID da Caixa de da Pasta na Modal
                            gSearchBar.setModalProvinceId(provinceId);
                            gSearchBar.setModalBoxId(boxId);
                            gSearchBar.setModalFolderId(folderId);
                            gSearchBar.setModalDocumentId(handleDocument);
                            // Definir a Designação da Provincia, Caixa, Pasta e Nome Associado na Modal
                            gSearchBar.setModalProvince(provincia);
                            gSearchBar.setModalBox(designacaoCaixa);
                            gSearchBar.setModalFolder(designacaoPasta);
                            gSearchBar.setModalDocument(nomeAssociado);
                            // salvar a pesquisa da pasta no Histórico:
                            gSearchBar.saveSearchHistory('document', {
                                provinceId: provinceId,
                                boxId: boxId,
                                folderId: folderId,
                                documentId: handleDocument
                            });
                        }

                        // Abrir o Modal em .150s
                        const openGlobalSearchBarModalTimeout = setTimeout(() => {
                            gSearchBar.openModal();
                            clearTimeout(openGlobalSearchBarModalTimeout);
                        }, 150);
                    });

                    // Handler selecionar uma Pasta e exibir os Documentos dela
                    $(document).on('click', '.sgq-gSB-folder-list-item', function () {
                        // handlers
                        const folderID = $(this).attr('sgq-gsb-data-folder-id');
                        const folderName = $(this).attr('sgq-gsb-data-folder-name');

                        // Verificar se uma pasta foi selecionada nos items de pesquisa
                        if (folderID && folderID.trim() != '') {
                            // Definir a Pasta na Modal
                            gSearchBar.setModalFolderId(folderID);

                            gSearchBar.setModalDocumentId('0');
                            // Definir a Designação da Pasta na Modal
                            gSearchBar.setModalFolder(folderName);
                            // Difinar Tag do documento ao valor padrão
                            gSearchBar.setModalDocument(false);

                            // Abrir o Modal em .150s
                            const openGlobalSearchBarFolderHandlerModalTimeout = setTimeout(() => {
                                gSearchBar.reloadModal('folder');
                                clearTimeout(openGlobalSearchBarFolderHandlerModalTimeout);
                            }, 150);
                        }
                    });

                    // Handler selecionar um Documento e exibir suas informações
                    $(document).on('click', '.sgq-gSB-list-document-item', function () {
                        // handlers
                        const documentID = $(this).attr('sgq-gSB-data-id');
                        const NomeAssociado = $(this).attr('sgq-gSB-data-input-nomeassociado');

                        // Verificar se um documento foi selecionad0 nos items de pesquisa
                        if (documentID && documentID.trim() != '') {
                            // Definir o ID do Documento na Modal
                            gSearchBar.setModalDocumentId(documentID);
                            // Definir o Nome Associado na Modal
                            gSearchBar.setModalDocument(NomeAssociado);

                            // Abrir o Modal em .150s
                            const openGlobalSearchBarModalDocumentHandlerTimeout = setTimeout(() => {
                                gSearchBar.reloadModal('document');
                                clearTimeout(openGlobalSearchBarModalDocumentHandlerTimeout);
                            }, 150);
                        }
                    });

                    // Handler abrir documento
                    $(document).on('click', '#sgq-gSB-button-open-document', function () {
                        let subMenuProvincias = $(document).find('.navigation-item.has-sub[sgq-data-navbar-section="provincias"]');

                        const provinceId = gSearchBar.getModalProvinceId();
                        const boxId = gSearchBar.getModalBoxId();
                        const folderId = gSearchBar.getModalFolderId();
                        const documentId = gSearchBar.getModalDocumentId();

                        if (documentId && !isNaN(documentId) && parseInt(documentId) > 0) {
                            gSearchBar.closeModal();
                            // gSearchBar.close();

                            if (!subMenuProvincias.hasClass('open')) {
                                subMenuProvincias.trigger('click');
                            }

                            const openGlobalSearchBarDocumentProvinceListTimeout = setTimeout(() => {
                                subMenuProvincias.find(`.provinceList[data-id="${provinceId}"]`).trigger('click');
                                clearTimeout(openGlobalSearchBarDocumentProvinceListTimeout);
                            }, 100);

                            const openGlobalSearchBarDocumentBoxCardTimeout = setTimeout(() => {
                                $(document).find(`#province_boxes .box-card[data-id="${boxId}"]`).trigger('click');
                                clearTimeout(openGlobalSearchBarDocumentBoxCardTimeout);
                            }, 350);

                            const openGlobalSearchBarDocumentFolderListTimeout = setTimeout(() => {
                                $(document).find(`#province_boxes .box-card[data-id="${boxId}"] .folderList[data-id="${folderId}"]`).trigger('click');
                                clearTimeout(openGlobalSearchBarDocumentFolderListTimeout);
                            }, 500);

                            const openGlobalSearchBarDocumentDocumentListTimeout = setTimeout(() => {
                                let documentItemToClick = $(document).find(`#docs .docsList[data-id="${documentId}"]`);

                                if (documentItemToClick.length == 1) {
                                    documentItemToClick.trigger('click');
                                } else {
                                    toastr.error(`Não foi possível abrir o documento (ID: ${documentId}) para edita-lo, tente novamente mais tarde.`, "Erro!", { timeOut: 8000 });
                                }

                                clearTimeout(openGlobalSearchBarDocumentDocumentListTimeout);
                            }, 950);

                            console.log('Open -document: ', documentId, ' -folder: ', folderId, ' -box: ', boxId, ' -province: ', provinceId);
                        }
                    });

                    // Configs
                    if (settings.hideForNonAdmin) {
                        gSearchBar.hideForNonAdmin();
                    }

                    // functions
                },
                hideForNonAdmin: () => {
                    const userRole = $.cookie('role');

                    if (userRole != 'Administrador') {
                        $(document).find('.sgq-global-searchBar-main-container').removeClass('d-block d-flex d-inline');
                        $(document).find('.sgq-global-searchBar-main-container').addClass('d-none');
                    }
                },
                open: () => {
                    // Mostrar área de resultada da pesquisa
                    sgqGlobalSearchBarOverlayer.addClass('showing');
                    /* -- ResultsBox -- */
                    sgqGlobalSearchBarResultsBox.removeClass('fadeOutDown');
                    sgqGlobalSearchBarResultsBox.addClass('fadeInUp');
                    /* -- HistoryBox */
                    sgqGlobalSearchBarHistoryBox.removeClass('fadeOutRight');
                    sgqGlobalSearchBarHistoryBox.addClass('fadeInRight');
                    // Expandir a área de Pesquisa
                    headerSearchBoxGlobal.addClass('opened');
                    // Focar a barra de pesquisa quando abre;
                    headerSearchBoxGlobal.trigger('focus');
                    // Alterar o Ícone de pesquisa
                    headerSearchBoxGlobalIcon.removeClass('light');
                    headerSearchBoxGlobalIcon.removeClass('icon-magnifier');
                    headerSearchBoxGlobalIcon.addClass('info');
                    headerSearchBoxGlobalIcon.addClass('icon-close');
                    // Verificar se o campo de pesquisa está vazio, se estiver, mostrar a mensagem de pesquisa.
                    if ($.sigarq.header.globalSearchBar.isEmpty()) {
                        sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'show');
                        // Limpar os dados pesquisados previamente
                        $.sigarq.header.globalSearchBar.addBoxesToSearchResultsBox(false);
                        $.sigarq.header.globalSearchBar.addFoldersToSearchResultsBox(false);
                        $.sigarq.header.globalSearchBar.addDocumentsToSearchResultsBox(false);
                    }

                    // Listagem do Histórico de Pesquisa do Utilizador
                    $.sigarq.header.globalSearchBar.listSearchHistory();

                    return 'Search Bar Opened';
                },
                close: () => {
                    // Mostrar área de resultada da pesquisa
                    sgqGlobalSearchBarOverlayer.removeClass('showing');
                    /* -- ResultsBox -- */
                    sgqGlobalSearchBarResultsBox.removeClass('fadeInUp');
                    sgqGlobalSearchBarResultsBox.addClass('fadeOutDown');
                    /* -- HistoryBox */
                    sgqGlobalSearchBarHistoryBox.removeClass('fadeInRight');
                    sgqGlobalSearchBarHistoryBox.addClass('fadeOutRight');
                    // Expandir a área de Pesquisa
                    headerSearchBoxGlobal.removeClass('opened');
                    headerSearchBoxGlobal.val('');
                    // Alterar o Ícone de pesquisa
                    headerSearchBoxGlobalIcon.removeClass('info');
                    headerSearchBoxGlobalIcon.removeClass('icon-close');
                    headerSearchBoxGlobalIcon.addClass('light');
                    headerSearchBoxGlobalIcon.addClass('icon-magnifier');
                    // Verificar se o campo de pesquisa está vazio, se estiver, mostrar a mensagem de pesquisa.
                    if ($.sigarq.header.globalSearchBar.isEmpty()) {
                        sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'show');
                    }

                    return 'Search Bar Closed';
                },
                loadingProcess: (process = 'init', overlay = true) => {
                    if (process == 'stop') {
                        headerSearchBoxGlobalIcon.removeClass('spinner-border');
                        headerSearchBoxGlobal.removeClass('shadow');

                        headerSearchBoxGlobalIcon.addClass('icon-close font-medium-4');

                        if (overlay) {
                            clearTimeout(globalSearchLoadingStopTimeout);
                            globalSearchLoadingStopTimeout = setTimeout(() => {
                                sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'hide');
                                sgqGlobalSearchBarOverlay.find('.sgq-gSB--searchBar-overlayer-returned-text').html('Insira algum Termo de Pesquisa <br> para obter os seus resultados.');
                            }, 300);
                        }
                    } else {
                        headerSearchBoxGlobalIcon.removeClass('icon-close font-medium-4');

                        headerSearchBoxGlobalIcon.addClass('spinner-border');
                        headerSearchBoxGlobal.addClass('shadow');

                        sgqGlobalSearchBarOverlay.attr('sgq-data-handle-overlay', 'show');

                        sgqGlobalSearchBarOverlay.find('.sgq-gSB--searchBar-overlayer-returned-text').html('Aguarde, <br> carregando os dados da pesquisa...');
                    }
                },
                saveSearchHistory: (historyType, reqBody) => {
                    let searchedItem = 'box';

                    let defaultReqBody = {
                        folderId: 0,
                        boxId: 0,
                        provinceId: 0,
                        documentId: 0
                    };

                    switch (historyType) {
                        case 'box':
                            searchedItem = 'boxes';
                            break;
                        case 'folder':
                            searchedItem = 'folders';
                            break;
                        case 'document':
                            searchedItem = 'documents';
                            break;
                    }

                    let completeReqBody = $.extend({}, defaultReqBody, reqBody);

                    if (historyType && historyType.trim() != '') {
                        $.ajax({
                            type: "POST",
                            url: `/histories/${searchedItem}`,
                            data: completeReqBody,
                            dataType: "json",
                            async: true,
                            cache: false,
                            success: function (response) {
                                // console.log("Historico de Pesquisa Criado!");
                            },
                            error: function (errorResponse) {
                                console.log('errorResponse', errorResponse);
                            },
                        });
                    }
                },
                listSearchHistory: () => {
                    $.ajax({
                        type: "GET",
                        url: `/histories/user/search`,
                        contentType: "application/json",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (response) {
                            if (!!response.histories) {
                                $.sigarq.header.globalSearchBar.addUserSearchHistory(response.histories);
                            }
                        },
                        error: function (errorResponse) {
                            console.log(errorResponse);
                        },
                    });
                },
                inserSearchToResultsBox: (searchString, searchLimit) => {
                    const searchTerm = searchString.trim().toLowerCase();
                    let limit = searchLimit != 'all' ? searchLimit : false;

                    // Se existir o termo de pesquisa, fazer a pesquisa
                    if (searchTerm != '') {
                        $.ajax({
                            type: "GET",
                            url: `/global-search/${searchTerm}/${limit}`,
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            cache: false,
                            success: function (response) {
                                if (!!response.boxes) {
                                    $.sigarq.header.globalSearchBar.addBoxesToSearchResultsBox(response.boxes);
                                }

                                if (!!response.folders) {
                                    $.sigarq.header.globalSearchBar.addFoldersToSearchResultsBox(response.folders);
                                }

                                if (!!response.documents) {
                                    $.sigarq.header.globalSearchBar.addDocumentsToSearchResultsBox(response.documents);
                                }

                                // console.log("RESPONSE da Promise de Pesquisa:", response, response.boxes, response.folders, response.documents);
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        }).always(function () {
                            // Parar a animção de carregamento
                            clearTimeout(globalSearchLoadingTimeout);
                            globalSearchLoadingTimeout = setTimeout(() => {
                                $.sigarq.header.globalSearchBar.loadingProcess('stop');
                            }, 800);
                        });
                    } else {
                        $.sigarq.header.globalSearchBar.addBoxesToSearchResultsBox(false);
                        $.sigarq.header.globalSearchBar.addFoldersToSearchResultsBox(false);
                        $.sigarq.header.globalSearchBar.addDocumentsToSearchResultsBox(false);
                    }
                },
                addBoxesToSearchResultsBox: (caixas) => {
                    let resultBox = sgqGlobalSearchBarOverlayer.find('#sgq-gSB-returned-results[sgq-data-returned="boxes"]'),
                        resultBoxFiltered = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-returned-results-boxes');

                    if (caixas !== false) {
                        const quantidadeCaixas = Object.keys(caixas).length;
                        var resultHtml = '';

                        //Adicinar o número de caixas encontradas na pesquisa de caixas
                        resultBox.find('.sgq-results-count').text(quantidadeCaixas);
                        resultBoxFiltered.find('.sgq-results-count').text(quantidadeCaixas);

                        // Listar todas caixas
                        for (let index = 0; index < quantidadeCaixas; index++) {
                            const idCaixa = caixas[index].CaixaId;
                            const idProvincia = caixas[index].ProvinciaId;
                            const provincia = caixas[index].Provincia;
                            const designacaoCaixa = caixas[index].DesignacaoCaixa;
                            const siglaProvincia = caixas[index].Sigla;

                            resultHtml += `<div class="sgq-gSB-results-returned-item col-4 pb-1 pt-1" sgq-data-modal-handle-box="${idCaixa}" sgq-data-modal-provinceid="${idProvincia}" sgq-data-modal-boxname="${designacaoCaixa}" sgq-data-modal-province="${provincia}">
                                                <div class="rr-item-box w-100 shadow-sm border-top-info border-bottom-info rounded position-relative p-1">
                                                    <span class="la la-archive d-block w-100 text-center text-info" style="font-size: 7rem;"></span>
                                                    <span class="font-weight-bold" style="font-size: .9rem">${designacaoCaixa.toUpperCase()} [<span class="text-warning font-weight-bolder">${siglaProvincia.toUpperCase()}</span>]</span>
                                                </div>
                                            </div>`;
                        }

                        resultBox.find('.row').html(resultHtml);
                        resultBoxFiltered.find('.row').html(resultHtml);
                    } else {
                        resultBox.find('.row').html('');
                        resultBoxFiltered.find('.row').html('');
                        resultBox.find('.sgq-results-count').text('0');
                        resultBoxFiltered.find('.sgq-results-count').text('0');
                    }
                },
                addFoldersToSearchResultsBox: (pastas) => {
                    let resultFolder = sgqGlobalSearchBarOverlayer.find('#sgq-gSB-returned-results[sgq-data-returned="folders"]'),
                        resultFolderFiltered = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-returned-results-folders');

                    if (pastas !== false) {
                        const quantidadePastas = Object.keys(pastas).length;
                        var resultHtml = '';

                        //Adicinar o número de pastas encontradas na pesquisa de pastas
                        resultFolder.find('.sgq-results-count').text(quantidadePastas);
                        resultFolderFiltered.find('.sgq-results-count').text(quantidadePastas);

                        // Listar todas pastas
                        for (let index = 0; index < quantidadePastas; index++) {
                            const { ProvinciaId, CaixaId, PastaId, Provincia } = pastas[index];
                            const designacaoPasta = pastas[index].DesignacaoPasta;
                            const designacaoCaixa = pastas[index].DesignacaoCaixa;
                            const siglaProvincia = pastas[index].Sigla;

                            console.log('designacaoCaixa, siglaProvincia: ', designacaoCaixa, siglaProvincia);

                            resultHtml += `<div class="sgq-gSB-results-returned-item col-4 pb-1 pt-1" sgq-data-modal-handle-folder="${PastaId}" sgq-data-modal-boxid="${CaixaId}" sgq-data-modal-provinceid="${ProvinciaId}" sgq-data-modal-province="${Provincia}" sgq-data-modal-boxname="${designacaoCaixa}" sgq-data-modal-foldername="${designacaoPasta}">
                                                <div class="rr-item-box w-100 shadow-sm border-top-primary border-bottom-primary rounded position-relative p-1">
                                                    <span class="la la-folder-open d-block w-100 text-center text-primary" style="font-size: 4rem;"></span>
                                                    <span class="font-weight-bold w-100 pt-1 text-center d-flex justify-content-center align-item-center flex-column" style="font-size: .9rem">
                                                        <span>${designacaoPasta}</span>
                                                        <span class="text-info">${designacaoCaixa} [<span class="text-warning font-weight-bolder">${siglaProvincia}</span>]</span>
                                                    </span>
                                                </div>
                                            </div>`;
                        }

                        resultFolder.find('.row').html(resultHtml);
                        resultFolderFiltered.find('.row').html(resultHtml);
                    } else {
                        resultFolder.find('.row').html('');
                        resultFolderFiltered.find('.row').html('');
                        resultFolder.find('.sgq-results-count').text('0');
                        resultFolderFiltered.find('.sgq-results-count').text('0');
                    }
                },
                addDocumentsToSearchResultsBox: (documentos) => {
                    let resultDocument = sgqGlobalSearchBarOverlayer.find('#sgq-gSB-returned-results[sgq-data-returned="documents"]'),
                        resultDocumentFiltered = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-returned-results-documents');
                    if (documentos) {
                        const quantidadeDocumentos = Object.keys(documentos).length;
                        var resultHtml = '';

                        //Adicinar o número de documentos encontradas na pesquisa de documentos
                        resultDocument.find('.sgq-results-count').text(quantidadeDocumentos);
                        resultDocumentFiltered.find('.sgq-results-count').text(quantidadeDocumentos);

                        // Listar todas documentos
                        for (let index = 0; index < quantidadeDocumentos; index++) {
                            const { ProvinciaId, CaixaId, PastaId, SocioId, Provincia } = documentos[index];
                            const NomeAssociado = documentos[index].NomeAssociado;
                            const designacaoPasta = documentos[index].DesignacaoPasta;
                            const designacaoCaixa = documentos[index].DesignacaoCaixa;
                            const siglaProvincia = documentos[index].Sigla;

                            resultHtml += `<div class="sgq-gSB-results-returned-item col-12 pb-1" sgq-data-modal-handle-document="${SocioId}" sgq-data-modal-folderid="${PastaId}" sgq-data-modal-boxid="${CaixaId}" sgq-data-modal-provinceid="${ProvinciaId}" sgq-data-modal-province="${Provincia}" sgq-data-modal-boxname="${designacaoCaixa}" sgq-data-modal-foldername="${designacaoPasta}" sgq-data-modal-nomeassociado="${NomeAssociado}">
                                                <div class="rr-item-box w-100 shadow-sm border-top-secondary border-bottom-secondary rounded position-relative p-1 d-flex align-items-center">
                                                    <span class="la la-file-text pr-1 text-center text-secondary" style="font-size: 1.65rem;"></span>
                                                    <span class="font-weight-bold" style="font-size: .9rem">
                                                        ${NomeAssociado} [<span class="text-primary font-weight-bolder">${designacaoPasta}</span>, <span class="text-info font-weight-bolder">${designacaoCaixa}</span>, <span class="text-warning font-weight-bolder">${siglaProvincia}</span>]
                                                    </span>
                                                </div>
                                            </div>`;
                        }

                        resultDocument.find('.row').html(resultHtml);
                        resultDocumentFiltered.find('.row').html(resultHtml);
                    } else {
                        resultDocument.find('.row').html('');
                        resultDocumentFiltered.find('.row').html('');
                        resultDocument.find('.sgq-results-count').text('0');
                        resultDocumentFiltered.find('.sgq-results-count').text('0');
                    }
                },
                addUserSearchHistory: (historico) => {
                    let sgqGSBHistoryList = sgqGlobalSearchBarOverlayer.find('.sgq-gSB-history .list-group');

                    if (historico) {
                        const quantidadeHistorico = historico.length;
                        var historyResultHtml = '';

                        // Listar todas historico
                        for (let index = 0; index < quantidadeHistorico; index++) {
                            const { Item, datahistorico } = historico[index];
                            const resultadoItemHistorico = Item.split(' - ');

                            const tipoItem = resultadoItemHistorico[0];
                            const itemContent = resultadoItemHistorico[1].split(';');
                            console.log('Split Console.log()', quantidadeHistorico, tipoItem, itemContent);

                            if (tipoItem.toLowerCase().trim() == 'documento') {
                                const [documento, pasta, caixa, provincia] = itemContent;
                                const [nomeDocumento, idDocumento] = documento.split('_');
                                const [nomePasta, idPasta] = pasta.split('_');
                                const [nomeCaixa, idCaixa] = caixa.split('_');
                                const [nomeProvincia, idProvincia] = provincia.split('_');

                                historyResultHtml += `<span class="list-group-item">
                                                            <span class="text-capitalize">${tipoItem}</span>: ${nomeDocumento} (${nomePasta}, ${nomeCaixa}, ${nomeProvincia}) - ${moment(datahistorico).fromNow()}
                                                        </span>`;
                            } else if (tipoItem.toLowerCase().trim() == 'pasta') {
                                const [pasta, caixa, provincia] = itemContent;
                                const [nomePasta, idPasta] = pasta.split('_');
                                const [nomeCaixa, idCaixa] = caixa.split('_');
                                const [nomeProvincia, idProvincia] = provincia.split('_');

                                historyResultHtml += `<span class="list-group-item">
                                                            <span class="text-capitalize">${tipoItem}</span>: ${nomePasta} (${nomeCaixa}, ${nomeProvincia}) - ${moment(datahistorico).fromNow()}
                                                        </span>`;

                            } else if (tipoItem.toLowerCase().trim() == 'caixa') {
                                const [caixa, provincia] = itemContent;
                                const [nomeCaixa, idCaixa] = caixa.split('_');
                                const [nomeProvincia, idProvincia] = provincia.split('_');

                                historyResultHtml += `<span class="list-group-item">
                                                            <span class="text-capitalize">${tipoItem}</span>: ${nomeCaixa} (${nomeProvincia}) - ${moment(datahistorico).fromNow()}
                                                        </span>`;
                            }

                        }

                        sgqGSBHistoryList.html(historyResultHtml);
                    }
                },
                listBoxFoldersToModal: (BoxId) => {
                    if (BoxId.trim() != '') {
                        $.ajax({
                            type: "GET",
                            url: `/get-box-folders/${BoxId}`,
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            cache: false,
                            success: function (response) {
                                var foldersHTML = '';
                                const { pastas } = response;

                                if (!!pastas) {
                                    for (let index = 0; index < pastas.length; index++) {
                                        const { PastaId, Designacao } = pastas[index];
                                        const PastaSelecionada = $.sigarq.header.globalSearchBar.getModalFolderId();

                                        foldersHTML += `<div class="col">
                                                            <div class="col-12 pb-1 pl-0 pr-0">
                                                                <div class="sgq-gSB-folder-list-item${PastaId == PastaSelecionada ? ' active shadow-sm' : ''} w-100 rounded position-relative p-1 d-flex align-items-center" sgq-gSB-data-folder-id="${PastaId}" sgq-gSB-data-folder-name="${Designacao}">
                                                                    <span class="la la-folder-open pr-1 text-center text-primary" style="font-size: 2.5rem;"></span>
                                                                    <span class="font-weight-bold" style="font-size: 1.5rem">${Designacao}</span>
                                                                </div>
                                                            </div>
                                                        </div>`;
                                    }

                                    sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-box-folder-list').html(foldersHTML);
                                }
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        });
                    }
                },
                listBoxDocumentsToModal: (FolderId, clearDocuments = false) => {
                    if (!clearDocuments && FolderId.trim() != '') {
                        $.ajax({
                            type: "GET",
                            url: `/get-doc-details/${FolderId}`,
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            cache: false,
                            success: function (response) {
                                var documentsHTML = '';
                                const { documents } = response;
                                // Se exitir documentos, Listar e Inserir na modal
                                if (!!documents) {
                                    const todalDocs = documents.length;
                                    var scrollTopCount = 0;

                                    for (let index = 0; index < todalDocs; index++) {
                                        const { SocioId, NomeAssociado, EstadoDocumento, NBi, NomeMae, NomePai, NumeroAssociado, Orgao } = documents[index];

                                        console.log("Estou no sitio certo? Me traga o que eu quero: ",NomeAssociado);

                                        // Pegar o Id do Documento Selecionado;
                                        const DocumentSelected = $.sigarq.header.globalSearchBar.getModalDocumentId();
                                        // Listando documento para serem inserido na modal
                                        documentsHTML += `<span
                                                                class="sgq-gSB-list-document-item${SocioId == DocumentSelected ? ' bg-light selectedDocument' : ''} d-block w-100 p-1 border-bottom-light rounded-0"
                                                                sgq-gSB-data-id="${SocioId}"
                                                                sgq-gSB-data-input-nomeassociado="${NomeAssociado}"
                                                                sgq-gSB-data-input-numeroinscricao="${NumeroAssociado != null ? NumeroAssociado : ''}"
                                                                sgq-gSB-data-input-numerobi="${NBi != null ? NBi : ''}"
                                                                sgq-gSB-data-input-orgao="${Orgao != null ? Orgao : ''}"
                                                                sgq-gSB-data-input-nomemae="${NomeMae != null ? NomeMae : ''}"
                                                                sgq-gSB-data-input-nomepai="${NomePai != null ? NomePai : ''}"
                                                                sgq-gSB-data-estadodocumento="${EstadoDocumento}"
                                                            >
                                                                ${NomeAssociado}
                                                            </span>`;
                                        if (SocioId == DocumentSelected) {
                                            scrollTopCount = index - 3;
                                        }
                                    }
                                    // Inserindo a quantidade de documentos encontrados na modal
                                    $.sigarq.header.globalSearchBar.setModalTotalDocumentFounded(`${todalDocs}`);
                                    // Adicionando os documentos na modal
                                    sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-box-document-list').html(documentsHTML);

                                    const globalSearchModalDocumentListPSTimeout = setTimeout(() => {
                                        const scrollToElementCalc = 49 * scrollTopCount;
                                        modalDocumentListPS.element.scrollTop = scrollToElementCalc;
                                        clearTimeout(globalSearchModalDocumentListPSTimeout);
                                    }, 200);
                                } else {
                                    $.sigarq.header.globalSearchBar.setModalTotalDocumentFounded('0');
                                }
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        });
                    } else {
                        sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-box-document-list').html(`
                                                                                                    <div class="d-flex justify-content-center align-items-center flex-column" style="height: 60vh;">
                                                                                                        <span class="ft-file-text text-info" style="font-size: 8rem;"></span>
                                                                                                        <h5 class="pt-2 pl-3 pr-3 text-center">Selecione uma Pasta para ver os documentos pertencentes a ela.</h5>
                                                                                                    </div>
                                                                                                `);
                    }
                },
                showBoxDocumentInfoToModal: (clearDocumentInfo = false) => {
                    const documentID = $.sigarq.header.globalSearchBar.getModalDocumentId();

                    if (documentID) {
                        const selectedDocument = $(document).find(`.sgq-gSB-list-document-item.selectedDocument[sgq-gSB-data-id="${documentID}"]`);
                        // Selecionar dodos do Sócio
                        const NomeAssociado = (documentID != 0) ? selectedDocument.attr('sgq-gsb-data-input-nomeassociado') : '';
                        const NumeroInscricao = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-input-numeroinscricao') : '';
                        const NumeroBI = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-input-numerobi') : '';
                        const Orgao = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-input-orgao') : '';
                        const NomePai = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-input-nomepai') : '';
                        const NomeMae = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-input-nomemae') : '';
                        const EstadoDocumento = (documentID != 0) ? selectedDocument.attr('sgq-gSB-data-estadodocumento') : '';
                        // Inserir os dados do sócio
                        $(document).find('#sgq-gSB-modal-box-document-input-nomeassociado').val(NomeAssociado);
                        $(document).find('#sgq-gSB-modal-box-document-input-numeroinscricao').val(NumeroInscricao);
                        $(document).find('#sgq-gSB-modal-box-document-input-numerobi').val(NumeroBI);
                        $(document).find('#sgq-gSB-modal-box-document-input-orgao').val(Orgao);
                        $(document).find('#sgq-gSB-modal-box-document-input-nomepai').val(NomePai);
                        $(document).find('#sgq-gSB-modal-box-document-input-nomemae').val(NomeMae);
                        $(document).find('#sgq-gSB-modal-box-document-estadodocumento').text(EstadoDocumento);

                        if (EstadoDocumento && EstadoDocumento.toUpperCase() != 'VALIDADO') {
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-success text-success');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-secondary text-secondary');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').addClass('border-danger text-danger');
                        } else if (documentID == 0) {
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-success text-success');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-danger text-danger');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').addClass('border-secondary text-secondary');
                        } else {
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-danger text-danger');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').removeClass('border-secondary text-secondary');
                            $(document).find('#sgq-gSB-modal-box-document-estadodocumento').addClass('border-success text-success');
                        }
                    }
                },
                showBoxDocumentImageToModal: (DocumentId, cleanImageBox = false) => {
                    let modalBoxIframe = sgqGlobalSearchBarModalBox.find('#sgq-gSB-selected-document-image');
                    let pdfNotFoundedSource = '/src/files/documents/Nao-Encontrado.pdf';

                    if (DocumentId.trim() != '' && !cleanImageBox) {
                        $.ajax({
                            type: "GET",
                            url: `/get-doc-image/${DocumentId}`,
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            cache: false,
                            success: function (response) {
                                const { document } = response;
                                // Se exitir documentos, Listar e Inserir na modal
                                if (!!document) {
                                    const { imagem } = document[0];
                                    // Adicionando os documentos na modal
                                    modalBoxIframe.attr('src', `data:application/pdf;base64,${imagem}`);
                                }
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        });
                    } else {
                        if (modalBoxIframe.attr('src') != pdfNotFoundedSource) {
                            modalBoxIframe.attr('src', pdfNotFoundedSource);
                        }
                    }
                },
                setSearchLimit: (elementLimit) => {
                    let searchString = headerSearchBoxGlobal.val().trim().toLowerCase();
                    let searchLimitString = elementLimit == 'all' ? '' : 'de ' + elementLimit;
                    // Alterando o atributo checked ao item selecionado
                    sgqGlobalSearchBarSelectLimit.find('.custom-control-input').checked = false;
                    sgqGlobalSearchBarSelectLimit.find('.custom-control-input').removeAttr('checked');
                    sgqGlobalSearchBarSelectLimit.find(`.custom-control-input[sgq-data-limit="${elementLimit}"]`).attr('checked', 'checked');
                    // Alterar limite selecionado ao CheckBox
                    sgqGlobalSearchBarSelectLimit.attr('sgq-data-selected-limit', elementLimit);
                    // Adicinar o limit aos resultados
                    sgqGlobalSearchBarOverlayer.find('.sgq-results-limit').text(searchLimitString);
                    // Verificar se a String de Pesquisa não está vasia, se não, fazer a pesquisa pelo limite que foi determinado
                    if (searchString != '' && typeof searchString != 'undefined') {
                        $.sigarq.header.globalSearchBar.inserSearchToResultsBox(searchString, $.sigarq.header.globalSearchBar.getSearchLimit());
                    }
                },
                getSearchLimit: () => {
                    // Alterar limite selecionado ao CheckBox
                    return sgqGlobalSearchBarSelectLimit.attr('sgq-data-selected-limit');
                },
                openModal: () => {
                    sgqGlobalSearchBarModal.removeAttr('hidding');

                    const globalSearchModalTimeout = setTimeout(() => {
                        sgqGlobalSearchBarModal.attr('opened', '');
                        clearTimeout(globalSearchModalTimeout);
                    }, 200);

                    sgqGlobalSearchBarModalBox.removeClass('animate__backOutUp');
                    sgqGlobalSearchBarModalBox.addClass('animate__backInUp');

                    // Listagem
                    const BoxId = $.sigarq.header.globalSearchBar.getModalBoxId();
                    const FolderId = $.sigarq.header.globalSearchBar.getModalFolderId();
                    const DocumentId = $.sigarq.header.globalSearchBar.getModalDocumentId();

                    // console.log('Modal -BoxId: ', BoxId);
                    // console.log('Modal -FolderId: ', FolderId);
                    // console.log('Modal -DocumentId: ', DocumentId);

                    // Listagem das Pastas na modal
                    if (BoxId && BoxId.trim() != '' && BoxId.trim() != 0) {
                        $.sigarq.header.globalSearchBar.listBoxFoldersToModal(BoxId);
                    } else {
                        $.sigarq.header.globalSearchBar.listBoxDocumentsToModal('', true);
                    }

                    // Listagem das Pastas na modal
                    if (FolderId && FolderId.trim() != '' && FolderId.trim() != 0) {
                        $.sigarq.header.globalSearchBar.listBoxDocumentsToModal(FolderId);
                    } else {
                        $.sigarq.header.globalSearchBar.listBoxDocumentsToModal('', true);
                    }

                    // Listagem das Pastas na modal
                    if (DocumentId && DocumentId.trim() != '' && DocumentId.trim() != 0) {
                        $.sigarq.header.globalSearchBar.showBoxDocumentImageToModal(DocumentId);

                        const globalSearchModalDocumentInfoTimeout = setTimeout(() => {
                            $.sigarq.header.globalSearchBar.showBoxDocumentInfoToModal();
                            clearTimeout(globalSearchModalDocumentInfoTimeout);
                        }, 200);
                    } else {
                        $.sigarq.header.globalSearchBar.showBoxDocumentImageToModal('', true);
                        $.sigarq.header.globalSearchBar.showBoxDocumentInfoToModal(true);
                    }

                    return 'modal openned';
                },
                reloadModal: (reloadTarget) => {
                    // pegar os IDs definidos, Caixa, Pasta e Documento;
                    const BoxId = $.sigarq.header.globalSearchBar.getModalBoxId();
                    const FolderId = $.sigarq.header.globalSearchBar.getModalFolderId();
                    const DocumentId = $.sigarq.header.globalSearchBar.getModalDocumentId();

                    // console.log('___reload_Modal: --BoxId: ', BoxId);
                    // console.log('___reload_Modal: --FolderId: ', FolderId);
                    // console.log('___reload_Modal: --DocumentId: ', DocumentId);

                    // recarregar os documentos da Pasta selecionada na modal
                    if (reloadTarget == 'folder' && FolderId && FolderId.trim() != '' && FolderId.trim() != 0) {
                        $(document).find('.sgq-gSB-folder-list-item').removeClass('active shadow-sm');
                        $(document).find(`.sgq-gSB-folder-list-item[sgq-gsb-data-folder-id="${FolderId}"]`).addClass('active shadow-sm');

                        $.sigarq.header.globalSearchBar.listBoxDocumentsToModal(FolderId);
                    }

                    // recarregar as informações do documento e imagens do Documento selecionado na modal
                    if (reloadTarget == 'document' && DocumentId && DocumentId.trim() != '' && DocumentId.trim() != 0) {
                        $(document).find('.sgq-gSB-list-document-item').removeClass('bg-light selectedDocument');
                        $(document).find(`.sgq-gSB-list-document-item[sgq-gSB-data-id="${DocumentId}"]`).addClass('bg-light selectedDocument');

                        $.sigarq.header.globalSearchBar.showBoxDocumentImageToModal(DocumentId);

                        const globalSearchReloadModalDocumentInfoTimeout = setTimeout(() => {
                            $.sigarq.header.globalSearchBar.showBoxDocumentInfoToModal();
                            clearTimeout(globalSearchReloadModalDocumentInfoTimeout);
                        }, 180);
                    } else {
                        $.sigarq.header.globalSearchBar.showBoxDocumentImageToModal('', true);
                        $.sigarq.header.globalSearchBar.showBoxDocumentInfoToModal(true);
                    }

                    return 'modal reloaded: ' + reloadTarget;
                },
                closeModal: () => {
                    sgqGlobalSearchBarModal.removeAttr('opened');

                    const globalSearchModalTimeout = setTimeout(() => {
                        sgqGlobalSearchBarModal.attr('hidding', '');
                        clearTimeout(globalSearchModalTimeout);
                    }, 500);

                    $.sigarq.header.globalSearchBar.setModalProvinceId('0');
                    $.sigarq.header.globalSearchBar.setModalBoxId('0');
                    $.sigarq.header.globalSearchBar.setModalFolderId('0');
                    $.sigarq.header.globalSearchBar.setModalDocumentId('0');

                    sgqGlobalSearchBarModalBox.removeClass('animate__backInUp');
                    sgqGlobalSearchBarModalBox.addClass('animate__backOutUp');

                    // Listagem do Histórico de Pesquisa do Utilizador
                    $.sigarq.header.globalSearchBar.listSearchHistory();

                    return 'modal closed';
                },
                setModalProvinceId: (id) => {
                    if (id) {
                        sgqGlobalSearchBarModalBox.attr('sgq-data-provinceid', id);
                    }
                },
                getModalProvinceId: () => {
                    return sgqGlobalSearchBarModalBox.attr('sgq-data-provinceid');
                },
                setModalBoxId: (id) => {
                    if (id) {
                        sgqGlobalSearchBarModalBox.attr('sgq-data-boxid', id);
                    }
                },
                getModalBoxId: () => {
                    return sgqGlobalSearchBarModalBox.attr('sgq-data-boxid');
                },
                setModalFolderId: (id) => {
                    if (id) {
                        sgqGlobalSearchBarModalBox.attr('sgq-data-folderId', id);
                    }
                },
                getModalFolderId: () => {
                    return sgqGlobalSearchBarModalBox.attr('sgq-data-folderid');
                },
                setModalDocumentId: (id) => {
                    if (id) {
                        sgqGlobalSearchBarModalBox.attr('sgq-data-documentid', id);
                    }
                },
                getModalDocumentId: () => {
                    return sgqGlobalSearchBarModalBox.attr('sgq-data-documentid');
                },
                setModalProvince: (province) => {
                    if (province) {
                        sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-province').text(province);
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-province-tag').text(province);
                        // mostrar a tag
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-province-tag-control').css('display', '');
                    } else {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-province-tag-control').css('display', 'none');
                    }
                },
                setModalBox: (boxname) => {
                    if (boxname) {
                        sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-boxname').text(boxname);
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-boxname-tag').text(boxname);
                        // mostrar a tag
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-boxname-tag-control').css('display', '');
                    } else {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-boxname-tag-control').css('display', 'none');
                    }
                },
                setModalFolder: (foldername) => {
                    if (foldername) {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-foldername-tag').text(foldername);
                        // mostrar a tag
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-foldername-tag-control').css('display', '');
                    } else {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-foldername-tag-control').css('display', 'none');
                    }
                },
                setModalDocument: (associatename) => {
                    if (associatename) {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-associatename-tag').text(associatename);
                        // mostrar a tag
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-associatename-tag-control').css('display', '');
                    } else {
                        sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-associatename-tag-control').css('display', 'none');
                    }
                },
                setModalTotalDocumentFounded: (number) => {
                    if (number) {
                        sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-document-founded').text(`${number} Encontrado(s)`);
                    } else {
                        sgqGlobalSearchBarModalBox.find('#sgq-gSB-modal-document-founded').text(`Não Selecionado`);
                    }
                },
                isOpened: () => $(document).find('#sgq-global-searchbox').hasClass('opened') ? true : false,
                isEmpty: () => $(document).find('#sgq-global-searchbox').val() == '' ? true : false
            },
        };
    });

    function responsivity(sgqGlobalSearchBarModal, sgqGlobalSearchBarModalBox, appWindow) {
        if (appWindow.height() < '920') {
            sgqGlobalSearchBarModal.removeClass('py-4 py-5');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').removeClass('pt-3 pb-3');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-box-info').removeClass('pt-3 pt-4 pt-2 pt-1');

            sgqGlobalSearchBarModal.addClass('py-1');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').addClass('pt-1 pb-1');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-box-info').addClass('pt-0');

            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').css({ 'max-height': '58px', height: '58px' });
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-container').css({ 'min-height': 'calc(100% - 58px)', height: 'calc(100% - 58px)' });
        } else {
            sgqGlobalSearchBarModal.removeClass('py-4 py-5');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').removeClass('pt-1 pb-1');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-box-info').removeClass('pt-0');

            sgqGlobalSearchBarModal.addClass('py-1');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').addClass('pt-3 pb-3');
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-box-info').addClass('pt-3 pt-4 pt-2 pt-1');

            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-header').css({ 'max-height': '98px', height: '98px' });
            sgqGlobalSearchBarModalBox.find('.sgq-gSB-modal-box-container').css({ 'min-height': 'calc(100% - 98px)', height: 'calc(100% - 98px)' });
        }
    }
})(window, document, jQuery);