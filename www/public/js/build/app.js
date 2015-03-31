jQuery(function () {
    jQuery('#fileupload').fileupload({
        dataType: 'json',
        done: function (e) {
            jQuery('#fileupload').after('file uploaded');
        }
    });
});
