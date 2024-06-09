// CONSULTAR API CLIMA //

async function consultarApiClima(){

    var cidade = document.getElementById("cidade").value;

    const key = "8a85fddd8be674738a25e8bec27e31cc";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + key;

    const response = await fetch(url);

    const dados = response.json();

    return dados;

}

document.getElementById("botao").addEventListener("click", (e) => {

    consultarApiClima().then(dados => {

        var tempmax = (dados.main.temp_max) - 273.15;
        var tempmin = (dados.main.temp_min) - 273.15;
        var sensacao = (dados.main.feels_like) - 273.15;
    
        console.log("Temp Max: " + tempmax.toFixed(1) + " C°");
        console.log("Temp Min: " + tempmin.toFixed(1) + " C°");
        console.log("Sensação Térmica: " + sensacao.toFixed(1) + " C°");

        const climaDiv = document.createElement("div");
        climaDiv.style.visibility = "visible";
        climaDiv.style.border = "1px solid black";
        climaDiv.style.borderRadius = "25px";
        climaDiv.style.margin = "20px";
        climaDiv.style.padding = "10px";
        climaDiv.style.width = "20%";
        climaDiv.style.height = "200px";
        climaDiv.innerHTML = "<p>Temp.Máx: " + tempmax.toFixed(1) + " C°</p><br>" + "<p>Temp.Min: " + tempmin.toFixed(1) + " C°</p><br>" + "<p>Sensação Térmica: " + sensacao.toFixed(1) + " C°</p><br>"


        climaContainer.appendChild(climaDiv);
    })

})


// --------------------------------------------------------------------

// CONSULTAR API PACOTE DE VIAGENS //

