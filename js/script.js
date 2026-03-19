//Tamanho da Fonte

const elems = document.querySelectorAll("p, h1, h2, h3, h4, a, li, label, span"); // Seleciona apenas elementos de texto

function tamanhoFonte(op) {
    elems.forEach((e) => {
        const estilo = window.getComputedStyle(e, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        let novoTamanho;

        if (op == "aumenta") {
            // Limite máximo de 30px para não quebrar o layout
            novoTamanho = (tamanhoAtual < 30) ? (tamanhoAtual + 1) : tamanhoAtual;
        } else {
            // Limite mínimo de 12px para manter a leitura
            novoTamanho = (tamanhoAtual > 12) ? (tamanhoAtual - 1) : tamanhoAtual;
        }

        e.style.fontSize = novoTamanho + 'px';
    });
}

// 2. Leitura de Texto (Voz)
// ===== LEITURA DE TEXTO =====
const readSiteBtn = document.getElementById("readSite");
let isReading = false;

// carregar vozes
let voices = [];

function carregarVozes() {
    voices = speechSynthesis.getVoices();
}

speechSynthesis.onvoiceschanged = carregarVozes;

function stopReading() {
    speechSynthesis.cancel();
    isReading = false;
    if (readSiteBtn) {
        readSiteBtn.textContent = "🔈 Ouvir Site";
    }
}

if (readSiteBtn) {
    readSiteBtn.addEventListener("click", () => {

        if (isReading) {
            stopReading();
            return;
        }

        // pega textos principais
        const textos = document.querySelectorAll("main h1, main h2, main p");

        let conteudo = "";

        textos.forEach(el => {
            conteudo += el.innerText + " ";
        });

        if (!conteudo) {
            alert("Nenhum conteúdo para ler.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(conteudo);

        // selecionar voz em português
       const vozBR = voices.find(voz => 
        voz.lang === "pt-BR" && voz.name.toLowerCase().includes("google"));
        if (vozBR) {
            utterance.voice = vozBR;
        }

        // configuração natural
        utterance.lang = "pt-BR";
        utterance.rate = 0.85;  // mais lento = mais claro
        utterance.pitch = 1;
        utterance.volume = 1;

        conteudo = conteudo
        .replace(/WhatsApp/g, "Uatsap")
        .replace(/Streetwear/g, "Strit uér")
        .replace(/Drop/g, "Drope")
        .replace(/Brand/g, "Brend");

        utterance.onstart = () => {
            isReading = true;
            readSiteBtn.textContent = "🛑 Parar Leitura";
        };

        utterance.onend = () => {
            isReading = false;
            readSiteBtn.textContent = "🔈 Ouvir Site";
        };

        speechSynthesis.speak(utterance);
    });
}

// parar ao sair
window.addEventListener("beforeunload", stopReading);



//Alto Contraste
function toggleContraste() {
    document.body.classList.toggle("contraste");
}


function toggleContraste() {
    document.body.classList.toggle("contraste");

    if (document.body.classList.contains("contraste")) {
        localStorage.setItem("contraste", "on");
    } else {
        localStorage.setItem("contraste", "off");
    }
}

// manter ativo ao recarregar
window.onload = () => {
    if (localStorage.getItem("contraste") === "on") {
        document.body.classList.add("contraste");
    }
};

