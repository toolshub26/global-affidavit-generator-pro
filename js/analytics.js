function trackEvent(eventName) {
    let events = JSON.parse(
        localStorage.getItem("affidavit_events") || "[]"
    );

    events.push({
        event: eventName,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "affidavit_events",
        JSON.stringify(events)
    );
}

function getAnalytics() {
    return JSON.parse(
        localStorage.getItem("affidavit_events") || "[]"
    );
}
