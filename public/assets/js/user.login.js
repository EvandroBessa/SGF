/**
 * @version 1.0.0
 * @author Evandro Bessa" [emarciobessa@gmail.com]
 * @source User Login JS File
 */

$(document).ready(function () {

    toastr.options = {
        positionClass: "toast-top-center",
        showMethod: "slideDown",
        hideMethod: "slideUp",
        closeMethod: "slideUp",
        showDuration: 200,
    };

    $("#login-form").submit(function(event) {
        event.preventDefault();

        let timerDuration = 2000;
        let loginFormData = {
            email: $("#user-name").val(),
            password: $("#user-password").val()
        };

        // Exec Func
        showLoadingStatus();

        $.ajax({

            type: "POST",
            contentType: "application/json",
            url: $(this).attr('action'),
            data: JSON.stringify(loginFormData),
            dataType: "json",
            async: true,
            cache: false,
            success: function (response) {

                if (response.success) {
                    var timerChangeMessage = setTimeout(function () {
                        toastr.success(response.mensagem, "Tudo Certo!", { timeOut: 1500 });
                        setLoadingStatusMessage('Tudo Pronto, Entrando...');
                        clearTimeout(timerChangeMessage);
                    }, timerDuration);
                    let dados =response.data;
                    var timerLogin = setTimeout(function () {
                        window.location = "/welcome/${dados}";
                        clearTimeout(timerLogin);
                    }, timerDuration * 2);
                } else {

                    // console.log("Que erro  e: ",response);
                    var timerErrorMessage = setTimeout(function () {
                        toastr.error(response.message, { timeOut: 5000 });
                        setLoadingStatusMessage('Erro, Cancelando...');
                        clearTimeout(timerErrorMessage);
                    }, 1000);

                    var timer = setTimeout(function () {
                        hideLoadingStatus();
                        clearTimeout(timer);
                    }, timerDuration * 1.2);
                }
            },
            error: function (error) {
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
    });

    const showLoadingStatus = function() {
        // Status Box
        $('.sgq-loading-status').removeClass('d-none');
        $('.sgq-loading-status').addClass('d-flex');
        // Login Button
        $('.sgq-login-button').attr('disabled', 'disabled');
        setLoadingStatusMessage('Autenticando...');
    };

    const hideLoadingStatus = function() {
        // Status Box
        $('.sgq-loading-status').removeClass('d-flex');
        $('.sgq-loading-status').addClass('d-none');
        // Login Button
        $('.sgq-login-button').removeAttr('disabled');
    };

    const setLoadingStatusMessage = function(message='') {
        if(message && message != '')
            $('.sgq-loading-status').find('.sgq-ls-text').text(message);
        else
            $('.sgq-loading-status').find('.sgq-ls-text').text('Autenticando...');
    }
});
