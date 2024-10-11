function getSelectedText() {
    return window.getSelection().toString();
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedText") {
      sendResponse({text: getSelectedText()});
    }
    return true; // Keeps the message channel open for asynchronous responses
  });
  
  // Notify that the content script is loaded
  chrome.runtime.sendMessage({action: "contentScriptLoaded"});