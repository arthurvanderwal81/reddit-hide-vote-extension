
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status == "complete")
    {
        if (tab.url.indexOf("reddit.com") !== -1)
        {
            chrome.tabs.executeScript(tab.id, { file: "js/deep_inject_script.js" });
        }
    }
});

function onMessageListener(request, sender, sendResponse)
{
    if (request.feedback)
    {
        console.log("Received feedback: ", request.feedback);

        sendResponse( { received: true } );
    }
}

chrome.runtime.onMessage.addListener(onMessageListener);
chrome.runtime.onMessageExternal.addListener(onMessageListener);