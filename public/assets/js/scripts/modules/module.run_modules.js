/**
 * @source Sigarq ECM
 * @version 1.0.0
 * @name module.run_modules.js
 * @description Inicializa todos os módulos script da aplicação
 * @author ©Interdigitos, Lda. - Euclides Dry'C - erosario@intergigitos.co.ao
 * @author: https://www.linkedin.com/in/euclidesdry/
 */

(function(window, document, $) {
    $(window).on('load', function() {
        // Inicializando a Pesquisa Global
        $.sigarq.header.globalSearchBar.init({
            hideForNonAdmin: true
        });

        // $.sigarq.header.globalSearchBar.open();
    });
})(window, document, jQuery);