const airportList = [
    { code: "PAR", city: "Paris (PAR)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "LGW", city: "London (LHR)" },
    { code: "ATL", city: "Atlanta (ATL)" },
    { code: "PEK", city: "Beijing (PEK)" },
    { code: "LAX", city: "Los Angeles (LAX)" },
    { code: "DXB", city: "Dubai (DXB)" },
    { code: "HND", city: "Tokyo (HND)" },
    { code: "ORD", city: "Chicago (ORD)" },
    { code: "LHR", city: "London (LHR)" },
    { code: "PVG", city: "Shanghai (PVG)" },
    { code: "CDG", city: "Paris (CDG)" },
    { code: "DFW", city: "Dallas/Fort Worth (DFW)" },
    { code: "AMS", city: "Amsterdam (AMS)" },
    { code: "FRA", city: "Frankfurt (FRA)" },
    { code: "IST", city: "Istanbul (IST)" },
    { code: "SIN", city: "Singapore (SIN)" },
    { code: "CAN", city: "Guangzhou (CAN)" },
    { code: "ICN", city: "Seoul (ICN)" },
    { code: "JFK", city: "New York (JFK)" },
    { code: "KUL", city: "Kuala Lumpur (KUL)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "SFO", city: "San Francisco (SFO)" },
    { code: "BCN", city: "Barcelona (BCN)" },
    { code: "LAS", city: "Las Vegas (LAS)" },
    { code: "MIA", city: "Miami (MIA)" },
    { code: "GRU", city: "São Paulo (GRU)" },
    { code: "YYZ", city: "Toronto (YYZ)" },
    { code: "SYD", city: "Sydney (SYD)" },
    { code: "MEL", city: "Melbourne (MEL)" },
    { code: "FCO", city: "Rome (FCO)" },
    { code: "BKK", city: "Bangkok (BKK)" },
    { code: "MEX", city: "Mexico City (MEX)" },
    { code: "SEA", city: "Seattle (SEA)" },
    { code: "MUC", city: "Munich (MUC)" },
    { code: "EZE", city: "Buenos Aires (EZE)" },
    { code: "JNB", city: "Johannesburg (JNB)" },
    { code: "GIG", city: "Rio de Janeiro (GIG)" },
    { code: "HKG", city: "Hong Kong (HKG)" },
    { code: "BOM", city: "Mumbai (BOM)" },
    { code: "DEL", city: "Delhi (DEL)" },
    { code: "DUB", city: "Dublin (DUB)" },
    { code: "OSL", city: "Oslo (OSL)" },
    { code: "ARN", city: "Stockholm (ARN)" },
    { code: "ZRH", city: "Zurich (ZRH)" },
    { code: "HEL", city: "Helsinki (HEL)" },
    { code: "VIE", city: "Vienna (VIE)" },
    { code: "CPT", city: "Cape Town (CPT)" },
    { code: "LIM", city: "Lima (LIM)" },
    { code: "SCL", city: "Santiago (SCL)" },
    { code: "BOG", city: "Bogota (BOG)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "AGP", city: "Málaga (AGP)" },
    { code: "AKL", city: "Auckland (AKL)" },
    { code: "ATH", city: "Athens (ATH)" },
    { code: "BNE", city: "Brisbane (BNE)" },
    { code: "BRU", city: "Brussels (BRU)" },
    { code: "CUN", city: "Cancún (CUN)" },
    { code: "DME", city: "Moscow (DME)" },
    { code: "DUS", city: "Düsseldorf (DUS)" },
    { code: "GVA", city: "Geneva (GVA)" },
    { code: "HNL", city: "Honolulu (HNL)" },
    { code: "JED", city: "Jeddah (JED)" },
    { code: "KIX", city: "Osaka (KIX)" },
    { code: "KTM", city: "Kathmandu (KTM)" },
    { code: "LGA", city: "New York (LGA)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "LYS", city: "Lyon (LYS)" },
    { code: "MAA", city: "Chennai (MAA)" },
    { code: "MAN", city: "Manchester (MAN)" },
    { code: "MNL", city: "Manila (MNL)" },
    { code: "MSP", city: "Minneapolis (MSP)" },
    { code: "NRT", city: "Tokyo (NRT)" },
    { code: "OTP", city: "Bucharest (OTP)" },
    { code: "PHX", city: "Phoenix (PHX)" },
    { code: "PRG", city: "Prague (PRG)" },
    { code: "SAN", city: "San Diego (SAN)" },
    { code: "SFO", city: "San Francisco (SFO)" },
    { code: "SGN", city: "Ho Chi Minh City (SGN)" },
    { code: "SVO", city: "Moscow (SVO)" },
    { code: "TPE", city: "Taipei (TPE)" },
    { code: "VCE", city: "Venice (VCE)" },
    { code: "WAW", city: "Warsaw (WAW)" },
    { code: "YUL", city: "Montreal (YUL)" },
    { code: "YYC", city: "Calgary (YYC)" },
    { code: "ZAG", city: "Zagreb (ZAG)" },
    { code: "CMN", city: "Casablanca (CMN)" },
    { code: "DOH", city: "Doha (DOH)" },
    { code: "LUX", city: "Luxembourg (LUX)" },
    { code: "LED", city: "Saint Petersburg (LED)" },
    { code: "LJU", city: "Ljubljana (LJU)" },
    { code: "MCT", city: "Muscat (MCT)" },
    { code: "MLE", city: "Malé (MLE)" },
    { code: "MRU", city: "Mauritius (MRU)" },
    { code: "NBO", city: "Nairobi (NBO)" },
    { code: "NCE", city: "Nice (NCE)" },
    { code: "SXM", city: "Saint Martin (SXM)" },
    { code: "TLV", city: "Tel Aviv (TLV)" },
    { code: "TXL", city: "Berlin (TXL)" },
    { code: "VNO", city: "Vilnius (VNO)" },
    { code: "CDG", city: "Paris (CDG)" },
    { code: "ORY", city: "Paris (ORY)" },
    { code: "BVA", city: "Paris (BVA)" },
    { code: "AMS", city: "Amsterdam (AMS)" },
    { code: "ATH", city: "Athens (ATH)" },
    { code: "BCN", city: "Barcelona (BCN)" },
    { code: "BRU", city: "Brussels (BRU)" },
    { code: "BUD", city: "Budapest (BUD)" },
    { code: "CPH", city: "Copenhagen (CPH)" },
    { code: "DME", city: "Moscow (DME)" },
    { code: "DUB", city: "Dublin (DUB)" },
    { code: "DUS", city: "Düsseldorf (DUS)" },
    { code: "EDI", city: "Edinburgh (EDI)" },
    { code: "FCO", city: "Rome (FCO)" },
    { code: "GVA", city: "Geneva (GVA)" },
    { code: "HAM", city: "Hamburg (HAM)" },
    { code: "HEL", city: "Helsinki (HEL)" },
    { code: "IST", city: "Istanbul (IST)" },
    { code: "KBP", city: "Kyiv (KBP)" },
    { code: "LED", city: "Saint Petersburg (LED)" },
    { code: "LHR", city: "London (LHR)" },
    { code: "LGW", city: "London (LGW)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "LYS", city: "Lyon (LYS)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "MAN", city: "Manchester (MAN)" },
    { code: "MUC", city: "Munich (MUC)" },
    { code: "MXP", city: "Milan (MXP)" },
    { code: "OSL", city: "Oslo (OSL)" },
    { code: "OTP", city: "Bucharest (OTP)" },
    { code: "PRG", city: "Prague (PRG)" },
    { code: "RIX", city: "Riga (RIX)" },
    { code: "SVO", city: "Moscow (SVO)" },
    { code: "TXL", city: "Berlin (TXL)" },
    { code: "VIE", city: "Vienna (VIE)" },
    { code: "WAW", city: "Warsaw (WAW)" },
    { code: "ZRH", city: "Zurich (ZRH)" },
    { code: "BKK", city: "Bangkok (BKK)" },
    { code: "BOM", city: "Mumbai (BOM)" },
    { code: "CAN", city: "Guangzhou (CAN)" },
    { code: "CGK", city: "Jakarta (CGK)" },
    { code: "DEL", city: "Delhi (DEL)" },
    { code: "DOH", city: "Doha (DOH)" },
    { code: "HKG", city: "Hong Kong (HKG)" },
    { code: "ICN", city: "Seoul (ICN)" },
    { code: "KUL", city: "Kuala Lumpur (KUL)" },
    { code: "MNL", city: "Manila (MNL)" },
    { code: "NRT", city: "Tokyo (NRT)" },
    { code: "SGN", city: "Ho Chi Minh City (SGN)" },
    { code: "SIN", city: "Singapore (SIN)" },
    { code: "TPE", city: "Taipei (TPE)" },
    { code: "OPO", city: "Porto (OPO)" },
    { code: "LPA", city: "Las Palmas (LPA)" },
    { code: "BEG", city: "Belgrade (BEG)" },
    { code: "PRN", city: "Pristina (PRN)" },
    { code: "SOF", city: "Sofia (SOF)" },
    { code: "ZAG", city: "Zagreb (ZAG)" },
    { code: "PRG", city: "Prague (PRG)" },
    { code: "CPH", city: "Copenhagen (CPH)" },
    { code: "TLL", city: "Tallinn (TLL)" },
    { code: "HEL", city: "Helsinki (HEL)" },
    { code: "BUD", city: "Budapest (BUD)" },
    { code: "KEF", city: "Reykjavik (KEF)" },
    { code: "DUB", city: "Dublin (DUB)" },
    { code: "FCO", city: "Rome (FCO)" },
    { code: "LIN", city: "Milan (LIN)" },
    { code: "MXP", city: "Milan (MXP)" },
    { code: "AMS", city: "Amsterdam (AMS)" },
    { code: "OSL", city: "Oslo (OSL)" },
    { code: "WAW", city: "Warsaw (WAW)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "OTP", city: "Bucharest (OTP)" },
    { code: "SVO", city: "Moscow (SVO)" },
    { code: "LED", city: "Saint Petersburg (LED)" },
    { code: "BCN", city: "Barcelona (BCN)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "AGP", city: "Málaga (AGP)" },
    { code: "ALC", city: "Alicante (ALC)" },
    { code: "PMI", city: "Palma de Mallorca (PMI)" },
    { code: "ARN", city: "Stockholm (ARN)" },
    { code: "GOT", city: "Gothenburg (GOT)" },
    { code: "NYO", city: "Stockholm (NYO)" },
    { code: "VIE", city: "Vienna (VIE)" },
    { code: "BRU", city: "Brussels (BRU)" },
    { code: "CRL", city: "Brussels (CRL)" },
    { code: "CPH", city: "Copenhagen (CPH)" },
    { code: "TLL", city: "Tallinn (TLL)" },
    { code: "HEL", city: "Helsinki (HEL)" },
    { code: "BUD", city: "Budapest (BUD)" },
    { code: "KEF", city: "Reykjavik (KEF)" },
    { code: "DUB", city: "Dublin (DUB)" },
    { code: "FCO", city: "Rome (FCO)" },
    { code: "LIN", city: "Milan (LIN)" },
    { code: "MXP", city: "Milan (MXP)" },
    { code: "AMS", city: "Amsterdam (AMS)" },
    { code: "OSL", city: "Oslo (OSL)" },
    { code: "WAW", city: "Warsaw (WAW)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "OTP", city: "Bucharest (OTP)" },
    { code: "SVO", city: "Moscow (SVO)" },
    { code: "LED", city: "Saint Petersburg (LED)" },
    { code: "BCN", city: "Barcelona (BCN)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "AGP", city: "Málaga (AGP)" },
    { code: "ALC", city: "Alicante (ALC)" },
    { code: "PMI", city: "Palma de Mallorca (PMI)" },
    { code: "ARN", city: "Stockholm (ARN)" },
    { code: "GOT", city: "Gothenburg (GOT)" },
    { code: "NYO", city: "Stockholm (NYO)" },
    { code: "VIE", city: "Vienna (VIE)" },
    { code: "BRU", city: "Brussels (BRU)" },
    { code: "CRL", city: "Brussels (CRL)" },
    { code: "CPH", city: "Copenhagen (CPH)" },
    { code: "TLL", city: "Tallinn (TLL)" },
    { code: "HEL", city: "Helsinki (HEL)" },
    { code: "BUD", city: "Budapest (BUD)" },
    { code: "KEF", city: "Reykjavik (KEF)" },
    { code: "DUB", city: "Dublin (DUB)" },
    { code: "FCO", city: "Rome (FCO)" },
    { code: "LIN", city: "Milan (LIN)" },
    { code: "MXP", city: "Milan (MXP)" },
    { code: "AMS", city: "Amsterdam (AMS)" },
    { code: "OSL", city: "Oslo (OSL)" },
    { code: "WAW", city: "Warsaw (WAW)" },
    { code: "LIS", city: "Lisbon (LIS)" },
    { code: "OTP", city: "Bucharest (OTP)" },
    { code: "SVO", city: "Moscow (SVO)" },
    { code: "LED", city: "Saint Petersburg (LED)" },
    { code: "BCN", city: "Barcelona (BCN)" },
    { code: "MAD", city: "Madrid (MAD)" },
    { code: "AGP", city: "Málaga (AGP)" },
    { code: "ALC", city: "Alicante (ALC)" },
    { code: "PMI", city: "Palma de Mallorca (PMI)" },
    { code: "ARN", city: "Stockholm (ARN)" },
    // Adicione mais aeroportos conforme necessário
];

function desabilitarCheckout() {
    document.getElementById("checkout").disabled = true;
}

function habilitarCheckout() {
    document.getElementById("checkout").disabled = false;
}

function formatarDataDePartida(){

    const dateInput = document.getElementById("checkin").value;

    const date = new Date(dateInput);

    // Obtém o ano, mês e dia
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário

    // Formata a data como YYYY-MM-DD
    const formattedDate = year + "-" + month + "-" + (parseInt(day)+1);

    return formattedDate;

}

function calcularIntervaloDasDatas(){

    const dataInicio = document.getElementById("checkin").value;
    const dataFim = document.getElementById("checkout").value;

    const date1 = new Date(dataInicio);
    const date2 = new Date(dataFim);

    // Calcula a diferença em milissegundos
    const diffTime = Math.abs(date2 - date1);

    // Converte a diferença de milissegundos para dias
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;

}

function transformarSiglaEmCidade(code) {
    const airport = airportList.find(objeto => objeto.code === code.toUpperCase());
    return airport ? airport.city : "Aeroporto não encontrado";
}

async function consultarApiPassagensAereas(){

    const Origem = document.getElementById("origem").value;

    const DataDePartida = formatarDataDePartida();

    const Intervalo = calcularIntervaloDasDatas();

    var url;

    if (document.getElementById("checkout").disabled == true){
        url = "https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=" + Origem + "&departureDate=" + DataDePartida + "&oneWay=true"; 
    } else {
        url = "https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=" + Origem + "&departureDate=" + DataDePartida + "&duration=" + Intervalo;
    }    

    const options = {
        method: "GET",
        headers: {
            "Authorization" : "Bearer WyK7wEiaxmfIrchAIr2DhLBEMCHt"
        }
    }

    const response = await fetch(url, options);

    const dados = response.json();

    return dados;

}

document.getElementById("botao2").addEventListener("click", (e) => {

    consultarApiPassagensAereas().then(dados => {

        if (document.getElementById("checkout").disabled == true) {
            // Acessa o array de objetos 'data' dentro do JSON
            dados.data.forEach(objeto => {
                const bilheteDiv = document.createElement("div");
                bilheteDiv.style.visibility = "visible";
                bilheteDiv.style.border = "1px solid black";
                bilheteDiv.style.borderRadius = "25px";
                bilheteDiv.style.margin = "20px auto";
                bilheteDiv.style.padding = "10px";
                bilheteDiv.style.width = "80%";
                bilheteDiv.style.height = "150px";
                bilheteDiv.style.display = "flex"; 
                
                const origemDiv = document.createElement("div");
                origemDiv.style.alignContent = "center";
                origemDiv.style.borderRight = "1px solid black";
                origemDiv.style.flex = "1"; 
                origemDiv.style.height = "100%";
                origemDiv.style.textAlign = "center";
                origemDiv.innerHTML = "<label><b>Origem:</b></label><br><p>" + transformarSiglaEmCidade(objeto.origin) + "</p>";
                
                const destinoDiv = document.createElement("div");
                destinoDiv.style.alignContent = "center";
                destinoDiv.style.borderRight = "1px solid black";
                destinoDiv.style.flex = "1"; 
                destinoDiv.style.height = "100%";
                destinoDiv.style.textAlign = "center";
                destinoDiv.innerHTML = "<label><b>Destino:</b></label><br><p>" + transformarSiglaEmCidade(objeto.destination) + "</p>";
                
                const priceDiv = document.createElement("div");
                priceDiv.style.alignContent = "center";
                priceDiv.style.flex = "1"; 
                priceDiv.style.height = "100%";
                priceDiv.style.textAlign = "center";
                priceDiv.innerHTML = "<label><b>Destino:</b></label><br><p>€" + objeto.price.total + "</p>";
                
                bilheteDiv.appendChild(origemDiv);
                bilheteDiv.appendChild(destinoDiv);
                bilheteDiv.appendChild(priceDiv);
                bilheteContainer.appendChild(bilheteDiv);
            })    
        } else {
            // Acessa o array de objetos 'data' dentro do JSON
            dados.data.forEach(objeto => {
                // Formatar Data de Ida    
                var dataoriginalIda = objeto.departureDate;
                var partesIda = dataoriginalIda.split("-");
                dataFormatadaIda = partesIda[2] + '/' + partesIda[1] + '/' + partesIda[0];  

                // Formatar Data de Volta
                var dataoriginalVolta = objeto.returnDate;
                var partesVolta = dataoriginalVolta.split("-");
                dataFormatadaVolta = partesVolta[2] + '/' + partesVolta[1] + '/' + partesVolta[0];  

                const bilheteDiv = document.createElement("div");
                bilheteDiv.style.visibility = "visible";
                bilheteDiv.style.border = "1px solid black";
                bilheteDiv.style.borderRadius = "25px";
                bilheteDiv.style.margin = "20px auto";
                bilheteDiv.style.padding = "10px";
                bilheteDiv.style.width = "80%";
                bilheteDiv.style.height = "150px";
                bilheteDiv.style.display = "flex"; 
                
                const origemDiv = document.createElement("div");
                origemDiv.style.alignContent = "center";
                origemDiv.style.borderRight = "1px solid black";
                origemDiv.style.flex = "1"; 
                origemDiv.style.height = "100%";
                origemDiv.style.textAlign = "center";
                origemDiv.innerHTML = "<label><b>Origem:</b></label><br><p>" + transformarSiglaEmCidade(objeto.origin) + "</p>";
                
                const destinoDiv = document.createElement("div");
                destinoDiv.style.alignContent = "center";
                destinoDiv.style.borderRight = "1px solid black";
                destinoDiv.style.flex = "1"; 
                destinoDiv.style.height = "100%";
                destinoDiv.style.textAlign = "center";
                destinoDiv.innerHTML = "<label><b>Destino:</b></label><br><p>" + transformarSiglaEmCidade(objeto.destination) + "</p>";

                const IdaDiv = document.createElement("div");
                IdaDiv.style.alignContent = "center";
                IdaDiv.style.borderRight = "1px solid black";
                IdaDiv.style.flex = "1"; 
                IdaDiv.style.height = "100%";
                IdaDiv.style.textAlign = "center";
                IdaDiv.innerHTML = "<label><b>Data de Ida:</b></label><br><p>" + dataFormatadaIda + "</p>";

                const VoltaDiv = document.createElement("div");
                VoltaDiv.style.alignContent = "center";
                VoltaDiv.style.borderRight = "1px solid black";
                VoltaDiv.style.flex = "1"; 
                VoltaDiv.style.height = "100%";
                VoltaDiv.style.textAlign = "center";
                VoltaDiv.innerHTML = "<label><b>Data de Volta:</b></label><br><p>" + dataFormatadaVolta + "</p>";
                
                const priceDiv = document.createElement("div");
                priceDiv.style.alignContent = "center";
                priceDiv.style.flex = "1"; 
                priceDiv.style.height = "100%";
                priceDiv.style.textAlign = "center";
                priceDiv.innerHTML = "<label><b>Destino:</b></label><br><p>€" + objeto.price.total + "</p>";
                
                bilheteDiv.appendChild(origemDiv);
                bilheteDiv.appendChild(destinoDiv);
                bilheteDiv.appendChild(IdaDiv);
                bilheteDiv.appendChild(VoltaDiv);
                bilheteDiv.appendChild(priceDiv);
                bilheteContainer.appendChild(bilheteDiv);
            })
        }    

    })

})

// --------------------------------------------------------------------

async function consultarApiPiadas() {

    const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=pt");

    const dados = response.json();

    return dados;

}

document.getElementById("botao3").addEventListener("click", (e) => {

    consultarApiPiadas().then(dados => {
        console.log(dados.setup);
        console.log(dados.delivery);

        const piadaDiv = document.createElement("div");
        piadaDiv.style.visibility = "visible";
        piadaDiv.style.border = "1px solid black";
        piadaDiv.style.borderRadius = "25px";
        piadaDiv.style.margin = "20px";
        piadaDiv.style.padding = "10px";
        piadaDiv.style.paddingTop = "5px";
        piadaDiv.style.width = "25%";
        piadaDiv.style.height = "80px";
        piadaDiv.innerHTML = "<p>Pergunta: " + dados.setup + "</p>" + "<p>Resposta: " + dados.delivery + "</p><br>";
        piadaContainer.appendChild(piadaDiv);
    })

})