$(function () {

    toastr.options = {
        positionClass: "toast-top-center",
        showMethod: "slideDown",
        hideMethod: "slideUp",
        closeMethod: "slideUp",
        showDuration: 200,
    };


  $("#register-area").on("click", function () {

    $("#area-container").removeClass("hidden");
    $("#user-container").addClass("hidden");
    $("#box-row").addClass("hidden");
    $("#box-container").addClass("hidden");
    $('#userStatsContainer').addClass('hidden');
    $('#provinceStatsContainer').addClass('hidden');
    $('#globalGraphContainer').addClass('hidden');
    $('#monthlyStatsContainer').addClass('hidden');
    $('#monthlyUserStatsContainer').addClass('hidden');
    $('#provinceUserStatsContainer').addClass('hidden');
    $("#animal-container").addClass("hidden");


  });



        $.ajax({
            contentType: "application/json",
            type: "GET",
            url: "/areaccadastro",
            data: {},
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {
                if (response != undefined) {
                    response.forEach((element) => {
                        $("#id_provincias").append('<option value="' + element.id +'">' +element.nome_provincia +"</option>");
                    });
                }
            },
                error: function (response) {
                console.log(response);
            },

        });


    $("#id_provincias").on("change",function (element) {
        element.preventDefault();
        let id_provincia = $("#id_provincias option:selected").val();

        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            contentType: "application/json",
            type: "POST",
            url: "/cadastroarea",
            data: JSON.stringify({id_provincia:id_provincia}),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {

                $('#id_municipio').children('option:not(:first)').remove();

                if (response != undefined) {

                    response.forEach((element) => {
                        $("#id_municipio").append('<option  value="' + element.id +'">' +element.nome_municipio +"</option>");
                    });
                }
                },
                error: function (response) {
                console.log(response);
                },

        });
    });


  //Evento para cadastro de areas de conservaçao
  $("#area-form").on("submit",function (element) {
        element.preventDefault();

        let nome_area = $("#nome_area").val();
        let id_municipio = $("#id_municipio option:selected").val();
        // let estado = $("#estado option:selected").val();
         let formType = $('#area-form')[0].dataset.formtype;

        let AreaFormData = {
          nome_area: nome_area,
          id_municipio: id_municipio,
        };

        (formType === 'create') ? createArea(AreaFormData) : updateArea(AreaFormData);
    });

    function createArea(AreaFormData){

        $.ajaxSetup({
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(AreaFormData) ,
            url: "/areaccadastrando",
            async: true,
            cache: false,
            success: function (response) {
                console.log('TESTANDO: ', response);

                if (response) {
                    toastr.success(response.mensagem, "Cadastro da Area de Conservaçao!", {
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    timeOut: 1000,
                    onHidden: function () {
                        //Hide modal
                        $('.btn_no').trigger('click');

                        $("#area-table tbody tr").remove();
                        getAreas();
                    },

                    });
                } else {
                    toastr.error(response.error, "Erro!", { timeOut: 5000 });
                }
            },
            error: function (response) {
            console.log(response);
            },
        });
    }
    // Should create or update on save


    function updateArea(AreaFormData){
        AreaFormData.id = $('#edit-areaId').val();

        $.ajaxSetup({
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
          type: "POST",
          url: "/updatearea",
          contentType: "application/json",
          data: JSON.stringify(AreaFormData),
          dataType: "json",
          async: true,
          cache: false,
          success: function (response) {
            console.log('atualizado, ', response);

            if (response) {
              toastr.success(response.mensagem, "Atualização da Area de Conservacao!", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 1000,
                onHidden: function () {

                  $('.btn_no').trigger('click');

                  $("#area-table tbody tr").remove();
                  getAreas();
                },
              });
            } else {
              toastr.error(response.error, "Erro!", { timeOut: 5000 });
            }
          },
          error: function (response) {
            console.log(response);
          },
        });
      }


      $('.pwd-close-modal').on('click', function(){
        // remove user to change from modal on close
        // $('#user-to-change').remove();

        $('#area-form')[0].reset(); //reset form values
      });


  function validateForm() {
    if (nome.val() == "" && nomeUtilizador.val() == "" && perfil.val() == "") {
      alert("here");
    } else {
      alert("else");
      nome.val() === ""
        ? $("#user-form").append('<span class"text-red">test</span>')
        : nome.closest("span").remove();
    }
  }

  function getAreas() {

    getAllAreas();

  }

  function getAllAreas() {

    console.log("Segundo Passo");
    $.ajax({
        contentType: "application/json",
      type: "GET",
      url: "/arealistar",
      data: {},
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {

        if (response) {
          let users = [];

          destroyTable();

          response.map((user, index) => {
            let editBtn = `<i class="ft-edit edit-area" data-id="${user.id}" data-name="${user.nome_area}" data-username="${user.nome_provincia}"
                            data-profile="${user.nome_municipio}" data-status="${user.id}" data-toggle="modal" data-target="#xlarge-area" title="Editar"></i>`;


            users.push({user, editBtn});

            // users.push({user, editBtn});
          });

          renderTable(users);

          //editArea();
        }
      },
      error: function (response) {
        console.log(response);
      }

    });
  }



  function renderTable(data){
    return $('#area-table').DataTable({
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
              "data": data,
              "columns": [
                  { "data": "user.nome_area" },
                  { "data": "user.nome_provincia" },
                  { "data": "user.nome_municipio" },
                  { "data": "user.id" },
                  { "data": null,
                    render: function(data, type, row, meta)
                    {
                        const { Nome } = row.user;

                        if(Nome === "Teste")
                          return row.editBtn
                        else
                          return row.editBtn
                    }
                  }
              ],
              "columnDefs": [
                {"className": "dt-center", "targets": [4]},
                { "orderable": false, "targets": [4] }
              ],
              "rowCallback": function( row, data ) {
                const { Estado } = data.user;

                if(Estado === 'Inactivo')
                  $('td', row).eq(3).html(`<span class="position-relative badge badge-danger badge-pill ml-2">${Estado}</span>`);
                else
                  $('td', row).eq(3).html(`<span class="position-relative badge badge-success badge-pill ml-2"> Livre </span>`);

                // off('click') to prevent function from being fired multiple times
                $('td', row).eq(4).children('i.ft-edit').off('click').on('click', function(element){
                  let nome_area = $(this).data('name');


                  // remove any previous username appended
                  //$('#user-to-change').remove();

                  // add new username to be edited
                  $('#area-form').append('<input type="hidden" name="user-to-change" id="user-to-change" value="'+nome_area+'"/>');

                  editArea(data);
                }); // Edit password click event
              }
            });
  }



  function editArea(element){
        let id = element.user.id;
        let name = element.user.nome_area;
        let username = element.user.nome_provincia;
        let profile = element.user.nome_municipio;
        let status = $(this).data('status');
        $('#area-form')[0].dataset.formtype = 'edit';

        $('#nome_area').val(name);
        $("select#id_provincias option").filter(function() {
            //may want to use $.trim in here
            return $(this).text() == username;
          }).attr('selected', true);
        $("select#id_municipio option").filter(function() {
          //may want to use $.trim in here
          return $(this).text() == profile;
        }).attr('selected', true);

        $('#edit-areaId').remove();
        $('#areaForm-title').text('Editar Arae de Conservaçao');
        // $("#user-form").attr('data-formType', 'edit');
        $('#area-form').append(`<input type="hidden" id="edit-areaId" name="edit-areaId" value="${id}"/>`);
  }

  function destroyTable(){
    let areaTable = $('#area-table').DataTable();

    areaTable.destroy();
  }



  $("#list-area").on("click",function (element) {

    $("#box-row").removeClass("hidden");
    $("#area-container").addClass("hidden");
    $("#user-container").addClass("hidden");
    $("#box-container").addClass("hidden");
    $('#userStatsContainer').addClass('hidden');
    $('#provinceStatsContainer').addClass('hidden');
    $('#globalGraphContainer').addClass('hidden');
    $('#monthlyStatsContainer').addClass('hidden');
    $('#monthlyUserStatsContainer').addClass('hidden');
    $('#provinceUserStatsContainer').addClass('hidden');
    $("#animal-container").addClass("hidden");

    $.ajax({
        type: "GET",
        url: "/arealistar",
        contentType: "application/json",
        data: JSON.stringify(),
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {

            if(response != undefined){
                home.clearDiv('accordionCryptoTypes');
                // Clear details div
                home.clearDiv('details_div');
                home.addDiv('details_div', 'details');

                //Total de areas de conservaçao
                response.length ? $('#totalProvince').text(response.length) : $('#totalProvince').text('');

                response.forEach((box, index) => {

                    home.addDiv('accordionCryptoTypes', 'area_boxes');
                    $('#area_boxes').append(appendAreaBoxes(box, index));
                });

                home.addScroll('accordionCryptoTypes');

            }else{

                home.clearDiv('accordionCryptoTypes');
                home.addDiv('accordionCryptoTypes', 'province_boxes');

                $document.find('#area_boxes').append(response.error);
                // toastr.warning('Não existe(m) Areas(s) Criadas', 'Aviso!', { "timeOut": 5000 });
            }

            home.clearDiv('accordionCrypto');
            home.clearDiv('accordionCryptoDocs');
            home.clearDiv('iframeMain');
        },
        error: function (response) {
            console.log(response)
        }
    });

});


