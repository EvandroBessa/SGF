$(function () {

    toastr.options = {
        positionClass: "toast-top-center",
        showMethod: "slideDown",
        hideMethod: "slideUp",
        closeMethod: "slideUp",
        showDuration: 200,
    };

    $("#register-animal").on("click", function () {

        $("#animal-container").removeClass("hidden");
        $("#area-container").addClass("hidden");
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
        url: "/especielistar",
        data: {},
        dataType: "json",
        async: true,
        cache: false,
        success: function (response) {
            if (response != undefined) {
                response.forEach((element) => {
                    $("#especie").append('<option value="' + element.id +'">' +element.nome_especie +"</option>");
                });
            }
        },
            error: function (response) {
            console.log(response);
        },

    });


    $("#animal-form").on("submit",function (element) {
        element.preventDefault();

        let nome_cientifico = $("#nome_area").val();
        let id_municipio = $("#id_municipio option:selected").val();
        // let estado = $("#estado option:selected").val();
         let formType = $('#area-form')[0].dataset.formtype;

        let AreaFormData = {
          nome_area: nome_area,
          id_municipio: id_municipio,
        };

        (formType === 'create') ? createAanimal(AreaFormData) : updateAnimal(AreaFormData);
    });

    function createAnimal(AreaFormData){

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

});
