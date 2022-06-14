let box = (function (_document, $) {

  // Cache DOM
  let $document = $(_document);
  let $boxForm = $document.find('#add-box-form');
  let $modalNoBtn = $document.find('.btn_no');
  let $boxTableTr = $document.find("#box-table tbody tr");
  let $validationBtn = $document.find('span.switchery');
  let $boxVerifiedOption = $document.find('#box-verifiedOpt');
  let $userRole = $.cookie('role');

  let boxLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  let boxNumber = $document.find('#numeroCaixa');
  let boxLetterSelect = $document.find('#letraCaixa');
  let boxFolders = $document.find('#boxFolders');
  let boxFoldersList = $document.find('#boxFoldersList');
  let boxName = $document.find('#designacaoCaixa');
  let boxFormDataset = $document.find('#add-box-form')[0].dataset;
  let isProvinceOrBoxChange = false;
  let newBoxFolders = [];
  let usersDatatableSearch = '';

  // Bind events
  $document.find("#user-box").on("click", _handleBoxMenuClick);
  $boxForm.on('submit', _createOrUpdateBox); // Handle box create or update
  $document.find('#addBoxModal').on('click', _setBoxCreateAttributes);
  $document.on('click', '.box-card', _handleBoxCardClick);
  $document.find("#boxSearch").on('keyup', _handleBoxSearchInputKeyUp);
  $document.find('#refreshBoxes').on('click', _handleBoxRefreshClick);
  $document.find('#btn_yes').on('click', _handleRemoveBoxConfirmation);
  // Get last inserted box number in province
  boxLetterSelect.on('change', _handleBoxLetterChange);

  // Get last inserted box number case province is selected after letter is selected
  $document.find('#NomeProvincia').on('change', _handleProvinceChange);

  // Populate box letter select options
  boxLetters.map(letter => {
    boxLetterSelect.append(`<option value="${letter}">${letter}</option>`);
  });

  function _handleBoxLetterChange(){
    let letterSelected = $(this).val();
    let provinceSelectedId = $document.find('#NomeProvincia option:selected').val();

    console.log(letterSelected, provinceSelectedId);
    // return
    (boxFormDataset.formtype === 'edit') ? isProvinceOrBoxChange = true : null; // check if user changed box letter or province

    console.log('Letter change <isEdit>: ', isProvinceOrBoxChange);
    if(provinceSelectedId !== '0'){
      _getlastBoxInserted(letterSelected, provinceSelectedId);
    }

  }

  function _handleProvinceChange() {
    let provinceSelected = $(this).val();
    let boxLetter = $document.find('#letraCaixa option:selected').val();
    (boxFormDataset.formtype === 'edit') ? isProvinceOrBoxChange = true : null; // check if user changed box letter or province

    console.log('Province change <isEdit>: ', isProvinceOrBoxChange);
    if(boxLetter !== '0'){ _getlastBoxInserted(boxLetter, provinceSelected); }

  }

//   function _handleProvinceChange() {
//     let provinceSelected = $(this).val();
//     let boxLetter = $document.find('#letraCaixa option:selected').val();
//     (boxFormDataset.formtype === 'edit') ? isProvinceOrBoxChange = true : null; // check if user changed box letter or province

//     console.log('Province change <isEdit>: ', isProvinceOrBoxChange);
//     if(boxLetter !== '0'){ _getlastBoxInserted(boxLetter, provinceSelected); }

//   }

  function _getlastBoxInserted(boxLetter, provinceId){
    return $.ajax({
              type: "GET",
              url: `/boxes/last-inserted/${boxLetter}/${provinceId}`,
              contentType: "application/json",
              data: {},
              dataType: "json",
              async: true,
              cache: false,
              success: function (response) {
                const { name, initialBoxNumber, folders } = response;

                boxNumber.val(initialBoxNumber);
                boxName.val(name);

                boxFolders.removeClass('hidden');
                boxFoldersList.children('li').remove();

                _clearNewFolders();

                // Display folders list
                folders.map(folder => {
                  newBoxFolders.push(folder);
                  boxFoldersList.append(`<li class="list-group-item" style="padding-top: .75rem; padding-bottom: .75rem;">
                                            <p class="name m-0">${folder}</p>
                                          </li>`);
                });

              },
              error: function (response) {
                console.log(response);
              },
            });
  }

  function _handleBoxMenuClick() {
    $document.find("#box-row").addClass("hidden");
    $document.find("#user-container").addClass("hidden");
    $document.find("#box-container").removeClass("hidden");
    $document.find('#provinceStatsContainer').addClass('hidden');
    $document.find('#userStatsContainer').addClass('hidden');
    $document.find('#globalGraphContainer').addClass('hidden');
    $document.find('#monthlyStatsContainer').addClass('hidden');
    $document.find('#monthlyUserStatsContainer').addClass('hidden');
    $document.find('#provinceUserStatsContainer').addClass('hidden');

    _getBoxs();
  }

  // Create box or update
  function _createOrUpdateBox(event) {
    event.preventDefault();

    let boxId = event.currentTarget.getAttribute('data-id');
    let boxValidated = $boxForm.find('input#box-verified:checked').length;
    let oldBoxNumber = $boxForm.find('#numeroCaixa').attr('data-prev-number');

    // Prepare form data
//     let boxFormData = {
//       nomeCaixa: $boxForm.find('#designacaoCaixa').val(),
//       perfilDigitalizador: $boxForm.find("#perfilDigitalizador option:selected").text(),
//       digitalizadorId: $boxForm.find("#perfilDigitalizador option:selected").val(),
//       perfilVerificador: $boxForm.find('#perfilVerificador option:selected').val(),
//       idProvincia: $boxForm.find('#NomeProvincia option:selected').val(),
//       NomeProvincia: $boxForm.find('#NomeProvincia option:selected').text(),
//       estadoCaixa: boxValidated,
//       newFolders: newBoxFolders,
//       oldBoxNumber
//     };

//     boxFormDataset.formtype === 'create' ? _createBox(boxFormData) : _updateBox(boxFormData, boxId);
// }


  let boxFormData = {
    nomeCaixa: $boxForm.find('#designacaoCaixa').val(),
    perfilDigitalizador: $boxForm.find("#perfilDigitalizador option:selected").text(),
    digitalizadorId: $boxForm.find("#perfilDigitalizador option:selected").val(),
    perfilVerificador: $boxForm.find('#perfilVerificador option:selected').val(),
    idTipoDocumento: $boxForm.find('#NomeProvincia option:selected').val(),
    nomeTipoDocumento: $boxForm.find('#NomeProvincia option:selected').text(),
    estadoCaixa: boxValidated,
    newFolders: newBoxFolders,
    oldBoxNumber
  };

  boxFormDataset.formtype === 'create' ? _createBox(boxFormData) : _updateBox(boxFormData, boxId);
}

  // Create box ajax call
  function _createBox(boxFormData) {

    let isDigitalizadorNotSelected = $boxForm.find('select#perfilDigitalizador option:contains("Selecione")')[0].selected;
    let isProvinceNotSelected = $boxForm.find('select#NomeProvincia option:contains("Selecione")')[0].selected;

    if (isProvinceNotSelected) {
      toastr.error('Por favor, Selecione a Provincia.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    if (isDigitalizadorNotSelected) {
      toastr.error('Por favor, Selecione o Digitalizador.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    $.ajax({
      type: "POST",
      url: "/create-box",
      contentType: "application/json",
      data: JSON.stringify(boxFormData),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {
        console.log("RESPONSE:", response);

        if (response.mensagem != undefined) {
          toastr.success(response.mensagem, "Cadastrar Caixa!", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 1000,
            onHidden: function () {
              //Hide modal
              $modalNoBtn.trigger('click');

              $boxTableTr.remove();
              _getBoxs();

              // Clear box form
              $boxForm[0].reset();
            },
          });
        } else if (response.err) {
          toastr.error(response.err, "Erro!", { timeOut: 5000 });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  // Upadte box ajax call
  function _updateBox(boxFormData, boxId) {
    let isDigitalizadorSelected = $boxForm.find('select#perfilDigitalizador option:contains("Selecione")')[0].selected;
    let isProvinceSelected = $boxForm.find('select#NomeProvincia option:contains("Selecione")')[0].selected;

    if (isProvinceSelected) {
      toastr.error('Por favor, Selecione o Tipo de Documento.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    if (isDigitalizadorSelected) {
      toastr.error('Por favor, Selecione o Digitalizador.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    $.ajax({
      type: "PUT",
      url: "/update-box/" + boxId,
      contentType: "application/json",
      data: JSON.stringify(boxFormData),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {
        console.log("RESPONSE:", response.caixas);

        if (response.caixas !== undefined && response.caixas[0] === 1) {
          toastr.success(response.mensagem, "Caixa Atualizada!", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 1000,
            onHidden: function async () {
              //Hide modal
              $modalNoBtn.trigger('click');

              $boxTableTr.remove();
              _getBoxs();

              // console.log('After save: ', $document.find('input.form-control.form-control-sm[type="search"]'), usersDatatableSearch);

              // Clear box form
              $boxForm[0].reset();
            },
          });
        } else if (response.error) {
          toastr.error(response.error, "Erro!", { timeOut: 5000 });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  // Fill box table
  function _getBoxs() {

    $.ajax({
      type: "GET",
      url: "/get-boxes",
      data: {},
      dataType: "json",
      success: function (response) {
        console.log("EStado da Caixa: ",response);
        if (response.caixas) {

          $boxTableTr.remove();

          let boxes = [];

          let boxTable = $document.find('#box-table').DataTable();

          boxTable.destroy(); //Destroy old table to avoid reinitializing

          response.caixas.map((caixa, index) => {

            let editBtn = `<i class="ft-edit edit-box" data-id="${caixa.CaixaId}" data-name="${caixa.Designacao}" data-documento="${caixa.Tipo_Documento}"
                              data-toggle="modal"  data-digitalizador="${caixa.NomeDigitalizador}" data-verificador="${caixa.Nome}"
                              data-estado="${caixa.EstadoCaixa}" data-target="#xlargeAddBox" title="Editar"></i>`;

            boxes.push({ caixa, editBtn });
          });

          $('#box-table').DataTable({
            "language": {
              "search": "Pesquisar",
              "lengthMenu": "Exibir _MENU_ resultados por página",
              "emptyTable": "Nenhum registro encontrado",
              "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
              "infoEmpty": "Mostrando 0 até 0 de 0 registros",
              "infoFiltered": "(Filtrados de _MAX_ registros)",
              "infoThousands": ".",
              "loadingRecords": "Carregando...",
              "processing": "Processando...",
              "zeroRecords": "Nenhum registro encontrado",
              "search": "Pesquisar",
              "paginate": {
                "next": "Próximo",
                "previous": "Anterior",
                "first": "Primeiro",
                "last": "Último"
              }
            },
            "data": boxes,
            "columns": [
              { "data": "caixa.Designacao" },
              { "data": "caixa.Tipo_Documento" },
              { "data": "caixa.EstadoCaixa" },
              { "data": "caixa.NomeDigitalizador" },
              { "data": "caixa.Nome" },
              { "data": "editBtn" }
            ],
            "columnDefs": [
              { "className": "dt-center", "targets": [2, 5] },
              { "orderable": false, "targets": [5] }
            ],
            scrollY: 450,
            "initComplete": function() {
              // Set datatable with USERS previous search after data loaded
              $document.find('input.form-control.form-control-sm[type="search"]').val(usersDatatableSearch).trigger('keyup');
            },
            "rowCallback": function (row, data) {
              const { EstadoCaixa } = data.caixa;
              let $tdRow = $('td', row);
              console.log("EStado da Caixa: ",EstadoCaixa);
              if (EstadoCaixa === 'DIGITALIZADA')
                $tdRow.eq(2).html(`<span class="position-relative badge badge-danger badge-pill ml-2">${EstadoCaixa}</span>`);
              else
                $tdRow.eq(2).html(`<span class="position-relative badge badge-success badge-pill ml-2">${EstadoCaixa}</span>`);

              // off('click') to prevent function from being fired multiple times
              $tdRow.eq(5).children('i').off('click').on('click', function (event) { _setEditModalValues(event) });
            },
            "drawCallback": function () {
              // Save users search
              $document.find('input.form-control.form-control-sm[type="search"]').on('keyup', function() {
                usersDatatableSearch = $(this).val();

                // console.log('Users datatable search === ', usersDatatableSearch);
              });
            }
          });
        }

        // <i class="ft-plus-circle assign-box" id="test" data-id="${caixa.CaixaId}" data-name="${caixa.Designacao}" data-toggle="modal" data-target="#xlarge-box" title="Adicionar Tipo Documento"></i>
      },
    });
  }

  // Fill box form values to update
  function _setEditModalValues(event) {
    let $this = $(event.target);

    let boxId = $this.data('id');
    let nomeCaixa = $this.data('name');
    let perfilDigitalizador = $this.data('digitalizador');
    let perfilVerificador = $this.data('verificador');
    let nomeProvincia = $this.data('documento');
    let caixaEstado = $this.data('estado');
    let boxValidated = $boxForm.find('#box-verified')[0].checked;
    let boxReplace = nomeCaixa.replace('CX', '00');
    let boxLetter = boxReplace.match(/[A-Z]/gi);
    let letterSelect = $document.find('select#letraCaixa option:contains("'+boxLetter[0]+'")');
    let boxNumber = boxReplace.split(`${boxLetter[0]}`)[1];

    console.log("Quero saber qual é o dados: ", caixaEstado);

    $document.find('#boxModalTitle').text('Editar Caixa');
    $boxForm.attr('data-formType', 'edit');
    $boxForm.attr('data-id', boxId);
    $document.find('.box-nameInput').addClass('hidden');

    ($userRole === 'Administrador') ? $boxVerifiedOption.removeClass('hidden')
      : $boxVerifiedOption.addClass('hidden');
    $document.find('#addNomePasta').removeAttr('required'); //Prevent from giving a form control not focusable error on submit

    caixaEstado === 'DIGITALIZADA' ? boxValidated = false : boxValidated = true;

    console.log("Quero saber qual é o dados 2: ", caixaEstado);

    boxValidated ? setValidatedChecked() : setValidatedDisabled();

    $document.find('#numeroCaixa').val(boxNumber);
    $document.find('#numeroCaixa').attr('data-prev-number', boxNumber); //Set prev number for reference to update folders changed
    $document.find('#designacaoCaixa').val(nomeCaixa)
    $document.find('select#perfilVerificador option:contains("' + perfilVerificador + '")').prop('selected', true);
    $document.find('select#perfilDigitalizador option:contains("' + perfilDigitalizador + '")').prop('selected', true);
    $document.find('select#NomeProvincia option:contains("' + nomeProvincia + '")').prop('selected', true);
    $document.find('select#NomeProvincia').prop('disabled', true);

    letterSelect.prop('selected', true);

    $document.find('#boxFolders').addClass('hidden');

    _clearNewFolders();
  }

  // Set validate input checkbox checked styles
  function setValidatedChecked() {
    $validationBtn
      .css('box-shadow', 'rgb(100, 189, 99) 0px 0px 0px 9px inset')
      .css('border-color', 'rgb(100, 189, 99)')
      .css('background-color', 'rgb(100, 189, 99)')
      .css('transition', 'border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s');

    $validationBtn
      .find('small')
      .css('left', '12px')
      .css('transition', 'background-color 0.4s ease 0s, left 0.2s ease 0s')
      .css('background-color', 'rgb(255, 255, 255)')
  }

  // Disable validate input checkbox checked styles
  function setValidatedDisabled() {
    $validationBtn
      .css('box-shadow', 'rgb(223, 223, 223) 0px 0px 0px 0px inset')
      .css('border-color', 'rgb(223, 223, 223)')
      .css('background-color', 'rgb(255, 255, 255)')
      .css('transition', 'border 0.4s ease 0s, box-shadow 0.4s ease 0s');

    $validationBtn
      .find('small')
      .css('left', '0px')
      .css('transition', 'background-color 0.4s ease 0s, left 0.2s ease 0s')
      .css('background-color', 'transparent')

    // $('#switchery2')[0].checked = false;
  }

  // Add attributes to box form on create to distinguish from update
  function _setBoxCreateAttributes() {
    $document.find('#add-box-form')[0].reset();
    $document.find('select#perfilVerificador option:contains("Teste")').prop('selected', true);
    $document.find('#box-verifiedOpt').addClass('hidden');
    $document.find('#boxModalTitle').text('Adicionar Caixa');
    $boxForm.attr('data-formType', 'create');
    $document.find('.box-nameInput').removeClass('hidden');
    $boxVerifiedOption.addClass('hidden');
    $document.find('#addNomePasta').attr('required', 'required');

    $document.find('#boxFolders').addClass('hidden');
    $document.find('#boxFoldersList').children('li').remove();

    $document.find('select#NomeProvincia').prop('disabled', false);

  }

  // Get verifier users and fill verifier select box
  function _getVerifier() {
    $.ajax({
      type: "GET",
      url: "/get-verifier",
      contentType: "application/json",
      data: {},
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {

        if (response.verifier != undefined) {
          response.verifier.forEach((element) => {

            if ($userRole === 'Administrador') {
              $document.find("#user").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
              $document.find("#user-province").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
            };

            //Adicionar verificadores na Modal para Criar caixas
            $document.find("#perfilVerificador").append(
              '<option value="' +
              element.UtilizadorId +
              '">' +
              element.Nome +
              "</option>"
            );
          });
        } else {
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  // Get digitizer users and fill digitizer select box
  function _getDigitizer() {
    $.ajax({
      type: "GET",
      url: "/get-digitizer",
      contentType: "application/json",
      data: {},
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {

        if (response.digitizer != undefined) {
          response.digitizer.forEach((element) => {

            if ($userRole === 'AdminDigitalizacao') {
              $document.find("#user").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
              $document.find("#user-province").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
            };

            //Adicionar verificadores na Modal para Criar caixas
            $document.find("#perfilDigitalizador").append('<option value="' + element.UtilizadorId + '">' + element.Nome + "</option>");
          });
        } else {
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  //Add folders to box div
  function _handleBoxCardClick(event) {
    let boxId = event.currentTarget.getAttribute('data-id');
    let boxName = event.currentTarget.getAttribute('data-name');
    let boxIdentifier = boxName.split('CX0000');

    $document.find('#form-validate').attr('data-form-val', boxName);

    // Clear search input and content
    $document.find('#accordionCrypto').children('div').remove();
    $document.find('#docSearch').val('');

    _getBoxDetails(boxId, boxIdentifier[1]);

    $.ajax({
      type: "GET",
      url: "/get-box-folders/" + boxId + "",
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {

         console.log('PASTAS: ', response);
        if (response.pastas != undefined) {

          home.clearDiv('folder_div' + boxId + '');
          home.addDiv('folder_div' + boxId + '', 'folders' + boxId + '');

          localStorage.setItem('boxName', boxName);


          response.pastas.forEach((pasta, index) => {

            $('#folders' + boxId + '').append(
              "<div class='card-content folderList' data-id='" + pasta.PastaId + "' data-name='" + pasta.Designacao + boxIdentifier[1] + "' data-folder='" + pasta.Designacao + "'>" +
                "<div class='card-body p-0'>" +
                  "<div class='media-list list-group' id='box_content'>" +
                      "<div class='list-group-item list-group-item-action media p-1'>" +
                        "<a href='#' class='media-link'>" +
                          "<div class='media-left'>" +
                            "<p class='text-bold-600 m-0' id='box_name'>" + pasta.Designacao + "</p>" +
                          "</div>" +
                        "</a>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>"
            );

          });

        } else {

          home.clearDiv('folder_div' + boxId + '');
          home.addDiv('folder_div' + boxId + '', 'folders' + boxId + '');

          $document.find('#folders' + boxId).append(`<h1>Não existe(m) Pasta(s) nesta Caixa</h3>`);
          // toastr.warning('Não existe(m) Pasta(s) nesta Caixa', 'Aviso!', { "timeOut": 2500 });

          home.clearDiv('accordionCrypto'); //LIMPAR A DIV QUE EXIBE OS DOCS QUANDO NÃO EXISTE

          home.setTotalDocumentsCount(''); //LIMPAR O TATAL DOCS QNUANDO É 0
        }
        home.clearDiv('accordionCryptoDocs');
        home.clearDiv('iframeMain');
        // getBoxDetailsFolders();
      },
      error: function (response) {
        console.log(response)
      }
    });
  }

  // Show box details
  function _getBoxDetails(boxId, boxName){
      let boxLetter = boxName.split('')[0];

      $.ajax({
          type: "GET",
          url: "/get-box-details/"+boxId+"",
          data: JSON.stringify(),
          dataType: "json",
          success: function (response) {
              //console.log('Box Details: ', response);
              home.clearDiv('details_div');
              home.addDiv('details_div', 'details');

              // Append image
              home.clearDiv('qr_box_div');
              home.addDiv('qr_box_div', 'qr_code_box');
              home.clearDiv('qr_folder_div');
              home.addDiv('qr_folder_div', 'qr_code_folder');

              home.centerDiv('qr_code_box');
              home.showDetailsDiv();
              //
            // console.log("O que é isso afinal do Storeg", localStorage);
            // console.log("O que é isso afinal do BoxDetails", response.boxDetails);

              if(response.boxDetails != undefined){
                  response.boxDetails.map(item => {
                    // let { Departamento } = response.boxDetails;
                    // console.log("orgao: ", item.Departamento);
                    let departamento =item.Departamento;
                    let tipoDocumento = localStorage.getItem('province');
                    if(departamento ==='ACADEMIA DE POLICIA'){
                        departamento ='ACADEMIA DE POLICIA';
                        if(tipoDocumento==='Instituto Médio De Ciências Policiais'){
                             tipoDocumento ='Instituto Med. Ciênc. Policiais';

                        }

                    }

                    if(departamento ==='GABINETE DO COMANDANTE GERAL'){
                        departamento ='GABINETE CMTE. GERAL';
                        if(tipoDocumento==='Gabinete do Comandante Geral'){
                             tipoDocumento ='Gabinete Cmte. Geral';

                        }
                    }
                    if(departamento ==='GABINETE DE ESTUDOS E REGULAMENTAÇÃO'){
                        departamento ='GAB. EST. REGULAMENTAÇÃO ';
                        if(tipoDocumento==='Gabinete De Estudo e Regulamentação'){
                             tipoDocumento ='Gab. Est. Regulamentação ';

                        }
                    }
                    if(departamento ==='POLICIA DE INTERVENÇÃO RÁPIDA'){
                        departamento ='PIR';
                        if(tipoDocumento==='Comando Da Polícia De Intervenção Rápida'){
                             tipoDocumento ='Comando Pol. Int. Rápida';

                        }
                    }
                    if(departamento ==='POLICIA FISCAL ADUANEIRA'){
                        departamento ='POLICIA FISCAL ADUANEIRA';
                        if(tipoDocumento==='Unidade Fiscal e Aduaneira'){
                             tipoDocumento ='Unidade Fiscal Aduaneira';

                        }
                    }
                    if(departamento ==='POLICIA DE SEGURANÇA DE OBJECTIVOS ESTRATÉGICOS'){
                        departamento ='PSOE';
                        if(tipoDocumento==='Comando Da Unidade De Protecção Objectivos e Económicos'){
                             tipoDocumento ='CUPOE';

                        }
                    }
                    if(departamento ==='POLICIA DE GUARDA FRONTEIRAS'){
                        departamento ='POLICIA GUARDA FRONTEIRAS';
                        if(tipoDocumento==='Polícia De Guarda Fronteira'){
                             tipoDocumento ='Policia da Guarda Fronteiras';

                        }
                    }
                    if(departamento ==='POLICIA DE SEGURANÇA PESSOAL E DE ENTIDADES PROTOCOLARES'){
                        departamento ='PSPEP';
                        if(tipoDocumento==='Polícia De Segurança Pessoal e De Entidades Protocolares'){
                             tipoDocumento ='PSPEP';

                        }
                    }
                    if(departamento ==='CENTRO DE FORMAÇÃO E ADESTRAMENTO DE CAVALARIA E CINOTECNIA'){
                        departamento ='CENTRO F.A.C. CINOTECNIA';
                        if(tipoDocumento==='Polícia Montada'){
                             tipoDocumento ='Polícia Montada';

                        }
                    }
                    if(departamento ==='INSTITUTO SUPERIOR DE CIÊNCIAS POLICIAIS E CRIMINAIS'){
                        departamento ='INSTITUTO S.C.P. CRIMINAIS';
                        if(tipoDocumento==='Instituto Superior De Ciências Policiais E Criminais'){
                             tipoDocumento ='Instituto S.C.P. Criminais';

                        }
                    }
                    if(departamento ==='ESCOLA PRÁTICA DE POLICIA'){
                        departamento ='ESCOLA PRÁTICA POLICIA';
                        if(tipoDocumento==='Escola De Proteção e Intervenção'){
                             tipoDocumento ='Escola Protec. Intervenção';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE SEGURANÇA PÚBLICA E OPERAÇÕES'){
                        departamento ='DIRECÇÃO SEG. P. OPERAÇÕES';
                        if(tipoDocumento==='Departamento De Armas E Explosivos'){
                             tipoDocumento ='Depart. Armas e Explosivos';

                        }else{
                            if(tipoDocumento==='Direcção Nacional De Ordem Pública'){
                                tipoDocumento ='Direcção Nac. Ord. Pública';
                            }else{
                                if(tipoDocumento==='Posto Do Comando Central'){
                                    tipoDocumento ='Posto Comando Central';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE COMUNICAÇÃO INSTITUCIONAL E IMPRENSA'){
                        departamento ='DIRECÇÃO COM. I. IMPRENSA';
                        if(tipoDocumento==='Gabinete De Comunicação e Imagem'){
                             tipoDocumento ='Gabinete Com. Imagem';

                        }
                    }
                    if(departamento ==='GABINETE DE PUREZA INTERNA'){
                        departamento ='GABINETE PUREZA INTERNA';
                        if(tipoDocumento==='Gabinete De Pureza Interna'){
                             tipoDocumento ='Gabinete Pureza Interna';

                        }
                    }
                    if(departamento ==='INSPECÇÃO DA POLICIA NACIONAL DE ANGOLA'){
                        departamento ='INSPECÇÃO DA PNA';

                    }
                    if(departamento ==='GABINETE DO SEGUNDO COMANDANTE'){
                        departamento ='GABINETE 2º COMANDANTE';
                        if(tipoDocumento==='Gabinete do 2º Comandante'){
                             tipoDocumento ='Gabinete do 2º Comandante';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE INFORMAÇÕES POLICIAIS'){
                        departamento ='DIRECÇÃO INF. POLICIAIS';
                        if(tipoDocumento==='Direcção Nacional De Registos E Informações'){
                             tipoDocumento ='Direcção Nac. R. Informações';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE FINANÇAS'){
                        departamento ='DIRECÇÃO DE FINANÇAS';
                        if(tipoDocumento==='Direcção Nacional De Planeamento E Finanças'){
                             tipoDocumento ='Direcção Nac. Plan. Finanças';

                        }else{
                            if(tipoDocumento==='Complexo Residencial Imbondeiro'){
                                tipoDocumento ='Complexo Res. Imbondeiro';
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE LOGISTICA'){
                        departamento ='DIRECÇÃO DE LOGISTICA';
                        if(tipoDocumento==='Direcção Nacional De Logistica'){
                             tipoDocumento ='Direcção Nac. Logistica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE INFRAESTRUTURA E EQUIPAMENTOS'){
                        departamento ='DIRECÇÃO I.E. EQUIPAMENTOS';
                        if(tipoDocumento==='Gabinete Técnico'){
                             tipoDocumento ='Gabinete Técnico';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ADMINISTRAÇÃO E SERVIÇOS'){
                        departamento ='DIRECÇAÕ ADM.  SERVIÇOS';
                        if(tipoDocumento==='Secretaria Geral'){
                            tipoDocumento ='Secretaria Geral';

                        }else{
                            if(tipoDocumento==='Serviços Sociais'){
                                tipoDocumento ='Serviços Sociais';
                            }else{
                                if(tipoDocumento==='Gabinete De Protocolo e Relações Públicas'){
                                    tipoDocumento ='Gabinete Prot. Rel. Publicas';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ACESSORIA JURÍDICA'){
                        departamento ='DIRECÇÃO ACESS. JURÍDICA';
                        if(tipoDocumento==='Gabinete De Acessoria Juridica'){
                             tipoDocumento ='Gabinete Acessoria Jurídica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE EDUCAÇÃO PATRIÓTICA'){
                        departamento ='DIRECÇÃO EDUC. PATRIÓTICA';
                        if(tipoDocumento==='Departamento Nacional De Educação Moral Cívica'){
                             tipoDocumento ='Dep. Nac.Educ. Moral Civica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TRANSITO E SEGURANÇA RODOVIÁRIA'){
                        departamento ='DIRECÇÃO T. S. RODOVIARIA';
                        if(tipoDocumento==='Direcção Nacional De Viação e Transito'){
                             tipoDocumento ='Direcção Nac. Viac. Trânsito';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE PESSOAL E QUADROS'){
                        departamento ='DIRECÇÃO PESSOAL QUADROS';
                        if(tipoDocumento==='Direcção Nacional De Recursos Humanos'){
                             tipoDocumento ='Direcção Nac. Rec. Humanos';
                        }else{
                            if(tipoDocumento==='Formação De Comando'){
                                tipoDocumento ='Formação De Comando';
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TELECOMUNICAÇÕES E TECNOLOGIAS DE INFOMAÇÃO'){
                        departamento ='DIRECÇÃO T.T. INFORMAÇÃO';
                        if(tipoDocumento==='Direcçao Provincial De Telecomunicações e Informática'){
                            tipoDocumento ='Direcção Prov.Tel. Informatica';
                        }else{
                            if(tipoDocumento==='Direcção Nacional De Comunicações'){
                                tipoDocumento ='Direcção Nac. Comunicação';
                            }else{
                                if(tipoDocumento==='Departamento Nacional De Informática'){
                                    tipoDocumento ='Depart. Nac. Informatica';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TRANSPORTES'){
                        departamento ='DIRECÇÃO DE TRANSPORTES';
                        if(tipoDocumento==='Departamento Nacional De Transporte'){
                             tipoDocumento ='Departamento N. Transporte';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE SERVIÇOS DE SAÚDE'){
                        departamento ='DIRECÇÃO SERVIÇOS DE SAÚDE';
                        if(tipoDocumento==='Departamento De Saúde'){
                             tipoDocumento ='Departamento De Saúde';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ESTUDOS E PLANEAMENTO'){
                        departamento ='DIRECÇÃO EST. PLANEAMENTO';
                        if(tipoDocumento==='Gabinete De Estudos Informação e Análise'){
                             tipoDocumento ='Gab. De Estudos Inf. E Analise';
                        }
                    }
                    if(departamento ==='COMANDO PROVINCIAL DE LUANDA'){
                        departamento ='COMANDO PROV. LUANDA';
                        if(tipoDocumento==='Departamento Provincial De Investigação Criminal'){
                             tipoDocumento ='Depart. Prov. Invest. Criminal';
                        }
                    }
                    if(departamento ==='SERVIÇO DE INVESTIGAÇÃO CRIMINAL'){
                        departamento ='SIC';
                        if(tipoDocumento==='Direcção Nacional De Investigação Criminal'){
                             tipoDocumento ='Direcção Nac. Invest. Criminal';
                        }
                    }
                    if(departamento ==='GRUPO DESPORTIVO INTERCLUBE'){
                        departamento ='GRUPO DESP. INTERCLUBE';
                        if(tipoDocumento==='Interclube'){
                             tipoDocumento ='Interclube';
                        }
                    }
                    if(departamento ==='COFRE DE PREVIDENCIA DO PESSOAL DA POLICIA NACIONAL'){
                        departamento ='CPPPN';
                        if(tipoDocumento==='Cofre De Previdência Do Pessoal Da Polícia Nacional'){
                             tipoDocumento ='CPPPN';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE DOUTRINA E ENSINO POLICIAL'){
                        departamento ='DIRECÇÃO DOUT. E. POLICIAL';
                        if(tipoDocumento==='Doutrina Policial'){
                             tipoDocumento ='Doutrina Policial';
                        }
                    }

                      $('#qr_code_box').append(


                          "<div id='doc-infoContent' class='col-md-12' data-type='box-content'>"+

                              "<div class='form-group row'>"+
                                      "<div class='col-md-12 d-flex justify-content-center'>"+
                                          "<img class='img-thumbnail bg-transparent border-0' src='/assets/img/CPPPN.jpg' alt='codigo_qr' style='max-width: 30% !important;'>"+
                                      "</div>"+
                              "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                  "<div class='input-group mt-0 input-border'>"+
                                    //   "<div class='input-group-prepend w-10'>"+
                                    //           "<span class='input-group-text bg-white border-right-0 box-input-bolder'>Orgão:</span>"+
                                    //   "</div>"+
                                      "<input type='text' id='orgao' class='form-control border-left-0 bg-white box-input-bolder1' placeholder='' name='orgao' style={{'size:10'}} value='"+departamento+"' readonly>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                  "<div class='input-group mt-0 input-border'>"+
                                    //   "<div class='input-group-prepend w-10'>"+
                                    //           "<span class='input-group-text bg-white border-right-0 box-input-bolder'>Tipo de Documento:</span>"+
                                    //   "</div>"+
                                      "<input type='text' id='orgao' class='form-control border-left-0 bg-white box-input-bolder1' placeholder='' name='orgao' value='"+tipoDocumento+"' readonly>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                  "<div class='input-group mt-0 input-border'>"+
                                      "<div class='input-group-prepend w-10'>"+
                                          "<span class='input-group-text bg-white border-right-0 box-input-bolder'>Caixa Nº:</span>"+
                                      "</div>"+
                                      "<input type='text' id='box_num' class='form-control border-left-0 bg-white box-input-bolder' placeholder='' name='box_num' value='CX0000"+boxName+"' readonly>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                  "<div class='input-group mt-0 input-border'>"+
                                      "<div class='input-group-prepend w-30'>"+
                                              "<span class='input-group-text bg-white border-right-0 box-input-bolder'>Letra:</span>"+
                                      "</div>"+
                                      "<input type='text' id='letra' class='form-control border-left-0 bg-white box-input-bolder' placeholder='' name='letra' value='"+boxLetter+"' readonly>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='form-group row'>"+
                                  "<div class='col-md-12 d-flex justify-content-center'>"+
                                      "<img class='img-thumbnail' src='"+item.codigoQr+"' alt='imagem_codigo_qr'>"+
                                  "</div>"+
                              "</div>"+

                          "</div>"

                      );

                  });
              }

          },
          error: function (response) {
              console.log(response);
          }
      });
  }

  function _handleBoxSearchInputKeyUp(event) {
    let searchString = $(this).val().toUpperCase();
    let provinceId = localStorage.getItem('provinceSet');
    console.log('Box Search');
    if(event.keyCode === 13 && searchString && provinceId) {
        _searchBox(searchString, provinceId);
    } else if(event.keyCode === 8 && searchString === "") {
        province.getProvinceById(provinceId);
    }
  }

  function _searchBox(searchString, provinceId){
    console.log(searchString, provinceId);
    $.ajax({
        type: "GET",
        url: "/search-box/"+provinceId+"/"+searchString,
        contentType: "application/json",
        data: JSON.stringify(),
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {

            console.log(response.boxDetails);
            if(response.boxDetails != undefined){

                home.clearDiv('accordionCryptoTypes');

                // Clear details div
                home.clearDiv('details_div');
                home.addDiv('details_div', 'details');

                //Total de documentos por provincia
                response.boxDetails.length ? $('#totalProvince').text(response.boxDetails.length) : $('#totalProvince').text('');

                response.boxDetails.forEach((box, index) => {

                    home.addDiv('accordionCryptoTypes', 'province_boxes');
                    $('#province_boxes').append(province.appendProvinceBoxes(box, index));
                });

                home.addScroll('accordionCryptoTypes');

            }else{

                home.clearDiv('accordionCryptoTypes');
                home.addDiv('accordionCryptoTypes', 'province_boxes');

                $document.find('#province_boxes').append(response.error);
                // toastr.warning('Não existe(m) Caixa(s) nesta Provincia', 'Aviso!', { "timeOut": 5000 });
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

  function _handleBoxRefreshClick(){
    let provinceId = localStorage.getItem('provinceSet');
    let searchString = $document.find("#boxSearch").val().toUpperCase();

    (provinceId && searchString === "") ? province.getProvinceById(provinceId) : null;
    (provinceId && searchString) ? _searchBox(searchString, provinceId) : null;
  }

  function _handleRemoveBoxConfirmation(event){
      event.stopPropagation(); //Prevent parent from being called
      let boxId = $document.find('#remBoxId').val();
      let totalBoxes = parseInt($document.find('#totalProvince').text());

      if(boxId){
          $.ajax({
          type: "DELETE",
          url: "/remove-box/"+boxId+"",
          contentType: "application/json",
          data: JSON.stringify(),
          dataType: "json",
          async: true,
          cache: false,
          success: function (response) {

              console.log(response);

              if(response.mensagem !== undefined){
                  toastr.success(response.mensagem, 'Notificação!', { "showMethod": "slideDown", "hideMethod": "slideUp",
                          timeOut: 1000, onHidden: function () {
                              $document.find('.btn_no').trigger('click');
                              $document.find('#totalProvince').text(totalBoxes - 1);
                              $document.find('#box_'+boxId).remove();
                          }
                  });
              }else{
                  toastr.warning('Ocorreu um erro no sistema.', 'Aviso!', { "timeOut": 5000 });
              }
          },
          error: function (response) {
              console.log(response)
          }
          });
      }
  }

  function _clearNewFolders() {
    return newBoxFolders.length = 0; //Clear array before adding new ones
  }

  // Initialize functions
  _getDigitizer();
  _getVerifier();

  return {
    setValidatedChecked,
    setValidatedDisabled
  }

})(Document, jQuery);
