/**
 * @source Sigarq ECM
 * @version 1.0.0
 * @name module.routes.js
 * @description Inicializa todos os módulos script da aplicação
 * @author ©Interdigitos, Lda. - Euclides Dry'C - erosario@intergigitos.co.ao
 * @author: https://www.linkedin.com/in/euclidesdry/
 */

(function(window, document, $) {
    $(window).on('load', function() {
        // selectors

        // Inicializando o Módulo Header
        $.sigarq.routes = {
            getCurrent: () => {
                return true;
            },
        };
    });
})(window, document, jQuery);