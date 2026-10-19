/* ============================================================
   checks.js · de toolkit van JS-BREUK
   Eén bron voor alles wat een regel nodig heeft: normaliseren,
   execute (via sandbox.js) en de terminal-simulator (via fakegit.js).
   ============================================================ */
(function () {
  const K = (window.CHECKS = {});

  K.norm = (x) => String(x == null ? "" : x).replace(/\s+/g, " ").trim();
  K.regeleks = (x) => String(x == null ? "" : x).replace(/\r/g, "").split("\n");
  K.esc = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  /* Veilige regex: een slechte regel mag de site niet laten crashen. */
  K.probeer = function (pat, vlaggen) {
    try { return new RegExp(pat, vlaggen || "i"); }
    catch (e) { return null; }
  };

  K.heeft = (tekst, re) => !!re && re.test(String(tekst == null ? "" : tekst));

  /* ---- uitvoer van de zandbak ontsluiten ---- */
  K.regelsVan = function (r) {
    return (r && r.regels ? r.regels : []).map((x) => K.norm(x));
  };

  /* Een verwachte lijn matcht een console-uitvoer als de regel exact gelijk
     is, óf als "naam: waarde" eindigt op de verwachte waarde. */
  K.lijnMatcht = function (lijn, verwacht) {
    const a = K.norm(lijn), b = K.norm(verwacht);
    if (!b) return false;
    if (a === b) return true;
    if (a.length > b.length && a.slice(-b.length) === b) {
      const vóór = a.slice(0, a.length - b.length);
      if (/[:>]$/.test(vóór.trim()) || /\s$/.test(vóór)) return true;
    }
    return false;
  };
  K.vindRegel = function (regels, verwacht) {
    return regels.some((l) => K.lijnMatcht(l, verwacht));
  };

  K.uitvoeren = function (code, html) {
    return window.SANDBOX.uitvoerenNode(code, html);
  };
  K.uitvoerenNet = function (code, html) {
    return window.SANDBOX.uitvoeren(code, html);
  };

  K.terminal = function (invoer, bestanden) {
    return window.TERM.uitvoer(invoer, bestanden);
  };

  /* Diepe vergelijking: getallen tolerant voor 1e-9, objecten per sleutel. */
  K.gelijk = window.SANDBOX.gelijk;

  /* Slotjes: de antwoorden van de leerling op de theorievragen. */
  K.keuze = function (c, i) {
    const s = (c.keuzes || [])[i];
    return s === undefined || s === null ? null : Number(s);
  };
  K.tekst = function (c, i) {
    return String((c.teksten || [])[i] == null ? "" : (c.teksten || [])[i]);
  };

  /* Voorspelling: één voorspelde regel per console.log, in volgorde. */
  K.vermoed = function (c) {
    const ruw = (c.vermoed || []).slice();
    if (!ruw.length && c.vermoedTekst) ruw.push(c.vermoedTekst);
    return ruw
      .map((x) => String(x == null ? "" : x))
      .join("\n")
      .split("\n")
      .map((x) => K.norm(x))
      .filter((x) => x.length);
  };
})();
