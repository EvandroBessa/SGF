
(function(window, document, $) {
    $(window).on('load', function() {
        // selectors
        let sgqAppNavbar = $(document).find('#sgq-app-navbar'),
            sgqNavSection = $(document).find('[sgq-data-navbar-section]');

        // Inicializando o Módulo Header
        // $.sigarq.navbar = {
        //     open: {
        //         section: (sectionName) => {
        //             let selectedTrigger = $(`[sgq-data-navbar-section="${sectionName}"]`);
        //             console.log(selectedTrigger)
        //             console.log('selectedTrigger',1 selectedTrigger1)
        //         }
        //     },
        // };
    });
})(window, document, jQuery);