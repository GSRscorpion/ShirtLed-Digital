const elems = document.querySelectorAll("*")

function tamanhoFonte(op) {
    
    elems.forEach((e) => {
        const estilo = window.getComputedStyle(e, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);

        e.style.fontSize = (op == "aumenta")
            ? (tamanhoAtual + 2) + 'px'
            : (tamanhoAtual - 2) + 'px';
    })

}

// 2. Leitura de Texto (Voz)
  const readSiteBtn = document.getElementById("readSite");
  let isReading = false;

  function stopReading() {
    window.speechSynthesis.cancel();
    isReading = false;
    readSiteBtn.textContent = "🔈 Ouvir Site";
  }

  readSiteBtn?.addEventListener("click", () => {
    if (isReading) {
      stopReading();
      return;
    }

    // Selecionamos os textos principais para não ler códigos ou menus chatos
    const mainContent = document.querySelector("main").innerText;
    const utterance = new SpeechSynthesisUtterance(mainContent);
    
    utterance.lang = "pt-BR";
    utterance.rate = 1.1; // Velocidade levemente mais rápida

    utterance.onstart = () => {
      isReading = true;
      readSiteBtn.textContent = "🛑 Parar Leitura";
    };

    utterance.onend = () => {
      isReading = false;
      readSiteBtn.textContent = "🔈 Ouvir Site";
    };

    window.speechSynthesis.speak(utterance);
  });

  // Interromper leitura se o usuário fechar a aba ou sair
  window.onbeforeunload = () => stopReading();
});
