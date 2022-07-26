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


  $("#add-area").on("click",function (element) {
    element.preventDefault();

    $.ajax({
        contentType: "application/json",
    type: "GET",
    url: "/areaccadastro",
    data: {},
    dataType: "json",
    success: function (response) {

        console.log("MUNICIPIOS",response[0].nome_municipio);

        if (response != undefined) {
            response.forEach((element) => {


                $("#id_municipio").append('<option value="' + element.id +'">' +element.nome_municipio +"</option>");
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
        // let formType = $('#area-form')[0].dataset.formtype;

        let UserFormData = {
          nome_area: nome_area,
          id_municipio: id_municipio,
        //   estado
        };
        // let route = $('#area-form').data('route');
        // let form  = $("#form-data").attr("action");

        // var formValues = $(this).serialize();
        // var dataString = $("#area-form").serialize();

        console.log('TESTANDO: ', nome_area);

        $.ajaxSetup({
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        $.ajax({

            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({nome_area:nome_area, id_municipio:id_municipio}) ,
            url: "/areaccadastrando",
            async: true,
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

                        $("#user-table tbody tr").remove();
                        //window.location = "/areaccadastro";

                        getUsers();
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
    });
    // Should create or update on save




//   function createAreas(UserFormData){
//     $.ajax({
//       type: "POST",
//       url: $(this).attr('action'),
//       contentType: "application/json",
//       data: JSON.stringify(UserFormData),
//       dataType: "json",
//       async: true,
//       cache: false,
//       success: function (response) {
//         console.log('TESTANDO: ', reponse);

//         if (response.mensagem != undefined) {
//           toastr.success(response.mensagem, "Cadastro da Area de Conservaçao!", {
//             showMethod: "slideDown",
//             hideMethod: "slideUp",
//             timeOut: 1000,
//             onHidden: function () {
//               //Hide modal
//               $('.btn_no').trigger('click');

//               $("#user-table tbody tr").remove();
//               getUsers();
//             },
//           });
//         } else {
//           toastr.error(response.error, "Erro!", { timeOut: 5000 });
//         }
//       },
//       error: function (response) {
//         console.log(response);
//       },
//     });
//   }





//   $("#user-form").on("submit", function (element) {
//     element.preventDefault();

//     let nome = $("#nome").val();
//     let nomeUtilizador = $("#nomeUtilizador").val();
//     let perfil = $("#perfil option:selected").val();
//     let estado = $("#estado option:selected").val();
//     let formType = $('#user-form')[0].dataset.formtype;

//     let UserFormData = {
//       nome: nome,
//       nomeUtilizador: nomeUtilizador,
//       perfil: perfil,
//       estado
//     };

//     // Should create or update on save
//     (formType === 'create') ? createUser(UserFormData) : updateUser(UserFormData);

//   });

//   function createUser(UserFormData){
//     $.ajax({
//       type: "POST",
//       url: "/auth/signup",
//       contentType: "application/json",
//       data: JSON.stringify(UserFormData),
//       dataType: "json",
//       async: true,
//       cache: false,
//       success: function (response) {
//         console.log();

//         if (response.mensagem != undefined) {
//           toastr.success(response.mensagem, "Cadastro do Utilizador!", {
//             showMethod: "slideDown",
//             hideMethod: "slideUp",
//             timeOut: 1000,
//             onHidden: function () {
//               //Hide modal
//               $('.btn_no').trigger('click');

//               $("#user-table tbody tr").remove();
//               getUsers();
//             },
//           });
//         } else {
//           toastr.error(response.error, "Erro!", { timeOut: 5000 });
//         }
//       },
//       error: function (response) {
//         console.log(response);
//       },
//     });
//   }

//   function updateUser(UserFormData){
//     UserFormData.id = $('#edit-userId').val();

//     $.ajax({
//       type: "POST",
//       url: "/auth/update",
//       contentType: "application/json",
//       data: JSON.stringify(UserFormData),
//       dataType: "json",
//       async: true,
//       cache: false,
//       success: function (response) {
//         console.log('atualizado, ', response);

//         if (response.mensagem != undefined) {
//           toastr.success(response.mensagem, "Atualização do Utilizador!", {
//             showMethod: "slideDown",
//             hideMethod: "slideUp",
//             timeOut: 1000,
//             onHidden: function () {

//               $('.btn_no').trigger('click');

//               $("#user-table tbody tr").remove();
//               getUsers();
//             },
//           });
//         } else {
//           toastr.error(response.error, "Erro!", { timeOut: 5000 });
//         }
//       },
//       error: function (response) {
//         console.log(response);
//       },
//     });
//   }


  $(".add-doc-type").on("click", function (element) {
    let depId = element.currentTarget.getAttribute("data-id");
    let depName = element.currentTarget.getAttribute("data-name");

    $("#codigo_departamento").val(depId);
    $("#depa").val(depName);

    $("#doc-type-form").on("submit", function (element) {
      element.preventDefault();

      let DocTypeFormData = {
        designacao: $("#doc_type_name").val(),
        codigo_departamento: $("#codigo_departamento").val(),
      };

      console.log("DATA FORM", DocTypeFormData);

      $.ajax({
        type: "POST",
        url: "/create-document-type",
        contentType: "application/json",
        data: JSON.stringify(DocTypeFormData),
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {
          console.log("🚀 TYPE OF DOC", response);

          if (response.documentType != undefined) {
            toastr.success(response.mensagem, "Adicionar Tipo Documento!", {
              showMethod: "slideDown",
              hideMethod: "slideUp",
              timeOut: 1000,
              onHidden: function () {
                window.location.reload();
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
    });
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

  function getUsers() {
    // const isAdmin = (document.cookie.indexOf('Administrador') !== -1);

    // isAdmin ? getVerifierUsers() : getDigitizerUsers();
    console.log(" Primeiro Passo... ");

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
      success: function (response) {

        console.log("VERRRRRRR",response);

        if (response) {
          let users = [];

          destroyTable();

          response.map((user, index) => {
            let editBtn = `<i class="ft-edit edit-user" data-id="${user.id}" data-name="${user.nome_area}" data-username="${user.nome_provincia}"
                            data-profile="${user.nome_municipio}" data-status="${user.id}" data-toggle="modal" data-target="#xlarge-user" title="Editar"></i>`;

            users.push({user, editBtn});
          });

          renderTable(users);

          //editUser();
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
                          return row.editPwdBtn
                        else
                          return row.editBtn+' '+row.editPwdBtn;
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
                  $('td', row).eq(3).html(`<span class="position-relative badge badge-success badge-pill ml-2">${Estado}</span>`);

                // off('click') to prevent function from being fired multiple times
                $('td', row).eq(4).children('i.ft-lock').off('click').on('click', function(element){
                  let username = $(this).data('username');

                  // remove any previous username appended
                  $('#user-to-change').remove();

                  // add new username to be edited
                  $('#pwd-form').append('<input type="hidden" name="user-to-change" id="user-to-change" value="'+username+'"/>');
                }); // Edit password click event
              }
            });
  }

  function destroyTable(){
    let areaTable = $('#area-table').DataTable();

    areaTable.destroy();
  }







  function resetUserModal(){
    $('#addUser-modal').on('click', function(){
      $('#userForm-title').text('Adicionar Utilizador');
      $('#edit-userId').remove();
      $('select#perfil option:contains("Escolha")').prop('selected',true);
      $('select#estado option:contains("Escolha")').prop('selected',true);
      $('#user-form')[0].dataset.formtype = 'create';
      $('#user-form')[0].reset();
  
    });
  }


  console.log("COOKIE: ",document.cookie.indexOf('administrador'));

  if((document.cookie.indexOf('Administrador') == -1) || (document.cookie.indexOf('AdminDigitalizacao') !== -1)) {

    console.log("Estou dentro: ");
    getUsers();
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
