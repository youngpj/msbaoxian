function trackEvent(page, event,optionsObj={}) {
    _hmt.push(['_trackEvent', page, 'event', event])
    let eventopt= Object.assign({ page,event,}, optionsObj)
    v.$acMonitor.trackEvent(eventopt);
}


function trackPageview(page) {
    _hmt.push(['_trackPageview', page]);
    v.$acMonitor.trackEvent({
        page
    });
}

var install = function(Vue, options){
    Vue.prototype.$trackEvent = trackEvent;
    Vue.prototype.$trackPageview = trackPageview;
}

export default {
    install: install
};