function appendAreaBoxes(box, index){

    //Append remove button if admin
    let btnRemove = document.cookie.indexOf('Administrador') !== -1 ?
                            "<div class='remove-box-btn mt-1 ml-1' >"+
                                "<i class='ft-trash-2 remove-box danger' data-id='"+box.id+"' data-toggle='modal' data-target='#confirm' title='Remover'  style='font-size: 25px;'></i>"
                            + "</div>"
                            : "";

    let boxData =   "<div class='box_div' id='box_"+box.id+"' style='display: flex; justify-content: space-between;'>"+
                        "<div  class='card accordion collapse-icon accordion-icon-rotate box-card w-100' data-id="+box.id+" data-name='"+box.nome_area+"''>"+
                            "<a id='heading31' data-toggle='collapse' href='#accordionBTC"+index+"' aria-expanded='true' aria-controls='accordionBTC"+index+"' class='card-header bg-success bg-gradient p-1 bg-lighten-1'>"+
                                "<div class='card-title lead white'>"+ box.nome_area +"</div>"+
                            "</a>"+
                            "<div id='accordionBTC"+index+"' role='tabpanel' data-parent='#accordionCryptoTypes' aria-labelledby='heading31' class='collapse' aria-expanded='true'>"+
                                "<div id='folder_div"+box.id+"'>" +
                                    "<div id='folders"+box.id+"'></div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"
                    _handleBoxCardClick(box);
    return boxData;
}



