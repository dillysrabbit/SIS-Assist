/* SIS-Assist · Aspekt-Katalog für die sechs Themenfelder der SIS.
   Datendatei, von Hand pflegbar. Die App baut aus den gesetzten Aspekten den Fließtext.

   Aufbau
   ─────
   skalen      Antwortskalen. Jeder Aspekt verweist mit "skala" auf eine davon.
   felder.tfN  Pro Themenfeld: freitextProminent (Ergänzung oben statt unten) und gruppen.
   gruppen     Zwei Bauarten:
               a) Gebündelte Gruppe: die Gruppe hat "satz" (und "kurz"). Aspekte mit gleichem Wert werden
                  zu einem Satz zusammengezogen – {L} ist die aufgezählte Liste der Aspekt-Labels
                  ("lk" = Label in der Satzform, sonst "l"). Der erste Wert nutzt "satz", weitere "kurz".
               b) Einzelaspekte: jeder Aspekt hat eine eigene "satz"-Tabelle pro Skalenwert.
   Platzhalter {N} Nominativ, {Nd} Dativ, {Na} Akkusativ – die erste Nennung im Themenfeld wird zum
               Namen („Herr Mustermann"), jede weitere zum Pronomen (er/sie, ihm/ihr, ihn/sie).
               Bei Anrede „neutral" wird immer der Name eingesetzt.
   ph          Platzhalter des Bemerkungsfeldes (Beispiel für eine konkrete Beobachtung).

   Bemerkung   Wird als eigener Satz hinter den Aspektsatz gesetzt. Beginnt sie klein, wird das
               Pronomen vorangestellt („findet den Weg …" → „Er findet den Weg …"); beginnt sie groß,
               wird sie unverändert übernommen. Ein fehlender Schlusspunkt wird ergänzt.
   Nicht gesetzte Aspekte erzeugen keinen Satz und zählen nicht als Lücke. */
