
(function(window, document, $) {
    $(window).on('load', function() {
        // Inicializando a Pesquisa Global
        $.sigarq.header.globalSearchBar.init({
            hideForNonAdmin: true
        });

        // $.sigarq.header.globalSearchBar.open();
    });
})(window, document, jQuery);