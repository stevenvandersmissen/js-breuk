/* Gegenereerd door tools/bouw.py — niet met de hand aanpassen.
   Publieke dataset van JS-KUUR: opdrachten, regels en vragen,
   zonder énige oplossing of startcode. */
window.JSB = { data: {
 "meta": {
  "titel": "JS-BREUK",
  "ondertitel": "Debuggen, testen en kapotte code lezen",
  "doelgroep": "6de jaar (na JS-KUUR en JS-VOLG)",
  "noot": "Enige bron voor de site. Draai: python3 tools/bouw.py, daarna node tools/tests/proef.js."
 },
 "topics": [
  {
   "id": "melding",
   "num": "01",
   "titel": "De melding is geen scheldwoord",
   "dots": "Een foutregel is een adres. Lezen, begrijpen, noemen.",
   "theorie": "<p>JavaScript schreeuwt niet om je te kleineren, het geeft een <b>adres</b>: <code>TypeError: prijs.slice is not a function (app.js:7)</code> zegt wát er verkeerd liep, wáár het liep en het type probleem. Beginners kijken naar het woord <code>error</code> en gaan terug typen; een denker leest de hele regel en gaat naar lijn 7.</p><p>Drie soorten, drie verschillende reflexen: een <code>SyntaxError</code> betekent dat je code nog niet eens gelezen werd — haakjes, aanhalingstekens, een vergeten komma. Een <code>TypeError</code> betekent dat je iets van het verkeerde soort aanraakt — een tekst als functie, <code>undefined</code> als lijst. Een <code>ReferenceError</code> betekent dat een naam niet bestaat — typfout, te laat gedeclareerd, of buiten de scope waar je dacht te zitten.</p><p>En: <b>verzwijg nooit</b>. Een <code>catch (e) {}</code> maakt van een melding een verdwijning. Wie vangt, benoemt wat hij deed.</p>",
   "voorbeeld": {
    "kop": "Eén regel, drie vragen",
    "code": "/* console.log(prijs(4)); */\n/* TypeError: Cannot read properties of undefined (reading 'aantal') (winkel.js:4) */\n\n/* 1. WAT?   iets is undefined en je wilde er .aantal van lezen\n   2. WAAR? regel 4 van winkel.js\n   3. WAAROM? het object dat je voor je had, was er niet (meer)\n\nfunction totaal(mandje) {\n  if (!mandje) throw new TypeError(\"geen mandje meegekregen\");\n  return mandje.aantal * mandje.prijs;\n}\ntry {\n  console.log(totaal(null));\n} catch (fout) {\n  console.log(\"opgelost als:\", fout.message);\n}",
    "uitleg": "Eerst de melding lezen, dan pas iets veranderen. Dat is geen discipline, dat is tijdwinst: zonder adres gok je, en gokken duurt langer dan kijken."
   },
   "oefeningen": [
    {
     "soort": "Warm-up",
     "titel": "Zelf een melding maken",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>Schrijf <code>function prijsVan(input)</code>: gooi een <code>TypeError</code> met als tekst <code>prijs moet een getal zijn</code> als <code>input</code> geen getal is</li><li>Roep de functie twee keer aan in een <code>try/catch</code>: één keer met <code>\"18\"</code> (dat mag lukken: zet om met <code>Number</code>, vermenigvuldig met <code>PROEVEN</code> en print het), één keer met <code>[]</code></li><li>Print in de catch de <code>message</code> van de fout</li><li>Vermóéd eerst: wat print de console, en in welke volgorde? Schrijf je vermoeden in het vermoed-vak vóór je op <em>Voer uit</em> klikt</li><li>Controleer met <code>geef(typeof \"18\" === \"number\")</code> → <code>false</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:function\\s+prijsVan[(]::Schrijf prijsVan(input).",
      "code:\\bprijsVan\\s*[(]::Roep prijsVan ook minstens twee keer aan.",
      "code:\\bcatch\\s*[(]::De aanroep met de foute input moet in een catch eindigen.",
      "code:TypeError::Gooi een TypeError met die melding.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:false::Die vergelijking levert false op.",
      "niet:\\bvar\\b::var bestaat hier niet: kies const of let.",
      "uitvoer:54::Een console-spoor ontbreekt nog: 54.",
      "uitvoer:prijs moet een getal zijn::Een console-spoor ontbreekt nog: prijs moet een getal zijn.",
      "geenFout::Je code crasht: vang wat je zelf gooit."
     ],
     "verwacht": {
      "uitvoer": [
       "54",
       "prijs moet een getal zijn"
      ],
      "geeft": false
     }
    },
    {
     "soort": "Oefening",
     "titel": "Melding op maat",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Gegeven: <code>const regels = [\"lijn 1\", \"lijn 2\", \"lijn 3\"];</code></li><li>Schrijf <code>function regelVan(lijst, nr)</code>: gooi een <code>RangeError</code> met de tekst <code>regel {nr} bestaat niet</code> als <code>nr &lt; 1</code> of groter dan de lijst</li><li>Anders geef je de regel terug</li><li>Probeer <code>0</code> én <code>9</code> in dezelfde <code>try/catch</code> en print telkens de melding</li><li>Vermóéd de console vóór je uitvoert</li><li>Controleer met <code>geef([regelVan(regels, 2) === \"lijn 2\", regels.length])</code> → <code>[true,3]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:\\bRangeError\\b::Gooi hier een RangeError: het is een bereikprobleem.",
      "code:bestaat niet::Die melding moet je tekst bevatten.",
      "code:\\bcatch\\s*[(]::Twee keer proberen, één keer vangen per keer.",
      "code:\\.length::Meet de grens aan de hand van .length.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[true,3]::Tweede regel klopt en de lijst telt drie.",
      "uitvoer:regel 0 bestaat niet::Een console-spoor ontbreekt nog: regel 0 bestaat niet.",
      "uitvoer:regel 9 bestaat niet::Een console-spoor ontbreekt nog: regel 9 bestaat niet.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er loopt nog iets mis met die grens."
     ],
     "verwacht": {
      "uitvoer": [
       "regel 0 bestaat niet",
       "regel 9 bestaat niet"
      ],
      "geeft": [
       true,
       3
      ]
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Je krijgt <code>ReferenceError: x is not defined</code>. Wat is de <b>minst</b> waarschijnlijke oorzaak?",
     "opties": [
      "je gebruikt <code>x</code> buiten de bloc waarin het met const is gedeclareerd",
      "je typt <code>x</code> vóór de declaratie die eronder staat",
      "je vergeet een komma tussen twee eigenschappen in een object",
      "je leest <code>x</code> in een andere module dan waar hij staat"
     ],
     "goed": 2,
     "uitleg": "Een vergeten komma in een object is een opbouwfout: de engine leest je code nog niet eens, dus die geeft een SyntaxError. Een ReferenceError gaat altijd over een naam die de engine op dat ogenblik niet kent.",
     "check": "mv:0::Drie van de vier gaan over namen, één over vorm."
    },
    {
     "kind": "open",
     "vraag": "Zet voor <code>TypeError</code>, <code>SyntaxError</code> en <code>ReferenceError</code> in één zin neer wat er aan de hand is en waarnaar je op zoek gaat in je bestand.",
     "keywords": [
      "type",
      "opbouw",
      "naam",
      "syntax",
      "haakje",
      "declareer",
      "scope",
      "bestaat",
      "verkeerd",
      "regel"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "verkeerde soort",
      "engine kan niet lezen",
      "naam onbekend"
     ],
     "goedkeurExtra": "Juist: TypeError = verkeerde soort aangeraakt, zoek naar de waarde; SyntaxError = de vorm klopt niet, zoek naar haakjes en komma's; ReferenceError = naam onbekend, zoek naar declaratie en scope.",
     "terug": "Verwacht: SyntaxError — de code wordt nog niet gelezen, kijk naar haakjes, aanhalingstekens en komma's. TypeError — je raakt iets van het verkeerde soort aan, kijk naar wat er in die variabele zit. ReferenceError — die naam bestaat hier niet, kijk naar typfouten, scope en de volgorde van declaraties.",
     "check": "op:1::Drie soorten, drie korte antwoorden."
    },
    {
     "kind": "mc",
     "vraag": "Waarom is <code>try { … } catch (e) {}</code> tijdens debuggen actief schadelijk?",
     "opties": [
      "omdat de enige melding die je had verdwijnt: je verwijdert je eigen spoor",
      "omdat JavaScript een lege catch niet toelaat",
      "omdat catch dan trager wordt",
      "omdat je daarna een SyntaxError krijgt"
     ],
     "goed": 0,
     "uitleg": "Geen foutmelding is erger dan een foutmelding: zonder boodschap weet je alleen dat er iets mis is, niet wat en waar.",
     "check": "mv:2::Wat verlies je precies?"
    }
   ]
  },
  {
   "id": "stapel",
   "num": "02",
   "titel": "Regelnummers en de callstack",
   "dots": "Van 'het foutlopende bericht' naar 'de regel die het veroorzaakte'.",
   "theorie": "<p>Een stacktrace is een <b>reisdagboek van boven naar beneden</b>. De bovenste regel is waar het misliep; de regels eronder zijn wie er allemaal voor nodig had. <code>bij (app.js:9)</code>, <code>totaal (app.js:14)</code>, <code>hoofd (app.js:21)</code> leest als: hoofd riep totaal, totaal riep bij, en bij viel om.</p><p>Tweërlei bedoteling. Eén: de bovenste regel is vaak een <b>hulpfunctie</b> die alleen de boodschap brengt — de eigenlijke fout zit in de aanroep daaronder. Twee: bij asynchrone code toont de trace de afwikkeling, niet jouw aanroep; dan zegt <code>at Timeout.&lt;anonymous&gt;</code> meer over de klok dan over jouw fout.</p><p>Lees de regelnummers: klik ernaar, of tel vanaf de bovenkant van je bestand. Een fout op regel 9 staat soms op regel 7, want één vergeten afsluiting schuift de hele telling op.</p>",
   "voorbeeld": {
    "kop": "Waar ligt het écht?",
    "code": "function naamVan(gast) { return gast.naam.toUpperCase(); }\nfunction kaartjes(gasten) { return gasten.map(naamVan); }\nfunction print() { return kaartjes([{ naam: \"Merel\" }, {}]); }\n\ntry {\n  print();\n} catch (fout) {\n  console.log(fout.stack.split(\"\\n\").slice(0, 4).join(\" ← \"));\n}\n/* De trace loopt door tot kaartjes: de lege gast kwam daar binnen. */",
    "uitleg": "De bovenste regel zegt wat er omviel (een lege gast). De tweede zegt wie hem liet vallen (<code>map</code>). De derde zegt vanwaar het kwam. Debuggen is die derde lezen."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Een trace laten praten",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>Schrijf twee functies: <code>function dop(n)</code> vermenigvuldigt <code>n</code> met 6, en <code>function gooi(lijst)</code> roept <code>dop</code> aan op élk element van <code>lijst</code> met <code>map</code></li><li>Roep in een <code>try/catch</code> <code>gooi([2, 4, \"zes\"])</code> aan — <code>\"zes\"</code> doet <code>dop</code> niet vallen, dus laat <code>dop</code> zélf een <code>TypeError</code> gooien met <code>dop wil een getal</code> als <code>n</code> geen getal is</li><li>Print in de catch de boodschap van de fout, en noteer in een <b>commentaar</b> in <code>functie → bestand → regel</code>-vorm waar je het probleem gaan zoeken zou hebben</li><li>Vermóéd de console vóór je op <em>Voer uit</em> klikt</li><li>Controleer met <code>geef([3, 5].map(dop).join(\"-\"))</code> → <code>\"18-30\"</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:PROEVEN::Gebruik je vaste waarde ook érgens in de code.",
      "code:PROEVEN::Gebruik je vaste waarde ook érgens.",
      "code:\\bmap\\s*[(]::Laat gooi via map over de lijst gaan.",
      "code:dop wil een getal::Die melding moet uit dop zelf komen.",
      "code:console[.]log\\s*[(]::Print de boodschap van de catch.",
      "code:\\.stack|→::Noteer je adres: één pijl in commentaar, of een stuk .stack.",
      "uitvoer:TypeError: dop wil een getal::Die boodschap moet in de console verschijnen.",
      "vw:1::Vermoed die ene console-regel, vóór je uitvoert.",
      "geeftStrikt:\"18-30\"::Twee doppen, met een koppelteken.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er valt nog iets buiten je catch."
     ],
     "verwacht": {
      "uitvoer": [
       "TypeError: dop wil een getal"
      ],
      "geeft": "18-30"
     }
    },
    {
     "soort": "Bonus",
     "titel": "Vertrouw de bovenste regel niet",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Vier commando's voor dit onderdeel — geen startcode, wél nadenken: (1) waar viel het, (2) wie riep dat aan, (3) welke waarde kwam er binnen, (4) welke regel had die waarde moeten zetten</li><li>Schrijf <code>function totaal(koppel)</code>: vermenigvuldig <code>koppel.oud</code> met <code>koppel.nieuw</code>; gooi een <code>TypeError</code> met <code>te weinig getallen</code> als een van beide ontbreekt</li><li>Roep <code>totaal({ \"oud\": 40 })</code> aan met een <b>string</b> als waarde: jouw controle moet op <code>typeof</code> werken, niet op <code>in</code></li><li>Drie proefnames in één <code>for</code>-lus: <code>{ \"oud\": 40 }</code>, <code>{}</code> en <code>{ oud: 40, nieuw: 60 }</code>; print telkens de melding of het getal, en <code>JSON.stringify</code> van <code>Object.keys</code> van wat er binnenkwam</li><li>Vermóéd élke console-regel</li><li>Controleer met <code>geef(totaal({ oud: 40, nieuw: 60 }))</code> → <code>2400</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:typeof::Controleer op type, niet op aanwezigheid.",
      "code:JSON[.]stringify::Print de sleutels met JSON.stringify.",
      "code:\\bcatch\\s*[(]::Elke proefnaam moet gevangen worden.",
      "code:\\bof\\b::Drie casos in één lus met for..of.",
      "vw:3::Vermoed al 3 regels console, vóór je uitvoert.",
      "geeftStrikt:2400::Met twee getallen erin wordt het 2400.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er valt nog iets buiten je catch."
     ],
     "verwacht": {
      "geeft": 2400
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Een stacktrace toont <code>at naamVan (app.js:3)</code>, <code>at kaartjes (app.js:4)</code>, <code>at print (app.js:5)</code>. Welke regel lees je als eerste?",
     "opties": [
      "regel 3, maar je vraagt je meteen af wat er in <code>kaartjes</code> werd meegegeven",
      "regel 5, want daar begint het verhaal",
      "regel 4, want het midden is altijd de schuldige",
      "geen van drie: de engine wijst altijd de echte dader aan"
     ],
     "goed": 0,
     "uitleg": "Bovenaan staat de aanraking die omviel; de vraag die volgt is niet 'waar' maar 'wat kwam er binnen'. De trace is een lijst waardes, geen lijst daders.",
     "check": "mv:0::Waar valt het, en wat was de inbreng?"
    },
    {
     "kind": "open",
     "vraag": "Bij asynchrone code is de trace vaak onbruikbaar. Benoem twee redenen en wat je dan in de plaats doet.",
     "keywords": [
      "microtask",
      "afwikkeling",
      "event",
      "loop",
      "klok",
      "verliest",
      "context",
      "log",
      "synchronous",
      "then",
      "catch"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "de callstack is al leeg",
      "wie er wacht is niet wie het deed"
     ],
     "goedkeurExtra": "Goed: (1) de callback draait in een nieuwe afwikkeling zonder jouw callers, (2) je stack is op dat moment al opgekuist. In de plaats: log je eigen context vóór de aanroep, en vang met .catch op de plek waar je de belofte maakte.",
     "terug": "Verwacht: de callback wordt later en elders opgepakt, dus jouw stap-voor-stap verhaal is weg. therefore: log wat je meegaf vóór je afvuurt, en vang op de plek waar je de belofte in elkaar stak (.catch of try om je await).",
     "check": "op:1::Twee redenen plus een alternatief."
    },
    {
     "kind": "mc",
     "vraag": "Je zette <code>console.log</code> in een lus en kreeg 4 000 regels. Wat is de slimste next move?",
     "opties": [
      "log alleen nog wanneer er iets verandert, of tel en log één samenvatting",
      "log nog twee variabelen extra om te zien wat er echt speelt",
      "vervang de lus door recursie zodat het minder regels worden",
      "start de zandbak opnieuw met een groter venster"
     ],
     "goed": 0,
     "uitleg": "Meetpunten zijn geen schroeven: meer is zelden beter. Eén log per verandering, of één getal bovenaan, houdt je spoor leesbaar.",
     "check": "mv:2::Wat maakt die 4 000 regels bruikbaar?"
    }
   ]
  },
  {
   "id": "loggen",
   "num": "03",
   "titel": "Console.log is je meetinstrument",
   "dots": "Halveren, niet gokken: meet in het midden en kies een kant.",
   "theorie": "<p>Debuggen is geen kunst van het raden, wel van het <b>meten</b>. Eén <code>console.log(x)</code> op de goede plek is meer waard dan tien op de foute. De techniek is halveren: zet één meting in het midden van je programma. Klopt de waarde daar, dan ligt de breuk later; klopt ze niet, dan eerder. Twee minuten, halve programma.</p><p>Log niet wat je weet, log wat je <b>vermoedt</b>: <code>console.log(\"vóór de lus\", totaal)</code>. Een label is gratis en een ongelabeld <code>18</code> tussen dertig regels is raden.</p><p>Wil je tellen hoe vaak een lus loopt of of een functie écht wordt aangeroepen: een teller en één log na afloop. Wil je zien of je code überhaupt langs een plek komt: een log met een uniek woord als <code>HIER</code>.</p>",
   "voorbeeld": {
    "kop": "Halveren met één regel",
    "code": "function gemiddelde(siffrs) {\n  const som = siffrs.reduce((a, b) => a + b, 0);\n  console.log(\"meetpunt: som\", som, \"lengte\", siffrs.length);\n  return som / siffrs.length;\n}\nconsole.log(gemiddelde([10, 20, 30]));\n/*Console:\n   meetpunt: som 60 lengte 3\n   20\n   → meetpunt klopt, dus de deling is het probleem niet: de waarde was al goed */",
    "uitleg": "Eén log, twee getallen, en je weet meteen of je inputs of je berekening zoekt. Zonder meetpunt zou je hier drie minuten naar staardennen."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Waar loopt de range stuk",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Schrijf <code>function vind(lijst, waarde)</code>: binaire zoekronde met <code>laag</code>, <code>hoog</code> en <code>Math.floor</code></li><li>Voeg in de lus één <code>console.log</code> toe met het <b>label</b> <code>ronde</code>, gevolgd door <code>laag</code> en <code>hoog</code></li><li>Zoek <code>7</code> in <code>[1,3,5,7,9]</code> in <b>twee beproevingen</b>: één met de goede start (<code>hoog = lijst.length - 1</code>) en één waarbij je de <code>hoog</code>-start als parameter meegeeft (<code>lijst.length</code>, de bug). Print het resultaat van de bug met het label <code>met bug</code></li><li>Vermóéd élke console-regel, in volgorde</li><li>Controleer met <code>geef([vind([1,3,5,7,9], 7), vind([1,3,5,7,9], 8)])</code> → <code>[3,-1]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:ronde::Elke meting heeft een label nodig.",
      "code:\\blaag\\b::Met een linkergrens in de range.",
      "code:Math[.]floor::Halveren doe je met Math.floor.",
      "code:console[.]log\\s*[(]::Zonder log is er geen spoor.",
      "vw:9::Vermoed al 9 regels console, vóór je uitvoert.",
      "geeftStrikt:[3,-1]::Gevonden index, plus de nette misser.",
      "uitvoer:ronde 0 4::Die regel moet in de console verschijnen: ronde 0 4.",
      "uitvoer:ronde 3 4::Die regel moet in de console verschijnen: ronde 3 4.",
      "uitvoer:ronde 3 3::Die regel moet in de console verschijnen: ronde 3 3.",
      "uitvoer:met bug 3::Die regel moet in de console verschijnen: met bug 3.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Die range loopt nog niet rond."
     ],
     "verwacht": {
      "uitvoer": [
       "ronde 0 4",
       "ronde 3 4",
       "ronde 3 3",
       "met bug 3"
      ],
      "geeft": [
       3,
       -1
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "Leef of leef niet: dat is de vraag",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>Vijf commando's voor dit onderdeel — geen startcode, wél een simulatie. In het terminalvak: <code>cat app.js</code>, dan je herstelde lijn met <code>echo</code>, dan <code>node app.js</code></li><li>In het code-vak: schrijf de <b>herstelde</b> <code>function regel(text)</code> die het eerste teken teruggeeft, ook als <code>text</code> leeg is (dan: <code>\"leeg\"</code>)</li><li>Controleer met <code>geef([regel(\"apel\"), regel(\"\")])</code> → <code>[\"a\",\"leeg\"]</code></li></ul><p class=\"must-note\">De kapotte lijn in <code>app.js</code> was <code>return text[0];</code>. Lees de uitvoer van <code>node</code> vóór je typt.</p>",
     "velden": [
      {
       "id": "term",
       "label": "terminal"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "term:\\bcat\\b::Begin met kijken: cat app.js.",
      "term:\\bnode\\b::Draai het programma met node app.js.",
      "term:echo::Herstel de lijn met echo in het bestand.",
      "code:\\bleeg\\b::Een lege tekst moet een woord teruggeven, geen undefined.",
      "geeftStrikt:[\"ape\",\"leeg\"]::Die twee antwoorden, in die volgorde.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Je eigen code mag niet vallen op een lege string."
     ],
     "verwacht": {
      "geeft": [
       "ape",
       "leeg"
      ]
     },
     "opzet": {
      "bestanden": {
       "app.js": "function regel(text) {\n  return text[0];\n}\nconsole.log(regel(\"\"));\n"
      }
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Je programma is 200 regels en het resultaat is fout. Wat doet een goed debugger eerst?",
     "opties": [
      "één log in het midden, met een label, en dan kijken of die waarde klopt",
      "logs in elke functie, zodat je alles ziet",
      "de code herschrijven vanop nul",
      "eerder naar de input kijken, die is bijna altijd fout"
     ],
     "goed": 0,
     "uitleg": "Bisection: met één meting halveer je het zoekgebied. Twee, drie metingen en je bent bij de regel.",
     "check": "mv:0::Wat levert één middenmeting op?"
    },
    {
     "kind": "open",
     "vraag": "Waarom is <code>console.log(x)</code> zonder label in een lang programma bijna waardeloos, en hoe maak je van dezelfde log een meetpunt?",
     "keywords": [
      "label",
      "waar",
      "volgorde",
      "betekenis",
      "tussen",
      "noem",
      "omschrijf",
      "context",
      "regel",
      "text"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "je weet niet wat je ziet",
      "noem wat het is"
     ],
     "goedkeurExtra": "Goed: een kaal getal tussen dertig andere is onduidbaar; een label maakt van de uitvoer een bewering ('vóór de lus is totaal 0') die je kan nakijken.",
     "terug": "Verwacht: zonder label weet je niet welk moment je vastlegde, en je kan de rijtjes niet aan elkaar rijgen. Met een label (\"na de lus\", \"input van sorteer\") wordt de uitvoer een reeks beweringen die je één voor één kan bevestigen of weerleggen.",
     "check": "op:1::Zeg wat het label oplost."
    },
    {
     "kind": "mc",
     "vraag": "Je vermoedt dat een functie nooit wordt aangeroepen. Wat is het lichtste bewijs?",
     "opties": [
      "één log met een uniek woord inside de eerste regel van de functie",
      "de functie hernoemen en kijken waar het crasht",
      "een try/catch rond elke aanroep",
      "console.table van de hele scope"
     ],
     "goed": 0,
     "uitleg": "Als je unieke woord niet in de console verschijnt, is het antwoord gezegd. Eén regel typwerk, geen gok, en het antwoord is rond.",
     "check": "mv:2::Bewijs van afwezigheid, met één regel."
    }
   ]
  },
  {
   "id": "grenzen",
   "num": "04",
   "titel": "Grenzen en de leegtest",
   "dots": "De lege lijst, de eerste, de laatste, één element. Daar woont de bug.",
   "theorie": "<p>Wie één voorbeeld test, test zijn geluk. Vier casos vangen het grootste deel van de breuken: <b>leeg</b>, <b>één element</b>, <b>twee</b> (want dan pas bestaat er een laatste), en <b>veel</b>. Bij lussen komt daar nog een vijfde bij: de <b>indexgrens</b> — <code>i &lt; n</code> versus <code>i &lt;= n</code>, dat verschil heet off-by-one en het is de duurste fout in het vak.</p><p>Twee gewoonten die dit oplossen vóór de bug: (1) zeg bij elke lus hardop wat er in de <b>eerste</b> en de <b>laatste</b> ronde gebeurt; (2) begin een accumulatie met de waarde van het lege geval — <code>0</code> voor sommen, <code>\"\"</code> voor teksten, <code>1</code> voor producten, <code>-Infinity</code> voor maximum.</p><p>En een accumulator die je <i>binnen</i> de lus terugzet, telt nooit iets. Dat is géén slimme fout, dat is de fout die iedereen maakt op dag één.</p>",
   "voorbeeld": {
    "kop": "Vier casos, één teller",
    "code": "function langste(woorden) {\n  let best = \"\";            /* het lege geval, al ingebouwd */\n  for (const woord of woorden) {\n    if (woord.length > best.length) best = woord;\n  }\n  return best;\n}\n\nconst casos = [[], [\"a\"], [\"ab\", \"a\"], [\"a\", \"ab\", \"abc\"]];\nconst antwoorden = casos.map(langste).map((x) => JSON.stringify(x));\nconsole.log(antwoorden.join(\" \"));\n/* \"\" \"a\" \"ab\" \"abc\" — vier casos, geen enkele index */",
    "uitleg": "Er is geen <code>[i]</code>, dus er is geen losse grens. Wie over een reeks loopt in plaats van over indexen, vermijdt de helft van de klassieke breuken."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Tellen met vier casos",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Schrijf <code>function statistiek(reeks)</code>: geef <code>{ aantal, totaal, laagste }</code> terug</li><li>Voor een <b>lege</b> reeks: <code>aantal 0</code>, <code>totaal 0</code> en <code>laagste</code> op <code>null</code> — géén <code>Infinity</code> in je antwoord en géén <code>undefined</code></li><li>Geen <code>Math.min</code> met een spread (die valt op een lege lijst), wel één lus</li><li>Vermóéd wat <code>JSON.stringify</code> van de twee casos teruggeeft</li><li>Controleer met <code>geef([JSON.stringify(statistiek([])), JSON.stringify(statistiek([9, 4, 7]))])</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — dit keer: de twee reeksen"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:\\bleeg|length\\s*===?\\s*0::Verwerk het lege geval expliciet.",
      "code:\\bof\\b::Loop met for..of, niet met indexen.",
      "code:null::Zet laagste op null voor een lege reeks.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[\"{\\\"aantal\\\":0,\\\"totaal\\\":0,\\\"laagste\\\":null}\",\"{\\\"aantal\\\":3,\\\"totaal\\\":20,\\\"laagste\\\":4}\"]::Die twee strings, exact.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Een lege reeks mag niets doen crashen."
     ],
     "verwacht": {
      "uitvoer": [],
      "geeft": [
       "{\"aantal\":0,\"totaal\":0,\"laagste\":null}",
       "{\"aantal\":3,\"totaal\":20,\"laagste\":4}"
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "De teller die binnen de lus leefde",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Schrijf <code>function dubbelde(reeks)</code>: een lus die élk getal verdubbelt én bijhoudt hoeveel van die dubbelen groter zijn dan 10</li><li>Die laatste telling mag <b>nooit</b> binnen de lus op 0 beginnen — zet hem vóór de lus</li><li>Print na de lus <code>\"sterk: N\"</code> met N die telling</li><li>Vermóéd die ene regel</li><li>Controleer met <code>geef([dubbelde([4, 7, 9]).join(\"-\"), dubbelde([]).length])</code> → <code>[\"8-14-18\",0]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel per console.log"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:\\bsterk\\b::Zet de teller vóór de lus en verhoog hem erin.",
      "code:\\bof\\b::Eén lus met for..of is genoeg.",
      "code:sterk:::Print de telling met dat label.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[\"8-14-18\",0]::Verdubbelen plus de lege caso.",
      "uitvoer:sterk: 2::Een console-spoor ontbreekt nog: sterk: 2.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er gaat nog iets mis met die telling."
     ],
     "verwacht": {
      "uitvoer": [
       "sterk: 2"
      ],
      "geeft": [
       "8-14-18",
       0
      ]
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Waarom is <code>Math.min(...reeks)</code> op een lege lijst een probleem?",
     "opties": [
      "het geeft Infinity terug, wat je antwoord niet is maar wel doorloopt",
      "het geeft 0 terug, dus het lijkt goed",
      "het crasht met een TypeError",
      "het werkt alleen met strings"
     ],
     "goed": 0,
     "uitleg": "Infinity is het neutrale element van min, niet een antwoord op 'wat is het laagste'. Zet het lege geval apart, of gebruik null.",
     "check": "mv:0::Wat levert min zonder argumenten op?"
    },
    {
     "kind": "open",
     "vraag": "Geef voor drie accumulaties het lege-startgetal en zeg waarom: som, product, maximum.",
     "keywords": [
      "neutraal",
      "0",
      "one",
      "1",
      "minus",
      "Infinity",
      "identiteit",
      "start",
      "boos",
      "basis"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "0 voor som",
      "1 voor product",
      "-Infinity voor maximum"
     ],
     "goedkeurExtra": "Goed: het startgetal is het neutrale element — iets dat je eerste toevoeging niet bederft. Bij maximum is 0 fout zodra er negatieven in zitten.",
     "terug": "Verwacht: som begint op 0, product op 1, maximum op -Infinity (of op het eerste element). Dat zijn de neutrale elementen: ze veranderen niets aan wat daarna komt.",
     "check": "op:1::Drie starts, drie redenen."
    },
    {
     "kind": "mc",
     "vraag": "Een lus <code>for (let i = 0; i &lt;= lijst.length; i++)</code> is…",
     "opties": [
      "een off-by-one: de laatste ronde leest lijst[length], dat undefined is",
      "compleet correct, want je wilt elk element",
      "fout, maar enkel bij lege lijsten",
      "gelijk aan <code>i &lt; lijst.length</code>"
     ],
     "goed": 0,
     "uitleg": "Indexen lopen van 0 tot length-1. <= maakt er one element te veel van, en undefined is het zwijgende gevolg.",
     "check": "mv:2::Tel de indexen eens na."
    }
   ]
  },
  {
   "id": "verwijzing",
   "num": "05",
   "titel": "Verwijzingen: het object is niet de variabele",
   "dots": "Twee namen, één kast. Dat is de bron van je 'onmogelijke' bug.",
   "theorie": "<p>In JavaScript is een variabele die een object bevat geen <b>doos met inhoud</b>, wel een <b>label op de kast</b>. <code>const b = a</code> maakt geen tweede kast: het plakt een tweede label op dezelfde. Daarom ziet <code>b</code> wat je met <code>a</code> doet, en daarom is \"ik heb het toch gekopieerd\" de leugen die de helft van je uren opeist.</p><p>Kopiëren moet je zélf doen: <code>[...a]</code>, <code>a.slice()</code>, <code>structuredClone(a)</code> voor diepe structuren, of een <code>map</code> die nieuwe objecten maakt. En het is altijd <b>één niveau diep</b>: <code>[...mensen]</code> deelt élk <code>persoon</code>-object nog steeds.</p><p>Hetzelfde geldt voor argumenten: een functie die <code>lijst.push(x)</code> doet, verandert de lijst van de aanroeper. Dat is niet fout, het is een <b>keuze</b> — en je moet weten welke je maakt.</p>",
   "voorbeeld": {
    "kop": "Wat er gedeeld wordt",
    "code": "const mensen = [{ naam: \"Merel\", bezocht: 1 }];\nconst kopie = [...mensen];\n\nmensen[0].bezocht += 1;      /* zelfde object, dus ook in kopie */\nkopie.push({ naam: \"Jo\" });  /* alleen de lijst van kopie groeit */\n\nconsole.log(mensen.length, kopie.length, mensen[0].bezocht);\n/* 1 2 2 — de teller steeg in allebei, de lengte maar in één */",
    "uitleg": "Een spread kopieert de rij, niet de dozen in de rij. Wie dat één keer echt begrijpt, debugt voortaan twee keer zo kort."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Delen of niet delen",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Maak <code>const tellingen = new Map([[\"a\", 1], [\"b\", 2]])</code></li><li>Maak <code>kopie</code> die <b>los</b> staat: voeg er <code>[\"c\", 3]</code> aan toe, en laat <code>tingen</code> (nog een verwijzing naar <code>tellingen</code>) er <code>[\"d\", 4]</code> aan toevoegen</li><li>Print eerst <code>tellingen.size</code> en dan <code>kopie.size</code> — de ene mag door <code>tingen</code> veranderd zijn, de andere niet</li><li>Vermóéd beide getallen vóór je uitvoert</li><li>Controleer met <code>geef([kopie.size, tellingen.get(\"d\")])</code> → <code>[3,4]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — twee getallen"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:new\\s+Map\\s*[(]::Werk met een Map, hier begint de verwarring.",
      "code:new\\s+Map\\s*[(]\\s*tellingen::Maak de kopie uit tellingen, niet uit losse paren.",
      "code:\\.size::Meet met .size, niet met .length.",
      "code:\\btingen\\b::De tweede verwijzing moet áls verwijzing gebruikt worden.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[3,4]::De kopie telt 3, in de originelen zit de 4.",
      "uitvoer:3::Die regel moet in de console verschijnen: 3.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er gaat nog iets mis met die kopie."
     ],
     "verwacht": {
      "uitvoer": [
       "3",
       "3"
      ],
      "geeft": [
       3,
       4
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "De gedeelde standaardlijst",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Schrijf <code>function band(lijst, extra)</code>: voeg <code>extra</code> toe aan <code>lijst</code> en geef die lijst terug — maar <b>zonder</b> de lijst van de aanroeper te veranderen (dus: kopieer eerst, of gebruik <code>concat</code>)</li><li>Bewijs dat het klopt: roep <code>band(rij, \"Vos\")</code> aan met <code>const rij = [\"Pop\"]</code> en print <code>rij.length</code> én de lengte van het resultaat</li><li>Vermóéd die twee getallen</li><li>Controleer met <code>geef([rij.length, resultaat.length, resultaat.join(\",\")])</code> → <code>[1,2,\"Pop,Vos\"]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — twee getallen"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "niet:\\.push\\s*[(]::Geen .push op de meegekregen lijst: dat is de klassieke fout.",
      "code:concat|\\.slice\\s*[(]|\\[\\.\\.\\b::Kopieer: concat, slice of een spread.",
      "code:\\.length::Print beide lengtes, anders bewijs je niets.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[1,2,\"Pop,Vos\"]::De originele lijst blijft 1.",
      "uitvoer:1::Een console-spoor ontbreekt nog: 1.",
      "uitvoer:2::Een console-spoor ontbreekt nog: 2.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er gaat nog iets mis met die lijst."
     ],
     "verwacht": {
      "uitvoer": [
       "1",
       "2"
      ],
      "geeft": [
       1,
       2,
       "Pop,Vos"
      ]
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "<code>const a = [1, 2]; const b = [...a]; b.push(3);</code> — wat is <code>a.length</code>?",
     "opties": [
      "2",
      "3",
      "undefined",
      "het crasht"
     ],
     "goed": 0,
     "uitleg": "De spread maakt een nieuwe rij met dezelfde elementen; duwen in b raakt a niet. Zonder spread (b = a) golden twee labels voor één rij.",
     "check": "mv:0::Hoeveel rijen zijn er écht?"
    },
    {
     "kind": "open",
     "vraag": "Waarom is <code>[...mensen]</code> géén diepe kopie, en wat gebruik je wél als de elementen zelf objecten zijn?",
     "keywords": [
      "niveau",
      "delend",
      "deep",
      "structuredClone",
      "map",
      "diep",
      "objecten",
      "zelfde",
      "eigen"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "één niveau diep",
      "structuredClone",
      "nieuwe objecten met map"
     ],
     "goedkeurExtra": "Goed: de spread kopieert de rij, elk element blijft hetzelfde object. Oplossing: structuredClone, of map((x) => ({ ...x })) als je alleen bovenste velden wil aanpassen.",
     "terug": "Verwacht: een spread kopieert de container, niet de inhoud — de personen blijven gedeeld. Voor een diepe kopie: structuredClone(lijst), of een map die per element een nieuw object bouwt.",
     "check": "op:1::Zeg het niveau én het alternatief."
    },
    {
     "kind": "mc",
     "vraag": "Een functie doet <code>lijst.sort()</code> op het argument dat hij kreeg. Wat is het risico?",
     "opties": [
      "de lijst van de aanroeper wordt in-place herschikt en die merkt het pas later",
      "sorteren werkt niet binnen een functie",
      "de functie krijgt dan een SyntaxError",
      "er gebeurt niets, sort maakt altijd een kopie"
     ],
     "goed": 0,
     "uitleg": "sort() is destructief. Wil je de volgorde voor jezelf, sorteer dan een kopie: [...lijst].sort(...).",
     "check": "mv:2::Wat doet sort met de originele rij?"
    }
   ]
  },
  {
   "id": "klein",
   "num": "06",
   "titel": "Het kleinste voorbeeld",
   "dots": "Kapot maken tot er niets meer overblijft om in te kijken.",
   "theorie": "<p>Een bug die in 200 regels zit, is moeilijk; dezelfde bug in 6 regels is triviaal. <b>Minimaliseren</b> is de kern van debuggen: haal commentaar weg, haal functies in mekaar, vervang de database door een vaste lijst, en laat pas los als het voorbeeld nog steeds faalt. Wat je weggooit en het blijft falen, kan het niet zijn.</p><p>Doe dat systematisch: halveer het bestand, kijk of het nog faalt, houd de falende helft. Zeven halveringen van 200 regels zijn drie regels — en drie regels lees je in tien seconden.</p><p>Maak er een gewoonte van om het minimale voorbeeld <b>toe te voegen</b> aan je tests. Dan is die bug een keer gefixt, en blijft hij gefixt.</p>",
   "voorbeeld": {
    "kop": "Van klacht naar voorbeeld",
    "code": "/* Gebruiker: \"mijn programma rekent 60 i.p.v. 18 bij drie kaartjes\" */\n\n/* stap 1 — alles weg wat niets met de berekening te maken heeft */\nconst input = \"18\";\nconst bedrag = input * 3;\nconsole.log(bedrag);            /* 54: al juiist, dus de klacht zit niet hier */\n\n/* stap 2 — watverschilt er in het échte programma? daar wordt getrimd */\nconst ruw = \" 18 \";\nconsole.log(Number(ruw) * 3);   /* 54 → en Number(\"\") is 0, Number(\"a\") is NaN */\nconsole.log(\"a\" * 3);           /* NaN — dát is de 60-verveling: er werd niets gecheckt */",
    "uitleg": "Drie regels, twee printsies, één conclusie. Wie meteen in het grote bestand blijft zoeken, zoekt drie uur langer."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Zes regels, één conclusie",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>De klacht: <code>NaN</code> in de totaalprijs als er een spatie in het invoerveld staat</li><li>Bouw het kleinste voorbeeld in vier regels code: één invoer met spatie, één omzetting, één vermenigvuldiging, één print</li><li>Laat <code>function netto(tekst)</code> dat probleem wél oplossen: trim, zet om, en geef <code>0</code> terug als het geen getal is</li><li>Vermóéd beide prints in volgorde: eerst het kapotte resultaat, dan het herstelde</li><li>Controleer met <code>geef([netto(\" 18 \") * 3, netto(\"geen\")])</code> → <code>[54,0]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — twee regels console"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:trim\\s*[(]::Trim de invoer, dat is de kern van de klacht.",
      "code:Number\\s*[(]::En zet om met Number, niet met een asterisk alleen.",
      "code:isNaN|isFinite::Bewaar je voor het geval het geen getal is.",
      "vw:2::Vermoed al 2 regels console, vóór je uitvoert.",
      "geeftStrikt:[54,0]::Hersteld 54, zonder getal 0.",
      "uitvoer:NaN::Een console-spoor ontbreekt nog: NaN.",
      "uitvoer:54::Een console-spoor ontbreekt nog: 54.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er valt nog iets buiten je functie."
     ],
     "verwacht": {
      "uitvoer": [
       "NaN",
       "54"
      ],
      "geeft": [
       54,
       0
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "Halveren tot het faalt",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Vier regels <code>map</code> geven <code>undefined</code> terug: <code>[1,2,3].map((x) => { x * 2 })</code></li><li>Print dat kapotte resultaat eerst in één regel code — kijk, geloof je oog, en ga dan pas schrijven</li><li>Schrijf daarna <code>function verdubbel(reeks)</code> die het wél doet, en test op drie casos: leeg, één element, drie elementen</li><li>Vermóéd die ene print van de kapotte map</li><li>Controleer met <code>geef([verdubbel([]).length, verdubbel([4]).join(\"\"), verdubbel([1,2,3]).join(\"-\")])</code> → <code>[0,8,2-4-6]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — de kapotte regel"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:\\.map\\s*[(]::Toon eerst het kapotte gedrag in levende lijve.",
      "code:verdubbel::Schrijf verdubbel(reeks).",
      "code:JSON[.]stringify::Een lus met undefined zie je alleen als je hem stringifyt.",
      "vw:1::Vermoed die ene console-regel, vóór je uitvoert.",
      "geeftStrikt:[0,\"8\",\"2-4-6\"]::Drie casos, één resultaat.",
      "uitvoer:[null,null,null]::Die regel moet in de console verschijnen: [null,null,null].",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er gaat nog iets mis met die drie casos."
     ],
     "verwacht": {
      "uitvoer": [
       "[null,null,null]"
      ],
      "geeft": [
       0,
       "8",
       "2-4-6"
      ]
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Waarom is een minimaal voorbeeld meer waard dan een lange beschrijving van de bug?",
     "opties": [
      "het isoleert de oorzaak: wat je weggooit en het blijft falen, kan het niet zijn",
      "omdat het sneller typt",
      "omdat de engine minder regels leest",
      "omdat je dan geen tests meer nodig hebt"
     ],
     "goed": 0,
     "uitleg": "Minimaliseren is elimineren. Het overblijvende voorbeeld is je bewijs én je latere regeltje in de testbank.",
     "check": "mv:0::Wat doet weglaten met je hypothesen?"
    },
    {
     "kind": "open",
     "vraag": "Je halveert een bestand en na drie halveringen faalt het voorbeeld <b>niet</b> meer. Wat zeg je dan, en wat doe je next?",
     "keywords": [
      "tussen",
      " Combinatie",
      "samenspel",
      "terug",
      "beide",
      "elkaar",
      "grens",
      "niet",
      "deel",
      "beide"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "het is het samenspel",
      "ga terug een stap",
      "beide helften nodig"
     ],
     "goedkeurExtra": "Goed: de breuk zit in het samenspel van beide delen. Ga terug naar de laatste werkende versie van je voorbeeld en voeg één deel per keer toe.",
     "terug": "Verwacht: niet iedereen is schuldig — het is de combinatie. Keer terug naar de vorige halvering die nog faalde, en voeg één blok tegelijk toe tot het opnieuw faalt. Dat blok is je verdachte.",
     "check": "op:1::Benoem het samenspel en de beweging terug."
    },
    {
     "kind": "mc",
     "vraag": "Waarom voeg je je minimale voorbeeld toe aan de testbank?",
     "opties": [
      "omdat de fix dan bewaakt blijft: die bug kan niet meer terugkeren zonder dat een test rood wordt",
      "omdat tests dan sneller lopen",
      "omdat je dan het voorbeeld kan vergeten",
      "omdat de engine het dan automatisch nalaat"
     ],
     "goed": 0,
     "uitleg": "Een fix zonder test is een belofte. Een fix met test is een gebeuren.",
     "check": "mv:2::Wat houdt een test eigenlijk tegen?"
    }
   ]
  },
  {
   "id": "testen",
   "num": "07",
   "titel": "Testen met de hand",
   "dots": "expect, assert, en één rode regel die de moeite waard is.",
   "theorie": "<p>Je hebt geen jest, mocha of vitest nodig om te testen. Eén hulpje van zes regels doet het werk: <code>function expect(waarde) { return { is(op) { if (waarde !== op) throw new Error(\"verwacht \" + op + \", kreeg \" + waarde); } }; }</code>. Dat is een assertie: een uitspraak die stil is als ze klopt en luid wordt als ze niet klopt.</p><p>Twee regels die het verschil maken. Eén: <b>test wat de belofte is, niet wat de code doet</b> — niet <code>dat hij .trim aanroept</code>, wél <code>dat \" 18 \" 18 wordt</code>. Twee: één test, één gedachte. Vind je <code>&amp;&amp;</code> in je assertie, splits.</p><p>En schrijf je test <b>vóór</b> de fix. Dat klinkt streng, maar het is de enige manier om te weten of je test iets detecteert: een test die je na de fix schrijft, is altijd groen en dus niets waard.</p>",
   "voorbeeld": {
    "kop": "Zes regels testbank",
    "code": "function verwacht(w) {\n  function bal(op) {\n    if (w !== op) {\n      const boodschap = \"verwacht \" + JSON.stringify(op)\n        + \", kreeg \" + JSON.stringify(w);\n      throw new Error(boodschap);\n    }\n  }\n  return { is: bal };\n}\n\nfunction netto(t) { return Number(String(t).trim()) || 0; }\n\nverwacht(netto(\"18\")).is(18);\nverwacht(netto(\" 18 \")).is(18);\nverwacht(netto(\"geen\")).is(0);\nconsole.log(\"3 tests in orde\");",
    "uitleg": "Geen framework, geen config, wél drie uitspraken die de bug nooit meer doorlaten. Vervang <code>|| 0</code> door niets en de derde test wordt rood: dát is het bewijs dat je test werkt."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Je eigen expect",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>Schrijf <code>function verwacht(waarde)</code>: geeft een object terug met <code>is(ergens)</code>; gooi bij verschil een <code>Error</code> met <code>verwacht X, kreeg Y</code> (met <code>JSON.stringify</code> rond beide)</li><li>Schrijf <code>function korting(prijs, procent)</code>: <code>korting(200, 10)</code> is 180, <code>korting(200, 0)</code> is 200</li><li>Roep <code>verwacht</code> minstens <b>drie</b> keer aan op <code>korting</code> en print na afloop <code>\"3 tests in orde\"</code></li><li>Vermóéd die ene print</li><li>Controleer met <code>geef([korting(100, 25), korting(100, 0)])</code> → <code>[75,100]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — één regel console"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:function\\s+verwacht::Schrijf verwacht(waarde).",
      "code:throw\\s+new\\s+Error::Gooi een Error bij verschil.",
      "code:verwacht \\s*\\+|verwacht::De melding begint met verwacht.",
      "code:JSON[.]stringify::Gebruik JSON.stringify rond beide waarden.",
      "code:verwacht\\s*\\(::Roep verwacht minstens vier keer aan.",
      "vw:1::Vermoed die ene console-regel, vóór je uitvoert.",
      "geeftStrikt:[75,100]::Twee kortingscasos.",
      "uitvoer:4 tests in orde::Die ene regel moet de console in.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Een van je tests valt om: klopt je functie, of je assertie?"
     ],
     "verwacht": {
      "uitvoer": [
       "4 tests in orde"
      ],
      "geeft": [
       75,
       100
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "De test die iéts detecteert",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>Bouw <code>function langte(lijst)</code>: de lengte van een reeks — en maak hem expres <b>fout</b> op één caso: geef <code>lijst.length + 1</code> terug als de lijst leeg is</li><li>Schrijf drie tests met <code>verwacht</code>: twee slagen, één faalt met de melding <code>verwacht 0, kreeg 1</code></li><li>Vang die ene falende test in een <code>try/catch</code> en print de melding</li><li>Vermóéd die melding</li><li>Controleer met <code>geef([langte([1,2,3]), isErEenRodeTest])</code> → <code>[3,true]</code></li></ul><p class=\"must-note\">Een test die nooit faalt, is geen test. Maak hem kapot, zie hem rood worden, en fix dan pas.</p>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — de rode melding"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:\\bcatch\\s*[(]::Vang je eigen rode test.",
      "code:throw\\s+new\\s+Error::Gooi in expects own Error, met die twee woorden in de tekst.",
      "code:verwacht\\s*\\(::Drie tests met verwacht.",
      "vw:1::Vermoed die ene console-regel, vóór je uitvoert.",
      "uitvoer:verwacht 0, kreeg 1::De rode melding moet exact zo in de console staan.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geeftStrikt:[3,true]::Eén groene caso en de rode vlag.",
      "geenFout::Er valt iets buiten je catch."
     ],
     "verwacht": {
      "uitvoer": [
       "verwacht 0, kreeg 1"
      ],
      "geeft": [
       3,
       true
      ]
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Waarom schrijf je een test bij voorkeur vóór de fix?",
     "opties": [
      "omdat je dan bewijst dat de test het falen detecteert: een na de fix geschreven test is altijd groen",
      "omdat tests dan korter zijn",
      "omdat de engine tests het snelst leest vóór de code",
      "omdat je dan geen commentaar nodig hebt"
     ],
     "goed": 0,
     "uitleg": "Rood → groen is een bewijs. Groen → groen is een gewoonte.",
     "check": "mv:0::Wat leer je uit de volgorde?"
    },
    {
     "kind": "open",
     "vraag": "Test <code>dat de functie .trim aanroept</code> versus test <code>dat \" 18 \" 18 wordt</code>. Welke kies je en waarom?",
     "keywords": [
      "gedrag",
      "implementatie",
      "belofte",
      "breekt",
      "refactor",
      "vast",
      "wat",
      "hoe",
      "koppelt"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "gedrag testen",
      "implementatie is vrij"
     ],
     "goedkeurExtra": "Goed: de tweede. Hoe trimt (trim, replace, regex) is een keuze van vandaag; de uitkomst is de belofte.",
     "terug": "Verwacht: test het gedrag (\" 18 \" wordt 18). De implementatie mag morgen veranderen zonder dat je test rood wordt; een test op trim breekt bij elke refactor terwijl het resultaat nog hetzelfde is.",
     "check": "op:1::Kies en onderbouw met gedrag versus implementatie."
    },
    {
     "kind": "mc",
     "vraag": "Een test faalt. De code is wél juist. Wat is de juiste conclusie?",
     "opties": [
      "de test is fout verouderd: een van beide — of de belofte was ooit anders — en dat moet je opzoeken",
      "de test schrappen, die is duidelijk te streng",
      "de code aanpassen tot de test slaagt",
      "beide laten staan en verder werken"
     ],
     "goed": 0,
     "uitleg": "Een rode test is altijd informatie: over de code of over de verwachting. Nooit over je schuldgevoel.",
     "check": "mv:2::Wat zegt een rode test écht?"
    }
   ]
  },
  {
   "id": "klassiek",
   "num": "08",
   "titel": "De vier klassieke breuken",
   "dots": "Tekenverwarring, typegedrag, off-by-one en de vergeten return.",
   "theorie": "<p>Vier breuken dragen het grootste deel van het leed. <b>Eén</b>: <code>=</code> in plaats van <code>===</code> in een voorwaarde — de toewijzing is waar (elk niet-null getal), dus de <code>if</code> loopt altijd. <b>Twee</b>: <code>\"5\" + 1</code> is <code>\"51\"</code> — tekst wint van optellen, terwijl <code>\"5\" - 1</code> gewoon <code>4</code> is. <b>Drie</b>: off-by-one bij <code>length</code>. <b>Vier</b>: een blokje <code>{ }</code> rond een arrow-functie zonder <code>return</code>, wat <code>undefined</code> oplevert.</p><p>Alle vier hebben ze één ding gemeen: de engine vindt ze prima. Er is geen melding, alleen een resultaat dat niet klopt. Daarom is de verdediging niet \"beter lezen\" maar <b>typen controleren</b> en <b>cases testen</b>: <code>Number(x)</code> vóór je rekent, <code>===</code> altijd, en één test op het lege geval.</p>",
   "voorbeeld": {
    "kop": "Vier kapotte regels, vier fix",
    "code": "/* 1 — de toewijzing geeft 0 terug, dus de voorwaarde is onwaar */\nlet found; if (found = 0) { }\n/* fix */ if (found === 0) { }\n\n/* 2 — plus kent een tekstversie: \"5\" + 1 is \"51\" */\nconst totaal = \"5\" + 1;\n/* fix */ const totaal = Number(\"5\") + 1;\n\n/* 3 — <= loopt één index te ver */\nfor (let i = 0; i <= lijst.length; i++) lijst[i];\n/* fix */ for (const x of lijst) x;\n\n/* 4 — blokje zonder return: [undefined, …] */\nlijst.map((x) => { x * 2 });\n/* fix */ lijst.map((x) => x * 2)",
    "uitleg": "Geen van deze regels geeft een foutmelding. Precies daarom ken je ze beter uit je hoofd dan uit je console."
   },
   "oefeningen": [
    {
     "soort": "Oefening",
     "titel": "Vier casos, één lineair antwoord",
     "soortOef": "code",
     "brief": "<ul class=\"must-list\"><li>Gegeven: <code>const regels = [\"prijs: 18\", \"prijs: 24\", \"info: open\", \"prijs: 12\"];</code></li><li>Schrijf <code>function somVan(lijst, voorvoegsel)</code>: tel de getallen bij mekaar van de regels die met <code>voorvoegsel</code> beginnen — met <code>startsWith</code>, <code>split</code> en <code>Number</code>, via <code>map</code> en <code>reduce</code></li><li>Geen <code>+</code> op een tekst: zet élk stukje om vóór je optelt</li><li>Vermóéd wat de som is</li><li>Controleer met <code>geef([somVan(regels, \"prijs: \"), somVan(regels, \"nooit\")])</code> → <code>[54,0]</code></li></ul>",
     "velden": [
      {
       "id": "vermoed",
       "label": "jouw vermoeden — de som, in getallen"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "code:Number\\s*[(]::Zet om vóór je optelt, anders win tekst.",
      "code:startsWith::Filter met startsWith op het voorvoegsel.",
      "code:reduce::Tel via reduce met een startwaarde.",
      "code:\\.filter\\s*[(]::Filter de regels met .filter, niet met een index-lus.",
      "vw:1::Vermoed die ene console-regel, vóór je uitvoert.",
      "geeftStrikt:[54,0]::Drie prijzen en niets met 'nooit'.",
      "uitvoer:54::Een console-spoor ontbreekt nog: 54.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Er gaat nog iets mis met die omzetting."
     ],
     "verwacht": {
      "uitvoer": [
       "54"
      ],
      "geeft": [
       54,
       0
      ]
     }
    },
    {
     "soort": "Bonus",
     "titel": "Herstel in de terminal",
     "soortOef": "mix",
     "brief": "<ul class=\"must-list\"><li>Zet je vaste proefwaardes bovenaan in één <code>const</code>-regel (hier <code>const PROEVEN = 3</code>): dan is die regel het eerste wat je leest als iets omslaat</li><li>In <code>app.js</code> staat een kapotte <code>function lijn(text)</code>; <code>test.js</code> bevat één assertie op <code>lijn(\" apel \") === \"APP!\"</code></li><li>Werk in het terminalvak: <code>cat app.js</code> (kijken), <code>node test.js</code> (de rode test zien), <code>echo … &gt; app.js</code> (herstellen), <code>node test.js</code> (nogmaals, nu groen), <code>git init</code>, <code>git add app.js test.js</code>, <code>git commit -m \"fix: lijn maakt hoofdletters\"</code></li><li>In het code-vak: plak je herstelde <code>app.js</code>, zodat de zandbak dezelfde functie kan draaien</li><li>Controleer in het code-vak met <code>geef([lijn(\" apel \"), lijn(\"\")])</code> → <code>[\"APEL!\",\"LEEG!\"]</code></li></ul><p class=\"must-note\">De assertie in <code>test.js</code> is al geschreven door iemand anders: jouw taak is dat <code>node test.js</code> stopt met klagen.</p>",
     "velden": [
      {
       "id": "term",
       "label": "terminal — één commando per regel"
      },
      {
       "id": "code",
       "label": "je code — app.js"
      }
     ],
     "checks": [
      "term:\\bcat\\b::Eerst kijken: cat app.js.",
      "termAantal:\\bnode test\\.js\\b|2::Voer de test uit vóór en na je fix.",
      "term:\\becho\\b::Herstel het bestand met echo.",
      "term:\\bgit commit\\b::Leg je fix vast met git commit.",
      "code:[.]trim\\s*[(]\\s*[)]::In je code-vak: trim mét haakjes.",
      "geeftStrikt:[\"APEL!\",\"LEEG!\"]::De twee casos, uit jouw eigen functie.",
      "niet:\\bvar\\b::var bestaat in deze cursus niet meer: kies const of let.",
      "geenFout::Je app.js mag niet vallen op een lege tekst."
     ],
     "verwacht": {
      "geeft": [
       "APEL!",
       "LEEG!"
      ]
     },
     "opzet": {
      "bestanden": {
       "app.js": "function lijn(text) {\n  return text.trim.toUpperCase();\n}\n",
       "test.js": "function assert(isGoed, boodschap) {\n  if (!isGoed) throw new Error(boodschap);\n  console.log(\"ok: \" + boodschap);\n}\nfunction lijn(text) {\n  return text.trim().toUpperCase() + \"!\";\n}\nassert(lijn(\" apel \") === \"APEL!\", \"lijn maakt hoofdletters\");\n"
      }
     }
    }
   ],
   "vragen": [
    {
     "kind": "mc",
     "vraag": "Waarom is <code>if (x = 0)</code> niet wat de schrijver bedoelde?",
     "opties": [
      "het is een toewijzing: x wordt 0 en de voorwaarde is false — met een niet-nul getal was ze altijd waar",
      "het is een SyntaxError, dus het draait niet",
      "het vergelijkt wél, maar alleen op strings",
      "het werkt alleen binnen een functie"
     ],
     "goed": 0,
     "uitleg": "= geeft een waarde terug, en elke waarde is waar of onwaar. Vergelijken doe je met ===; daarom staat die = er nooit zomaar.",
     "check": "mv:0::Wat doet = in een voorwaarde?"
    },
    {
     "kind": "open",
     "vraag": "Wat levert <code>\"5\" + 1</code>, <code>\"5\" - 1</code> en <code>\"5\" * 2</code> op, en welke besluit trek je daaruit over types in JavaScript?",
     "keywords": [
      "teken",
      "rekenen",
      "tekst",
      "nummer",
      "coercie",
      "omzetting",
      "optellen",
      "concat",
      " Verschil",
      "getal"
     ],
     "minKeywords": 3,
     "goedkeuren": [
      "51",
      "4",
      "10"
     ],
     "goedkeurExtra": "Goed: 51 (plus is platten), 4 en 10 (--, * en / dwingen een getal af). Sluiting: alleen + heeft een tekst-versie, dus + is je gevaar.",
     "terug": "Verwacht: \"51\", 4, 10. De les is dat alleen + twee talen kent (opleveren en optellen); de andere operatoren forceren een getal. Daarom zet je bij + altijd zelf om met Number().",
     "check": "op:1::Drie uitkomsten plus de les."
    },
    {
     "kind": "mc",
     "vraag": "<code>const opties = [\"a\", \"b\"]; const meer = opties; meer.push(\"c\");</code> — wat print <code>console.log(opties.length)</code>?",
     "opties": [
      "3",
      "2",
      "undefined",
      "het crasht op de push"
     ],
     "goed": 0,
     "uitleg": "meer en opties zijn twee labels op één rij. Wie een tweede rij wil, kopieert: [...opties].",
     "check": "mv:2::Hoeveel rijen zijn er werkelijk?"
    }
   ]
  }
 ]
} };
