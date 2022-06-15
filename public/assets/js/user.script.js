$(function () {

  $("#register-user").on("click", function () {

    $("#user-container").removeClass("hidden");
    $("#box-row").addClass("hidden");

    // $("#box-container").addClass("hidden");
    // $('#userStatsContainer').addClass('hidden');
    // $('#provinceStatsContainer').addClass('hidden');
    // $('#globalGraphContainer').addClass('hidden');
    // $('#monthlyStatsContainer').addClass('hidden');
    // $('#monthlyUserStatsContainer').addClass('hidden');
    // $('#provinceUserStatsContainer').addClass('hidden');

  });

  function getProfiles() {

    $.ajax({
      type: "GET",
      url: "/get-profile",
      contentType: "application/json",
      data: {},
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {

        if (response.perfis != undefined) {
          response.perfis.forEach((element) => {
            const isAdminDigitalizacao = (document.cookie.indexOf('AdminDigitalizacao') !== -1) && (element.Designacao === 'AdminDigitalizacao' || element.Designacao === 'Digitalizador');
            const isAdminVerificacao = (document.cookie.indexOf('Administrador') !== -1) && (element.Designacao === 'Administrador' || element.Designacao === 'Verificador');

            if(isAdminDigitalizacao){
              $("#perfil").append('<option value="' + element.PerfilUtilizadoresId +'">' +element.Designacao +"</option>");
            }else if(isAdminVerificacao){
              $("#perfil").append('<option value="' + element.PerfilUtilizadoresId +'">' +element.Designacao +"</option>");
            }

          });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }

  $("#user-form").on("submit", function (element) {
    element.preventDefault();

    let nome = $("#nome").val();
    let nomeUtilizador = $("#nomeUtilizador").val();
    let perfil = $("#perfil option:selected").val();
    let estado = $("#estado option:selected").val();
    let formType = $('#user-form')[0].dataset.formtype;

    let UserFormData = {
      nome: nome,
      nomeUtilizador: nomeUtilizador,
      perfil: perfil,
      estado
    };

    // Should create or update on save
    (formType === 'create') ? createUser(UserFormData) : updateUser(UserFormData);

  });

  function createUser(UserFormData){
    $.ajax({
      type: "POST",
      url: "/auth/signup",
      contentType: "application/json",
      data: JSON.stringify(UserFormData),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {
        console.log();

        if (response.mensagem != undefined) {
          toastr.success(response.mensagem, "Cadastro do Utilizador!", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 1000,
            onHidden: function () {
              //Hide modal
              $('.btn_no').trigger('click');

              $("#user-table tbody tr").remove();
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
  }

  function updateUser(UserFormData){
    UserFormData.id = $('#edit-userId').val();

    $.ajax({
      type: "POST",
      url: "/auth/update",
      contentType: "application/json",
      data: JSON.stringify(UserFormData),
      dataType: "json",
      async: true,
      cache: false,
      success: function (response) {
        console.log('atualizado, ', response);

        if (response.mensagem != undefined) {
          toastr.success(response.mensagem, "Atualização do Utilizador!", {
            showMethod: "slideDown",
            hideMethod: "slideUp",
            timeOut: 1000,
            onHidden: function () {

              $('.btn_no').trigger('click');

              $("#user-table tbody tr").remove();
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
  }


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

    getAllUsers();

  }



  function getAllUsers() {
    $.ajax({
      type: "GET",
      url: "{{route('contalistar')}}",
      data: {},
      dataType: "json",
      success: function (response) {

        console.log("VERRRRRRR",response);

        if (response.user) {
          let users = [];

          destroyTable();

          response.user.map((user, index) => {
            let editBtn = `<i class="ft-edit edit-user" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                            data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#xlarge-user" title="Editar"></i>`;
            let editPwdBtn = `<i class="ft-lock edit-pwd ml-1" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                            data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#edit-pwd" title="Alterar Senha"></i>`;

            users.push({user, editBtn, editPwdBtn});
          });

          renderTable(users);

          editUser();
        }
      },error: function (error) {
        var timerErrorMessage = setTimeout(function () {
            setLoadingStatusMessage('Erro: Aplicação Offline!');
            clearTimeout(timerErrorMessage);
        }, timerDuration);

        var timer = setTimeout(function () {
            hideLoadingStatus();
            clearTimeout(timer);
        }, timerDuration * 2);

        toastr.error("Ocorreu um erro no Sistema, por favor, contacte a assistência técnica para a melhor resolução do provlema.", "Uupppps!", { timeOut: 10000 });
        console.log("error: ", error);
    }
    });
  }



  function getDigitizerUsers() {
    $.ajax({
      type: "GET",
      url: "/get-digitizer-users",
      data: {},
      dataType: "json",
      success: function (response) {
        if (response.user) {
          let users = [];

          destroyTable();

          response.user.map((user, index) => {
            let editBtn = `<i class="ft-edit edit-user" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                            data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#xlarge-user" title="Editar"></i>`;

            let editPwdBtn = `<i class="ft-lock edit-pwd ml-1" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                              data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#edit-pwd" title="Alterar Senha"></i>`;

            users.push({user, editBtn, editPwdBtn});
          });

          renderTable(users);

          editUser();
        }
      },
    });
  }

  function getVerifierUsers() {
    $.ajax({
      type: "GET",
      url: "/get-verifier-users",
      data: {},
      dataType: "json",
      success: function (response) {

        if (response.user) {
          let users = [];

          destroyTable();

          response.user.map((user, index) => {
            let editBtn = `<i class="ft-edit edit-user" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                            data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#xlarge-user" title="Editar"></i>`;
            let editPwdBtn = `<i class="ft-lock edit-pwd ml-1" data-id="${user.UtilizadorId}" data-name="${user.Nome}" data-username="${user.NomeUtilizador}"
                            data-profile="${user.Designacao}" data-status="${user.Estado}" data-toggle="modal" data-target="#edit-pwd" title="Alterar Senha"></i>`;

            users.push({user, editBtn, editPwdBtn});
          });

          renderTable(users);

          editUser();
        }
      },
    });
  }

  function renderTable(data){
    return $('#user-table').DataTable({
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
                  { "data": "user.Nome" },
                  { "data": "user.NomeUtilizador" },
                  { "data": "user.Designacao" },
                  { "data": "user.Estado" },
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
    let userTable = $('#user-table').DataTable();

    userTable.destroy();
  }

  $("#logout").on('click', function () {

        $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/logout",
        data: {},
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {

            response.mensagem !== "Saiu da aplicação" ? messagesDiv.text(response.error) : window.location = "/login";
        },
        error: function (response) {
            console.log("error: ", response)
        }
    });

  });

  function changePassword(){
    $('#pwd-form').on('submit', function(element){
      element.preventDefault();
      const pwd = $('#password').val();
      const pwdConfirm = $('#confirm-pwd').val();
      const userToChange = $('#user-to-change').val();
      const isAdminChangingUserPassword = (userToChange !== undefined);
      const username = isAdminChangingUserPassword ? userToChange : $('#logged-user')[0].dataset.user;

      if(pwd === pwdConfirm){
        $.ajax({
          type: "PUT",
          url: "/auth/update/pwd/"+username,
          data: {pwd},
          dataType: "json",
          success: function (response) {

            if (response.mensagem !== undefined && response.mensagem[0] === 1) {
              toastr.success('Senha atualizada', "Atualização de Senha!", {
                showMethod: "slideDown",
                hideMethod: "slideUp",
                timeOut: 1000,
                onHidden: function () {

                  $('.closeModal').trigger('click');
                  $('#pwd-form')[0].reset();

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
      }else{
        toastr.error("Por favor, confirme a sua senha.", "Erro!", { timeOut: 3000 });
      }
    });
  }

  function editUser(){

    $('.edit-user').on('click', function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let username = $(this).data('username');
        let profile = $(this).data('profile');
        let status = $(this).data('status');
        $('#user-form')[0].dataset.formtype = 'edit';

        $('#nome').val(name);
        $('#nomeUtilizador').val(username);
        $("select#perfil option").filter(function() {
          //may want to use $.trim in here
          return $(this).text() == profile;
        }).attr('selected', true);

        $("select#estado option").filter(function() {
          //may want to use $.trim in here
          return $(this).text() == status;
        }).attr('selected', true);

        $('#edit-userId').remove();
        $('#userForm-title').text('Editar Utilizador');
        // $("#user-form").attr('data-formType', 'edit');
        $('#user-form').append(`<input type="hidden" id="edit-userId" name="edit-UserId" value="${id}"/>`);

    });

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

  if((document.cookie.indexOf('Administrador') !== -1) || (document.cookie.indexOf('AdminDigitalizacao') !== -1)) {
    getUsers();
  }

  $('.pwd-close-modal').on('click', function(){
    // remove user to change from modal on close
    $('#user-to-change').remove();

    $('#pwd-form')[0].reset(); //reset form values
  });

  // Invoke functions
  getProfiles();
  changePassword();
  resetUserModal();
}); //ONLOAD END
