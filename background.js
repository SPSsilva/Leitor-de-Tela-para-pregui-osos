chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "readSelectedText",
      title: "Ler texto selecionado",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "readSelectedText") {
      chrome.tabs.sendMessage(tab.id, { action: "getSelectedText" })
        .then(response => {
          if (response && response.text) {
            readText(response.text); // Potential error here, consider handling
          }
        })
        .catch(error => {
          console.error("Error getting selected text:", error);
        });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "readText") {
      readText(request.text, request.speed);
      return true;
    } else if (request.action === "contentScriptLoaded") {
      console.log("Content script loaded in tab:", sender.tab.id);
    }
  });
  
  function readText(text, speed = 1) {
    chrome.tts.speak(text, {
      rate: speed,
      onEvent: function(event) {
        if (event.type === 'end' || event.type === 'interrupted' || event.type === 'cancelled') {
          // You can add any cleanup or notification logic here
        }
      }
    });
  }