/* ============================================================
   sandbox.js · de uitvoeringslaag van JS-BREUK
   ----------------------------------------------------------
   Eén plek die code uitvoert, in drie smaken:
     • browser            : <iframe sandbox="allow-scripts"> + postMessage
     • Node, synchroon    : voor gewone opdrachten (de testkist)
     • Node, met wachten  : voor opdrachten met modus "omlopen"
   Alle drie delen dezelfde omlijsting, dus wat de testkist groen
   ziet, is groen in de klas.

   API van de zandbak:
     console.log/warn/error   → geteld, wordt "uitvoer"
     geef(waarde)             → wat de checker vergelijkt
     roep(f, "naam")          → volgt één functie
     __ROEP                   → elke aanroep van je eigen functies
     document                 → nagebouwd: getElementById / querySelector
     __DOM                    → de toestand van dat document
     setTimeout / setInterval → eigen klok, loopt alleen met:
     await omlopen(ms)        →   "laat de tijd verstrijken"
   Geblokkeerd: fetch, XMLHttpRequest, WebSocket, EventSource, alert,
   prompt, confirm, localStorage, sessionStorage, indexedDB, document.write.
   Elke lus mag 2 000 000 ronden; daarna zegt de zandbak het. Reageert de
   iframe niet binnen vier seconden, dan wordt het kader afgebroken.
   ============================================================ */
