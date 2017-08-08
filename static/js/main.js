(function(Webapp, $, undefined) {
    Webapp.resolveMethodName = function(string) {
        // splitting the strings at dots to be able to resolve method names in namespaces
        // setting Pointer to window to be in the root of namespaces
        try {
            var data = string.split('.');
            var pointer = window;
            $.each(data, function(key, value) {
                // for every namespace or method of the callback set the pointer on it
                pointer = pointer[value];
            });
            // if the last part of the namespace points to a function, set it as the callback
            if (typeof pointer === 'function') {
                return pointer;
            }
        } catch (e) {
            // given callback method is invalid
        }
        return function() {};
    };

    Webapp.resolveObjName = function(string) {
        // splitting the strings at dots to be able to resolve method names in namespaces
        // setting Pointer to window to be in the root of namespaces
        try {
            var data = string.split('.');
            var pointer = window;
            $.each(data, function(key, value) {
                // for every namespace or method of the callback set the pointer on it
                pointer = pointer[value];
            });
            // if the last part of the namespace points to a function, set it as the callback
            if (typeof pointer === 'object') {
                return pointer;
            }
        } catch (e) {
            // given callback method is invalid
        }
        return function() {};
    };

    Webapp.toastr_opts = {
        closeButton: true,
        closeHtml: '<button><span class="fa fa-times"></span></button>',
        positionClass: 'toast-top-left',
        hideDuration: 300
    };

    Webapp.register_api_forms = function($element) {
        $element.find('.api-form').off('submit').on('submit', function (e) {
            e.preventDefault();
            var $form = $(this);
            $form.find('.btn-primary').addClass('disabled');
            var data = new FormData(this);
            data.append('_method', $form.attr('method'));
            var successCallback = Webapp.resolveMethodName($(this).attr('data-success-callback'));
            Webapp.api_post($form.attr('action'), data, successCallback, $form);
            $form.find('.btn-primary').removeClass('disabled');
        }).find('input').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(this).submit();
            }
        });
        $element.find('.api-form').find('input, select').off('change').on('change', function() {
            var $form = $(this).closest('form');
            var $input = $(this);
            $form.find('.form-group[data-dependent-on="'+$(this).attr('name')+'"]').each(function() {
                if ($(this).attr('data-dependent-value') == "" && $input.val() != "") {
                    $(this).removeClass('hide');
                } else if ($(this).attr('data-dependent-value') == "" && $input.val() == "") {
                    $(this).addClass('hide');
                } else if ($(this).attr('data-dependent-value') == $input.val()) {
                    $(this).removeClass('hide');
                } else {
                    $(this).addClass('hide');
                }
            });
        });
        $element.find('.typeahead input').off('keypress').on('keypress', function(e) {
            if (e.which == 13 || $(this).val().length > 2) {
                Webapp.typeahead($(this).attr('data-model'), $(this).val(), $(this));
            }
        });
        $element.find('.api-form .btn-submit').off('click').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.api-form').submit();
        });

        $element.find('.dropzone').each(function () {
            Webapp.registerDropZone($(this));
        });
    };

    Webapp.registerDropZone = function($dropzone) {
        var $droplist = $dropzone.closest('.dropzone-wrapper').find('.dropzone-upload-list');
        var dropzone = $dropzone[0];
        var ooleft = $dropzone.offset().left;
        var ooright = $dropzone.outerWidth() + ooleft;
        var ootop = $dropzone.offset().top;
        var oobottom = $dropzone.outerHeight() + ootop;
        var mouseOverClass = "dragover";
        if ($dropzone.data('currentInputFile') === undefined) {
            var $input = $dropzone.find('input');
            var inputName = $input.attr('name');
            $input.remove();
            var $newInput = $('<input type="file" name="'+inputName+'" multiple="multiple" />');
            $dropzone.append($newInput);
            $dropzone.data('currentInputFile', $newInput);
        }

        var $btn = $dropzone.closest('.dropzone-wrapper').find('.dropzone-button');
        $btn.off('click').on('click', function(e) {
            e.preventDefault();
            $dropzone.data('currentInputFile').click();
        });
        // dropzone.parentNode.innerHTML += '';
        dropzone.addEventListener("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $dropzone.addClass(mouseOverClass);
            var x = e.pageX;
            var y = e.pageY;

            $dropzone.data('currentInputFile').offset({top: y - 10, left: x - 10});

        }, true);
        dropzone.addEventListener("dragleave", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $dropzone.removeClass(mouseOverClass);
        }, true);

        dropzone.addEventListener("drop", function (e) {
            $dropzone.removeClass(mouseOverClass);
        }, true);

        $('.delete-file').off('click').on('click', function(e) {
            e.preventDefault();
            var $file = $(this).closest('.file-wrapper');
            $file.append($('<input type="hidden" name="'+$file.attr('data-name')+'" value="'+$file.attr('data-value')+'">'));
            $(this).addClass('hide');
            $file.css('text-decoration', 'line-through');
            $file.find('.undo-delete-file').removeClass('hide');
        });

        $('.undo-delete-file').off('click').on('click', function(e) {
            e.preventDefault();
            var $file = $(this).closest('.file-wrapper');
            $file.css('text-decoration', 'none');
            $file.find('input[type=hidden]').remove();
            $file.find('.delete-file').removeClass('hide');
            $(this).addClass('hide');
        });

        $dropzone.data('currentInputFile').on('change', function(e) {
            var $input = $(this);
            var inputName = $(this).attr('name');
            $(this).addClass('hide');
            $dropzone.find('input[type=file]').each(function() {
                var $currentInput = $(this);
                var $listitem = $('<li class="gray-bg upload-file-wrapper"><a href="#" class="text-danger pull-right undo-upload"><span class="fa fa-trash"></span></a></li>');
                $droplist.append($listitem);
                for(var i=0; i < $currentInput[0].files.length; i++) {
                    $listitem.append('<div>' + $currentInput[0].files[i].name + '</div>');
                }
                $listitem.append($input);
                $listitem.find('.undo-upload').off('click').on('click', function(e) { e.preventDefault(); $(this).closest('.upload-file-wrapper').remove(); });
            });
            var $newInput = $('<input type="file" name="'+inputName+'" multiple="multiple" />');
            $dropzone.append($newInput);
            $dropzone.data('currentInputFile', $newInput);
            Webapp.registerDropZone($dropzone);
        });
    };

    Webapp.typeahead = function(model, string, $element) {
        var data = new FormData();
        data.append('model', model);
        data.append('string', string);
        $.ajax({
            method: "POST",
            url: '/api/search/',
            data: data,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (data, successCode, jqXHR) {
                Webapp.cleanup_typeahead($element);
                var $typeahead_results = $('<ul class="typeahead-results"></ul>');
                $element.after($typeahead_results);
                for (var i=0; i<data.length; i++) {
                    $typeahead_results.append('<li><a href="#" data-value="'+data[i]['id']+'">'+data[i]['verbose']+'</a></li>');
                }
                $typeahead_results.find('a').off('click').on('click', function(e) {
                    e.preventDefault();
                    if ($element.attr('data-template') === undefined || $element.attr('data-search') === undefined) {
                        if ($($element.attr('data-target')).find('option[value="' + $(this).attr('data-value') + '"]').length == 0) {
                            $($element.attr('data-target')).append('<option selected value="' + $(this).attr('data-value') + '">' + $(this).html() + '</option>');
                        } else {
                            $($element.attr('data-target')).find('option[value="' + $(this).attr('data-value') + '"]').attr('selected', 'selected');
                        }
                    } else {
                        var re_id = new RegExp("{_{id}_}", "g");
                        var re_verbose = new RegExp("{_{verbose}_}", "g");
                        var search_string = $element.attr('data-search');
                        search_string = search_string.replace(re_id, $(this).attr('data-value')).replace(re_verbose, $(this).html());
                        var $new_element = $element.attr('data-template');
                        $new_element = $new_element.replace(re_id, $(this).attr('data-value')).replace(re_verbose, $(this).html());
                        if ($($element.attr('data-target')).find(search_string).length == 0) {
                            $($element.attr('data-target')).prepend($($new_element));
                        }
                    }
                    if ($element.attr('data-event') !== undefined) {
                        $element.trigger($element.attr('data-event'));
                    }
                    Webapp.cleanup_typeahead($element);

                });
            }
        });
    };

    Webapp.cleanup_typeahead = function ($element) {
        $element.siblings('.typeahead-results').remove();
    };

    Webapp.api_post = function(url, data, callback, $form, error_callback) {
        $.ajax({
            method: "POST",
            form: $form,
            callback: callback,
            url: url,
            data: data,
            processData: false,
            contentType: false,
            dataType: 'json',
            beforeSend: function() {
                if ($form !== undefined) {
                    var $btn = $form.find('button[type="submit"]');
                    if ($btn.parent().is('.input-group-btn')) {
                        $btn.parent().siblings('.spin').remove();
                        $btn.parent().after('<span class="spin text-primary input-group-addon"><span class="fa fa-spinner fa-pulse fa-fw"></span></span>');
                    } else {
                        $btn.siblings('.spin').remove();
                        $btn.after('<span class="spin text-primary">&nbsp;&nbsp;<span class="fa fa-spinner fa-pulse fa-fw"></span></span>');
                    }

                }
            },
            success: function (data, successCode, jqXHR) {
                if (data.url !== undefined) {
                    location.href = data.url;
                } else {
                    if ($form !== undefined) {
                        $form.find('[name]').closest('.form-group').removeClass('has-error');
                    }
                }
                if (callback) {
                    callback(data, successCode, jqXHR, $form);
                }
                if ($form !== undefined) {
                    Webapp.resolveMethodName($form.attr('successCallback'))();
                }
                if ($form !== undefined) {
                    var $btn = $form.find('button[type="submit"]');
                    if ($btn.parent().is('.input-group-btn')) {
                        $btn.parent().siblings('.spin').remove();
                        $btn.parent().after('<span class="spin text-success input-group-addon"><span class="fa fa-check"></span></span>');
                    } else {
                        $btn.siblings('.spin').remove();
                        $btn.after('<span class="spin text-success">&nbsp;&nbsp;<span class="fa fa-check"></span></span>');
                    }
                    var status_name = $form.attr('data-status-name');
                    var current_value = $form.find('input[name="'+status_name+'"]').val();
                    localStorage.setItem($form.attr('action'), current_value);
                }
            },
            error: function (jqXHR, errorCode, errorThrown) {
                var data = jqXHR.responseJSON;
                if ($form !== undefined) {
                    $form.find('[name]').closest('.form-group').removeClass('has-error');
                }
                for (var field in data) {
                    if (field != 'error_msgs' && field != 'success_msgs' && field !== 'info_msgs') {
                        if (data[field] == 'error') {
                            if ($form !== undefined) {
                                $form.find('[name="' + field + '"]').closest('.form-group').addClass('has-error');
                            }
                        }
                    }
                }
                if ($form !== undefined) {
                    Webapp.resolveMethodName($form.attr('errorCallback'))(jqXHR, errorCode, errorThrown, $form);
                    var $btn = $form.find('button[type="submit"]');
                    if ($btn.parent().is('.input-group-btn')) {
                        $btn.parent().siblings('.spin').remove();
                        $btn.parent().after('<span class="spin text-danger input-group-addon"><span class="fa fa-times"></span></span>');
                    } else {
                        $btn.siblings('.spin').remove();
                        $btn.after('<span class="spin text-danger">&nbsp;&nbsp;<span class="fa fa-times"></span></span>');
                    }
                }
                if (error_callback) {
                    error_callback(jqXHR, errorCode, errorThrown);
                }
            },
            complete: function (jqXHR, statusCode) {
                var data = jqXHR.responseJSON;
                for (var field in data) {
                    if (field == 'error_msgs') {
                        for (var i = 0; i < data[field].length; i++) {
                            toastr.error(data[field][i].message, data[field][i].title, Webapp.toastr_opts);
                        }
                    } else if (field == 'success_msgs') {
                        for (var i = 0; i < data[field].length; i++) {
                            toastr.success(data[field][i].message, data[field][i].title, Webapp.toastr_opts);
                        }
                    } else if (field == 'info_msgs') {
                        for (var i = 0; i < data[field].length; i++) {
                            toastr.in(data[field][i].message, data[field][i].title, Webapp.toastr_opts);
                        }
                    }
                }
                if ($form !== undefined) {
                    Webapp.resolveMethodName($form.attr('completeCallback'))();
                    $form.find('.btn-primary').removeClass('disabled');
                }
            }
        });
    };

    Webapp.register_delete_buttons = function(callback) {
        $('.delete').off('click').on('click', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            var model = $(this).attr('data-model');
            var $modal = $('#delete-modal');
            var successCallback = Webapp.resolveMethodName($(this).attr('data-success-callback'));
            $modal.modal('show');
            $modal.find('.confirm-delete').off('click').on('click', function(e) {
                e.preventDefault();
                var data = new FormData();
                data.append('id', id);
                data.append('_method', "DELETE");
                Webapp.api_post('/api/'+model+'/', data, function(data, successCode, jqXHR) {
                    $('#'+model+'_'+id).remove();
                    if (successCode !== undefined) {
                        successCallback(data);
                    }
                });
                $modal.modal('hide');
            });
        });
    };
}(window.Webapp = window.Webapp || {}, jQuery));


$(document).lareAlways(function() {
    if ($.support.lare) {
        $('a').not('[data-prevent-lare]').off('click.lare').on('click.lare', function(event) {
            $(document).lare.click(event);
        });
    }
    Webapp.register_api_forms($(document));
    Webapp.register_delete_buttons();
});
