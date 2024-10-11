let currentSpeed = 1;

document.getElementById('startButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getSelectedText"}, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          alert("Erro ao obter o texto selecionado. Por favor, recarregue a página e tente novamente.");
          return;
        }
        if (response && response.text) {
          chrome.runtime.sendMessage({
            action: "readText",
            text: response.text,
            speed: currentSpeed
          });
        } else {
          alert("Nenhum texto selecionado!");
        }
      });
    } else {
      alert("Não foi possível acessar a aba atual.");
    }
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  chrome.tts.stop();
});

document.getElementById('speedSlider').addEventListener('input', (event) => {
  currentSpeed = parseFloat(event.target.value);
});
