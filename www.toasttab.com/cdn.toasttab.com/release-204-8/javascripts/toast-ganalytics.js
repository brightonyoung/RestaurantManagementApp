(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');


var shortUrl;

function gaInitialLoad(tracking_id, short_url) {
    ga('create', tracking_id, 'auto');
    // Set value for custom dimension at index 1.
    ga('set', 'dimension1', 'short_url');
    ga('set', 'dimension2', 'version');
    ga('send', 'pageview');

    shortUrl = short_url;
}

function trackException(message, fatal) {
    var fieldsObject = {
        'exDescription': message,
        'exFatal': fatal
    };

    ga('send', 'exception', fieldsObject);
}

function trackButtonEvent(label) {
    ga('send', 'event', 'button', 'click', label, {
        'dimension1': shortUrl,
        'dimension2': '1'
    });
}

function trackLinkEvent(label) {
    ga('send', 'event', 'link', 'click', label, {
        'dimension1': shortUrl,
        'dimension2': '1'
    });
}

function trackImageEvent(label) {
    ga('send', 'event', 'image', 'click', label, {
        'dimension1': shortUrl,
        'dimension2': '1'
    });
}

function trackDropdownEvent(label) {
    ga('send', 'event', 'dropdown', 'change', label, {
        'dimension1': shortUrl,
        'dimension2': '1'
    });
}

function createCustomDimensions(restaurant_group, restaurant_name, restaurant_guid, toastweb_version, internal_user) {
    if (restaurant_group != null) {
        ga('set', 'dimension1', restaurant_group);
    }
    if (restaurant_name != null) {
        ga('set', 'dimension2', restaurant_name);
    }
    if (restaurant_guid != null) {
        ga('set', 'dimension3', restaurant_guid);
    }
    if (toastweb_version != null) {
        ga('set', 'dimension4', toastweb_version);
    }
    if (internal_user != null) {
        ga('set', 'dimension5', internal_user);
    }
}

// This section is added to track events in the Admin portion of the toastweb site.
var restaurant;

function gaAdminLoad(tracking_id, restaurant_id, restaurant_name, sample_rate) {
    ga('create', {
        'trackingId': tracking_id,
        'cookieDomain': 'auto',
        'sampleRate': sample_rate
    });
    restaurant = restaurant_name + " <" + restaurant_id + ">";
    ga('send', 'pageview', document.location.pathname);
}

function trackAdminEvent(category, action) {
    ga('send', 'event', category, action, restaurant);
}

function trackNavigationEvent(category, action, label) {
    ga('send', 'event', category, action, label);
}

function trackFieldChange(section, field, value) {
    ga('send', 'event', section, 'Field Change', field, value);
}