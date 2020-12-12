function menu() {
    $.ajax({
        url: "dados/menu.xml",
        success: function(xml) {
            $(xml).find("pratos").each(function() {
                var link = '<a href=" ' + $(this).attr("link") + '">' + '<br>' + $(this).text() + '</a><br>';

                $("#menu").append(link);
            });
        },

    });
};

function pratos() {
    $.getJSON("dados/pratos.json", function(data) {
        var produtos = data.produtos;
        produtos.forEach(produto => {
            const nome = produto.nome;
            const valor = produto.valor;
            const descricao = produto.descrição;


            var div = document.createElement('DIV');

            var button = '<button onclick="AddCarrinho(\''+ nome +'\','+ valor +')">Adicionar</button><hr>';
            var textoProduto = nome + "<br>" + "R$" + valor + "<br>" +"<hr>" + descricao + "<br>" 



            div.innerHTML += button;
            div.innerHTML += textoProduto;

            console.log(div)

            $('#pratos').append(div);
        });

    });
};
function AddCarrinho(prato, valor){
    localStorage.setItem(prato, valor);
    alert("O prato "+ prato + " foi adicionado.")

}
function exibirCarrinho(){
    var produtos = localStorage.length;

    if (produtos == 0){
        $('main').append('<h2>Carrinho vazio!</h2>');
    }
    else{
        var totalPreco = 0
        var tabela = '<table id="resultados"><tr><td> Prato: </td><td>Valor: </td><tr>';
        for (var x = 0; x < produtos; x++){
            var nomePrato = localStorage.key(x)
            var valorPrato = parseFloat(localStorage.getItem(nomePrato));
            totalPreco = totalPreco + valorPrato
            tabela += '<tr><td>' + nomePrato + '</td><td>'+ valorPrato.toFixed(2) + '</td></tr>';
        }
       
        tabela +='</table>'

        $('main').append(tabela);
        var ptotal = '<p> Valor a ser pago: ' + totalPreco + '</p>'
        $('main').append(ptotal);
    }
}
