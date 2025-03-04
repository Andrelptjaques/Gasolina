document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("consumoForm");
    const tabela = document.getElementById("tabelaRegistros");

    if (!form) {
        console.error("Erro: Formulário não encontrado!");
        return;
    }

    // Carrega os registros salvos ao carregar a página
    carregarTabela();

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os valores do formulário
        let km = parseFloat(document.getElementById("Km").value);
        let litros = parseFloat(document.getElementById("litros").value);
        let data = document.getElementById("data").value;
        let valor = parseFloat(document.getElementById("valor").value);

        // Validação para evitar valores vazios
        if (isNaN(km) || isNaN(litros) || isNaN(valor) || !data) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Calcula o consumo médio e o custo por litro
        let consumoMedio = km / litros; 
        let custoPorLitro = valor / litros; 

        // Cria um objeto com os dados
        let abastecimento = {
            km: km,
            litros: litros,
            data: data,
            valor: valor,
            consumoMedio: consumoMedio.toFixed(2),
            custoPorLitro: custoPorLitro.toFixed(2)
        };

        // Recupera dados antigos do LocalStorage ou cria um array vazio
        let registros = JSON.parse(localStorage.getItem("abastecimentos")) || [];

        // Adiciona o novo registro
        registros.push(abastecimento);

        // Salva novamente no LocalStorage
        localStorage.setItem("abastecimentos", JSON.stringify(registros));

        // Exibe mensagem com custo por litro e consumo médio
        alert(
            `Registro salvo com sucesso!\n\n` +
            `Consumo médio: ${consumoMedio.toFixed(2)} km/L\n` +
            `Custo por litro: R$ ${custoPorLitro.toFixed(2)}`
        );

        // Limpa o formulário
        form.reset();

        // Atualiza a tabela dinâmica
        carregarTabela();
    });

    // Função para carregar a tabela com os registros do LocalStorage
    function carregarTabela() {
        if (!tabela) {
            console.error("Erro: Tabela não encontrada!");
            return;
        }

        const tbody = tabela.querySelector("tbody");
        tbody.innerHTML = ""; // Limpa a tabela antes de carregar os dados

        let registros = JSON.parse(localStorage.getItem("abastecimentos")) || [];

        registros.forEach((abastecimento, index) => {
            let row = tbody.insertRow();

            row.innerHTML = `
                <td>${abastecimento.data}</td>
                <td>${abastecimento.km} km</td>
                <td>${abastecimento.litros} L</td>
                <td>R$ ${abastecimento.valor}</td>
                <td>${abastecimento.consumoMedio} km/L</td>
                <td>R$ ${abastecimento.custoPorLitro}</td>
                <td><button onclick="removerRegistro(${index})">Excluir</button></td>
            `;
        });
    }
});

// Função para remover um registro
function removerRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("abastecimentos")) || [];

    // Remove o item do array
    registros.splice(index, 1);

    // Atualiza o LocalStorage
    localStorage.setItem("abastecimentos", JSON.stringify(registros));

    // Recarrega a página para atualizar a tabela
    location.reload();
}
