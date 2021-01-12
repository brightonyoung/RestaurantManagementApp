import './app.scss';
import './angular-overrides.scss';
import './app-overrides.scss';
import './ui-kit-overrides.scss';
import './minimal-table-overrides.scss';
import './menusphere-overrides.scss';

/* eslint-env browser, jquery */
/* eslint-disable no-alert */
function _addTouchSectionEnabler(touchElmtId, sectionId, invert, slide, callback) {
    $('#' + touchElmtId).click(function() {
        var section = $('#' + sectionId);
        var checked = $(this).is(':checked');
        if (checked) {
            if (invert) {
                if (slide === false) {
                    section.hide();
                } else {
                    section.slideUp();
                }
            } else if (slide === false) {
                section.show();
            } else {
                section.slideDown();
            }
        }
        if (typeof callback === 'function') {
            callback.call(this, checked && !invert);
        }
    });
}

function _addTouchSectionDisabler(touchElmtId, sectionId, invert, callback) {
    $('#' + touchElmtId).click(function() {
        var section = $('#' + sectionId);
        var checked = $(this).is(':checked');
        if (checked) {
            if (invert) {
                section.prop('disabled', false);
            } else {
                section.prop('disabled', true);
            }
        }
        if (typeof callback === 'function') {
            callback.call(this, checked && !invert);
        }
    });
}

if (typeof Toast == 'undefined') {

    window._setHash = true;

    // GENERAL UTILITIES WILL GO HERE
    var Toast = window.Toast = {
        unloading: false,
        unsavedChanges: false,
        trackUnsavedChanges: function(el) {
            if (!el) {
                el = $(document);
            }
            el.find('input,select,textarea')
                .not('#switch-restaurants-menu input,.search-query,#propertySelector,.ignore-changes')
                .change(function() {
                    Toast.unsavedChanges = true;
                });
        },
        hasUnsavedChanges: function() {
            return Toast.unsavedChanges &&
                $('#save-btn:visible').size() > 0 &&
                !$('#save-btn').attr('disabled');
        },
        confirmUnsavedChangesOnUnload: function() {
            $(window).on('beforeunload', function() {
                // If the data is dirty and there is a visible, non-disabled save button
                // prevent the page from reloading
                if (Toast.hasUnsavedChanges && Toast.hasUnsavedChanges()) {
                    return 'You have unsaved changes';
                }
            });
        },
        escapeHtml: function(value) {
            if (value) {
                return jQuery('<div />').text(value).html();
            } else {
                return '';
            }
        },
        formatPosition: function(number) {
            if (number > 3 && number < 21) {
                return number + 'th';
            }
            switch (number % 10) {
                case 1:
                    return number + 'st';
                case 2:
                    return number + 'nd';
                case 3:
                    return number + 'rd';
                default:
                    return number + 'th';
            }
        },
        getOrCreateElmtId: function(elmt) {
            var id = elmt.attr('id');
            if (!id) {
                id = 'toast_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);
                elmt.attr('id', id);
            }
            return id;
        },

        // show a bootstrap tab with the given ID, can also include the # as the
        // first character
        showTab: function(tabId) {
            var tab;
            if (!tabId) {
                tab = $($('a[data-toggle=tab]')[0]);
                window._setHash = false;
            } else {
                if (tabId.charAt(0) != '#') {
                    tabId = '#' + tabId;
                }
                tab = $('a[href="' + tabId + '"][data-toggle=tab]');
            }
            tab.tab('show');
            $('#active-tab').val(tabId);
            window.scrollTo(0, 0);
        },
        // select a top-level tab from the URL hash if there is one
        tabFromHash: function() {
            var hash = window.location.hash;
            if (hash) {
                Toast.showTab(hash);
            }
        },
        initTabs: function() {
            var tabSelectors = '.tabbable .nav-stacked a, .tabbable .nav-tabs a';
            // Change hash for page-reload
            $(tabSelectors).on('shown', function(e) {
                if (window._setHash) {
                    window.location.hash = e.target.hash;
                    window.scrollTo(0, 0);
                } else {
                    window._setHash = true;
                }
            });

            var hash = window.location.hash;
            if (hash) {
                var foundHash = false;
                $(tabSelectors).each(function() {
                    if (hash == this.hash) {
                        foundHash = true;
                    }
                });

                if (!foundHash) {
                    // then the hash is from another set of tabs that aren't
                    // visible
                    // so reset it
                    window.location.hash = '';
                } else {
                    Toast.showTab(hash);
                }
            }

            $(window).hashchange(function() {
                var hash = location.hash;
                Toast.showTab(hash);
            });

            // Make collapsible
            var widthOfList = function() {
                var itemsWidth = 0;
                $('.toast-tabs li').each(function() {
                    var itemWidth = $(this).outerWidth();
                    itemsWidth += itemWidth;
                });
                return itemsWidth;
            };
            var reAdjust = function() {
                var tabsWidth = widthOfList() + 2;
                $('.toast-tabs').width(tabsWidth);
                if (($('.toast-tab-wrapper').outerWidth()) < tabsWidth) {
                    $('.tabbable > div > .toggle').show();

                    // Position active tab
                    if ($('.toast-tabs').parent().parent().hasClass('toast-tab-collapse')) {
                        var activeTab = $('.toast-tabs li.active'),
                            wrapperWidth = $('.toast-tab-wrapper').outerWidth();
                        if (activeTab.size() > 0) {
                            // Try to put the tab in the middle
                            $('.toast-tab-wrapper').animate({
                                scrollLeft: Math.max(0, Math.min(
                                    tabsWidth - wrapperWidth,
                                    activeTab.position().left - wrapperWidth / 2 + activeTab.width() / 2
                                ))
                            });
                        }
                    } else {
                        $('.toast-tabs').width('100%');
                    }
                } else {
                    $('.tabbable > div > .toggle').hide();
                    $('.toast-tabs').width('100%');
                }
            };
            var collapse = function(el) {
                var tabContainer = el.closest('.toast-tab-wrapper').parent();
                tabContainer.addClass('toast-tab-collapse');
                tabContainer.find('.toggle i').removeClass('icon-chevron-down').addClass('icon-chevron-left');
                reAdjust();
            };
            var toggle = function(el) {
                el.parent().toggleClass('toast-tab-collapse');
                el.find('i').toggleClass('icon-chevron-down icon-chevron-left');
                reAdjust();
            };
            $(window).on('resize', function() {
                reAdjust();
            });
            $('.tabbable .toggle').click(function() {
                toggle($(this));
            });
            $('a[data-toggle="tab"]').on('shown', function() {
                collapse($(this));
            });
            reAdjust();
            $('.nav-tabs > li > a').each(function(i, el) {
                $(el).attr('title', $(el).text());
            });
        },
        arrayToJqueryParams: function(paramName, values) {
            return $.map(values, function(v) {
                return {
                    name: paramName,
                    value: v
                };
            });
        },
        findMultieditSelected: function(table) {
            return table.find(':checkbox:checked:not(:disabled):not([data-multiedit-master])');
        },
        enableMultiedit: function(wrapperId, onChange, tableId = '') {
            var wrapper = $('#' + wrapperId);
            var table = wrapper.find('table');
            var actionBtns = wrapper.find('.btn.multiedit');
            var lastChecked;

            if (!!tableId) {
                table = $('#' + tableId);
            }

            function findSelected() {
                return Toast.findMultieditSelected(table);
            }

            function addChangeListener() {
                // This first listener handles the bulk selection capability, i.e.
                // being able to check a range of checkboxes by checking one and then
                // shift-clicking on another.  This has to be a click listener as change
                // listeners don't know if the shift key is held down
                table.on('click', ':checkbox', function(e) {
                    if (lastChecked && e.shiftKey) {
                        var allBoxes = table.find(':checkbox:not([data-multiedit-master])');
                        var start = allBoxes.index(this);
                        var end = allBoxes.index(lastChecked);

                        removeChangeListener();
                        allBoxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', $(lastChecked).is(':checked'));
                        addChangeListener();
                    }

                    lastChecked = this;
                });
                // This second listener handles the change management, i.e. toggling
                // button states and firing the higher level multiedit change callback.
                // This is separated from the click listener so that explicit change events
                // fired elsewhere programmatically cause the appropriate handling
                table.on('change', ':checkbox', function() {
                    var selected = findSelected();
                    actionBtns.prop('disabled', selected.length == 0);

                    if ($.isFunction(onChange)) {
                        onChange.call(this, {
                            selected: selected,
                            selectedCount: selected.length
                        });
                    }
                });
            }

            function removeChangeListener() {
                table.off('click', ':checkbox');
            }

            addChangeListener();

            actionBtns.click(function(e) {
                e.preventDefault();
                var btn = $(this);
                var selected = findSelected();
                if (selected.length == 0 && !tableId) {
                    alert('Please select at least one item');
                } else {
                    var ids = selected.map(function() {
                        return $(this).val();
                    }).get();
                    btn.trigger('multiedit' + tableId, [ids]);
                }
            });
            wrapper.find(':checkbox[data-multiedit-master="true"]').click(function() {
                var boxes = table.find(':checkbox:not(:disabled)').not(this);
                // on large tables triggering the change event on the individual checkboxes
                // can be very expensive (up to a couple seconds delay) because for every change
                // it is re-checking the number of selected boxes, updating button state, etc.  So,
                // we temporarily remove our own change listener and then re-add after the event is triggered.
                removeChangeListener();
                if ($(this).is(':checked')) {
                    boxes.prop('checked', true).trigger('change');
                } else {
                    boxes.prop('checked', false).trigger('change');
                }
                addChangeListener();
            });
        },
        updateCheckboxContainerStyle: function(checkbox) {
            // update parent class for checkmark / red x
            if (checkbox.is(':checked')) {
                checkbox.parent().addClass('checked');
            } else {
                checkbox.parent().removeClass('checked');
            }
            // update parent class for disabled checkbox
            if (checkbox.prop('disabled')) {
                checkbox.parent().addClass('disabled');
            } else {
                checkbox.parent().removeClass('disabled');
            }
        },
        // helper function to make sure the a selection list visually
        // represents the checkbox states, see enableSelectionList
        updateSelectionListState: function($list, disabledProp = 'disabled') {
            var listDisabled = $list.hasClass('disabled');
            $list.find(':checkbox').each(function() {
                var checkbox = $(this);
                Toast.updateCheckboxContainerStyle(checkbox);
                // disable the checkbox if the list is disabled
                if (listDisabled) {
                    checkbox.prop(disabledProp, true);
                } else if (!checkbox.prop(disabledProp)) {
                    checkbox.prop(disabledProp, false);
                }
            });
        },
        enableSelectionList: function(rootElmt, disabledProp = 'disabled') {
            var lists = rootElmt ? $(rootElmt).find('ul.selection-list') : $('ul.selection-list');
            lists.each(function() {
                Toast.updateSelectionListState($(this), disabledProp);
            });
            lists.on('click', ':checkbox', function(event) {
                if (event.target.readOnly || event.target.disabled) return false;
                var list = $(this).closest('ul');
                // for non-multiselect lists only allow a single selection
                if (!list.hasClass('multiselect')) {
                    list.find(':checkbox').not($(this)).prop('checked', false);
                }
                if (!$(this).is(':checked') && list.hasClass('required')) {
                    $(this).prop('checked', true);
                }
                Toast.updateSelectionListState(list, disabledProp);
            });
        },
        positionAtBottom: function(elmt, force) {
            var win = $(window);
            var viewport = {
                top: win.scrollTop(),
                left: win.scrollLeft()
            };
            viewport.bottom = viewport.top + win.height();

            var bounds = elmt.offset();
            bounds.bottom = bounds.top + elmt.outerHeight();

            var onScreen = (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            if (force || !onScreen) {
                var newTop = bounds.bottom - win.height() + 10;
                $('html, body').animate({
                    scrollTop: newTop
                });
            }
        },
        enablePrettyUploads: function() {
            var filePickers = $('input.pretty-file');
            filePickers.change(function() {
                var display = $(this).parent().siblings('.file-display');
                var removeBtn = $(this).parent().siblings('.remove-image');
                var fileName = $(this).val();
                if (fileName) {
                    display.text(fileName.replace(/.*(\/|\\)/, '')).show();
                    removeBtn.hide();
                } else {
                    display.hide();
                    removeBtn.show();
                }
            });
            filePickers.closest('.image-selection').find('.remove-image').click(function() {
                var btn = $(this);
                btn.prop('disabled', true).prev().val('true').end().next().show();
                btn.parent().find('img').addClass('opacity30');
                btn.siblings('.pretty-file-button').hide();
            });
            filePickers.closest('.image-selection').find('.remove-image-undo').click(function(e) {
                e.preventDefault();
                $(this).parent().hide()
                    .prev().prop('disabled', false)
                    .prev().val('false')
                    .prev().show()
                    .parent().find('img').removeClass('opacity30');
            });

            if ($.browser !== undefined && $.browser.mozilla !== undefined && $.browser.mozilla) { //null checks with compatiability for angular material
                $('.pretty-file-button').click(function(e) {
                    if (e.currentTarget === this && e.target.nodeName !== 'INPUT') {
                        $(this).find('input').click();
                    }
                });
            }

        },

        addSectionEnabler: function(checkboxId, sectionId, invert, slide) {
            $('#' + checkboxId).click(function() {
                var section = $('#' + sectionId);
                var checked = $(this).is(':checked');
                // the enableSelectionList method will prevent a 'required' list
                // from unselecting an
                // item by re-clicking it, but as that happens after this
                // (bubbles from the checkbox up
                // to the list), we need to explicitly check here
                if (!checked && $(this).closest('ul').hasClass('required')) {
                    return;
                }
                if ((checked && !invert) || (!checked && invert)) {
                    section[slide ? 'slideDown' : 'show']();
                } else {
                    section[slide ? 'slideUp' : 'hide']();
                }

            });
        },

        addTouchSectionEnabler: function(touchElmtPrefix, sectionId, invert, slide, callback) {
            _addTouchSectionEnabler(touchElmtPrefix + '_true', sectionId, invert, slide, callback);
            _addTouchSectionEnabler(touchElmtPrefix + '_false', sectionId, !invert, slide, callback);
        },

        addTouchSectionDisabler: function(touchElmtPrefix, sectionId, invert, callback) {
            _addTouchSectionDisabler(touchElmtPrefix + '_true', sectionId, invert, callback);
            _addTouchSectionDisabler(touchElmtPrefix + '_false', sectionId, !invert, callback);
        },

        _deleteEntityTableRow: function(row, explicitdelete) {
            row.addClass('deleted');
            var idParam = row.find('input.id-param');
            if (explicitdelete) {
                if (idParam && idParam.val() == 'true') {
                    idParam.val('false');
                }
                row.find('input.deleted-param').val(true);
            } else if (idParam.length > 0) {
                if (!idParam.data('originalValue')) {
                    idParam.data('originalValue', idParam.val());
                }
                idParam.val('false');
            }
            row.find('input:not(.id-param,.deleted-param),select').prop('disabled', true);
            row.find('.select-shell').addClass('disabled');
            row.find('.td-checkbox label').addClass('opacity50');
            row.find('button:not(.entity-actions)').prop('disabled', true).addClass('disabled');
            row.find('td:not(.td-actions) i').removeClass('opacity70').addClass('opacity20');
        },

        _undeleteEntityTableRow: function(row, explicitdelete) {
            row.removeClass('deleted');
            var idParam = row.find('input.id-param');
            if (explicitdelete) {
                if (idParam && idParam.val() == 'false') {
                    idParam.val('true');
                } else {
                    row.find('input.deleted-param').val(false);
                }
            } else if (idParam.length > 0) {
                idParam.val(idParam.data('originalValue'));
            }
            row.find('input,select').prop('disabled', false);
            row.find('.select-shell').removeClass('disabled');
            row.find('.td-checkbox label').removeClass('opacity50');
            row.find('button').prop('disabled', false).removeClass('disabled');
            row.find('td:not(.td-actions) i').removeClass('opacity20').addClass('opacity70');
        },

        /**
         * callback = function(jquery:row, boolean:delete)
         * explicitdelete = indicate that we will send the id param with its value, but we will send a deleted = true value
         */
        enableEntityTableDelete: function(entityTable, callback, explicitdelete) {
            // delete entity
            entityTable.find('a.remove-entity').off('click.entitydelete').on('click.entitydelete', function() {
                var row = $(this).closest('tr');
                Toast._deleteEntityTableRow(row, explicitdelete);
                if (row.hasClass('parent-row')) {
                    var children = row.nextUntil('.parent-row');
                    Toast._deleteEntityTableRow(children, explicitdelete);
                }
                Toast.unsavedChanges = true;
                if (callback) {
                    callback(row, true);
                }
                return false;
            });
            // undo delete entity
            entityTable.find('a.undo, a.undo-remove-entity').off('click.entitydelete').on('click.entitydelete', function() {
                Toast.unsavedChanges = true;
                var row = $(this).closest('tr');
                Toast._undeleteEntityTableRow(row, explicitdelete);
                if (row.hasClass('parent-row')) {
                    var children = row.nextUntil('.parent-row');
                    Toast._undeleteEntityTableRow(children, explicitdelete);
                }
                if (callback) {
                    callback(row, true);
                }
            });
        },

        enableEntityTableRowTemplate: function(button, entityTable, beforeShow, afterShow) {
            button.click(function() {
                var nextTagIdx = entityTable.find('tbody tr:not(.placeholder,.template) .id-param').length;

                var template = entityTable.find('tr.template');
                var row = template.clone().removeClass('template');
                var rowId = row.attr('id');
                if (row.attr('index') == 'INDEX') {
                    row.attr('index', nextTagIdx);
                }
                if (rowId) {
                    row.attr('id', rowId.replace('INDEX', nextTagIdx));
                }
                row.find('input,select').each(function() {
                    var rowInput = $(this);
                    var inputName = rowInput.attr('name');
                    if (inputName) {
                        rowInput.attr('name', inputName.replace('INDEX', nextTagIdx));
                        if (!rowInput.data('forceDisabled')) {
                            rowInput.prop('disabled', false);
                            rowInput.parent().removeClass('disabled');
                        }
                    }
                });
                row.find('option').each(function() {
                    var option = $(this);
                    var optionValue = option.attr('value');
                    if (optionValue) {
                        option.attr('value', optionValue.replace('INDEX', nextTagIdx));
                    }
                });
                row.find('div').each(function() {
                    var rowDiv = $(this);
                    var divId = rowDiv.attr('id');
                    if (divId) {
                        rowDiv.attr('id', divId.replace('INDEX', nextTagIdx));
                    }
                });
                if (nextTagIdx === 0) {
                    entityTable.find('.placeholder').remove();
                }

                if (beforeShow) {
                    beforeShow.call(row, nextTagIdx);
                }

                // Insert new row before the hidden template row
                template.eq(0).before(row.show());


                var first = true;
                row.find(':text:visible,select:visible').each(function() {
                    if (first) {
                        if (this.type != 'hidden') {
                            $(this).focus();
                            $('td.focus').removeClass('focus');
                            $(this).closest('td').addClass('focus');
                            first = false;
                        }
                    }
                });
                Toast.trackUnsavedChanges(row);

                if (afterShow) {
                    afterShow.call(row, nextTagIdx);
                }
                return false;
            });
        },
        enableEntityTableInput: function(el, moveWithEnterKey) {
            moveWithEnterKey = typeof moveWithEnterKey === 'undefined' ? true : moveWithEnterKey;
            el.find('.td-input :text,.td-input input[type="number"]').off('.tdinput').on('focus.tdinput', function() {
                var input = $(this),
                    cell = input.closest('td,th');
                $('td.focus,th.focus').removeClass('focus');
                if (!input[0].disabled) {
                    cell.addClass('focus');
                }
            }).on('blur.tdinput', function() {
                var input = $(this),
                    cell = input.closest('td,th');
                cell.removeClass('focus');

                if (cell.hasClass('td-input-link')) {
                    if (cell.find('.input-param').val()) {
                        cell.removeClass('td-input');
                        cell.attr('editing', null);
                        cell.find('.input-link').show();
                        cell.find('.input-link:not(.input-link-append)').text(input.val());
                        cell.find('.input-param').hide();

                    }
                }
            }).on('keydown.tdinput', function(e) {
                if (!moveWithEnterKey) {
                    return;
                }
                // Enter: 13
                // Shift: 16
                if (e.keyCode === 13) {
                    var input = $(this),
                        td = input.closest('td'),
                        tr = input.closest('tr'),
                        index = tr.find('td').index(td);
                    if (e.shiftKey) {
                        // up
                        tr.prevAll(':visible').find('td:eq(' + index + ') input:visible').first().focus();
                    } else {
                        // down
                        tr.nextAll(':visible').find('td:eq(' + index + ') input:visible').first().focus();
                    }
                    e.preventDefault();
                }
            });
            el.find('.td-input').off('.tdinput').on('click.tdinput', function() {
                $(this).find(':text,input[type="number"]').focus();
            });

            // disable mousewheel on a input number field when in focus
            // (to prevent Cromium browsers change the value when scrolling)
            el.find('.td-input input[type=number]').focus(function() {
                $(this).on('mousewheel.disableScroll', function(e) {
                    e.preventDefault();
                });
            }).blur(function() {
                $(this).off('mousewheel.disableScroll');
            });

            Toast.enableEntityTableSelect(el);
            Toast.enableEntityTableEditLink(el);
        },
        enableTreePickerForCell: function(cell, isTarget) {
            var thisInput = cell.find('input.' + (isTarget ? 'target' : 'owner'));
            var otherInput = cell.closest('.picker-parent').find('input.' + (isTarget ? 'owner' : 'target'));

            cell.find('.bootstrap-treepicker.shell').off('.template').on('click.template', function() {
                Toast._initializeTreePickerTemplate($(this));
            });
            cell.find('.bootstrap-select.select-shell').off('.template').on('click.template', function(e) {
                if ($(this).hasClass('disabled')) return;
                Toast._initializeSelectPickerTemplate($(this));
                e.stopPropagation();
                e.preventDefault();
            });
            thisInput.off('change.template').on('change.template', function(e, tag) {
                if (tag !== 'click') {
                    return;
                }
                var otherTreepicker = otherInput.parent(),
                    selectedIds = [thisInput.val()];

                Toast._initializeTreePickerTemplate(otherTreepicker);
                if (isTarget) {
                    Toast._updateLinkedTreepicker(otherTreepicker, selectedIds, thisInput, otherInput);
                } else {
                    Toast._updateLinkedTreepicker(otherTreepicker, selectedIds, otherInput, thisInput);
                }

            });
        },
        enableSelectPickerTemplate: function(el, changeFunction) {
            el.find('.bootstrap-select.select-shell').off('.template').on('click.template', function(e) {
                if ($(this).hasClass('disabled')) return;
                Toast._initializeSelectPickerTemplate($(this), changeFunction);
                e.stopPropagation();
                e.preventDefault();
            });
        },
        enableEntityTableSelect: function(el) {
            var tagName = el.prop('tagName');
            if (tagName && tagName.toLowerCase() === 'tr') {
                el.find('.td-select select').selectpicker();
            } else {
                el.find('tr:not(.template,.placeholder) .td-select select').selectpicker();
            }
            el.find('.bootstrap-treepicker.shell').off('.template').on('click.template', function() {
                Toast._initializeTreePickerTemplate($(this));
            });
            el.find('.bootstrap-select.select-shell').off('.template').on('click.template', function(e) {
                if ($(this).hasClass('disabled')) return;
                Toast._initializeSelectPickerTemplate($(this));
                e.stopPropagation();
                e.preventDefault();
            });
            el.find('input.target').off('change.template').on('change.template', function(e, tag) {
                if (tag !== 'click') {
                    return;
                }
                var targetInput = $(this),
                    container = targetInput.closest('.picker-parent'),
                    ownerInput = container.find('input.owner'),
                    ownerTreepicker = ownerInput.parent(),
                    selectedIds = [targetInput.val()];

                Toast._initializeTreePickerTemplate(ownerTreepicker);
                Toast._updateLinkedTreepicker(ownerTreepicker, selectedIds, targetInput, ownerInput);
            });
            el.find('input.owner').off('change.template').on('change.template', function(e, tag) {
                if (tag !== 'click') {
                    return;
                }
                // If the target is not the owner or a child of the owner,
                // change the target to the owner
                var ownerInput = $(this),
                    container = ownerInput.closest('.picker-parent'),
                    targetInput = container.find('input.target'),
                    targetTreepicker = targetInput.parent(),
                    selectedIds = [ownerInput.val()];

                // Ensure the owner tree picker is initialized
                Toast._initializeTreePickerTemplate(targetTreepicker);
                Toast._updateLinkedTreepicker(targetTreepicker, selectedIds, targetInput, ownerInput);
            });
        },
        _initializeTreePickerTemplate: function(el) {
            if (el.hasClass('shell') && !el.hasClass('disabled')) {
                el.removeClass('shell');
                // Find the template, copy it, and append it
                el.append($('#setup-restaurants .dropdown-menu:first').clone());

                var input = el.find('input'),
                    selectedIds = [input.val()];

                var treepicker = el.treepicker({
                    multiselect: false,
                    input: input
                });
                treepicker.treepicker('val', {
                    values: selectedIds
                });
                el.trigger('click');
            }
        },
        _initializeSelectPickerTemplate: function(el, changeFunction) {
            if (el.hasClass('select-shell') && !el.hasClass('disabled')) {
                var input = el.find('input'),
                    template = $('#' + el.attr('data-template-id')),
                    select = template.clone(),
                    masterId = input.attr('data-master-id'),
                    cssClass = el.data('cssClass'),
                    buttonCssClass = el.find('button').data('cssClass');

                select.prop('disabled', false);
                select.attr('id', null);
                select.attr('name', input.attr('name'));
                if (changeFunction) {
                    select.change(changeFunction);
                }

                if (masterId) {
                    select.find('option').each(function() {
                        if ($(this).attr('data-master-id') === masterId) {
                            $(this).prop('selected', true);
                        }
                    });
                } else {
                    select.val(input.val());
                }

                el.after(select);
                el.remove();
                Toast._selectpickerAndOpen(select, null, cssClass, buttonCssClass);
            }
        },
        _selectpickerAndOpen: function(select, options, cssClass, buttonCssClass) {
            select.selectpicker(options);
            var btnGroup = select.next();
            btnGroup.click();
            btnGroup.addClass(cssClass);
            btnGroup.find('button').addClass(buttonCssClass);
            // I think bootstrap does some stuff, so we'll do some stuff
            setTimeout(function() {
                select.next().addClass('open');
                setTimeout(function() {
                    if (!select.prop('multiple')) {
                        btnGroup.find('.selected a').focus();
                    }
                    btnGroup.find('input').focus();
                }, 10);
            }, 10);
        },
        enableEntityTableEditLink: function(el) {
            // Editable links
            var showEditIcon = function(td) {
                var tr = td.closest('tr');
                if (td.attr('editing') != 'true' && !tr.hasClass('deleted') && !tr.hasClass('readonly')) {
                    td.find('.input-edit').show();
                }
            };
            var hideEditIcon = function(td) {
                td.find('.input-edit').hide();
            };
            el.find('.td-input-link').off('.tdlink').on('mouseover.tdlink', function() {
                showEditIcon($(this));
            }).on('mouseout.tdlink', function() {
                hideEditIcon($(this));
            });
            el.find('.td-input-link .input-link').off('.tdlink').on('focus.tdlink', function() {
                showEditIcon($(this).closest('td'));
            }).on('blur.tdlink', function() {
                var editIcon = $(this).closest('td').find('.input-edit');
                setTimeout(function() {
                    if (!editIcon.hasClass('focus')) {
                        editIcon.hide();
                    }
                }, 100);
            });
            el.find('.td-input-link .input-edit').off('.tdlink').on('mouseover.tdlink', function() {
                $(this).addClass('hover');
            }).on('mouseout.tdlink', function() {
                $(this).removeClass('hover');
            }).on('click.tdlink', function() {
                if ($(this).hasClass('no-click')) {
                    return;
                }
                var td = $(this).closest('td'),
                    input = td.find('.input-param');
                td.attr('editing', true);
                input.attr('disabled', null).show();
                td.addClass('td-input');
                Toast.enableEntityTableInput(el);

                input.focus();
                td.find('.input-link').hide();
                td.find('.input-edit').hide();
                return false;
            }).on('focus.tdlink', function() {
                $(this).addClass('focus');
            }).on('blur.tdlink', function() {
                $(this).removeClass('focus').hide();
            });
        },

        enableEditButton: function(entityTable, editButton) {
            if (editButton) {
                editButton.click(function(e) {
                    if (entityTable.data('editing')) {
                        entityTable.data('editing', false);
                        entityTable.removeClass('editing-on').addClass('editing-off');
                        var editText = $(this).data('edit-text');
                        if (!editText) {
                            editText = 'Edit';
                        }
                        $(this).text(editText);
                    } else {
                        entityTable.data('editing', true);
                        entityTable.addClass('editing-on').removeClass('editing-off');
                        $(this).text('Done');
                    }
                    Toast.updateEditColumns(entityTable);
                    e.preventDefault();
                });
                entityTable.find('.edit-column').hide();
            }
        },
        _reorderFormCollection: function(entityTable, childEntityPrefix) {
            entityTable.find('tbody tr:not(.placeholder)').each(function(i) {
                $(this).find('input[name^="' + childEntityPrefix + '"],select[name^="' + childEntityPrefix + '"]').each(function() {
                    $(this).attr('name', $(this).attr('name').replace(/\[\d+\]/, '[' + i + ']'));
                });
            });
        },
        enableChildEntityTable: function(entityTable, childEntityPrefix, editButton, onDrop, onDelete, explicitdelete) {
            // enable drag and drop for rows
            var dndConfig = {
                onDragClass: 'info',
                onDrop: function(t, r) {
                    // reorder the input names as that is what really determines
                    // the order
                    Toast._reorderFormCollection(entityTable, childEntityPrefix);
                    Toast.unsavedChanges = true;
                    if (onDrop) {
                        onDrop(t, r);
                    }
                }
            };
            dndConfig.dragHandle = 'td:first-child';
            entityTable.tableDnD(dndConfig);
            Toast.enableEntityTableDelete(entityTable, onDelete, explicitdelete);
            Toast.enableEditButton(entityTable, editButton);
        },

        enableChildEntityTableOrderColumn: function(entityTable, childEntityPrefix, editButton, onChange, onDelete, explicitdelete) {
            Toast.enableEntityTableDelete(entityTable, onDelete, explicitdelete);
            Toast.enableEditButton(entityTable, editButton);

            entityTable.find('.order-column input').change(function(e) {
                e.preventDefault();
                var row = $(this).closest('tr'),
                    newVal = row.find('.input-ordinal').val(),
                    masterID = row.attr('data-master-id'),
                    table = row.closest('tbody'),
                    block = masterID ? table.find('tr[data-master-id="' + masterID + '"]') : row;

                if (!isNaN(newVal)) {
                    // Assign the same ordinal to all versions with the same master
                    block.find('.input-ordinal').val(newVal);
                } else {
                    block.find('.input-ordinal').val('');
                }
                block.detach();

                if (newVal === '' || isNaN(newVal)) {
                    // Set it to a large number
                    newVal = 100000;
                }
                newVal = parseInt(newVal);

                // Insert block in its proper place, starting from the top row
                var inserted = false;
                table.find('>tr').each(function() {
                    // Sort on ordinal, then on master ID
                    var ord = $(this).find('.input-ordinal').val(),
                        id = $(this).attr('data-master-id');

                    if (ord === '' || isNaN(ord)) {
                        // Set it to a large number
                        ord = 100000;
                    }
                    ord = parseInt(ord);

                    if (ord < newVal) {
                        return true; // continue
                    }
                    if (ord === newVal) {
                        if (id < masterID) {
                            return true; // continue
                        }
                    }
                    block.insertBefore($(this));
                    inserted = true;
                    return false;
                });

                // Append it to the table
                if (!inserted) {
                    table.append(block);
                }
                Toast.unsavedChanges = true;
                if (onChange) {
                    onChange(row);
                }
            });
        },
        enableChildEntityAlphabeticalSort: function(entityTable, paramPrefix, paramName, alphabetizeButton) {
            // Alphabetical sort applied only to lists on detail pages
            alphabetizeButton.click(function(e) {
                e.preventDefault();

                var previousVal,
                    previousRow,
                    madeSwap = true;
                while (madeSwap) {
                    madeSwap = false;
                    previousVal = undefined;
                    entityTable.find('tr:not(.template)[id^="' + paramPrefix + '"]').each(function(index, row) {
                        var name = $(row).find('.td-input-link a.input-link').text();
                        if (!previousVal) {
                            // First pass through, set previousVal
                            previousVal = name;
                            previousRow = row;
                            return true;
                        }
                        if (previousVal.toLowerCase() > name.toLowerCase()) {
                            $(previousRow).detach().insertAfter(row);
                            madeSwap = true;
                        }
                        previousVal = name;
                        previousRow = row;
                    });
                    Toast.unsavedChanges = true;
                }
                // Go through the rows and reassign ordinals based on the new order
                entityTable.find('tr:not(.template)[id^="' + paramPrefix + '"]').each(function(index, row) {
                    var newParamPrefix = paramName + '[' + index + '].';
                    $(row).find('input, select').each(function() {
                        var suffix = $(this).attr('name').split('].')[1];
                        var newName = newParamPrefix + suffix;
                        $(this).attr('name', newName);
                    });
                });
            });
        },
        updateOrderColumn: function(tr) {
            // Add 10 to the previous order'
            var previousOrder = parseInt(tr.prev().find('.order-column input').val());
            if (isNaN(previousOrder)) {
                previousOrder = 0;
            }
            tr.find('.order-column input').val(previousOrder + 10);
        },
        _updateLinkedTreepicker: function(treepicker, selectedIds, targetInput, ownerInput) {
            if (targetInput.val() === ownerInput.val()) {
                return;
            }
            // If the owner is an ancestor of the target, continue;
            var ownerVal = ownerInput.val();
            var targetAncestors = treepicker.treepicker('ancestors', targetInput.val());
            if ($.inArray(ownerVal, targetAncestors) !== -1) {
                return;
            }

            treepicker.treepicker('val', {
                values: selectedIds
            });
        },
        updateEditColumns: function(entityTable) {
            if (entityTable.data('editing')) {
                entityTable.find('.edit-column').show();
            } else {
                entityTable.find('.edit-column').hide();
            }
        },

        initTableDefaultSelection: function(tables, multiselect, required, checkboxSelector) {
            // TODO: allow multi-select for checkboxes that have the same master

            checkboxSelector = checkboxSelector || '.td-checkbox :checkbox';

            var updateCheckedStates = function() {
                tables.find(checkboxSelector).each(function() {
                    if ($(this).is(':checked')) {
                        $(this).closest('td').addClass('checked');
                    } else {
                        $(this).closest('td').removeClass('checked');
                    }
                });
            };

            tables.on('click', checkboxSelector, function() {
                // if this is single select, only allow one default
                var input = $(this);
                var checked = input.is(':checked');
                var isMultiselect = typeof multiselect == 'function' ? multiselect.call(this) : multiselect;
                if (!isMultiselect && checked) {
                    input.closest('table').find(checkboxSelector).not(input).prop('checked', false);
                }
                if (required && !checked) {
                    input.prop('checked', true);
                }
                updateCheckedStates();
            });
            updateCheckedStates();
        },

        setCheckboxState: function() {
            var $checkbox = $(this);
            var $label = $checkbox.parent();
            $label.toggleClass('checked', $checkbox.is(':checked'));
            $label.toggleClass('disabled', $checkbox.is(':disabled'));
        },

        initCheckboxes: function(checkboxLabels) {
            checkboxLabels.find(':checkbox').each(Toast.setCheckboxState).change(Toast.setCheckboxState);
        },

        isTouch: function() {
            return 'ontouchstart' in window || 'onmsgesturechange' in window;
        },

        isEmbedded: function() {
            return $('body').hasClass('embedded');
        },

        modalBusy: function() {
            var dialogFooter = $('.modal:visible .modal-footer');
            dialogFooter.find('img').show();
            dialogFooter.find('.btn').prop('disabled', true);
        },

        modalReady: function() {
            var dialogFooter = $('.modal:visible .modal-footer');
            dialogFooter.find('img').hide();
            dialogFooter.find('.btn').prop('disabled', false);
        },

        // assumes query has been lower-cased
        strContains: function(value, query) {
            var result = value && ~value.toLowerCase().indexOf(query);
            return result;
        },

        strStartsWith: function(value, query) {
            var result = value && value.toLowerCase().indexOf(query) === 0;
            return result;
        },

        validateEmail: function(email) {
            if (!email) {
                return false;
            }
            //@see ValidationPatterns.java
            var reg = new RegExp('^[a-zA-Z0-9](?:[\\.\\-+]?[_A-Za-z0-9]){0,53}@[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?){0,4}\\.[a-zA-Z]{2,20}');
            return reg.test(email);
        },

        chooseEntity: function(entityType, entity, searchText, previewText, listAction, constructItem, previewUrl, previewDataUrl, copy, successCallback, searchFn, multiselect) {
            function resizeEntityChooserList() {
                var leftColumn = $('#entity-chooser .entity-chooser-left');
                var height = leftColumn.height();
                height = height - leftColumn.find('.entity-search-container').outerHeight() - leftColumn.find('.selected-entity-list').outerHeight();
                leftColumn.find('.entity-list').height(height);
                leftColumn.find('.no-results').height(height);
            }

            // resize and position the modal dialog to be 80% of the height,
            // 80% width and horizontal positioning can be done with just CSS
            function resizeEntityChooser(modal) {
                // a bunch of ugliness here, basically trying to make the entity list
                // and the entity preview be scrollable with the modal body a fixed
                // height
                var targetHeight = $(window).height() * 0.8;

                var header = modal.find('.modal-header');
                var body = modal.find('.modal-body');
                var footer = modal.find('.modal-footer');

                var hOuter = header.outerHeight();
                var bInner = body.height();
                var bOuter = body.outerHeight();
                var fOuter = footer.outerHeight();

                var targetBody = targetHeight - hOuter - fOuter - bOuter + bInner;
                var marginTop = -targetHeight / 2.0;

                modal.height(targetHeight);
                modal.css('margin-top', marginTop + 'px');
                body.css('max-height', 'none').height(targetBody);
                body.find('.no-entity').css('line-height', targetBody + 'px').height(targetBody);
                var leftColumn = body.find('.entity-chooser-left').height(targetBody);
                leftColumn.find('.selected-entity-list').css('max-height', (targetBody / 2) + 'px');
                body.find('.entity-preview').height(targetBody);
                resizeEntityChooserList();
            }

            var modal = $('#entity-chooser');

            // hide the dialog when it is shown until we can get some
            // accurate measurements and adjust sizes
            modal.css('left', '-9999px');
            // set some entity-specific text

            modal.find('.help-text p').html(
                'Selecting Deep Copy will create a copy of the selected ' +
                entity + ' and any items, subgroups, modifier groups, ' +
                'and modifiers it contains. Any changes made to these copies will not impact the originals.');
            modal.find('.no-entity').html(previewText || 'Select from the left to preview');
            modal.find('.search-query').attr('placeholder', searchText || 'Search...');
            modal.find('.entity-chooser-left').addClass('loading');

            if (copy) {
                modal.find('.modal-header h3').html('Select ' + entity + ' to copy' || 'Select');
                modal.find('#copy-checkbox').show();
                modal.find('.copy-checkbox-div').css('display', 'inline');
                modal.find('.copy-tooltip').css('display', 'inline');
            } else {
                modal.find('.modal-header h3').html('Select ' + entity || 'Select');
                modal.find('#copy-checkbox').hide();
                modal.find('.copy-checkbox-div').css('display', 'none');
                modal.find('.copy-tooltip').css('display', 'none');
            }

            modal.find('.modal-footer-left .buttons .btn').click(function() {
                modal.find('.modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox').prop('checked', false).change();
                modal.find('.modal-footer-left .buttons .btn.btn-primary').prop('disabled', true);
            });

            // Deep copy tooltip interactions
            // greys background of i and shows tooltip if tooltip is selected
            modal.find('.modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox').change(function() {
                if (modal.find('.modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox').is(':checked')) {
                    modal.find('.modal-footer-left .copy-tooltip .tooltip-background').css('background-color', 'rgba(0,0,0,0.1)');
                    modal.find('.modal-body .help-text').css('visibility', 'visible');
                } else {
                    modal.find('.modal-footer-left .copy-tooltip .tooltip-background').css('background-color', 'rgba(0,0,0,0.0)');
                    modal.find('.modal-body .help-text').css('visibility', 'hidden');
                }
            });

            // closes tooltip on x
            modal.find('.modal-body .help-text #tooltip-close').click(function() {
                modal.find('.modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox').prop('checked', false).change();
            });

            var doneButton = modal.find('.modal-footer .btn-primary, .modal-footer-left .buttons .btn.btn-primary');

            // the list selection will set the chooserResults data property on the
            // modal and enable the main button
            doneButton.on('click.toast', function() {
                modal.modal('hide');
                modal.find('.modal-body .help-text').css('visibility', 'hidden');
                var data = modal.data('chooserResults');
                var deepCopy = modal.find('#copy-checkbox').is(':checked');
                successCallback.call(null, data, deepCopy);
            });
            modal.data('chooserResults', multiselect ? [] : null);

            var listContainer = modal.find('.entity-chooser-left');
            var list = listContainer.find('.entity-list');
            var selectedList = listContainer.find('.selected-entity-list');


            function showSelectedEntities() {
                selectedList.empty();
                var entities = modal.data('chooserResults');
                if (entities.length === 0) {
                    doneButton.prop('disabled', true);
                    selectedList.hide();
                } else {
                    $.each(entities, function(i, entity) {
                        var entry = constructItem(entity);
                        entry.data('entity', entity);
                        selectedList.append(entry);
                    });
                    selectedList.show();
                    doneButton.prop('disabled', false);
                }
                resizeEntityChooserList();
            }

            function showEntities(data) {
                listContainer.removeClass('loading');
                if (data.length === 0) {
                    listContainer.find('.no-results').show();
                    return;
                }
                listContainer.find('.no-results').hide();

                // insert the entities into the list
                $.each(data, function(i, entity) {
                    var entry = constructItem(entity);
                    entry.data('entity', entity);
                    list.append(entry);
                });

                // when an entity is clicked, load the preview
                // and enable the primary modal button with the entity's id
                function showEntityPreview(elmt, doSelect) {
                    var entity = elmt.data('entity');

                    modal.find('.no-entity').hide();
                    if (previewUrl) {
                        var url = previewUrl.replace('ENTITY_ID', entity.id);
                        if (entity.type) {
                            url = url.replace('ENTITY_TYPE', entity.type);
                        }
                        modal.find('.entity-preview').empty().addClass('loading').show()
                            .load(url, function() {
                                modal.find('.entity-preview').removeClass('loading');
                            });
                    }

                    if (previewDataUrl) {
                        var dataUrl = previewDataUrl.replace('ENTITY_ID', entity.id);
                        if (entity.type) {
                            dataUrl = dataUrl.replace('ENTITY_TYPE', entity.type);
                        }

                        doneButton.prop('disabled', true);
                        $.getJSON(dataUrl, function(results) {
                                entity.previewData = results;
                                //If there is an ajax call that needs to be made to previewDataUrl, make sure
                                //we handle select in the call back. This ensurse the done button is
                                //disabled  while waiting for the call back
                                handleSelect(doSelect, entity)
                            })
                            .always(function() {
                                doneButton.prop('disabled', false);
                            });
                    } else {
                        //If there is no previewData url just handle the select, which will also
                        //disable and enable the done button.
                        handleSelect(doSelect, entity);
                    }

                    list.add(selectedList).children().removeClass('current');
                    elmt.addClass('current');
                }

                function handleSelect(doSelect, entity) {
                    if (doSelect) {
                        if (multiselect) {
                            var entities = modal.data('chooserResults');
                            if (!~entities.indexOf(entity)) {
                                entities.push(entity);
                            }
                            showSelectedEntities();
                        } else {
                            modal.data('chooserResults', entity);
                            doneButton.prop('disabled', false);
                        }
                    }
                }

                list.on('click.toast', 'li', function() {
                    showEntityPreview($(this), true);
                });
                selectedList.on('click.toast', 'li', function(e) {
                    var elmt = $(this);
                    var x = e.pageX - elmt.offset().left;

                    var liWidth = elmt.outerWidth();
                    // since the trash icon is a background image, just detect the
                    // click position
                    if (x > (liWidth * 0.94)) {
                        // remove the selection and reset the list
                        var elmtIndex = elmt.index();
                        modal.data('chooserResults').splice(elmtIndex, 1);
                        showSelectedEntities();
                    } else {
                        showEntityPreview(elmt, false);
                    }
                });
            }

            var resizeEntityChooserOnWindowResize = function() {
                resizeEntityChooser(modal);
            };

            // position / size the dialog when it is shown
            modal.on('shown.toast', function() {
                    resizeEntityChooser(modal);
                    modal.css('left', '');

                    // Focus on the search field
                    $('#entity-chooser .search-query').focus();

                    if (!Toast.menuMgmt.data[entityType]) {
                        // retrieve entities
                        Toast.getKeepAliveJson(listAction, function(result) {
                            if (result.error) {
                                alert(result.error);
                                showEntities([]); // called to reset view
                            } else {
                                Toast.menuMgmt.data[entityType] = result.data;
                                showEntities(result.data);
                                // Filter the full results based on the
                                // existing search terms
                                doSearch();
                            }
                        });
                    } else {
                        showEntities(Toast.menuMgmt.data[entityType]);
                    }
                })
                // remove handlers and reset dialog when hidden
                .on('hidden.toast', function() {
                    modal.off('shown.toast');
                    modal.off('hidden.toast');
                    doneButton.off('click.toast');
                    $(window).off('resize.toast', resizeEntityChooserOnWindowResize);
                    list.off('click.toast');
                    selectedList.off('click.toast');

                    modal.find('.entity-list').empty();
                    modal.find('.selected-entity-list').empty().hide();
                    modal.find('.entity-preview').empty().hide();
                    modal.find('.no-entity').text('').show();
                });
            modal.modal();

            $(window).on('resize.toast', resizeEntityChooserOnWindowResize);

            // handle search
            var searchbox = modal.find('.search-query').val('');
            searchFn = searchFn || function(entity, query) {
                return Toast.strContains(entity.name, query) || Toast.strContains(entity.info, query);
            };

            function doSearch() {
                var entities = Toast.menuMgmt.data[entityType];
                if (!entities) {
                    return;
                }

                var query = $.trim(searchbox.val()).toLowerCase();
                var listElements = modal.find('.entity-list li');
                var shownCount = 0;
                modal.find('.no-results').hide();
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var listElmt = listElements.eq(i);
                    var show = query.length === 0 || searchFn(entity, query);
                    if (show) {
                        listElmt.show();
                        shownCount++;
                    } else {
                        listElmt.hide();
                    }
                }
                if (shownCount === 0) {
                    modal.find('.no-results').show();
                }
            }
            searchbox.keyup(function(e) {
                switch (e.keyCode) {
                    case 40: // down arrow
                    case 38: // up arrow
                    case 16: // shift
                    case 17: // ctrl
                    case 18: // alt
                    case 9: // tab
                    case 13: // enter
                        break;
                    case 27: // escape
                        $(this).val('');
                    default:
                        doSearch();
                }

                e.stopPropagation();
                e.preventDefault();
            });
        },

        trimKeepalivePrefix: function(text) {
            // trim off any leading dots from our Heroku timeout avoiding code
            return text.replace(/^[\.=]+/, '');
        },

        ajaxKeepAliveJson: function(fn, url, data, callback) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                callback = data;
                data = undefined;
            }

            fn(url, data, function(text, textStatus, jqXHR) {
                if (jQuery.isFunction(callback)) {
                    text = Toast.trimKeepalivePrefix(text);
                    var json = $.parseJSON(text);

                    callback.call(this, json, textStatus, jqXHR);
                }
            }, 'text');
        },

        getKeepAliveJson: function(url, data, callback) {
            Toast.ajaxKeepAliveJson($.get, url, data, callback);
        },

        postKeepAliveJson: function(url, data, callback) {
            Toast.ajaxKeepAliveJson($.post, url, data, callback);
        },

        formatting: {
            formatCommas: function(num) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },

        // Asynchronously load restaurants into each picker in 'pickers'
        loadRestaurantPickers: function(pickers, selected, shardGuid, useExisting, callback) {
            var html = '';

            if (useExisting === true) {
                var existingPicker = $('.restaurant-picker');
                if (existingPicker.size() > 0) {
                    Toast.renderRestaurantPickers(pickers, existingPicker.first().html());
                    if (callback) {
                        callback.call();
                    }
                    return;
                }
            }

            html += '<option class="none-selected-option" value="">Select a restaurant.</option>';

            $.get('/restaurantaccess/populateAccessibleRestaurantsShardSpecific', {
                shardGuid: shardGuid
            }, function(data) {
                // Populate restaurant options
                for (let i = 0; i < data.length; i++) {
                    var restaurant = data[i];
                    var optionSelected = restaurant.guid == selected;
                    html += '<option value="' + Toast.escapeHtml(restaurant.guid) + '"' + (optionSelected ? 'selected' : '') + '>' + Toast.escapeHtml(restaurant.name) + '</option>';
                }
                Toast.renderRestaurantPickers(pickers, html);
                if (callback) {
                    callback.call();
                }
            }, 'json');
        },

        renderRestaurantPickers: function(pickers, html) {
            pickers.prop('disabled', false)
                .html(html)
                .addClass('loaded')
                .find('.loading-placeholder').remove();
        },

        init: function(imageRoot, staticResRoot) {
            Toast.imageRoot = imageRoot;
            Toast.staticResRoot = staticResRoot;
            Toast.hasTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;
            // support .disabled on tab <li>
            $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
                if ($(this).parent().hasClass('disabled')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            // modal dialog form submission via the Submit button (which is
            // outside the actual form)
            $('.modal-form-dialog').each(function() {
                var $dialog = $(this);
                $dialog.find('.modal-footer .btn-primary').click(function() {
                    var form = $dialog.find('form').filter(':visible:first');
                    form.submit();
                });
            });

            // enable standardized looking file uploads
            Toast.enablePrettyUploads();

            $(document).ajaxError(function(event, jqXHR) {
                if (!Toast.unloading) {
                    if (jqXHR.status == 403) {
                        alert('You do not have permission to perform the requested action.');
                    } else if (jqXHR.status == 429) {
                        alert("Sorry, you have sent too many requests. Please try again later.")
                    } else {
                        alert('An error was encountered communicating with the Toast server, please try again or reload the page.');
                    }
                }
            });
            $(window).on('beforeunload', function() {
                Toast.unloading = true;
            });
        }
    };
}

Toast.alertMgr = (function() {
    function getContainer() {
        var notifications = $('.modal:visible .notifications');
        if (notifications.length === 0) {
            notifications = $('#notifications');
        }
        return notifications;
    }

    function message(msg, cssClasses, container) {
        var notifications = container || getContainer();
        var alert = $('<div class="alert"><a class="close" data-dismiss="alert">×</a>' + msg + '</div>')
            .addClass(cssClasses);
        notifications.append(alert);
        notifications.show();
    }

    return {
        message: function(msg, cssClasses, container) {
            message(msg, cssClasses, container);
        },
        error: function(msg, container) {
            message(msg, 'alert-error', container);
        },
        success: function(msg, container) {
            message(msg, 'alert-success', container);
        },
        info: function(msg, container) {
            message(msg, 'alert-info', container);
        },
        warning: function(msg, container) {
            message(msg, '', container);
        },
        clear: function(container) {
            (container || getContainer()).empty();
        }
    };
})();

Toast.reporting = (function() {

    const TIME_RANGE_ALL_HOURS = '-2';
    const TIME_RANGE_CUSTOM_HOURS = '-1';

    var currentReportUrl;
    var currentReportGroupIds;
    var currentReportAsync;
    var currentReportSharded;
    var googleChartsLoaded = false;

    // these are the values used when loading a report (main reports, tabs, data tables), and are updated
    // when the user clicks the 'Update' button
    var reportFilters = {};

    // "more" report filter URL param -> jquery selector for filter element
    var moreParamsElmts = {
        reportScheduled: '#scheduled-option',
        reportSource: '#source-option',
        reportServiceArea: '#service-area-option',
        reportService: '#service-option',
        reportRevenueCenter: '#revenue-center-option',
        reportVoided: '#voided-option',
        reportDiscount: '#discount-option',
        reportState: '#state-option',
        reportDiningOption: '#dining-option-option',
        reportTaxExempt: '#tax-exempt-option',
        reportItemTags: '#item-tags-option'
    };

    function getGroupIds() {
        var groupSelect = $('#report-restaurants');
        if (groupSelect.size() > 0) {
            return groupSelect.treepicker('val');
        }
        return null;
    }

    function augmentReportLoadUrl(url) {
        var separator = url.indexOf('?') == -1 ? '?' : '&';
        $.each(reportFilters, function(key, value) {
            url += separator + key + '=' + escape(value);
            separator = '&';
        });

        return url;
    }

    function addExtraParams(params, url) {
        if (!!params) {
            var separator = url.indexOf('?') == -1 ? '?' : '&';
            for (const [key, val] of Object.entries(params)) {
                url += separator + val.name + '=' + escape(val.value);
                separator = '&';
            }
        }
        return url;
    }

    function getMultiselectValues(dropdownElement) {
        var values = '';
        $(dropdownElement + ' option:selected').each(function() {
            values += $(this).val() + ',';
        });
        if (values.indexOf(',', values.length - 1) !== -1) {
            values = values.substring(0, values.length - 1);
        }
        return values;
    }

    function persistCurrentReportFilters() {
        // update our state
        reportFilters = getCurrentFilterState();
    }

    function getCurrentFilterState() {
        var reportsContainer = $('.report-options');
        var dateRangeBtn = reportsContainer.find('.btn-group[data-field="reportDateRange"]');
        var customStartInput = reportsContainer.find('input[name="reportDateStart"]');
        var customEndInput = reportsContainer.find('input[name="reportDateEnd"]');

        var newFilters = {};

        // date range
        newFilters.reportDateRange = dateRangeBtn.data('value');
        if (newFilters.reportDateRange == 'custom') {
            newFilters.reportDateStart = customStartInput.val();
            newFilters.reportDateEnd = customEndInput.val();
        }

        // shard selector
        var shardBtn = reportsContainer.find('.btn-group[data-field="reportShard"]');
        if (typeof shardBtn != 'undefined') {
            newFilters.reportShard = shardBtn.data('value');
        }

        // employee
        var employeeId = reportsContainer.find('[name="reportEmployee"]').val();
        if (employeeId == 'all' || typeof employeeId == 'undefined') {
            employeeId = '';
        }
        newFilters.reportEmployeeId = employeeId;

        // time range
        var timeRangeBtn = reportsContainer.find('.btn-group[data-field="reportTimeRange"]');
        if (timeRangeBtn.size() > 0) {
            // This data-value can be the database id of a RestaurantServicePeriod, so we need to use
            // attr('data-value') instead of data('value') because javascript doesn't have enough precision
            // in its number class to handle the 64-bit long
            newFilters.reportTimeRange = timeRangeBtn.attr('data-value');
            if (newFilters.reportTimeRange === TIME_RANGE_CUSTOM_HOURS) {
                newFilters.reportTimeStart = reportsContainer.find('input[name="reportTimeStart"]').val();
                newFilters.reportTimeEnd = reportsContainer.find('input[name="reportTimeEnd"]').val();
            }
        }
        // number of restaurants
        const restaurantIds = $('#allrestaurants-dropdown-container ul.dropdown-menu li.selected[data-is-leaf="true"]').map(function(i, e) {
            return e.dataset.val;
        });
        const uniqueIds = [...new Set(restaurantIds.toArray())];
        newFilters.numberOfRestaurants = Math.max(1, uniqueIds.length);

        // restaurant sets
        newFilters.reportGroupIds = getGroupIds() || '';

        // "more" params
        $.each(moreParamsElmts, function(queryParam, selector) {
            var filter = '';
            if (reportsContainer.find(selector + ':visible').length != 0) {
                filter = getMultiselectValues(selector + '-dropdown');
            }
            newFilters[queryParam] = filter;
        });

        return newFilters;
    }

    function updateCustomDateValue(input, date) {
        if (date && date != input.val()) {
            input.val(date);
            var datePicker = input.data('datepicker');
            if (datePicker) {
                datePicker.update();
            }
        }
    }

    // MM-dd-yyyy
    function updateCustomDateValues(startDate, endDate) {
        var reportsContainer = $('.report-options');
        var customStartInput = reportsContainer.find('input[name="reportDateStart"]');
        var customEndInput = reportsContainer.find('input[name="reportDateEnd"]');

        updateCustomDateValue(customStartInput, startDate);
        updateCustomDateValue(customEndInput, endDate);
    }

    var moreFilterIds = [
        '#more-dropdown-container',
        '#dining-option-option',
        '#discount-option',
        '#revenue-center-option',
        '#scheduled-option',
        '#service-area-option',
        '#service-option',
        '#source-option',
        '#state-option',
        '#tax-exempt-option',
        '#voided-option'
    ];

    function hideMoreFilters() {
        for (var i = 0; i < moreFilterIds.length; i++) {
            $(moreFilterIds[i]).hide();
        }
        $('#filter-container-hr').css('display', 'none');
    }

    function showMoreFilters() {
        for (var i = 0; i < moreFilterIds.length; i++) {
            $(moreFilterIds[i]).show();
        }
        Toast.reporting.shouldShowHr();
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function cleanupAsyncDownload(request) {
        if (request.passthroughs && request.passthroughs.link) {
            var link = request.passthroughs.link;
            link.prev('.progress-label').remove();
            link.find('.spinner').remove();
            link.find('img').show();
        }
    }

    var asyncReportHandlers = {
        download: {
            beforeRequest: function(request) {
                if (request.passthroughs && request.passthroughs.link) {
                    var link = request.passthroughs.link;
                    link.find('img').hide();
                    link.append('<img src="' + Toast.staticResRoot + '/images/ajax-loader-small.gif" class="spinner" style="margin-top:8px" />');
                }
            },
            success: function(data, request) {
                $('<iframe/>').attr({
                    src: data.downloadUrl,
                    style: 'visibility:hidden;display:none'
                }).appendTo($('body'));

                cleanupAsyncDownload(request);
                if (request.passthroughs && request.passthroughs.success) {
                    request.passthroughs.success();
                }
            },
            progress: function(progress, request) {
                if (request.passthroughs && request.passthroughs.link) {
                    var link = request.passthroughs.link;
                    var label = link.prev();
                    if (!label.is('.progress-label')) {
                        label = $('<div style="float:right;padding:5px;display:none" class="softer progress-label">Processed: <span></span></div>');
                        label.insertBefore(link);

                    }

                    var written = Toast.formatting.formatCommas(progress);
                    label.show().find('span').text(written);
                }
            },
            error: function(msg, request) {
                cleanupAsyncDownload(request);
                alert(msg, request);
            }
        },
    };

    /**
     * Poll for report result content, performing an exponential backoff.
     *
     * @param {object} request - Report request object as created by loadAsyncReportData
     * @param {Number} [attemptNum=0] - Internally used for tracking backoff, not generally necessary to be provided by users
     */
    function pollForReportResult(request, attemptNum, previousProgressUpdate) {
        function shouldCancelRequest(request) {
            var storedRequest = Toast.pendingReports[request.targetSpec];
            if (!storedRequest || storedRequest.contentUrl != request.contentUrl) {
                return true;
            }
            return false;
        }

        // see if we have been cancelled or overridden
        if (shouldCancelRequest(request)) return;

        // some sane minimum and maximum polling intervals
        var minMs = 100;
        var maxMs = 5000;
        attemptNum = attemptNum || 0;

        // calculate our timeout
        var waitMs = Math.pow(2, attemptNum) * minMs;
        waitMs = Math.min(maxMs, waitMs);

        setTimeout(function() {
            // see if we have been cancelled or overridden
            if (shouldCancelRequest(request)) return;

            // poll
            $.ajax(request.contentUrl, {
                type: 'GET',
                global: false,
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    // see if we have been cancelled or overridden
                    if (shouldCancelRequest(request)) return;

                    // check for JSON progress and error responses
                    if ('application/json' == jqXHR.getResponseHeader('content-type') && data) {
                        try {
                            data = $.parseJSON(data);
                            if (data.status) {

                                // should not really be integer statuses, but some may leak in especially in error conditions
                                if (data.status === 'ERROR' || (typeof(data.status) === 'number' && !(data.status >= 200 && data.status < 300))) {
                                    ($.isFunction(request.handler.error) ? request.handler.error : alert)(data.message || 'Error processing report', request);

                                    if (!shouldCancelRequest(request)) delete Toast.pendingReports[request.targetSpec];
                                    return;
                                } else if (data.status === 'IN_PROGRESS') {
                                    if ($.isFunction(request.handler.progress)) {
                                        request.handler.progress(data.progress, request);
                                    }
                                    if (data.progress === previousProgressUpdate) {
                                        attemptNum += 1;
                                    }
                                    previousProgressUpdate = data.progress;
                                    pollForReportResult(request, attemptNum, data.progress);

                                    return;
                                }
                            }
                        } catch (err) {
                            alert(err);
                            var msg = 'Error processing report result';
                            ($.isFunction(request.handler.error) ? request.handler.error : alert)(msg, request);
                            return;
                        }
                    }

                    // remove the tracked request
                    if (!shouldCancelRequest(request)) delete Toast.pendingReports[request.targetSpec];

                    // invoke our handler
                    request.handler.success(data, request);
                },
                error: function(jqXHR) {
                    // see if we have been cancelled or overridden
                    if (shouldCancelRequest(request)) return;

                    // we expect a 403 if the content is not yet there
                    if (jqXHR.status == 403) {
                        pollForReportResult(request, attemptNum + 1);
                    } else {
                        var msg = 'Error processing report';
                        ($.isFunction(request.handler.error) ? request.handler.error : alert)(msg, request);
                    }
                }
            });

        }, waitMs);
    }

    /**
     * Process a report request and retrieve results from S3
     *
     * @param {string} url - Create report request URL
     * @param {object} data - $.ajax compatible data format
     * @param {string} targetSpec - Unique but deterministic identifier of "where" the report content is going.  e.g. for HTML content this is likely the div ID.  This is used to prevent earlier requests from overwriting later requests if the first request is slow.  A random value can be provided for unique reports, e.g. a download request.
     * @param {function} handler - Callback for handling final content from S3. Must define success(data, contentType), should define error(errorMsg)
     */
    function loadAsyncReportData(url, data, targetSpec, handler, passthroughs) {
        var request = {
            requestUrl: url,
            targetSpec: targetSpec,
            handler: handler,
            passthroughs: passthroughs
        };

        function handleError(jqXHR) {
            var msg = 'An error was encountered processing the report, please try again or reload the page';
            // If we are actually intentionally sending an error response, it should contain a json object with a message,
            // but if this is some other kind of error that won't exist.
            if (jqXHR.responseText) {
                try {
                    const json = $.parseJSON(jqXHR.responseText);
                    if (json.message) {
                        msg = json.message;
                    }
                } catch (err) {
                    //console.log("Error parsing json from error response")
                }
            }
            ($.isFunction(handler.error) ? handler.error : alert)(msg, request);
        }

        if ($.isFunction(handler.beforeRequest)) {
            handler.beforeRequest(request);
        }

        $.ajax(url, {
            method: 'POST',
            data: data,
            global: false,
            success: function(data, textStatus, jqXHR) {
                // we expect a 202 with Location header
                var reportDataUrl = jqXHR.getResponseHeader('Location');
                if (reportDataUrl) {
                    request.contentUrl = reportDataUrl;

                    Toast.pendingReports = Toast.pendingReports || {};
                    Toast.pendingReports[targetSpec] = request;

                    // start polling
                    pollForReportResult(request);
                } else {
                    handleError(jqXHR);
                }
            },
            error: handleError,
        });
    }

    function getActiveTabLink() {
        return $('.report-container .nav-tabs li.active > a');
    }

    function loadReport(url, optionsParam) {
        var options = {
            timeFilterable: undefined,
            employeeFilterable: undefined,
            supportsGroups: undefined,
            supportsMoreFilters: undefined,
            async: false,
            sharded: false,
            firstLoad: true
        };
        if (optionsParam) {
            $.extend(options, optionsParam);
        }

        currentReportUrl = url;
        currentReportAsync = options.async;
        currentReportSharded = options.sharded;
        $(window).trigger('beforereportload', [currentReportUrl]);

        //add any additional params provided for this report
        if (Toast.extraReportParams) {
            //strip off any existing params on the url
            var cleanUrl = url.substr(0, url.indexOf('?'));
            var params = Toast.extraReportParams[cleanUrl];

            if (params) {
                for (var key in params) {
                    if (url.indexOf('?') >= 0) {
                        url += '&';
                    } else {
                        url += '?';
                    }
                    url += key + '=';
                    url += params[key];
                }
            }
        }

        if (typeof(options.timeFilterable) !== 'undefined') {
            if (options.timeFilterable) {
                var timeRangeBtn = $('#time-dropdown-container');
                timeRangeBtn.show();
                if (timeRangeBtn.attr('data-value') === TIME_RANGE_CUSTOM_HOURS) {
                    $('#time-custom-range').show();
                }
            } else {
                $('#time-dropdown-container,#time-custom-range').hide();
            }
        }

        if (typeof(options.employeeFilterable) !== 'undefined') {
            if (options.employeeFilterable) {
                $('#employee-dropdown-container').show();
            } else {
                $('#employee-dropdown-container').hide();
            }
        }

        if (typeof(options.supportsGroups) !== 'undefined') {
            if (options.supportsGroups) {
                $('#allrestaurants-dropdown-container').show();
            } else {
                $('#allrestaurants-dropdown-container').hide();
            }
        }

        if (typeof(options.supportsMoreFilters) !== 'undefined') {
            if (options.supportsMoreFilters) {
                showMoreFilters();
            } else {
                hideMoreFilters();
            }
        }

        // add all the filters to the URL
        url = augmentReportLoadUrl(url);
        url += '&activeTab=' + options.activeTabReport;
        if (!options.firstLoad) {
            url += '&firstLoad=false';
        }

        var container = $('.report-container');
        container.empty();

        // switching between reports with different permissions can cause no restaurants to be selected, if that
        // is the case we prompt the user to select them
        var groupIds = getGroupIds();
        if (groupIds != null && groupIds.length == 0) {
            container.append($('<div class="no-restaurants">No restaurants are currently selected.<br/>Please make a new selection from the restaurant dropdown in the report filters section.</div>'));
            return;
        }

        container.addClass('loading');
        container.mask('Loading...');
        $('.btn.load-report').remove();

        function onSuccess(html) {
            container.html(html);

            container.unmask();
            container.removeClass('loading');

            // add listeners for any non-visible tabs that load via ajax
            $('.report-container a[data-toggle=tab]').on('shown', loadReportTab);

            // if the tab that starts as visible loads via ajax, it won't get
            // triggered from the listener we just registered
            // since that event was already fired when the DOM was inserted by
            // the jQuery load function itself
            var activeTab = getActiveTabLink();
            if (activeTab.length > 0 && !activeTab.hasClass('no-initial-load')) {
                loadReportTab.call(activeTab[0]);
            }

            var reportsContainer = $('.report-options');
            var dateRange = reportsContainer.find('.btn-group[data-field="reportDateRange"]').data('value');

            var shardSelectorContainer = reportsContainer.find('#shard-dropdown-container').parent();
            if (options.sharded) {
                shardSelectorContainer.show();
            } else {
                shardSelectorContainer.hide();
            }

            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            if (dateRange == 'custom') {
                Toast.reporting.updateDisplayedDates(startDate, endDate, true);
                updateCustomDateValues(getDatePickerFormat(startDate), getDatePickerFormat(endDate));
            } else if (startDate) {
                Toast.reporting.updateDisplayedDates(startDate, endDate, false);
            }

            if (!arraysEqual(currentReportGroupIds, groupIds)) {
                Toast.reloadEmployees();
                currentReportGroupIds = groupIds;
            }

            $(window).trigger('reportload', [currentReportUrl]);
        }

        var onError = function(msg) {
            container.html('<div class="alert alert-error">' + msg + '</div>');
        };

        if (options.async) {
            var targetSpec = Toast.getOrCreateElmtId(container);
            var handler = {
                success: onSuccess,
                error: onError
            };
            loadAsyncReportData(url, null, targetSpec, handler);
        } else {
            var reportLoadStart = Date.now();
            Toast.reporting.lastReportLoad = reportLoadStart;
            $.get(url, function(html) {
                if (Toast.reporting.lastReportLoad != reportLoadStart) {
                    return;
                }

                html = Toast.trimKeepalivePrefix(html);
                onSuccess(html);
            }, 'html');
        }
    }

    function getDatePickerFormat(dateStr) {
        var dateParts = dateStr ? dateStr.split('/') : [];
        if (dateParts.length == 3) {

            if (dateParts[0].length == 1) {
                dateParts[0] = '0' + dateParts[0];
            }
            if (dateParts[1].length == 1) {
                dateParts[1] = '0' + dateParts[1];
            }
            if (dateParts[2].length == 2) {
                dateParts[2] = '20' + dateParts[2];
            }

            return dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];
        } else {
            return undefined;
        }
    }

    function showCustomDateOptions() {
        Toast.reporting.updateDisplayedDates($('#startDate').val(), $('#endDate').val(), true);
        $('.report-options .custom-range').css('display', 'inline-block').find('input').on('input', function() {
            Toast.reporting.highlightUpdateBtn();
        });
        $('.datepicker').on('click', function() {
            Toast.reporting.highlightUpdateBtn();
        });
    }

    function dataTableInit() {
        var clean = function(s) {
            return parseFloat(s.replace(/\$|,/g, ''));
        };
        var turnTimeFmtToSeconds = function(s) {
            if (!s || s.length == 0) return 0;
            var parts = s.split(':');
            var seconds = Number(parts[parts.length - 1]);
            if (parts.length > 1) {
                seconds += parts[parts.length - 2] * 60;
                if (parts.length > 2) {
                    seconds += parts[parts.length - 3] * 3600;
                }
            }
            return seconds;
        };
        var basicSort = function(s1, s2, transform) {
            var x = transform(s1),
                y = transform(s2);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        };
        jQuery.fn.dataTableExt.oSort['currency-asc'] = function(s1, s2) {
            return basicSort(s1, s2, clean);
        };
        jQuery.fn.dataTableExt.oSort['currency-desc'] = function(s1, s2) {
            return basicSort(s2, s1, clean);
        };
        jQuery.fn.dataTableExt.oSort['turntime-asc'] = function(s1, s2) {
            return basicSort(s1, s2, turnTimeFmtToSeconds);
        };
        jQuery.fn.dataTableExt.oSort['turntime-desc'] = function(s1, s2) {
            return basicSort(s2, s1, turnTimeFmtToSeconds);
        };
    }

    function reloadCurrentReport() {
        var activeTab = getActiveTabLink();
        var activeTabReport = (activeTab.size() > 0) ? activeTab[0].innerText : '';
        loadReport(currentReportUrl, {
            async: currentReportAsync,
            sharded: currentReportSharded,
            firstLoad: false,
            activeTabReport: activeTabReport
        });
    }

    function reportOptionsInit() {
        var reportOptions = $('.report-options');
        reportOptions.find('.btn-group').btnGroupDropdown();
        var button = $('#allrestaurants-dropdown-container');
        // Colour restaurant group selection if filteredRestaurant != currentRestaurant
        if (button.length > 0 && button.find('.selected-label').length > 0 && button.find('#report-restaurants').length > 0 &&
            button.find('.selected-label')[0].innerHTML !== button.find('#report-restaurants')[0].getAttribute('value')) {
            button.find('.dropdown-toggle').addClass('dropdown-non-default');
        }

        button.find('#report-restaurants').change(function(e) {
            // this event is triggered twice with different targets
            if (e.target.id === 'report-restaurants') {
                refreshReportExecutionMetadata();
            }
        });

        reportOptions.find('.btn-group[data-field="reportDateRange"] li a').click(function() {
            if ($(this).data('value') == 'custom') {
                showCustomDateOptions();
            } else {
                $(this).closest('.btn-group').siblings('.custom-range').hide();
                $('input.date-field').datepicker('hide');
            }
        });
        reportOptions.find('.btn-group[data-field="reportName"] li a').click(function(e) {
            e.preventDefault();

            // load reports via ajax
            var url = $(this).attr('href') + '?reportHtml=true';
            loadReport(url, {
                timeFilterable: $(this).data('timeFilterable'),
                employeeFilterable: $(this).data('employeeFilterable'),
                supportsGroups: $(this).data('supportsGroups'),
                supportsMoreFilters: $(this).data('supportsMoreFilters'),
                async: $(this).data('async'),
                sharded: $(this).data('sharded')
            });
        });

        $('#update-btn').click(function(e) {
            e.preventDefault();
            persistCurrentReportFilters();
            reloadCurrentReport();
            $('#update-btn').prop('disabled', true);
            setTimeout(function() {
                $('#update-btn').prop('disabled', false);
            }, 2000);
            $('#update-btn').addClass('btn-default').removeClass('dropdown-non-default');
        });

        $('#adhoc-export-submit-btn').click(function() {
            var exportUrl = $(this).data('url');
            var recipients = $('#adhoc-export-email-input').val();
            var token = $('#adhoc-export-email-token').val();

            persistCurrentReportFilters();

            $.ajax({
                url: Toast.reporting.augmentReportUrlWithFilters(exportUrl + '&recipients=' + recipients + '&authenticityToken=' + token, true)
            }).done(function() {
                Toast.alertMgr.clear();
                Toast.alertMgr.success('We are processing your report. An email will be sent to you shortly.');
            }).fail(function() {
                Toast.alertMgr.clear();
                Toast.alertMgr.error('Failed to process email export.');
            });
        });

        var markDatePickerDirty = function(e) {
            $(e.target).data('dirty', true);
        };

        // initialize the date picker js
        var customDates = $('input.date-field');
        customDates.datepicker({
            format: 'mm-dd-yyyy'
        }).click(function() {
            customDates.not($(this)).blur();
        });
        var customStartDate = customDates.filter('[name=reportDateStart]');
        var customEndDate = customDates.filter('[name=reportDateEnd]');
        customStartDate.on('changeDate', function(ev) {
            var endDatePicker = customEndDate.data('datepicker');
            if (ev.date.valueOf() > endDatePicker.date.valueOf()) {
                endDatePicker.date = new Date(ev.date);
                endDatePicker.setValue();
                endDatePicker.update();
            }
            customStartDate.data('datepicker').hide();
            customEndDate[0].focus();
            endDatePicker.show();
        });
        customDates.on('changeDate', markDatePickerDirty);
        customDates.on('change', markDatePickerDirty);

        customDates.on('blur', function() {
            var dirty = $(this).data('dirty');
            if (dirty) {
                refreshReportExecutionMetadata();
                $(this).data('dirty', false);
            }
        });

        if (reportOptions.find('.btn-group[data-field="reportDateRange"]').data('value') == 'custom') {
            showCustomDateOptions();
        }
        reportOptions.find('.btn-group[data-field="reportDateRange"] li a').click(function() {
            Toast.reporting.highlightUpdateBtn();
            var button = $('#date-dropdown-container');
            if (button.length > 0 && button.find('.dropdown-label').length > 0) {
                if (button.find('.dropdown-label')[0].innerHTML !== 'Today') {
                    button.find('.dropdown-toggle').addClass('dropdown-non-default');
                } else {
                    button.find('.dropdown-toggle').removeClass('dropdown-non-default');
                }
            }

            refreshReportExecutionMetadata();
        });
        var reportShardLink = reportOptions.find('.btn-group[data-field="reportShard"] li a');
        if (reportShardLink) {
            reportShardLink.on('click', Toast.reporting.highlightUpdateBtn);
        }

        if (reportOptions.find('.btn-group[data-field="reportTimeRange"]').attr('data-value') === TIME_RANGE_CUSTOM_HOURS) {
            $('.report-options .custom-time-range input').on('input', function() {
                Toast.reporting.highlightUpdateBtn();
            });
        }

        reportOptions.find('.btn-group[data-field="reportTimeRange"] li a').off('click').click(function(e) {
            var timeRangeBtn = $(this);
            Toast.reporting.updateCustomTimeOptions(timeRangeBtn);
            e.preventDefault();

            if (timeRangeBtn.attr('data-value') == 'archived') {
                timeRangeBtn.closest('.dropdown-menu').find('li a[data-archived=true]').show();
                timeRangeBtn.hide();
                e.stopImmediatePropagation();
                return;
            }

            Toast.reporting.highlightUpdateBtn();
            var button = $('#time-dropdown-container'),
                label = button.find('.dropdown-label');

            // values are longs in java, and we can't use data('value') because javascript numbers don't have enough precision
            var selectedValue = timeRangeBtn.attr('data-value');
            button.attr('data-value', selectedValue);
            label.html(timeRangeBtn.html());
            if (button.length > 0 && button.find('.dropdown-label').length > 0) {
                if (selectedValue !== TIME_RANGE_ALL_HOURS) {
                    button.find('.dropdown-toggle').addClass('dropdown-non-default');
                } else {
                    button.find('.dropdown-toggle').removeClass('dropdown-non-default');
                }
            }
        });

        $('#filtered-restaurant').bind('DOMSubtreeModified', function() {
            Toast.reporting.highlightUpdateBtn();
            var button = $('#allrestaurants-dropdown-container');
            if (button.length > 0 && button.find('.selected-label').length > 0 &&
                button.find('#report-restaurants').length > 0) {
                if (button.find('.selected-label')[0].innerHTML !== button.find('#report-restaurants')[0].getAttribute('value')) {
                    button.find('.dropdown-toggle').addClass('dropdown-non-default');
                } else {
                    button.find('.dropdown-toggle').removeClass('dropdown-non-default');
                }
            }
        });

        currentReportGroupIds = getGroupIds();
        persistCurrentReportFilters();
    }

    function defaultExecutionMetadata() {
        return {
            enableWeb: true,
            enableEmailExport: true,
        };
    }

    /**
     * Show/hide the update button and hide/show the warning.
     */
    function toggleUpdateButton(show, errorMsg, warningMsg) {
        var tab = $('.report-container .tab-pane.active'),
            alert = tab.find('.no-web-report-alert'),
            updateBtn = $('#update-btn'),
            isError = !!errorMsg,
            message = errorMsg || warningMsg;

        if (message || !show) {
            if (typeof message === 'undefined' || errorMsg === null) {
                message = 'Please use the <strong>Email Export</strong> button to run this project for the selected date range. <a href="https://toast.force.com/knowledgebase/s/article/End-of-Year-Reporting">Learn More</a>';
            }
            if (alert.length > 0) {
                alert.html(message);
            } else {
                tab.prepend('<div class="alert no-web-report-alert">' + message + '</div>');
            }
            tab.find('.no-web-report-alert').toggleClass('alert-error', isError);
            alert.show();
        } else {
            alert.hide();
        }
        updateBtn.toggle(show);
        $('#first-load-container').toggle(show);
    }

    /**
     * Figure out if web reporting and email export are allowed and show/hide the appropriate buttons/warnings.
     */
    function refreshReportExecutionMetadata(callback) {
        var promise = $.Deferred(),
            activeTabLink = getActiveTabLink(),
            report = activeTabLink.data('report') || 'GENERIC';

        promise.done(function(value) {
            var adhocExportUrl = activeTabLink.attr('adhoc-export-url'),
                enableEmailExport = adhocExportUrl && value.enableEmailExport,
                enableWeb = value.enableWeb || !enableEmailExport;

            toggleUpdateButton(enableWeb, value.errorMsg, value.warningMsg);
            toggleAdhocExportBtn(enableEmailExport, adhocExportUrl);

            if (value.reportingDatabaseSnapshotDate) {
                $('#stale-reporting-data-refresh-date').html(value.reportingDatabaseSnapshotDate);
                $('#stale-reporting-data-alert').show();
                $('#home-stale-reporting-data-refresh-date').html(value.reportingDatabaseSnapshotDate);
                $('#home-stale-reporting-data-alert').show();
            } else {
                $('#stale-reporting-data-alert').hide();
                $('#home-stale-reporting-data-alert').hide();
            }

            if ($.isFunction(callback)) {
                callback({
                    enableWeb: enableWeb,
                    enableEmailExport: enableEmailExport,
                    errorMsg: value.errorMsg,
                    warningMsg: value.warningMsg
                });
            }
        });

        // if we can't figure out the report type or the ajax call fails, default to "everything is allowed"
        if (report) {
            var data = getCurrentFilterState();
            data.report = report;
            $.ajax({
                url: '/restaurants/admin/reports/executionMetaData',
                data: data,
                success: function(response) {
                    var metadata = {
                        enableWeb: response.availableFormats.indexOf('WEB') >= 0,
                        enableEmailExport: response.availableFormats.indexOf('EMAIL_EXPORT') >= 0,
                        errorMsg: response.errorMsg,
                        warningMsg: response.warningMsg
                    };
                    if (response.databaseType === 'REPORTING') {
                        metadata.reportingDatabaseSnapshotDate = response.reportingDatabaseSnapshotDate;
                    }
                    promise.resolve(metadata);
                },
                error: function() {
                    promise.resolve(defaultExecutionMetadata());
                }
            });
        } else {
            promise.resolve(defaultExecutionMetadata());
        }
    }

    function toggleAdhocExportBtn(show, adhocExportUrl) {
        var btn = $('#adhoc-export-btn'),
            submitBtn = $('#adhoc-export-submit-btn');
        if (show) {
            btn.show();
            submitBtn.data('url', adhocExportUrl);
        } else {
            btn.hide();
            submitBtn.data('url', '');
        }
    }

    function loadReportTab() {
        // 'this' is the tab link
        var tab = $(this);
        var tabPane = $(tab.attr('href'));
        var loadUrl = tab.data('loadUrl');
        var async = tab.data('async');
        var sharded = tab.data('sharded');
        var hideLoadingMask = tab.data('hideLoadingMask');

        //hide/show report shard selector
        var shardBtn = $('.shard-btn > button');
        if (shardBtn !== undefined) {
            shardBtn.prop('disabled', !sharded);
        }

        refreshReportExecutionMetadata(function(metadata) {
            //hide/show adhoc export URL
            if (loadUrl && !metadata.errorMsg && (!tab.data('loaded') || tab.data('dirty'))) {
                tab.data('loaded', true);
                tab.removeData('dirty');

                if (metadata.enableWeb) {
                    tabPane.css('min-height', '80px');
                    if (hideLoadingMask !== true) {
                        tabPane.addClass('loading');
                        tabPane.mask('Loading...');
                    }

                    loadUrl = augmentReportLoadUrl(loadUrl);

                    function onSuccess(html) {
                        tabPane.html(html);

                        tabPane.unmask();
                        tabPane.removeClass('loading');
                        tabPane.css('min-height', '');
                    }

                    function onError(msg) {
                        tabPane.html('<div class="alert alert-error">' + msg + '</div>');
                    }

                    if (async) {
                        var targetSpec = Toast.getOrCreateElmtId(tabPane);
                        var handler = {
                            success: onSuccess,
                            error: onError
                        };
                        loadAsyncReportData(loadUrl, null, targetSpec, handler);
                    } else {
                        $.get(loadUrl, function(html) {
                            html = Toast.trimKeepalivePrefix(html);
                            onSuccess(html);
                        }, 'html');
                    }
                }
            } else if (tab.data('dirty')) {
                tab.removeData('dirty');
                tabPane.find('.dataTable').each(function() {
                    $(this).dataTable().fnDraw();
                });
            }
        });
    }

    function dataTableInitComplete(oSettings) {
        if (oSettings.oInit.excelExportUrl) {
            var tableWrapper = $(oSettings.nTableWrapper);
            tableWrapper.on('click', 'a.export-link', function(e) {
                e.preventDefault();

                var link = $(this);
                var url = link.attr('href');
                // add all the filters to the URL
                url = augmentReportLoadUrl(url);
                if (!!oSettings.oInit.fnServerParams) {
                    var aoData = [];
                    oSettings.oInit.fnServerParams(aoData);
                    url = addExtraParams(aoData, url);
                }

                if (link.data('async')) {
                    // prevent a user from requesting the same again while the previous request is still loading
                    Toast.pendingReports = Toast.pendingReports || {};

                    var alreadyRunning = false;
                    $.each(Toast.pendingReports, function() {
                        if (this.requestUrl == url) {
                            alreadyRunning = true;
                            return false;
                        }
                    });
                    if (!alreadyRunning) {
                        var targetSpec = 'export_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);
                        var handler = asyncReportHandlers.download;
                        var passthroughs = {
                            link: link
                        };
                        loadAsyncReportData(url, null, targetSpec, handler, passthroughs);
                    }
                } else {
                    window.location = url;
                }
            });
        }
    }

    return {
        init: function(startReportUrl, options) {
            reportOptionsInit();
            dataTableInit();
            loadReport(startReportUrl + '?reportHtml=true', options);
        },
        highlightUpdateBtn: function() {
            $('#update-btn,#adhoc-export-btn').addClass('dropdown-non-default').removeClass('btn-default');
        },
        reloadReport: function() {
            reloadCurrentReport();
        },
        exposeEmailExport: function(showAdhocButton, adhocExportUrl) {
            toggleAdhocExportBtn(showAdhocButton, adhocExportUrl);
        },
        refreshExecutionMetaData: function(callback) {
            refreshReportExecutionMetadata(callback);
        },
        reloadReportTab: function(tabId, show) {
            var tabLink = $('a[href="#' + tabId + '"]');
            tabLink.data('dirty', true);
            if (tabLink.closest('li').hasClass('active')) {
                loadReportTab.call(tabLink);
            } else if (show) {
                tabLink.tab('show');
            }
        },
        loadHtmlAsyncReport: function(url, containerId, success, error) {
            var container = $('#' + containerId);
            var handler = {
                success: function(html) {
                    container.html(html);
                    if ($.isFunction(success)) {
                        success();
                    }
                },
                error: function(msg) {
                    container.html('<div class="alert alert-error">' + msg + '</div>');
                    if ($.isFunction(error)) {
                        error();
                    }
                }
            };
            loadAsyncReportData(url, null, containerId, handler);
        },
        loadAsyncReportDataHandler: function(url, data, targetSpec, handler, passthroughs) {
            loadAsyncReportData(url, data, targetSpec, handler, passthroughs);
        },
        makeExportAsync: function(linkId) {
            $('#' + linkId).click(function(e) {
                e.preventDefault();
                var handler = asyncReportHandlers.download;
                var url = augmentReportLoadUrl($(this).attr('href'));

                var alreadyRunning = false;

                Toast.pendingReports = Toast.pendingReports || {};
                $.each(Toast.pendingReports, function() {
                    if (this.requestUrl == url) {
                        alreadyRunning = true;
                        return false;
                    }
                });

                if (!alreadyRunning) {
                    loadAsyncReportData(url, null, linkId, handler);
                }
            });
        },
        asyncFormExportSubmit: function(form, onSuccess) {
            var handler = asyncReportHandlers.download;
            var url = form.attr('action');
            var data = form.serialize();
            var targetSpec = Toast.getOrCreateElmtId(form);
            var passthroughs = {
                success: onSuccess
            };
            loadAsyncReportData(url, data, targetSpec, handler, passthroughs);
        },
        updateCustomTimeOptions: function(timeRangeBtn) {
            if (timeRangeBtn.attr('data-value') === TIME_RANGE_CUSTOM_HOURS) {
                $('.report-options .custom-time-range').css('display', 'inline-block').find('input').on('input', function() {
                    Toast.reporting.highlightUpdateBtn();
                });
            } else {
                $('.report-options .custom-time-range').hide();
            }
        },
        shouldShowHr: function() {
            var filterHr = $('#filter-container-hr');
            if (filterHr.siblings().length != 0) {
                filterHr.css('display', 'block');
            }
        },
        shouldRemoveHr: function() {
            var filterHr = $('#filter-container-hr');
            if (filterHr.siblings().length == 1) {
                filterHr.css('display', 'none');
            }
        },
        augmentTable: function(tableId, options) {
            var columnSelector = options.noColumnSelector ? '' : '<"column-selector"C>';
            var perPageSelector = options.noPerPageSelector ? '' : '<"per-page-selector"l>';
            var exportSelector = options.noExportSelector ? '' : '<"excel-export"E>';

            var sDom = (options.search ? 'f' : '') + '<"row"<r>><"row"' + perPageSelector + exportSelector + columnSelector + '<"current-page-info"i>>t<"row"<p>>';

            var fnCreatedRow;
            if (typeof(options.onRowSelected) === 'function') {
                var existingCallback = options.fnCreatedRow;
                fnCreatedRow = function(nRow) {
                    var callbackArgs = arguments;
                    $(nRow).mouseover(function() {
                        $(this).addClass('info cursor-pointer');
                    }).mouseout(function() {
                        $(this).removeClass('info cursor-pointer');
                    }).click(function(e) {
                        if (!e.target || $(e.target).closest('.report-cell-link').length === 0) {
                            var augmentedArgs = Array.prototype.slice.call(callbackArgs);
                            augmentedArgs.unshift(e);
                            options.onRowSelected.apply(this, augmentedArgs);
                        }
                    });

                    if (existingCallback) {
                        existingCallback.apply(this, callbackArgs);
                    }
                };
            } else {
                fnCreatedRow = options.fnCreatedRow;
            }

            var table = $('#' + tableId);

            var defaultOptions = {
                sDom: sDom,
                sWrapper: 'dataTables_wrapper form-inline',
                sPaginationType: 'bootstrap',
                aaSorting: [
                    [0, 'desc']
                ],
                bServerSide: true,
                iDisplayLength: 25,
                oColVis: {
                    iOverlayFade: 100
                },
                bAutoWidth: false,
                fnInitComplete: dataTableInitComplete,
                fnDrawCallback: function(oSettings) {
                    var tableWrapper = $(oSettings.nTableWrapper);
                    if (oSettings._iRecordsTotal < oSettings._iDisplayLength) {
                        tableWrapper.find('.dataTables_paginate').hide();
                    } else {
                        tableWrapper.find('.dataTables_paginate').show();
                    }

                },
                fnCreatedRow: fnCreatedRow,
                fnServerData: function(sSource, aoData, fnCallback, oSettings) {
                    var tweakedAoData = [];
                    var unnecessaryParam = /^(bRegex)|(bSearchable)|(bSortable)/;
                    $.each(aoData, function(idx, param) {
                        if (!unnecessaryParam.test(param.name)) {
                            tweakedAoData.push(param);
                        }
                    });
                    $.each(oSettings.aoColumns, function(idx, column) {
                        tweakedAoData.push({
                            name: 'bVisible_' + idx,
                            value: column.bVisible
                        });
                    });

                    // report filters - note that this needs to be kept in sync with augmentReportLoadUrl
                    $.each(reportFilters, function(paramName, paramValue) {
                        tweakedAoData.push({
                            name: paramName,
                            value: paramValue
                        });
                    });

                    function onError(msg) {
                        msg = msg || 'Error encountered retrieving results';
                        table.fnProcessingIndicator(false);
                        alert(msg);
                    }

                    function onSuccess(json) {
                        var tableWrapper = $('#' + table[0].id + '_wrapper');
                        var excelExport = tableWrapper.find('.excel-export');
                        if (excelExport.length == 1) {
                            if (json.iTotalRecords === 0) {
                                excelExport.hide();
                            } else {
                                excelExport.show();
                            }
                        }
                        fnCallback.call(this, json);
                    }

                    if (options.async) {
                        var targetSpec = table[0].id;
                        var handler = {
                            success: onSuccess,
                            error: onError
                        };
                        loadAsyncReportData(sSource, tweakedAoData, targetSpec, handler);
                    } else {
                        oSettings.jqXHR = $.ajax({
                            dataType: 'text',
                            type: 'GET',
                            url: sSource,
                            data: tweakedAoData,
                            success: function(text) {
                                text = Toast.trimKeepalivePrefix(text);
                                var json = $.parseJSON(text);

                                if (typeof(json.status) !== 'undefined') {
                                    onError(json.message);
                                } else {
                                    onSuccess(json);
                                }
                            },
                            error: function() {
                                table.fnProcessingIndicator(false);
                            }
                        });
                    }
                },
                sCookiePrefix: 'ToastTable_'
            };

            if (options.stateIdentifier) {
                defaultOptions.fnStateSave = function(oSettings, oData) {
                    localStorage.setItem('ToastTables_' + options.stateIdentifier, JSON.stringify(oData));
                };
                defaultOptions.fnStateLoad = function() {
                    return JSON.parse(localStorage.getItem('ToastTables_' + options.stateIdentifier));
                };
            }

            options = $.extend(true, defaultOptions, options);

            var processing = false;
            table.bind('processing', function(e, oSettings, bShow) {
                if (bShow) {
                    if (processing) return;
                    table.mask('Loading...', 500);
                    processing = true;
                } else {
                    if (!processing) return;
                    table.unmask();
                    processing = false;
                }
            });

            var dataTable = table.dataTable(options);
            if (options.searchDelay > 0) {
                dataTable.fnSetFilteringDelay(options.searchDelay);
            }
            // This option is incompatible with searchDelay
            if (options.searchOnEnter === true) {
                dataTable.fnSetFilteringOnEnter();
            }
            return dataTable.bootstrapifyDataTable();
        },
        augmentDOMTable: function(tableId, options) {
            var columnSelector = options.noColumnSelector ? '' : '<"column-selector"C>';
            var currentPageInfo = options.noPageInfo ? '' : '<"current-page-info"i>';
            var exportSelector = options.noExportSelector ? '' : '<"excel-export"E>';

            var sDom = '<"row"<r>><"row"<"per-page-selector"l>' + exportSelector + columnSelector + currentPageInfo + '>t<"row"<p>>';

            options = $.extend(true, {
                sDom: sDom,
                sWrapper: 'dataTables_wrapper form-inline',
                sPaginationType: 'bootstrap',
                iDisplayLength: 25,
                oColVis: {
                    iOverlayFade: 100
                },
                bAutoWidth: false,
                bDestroy: true,
                fnInitComplete: dataTableInitComplete,
                fnDrawCallback: function(oSettings) {
                    var tableWrapper = $(oSettings.nTableWrapper);
                    if (oSettings.fnRecordsTotal() < oSettings._iDisplayLength) {
                        tableWrapper.find('.dataTables_paginate').hide();
                    } else {
                        tableWrapper.find('.dataTables_paginate').show();
                    }
                }
            }, options);
            return $('#' + tableId).dataTable(options).bootstrapifyDataTable();
        },
        drawChart: function(drawFn) {
            if (googleChartsLoaded) {
                drawFn.call(Toast.reporting);
            } else {
                google.setOnLoadCallback(drawFn);
            }
        },
        parseChartTimeSeries: function(rawTimeSeries, columns) {
            if (!rawTimeSeries) {
                return [];
            }

            var timeSeries = $.parseJSON(rawTimeSeries);

            var rows = [];
            if (timeSeries.dataPoints) {
                for (var i = 0; i < timeSeries.dataPoints.length; i++) {
                    var dataPoint = timeSeries.dataPoints[i];

                    var row = [];

                    // convert the int to a string
                    var yyyymmdd = '' + dataPoint.yyyymmdd;

                    var year = yyyymmdd.substring(0, 4);
                    var month = parseInt(yyyymmdd.substring(4, 6), 10) - 1;
                    var day = yyyymmdd.substring(6);

                    var date;
                    if (dataPoint.hourOfDay) {
                        date = new Date(year, month, day, dataPoint.hourOfDay);
                    } else {
                        date = new Date(year, month, day);
                    }

                    row.push(date);
                    row.push(dataPoint.value);

                    for (var n = 0; n < dataPoint.moreValues.length; n++) {
                        row.push(dataPoint.moreValues[n]);
                    }

                    while (row.length < columns.length) {
                        row.push(0);
                    }

                    rows.push(row);
                }
            }

            return rows;
        },
        googleChartsCallback: function() {
            googleChartsLoaded = true;
        },
        setReportRestaurant: function(leafSetId) {
            var picker = $('#report-restaurants');
            picker.treepicker('val', [leafSetId]);

            $('.report-container .nav-tabs > li > a').data('dirty', true);
        },
        // dates in MM-dd-yyyy
        setReportDates: function(startDateText, endDateText) {
            var reportOptions = $('.report-options');
            var dateRange = reportOptions.find('.btn-group[data-field="reportDateRange"]');
            dateRange.data('value', 'custom');
            dateRange.find('.dropdown-label').html('Custom Date');

            updateCustomDateValues(startDateText, endDateText);
            showCustomDateOptions();
            persistCurrentReportFilters();
            Toast.reporting.updateDisplayedDates(startDateText, endDateText, true);
        },
        // on some reporting landing pages, e.g. sales summary, report is only loaded by request, not on initial page load
        loadNoInitialLoadTab: function(container, url, tabName) {
            container.addClass('loading');
            container.mask('Loading...');
            Toast.reporting.loadHtmlAsyncReport(augmentReportLoadUrl(url), tabName, function() {
                container.unmask();
                container.removeClass('loading');
            }, function() {
                alert('Error loading report');
                container.unmask();
                container.removeClass('loading');
            });
        },
        updateDisplayedDates: function(startDateText, endDateText, isCustom) {
            var dateDisplay = $('#date-display');
            if (isCustom) {
                dateDisplay.hide();
            } else {
                if (dateDisplay.length == 0) {
                    dateDisplay = $('<div id="date-display" class="report-options-label"></div>').appendTo($('.admin-toolbar .admin-col-right').empty());
                }
                dateDisplay.html('From ' + startDateText + ' to ' + endDateText);
                dateDisplay.show();
            }

        },
        augmentReportUrlWithFilters: function(url) {
            return augmentReportLoadUrl(url);
        },
        floatingHeader: function(tableID) {
            var headerID = tableID + '-header-fixed';
            var headerDOMString = '<table class="table table-bordered table-striped header-fixed" id="' + headerID + '"></table>';

            var createHeader = function() {
                // create a fixed-position header based on the current header and place it under the nv bar
                if (isShowHeader()) {
                    $('#' + tableID).after(headerDOMString);
                    let fixedHeader = $('#' + headerID);
                    fixedHeader.css('top', getHeaderTop());
                    fixedHeader.css('width', $('#' + tableID).width());
                    var header = $('#' + tableID + ' > thead');
                    fixedHeader = fixedHeader.append(header.clone());
                    $.each(header.find('tr > th'), function(ind, val) {
                        var originalWidth = $(val).width();
                        $(fixedHeader.find('tr > th')[ind]).width(originalWidth);
                    });
                }
            };

            var isShowHeader = function() {
                var tableWidth = $('#' + tableID).width();
                var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                return tableWidth <= windowWidth;
            };

            var getHeaderTop = function() {
                var nvBarHeight = $('.navbar-fixed-top').height();
                // nv bar changes height and disappears on window scroll when window width is small
                return nvBarHeight == 82 ? nvBarHeight : 0;
            };

            $(window).bind('scroll', function() {
                var offset = $(this).scrollTop();
                var table = $('#' + tableID);
                if (table.length > 0) {
                    var tableOffset = table.offset().top - getHeaderTop();

                    var fixedHeader = $('#' + headerID);
                    if (offset >= tableOffset) {
                        if (fixedHeader.length == 0) {
                            createHeader();
                        }
                    } else if (offset < tableOffset) {
                        fixedHeader.remove();
                    }
                }
            });

            $(window).bind('resize', function() {
                var table = $('#' + tableID);
                if (table.length > 0) {
                    var tableOffset = table.offset().top - getHeaderTop();
                    var fixedHeader = $('#' + headerID);
                    if ($(window).scrollTop() >= tableOffset) {
                        if (fixedHeader.length > 0) {
                            fixedHeader.remove();
                        }
                        createHeader();
                    }
                }
            });
        }
    };

})();

Toast.reporting.labor = (function() {
    var dialog;
    var placeholder;
    var container;
    var buttons;
    var footerSpinner;

    function initVars() {
        dialog = $('#time-entry');
        placeholder = dialog.find('.template');
        container = dialog.find('.actual');
        buttons = dialog.find('.modal-footer button');
        footerSpinner = dialog.find('.modal-footer img');
    }

    function submitForm() {
        buttons.prop('disabled', true);
        footerSpinner.show();

        var form = dialog.find('form');
        container.load(form.attr('action'), form.serializeArray(), function(responseHtml) {
            var responseDom = $(responseHtml);
            if (responseDom.is('form') || responseDom.find('form').length > 0) {
                afterLoad();
            }
        });
    }

    function beforeLoad() {
        placeholder.show();
        container.hide();
        dialog.css('top', '');
        $('body').css('overflow', 'hidden');
    }

    function afterLoad() {
        placeholder.hide();
        container.show();

        var dateFields = dialog.find('.date-field');
        if (dateFields.size() == 2) {
            dateFields.datepicker({
                format: 'mm-dd-yyyy'
            });
            // Set the z-index for the last two date pickers
            var pickers = $('.datepicker');
            pickers.slice(pickers.size() - 2).css('z-index', 1050);

            dialog.off('hidden').on('hidden', function() {
                var pickers = $('.datepicker');
                pickers.slice(pickers.size() - 2).remove();
            });
        }

        dialog.find('#entry_job_id').change(function() {
            if ($('#entry_job_id :selected').attr('data')) {
                $('#cash-tips').show();
            } else {
                $('#cash-tips').hide();
            }
        });
        dialog.find('select').bootstrapifySelect();

        var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        // adjust the size of the dialog
        if (windowHeight < dialog.height()) {
            var inner = dialog.find('.actual');
            inner.height(inner.height() - dialog.height() + windowHeight - 20);
            inner.css('overflow-y', 'auto');
            dialog.css('top', '10px');
        } else if (dialog.offset().top + dialog.height() > windowHeight) {
            dialog.css('top', ((windowHeight - dialog.height()) / 2) + 'px');
        }

        buttons.prop('disabled', false);
        footerSpinner.hide();

        dialog.on('hidden', function() {
            $('body').css('overflow', 'auto');
        });
    }

    function showTimeEntryDialog(timeEntryId, rUserId, rId) {
        beforeLoad();

        if (timeEntryId) {
            container.load('labor/timeEntry?id=' + timeEntryId, function(responseText, textStatus) {
                if (textStatus === 'success') {
                    afterLoad();
                } else {
                    dialog.modal('hide');
                }
            });
            dialog.find('.btn-danger').show();
            dialog.find('h3').text('Update Time Entry');
        } else if (rUserId) {
            container.load('labor/timeEntryUserCreate?rUserId=' + rUserId, function(responseText, textStatus) {
                if (textStatus === 'success') {
                    afterLoad();
                } else {
                    dialog.modal('hide');
                }
            });
            dialog.find('.btn-danger').hide();
            dialog.find('h3').text('Add Time Entry');
        } else {
            container.load('labor/timeEntryCreate' + '?previousRestaurantId=' + $('#restaurantId').val() + (rId == null ? '' : '&restaurantId=' + rId), function(responseText, textStatus) {
                if (textStatus === 'success') {
                    afterLoad();
                    $('#entry_user_id').change(function() {
                        submitForm();
                    });
                } else {
                    dialog.modal('hide');
                }
            });
            dialog.find('.btn-danger').hide();
            dialog.find('h3').text('Add Time Entry');
        }

        dialog.modal();
    }

    function showTimeEntryBreakDialog(timeEntryId, timeEntryBreakId) {
        beforeLoad();

        if (timeEntryBreakId) {
            container.load('labor/timeEntryBreak?id=' + timeEntryBreakId + '&entryId=' + timeEntryId, function(responseText, textStatus) {
                if (textStatus === 'success') {
                    afterLoad();
                } else {
                    dialog.modal('hide');
                }
            });
            dialog.find('.btn-danger').show();
            dialog.find('h3').text('Update Break');
        } else {
            container.load('labor/timeEntryBreakCreate?entryId=' + timeEntryId, function(responseText, textStatus) {
                if (textStatus === 'success') {
                    afterLoad();
                } else {
                    dialog.modal('hide');
                }
            });
            dialog.find('.btn-danger').hide();
            dialog.find('h3').text('Add Break');
        }

        dialog.modal();
    }

    return {
        init: function() {
            initVars();

            dialog.find('.btn-primary').click(function() {
                submitForm();
            });
            dialog.find('.btn-danger').click(function() {
                var isBreaksForm = Toast.editorCommon.getForm().attr('id') == 'breaks-form';
                if (isBreaksForm) {
                    if (confirm('Are you sure you want to delete this break?')) {
                        $('#delete_entry').val('false');
                        $('#delete_break').val('true');
                        submitForm();
                    }
                } else if (confirm('Are you sure you want to delete this time entry?')) {
                    $('#delete_entry').val('true');
                    $('#delete_break').val('false');
                    submitForm();
                }
            });
        },
        showEditTimeEntryDialog: function(timeEntryId) {
            showTimeEntryDialog(timeEntryId, null);
        },
        showNewTimeEntryDialog: function(rId, rUserId) {
            showTimeEntryDialog(null, rUserId, rId);
        },
        showEditTimeEntryBreakDialog: function(timeEntryId, timeEntryBreakId) {
            showTimeEntryBreakDialog(timeEntryId, timeEntryBreakId);
        },
    };
})();

Toast.ownerTargetEditor = (function() {
    return {
        init: function() {
            Toast.enableEntityTableSelect($('.owner-target-container'));
            $(document).ready(function() {
                $('.targetLabel').tooltip({
                    container: '.targetLabel'
                });
                $('.ownerLabel').tooltip({
                    container: '.ownerLabel'
                });
                $('#target_input').change(function(event) {
                    var openModalButton = document.getElementById('openModalButton');
                    if (openModalButton) {
                        openModalButton.value = event.target.value;
                        openModalButton.click();
                    }
                });
            });
        }
    };
});

Toast.auditing = (function() {
    var toastAuditingUrl;

    return {
        init: function(rId, url) {
            Toast.editorCommon.init();
            toastAuditingUrl = url;
        },
        submit: function(isOrdersType) {
            $('#audit-div').empty().show();
            $('#audit-loading').show();
            $('#btn-orders-submit').prop('disabled', true);
            $('#btn-restaurant-users-submit').prop('disabled', true);

            var requestType = isOrdersType ? 'ORDERS' : 'RESTAURANT_USERS';
            $('input[name="updatesType"]').val(requestType);
            var params = $('#audit-form').serialize();

            $.get(toastAuditingUrl, params, function(response) {
                $('#audit-loading').hide();
                $('#audit-div').html(response);

                $('#btn-orders-submit').prop('disabled', false);
                $('#btn-restaurant-users-submit').prop('disabled', false);
                $('html,body').animate({
                    scrollTop: $('#anchor').offset().top
                }, 'fast');
            });
        }
    };
})();

Toast.preModifierEditor = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var preModTable = $('#preModifierEditor-table');
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-preModifier-new'), preModTable, undefined, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableChildEntityTable(preModTable, 'preModifier');
                Toast.editorCommon.updateCheckboxes(preModTable);
                Toast.editorCommon.enableColorEditor($(this).find('.color-editor'));

                $(this).on('click', '.scaleprice :checkbox', function() {
                    var mode = $(this).is(':checked') ? 'true' : 'false';
                    $(this).closest('td').find(':hidden').val(mode);

                    var fixedPriceCell = $(this).closest('tr').find('.fixedcolumn');
                    var scalePriceCell = $(this).closest('tr').find('.scalecolumn');

                    var fixedInput = fixedPriceCell.find('input');
                    var scaleInput = scalePriceCell.find('input');

                    if ($(this).is(':checked')) {
                        scalePriceCell.addClass('fadedin').removeClass('fadedout');
                        fixedPriceCell.removeClass('fadedin').addClass('fadedout');
                        scaleInput.removeAttr('disabled');
                        fixedInput.attr('disabled', 'disabled');
                    } else {
                        scalePriceCell.removeClass('fadedin').addClass('fadedout');
                        fixedPriceCell.addClass('fadedin').removeClass('fadedout');
                        scaleInput.attr('disabled', 'disabled');
                        fixedInput.removeAttr('disabled');
                    }

                });

                $(this).find('select').selectpicker();
            });

            // scalePrice
            Toast.editorCommon.updateCheckboxes(preModTable);

            preModTable.on('click', '.scaleprice :checkbox', function() {
                var mode = $(this).is(':checked') ? 'true' : 'false';
                $(this).closest('td').find(':hidden').val(mode);

                var fixedPriceCell = $(this).closest('tr').find('.fixedcolumn');
                var scalePriceCell = $(this).closest('tr').find('.scalecolumn');

                var fixedInput = fixedPriceCell.find('input');
                var scaleInput = scalePriceCell.find('input');

                if ($(this).is(':checked')) {
                    scalePriceCell.addClass('fadedin').removeClass('fadedout');
                    fixedPriceCell.removeClass('fadedin').addClass('fadedout');
                    scaleInput.removeAttr('disabled');
                    fixedInput.attr('disabled', 'disabled');
                } else {
                    scalePriceCell.removeClass('fadedin').addClass('fadedout');
                    fixedPriceCell.addClass('fadedin').removeClass('fadedout');
                    scaleInput.attr('disabled', 'disabled');
                    fixedInput.removeAttr('disabled');
                }

            });

            // reordering / deletion
            Toast.enableChildEntityTable(preModTable, 'decoratorGroup.preModifiers');

            preModTable.find('tr:not(.template) select').selectpicker();

        }
    };
})();

Toast.glCodes = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            $('i.icon-info-sign').tooltip();

            var glCodesTable = $('#glcodes-table');

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-glcode-new'), glCodesTable, undefined, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableChildEntityTable(glCodesTable, 'glCodes');
                Toast.updateOrderColumn($(this));
            });

            // reordering / deletion
            Toast.enableChildEntityTable(glCodesTable, 'glCodes', $('.edit-glcodes'), null, null, true);
            Toast.enableEntityTableInput(glCodesTable);
            Toast.enableEntityTableSelect(glCodesTable);

            var entitiesTable = $('#entities-table');

            // reordering / deletion
            Toast.enableChildEntityTable(entitiesTable, 'entity', $('.edit-entities'), null, null, true);
            Toast.enableEntityTableInput(entitiesTable);
            Toast.enableEntityTableSelect(entitiesTable);

            var otherTables = $('.glcode-mappings-table');
            Toast.enableEntityTableSelect(otherTables);

            $('#glbreakdown-selector :checkbox').on('change', function() {
                var container = $('#' + $(this).val());
                $('.glbreakdown').not(container).slideUp();
                container.slideDown();
            });
        }
    };
})();

Toast.quickAddUsers = (function() {

    return {
        init: function() {
            Toast.editorCommon.init();

            var usersTable = $('#users-table');
            Toast.enableEntityTableRowTemplate($('#add-user'), usersTable, undefined, function() {
                var row = $(this);
                row.find(':text:first').focus();

                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
            });
            Toast.enableEntityTableInput(usersTable);
            Toast.enableEntityTableSelect(usersTable);

            usersTable.on('click', 'a.remove-entity', function() {
                var row = $(this).closest('tr');
                var prevRow = row.prev();
                if (prevRow.hasClass('error')) {
                    prevRow.remove();
                }
                row.remove();
            });
        }
    };
})();

Toast.rewardsConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.addTouchSectionEnabler('rewardsConfig_enabled', 'rewards-config', false);
            Toast.addTouchSectionEnabler('rewardsConfig_enabled', 'redeem-without-program', true);
            Toast.addTouchSectionEnabler('rewardsConfig_enabled', 'reward-links', false);

            Toast.addTouchSectionEnabler('rewardsConfig_useCustomDescription', 'default-description', true);
            Toast.addTouchSectionEnabler('rewardsConfig_useCustomDescription', 'custom-description', false);

            Toast.addTouchSectionEnabler('birthdayRewards_enabled', 'birthday-rewards-config', false);
            Toast.addTouchSectionEnabler('birthdayRewards_useCustomDescription', 'birthday-rewards-default-desc', true);
            Toast.addTouchSectionEnabler('birthdayRewards_useCustomDescription', 'birthdayRewards-custom-description', false);

            Toast.addTouchSectionEnabler('rewardsConfig_fraudAlertsEnabled', 'fraud-alerts-email', false);
        }
    };
})();

Toast.houseAccountHome = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
        }
    };
})();

Toast.houseAccountCreate = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
        }
    };
})();

Toast.invoiceCreate = (function() {
    return {
        init: function() {
            $('#save-btn').click(function(e) {
                e.preventDefault();
                $('input[name="invoice.restaurantInfo"]').val($('#restaurant-info').val());
                $('input[name="invoice.recipientInfo"]').val($('#recipient-info').val());
                $('input[name="invoiceDate"]').val($('#invoice-date').html());
                $('input[name="dueDate"]').val($('#due-date').html());

                var form = $('#invoiceForm');
                //get the list of selected transactions
                let i = 0;
                for (var txId in window.selectedTransactions) {
                    if (window.selectedTransactions[txId]) {
                        form.append('<input type="hidden" name="selectedTransactions[' + i + ']" value="' + txId + '" /> ');
                        i++;
                    }
                }

                form.submit();
            });
        }
    };
})();

Toast.deliveryConfig = (function() {
    var map; // Map object
    var poly; //google map object
    var draw; // Mapbox object
    var centerMarker; //the restaurant
    var polyMarkers = []; //polygon markers
    var polyMarkersLimit = 200; //200 points
    var deliveryConfigAPIKey;
    var useMapbox;

    var defaultZoomLevel = 12;

    return {
        init: function(APIKey, _useMapbox) {
            deliveryConfigAPIKey = APIKey;
            useMapbox = _useMapbox;
            Toast.editorCommon.init();

            var mapInitialized = false;

            var deliveryOptions = $(".no-delivery-hidden");
            var firstPartyOnlyConfigs = $(".first-party-only");
            var deliveryGuestDetailsFullOption = $("#deliveryConfig_deliveryCustomerInfoDisplayType_FULL");

            var firstPartyDeliveryEnabled = $("#deliveryMode_FIRST_PARTY").is(":checked");
            var thirdPartyDeliveryEnabled = $("#deliveryMode_THIRD_PARTY").is(":checked");

            // if the form is initialized with third party delivery enabled, hide non-pertinent content
            if (thirdPartyDeliveryEnabled) {
                deliveryGuestDetailsFullOption.parent().parent().hide();
            }

            var deliveryEnabled = !$("#deliveryMode_NO_DELIVERY").is(":checked");
            $(":checkbox[name='deliveryMode']").click(function() {
                var deliveryGuestDetailsPartialOption = $("#deliveryConfig_deliveryCustomerInfoDisplayType_PARTIAL");

                if ($(this).val() === "FIRST_PARTY") {
                    deliveryOptions.slideDown();
                    firstPartyOnlyConfigs.slideDown();
                    deliveryGuestDetailsFullOption.parent().parent().slideDown();
                    if (!mapInitialized) {
                        initializeMap();
                        mapInitialized = true;
                    }
                } else if ($(this).val() === "THIRD_PARTY") {
                    deliveryOptions.slideDown();
                    deliveryGuestDetailsFullOption.parent().parent().slideUp();
                    deliveryGuestDetailsFullOption.attr('checked', false);
                    deliveryGuestDetailsFullOption.parent().removeClass('checked');
                    deliveryGuestDetailsPartialOption.attr('checked', 'checked')
                    deliveryGuestDetailsPartialOption.parent().addClass('checked');
                    firstPartyOnlyConfigs.slideUp();
                } else {
                    deliveryOptions.slideUp();
                    firstPartyOnlyConfigs.slideUp();
                }
            });

            Toast.addSectionEnabler('deliveryMode_THIRD_PARTY', 'daas-config', false, true);
            Toast.addSectionEnabler('deliveryMode_FIRST_PARTY', 'daas-config', true, true);
            Toast.addSectionEnabler('deliveryMode_NO_DELIVERY', 'daas-config', true, true);

            Toast.addSectionEnabler('deliveryConfig_assignDriverBank_ASSIGN', 'delivery-driver-bank-amount', false, true);
            Toast.addSectionEnabler('deliveryConfig_assignDriverBank_NEVER_ASSIGN', 'delivery-driver-bank-amount', true, true);

            Toast.addSectionEnabler('deliveryConfig_driverReimbursement_ALWAYS_REIMBURSE', 'delivery-driver-reimbursement-amount', false, true);
            Toast.addSectionEnabler('deliveryConfig_driverReimbursement_NEVER_REIMBURSE', 'delivery-driver-reimbursement-amount', true, true);

            Toast.addSectionEnabler('deliveryConfig_autoPrintFutureOrderOptionViewModel_PRINT_IMMEDIATELY', 'scheduled-order-send-threshold', true, true);
            Toast.addSectionEnabler('deliveryConfig_autoPrintFutureOrderOptionViewModel_PRINT_AT_THRESHOLD', 'scheduled-order-send-threshold', false, true);
            Toast.addSectionEnabler('deliveryConfig_autoPrintFutureOrderOptionViewModel_DISABLED', 'scheduled-order-send-threshold', true, true);
            Toast.addTouchSectionEnabler('curbsideArrivalConfig_curbsideArrivalEnabled', 'curbside-sms-customization', false, true);
            Toast.addTouchSectionEnabler('curbsideArrivalConfig_customSMSEnabled', 'curbside-custom-sms-message', false, false);
            Toast.addTouchSectionEnabler('curbsideArrivalConfig_checkInMessageEnabled', 'curbside-custom-checkin-message', false, false);

            // Ensure that bank amount is empty (thus valid) when hidden, to avoid an unfixable validation error
            $('#deliveryConfig_assignDriverBank_NEVER_ASSIGN').click(function() {
                $('#deliveryConfig_driverBankStartingAmount').val('');
            });

            Toast.addTouchSectionEnabler('deliveryConfig_onlineOrderThrottlingEnabled', 'preparation-times-throttling-alert', false, true);

            Toast.addTouchSectionEnabler('deliveryConfig_onlineOrderThrottlingEnabled', 'takeout-throttling-time', false, true);
            Toast.addTouchSectionEnabler('deliveryConfig_onlineOrderThrottlingEnabled', 'delivery-throttling-time', false, true);

            Toast.addTouchSectionDisabler('deliveryConfig_onlineOrderThrottlingEnabled', 'deliveryConfig_takeoutPreparationTimeMin', false, true);
            Toast.addTouchSectionDisabler('deliveryConfig_onlineOrderThrottlingEnabled', 'deliveryConfig_deliveryPreparationTimeMin', false, true);

            // Checkin Preview
            const $inputBox = $('#curbsideArrivalConfig_checkInMessage');
            const spaPreview = $('#curbside-spa-message');
            const $useCustomCheckinMessage = $('#curbsideArrivalConfig_checkInMessageEnabled_true');
            const $useStandardCheckinMessage = $('#curbsideArrivalConfig_checkInMessageEnabled_false');
            let useCustomCheckinMessage = $useCustomCheckinMessage.is(':checked');
            let defaultValue = $inputBox.prop('placeholder');

            function updateSpaPreview() {
                if (useCustomCheckinMessage && $inputBox.val() !== '') {
                    spaPreview.html($inputBox.val());
                } else {
                    spaPreview.html(defaultValue);
                }
            }

            $(function() {
                $inputBox.keyup(function() {
                    updateSpaPreview();
                });

                $useCustomCheckinMessage.change(function() {
                    useCustomCheckinMessage = true;
                    updateSpaPreview();
                });

                $useStandardCheckinMessage.change(function() {
                    useCustomCheckinMessage = false;
                    updateSpaPreview();
                });

                updateSpaPreview();
            });

            // Custom sms
            let useLink;
            let customSMSEnabled;
            let defaultSMS;

            const $messagePreview = $('#messagePreview');
            const $smsInputBox = $('#curbsideArrivalConfig_customSMS');
            const $enableLinkCheckbox = $('#curbsideArrivalConfig_includeLinkInSMS_true');
            const $useCustomSMSCheckboxCustom = $('#curbsideArrivalConfig_customSMSEnabled_true');
            const $useCustomSMSCheckboxStandard = $('#curbsideArrivalConfig_customSMSEnabled_false');

            function updateMessagePreview() {
                let str = defaultSMS;
                if (customSMSEnabled && $smsInputBox.val() && $smsInputBox.val() !== '') {
                    str = $smsInputBox.val();
                    if (useLink) {
                        str += ' toasttab.com/curbside/[order-id]';
                    }
                }

                if (str != null) str = str.replace('toasttab.com/curbside/[order-id]', '<a>toasttab.com/curbside/[order-id]</a>');
                $messagePreview.html(str);
                $messagePreview.change();
            }

            $(function() {
                // Stuff to run on first time
                useLink = $enableLinkCheckbox.is(':checked');
                customSMSEnabled = $useCustomSMSCheckboxCustom.is(':checked')
                defaultSMS = $smsInputBox.prop('placeholder');

                $enableLinkCheckbox.change(function() {
                    useLink = !!$(this).is(':checked');
                    updateMessagePreview();
                });

                $useCustomSMSCheckboxCustom.change(function() {
                    customSMSEnabled = true;
                    updateMessagePreview();
                });

                $useCustomSMSCheckboxStandard.change(function() {
                    customSMSEnabled = false;
                    updateMessagePreview();
                });

                $smsInputBox.keyup(function() {
                    updateMessagePreview();
                });

                updateMessagePreview();
            });

            //Map
            hideMapAlert();
            $('#centerAddress').keyup(function(event) {
                if (event.keyCode == 13) {
                    $('#centerAddressBtn').click();
                    return false;
                }
                return true;
            });
            $('#centerAddressBtn').click(function() {
                centerMap($('#centerAddress').val());
                return false;
            });
            $('#resetPolygonBtn').click(function() {
                resetPolygon();
            });
            $('#locateRestaurant').click(function() {
                centerMap($('#locateRestaurant').text());
                $('#centerAddress').val($('#locateRestaurant').text());
                return false;
            });
            $('#verifyAddress').click(function() {
                if (centerMarker) {
                    if (useMapbox) {
                        var lngLat = centerMarker.getLngLat();
                        $('#restaurantLat').val(lngLat.lat);
                        $('#restaurantLng').val(lngLat.lng);
                    } else {
                        var lat = centerMarker.getPosition().lat();
                        var lng = centerMarker.getPosition().lng();
                        $('#restaurantLat').val(lat);
                        $('#restaurantLng').val(lng);
                    }

                    $('#isNewGeocode').val('true');
                    $('#deliveryForm').submit();
                } else {
                    showMapAlert('Place a marker on the map to verify your restaurant address.');
                }
            });
            if (deliveryEnabled) {
                initializeMap();
                mapInitialized = true;
            }
            $('#delivery-receipt-printer').selectpicker();

            // enable one-click adding of Takeout dining option
            $("#auto-add-takeout-do").click(function(e) {
                var btn = $(this);
                if (confirm("This will automatically add a new Takeout dining option. Continue?")) {
                    var form = $("#generateTakeoutDiningOptionForm");
                    btn.prop("disabled", true).data("originalText", btn.text()).text("Adding...");
                    $.post(form.attr("action"), form.serialize(), function(result) {
                        var enabledContainer = btn.parent();
                        if (result.status == 200) {
                            btn.remove();
                            enabledContainer.empty();
                            Toast.alertMgr.success(result.message, enabledContainer);
                        } else {
                            btn.text(btn.data("originalText")).prop("disabled", false);
                            Toast.alertMgr.error(result.message, enabledContainer);
                        }
                    }, 'json');
                }
            });

        }
    };

    /*
     * When a user clicks on the map:
     * - if addres is verified: add a new coordinate for service area.
     * - else: place the restaurant marker to where the user clicked.
     */
    function addPoint(event) {
        hideMapAlert();

        if (useMapbox) {
            addPointMapbox(event);
        } else {
            addPointGMaps(event);
        }
    }

    function addPointMapbox(event) {
        if (!isAddressVerified()) {
            markLatLng(event.lngLat.lat, event.lngLat.lng, false, true);
        }
    }

    function addPointGMaps(event) {
        if (isAddressVerified()) {
            if (polyMarkers.length >= polyMarkersLimit) {
                alert('Reached maximum number of points.');
            } else {
                addCoordinate(event.latLng);
            }
        } else {
            markLatLng(event.latLng.lat(), event.latLng.lng(), false, true);
        }
    }

    /*
     * Add a new coordinate for the service area polygon.
     */
    function addCoordinate(coordinate) {
        poly.getPath().push(coordinate);
        var image = '/public/images/red_pin.png';
        var marker = new google.maps.Marker({
            position: coordinate,
            map: map,
            draggable: true,
            icon: image
        });

        polyMarkers.push(marker);
        marker.setTitle('#' + poly.getPath().getLength());

        google.maps.event.addListener(marker, 'click', function() {
            marker.setMap(null);
            for (var i = 0, I = polyMarkers.length; i < I && polyMarkers[i] != marker; ++i);
            polyMarkers.splice(i, 1);
            poly.getPath().removeAt(i);
            encodePath();
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            for (var i = 0, I = polyMarkers.length; i < I && polyMarkers[i] != marker; ++i);
            poly.getPath().setAt(i, marker.getPosition());
            encodePath();
        });

        encodePath();
    }

    /*
     * Encode the polygon coordinates to a string.
     */
    function encodePath() {
        var encodedPolygon = google.maps.geometry.encoding.encodePath(poly.getPath());
        $('#encodedPolygonInput').val(encodedPolygon).trigger('change');
    }

    /*
     * Clear the exisiing polygon and draw a new polygon using the provided encoded string.
     */
    function drawPolygon(encoded) {
        if (useMapbox) {
            drawPolygonMapbox(encoded);
        } else {
            drawPolygonGMaps(encoded);
        }
    }

    function drawPolygonMapbox(encoded) {
        const coordinatesArray = polyline.decode(encoded);

        resetPolygon();

        const lngLatArray = [];

        // We keep the reverse to be backwards compatible with GMaps
        // GMaps is: LatLng and Mapbox is :LngLat
        coordinatesArray.forEach(e => e.reverse());

        // The starting point and ending points needs to be the same in the polygon
        coordinatesArray.push(coordinatesArray[0]);

        lngLatArray.push(coordinatesArray);

        if (lngLatArray[0][0] && lngLatArray.length > 0) {
            const polygon = {
                type: 'Polygon',
                coordinates: lngLatArray
            };
            draw.add(polygon);
        }
    }

    function drawPolygonGMaps(encoded) {
        var coordinates = google.maps.geometry.encoding.decodePath(encoded);
        resetPolygon();
        for (var i in coordinates) {
            addCoordinate(coordinates[i]);
        }
    }

    /*
     * Clear the existing polygon.
     */
    function resetPolygon() {
        //reset encoded string and the input
        $('#encodedPolygonInput').val('');

        if (useMapbox) {
            resetPolygonMapbox();
        } else {
            resetPolygonGMaps();
        }
    }

    function resetPolygonMapbox() {
        draw.deleteAll();
    }

    function resetPolygonGMaps() {
        //clear points
        for (var i in polyMarkers) {
            polyMarkers[i].setMap(null);
        }
        polyMarkers = [];
        //clear poly
        poly.setMap(null);
        poly = null;
        //init poly
        poly = new google.maps.Polygon({
            strokeWeight: 3,
            fillColor: '#5555FF'
        });
        poly.setMap(map);
    }

    /*
     * Place a restaurant marker on the provided coordinate.
     */
    function markLatLng(lat, lng, center, marker) {
        if (useMapbox) {
            markLatLngMapbox(lat, lng, center, marker);
        } else {
            markLatLngGMaps(lat, lng, center, marker);
        }
    }

    function markLatLngMapbox(lat, lng, center, marker) {
        var coordinate = [lng, lat];

        // center the map
        if (center) {
            map.jumpTo({
                center: coordinate,
                zoom: defaultZoomLevel
            });
        }

        // clear the existing center marker
        if (centerMarker) {
            centerMarker.remove();
            centerMarker = null;
        }

        // place marker on the map
        if (marker) {
            const el = document.createElement('div');
            el.className = 'marker';

            centerMarker = new mapboxgl.Marker(el)
                .setLngLat(coordinate)
                .addTo(map);
        }
    }

    function markLatLngGMaps(lat, lng, center, marker) {
        var coordinate = new google.maps.LatLng(lat, lng);
        // center the map
        if (center) {
            map.setCenter(coordinate);
            map.setZoom(13);
        }
        // clear the existing center marker
        if (centerMarker) {
            centerMarker.setMap(null);
            centerMarker = null;
        }
        // place marker on the map
        if (marker) {
            var image = '/public/images/restaurant_pin.png';
            centerMarker = new google.maps.Marker({
                position: coordinate,
                map: map,
                icon: image,
                title: 'Restaurant'
            });
        }
    }

    /*
     * Geocode the address and place a restaurant marker on the address if geocode succeeds.
     * Also the map is centered on the marker.
     */
    function centerMap(address) {
        if (!address) {
            return;
        }
        hideMapAlert();

        if (useMapbox) {
            centerMapMapbox(address);
        } else {
            centerMapGMaps(address);
        }
    }

    function centerMapMapbox(address) {
        const urlEncodedAddress = encodeURI(address);
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + urlEncodedAddress + '.json';
        $.ajax({
                dataType: 'json',
                url: url,
                data: {
                    access_token: deliveryConfigAPIKey,
                    limit: 1,
                    types: 'address'
                }
            })
            .done(function(response) {
                const results = response.features;
                if (results) {
                    if (results.length > 0) {
                        if (map) {
                            map.jumpTo({
                                center: [
                                    results[0].center[0],
                                    results[0].center[1]
                                ],
                                zoom: defaultZoomLevel
                            });

                            if (centerMarker) {
                                centerMarker.setLngLat([results[0].center[0], results[0].center[1]]);
                            } else {
                                const el = document.createElement('div');
                                el.className = 'marker';

                                centerMarker = new mapboxgl.Marker(el)
                                    .setLngLat([results[0].center[0], results[0].center[1]])
                                    .addTo(map);
                            }
                        }
                    } else {
                        showMapAlert('Sorry, can\'t find the address.');
                    }
                } else {
                    showMapAlert('Sorry, can\'t find the address.');
                }
            });
    }

    function centerMapGMaps(address) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
        $.ajax({
                dataType: 'json',
                url: url,
                data: {
                    sensor: false,
                    address: address,
                    key: deliveryConfigAPIKey
                }
            })
            .done(function(response) {
                var results = response.results;
                var status = response.status;
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results.length > 0) {
                        var coordinate = new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);
                        markLatLng(coordinate.lat(), coordinate.lng(), true, true);
                    } else {
                        showMapAlert('Sorry, can\'t find the address.');
                    }
                } else {
                    showMapAlert('Sorry, can\'t find the address.');
                }
            });
    }

    function showMapAlert(msg) {
        $('#mapAlert').show();
        $('#mapAlert').text(msg);
    }

    function hideMapAlert() {
        $('#mapAlert').hide();
    }

    function encodeAndStorePolygonPath(features) {
        const lngLatArray = [];

        // Remove the last element
        // Because a mapbox polygon has the same point at the beginning and end of list
        // To be backward compatible with GMaps, we already add it when drawing the polygon
        // If we don't put this, there is 2 points at the same place
        features.geometry.coordinates[0].pop();

        features.geometry.coordinates[0].forEach(e => lngLatArray.push(e));

        const coordinatesArray = lngLatArray.map(e => [e[0], e[1]].reverse());

        const encodedPolygon = polyline.encode(coordinatesArray);

        $('#encodedPolygonInput').val(encodedPolygon).trigger('change');
    }

    function initializeMap() {
        if (useMapbox) {
            initializeMapbox();
        } else {
            initializeGMaps();
        }

        if (isAddressVerified()) {
            // place a restaurant marker
            var restaurantLat = $('#restaurantLat').val();
            var restaurantLng = $('#restaurantLng').val();
            markLatLng(restaurantLat, restaurantLng, true, true);
            // draw polygon if delivery area was set
            var encoded = $('#encodedPolygonInput').val();
            if (encoded) {
                drawPolygon(encoded);
            }
        } else {
            markLatLng(42.3532184, -71.0597952, true, false);
        }
    }

    function initializeMapbox() {
        var MAPBOX_DRAW_CREATE = 'draw.create';
        var MAPBOX_DRAW_UPDATE = 'draw.update';
        var MAPBOX_DRAW_MODE_CHANGE = 'draw.modechange';
        var MAPBOX_DRAW_SELECTION_CHANGE = 'draw.selectionchange';
        var MAPBOX_CLICK = 'click';

        mapboxgl.accessToken = deliveryConfigAPIKey;

        map = new mapboxgl.Map({
            container: 'map-canvas',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: defaultZoomLevel
        });

        draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            styles: [
                // ACTIVE (being drawn)
                // line stroke
                {
                    "id": "gl-draw-line",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"],
                        ["!=", "mode", "static"]
                    ],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#000",
                        "line-width": 3
                    }
                },
                // polygon fill
                {
                    "id": "gl-draw-polygon-fill",
                    "type": "fill",
                    "filter": ["all", ["==", "$type", "Polygon"],
                        ["!=", "mode", "static"]
                    ],
                    "paint": {
                        "fill-color": "#5555FF",
                        "fill-outline-color": "#5555FF",
                        "fill-opacity": 0.3
                    }
                },
                // polygon outline stroke
                // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                {
                    "id": "gl-draw-polygon-stroke-active",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "Polygon"],
                        ["!=", "mode", "static"]
                    ],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#000",
                        "line-width": 3
                    }
                },
                // vertex point halos
                {
                    "id": "gl-draw-polygon-and-line-vertex-halo-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"],
                        ["==", "$type", "Point"],
                        ["!=", "mode", "static"]
                    ],
                    "paint": {
                        "circle-radius": 5,
                        "circle-color": "#FFF"
                    }
                },
                // vertex points
                {
                    "id": "gl-draw-polygon-and-line-vertex-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"],
                        ["==", "$type", "Point"],
                        ["!=", "mode", "static"]
                    ],
                    "paint": {
                        "circle-radius": 3,
                        "circle-color": "#D20C0C",
                    }
                },
                // midpoints
                {
                    "id": "gl-draw-polygon-midpoints",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "midpoint"]],
                    "paint": {
                        "circle-radius": 5,
                        "circle-color": "#D20C0C",
                    }
                },

                // INACTIVE (static, already drawn)
                // line stroke
                {
                    "id": "gl-draw-line-static",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"],
                        ["==", "mode", "static"]
                    ],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#000",
                        "line-width": 3
                    }
                },
                // polygon fill
                {
                    "id": "gl-draw-polygon-fill-static",
                    "type": "fill",
                    "filter": ["all", ["==", "$type", "Polygon"],
                        ["==", "mode", "static"]
                    ],
                    "paint": {
                        "fill-color": "#000",
                        "fill-outline-color": "#000",
                        "fill-opacity": 0.1
                    }
                },
                // polygon outline
                {
                    "id": "gl-draw-polygon-stroke-static",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "Polygon"],
                        ["==", "mode", "static"]
                    ],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#000",
                        "line-width": 3
                    }
                },
                // vertex point halos
                {
                    "id": "gl-draw-polygon-and-line-vertex-halo-static",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"],
                        ["==", "$type", "Point"],
                        ["==", "mode", "static"]
                    ],
                    "paint": {
                        "circle-radius": 5,
                        "circle-color": "#FFF"
                    }
                },
                // vertex points
                {
                    "id": "gl-draw-polygon-and-line-vertex-static",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"],
                        ["==", "$type", "Point"],
                        ["==", "mode", "static"]
                    ],
                    "paint": {
                        "circle-radius": 3,
                        "circle-color": "#D20C0C",
                    }
                },
            ]
        });

        map.addControl(draw);

        map.on(MAPBOX_CLICK, function(e) {
            addPoint(e);
        });

        map.on(MAPBOX_DRAW_CREATE, function(e) {
            encodeAndStorePolygonPath(e.features[0]);
        });

        map.on(MAPBOX_DRAW_UPDATE, function(e) {
            encodeAndStorePolygonPath(e.features[0]);
        });

        map.on(MAPBOX_DRAW_MODE_CHANGE, function(e) {
            restrictUserFromDrawingMultiplePolygons(e);
        });

        // Restrict the user from moving the polygon
        MapboxDraw.modes.direct_select.onFeature = function() {
            // Enable map.dragPan when user clicks on feature, overrides ability to drag shape
            map.dragPan.enable();
        };

        map.on(MAPBOX_DRAW_SELECTION_CHANGE, function(e) {
            restrictUserFromMovingPolygon(e);
        });
    }

    function restrictUserFromDrawingMultiplePolygons(e) {
        const data = draw.getAll();
        if (draw.getMode() == 'draw_polygon') {
            var pids = [];

            // ID of the added template empty feature
            const lid = data.features[data.features.length - 1].id;

            data.features.forEach((f) => {
                if (f.geometry.type === 'Polygon' && f.id !== lid) {
                    pids.push(f.id);
                }
            });

            draw.delete(pids);
        }
    }

    function restrictUserFromMovingPolygon(e) {
        const {
            features,
            points
        } = e;
        const hasLine = (features && (features.length > 0));
        const hasPoints = (points && (points.length > 0));
        if (hasLine && !hasPoints) {
            if (draw.getMode() !== 'direct_select') {
                draw.changeMode('direct_select', {
                    featureId: features[0].id
                });
            }
        }
    }

    function initializeGMaps() {
        if (typeof(google) === 'undefined') {
            return;
        }
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(42.3532184, -71.0597952),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: false,
            overviewMapControl: true
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        poly = new google.maps.Polygon({
            strokeWeight: 3,
            fillColor: '#5555FF'
        });
        poly.setMap(map);
        //map click listener
        google.maps.event.addListener(map, 'click', addPoint);
    }

    function isAddressVerified() {
        return $('#restaurantLat').val() && $('#restaurantLng').val();
    }
})();

Toast.consumerAppConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.addTouchSectionEnabler('consumerAppConfig_newCuisineType', 'cuisine-option', true, false);
            Toast.addTouchSectionEnabler('consumerAppConfig_newCuisineType', 'new-cuisine-input', false, true);
            Toast.addTouchSectionEnabler('consumerAppConfig_takeoutAppEnabled', 'takeout-app-enabled', false, false);
            Toast.addTouchSectionEnabler('consumerAppConfig_takeoutAppCTAOptOutEnabled', 'takeout-app-cta-opt-out-enabled', false, false);
        }
    };
})();

Toast.onlineOrderingConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            $('#approval-mode-selection input').click(function() {
                $('#approval-mode-rules-config').toggle(
                    this.value === 'RULES' && this.checked);
                $('#approval-mode-device-config-message').toggle(!(this.value === 'MANUAL' && this.checked));
                $('#autofire-device-config').toggle(!(this.value === 'MANUAL' && this.checked));
            });

            Toast.addTouchSectionEnabler('onlineOrderingConfig_allowSpecialRequests', 'special-requests-text-field', false, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_takeoutGuestCommunicationEnabled', 'takeout-guest-communication-message', false, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_deliveryGuestCommunicationEnabled', 'delivery-guest-communication-message', false, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_curbsideGuestCommunicationEnabled', 'curbside-guest-communication-message', false, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_enableScheduling', 'scheduling-orders-enabled-section', false, false, unsetScheduledOrderMaxDays);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_enableScheduling', 'takeout-allow-cc-future', false, true, deselectTakeoutCC);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_enableScheduling', 'delivery-allow-cc-future', false, true, deselectDeliveryCC);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_enableScheduling', 'section-min-lead-time', false, false);

            Toast.addTouchSectionEnabler('onlineOrderingConfig_standaloneDigitalOrderingEnabled', 'approval-mode-section', true, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_standaloneDigitalOrderingEnabled', 'standalone-approval-mode-section', false, false);
            Toast.addTouchSectionEnabler('onlineOrderingConfig_standaloneDigitalOrderingEnabled', 'auto-print-kitchen-tickets-section', false, false);

            Toast.addTouchSectionEnabler('onlineOrderingConfig_scheduledOrderMaxDaysDefault', 'scheduling-order-max-days-specified-section', true, false, unsetScheduledOrderMaxDays);

            var $snoozeValueSectionEnablers = $('input[name="onlineOrderingConfigAutoReenableAdminShim.availabilityValue"]');
            $snoozeValueSectionEnablers.click(toggleSnoozeValueSection);

            function toggleSnoozeValueSection() {
                var $snoozeValueSection = $('#online-ordering-auto-reenable-snooze-selection');
                var snoozeEnabled = $(this).val() === 'SNOOZE';

                if (snoozeEnabled) {
                    $snoozeValueSection.slideDown();
                } else {
                    $snoozeValueSection.slideUp();
                }
            }

            var $ccEnablers = $('.cc-enabler');
            $ccEnablers.click(toggleCCTipSection);

            function toggleCCTipSection() {
                var $ccTipSection = $('#cc-tips-section');
                var ccEnabled = $ccEnablers.is(':checked');
                if (ccEnabled) {
                    $ccTipSection.slideDown();
                } else {
                    $ccTipSection.slideUp();
                }
            }

            function deselectDeliveryCC() {
                disableCheckbox($('#delivery-allow-cc-future'));
            }

            function deselectTakeoutCC() {
                disableCheckbox($('#takeout-allow-cc-future'));
            }

            function disableCheckbox(element) {
                element.find('label').removeClass('checked');
                element.find('input').attr('checked', false);
            }

            function unsetScheduledOrderMaxDays() {
                $('#onlineOrderingConfig_scheduledOrderMaxDays').val('');
            }

            // initial load state
            $('.td-checkbox :checkbox').each(function() {
                Toast.updateCheckboxContainerStyle($(this));
            });
            $('.td-checkbox :checkbox').click(function() {
                Toast.updateCheckboxContainerStyle($(this));
            });
        }
    };
})();

Toast.barcodeConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
        }
    };
})();


Toast.tipDistribution = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
        }
    };
})();

Toast.customerFacingDisplayConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
        }
    };
})();

Toast.masterEditorCommon = (function() {

    var colSerializationFns = {};

    return {
        addColSerializationFn: function(name, fn) {
            colSerializationFns[name] = fn;
        },
        enableEntityActions: function(el) {
            el.find('a.remove-entity').click(function(e) {
                e.preventDefault();
                var removeEntity = $(this),
                    undoRemoveEntity = $(this).siblings('a.undo-remove-entity'),
                    td = removeEntity.closest('td'),
                    row = td.closest('tr'),
                    bootstrapSelect = td.find('.bootstrap-select');
                row.addClass('deleted');
                removeEntity.hide();
                undoRemoveEntity.show();
                bootstrapSelect.removeClass('open');
                td.find('a:not(.undo-remove-entity,.remove-entity)').addClass('disabled');
            });
            el.find('a.undo-remove-entity').click(function(e) {
                e.preventDefault();
                var undoRemoveEntity = $(this),
                    removeEntity = $(this).siblings('a.remove-entity'),
                    td = removeEntity.closest('td'),
                    row = $(this).closest('tr');
                row.removeClass('deleted');
                td.find('a').removeClass('disabled');
                removeEntity.show();
                undoRemoveEntity.hide();
            });
            el.find('a.version-entity').click(function(e) {
                e.preventDefault();
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var dialog = $('#new-version-dialog');
                dialog.find('form .pickers').remove();
                dialog.find('form').append(dialog.find('.pickers').clone().show());

                var row = $(this).closest('tr'),
                    entityId = row.attr('data-entity-id'),
                    targets = row.closest('table').find('tr[data-master-id=' + row.attr('data-master-id') + '] input.target'),
                    ownerTreepicker = dialog.find('.control-group.owner .bootstrap-treepicker'),
                    targetTreepicker = dialog.find('.control-group.target .bootstrap-treepicker'),
                    submitBtn = dialog.find('.btn-primary');

                submitBtn.prop('disabled', true);
                targetTreepicker.addClass('shell').find('.dropdown-menu').remove();
                targetTreepicker.find('input').val('');
                ownerTreepicker.addClass('shell').find('.dropdown-menu').remove();
                ownerTreepicker.find('input').val('');
                Toast._initializeTreePickerTemplate(targetTreepicker);
                Toast._initializeTreePickerTemplate(ownerTreepicker);
                targetTreepicker.find('li').removeClass('selected');
                $.each(targets, function() {
                    targetTreepicker.find('li[data-val=' + $(this).val() + ']')
                        .addClass('disabled');
                });
                var checkSubmitButton = function() {
                    if (dialog.find('form .pickers input.owner').val() && dialog.find('form .pickers input.target').val()) {
                        submitBtn.prop('disabled', false);
                    }
                };
                dialog.find('form .pickers input').change(function() {
                    checkSubmitButton();
                });
                submitBtn.one('click', function() {
                    $(this).prop('disabled', true);
                });
                Toast.enableEntityTableSelect(dialog);

                var table = $('<table class="table table-bordered"/>'),
                    previewRow = $('<tr/>');
                table.append($('<tr/>').append(row.closest('table').find('thead th:not(.master-column)').clone()));
                table.append(previewRow);
                row.find('>td:not(.master-column)').each(function() {
                    var td = $(this);
                    var previewTd = $('<td/>');
                    if (td.data('serializeFn')) {
                        var serialize = td.data('serializeFn');
                        var serializeFn = colSerializationFns[serialize];
                        previewTd.text(serializeFn.call(this));
                    } else if (td.hasClass('td-input')) {
                        previewTd.text(td.find('input').val());
                    } else if (td.hasClass('td-checkbox')) {
                        previewTd.text(td.find(':checkbox').val() ? 'Yes' : 'No');
                    } else if (td.hasClass('td-select')) {
                        previewTd.text(td.find('select option[selected]').html());
                    } else if (td.hasClass('td-input-link')) {
                        previewTd.text(td.find('.input-link').text());
                    } else {
                        previewTd.text(td.text());
                    }
                    previewRow.append(previewTd);
                });
                dialog.find('.entity-info').html(table);
                dialog.find('.entity-id').val(entityId);
                dialog.find('.icon-info-sign').tooltip();
                dialog.modal().center();
            });
        }
    };
})();

Toast.masterDetail = (function() {
    return {
        init: function(dialog, refreshPage) {
            var notifications = dialog.find('.notifications').empty();

            $('a.version-entity').click(function(e) {
                e.preventDefault();
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var submitBtn = dialog.find('.btn-primary');

                submitBtn.prop('disabled', true);
                dialog.modal().center();
            });

            $('a.toggle-archived').click(function(e) {
                e.preventDefault();
                var a = $(this),
                    li = a.parent(),
                    toggle = li.find('[name="toggleArchived"]'),
                    form = li.closest('form');
                toggle.val(true);
                form.submit();
            });

            dialog.find('form').submit(function(event) {
                event.preventDefault();
                notifications.empty();

                dialog.find('.btn-primary').button('loading');

                var url = $(this).prop('action'),
                    data = $(this).serialize();

                $.post(url, data, function(response) {
                    var json;
                    var trimmedResponse = Toast.trimKeepalivePrefix(response);
                    if (trimmedResponse.match('\.$')) {
                        // Trim trailing dot
                        json = $.parseJSON(trimmedResponse.replace(/\.$/, ''));
                    } else {
                        json = $.parseJSON(trimmedResponse);
                    }
                    if (json.data.status == 200) {
                        var redirectUrl = refreshPage ? '' : json.data.redirectUrl;
                        window.location.replace(redirectUrl);
                    } else {
                        Toast.alertMgr.error(json.data.message);
                        dialog.find('.btn-primary').button('reset');
                        dialog.find('.btn-primary').prop('disabled', false);
                    }
                });
            });
        },
        enableNewVersionDetailDialog: function(entityName, entityId) {
            var html = $('<div style="font-weight:bold;"></div>');
            html.append(entityName);
            $('.entity-info').html(html);
            $('.entity-id').val(entityId);
        },
        enableDeletion: function(deleteUrl, undeleteUrl, entityType, entityId, addToType, addToId) {
            $('.delete-entity').click(function() {
                if (confirm('Are you sure you want to archive this item?')) {
                    $('#save-btn').prop('disabled', true);
                    $('#archived-text').text('Archiving...').show();
                    var authenticityToken = $('input[name="authenticityToken"]').val();

                    $.post(deleteUrl, {
                        authenticityToken: authenticityToken,
                        entityType: entityType,
                        entityId: entityId
                    }, function(response) {
                        if (response.status === 200) {
                            location.reload();
                        } else {
                            $('#archived-text').hide();
                            alert(response.message);
                        }
                        $('#save-btn').prop('disabled', false);
                    });
                }
            });

            $('.undelete-entity').click(function() {
                var authenticityToken = $('input[name="authenticityToken"]').val();
                $('#archived-text').text('Undoing archive...').show();
                $('#save-btn').prop('disabled', true);
                $.post(undeleteUrl, {
                    entityType: entityType,
                    entityId: entityId,
                    addToType: addToType,
                    addToId: addToId,
                    authenticityToken: authenticityToken
                }, function(response) {
                    if (response.status === 200) {
                        location.reload();
                    } else {
                        alert(response.message);
                    }
                    $('#archived-text').hide();
                    $('#save-btn').prop('disabled', false);
                });
            });
        },
        renderReadonly: function() {
            $('tr:not(.template) div.bootstrap-treepicker:not(.exclude-from-readonly), div.control-group div.bootstrap-treepicker:not(.exclude-from-readonly)').each(function() {
                var spanText = $(this).find('.selected-label,').text();
                // Hide target / owner if either set is not accessible
                if (spanText === 'No Restaurants Selected') {
                    $(this).closest('.control-group').remove();
                } else {
                    var elem = '<span style="line-height:30px; margin-left:10px;">' + spanText + '</span>';
                    $(this).parent().empty().append(elem);
                }
            });

            $('.child-entity-table tr:not(.exclude-from-readonly,.template)')
                .addClass('readonly')
                .find('button:not(.exclude-from-readonly),input:not([type="hidden"], .exclude-from-readonly)')
                .prop('disabled', true);

            $('div.select:not(.exclude-from-readonly)').each(function() {
                var spanText = $(this).find('.option').text();
                var elem = '<span style="font-weight:bold; line-height:30px;">' + spanText + '</span>';
                $(this).parent().empty().append(elem);
            });

            $('div.control-group .controls ul,ul.selection-list,input:not([type="hidden"],.search-query,.exclude-from-readonly),textarea:not(.exclude-from-readonly),select:not(.exclude-from-readonly)')
                .addClass('disabled')
                .prop('disabled', true)
                .css('cursor', 'default');

            $('div.control-group .controls ul.selection-list > li > label').css('cursor', 'default');

            $('.td-checkbox input:not([type="hidden"],.exclude-from-readonly)')
                .addClass('disabled')
                .prop('disabled', true)
                .css('cursor', 'default');

            $('form div.btn-group:not(.bootstrap-select, .exclude-from-readonly),form button:not(.selectpicker, .exclude-from-readonly),a.remove-entity:not(.exclude-from-readonly), form a.btn:not(.exclude-from-readonly)').remove();

            // Disable color picker
            $('div.color-editor .pos-cell')
                .addClass('disabled')
                .click(function(e) {
                    e.stopImmediatePropagation();
                });
        }
    };
})();

Toast.menuMgmt = (function() {

    function setupInheritedSectionToggle(touchElmtId, sectionId, isElmtTrue) {
        $('#' + touchElmtId).click(function(event) {
            if (event.target.readOnly) return false;

            var inheritedSection = $('#' + sectionId + '_inherited');
            var section = $('#' + sectionId);
            var checked = $(this).is(':checked');

            var slideOptions = {
                easing: 'swing'
            };
            if (checked) {
                if (isElmtTrue) {
                    // then we're saying we want to inherit, so show the inherit
                    // section and hide the override section
                    section.slideUp(slideOptions); // hide
                    inheritedSection.slideDown(slideOptions);
                } else {
                    // then we want to hide the inherited section and show the
                    // override section
                    section.slideDown(slideOptions);
                    inheritedSection.slideUp(slideOptions); // hide
                }
            }
        });
    }

    function chooseMenuEntity(entityType, title, searchText, previewText, listAction, constructEntry, previewUrl, previewDataUrl, copy, successCallback, searchFn, multiselect) {
        Toast.chooseEntity(entityType, title, searchText, previewText, Toast.menuMgmt.baseUrl + listAction, constructEntry, Toast.menuMgmt.baseUrl + previewUrl, previewDataUrl ? Toast.menuMgmt.baseUrl + previewDataUrl : null, copy, successCallback, searchFn, multiselect);
    }

    return {
        baseUrl: '/restaurants/admin/menus',
        data: {},

        setupInheritedSection: function(touchElmtPrefix, sectionId) {
            setupInheritedSectionToggle(touchElmtPrefix + '_true', sectionId, true);
            setupInheritedSectionToggle(touchElmtPrefix + '_false', sectionId, false);
        },

        chooseMenuGroup: function(multiselect, parentSetId, copy, success) {
            var entityType = 'MenuGroup';
            var entity = 'Menu Groups';
            var previewText = 'Select a menu group to preview';
            var listUrl = '/listAllMenuGroups';
            if (parentSetId) {
                listUrl += '?parentSetId=' + parentSetId;
            }
            var previewUrl = '/menuGroupPreview?id=ENTITY_ID';
            var previewDataUrl = null;

            var constructEntry = function(group) {
                var entry = $('<li/>').append($('<div class="entity-name"/>').text(group.name));
                entry.append($('<div class="entity-shortname muted smaller"></div>').text('POS Name: ' + group.shortName));
                if (group.ancestors) {
                    entry.append($('<div class="entity-info muted smaller"></div>').text(group.ancestors));
                }
                if (group.items) {
                    entry.append($('<div class="entity-items muted smaller"></div>').text(group.items));
                }

                return entry;
            };

            var searchFn = function(entity, query) {
                return Toast.strContains(entity.name, query) || Toast.strContains(entity.info, query) || Toast.strContains(entity.items, query);
            };

            chooseMenuEntity(entityType, entity, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, copy, success, searchFn, multiselect);
        },

        chooseMenuOption: function(multiselect, optionGroupId, parentSetId, copy, success) {
            var entityType = 'MenuOption';
            var entity = 'Menu Options';
            var previewText = 'Select a menu option to preview';
            var listUrl = '/listAllMenuOptions';
            if (optionGroupId) {
                listUrl += '?optionGroupId=' + optionGroupId;
            }
            if (optionGroupId && parentSetId) {
                listUrl += '&parentSetId=' + parentSetId;
            } else if (parentSetId) {
                listUrl += '?parentSetId=' + parentSetId;
            }

            var previewUrl = '/menuOptionPreview?id=ENTITY_ID';
            var previewDataUrl = '/getMenuOptionPricingInfo?id=ENTITY_ID';
            if (optionGroupId) {
                previewDataUrl += '&optionGroupId=' + optionGroupId;
            }

            var constructEntry = function(option) {
                var entry = $('<li/>').append($('<div class="entity-name"/>').text(option.name));
                if (option.itemName) {
                    entry.append($('<div class="entity-info muted smaller"></div>').text('Menu item: ' + option.itemName));
                }
                entry.append($('<div class="entity-shortname muted smaller"></div>').text('POS name: ' + (option.shortName ? option.shortName : option.itemName)));
                entry.append($('<div class="entity-kitchenname muted smaller"></div>').text('Kitchen name: ' + (option.kitchenName ? option.kitchenName : option.itemName)));

                return entry;
            };

            chooseMenuEntity(entityType, entity, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, copy, success, null, multiselect);
        },

        parseBulkMenuItems: function(inputString, numColumns) {
            var re = /^\"([^"])*/gm; // Match strings that begin with an unclosed double quote, followed by any number of non-double quote characters
            var match = inputString.match(re);
            if (match != null && inputString === match[0] || inputString === '') {
                // This input is bad, and will also crash csvToArray. Return empty array.
                return [];
            }
            var lines = Toast.menuMgmt.csvToArray(inputString, '\t');
            var result = [];
            for (var idx in lines) {
                var menuItemLine = lines[idx];
                if (menuItemLine.length == 0 || menuItemLine.length == 1 && menuItemLine[0].length == 0) continue;
                if (numColumns == null || menuItemLine.length == numColumns) {
                    // Trim white spaces
                    for (var j in menuItemLine) {
                        menuItemLine[j] = menuItemLine[j].trim();
                    }
                    result.push(menuItemLine);
                } else {
                    console.log('Invalid import line.'); // eslint-disable-line
                }
            }
            return result;
        },

        // http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
        // This will parse a delimited string into an array of
        // arrays. The default delimiter is the comma, but this
        // can be overriden in the second argument.
        csvToArray: function(strData, strDelimiter) {
            // Check to see if the delimiter is defined. If not,
            // then default to comma.
            strDelimiter = (strDelimiter || ',');

            // Create a regular expression to parse the CSV values.
            var objPattern = new RegExp(
                (
                    // Delimiters.
                    '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +

                    // Quoted fields.
                    '(?:"([^"]*(?:""[^"]*)*)"|' +

                    // Standard fields.
                    '([^"\\' + strDelimiter + '\\r\\n]*))'
                ),
                'gi'
            );

            // Create an array to hold our data. Give the array
            // a default empty first row.
            var arrData = [
                []
            ];

            // Create an array to hold our individual pattern
            // matching groups.
            var arrMatches = null;

            // Keep looping over the regular expression matches
            // until we can no longer find a match.
            while (arrMatches = objPattern.exec(strData)) {
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[1];

                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push([]);
                }

                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[2]) {
                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
                } else {
                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[3];
                }

                // Now that we have our value string, let's add
                // it to the data array.
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            // Return the parsed data.
            return arrData;
        },

        // Shows a modal dialog with a text area
        // numColumns makes that number of columns required. If you want to be able to skip a column set it to null.
        showAddItemBulkDialog: function(title, description, placeholder, numColumns, onAddHandler) {
            var modal = $('#add-item-bulk-dialog');
            modal.find('.dialog-title').text(title);
            modal.find('.dialog-description').text(description);
            $('#add-item-bulk-textarea').attr('placeholder', placeholder);

            modal.off('keyup.bs.modal').on('keyup.bs.modal', '#add-item-bulk-textarea', function() {
                var content = this.value;
                if (content != null && content.length > 0) {
                    var menuItems = Toast.menuMgmt.parseBulkMenuItems(content, numColumns);
                    var addButton = modal.find('.btn-bulk-add');
                    if (menuItems.length == 0) {
                        addButton.text('Add');
                    } else {
                        addButton.text('Add ' + menuItems.length + ' Items');
                    }
                }
            });
            $('.btn-bulk-add').off('click.bs.modal').on('click.bs.modal', function() {
                var textArea = modal.find('#add-item-bulk-textarea');
                var inputString = textArea.val();
                var items = Toast.menuMgmt.parseBulkMenuItems(inputString, numColumns);
                if (onAddHandler) {
                    onAddHandler(items);
                }
                modal.off('click', '.btn-bulk-add');
                modal.off('keyup', '#add-item-bulk-textarea');
                modal.modal('hide');
            });
            modal.off('hide.bs.modal').on('hide.bs.modal', function() {
                var textArea = modal.find('#add-item-bulk-textarea');
                if (textArea) {
                    textArea.val('');
                }
                var button = modal.find('.btn-bulk-add');
                if (button) {
                    button.text('Add').prop('disabled', false);
                }
                modal.off('hide.bs.modal');
            });
            modal.modal();
            return modal;
        },

        chooseMenuItem: function(multiselect, groupid, parentSetId, copy, success) {
            var entityType = 'MenuItem';
            var entity = 'Menu Items';
            var previewText = 'Select a menu item to preview';
            var listUrl = '/listAllMenuItems';
            if (groupid) {
                listUrl += '?groupId=' + groupid;
            }
            if (groupid && parentSetId) {
                listUrl += '&parentSetId=' + parentSetId;
            } else if (parentSetId) {
                listUrl += '?parentSetId=' + parentSetId;
            }
            var previewUrl = '/menuItemPreview?id=ENTITY_ID';
            var previewDataUrl = '/getMenuItemPricingInfo?id=ENTITY_ID';
            if (groupid) {
                previewDataUrl += '&groupId=' + groupid;
            }

            var constructEntry = function(item) {
                var entry = $('<li/>').append($('<div class="entity-name"/>').text(item.name));
                entry.append($('<div class="entity-shortname muted smaller"></div>').text('POS Name: ' + (item.shortName ? item.shortName : item.name)));
                entry.append($('<div class="entity-kitchenname muted smaller"></div>').text('Kitchen Name: ' + (item.kitchenName ? item.kitchenName : item.name)));
                return entry;
            };

            chooseMenuEntity(entityType, entity, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, copy, success, null, multiselect);
        },

        chooseOptionGroup: function(multiselect, parentSetId, copy, success) {
            var entityType = 'MenuOptionGroup';
            var entity = 'Modifier Groups';
            var previewText = 'Select a modifier group to preview';
            var listUrl = '/listAllMenuOptionGroups';
            if (parentSetId) {
                listUrl += '?parentSetId=' + parentSetId;
            }
            var previewUrl = '/menuOptionGroupPreview?id=ENTITY_ID';
            var previewDataUrl = null;

            var constructEntry = function(group) {
                var entry = $('<li/>').append($('<div class="entity-name"/>').text(group.name));
                entry.append($('<div class="entity-shortname muted smaller"></div>').text('POS Name: ' + (group.shortName ? group.shortName : group.name)));

                if (group.info) {
                    entry.append($('<div class="entity-info muted smaller"></div>').text(group.restrictions));
                }
                if (group.options) {
                    entry.append($('<div class="entity-items muted smaller"></div>').text(group.options));
                }

                return entry;
            };

            var searchFn = function(entity, query) {
                return Toast.strContains(entity.name, query) || Toast.strContains(entity.info, query) || Toast.strContains(entity.options, query);
            };

            chooseMenuEntity(entityType, entity, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, copy, success, searchFn, multiselect);
        },

        chooseMenuItemTag: function(multiselect, parentSetId, copy, success) {
            var entityType = 'MenuItemTag';
            var entity = 'Tags';
            var previewText = 'Select a tag to preview';
            var listUrl = '/listAllMenuItemTags';
            if (parentSetId) {
                listUrl += '?parentSetId=' + parentSetId;
            }
            var previewUrl = '/menuItemTagPreview?id=ENTITY_ID';
            var previewDataUrl = null;

            var constructEntry = function(tag) {
                var entry = $('<li><div class="entity-name"></div></li>');
                entry.find('div').text(tag.name);

                return entry;
            };

            chooseMenuEntity(entityType, entity, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, copy, success, null, multiselect);
        },

        chooseServiceCharge: function(success) {

            var entityType = 'ServiceCharge';
            var title = 'Service Charge';
            var previewText = 'Select a service charge to preview';
            var listUrl = '/listAllServiceCharges';
            var previewUrl = '/serviceChargePreview?id=ENTITY_ID';
            var previewDataUrl = null;

            var constructEntry = function(serviceCharge) {
                var entry = $('<li/>').append($('<div class="entity-name"/>').text(serviceCharge.name));

                if (serviceCharge.info) {
                    entry.append($('<div class="entity-info muted smaller"></div>').text(serviceCharge.info));
                }

                return entry;
            };

            chooseMenuEntity(entityType, title, null, previewText, listUrl, constructEntry, previewUrl, previewDataUrl, false, success);
        },

        initGroupsEditor: function(paramName) {
            var groupsTable = $('#groups-table');
            Toast.enableEntityTableInput(groupsTable);
            Toast.enableChildEntityTable(groupsTable, paramName, $('.edit-groups'));
            Toast.enableChildEntityAlphabeticalSort(groupsTable, 'group', paramName, $('.btn-alphabetize-groups'));
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('.add-group-simple'), groupsTable, null, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableChildEntityTable(groupsTable, paramName);
                Toast.enableEntityTableInput(groupsTable);
            });

            // Bulk add menu or menu groups
            $('.admin-content').on('click', '.add-group-bulk', function(e) {
                e.preventDefault();
                // Show the modal dialog and attach a function for Add
                Toast.menuMgmt.showAddItemBulkDialog('Bulk Add Groups', 'Enter new groups on each line', null, 1, function(items) {
                    var btn = $('.add-group-simple');
                    for (var i in items) {
                        btn.click();
                        var lastRowInputs = groupsTable.find('tbody tr:not(.placeholder,.template):last input:text:not(:hidden)');
                        if (lastRowInputs && lastRowInputs.length == 1) {
                            lastRowInputs[0].value = items[i][0];
                        }
                    }
                });
            });


            // launch the menu group chooser dialog
            $('.admin-content').on('click', '.add-group-existing', function(e) {
                e.preventDefault();

                Toast.menuMgmt.chooseMenuGroup(true, $(this).attr('data-parent-set-id'), true, function(groups, deepCopy) {
                    var nextRowIdx = groupsTable.find('tbody tr:not(.placeholder,.template)').length;
                    $.each(groups, function(i, group) {
                        var row = $('<tr class="added" id="group-' + group.id + '"><td class="drag-handle edit-column"><div></div></td></tr>');
                        var paramPrefix = paramName + '[' + nextRowIdx + ']';

                        row.append(Toast.editorCommon.createInputLink(paramPrefix + '.copyName', 'Name', group.name, group.url)
                            .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(group.id))
                            .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.copy').val('true'))
                            .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.deepCopy').val(deepCopy || false)));
                        row.append($('<td class="td-actions edit-column"></td>')
                            .append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove group"></i></a>')
                            .append('<a class="undo">undo remove</a>'));

                        if (nextRowIdx === 0) {
                            groupsTable.find('tr.placeholder').remove();
                        }

                        var template = groupsTable.find('tr.template');
                        if (template) {
                            row.insertBefore(template);
                        } else {
                            groupsTable.find('tbody').append(row);
                        }
                        nextRowIdx++;
                        Toast.enableEntityTableEditLink(row);
                        Toast.enableEntityTableDelete(row);
                    });

                    groupsTable.tableDnDUpdate();
                    groupsTable.next().show();

                    Toast.updateEditColumns(groupsTable);
                });
            });

            // save and go to create a new group, save and go to quick-add
            // groups
            $.each(['.add-group-new'], function(idx, selector) {
                $('.admin-content').on('click', selector, function(e) {
                    e.preventDefault();

                    var form = Toast.editorCommon.getForm();
                    form.append($('<input type="hidden" name="after" />').val(form.find(selector).attr('href')));
                    form.submit();
                });
            });
        },

        initOptionGroupsEditor: function(itemParam) {
            var paramName = itemParam + '.optionGroups',
                modsTable = $('#modifiers-table');
            window.checkDefaultModifiers = function(checkbox) {
                var inheritedGroups = $('#default-options-table tr[inherited="true"]');
                if (!checkbox) {
                    checkbox = $('[name="' + itemParam + '.inheritGroups"]:checked');
                }
                if (checkbox.val() == 'true') {
                    inheritedGroups.show();
                    inheritedGroups.find(':checkbox').prop('disabled', false);
                    inheritedGroups.find('li>label').removeClass('disabled');
                    if ($('#default-options-table tr td').length > 0) {
                        $('#default-options-group').show();
                    }
                } else {
                    inheritedGroups.hide();
                    inheritedGroups.find(':checkbox').prop('disabled', true);
                    inheritedGroups.find('li>label').addClass('disabled');
                    if ($('#default-options-table tr[inherited="false"]').length === 0) {
                        $('#default-options-group').hide();
                    }
                }
            };

            // modifier group drag and drop
            Toast.enableEntityTableInput(modsTable);
            Toast.enableChildEntityTable(modsTable, paramName, $('.edit-optiongroups'));
            Toast.enableChildEntityAlphabeticalSort(modsTable, 'optionGroup', paramName, $('.btn-alphabetize-option-groups'));

            var updateMaxSelections = function(el) {
                el.find(':checkbox[name$=multiSelect]').change(function() {
                    $(this).closest('td').next().find('.max-selections').toggle();
                    $(this).closest('td').next().find('.max-selections-na').toggle();
                });
            };
            updateMaxSelections(modsTable);

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('.add-optiongroup-simple'), modsTable, null, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableChildEntityTable(modsTable, paramName);
                Toast.enableEntityTableInput(modsTable);
                Toast.editorCommon.updateCheckboxes($(this));
            });

            // Bulk add optiongroups
            $('.admin-content').on('click', '.add-optiongroup-bulk', function(e) {
                e.preventDefault();
                // Show the modal dialog and attach a function for adding option groups
                Toast.menuMgmt.showAddItemBulkDialog('Bulk Add Modifier Groups', 'Enter new modifier groups on each line', null, 1, function(items) {
                    var btn = $('.add-optiongroup-simple');
                    for (var i in items) {
                        btn.click();
                        var lastRowInputs = modsTable.find('tbody tr:not(.placeholder,.template):last input:text:not(:hidden)');
                        if (lastRowInputs && lastRowInputs.length == 1) {
                            lastRowInputs[0].value = items[i][0];
                        }
                    }
                });
            });

            // find and add an existing option group
            function createChooseMenuOptionGroupClickHandler(copy) {
                return function(e) {
                    e.preventDefault();
                    Toast.menuMgmt.chooseOptionGroup(true, $(this).attr('data-parent-set-id'), copy, function(optionGroups, deepCopy) {
                        var nextRowIdx = modsTable.find('tbody tr:not(.placeholder,.template)').length;
                        $.each(optionGroups, function(i, optionGroup) {
                            var row = $('<tr class="added" id="option-group-' + optionGroup.id + '"><td class="drag-handle edit-column"><div></div></td></tr>');
                            var paramPrefix = paramName + '[' + nextRowIdx + ']';
                            if (copy) {
                                row.append(Toast.editorCommon.createInputLink(paramPrefix + '.copyName', 'Name', optionGroup.name, optionGroup.url)
                                    .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(optionGroup.id))
                                    .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.copy').val('true'))
                                    .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.deepCopy').val(deepCopy || false)));
                            } else {
                                row.append(Toast.editorCommon.createInputLink(paramPrefix + '.name', 'Name', optionGroup.name, optionGroup.url)
                                    .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(optionGroup.id)));
                            }

                            row.append(Toast.editorCommon.createSelect(paramPrefix + '.requiredMode', optionGroup.requiredMode, optionGroup.requiredModeTypes));
                            row.append(Toast.editorCommon.createCheckbox(paramPrefix + '.multiSelect', optionGroup.multiSelect));
                            if (optionGroup.minSelections) {
                                row.append($('<td>' +
                                    '<div class="min-selections" ' + (optionGroup.multiSelect ? '' : 'style="display:none;"') + '>' + optionGroup.minSelections + '</div>' +
                                    '<div class="min-selections-na" ' + (optionGroup.multiSelect ? 'style="display:none;"' : '') + '>n/a</div>' +
                                    '</td>'));
                            }
                            row.append($('<td>' +
                                '<div class="max-selections" ' + (optionGroup.multiSelect ? '' : 'style="display:none;"') + '>' + optionGroup.maxSelections + '</div>' +
                                '<div class="max-selections-na" ' + (optionGroup.multiSelect ? 'style="display:none;"' : '') + '>n/a</div>' +
                                '</td>'));
                            row.append($('<td class="td-actions edit-column"/>'));
                            row.append($('<td class="td-actions edit-column"></td>')
                                .append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove group"></i></a>')
                                .append('<a class="undo">undo remove</a>'));

                            if (nextRowIdx === 0) {
                                modsTable.find('tr.placeholder').remove();
                            }

                            modsTable.find('tbody').append(row);
                            nextRowIdx++;
                            Toast.enableEntityTableSelect(row);
                            Toast.enableEntityTableEditLink(row);
                            Toast.enableEntityTableDelete(row);
                            Toast.editorCommon.updateCheckboxes(row);
                            updateMaxSelections(row);
                        });

                        modsTable.tableDnDUpdate();
                        modsTable.next().show();

                        Toast.updateEditColumns(modsTable);
                    });
                };
            }

            $('.admin-content').on('click', '.add-optiongroup-existing', createChooseMenuOptionGroupClickHandler(false));
            $('.admin-content').on('click', '.add-optiongroup-copy', createChooseMenuOptionGroupClickHandler(true));

            // save and go to create a new option group
            $('.admin-content').on('click', '.add-optiongroup-new', function(e) {
                e.preventDefault();
                var form = Toast.editorCommon.getForm();
                var afterUrl = form.find('.add-optiongroup-new').attr('href');
                form.append($('<input type="hidden" name="after" />').val(afterUrl));
                form.submit();
            });

            // toggle default editing
            $('#default-options-table').on('click', ':checkbox.override-toggle', function() {
                var list = $(this).closest('tr').find('ul.selection-list');
                if ($(this).is(':checked')) {
                    list.removeClass('disabled').find(':checkbox').prop('disabled', false);
                } else {
                    list.addClass('disabled');
                }
                Toast.updateSelectionListState(list);
            });

            // Show or hide parent default modifiers override
            window.checkDefaultModifiers();
            $(':checkbox[name="' + itemParam + '.inheritGroups"]').change(function() {
                window.checkDefaultModifiers($(this));
            });
        },

        initTagsEditor: function(paramName) {
            // add existing tag
            function addTag(tagId, tagName) {
                var container = $('#tags-container');
                var nextTagIdx = container.find('.label').length;
                var label = $('<span class="label label-info"></span>').text(tagName);
                label.append($('<i class="icon-remove icon-white"></i>'));
                label.append($('<input type="hidden"/>').attr('name', paramName + '[' + nextTagIdx + '].id').val(tagId));

                if (nextTagIdx == 0) {
                    container.find('.placeholder').remove();
                }

                container.append(label);
                container.append('&nbsp;');
            }

            $('#add-tag-existing').click(function(e) {
                e.preventDefault();

                Toast.menuMgmt.chooseMenuItemTag(true, $(this).attr('data-parent-set-id'), false, function(tags) {
                    $.each(tags, function(i, tag) {
                        addTag(tag.id, tag.name);
                    });
                });
            });
            // handle deleting tags
            $('#tags-container').on('click', '.label i.icon-remove', function() {
                var label = $(this).parent();
                var idInput = label.find('input');
                if (label.hasClass('deleted')) {
                    label.removeClass('opacity50 deleted');
                    idInput.val(idInput.data('originalValue'));
                } else {
                    label.addClass('opacity50 deleted');
                    idInput.data('originalValue', idInput.val());
                    idInput.val('false');
                }
            });
            $('#add-tag-new').click(function() {
                var btn = $(this);
                var tagName = btn.prev().val();

                if ($.trim(tagName).length == 0) {
                    alert('Please enter a tag name');
                    return;
                }

                btn.button('loading');
                $.getJSON(Toast.menuMgmt.baseUrl + '/ajaxCreateTag', {
                    name: tagName,
                    restaurantsetid: $(this).attr('data-parent-set-id')
                }, function(tag) {
                    addTag(tag.id, tag.name);
                    btn.button('reset');
                    btn.prev().val('');
                });
            });
        },

        init: function() {
            Toast.hasTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;
            Toast.enableSelectionList();
            Toast.enablePrettyUploads();

            Toast.editorCommon.enableSaveAndPublishBtns();

            // item search
            var searchInput = $('.admin-toolbar .search-query');
            searchInput.typeahead({
                source: function(query, process) {
                    if (query.length > 1) {
                        $.getJSON(Toast.menuMgmt.baseUrl + '/menuItemSearch?query=' + query, function(results) {
                            process(results);

                            var $menu = searchInput.closest('.form-search').find('.typeahead');
                            searchInput.off('keydown.typeahead').on('keydown.typeahead', function() {
                                var active = $menu.find('.active'),
                                    menuHeight = $menu.height(),
                                    activePositionTop = active.position().top,
                                    activePositionBottom = activePositionTop + active.height();
                                if (activePositionBottom > menuHeight) {
                                    $menu.scrollTop($menu.scrollTop() + activePositionBottom - menuHeight);
                                }
                                if (activePositionTop < 0) {
                                    $menu.scrollTop($menu.scrollTop() + activePositionTop);
                                }
                            });
                        });
                    }
                },
                items: 48,
                updater: function(item) {
                    window.location = $(item).data('url');
                    return '';
                }
            });
            var typeahead = searchInput.data('typeahead');
            var baseHighlighter = typeahead.highlighter;
            typeahead.highlighter = function(item) {
                var contentStart = item.indexOf('</span>') + 7;
                var content = item.substr(contentStart);
                var preContent = item.substr(0, contentStart);
                var highlighted = baseHighlighter.call(this, content);
                return preContent + highlighted;
            };
            // no submit on <enter>
            $('.form-search').submit(function(e) {
                e.preventDefault();
                return false;
            });

            // enable help icons on sections
            $('.admin-edit-section i.icon-question-sign').click(function() {
                $(this).closest('h3').next('.help-block').slideToggle();
            });

            // enable popovers for display of other versions
            $('.other-versions[data-toggle="popover"]').popover({
                html: true
            });
        }
    };
})();

Toast.menuMgmt.menuItem = (function() {

    return {
        init: function() {
            Toast.menuMgmt.init();
            Toast.addTouchSectionEnabler('item_inheritPricing', 'nongroup-pricing', true);
            Toast.addTouchSectionEnabler('item_inheritPricing', 'location-pricing', true);
            Toast.addTouchSectionEnabler('item_inheritPricing', 'group-pricing-warning', false);

            Toast.menuMgmt.pricing.init('item');

            Toast.addTouchSectionEnabler('item_menuSpecificPricing', 'menu-pricing');
            Toast.addTouchSectionEnabler('item_inheritGroups', 'inherited-option-groups', false);
            Toast.addTouchSectionEnabler('item_inheritCollapseModifierPrices', 'collapse-modifier-prices', true);

            Toast.menuMgmt.setupInheritedSection('item_inheritTaxRates', 'tax-rates');
            Toast.menuMgmt.setupInheritedSection('item_inheritTaxInclusive', 'tax-inclusive');
            Toast.menuMgmt.setupInheritedSection('item_inheritDiningOptionTax', 'dining-option-tax');
            Toast.menuMgmt.setupInheritedSection('item_inheritSalesCategory', 'categories');
            Toast.menuMgmt.setupInheritedSection('item_deferred', 'categories_outer');
            Toast.menuMgmt.setupInheritedSection('item_inheritDiscountable', 'discounting');
            Toast.menuMgmt.setupInheritedSection('item_inheritedExcludedFromRewards', 'rewards');
            Toast.menuMgmt.setupInheritedSection('item_inheritPrepSequence', 'prep-sequence');
            Toast.menuMgmt.setupInheritedSection('item_inheritPrepStations', 'prep-stations');
            Toast.menuMgmt.setupInheritedSection('item_inheritBarcodeEmbeddedAmountType', 'barcodeAmountType');
            Toast.menuMgmt.setupInheritedSection('item_inheritTareWeight', 'tareWeight');
            Toast.menuMgmt.setupInheritedSection('item_inheritUnitOfMeasure', 'unitOfMeasure');
            Toast.menuMgmt.setupInheritedSection('item_inheritGrubhubOrderable', 'grubhub-orderable');

            $(':checkbox[name="itemInventory"]').click(function() {
                var section = $('#item-quantity');
                if ($(this).val() == 'QUANTITY') {
                    section.slideDown();
                } else {
                    section.slideUp();
                }
            });

            $('#price-group-select').bootstrapifySelect();

            var nongroupSection = $('#nongroup-pricing');

            $(':checkbox[name="pricingProvider"]').click(function() {
                var parentPricingWarning = $('#group-pricing-warning'),
                    priceGroupSelect = $('#price-group-selection');
                if ($(this).val() === 'priceGroup') {
                    parentPricingWarning.slideUp();
                    nongroupSection.slideUp();
                    priceGroupSelect.slideDown();
                } else if ($(this).val() === 'parent') {
                    parentPricingWarning.slideDown();
                    nongroupSection.slideUp();
                    priceGroupSelect.slideUp();
                } else {
                    parentPricingWarning.slideUp();
                    nongroupSection.slideDown();
                    priceGroupSelect.slideUp();
                }
                Toast.menuMgmt.pricing.updateItemGroupPrices();
            });

            // option groups editor (drag and drop, removal, adding option
            // groups)
            Toast.menuMgmt.initOptionGroupsEditor('item');

            // production item quantity editor (creating, editing, deleting)
            Toast.menuMgmt.productionItemQuantity.init();

            // tags editor (add, remove, create new)
            Toast.menuMgmt.initTagsEditor('item.tags');

            // Activate the default modifiers checkbox
            Toast.editorCommon.updateCheckboxes($('body'));

            Toast.enableEntityTableInput($('#menu-pricing table'));
        },
        setupModifierTaxHandler: function(itemParam) {
            const modifierTaxBehavior = {
                selectionList: $("#" + itemParam + "_modifierTaxBehaviorEnum"),
                inputSelector: "input[name='" + itemParam + ".modifierTaxBehaviorEnum']"
            }

            const inheritsTaxRates = {
                selectionList: $("input[name='" + itemParam + ".inheritTaxRates']").closest('ul.selection-list'),
                inputSelector: "input[name='" + itemParam + ".inheritTaxRates']"
            }

            function enable(item) {
                const list = item.selectionList;
                const inputSelector = item.inputSelector;

                list.removeClass('disabled');
                list.find(inputSelector).each(function(i) {
                    $(this).prop('readonly', false);
                });
                Toast.updateSelectionListState(list, 'readonly');
            }

            function disable(item) {
                const list = item.selectionList;
                list.addClass('disabled');
                Toast.updateSelectionListState(list, 'readonly');
            }

            function attachOnClickListener(item) {
                item.selectionList.on('click', ':checkbox', function(event) {
                    if (event.target.readOnly) return false;
                    evaluateTaxStrategies();
                });
            }

            function evaluateTaxStrategies() {
                const doesItemInheritTaxes = $("#item_inheritTaxRates_true").is(':checked');
                const doModifiersInheritTaxRateBehavior = $("#item_modifierTaxBehaviorEnum_INHERITS_PARENT_TAX").is(":checked");

                if (doesItemInheritTaxes === true) {
                    enable(inheritsTaxRates);
                    disable(modifierTaxBehavior);
                } else {
                    enable(modifierTaxBehavior);
                    if (doModifiersInheritTaxRateBehavior !== true) {
                        disable(inheritsTaxRates);
                    } else {
                        enable(inheritsTaxRates);
                    }
                }
            }

            attachOnClickListener(modifierTaxBehavior);
            attachOnClickListener(inheritsTaxRates);
            Toast.enableSelectionList(modifierTaxBehavior.selectionList, 'readonly');
            evaluateTaxStrategies(itemParam);
        },
    };
})();

Toast.menuMgmt.home = (function() {
    return {
        init: function() {
            Toast.menuMgmt.init();

            $('.copy-entity').click(function(e) {
                e.preventDefault();

                if ($(this).hasClass('disabled')) return;
                var url = $(this).attr('href');
                //display spinner
                var spinner = $('#copy-menu-spinner').clone();
                spinner.attr('id', 'copy-menu-spinner-displayed');
                spinner.show();
                $('#notifications').append(spinner);
                $('#notifications').show();


                //copy
                var authenticityToken = $('input[name="authenticityToken"]').val();
                Toast.postKeepAliveJson(url, {
                    authenticityToken: authenticityToken
                }, function(json) {
                    spinner.remove();
                    if (json.message == 'success') {
                        //display success link
                        var successAlert = $('#copy-menu-finish').clone();
                        var link = successAlert.find('a');
                        var successUrl = link.attr('href');
                        successUrl += json.data;
                        link.attr('href', successUrl);
                        successAlert.attr('id', 'copy-menu-finish-displayed');
                        successAlert.show();
                        $('#notifications').append(successAlert);
                        $('#notifications').show();
                    } else {
                        alert('Copy menu failed!');
                    }
                });
            });
        }




    };
})();

Toast.menuMgmt.menu = (function() {
    return {
        init: function() {
            Toast.menuMgmt.init();
            Toast.addTouchSectionEnabler('menu_availableAllDays', 'day-availability', true);
            Toast.addTouchSectionEnabler('menu_availableAllTimes', 'time-availability', true);
            Toast.addTouchSectionEnabler('menu_inheritCollapseModifierPrices', 'collapse-modifier-prices', true);

            // groups editor (drag and drop, removal, adding groups)
            Toast.menuMgmt.initGroupsEditor('menu.groups');

            Toast.menuMgmt.setupInheritedSection('menu_inheritTaxRates', 'tax-rates');
            Toast.menuMgmt.setupInheritedSection('menu_inheritTaxInclusive', 'tax-inclusive');
            Toast.menuMgmt.setupInheritedSection('menu_inheritDiningOptionTax', 'dining-option-tax');

            $('select.ampm').bootstrapifySelect();
        }
    };
})();

Toast.menuMgmt.group = (function() {
    return {
        init: function(groupId, groupPriceRange, parentGroupPriceRange, currencySymbol) {
            Toast.menuMgmt.init();
            Toast.addTouchSectionEnabler('group_inheritGroups', 'inherited-option-groups', false);
            Toast.addTouchSectionEnabler('group_inheritCollapseModifierPrices', 'collapse-modifier-prices', true);

            Toast.menuMgmt.setupInheritedSection('group_inheritTaxRates', 'tax-rates');
            Toast.menuMgmt.setupInheritedSection('group_inheritTaxInclusive', 'tax-inclusive');
            Toast.menuMgmt.setupInheritedSection('group_inheritDiningOptionTax', 'dining-option-tax');
            Toast.menuMgmt.setupInheritedSection('group_inheritSalesCategory', 'categories');
            Toast.menuMgmt.setupInheritedSection('group_inheritDiscountable', 'discounting');
            Toast.menuMgmt.setupInheritedSection('group_inheritedExcludedFromRewards', 'rewards');
            Toast.menuMgmt.setupInheritedSection('group_inheritPrepSequence', 'prep-sequence');
            Toast.menuMgmt.setupInheritedSection('group_inheritPrepStations', 'prep-stations');
            Toast.menuMgmt.setupInheritedSection('group_inheritBarcodeEmbeddedAmountType', 'barcodeAmountType');
            Toast.menuMgmt.setupInheritedSection('group_inheritTareWeight', 'tareWeight');
            Toast.menuMgmt.setupInheritedSection('group_inheritUnitOfMeasure', 'unitOfMeasure');
            Toast.menuMgmt.setupInheritedSection('group_inheritGrubhubOrderable', 'grubhub-orderable');

            Toast.enableChildEntityAlphabeticalSort($('#items-table'), 'item', 'group.items', $('.btn-alphabetize-items'));

            $(':checkbox[name="group.providesPricing"]').click(function() {
                var groupPricing = $('#group-pricing'),
                    pricingProvider = $('#pricing-provider'),
                    parentPricingWarning = $('#parent-pricing-warning'),
                    priceGroupSelect = $('#price-group-selection'),
                    pricingMode = 'none';
                if ($(this).val() === 'true') {
                    // Provides
                    pricingProvider.slideDown();
                    if ($(':checkbox[name="pricingProvider"][checked="checked"],input[type="hidden"][name="pricingProvider"]').val() === 'none') {
                        groupPricing.slideDown();
                    } else {
                        priceGroupSelect.slideDown();
                    }
                    pricingProvider.slideDown();
                    parentPricingWarning.slideUp();
                    pricingMode = 'provides';
                } else {
                    // Does not provide
                    pricingProvider.slideUp();
                    parentPricingWarning.slideUp();
                    groupPricing.slideUp();
                    priceGroupSelect.slideUp();
                    pricingMode = 'none';
                }
                Toast.menuMgmt.pricing.updateItemGroupPrices(pricingMode);
            });

            $(':checkbox[name="pricingProvider"]').click(function() {
                var groupPricing = $('#group-pricing'),
                    parentPricingWarning = $('#parent-pricing-warning'),
                    priceGroupSelect = $('#price-group-selection');
                if ($(this).val() === 'priceGroup') {
                    parentPricingWarning.slideUp();
                    groupPricing.slideUp();
                    priceGroupSelect.slideDown();
                } else if ($(this).val() === 'parent') {
                    parentPricingWarning.slideDown();
                    groupPricing.slideUp();
                    priceGroupSelect.slideUp();
                } else {
                    parentPricingWarning.slideUp();
                    groupPricing.slideDown();
                    priceGroupSelect.slideUp();
                }
                Toast.menuMgmt.pricing.updateItemGroupPrices();
            });

            Toast.menuMgmt.pricing.initGroup('group', currencySymbol, groupPriceRange, parentGroupPriceRange);

            // option groups editor (drag and drop, removal, adding option
            // groups)
            Toast.menuMgmt.initOptionGroupsEditor('group');

            // groups editor (drag and drop, removal, adding groups)
            Toast.menuMgmt.initGroupsEditor('group.subgroups');

            // tags editor (add, remove, create new)
            Toast.menuMgmt.initTagsEditor('group.tags');

            // item drag and drop and removal
            var itemsTable = $('#items-table');
            Toast.enableEntityTableInput(itemsTable);
            Toast.enableChildEntityTable(itemsTable, 'group.items', $('.edit-items'));
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('.add-item-simple'), itemsTable, null, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableChildEntityTable(itemsTable, 'group.items');
                Toast.enableEntityTableInput(itemsTable);
            });

            function createChooseMenuItemClickHandler(copy) {
                return function(e) {
                    e.preventDefault();
                    Toast.menuMgmt.chooseMenuItem(true, groupId, $(this).attr('data-parent-set-id'), copy, function(items, deepCopy) {
                        $.each(items, function(i, item) {
                            var nextRowIdx = itemsTable.find('tbody tr:not(.placeholder,.template)').length;
                            var row = $('<tr class="added" id="item-' + item.id + '"><td class="drag-handle edit-column"><div></div></td></tr>');
                            var paramPrefix = 'group.items[' + nextRowIdx + ']';

                            if (copy) {
                                row.append(Toast.editorCommon.createInputLink(paramPrefix + '.copyName', 'Name', item.name, item.url)
                                    .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(item.id))
                                    .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.copy').val('true'))
                                    .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.deepCopy').val(deepCopy || false))
                                );
                            } else {
                                row.append(Toast.editorCommon.createInputLink(paramPrefix + '.name', 'Name', item.name, item.url)
                                    .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(item.id))
                                );
                            }

                            var itemPriceCell = $('<td class="item-price right" colspan="2"></td>');
                            var pricingInfo = item.pricingInfo ? item.pricingInfo : item.previewData.pricingInfo;
                            if (pricingInfo.imgSrc) {
                                itemPriceCell.append($('<img class="price-icon" title="' + pricingInfo.imgTitle + '" src="' + pricingInfo.imgSrc + '" />'));
                            }

                            // Add the existing item's base price as a hidden input field so it will be set correctly when the menu is saved.]
                            console.log(item);
                            if (pricingInfo.basePrice != null) {
                                if (copy) {
                                    itemPriceCell.append($('<input type="hidden">')
                                        .attr('name', paramPrefix + '.copyBasePrice')
                                        .attr('value', pricingInfo.basePrice));
                                } else {
                                    itemPriceCell.append($('<input type="hidden">')
                                        .attr('name', paramPrefix + '.basePrice')
                                        .attr('value', pricingInfo.basePrice));
                                }
                            } else {
                                if (copy) {
                                    itemPriceCell.append($('<input type="hidden">')
                                        .attr('name', paramPrefix + '.copyBasePrice')
                                        .attr('value', null));
                                } else {
                                    itemPriceCell.append($('<input type="hidden">')
                                        .attr('name', paramPrefix + '.basePrice')
                                        .attr('value', null));
                                }
                            }

                            itemPriceCell.append(pricingInfo.priceValue);

                            row.append(itemPriceCell);

                            row.append($('<td class="edit-column"></td>').append('<i class="icon-copy opacity20" title="Copy item" style="cursor:default;"></i>'));
                            row.append($('<td class="edit-column"></td>')
                                .append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove item"></i></a>')
                                .append('<a class="undo">&{"field.table.undoremove"}</a>'));

                            Toast.enableEntityTableEditLink(row);
                            Toast.enableEntityTableDelete(row);

                            if (nextRowIdx === 0) {
                                itemsTable.find('tr.placeholder').remove();
                            }

                            var template = itemsTable.find('tr.template');
                            if (template) {
                                row.insertBefore(template);
                            } else {
                                itemsTable.find('tbody').append(row);
                            }
                            itemsTable.tableDnDUpdate();

                            Toast.enableEntityTableEditLink(row);

                            itemsTable.next().show();

                            Toast.menuMgmt.pricing.updateItemGroupPrices();
                            Toast.updateEditColumns(itemsTable);
                        });
                    });
                };
            }

            // launch the menu item chooser dialog
            $('.admin-content').on('click', '.add-item-existing', createChooseMenuItemClickHandler(false));
            $('.admin-content').on('click', '.add-item-copy', createChooseMenuItemClickHandler(true));

            // save and go to create a new item, save and go to quick-add items
            $.each(['.add-item-new'], function(idx, selector) {
                $('.admin-content').on('click', selector, function(e) {
                    e.preventDefault();

                    var form = Toast.editorCommon.getForm();
                    form.append($('<input type="hidden" name="after" />').val(form.find(selector).attr('href')));
                    form.submit();
                });
            });

            // copy an existing item, just disable the save buttons
            $('a.copy-entity').click(function() {
                Toast.editorCommon.disableSaveAndPublishBtns();
            });

            // Activate the default modifiers checkbox
            Toast.editorCommon.updateCheckboxes($('body'));

            // launch the menu item bulk import dialog
            $('.admin-content').on('click', '.add-item-bulk', function(e) {
                e.preventDefault();

                // Show the modal dialog and attach a function for adding items
                Toast.menuMgmt.showAddItemBulkDialog('Bulk Add Items',
                    'Please paste in from a spreadsheet: Name, Price, POS Name, Kitchen Name, Description, Calories, SKU, PLU',
                    'Name  Price  POS Name  Kitchen Name  Description  Calories  SKU  PLU',
                    null,
                    function(items) {
                        if (items.length > 0) {
                            var btn = $('.add-item-simple');

                            for (var menuItemIdx in items) {
                                // Simulate clicking on add button (create row code is not factored out)
                                btn.click();

                                var values = items[menuItemIdx];

                                // Find the visible inputs in the last added row that's not the template
                                var lastRowInputs = itemsTable.find('tbody tr:not(.placeholder,.template):last input:not(:hidden)');
                                if (lastRowInputs != null && lastRowInputs.length == 2) {
                                    lastRowInputs[0].value = values[0];
                                    lastRowInputs[1].value = values[1];
                                }

                                if (values.length >= 3) {
                                    // Add short name
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-short-name').val(values[2]);
                                }
                                if (values.length >= 4) {
                                    // Add kitchen name
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-kitchen-name').val(values[3]);
                                }
                                if (values.length >= 5) {
                                    // Add description
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-description').val(values[4]);
                                }
                                if (values.length >= 6) {
                                    // Add calories
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-calories').val(values[5]);
                                }
                                if (values.length >= 7) {
                                    // Add sku
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-sku').val(values[6]);
                                }
                                if (values.length >= 8) {
                                    // Add plu
                                    itemsTable.find('tbody tr:not(.placeholder,.template):last .input-plu').val(values[7]);
                                }
                                var priceLow = null,
                                    priceHigh = null;

                                if (values.length >= 10) {
                                    var itemIdx = itemsTable.find('tbody tr:not(.placeholder,.template) .id-param').length - 1;
                                    var index = 6,
                                        sizeOptionIdx = 0;
                                    while (values[index] && values[index] != '') {
                                        itemsTable.find('tbody tr:not(.placeholder,.template):last')
                                            .append($('<input type="hidden" name="group.items[' + itemIdx + '].newSizeOption[' + sizeOptionIdx + '].name" value="' + values[index++] + '" />'))
                                            .append($('<input type="hidden" name="group.items[' + itemIdx + '].newSizeOption[' + sizeOptionIdx++ + '].price" value="' + values[index++] + '" />'));
                                        if (priceLow == null) {
                                            priceLow = values[index - 1];
                                        } else {
                                            priceHigh = values[index - 1];
                                        }
                                    }
                                }
                                if (priceLow && priceHigh) {
                                    // Display the range in the price field
                                    var rangeText = Toast.menuMgmt.pricing.formatCurrency(priceLow) + ' - ' + Toast.menuMgmt.pricing.formatCurrency(priceHigh);
                                    itemsTable.find('tbody tr:not(.placeholder, .template):last td.td-input.item-price').remove();
                                    itemsTable.find('tbody tr:not(.placeholder, .template):last td.currency.item-price').html(rangeText).attr('colspan', 2);
                                }
                            }
                        }
                    }
                );
            });
        }
    };
})();

Toast.menuMgmt.optionGroup = (function() {
    return {
        updatePriceColumns: function(pricingMode) {
            if (!pricingMode) {
                pricingMode = $(':checkbox[name="optionGroup.pricingMode"][checked="checked"]').val();
            }
            switch (pricingMode) {
                case 'ADJUSTS_PRICE':
                    $('.price-column').show();
                    break;
                default:
                    $('.price-column').hide();
            }
        },
        getSequenceRowText: function(index, size) {
            if (index === size - 1) {
                return 'All additional options';
            }
            return Toast.formatPosition(index + 1) + ' option';
        },
        updateSequenceRowText: function(cells) {
            cells.each(function(index, cell) {
                $(cell).text(Toast.menuMgmt.optionGroup.getSequenceRowText(index, cells.size()));
            });
        },
        init: function(optionGroupId) {
            Toast.menuMgmt.init();
            Toast.addTouchSectionEnabler('optionGroup_multiSelect', 'max-selections', false);
            Toast.addTouchSectionEnabler('optionGroup_multiSelect', 'doubleModifiers', false);
            Toast.menuMgmt.setupInheritedSection('optionGroup_inheritGrubhubOrderable', 'grubhub-orderable');

            $('#optionGroup_minSelections').bootstrapifySelect();
            $('#optionGroup_maxSelections').bootstrapifySelect();

            Toast.enableChildEntityAlphabeticalSort($('#modifiers-table'), 'menu-option', 'optionGroup.options', $('.btn-alphabetize-modifiers'));

            // min selections should only be shown if multiSelect and requiredMode == REQUIRED
            $(':checkbox[name="optionGroup.requiredMode"], :checkbox[name="optionGroup.multiSelect"]').change(function() {
                var requiredModeRequired = $(':checkbox[name="optionGroup.requiredMode"][value="REQUIRED"]');
                var multiSelect = $('#optionGroup_multiSelect_true');
                var minSelections = $('#min-selections');

                if (requiredModeRequired.attr('checked') && multiSelect.attr('checked')) {
                    minSelections.slideDown();
                } else {
                    minSelections.slideUp();
                }
            });

            // show the fixed price field when that pricing mode is selected
            $(':checkbox[name="optionGroup.pricingMode"]').click(function() {
                var checkbox = $(this),
                    defaultPricingSection = $('#default-option-settings'),
                    modifierSizeStrategy = $('#modifier-size-strategy'),
                    pricingStrategySection = $('#pricing-strategy'),
                    locationSpecificPriceSection = $('#location-pricing'),
                    pricingMode = checkbox.val();
                if (pricingMode == 'INCLUDED') {
                    defaultPricingSection.slideUp();
                } else {
                    defaultPricingSection.slideDown();
                }
                if (pricingMode === 'FIXED_PRICE') {
                    pricingStrategySection.slideDown();
                } else {
                    pricingStrategySection.slideUp();
                }
                if (pricingMode === 'ADJUSTS_PRICE') {
                    modifierSizeStrategy.slideDown();
                } else {
                    modifierSizeStrategy.slideUp();
                }
                if (pricingMode === 'LOCATION_SPECIFIC_PRICE') {
                    locationSpecificPriceSection.slideDown();
                } else {
                    locationSpecificPriceSection.slideUp();
                }
                Toast.menuMgmt.optionGroup.updatePriceColumns(pricingMode);
                checkbox.closest('ul').find('.previousSelection').removeClass('previousSelection');
            });

            var locationPricingTable = $('#location-pricing-table');
            Toast.enableEntityTableInput(locationPricingTable);
            Toast.enableEntityTableSelect(locationPricingTable);
            Toast.enableEntityTableDelete(locationPricingTable);
            Toast.menuMgmt.pricing.enablePriceWatching();
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-new-location-price'), locationPricingTable, null, function() {
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableEntityTableDelete($(this));
                $('input[name="hasNonReadonlyPrices"]').val(true);
            });

            $(':checkbox[name="optionGroup.pricingStrategy"]').click(function() {
                var checkbox = $(this),
                    fixedPriceSection = $('#option-fixed-price'),
                    sequencePriceSection = $('#option-sequence-price'),
                    sizePriceSection = $('#option-size-price'),
                    sizeSequencePriceSection = $('#option-size-sequence-price'),
                    pricingStrategy = checkbox.val();

                fixedPriceSection.slideUp();
                sequencePriceSection.slideUp();
                sizePriceSection.slideUp();
                sizeSequencePriceSection.slideUp();

                switch (pricingStrategy) {
                    case 'DEFAULT':
                        fixedPriceSection.slideDown();
                        break;
                    case 'SEQUENCE_PRICE':
                        sequencePriceSection.slideDown();
                        break;
                    case 'SIZE_PRICE':
                        sizePriceSection.slideDown();
                        break;
                    case 'SIZE_SEQUENCE_PRICE':
                        sizeSequencePriceSection.slideDown();
                        break;
                    default:
                }
            });
            $(':checkbox[name="optionGroup.defaultOptionsPricingMode"]').click(function() {
                var checkbox = $(this),
                    defaultSwapSection = $('#default-options-swap-pricing-mode'),
                    pricingMode = checkbox.val();
                if (pricingMode != 'INCLUDED') {
                    defaultSwapSection.slideUp();
                } else {
                    defaultSwapSection.slideDown();
                }
            });
            // show the correct editor for options when the options source is
            // selected
            $(':checkbox[name="optionGroup.type"]').click(function() {
                var refConfig = $('#reference-config');
                var manualConfig = $('#manual-config');
                var refIdInput = $('input[name="optionGroup.groupReference.id"]');
                if ($(this).val() == 'GROUP_REFERENCE') {
                    manualConfig.slideUp();
                    refConfig.slideDown();
                    refIdInput.prop('disabled', false);

                    // handle disabling invalid pricing methods and saving that
                    // selection
                    // if the currently selected method is now invalid
                    $('#pricing-method-info').show();
                    var pricingList = $('#pricing-methods');
                    var currentPrice = pricingList.find(':checkbox:checked');
                    pricingList.find('li:gt(1)').find(':checkbox').prop('disabled', true);
                    if (currentPrice.closest('li').index() > 1) {
                        currentPrice.prop('checked', false).addClass('previousSelection');
                        pricingList.find('li:eq(0) :checkbox').prop('checked', true);
                    }
                    Toast.updateSelectionListState(pricingList);
                } else {
                    refConfig.slideUp();
                    manualConfig.slideDown();
                    refIdInput.prop('disabled', true);

                    // handle enabling all pricing methods and re-selecting a
                    // previously
                    // invalid selection if there was one
                    $('#pricing-method-info').hide();
                    var pricingList = $('#pricing-methods');
                    pricingList.find(':checkbox').prop('disabled', false);
                    var previousSelection = pricingList.find('.previousSelection');
                    if (previousSelection.length > 0) {
                        pricingList.find(':checked').prop('checked', false);
                        previousSelection.removeClass('previousSelection').prop('checked', true);
                    }
                    Toast.updateSelectionListState(pricingList);
                }
            });

            // launch the menu group chooser dialog
            $('#choose-menu-group').click(function() {
                var chooseBtn = $(this);
                Toast.menuMgmt.chooseMenuGroup(false, $(this).attr('data-parent-set-id'), false, function(group) {
                    // set the group's id on the hidden input
                    $('input[name="optionGroup.groupReference.id"]').val(group.id).prop('disabled', false);

                    // load the items in the chosen group
                    $.getJSON(Toast.menuMgmt.baseUrl + '/listMenuItems?groupId=' + group.id, function(items) {
                        chooseBtn.text('Change Group').prev().text(group.name).show();

                        // display the items in the 'referenced items' table
                        var itemsGroup = $('#referenced-items');
                        var itemsTable = itemsGroup.find('table');
                        var tBody = itemsTable.find('tbody');
                        tBody.empty();
                        if (items.length === 0) {
                            tBody.append($('<tr class="placeholder"></tr>').append($('<td colspan="2"></td>').text('"' + group.name + '" currently contains no items')));
                        } else {
                            $.each(items, function(i, item) {
                                var tr = $('<tr></tr>');
                                var checkbox = $('<input type="checkbox" name="optionGroup.defaultItems[' + i + '].id"/>').val(item.id);
                                tr.append($('<td class="td-checkbox"></td>').append($('<label></label>').append(checkbox)));
                                tr.append($('<td/>').append('<a href="' + item.url + '">').text(item.name).attr('href', item.url));
                                tBody.append(tr);
                            });
                        }

                        // show the referenced items group, initially hidden if
                        // there was no group referenced
                        itemsGroup.show();
                    });
                    Toast.unsavedChanges = true;
                });
            });

            // options drag and drop and removal
            var modsTable = $('#modifiers-table');
            Toast.enableEntityTableInput(modsTable);
            Toast.enableChildEntityTable(modsTable, 'optionGroup.options', $('.edit-options'));

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('.add-option-simple'), modsTable, null, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableChildEntityTable(modsTable, 'optionGroup.options');
                Toast.enableEntityTableInput(modsTable);
            });

            var chooseMenuOption = function(copy, optionGroupId, parentSetId) {
                Toast.menuMgmt.chooseMenuOption(true, optionGroupId, parentSetId, copy, function(options, deepCopy) {
                    var nextRowIdx = modsTable.find('tbody tr:not(.placeholder,.template)').length;
                    $.each(options, function(i, option) {
                        var row = $('<tr class="added" id="menu-option-' + option.id + '"><td class="drag-handle edit-column"><div></div></td></tr>');
                        var paramPrefix = 'optionGroup.options[' + nextRowIdx + ']';
                        var checkbox = $('<input type="checkbox" name="' + paramPrefix + '.defaultOption"/>').val(true);
                        row.append($('<td class="td-checkbox"></td>').append($('<label></label>').append(checkbox)));

                        var nameField, namePlaceholder, priceField;
                        if (option.optionName) {
                            nameField = paramPrefix + '.name';
                            namePlaceholder = option.itemName;
                        } else {
                            nameField = paramPrefix + '.itemName';
                            namePlaceholder = 'Name';
                        }

                        var overridePrice = option.overridePrice ? option.overridePrice : option.previewData.overridePrice;
                        var priceRaw = option.priceRaw ? option.priceRaw : option.previewData.priceRaw;
                        var pricingInfo = option.pricingInfo ? option.pricingInfo : option.previewData.pricingInfo;

                        if (copy) {
                            nameField = paramPrefix + '.copyName';
                            priceField = paramPrefix + '.copyPrice';
                            row.append(Toast.editorCommon.createInputLink(nameField, namePlaceholder, option.name, option.url)
                                .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(option.id))
                                .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.copy').val('true'))
                                .append($('<input type="hidden"></input>').attr('name', paramPrefix + '.deepCopy').val(deepCopy || false)));
                        } else {
                            row.append(Toast.editorCommon.createInputLink(nameField, namePlaceholder, option.name, option.url)
                                .append($('<input type="hidden" class="id-param"></input>').attr('name', paramPrefix + '.id').val(option.id)));
                            priceField = paramPrefix + (overridePrice ? '.overriddenPrice' : '.itemPrice');
                        }

                        if (overridePrice || priceRaw) {
                            row.append($('<td class="currency price-column"></td>').text('$'))
                                .append($('<td class="td-input right price-column"></td>')
                                    .append($('<input type="text" placeholder="0.00" />').attr('name', priceField).val(priceRaw)));
                        } else {
                            var optionPriceCell = $('<td class="right price-column" colspan="2"></td>');
                            if (pricingInfo.imgSrc) {
                                optionPriceCell.append($('<img class="price-icon" title="' + pricingInfo.imgTitle + '" src="' + pricingInfo.imgSrc + '" />'));
                            }
                            optionPriceCell.append(pricingInfo.priceValue);
                            row.append(optionPriceCell);
                        }

                        row.append($('<td class="td-actions edit-column"></td>')
                            .append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove option"></i></a>')
                            .append('<a class="undo">undo remove</a>'));

                        if (nextRowIdx === 0) {
                            modsTable.find('tr.placeholder').remove();
                        }

                        var template = modsTable.find('tr.template');
                        if (template) {
                            row.insertBefore(template);
                        } else {
                            modsTable.find('tbody').append(row);
                        }
                        nextRowIdx++;
                        Toast.enableEntityTableInput(row);
                        Toast.enableEntityTableEditLink(row);
                        Toast.enableEntityTableDelete(row);
                    });

                    modsTable.tableDnDUpdate();
                    modsTable.next().show();
                    Toast.updateEditColumns(modsTable);
                    Toast.menuMgmt.optionGroup.updatePriceColumns();
                    Toast.unsavedChanges = true;
                });
            };

            $('.inherited').each(function() {
                $(this).click(function() {
                    $('#optionGroup_fixedPrice').focus();
                });
            });


            // launch the menu option chooser dialog
            $('.admin-content').on('click', '.add-option-existing', function(e) {
                e.preventDefault();
                chooseMenuOption(false, optionGroupId, $(this).attr('data-parent-set-id'));
            });

            $('.admin-content').on('click', '.add-option-copy', function(e) {
                e.preventDefault();
                chooseMenuOption(true, optionGroupId, $(this).attr('data-parent-set-id'));
            });

            // add new options
            $('.admin-content').on('click', '.add-option-bulk', function(e) {
                e.preventDefault();
                // Show the modal dialog and attach a function for adding menu item options
                Toast.menuMgmt.showAddItemBulkDialog('Bulk Add Modifiers', 'Please paste in from a spreadsheet: Name, Price, Calories', 'Name  Price  Calories', null, function(items) {
                    var btn = $('.add-option-simple');
                    for (var i in items) {
                        btn.click();

                        var values = items[i];

                        var lastRowInputs = modsTable.find('tbody tr:not(.placeholder,.template):last input:text:not(:hidden)');
                        if (lastRowInputs) {
                            var numInputs = lastRowInputs.length;
                            var item = items[i];
                            // modsTable could show two columns or one column depending on the Pricing Method
                            for (var j = 0; j < Math.min(numInputs, item.length); j++) {
                                lastRowInputs[j].value = item[j];
                            }
                        }
                        if (values.length >= 3) {
                            // Add calories
                            modsTable.find('tbody tr:not(.placeholder,.template):last .input-calories').val(values[2]);
                        }
                    }
                });
            });

            $('.admin-content').on('click', '.add-option-item', function(e) {
                e.preventDefault();

                Toast.menuMgmt.chooseMenuItem(false, null, $(this).attr('data-parent-set-id'), false, function(item) {
                    var form = Toast.editorCommon.getForm();
                    var newOptionUrl = form.find('.add-option-item').attr('href') + item.id;

                    form.append($('<input type="hidden" name="after" />').val(newOptionUrl));
                    form.submit();
                });
            });

            $.each(['.add-option-new'], function(idx, selector) {
                $('.admin-content').on('click', selector, function(e) {
                    e.preventDefault();

                    var form = Toast.editorCommon.getForm();
                    form.append($('<input type="hidden" name="after" />').val(form.find(selector).attr('href')));
                    form.submit();
                });
            });

            // default selections, both tables
            var defaultSelectionTables = $('#referenced-items table,#manual-options table');
            Toast.initTableDefaultSelection(defaultSelectionTables, function() {
                return $('#optionGroup_multiSelect_true').is(':checked');
            });

            // when going from multiselect to single-select, make sure only one
            // default is selected
            $('#optionGroup_multiSelect').click(function() {
                var multiselect = $(this).is(':checked');
                if (!multiselect) {
                    defaultSelectionTables.each(function() {
                        $(this).find('input').filter(':checked:gt(0)').prop('checked', false);
                    });
                }
                updateCheckedStates();
            });
        }
    };
})();

Toast.menuMgmt.option = (function() {
    return {
        init: function() {
            Toast.menuMgmt.init();
            Toast.addTouchSectionEnabler('option_overridePrice', 'price-override', false);
            Toast.menuMgmt.setupInheritedSection('option_inheritGrubhubOrderable', 'grubhub-orderable');

            // launch the menu item chooser dialog
            $('#choose-menu-item').click(function(e) {
                e.preventDefault();

                Toast.menuMgmt.chooseMenuItem(false, null, $(this).attr('data-parent-set-id'), false, function(item) {
                    var refIdInput = $('#item-reference-id');
                    refIdInput.val(item.id).prop('disabled', false).next().html(item.name);
                    refIdInput.prev().show();

                    $('.selection-list').addClass('disabled').each(function() {
                        Toast.updateSelectionListState($(this));
                    });

                    // preview section
                    var itemPreview = $('.item-preview-content');
                    var previewContent = itemPreview.find('.entity-preview').empty();
                    if (previewContent.is(':visible')) {
                        previewContent.load(Toast.menuMgmt.baseUrl + '/menuItemPreview?id=' + item.id);
                    } else {
                        $('#item-preview-toggle').attr('data-item-id', item.id);
                        itemPreview.find('> img').show();
                        $('#item-preview-toggle').removeData('loaded');
                    }
                    Toast.unsavedChanges = true;
                });
            });

            // $(this).next().slideToggle().end().find('i').toggle()
            // show item details
            $('#item-preview-toggle').click(function() {
                var toggle = $(this);
                toggle.next().slideToggle().end().find('i').toggle();
                if (!toggle.data('loaded')) {
                    toggle.data('loaded', true);
                    toggle.next().find('> img').hide().end().find('.entity-preview')
                        .load(Toast.menuMgmt.baseUrl + '/menuItemPreview?id=' + toggle.attr('data-item-id'));
                }
            });
        }
    };
})();

Toast.menuMgmt.menuItemTags = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var tagsTable = $('#tags-table');

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-tag-new'), tagsTable);

            // tag deletion
            Toast.enableEntityTableDelete(tagsTable);
        }
    };
})();

Toast.menuMgmt.pricing = (function() {
    return {
        currencySymbol: undefined,
        groupPriceRange: undefined,
        parentGroupPriceRange: undefined,
        isGroup: false,
        formatPrice: function(value) {
            if (!value) {
                return value;
            }
            var floatValue = 0;
            if (typeof value === 'string') {
                floatValue = parseFloat(value.replace(',', ''));
            } else if (typeof value === 'number') {
                floatValue = value;
            }
            return floatValue.toFixed(2);
        },
        formatCurrency: function(value) {
            if (!value) {
                return '-';
            }
            var me = Toast.menuMgmt.pricing;
            return me.currencySymbol + me.formatPrice(value);
        },
        getPriceRange: function() {
            var me = Toast.menuMgmt.pricing,
                min = Number.MAX_VALUE,
                max = 0;
            $('td.size-price :text').each(function() {
                var val = parseFloat($(this).val());
                if (!isNaN(val)) {
                    min = Math.min(min, val);
                    max = Math.max(max, val);
                }
            });
            if (min === Number.MAX_VALUE) {
                return ' - ';
            } else if (min === max) {
                return me.formatCurrency(min);
            } else {
                return me.formatCurrency(min) + ' - ' + me.formatCurrency(max);
            }
        },
        updateItemGroupPrices: function(pricingMode, pricingStrategy) {
            if (!pricingMode) {
                pricingMode = $(':checkbox[name="group.providesPricing"][checked="checked"]').val();
                if (pricingMode === 'true') {
                    pricingMode = 'provides';
                } else {
                    pricingMode = 'none';
                }
            }
            if (!pricingStrategy) {
                pricingStrategy = $(':checkbox[name="priceGroup.pricing"][checked="checked"]').val();
            }
            if (pricingMode === 'none') {
                $('.item-price :text').attr('placeholder', '0.00');
            } else {
                $('.item-price :text').attr('placeholder', 'inherited');
            }
        },
        enablePriceWatching: function() {
            var me = Toast.menuMgmt.pricing;
            $('#base-price,#menu-pricing,td.size-price').find(':text').change(function() {
                var input = $(this);
                input.val(me.formatPrice(input.val()));
                if (me.isGroup) {
                    me.updateItemGroupPrices('provides');
                }
            });
        },
        initGroup: function(itemParam, currencySymbol, groupPriceRange, parentGroupPriceRange) {
            var me = Toast.menuMgmt.pricing;
            me.currencySymbol = currencySymbol;
            me.groupPriceRange = groupPriceRange;
            me.parentGroupPriceRange = parentGroupPriceRange;
            me.isGroup = true;
            me.init(itemParam);
            me.updateItemGroupPrices();
        },
        init: function(itemParam) {
            var me = Toast.menuMgmt.pricing;
            $(':checkbox.pricing-strategy').click(function() {
                var basePrice = $('#base-price'),
                    sizePricing = $('#size-pricing'),
                    menuPricing = $('#menu-pricing'),
                    timePricing = $('#time-pricing'),
                    locationPricing = $('#location-pricing'),
                    strategy = $(this).val();

                sizePricing.slideUp();
                menuPricing.slideUp();
                timePricing.slideUp();
                locationPricing.slideUp();

                if (strategy === 'DEFAULT') {
                    basePrice.slideDown();
                } else if (strategy === 'SIZE_PRICE') {
                    basePrice.slideUp();
                    sizePricing.slideDown();
                } else if (strategy === 'MENU_SPECIFIC_PRICE') {
                    basePrice.slideDown();
                    menuPricing.slideDown();
                } else if (strategy === 'TIME_SPECIFIC_PRICE') {
                    basePrice.slideDown();
                    timePricing.slideDown();
                } else if (strategy === 'LOCATION_SPECIFIC_PRICE') {
                    basePrice.slideUp();
                    locationPricing.slideDown();
                } else if (strategy === 'OPEN_PRICE') {
                    basePrice.slideUp();
                }
                if (me.isGroup) {
                    me.updateItemGroupPrices('provides', strategy);
                }
            });

            $('#' + itemParam + '_basePrice').change(function() {
                var basePrice = $(this).val(),
                    basePriceFloat = parseFloat(basePrice.replace(',', '')),
                    basePriceFormatted = me.formatPrice(basePrice);
                if (basePrice && isNaN(basePriceFloat)) {
                    $(this).closest('.control-group').addClass('error');
                    return;
                }
                $(this).val(basePriceFormatted);
                $(this).closest('.control-group').removeClass('error');
                $('#menu-pricing :text').each(function() {
                    $(this).attr('placeholder', basePriceFormatted);
                });
            });

            var pricingTable = $('#size-pricing-table');
            Toast.enableEntityTableInput(pricingTable);
            me.enablePriceWatching();
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-new-size-price'), pricingTable, undefined, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableEntityTableInput(pricingTable);
                Toast.enableChildEntityTable(pricingTable, itemParam + '.sizeOptions');
                me.enablePriceWatching();
            });

            // reordering / deletion
            Toast.enableChildEntityTable(pricingTable, itemParam + '.sizeOptions', $('.edit-sizes'));

            //add a new timed pricing row to the table
            var timedPriceTable = $('#time-pricing');
            Toast.enableEntityTableInput(timedPriceTable);
            Toast.enableEntityTableSelect(timedPriceTable);
            Toast.enableEntityTableDelete(timedPriceTable);
            Toast.enableEntityTableRowTemplate($('#add-time-pricing'), timedPriceTable, null, function() {
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableEntityTableDelete($(this));
            });

            var locationPricingTable = $('#location-pricing-table');
            Toast.enableEntityTableInput(locationPricingTable);
            Toast.enableEntityTableSelect(locationPricingTable);
            Toast.enableEntityTableDelete(locationPricingTable);
            me.enablePriceWatching();
            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-new-location-price'), locationPricingTable, null, function() {
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableEntityTableDelete($(this));
                $('input[name="hasNonReadonlyPrices"]').val(true);
            });
            locationPricingTable.on('change', '.location-price :input', function() {
                var locationPrice = $(this).val(),
                    locationPriceFloat = parseFloat(locationPrice.replace(',', ''));
                if (locationPrice > 0 || locationPrice < 0) {
                    $(this).val(me.formatPrice(locationPriceFloat));
                } else if (locationPrice == 0) {
                    $(this).val(me.formatPrice(0).toFixed(2));
                }
            });
            locationPricingTable.on('input', '.location-price :input', function() {
                var locationPrice = $(this).val();
                if (locationPrice && isNaN(locationPrice)) {
                    $(this).addClass('error');
                    return;
                }
                $(this).removeClass('error');
            });

            // enable popovers for display of other versions
            $('.other-versions[data-toggle="popover"]').popover({
                html: true
            });
        }
    };
})();

Toast.menuMgmt.salesCategories = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var categoriesTable = $('#categories-table');

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-category-new'), categoriesTable, undefined, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableChildEntityTable(categoriesTable, 'categories', null, null, null, true);
                Toast.updateOrderColumn($(this));
            });

            // reordering / deletion
            Toast.enableChildEntityTable(categoriesTable, 'categories', $('.edit-categories'), null, null, true);
            Toast.enableEntityTableInput(categoriesTable);
            Toast.enableEntityTableSelect(categoriesTable);

            var revenueCentersTable = $('#revenue-centers-table');
            // Checkboxes
            Toast.initTableDefaultSelection(revenueCentersTable, true);

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('#add-center-new'), revenueCentersTable, undefined, function() {
                // after a new row is added, reupdate the drag and drop
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableChildEntityTable(revenueCentersTable, 'revenueCenters', null, null, null, true);
            });

            // reordering / deletion
            Toast.enableChildEntityTable(revenueCentersTable, 'revenueCenters', $('.edit-centers'), null, null, true);
            Toast.enableEntityTableInput(revenueCentersTable);
        }
    };
})();


Toast.menuMgmt.priceGroup = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var nongroupSection = $('#nongroup-pricing');

            $('#group_inheritPricing_true').click(function() {
                nongroupSection.slideUp();
            });

            $('#group_inheritPricing_false').click(function() {
                nongroupSection.slideDown();
            });
        }
    };
})();

Toast.menuMgmt.prepStations = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            $('i.icon-info-sign').tooltip();

            $('#prepStations_table').on('click', '.printing-mode :checkbox', function() {
                var mode = $(this).is(':checked') ? 'ON' : 'OFFLINE_ONLY';
                $(this).closest('td').find(':hidden').val(mode);
            });

            Toast.enableEntityTableSelect($('#prepStations_table'));
        }
    };
})();

Toast.menuMgmt.productionItemQuantity = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var productionItemQuantityTable = $('#production-item-quantity-table');
            Toast.enableChildEntityTable(productionItemQuantityTable);
            Toast.enableEntityTableDelete(productionItemQuantityTable);
            Toast.enableEntityTableInput(productionItemQuantityTable);

            // add a new row from the template row
            Toast.enableEntityTableRowTemplate($('.add-production-item-quantity-simple'), productionItemQuantityTable, null, function() {
                Toast.enableChildEntityTable(productionItemQuantityTable);
                Toast.enableEntityTableDelete(productionItemQuantityTable);
                Toast.enableEntityTableInput(productionItemQuantityTable);
            });
        }
    };
})();

Toast.menuMgmt.kitchenSetup = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            $('i.icon-info-sign').tooltip();

            Toast.editorCommon.updateCheckboxes($('#quick-sms-table'));
            Toast.editorCommon.updateCheckboxes($('#table-sms-table'));
            Toast.editorCommon.updateCheckboxes($('#online-sms-table'));
            Toast.editorCommon.updateCheckboxes($('#kiosk-sms-table'));

            var levelTwoFulfillment = $("input[name='kitchenSetup.multiStageFulfillment'][value='2']");
            var levelOneFulfillment = $("input[name='kitchenSetup.multiStageFulfillment'][value='1']");
            var fulfillmentTextLevel = $('div#fulfillmentTextLevel');

            levelTwoFulfillment.on('click', function() {
                fulfillmentTextLevel.show();
            });
            levelOneFulfillment.on('click', function() {
                fulfillmentTextLevel.hide();
            });

            $('#kitchenSetup_kitchenTicketHeaderSpacing').bootstrapifySelect('90px');
            $('#kitchenSetup_kitchenTicketFooterSpacing').bootstrapifySelect('90px');

            // warning colors
            var configTable = $('#warning-config table');
            Toast.addTouchSectionEnabler('kitchenSetup_warningConfig_enabledAll', 'warning-config', false);
            Toast.editorCommon.updateCheckboxes(configTable);
            configTable.find('select').bootstrapifySelect('90px').change(function() {
                var checkbox = $(this).closest('tr').find('.td-checkbox :checkbox');
                checkbox.prop('checked', $(this).val() > 0);
                Toast.editorCommon.updateCheckbox(checkbox[0]);
            });

            //footer settings
            var ticketFooterConfig = $('#ticket-footer-config');
            Toast.editorCommon.updateCheckboxes(ticketFooterConfig);
            ticketFooterConfig.find('select').bootstrapifySelect('90px').change(function() {
                var checkbox = $(this).closest('tr').find('.td-checkbox :checkbox');
                checkbox.prop('checked', $(this).val() > 0);
                Toast.editorCommon.updateCheckbox(checkbox[0]);
            });
        }
    };
})();

Toast.menuMgmt.voidReasons = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var voidReasonsTable = $('#voidreasons-table');

            Toast.enableChildEntityTable(voidReasonsTable, 'voidReasons');

            Toast.initTableDefaultSelection(voidReasonsTable, true);
            Toast.enableEntityTableRowTemplate($('#add-new-void-reason'), voidReasonsTable, null, function() {
                Toast.enableEntityTableInput(voidReasonsTable);

                Toast.enableChildEntityTable(voidReasonsTable, 'voidReasons');
            });
        }
    };

})();


Toast.menuMgmt.serviceAreas = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var areasTable = $('#service-areas-table');

            Toast.initTableDefaultSelection(areasTable, false, true);

            Toast.enableChildEntityTable(areasTable, 'serviceAreas');

        }
    };
})();

Toast.menuMgmt.serviceArea = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            Toast.addTouchSectionEnabler('serviceArea_autoGratuity', 'auto-gratuity', false);
            Toast.addTouchSectionEnabler('serviceArea_autoSvcCharge', 'auto-svc-charge', false);

            $('#choose-gratuity,#choose-svc-charge').click(function() {
                var btn = $(this);

                Toast.menuMgmt.chooseServiceCharge(function(serviceCharge) {
                    btn.prev().prev().html(serviceCharge.name + ' (' + serviceCharge.info + ')').show();
                    $('#gratuity-id').val(serviceCharge.id);
                });
            });
            $('#serviceArea_autoGratuityPartySize').selectpicker({
                width: 'auto'
            });
        }
    };
})();

Toast.menuMgmt.serviceCharges = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            var serviceChargesTable = $('#service-charges-table');

            Toast.enableChildEntityTable(serviceChargesTable, 'serviceCharges');

            $('#add-charge').click(function() {
                var form = Toast.editorCommon.getForm();
                form.append($('<input type="hidden" name="after" />').val($(this).attr('href')));
                form.submit();
            });
        }
    };
})();

Toast.menuMgmt.serviceCharge = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.addSectionEnabler('amountType_percent', 'charge-percent', false);
            Toast.addSectionEnabler('amountType_percent', 'charge-amount', true);
            Toast.addSectionEnabler('amountType_fixed', 'charge-percent', true);
            Toast.addSectionEnabler('amountType_fixed', 'charge-amount', false);
            Toast.addSectionEnabler('amountType_open', 'charge-percent', true);
            Toast.addSectionEnabler('amountType_open', 'charge-amount', true);
            Toast.addTouchSectionEnabler('serviceCharge_taxable', 'tax-rates-section', false);

            Toast.addSectionEnabler('amountType_percent', 'percentageApplicationStrategy-section', false);
            Toast.addSectionEnabler('amountType_fixed', 'percentageApplicationStrategy-section', true);
            Toast.addSectionEnabler('amountType_open', 'percentageApplicationStrategy-section', true);
        }
    };
})();

Toast.menuMgmt.discounts = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.addTouchSectionEnabler('discounts_openDollarDiscount_active', 'open-dollar', false);
            Toast.addTouchSectionEnabler('discounts_openPctDiscount_active', 'open-percent', false);
            Toast.addTouchSectionEnabler('discounts_itemCompDiscount_active', 'comp-item', false);
            Toast.addTouchSectionEnabler('discounts_checkCompDiscount_active', 'comp-check', false);

            Toast.initTableDefaultSelection($('#standard-discounts'), true);

            var customDiscountsTable = $('#custom-discounts');
            Toast.initTableDefaultSelection(customDiscountsTable, true);
            Toast.enableEntityTableDelete(customDiscountsTable);
        }
    };
})();

Toast.menuMgmt.customDiscount = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.addSectionEnabler('selectionType_check', 'eligible-items', true);
            Toast.addSectionEnabler('selectionType_item', 'eligible-items', false);

            Toast.addSectionEnabler('amountType_percent', 'discount-percent', false);
            Toast.addSectionEnabler('amountType_percent', 'discount-amount', true);
            Toast.addSectionEnabler('amountType_percent', 'single-item-selection', false);
            Toast.addSectionEnabler('amountType_percent', 'bogo', true);
            Toast.addSectionEnabler('amountType_fixed', 'discount-percent', true);
            Toast.addSectionEnabler('amountType_fixed', 'discount-amount', false);
            Toast.addSectionEnabler('amountType_fixed', 'single-item-selection', false);
            Toast.addSectionEnabler('amountType_fixed', 'bogo', true);

            Toast.addSectionEnabler('actionAmountType_percent', 'bogo-discount-percent', false);
            Toast.addSectionEnabler('actionAmountType_percent', 'bogo-discount-amount', true);
            Toast.addSectionEnabler('actionAmountType_fixed', 'bogo-discount-percent', true);
            Toast.addSectionEnabler('actionAmountType_fixed', 'bogo-discount-amount', false);

            Toast.addSectionEnabler('amountType_open_fixed', 'discount-amount', true);
            Toast.addSectionEnabler('amountType_open_fixed', 'discount-percent', true);
            Toast.addSectionEnabler('amountType_open_fixed', 'single-item-selection', false);
            Toast.addSectionEnabler('amountType_open_fixed', 'bogo', true);
            Toast.addSectionEnabler('amountType_open_percent', 'discount-amount', true);
            Toast.addSectionEnabler('amountType_open_percent', 'discount-percent', true);
            Toast.addSectionEnabler('amountType_open_percent', 'single-item-selection', false);
            Toast.addSectionEnabler('amountType_open_percent', 'bogo', true);

            Toast.addSectionEnabler('amountType_bogo', 'discount-amount', true);
            Toast.addSectionEnabler('amountType_bogo', 'discount-percent', true);
            Toast.addSectionEnabler('amountType_bogo', 'single-item-selection', true);
            Toast.addSectionEnabler('amountType_bogo', 'bogo', false);

            Toast.addSectionEnabler('eligibleItems_all', 'applicable-items', true);
            Toast.addSectionEnabler('eligibleItems_specific', 'applicable-items', false);

            Toast.addSectionEnabler('eligibleItems_all_buy', 'applicable-items-buy', true);
            Toast.addSectionEnabler('eligibleItems_specific_buy', 'applicable-items-buy', false);

            Toast.addSectionEnabler('eligibleItems_all_get', 'applicable-items-get', true);
            Toast.addSectionEnabler('eligibleItems_specific_get', 'applicable-items-get', false);

            Toast.addSectionEnabler('enableCheckTrigger_true', 'checkTrigger-section', false);
            Toast.addSectionEnabler('enableCheckTrigger_false', 'checkTrigger-section', true);

            $('#add-discount').click(function(e) {
                e.preventDefault();

                var form = Toast.editorCommon.getForm();
                form.append($('<input type="hidden" name="after" />').val($(this).attr('href')));
                form.submit();
            });
        }
    };
})();

Toast.menuMgmt.openItems = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.enableEntityTableDelete($('#openitems-table'));

            $('#add-openitem').click(function(e) {
                e.preventDefault();

                var form = Toast.editorCommon.getForm();
                form.append($('<input type="hidden" name="after" />').val($(this).attr('href')));
                form.submit();
            });
        }
    };
})();

Toast.menuMgmt.openItem = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            Toast.menuMgmt.setupInheritedSection('openItem_deferred', 'categories_outer');
        }
    };
})();

Toast.menuMgmt.portions = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            Toast.enableEntityTableDelete($('#portions-table'));

            $('#add-portion').click(function(e) {
                e.preventDefault();

                var form = Toast.editorCommon.getForm();
                form.append($('<input type="hidden" name="after" />').val($(this).attr('href')));
                form.submit();
            });
        }
    };
})();

Toast.menuMgmt.portion = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            Toast.menuMgmt.setupInheritedSection('portion_deferred', 'categories_outer');
        }
    };
})();

Toast.moveCards = (function() {
    return {
        init: function(currentShardId) {
            Toast.editorCommon.init();

            var sourceRestaurantAlert = $('#source-restaurant-alert');
            sourceRestaurantAlert.hide();

            var currentShard = currentShardId;

            var searchInput = $('.search-query');
            searchInput.typeahead({
                minLength: 3,
                items: 5,
                source: function(query, process) {
                    if (query.length > 1) {
                        $.getJSON('/restaurantaccess/populateAccessibleRestaurantsShardSpecific', {
                            shardGuid: currentShard
                        }, function(results) {
                            var items = [];
                            $.map(results, function(data) {
                                var group;
                                group = {
                                    id: data.id,
                                    name: data.name,
                                    guid: data.guid,

                                    toString: function() {
                                        return JSON.stringify(this);
                                    },
                                    toLowerCase: function() {
                                        return this.toString().toLowerCase();
                                    },
                                    indexOf: function() {
                                        return String.prototype.indexOf.apply(this.id, arguments);
                                    },
                                    replace: function() {
                                        return String.prototype.replace.apply(this.name, arguments);
                                    },
                                    substr: function() {
                                        return String.prototype.substr.apply(this.name, arguments);
                                    }
                                };

                                if (data.id.toString().indexOf(Number(query)) !== -1) {
                                    items.push(group);
                                } else if (data.guid.toString().indexOf(Number(query)) !== -1) {
                                    items.push(group);
                                } else if (data.name.toString().toLowerCase().indexOf(Number(query.toLowerCase()) !== -1)) {
                                    items.push(group);
                                }
                            });
                            process(items);
                        });
                    }
                },
                updater: function(item) {
                    item = JSON.parse(item);

                    sourceRestaurantAlert.empty();

                    var html = '<div class="caption"><h3>' + item.name + '</h3>' +
                        '<p><b>Restaurant id: </b>' + item.id + '</p>' +
                        '<p><b>Restaurant guid: </b>' + item.guid + '</p>' +
                        '<input type="hidden" name="sourceRestaurantId" value="' + item.id + '"/></div>';

                    sourceRestaurantAlert.append(html);

                    sourceRestaurantAlert.show();
                },
                highlighter: function(item) {
                    var html = '<div class="typeahead" style="width: 100%;">';
                    html += '<div>';
                    html += '<div><strong>' + item.name + '</strong></div>';
                    html += '<div><i>Restaurant id: ' + item.id + '</i></div>';
                    html += '<div><i>Restaurant guid: ' + item.guid + '</i></div>';
                    html += '</div>';
                    html += '</div>';
                    return html;
                }
            });
        }
    };
})();

Toast.kioskConfig = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            $('i.icon-info-sign').tooltip();

            Toast.editorCommon.updateCheckboxes($('#kiosk-sms-table'));

            Toast.addTouchSectionEnabler('kioskConfig_shouldShowTippingButtons', 'kiosk-tip-percentages');

            Toast.editorCommon.updateCheckboxes($('#kiosk-sms-table'));

            $('#dining-option-mode-selection input').click(function() {
                $('#dinein-option').hide();
                $('#dine-in-instructions').hide();

                $('#takeout-option').hide();
                $('#take-out-instructions').hide();


                if (this.value === 'TAKE_OUT' || this.value === 'BOTH') {
                    $('#takeout-option').show();
                    $('#take-out-instructions').show();
                    $('#dining-options-control-label').show();
                }

                if ((this.value === 'DINE_IN' || this.value === 'BOTH')) {
                    $('#dinein-option').show();
                    $('#dine-in-instructions').show();
                    $('#dining-options-control-label').show();
                }
            });

            //SERVICE CHARGES
            Toast.addTouchSectionEnabler('kioskConfig_serviceChargesEnabled', 'kiosk-service-charges');

            //UPSELLS

            Toast.addTouchSectionEnabler('kioskConfig_upsellsEnabled', 'kiosk-upsell-items');

            var upsellTable = $('#upsell-table');
            Toast.enableEntityTableDelete(upsellTable, null, false);

            //CASH PAYMENT
            Toast.addTouchSectionEnabler('kioskConfig_cashPaymentEnabled', 'kiosk-cash-payment');

            //SPECIAL REQUESTS
            Toast.addTouchSectionEnabler('kioskConfig_specialRequestsEnabled', 'kiosk-special-requests');

            // item search
            var searchInput = $('.search-query');
            searchInput.typeahead({
                minLength: 1,
                items: 10,
                source: function(query, process) {
                    if (query.length > 1) {
                        $.getJSON(Toast.kioskConfig.baseUrl + '/menuItemSearch?query=' + Toast.escapeHtml(query), function(results) {
                            var items = [];

                            $.map(results, function(data) {
                                var group;
                                group = {
                                    itemId: data.itemId,
                                    itemName: data.itemName,
                                    groupId: data.groupId,
                                    groupName: data.groupName,
                                    menuName: data.menuName,
                                    itemURL: data.itemURL,
                                    groupURL: data.groupURL,
                                    toString: function() {
                                        return JSON.stringify(this);
                                    },
                                    toLowerCase: function() {
                                        return this.itemName.toLowerCase();
                                    },
                                    indexOf: function() {
                                        return String.prototype.indexOf.apply(this.itemName, arguments);
                                    },
                                    replace: function() {},
                                    substr: function() {
                                        return String.prototype.substr.apply(this.itemName, arguments);
                                    }
                                };
                                items.push(group);
                            });

                            process(items);
                        });
                    }
                },
                //action to take when an item from the dropdown is selected
                updater: function(item) {
                    item = JSON.parse(item);

                    $('.placeholder').hide();
                    var nextRowIdx = upsellTable.find('tbody tr:not(.placeholder,.template)').length;

                    //already present in table
                    var itemsPresent = upsellTable.find(':input').filter(function() {
                        return this.value == item.itemId;
                    });
                    var groupsPresent = upsellTable.find(':input').filter(function() {
                        return this.value == item.groupId;
                    });

                    if ((itemsPresent.length && groupsPresent.length) || nextRowIdx >= 5) {
                        return;
                    }

                    var paramPrefix = 'upsellItems[' + nextRowIdx + ']';
                    var itemPrefix = 'upsellItem';
                    var groupPrefix = 'upsellItemGroup';

                    var newRow = $('.template').clone();

                    //Set the new menu item id and menugroup id to the form elements to be submitted
                    newRow.find('#upsell-id')
                        .attr('name', paramPrefix + '.id')
                        .val('true');
                    newRow.find('#upsell-item-id')
                        .attr('name', paramPrefix + '.' + itemPrefix + '.id')
                        .val(Toast.escapeHtml(item.itemId));

                    newRow.find('#upsell-group-id')
                        .attr('name', paramPrefix + '.' + groupPrefix + '.id')
                        .val(Toast.escapeHtml(item.groupId));

                    //set the name for the table row
                    var itemHtml = '<a href="' + Toast.escapeHtml(item.itemURL) + '">' + Toast.escapeHtml(item.itemName) + '</a>';
                    var groupHtml = '<a href="' + Toast.escapeHtml(item.groupURL) + '">' + Toast.escapeHtml(item.groupName) + '</a>';
                    newRow.find('#upsell-name').append(itemHtml);
                    newRow.find('#upsell-group').append(groupHtml);

                    //remove template class and append to table
                    newRow.removeClass();
                    newRow.show();
                    upsellTable.append(newRow);

                    //enable the remove button on the row
                    Toast.enableEntityTableDelete(newRow);
                },
                highlighter: function(item) {
                    var html = '<div class="typeahead" style="width: 100%;">';
                    html += '<div>';
                    html += '<div><strong>' + item.itemName + '</strong></div>';
                    html += '<div>' + item.groupName + ' (<i>Menu: ' + item.menuName + ')</i></div>';
                    html += '</div>';
                    html += '</div>';
                    return html;
                }
            });

            // no submit on <enter>
            $('.form-search').submit(function(e) {
                e.preventDefault();
                return false;
            });
        },
        baseUrl: '/restaurants/admin/kiosk'
    };
})();

Toast.guestFeedbackConfig = (function() {
    function toggleAlertFields($selectElem) {
        var option = $selectElem.find('option:selected'),
            tr = $selectElem.closest('tr'),
            phoneNumberField = tr.find('.phone-number'),
            emailField = tr.find('.email');
        toggleFadeForTableElement(emailField, option.text().includes('Email'));
        toggleFadeForTableElement(phoneNumberField, option.text().includes('SMS'));
    }

    function toggleFadeForTableElement(el, shouldFieldBeEnabled) {
        if (shouldFieldBeEnabled) {
            el.parent().addClass('fadedin').removeClass('fadedout');
            el.attr('disabled', null);
        } else {
            el.parent().addClass('fadedout').removeClass('fadedin');
            el.attr('disabled', 'disabled');
        }
    }

    return {

        init: function() {
            Toast.editorCommon.init();

            var enableUserSelection = function(el) {
                el.find('select[name*="userGuid"]').change(function() {
                    var select = $(this),
                        option = select.find('option:selected'),
                        tr = $(this).closest('tr'),
                        userNameField = tr.find('.user-name'),
                        phoneNumberField = tr.find('.phone-number'),
                        phoneNumber = option.data('phone-number'),
                        emailField = tr.find('.email'),
                        email = option.data('email');
                    userNameField.val(option.text());
                    if (phoneNumber) {
                        phoneNumberField.val(phoneNumber);
                    } else {
                        phoneNumberField.val(null);
                    }
                    if (email) {
                        emailField.val(email);
                    } else {
                        emailField.val(null);
                    }
                });
            };

            var enableAlertTypeInput = function(el) {
                var targetedSelectElement = el.find('select[name*="alertNotificationType"]');

                toggleAlertFields(targetedSelectElement);
                targetedSelectElement.change(function() {
                    toggleAlertFields($(this));
                });
            };

            var notificationConfigTable = $('#notification-config-table');
            Toast.enableEntityTableRowTemplate($('#add-user-notify'), notificationConfigTable, function() {
                Toast.enableEntityTableSelect($(this));
                Toast.enableEntityTableInput($(this));
                enableUserSelection($(this));
            }, function() {
                enableAlertTypeInput(notificationConfigTable.find('tr:not(.template)').last());
            });
            Toast.enableEntityTableDelete(notificationConfigTable, null, false);
            Toast.enableEntityTableSelect(notificationConfigTable);
            Toast.enableEntityTableInput(notificationConfigTable);
            enableUserSelection(notificationConfigTable);
            enableAlertTypeInput(notificationConfigTable);

            Toast.addTouchSectionEnabler('guestFeedbackConfig_feedbackEnabled', 'show-if-feedback-enabled', false, true);

            Toast.addSectionEnabler('guestFeedbackConfig_notificationType_NO_NOTIFICATION', 'users-to-notify', true, true);
            Toast.addSectionEnabler('guestFeedbackConfig_notificationType_NEGATIVE_FEEDBACK_ONLY', 'users-to-notify', false, true);
            Toast.addSectionEnabler('guestFeedbackConfig_notificationType_ALL_FEEDBACK', 'users-to-notify', false, true);
        }
    };
})();


Toast.managerAlertConfig = (function() {
    return {
        init: function() {
            Toast.addTouchSectionEnabler('enable-feature-toggle', 'title-feature', false, true);
        }
    };
})();


Toast.configChanges = (function() {
    return {
        init: function() {
            var publishBtn = $('#publish-button');
            var publishStatus = $('#publish-status');
            var restaurantTable = $('#publishing table');
            var multirestaurant = restaurantTable.length > 0;

            function rowPublished(row) {
                row.find('td:last').find('a').hide().end().find('div').show();
            }

            function rowSuccess(row) {
                rowPublished(row);
                row.find('.published-date').text('moments ago');
                row.find(':checkbox').prop('checked', false).trigger('change').prop('disabled', true);
            }

            function rowError(row) {
                row.addClass('error');
                row.find('a span').text('Error!');
            }

            function publishAll(ids) {
                publishBtn.prop('disabled', true);
                publishStatus.addClass('working').find('span').text('Publishing changes...please be patient, this may take a few moments');

                var data;
                var remaining = restaurantTable.find('tbody :checkbox:not(:disabled):not(:checked)');
                let all;

                if (ids) {
                    all = remaining.length == 0;
                    data = $.map(ids, function(id) {
                        return {
                            name: 'restaurantId',
                            value: id
                        };
                    });
                } else {
                    data = [];
                    all = true;
                }
                data.push({
                    name: 'all',
                    value: all
                });

                var authElement = $('input[name="authenticityToken"]');
                if (authElement) {
                    data.push({
                        name: 'authenticityToken',
                        value: authElement.val()
                    });
                }

                restaurantTable.find(':checkbox').prop('disabled', true).prop('checked', false);
                restaurantTable.find('a').addClass('disabled');

                Toast.postKeepAliveJson(publishBtn.data('publishUrl'), data, function(json) {
                    var okStatus = json.status == 200;

                    // if nothing remaining to publish, we go back to the restaurant home page
                    if (okStatus && (!multirestaurant || all)) {
                        window.location.href = '/restaurants/admin';
                        return;
                    }

                    publishStatus.removeClass('working alert-info alert-error alert-success');
                    if (okStatus) {
                        publishStatus.addClass('alert-success').find('span').text(json.message);
                    } else {
                        publishStatus.addClass('alert-error').find('span').text(json.message);
                    }

                    if (multirestaurant && json.data) {
                        $.each(json.data, function(i, result) {
                            var rId = result.restaurantId;
                            var row = restaurantTable.find('tr[data-restaurant-id="' + rId + '"]');
                            if (result.success) {
                                rowSuccess(row);
                            } else {
                                rowError(row);
                            }
                        });

                        restaurantTable.find('thead :checkbox').prop('disabled', false);
                        remaining.each(function() {
                            $(this).prop('disabled', false).closest('tr').find('a').removeClass('disabled');
                        });
                    }
                });
            }

            Toast.getKeepAliveJson('/restaurants/admin/checkConfigChanges', function(json) {
                if (multirestaurant) {
                    restaurantTable.find('tbody tr').each(function() {
                        var row = $(this);
                        var hasChanges = json.data.changeDetails[row.attr('data-restaurant-id')];

                        if (hasChanges) {
                            row.find(':checkbox').prop('disabled', false).prop('checked', true).trigger('change');
                            row.find('a').removeClass('disabled').css('visibility', 'visible').show();
                        } else {
                            rowPublished(row);
                        }
                    });

                    Toast.enableMultiedit('publishing');

                    restaurantTable.find('a').click(function(e) {
                        e.preventDefault();

                        var link = $(this);
                        if (link.hasClass('disabled')) {
                            return;
                        }

                        var row = link.closest('tr');
                        var authElement = $('input[name="authenticityToken"]');
                        var data = [];

                        if (authElement) {
                            data.push({
                                name: 'authenticityToken',
                                value: authElement.val()
                            });
                        }

                        row.find(':checkbox').prop('checked', false).trigger('change').prop('disabled', true);
                        link.addClass('disabled').find('img').show();
                        Toast.postKeepAliveJson(link.attr('href'), data, function(json) {
                            link.find('img').hide();
                            if (json.status == 200) {
                                rowSuccess(row);
                            } else {
                                Toast.alertMgr.error(json.message);
                                rowError(row);
                            }
                        });
                    });
                    publishBtn.on('multiedit', function(e, ids) {
                        publishAll(ids);
                    });
                } else {
                    publishBtn.click(function() {
                        publishAll();
                    });
                }

                publishStatus.find('span').text(json.message);
                publishStatus.removeClass('working');
                if (json.data.hasChanges) {
                    publishBtn.prop('disabled', false);
                    restaurantTable.find('thead :checkbox').prop('disabled', false);
                } else {
                    publishStatus.removeClass('alert-info');
                    restaurantTable.find('thead :checkbox').prop('checked', false);
                }
            });
        },

        continuePublish: function() {
            var link = $('#publish-link');
            var button = $('#publish-btn');

            var alertSuccess;
            if (link) {
                alertSuccess = link.parent();
                alertSuccess.html('Publishing Changes...');
            }
            var authElement = $('input[name="authenticityToken"]');
            var postData = {};
            if (authElement) {
                postData.authenticityToken = authElement.val();
            }
            Toast.postKeepAliveJson('/restaurants/admin/quickApplyConfigChanges', postData, function(json) {
                if (button) {
                    button.removeClass('btn-primary');
                }

                // any successful response is fine
                if (json.status == 200) {
                    if (link) {
                        alertSuccess.html(json.message);
                    }
                } else if (json.status == 401) {
                    alert('You must be logged in to perform the requested action.');
                    window.location.replace('');
                } else {
                    if (link) {
                        alertSuccess.html(json.message);
                    }
                    alert(json.message);
                }
            });
        },

        publishNow: function() {
            var button = $('#publish-btn');

            if (button) {
                button.addClass('disabled');
            }

            Toast.getKeepAliveJson('/restaurants/admin/checkForUnexpectedChanges', function(json) {
                if (button) {
                    button.removeClass('btn-primary');
                }

                if (json != undefined && json.prompt) {
                    var confirmAnswer = confirm(json.message);
                    if (confirmAnswer == true) {
                        Toast.configChanges.continuePublish();
                    } else if (button) {
                        button.removeClass('disabled');
                    }
                } else {
                    Toast.configChanges.continuePublish();
                }
            });
        },
    };
})();

Toast.editorCommon = (function() {
    return {
        getForm: function() {
            return $('.admin-content form:not(.exclude-from-save)');
        },
        updateCheckboxes: function(el) {
            el.find('.td-checkbox :checkbox').each(function() {
                $(this).click(function() {
                    Toast.editorCommon.updateCheckbox(this);
                });
                Toast.editorCommon.updateCheckbox(this);
            });
        },
        updateCheckbox: function(checkbox) {
            if (checkbox.checked) {
                $(checkbox).closest('td').addClass('checked');
            } else {
                $(checkbox).closest('td').removeClass('checked');
            }
        },
        createCheckbox: function(name, value) {
            var checkbox = $('<input type="checkbox" name="' + name + '"/>').val(true);
            if (value) {
                checkbox.attr('checked', 'checked');
            }
            return $('<td class="td-checkbox"></td>')
                .append($('<label></label>')
                    .append(checkbox)
                    .append('<input type="hidden" name="' + name + '" value="false" />'));
        },
        createSelect: function(name, value, choices) {
            var select = $('<select name=' + name + '></select>');

            for (var i = 0; i < choices.length; i++) {
                var type = choices[i];
                var option = $('<option value="' + type.value + '">');
                option.text(type.name);
                option.append('</option>');
                if (type.selected) {
                    option.attr('selected', 'true');
                }
                select.append(option);
            }
            return $('<td class="td-select"></td>')
                .append(select);
        },
        createInputLink: function(nameField, namePlaceholder, name, url) {
            return $('<td class="td-input-link"></td>').append(
                $('<div></div>')
                .append($('<a class="input-link"></a>').text(name).attr('href', url))
                .append($('<a class="input-edit" href="#" style="display:none;"><i class="icon-edit"></i></a>'))
                .append($('<input type="text" placeholder="' + namePlaceholder + '" style="display:none;" class="input-param"></input>').attr('name', nameField).val(name)));
        },


        closeColorChoices: function(wrapper) {
            if (wrapper.find('.popover').length > 0) {
                wrapper.find('.pos-cell').popover('hide');
                return false;
            }
        },

        getPopover: function() {
            return {
                html: true,
                placement: 'bottom',
                trigger: 'manual',
                content: function() {
                    return $(this).closest('.pos-cell').next().clone().show().wrap('<div/>').parent().html();
                }
            };
        },

        setPressState: function(wrapper) {
            wrapper.find('.pos-cell').mousedown(function() {
                $(this).addClass('pressed');
            }).mouseup(function() {
                $(this).removeClass('pressed');
            });
        },

        enableColorEditor: function(wrapper) {
            if (wrapper.hasClass('disabled')) {
                return;
            }

            var hiddenInput = wrapper.children('input');
            var currentChoice = wrapper.children('.pos-cell');

            var setupColorChoiceEvents = function() {
                Toast.editorCommon.setPressState(wrapper);

                wrapper.find('.popover .pos-cell').click(function() {
                    var cell = $(this);
                    wrapper.find('.pos-cell').removeClass('selected');
                    cell.addClass('selected');
                    currentChoice
                        .css('backgroundColor', $(this).css('backgroundColor'))
                        .popover('hide');
                    hiddenInput.val(cell.attr('color')).trigger('change');
                });
            };

            currentChoice.popover(Toast.editorCommon.getPopover(currentChoice)).click(function() {
                $(this).popover('toggle');
                setupColorChoiceEvents();

                var selectedColor = hiddenInput.val(),
                    cell;

                wrapper.find('.popover .pos-cell').each(function() {
                    cell = $(this);
                    if (cell.attr('color') === selectedColor) {
                        cell.addClass('selected');
                    }
                });
                return false;
            });
            setupColorChoiceEvents();
            $('body').on('click', function() {
                Toast.editorCommon.closeColorChoices(wrapper);
            });
        },

        enableHexInputColorEditor: function(wrapper) {
            if (wrapper.hasClass('disabled')) {
                return;
            }

            var currentChoice = wrapper.find('.preview-cell');
            var inputField = wrapper.find('.user-input-field');
            var validHexRegexPattern = /#([0-9a-fA-F]{6})/;

            var isValidInput = function(string) {
                if (validHexRegexPattern.test(string)) {
                    return true;
                }
                return false;
            };

            var getFormattedColor = function(hexString) {
                return '#' + hexString.slice(-6);
            };

            var setChosenColor = function(color) {
                var formattedColor = getFormattedColor(color);
                currentChoice
                    .css('backgroundColor', formattedColor)
                    .popover('hide');
                inputField.val(formattedColor).trigger('change');
            };

            var setupColorChoiceEvents = function() {
                Toast.editorCommon.setPressState(wrapper);

                wrapper.find('.popover .pos-cell').click(function() {
                    var cell = $(this);
                    setChosenColor(cell.attr('id'));
                });
            };

            inputField.keypress(() => {
                if (event.keyCode == 13 || !/[#0-9a-fA-F]/.test(event.key)) {
                    event.preventDefault();
                }
            });

            inputField.on('input', function() {
                var userInput = inputField.val();
                if (isValidInput(getFormattedColor(userInput))) {
                    setChosenColor(getFormattedColor(userInput));
                }
            });

            currentChoice.popover(Toast.editorCommon.getPopover()).click(function() {
                $(this).popover('toggle');
                setupColorChoiceEvents();
                return false;
            });

            $('body').on('click', function() {
                Toast.editorCommon.closeColorChoices(wrapper.find('.popover'));
            });

            setupColorChoiceEvents();
        },

        enableSaveAndPublishBtns: function(confirmFunction) {
            // enable the save button
            $('#save-btn,#save-and-add-btn').click(function(e) {
                e.preventDefault();

                if ($(this).hasClass('disabled')) {
                    return;
                }
                // Block the submission from happening if there is a confirmation dialog that is cancelled
                if (confirmFunction != null) {
                    if (!confirmFunction()) {
                        return;
                    }
                }

                Toast.editorCommon.disableSaveAndPublishBtns();
                // Disable the publish button and publish link,
                $('#publish-link').closest('.alert').html('Saving Changes...');

                var btnId = $(this).attr('id'),
                    btnHref = $(this).attr('href');

                function submitForm() {
                    var submitForm = Toast.editorCommon.getForm();
                    if (btnId == 'save-and-add-btn') {
                        submitForm.find('input[name="after"]').prop('disabled', true);
                        submitForm.append($('<input type="hidden" name="after" />').val(btnHref));
                    }
                    Toast.unsavedChanges = false;
                    submitForm.submit();
                }

                submitForm();
            });

            var publishBtn = $('#publish-btn');
            publishBtn.click(function(e) {
                e.preventDefault();
                if ($(this).hasClass('disabled')) {
                    return;
                }

                Toast.configChanges.publishNow();
            });
        },
        disableSaveAndPublishBtns: function() {
            $('#save-btn,#save-and-add-btn,#publish-btn').addClass('disabled');
        },
        init: function(confirmFunction) {
            // only needed for tables/lists with internal checkboxes, but
            // doesn't hurt to include it here
            Toast.enableSelectionList();

            Toast.editorCommon.enableSaveAndPublishBtns(confirmFunction);

            $('#setup-restaurants').change(function() {
                var val = $(this).treepicker('val');
                var button = $('#submit-setup-group').show();
                if (val && val.length) {
                    button.prop('disabled', false);
                } else {
                    button.prop('disabled', true);
                }
            });
            $('#submit-setup-group').click(function() {
                $('#selected-sets-changed').val(true);
            });
        }
    };
})();

Toast.posUx = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();
            var table = $('#system-option-groups');
            Toast.editorCommon.updateCheckboxes(table);
            Toast.enableChildEntityTable(table, 'systemOptionGroups');

            table = $('#z-report-sections');
            Toast.editorCommon.updateCheckboxes(table);
            Toast.enableChildEntityTable(table, 'zReportSections');

            table = $('#shift-review-sections');
            Toast.editorCommon.updateCheckboxes(table);
            Toast.enableChildEntityTable(table, 'shiftReviewSections');

            table = $('#closed-drawer-report-sections');
            Toast.editorCommon.updateCheckboxes(table);
            Toast.enableChildEntityTable(table, 'closedDrawerReportSections');

            Toast.addTouchSectionEnabler('config_splitTaxRatesEnabled', 'control-group-receiptLabel', true);

            Toast.addTouchSectionEnabler('config_tipConfirmEnabled', 'control-group-largeTipsThreshold', false);

            Toast.addTouchSectionEnabler('config_tipsBySalesCategory', 'controls-sales-category-tip-percentages', false);

            Toast.addTouchSectionEnabler('config_sendChecksAfterPaymentOnly', 'send-buttons', true);

            Toast.addTouchSectionEnabler('config_mustDeclareCashTips', 'allow-declare-negative-tips', false);

            var ssidTable = $('#ssid-table');
            Toast.enableEntityTableRowTemplate($('#add-ssid'), ssidTable, function() {
                Toast.enableEntityTableDelete($(this));
            });
            Toast.enableEntityTableDelete(ssidTable);
        }
    };
})();

Toast.printing = (function() {

    function measureString(length, elmt) {
        var str = Array(length + 1).join('a');
        var div = $('<div/>').text(str);
        $.each(['font-family', 'font-size', 'font-style', 'font-weight', 'font-variant'], function(idx, propName) {
            var val = elmt.css(propName);
            if (val) {
                div.css(propName, val);
            }
        });
        div.css({
            position: 'absolute',
            left: '-9999px'
        });
        div.appendTo($('body'));

        var width = div.width();
        div.remove();

        return width;
    }

    function resizeReceiptTextAreas(lineMaxChars) {
        // using 'cols' is unreliable to accurately determine the number of
        // columns...which is needless to say odd
        // this measures a string of the appropriate length and then sets
        // the textarea width manually
        var wrappers = $('.receipt-lines');
        var textAreas = wrappers.find('> textarea');
        var desiredWidth = measureString(parseInt(lineMaxChars), textAreas);

        textAreas.width(desiredWidth);
        textAreas.focus(function() {
            $(this).parent().addClass('focused');
        });
        textAreas.blur(function() {
            $(this).parent().removeClass('focused');
        });
        wrappers.prev().width(textAreas.innerWidth()).css('margin-left', $(wrappers).css('padding-left'));

        // resize the textareas if they get long, otherwise the scrollbar
        // messes up the character count
        textAreas.keyup(function() {
            var ta = $(this);
            var lines = (ta.val().match(/\n/g) || []).length + 1;
            var currentLines = ta.prop('rows');
            if (currentLines != lines && lines >= 4) {
                ta.prop('rows', lines);
            }
        });
    }

    var confirmCashDrawerRemoveMsg = 'Deleting the cash drawer will remove any existing cash entries and balance information. Are you sure you want to continue?';
    return {
        initReceiptConfig: function(lineMaxChars) {
            Toast.editorCommon.init();
            resizeReceiptTextAreas(lineMaxChars);
        },
        initHome: function() {
            Toast.editorCommon.init();

            var table = $('#printers_table');
            Toast.enableEntityTableDelete(table, null, true);
            Toast.initCheckboxes(table.find('.td-checkbox > label'));

            $('.cash-drawer-check-box').change(function() {
                if (!$(this).is(':checked')) {
                    if (!confirm(confirmCashDrawerRemoveMsg)) {
                        $(this).prop('checked', true).closest('label').addClass('checked').closest('.td-checkbox').addClass('checked');
                    } else {
                        $(this).siblings('.cash-drawer-count').val('NO_CASHDRAWER');
                    }
                } else {
                    $(this).siblings('.cash-drawer-count').val('SINGLE_CASHDRAWER');
                }
            });
        },
        initPrinter: function() {
            if ($('#printer_cashDrawer_resetType_MANUAL').prop('checked') == false &&
                $('#printer_cashDrawer_resetType_AUTOMATIC').prop('checked') == false) {
                $('#printer_cashDrawer_resetType_AUTOMATIC').prop('checked', true);
                $('#printer_cashDrawer_balance').prop('value', '0.00');
            }

            if ($('#printer_secondaryCashDrawer_resetType_MANUAL').prop('checked') == false &&
                $('#printer_secondaryCashDrawer_resetType_AUTOMATIC').prop('checked') == false) {
                $('#printer_secondaryCashDrawer_resetType_AUTOMATIC').prop('checked', true);
                $('#printer_secondaryCashDrawer_balance').prop('value', '0.00');
            }

            $('#printer_cashDrawerCount_NO_CASHDRAWER').click(function(e) {
                if ($(this).is(':checked')) {
                    if (!confirm(confirmCashDrawerRemoveMsg)) {
                        e.stopImmediatePropagation();
                        $(this).prop('checked', false);
                        Toast.updateSelectionListState($(this).closest('ul.selection-list'));
                    }
                }
            });
            $('#printer_cashDrawerCount_SINGLE_CASHDRAWER').click(function(e) {
                var onNoCashDrawers = $('#printer_cashDrawerCount_NO_CASHDRAWER').prop('checked');
                if (!onNoCashDrawers && $(this).is(':checked')) {
                    if (!confirm(confirmCashDrawerRemoveMsg)) {
                        e.stopImmediatePropagation();
                        $(this).prop('checked', false);

                        Toast.updateSelectionListState($(this).closest('ul.selection-list'));
                    }
                }
            });

            Toast.addSectionEnabler('printer_cashDrawerCount_NO_CASHDRAWER', 'cash-drawer-fields', true);
            Toast.addSectionEnabler('printer_cashDrawerCount_NO_CASHDRAWER', 'secondary-cash-drawer-fields', true);
            Toast.addSectionEnabler('printer_cashDrawerCount_NO_CASHDRAWER', 'cash-drawer-delay-field', true);
            Toast.addSectionEnabler('printer_cashDrawerCount_NO_CASHDRAWER', 'cash-drawer-name-field', true);

            Toast.addSectionEnabler('printer_cashDrawerCount_SINGLE_CASHDRAWER', 'cash-drawer-fields', false);
            Toast.addSectionEnabler('printer_cashDrawerCount_SINGLE_CASHDRAWER', 'secondary-cash-drawer-fields', true);
            Toast.addSectionEnabler('printer_cashDrawerCount_SINGLE_CASHDRAWER', 'cash-drawer-delay-field', false);
            Toast.addSectionEnabler('printer_cashDrawerCount_SINGLE_CASHDRAWER', 'cash-drawer-name-field', false);

            Toast.addSectionEnabler('printer_cashDrawerCount_DOUBLE_CASHDRAWER', 'cash-drawer-fields', false);
            Toast.addSectionEnabler('printer_cashDrawerCount_DOUBLE_CASHDRAWER', 'secondary-cash-drawer-fields', false);
            Toast.addSectionEnabler('printer_cashDrawerCount_DOUBLE_CASHDRAWER', 'cash-drawer-delay-field', false);
            Toast.addSectionEnabler('printer_cashDrawerCount_DOUBLE_CASHDRAWER', 'cash-drawer-name-field', false);


            Toast.addSectionEnabler('printer_model_EPSON_T88V', 'char-set-dropdown', false);
            Toast.addSectionEnabler('printer_model_EPSON_T20', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_EPSON_U220', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_EPSON_U220_Chinese', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_EPSON_L90', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_EPSON_P80_BT', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_TSP650', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_TSP100', 'char-set-dropdown', true);
            Toast.addSectionEnabler('printer_model_SNBC_S80', 'char-set-dropdown', true);
            Toast.editorCommon.init();

            $('#printer_characterEncoding').selectpicker();

            var printerDevicesTable = $('#printer-devices-table');
            if (printerDevicesTable) {
                Toast.enableEntityTableInput(printerDevicesTable);
                Toast.enableEntityTableSelect(printerDevicesTable);
                Toast.enableEntityTableDelete(printerDevicesTable, null, true);
                // add a new row from the template row
                Toast.enableEntityTableRowTemplate($('#add-new-printer-device'), printerDevicesTable, null, function() {
                    Toast.enableEntityTableInput($(this));
                    Toast.enableEntityTableSelect($(this));
                    Toast.enableEntityTableDelete($(this), null, true);
                });
            }

            $('#control-group-printer_model li').on('click', function(e) {
                if (e.target.value === 'EPSON_L90') {
                    $('#item-label-config').slideDown();
                } else {
                    $('#item-label-config').slideUp();
                }
            });

            if ($('#printer_ticketType_KITCHEN_TICKET').is(':checked')) {
                $('#printer-item-label-footer-container').hide();
                $('#control-group-printer_ticketType_ITEM_LABEL_preview').hide();
            }

            $('#printer_ticketType_ITEM_LABEL').click(function() {
                $('#printer-item-label-footer-container').slideDown();
                $('#control-group-printer_ticketType_ITEM_LABEL_preview').slideDown();
                resizeReceiptTextAreas(42);
            });

            $('#printer_ticketType_KITCHEN_TICKET').click(function() {
                $('#printer-item-label-footer-container').slideUp();
                $('#control-group-printer_ticketType_ITEM_LABEL_preview').slideUp();
            });

            resizeReceiptTextAreas(42);

        },

        initFixedSizeReceiptLinesEditor: function(rows, cols) {
            /**
             * Do not allow more than 3x42 characters.
             * If there are already 3 rows of text, ignore the enter key.
             * If there are already 3 rows of text, don't let whatever row the user is on exceed 42 characters in length.
             * (i.e. If you are typing in row 2, and it is already 42 characters long, ignore printable key presses.)
             */
            $('#printer_customItemLabelFooter').on('keydown', e => {
                if (wouldAddCharacter(e) && !allowedToAddCharacter(e)) {
                    return false;
                }
                if (isNewLine(e) && !allowedToAddNewLine(e)) {
                    return false;
                }
            });

            /**
             * Rather than wrapping text so that whole words go to the next line, break words up to better use the space and
             * simplify enforcing the character limitations.
             */
            $('#printer_customItemLabelFooter').on('keyup', e => {
                let textValue = e.target.value;
                const linesByNewLine = textValue.split('\n');
                let receiptLines = [];
                for (let j = 0; j < linesByNewLine.length; j++) {
                    const line = breakWords(linesByNewLine[j]);
                    const lineSplitBy42Chars = splitBy42Chars(linesByNewLine, line, j);
                    receiptLines = receiptLines.concat(lineSplitBy42Chars);
                }
                const newText = receiptLines.join('');
                if (newText !== e.target.value) {
                    $('#printer_customItemLabelFooter').val(receiptLines.join(''));
                }
            });

            // Commonly used KeyboardEvent.key values which represent printable keys
            const keysThatAddCharacters = [
                'Enter', 'Tab', ' ', 'Spacebar',
                'Divide', 'Add', 'Multiply', 'Decimal', 'Subtract',
                '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', '|', '\\', ';', ':', '\'', '"', ',', '<', '>', '/', '?',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
            ];

            function allowedToAddCharacter(e) {
                const position = e.target.selectionStart;
                const value = e.target.value;
                const receiptLines = getReceiptLines(value);
                const canAddLine = receiptLines.length < rows;
                if (canAddLine) {
                    return true;
                }
                let currentIndex = 0;
                for (let i = 0; i < receiptLines.length; i++) {
                    currentIndex += receiptLines[i].length;
                    if (currentIndex >= position) {
                        return receiptLines[i].length !== cols;
                    }
                }
                return true;
            }

            function splitBy42Chars(splitByNewLines, curLine, index) {
                const re = new RegExp(`.{1,${cols}}`, 'g');
                const splitCurLine = curLine.match(re) || curLine;
                if (splitCurLine.length > 0 && splitByNewLines.length > 1 && index < splitByNewLines.length - 1) {
                    // add the newline character back in (since it was removed during split)
                    splitCurLine[splitCurLine.length - 1] = splitCurLine[splitCurLine.length - 1] + '\n';
                }
                return splitCurLine;
            }

            function getReceiptLines(string) {
                if (!string || string === '') return [];
                const splitByNewLines = string.split('\n');
                let lines = [];
                for (let i = 0; i < splitByNewLines.length; i++) {
                    const curLine = splitByNewLines[i];
                    const lineSplitBy42Chars = splitBy42Chars(splitByNewLines, curLine, i);
                    lines = lines.concat(lineSplitBy42Chars);
                }
                return lines;
            }

            function wouldAddCharacter(e) {
                return e.target.selectionStart === e.target.selectionEnd && (keysThatAddCharacters.includes(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey);
            }

            function isNewLine(e) {
                return e.key === 'Enter' || e.which === 13;
            }

            function allowedToAddNewLine(e) {
                const receiptLines = getReceiptLines(e.target.value);
                return receiptLines.length < rows;
            }

            function breakWords(text) {
                const groupsOf42 = Math.ceil(text.length / cols);
                for (let k = 0; k < groupsOf42; k++) {
                    const max = (k + 1) * cols;
                    if (text.length > max) {
                        if (text[max - 1] !== ' ' && text[max - 1] !== '-') { // at the 42nd position, is there already a break character?
                            // break words with a dash (example char limit of 5) 'it happened' becomes 'it h-\nappened'
                            // if its at the beginning of a word, use ' ' 'free food' becomes 'free  \nfood' not 'free -food'
                            const breakChar = text[max - 2] === ' ' ? ' ' : '-';
                            text = text.slice(0, max - 1) + breakChar + text.slice(max - 1);
                        }
                    }
                }
                return text;
            }
        }
    };
})();

Toast.flatfiles = (function() {
    return {
        initHome: function() {
            Toast.editorCommon.init();
            var table = $('#flatfiles-table');
            Toast.enableEntityTableDelete(table);
            Toast.initTableDefaultSelection(table, true, false);
        },
        initEdit: function() {
            Toast.editorCommon.init();
            $('input[type="text"]')[0].focus();
        }
    };
})();

Toast.jobs = (function() {
    function detectWageChanges() {
        var wage = $('#job_defaultWage');
        var originalWage = wage.val();
        var wageGroup = wage.closest('.control-group');
        var wageChangeAlert = wageGroup.next();
        wage.keyup(function() {
            if (wage.val() != originalWage) {
                wageChangeAlert.slideDown();
            } else {
                wageChangeAlert.slideUp();
            }
        });
        $('#retroactiveDate').datepicker({
            format: 'mm-dd-yyyy'
        });
    }

    return {
        initHome: function() {
            Toast.editorCommon.init();
            var table = $('#jobs-table');
            Toast.enableEntityTableDelete(table);
            Toast.initTableDefaultSelection(table, true, false);
        },
        initEdit: function(detectWageChange) {
            Toast.editorCommon.init();
            Toast.users.initPermissions();
            $('input[type="text"]')[0].focus();

            if (detectWageChange) {
                detectWageChanges();
            }
        },
        initQuickAdd: function() {
            Toast.editorCommon.init();

            var table = $('#jobs-table');
            Toast.editorCommon.updateCheckboxes(table);
            Toast.enableEntityTableDelete(table);
            Toast.enableEntityTableInput(table);
            Toast.enableEntityTableSelect(table);

            Toast.enableEntityTableRowTemplate($('#add-job'), table, undefined, function() {
                Toast.editorCommon.updateCheckboxes(this);
                Toast.enableEntityTableInput($(this));
                Toast.enableEntityTableSelect($(this));
                Toast.enableEntityTableDelete($(this));
            });

            $('input[type="text"]')[0].focus();
        }
    };
})();

Toast.users = (function() {
    function detectWageChanges() {
        $('form :text[name^="restaurantUser.jobWageOverrides"]').each(function() {
            $(this).data('originalVal', $(this).val());
        }).keyup(function() {
            if ($(this).val() != $(this).data('originalVal')) {
                $(this).attr('wagechanged', 'true');
            } else {
                $(this).removeAttr('wagechanged');
            }
            if ($(this).closest('table').find(':text[wagechanged]').length > 0) {
                $('#retroactive-wage-change').slideDown();
            } else {
                $('#retroactive-wage-change').slideUp();
            }
        });
        $('#retroactiveDate').datepicker({
            format: 'mm-dd-yyyy'
        });
    }

    function reloadPermsOnJobsChange() {
        $('#jobs-table :checkbox').change(function() {
            Toast.users.reloadPermissions();
        });
        $('#permissionMask').change(function() {
            Toast.users.reloadPermissions();
        });
    }

    function setOverrideBtnState(row, override) {
        var inheritBtn = row.find('button.inherit');
        var overrideBtn = row.find('button.override');

        inheritBtn.toggleClass('active', !override);
        overrideBtn.toggleClass('active', override);

        return overrideBtn;
    }

    function triggerOverrideChange(btn, override) {
        var overrideInput = btn.parent().prevAll(':hidden');
        overrideInput.prop('disabled', !override);
        overrideInput.trigger('change');
    }

    function findChildRows(groupRow) {
        return groupRow.nextUntil('.permission-group');
    }

    var implicitlySelectingParent = false;
    var implicitlySelectingChildren = false;

    return {
        initPermissions: function() {
            var table = $('.permissions-table');
            var overrideInputs = table.find(':hidden[name^=permissionsOverride], :hidden[name^=supportAuthorizationPermissionsOverride]');
            var inheritBtns = table.find('button.inherit');
            var overrideBtns = table.find('button.override');
            var editingJob = overrideInputs.length == 0;

            Toast.initCheckboxes(table.find('.td-checkbox > label'));
            table.find('.icon-info-sign').each(function() {
                $(this).tooltip({
                    placement: 'right',
                    title: $(this).attr('data-original-title')
                });
            });

            // permission value checkboxes on group rows also update all child rows
            table.find('tr.permission-group :checkbox').change(function() {
                if (!implicitlySelectingParent) {
                    implicitlySelectingChildren = true;
                    var row = $(this).closest('tr');
                    var childRows = findChildRows(row);
                    childRows.find(':checkbox:not(:disabled)').prop('checked', $(this).is(':checked')).change();
                    implicitlySelectingChildren = false;
                }
            });

            // permission value checkboxes on child rows implicitly select the group row
            table.find('tr.permission-row :checkbox').change(function() {
                if ($(this).is(':checked')) {
                    if (implicitlySelectingChildren) {
                        return;
                    }

                    var row = $(this).closest('tr');
                    var parentRow = row.prevAll('tr.permission-group:first');
                    implicitlySelectingParent = true;
                    if (!editingJob) {
                        setOverrideBtnState(parentRow, true);
                        triggerOverrideChange(parentRow.find('button.override'), true);
                    }
                    parentRow.find(':checkbox.final').prop('checked', true).change();
                    implicitlySelectingParent = false;
                }
            });

            // inherited permissions editing?
            if (!editingJob) {
                inheritBtns.click(function() {
                    triggerOverrideChange($(this), false);
                });
                overrideBtns.click(function() {
                    triggerOverrideChange($(this), true);
                });

                overrideInputs.change(function() {
                    var input = $(this);
                    var override = !input.prop('disabled');
                    var valueCheckbox = input.closest('tr').find(':checkbox.final');

                    var row = input.closest('tr');
                    var isPermissionGroup = row.is('.permission-group');

                    if (!override) {
                        // Not override this value, take the inherited value.
                        var inheritedValue = input.data('inheritedValue');
                        valueCheckbox.prop('checked', inheritedValue);
                    }

                    // Trigger a change on a
                    //  1. group level check box if isPermissionGroup is true
                    //  2. row level check box
                    valueCheckbox.prop('disabled', !override);
                    valueCheckbox.trigger('change');

                    // cascade changes to the group rows
                    if (isPermissionGroup && !implicitlySelectingParent) {
                        var childRows = findChildRows(row);
                        implicitlySelectingChildren = true;
                        childRows.each(function() {
                            var child = $(this);

                            var overrideBtn = setOverrideBtnState(child, override);
                            triggerOverrideChange(overrideBtn, override);
                        });
                        implicitlySelectingChildren = false;
                    }
                });
            }

        },

        reloadPermissions: function() {
            var permissionsEditor = $('#permissions');
            var form = $('#theForm');
            var previewUrl = permissionsEditor.data('previewUrl');
            if (!previewUrl) {
                return;
            }
            var addGroupBtn = $('#add-group-perms-btn');

            permissionsEditor.mask('Updating...');
            addGroupBtn.prop('disabled', true);

            var permsLoadStart = Date.now();
            Toast.users.lastPermsLoad = permsLoadStart;
            var openPermsId = $('#permissions-accordion .accordion-body.collapse.in').attr('data-set-id');
            $('#perms-accordion-state').val(openPermsId);
            $.post(previewUrl, form.serialize(), function(html) {
                if (permsLoadStart != Toast.users.lastPermsLoad) {
                    return;
                }

                permissionsEditor.unmask();
                addGroupBtn.prop('disabled', false);
                permissionsEditor.html(html);
                Toast.users.initPermissions();
            }, 'html').fail(function(e) {
                // Submit the form?
                $('#save-btn').click();
                e.preventDefault();
                e.stopPropagation();
            });
        },

        initInvite: function() {
            Toast.editorCommon.init();
            Toast.users.initPermissions();
            reloadPermsOnJobsChange();
        },


        initEdit: function(showConfirm) {
            // Initially record the users email and passcode, then add an alert if they are changed.
            // confirmFunction is passed to the form initialization to be used when the save button is clicked
            var startEmail = $('#user_email').val();
            var startPasscode = $('#restaurantUser_passcode').val();

            function confirmFunction() {
                if (startEmail) {
                    var emailChanged = $('#user_email').val().localeCompare(startEmail);
                }
                if (startPasscode) {
                    var passcodeChanged = $('#restaurantUser_passcode').val().localeCompare(startPasscode);
                }
                if (emailChanged || passcodeChanged) {
                    return confirm('Are you sure you want to save these changes? Changes to email address or passcode will log this user out of all active sessions.');
                }
                return true;
            }

            Toast.editorCommon.init(showConfirm ? confirmFunction : null);
            Toast.users.initPermissions();


            // show the wage changed applies retroactively notice if a wage
            // override is changed
            var userId = $('#user_guid').val();
            if (userId) {
                detectWageChanges();
            }

            reloadPermsOnJobsChange();
        }
    };
})();

Toast.payments = (function() {
    return {
        initHome: function() {
            Toast.editorCommon.init();

            $('i.icon-info-sign').tooltip();

            Toast.editorCommon.updateCheckboxes($('#gift-card-digital-receipt-options'));
        }
    };
})();

Toast.schedule = (function() {
    function applyDeleteAction(clickElmt, action) {
        var rows = $(clickElmt).closest('tr');
        rows = rows.add(rows.nextUntil('tr.primary'));
        rows.each(function(idx, row) {
            action.call(this, $(row));
        });
    }

    function updateCheckedStates(table) {
        table.find('.td-checkbox :radio').each(function() {
            if ($(this).is(':checked')) {
                $(this).closest('td').addClass('checked');
            } else {
                $(this).closest('td').removeClass('checked');
            }
        });
    }

    function openHoursPicker(btn) {
        var periodRow = Toast.schedule.editingRow = $(btn).closest('tr');
        var scheduleRow = periodRow;
        if (!scheduleRow.hasClass('primary')) {
            scheduleRow = scheduleRow.prevAll('.primary:first');
        }

        var scheduleName = scheduleRow.find(':text').val();
        var periodName = periodRow.find('.service-name').text();

        var dialog = $('#hours-picker');
        dialog.find('.modal-header h3').text((scheduleName || '(no schedule name)') + ' > ' + periodName);

        $.each(['startHour', 'startMinute', 'endHour', 'endMinute'], function(idx, name) {
            var value = periodRow.find(':hidden[name$="' + name + '"]').val();
            if (name == 'startHour' && !value) {
                // we leave startHour blank originally so we can detect 'no
                // hours set' on the backend
                value = 12;
            }
            dialog.find(':text[name="' + name + '"]').val(value);
        });
        $.each(['startAmPm', 'endAmPm'], function(idx, name) {
            var value = periodRow.find(':hidden[name$="' + name + '"]').val();
            dialog.find('.' + name + ' button').removeClass('active').filter('.' + value).addClass('active');
        });

        dialog.find('.stepper-input input').each(function() {
            $(this).data('previousValue', $(this).val());
        });


        dialog.on('shown', function() {
            dialog.find(':text:first').focus().select();
        });
        dialog.modal();
    }

    function formatMinutes(mins) {
        return (mins < 10 ? '0' : '') + mins;
    }

    return {
        init: function() {
            Toast.editorCommon.init();

            var servicesTable = $('#services-table');
            var daySchedulesTable = $('#day-schedules-table');
            var weeklyScheduleTable = $('#week-schedule-table');
            // find me
            // services table
            Toast.enableEntityTableRowTemplate($('#add-service'), servicesTable, function() {
                servicesTable.next().show();
            });
            Toast.enableEntityTableDelete(servicesTable);

            // day schedules table
            Toast.enableEntityTableRowTemplate($('#add-day-schedule'), daySchedulesTable, function() {
                daySchedulesTable.next().show();
            });
            Toast.initTableDefaultSelection(daySchedulesTable, true, false);
            // can't use standard delete helper since we have potentially
            // multiple rows per schedule
            daySchedulesTable.on('click', 'a.remove-entity', function() {
                applyDeleteAction(this, Toast._deleteEntityTableRow);
            });
            daySchedulesTable.on('click', 'a.undo', function() {
                applyDeleteAction(this, Toast._undeleteEntityTableRow);
            });
            daySchedulesTable.on('click', 'button', function() {
                openHoursPicker(this);
            });

            // weekly schedule table
            weeklyScheduleTable.on('click', '.td-checkbox :radio', function() {
                updateCheckedStates(weeklyScheduleTable);
            });
            updateCheckedStates(weeklyScheduleTable);

            // hours picker
            var dialog = $('#hours-picker');
            dialog.find('.stepper-input button').click(function() {
                var btn = $(this);
                var input = btn.siblings('input');

                var step = parseInt(btn.data('step'));
                var min = parseInt(input.data('min'));
                var max = parseInt(input.data('max'));

                var currentVal = input.val();
                currentVal = !currentVal ? min : parseInt(currentVal);

                var newVal = currentVal + step;
                if (newVal < min) {
                    newVal = max;
                } else if (newVal > max) {
                    newVal = min;
                }

                // hack to format minutes
                if (max == 59) {
                    newVal = formatMinutes(newVal);
                }
                input.val(newVal);
            });
            dialog.find('.stepper-input input').keyup(function() {
                var input = $(this);
                var min = parseInt(input.data('min'));
                var max = parseInt(input.data('max'));

                var currentVal = input.val();
                currentVal = !currentVal ? min : parseInt(currentVal);
                if (currentVal < min || currentVal > max || isNaN(currentVal)) {
                    alert('Please enter a value between ' + min + ' and ' + max);
                    input.val(input.data('previousValue'));
                } else {
                    input.data('previousValue', currentVal);
                }
            });
            dialog.find('.modal-footer .btn-primary').click(function() {
                var values = dialog.find('.modal-body :text').map(function() {
                    var val = $(this).val();
                    if (!val || isNaN(parseInt(val))) {
                        val = $(this).data('min');
                    }
                    return parseInt(val);
                }).get();

                var startAmPm = dialog.find('.startAmPm .active').text();
                var endAmPm = dialog.find('.endAmPm .active').text();

                // set the hidden input values
                $.each(['startHour', 'startMinute', 'endHour', 'endMinute'], function(idx, name) {
                    Toast.schedule.editingRow.find(':hidden[name$="' + name + '"]').val(values[idx]);
                });
                Toast.schedule.editingRow.find(':hidden[name$="startAmPm"]').val(startAmPm);
                Toast.schedule.editingRow.find(':hidden[name$="endAmPm"]').val(endAmPm);

                var start = values[0] + ':' + formatMinutes(values[1]) + ' ' + startAmPm;
                var end = values[2] + ':' + formatMinutes(values[3]) + ' ' + endAmPm;
                var displayHours = start + ' - ' + end;

                Toast.schedule.editingRow.find('.period-hours span').text(displayHours);
                Toast.schedule.editingRow.find(':checkbox').prop('checked', true).closest('tr').addClass('checked');
                dialog.modal('hide');
                Toast.unsavedChanges = true;
            });
        }
    };
})();


Toast.checkSearch = {

    processSearch: function(url, data, callback) {
        $('#search-results').load(url, data, callback);
    },

    initPagination: function() {
        $('#search-results').on('click', '.pagination a', function(e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.parent().hasClass('disabled')) {
                Toast.checkSearch.processSearch($this.attr('href'), null);
            }
        });
    },

    init: function() {
        Toast.initTabs();

        // , furthestDate: furthestDateStr
        $('.static-calendar').datepicker({
                isStatic: true,
                daysOnly: true
            })
            .on('changeDate', function(ev) {
                var dateStr = (ev.date.getMonth() + 1) + '/' + ev.date.getDate() + '/' + ev.date.getFullYear();
                $(this).prev().val(dateStr);
            });

        $('.check-actions form').submit(function(e) {
            e.preventDefault();


            var form = $(this);
            var btn = form.find('.search-btn:visible');

            btn.button('loading');
            $('#search-results').empty();
            Toast.checkSearch.processSearch(form.attr('action'), form.serialize(), function() {
                btn.button('reset');
            });
        });

        Toast.checkSearch.initPagination();

        $('#search-results').on('click', 'a.void-payment', function(e) {
            e.preventDefault();
            var paymentId = $(this).attr('data-payment-id');

            if (Toast.isEmbedded()) {
                var checkId = $(this).attr('data-check-id');
                var orderId = $(this).attr('data-order-id');
                window.Android.voidPayment(orderId, checkId, paymentId);
            } else if (confirm('This will void this credit card payment and cannot be undone without re-swiping the card.')) {
                var btn = $(this).closest('.btn-group');
                btn.hide().next().show();

                var authToken = $('input[name="authenticityToken"]').val();

                //submit
                $.ajax({
                    type: 'POST',
                    url: $(this).attr('href'),
                    data: {
                        id: paymentId,
                        authenticityToken: authToken
                    }
                }).done(function(data) {
                    btn.show().next().hide();

                    var row = btn.closest('tr');

                    var msg = data.message;
                    var style = 'success';
                    if (data.status != 200) {
                        style = 'error';
                    }

                    row.after('<tr><td style="padding-top: 0; border-top-style:none;" colspan="' + row.find('>td').length + '"><div class="alert alert-' + style + '" style="text-align:center;margin:0;">' + msg + '</div></td></tr>');
                });
            }
        });

        Toast.receiptOptions.setupReceiptOptionsDialog($('#search-results,#refund-email-options'));
    }

};

Toast.receiptOptions = {
    setupReceiptOptionsDialog: function(container) {

        container.on('click', 'a.receipt-text,a.receipt-email', function(e) {
            e.preventDefault();

            var dialog = $('#receipt-info');
            var link = $(this);
            var email = link.hasClass('receipt-email');

            dialog.find('.modal-header h3').text(email ? 'Email Receipt' : 'Text Receipt');
            var emailElmts = dialog.find('.email-vis');
            var textElmts = dialog.find('.text-vis');
            var visibleElmt;
            var hiddenElmt;
            if (email) {
                visibleElmt = emailElmts;
                hiddenElmt = textElmts;
            } else {
                visibleElmt = textElmts;
                hiddenElmt = emailElmts;
            }
            visibleElmt.prop('disabled', false).show();
            hiddenElmt.prop('disabled', true).hide();

            Toast.checkSearch.selectedPaymentId = link.attr('data-payment-id');
            dialog.modal().center();
            visibleElmt.focus();
            Toast.modalReady();
        });

        var receiptDialog = $('#receipt-info');
        receiptDialog.find('form').submit(function(e) {
            e.preventDefault();

            var form = $(this);
            var phone = form.find('input[name="phone"]');
            var email = form.find('input[name="email"]');

            Toast.alertMgr.clear();
            if (phone.is(':visible')) {
                var number = phone.val();
                number = number.replace(/\D/g, '');
                if (!(number.length == 10 || (number.length == 11 && number.charAt(0) == '1'))) {
                    Toast.alertMgr.error('Please enter a valid phone number');
                    return false;
                }
            }
            if (email.is(':visible')) {
                if (!Toast.validateEmail(email.val())) {
                    Toast.alertMgr.error('Please enter a valid email address');

                    return false;
                }
            }

            Toast.modalBusy();
            form.find('input[name="paymentId"]').val(Toast.checkSearch.selectedPaymentId);
            $.post(form.attr('action'), form.serialize(), function(result) {
                Toast.modalReady();
                if (result.status != 200) {
                    Toast.alertMgr.error(result.message);
                } else {
                    receiptDialog.modal('hide');
                    Toast.alertMgr.success(result.message);
                    $('body').scrollTop(0);
                }
            });

        });
        receiptDialog.find('.modal-footer .btn-primary').click(function() {
            receiptDialog.find('form').submit();
        });
    }
};

Toast.cashDrawerReport = {
    load: function(selectedDrawerId) {
        var container = $('#cash-drawer-report');
        container.addClass('loading');
        container.empty();
        container.mask('Loading...');
        $.ajax({
            type: 'GET',
            url: Toast.cashDrawerReport.url
        }).done(function(data) {
            container.unmask();
            container.removeClass('loading');
            var html = Toast.trimKeepalivePrefix(data);
            $('#cash-drawer-report').html(html);

            //show this drawer's cash entries immediately
            if (selectedDrawerId) {
                $('#' + selectedDrawerId).click();
            }
        });
    }
};
Toast.archiveOrders = (function() {

    //helper to find size of a map
    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //toggle checked status of the cell
    function toggle(cell) {
        var checkbox = getCheckbox(cell);
        if (checkbox === cell) {
            //clicked on the checkbox directly, just use the value
            check(cell, checkbox.prop('checked'));
        } else {
            //click on the cell outside of checkbox, we update value of the checkbox
            check(cell, !checkbox.prop('checked'));
        }
    }

    //check or uncheck the cell
    function check(cell, checked) {
        var checkbox = getCheckbox(cell);
        var id = checkbox.attr('data-id');
        if (checked) {
            checkbox.prop('checked', true);
            Toast.archiveOrders.selectedOrders[id] = true;
        } else {
            checkbox.prop('checked', false);
            delete Toast.archiveOrders.selectedOrders[id];
        }
        updateInfo();
    }

    function getCheckbox(cell) {
        //user can click on the checkbox or cell
        if (cell.is('td')) {
            return cell.find('input.order-checkbox');
        } else if (cell.is('input')) {
            return cell;
        } else {
            return null;
        }
    }

    function updateInfo() {
        var num = Object.size(Toast.archiveOrders.selectedOrders);
        var content = '<p>Selected ';
        content += num + ' orders. Total $' + selectedTotal();
        content += '</p>';
        $('#selection-info').html(content);

        //toggle archive button
        if (num > 0) {
            $('#archive-btn').prop('disabled', false);
        } else {
            $('#archive-btn').prop('disabled', true);
        }
    }

    function doArchive() {
        var dialog = $('#archive-orders-confirm-dialog');
        var submitBtn = dialog.find('#submit-btn');
        var cancelBtn = dialog.find('#cancel-btn');
        submitBtn.attr('disabled', 'disabled');
        cancelBtn.attr('disabled', 'disabled');

        var data = selectedIdsToParam();
        data.authenticityToken = $('input[name="authenticityToken"]').val();

        $.ajax({
            type: 'POST',
            url: Toast.archiveOrders.url,
            data: data
        }).done(function() {
            //dismiss dialog and refresh table
            dialog.modal('hide');
            Toast.archiveOrders.table.fnDraw();
        });
    }

    function confirmArchive() {
        var dialog = $('#archive-orders-confirm-dialog');

        // enable the cancel button
        var cancelBtn = dialog.find('#cancel-btn');
        cancelBtn.prop('disabled', false);

        // Show the dialog
        dialog.modal({
            backdrop: 'static',
            keyboard: false
        }).center();

        dialog.on('hidden', function() {
            $('body').css('overflow', 'auto');
        });

        // start loading dialog
        var body = dialog.find('.modal-body');
        var loading = body.find('#loadingMask');
        var content = body.find('#content');

        loading.show();
        content.empty();
        content.load(Toast.archiveOrders.confirmUrl, selectedIdsToParam(),
            function(response, status) {
                if (status === 'success') {
                    loading.hide();
                    // Adjust the size of the dialog
                    var width = Math.min($(window).width() - 10, 800);
                    var height = Math.min($(window).height() - 60, 300);
                    dialog.width(width).find('.modal-body').height(height);
                    //enable submit button
                    var submitBtn = dialog.find('#submit-btn');
                    submitBtn.removeAttr('disabled');
                    submitBtn.unbind('click');
                    submitBtn.click(function() {
                        doArchive();
                    });
                } else {
                    dialog.modal('hide');
                }
            }
        );
    }

    //sum total amount of selected orders
    function selectedTotal() {
        var total = 0;
        var ids = selectedIds();
        for (var i = 0; i < ids.length; i++) {
            var key = ids[i];
            //get the cell
            var cell = $('input.order-checkbox[data-id="' + key + '"]');
            //get the amount of this order
            total += parseFloat(cell.data('totalamount'));
        }
        return total.toFixed(2);
    }

    function selectedIds() {
        var ids = [];
        for (var key in Toast.archiveOrders.selectedOrders) {
            if (Toast.archiveOrders.selectedOrders.hasOwnProperty(key)) {
                ids.push(key);
            }
        }
        return ids;
    }

    function selectedIdsToParam() {
        var ids = selectedIds();
        var idsParam = {};
        for (var i = 0; i < ids.length; i++) {
            idsParam['ids[' + i + ']'] = ids[i];
        }
        return idsParam;
    }

    return {
        selectedOrders: {},
        init: function(oTable, archiveUrl, archiveConfirmUrl) {
            Toast.archiveOrders.url = archiveUrl;
            Toast.archiveOrders.confirmUrl = archiveConfirmUrl;
            Toast.archiveOrders.selectedOrders = {};
            Toast.archiveOrders.table = oTable;
            var table = $('#archive-orders-table');
            //add onDraw callback
            oTable.fnSettings().aoDrawCallback.push({
                fn: function() {
                    Toast.archiveOrders.updateSelections();
                },
                sName: 'user'
            });
            //click event for the cell
            table.on('click', 'td.order-checkbox', function(e) {
                toggle($(e.target));
            });

            //restyle select all header
            var header = table.find('th.order-checkbox');
            header.html('<a href="#">Select All</a>');
            header.find('a').click(function(e) {
                table.find('td.order-checkbox').each(function() {
                    check($(this), true);
                });
                e.preventDefault();
                return false;
            });

            $('#archive-btn').click(function() {
                confirmArchive();
            });
        },
        renderCheckbox: function(oObj) {
            var id = oObj.aData[0];
            var amount = oObj.aData[18];
            var output = '<input class="order-checkbox" type="checkbox" data-id="' + id + '" data-totalamount="' + amount + '" >';
            return output;
        },
        updateSelections: function() {
            var table = $('#archive-orders-table');
            //get all visible orders id
            var visibleIds = {};
            table.find('input.order-checkbox').each(function() {
                var id = $(this).attr('data-id');
                visibleIds[id] = true;

                //reselect order if it was selected
                if (Toast.archiveOrders.selectedOrders.hasOwnProperty(id)) {
                    $(this).prop('checked', true);
                }
            });
            //if an order is not visible anymore, we remove it from selected ids
            var ids = selectedIds();
            for (var i = 0; i < ids.length; i++) {
                if (!visibleIds.hasOwnProperty(ids[i])) {
                    delete Toast.archiveOrders.selectedOrders[ids[i]];
                }
            }
            updateInfo();
        }
    };
})();

Toast.levelupConfig = (function() {
    return {
        init: function() {
            Toast.addTouchSectionEnabler('levelupConfig_enabled', 'levelup-config-section', false, false);

            $('#open-levelup-auth-dialog').click(function() {
                var dialog = $('#levelup-auth-dialog');
                // Submit button
                var submitBtn = dialog.find('#levelup-auth-dialog-submit');
                submitBtn.unbind('click');
                submitBtn.click(function() {
                    var url = $('#levelup-auth-url').val();
                    var username = $('#levelupusername').val();
                    var password = $('#leveluppassword').val();
                    var authToken = $('input[name="authenticityToken"]').val();

                    //submit
                    $.ajax({
                            type: 'POST',
                            url: url,
                            data: {
                                levelupusername: username,
                                leveluppassword: password,
                                authenticityToken: authToken
                            },
                            global: false
                        })
                        .done(function(data) {
                            dialog.modal('hide');
                            $('#levelup-config-container').html(data);
                        })
                        .error(function(data) {
                            dialog.find('#error-message').text(data.responseText);
                            dialog.find('#error-message').show();
                        });
                });

                dialog.modal();
                dialog.find('#error-message').hide();
                dialog.on('hidden', function() {
                    $('body').css('overflow', 'auto');
                });
            });
        }
    };
})();

Toast.grubhub = (function() {
    return {
        init: function() {
            $('#save-btn').on('click', function() {
                document.getElementById('grubhub-submit-btn').click();
            });
        }
    };
});

Toast.toastPromotions = (function() {
    return {
        bootstrapConfigSaveButton: function() {
            let saveButton = $('#save-btn');

            saveButton.on('click', function() {
                document.getElementById('toast-promotions-submit').click();
            });

            saveButton.removeAttr('href');
        }
    };
});

Toast.toastCompCard = (function() {
    return {
        bootstrapConfigSaveButton: function() {
            let saveButton = $('#save-btn');

            saveButton.on('click', function() {
                document.getElementById('toast-comp-card-submit').click();
            });

            saveButton.removeAttr('href');
        }
    };
});

Toast.refundReasons = (function() {
    return {
        bootstrapConfigSaveButton: function() {
            let saveButton = $('#save-btn');
            saveButton.on('click', function() {
                document.getElementById('refunds-reasons-submit-button').click();
            });
            saveButton.removeAttr('href');
        }
    };
});

Toast.paymentsMgr = (function() {

    function parseFloatFromCurrency(string) {
        return parseFloat(string.replace(/\$|,/g, ''));
    }

    function getFormSubmitBtn(form) {
        return form.find('input[type="submit"]:visible');
    }

    function validateAmountFormat(input) {
        var val = input.val();

        var help = input.parent().next();
        var controlGroup = input.closest('.control-group');
        if (!input.data('origHelp')) {
            input.data('origHelp', help.html());
        }
        if (/[^\d.]/.test(val)) {
            help.text('Invalid amount');
            controlGroup.addClass('error');
            return false;
        }

        help.html(input.data('origHelp'));
        controlGroup.removeClass('error');
        return true;
    }

    function validateAmountFilledOut(input) {
        return validateAmountFormat(input) && input.val();
    }

    function setupForm(form, formValidatorFunction) {
        form.keydown(function(event) {
            if ((event.keyCode == 13) && (formValidatorFunction() == false)) {
                event.preventDefault();
                return false;
            }
        });

        form.submit(function(event) {
            event.preventDefault();
            if (formValidatorFunction() == false) {
                return;
            }
            $('#error-msg').hide();
            var submitBtn = getFormSubmitBtn(form);
            submitBtn.button('loading');
            $.post(form.attr('action'), form.serialize(), function(response) {
                if (response.status == 200) {
                    var redirect = response.data.redirect;
                    window.location.href = redirect;
                } else {
                    $('#error-msg').html(response.message).show();
                    submitBtn.button('reset');
                }
            }, 'JSON');
        });
    }

    function setupRefundForm(isRefundReasonsFlagEnabled = false, hasRefundReasonsConfigured = false) {
        var form = $('.admin-content form');
        var amountField = $('#amount');
        var tipAmountField = $('#tipAmount');
        var amountAndTipAmountFields = amountField.add(tipAmountField);
        var totalAmount = parseFloat(amountField.data('totalAmount'));
        var calculatedField = $('#calculated-total');

        if (isRefundReasonsFlagEnabled) {
            Toast.enableSelectPickerTemplate(form, () => validateRefundReasonSelected());
        }

        function isRefundReasonRequired() {
            return isRefundReasonsFlagEnabled && hasRefundReasonsConfigured;
        }

        function validateRefundReasonSelected() {
            if (!isRefundReasonRequired()) {
                return true;
            }

            var refundReasonGuidField = form.find('[name=refundReasonGuid]');
            var controlGroup = refundReasonGuidField.closest('.control-group');
            var refundReasonHelpMessage = $('#refund-reason-help');
            if (!refundReasonGuidField.val()) {
                controlGroup.addClass('error');
                refundReasonHelpMessage.show();
                return false;
            }

            controlGroup.removeClass('error');
            refundReasonHelpMessage.hide();
            return true;
        }

        function validateRefundAmtFields() {
            if (!validateAmountFilledOut(amountField)) {
                return false;
            }
            if (!validateAmountFormat(tipAmountField)) {
                return false;
            }
            return true;
        }

        function formValidatorRefund() {
            if (!validateRefundAmtFields()) {
                return false;
            }
            if (!validateRefundReasonSelected()) {
                return false;
            }
            return true;
        }

        setupForm(form, formValidatorRefund);

        amountAndTipAmountFields.keyup(function() {
            var valid = validateRefundAmtFields();

            var total = 0;

            if (valid) {
                amountAndTipAmountFields.each(function() {
                    var val = $(this).val();
                    total += !val ? 0 : parseFloat(val);
                });
            } else {
                calculatedField.text('');
                total = undefined;
                return false;
            }

            $('#more-than-total-error-msg').hide();
            if (typeof(total) !== 'undefined') {
                calculatedField.text('$' + total.toFixed(2));
                if (total > totalAmount) {
                    $('#more-than-total-error-msg').show();
                    getFormSubmitBtn(form).prop('disabled', true);
                } else {
                    getFormSubmitBtn(form).prop('disabled', false);
                }
            }
        });
    }

    function setupTipAdjustmentForm() {
        var form = $('.admin-content form');
        var adjustedTipAmountField = $('#adjustedTipAmount');
        var originalSubtotalField = $('#payment-details-subtotal-paid');
        var originalTipField = $('#payment-details-tip-paid');
        var calculatedTotalField = $('#calculated-total');
        var calculatedChargeField = $('#calculated-charge');

        function formValidatorTipAdj() {
            $('#adjust-down-error-msg').hide();
            if (!validateAmountFilledOut(adjustedTipAmountField)) {
                return false;
            }
            if (parseFloat(adjustedTipAmountField.val()) < parseFloatFromCurrency(originalTipField.text())) {
                $('#adjust-down-error-msg').show();
                return false;
            }
            return true;
        }

        setupForm(form, formValidatorTipAdj);

        adjustedTipAmountField.keyup(function() {
            var valid = formValidatorTipAdj();

            if (!valid) {
                calculatedTotalField.text('');
                calculatedChargeField.text('');
                getFormSubmitBtn(form).prop('disabled', true);
            } else {
                var calculatedTotal = parseFloatFromCurrency(adjustedTipAmountField.val()) + parseFloatFromCurrency(originalSubtotalField.text());
                var calculatedCharge = parseFloatFromCurrency(adjustedTipAmountField.val()) - parseFloatFromCurrency(originalTipField.text());
                calculatedTotalField.text('$' + calculatedTotal.toFixed(2));
                calculatedChargeField.text('$' + calculatedCharge.toFixed(2));
                getFormSubmitBtn(form).prop('disabled', false);
            }
        });
    }

    function setupVoidReversalForm() {
        var form = $('.admin-content form');
        var tipAmountField = $('#tip-amount-input');
        var subtotalField = $('#subtotal-paid');
        var calculatedChargeField = $('#calculated-charge');

        function formValidatorVoidReversal() {
            if (!validateAmountFilledOut(tipAmountField)) {
                return false;
            }

            return true;
        }

        function calculateChargeField() {
            var valid = formValidatorVoidReversal();
            if (!valid) {
                calculatedChargeField.text('');
                getFormSubmitBtn(form).prop('disabled', true);
            } else {
                var calculatedCharge = parseFloatFromCurrency(subtotalField.text()) + parseFloatFromCurrency(tipAmountField.val());
                calculatedChargeField.text('$' + calculatedCharge.toFixed(2));
                getFormSubmitBtn(form).prop('disabled', false);
            }
        }

        setupForm(form, formValidatorVoidReversal);
        calculateChargeField();

        tipAmountField.keyup(function() {
            calculateChargeField();
        });
    }

    return {
        initRefund: function(isRefundReasonsFlagEnabled, hasRefundReasonsConfigured) {
            setupRefundForm(isRefundReasonsFlagEnabled, hasRefundReasonsConfigured);
        },

        initRefundReceipt: function() {
            Toast.receiptOptions.setupReceiptOptionsDialog($('#refund-email-options'));
        },

        initTipAdjustment: function() {
            setupTipAdjustmentForm();
        },

        initVoidReversal: function() {
            setupVoidReversalForm();
        }
    };
})();

Toast.orderDetail = (function() {
    var reloadOrdersReport = function() {
        // Reload the orders report
        var ordersReport = $('#orders-report');
        if (ordersReport.isDataTable()) {
            ordersReport.dataTable().fnStandingRedraw();
        }
    };
    var findOrCreateNotifications = function(container) {
        var notifications = container.find('#order-summary-header').prev();
        if (!notifications.is('.notifications')) {
            notifications = $('<div class="notifications"></div>').insertBefore(container.find('#order-summary-header'));
        }
        return notifications;
    };
    var changeGuestNum = function(container, staticResRoot) {
        var input = container.find('#num-guests');
        var numGuests = input.val();
        var url = input.data('url');

        container.find('#pencil-guests').replaceWith('<img id="spinner-guests" class="spinner" src="' + staticResRoot + '/images/ajax-loader-small.gif" />');
        input.prop('disabled', true);
        input.toggleClass('no-edit');

        $.getJSON(url, {
            guests: numGuests
        }, function(jsonResponse) {
            container.find('#spinner-guests').replaceWith('<i id="pencil-guests" class="icon-pencil edit"></i>');

            var notifications = findOrCreateNotifications(container);
            notifications.empty();

            if (jsonResponse.status == 200) {
                Toast.alertMgr.success('Guest number updated successfully', notifications);
                reloadOrdersReport();
            } else {
                Toast.alertMgr.error(jsonResponse.message, notifications);
            }

        });
        input.prop('disabled', true);
    };
    var changeRevenueCenter = function(container, staticResRoot) {
        var name = container.find('#revenue-center-name');
        var select = container.find('#revenue-center-select');
        var centerId = select.find(':selected').val();
        var centerName = select.find(':selected').text();

        var url = select.data('url');

        container.find('#pencil-center').replaceWith('<img id="spinner-center" class="spinner" src="' + staticResRoot + '/images/ajax-loader-small.gif" />');

        name.text(centerName);

        $.getJSON(url, {
            revenueCenterId: centerId
        }, function(jsonResponse) {
            container.find('#spinner-center').replaceWith('<i id="pencil-center" class="icon-pencil edit"></i>');

            var notifications = findOrCreateNotifications(container);
            notifications.empty();

            if (jsonResponse.status == 200) {
                Toast.alertMgr.success('Revenue center updated successfully', notifications);
                reloadOrdersReport();
            } else {
                Toast.alertMgr.error(jsonResponse.message, notifications);
            }
        });
    };
    return {
        init: function(container, giftCardDetailUrl, loyaltyLedgerDetailUrl, customerInfoUrl, staticResRoot) {
            container.find('#order-details-item-card').addClass('clickable');
            container.find('#order-details-payment-card').addClass('clickable');

            container.find('#button-edit-guests').click(function() {
                var input = container.find('#num-guests');

                $(this).toggleClass('no-edit');
                $(this).children().toggleClass('icon-ok');
                $(this).children().toggleClass('icon-pencil');

                if (input.prop('disabled')) {
                    input.prop('disabled', false);
                    input.toggleClass('no-edit');
                    input.select();
                } else {
                    changeGuestNum(container, staticResRoot);
                }
                $(this).blur();
            });
            container.find('#button-edit-center').click(function() {
                var name = container.find('#revenue-center-name');
                var select = container.find('#revenue-center-select');

                container.find('#revenue-center-controls').toggleClass('input-append');
                $(this).toggleClass('no-edit');
                $(this).children().toggleClass('icon-ok');
                $(this).children().toggleClass('icon-pencil');

                if (name.hasClass('hidden')) {
                    changeRevenueCenter(container, staticResRoot);
                }
                name.toggleClass('hidden');
                select.toggleClass('hidden');

                $(this).blur();
            });
            container.find('#num-guests').keyup(function() {
                if ($(this).val().length == 0) {
                    container.find('#button-edit-guests').prop('disabled', true);
                    container.find('#button-edit-guests').children().removeClass('edit');
                } else {
                    container.find('#button-edit-guests').prop('disabled', false);
                    container.find('#button-edit-guests').children().addClass('edit');
                }
            });
            container.find('a.reopen-check').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var spinner = link.next();
                if (confirm('This will re-open this check and send it to all POS devices.  Continue?')) {
                    link.hide();
                    spinner.show();
                    var form = $("#reopenCheckForm");
                    $.post(form.attr("action"), form.serialize(), function(result) {

                        spinner.hide();
                        var orderSummaryHeader = container.find('#order-summary-header');
                        var notifications = orderSummaryHeader.prev();
                        if (!notifications.is('.notifications')) {
                            notifications = $('<div class="notifications"></div>').insertBefore(orderSummaryHeader);
                        }

                        if (result.status == 200) {
                            link.prev().text('(Paid)');
                            Toast.alertMgr.success('Check re-opened', notifications);
                        } else {
                            link.show();
                            Toast.alertMgr.error(jsonResponse.message, notifications);
                        }
                    }, 'json');
                }
            });
            container.find('a.send-to-devices').click(function(e) {
                e.preventDefault();

                var link = $(this);
                var spinner = link.next();
                if (confirm('This will send this order to all POS devices.  Continue?')) {
                    link.hide();
                    spinner.show();
                    $.getJSON(link.attr('href'), function(jsonResponse) {
                        spinner.hide();
                        var orderSummaryHeader = container.find('#order-summary-header');
                        var notifications = orderSummaryHeader.prev();
                        if (!notifications.is('.notifications')) {
                            notifications = $('<div class="notifications"></div>').insertBefore(orderSummaryHeader);
                        }
                        if (jsonResponse.status == 200) {
                            Toast.alertMgr.success('Order Sent To Devices', notifications);
                        } else {
                            link.show();
                            Toast.alertMgr.error(jsonResponse.message, notifications);
                        }
                    });
                }
            });
            container.find('a.send-stp-email').click(function(e) {
                e.preventDefault();

                var link = $(this);
                var spinner = link.next();
                var authToken = $('input[name="authenticityToken"]').val();
                var orderId = link.attr('data-order-id')
                if (confirm('This will send an email to the customer reminding them to pay for their OPT Tab. Continue?')) {
                    spinner.show();
                    $.ajax({
                        type: 'POST',
                        url: link.attr('href'),
                        data: {
                            id: orderId,
                            authenticityToken: authToken
                        }
                    }).done(function(response) {
                        spinner.hide();
                        var orderSummaryHeader = container.find('#order-summary-header');
                        var notifications = orderSummaryHeader.prev();
                        if (!notifications.is('.notifications')) {
                            notifications = $('<div class="notifications"></div>').insertBefore(orderSummaryHeader);
                        }
                        if (response.status === 200) {
                            link.hide();
                            Toast.alertMgr.success(response.message, notifications);
                        } else {
                            Toast.alertMgr.error(response.message, notifications);
                        }
                    });
                }
            });
            container.find('a.toast-card, .order-details-table tr.clickable').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.loadDialogPage(giftCardDetailUrl + $(this).attr('data-toast-card-id'), 'Card Details');
            });
            container.find('a.applied-loyalty').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.loadDialogPage(loyaltyLedgerDetailUrl + $(this).attr('data-loyalty-check-id'), 'Loyalty Details');
            });
            container.find('a.view-customer-info').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.loadDialogPage(customerInfoUrl + $(this).attr('data-customer-id'), {
                    title: 'Customer Details',
                    async: true
                });
            });
            container.find('.order-details-table tr.clickable').hover(function() {
                $(this).addClass('info');
            }, function() {
                $(this).removeClass('info');
            });
            container.find('#revenue-center').bootstrapifySelect();

            $('[data-toggle="tooltip"]').tooltip();
        }
    };
})();

Toast.toastNowProductModule = (function() {
    return {
        init: function(restaurant) {
            $('#feature_TOAST_NOW_ORDERS').click(function(e) {
                if ($(this).is(':checked')) {
                    if (!confirm("Enabling Toast Now Orders will disable allowing cash and in store credit card payments for takeout and delivery. Are you sure you want to proceed?")) {
                        e.stopImmediatePropagation();
                        $(this).prop('checked', false);
                        Toast.updateSelectionListState($(this).closest('ul.selection-list'));
                    }
                }
            });
        }
    }
})();

Toast.restaurantSignup = (function() {
    return {
        init: function() {
            Toast.editorCommon.init();

            // mgmt group search
            var searchInput = $('.search-query');
            searchInput.typeahead({
                minLength: 1,
                items: 100,
                source: function(query, process) {
                    if (query.length >= 1) {
                        $('#mgmt-group-search .spinner').show()

                        $.getJSON(Toast.restaurantSignup.baseUrl + '/managementGroupSearch?query=' + Toast.escapeHtml(query), function(results) {
                            var items = [];

                            $.map(results, function(data) {
                                var group = {
                                    uuid: data.uuid,
                                    name: data.name,
                                    toString: function() {
                                        return JSON.stringify(this);
                                    },
                                    toLowerCase: function() {
                                        return this.name.toLowerCase();
                                    },
                                    indexOf: function() {
                                        return String.prototype.indexOf.apply(this.name, arguments);
                                    },
                                    replace: function() {},
                                    substr: function() {
                                        return String.prototype.substr.apply(this.name, arguments);
                                    }
                                };
                                items.push(group);
                            });

                            $('#mgmt-group-search .spinner').hide()

                            process(items);
                        });
                    } else {
                        $('#mgmt-group-search .spinner').hide()
                    }
                },
                //action to take when an item from the dropdown is selected
                updater: function(item) {
                    var itemJson = JSON.parse(item);

                    $('#selected-mgmt-group').html(itemJson.name);
                    $('#selected-mgmt-group-input').val(itemJson.uuid);
                },
                highlighter: function(item) {
                    var html = '<div class="typeahead" style="width: 100%;">';
                    html += '<div>' + item.name + '</div></div>';
                    return html;
                }
            });
        },
        baseUrl: '/restaurants/account'
    };
})();

Toast.orderDetailSummary = (function() {
    return {
        init: function(container, giftCardDetailUrl, loyaltyLedgerDetailUrl, customerInfoUrl) {
            container.find('a.toast-card').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.showDialog(giftCardDetailUrl + $(this).attr('data-toast-card-id'), 'Card Details');
            });
            container.find('a.applied-loyalty').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.showDialog(loyaltyLedgerDetailUrl + $(this).attr('data-loyalty-check-id'), 'Loyalty Details');
            });
            container.find('a.view-customer-info').click(function(e) {
                e.preventDefault();
                Toast.reporting.orderDetails.showDialog(customerInfoUrl + $(this).attr('data-customer-id'), {
                    title: 'Customer Details',
                    async: true
                });
            });

            $('[data-toggle="tooltip"]').tooltip();
            $('#order-details-section').find('.pagination a').click(function(e) {
                e.preventDefault();
                var a = $(this),
                    href = a.attr('href');
                if (href === '#') {
                    return;
                }
                Toast.reporting.loadHtmlAsyncReport(href, 'order-details-section');
            });
        }
    };
})();


Toast.giftCardDetail = (function() {
    var reloadDataTable = function(table) {
        console.log('reloading table: ' + table); // eslint-disable-line
        if (table.isDataTable()) {
            table.dataTable().fnStandingRedraw();
        }
    };
    var reloadCardsReport = function() {
        reloadDataTable($('#rewards-cards-table'));
        reloadDataTable($('#inactive-cards-table'));
        reloadDataTable($('#gift-cards-table'));
    };
    var showNotifications = function(container) {
        container.find('.alert').each(function() {
            if ($(this).text().length > 1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };
    var toggleCardControls = function(container) {
        container.find('#card').toggle();
        container.find('#card-edit').toggle();
        container.find('#card-submit').prop('disabled', false);
    };
    var toggleInfoControls = function(container) {
        container.find('#info').toggle();
        container.find('#info-edit').toggle();
        container.find('#info-submit').prop('disabled', false);
    };
    var toggleMessageControls = function(container) {
        container.find('#message').toggle();
        container.find('#message-edit').toggle();
        container.find('#message-submit').prop('disabled', false);
    };
    var formSubmit = function(container, form) {
        var url = form.prop('action'),
            data = form.serialize();
        $.post(url, data, function(response) {
            container.html(response);
            container.animate({
                scrollTop: 0
            }, 100, 'linear');
            reloadCardsReport();
        }, 'html');
    };
    var updateCurrentBalance = function(container) {
        var activeTab = container.find('.tab-pane.active'),
            input = activeTab.find('.td-adjust-input'),
            row = input.closest('.tr-adjust'),
            currentVal = row.data('current-balance'),
            diff,
            newBalance;

        if (input.hasClass('decimal')) {
            diff = (input.val() === '' || isNaN(input.val())) ? 0 : parseFloat(input.val());
            newBalance = parseFloat(currentVal + diff).toFixed(2);
        } else {
            diff = (input.val() === '' || isNaN(input.val())) ? 0 : parseInt(input.val());
            newBalance = currentVal + diff;
        }
        row.find('.td-adjust-text').text(newBalance);
    };
    var hideAdjustmentRow = function(container) {
        $('#adjust-cancel').hide();
        var activeTab = container.find('.tab-pane.active');
        container.find('#adjust-button').show();
        activeTab.find('.tr-adjust').hide();
        activeTab.find('tr.placeholder').show();
        container.find('#adjust-submit').hide();
    };
    var updateAdjustButton = function(container) {
        var tab = container.find('.tab-pane.active').prop('id'),
            perms = $('#adjust-div').data('perms');
        if ((tab === 'value' && perms == 'rewards') || (tab === 'loyalty' && perms == 'gc') || tab === 'linked-cards') {
            $('#adjust-div').hide();
        } else {
            $('#adjust-div').show();
        }
    };
    var changeRewardsEmail = function(container) {
        var input = container.find('#rewards-email-input'),
            button = container.find('#rewards-email-submit'),
            authToken = container.find('[name=authenticityToken]').val(),
            cardEmail = input.val(),
            send = container.find('.rewards-email-send').prop('checked'),
            url = input.data('url');

        button.find('.icon-ok').hide();
        button.find('img').show();
        button.prop('disabled', true);

        $.post(url, {
            email: cardEmail,
            send: send,
            authenticityToken: authToken
        }, function(jsonResponse) {
            container.find('.alert').empty();
            if (jsonResponse.status == 200) {
                console.log(container, jsonResponse.message); //eslint-disable-line
                container.find('.alert-success').text(jsonResponse.message);
                reloadCardsReport();
                container.find('#rewards-email-text').text(cardEmail);
                container.find('#rewards-email-edit').hide();
                container.find('#rewards-email').show();
            } else {
                container.find('.alert-error').text(jsonResponse.message);
                input.select();
            }
            button.prop('disabled', false);
            showNotifications(container);
            container.animate({
                scrollTop: 0
            }, 100, 'linear');
            button.find('.icon-ok').show();
            button.find('img').hide();
        });
    };
    var changeRewardsPhoneNumber = function(container) {
        var input = container.find('#rewards-phone-input'),
            button = container.find('#rewards-phone-submit'),
            authToken = container.find('[name=authenticityToken]').val(),
            cardPhone = input.val(),
            send = container.find('.rewards-phone-send').prop('checked'),
            url = input.data('url');

        button.find('.icon-ok').hide();
        button.find('img').show();
        button.prop('disabled', true);

        $.post(url, {
            phone: cardPhone,
            send: send,
            authenticityToken: authToken
        }, function(jsonResponse) {
            container.find('.alert').empty();
            if (jsonResponse.status == 200) {
                console.log(container, jsonResponse.message); //eslint-disable-line
                container.find('.alert-success').text(jsonResponse.message);
                reloadCardsReport();
                container.find('#rewards-phone-text').text(cardPhone);
                container.find('#rewards-phone-edit').hide();
                container.find('#rewards-phone').show();
            } else {
                container.find('.alert-error').text(jsonResponse.message);
                input.select();
            }
            button.prop('disabled', false);
            button.find('.icon-ok').show();
            button.find('img').hide();
            showNotifications(container);
            container.animate({
                scrollTop: 0
            }, 100, 'linear');
        });
    };
    var showAppendedText = function(element) {
        element.find('input').css('border-radius', '4px 0 0 4px');
        element.find('.add-on').show();
    };
    var hideAppendedText = function(element) {
        element.find('input').css('border-radius', '4px');
        element.find('.add-on').hide();
    };
    var hideAllAppendedText = function(container) {
        container.find('.input-append').each(function() {
            hideAppendedText($(this));
        });
    };
    return {
        init: function(container, storedValueDetailUrl, loyaltyPointsDetailUrl) {
            container.find('#gift-card-tabs a').off('click').click(function(e) {
                e.preventDefault();
                $(this).tab('show');
                hideAdjustmentRow(container);
                updateAdjustButton(container);
            });
            container.find('#value tbody tr.clickable').hover(function() {
                $(this).addClass('info');
            }, function() {
                $(this).removeClass('info');
            }).click(function() {
                Toast.reporting.orderDetails.loadDialogPage(storedValueDetailUrl + $(this).attr('data-txn-id'), 'Order Details');
            });
            container.find('#loyalty tbody tr.clickable').hover(function() {
                    $(this).addClass('info');
                },
                function() {
                    $(this).removeClass('info');
                }).click(function() {
                Toast.reporting.orderDetails.loadDialogPage(loyaltyPointsDetailUrl + $(this).attr('data-txn-id'), 'Order Details');
            });
            container.find('.link-edit-card').click(function(e) {
                e.preventDefault();
                toggleCardControls(container);
                $(this).hide();
            });
            container.find('#card-cancel').click(function() {
                toggleCardControls(container);
                container.find('.link-edit-card').show();
            });
            container.find('.link-edit-info').click(function(e) {
                e.preventDefault();
                toggleInfoControls(container);
                $(this).hide();
            });
            container.find('.message-edit-link').click(function(e) {
                e.preventDefault();
                toggleMessageControls(container);
                $(this).hide();
            });
            container.find('#info-cancel').click(function() {
                toggleInfoControls(container);
                container.find('.link-edit-info').show();
            });
            container.find('#message-cancel').click(function() {
                toggleMessageControls(container);
                container.find('a.message-edit-link').show();
            });
            container.find('#card-submit').click(function(e) {
                e.preventDefault();
                $(this).prop('disabled', true);
                $(this).next().show();
                formSubmit(container, container.find('#card-form'));
            });
            container.find('#info-submit').click(function(e) {
                e.preventDefault();
                $(this).prop('disabled', true);
                $(this).next().show();
                formSubmit(container, container.find('#customer-info-form'));
            });
            container.find('#message-submit').click(function(e) {
                e.preventDefault();
                $(this).prop('disabled', true);
                $(this).next().show();
                formSubmit(container, container.find('#message-form'));
            });

            // ADJUST POINTS / BALANCE
            container.find('#adjust-submit').click(function() {
                $(this).prop('disabled', true);
                var activeTab = container.find('.tab-pane.active');
                formSubmit(container, activeTab.find('form.adjust'));
            });
            container.find('.td-adjust-input').change(function() {
                updateCurrentBalance(container);
            }).blur(function() {
                updateCurrentBalance(container);
            }).keyup(function() {
                updateCurrentBalance(container);
            });
            container.find('#adjust-button').click(function() {
                $(this).hide();
                var activeTab = container.find('.tab-pane.active');
                container.find('#adjust-cancel').show();
                activeTab.find('.tr-adjust').show();
                activeTab.find('tr.placeholder').hide();
                container.find('#adjust-submit').show();
                activeTab.find('.td-adjust-input').val(0).select();
                updateCurrentBalance(container);
            });
            container.find('#adjust-cancel').click(function() {
                hideAdjustmentRow(container);
            });
            container.find('form.adjust').submit(function(e) {
                // prevent the form from being submitted when the user presses ENTER
                e.preventDefault();
            });

            // REWARDS INFO

            container.find('#link-edit-email').click(function(e) {
                e.preventDefault();
                container.find('#rewards-email').hide();
                container.find('#rewards-email-edit').show();
                container.find('#rewards-email-input').select();
            });
            container.find('#rewards-email-cancel').click(function() {
                container.find('#rewards-email').show();
                container.find('#rewards-email-edit').hide();
            });
            container.find('#rewards-email-submit').click(function() {
                changeRewardsEmail(container);
            });
            container.find('#link-edit-phone').click(function(e) {
                e.preventDefault();
                container.find('#rewards-phone').hide();
                container.find('#rewards-phone-edit').show();
                container.find('#rewards-phone-input').select();
            });
            container.find('#rewards-phone-cancel').click(function() {
                container.find('#rewards-phone').show();
                container.find('#rewards-phone-edit').hide();
            });
            container.find('#rewards-phone-submit').click(function() {
                changeRewardsPhoneNumber(container);
            });
            container.find('.close').click(function(e) {
                e.preventDefault();
                $(this).parent().hide();
            });
            container.find('#message-edit .input-append').hover(function() {
                showAppendedText($(this));
            }).mouseout(function() {
                hideAppendedText($(this));
            });

            container.find('.verify-card,.decline-card').click(function(e) {
                e.preventDefault();
                $('#linked-cards').mask();
                var form = $(this).closest('li').find('form');
                formSubmit(container, form);
            });

            hideAllAppendedText(container);

            showNotifications(container);

            updateAdjustButton(container);

            Toast.enableEntityTableInput(container.find('.td-adjust-input').closest('tr'));
        }
    };
})();

(function($) {
    $.fn.bootstrapifySelect = function(minWidth, maxWidth, disabled) {
        if (!Toast.bootstrapifySelectCount) {
            Toast.bootstrapifySelectCount = 0;
        }

        var handleAnchorClasses = function(minWidthClass, disabled = false) {
            var string = 'btn ';
            string = string.concat(minWidthClass);
            string = disabled ? string.concat(' disabled') : string;

            return string;
        }

        return this.each(function(i, e) {
            var sel = $(e);
            if ((sel.data('convert') !== 'no') && sel.attr('bootstrapified') != 'true') {
                sel.attr('bootstrapified', 'true');
                sel.hide().wrap('<div class="btn-group select" id="select-group-' + Toast.bootstrapifySelectCount + '" />');
                var select = $('#select-group-' + Toast.bootstrapifySelectCount);
                var current = (sel.val()) ? sel.val() : '&nbsp;';
                var style = (minWidth ? 'min-width:' + minWidth + ';' : '') +
                    (maxWidth ? 'max-width:' + maxWidth + ';' : '');
                var widthStyle = style ? 'style="' + style + '"' : '';
                var minWidthClass = minWidth ? 'fixed-width' : '';
                select.append('<a class=" ' + handleAnchorClasses(minWidthClass, disabled) + '" data-toggle="dropdown" href="javascript:;" ' + widthStyle + '><span class="option">' + current + '</span> <span class="caret"></span></a><ul class="dropdown-menu"></ul>');
                sel.find('option').each(function(o, q) {
                    var item = $('<li><a href="javascript:;" data-value="' + $(q).attr('value') + '"></a></li>');
                    select.find('.dropdown-menu').append(item);
                    $(item).find('a').text($(q).text());

                    if ($(q).attr('selected')) {
                        select.find('.dropdown-menu li:eq(' + o + ')').click();
                        select.find('.btn:eq(0) .option').text($(q).text());
                    }
                });
                select.find('.dropdown-menu a').click(function() {
                    sel.data('bsChanging', true);
                    sel.val($(this).attr('data-value')).change();
                    sel.data('bsChanging', false);
                    select.find('.btn:eq(0) .option').text($(this).text());
                });
                sel.change(function() {
                    if (!sel.data('bsChanging')) {
                        var option = sel.find(':selected');
                        select.find('.btn:eq(0) .option').text(option.text());
                    }
                });
                if (disabled) {
                    sel.attr('disabled', 'disabled');
                }
                Toast.bootstrapifySelectCount++;
            }
        });
    };

    $.fn.bootstrapifyDataTable = function() {
        return this.each(function(i, e) {
            var dataTable = $(e),
                parent = dataTable.parent(),
                select = parent.find('.dataTables_length select'),
                input = parent.find('.dataTables_filter input'),
                label = input.parent();
            if (dataTable.data('bootstrapified')) {
                return;
            }
            dataTable.data('bootstrapified', true);
            // Length
            select.bootstrapifySelect();
            // Filter
            input.addClass('search-query');
            // Move the text of the label into the input placeholder
            input.attr('placeholder', label.text());
            label.contents().filter(function() {
                return this.nodeType == 3; //Node.TEXT_NODE
            }).remove();
            // Add a search icon
            label.append($('<i class="icon-search opacity50"></i>'));
        });
    };

    /*
     * Makes a Bootstrap btn-group dropdown act like a select, switching out the
     * label, making the group.data("value") the selected value, and
     * (optionally) invoking the onChange listener with the new value. The text
     * in the visible button must be surrounded with a span having the class
     * 'dropdown-label' to function correctly.
     */
    $.fn.btnGroupDropdown = function(onChange) {
        return this.each(function() {
            $(this).find('li a').click(function(e) {
                e.preventDefault();
                var $this = $(this);
                var group = $this.closest('.btn-group');
                var value = $this.data('value');
                group.find('.dropdown-label').html($this.html());
                if (value) {
                    group.data('value', value);
                } else {
                    group.removeData('value');
                }
                if (typeof(onChange) === 'function') {
                    onChange.call(this, $this.data('value'));
                }
            });
        });
    };
    $.fn.toastSelectPicker = function() {
        return this.each(function() {
            // uses bootstrap-select
            var select = $(this);
            select.selectpicker();
            if (select.hasClass('firstSelectsAll')) {
                if (!select.prop('multiple')) {
                    throw new Error('Attempted to use firstSelectsAll without multiple select');
                }
                var updateSelectedName = function() {
                    var firstOpt = select.find('option').first();
                    if (firstOpt.prop('selected')) {
                        select.next().find('button .filter-option').text(firstOpt.text());
                    }
                };
                select.priorStateFirstOptionSelected = select.find('option').first().prop('selected');
                select.change(function() {
                    var firstOpt = select.find('option').first();
                    var selCount = select.find('option:selected').length;
                    var selMax = select.find('option').length;
                    // select or deselect all
                    if (firstOpt.prop('selected') && !select.priorStateFirstOptionSelected) {
                        select.selectpicker('selectAll');
                    } else if (!firstOpt.prop('selected') && select.priorStateFirstOptionSelected) {
                        select.selectpicker('deselectAll');
                    }
                    // update first (to agree with selection state of all others)
                    if (firstOpt.prop('selected') === select.priorStateFirstOptionSelected) {
                        if (firstOpt.prop('selected') && selCount < selMax) {
                            firstOpt.prop('selected', false);
                        } else if (!firstOpt.prop('selected') && selCount === selMax - 1) {
                            firstOpt.prop('selected', true);
                        }
                    }
                    select.priorStateFirstOptionSelected = firstOpt.prop('selected');
                    select.selectpicker('refresh');

                    updateSelectedName();
                });
                updateSelectedName();
            }
        });
    };
})(jQuery);

// http://stackoverflow.com/questions/2897155/get-caret-position-within-an-text-input-field
(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    };
    $.fn.center = function() {
        return this.each(function() {
            var $this = $(this);
            $this.css('position', 'absolute');
            $this.css({
                margin: '0'
            });
            $this.css('top', Math.max(0, (($(window).height() - $this.outerHeight()) / 2) +
                $(window).scrollTop()) + 'px');
            $this.css('left', Math.max(0, (($(window).width() - $this.outerWidth()) / 2) +
                $(window).scrollLeft()) + 'px');
        });
    };

})(jQuery);

$(function() {

    if (!Toast.isTouch()) {
        // Android tries to display hover, but it does so very poorly,
        // so we want to avoid using the ":hover" CSS selector
        // Instead we'll add and remove a css class
        $('ul.selection-list li label').hover(
            function() {
                $(this).addClass('hover');
            },
            function() {
                $(this).removeClass('hover');
            }
        );
    }

});

$(document).on('click', '.auto-select', function() {
    if (!window.getSelection || !document.createRange) return;

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(this);
    selection.removeAllRanges();
    selection.addRange(range);
});

Toast.decodeHTML = function(html) {
    const text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
};



// WEBPACK FOOTER //
// ./admin/src/app.js