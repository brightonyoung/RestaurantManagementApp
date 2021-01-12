(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["adminFrame"] = factory();
    else
        root["adminFrame"] = factory();
})(this, function() {
    return webpackJsonpadminFrame([0], [
        /* 0 */
        /***/
        (function(module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        }),
        /* 1 */
        /***/
        (function(module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        }),
        /* 2 */
        /***/
        (function(module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        }),
        /* 3 */
        /***/
        (function(module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        }),
        /* 4 */
        /***/
        (function(module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        }),
        /* 5 */
        ,
        /* 6 */
        /***/
        (function(module, exports, __webpack_require__) {

            "use strict";


            __webpack_require__(1);

            __webpack_require__(2);

            __webpack_require__(3);

            __webpack_require__(0);

            __webpack_require__(4);

            /* eslint-env browser, jquery */
            /* eslint-disable no-alert */

            if (typeof ToastFrame == 'undefined') {

                var ToastFrame = window.ToastFrame = {
                    accessibleRestaurants: [],
                    escapeHtml: function escapeHtml(value) {
                        if (value) {
                            return jQuery('<div />').text(value).html();
                        } else {
                            return '';
                        }
                    },

                    registerOnLogoutClearYourUpdatesState: function registerOnLogoutClearYourUpdatesState() {
                        if (localStorage) {
                            $('body').on('click', 'a[href=\'/logout\']', function() {
                                localStorage.removeItem('YourUpdates::isCollapse');
                            });
                        }
                    },

                    initAnalytics: function initAnalytics() {
                        $('.admin-content').on('change', '[data-analytics-section] [data-analytics-field]', function() {
                            var fieldEl = $(this);
                            var fieldValue = fieldEl.val();
                            var sectionEl = fieldEl.closest('[data-analytics-section]');

                            var eventValue = null;
                            if (jQuery.isNumeric(fieldValue)) {
                                eventValue = parseFloat(fieldValue);
                            } else if (typeof fieldValue === 'boolean') {
                                eventValue = fieldValue ? 1 : 0;
                            } else if (fieldValue === 'true') {
                                eventValue = 1;
                            } else if (fieldValue === 'false') {
                                eventValue = 0;
                            }

                            trackFieldChange(sectionEl.data('analyticsSection'), fieldEl.data('analyticsField'), eventValue);
                        });
                    },

                    initAdminLayout: function initAdminLayout(addFilterRestaurants) {
                        function adjustTopPadding() {
                            var windowWidth = $(window).width();
                            var spacer = $('#content_spacer');
                            if (windowWidth > 979) {
                                var navbarHeight = $('.navbar').height();
                                if (spacer.length == 0) {
                                    $('.content').prepend('<div id="content_spacer"></div>');
                                    spacer = $('#content_spacer');
                                }
                                spacer.css('height', navbarHeight);
                                $('.content').css('padding-top', 0);
                            } else {
                                if (spacer.length > 0) {
                                    spacer.remove();
                                }
                                $('.content').css('padding-top', '');
                            }
                        }

                        $(window).resize(function() {
                            adjustTopPadding();
                        });

                        $(function() {
                            adjustTopPadding();

                            $('.navbar ul.nav li.dropdown a[href=""]:not(.dropdown-toggle)').click(function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                $(this).blur();
                            });

                            $('.navbar-inverse .dropdown-submenu > a').click(function() {
                                if ($(window).width() <= 979) {
                                    $(this).closest('.dropdown-submenu').find('>.dropdown-menu').toggle();
                                }
                            });

                            function adhocRepositionSubmenuOutside(dropdownMenu) {
                                var submenus = dropdownMenu.find('.dropdown-submenu');

                                // remove the submenu if the dropdown-menu scrolls
                                $(dropdownMenu).scroll(function() {
                                    $('#submenuClone').remove();
                                });

                                var displaySubmenu = function displaySubmenu() {

                                    if ($('#submenuClone').size() != 0) {
                                        return;
                                    }

                                    // make a clone of the submenu and hide the original
                                    var submenuDropdown = $(this).find('.dropdown-menu');
                                    var submenuDropdownClone = submenuDropdown.clone().attr('id', 'submenuClone');
                                    submenuDropdown.hide();

                                    // clone's position calculation
                                    var scrollbarWidth = function scrollbarWidth() {
                                        var a, b, c;
                                        if (c === undefined) {
                                            a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
                                            b = a.children();
                                            c = b.innerWidth() - b.height(99).innerWidth();
                                            a.remove();
                                        }
                                        return c;
                                    };

                                    var left = $(this).parent().parent().width() - 2 * $(this).parent().width();
                                    var top = $(this).position().top + $(this).parent().parent().height();
                                    var width = $(this).width();

                                    // position clone on the right if left goes beyond window
                                    if ($(this).parent().parent().offset().left + left < 0) {
                                        left = $(this).parent().parent().width() - scrollbarWidth();
                                    } else if ($(this).parent().css('overflow') == 'auto') {
                                        left += scrollbarWidth();
                                    }

                                    // append clone to menu's parent
                                    submenuDropdownClone.appendTo(dropdownMenu.parent());

                                    // set clone's position and width
                                    submenuDropdownClone.css({
                                        top: top,
                                        left: left,
                                        width: width
                                    }).show();

                                    // set clone scrollable if exceeds current screen's height
                                    var heightDiff = submenuDropdownClone.height() + submenuDropdownClone.offset().top - $(window).height() - $(window).scrollTop();
                                    if (heightDiff > 0) {
                                        submenuDropdownClone.height(submenuDropdownClone.height() - heightDiff - 20);
                                        submenuDropdownClone.css('overflow', 'auto');
                                    }
                                };

                                var hideSubmenu = function hideSubmenu(e) {
                                    var target = e.toElement || e.relatedTarget;

                                    // hide submenu iff mouse moves outside of the clone and original menu
                                    if ($(target).closest('.dropdown-menu').attr('id') != 'submenuClone') {
                                        $('#submenuClone').remove();
                                    }
                                };

                                $('body').on('mouseleave', '#submenuClone', function(e) {
                                    var target = e.toElement || e.relatedTarget;

                                    // hide submenu iff mouse moves outside of the clone and original menu
                                    if ($(target).closest('.dropdown-menu').attr('id') != 'submenuClone') {
                                        $(this).remove();
                                    }
                                });

                                $('body').on('mouseleave', '.dropdown-submenu', function(e) {
                                    var target = e.toElement || e.relatedTarget;

                                    // hide submenu iff mouse moves outside of the clone and original menu
                                    if ($(target).closest('.dropdown-menu').attr('id') == 'submenuClone') {
                                        $(this).trigger('mouseover');
                                    }
                                });

                                // attach hover listeners
                                submenus.hover(displaySubmenu, hideSubmenu);
                            }

                            function adjustDropdownHeight(toggle) {
                                if ($(window).width() <= 979) {
                                    return;
                                }
                                var dropdown = toggle.parent(),
                                    dropdownContainer = dropdown.closest('.nav'),
                                    menu = dropdown.find(' > .dropdown-menu'),
                                    windowHeight = $(window).height(),
                                    topOffset = dropdownContainer.position().top + dropdownContainer.height() + 20;
                                menu.css('overflow', '');
                                menu.css('height', '');
                                if (menu.height() + topOffset > windowHeight) {
                                    menu.height(windowHeight - topOffset);
                                    menu.css('overflow', 'auto');
                                    adhocRepositionSubmenuOutside(menu);
                                }
                            }

                            //loads the list of restaurants async
                            function loadRestaurants() {
                                if ($('#restaurant-switch-menu').data('loaded') == false) {
                                    $('#restaurant-switch-menu-loading-title a').text('Loading...');
                                    return $.ajax('/restaurantaccess/populateAccessibleRestaurants', {
                                        method: 'GET',
                                        global: false,
                                        dataType: 'json',
                                        success: function success(data) {
                                            ToastFrame.accessibleRestaurants = [];
                                            if (data.length > 0) {
                                                $('#restaurant-switch-menu-loading-title').remove();
                                                //generate html dom, then add it to the master list of accessibleRestaurants
                                                for (var i = 0; i < data.length; i++) {
                                                    var restaurant = data[i];
                                                    var htmlDom = '<li class="search-option"><a href="/account/switchrestaurant?guid=' + ToastFrame.escapeHtml(restaurant.guid) + '">' + ToastFrame.escapeHtml(restaurant.name) + '</a></li>';
                                                    restaurant.html = htmlDom;
                                                    ToastFrame.accessibleRestaurants.push(restaurant);
                                                }
                                                $('#restaurant-switch-menu').data('loaded', true).css('width', 'auto');
                                                //render the list
                                                renderRestaurantDropdown(ToastFrame.accessibleRestaurants, false);
                                            } else {
                                                $('#restaurant-switch-menu-loading-title a').text('Error. Please try again.');
                                            }
                                        },
                                        error: function error() {
                                            $('#restaurant-switch-menu-loading-title a').text('Error. Please try again.');
                                        }
                                    });
                                } else {
                                    return $.Deferred().resolve().promise();
                                }
                            }

                            //takes a list of restaurants, render it on these conditions:
                            //1. If a user has >800 restaurants, don't render all. Instead, show a button to expand the list
                            //2. If a user starts type ahead, show all filtered results
                            function renderRestaurantDropdown(restaurants, forceShow) {
                                var restaurantSwitchMenuDom = $('#restaurant-switch-menu');
                                var restaurantDoms = $('#restaurant-switch-menu li:not(#restaurant-switch-menu-search, .divider)');
                                restaurantDoms.remove();

                                if (restaurants.length > 800 && !forceShow) {
                                    restaurantSwitchMenuDom.append('<li id="show-all-restaurants" class="search-option"><a href="">View ' + restaurants.length + ' restaurants</a></li>');
                                    $('#show-all-restaurants').click(function(e) {
                                        //prevent dropdown from closing on click
                                        e.stopImmediatePropagation();
                                        e.preventDefault();
                                        //force render all restaurants
                                        renderRestaurantDropdown(ToastFrame.accessibleRestaurants, true);
                                    });
                                } else {
                                    //render the list of restaurants passed into this function
                                    var dom = '';
                                    for (var i in restaurants) {
                                        dom += restaurants[i].html;
                                    }
                                    restaurantSwitchMenuDom.append(dom);
                                }

                                adjustDropdownHeight($('#switch-toggle'));
                            }

                            $('.navbar-inner .dropdown-toggle').click(function() {
                                if ($(this).is('#switch-toggle')) {
                                    loadRestaurants().done(function() {
                                        var q = $('#switch-restaurants-menu .typeahead').val();
                                        filterRestaurantsInDropdown(q);
                                        adjustDropdownHeight($('#switch-toggle'));
                                    });
                                } else {
                                    adjustDropdownHeight($(this));
                                }
                            });

                            if (addFilterRestaurants) {
                                var menuElmt = $('#switch-restaurants-menu');
                                menuElmt.click(function() {
                                    menuElmt.find('.typeahead').val('');
                                    setTimeout(function() {
                                        menuElmt.find('.typeahead').focus();
                                    }, 0);
                                    menuElmt.find('li').show();
                                });
                                menuElmt.find('.typeahead').click(function(e) {
                                    e.stopPropagation();
                                }).keyup(function(e) {
                                    if (e.which != 40 && e.which != 38 && e.which != 9) {
                                        // down, up, tab
                                        //original search input
                                        var q = $(this).val();
                                        filterRestaurantsInDropdown(q, e.which);
                                    }
                                });
                            }

                            function filterRestaurantsInDropdown(q, keyUp) {
                                q = q.toUpperCase();
                                //is this an ID search?
                                var idq = $.isNumeric(q);
                                //is this a GUID search?
                                var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
                                var guidq = regexGuid.test(q);
                                if (q.length == 0) {
                                    //if search string is empty, render all
                                    renderRestaurantDropdown(ToastFrame.accessibleRestaurants, false);
                                } else {
                                    var exactMatch = [];
                                    var filtered = ToastFrame.accessibleRestaurants.filter(function(restaurant) {
                                        var content = '';
                                        if (idq) {
                                            content = restaurant.id;
                                        } else if (guidq) {
                                            content = restaurant.guid.toUpperCase();
                                        } else {
                                            content = restaurant.name.toUpperCase();
                                        }

                                        //for ID search, an exact match is special
                                        if (idq && content.toString() === q) {
                                            exactMatch.push(restaurant);
                                        }
                                        if (content.toString().indexOf(q) !== -1) {
                                            return restaurant;
                                        }
                                    });
                                    if (exactMatch.length > 0) {
                                        // force show when searching by ID
                                        renderRestaurantDropdown(exactMatch, true);
                                    } else {
                                        // only force show on enter key so we don't render on first letters
                                        renderRestaurantDropdown(filtered, keyUp == 13);
                                    }
                                    adjustDropdownHeight($('#switch-toggle'));
                                }
                            }

                            var currentSelection;
                            $('#switch-restaurants-menu .dropdown-toggle').click(function() {
                                if (currentSelection != null) {
                                    currentSelection.removeClass('active');
                                    currentSelection = null;
                                }
                            });

                            $('#switch-restaurants-menu .typeahead').keyup(function(e) {
                                if (currentSelection != null && e.which != 40 && e.which != 39 && e.which != 38 && e.which != 37 && e.which != 13 && e.which != 9) {
                                    currentSelection.removeClass('active');
                                    currentSelection = null;
                                }
                            });

                            $('#switch-restaurants-menu .search-option').on({
                                mouseenter: function mouseenter() {
                                    if (currentSelection != null) {
                                        currentSelection.removeClass('active');
                                    }
                                    $(this).addClass('active');
                                    currentSelection = $(this);
                                }
                            });

                            $('#switch-restaurants-menu .dropdown-toggle, #switch-restaurants-menu .typeahead').keydown(function(e) {
                                if ($('#switch-restaurants-menu').hasClass('open')) {
                                    var find;
                                    if (e.which == 40 || e.which == 9 && !e.shiftKey) {
                                        // down or tab
                                        if (currentSelection == null) {
                                            find = $('#switch-restaurants-menu .search-option:visible').first();
                                            if (find.length) {
                                                find.addClass('active');
                                                currentSelection = find;
                                            }
                                        } else {
                                            find = currentSelection.nextAll('.search-option:visible').first();
                                            if (find.length) {
                                                currentSelection.removeClass('active');
                                                find.addClass('active');
                                                currentSelection = find;
                                            }
                                        }
                                        return false; // stops the page from scrolling
                                    }
                                    if (e.which == 38 || e.which == 9 && e.shiftKey) {
                                        // up
                                        if (currentSelection != null) {
                                            find = currentSelection.prevAll('.search-option:visible').first();
                                            if (find.length) {
                                                currentSelection.removeClass('active');
                                                find.addClass('active');
                                                currentSelection = find;
                                            }
                                        }
                                        return false; // stops the page from scrolling
                                    }
                                    if (e.which == 13) {
                                        // enter
                                        if (currentSelection != null && currentSelection.is(':visible')) {
                                            window.location = currentSelection.find('a').attr('href');
                                            return false; // stops the page from scrolling
                                        }
                                    }
                                }
                            });

                            ToastFrame.registerOnLogoutClearYourUpdatesState();
                        });
                    }
                };
            }

            (function($) {
                $.fn.center = function() {
                    return this.each(function() {
                        var $this = $(this);
                        $this.css('position', 'absolute');
                        $this.css({
                            margin: '0'
                        });
                        $this.css('top', Math.max(0, ($(window).height() - $this.outerHeight()) / 2 + $(window).scrollTop()) + 'px');
                        $this.css('left', Math.max(0, ($(window).width() - $this.outerWidth()) / 2 + $(window).scrollLeft()) + 'px');
                    });
                };
            })(jQuery);

            /***/
        })
    ], [6]);
});


// WEBPACK FOOTER //
// app-bb759734b677255d6d76.js