(function () {
  const SANDBOX = (window.SANDBOX = {});
  const Ronden = 2000000;

  const VOOR = [
    "const __log = [];",
    "let __geeft = null, __heeftGegeven = false;",
    "const __ROEP = [];",
    "const __Rondes = { n: 0 };",
    "const __toegepast = new WeakSet();",
    "function __ronden() { if (++__Rondes.n > " + Ronden + ") throw new Error('Te veel ronden: die lus komt nooit meer terecht.'); }",
    "function __toon(x) {",
    "  try {",
    "    if (typeof x === 'string') return x;",
    "    if (x === undefined) return 'undefined';",
    "    if (x === null) return 'null';",
    "    if (typeof x === 'number' || typeof x === 'boolean') return String(x);",
    "    if (typeof x === 'function') return 'function ' + (x.name || 'anoniem') + '()';",
    "    return JSON.stringify(x);",
    "  } catch (e) { return String(x); }",
    "}",
    "function __knoop(sel) {",
    "  const n = { selecteer: sel, textContent: '', innerHTML: '', value: '', classes: [], atributen: {}, stijlen: {},",
    "    setAttribute(k, w) { this.atributen[k] = String(w); },",
    "    getAttribute(k) { return this.atributen[k] === undefined ? null : this.atributen[k]; },",
    "    appendChild(k) { this.kind = k; return k; } };",
    "  n.classList = {",
    "    add: (c) => { if (n.classes.indexOf(c) === -1) n.classes.push(c); },",
    "    remove: (c) => { const i = n.classes.indexOf(c); if (i !== -1) n.classes.splice(i, 1); },",
    "    contains: (c) => n.classes.indexOf(c) !== -1,",
    "    toggle: (c) => { const i = n.classes.indexOf(c); if (i === -1) n.classes.push(c); else n.classes.splice(i, 1); },",
    "  };",
    "  return n;",
    "}",
    "const __DOM = new Proxy({}, {",
    "  get(d, k) { if (typeof k !== 'string') return undefined; if (!d[k]) d[k] = __knoop(k); return d[k]; },",
    "  set(d, k, v) { d[k] = v; return true; },",
    "});",
    "const __doc = {",
    "  getElementById: (id) => __DOM['#' + id],",
    "  querySelector: (s) => __DOM[s],",
    "  querySelectorAll: (s) => [__DOM[s]],",
    "  write: () => { throw new Error('document.write is geblokkeerd in deze zandbak.'); },",
    "  body: __DOM['body'],",
    "};",
    "function __dek(f, naam) {",
    "  if (typeof f !== 'function' || f.__gecheckt || __toegepast.has(f)) return f;",
    "  const d = function () { __ronden(); __ROEP.push({ naam: naam, aantal: arguments.length, args: Array.prototype.slice.call(arguments) }); return f.apply(this, arguments); };",
    "  d.__gecheckt = true;",
    "  try { __toegepast.add(f); } catch (e) {}",
    "  try { Object.defineProperty(d, 'name', { value: naam }); } catch (e) {}",
    "  return d;",
    "}",
    "const geef = (w) => { __geeft = w; __heeftGegeven = true; };",
    "const roep = (f, naam) => __dek(f, naam || (f && f.name) || 'anoniem');",
    "const __verbod = (naam) => new Proxy(function () { throw new Error(naam + ' is geblokkeerd in deze zandbak: hier alleen de taal, geen netten en geen vensters.'); }, {",
    "  get: function (t, k) { if (k === 'toString' || k === 'valueOf' || k === 'constructor' || k === 'then') return undefined; throw new Error(naam + ' is geblokkeerd in deze zandbak.'); },",
    "  set: function () { throw new Error(naam + ' is geblokkeerd in deze zandbak.'); },",
    "  apply: function () { throw new Error(naam + ' is geblokkeerd in deze zandbak.'); }, });",
    "const console = {",
    "  log: (...a) => { __ronden(); __log.push({ soort: 'log', tekst: a.map(__toon).join(' ') }); },",
    "  info: (...a) => __log.push({ soort: 'log', tekst: a.map(__toon).join(' ') }),",
    "  warn: (...a) => __log.push({ soort: 'warn', tekst: a.map(__toon).join(' ') }),",
    "  error: (...a) => __log.push({ soort: 'fout', tekst: a.map(__toon).join(' ') }),",
    "  table: (...a) => __log.push({ soort: 'log', tekst: a.map(__toon).join(' ') }),",
    "};",
    "const fetch = __verbod('fetch'), XMLHttpRequest = __verbod('XMLHttpRequest'), WebSocket = __verbod('WebSocket'), EventSource = __verbod('EventSource');",
    "const alert = __verbod('alert'), prompt = __verbod('prompt'), confirm = __verbod('confirm');",
    "const localStorage = __verbod('localStorage'), sessionStorage = __verbod('sessionStorage'), indexedDB = __verbod('indexedDB');",
    "const document = __doc;",
    "function __stuur(o) {",
    "  if (typeof __UIT !== 'undefined' && __UIT) {",
    "    if (__UIT.__bij) __UIT.__bij(o);",
    "    else Object.assign(__UIT, { log: o.log, geeft: o.geeft, heeft: o.heeft, roep: o.roep, dom: o.dom, fout: o.fout || null });",
    "    return;",
    "  }",
    "  try { parent.postMessage(Object.assign({ __kuur: 1 }, o), '*'); } catch (e) {}",
    "}",
    "function __rapport() { __stuur({ fout: null, log: __log, geeft: __geeft, heeft: __heeftGegeven, roep: __ROEP, dom: __DOM }); }",
    "function __val(err) { __stuur({ fout: 'Asynchrone afhandeling: ' + (err && err.message ? err.message : err), log: __log, geeft: __geeft, heeft: __heeftGegeven, roep: __ROEP, dom: __DOM }); }",
  ].join("\n");

  /* De eigen klok: alleen in modus "omlopen". Belletjes lopen af zodra de
     leerling `await omlopen(ms)` schrijft, in volgorde van hun tijd. */
  const KLOK = [
    "const __tijd = { nu: 0 };",
    "const __bellingen = [];",
    "let __bellNr = 0;",
    "function setTimeout(fn, ms, ...arg) { const nr = ++__bellNr; __bellingen.push({ nr: nr, om: __tijd.nu + Math.max(0, Number(ms) || 0), fn: fn, arg: arg }); return nr; }",
    "function clearTimeout(nr) { const i = __bellingen.findIndex((b) => b.nr === nr); if (i !== -1) __bellingen.splice(i, 1); }",
    "function setInterval(fn, ms, ...arg) { const nr = ++__bellNr; __bellingen.push({ nr: nr, om: __tijd.nu + Math.max(1, Number(ms) || 1), fn: fn, arg: arg, per: Math.max(1, Number(ms) || 1) }); return nr; }",
    "function clearInterval(nr) { clearTimeout(nr); }",
    "class __Bell {",
    "  constructor(fn) { this.__w = null; this.__v = undefined; this.__k = null; const ok = (w) => { if (this.__w) return; this.__w = 'goed'; this.__v = w; this.__door(); }; const nee = (e) => { if (this.__w) return; this.__w = 'fout'; this.__k = e; this.__door(); }; this.__ok = ok; this.__nee = nee; if (fn) { try { fn(ok, nee); } catch (e) { nee(e); } } }",
    "  __door() { const doorgaan = this.__w === 'goed' ? this.__a : this.__b; if (!doorgaan) return; this.__a = null; this.__b = null; try { doorgaan(this.__w === 'goed' ? this.__v : this.__k); } catch (e) { console.error(e && e.message ? e.message : e); } }",
    "  then(goed, fout) { const volgende = new __Bell(); this.__a = (w) => { try { const r = goed ? goed(w) : w; if (r && typeof r.then === 'function') { r.then((z) => volgende.__ok(z), (e) => volgende.__nee(e)); } else volgende.__ok(r); } catch (e) { volgende.__nee(e); } };",
    "    this.__b = (e) => { if (fout) { try { volgende.__ok(fout(e)); } catch (err) { volgende.__nee(err); } } else volgende.__nee(e); };",
    "    if (this.__w) this.__door();",
    "    return volgende;",
    "  }",
    "  catch(fout) { return this.then(undefined, fout); }",
    "  finally(op) { return this.then((w) => { op(); return w; }, (e) => { op(); throw e; }); }",
    "  static resolve(w) { const b = new __Bell(); b.__ok(w); return b; }",
    "  static reject(e) { const b = new __Bell(); b.__nee(e); return b; }",
    "}",
    "const Promise = __Bell;",
    "function __omlopen(ms) {",
    "  const tot = __tijd.nu + Math.max(0, Number(ms) || 0);",
    "  for (let veil = 0; veil < 2000; veil++) {",
    "    __bellingen.sort((a, b) => a.om - b.om);",
    "    const e = __bellingen[0];",
    "    if (!e || e.om > tot) break;",
    "    __tijd.nu = e.om;",
    "    if (e.per) { e.om = __tijd.nu + e.per; } else { __bellingen.shift(); }",
    "    try { e.fn.apply(null, e.arg); } catch (err) { __log.push({ soort: 'fout', tekst: String(err && err.message ? err.message : err) }); }",
    "  }",
    "  __tijd.nu = tot;",
    "  return Promise.resolve(0);",
    "}",
    "function omlopen(ms) { return __omlopen(ms); }",
    "const klok = () => __tijd.nu;",
  ].join("\n");

  /* Elke lus krijgt de rondenteller vooraan in zijn lichaam. Snaartjes en
     commentaren worden overgeslagen, anders wordt "for (" in een tekst
     aangezien voor een lus. */
  SANDBOX.bewijk = function (code, opties) {
    const opt = opties || {};
    let br = String(code == null ? "" : code);
    if (opt.modus === "omlopen") {
      if (/\bawait\b/.test(br)) {
        throw new Error("Deze zandbak tikt met een eigen klok: await bestaat hier niet. Ketting met .then(...) en roep omlopen(ms) aan om de belletjes te laten afgaan.");
      }
      if (/\.then\s*\(/.test(br) && !/\bomlopen\b/.test(br)) {
        throw new Error("Er is een .then() maar geen omlopen(): de belletjes zijn nooit gelopen, dus ik kan niets controleren. Roep omlopen(ms) aan.");
      }
      if (/new\s+setTimeout\s*\(/.test(br) && !/\bomlopen\b/.test(br)) {
        throw new Error("Je setTimeout staat nog in de wachtrij: roep omlopen(ms) aan, dan pas loopt het af.");
      }
    } else if (/\bawait\b/.test(br) || /\bomlopen\b/.test(br) || /setTimeout\s*\(/.test(br)) {
      throw new Error("Deze oefening heeft geen klok: tijden en `await` horen in een oefening met modus \"omlopen\".");
    }
    let uit = "", i = 0;
    const isWs = (k) => /\s/.test(br[k] || "");
    const isNaam = (k) => /[\w$]/.test(br[k] || "");
    function overSnaar(k) {
      const teken = br[k];
      k += 1;
      while (k < br.length) {
        if (br[k] === "\\") { k += 2; continue; }
        if (br[k] === teken) return k + 1;
        k += 1;
      }
      return k;
    }
    function overCommentaar(k) {
      if (br[k + 1] === "/") { const e = br.indexOf("\n", k); return e === -1 ? br.length : e; }
      const e = br.indexOf("*/", k);
      return e === -1 ? br.length : e + 2;
    }
    function lusKop(k) {
      let diep = 0, j = k;
      while (j < br.length) {
        const ch = br[j];
        if (ch === '"' || ch === "'" || ch === "`") { j = overSnaar(j); continue; }
        if (ch === "/" && (br[j + 1] === "/" || br[j + 1] === "*")) { j = overCommentaar(j); continue; }
        if (ch === "(") diep += 1;
        else if (ch === ")") { diep -= 1; if (diep === 0) return j + 1; }
        j += 1;
      }
      return -1;
    }
    function lusEinde(k) {
      let diep = 0, j = k;
      while (j < br.length) {
        const ch = br[j];
        if (ch === '"' || ch === "'" || ch === "`") { j = overSnaar(j); continue; }
        if (ch === "/" && (br[j + 1] === "/" || br[j + 1] === "*")) { j = overCommentaar(j); continue; }
        if (ch === "{") diep += 1;
        else if (ch === "}") { diep -= 1; if (diep === 0) return j; }
        j += 1;
      }
      return -1;
    }
    while (i < br.length) {
      const ch = br[i];
      if (ch === '"' || ch === "'" || ch === "`") { const e = overSnaar(i); uit += br.slice(i, e); i = e; continue; }
      if (ch === "/" && (br[i + 1] === "/" || br[i + 1] === "*")) { const e = overCommentaar(i); uit += br.slice(i, e); i = e; continue; }
      const m = /^(for|while)\b/.exec(br.slice(i));
      if (m && !isNaam(i - 1)) {
        const slot = m[1];
        let j = i + slot.length;
        while (isWs(j)) j += 1;
        if (br[j] === "(") {
          const naKop = lusKop(j);
          if (naKop !== -1) {
            let k = naKop;
            while (isWs(k)) k += 1;
            uit += br.slice(i, naKop);
            if (br[k] === "{") {
              const sluit = lusEinde(k);
              if (sluit !== -1 && sluit > k + 1) { uit += "{ __ronden();"; i = k + 1; continue; }
              if (sluit !== -1) { uit += "{"; i = k + 1; continue; }
            }
            let e = k, diep = 0, s2 = null;
            while (e < br.length) {
              const c2 = br[e];
              if (s2) { if (c2 === "\\") { e += 2; continue; } if (c2 === s2) s2 = null; e += 1; continue; }
              if (c2 === '"' || c2 === "'" || c2 === "`") { s2 = c2; e += 1; continue; }
              if (c2 === "(" || c2 === "[") diep += 1;
              else if (c2 === ")" || c2 === "]") diep -= 1;
              else if (c2 === "/" && (br[e + 1] === "/" || br[e + 1] === "*")) break;
              if (diep === 0 && (c2 === ";" || c2 === "}")) break;
              e += 1;
            }
            uit += "{ __ronden(); " + br.slice(k, e) + " }";
            i = e;
            continue;
          }
        }
      }
      uit += ch;
      i += 1;
    }
    return uit;
  };

  function gedeclareerden(code) {
    const namen = [];
    const re = /\bfunction\s+([A-Za-z_$][\w$]*)\s*\(|\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/g;
    let m;
    while ((m = re.exec(code))) {
      const n = m[1] || m[2];
      if (n && namen.indexOf(n) === -1 && !/^(geef|roep|console|document|omlopen|__)/.test(n)) namen.push(n);
    }
    return namen;
  }
  SANDBOX.gedeclareerden = gedeclareerden;

  function zaadBrowser(html) {
    const s = String(html == null ? "" : html);
    if (!s.trim()) return "";
    return [
      "/* --- het zaad: de opzet van deze oefening --- */",
      "const __bron = new DOMParser().parseFromString('<body>' + " + JSON.stringify(s) + " + '</body>', 'text/html');",
      "__bron.body.querySelectorAll('*').forEach((el) => {",
      "  const k = el.id ? '#' + el.id : el.tagName.toLowerCase();",
      "  const n = __DOM[k];",
      "  n.textContent = n.textContent || el.textContent;",
      "  n.innerHTML = el.innerHTML;",
      "  el.getAttributeNames().forEach((a) => n.setAttribute(a, el.getAttribute(a)));",
      "  String(el.className || '').split(/\\s+/).filter(Boolean).forEach((c) => { if (n.classes.indexOf(c) === -1) n.classes.push(c); });",
      "  n.__aantal = (n.__aantal || 0) + 1;",
      "});",
    ].join("\n");
  }

  function zaadNode(html) {
    const s = String(html == null ? "" : html);
    if (!s.trim()) return "";
    return [
      "/* --- zaad, met een mini-parser (de testkist heeft geen DOMParser) --- */",
      "const __seed = " + JSON.stringify(s) + ";",
      "const __res = /<([a-zA-Z][\\w-]*)((?:\\s+[\\w-]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^>\\s]+))?)*)\\s*>/g;",
      "let __m;",
      "while ((__m = __res.exec(__seed))) {",
      "  const tag = __m[1], at = __m[2] || '';",
      "  const idm = at.match(/\\bid\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^>\\s]+))/i);",
      "  const klm = at.match(/\\bclass\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^>\\s]+))/i);",
      "  const k = idm ? '#' + (idm[1] || idm[2] || idm[3]) : tag.toLowerCase();",
      "  const n = __DOM[k];",
      "  const van = __seed.slice(__m.index + __m[0].length);",
      "  const tot = van.indexOf('</' + tag + '>');",
      "  const binnen = tot === -1 ? '' : van.slice(0, tot);",
      "  n.innerHTML = binnen;",
      "  if (!n.textContent) n.textContent = binnen.replace(/<[^>]*>/g, ' ').trim();",
      "  const ar = at.match(/[\\w-]+\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^>\\s]+)/g) || [];",
      "  ar.forEach((p) => { const i = p.indexOf('='); n.setAttribute(p.slice(0, i).trim(), p.slice(i + 1).replace(/^[\"']|[\"']$/g, '')); });",
      "  if (klm) String(klm[1] || klm[2] || klm[3] || '').split(/\\s+/).filter(Boolean).forEach((c) => { if (n.classes.indexOf(c) === -1) n.classes.push(c); });",
      "  n.__aantal = (n.__aantal || 0) + 1;",
      "}",
    ].join("\n");
  }

  /* één keer de bron bouwen, voor alle drie de smaken */
  function knoop(code, html, opt) {
    let eigen;
    try { eigen = SANDBOX.bewijk(String(code == null ? "" : code), opt); }
    catch (bezwaar) { return { weigering: String(bezwaar && bezwaar.message ? bezwaar.message : bezwaar) }; }
    const L = [];
    L.push(VOOR);
    if (opt.modus === "omlopen") L.push(KLOK);
    L.push(opt.inIframe ? zaadBrowser(html) : zaadNode(html));
    L.push("try {");
    L.push("/* ---- jouw code ---- */");
    L.push(eigen);
    L.push("/* ---- einde jouw code ---- */");
    const namen = gedeclareerden(eigen);
    if (namen.length) L.push(namen.map((n) => "try { " + n + " = __dek(" + n + ", '" + n + "'); } catch (e) {}").join("\n"));
    L.push("__rapport();");
    L.push("} catch (__e) {");
    L.push("  __stuur({");
    L.push("    fout: String((__e && __e.constructor && __e.constructor.name) || 'Fout') + ': ' + (__e && __e.message ? __e.message : __e),");
    L.push("    log: __log, geeft: __geeft, heeft: __heeftGegeven, roep: __ROEP, dom: __DOM,");
    L.push("  });");
    L.push("}");
    return { bron: L.join("\n") };
  }

  SANDBOX.bouw = function (code, html, opties) {
    const opt = Object.assign({ inIframe: true }, opties || {});
    const klaar = knoop(code, html, opt);
    if (klaar.weigering) return "/* " + klaar.weigering.replace(/\*\//g, "") + " */";
    return "/* JS-BREUK-zandbak · deze omlijsting schrijf jij niet */\n(function () {\n" + klaar.bron + "\n})();";
  };

  /* De proxy maakt elk aangesproken label aan: `toJSON` en een leeg `body`
     zijn bijvangst van de omlijsting zelf. */
  function knopen(dom) {
    const uit = {};
    Object.keys(dom || {}).forEach((k) => {
      if (!/^(#|\.)?[A-Za-z][\w-]*$/.test(k)) return;
      if (k === "toJSON") return;
      if (k === "body" && !(dom[k] && dom[k].textContent)) return;
      uit[k] = dom[k];
    });
    return uit;
  }
  SANDBOX.knopen = knopen;

  function resultaat(uit) {
    const log = (uit.log || []).map((r) => (typeof r === "string" ? { soort: "log", tekst: r } : r));
    return {
      ok: !uit.fout,
      fout: uit.fout || null,
      log: log,
      regels: log.map((r) => r.tekst),
      geeft: uit.geeft,
      heeft: !!uit.heeft,
      roep: uit.roep || [],
      dom: knopen(uit.dom),
    };
  }
  SANDBOX.resultaat = resultaat;

  /* ---------- Node, synchroon ---------- */
  SANDBOX.uitvoerenNode = function (code, html, opties) {
    const opt = Object.assign({ modus: "" }, opties || {});
    const klaar = knoop(code, html, opt);
    if (klaar.weigering) return resultaat({ fout: klaar.weigering, log: [] });
    const uit = { log: [], geeft: null, heeft: false, fout: null, roep: [], dom: {} };
    try { new Function("__UIT", klaar.bron)(uit); }
    catch (e) { uit.fout = "SyntaxError: " + e.message; }
    return resultaat(uit);
  };

  /* ---------- Node, met wachten (modus "omlopen") ---------- */
  SANDBOX.uitvoerenNodeAsync = function (code, html, opties) {
    const opt = Object.assign({ modus: "omlopen" }, opties || {});
    const klaar = knoop(code, html, opt);
    if (klaar.weigering) return Promise.resolve(resultaat({ fout: klaar.weigering, log: [] }));
    const uit = { log: [], geeft: null, heeft: false, fout: null, roep: [], dom: {} };
    return new Promise((resolve) => {
      let klaar_met = false;
      const toe = (o) => {
        Object.assign(uit, { log: o.log, geeft: o.geeft, heeft: o.heeft, roep: o.roep, dom: o.dom, fout: o.fout || null });
      };
      uit.__bij = (o) => { if (klaar_met) return; klaar_met = true; toe(o); resolve(resultaat(uit)); };
      const bewaak = setTimeout(() => {
        if (klaar_met) return;
        klaar_met = true;
        resolve(resultaat({ fout: "De code blijft wachten op een belofte die nooit uitkomt.", log: uit.log }));
      }, 900);
      try { new Function("__UIT", klaar.bron)(uit); }
      catch (e) {
        clearTimeout(bewaak);
        if (!klaar_met) { klaar_met = true; resolve(resultaat({ fout: "SyntaxError: " + e.message, log: [] })); }
      }
    });
  };

  /* ---------- browser: iframe + postMessage ---------- */
  let frame = null, teller = 0, wacht = {};
  function kader() {
    if (frame) return frame;
    frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("title", "JS-BREUK zandbak");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:640px;height:200px;border:0;";
    document.body.appendChild(frame);
    window.addEventListener("message", (ev) => {
      const d = ev.data;
      if (!d || d.__kuur !== 1 || d.__id === undefined) return;
      const bestel = wacht[d.__id];
      if (!bestel) return;
      delete wacht[d.__id];
      clearTimeout(bestel.timer);
      bestel.res(resultaat(d));
    });
    return frame;
  }

  SANDBOX.uitvoeren = function (code, html, ms, opties) {
    return new Promise((resolve) => {
      const f = kader();
      const id = ++teller;
      const opt = Object.assign({ inIframe: true, modus: (opties && opties.modus) || "" }, opties || {});
      const binnen = [
        "<!DOCTYPE html><html lang=\"nl\"><head><meta charset=\"utf-8\"></head><body>",
        "<script>window.__kuurId = " + id + ";",
        "window.__stuur = function (o) { o.__kuur = 1; o.__id = window.__kuurId; try { parent.postMessage(o, '*'); } catch (e) {} };<\/script>",
        "<script>" + SANDBOX.bouw(code, html, opt) + "<\/script>",
        "</body></html>",
      ].join("");
      const bestel = {
        id: id, res: resolve,
        timer: setTimeout(() => {
          if (!wacht[id]) return;
          delete wacht[id];
          /* het kader uit het blad halen: de browser kan het vastgelopen
             draadje zo zelf afbraaken */
          try { f.remove(); } catch (e) {}
          frame = null;
          resolve(resultaat({ fout: "Te lang bezig: deze code komt niet meer klaar — eindeloze lus? De zandbak is afgebroken.", log: [] }));
        }, ms || 4000),
      };
      wacht[id] = bestel;
      f.srcdoc = binnen;
    });
  };

  /* ---------- hulpjes die ook de checker gebruikt ---------- */
  SANDBOX.normaliseer = (x) => String(x == null ? "" : x).replace(/\s+/g, " ").trim();
  SANDBOX.gelijk = function (a, b) {
    if (a === b) return true;
    if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 1e-9;
    if (a == null || b == null) return false;
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => SANDBOX.gelijk(x, b[i]));
    if (typeof a === "object" && typeof b === "object") {
      const ka = Object.keys(a), kb = Object.keys(b);
      return ka.length === kb.length && ka.every((k) => SANDBOX.gelijk(a[k], b[k]));
    }
    return String(a) === String(b);
  };
})();