window.THEMENFELDER = {
  version: '2026-10',
  skalen: {
    f:  { name:'Fähigkeit', werte:[ {k:'ja', l:'ja'}, {k:'teils', l:'eingeschränkt'}, {k:'nein', l:'nein'} ] },
    s:  { name:'Selbstständigkeit', werte:[ {k:'selbst', l:'selbstständig'}, {k:'anleitung', l:'mit Anleitung'}, {k:'unterstuetzung', l:'mit Unterstützung'}, {k:'uebernahme', l:'vollständig übernommen'} ] },
    jn: { name:'Vorhanden', werte:[ {k:'ja', l:'ja'}, {k:'nein', l:'nein'}, {k:'unklar', l:'unklar'} ] }
  },
  felder: {

    /* ───────── TF1 · Kognition & Kommunikation ───────── */
    tf1: { freitextProminent:false, gruppen:[
      { k:'orient', name:'Orientierung', skala:'f',
        satz:{ ja:'{N} ist {L} orientiert', teils:'{N} ist {L} teilweise orientiert', nein:'{N} ist {L} nicht orientiert' },
        kurz:{ teils:'{L} teilweise', nein:'{L} nicht' },
        aspekte:[
          { k:'zeit', l:'zeitlich', ph:'z. B. weiß Tageszeit, nicht Datum' },
          { k:'ort', l:'örtlich', ph:'z. B. findet den Weg zur Toilette nicht mehr' },
          { k:'situativ', l:'situativ', ph:'z. B. versteht, dass sie im Pflegeheim lebt' },
          { k:'person', l:'zur eigenen Person', lk:'zur eigenen Person', ph:'z. B. nennt Namen und Geburtsjahr' }
        ] },
      { k:'gedaechtnis', name:'Gedächtnis', aspekte:[
          { k:'kurz', l:'Kurzzeitgedächtnis', skala:'f', ph:'z. B. fragt mehrfach nach dem Mittagessen',
            satz:{ ja:'{N} erinnert sich an kurz zurückliegende Ereignisse und Absprachen.', teils:'Kurz zurückliegende Ereignisse und Absprachen erinnert {N} nur teilweise.', nein:'{N} erinnert sich nicht an kurz zurückliegende Ereignisse und Absprachen.' } },
          { k:'lang', l:'Langzeitgedächtnis', skala:'f', ph:'z. B. erzählt detailreich von der Zeit im Betrieb',
            satz:{ ja:'Biografische Erinnerungen sind {Nd} präsent und abrufbar.', teils:'Biografische Erinnerungen sind nur teilweise abrufbar.', nein:'Biografische Erinnerungen sind kaum noch abrufbar.' } },
          { k:'personen', l:'vertraute Personen erkennen', skala:'f', ph:'z. B. erkennt die Tochter, verwechselt den Sohn',
            satz:{ ja:'{N} erkennt vertraute Personen.', teils:'{N} erkennt vertraute Personen nicht immer.', nein:'{N} erkennt vertraute Personen nicht mehr.' } }
        ] },
      { k:'aufmerksamkeit', name:'Aufmerksamkeit', aspekte:[
          { k:'gespraech', l:'Gespräch konzentriert folgen', skala:'f', ph:'z. B. verliert nach wenigen Minuten den Faden',
            satz:{ ja:'{N} kann einem Gespräch konzentriert folgen.', teils:'{N} kann einem Gespräch nur kurz konzentriert folgen.', nein:'{N} kann einem Gespräch nicht konzentriert folgen.' } },
          { k:'handlung', l:'mehrschrittige Handlungen zu Ende führen', skala:'f', ph:'z. B. bleibt beim Anziehen auf halbem Weg stehen',
            satz:{ ja:'{N} führt mehrschrittige Alltagshandlungen selbstständig zu Ende.', teils:'{N} braucht bei mehrschrittigen Alltagshandlungen Impulse, um sie zu Ende zu führen.', nein:'{N} kann mehrschrittige Alltagshandlungen nicht mehr eigenständig zu Ende führen.' } }
        ] },
      { k:'verstehen', name:'Verstehen', skala:'f',
        satz:{ ja:'{N} versteht {L}', teils:'{N} versteht {L} nur teilweise', nein:'{N} versteht {L} nicht' },
        kurz:{ teils:'{L} nur teilweise', nein:'{L} nicht' },
        aspekte:[
          { k:'einfach', l:'einfache Aufforderungen', ph:'z. B. „Bitte setzen Sie sich" wird umgesetzt' },
          { k:'komplex', l:'komplexe Sachverhalte', ph:'z. B. Erklärungen zur Medikation müssen wiederholt werden' },
          { k:'pflege', l:'Informationen zur eigenen Pflege', ph:'z. B. kann Absprachen zur Körperpflege nachvollziehen' }
        ] },
      { k:'mitteilen', name:'Sich mitteilen', aspekte:[
          { k:'verbal', l:'verbal', skala:'f', ph:'z. B. Wortfindungsstörungen, spricht in kurzen Sätzen',
            satz:{ ja:'{N} teilt sich verbal verständlich mit.', teils:'Die verbale Verständigung ist eingeschränkt.', nein:'{N} kann sich verbal nicht mehr mitteilen.' } },
          { k:'nonverbal', l:'nonverbal', skala:'f', ph:'z. B. wendet den Kopf ab, wenn etwas nicht passt',
            satz:{ ja:'{N} nutzt Mimik und Gestik, um sich verständlich zu machen.', teils:'Nonverbale Signale sind vorhanden, aber nicht immer eindeutig zu deuten.', nein:'Nonverbale Signale sind kaum zu deuten.' } },
          { k:'beduerfnisse', l:'Bedürfnisse äußern', skala:'f', ph:'z. B. meldet Toilettengang, nicht aber Schmerzen',
            satz:{ ja:'{N} äußert Bedürfnisse wie Durst, Schmerz oder Toilettengang von sich aus.', teils:'{N} äußert Bedürfnisse nur auf Nachfrage.', nein:'{N} äußert Bedürfnisse nicht; sie müssen aus dem Verhalten erschlossen werden.' } }
        ] },
      { k:'sinne', name:'Sinne', aspekte:[
          { k:'hoeren', l:'Hören (mit Hilfsmittel)', skala:'f', ph:'z. B. Hörgerät beidseits, versteht bei Nebengeräuschen schlecht',
            satz:{ ja:'{N} hört gut.', teils:'{N} hört eingeschränkt.', nein:'{N} hört kaum.' } },
          { k:'sehen', l:'Sehen (mit Hilfsmittel)', skala:'f', ph:'z. B. Lesebrille, erkennt Gesichter erst aus der Nähe',
            satz:{ ja:'{N} sieht gut.', teils:'{N} sieht eingeschränkt.', nein:'{N} sieht kaum.' } }
        ] },
      { k:'entscheiden', name:'Entscheiden', aspekte:[
          { k:'alltag', l:'Alltagsentscheidungen treffen', skala:'f', ph:'z. B. wählt Kleidung und Essen selbst aus',
            satz:{ ja:'{N} trifft Alltagsentscheidungen selbst.', teils:'{N} trifft Alltagsentscheidungen mit Unterstützung.', nein:'Alltagsentscheidungen können nicht mehr selbst getroffen werden.' } },
          { k:'risiken', l:'Risiken erkennen', skala:'f', ph:'z. B. steht ohne Rollator auf, unterschätzt Sturzgefahr',
            satz:{ ja:'{N} erkennt Risiken im Alltag und handelt entsprechend.', teils:'{N} erkennt Risiken im Alltag nur eingeschränkt.', nein:'{N} erkennt Risiken im Alltag nicht.' } }
        ] }
    ] },

    /* ───────── TF2 · Mobilität & Beweglichkeit ───────── */
    tf2: { freitextProminent:false, gruppen:[
      { k:'bett', name:'Im Bett und im Sitzen', aspekte:[
          { k:'lage', l:'Lagewechsel im Bett', skala:'s', ph:'z. B. dreht sich nach links allein, nach rechts mit Hilfe',
            satz:{ selbst:'{N} wechselt die Lage im Bett selbstständig.', anleitung:'{N} wechselt die Lage im Bett mit verbaler Anleitung.', unterstuetzung:'{N} braucht beim Lagewechsel im Bett Unterstützung.', uebernahme:'Der Lagewechsel im Bett wird vollständig übernommen.' } },
          { k:'sitzen', l:'stabile Sitzposition halten', skala:'f', ph:'z. B. kippt nach etwa 20 Minuten zur Seite',
            satz:{ ja:'{N} hält eine stabile Sitzposition.', teils:'{N} hält eine Sitzposition nur mit Abstützen oder zeitlich begrenzt.', nein:'{N} kann nicht frei sitzen.' } }
        ] },
      { k:'transfer', name:'Transfer', aspekte:[
          { k:'bettstuhl', l:'Transfer Bett ↔ Stuhl', skala:'s', ph:'z. B. mit Rutschbrett, Hemiparese links beachten',
            satz:{ selbst:'{N} führt den Transfer zwischen Bett und Stuhl selbstständig durch.', anleitung:'{N} führt den Transfer zwischen Bett und Stuhl mit verbaler Anleitung durch.', unterstuetzung:'{N} braucht beim Transfer zwischen Bett und Stuhl personelle Unterstützung.', uebernahme:'Der Transfer zwischen Bett und Stuhl wird vollständig übernommen.' } },
          { k:'aufstehen', l:'Aufstehen vom Stuhl', skala:'s', ph:'z. B. stützt sich an der Tischkante ab',
            satz:{ selbst:'{N} steht selbstständig vom Stuhl auf.', anleitung:'{N} steht nach Anleitung vom Stuhl auf.', unterstuetzung:'{N} braucht Hilfe beim Aufstehen vom Stuhl.', uebernahme:'Das Aufstehen vom Stuhl wird vollständig übernommen.' } }
        ] },
      { k:'gehen', name:'Gehen', aspekte:[
          { k:'innen', l:'Gehen im Wohnbereich', skala:'s', ph:'z. B. Strecke bis zum Speisesaal mit einer Pause',
            satz:{ selbst:'{N} geht im Wohnbereich selbstständig.', anleitung:'{N} geht im Wohnbereich selbstständig, braucht aber Erinnerung an das Hilfsmittel.', unterstuetzung:'{N} geht im Wohnbereich nur mit personeller Begleitung.', uebernahme:'{N} geht nicht mehr; Wege werden im Rollstuhl zurückgelegt.' } },
          { k:'treppe', l:'Treppen', skala:'f', ph:'z. B. nur mit Handlauf und Begleitung',
            satz:{ ja:'{N} bewältigt Treppen.', teils:'{N} bewältigt Treppen nur mit Handlauf und Begleitung.', nein:'{N} bewältigt keine Treppen.' } },
          { k:'aussen', l:'Gehen außerhalb des Hauses', skala:'s', ph:'z. B. Garten allein, Einkaufen nur mit Tochter',
            satz:{ selbst:'{N} verlässt das Haus selbstständig.', anleitung:'{N} verlässt das Haus nach Absprache.', unterstuetzung:'{N} geht nur in Begleitung nach draußen.', uebernahme:'{N} kommt nur im Rollstuhl mit Begleitung nach draußen.' } }
        ] },
      { k:'sicherheit', name:'Hilfsmittel & Sturz', aspekte:[
          { k:'hilfsmittel', l:'Hilfsmittel zur Fortbewegung', skala:'jn', ph:'z. B. Rollator, bleibt im Zimmer oft stehen',
            satz:{ ja:'{N} nutzt ein Hilfsmittel zur Fortbewegung.', nein:'{N} nutzt kein Hilfsmittel zur Fortbewegung.', unklar:'Der Bedarf an einem Hilfsmittel zur Fortbewegung ist noch zu klären.' } },
          { k:'sturz', l:'Stürze in den letzten 12 Monaten', skala:'jn', ph:'z. B. zwei Stürze nachts auf dem Weg zur Toilette',
            satz:{ ja:'{N} ist in den letzten zwölf Monaten gestürzt.', nein:'{N} ist in den letzten zwölf Monaten nicht gestürzt.', unklar:'Zur Sturzgeschichte liegen keine verlässlichen Angaben vor.' } }
        ] }
    ] },

    /* ───────── TF3 · Krankheitsbezogene Anforderungen & Belastungen ───────── */
    tf3: { freitextProminent:true, gruppen:[
      { k:'behandlung', name:'Behandlung', aspekte:[
          { k:'medikation', l:'Medikamenteneinnahme', skala:'s', ph:'z. B. Marcumar nach Plan, lehnt abends gelegentlich ab',
            satz:{ selbst:'{N} nimmt die Medikamente selbstständig und zuverlässig ein.', anleitung:'{N} nimmt die Medikamente nach Erinnerung ein.', unterstuetzung:'Die Medikamente werden gestellt und die Einnahme wird begleitet.', uebernahme:'Die Medikamentengabe wird vollständig übernommen.' } },
          { k:'therapie', l:'laufende Therapien / Behandlungen', skala:'jn', ph:'z. B. Physiotherapie 2×/Woche, Insulin nach Schema',
            satz:{ ja:'Es laufen Behandlungen bzw. Therapien, die im Alltag Zeit und Begleitung brauchen.', nein:'Derzeit laufen keine Therapien über die Regelversorgung hinaus.', unklar:'Der Behandlungs- und Therapiestatus ist mit der Arztpraxis abzugleichen.' } }
        ] },
      { k:'symptome', name:'Symptome', aspekte:[
          { k:'schmerz', l:'Schmerzen', skala:'jn', ph:'z. B. Knie rechts bei Belastung, NRS 4, abends stärker',
            satz:{ ja:'{N} hat Schmerzen.', nein:'{N} äußert keine Schmerzen und zeigt keine Schmerzzeichen.', unklar:'Ob Schmerzen vorliegen, ist noch nicht sicher einzuschätzen.' } },
          { k:'haut', l:'Hautveränderungen / Wunden', skala:'jn', ph:'z. B. Rötung am Steiß, Fingertest negativ',
            satz:{ ja:'Es bestehen Hautveränderungen bzw. Wunden.', nein:'Die Haut ist intakt.', unklar:'Der Hautzustand ist noch vollständig zu inspizieren.' } },
          { k:'atmung', l:'Einschränkung der Atmung', skala:'jn', ph:'z. B. Luftnot beim Treppensteigen, Sauerstoff nachts',
            satz:{ ja:'Die Atmung ist beeinträchtigt.', nein:'Die Atmung ist unauffällig.', unklar:'Die Atmung ist noch gezielt zu beobachten.' } },
          { k:'schlucken', l:'Hinweise auf Schluckstörung', skala:'jn', ph:'z. B. hustet beim Trinken, feuchte Stimme nach dem Essen',
            satz:{ ja:'Es bestehen Hinweise auf eine Schluckstörung.', nein:'Das Schlucken ist unauffällig.', unklar:'Das Schlucken ist noch gezielt zu beobachten.' } }
        ] },
      { k:'erleben', name:'Krankheitserleben', aspekte:[
          { k:'belastung', l:'Erkrankung belastet im Alltag', skala:'jn', ph:'z. B. „Ich bin doch nur noch eine Last"',
            satz:{ ja:'Die Erkrankung belastet {Na} im Alltag spürbar.', nein:'Mit der Erkrankung geht {N} nach eigener Aussage gelassen um.', unklar:'Wie {N} die Erkrankung erlebt, ist noch im Gespräch zu erfassen.' } }
        ] }
    ] },

    /* ───────── TF4 · Selbstversorgung ───────── */
    tf4: { freitextProminent:false, gruppen:[
      { k:'koerperpflege', name:'Körperpflege', aspekte:[
          { k:'oberkoerper', l:'Waschen Oberkörper', skala:'s', ph:'z. B. am Waschbecken im Sitzen, Rücken wird gewaschen',
            satz:{ selbst:'{N} wäscht Gesicht, Oberkörper und Arme selbstständig.', anleitung:'{N} wäscht Gesicht, Oberkörper und Arme mit Anleitung.', unterstuetzung:'{N} braucht bei der Oberkörperwäsche Unterstützung.', uebernahme:'Die Oberkörperwäsche wird vollständig übernommen.' } },
          { k:'unterkoerper', l:'Waschen Unterkörper & Intimbereich', skala:'s', ph:'z. B. Intimbereich selbst, Füße werden gewaschen',
            satz:{ selbst:'{N} wäscht Unterkörper und Intimbereich selbstständig.', anleitung:'{N} wäscht Unterkörper und Intimbereich mit Anleitung.', unterstuetzung:'{N} braucht bei der Wäsche von Unterkörper und Intimbereich Unterstützung.', uebernahme:'Die Wäsche von Unterkörper und Intimbereich wird vollständig übernommen.' } },
          { k:'mund', l:'Mund- und Zahnpflege', skala:'s', ph:'z. B. Prothese oben, reinigt sie nach Aufforderung selbst',
            satz:{ selbst:'{N} führt die Mund- und Zahnpflege selbstständig durch.', anleitung:'{N} führt die Mund- und Zahnpflege nach Aufforderung und Anleitung durch.', unterstuetzung:'Bei der Mund- und Zahnpflege braucht {N} Unterstützung.', uebernahme:'Die Mund- und Zahnpflege wird vollständig übernommen.' } },
          { k:'kleiden', l:'An- und Auskleiden', skala:'s', ph:'z. B. Oberteil selbst, Strümpfe und Schuhe werden angezogen',
            satz:{ selbst:'{N} kleidet sich selbstständig an und aus.', anleitung:'{N} kleidet sich mit Anleitung an und aus.', unterstuetzung:'{N} braucht beim An- und Auskleiden Unterstützung.', uebernahme:'Das An- und Auskleiden wird vollständig übernommen.' } }
        ] },
      { k:'ernaehrung', name:'Essen & Trinken', aspekte:[
          { k:'essen', l:'Essen', skala:'s', ph:'z. B. Fleisch wird geschnitten, isst langsam',
            satz:{ selbst:'{N} isst selbstständig.', anleitung:'{N} isst mit mundgerecht vorbereiteter Kost und nach Aufforderung selbstständig.', unterstuetzung:'{N} braucht beim Essen teilweise Unterstützung.', uebernahme:'Das Essen wird vollständig angereicht.' } },
          { k:'trinken', l:'Trinken', skala:'s', ph:'z. B. trinkt ohne Erinnerung unter 1000 ml',
            satz:{ selbst:'{N} trinkt selbstständig und ausreichend.', anleitung:'{N} trinkt nur nach Erinnerung ausreichend.', unterstuetzung:'{N} braucht beim Trinken Unterstützung.', uebernahme:'Getränke werden vollständig angereicht.' } }
        ] },
      { k:'ausscheidung', name:'Ausscheidung', aspekte:[
          { k:'toilette', l:'Toilettengang', skala:'s', ph:'z. B. nachts Toilettenstuhl neben dem Bett',
            satz:{ selbst:'{N} geht selbstständig zur Toilette.', anleitung:'{N} geht nach Erinnerung bzw. mit Begleitung auf dem Weg zur Toilette.', unterstuetzung:'{N} braucht beim Toilettengang Unterstützung.', uebernahme:'Die Ausscheidung wird vollständig über Inkontinenzmaterial versorgt.' } },
          { k:'harn', l:'Harnkontinenz', skala:'f', ph:'z. B. Dranginkontinenz, nachts Vorlage – Kontinenzprofil ergänzen',
            satz:{ ja:'{N} ist harnkontinent.', teils:'{N} ist zeitweise harninkontinent.', nein:'{N} ist harninkontinent.' } },
          { k:'stuhl', l:'Stuhlkontinenz', skala:'f', ph:'z. B. bei Durchfall nicht kontinent, sonst unauffällig',
            satz:{ ja:'{N} ist stuhlkontinent.', teils:'{N} ist zeitweise stuhlinkontinent.', nein:'{N} ist stuhlinkontinent.' } }
        ] }
    ] },

    /* ───────── TF5 · Leben in sozialen Beziehungen ───────── */
    tf5: { freitextProminent:true, gruppen:[
      { k:'kontakte', name:'Kontakte', aspekte:[
          { k:'angehoerige', l:'regelmäßiger Kontakt zu Angehörigen', skala:'jn', ph:'z. B. Tochter kommt sonntags, Sohn telefoniert mittwochs',
            satz:{ ja:'{N} hat regelmäßigen Kontakt zu Angehörigen.', nein:'{N} hat keinen regelmäßigen Kontakt zu Angehörigen.', unklar:'Kontakte zu Angehörigen sind noch zu klären.' } },
          { k:'mitbewohner', l:'Kontakt zu Mitbewohnerinnen und Mitbewohnern', skala:'jn', ph:'z. B. sitzt beim Kaffee gern bei Frau K.',
            satz:{ ja:'{N} hat Kontakt zu Mitbewohnerinnen und Mitbewohnern.', nein:'Zu Mitbewohnerinnen und Mitbewohnern besteht bisher kein Kontakt.', unklar:'Wie {N} Kontakt zu Mitbewohnerinnen und Mitbewohnern aufnimmt, zeigt sich noch.' } }
        ] },
      { k:'tag', name:'Tagesgestaltung', aspekte:[
          { k:'angebote', l:'Teilnahme an Angeboten', skala:'jn', ph:'z. B. Singkreis und Gottesdienst ja, Gymnastik lehnt er ab',
            satz:{ ja:'{N} nimmt an Angeboten im Haus teil.', nein:'{N} nimmt derzeit nicht an Angeboten teil.', unklar:'Das Interesse an Angeboten ist noch zu erkunden.' } },
          { k:'struktur', l:'eigene Tagesstruktur gestalten', skala:'f', ph:'z. B. liest morgens Zeitung, schläft nach dem Mittag',
            satz:{ ja:'{N} gestaltet den Tag nach eigenen Vorstellungen.', teils:'{N} braucht Impulse, um den Tag zu gestalten.', nein:'{N} kann den Tag nicht mehr selbst gestalten.' } },
          { k:'rollen', l:'bedeutsame Rollen / Aufgaben', skala:'jn', ph:'z. B. deckt den Tisch mit, war Chorleiterin',
            satz:{ ja:'{N} hat Rollen und Aufgaben, die {Nd} wichtig sind.', nein:'Frühere Rollen und Aufgaben sind weggefallen.', unklar:'Bedeutsame Rollen und Aufgaben sind noch zu erfragen.' } }
        ] },
      { k:'belastung', name:'Belastung', aspekte:[
          { k:'rueckzug', l:'Rückzug, Einsamkeit, Trauer', skala:'jn', ph:'z. B. weint abends, spricht vom verstorbenen Mann',
            satz:{ ja:'{N} wirkt zurückgezogen bzw. äußert Einsamkeit oder Trauer.', nein:'Hinweise auf Rückzug oder Einsamkeit bestehen nicht.', unklar:'Hinweise auf Rückzug oder Einsamkeit sind weiter zu beobachten.' } }
        ] }
    ] },

    /* ───────── TF6 · Wohnen & Häuslichkeit ───────── */
    tf6: { freitextProminent:false, gruppen:[
      { k:'orient', name:'Orientierung im Wohnbereich', skala:'f',
        satz:{ ja:'{N} findet {L} selbstständig', teils:'{N} findet {L} nicht immer', nein:'{N} findet {L} nicht' },
        kurz:{ teils:'{L} nicht immer', nein:'{L} nicht' },
        aspekte:[
          { k:'zimmer', l:'eigenes Zimmer', lk:'das eigene Zimmer', ph:'z. B. orientiert sich am Bild neben der Tür' },
          { k:'speisesaal', l:'Speisesaal', lk:'den Speisesaal', ph:'z. B. geht hinter anderen her' },
          { k:'toilette', l:'Toilette', lk:'die Toilette', ph:'z. B. nachts nicht, Tür bleibt beleuchtet' }
        ] },
      { k:'zimmer', name:'Das eigene Zimmer', aspekte:[
          { k:'rueckzug', l:'Zimmer als Rückzugsort', skala:'jn', ph:'z. B. zieht sich nach dem Mittagessen zurück',
            satz:{ ja:'{N} nutzt das Zimmer als Rückzugsort.', nein:'{N} hält sich kaum im eigenen Zimmer auf.', unklar:'Wie {N} das Zimmer nutzt, zeigt sich noch.' } },
          { k:'gewohnheiten', l:'mitgebrachte Gewohnheiten', skala:'jn', ph:'z. B. Radio zum Frühstück, eigenes Kopfkissen, Mittagsschlaf 13–14 Uhr',
            satz:{ ja:'{N} hat Gewohnheiten mitgebracht, die im Alltag Platz brauchen.', nein:'Besondere Gewohnheiten wurden bisher nicht benannt.', unklar:'Mitgebrachte Gewohnheiten sind noch zu erfragen.' } }
        ] },
      { k:'sicherheit', name:'Sicherheit & Nacht', aspekte:[
          { k:'ruf', l:'Umgang mit der Rufanlage', skala:'f', ph:'z. B. findet den Knopf nachts nicht',
            satz:{ ja:'{N} nutzt die Rufanlage zielgerichtet.', teils:'{N} nutzt die Rufanlage nicht zuverlässig.', nein:'{N} kann die Rufanlage nicht nutzen.' } },
          { k:'nacht', l:'nächtliche Unruhe / Aufstehen', skala:'jn', ph:'z. B. steht gegen 3 Uhr auf und sucht die Küche',
            satz:{ ja:'{N} ist nachts unruhig bzw. steht nachts auf.', nein:'Die Nächte verlaufen ruhig.', unklar:'Der nächtliche Verlauf ist noch zu beobachten.' } }
        ] }
    ] }
  }
};
