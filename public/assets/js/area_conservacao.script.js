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
