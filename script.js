// algoritmo

// 1. pegar os valores dos inputs OK
// 2. calcular imc -> valorIMC OK
// 3. gerar a classificação IMC OK
// 4. organizar os dados do usuário para salvar na lista e gerar a data de cadastro OK
// 5. inserir o usuário na lista (salvar no localStorage) OK
// 6. função para carregar os usuários (localStorage), chamar ao carregar a página 
// 7. renderizar o conteúdo da tabela com os usuários cadastrados
// 8. botão para limpar os registros

function calcular(event){
    event.preventDefault()
    // previne de recarregar a página e apagar o console

    console.log("Foi executada a função calcular.")

    let usuario = receberValores()
    // 1.
    // váriavel de usuário: recebe os valores que o usuário inseriu e que chamou a função receberValores()

    let imcCalculado = calcularImc(usuario.altura,usuario.peso)
    // 2.
    // variável do imc calculado de acordo com a função calcularImc, a estrutura do calcularImc especifica os parâmetros que devem ser usados

    let classificacaoImc = classificarImc(imcCalculado)
    // 3.
    // variável da classificação do imc de acordo com a função classificarImc, o parâmetro especifica qual valor vai ser usado na variável

    usuario = organizarDados(usuario, imcCalculado, classificacaoImc)
    // 4.
    // a variável usuário vai receber todos os valores que estão em organizar Dados

    cadastrarUsuario(usuario)
    // 5.

    carregarUsuarios()
    // 6.

}

function receberValores(){
    // 1. pegar os valores dos inputs

    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value
    // value: receber o valor/ trim: trata a entrada do usuário

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido        
    }
    // objeto com os dados do usuario (conjunto de dados)

    console.log(dadosUsuario)
    return dadosUsuario
    // return: retorna ("salva") o que está na variável para utilizar posteriormente
}

function calcularImc(altura, peso){
    // 2. calcular imc -> valorIMC

    let imc = peso / (altura * altura)
    // cálculo do imc

    console.log(imc)
    return imc
    // return: retorna ("salva") o que está na variável para utilizar posteriormente

}

function classificarImc(imc){
    // 3. gerar a classificação IMC

    /* pc. TABELA DE CLASSIFICAÇÃO
    Resultado               Situação
    Abaixo de 18.5          Abaixo do peso
    Entre 18.5 e 24.99      Peso normal     
    Entre 25 e 29.99        Sobrepeso     
    Acima de 30             Obesidade   
    */

    if (imc < 18.5) {
        console.log("Abaixo do peso")
        return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25){
        console.log("Peso normal")
        return "Peso normal"
    } else if (imc >= 25 && imc < 30){
        console.log("Sobrepeso")
        return "Sobrepeso"
    } else {
        console.log("Obesidade")
        return "Obesidade"
    }
}

function organizarDados(dadosUsuario, valorImc, classificacaoImc){
    // 4. organizar os dados do usuário para salvar na lista e gerar a data de cadastro

    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', {timeStyle: 'long', dateStyle: 'short'}).format(Date.now())
    // INTL: formata em formatos internacinais / DateTimeFormat: formata a data e hora

    console.log(dataHoraAtual)

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        // pega todos os dados desse objeto e junta com os seguintes
        imc: valorImc,
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado
    // retorna os dados completos e atualizados para inserir na tabela
}

function cadastrarUsuario(dadosUsuario){
    // 5.

    let listaUsuarios = []
    // array para dados do usuário na lista

    if(localStorage.getItem("usuariosCadastrados") != null){
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    // se houver uma lista de usuários no localStorage, carregar isso para a variável listaUsuarios.
    // COM ISSO, EVITAMOS O ERRO DE ARMAZENAR APENAS UM VALOR
    // JSON.parse converte novamente para OBJETO

    listaUsuarios.push(dadosUsuario)
    // adiciona o usuário na lista de usuários

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
    // salva a listaUsuarios no localStorage / JSON.stringify: converte o valor js (objeto) para o valor json (para string)
    

}

function carregarUsuarios(){
    // 6.

    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    // está carregando a lista para o array listaCarregada

    if(listaCarregada.length === 0){
        // SE NÃO TIVER USUÁRIO NA LISTA...
        let tabela = document.getElementById("corpo-tabela")
        // pega o id corpo-tabela no html e torna a variável tabela no js

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado 😥</td>
        <tr> `
        // se não tiver nenhum usuário cadastrado, mostrar mensagem na tabela
        // colspan faz o conteúdo ocupar todas as células da linha da tabela (como o mesclar do excel)
    } else {
        // SE TEM USUÁRIO, montar conteúdo da tabela
        montarTabela(listaCarregada)
        // monta a tabela de acordo com a LISTA CARREGADA
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())
// chamando a função sempre que a página é recarregada
// ouvinte de eventos
// (parâmetro: quando acontece algo, chamar tal função)
// isso tb chama a função que adiciona o texto "nenhum usuário cadastrado" à tabela SE não tiver nada na lista no localStorage

function montarTabela(listaUsuarios){
    // 7.
    
    let tabela = document.getElementById("corpo-tabela")
    // pega o id corpo-tabela no html e torna a variável tabela no js

    let template = ""
    listaUsuarios.forEach(usuario =>{
        // PARA CADA USUÁRIO CADASTRADO, VAI INSERIR MAIS UM EMBAIXO DO ANTERIOR
        // na listaUsuarios paraCada usuário cadastrado => irá fazer...
        template+= `<tr> 
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="altura">${usuario.altura}</td>
        <td data-cell="peso">${usuario.peso}</td>
        <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
        <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
        <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        `
    })

    tabela.innerHTML = template
    // dentro da tabela irá inserir um HTML, no caso, o que está no template

}

function limparRegistros(){
    // 8.

    localStorage.removeItem("usuariosCadastrados")
    location.reload()
}