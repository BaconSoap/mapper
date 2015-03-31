declare var jQuery: any;
jQuery(function () {
    jQuery('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            jQuery.each(data.result.files, function (index, file) {
                jQuery('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });
});
