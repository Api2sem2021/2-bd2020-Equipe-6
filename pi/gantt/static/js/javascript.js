/*WINDOW.ONLOAD*/


// window.onload = carregaGantt;

/*/////////////*/

/*CADASTRO DE PROJETOS*/////////////////////////////

function clicaProjeto() {

    codProjeto = document.getElementById("codProjeto").value;
    codProjetoAtual = document.getElementById("codProjeto").value;

    if (vetor_projeto.length >= 1) {
        codProjeto = vetor_projeto.length;
        document.getElementById("codProjeto").value = codProjeto;
        habilitaRecuoCodProjeto();

    } else {
        document.getElementById("codProjeto").value = codProjeto;
        desabilitaRecuoCodProjeto();
        desabilitaAvancoCodProjeto();
    }

    dialogCadastro = document.getElementById("abreCadastroProjeto");
    dialogCadastro.showModal();


    desabilitaBtnCancelarProjeto();
    habilitaBtnNovoProjeto();
    desabilitaBtnGravaProjeto();
    buscaValoresProjeto();
    desabilitaAvancoCodProjeto();
    habilitaDesabilitaBtnExcluirProjeto();

}

function buscaValoresProjeto() {

    codAtual = parseInt(document.getElementById("codProjeto").value);


    for (i = 0; i < vetor_projeto.length; i++) {



        if (codAtual === vetor_projeto[i][0]) {
            document.getElementById("nomeProjeto").value = vetor_projeto[i][1];
            document.getElementById("escopo").value = vetor_projeto[i][2];
            document.getElementById("dt_inicioProjeto").value = vetor_projeto[i][3];
            document.getElementById("dt_prazoProjeto").value = vetor_projeto[i][4];
            document.getElementById("corProjeto").value = vetor_projeto[i][5];
        }
    }
}

function recuarCodProjeto() {
    document.getElementById("codProjeto").value = vetor_projeto.length - 1;


    habilitaAvancoCodProjeto();


    buscaValoresProjeto();
}

function avancarCodProjeto() {
    codProjetoAtual = parseInt(document.getElementById("codProjeto").value);

    codProjetoAtual += 1;

    document.getElementById("codProjeto").value = codProjetoAtual;

    if (vetor_projeto.length == document.getElementById("codProjeto").value) {
        desabilitaAvancoCodProjeto();
    }
    habilitaRecuoCodProjeto();
    buscaValoresProjeto();
}