function _handleBoxCardClick(element) {

    console.log("DDDDDDDDDDDD",element);

    let boxId = element.id;
    let boxName = element.nome_area;
    let boxIdentifier = boxName.split('CX0000');

    $document.find('#form-validate').attr('data-form-val', boxName);

    // Clear search input and content
    $document.find('#accordionCrypto').children('div').remove();
    $document.find('#docSearch').val('');

    $.ajax({
        type: "GET",
        url: "/area-animal/" + boxId + "",
        contentType: "application/json",
        data: JSON.stringify(),
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {

           console.log('Animais: ', response);
          if (response.length=== 1) {

            home.clearDiv('folder_div' + boxId + '');
            home.addDiv('folder_div' + boxId + '', 'folders' + boxId + '');

            localStorage.setItem('boxName', boxName);


            response.forEach((pasta, index) => {

              $('#folders' + boxId + '').append(
                "<div class='card-content folderList' data-id='" + pasta.id + "' data-name='" + pasta.nome_vulgar + "' data-folder='" + pasta.nome_vulgar + "'>" +
                  "<div class='card-body p-0'>" +
                    "<div class='media-list list-group' id='box_content'>" +
                        "<div class='list-group-item list-group-item-action media p-1'>" +
                          "<a href='#' class='media-link'>" +
                            "<div class='media-left'>" +
                              "<p class='text-bold-600 m-0' id='box_name'>" + pasta.nome_vulgar + "</p>" +
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

            $document.find('#folders' + boxId).append(`<h1>Não existe(m) Animais(s) nesta Area de Conservaçao</h3>`);
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

};




  function resetUserModal(){
    $('#addArea-modal').on('click', function(){
      $('#areaForm-title').text('Cadastrar Area de Conservaçao');
      $('#edit-areaId').remove();
      $('select#id_provincias option:contains("Selecione")').prop('selected',true);
      $('select#id_municipio option:contains("Selecione")').prop('selected',true);
      $('#area-form')[0].dataset.formtype = 'create';
      $('#area-form')[0].reset();

    });
  }


  console.log("COOKIE: ",document.cookie.indexOf('administrador'));

  if((document.cookie.indexOf('Administrador') == -1) || (document.cookie.indexOf('AdminDigitalizacao') !== -1)) {
    getAreas();
  }

  $('.pwd-close-modal').on('click', function(){
    // remove user to change from modal on close
    $('#user-to-change').remove();

    $('#pwd-form')[0].reset(); //reset form values
  });

  // Invoke functions
//   getProfiles();
  // changePassword();
  resetUserModal();
}); //ONLOAD END
