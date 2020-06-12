/*WINDOW.ONLOAD*/

window.onload = carregaTabelaProjeto_add_prj_menu_esquerdo;


/*/////////////*/

/*ADQUIRE O CSRF_TOKEN DO CACHE DO NAVEGADOR*/
function getCookie(name) {
    cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       cookies = document.cookie.split(';');
       for ( i = 0; i < cookies.length; i++) {
            cookie = cookies[i].trim();
           // Does this cookie string begin with the name we want?
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}
csrftoken = getCookie('csrftoken');
/////////////////////////////////////////////

/*CADASTRO DE PESSOAS*///////////////////////////////

/*GET AND POST - API*////////////////////////////////////////////////////////////////////



function preencheCamposCadasPessoa(json){
    document.getElementById("nomePessoa").value = json.pes_nome; 
    document.getElementById("contato").value = json.pes_contato;
}

function getPessoa(value){
    codPessoa = document.getElementById("codPessoa").value;
    
    urlGetPessoa = 'http://localhost:8000/person/'+codPessoa+'/?format=json'
    
    xhrGet = new XMLHttpRequest();
    xhrGet.open('GET', urlGetPessoa, true);

    xhrGet.onreadystatechange = function(){
        if(xhrGet.readyState == 4){
            if(xhrGet.status == 200){
                preencheCamposCadasPessoa(JSON.parse(xhrGet.responseText));     
            }
        }      
    }
    xhrGet.send();
}

function postPessoa(){
   
    nomePessoa = document.getElementById("nomePessoa").value;
    contato = document.getElementById("contato").value;
    

     xhrPost = new XMLHttpRequest();
    urlPostPessoa = 'http://localhost:8000/person/?format=json';
    xhrPost.open("POST", urlPostPessoa, true);
    xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPost.setRequestHeader("X-CSRFToken", csrftoken)
    xhrPost.send(JSON.stringify({ 'pes_nome': nomePessoa, 'pes_contato': contato }));

    carregaTabelaPessoa();
    desabilitaCamposPessoa();
    habilitaBtnNovaPessoa();
    desabilitaBtnGravaPessoa();
    desabilitaBtnCancelarPessoa();
    habilitaRecuoCodPessoa();
    desabilitaHabilitaBtnExcluirPessoa();
   
    
  
    
}

function putPessoa(){
    if(document.getElementById("nomePessoa").readOnly == true){
        habilitaCamposPessoa();
        mudaBotao =  document.getElementById("btn_atualizarCadasPessoa");
        mudaBotao.style.backgroundColor = "green";

    }else{
        codPessoa = document.getElementById("codPessoa").value;
    
    urlPutPessoa = 'http://localhost:8000/person/'+codPessoa+'/?format=json'

    nomePessoa = document.getElementById("nomePessoa").value;
    contato = document.getElementById("contato").value;

    xhr = new XMLHttpRequest();
   
    xhr.open("PUT", urlPutPessoa, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(JSON.stringify({'pes_nome': nomePessoa, 'pes_contato': contato }));

    
    mudaBotao =  document.getElementById("btn_atualizarCadasPessoa");
    mudaBotao.style.backgroundColor = "#698FEB";
    getPessoa();
    desabilitaCamposPessoa();
    
    }

    carregaTabelaPessoa();
    
}

function deletePessoa(){
    
    codPessoa = document.getElementById("codPessoa").value;
    urlDeletePessoa = 'http://localhost:8000/person/'+codPessoa+'/?format=json'

    nomePessoa = document.getElementById("nomePessoa").value;
    contato = document.getElementById("contato").value;

    xhrDelete = new XMLHttpRequest();
   
    xhrDelete.open("DELETE", urlDeletePessoa, true);
    xhrDelete.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrDelete.setRequestHeader("X-CSRFToken", csrftoken)
    xhrDelete.send(JSON.stringify({'pes_nome': nomePessoa, 'pes_contato': contato }));
    recuarCodPessoa();
    

    carregaTabelaPessoa();
    
    desabilitaHabilitaBtnExcluirPessoa();
    

}
///////////////////////FINISH: GET - POST - PUT - DELETE //////////////////////////////////////////////////////////
function clicaPessoas(){
    
    document.getElementById("menu_superior").classList.remove("show");   
    codPessoaAtual = 0;
    
    dialogCadastro = document.getElementById("abreCadastroPessoas");

    dialogCadastro.showModal();
    
    

    urlAbrePessoa = 'http://localhost:8000/person/?format=json'

    xhrAbrePessoa = new XMLHttpRequest();
    xhrAbrePessoa.open('GET', urlAbrePessoa, true);
    
    xhrAbrePessoa.onreadystatechange = function(){
        jsonCadasPessoa = [];
        maiorvalor = 0;
        if(xhrAbrePessoa.readyState == 4){
            if(xhrAbrePessoa.status == 200){
                json = (JSON.parse(xhrAbrePessoa.responseText));

                for(i = 0; i<json.length;i++){
                   if(json[i]['pes_id'] > maiorvalor ){
                        maiorvalor = json[i]['pes_id'];
                    }              
                }
                
                if(maiorvalor >= 1){
                    document.getElementById("codPessoa").value = maiorvalor;
                    habilitaRecuoCodPessoa();
                    getPessoa();
                }else{
                    document.getElementById("codPessoa").value = 0;
                    desabilitaRecuoCodPessoa();
                    desabilitaAvancoCodPessoa();
                }
            }

            
        }
        
    }
    
    
    xhrAbrePessoa.send();
   
   

    habilitaAvancoCodPessoa();
    habilitaRecuoCodPessoa();
    desabilitaBtnCancelarPessoa();
    habilitaBtnNovaPessoa();
    desabilitaBtnGravaPessoa();
    desabilitaAvancoCodPessoa();
    desabilitaHabilitaBtnExcluirPessoa();
    carregaTabelaPessoa();
  
}

function novaPessoa(){
    codPessoa = parseInt(document.getElementById("codPessoa").value);
    if(codPessoa == 0){
        codPessoa = 1;
        document.getElementById("codPessoa").value = codPessoa;
    }else{
    urlGetPessoa = 'http://localhost:8000/person/?format=json'
     
    vetor_pessoa = [];
    xhrNovaPessoa = new XMLHttpRequest();
    xhrNovaPessoa.open('GET', urlGetPessoa, true);
    xhrNovaPessoa.onreadystatechange = function(){     
        if(xhrNovaPessoa.readyState == 4){
            if(xhrNovaPessoa.status == 200){
                json = (JSON.parse(xhrNovaPessoa.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_pessoa.push(json[i]['pes_id']);
                    
                }
                vetor_pessoa.reverse();
                codPessoa = vetor_pessoa[0] + 1;
              }
        }
        document.getElementById("codPessoa").value = codPessoa;
    }
    }
  
    
    habilitaCamposPessoa();
    habilitaBtnCancelarPessoa();
    desabilitaBtnNovaPessoa();
    habilitaBtnGravarPessoa();
    desabilitaAvancoCodPessoa();
    desabilitaRecuoCodPessoa();
    limparCamposCadasPessoa();
    desabilitaBtnExcluirPessoa();
    desabilitaBtnAtualizarPessoa();
    xhrNovaPessoa.send();
}

function cancelarCadasPessoa(){
    codPessoa = parseInt(document.getElementById("codPessoa").value);
    document.getElementById("codPessoa").value = codPessoa - 1;
    
    desabilitaCamposPessoa();
    
    desabilitaBtnGravaPessoa();
    desabilitaBtnCancelarPessoa();
    habilitaRecuoCodPessoa();
    getPessoa();
    habilitaBtnNovaPessoa();
    desabilitaHabilitaBtnExcluirPessoa();
    habilitaBtnAtualizarPessoa();
}

function recuarCodPessoa(){ 
    urlRecuaPessoa = 'http://localhost:8000/person/?format=json'
    
    codPessoa = parseInt(document.getElementById("codPessoa").value);
    vetor_pessoa = [];
    xhrRecuarCod = new XMLHttpRequest();
    xhrRecuarCod.open('GET', urlRecuaPessoa, true);
    xhrRecuarCod.onreadystatechange = function(){     
        if(xhrRecuarCod.readyState == 4){
            if(xhrRecuarCod.status == 200){
                json = (JSON.parse(xhrRecuarCod.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_pessoa.push(json[i]['pes_id']);
                    
                }
                 
                 menorvalor = vetor_pessoa.length;
                 for(i=0;i<vetor_pessoa.length;i++){

                    if(codPessoa == vetor_pessoa[i]){
                    codPessoa = vetor_pessoa[i-1];
                 }
                 if(vetor_pessoa[i] < menorvalor){
                    menorvalor = vetor_pessoa[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codPessoa").value = codPessoa;   
                if(codPessoa == menorvalor){
                    desabilitaRecuoCodPessoa();
                }
                habilitaAvancoCodPessoa();
                getPessoa();
                }
            }
        }
    

        xhrRecuarCod.send();

}

function avancarCodPessoa(){ 
    urlAvancaPessoa = 'http://localhost:8000/person/?format=json'
    
    codPessoa = parseInt(document.getElementById("codPessoa").value);
    vetor_pessoa = [];
    xhrAvancarPessoa = new XMLHttpRequest();
    xhrAvancarPessoa.open('GET', urlAvancaPessoa, true);
    xhr.onreadystatechange = function(){     
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                json = (JSON.parse(xhr.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_pessoa.push(json[i]['pes_id']);
                    
                }
                
                vetor_pessoa.reverse();
                 maiorvalor = 0;
                 for(i=0;i<vetor_pessoa.length;i++){
                    
                    if(codPessoa == vetor_pessoa[i]){
                    codPessoa = vetor_pessoa[i-1];
                 }
                 if(vetor_pessoa[i] > maiorvalor){
                    maiorvalor = vetor_pessoa[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codPessoa").value = codPessoa;   
                if(codPessoa == maiorvalor){
                    desabilitaAvancoCodPessoa();
                }
                habilitaRecuoCodPessoa();
                getPessoa();
                }
            }
        }
    

xhr.send();

}


function desabilitaBtnAtualizarPessoa(){
    document.getElementById("btn_atualizarCadasPessoa").disabled = true;
 
   mudaBotao =  document.getElementById("btn_atualizarCadasPessoa");
    mudaBotao.style.backgroundColor = "gray";


}

function habilitaBtnAtualizarPessoa(){
   
 
        document.getElementById("btn_atualizarCadasPessoa").disabled = false;
     mudaBotao =  document.getElementById("btn_atualizarCadasPessoa");
     mudaBotao.style.backgroundColor = "#698FEB";
      
 
 }


function desabilitaRecuoCodPessoa(){
        document.getElementById("codAnteriorCadasPessoa").disabled = true;
     
       mudaBotao =  document.getElementById("codAnteriorCadasPessoa");
        mudaBotao.style.backgroundColor = "gray";

    
}

function desabilitaAvancoCodPessoa(){
  document.getElementById("codPosteriorCadasPessoa").disabled = true;
     if(document.getElementById("codPosteriorCadasPessoa").disabled = true){
       mudaBotao =  document.getElementById("codPosteriorCadasPessoa");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaRecuoCodPessoa(){
   
   if(document.getElementById("codPessoa").value > 1){ 
       document.getElementById("codAnteriorCadasPessoa").disabled = false;
    mudaBotao =  document.getElementById("codAnteriorCadasPessoa");
    mudaBotao.style.backgroundColor = "#698FEB";
     
}
}

function habilitaAvancoCodPessoa(){
  document.getElementById("codPosteriorCadasPessoa").disabled = false;
    mudaBotao =  document.getElementById("codPosteriorCadasPessoa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function fecharCadastroPessoa(){
    dialogCadastro.close();
    limparCamposCadasPessoa();
}

function habilitaBtnCancelarPessoa(){
    document.getElementById("btn_cancelarCadasPessoa").disabled = false;
    mudaBotao =  document.getElementById("btn_cancelarCadasPessoa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarPessoa(){
    document.getElementById("btn_cancelarCadasPessoa").disabled = true;
        mudaBotao =  document.getElementById("btn_cancelarCadasPessoa");
        mudaBotao.style.backgroundColor = "gray";

}

function habilitaCamposPessoa(){
     document.getElementById("nomePessoa").readOnly = false;
    document.getElementById("contato").readOnly = false;
  
}

function desabilitaCamposPessoa(){
    limparCamposCadasPessoa();
    document.getElementById("nomePessoa").readOnly = true;
    document.getElementById("contato").readOnly = true;
    
    
}

function habilitaBtnNovaPessoa(){
     document.getElementById("btn_novapessoa").disabled = false;
    mudaBotao =  document.getElementById("btn_novapessoa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovaPessoa(){
    document.getElementById("btn_novapessoa").disabled = true;

       mudaBotao =  document.getElementById("btn_novapessoa");
        mudaBotao.style.backgroundColor = "gray";

}

function desabilitaBtnExcluirPessoa(){
    document.getElementById("btn_excluirCadasPessoa").disabled = true;
    mudaBotao =  document.getElementById("btn_excluirCadasPessoa");
     mudaBotao.style.backgroundColor = "gray";
}

function desabilitaHabilitaBtnExcluirPessoa(){
    if(document.getElementById("codPessoa").value == ""+0+""){
        document.getElementById("btn_excluirCadasPessoa").disabled = true;
    mudaBotao =  document.getElementById("btn_excluirCadasPessoa");
     mudaBotao.style.backgroundColor = "gray";
    }else{
        document.getElementById("btn_excluirCadasPessoa").disabled = false;
    mudaBotao =  document.getElementById("btn_excluirCadasPessoa");
        mudaBotao.style.backgroundColor = "#698FEB";
    }
}


function desabilitaBtnGravaPessoa(){
  
    document.getElementById("btn_salvarpessoa").disabled = true;
    
       mudaBotao =  document.getElementById("btn_salvarpessoa");
        mudaBotao.style.backgroundColor = "gray";
   
}

function habilitaBtnGravarPessoa(){
    document.getElementById("btn_salvarpessoa").disabled = false;
    mudaBotao =  document.getElementById("btn_salvarpessoa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasPessoa(){
    document.getElementById("nomePessoa").value = '';
    document.getElementById("contato").value = '';
    
}

function fecharCadastroPessoa(){
    dialogCadastro.close();
    limparCadasPessoa();
}

function limparCadasPessoa(){
    document.getElementById('nomePessoa').value = '';
    document.getElementById('contato').value = '';
}


function carregaTabelaPessoa(){
    url = 'http://localhost:8000/person/?format=json'
    
    codPessoa = parseInt(document.getElementById("codPessoa").value);
    vetor_TabelaCadasPessoa = [];
    xhrTable = new XMLHttpRequest();
    xhrTable.open('GET', url, true);
    
    xhrTable.onreadystatechange = function(){     
        if(xhrTable.readyState == 4){
            if(xhrTable.status == 200){
                json = (JSON.parse(xhrTable.responseText));
                for(i = 0;i<json.length;i++){

                    linhaTabelaPessoas = "<tr><td>"+json[i]['pes_id']+"</td><td>"+json[i]['pes_nome']+"</td><td>"+json[i]['pes_contato']+"</td></tr>";
    
                    vetor_TabelaCadasPessoa.push(linhaTabelaPessoas);
                }
             

            }
           
        }
        getPessoa();
        document.getElementById("corpoTabelaPessoas").innerHTML = '';
    
    for(i = 0; i < vetor_TabelaCadasPessoa.length;i++){
         document.getElementById("corpoTabelaPessoas").innerHTML += vetor_TabelaCadasPessoa[i];
        
    }    
    }
    getPessoa();
    xhrTable.send();
    

    
}




/*/////////////////////////////////////////////////*/


/*CADASTRO DE PROJETOS*/////////////////////////////

/*GET AND POST - API*////////////////////////////////////////////////////////////////////
vetor_prjcadastrados = [];
vetor_trfcadastrados = [];


function preencheCamposCadasProjeto(json){
    document.getElementById("nomeProjeto").value = json.prj_nome; 
    document.getElementById("escopo").value = json.prj_escopo;
    document.getElementById("dt_inicioProjeto").value = json.prj_datainicio;
    document.getElementById("dt_prazoProjeto").value = json.prj_prazoentrega;
    document.getElementById("corProjeto").value = json.prj_color;

}

function getProjeto(){
    codProjeto = document.getElementById("codProjeto").value;
    
    urlGetProjeto = 'http://localhost:8000/project/'+codProjeto+'/?format=json'
    
    xhrGetProjeto = new XMLHttpRequest();
    
    xhrGetProjeto.open('GET', urlGetProjeto, true);
    xhrGetProjeto.onreadystatechange = function(){
        if(xhrGetProjeto.readyState == 4){
            if(xhrGetProjeto.status == 200){
                preencheCamposCadasProjeto(JSON.parse(xhrGetProjeto.responseText));     
                
            }
        }      
    }
    xhrGetProjeto.send();

}

function postProjeto(){
    codProjeto = document.getElementById("codProjeto").value;
    nomeProjeto = document.getElementById("nomeProjeto").value;
    escopo = document.getElementById("escopo").value;
    dt_inicio = document.getElementById("dt_inicioProjeto").value;
    dt_prazo = document.getElementById("dt_prazoProjeto").value;
    cor = document.getElementById("corProjeto").value;
    
    

    xhrPostProjeto = new XMLHttpRequest();
    urlPostProjeto = 'http://localhost:8000/project/?format=json';
    xhrPostProjeto.open("POST", urlPostProjeto, true);
    xhrPostProjeto.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPostProjeto.setRequestHeader("X-CSRFToken", csrftoken)
    xhrPostProjeto.send(JSON.stringify({
         'prj_nome': nomeProjeto, 
         'prj_escopo': escopo, 
         'prj_datainicio': dt_inicio,
         'prj_prazoentrega': dt_prazo,
         'prj_color': cor
        }));
    
    
        carregaTabelaProjeto_add_prj_menu_esquerdo();
        getProjeto();

        
        desabilitaCamposProjeto();
        habilitaBtnNovoProjeto();
        desabilitaBtnGravaProjeto();
        desabilitaBtnCancelarProjeto();
        habilitaRecuoCodProjeto();
        desabilitaHabilitaBtnExcluirProjeto();
        habilitaBtnAtualizarProjeto();

        

     
}

function putProjeto(){
    if(document.getElementById("nomeProjeto").readOnly == true){
        habilitaCamposProjeto();
        mudaBotao =  document.getElementById("btn_atualizarCadasProjeto");
        mudaBotao.style.backgroundColor = "green";

    }else{
        codProjeto = document.getElementById("codProjeto").value;
    
    urlPutProjeto = 'http://localhost:8000/project/'+codProjeto+'/?format=json'

    nomeProjeto = document.getElementById("nomeProjeto").value;
    escopo = document.getElementById("escopo").value;
    dt_inicio = document.getElementById("dt_inicioProjeto").value;
    dt_prazo = document.getElementById("dt_prazoProjeto").value;
    cor = document.getElementById("corProjeto").value;
    

    xhrPutProjeto = new XMLHttpRequest();
   
    xhrPutProjeto.open("PUT", urlPutProjeto, true);
    xhrPutProjeto.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPutProjeto.setRequestHeader("X-CSRFToken", csrftoken)
    xhrPutProjeto.send(JSON.stringify({
        'prj_nome': nomeProjeto, 
        'prj_escopo': escopo, 
        'prj_datainicio': dt_inicio,
        'prj_prazoentrega': dt_prazo,
        'prj_color': cor
       }));

    mudaBotao =  document.getElementById("btn_atualizarCadasProjeto");
    mudaBotao.style.backgroundColor = "#698FEB";
    
    desabilitaCamposProjeto();
    
    }

    carregaTabelaProjeto_add_prj_menu_esquerdo();
}

function deleteProjeto(){
    recuarCodProjeto();
    codProjeto = document.getElementById("codProjeto").value;
    urlDeleteProjeto = 'http://localhost:8000/project/'+codProjeto+'/?format=json'

    nomeProjeto = document.getElementById("nomeProjeto").value;
    escopo = document.getElementById("escopo").value;
    dt_inicio = document.getElementById("dt_inicioProjeto").value;
    dt_prazo = document.getElementById("dt_prazoProjeto").value;
    cor = document.getElementById("corProjeto").value;

    xhrDeleteProjeto = new XMLHttpRequest();
   
    xhrDeleteProjeto.open("DELETE", urlDeleteProjeto, true);
    xhrDeleteProjeto.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrDeleteProjeto.setRequestHeader("X-CSRFToken", csrftoken)
    xhrDeleteProjeto.send(JSON.stringify({
        'prj_nome': nomeProjeto, 
        'prj_escopo': escopo, 
        'prj_datainicio': dt_inicio,
        'prj_prazoentrega': dt_prazo,
        'prj_color': cor
       }));

       
       
       desabilitaHabilitaBtnExcluirProjeto();

       for(i = 0; i< vetor_prjcadastrados.length;i++){
           if(codProjeto == vetor_prjcadastrados[i][0]){
                      
            vetor_prjcadastrados.splice([i],1);
           }
       }
       if(document.getElementById("codProjeto").value == 0){
        limparCamposCadasProjeto();
        habilitaBtnAtualizarProjeto();
    }  
      
}
///////////////////////FINISH: GET - POST - PUT - DELETE //////////////////////////////////////////////////////////


function clicaProjeto(){
    
    dialogCadastro = document.getElementById("abreCadastroProjeto");

    dialogCadastro.showModal();
    
    

    urlAbreProjeto = 'http://localhost:8000/project/?format=json';

    xhrAbreProjeto = new XMLHttpRequest();
    xhrAbreProjeto.open('GET', urlAbreProjeto, true);
    
    xhrAbreProjeto.onreadystatechange = function(){
        
        maiorvalor = 0;
        if(xhrAbreProjeto.readyState == 4){
            if(xhrAbreProjeto.status == 200){
                json = (JSON.parse(xhrAbreProjeto.responseText));

                for(i = 0; i<json.length;i++){
                   if(json[i]['prj_id'] > maiorvalor ){
                        maiorvalor = json[i]['prj_id'];
                    }              
                }
                
                if(maiorvalor >= 1){
                   
                    document.getElementById("codProjeto").value = maiorvalor;
                    habilitaRecuoCodProjeto();
                    getProjeto();
                }else{
                    document.getElementById("codProjeto").value = 0;
                    desabilitaRecuoCodProjeto();
                    desabilitaAvancoCodProjeto();
                }
            }

            
        }
        
    }
    xhrAbreProjeto.send();
    
    carregaTabelaProjeto_add_prj_menu_esquerdo();
    
   
   

    habilitaAvancoCodProjeto();
    habilitaRecuoCodProjeto();
    desabilitaBtnCancelarProjeto();
    habilitaBtnNovoProjeto();
    desabilitaBtnGravaProjeto();
    desabilitaAvancoCodProjeto();
    desabilitaHabilitaBtnExcluirProjeto();
    

    }

function novoProjeto(){
    codProjeto = parseInt(document.getElementById("codProjeto").value);
    if(codProjeto == 0){
        codProjeto = 1;
        document.getElementById("codProjeto").value = codProjeto;
    }else{
    urlGetProjeto = 'http://localhost:8000/project/?format=json'
     
    vetor_projeto = [];
    xhrNovoProjeto = new XMLHttpRequest();
    xhrNovoProjeto.open('GET', urlGetProjeto, true);
    xhrNovoProjeto.onreadystatechange = function(){     
        if(xhrNovoProjeto.readyState == 4){
            if(xhrNovoProjeto.status == 200){
                json = (JSON.parse(xhrNovoProjeto.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_projeto.push(json[i]['prj_id']);
                    
                }
                vetor_projeto.reverse();
                codProjeto = vetor_projeto[0] + 1;
              }
        }
        document.getElementById("codProjeto").value = codProjeto;
    }
    }
  
    
    habilitaCamposProjeto();
    habilitaBtnCancelarProjeto();
    desabilitaBtnNovoProjeto();
    habilitaBtnGravarProjeto();
    desabilitaAvancoCodProjeto();
    desabilitaRecuoCodProjeto();
    limparCamposCadasProjeto();
    desabilitaHabilitaBtnExcluirProjeto();
    desabilitaBtnAtualizarProjeto();
    xhrNovoProjeto.send();
        
        
    }


function cancelarCadasProjeto(){
    codProjeto = parseInt(document.getElementById("codProjeto").value);
    document.getElementById("codProjeto").value = codProjeto - 1;
    getProjeto();
    desabilitaCamposProjeto();
    
    desabilitaBtnGravaProjeto();
    desabilitaBtnCancelarProjeto();
    habilitaRecuoCodProjeto();
    
    habilitaBtnNovoProjeto();
    desabilitaHabilitaBtnExcluirProjeto();
    habilitaBtnAtualizarProjeto();
}

function recuarCodProjeto(){
    urlRecuaProjeto = 'http://localhost:8000/project/?format=json'
    
    codProjeto = parseInt(document.getElementById("codProjeto").value);
    
    vetor_projeto = [];
    xhrRecuarCod = new XMLHttpRequest();
    xhrRecuarCod.open('GET', urlRecuaProjeto, true);
    xhrRecuarCod.onreadystatechange = function(){     
        if(xhrRecuarCod.readyState == 4){
            if(xhrRecuarCod.status == 200){
                json = (JSON.parse(xhrRecuarCod.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_projeto.push(json[i]['prj_id']);
                    
                }
                 
                 menorvalor = vetor_projeto.length;
                 for(i=0;i<vetor_projeto.length;i++){

                    if(codProjeto == vetor_projeto[i]){
                    codProjeto = vetor_projeto[i-1];
                 }
                 if(vetor_projeto[i] < menorvalor){
                    menorvalor = vetor_projeto[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codProjeto").value = codProjeto;   
                if(codProjeto == menorvalor){
                    desabilitaRecuoCodProjeto();
                }
                habilitaAvancoCodProjeto();
                carregaTabelaProjeto_add_prj_menu_esquerdo();
                }
            }
        }
    

        xhrRecuarCod.send();

}

function avancarCodProjeto(){
    urlAvancaProjeto = 'http://localhost:8000/project/?format=json'
    
    codProjeto = parseInt(document.getElementById("codProjeto").value);
    vetor_projeto = [];
    xhrAvancarProjeto = new XMLHttpRequest();
    xhrAvancarProjeto.open('GET', urlAvancaProjeto, true);
    xhrAvancarProjeto.onreadystatechange = function(){     
        if(xhrAvancarProjeto.readyState == 4){
            if(xhrAvancarProjeto.status == 200){
                json = (JSON.parse(xhrAvancarProjeto.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_projeto.push(json[i]['prj_id']);
                    
                }
                
                vetor_projeto.reverse();
                 maiorvalor = 0;
                 for(i=0;i<vetor_projeto.length;i++){
                    
                    if(codProjeto == vetor_projeto[i]){
                    codProjeto = vetor_projeto[i-1];
                 }
                 if(vetor_projeto[i] > maiorvalor){
                    maiorvalor = vetor_projeto[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codProjeto").value = codProjeto;   
                if(codProjeto == maiorvalor){
                    desabilitaAvancoCodProjeto();
                }
                habilitaRecuoCodProjeto();
                getProjeto();
                }
            }
        }
    
        
        xhrAvancarProjeto.send();

}

function desabilitaBtnAtualizarProjeto(){
    document.getElementById("btn_atualizarCadasProjeto").disabled = true;
 
   mudaBotao =  document.getElementById("btn_atualizarCadasProjeto");
    mudaBotao.style.backgroundColor = "gray";
}

function habilitaBtnAtualizarProjeto(){
        document.getElementById("btn_atualizarCadasProjeto").disabled = false;
     mudaBotao =  document.getElementById("btn_atualizarCadasProjeto");
     mudaBotao.style.backgroundColor = "#698FEB";
      
 
 }


function desabilitaRecuoCodProjeto(){
        document.getElementById("codAnteriorCadasProjeto").disabled = true;
     if(document.getElementById("codAnteriorCadasProjeto").disabled = true){
       mudaBotao =  document.getElementById("codAnteriorCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
}
    
}

function desabilitaAvancoCodProjeto(){
  document.getElementById("codPosteriorCadasProjeto").disabled = true;
     if(document.getElementById("codPosteriorCadasProjeto").disabled = true){
       mudaBotao =  document.getElementById("codPosteriorCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaRecuoCodProjeto(){
   
   if(document.getElementById("codProjeto").value > 1){ document.getElementById("codAnteriorCadasProjeto").disabled = false;
    mudaBotao =  document.getElementById("codAnteriorCadasProjeto");
    mudaBotao.style.backgroundColor = "#698FEB";
     
}
}

function habilitaAvancoCodProjeto(){
  document.getElementById("codPosteriorCadasProjeto").disabled = false;
    mudaBotao =  document.getElementById("codPosteriorCadasProjeto");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function fecharCadastroProjeto(){
    dialogCadastro.close();
    limparCamposCadasProjeto();
}

function habilitaBtnCancelarProjeto(){
    document.getElementById("btn_cancelarCadasProjeto").disabled = false;
    mudaBotao =  document.getElementById("btn_cancelarCadasProjeto");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarProjeto(){
    document.getElementById("btn_cancelarCadasProjeto").disabled = true;
     if(document.getElementById("btn_cancelarCadasProjeto").disabled = true){
       mudaBotao =  document.getElementById("btn_cancelarCadasProjeto");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaCamposProjeto(){
     document.getElementById("nomeProjeto").readOnly = false;
    document.getElementById("escopo").readOnly = false;
    document.getElementById("dt_inicioProjeto").readOnly = false;
    document.getElementById("dt_prazoProjeto").readOnly = false;
    
    document.getElementById("corProjeto").disabled = false;
    
    
}

function desabilitaCamposProjeto(){
    limparCamposCadasProjeto();
    document.getElementById("nomeProjeto").readOnly = true;
    document.getElementById("escopo").readOnly = true;
    document.getElementById("dt_inicioProjeto").readOnly = true;
    document.getElementById("dt_prazoProjeto").readOnly = true;  
    document.getElementById("corProjeto").disabled = true;
    
}

function habilitaBtnNovoProjeto(){
     document.getElementById("btn_novoprojeto").disabled = false;
    mudaBotao =  document.getElementById("btn_novoprojeto");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovoProjeto(){
    document.getElementById("btn_novoprojeto").disabled = true;
    if(document.getElementById("btn_novoprojeto").disabled = true){
       mudaBotao =  document.getElementById("btn_novoprojeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function desabilitaHabilitaBtnExcluirProjeto(){
    if(document.getElementById("codProjeto").value == ""+0+""){
        document.getElementById("btn_excluirCadasProjeto").disabled = true;
    mudaBotao =  document.getElementById("btn_excluirCadasProjeto");
     mudaBotao.style.backgroundColor = "gray";
    }else{
        document.getElementById("btn_excluirCadasProjeto").disabled = false;
    mudaBotao =  document.getElementById("btn_excluirCadasProjeto");
        mudaBotao.style.backgroundColor = "#698FEB";
    }

}

function desabilitaBtnGravaProjeto(){
    document.getElementById("btn_salvarprojeto").disabled = true;
    if(document.getElementById("btn_salvarprojeto").disabled = true){
       mudaBotao =  document.getElementById("btn_salvarprojeto");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaBtnGravarProjeto(){
    document.getElementById("btn_salvarprojeto").disabled = false;
    mudaBotao =  document.getElementById("btn_salvarprojeto");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasProjeto(){
    document.getElementById("nomeProjeto").value = '';
    document.getElementById("escopo").value = '';
    document.getElementById("dt_prazoProjeto").value = '';
    document.getElementById("dt_inicioProjeto").value = '';
    
   mudaCor = document.getElementById("corProjeto");
    cor = "#000000";
    
    mudaCor.value = cor.value;
}

function carregaTabelaProjeto_add_prj_menu_esquerdo(){
    urlTabelaProjeto = 'http://localhost:8000/project/?format=json'
    
    codProjeto = parseInt(document.getElementById("codProjeto").value);
    vetor_tabelaProjeto = [];
    xhrTabelaProjeto = new XMLHttpRequest();
    xhrTabelaProjeto.open('GET', urlTabelaProjeto, true);
    
    xhrTabelaProjeto.onreadystatechange = function(){     
        if(xhrTabelaProjeto.readyState == 4){
            if(xhrTabelaProjeto.status == 200){
                json = (JSON.parse(xhrTabelaProjeto.responseText));
                for(i = 0;i<json.length;i++){

                    linhaTabelaProjeto = ["<tr><td>"+json[i]['prj_id']+"</td><td>"+json[i]['prj_nome']+"</td><td>"+json[i]['prj_datainicio']+"</td><td>"+json[i]['prj_prazoentrega']+"</td><td bgcolor="+json[i]['prj_color']+"></td></tr>"];
                    vetor_tabelaProjeto.push(linhaTabelaProjeto); 

                    /*CARREGA VETOR PARA CADASTRAR PROJETO NO MENU LATERAL ESQUERDO */
                    add_btn_prj_menu_esquerdo = ["<button id='btn_prj"+json[i]['prj_id']+"' onClick='expandeTrf(this.id)' class='btn_shadow1' style='background-color:"+json[i]['prj_color']+"' >"+json[i]['prj_nome']+"</button>"]; //CRIA VALOR PARA ADICIONAR NA DIV "prj_cadastrados"
                    vetor_prjcadastrados.push(add_btn_prj_menu_esquerdo);//ADICIONA LINHA PARA CRIAÇÃO DO BTN DE PROJETO
                    ///////////////////
                
                }
                
                /*ENVIA PROJETO AO MENU LATERAL ESQUERDO*/
                document.getElementById("prj_cadastrados").innerHTML = ''; //ZERA DIV PARA NOVOS BUTTONS
                for(i = 0; i<vetor_prjcadastrados.length;i++){ // VARREDURA DO VETOR CRIADO COM OS INSERTS PARA A DIV
                document.getElementById("prj_cadastrados").innerHTML +=  vetor_prjcadastrados[i];//ADICIONA OS INSERTS NA DIV 
                    
                novaDivTrf = document.createElement("div");//CRIA NOVA DIV PARA RECEBER TAREFAS CORRESPONDENTES AO PROJETO CRIADO
                    
                novaDivTrf.id = "trf_cadastradas_prj"+(i+1)+"";//NOME DA DIV PARA RECEBER AS TAREFAS
                   
                document.getElementById("prj_cadastrados").appendChild(novaDivTrf);//ADICIONA A DIV ABAIXO DO PROJETO CRIADO
                //////////////////////////////////    

                }
    
     
             

            }
           
        }
        getProjeto();
        document.getElementById("corpoTabelaProjeto").innerHTML = '';
    
    for(i = 0; i < vetor_tabelaProjeto.length;i++){
         document.getElementById("corpoTabelaProjeto").innerHTML += vetor_tabelaProjeto[i];
        
    }    
    }
    getProjeto();
    xhrTabelaProjeto.send();
     
    
}
/*EXPANDE TAREFAS MENU CENTRAL ESQUERDO*/

///FUNÇÃO ATRIBUÍDA PARA O BTN GRAVAR TAREFA
function vetorTrfCadastrados(){
    vetor_trfcadastrados = [];
  for(i=0;i<vetor_projeto.length;i++){//VARREDURA NOS PROJETOS CADASTRADOS
       recebeCodPrj = i+1;  //SELECIONA O CODIGO DO PROJETO    
       for(x=0; x<vetor_tarefa.length;x++){ //VARREDURA NAS TAREFAS CADASTRADAS
            if(recebeCodPrj == vetor_tarefa[x][7]){//VALIDA O CODIGO DO PROJETO DO CADASTRO DE PROJETO AO CODIGO DO PROJETO NO CADASTRO DE TAREFA E CRIA UM VETOR PARA INSERIR NA DIV CRIADA.
                
               codTrf = jsonTarefa[x]['trf_id']; //CODIGO DA TAREFA - TABELA TAREFA
               recebeNomeTrf = jsonTarefa[x]['trf_nometarefa']; //NOME DA TAREFA - TABELA TAREFA            
               corProjeto = jsonProjeto[i]['corProjeto']; //COR DO PROJETO - TABELA PROJETO                   
               add_btn_trf_menu_esquerdo = [recebeCodPrj,"<button id='btn_trf"+codTrf+"' onClick='dadosTarefa()' class='btn_shadow3' style='border-color:"+corProjeto+"'>"+recebeNomeTrf+"</button>"]; // CRIA LINHA PARA NOVOS BOTÕES DE TAREFAS, ABAIXO DO PROJETO CORRESPONDENTE
               
               vetor_trfcadastrados.push(add_btn_trf_menu_esquerdo);//ADICIONA NO VETOR AS TAREFAS CADASTRADAS E SEUS RESPECTIVOS BOTÕES, COM O ID DO PROJETO NO ÍNDICE 0                  
           }        
       }    
   }
    console.log(vetor_trfcadastrados);//VERIFICA INTEGRIDADE DO VETOR  
}

///FUNÇÃO ATRIBUÍDA PARA O BTN PROJETO NO MENU LATERAL ESQUERDO

function expandeTrf(nomeBtn){
    divideBtn = nomeBtn.substr(7);//REMOVE E DEIXA APENAS O NÚMERO DE IDENTIFICAÇÃO DO BOTÃO DE CADA TAREFA "btn_trf'num exemplo'"
    
    selecionaDiv = document.getElementById('trf_cadastradas_prj'+divideBtn+'').textContent;//SELECIONA A DIV DE CADA PROJETO E VERIFICA SE TEM CONTEÚDO DENTRO
    if(selecionaDiv == ''){//CASO NÃO TENHA CONTEÚDO
       
        for(i=0;i<vetor_trfcadastrados.length;i++){//FAZ VARREDURA NOS BOTÕES DAS TAREFAS
        
        
        if(divideBtn == vetor_trfcadastrados[i][0]){ //CASO O NÚMERO DE IDENTIFICAÇÃO DO BTN DA TAREFA SEJA IGUAL AO ID DE CADA PROJETO, É ADICIONADO O BOTÃO NA DIV CORRESPONDENTE
            
            document.getElementById('trf_cadastradas_prj'+divideBtn+'').innerHTML += vetor_trfcadastrados[i][1];//ADICIONA OS BOTÕES DAS TAREFAS NAS DIV'S DOS PROJETOS CORRESPONDENTES
        }    
}
   }else{
       document.getElementById('trf_cadastradas_prj'+divideBtn+'').remove() //CASO TENHA CONTEÚDO NA DIV, ELE É ELIMINADO. ISSO FOI FEITO PARA CRIAR O RECUO.
       add_prj_menu_esquerdo();//ADICIONA NOVAMENTE A DIV DO PROJETO
   }
}
/*///////////////////////////////////////////////////////////////////////////////////////*/

/*GET AND POST - API*////////////////////////////////////////////////////////////////////

////DATALIST
function carregaDatalistProjetos(){


    urlGetProjeto = 'http://localhost:8000/project/?format=json';

    xhrCarregaDatalistProjeto = new XMLHttpRequest();
    vetor_DatalistProjetos = [];
    xhrCarregaDatalistProjeto.open("GET", urlGetProjeto, true);
    xhrCarregaDatalistProjeto.onreadystatechange = function(){
        if(xhrCarregaDatalistProjeto.readyState == 4){
            if(xhrCarregaDatalistProjeto.status == 200){
               json = JSON.parse(xhrCarregaDatalistProjeto.responseText);     
               document.getElementById("listaProjetos").innerHTML = '';
                for(i = 0; i<json.length; i++){
                    document.getElementById("listaProjetos").innerHTML += "<option value='"+json[i]['prj_nome']+"'>";
                    
                    linha = [json[i]['prj_id'], json[i]['prj_nome']];
                    vetor_DatalistProjetos.push(linha);
                    output(vetor_DatalistProjetos);
                    
                }
                
               
            }
        }      
    }
    
    xhrCarregaDatalistProjeto.send();
    
 
}

function output(array)
{
   console.log(array);
}

///////////

function preencheCamposCadasTarefa(json){
    document.getElementById("nomeTarefa").value = json.trf_name; 
    document.getElementById("dt_inicioTarefa").value = json.trf_datainicial;
    document.getElementById("dt_finalTarefa").value = json.trf_datafinal;
    document.getElementById("dt_prazoTarefa").value = json.trf_prazo;
    document.getElementById("entregavel").value = json.trf_entregavel;

}

function getTarefa(){
    codTarefa = document.getElementById("codTarefa").value;
    
    urlGetTarefa = 'http://localhost:8000/task/'+codTarefa+'/?format=json'
    
    xhrGetTarefa = new XMLHttpRequest();
    xhrGetTarefa.open('GET', urlGetTarefa, true);
    
    xhrGetTarefa.onreadystatechange = function(){
        if(xhrGetTarefa.readyState == 4){
            if(xhrGetTarefa.status == 200){
                preencheCamposCadasTarefa(JSON.parse(xhrGetTarefa.responseText));     
                
            }
        }      
    }
    xhrGetTarefa.send();
    carregaDatalistProjetos();
}

function postTarefa(){
   nomeTarefa =  document.getElementById("nomeTarefa").value;
   dt_inicioTarefa =  document.getElementById("dt_inicioTarefa").value;
   dt_finalTarefa = document.getElementById("dt_finalTarefa").value;
   dt_prazoTarefa = document.getElementById("dt_prazoTarefa").value;
   entregavel = document.getElementById("entregavel").value;
    
    

    xhrPostTarefa = new XMLHttpRequest();
    urlPostTarefa = 'http://lopostTarefacalhost:8000/task/?format=json';
    xhrPostTarefa.open("POST", urlPostTarefa, true);
    xhrPostTarefa.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPostTarefa.setRequestHeader("X-CSRFToken", csrftoken)
    xhrPostTarefa.send(JSON.stringify({
         'trf_name': nomeTarefa, 
         'trf_datainicial': dt_inicioTarefa, 
         'trf_datafinal': dt_finalTarefa,
         'trf_prazo': dt_prazoTarefa,
         'trf_entregavel': entregavel,
         //'trf_interdependencia': ,
         //'fk_prj_id':
        }));
    
    
        getTarefa();

       
        
        desabilitaCamposTarefa();
        habilitaBtnNovaTarefa();
        desabilitaBtnGravaTarefa();
        desabilitaBtnCancelarTarefa();
        habilitaRecuoCodTarefa();
        desabilitaHabilitaBtnExcluirTarefa();
        habilitaBtnAtualizarTarefa();
   
}

function putTarefa(){
    if(document.getElementById("nomeTarefa").readOnly == true){
        habilitaCamposTarefa();
        mudaBotao =  document.getElementById("btn_atualizarCadasTarefa");
        mudaBotao.style.backgroundColor = "green";

    }else{
        codTarefa = document.getElementById("codTarefa").value;
    
    urlPutTarefa = 'http://localhost:8000/task/'+codTarefa+'/?format=json'

    nomeTarefa =  document.getElementById("nomeTarefa").value;
    dt_inicioTarefa =  document.getElementById("dt_inicioTarefa").value;
    dt_finalTarefa = document.getElementById("dt_finalTarefa").value;
    dt_prazoTarefa = document.getElementById("dt_prazoTarefa").value;
    entregavel = document.getElementById("entregavel").value;
    
    xhrPutTarefa = new XMLHttpRequest();
   
    xhrPutTarefa.open("PUT", xhrPutTarefa, true);
    xhrPutTarefa.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPutTarefa.setRequestHeader("X-CSRFToken", csrftoken)
    xhrPutTarefa.send(JSON.stringify({
        'trf_name': nomeTarefa, 
        'trf_datainicial': dt_inicioTarefa, 
        'trf_datafinal': dt_finalTarefa,
        'trf_prazo': dt_prazoTarefa,
        'trf_entregavel': entregavel,
        //'trf_interdependencia': ,
        //'fk_prj_id':
       }));

    mudaBotao =  document.getElementById("btn_atualizarCadasTarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
    
    desabilitaCamposTarefa();
    
    }

    
}

function deleteTarefa(){
    recuarCodTarefa();
    codTarefa = document.getElementById("codTarefa").value;
    urlDeleteTarefa = 'http://localhost:8000/task/'+codTarefa+'/?format=json'

    nomeTarefa =  document.getElementById("nomeTarefa").value;
    dt_inicioTarefa =  document.getElementById("dt_inicioTarefa").value;
    dt_finalTarefa = document.getElementById("dt_finalTarefa").value;
    dt_prazoTarefa = document.getElementById("dt_prazoTarefa").value;
    entregavel = document.getElementById("entregavel").value;

    xhrDeleteTarefa = new XMLHttpRequest();
   
    xhrDeleteTarefa.open("DELETE", urlDeleteTarefa, true);
    xhrDeleteTarefa.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrDeleteTarefa.setRequestHeader("X-CSRFToken", csrftoken)
    xhrDeleteTarefa.send(JSON.stringify({
        'trf_name': nomeTarefa, 
        'trf_datainicial': dt_inicioTarefa, 
        'trf_datafinal': dt_finalTarefa,
        'trf_prazo': dt_prazoTarefa,
        'trf_entregavel': entregavel,
        //'trf_interdependencia': ,
       // 'fk_prj_id':
       }));

       desabilitaHabilitaBtnExcluirTarefa();

       if(document.getElementById("codProjeto").value == 0){
        limparCamposCadasProjeto();
        habilitaBtnAtualizarProjeto();
    }  
      
}
///////////////////////FINISH: GET - POST - PUT - DELETE //////////////////////////////////////////////////////////



/*CADASTRO DE TAREFAS*/////////////////////////////

vetor_tarefa = [];

function clicaTarefa(){
    dialogCadastro = document.getElementById("abreCadastroTarefa");

    dialogCadastro.showModal();
    
    urlAbreTarefa = 'http://localhost:8000/task/?format=json';

    xhrAbreTarefa = new XMLHttpRequest();
    xhrAbreTarefa.open('GET', urlAbreTarefa, true);
    
    xhrAbreTarefa.onreadystatechange = function(){
        
        maiorvalor = 0;
        if(xhrAbreTarefa.readyState == 4){
            if(xhrAbreTarefa.status == 200){
                json = (JSON.parse(xhrAbreTarefa.responseText));

                for(i = 0; i<json.length;i++){
                   if(json[i]['trf_id'] > maiorvalor ){
                        maiorvalor = json[i]['trf_id'];
                    }              
                }
                
                if(maiorvalor >= 1){
                   
                    document.getElementById("codTarefa").value = maiorvalor;
                    habilitaRecuoCodTarefa();
                    
                }else{
                    document.getElementById("codTarefa").value = 0;
                    desabilitaRecuoCodTarefa();
                    desabilitaAvancoCodTarefa();
                }
            }

            
        }
        
    }
    xhrAbreTarefa.send();
    getTarefa();
    habilitaAvancoCodTarefa();
    habilitaRecuoCodTarefa();
    desabilitaBtnCancelarTarefa();
    habilitaBtnNovaTarefa();
    desabilitaBtnGravaTarefa();
    desabilitaAvancoCodTarefa();
    //desabilitaHabilitaBtnExcluirTarefa();
    
    
    
 
}

function novaTarefa(){
    codTarefa = parseInt(document.getElementById("codTarefa").value);
    if(codTarefa == 0){
        codTarefa = 1;
        document.getElementById("codTarefa").value = codTarefa;
    }else{
    urlGetTarefa = 'http://localhost:8000/task/?format=json'
     
    vetor_tarefa = [];
    xhrNovaTarefa = new XMLHttpRequest();
    xhrNovaTarefa.open('GET', urlGetTarefa, true);
    xhrNovaTarefa.onreadystatechange = function(){     
        if(xhrNovaTarefa.readyState == 4){
            if(xhrNovaTarefa.status == 200){
                json = (JSON.parse(xhrNovaTarefa.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_tarefa.push(json[i]['trf_id']);
                    
                }
                vetor_tarefa.reverse();
                codTarefa = vetor_tarefa[0] + 1;
              }
        }
        document.getElementById("codTarefa").value = codTarefa;
    }
    
}
}

function cancelarCadasTarefa(){
    codTarefa = parseInt(document.getElementById("codTarefa").value);
    document.getElementById("codTarefa").value = codTarefa - 1;
    getTarefa();
    desabilitaCamposTarefa();
    
    desabilitaBtnGravaTarefa();
    desabilitaBtnCancelarTarefa();
    habilitaRecuoCodTarefa();
    
    habilitaBtnNovaTarefa();
    desabilitaHabilitaBtnExcluirTarefa();
    habilitaBtnAtualizarTarefa();
   
}

/*


function carregaDataListInterdepedencia(){
    
     document.getElementById("listaInterdependencia").innerHTML = '';
    
    if(vetor_tarefa.length == 0){
        document.getElementById("listaInterdependencia").innerHTML += "<option value=' '>";
    }
    for(i =0; i< vetor_tarefa.length;i++){
        
        document.getElementById("listaInterdependencia").innerHTML += "<option value='"+vetor_tarefa[i][1]+"'>";
        
        
    }
    
    
}*/


function recuarCodTarefa(){
    urlRecuaTarefa = 'http://localhost:8000/task/?format=json'
    
    codTarefa = parseInt(document.getElementById("codTarefa").value);
    
    vetor_tarefa = [];
    xhrRecuarCod = new XMLHttpRequest();
    xhrRecuarCod.open('GET', urlRecuaTarefa, true);
    xhrRecuarCod.onreadystatechange = function(){     
        if(xhrRecuarCod.readyState == 4){
            if(xhrRecuarCod.status == 200){
                json = (JSON.parse(xhrRecuarCod.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_tarefa.push(json[i]['trf_id']);
                    
                }
                 
                 menorvalor = vetor_tarefa.length;
                 for(i=0;i<vetor_tarefa.length;i++){

                    if(codTarefa == vetor_tarefa[i]){
                    codTarefa = vetor_tarefa[i-1];
                 }
                 if(vetor_tarefa[i] < menorvalor){
                    menorvalor = vetor_tarefa[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codTarefa").value = codTarefa;   
                if(codTarefa == menorvalor){
                    desabilitaRecuoCodTarefa();
                }
                habilitaAvancoCodTarefa();
                
                }
            }
        }
    

        xhrRecuarCod.send();

}

function avancarCodTarefa(){
    urlAvancaTarefa = 'http://localhost:8000/task/?format=json'
    
    codTarefa = parseInt(document.getElementById("codTarefa").value);
    vetor_tarefa = [];
    xhrAvancarTarefa = new XMLHttpRequest();
    xhrAvancarTarefa.open('GET', urlAvancaTarefa, true);
    xhrAvancarTarefa.onreadystatechange = function(){     
        if(xhrAvancarTarefa.readyState == 4){
            if(xhrAvancarTarefa.status == 200){
                json = (JSON.parse(xhrAvancarTarefao.responseText));
                for(i = 0;i<json.length;i++){
                    vetor_tarefa.push(json[i]['trf_id']);
                    
                }
                
                vetor_tarefa.reverse();
                 maiorvalor = 0;
                 for(i=0;i<vetor_tarefa.length;i++){
                    
                    if(codTarefa == vetor_tarefa[i]){
                    codTarefa = vetor_tarefa[i-1];
                 }
                 if(vetor_tarefa[i] > maiorvalor){
                    maiorvalor = vetor_tarefa[i]; 
                }    

                }
                   count = 0;
                      document.getElementById("codTarefa").value = codTarefa;   
                if(codTarefa == maiorvalor){
                    desabilitaAvancoCodTarefa();
                }
                habilitaRecuoCodTarefa();
                getTarefa();
                }
            }
        }
    
        
        xhrAvancarTarefa.send();
}



function desabilitaRecuoCodTarefa(){
        document.getElementById("codAnteriorCadasTarefa").disabled = true;
     if(document.getElementById("codAnteriorCadasTarefa").disabled = true){
       mudaBotao =  document.getElementById("codAnteriorCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
}
    
}

function desabilitaAvancoCodTarefa(){
  document.getElementById("codPosteriorCadasTarefa").disabled = true;
     if(document.getElementById("codPosteriorCadasTarefa").disabled = true){
       mudaBotao =  document.getElementById("codPosteriorCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaRecuoCodTarefa(){
   
   if(document.getElementById("codTarefa").value > 1){ document.getElementById("codAnteriorCadasTarefa").disabled = false;
    mudaBotao =  document.getElementById("codAnteriorCadasTarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
     
}
}

function habilitaAvancoCodTarefa(){
  document.getElementById("codPosteriorCadasTarefa").disabled = false;
    mudaBotao =  document.getElementById("codPosteriorCadasTarefa");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function fecharCadastroTarefa(){
    dialogCadastro.close();
    limparCamposCadasTarefa();
}

function habilitaBtnCancelarTarefa(){
    document.getElementById("btn_cancelarCadasTarefa").disabled = false;
    mudaBotao =  document.getElementById("btn_cancelarCadasTarefa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarTarefa(){
    document.getElementById("btn_cancelarCadasTarefa").disabled = true;
     if(document.getElementById("btn_cancelarCadasTarefa").disabled = true){
       mudaBotao =  document.getElementById("btn_cancelarCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaCamposTarefa(){
     document.getElementById("selecionaProjeto").disabled = false;
    document.getElementById("interdependencia").disabled = false;   
    document.getElementById("nomeTarefa").readOnly = false;
    document.getElementById("dt_inicioTarefa").readOnly = false;
     document.getElementById("dt_finalTarefa").readOnly = false;
    document.getElementById("dt_prazoTarefa").readOnly = false;
        document.getElementById("entregavel").disabled = false;  
}

function desabilitaCamposTarefa(){
    limparCamposCadasTarefa();
    document.getElementById("selecionaProjeto").disabled = true; 
    document.getElementById("interdependencia").disabled = true; 
    document.getElementById("nomeTarefa").readOnly = true;
    document.getElementById("dt_inicioTarefa").readOnly = true;
     document.getElementById("dt_finalTarefa").readOnly = true;
    document.getElementById("dt_prazoTarefa").readOnly = true;
     document.getElementById("entregavel").disabled = true;  
    
}

function habilitaBtnNovaTarefa(){
     document.getElementById("btn_novatarefa").disabled = false;
    mudaBotao =  document.getElementById("btn_novatarefa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovaTarefa(){
    document.getElementById("btn_novatarefa").disabled = true;
    if(document.getElementById("btn_novatarefa").disabled = true){
       mudaBotao =  document.getElementById("btn_novatarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function desabilitaBtnGravaTarefa(){
    document.getElementById("btn_salvartarefa").disabled = true;
    if(document.getElementById("btn_salvartarefa").disabled = true){
       mudaBotao =  document.getElementById("btn_salvartarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaBtnGravarTarefa(){
    document.getElementById("btn_salvartarefa").disabled = false;
    mudaBotao =  document.getElementById("btn_salvartarefa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasTarefa(){
    document.getElementById("selecionaProjeto").value = '';
    document.getElementById("interdependencia").value = '';
    document.getElementById("nomeTarefa").value = '';
    document.getElementById("dt_inicioTarefa").value = '';
     document.getElementById("dt_finalTarefa").value = '';
    document.getElementById("dt_prazoTarefa").value = '';
    
   
}

function habilitaDesabilitaBtnExcluirTarefa(){
    if(document.getElementById("codTarefa").value == 0){
     document.getElementById("btn_excluirCadasTarefa").disabled = true;
    if(document.getElementById("btn_excluirCadasTarefa").disabled = true){
       mudaBotao =  document.getElementById("btn_excluirCadasTarefa");
        mudaBotao.style.backgroundColor = "gray";
    }
        
}else{
    document.getElementById("btn_excluirCadasTarefa").disabled = false;
    mudaBotao =  document.getElementById("btn_excluirCadasTarefa");
        mudaBotao.style.backgroundColor = "#698FEB";
}

}

function gravarTarefa(){
    codProjetoSelecionado = '';
    trf_id = document.getElementById("codTarefa");
    selecionaProjeto = document.getElementById("selecionaProjeto").value;
    
    for(i = 0; i< vetor_projeto.length;i++){
        
        if(selecionaProjeto == vetor_projeto[i][1]){
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
    vetorTrfCadastrados();
    
}

function jsonCadastroTarefa(){
    jsonTarefa = [];
    for(i=0;i<vetor_tarefa.length;i++){
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

function excluirCadasTarefa(){
    codAtual = parseInt(document.getElementById("codTarefa").value);
    
    codTarefaMaior = 0;  
    
    for(i = 0; i<vetor_tarefa.length;i++){
        
        if(codAtual == vetor_tarefa[i][0]){
            
            vetor_tarefa.splice([i],1); 
            console.log(vetor_tarefa);
        }
       
    }
    for(x=0;x<vetor_tarefa.length;x++){
        if(vetor_tarefa[x][0] > codTarefaMaior){
            codTarefaMaior = vetor_tarefa[x][0];    
        }     
    }
    
    if(vetor_tarefa.length < 1){
        document.getElementById("codTarefa").value = 0;
          desabilitaRecuoCodTarefa();
    }else{
        document.getElementById("codTarefa").value = codTarefaMaior;
    }
   
    buscaValoresTarefa();
    desabilitaAvancoCodTarefa();   
    
    if(document.getElementById("codTarefa").value <= 1){
        desabilitaRecuoCodTarefa();
    }
    
    habilitaDesabilitaBtnExcluirTarefa();
    
    if(document.getElementById("codTarefa").value == 0){
        limparCamposCadasTarefa();
    }
    vetorTrfCadastrados();
}

/*///////////////////////////////////////*/

/*DISTRIBUIÇÃO DE PESSOAS AOS PROJETOS*///////////////////////////////


function distribuiPessoas(){
   
    codDistribuicao = 0;
    codDistribuicaoAtual = 0;
    
     codDistribuicaoMaior = 0;
    
    if(vetor_distribuicao.length >= 1){
     
        for(i = 0;i<vetor_distribuicao.length;i++){
            if(vetor_distribuicao[i][0] > codDistribuicaoMaior){
            codDistribuicaoMaior = vetor_distribuicao[i][0];    
        }
        }    
        document.getElementById("codDistribuicao").value = ""+codDistribuicaoMaior+"";
        
        habilitaRecuoCodDistribuicao();
        
    }
    else
    {
        document.getElementById("codDistribuicao").value = codDistribuicao;
        desabilitaRecuoCodDistribuicao();
        desabilitaAvancoCodDistribuicao();
    }
    
    dialogCadastro = document.getElementById("distribuiPessoas");
    dialogCadastro.showModal();
    
    
    
     desabilitaBtnCancelarDistribuicao();
    habilitaBtnNovaDistribuicao();
    desabilitaBtnGravaDistribuicao();
    buscaValoresDistribuicao();
    carregaDatalistProjetos_distribuicao();
    
    desabilitaAvancoCodDistribuicao();
    habilitaDesabilitaBtnExcluirDistribuicao();
    
}

function buscaValoresDistribuicao(){
    
   codAtual = parseInt(document.getElementById("codDistribuicao").value);
    
    
    
    for(i=0;i<vetor_distribuicao.length;i++){
        
        if(codAtual == vetor_distribuicao[i][0]){
        document.getElementById("selecionaProjeto_distribuicao").value = vetor_distribuicao[i][1];
        document.getElementById("listaTarefa").value = vetor_distribuicao[i][2];
        document.getElementById("listaPessoa").value = vetor_distribuicao[i][3];
        }
    }
    
    console.log(vetor_distribuicao);
}

function fecharDistribuicaoPessoa(){
    dialogCadastro.close();
    limparCadasPessoa();
}

function recuarCodDistribuicao(){
     codDistribuicaoAtual = parseInt(document.getElementById("codDistribuicao").value);
    count = 0;
    codDistribuicaoMenor = 0;
    codDistribuicaoMenor = vetor_distribuicao.length;
     
      for(i=0;i<vetor_distribuicao.length;i++){
          
          if((codDistribuicaoAtual-1) == vetor_distribuicao[i][0]){
              count += 1;
          }
           if(vetor_distribuicao[i][0] < codDistribuicaoMenor){
            codDistribuicaoMenor = vetor_distribuicao[i][0]; 
        }         
      }
        if(count == 0){
           codDistribuicaoAtual -= 2;
        } else{
           codDistribuicaoAtual -= 1;
        }
        console.log(count); 
        document.getElementById("codDistribuicao").value = codDistribuicaoAtual;
    if(codDistribuicaoAtual == codDistribuicaoMenor){
        desabilitaRecuoCodDistribuicao();
    }
     habilitaAvancoCodDistribuicao();
     buscaValoresDistribuicao();
    
    
    buscaValoresDistribuicao();
}

function avancarCodDistribuicao(){
   codDistribuicaoAtual = parseInt(document.getElementById("codDistribuicao").value);
    
    count = 0;
    codDistribuicaoMaior = 0;   
    
     
      for(i=0;i<vetor_distribuicao.length;i++){   
          if((codDistribuicaoAtual+1) == vetor_distribuicao[i][0]){
              count += 1;     
          }
          
          if(vetor_distribuicao[i][0] > codDistribuicaoMaior){
            codDistribuicaoMaior = vetor_distribuicao[i][0];    
        }
      }
        if(count == 0){
           codDistribuicaoAtual += 2;
        } else{
           codDistribuicaoAtual += 1;
        }    
        console.log(count);
        document.getElementById("codDistribuicao").value = codDistribuicaoAtual;   
    if(codDistribuicaoAtual == codDistribuicaoMaior){
        desabilitaAvancoCodDistribuicao();
    }
    habilitaRecuoCodDistribuicao();
    buscaValoresDistribuicao();
}

function desabilitaRecuoCodDistribuicao(){
        document.getElementById("codAnteriorDistribuicao").disabled = true;
     if(document.getElementById("codAnteriorDistribuicao").disabled = true){
       mudaBotao =  document.getElementById("codAnteriorDistribuicao");
        mudaBotao.style.backgroundColor = "gray";
}
    
}

function desabilitaAvancoCodDistribuicao(){
  document.getElementById("codPosteriorDistribuicao").disabled = true;
     if(document.getElementById("codPosteriorDistribuicao").disabled = true){
       mudaBotao =  document.getElementById("codPosteriorDistribuicao");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaRecuoCodDistribuicao(){
   
   if(document.getElementById("codDistribuicao").value > 1){ document.getElementById("codAnteriorCadasDistribuicao").disabled = false;
    mudaBotao =  document.getElementById("codAnteriorCadasDistribuicao");
    mudaBotao.style.backgroundColor = "#698FEB";
     
}
}

function habilitaAvancoCodDistribuicao(){
  document.getElementById("codPosteriorCadasDistribuicao").disabled = false;
    mudaBotao =  document.getElementById("codPosteriorCadasDistribuicao");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function habilitaBtnCancelarDistribuicao(){
document.getElementById("btn_cancelarDistribuicao").disabled = false;
    mudaBotao = document.getElementById("btn_cancelarDistribuicao");
    mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnCancelarDistribuicao(){
    document.getElementById("btn_cancelarDistribuicao").disabled = true;
     if(document.getElementById("btn_cancelarDistribuicao").disabled = true){
       mudaBotao =  document.getElementById("btn_cancelarDistribuicao");
        mudaBotao.style.backgroundColor = "gray";
}
}

function habilitaCamposDistribuicao(){
     document.getElementById("selecionaProjeto_distribuicao").disabled = false;
    
    document.getElementById("listaTarefa").disabled = false;
    
    document.getElementById("listaPessoa").disabled = false;
    
}

function desabilitaCamposDistribuicao(){
    limparCamposCadasProjeto();
    document.getElementById("selecionaProjeto_distribuicao").disabled = true;
    
    document.getElementById("listaTarefa").disabled = true;
    
    document.getElementById("listaPessoa").disabled = true;
}

function habilitaBtnNovaDistribuicao(){
     document.getElementById("btn_novadistribuicao").disabled = false;
    mudaBotao =  document.getElementById("btn_novadistribuicao");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function desabilitaBtnNovaDistribuicao(){
    document.getElementById("btn_novadistribuicao").disabled = true;
    if(document.getElementById("btn_novadistribuicao").disabled = true){
       mudaBotao =  document.getElementById("btn_novadistribuicao");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaDesabilitaBtnExcluirDistribuicao(){
    if(document.getElementById("codDistribuicao").value == 0){
     document.getElementById("btn_excluirDistribuicao").disabled = true;
    if(document.getElementById("btn_excluirDistribuicao").disabled = true){
       mudaBotao =  document.getElementById("btn_excluirDistribuicao");
        mudaBotao.style.backgroundColor = "gray";
    }
        
}else{
    document.getElementById("btn_excluirDistribuicao").disabled = false;
    mudaBotao =  document.getElementById("btn_excluirDistribuicao");
        mudaBotao.style.backgroundColor = "#698FEB";
}

}

function desabilitaBtnGravaDistribuicao(){
    document.getElementById("btn_salvardistribuicao").disabled = true;
    if(document.getElementById("btn_salvardistribuicao").disabled = true){
       mudaBotao =  document.getElementById("btn_salvardistribuicao");
        mudaBotao.style.backgroundColor = "gray";
    }
}

function habilitaBtnGravarDistribuicao(){
    document.getElementById("btn_salvardistribuicao").disabled = false;
    mudaBotao =  document.getElementById("btn_salvardistribuicao");
        mudaBotao.style.backgroundColor = "#698FEB";
}

function limparCamposCadasDistribuicao(){
   document.getElementById("selecionaProjeto_distribuicao").value = '';
    
    document.getElementById("listaTarefa").value = '';
    
    document.getElementById("listaPessoa").value = '';
}




/*DATALIST*/

function carregaDatalistProjetos_distribuicao(){
    
    document.getElementById("listaProjetos_distribuicao").innerHTML = '';
    
    for(i =0; i< vetor_projeto.length;i++){
           document.getElementById("listaProjetos_distribuicao").innerHTML += '<option value="'+vetor_projeto[i][1]+'">';
            
        console.log(vetor_projeto[i][1]);
             
    }
    
   
    
}

function carregaDataListTarefasDistribuicao(){
    
    document.getElementById("listaTarefa").innerHTML = '';
    retorna_tarefas = [];
    retornaCodProjeto = '';
    
    
        buscaProjeto = document.getElementById('selecionaProjeto_distribuicao').value;
        
        for(i = 0;i<vetor_projeto.length;i++){
            
            if(buscaProjeto == vetor_projeto[i][1]){
                retornaCodProjeto = vetor_projeto[i][0];
                
                console.log(retornaCodProjeto);
                
                for(x = 0; x<vetor_tarefa.length;x++){
                    
                    if(retornaCodProjeto == vetor_tarefa[x][7]){
                        
                        document.getElementById("listaTarefa_distribuicao").innerHTML += "<option value='"+vetor_tarefa[x][1]+"'>";          
                    }
                }              
            }            
        }   
    }
    
function carregaDatalistPessoas_distribuicao(){
    
    document.getElementById("listaPessoa_distribuicao").innerHTML = '';
    
    for(i =0; i< vetor_pessoa.length;i++){
           document.getElementById("listaPessoa_distribuicao").innerHTML += '<option value="'+vetor_pessoa[i][1]+'">';
        
             
    }
}


///DATALIST


//TABELA

function carregatabelaDistribuicao(){
    
   document.getElementById("corpoTabelaDistribuicao").innerHTML = '';
    
    
    for(i=0;i<vetor_tabelaDistribuicao.length;i++){
        
        document.getElementById("corpoTabelaDistribuicao").innerHTML += vetor_tabelaDistribuicao[i][0];
        
    }
    
    console.log(vetor_tabelaDistribuicao);
    
    
}

//TABELA

vetor_tbdistribuicao = [];
vetor_tabelaDistribuicao = [];
vetor_distribuicao = [];

function novaDistribuicao(){
            codDistribuicaoMaior = 0;
           if(vetor_projeto.length > 0 && vetor_tarefa.length > 0){
                if(document.getElementById("codDistribuicao").value == 0){
                 codAnteriorDistribuicao = 0;
    novoCodDistribuicao = codAnteriorDistribuicao+1;
    document.getElementById("codDistribuicao").value = ""+novoCodDistribuicao+"";
            }
            else{
                 for(i = 0; i< vetor_distribuicao.length;i++){
            if(vetor_distribuicao[i][0] > codDistribuicaoMaior){
            codDistribuicaoMaior = vetor_distribuicao[i][0];    
        }
            
        }
        novoCodDistribuicao = parseInt(codDistribuicaoMaior);
        novoCodDistribuicao += 1;
       document.getElementById("codProjeto").value = ""+novoCodDistribuicao+"";
            }

            habilitaCamposDistribuicao();
            habilitaBtnCancelarDistribuicao();
            desabilitaBtnNovaDistribuicao();
            habilitaBtnGravarDistribuicao();
            desabilitaAvancoCodDistribuicao();
            desabilitaRecuoCodDistribuicao();
            limparCamposCadasDistribuicao();
            
           }else{
               alert("Sem Projeto ou Tarefa cadastrada");
           }
         
    }

   
function cancelarCadasDistribuicao(){
    document.getElementById("codDistribuicao").value = vetor_distribuicao.length;
    
    desabilitaCamposDistribuicao();
    
    desabilitaBtnGravaDistribuicao();
    desabilitaBtnCancelarDistribuicao();
    habilitaRecuoCodDistribuicao();
    buscaValoresDistribuicao();
    habilitaBtnNovaDistribuicao();
   
    
    
}

function gravarDistribuicao(){
    codProjetoSelecionado = '';
    pes_trf_id = document.getElementById("codDistribuicao");
    selecionaProjeto = document.getElementById("selecionaProjeto_distribuicao").value;
    
    
    for(i = 0; i< vetor_projeto.length;i++){
        
        if(selecionaProjeto == vetor_projeto[i][1]){
            fk_prj_id = vetor_projeto[i][0];
        }
       
    }
    selecionaTarefa = document.getElementById("listaTarefa").value;
    
    
    for(i = 0; i< vetor_tarefa.length;i++){
        
        if(selecionaTarefa == vetor_tarefa[i][1]){
            fk_trf_id = vetor_tarefa[i][0];
        }
       
    }
    
    selecionaPessoa = document.getElementById("listaPessoa").value;
    
    
    for(i = 0; i< vetor_pessoa.length;i++){
        
        if(selecionaPessoa == vetor_pessoa[i][1]){
            fk_pes_id = vetor_pessoa[i][0];
        }
       
    }
    
    
    tb_pes_trf = [pes_trf_id.value, fk_trf_id.value, fk_pes_id.value];
    
    distribuicao = [pes_trf_id.value, selecionaProjeto,selecionaTarefa, selecionaPessoa];
    
    vetor_tbdistribuicao.push(tb_pes_trf);
    vetor_distribuicao.push(distribuicao);
    console.log(vetor_distribuicao);
    
    
    linhatabelaDistribuicao = ['<tr><td>'+selecionaProjeto+'</td><td>'+selecionaTarefa+'</td><td>'+selecionaPessoa+'</td></tr>'];
    
    vetor_tabelaDistribuicao.push(linhatabelaDistribuicao);
    
    jsonCadastroDistribuicao();
    desabilitaCamposDistribuicao();
    habilitaBtnNovaDistribuicao();
    desabilitaBtnGravaDistribuicao();
    desabilitaBtnCancelarDistribuicao();
    habilitaRecuoCodDistribuicao();
    buscaValoresDistribuicao();     
    habilitaDesabilitaBtnExcluirDistribuicao();
    carregatabelaDistribuicao();
    
}

function jsonCadastroDistribuicao(){
    jsonDistribuicao = [];
    for(i=0;i<vetor_tbdistribuicao.length;i++){
        jsonDistribuicao.push({
           'pes_trf_id': vetor_tbdistribuicao[i][0],
           'fk_trf_id': vetor_tbdistribuicao[i][1],
           'fk_pes_id': vetor_tbdistribuicao[i][2]
        });
    }
    console.log(jsonDistribuicao);
}

function excluirCadasDistribuicao(){
    codAtual = parseInt(document.getElementById("codDistribuicao").value);
    
    codDistribuicaoMaior = 0;  
    
    for(i = 0; i<vetor_distribuicao.length;i++){
        
        if(codAtual == vetor_distribuicao[i][0]){
            
            vetor_distribuicao.splice([i],1);
            
            vetor_tabelaDistribuicao.splice([i],1);
        }    
    }
    
       for(x=0;x<vetor_distribuicao.length;x++){
        if(vetor_distribuicao[x][0] > codDistribuicaoMaior){
            codDistribuicaoMaior = vetor_distribuicao[x][0];   
        }     
    }
    
    if(vetor_distribuicao.length < 1){
        document.getElementById("codDistribuicao").value = 0;
          desabilitaRecuoCodDistribuicao();
    }else{
        document.getElementById("codDistribuicao").value = codDistribuicaoMaior;
    }    
    carregaTabelaDistribuicao();
    buscaValoresDistribuicao();
    desabilitaAvancoCodDistribuicao();
    
     if(document.getElementById("codDistribuicao").value <= 1){
        desabilitaRecuoCodDistribuicao();
    }
    
    habilitaDesabilitaBtnExcluirDistribuicao();
    
    if(document.getElementById("codDistribuicao").value == 0){
        limparCamposCadasDistribuicao();
    }    
    
    
    carregatabelaDistribuicao();
    
}


/*MENU DROPDOWN BTN_menusuperior*/////////////////////////////

function menuDropdown_menusuperior() {
  document.getElementById("menu_superior").classList.toggle("show");
    
}

//////////////////////////////////////////////////

/*JSON PARA CARREGAR GRÁFICO DE GANTT*/

function carregaGantt(){
        vetor_gantt = [];
        for(i=0;i<vetor_projeto.length;i++){ //SELECIONA O VETOR PROJETO COM AS INFORMAÇÕES EQUIVALENTES À TABELA PROJETO
             buscaCodProjeto = vetor_projeto[i][0]; //BUSCA O CÓDIGO UTILIZANDO A VARREDURA COM FOR
            for(x = 0; x < vetor_tarefa.length;x++){ // FAZ A VARREDURA NAS TAREFAS CADASTRADAS EQUIVALENTE A TABELA TAREFAS
            
            if(buscaCodProjeto == vetor_tarefa[x][7]){ // VERIFICA SE O CÓDIGO DO PROJETO É IGUAL AO COD DO PROJETO NA TABELA TAREFA
                
                //x[i].style.backgroundColor = "red";
                addVetor = ["Task "+x,vetor_tarefa[x][1],vetor_tarefa[x][2],vetor_tarefa[x][3], vetor_projeto[i][5]];//CRIA VETOR COM INFORMAÇÕES NECESSÁRIAS PARA CARREGAR O GANTT 
                vetor_gantt.push(addVetor);//ADICIONA AO VETOR                     
        }      
        }
   jsonGantt();//CARREGA FUNCTION DA JSON DO GANTT PARA CRIAÇÃO DO JSON
}
}

function jsonGantt(){
    tasks = []; //PREPARO DE VETOR PARA RECEBER JSON
    for(i = 0; i< vetor_gantt.length;i++){ //FAZ A VARREDURA NO VETOR PARA CRIAR JSON
        tasks.push({ //CARREGA O JSON COM AS INFORMAÇÕES NECESSÁRIAS PARA CARREGAR O GRÁFICO GANTT
            'id': vetor_gantt[i][0],
            'name': vetor_gantt[i][1],
            'color': vetor_gantt[i][4],
            'start': vetor_gantt[i][2],
            'end': vetor_gantt[i][3],
            'progress': 20,       
            'custom_class': 'tcolor'                     
        });
    }
     console.log(tasks); //TESTE DE INTEGRIDADE
   gantt = new Gantt("#gantt", tasks); //ENVIO DE DADOS PARA O GRÁFICO GANTT
}
//////////////////////////////////////////////////


/*MUDANÇA DE PREÍODOS GANTT*/

// Quarter Day, Half Day, Day, Week, Month 


function periodo_dia(){
    
    gantt.change_view_mode('Day'); // MUDANÇA DE PERÍODO PARA DIA
}

function periodo_semana(){
    gantt.change_view_mode('Week');// MUDANÇA DE PERÍODO PARA SEMANA
}

function periodo_mes(){
    gantt.change_view_mode('Month');// MUDANÇA DE PERÍODO PARA MÊS
}

function periodo_ano(){
    gantt.change_view_mode('Year');// MUDANÇA DE PERÍODO PARA ANO
}



/*//////////////////////////////////////////////*/





/*//////////////////////////////////////////////*/



/*VISUALIZAÇÃO DO GRÁFICO GANTT*/
/*
function carregaGantt(){
   
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
    
}*/