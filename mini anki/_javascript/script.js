// Variáveis criadas a partir de TAGS HTML

var btSelDiv = document.querySelectorAll("#menu label div input[type=radio][name=selDiv]"); // Armazena os dois elementos input do tipo rádio que definem qual div será exibida;   
var selTpInput = document.querySelectorAll("#menu label div input[type=radio][name=selTpInput]"); // Armazena os dois elementos input do tipo rádio que definem qual será o tipo do input da variável caixasColuna;   
var txtTagUmCol = document.querySelector("#txtTagUmCol"); // Texto do elemento span #txtTagUmCol;
var txtTagMultiCols = document.querySelector("#txtTagMultiCols"); // Texto do elemento span #txtTagMultiCols;
var caixasColuna = document.querySelectorAll(".listaColunas label li input"); // armazena todas a colunas de letras; 
var txtMudaVel = document.querySelector("#txtMudaVel"); // Texto do elemento legend #txtMudaVel;
var controleVel = document.querySelector("#controleVel"); // Armazena a variável que guarda o tempo em segundos em que a carta será virada;  
var carta = document.querySelector("#carta"); // Uma div que corresponde a "carta";
var btViraCarta = document.querySelector("#btViraCarta"); // Botão que vira a carta;
var btTrocaCarta = document.querySelector("#btTrocaCarta"); // Botão que 'sorteia' outra carta;  

// =====================================================================

// Variáveis Auxiliares 

var vel;  
var pos = 0;
var colunaEscolhida = 0;
var guardaColunaSelecionada;
var guardaColunasSelecionadas = [];
var colunasSelecionadas = [];
var letraSorteada;
var cartaAtual;
var modoUmaColuna; 
var guardaIndiceColDes = -1;


