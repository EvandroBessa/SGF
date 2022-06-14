( function(window, document, jQuery) {
    $(window).on('load', function() {
        let loadingBox = $(document).find('#sgq-app-loading-page');
        let loadingBoxLogo = loadingBox.find('.sgq-lp-app-logo');
        let loadingBoxSpinner = loadingBox.find('.sgq-lp-app-spinner');

        let loadingBoxTimeOut = setTimeout(function(){

            loadingBoxLogo.removeClass('fadeInDown');
            loadingBoxLogo.addClass('fadeOutUp');

            loadingBoxSpinner.removeClass('zoomIn');
            loadingBoxSpinner.addClass('zoomOut');

            let loadingTimeOut = setTimeout(function() {
                loadingBox.addClass('loaded');
                clearTimeout(loadingTimeOut);
            }, 500);

            let loadingTimeOutHideContent = setTimeout(function() {
                loadingBox.addClass('hidden');
                clearTimeout(loadingTimeOutHideContent);
            }, 800);

            clearTimeout(loadingBoxTimeOut);
        }, 1500);
    });
})(window, document, jQuery);