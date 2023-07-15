
const inicio = document.getElementById('inicio')
const fim = document.getElementById('fim')
const operador = document.getElementById('operador')
const button = document.getElementById('button')
const tbody = document.getElementById('tbody')
const td = document.createElement('td')
const table = document.getElementById('tab')

function buscarTransferenciasPorPeriodoTransferencia() {
    fetch('http://localhost:8080/transferencia/listar-por-periodo-transferencia?dataInicial=' + inicio.value + '&dataFinal=' + fim.value)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild)
            }
            response.forEach(element => {
                const tr = document.createElement('tr')
                tr.innerHTML = '<td>' + element.dataTransferencia + '</td>' + '<td>' + 'R$ ' + element.valor + '</td>' + '<td>' + element.tipo + '</td>' + '<td>' + element.nomeOperadorTransacao + '</td>'
                tbody.appendChild(tr)
            });
        })
}


function buscarTransferenciasPorNomeOperador() {
    fetch('http://localhost:8080/transferencia/listar-por-nome-operador?nomeOperadorTransacao=' + operador.value)
        .then(response => response.json())
        .then(response => {
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild)
            }
            response.forEach(element => {
                const tr = document.createElement('tr')
                tr.innerHTML = '<td>' + element.dataTransferencia + '</td>' + '<td>' + 'R$ ' + element.valor + '</td>' + '<td>' + element.tipo + '</td>' + '<td>' + element.nomeOperadorTransacao + '</td>'
                tbody.appendChild(tr)
            });
        })
}

function buscarTransferenciasPorPeriodoTransferenciaMaisNomeOperador() {
    fetch('http://localhost:8080/transferencia/listar-por-periodo-transferencia-e-nome-operador?dataInicial=' + inicio.value + '&dataFinal=' + fim.value + '&nomeOperador=' + operador.value)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild)
            }
            response.forEach(element => {
                const tr = document.createElement('tr')
                tr.innerHTML = '<td>' + element.dataTransferencia + '</td>' + '<td>' + 'R$ ' + element.valor + '</td>' + '<td>' + element.tipo + '</td>' + '<td>' + element.nomeOperadorTransacao + '</td>'
                tbody.appendChild(tr)
            });
        })
}

function buscarResultado() {
    if (operador.value.length == 0 && inicio.value.length > 0 && fim.value.length > 0) {
        buscarTransferenciasPorPeriodoTransferencia()
    }
    else if (inicio.value.length == 0 && fim.value.length == 0) {
        buscarTransferenciasPorNomeOperador()
    }

    else if (operador.value.length > 0 && inicio.value.length > 0 && fim.value.length > 0) {
        buscarTransferenciasPorPeriodoTransferenciaMaisNomeOperador()
    }
}

button.addEventListener('click', buscarResultado)