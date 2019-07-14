
    // We inject the extension id so the deep injected script has the ability to send messages back to the extension

    var setVariablesScript = document.createElement("script");
    setVariablesScript.text = "var extensionid = \"" + chrome.runtime.id + "\";";
    setVariablesScript.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(setVariablesScript);

    // We inject the domscript that does the actual cleaning. We need to inject it into the reddit DOM, because otherwise
    // the MutationObserver will not work, as extensions normally get access to a shadow DOM

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL("js/domscript.js");
    script.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(script);