var letras = [
	[["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"]],					
	[["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"]],
	[["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"]],
	[["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"]],
	[["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"]],
	[["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"]],
	[["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"]],
	[["や","ya"],["ゆ","yu"],["よ ","yo"]],
	[["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"]],
	[["わ","wa"],["を","wo"],["ん ","n"]],
	[["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"]],
	[["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"]],
	[["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"]],
	[["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]],
	[["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]],
	[["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"]],
	[["しゃ","sha"],["しゅ","shu"],["しょ","sho"]],
	[["ちゃ","tcha"],["ちゅ","tchu"],["ちょ","tcho"]],
	[["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"]],
	[["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"]],
	[["みゃ","mya"],["みゅ","myu"],["みょ","myo"]],
	[["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"]],
	[["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"]],
	[["じゃ","ja"],["じゅ","ju"],["じょ","jo"]],
	[["びゃ","bya"],["びゅ","byu"],["びょ","byo"]],
	[["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]],
	[["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"]],					
	[["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"]],
	[["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"]],
	[["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"]],
	[["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"]],
	[["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"]],
	[["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"]],
	[["ヤ","ya"],["ユ","yu"],["ヨ","yo"]],
	[["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"]],
	[["ワ","wa"],["ヲ","wo"],["ン","n"]],
	[["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"]],
	[["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"]],
	[["ダ","da"],["ジ","ji"],["ヅ","zu"],["デ","de"],["ド","do"]],
	[["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]],
	[["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]],
	[["キャ","kya"],["キュ","kyu"],["キョ","kyo"]],
	[["シャ","sha"],["シュ","shu"],["ショ","sho"]],
	[["チャ","tcha"],["チュ","tchu"],["チョ","tcho"]],
	[["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"]],
	[["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"]],
	[["ミャ","mya"],["ミュ","myu"],["ミョ","myo"]],
	[["リャ","rya"],["リュ","ryu"],["リョ","ryo"]],
	[["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"]],
	[["ジャ","ja"],["ジュ","ju"],["ジョ","jo"]],
	[["ビャ","bya"],["ビュ","byu"],["ビョ","byo"]],
	[["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"]]
];	

// ======================================================================

inicio();

// Função Padrão de início de código

function inicio(){

	controleVel.addEventListener("input",salvaVel);

	btSelDiv[0].addEventListener("input",mostraDiv);
	btSelDiv[1].addEventListener("input",mostraDiv);

	selTpInput[0].addEventListener("change",defineTipoInput);
	selTpInput[1].addEventListener("change",defineTipoInput);

	for (var x = 0; x < caixasColuna.length; x++){
			
		caixasColuna[x].addEventListener("input",SelecionaColuna);
		caixasColuna[x].parentElement.addEventListener("mouseover",toogleClass);
		caixasColuna[x].parentElement.addEventListener("mouseout",toogleClass);
	
	}

	btViraCarta.addEventListener("click",viraCarta);
	btTrocaCarta.addEventListener("click",function(){
		 
	btViraCarta.classList.remove("custonHover");	
	this.classList.remove("custonHover");

	TrocaCarta();		
	desativaElementos();

	window.setTimeout(finalizaEvento,vel);
		
	});

	checaIdiomaNavegador();
	carregaDadosLocalStorage();
	mostraDiv();
	defineTipoInput();
	defineVel();
	TrocaCarta();

}

// ===============================================================================

// Função que checa o idioma do navegador


function checaIdiomaNavegador(){


if(navigator.language != "pt-BR" && navigator.language != "pt-PT"){
	
	txtTagUmCol.innerHTML = "One Column";
	txtTagMultiCols.innerHTML = "Multi Columns";
	txtMudaVel.innerHTML = "Change Speed";
	btTrocaCarta.innerHTML = "Next Card";
	btViraCarta.innerHTML = "Show Back";
	btViraCarta.name = "Show Front";	

}

}

// ===========================================================


// Função que carrega dados salvos no local storage

function carregaDadosLocalStorage(){


	var inDefineTpInput = (localStorage.getItem("inDefineTpInput") != null) ? parseInt(localStorage.getItem("inDefineTpInput")) :
																			   0;		

	modoUmaColuna = selTpInput[inDefineTpInput].value;

	seleCionaElemento(selTpInput[inDefineTpInput],true);

	if(localStorage.getItem("colunaSelecionada") == null){
		
		guardaColunaSelecionada = 0; 
		
				
	}else{
		
		guardaColunaSelecionada = localStorage.getItem("colunaSelecionada");
	
	}


	if(localStorage.getItem("colunasSelecionadas") == null){
		
		guardaColunasSelecionadas.push(0);
	
				
		}else{
		
		guardaColunasSelecionadas = JSON.parse(localStorage.getItem("colunasSelecionadas")); 	
	
	
		}



	if(modoUmaColuna){

		colunasSelecionadas.push(guardaColunaSelecionada);
		
	}else{

		colunasSelecionadas = guardaColunasSelecionadas;

	}
	

		
	for(var i = 0; i < colunasSelecionadas.length; i++){

	var indice = parseInt(colunasSelecionadas[i]);
		
	seleCionaElemento(caixasColuna[indice],true);
			
	}	

	controleVel.value = (localStorage.getItem("velocidade") != null) ? parseInt( localStorage.getItem("velocidade")) : 1.5; 
	

	var InBtSelDiv = (localStorage.getItem("indiceBtSelDiv") != null) ? parseInt(localStorage.getItem("indiceBtSelDiv")) : 0;

	
	seleCionaElemento(btSelDiv[InBtSelDiv],true);

}


	


// ===================================================


// Função que define qual será o tipo do input 

function defineTipoInput(){
	

	var tipoInput;

	for(var x = 0; x < selTpInput.length; x++){
	
		if(selTpInput[x].checked){	

			modoUmaColuna = parseInt(selTpInput[x].value);
			
			selTpInput[x].parentElement.setAttribute("class","fundoSel1");
			localStorage.setItem("inDefineTpInput",x);

			if(selTpInput[x].value == 1)
				tipoInput = "radio";
			else
				tipoInput = "checkbox";	


		
		}else{	
			
			selTpInput[x].parentElement.setAttribute("class","fundoPreto1");
		}
	}	



	for(var x = 0; x < caixasColuna.length; x++){

		caixasColuna[x].setAttribute("type",tipoInput);
				
		
		seleCionaElemento(caixasColuna[x],false);
		
		caixasColuna[x].parentElement.removeAttribute("class");
		
	}


	colunasSelecionadas = [];


	if(modoUmaColuna)
		colunasSelecionadas.push(guardaColunaSelecionada);
	else
		colunasSelecionadas = guardaColunasSelecionadas;


		
	if(guardaIndiceColDes != -1)
		mudaEstadoEle(caixasColuna[guardaIndiceColDes],false);
	

		for(var i = 0; i < colunasSelecionadas.length; i++){

			var indice = colunasSelecionadas[i];
				
			seleCionaElemento(caixasColuna[indice],true);
					
		}	
	
		
		SelecionaColuna();
	
			

}

// =============================================


// Função que define velocidade em que a carta será virada

function defineVel(){

vel = controleVel.value * 1000;	

}

// ========================================================



// Função que muda a velocidade em que a carta é virada; 

function salvaVel(){


localStorage.setItem("velocidade",controleVel.value);
defineVel();

}

// ===============================================================================

// Função que mostra uma coluna de letras e esconde outra;

function mostraDiv(){

	for(var x = 0; x < btSelDiv.length; x++){
	
		if(btSelDiv[x].checked){	
			document.querySelector("#" + btSelDiv[x].value).hidden = false;
			btSelDiv[x].parentElement.setAttribute("class","fundoSel1");
			localStorage.setItem("indiceBtSelDiv",JSON.stringify(x));
		
		}else{	
			document.querySelector("#" + btSelDiv[x].value).hidden = true;
			btSelDiv[x].parentElement.setAttribute("class","fundoPreto1");
		}
	}	
		
}

// =================================================================

// Função que Seleciona todas as colunas   

function seleCionaElemento(e,c){

e.checked = c;
		
}


// =================================================================


// Função que 'zera' o array de colunas selecionadas e adiciona novos elementos 


function SelecionaColuna(ev){
	    

	if(colunasSelecionadas.length)
		colunasSelecionadas.splice(0,colunasSelecionadas.length);
		
	var x = 0;
	for(x = 0; x < caixasColuna.length; x++){
	
	if(caixasColuna[x].checked){
		colunasSelecionadas.push(parseInt(caixasColuna[x].value));
		caixasColuna[x].parentElement.classList.add("fundoSel2"); 
	}else{
		 if(caixasColuna[x].parentElement.classList.contains("fundoSel2"))
		 	caixasColuna[x].parentElement.classList.remove("fundoSel2"); 
		
	}
	
	}		
	
	if(modoUmaColuna){
		
		guardaColunaSelecionada = colunasSelecionadas[0];
		localStorage.setItem("colunaSelecionada",guardaColunaSelecionada);
	
	}else{
		
		guardaColunasSelecionadas = colunasSelecionadas; 
		localStorage.setItem("colunasSelecionadas",JSON.stringify(guardaColunasSelecionadas));
	}	

	
	

	if(!(modoUmaColuna)){

		if(colunasSelecionadas.length == 1){

			mudaEstadoEle(caixasColuna[colunasSelecionadas[0]],true);
			caixasColuna[colunasSelecionadas[0]].parentElement.classList.remove("custonHover");
			guardaIndiceColDes = colunasSelecionadas[0];

		}else{
					
			
			if(guardaIndiceColDes != -1){

				mudaEstadoEle(caixasColuna[guardaIndiceColDes],false);
				guardaIndiceColDes = -1;

			}
				
				
	}
	
	}else{

			mudaEstadoEle(caixasColuna[colunasSelecionadas[0]],true);
			caixasColuna[colunasSelecionadas[0]].parentElement.classList.remove("custonHover");

			if(ev == undefined)
				guardaIndiceColDes = colunasSelecionadas[0];
		    else{
				
				mudaEstadoEle(caixasColuna[guardaIndiceColDes],false);
				guardaIndiceColDes = colunasSelecionadas[0];

			}		


	}

}

// =============================================================================

// Função que desativa alguns elementos 

function desativaElementos(){
		
		mudaEstadoEle(btTrocaCarta,true);	
		mudaEstadoEle(btViraCarta,true);
		AuxMudaEstadoCols(true);
				
	}
	
// ========================================================


// Função que vira a carta

function viraCarta(){
	
	mudaTexto(btViraCarta);
	
	if(!pos)
		pos++;
	else 
		pos = 0;	
	
	
	carta.innerHTML = cartaAtual[pos];
	
	}
	

// =======================================

// Função que Sorteia outra letra  

function TrocaCarta(){
	
	if(pos) 
		mudaTexto(btViraCarta);
	
	
	pos = 0;
	
	var colunaSorteada = SorteiaNumero(colunasSelecionadas.length);
	
	
	colunaEscolhida = colunasSelecionadas[colunaSorteada];
	
	letraSorteada = SorteiaNumero(letras[colunaEscolhida].length);
	cartaAtual = letras[colunaEscolhida][letraSorteada]; 
			
	carta.innerHTML = cartaAtual[pos];
	

}


// =============================================================================


// Função que gera um número aleátorio de acordo com o parâmetro passado;

function SorteiaNumero(quantNums){
	

	var numSorteado = ((Math.random() * (quantNums - 1)).toFixed(0));

	console.log(numSorteado);


	return numSorteado;

}


// ========================================================================



// Fução que muda o texto do botão "Vira carta" 


function mudaTexto(bt){

var guardaTxt = bt.innerHTML;
bt.innerHTML = bt.name;
bt.name = guardaTxt;

}

// ======================================================




function AuxMudaEstadoCols(chave){

	for(var x = 0; x < caixasColuna.length; x++){

	if((colunasSelecionadas.length > 1) || (colunasSelecionadas.length == 1 && colunasSelecionadas[0] != x))	
	mudaEstadoEle(caixasColuna[x],chave); 
		
	}

}





// Função que muda o estado 'disabled' do elemento passado como parâmetro

function mudaEstadoEle(ele,chave){

ele.disabled = chave;	

}

// ==========================================================================
	
	

// Função que reativa os botões e vira a carta


function finalizaEvento(){

	viraCarta();
	
	btViraCarta.classList.add("custonHover");	
	btTrocaCarta.classList.add("custonHover");
	mudaEstadoEle(btViraCarta,false);
	mudaEstadoEle(btTrocaCarta,false);	
	AuxMudaEstadoCols(false);

}

// ==============================================



function toogleClass(ev){


if(ev.type == "mouseover"){
	

 	if(!(this.children[0].disabled)){

  //	if((!(this.children[0].checked)) || colunasSelecionadas.length > 1){

		this.classList.add("custonHover");
	}	


}else{

	if(this.classList.contains("custonHover"))
		this.classList.remove("custonHover");
	   
}

	
}
