class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const menu = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    const formasDePagamento = ["dinheiro", "credito", "debito"];

    if (!formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let somaTotal = 0;

    const itensExtras = {};
    const itensPrincipais = {};

    for (const item of itens) {
      const [codigoProduto, quantidade] = item.split(",");

      if (!menu[codigoProduto]) {
        return "Item inválido!";
      }
      if (Number(quantidade) === 0) return "Quantidade inválida!";

      if (codigoProduto !== "chantily" && codigoProduto !== "queijo") {
        itensPrincipais[codigoProduto] =
          (itensPrincipais[codigoProduto] || 0) + parseInt(quantidade);
      } else {
        itensExtras[codigoProduto] =
          (itensExtras[codigoProduto] || 0) + parseInt(quantidade);
      }
    }

    for (const codigoProduto in itensExtras) {
      if (
        !itensPrincipais[
          codigoProduto
            .replace("chantily", "cafe")
            .replace("queijo", "sanduiche")
        ]
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
      somaTotal += menu[codigoProduto].valor * itensExtras[codigoProduto];
    }

    for (const codigoProduto in itensPrincipais) {
      somaTotal += menu[codigoProduto].valor * itensPrincipais[codigoProduto];
    }

    if (metodoDePagamento === "dinheiro") {
      somaTotal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      somaTotal *= 1.03;
    }
    const somaTotalFormatado = somaTotal.toFixed(2).replace(".", ",");
    return `R$ ${somaTotalFormatado}`;
  }
}

new CaixaDaLanchonete().calcularValorDaCompra("credito", [
  "cafe,1",
  "sanduiche,1",
  "queijo,1",
]);

export { CaixaDaLanchonete };