function desabilitaRecuoCodProjeto() {
    document.getElementById("codAnteriorCadasProjeto").disabled = true;
    if (document.getElementById("codAnteriorCadasProjeto").disabled = true) {
        mudaBotao = document.getElementById("codAnteriorCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
    }

}

function desabilitaAvancoCodProjeto() {
    document.getElementById("codPosteriorCadasProjeto").disabled = true;
    if (document.getElementById("codPosteriorCadasProjeto").disabled = true) {
        mudaBotao = document.getElementById("codPosteriorCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaRecuoCodProjeto() {

    if (document.getElementById("codProjeto").value > 1) {
        document.getElementById("codAnteriorCadasProjeto").disabled = false;
        mudaBotao = document.getElementById("codAnteriorCadasProjeto");
        mudaBotao.style.backgroundColor = "#698FEB";

    }
}

function habilitaAvancoCodProjeto() {
    document.getElementById("codPosteriorCadasProjeto").disabled = false;
    mudaBotao = document.getElementById("codPosteriorCadasProjeto");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function fecharCadastroProjeto() {
    dialogCadastro.close();
    limparCamposCadasProjeto();
}

function habilitaBtnCancelarProjeto() {
    document.getElementById("btn_cancelarCadasProjeto").disabled = false;
    mudaBotao = document.getElementById("btn_cancelarCadasProjeto");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarProjeto() {
    document.getElementById("btn_cancelarCadasProjeto").disabled = true;
    if (document.getElementById("btn_cancelarCadasProjeto").disabled = true) {
        mudaBotao = document.getElementById("btn_cancelarCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaCamposProjeto() {
    document.getElementById("nomeProjeto").readOnly = false;
    document.getElementById("escopo").readOnly = false;
    document.getElementById("dt_inicioProjeto").readOnly = false;
    document.getElementById("dt_prazoProjeto").readOnly = false;

    document.getElementById("corProjeto").disabled = false;


}

function desabilitaCamposProjeto() {
    limparCamposCadasProjeto();
    document.getElementById("nomeProjeto").readOnly = true;
    document.getElementById("escopo").readOnly = true;
    document.getElementById("dt_inicioProjeto").readOnly = true;
    document.getElementById("dt_prazoProjeto").readOnly = true;
    document.getElementById("corProjeto").disabled = true;

}

function habilitaBtnNovoProjeto() {
    document.getElementById("btn_novoprojeto").disabled = false;
    mudaBotao = document.getElementById("btn_novoprojeto");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovoProjeto() {
    document.getElementById("btn_novoprojeto").disabled = true;
    if (document.getElementById("btn_novoprojeto").disabled = true) {
        mudaBotao = document.getElementById("btn_novoprojeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaDesabilitaBtnExcluirProjeto() {
    if (document.getElementById("codProjeto").value == 0) {
        document.getElementById("btn_excluirCadasProjeto").disabled = true;
        if (document.getElementById("btn_excluirCadasProjeto").disabled = true) {
            mudaBotao = document.getElementById("btn_excluirCadasProjeto");
            mudaBotao.style.backgroundColor = "gray";
        }

    } else {
        document.getElementById("btn_excluirCadasProjeto").disabled = false;
        mudaBotao = document.getElementById("btn_excluirCadasProjeto");
        mudaBotao.style.backgroundColor = "#698FEB";
    }

}

function desabilitaBtnGravaProjeto() {
    document.getElementById("btn_salvarprojeto").disabled = true;
    if (document.getElementById("btn_salvarprojeto").disabled = true) {
        mudaBotao = document.getElementById("btn_salvarprojeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaBtnGravarProjeto() {
    document.getElementById("btn_salvarprojeto").disabled = false;
    mudaBotao = document.getElementById("btn_salvarprojeto");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasProjeto() {
    document.getElementById("nomeProjeto").value = '';
    document.getElementById("escopo").value = '';
    document.getElementById("dt_prazoProjeto").value = '';
    document.getElementById("dt_inicioProjeto").value = '';

    mudaCor = document.getElementById("corProjeto");
    cor = "#000000";

    mudaCor.value = cor.value;
}

vetor_projeto = [];
vetor_tabelaProjeto = [];

function carregaTabela() {

    document.getElementById("corpoTabelaProjeto").innerHTML = '';

    for (i = 0; i < vetor_tabelaProjeto.length; i++) {
        document.getElementById("corpoTabelaProjeto").innerHTML += vetor_tabelaProjeto[i];

    }

}

function novoProjeto() {

    if (document.getElementById("codProjeto").value === 0) {
        codAnteriorProjeto = parseInt(document.getElementById("codProjeto").value);
        novoCodProjeto = codAnteriorProjeto + 1;
        document.getElementById("codProjeto").value = novoCodProjeto;
    } else {
        document.getElementById("codProjeto").value = parseInt(document.getElementById("codProjeto").value) + 1;

    }

    habilitaCamposProjeto();
    habilitaBtnCancelarProjeto();
    desabilitaBtnNovoProjeto();
    habilitaBtnGravarProjeto();
    desabilitaAvancoCodProjeto();
    desabilitaRecuoCodProjeto();
    limparCamposCadasProjeto();
    carregaTabela();

}

function cancelarCadasProjeto() {
    document.getElementById("codProjeto").value = vetor_projeto.length;

    desabilitaCamposProjeto();

    desabilitaBtnGravaProjeto();
    desabilitaBtnCancelarProjeto();
    habilitaRecuoCodProjeto();
    buscaValoresProjeto();
    habilitaBtnNovoProjeto();
    carregaTabela();
}

function gravarProjeto() {

    codPrj = document.getElementById("codProjeto");
    nomeProjeto = document.getElementById("nomeProjeto");
    escopo = document.getElementById("escopo");
    dt_inicioProjeto = document.getElementById("dt_inicioProjeto");
    dt_prazoProjeto = document.getElementById("dt_prazoProjeto");
    corProjeto = document.getElementById("corProjeto");

    projeto = [codPrj.value, nomeProjeto.value, escopo.value, dt_inicioProjeto.value, dt_prazoProjeto.value, corProjeto.value];

    vetor_projeto.push(projeto);

    linhaTabelaProjeto = ["<tr><td>" + codPrj.value + "</td><td>" + nomeProjeto.value + "</td><td>" + dt_inicioProjeto.value + "</td><td>" + dt_prazoProjeto.value + "</td><td bgcolor=" + corProjeto.value + "></td></tr>"];


    vetor_tabelaProjeto.push(linhaTabelaProjeto);
    carregaTabela();


    jsonCadastroProjeto();

    desabilitaCamposProjeto();
    habilitaBtnNovoProjeto();
    desabilitaBtnGravaProjeto();
    desabilitaBtnCancelarProjeto();
    habilitaRecuoCodProjeto();
    buscaValoresProjeto();
    habilitaDesabilitaBtnExcluirProjeto();


}

function jsonCadastroProjeto() {
    jsonProjeto = [];
    for (i = 0; i < vetor_projeto.length; i++) {
        jsonProjeto.push({
            'codPrj': vetor_projeto[i][0],
            'nomeProjeto': vetor_projeto[i][1],
            'escopo': vetor_projeto[i][2],
            'dt_inicioProjeto': vetor_projeto[i][3],
            'dt_prazoProjeto': vetor_projeto[i][4],
            'corProjeto': vetor_projeto[i][5]
        });
    }
    console.log(jsonProjeto);
}

function excluirCadasProjeto() {
    codAtual = parseInt(document.getElementById("codProjeto").value);

    for (i = 0; i < vetor_projeto.length; i++) {

        if (codAtual == vetor_projeto[i][0]) {

            vetor_projeto.splice([i], 5);

            vetor_tabelaProjeto.splice([i], 1);


        }
        console.log(vetor_projeto);
    }

    carregaTabela();
    document.getElementById("codProjeto").value = vetor_projeto.length;
    buscaValoresProjeto();
    habilitaDesabilitaBtnExcluirProjeto();

    if (document.getElementById("codProjeto").value == 0) {
        limparCamposCadasProjeto();
    }


}

/*///////////////////////////////////////*/


/*CADASTRO DE PESSOAS*///////////////////////////////


function fecharCadastroPessoa() {
    dialogCadastro.close();
    limparCadasPessoa();
}

function limparCadasPessoa() {
    document.getElementById('nomePessoa').value = '';
    document.getElementById('contato').value = '';
}

function clicaPessoas() {

    dialogCadastro = document.getElementById("abreCadastroPessoas");

    document.getElementById("menu_superior").classList.remove("show");
    dialogCadastro.showModal();
}

vetor_pessoa = [];


function gravarPessoa() {


    // document.getElementById("nomePessoa");
    // contato = document.getElementById("contato");
    //
    // pessoa = [nomePessoa.value, contato.value];
    //
    //
    // vetor_pessoa.push(pessoa);

    // linhaTabelaPessoas = "<tr><td>" + nomePessoa.value + "</td><td>" + contato.value + "</td></tr>";

    // document.getElementById("corpoTabelaPessoas").innerHTML += linhaTabelaPessoas;

    jsonCadastroPessoa();
}

function jsonCadastroPessoa() {
    jsonPessoas = [];
    for (i = 0; i < vetor_pessoa.length; i++) {
        jsonPessoas.push({
            'nomePessoa': vetor_pessoa[i][0],
            'contato': vetor_pessoa[i][1]
        });
    }
    console.log(jsonPessoas);
}


/*/////////////////////////////////////////////////*/

/*CADASTRO DE TAREFAS*/////////////////////////////

function clicaTarefa() {
    codTarefa = 0;
    codTarefaAtual = 0;

    if (vetor_tarefa.length > 1) {
        codTarefa = vetor_tarefa.length;
        document.getElementById("codTarefa").value = codTarefa;
        habilitaRecuoCodTarefa();

    } else {
        document.getElementById("codTarefa").value = codTarefa;
        desabilitaRecuoCodTarefa();
        desabilitaAvancoCodTarefa();
    }

    dialogCadastro = document.getElementById("abreCadastroTarefa");
    dialogCadastro.showModal();


    desabilitaBtnCancelarTarefa();
    habilitaBtnNovaTarefa();
    desabilitaBtnGravaTarefa();
    buscaValoresTarefa();
    carregaDatalistProjetos();
    carregaDataListInterdepedencia()
    desabilitaAvancoCodTarefa();
    habilitaDesabilitaBtnExcluirTarefa();

}

function carregaDatalistProjetos() {

    document.getElementById("listaProjetos").innerHTML = '';

    for (i = 0; i < vetor_projeto.length; i++) {

        document.getElementById("listaProjetos").innerHTML += "<option value='" + vetor_projeto[i][1] + "'>";


    }

}

function carregaDataListInterdepedencia() {

    document.getElementById("listaInterdependencia").innerHTML = '';

    if (vetor_tarefa.length == 0) {
        document.getElementById("listaInterdependencia").innerHTML += "<option value=' '>";
    }
    for (i = 0; i < vetor_tarefa.length; i++) {

        document.getElementById("listaInterdependencia").innerHTML += "<option value='" + vetor_tarefa[i][1] + "'>";


    }


}

function buscaValoresTarefa() {

    codTarefaAtual = parseInt(document.getElementById("codTarefa").value);

    selecionaNomeProjeto = '';


    for (i = 0; i < vetor_tarefa.length; i++) {

        if (codTarefaAtual == vetor_tarefa[i][0]) {
            document.getElementById("nomeTarefa").value = vetor_tarefa[i][1];
            document.getElementById("dt_inicioTarefa").value = vetor_tarefa[i][2];
            document.getElementById("dt_finalTarefa").value = vetor_tarefa[i][3];
            document.getElementById("dt_prazoTarefa").value = vetor_tarefa[i][4];
            document.getElementById("interdependencia").value = vetor_tarefa[i][5];
            document.getElementById("entregavel").value = vetor_tarefa[i][6];


            for (x = 0; x < vetor_projeto.length; x++) {

                if (vetor_tarefa[i][7] == vetor_projeto[x][0]) {
                    selecionaNomeProjeto = vetor_projeto[x][1];

                }

            }

            document.getElementById("selecionaProjeto").value = selecionaNomeProjeto;


        }
    }
}

function recuarCodTarefa() {
    document.getElementById("codTarefa").value = vetor_tarefa.length - 1;


    habilitaAvancoCodTarefa();

    if (document.getElementById("codTarefa").value == 1) {
        desabilitaRecuoCodTarefa();
    }
    buscaValoresTarefa();
}

function avancarCodTarefa() {
    codTarefaAtual = parseInt(document.getElementById("codTarefa").value);

    codTarefaAtual += 1;

    document.getElementById("codTarefa").value = codTarefaAtual;

    if (vetor_tarefa.length == document.getElementById("codTarefa").value) {
        desabilitaAvancoCodTarefa();
    }
    habilitaRecuoCodTarefa();
    buscaValoresTarefa();
}

function desabilitaRecuoCodTarefa() {
    document.getElementById("codAnteriorCadasTarefa").disabled = true;
    if (document.getElementById("codAnteriorCadasTarefa").disabled = true) {
        mudaBotao = document.getElementById("codAnteriorCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
    }

}

function desabilitaAvancoCodTarefa() {
    document.getElementById("codPosteriorCadasTarefa").disabled = true;
    if (document.getElementById("codPosteriorCadasTarefa").disabled = true) {
        mudaBotao = document.getElementById("codPosteriorCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaRecuoCodTarefa() {

    if (document.getElementById("codTarefa").value > 1) {
        document.getElementById("codAnteriorCadasTarefa").disabled = false;
        mudaBotao = document.getElementById("codAnteriorCadasTarefa");
        mudaBotao.style.backgroundColor = "#698FEB";

    }
}

function habilitaAvancoCodTarefa() {
    document.getElementById("codPosteriorCadasTarefa").disabled = false;
    mudaBotao = document.getElementById("codPosteriorCadasTarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function fecharCadastroTarefa() {
    dialogCadastro.close();
    limparCadasTarefa();
}

function habilitaBtnCancelarTarefa() {
    document.getElementById("btn_cancelarCadasTarefa").disabled = false;
    mudaBotao = document.getElementById("btn_cancelarCadasTarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarTarefa() {
    document.getElementById("btn_cancelarCadasTarefa").disabled = true;
    if (document.getElementById("btn_cancelarCadasTarefa").disabled = true) {
        mudaBotao = document.getElementById("btn_cancelarCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaCamposTarefa() {
    document.getElementById("selecionaProjeto").disabled = false;
    document.getElementById("interdependencia").disabled = false;
    document.getElementById("nomeTarefa").readOnly = false;
    document.getElementById("dt_inicioTarefa").readOnly = false;
    document.getElementById("dt_finalTarefa").readOnly = false;
    document.getElementById("dt_prazoTarefa").readOnly = false;
    document.getElementById("entregavel").disabled = false;
}

function desabilitaCamposTarefa() {
    limparCamposCadasTarefa();
    document.getElementById("selecionaProjeto").disabled = true;
    document.getElementById("interdependencia").disabled = true;
    document.getElementById("nomeTarefa").readOnly = true;
    document.getElementById("dt_inicioTarefa").readOnly = true;
    document.getElementById("dt_finalTarefa").readOnly = true;
    document.getElementById("dt_prazoTarefa").readOnly = true;
    document.getElementById("entregavel").disabled = true;

}

function habilitaBtnNovaTarefa() {
    document.getElementById("btn_novatarefa").disabled = false;
    mudaBotao = document.getElementById("btn_novatarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovaTarefa() {
    document.getElementById("btn_novatarefa").disabled = true;
    if (document.getElementById("btn_novatarefa").disabled = true) {
        mudaBotao = document.getElementById("btn_novatarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function desabilitaBtnGravaTarefa() {
    document.getElementById("btn_salvartarefa").disabled = true;
    if (document.getElementById("btn_salvartarefa").disabled = true) {
        mudaBotao = document.getElementById("btn_salvartarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaBtnGravarTarefa() {
    document.getElementById("btn_salvartarefa").disabled = false;
    mudaBotao = document.getElementById("btn_salvartarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasTarefa() {
    document.getElementById("selecionaProjeto").value = '';
    document.getElementById("interdependencia").value = '';
    document.getElementById("nomeTarefa").value = '';
    document.getElementById("dt_inicioTarefa").value = '';
    document.getElementById("dt_finalTarefa").value = '';
    document.getElementById("dt_prazoTarefa").value = '';


}

function habilitaDesabilitaBtnExcluirTarefa() {
    if (document.getElementById("codTarefa").value == 0) {
        document.getElementById("btn_excluirCadasTarefa").disabled = true;
        if (document.getElementById("btn_excluirCadasTarefa").disabled = true) {
            mudaBotao = document.getElementById("btn_excluirCadasTarefa");
            mudaBotao.style.backgroundColor = "gray";
        }

    } else {
        document.getElementById("btn_excluirCadasTarefa").disabled = false;
        mudaBotao = document.getElementById("btn_excluirCadasTarefa");
        mudaBotao.style.backgroundColor = "#698FEB";
    }

}

vetor_tarefa = [];

function novaTarefa() {

    // if (vetor_projeto.length == 0) {
    //
    //     alert("Ainda não há projeto cadastrado!")
    // } else {

        if (document.getElementById("codTarefa").value == 0) {
            codAnteriorTarefa = parseInt(document.getElementById("codTarefa").value);
            novoCodTarefa = codAnteriorTarefa + 1;
            document.getElementById("codTarefa").value = novoCodTarefa;
        } else {
            document.getElementById("codTarefa").value = vetor_tarefa.length + 1;
        }

        habilitaCamposTarefa();
        habilitaBtnCancelarTarefa();
        desabilitaBtnNovaTarefa();
        habilitaBtnGravarTarefa();
        desabilitaAvancoCodTarefa();
        desabilitaRecuoCodTarefa();
        limparCamposCadasTarefa();


    // }
}

function cancelarCadasTarefa() {
    document.getElementById("codTarefa").value = vetor_tarefa.length;

    desabilitaCamposTarefa();

    desabilitaBtnGravaTarefa();
    desabilitaBtnCancelarTarefa();
    habilitaRecuoCodTarefa();
    buscaValoresTarefa();
    habilitaBtnNovaTarefa();

}

function gravarTarefa() {
    codProjetoSelecionado = '';
    trf_id = document.getElementById("codTarefa");
    selecionaProjeto = document.getElementById("selecionaProjeto").value;


    for (i = 0; i < vetor_projeto.length; i++) {

        if (selecionaProjeto == vetor_projeto[i][1]) {
            fk_prj_id = vetor_projeto[i][0];
        }

    }

    trf_interdependencia = document.getElementById("interdependencia");
    trf_nometarefa = document.getElementById("nomeTarefa");
    trf_datainicial = document.getElementById("dt_inicioTarefa");
    trf_datafinal = document.getElementById("dt_finalTarefa");
    trf_prazo = document.getElementById("dt_prazoTarefa");
    trf_entregavel = document.getElementById("entregavel");

    tarefa = [trf_id.value, trf_nometarefa.value, trf_datainicial.value, trf_datafinal.value, trf_prazo.value, trf_interdependencia.value, trf_entregavel.value, fk_prj_id];

    vetor_tarefa.push(tarefa);
    console.log(vetor_tarefa);


    jsonCadastroTarefa();
    desabilitaCamposTarefa();
    habilitaBtnNovaTarefa();
    desabilitaBtnGravaTarefa();
    desabilitaBtnCancelarTarefa();
    habilitaRecuoCodTarefa();
    buscaValoresTarefa();
    habilitaDesabilitaBtnExcluirTarefa();
    carregaDataListInterdepedencia();
}

function jsonCadastroTarefa() {
    jsonTarefa = [];
    for (i = 0; i < vetor_tarefa.length; i++) {
        jsonTarefa.push({
            'trf_id': vetor_tarefa[i][0],
            'trf_nometarefa': vetor_tarefa[i][1],
            'trf_datainicial': vetor_tarefa[i][2],
            'trf_datafinal': vetor_tarefa[i][3],
            'trf_prazo': vetor_tarefa[i][4],
            'trf_interdependencia': vetor_tarefa[i][5],
            'trf_entregavel': vetor_tarefa[i][6],
            'fk_prj_id': vetor_tarefa[i][7]
        });
    }
    console.log(jsonTarefa);
}

function excluirCadasTarefa() {
    codAtual = parseInt(document.getElementById("codTarefa").value);

    for (i = 0; i < vetor_tarefa.length; i++) {

        if (codAtual == vetor_tarefa[i][0]) {

            vetor_tarefa.splice([i], 8);


        }

    }


    document.getElementById("codTarefa").value = vetor_tarefa.length;
    buscaValoresTarefa();

    habilitaDesabilitaBtnExcluirTarefa();
    if (document.getElementById("codTarefa").value == 0) {
        limparCamposCadasTarefa();
    }


}

/*///////////////////////////////////////*/

/*DISTRIBUIÇÃO DE PESSOAS AOS PROJETOS*///////////////////////////////


function distribuiPessoas() {
    /*
    codDistribuicao = 0;
    codDistribuicaoAtual = 0;
    
    if(vetor_distribuicao.length > 1){
        codDistribuicao = vetor_distribuicao.length;
        document.getElementById("codDistribuicao").value = codDistribuicao;
        habilitaRecuoCodDistribuicao();
        
    }
    else
    {
        document.getElementById("codDistribuicao").value = codDistribuicao;
        desabilitaRecuoCodDistribuicao();
        desabilitaAvancoCodDistribuicao();
    }*/

    dialogCadastro = document.getElementById("distribuiPessoas");
    dialogCadastro.showModal();


    desabilitaBtnCancelarDistribuicao();
    habilitaBtnNovaDistribuicao();
    desabilitaBtnGravaDistribuicao();
    buscaValoresDistribuicao();
    carregaDatalistProjetos();
    carregaDataListInterdepedencia()
    desabilitaAvancoCodDistribuicao();
    habilitaDesabilitaBtnExcluirDistribuicao();

}

function fecharDistribuicaoPessoa() {
    dialogCadastro.close();
    limparCadasPessoa();
}


function carregaDatalistProjetos() {

    document.getElementById("listaProjetos").innerHTML = '';

    for (i = 0; i < vetor_projeto.length; i++) {

        document.getElementById("listaProjetos").innerHTML += "<option value='" + vetor_projeto[i][1] + "'>";

    }

}

function carregaDataListTarefas() {

    document.getElementById("listaTarefa").innerHTML = '';

    if (vetor_tarefa.length == 0) {
        document.getElementById("listaTarefa").innerHTML += "<option value=' '>";
    }
    for (i = 0; i < vetor_tarefa.length; i++) {

        document.getElementById("listaTarefa").innerHTML += "<option value='" + vetor_tarefa[i][1] + "'>";
    }
}


/*MENU DROPDOWN BTN_menusuperior*/////////////////////////////

function menuDropdown_menusuperior() {
    document.getElementById("menu_superior").classList.toggle("show");

}

//////////////////////////////////////////////////


/*VISUALIZAÇÃO DO GRÁFICO GANTT*/
window.onload = carregaGantt;
function carregaGantt() {
    tasks = [
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        },
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2020-05-20',
            end: '2020-05-25',
            progress: 20,
            dependencies: 'Task 2, Task 3',
            custom_class: 'bar-milestone' // optional
        }

    ]


    gantt = new Gantt("#gantt", tasks);

    var gantt = new Gantt("#gantt", tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        custom_popup_html: null
    });

}


function copyToClipBoard() {

    var dummy = document.createElement('input'),
    text = document.URL;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();

    document.execCommand('copy');
    alert('Link Copiado')
    document.body.removeChild(dummy);

}



