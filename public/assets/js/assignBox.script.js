$(function () {


  $("#user-box").on("click", function () {
    $("#box-row").addClass("hidden");
    $("#user-container").addClass("hidden");
    $("#box-container").removeClass("hidden");
    $('#provinceStatsContainer').addClass('hidden');
    $('#userStatsContainer').addClass('hidden');
    $('#globalGraphContainer').addClass('hidden');
    $('#monthlyStatsContainer').addClass('hidden');
    $('#monthlyUserStatsContainer').addClass('hidden');
    $('#provinceUserStatsContainer').addClass('hidden');

    getBoxs();
  });

  function assignForm() {
    //CADASTRAR CAIXA
    $('#add-box-form').on('submit', function(element) {
      element.preventDefault();
      let formType = element.currentTarget.getAttribute('data-formType');
      let boxId = element.currentTarget.getAttribute('data-id');
      let boxValidated = $document.find('#box-verified')[0].checked;
      let oldBoxNumber = $document.find('#numeroCaixa').attr('data-prev-number');

      let BoxFormData = {
        nomeCaixa: $document.find('#addNomeCaixa').val(),
        nomePasta: $document.find('#addNomePasta').val(),
        perfilDigitalizador: $document.find("#perfilDigitalizadorAdd option:selected").text(),
        digitalizadorId: $document.find("#perfilDigitalizadorAdd option:selected").val(),
        perfilVerificador: $document.find('#perfilVerificadorAdd option:selected').val(),
        idProvincia: $document.find('#NomeProvincia option:selected').val(),
        NomeProvincia: $document.find('#NomeProvincia option:selected').text(),
        estadoCaixa: boxValidated,
        newFolders: box.newBoxFolders,
        oldBoxNumber
      };

      formType === 'create' ? createBox(BoxFormData) : updateBox(BoxFormData, boxId);

    });
  }

  function createBox(BoxFormData){

    let isDigitalizadorSelected = $('select#perfilDigitalizador option:contains("Selecione")')[0].selected;
    let isProvinceSelected = $('select#NomeProvincia option:contains("Selecione")')[0].selected;

    if(isProvinceSelected)
    {
      toastr.error('Por favor, Selecione a Provincia.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    if(isDigitalizadorSelected)
    {
      toastr.error('Por favor, Selecione o Digitalizador.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    $.ajax({
      type: "POST",
      url: "/create-box",
      contentType: "application/json",
      data: JSON.stringify(BoxFormData),
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
              $('.btn_no').trigger('click');

              $("#box-table tbody tr").remove();
              getBoxs();

              // Clear box form
              $('#add-box-form')[0].reset();
            },
          });
        } else if(response.err) {
          toastr.error(response.err, "Erro!", { timeOut: 5000 });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  function updateBox(BoxFormData, boxId){
    let isDigitalizadorSelected = $('select#perfilDigitalizador option:contains("Selecione")')[0].selected;
    let isProvinceSelected = $('select#NomeProvincia option:contains("Selecione")')[0].selected;

    if(isProvinceSelected)
    {
      toastr.error('Por favor, Selecione a Provincia.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    if(isDigitalizadorSelected)
    {
      toastr.error('Por favor, Selecione o Digitalizador.', "Aviso!", { timeOut: 3000 });
      return 0
    }

    $.ajax({
      type: "PUT",
      url: "/update-box/"+boxId,
      contentType: "application/json",
      data: JSON.stringify(BoxFormData),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {
        console.log("RESPONSE:", response);

        if (response.caixas.rowsAffected[0] === 1) {
          toastr.success(response.mensagem, "Caixa Atualizada!", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 1000,
            onHidden: function () {
              //Hide modal
              $('.btn_no').trigger('click');

              $("#box-table tbody tr").remove();
              getBoxs();

              // Clear box form
              $('#add-box-form')[0].reset();
            },
          });
        } else if(response.err) {
          toastr.error(response.err, "Erro!", { timeOut: 5000 });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  function setValidatedChecked() {
    $('span.switchery')
        .css('box-shadow', 'rgb(100, 189, 99) 0px 0px 0px 9px inset')
        .css('border-color', 'rgb(100, 189, 99)')
        .css('background-color', 'rgb(100, 189, 99)')
        .css('transition', 'border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s');

    $('span.switchery > small')
        .css('left', '12px' )
        .css('transition', 'background-color 0.4s ease 0s, left 0.2s ease 0s')
        .css('background-color', 'rgb(255, 255, 255)')
  }

  function setValidatedDisabled() {
      $('span.switchery')
          .css('box-shadow', 'rgb(223, 223, 223) 0px 0px 0px 0px inset')
          .css('border-color', 'rgb(223, 223, 223)')
          .css('background-color', 'rgb(255, 255, 255)')
          .css('transition', 'border 0.4s ease 0s, box-shadow 0.4s ease 0s');

      $('span.switchery > small')
          .css('left', '0px' )
          .css('transition', 'background-color 0.4s ease 0s, left 0.2s ease 0s')
          .css('background-color', 'transparent')

      // $('#switchery2')[0].checked = false;
  }

  function getBoxs() {

    $.ajax({
      type: "GET",
      url: "/get-boxes",
      data: {},
      dataType: "json",
      success: function (response) {
        if (response.caixas) {

          $("#box-table tbody tr").remove();

          let boxes = [];

          let boxTable = $('#box-table').DataTable();

          boxTable.destroy(); //Destroy old table to avoid reinitializing

          response.caixas.map((caixa, index) => {

            let editBtn = `<i class="ft-edit edit-box" data-id="${caixa.CaixaId}" data-name="${caixa.Designacao}" data-name="${caixa.Designacao}"
                              data-toggle="modal" data-provincia="${caixa.Provincia}" data-digitalizador="${caixa.NomeDigitalizador}" data-verificador="${caixa.Nome}"
                              data-estado="${caixa.EstadoCaixa}" data-target="#xlargeAddBox" title="Editar"></i>`;

            boxes.push({caixa, editBtn});
          });

          $('#box-table').DataTable({
            "language": {
              "search": "Pesquisar",
              "lengthMenu":     "Exibir _MENU_ resultados por página",
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
                { "data": "caixa.Provincia" },
                { "data": "caixa.EstadoCaixa" },
                { "data": "caixa.NomeDigitalizador" },
                { "data": "caixa.Nome" },
                { "data": "editBtn" }
            ],
            "columnDefs": [
              {"className": "dt-center", "targets": [2, 5]},
              { "orderable": false, "targets": [5] }
            ],
            scrollY: 450,
            "rowCallback": function( row, data ) {
              const { EstadoCaixa } = data.caixa;

              if(EstadoCaixa === 'DIGITALIZADA')
                $('td', row).eq(2).html(`<span class="position-relative badge badge-danger badge-pill ml-2">${EstadoCaixa}</span>`);
              else
                $('td', row).eq(2).html(`<span class="position-relative badge badge-success badge-pill ml-2">${EstadoCaixa}</span>`);

              // off('click') to prevent function from being fired multiple times
              $('td', row).eq(5).children('i').off('click').on('click', function(element){
                editModal(element);
              });
            }
          });
        }

        // <i class="ft-plus-circle assign-box" id="test" data-id="${caixa.CaixaId}" data-name="${caixa.Designacao}" data-toggle="modal" data-target="#xlarge-box" title="Adicionar Tipo Documento"></i>

        getBoxName();
        removeBox();
      },
    });
  }

  function getBoxName() {
    $('.assign-box').on('click', function(element) {
        var boxName = element.currentTarget.getAttribute('data-name');
        var boxId = element.currentTarget.getAttribute('data-id');

        $('#nomeCaixa').val(boxName);
        $('#box-id').remove();
        $('#box-form').append('<input type="hidden" id="box-id" name="box-name" value='+ boxId +' />')

      });
  }

  function removeBox() {
    $('.remove-box').on('click', function(element) {
        var boxId = element.currentTarget.getAttribute('data-id');

        console.log('Remove box: ',boxId);
      });
  }


  $('#addBoxModal').on('click', function(){
    $('#add-box-form')[0].reset();
    $('#boxModalTitle').text('Cadastrar Caixa');
    $('select#perfilVerificador option:contains("Teste")').prop('selected', true);
    $('#box-verifiedOpt').addClass('hidden');
    $('#add-box-form').attr('data-formType', 'create');
    $('#box-verifiedOpt').addClass('hidden');

    $('#boxFolders').addClass('hidden');
    $('#boxFoldersList').children('li').remove();
  });

  function editModal(element) {
      let boxId = element.currentTarget.getAttribute('data-id');
      let nomeCaixa = element.currentTarget.getAttribute('data-name');
      let perfilDigitalizador = element.currentTarget.getAttribute('data-digitalizador');
      let perfilVerificador = element.currentTarget.getAttribute('data-verificador');
      let nomeProvincia = element.currentTarget.getAttribute('data-provincia');
      let caixaEstado = element.currentTarget.getAttribute('data-estado');
      let boxValidated = $('#box-verified')[0].checked;
      let boxReplace = nomeCaixa.replace('CX', '00');
      let boxLetter = boxReplace.match(/[A-Z]/gi);
      let letterSelect = $('select#letraCaixa option:contains("'+boxLetter[0]+'")');
      let boxNumber = boxReplace.split(`${boxLetter[0]}`)[1];

      $('#boxModalTitle').text('Editar Caixa');
      $('#add-box-form').attr('data-formType', 'edit');
      $('#add-box-form').attr('data-id', boxId);
      (document.cookie.indexOf('Administrador') !== -1) ? $('#box-verifiedOpt').removeClass('hidden')
                                                      : $('#box-verifiedOpt').addClass('hidden');

      caixaEstado === 'DIGITALIZADA' ? boxValidated = false : boxValidated = true;
      boxValidated ? setValidatedChecked() : setValidatedDisabled();

      $('#numeroCaixa').val(boxNumber);
      $('#numeroCaixa').attr('data-prev-number', boxNumber); //Set prev number for reference to update folders changed
      $('#designacaoCaixa').val(nomeCaixa)
      $('select#perfilVerificador option:contains("'+perfilVerificador+'")').prop('selected', true);
      $('select#perfilDigitalizador option:contains("'+perfilDigitalizador+'")').prop('selected', true);
      $('select#NomeProvincia option:contains("'+nomeProvincia+'")').prop('selected', true);
      letterSelect.prop('selected', true);

      $('#boxFolders').addClass('hidden');
  }

  function getVerifier() {
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

            if(document.cookie.indexOf('Administrador') !== -1){
              $("#user").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
              $("#user-province").append('<option value="' + element.Nome + '">' + element.Nome + "</option>");
            };

            //Adicionar verificadores na Modal para Criar caixas
            $("#perfilVerificador").append(
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

  function getDigitizer() {
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

            if(document.cookie.indexOf('AdminDigitalizacao') !== -1){
              $("#user").append('<option value="' +element.Nome + '">' + element.Nome +"</option>");
              $("#user-province").append('<option value="' +element.Nome + '">' + element.Nome +"</option>");
            };

            //Adicionar verificadores na Modal para Criar caixas
            $("#perfilDigitalizador").append('<option value="' + element.UtilizadorId + '">' + element.Nome +"</option>");
          });
        } else {
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }


  assignForm();
  getDigitizer();
  getVerifier();
});
