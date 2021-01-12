$(function() {
    var Appcues = window.Appcues;
    var pendo = window.pendo

    if (!!Appcues || !!pendo) {
        var getInfo = $.getJSON('/restaurants/admin/thirdPartyData');
        $.when(getInfo).done(function(properties) {
            const accountId = properties.restaurantGuid
            const visitorId = properties.guid
            identifyWithAppcues(properties)
            identifyWithPendo(visitorId, accountId, properties)
        });
    }

    function identifyWithAppcues(properties) {
        if (Appcues) {
            Appcues.identify(properties.guid, properties);
        }
    }

    function identifyWithPendo(visitorId, accountId, properties) {
        if (pendo) {
            pendo.identify({
                visitor: {
                    id: visitorId,
                    permissions: properties.permissions,
                    email: properties.email,
                    isInternalUser: properties.isInternalUser
                },
                account: {
                    id: accountId,
                    name: properties.restaurant,
                    location: properties.location,
                    feeStartDate: properties.feeStartDate,
                    standaloneDigitalOrderingEnabled: properties.standaloneDigitalOrderingEnabled,
                    testMode: properties.testMode,
                    pendingActivation: properties.pendingActivation,
                    toastCardsModuleEnabled: properties.toastCardsModuleEnabled,
                    toastPayrollEnabled: properties.toastPayrollEnabled,
                    kioskModuleEnabled: properties.kioskModuleEnabled,
                    pizzaMenuManagementEnabled: properties.pizzaMenuManagementEnabled,
                    masterMenuManagementEnabled: properties.masterMenuManagementEnabled,
                    onlineOrderingEnabled: properties.onlineOrderingEnabled,
                    loyaltyEnabled: properties.loyaltyEnabled,
                    birthdayRewardsEnabled: properties.birthdayRewardsEnabled,
                    marketingEnabled: properties.marketingEnabled,
                    toastDeliverySystemEnabled: properties.toastDeliverySystemEnabled,
                    deliveryModeEnabled: properties.deliveryModeEnabled,
                    processingGiftCardsViaStripe: properties.processingGiftCardsViaStripe,
                    posVersion: properties.posVersion,
                    isToastNow: properties.isToastNow,
                    isSelfService: properties.isSelfService,
                    isEcomm: properties.isEcomm,
                    isPosRemote: properties.isPosRemote,
                    isPosPortalEnabled: properties.isPosPortalEnabled,
                    onlineOrderingMenuAdded: properties["Online Ordering Menu Added"],
                    onlineOrderingHoursSet: properties["Online Ordering Hours Set"],
                    orderAndPayEnabled: properties.orderAndPayEnabled,
                    prepStationsAdded: properties.prepStationsAdded
                }
            });
        }
    }
});