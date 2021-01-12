$(document).ready(function() {
    var script = document.createElement('script');
    script.id = 'glance-cobrowse';
    script.type = 'text/javascript';
    script.src = 'https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group=20835&site=production';
    script.charset = 'UTF-8";'
    script.dataset.groupid = '20835';
    script.dataset.site = 'production';
    script.onload = function() {
        $('.screen-share-button').click(function() {
            GLANCE.Cobrowse.Visitor.startSession();
        });
    }
    document.head.appendChild(script);
});