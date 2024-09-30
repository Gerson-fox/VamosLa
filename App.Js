document.getElementById('goalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const metaMesVol = parseFloat(document.getElementById('metaMesVol').value);
    const metaMesOp = parseFloat(document.getElementById('metaMesOp').value);
    const porcentagemManhaVol = parseFloat(document.getElementById('porcentagemManhaVol').value);
    const porcentagemTardeVol = parseFloat(document.getElementById('porcentagemTardeVol').value);
    const porcentagemNoiteVol = parseFloat(document.getElementById('porcentagemNoiteVol').value);
    const porcentagemManhaOp = parseFloat(document.getElementById('porcentagemManhaOp').value);
    const porcentagemTardeOp = parseFloat(document.getElementById('porcentagemTardeOp').value);
    const porcentagemNoiteOp = parseFloat(document.getElementById('porcentagemNoiteOp').value);
    const diasMes = parseInt(document.getElementById('diasMes').value);
    const diasTrabalhadosManha = parseInt(document.getElementById('diasTrabalhadosManha').value);
    const diasTrabalhadosTarde = parseInt(document.getElementById('diasTrabalhadosTarde').value);
    const diasTrabalhadosNoite = parseInt(document.getElementById('diasTrabalhadosNoite').value);

    if (porcentagemManhaVol + porcentagemTardeVol + porcentagemNoiteVol !== 100 ||
        porcentagemManhaOp + porcentagemTardeOp + porcentagemNoiteOp !== 100 ||
        diasMes < 28 || diasMes > 31 ||
        diasTrabalhadosManha + diasTrabalhadosTarde + diasTrabalhadosNoite > diasMes) {
        alert("Verifique se as porcentagens somam 100%, o número de dias está correto, e os dias trabalhados não excedem o total de dias no mês.");
        return;
    }

    const calcularMeta = (meta, porcentagemManha, porcentagemTarde, porcentagemNoite, dias) => {
        const metaManha = meta * (porcentagemManha / 100);
        const metaTarde = meta * (porcentagemTarde / 100);
        const metaNoite = meta * (porcentagemNoite / 100);

        const operadorManha = metaManha / 2.5;
        const operadorTarde = metaTarde / 2.5;
        const operadorNoite = metaNoite;

        const volDiaManha = operadorManha / dias;
        const volDiaTarde = operadorTarde / dias;
        const volDiaNoite = operadorNoite / dias;

        return {
            volDiaManha,
            volDiaTarde,
            volDiaNoite
        };
    };

    const volume = calcularMeta(metaMesVol, porcentagemManhaVol, porcentagemTardeVol, porcentagemNoiteVol, diasMes);
    const operacao = calcularMeta(metaMesOp, porcentagemManhaOp, porcentagemTardeOp, porcentagemNoiteOp, diasMes);

    const calculoMetaMes = (diasTrabalhadosManha * volume.volDiaManha) + (diasTrabalhadosTarde * volume.volDiaTarde) + (diasTrabalhadosNoite * volume.volDiaNoite);
    const calculoOperadorMes = (diasTrabalhadosManha * operacao.volDiaManha) + (diasTrabalhadosTarde * operacao.volDiaTarde) + (diasTrabalhadosNoite * operacao.volDiaNoite);

    document.getElementById('resultados').innerHTML = `
        <h2>Resultados:</h2>
        <p>Meta de Volume do Mês: ${calculoMetaMes.toFixed(2)}</p>
        <p>Volume por Dia: ${(calculoMetaMes / diasMes).toFixed(2)}</p>
        <p>Meta de Operação do Mês: ${calculoOperadorMes.toFixed(2)}</p>
        <p>Operação por Dia: ${(calculoOperadorMes / diasMes).toFixed(2)}</p>
    `;
});
