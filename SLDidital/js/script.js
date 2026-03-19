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
