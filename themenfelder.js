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
   details     Optional je Aspekt: strukturierte Zusatzfelder, die nur bei den Werten in "bei" eingeblendet werden
               (z. B. Art und Lokalisation einer Wunde). "felder" sind kleine Textfelder (k, l, ph) mit einem
               Textbaustein "t" ({v} = Eingabe); leere Felder entfallen, gefüllte werden mit Komma verbunden.
               mehrfach:true erlaubt mehrere Einträge („+ weitere Wunde"). Mit "satz" wird je Eintrag ein eigener
               Satz gebildet ({F} = verbundene Bausteine, {i} = laufende Nummer, nur bei mehr als einem Eintrag);
               ohne "satz" werden die Bausteine in Klammern an den Aspektsatz gehängt.

   Bemerkung   Wird als eigener Satz hinter den Aspektsatz gesetzt. Beginnt sie klein, wird das
               Pronomen vorangestellt („findet den Weg …" → „Er findet den Weg …"); beginnt sie groß,
               wird sie unverändert übernommen. Ein fehlender Schlusspunkt wird ergänzt.
   Nicht gesetzte Aspekte erzeugen keinen Satz und zählen nicht als Lücke. */
window.THEMENFELDER = {
  version: '2026-10.3', // abgeglichen mit der SIS-Orientierungshilfe (Checkliste Erstgespräch, Maria-Hötte-Stift)
  skalen: {
    f:  { name:'Fähigkeit', werte:[ {k:'ja', l:'ja'}, {k:'teils', l:'eingeschränkt'}, {k:'nein', l:'nein'} ] },
    s:  { name:'Selbstständigkeit', werte:[ {k:'selbst', l:'selbstständig'}, {k:'anleitung', l:'mit Anleitung'}, {k:'unterstuetzung', l:'mit Unterstützung'}, {k:'uebernahme', l:'vollständig übernommen'} ] },
    jn: { name:'Vorhanden', werte:[ {k:'ja', l:'ja'}, {k:'nein', l:'nein'}, {k:'unklar', l:'unklar'} ] },
    kath: { name:'Blasenkatheter', werte:[ {k:'nein', l:'keiner'}, {k:'tuk', l:'transurethral'}, {k:'spk', l:'suprapubisch'} ] }
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
          { k:'sprechen', l:'Sprechen (Artikulation, Tempo)', skala:'f', ph:'z. B. verwaschen nach Schlaganfall, braucht Zeit für Antworten',
            satz:{ ja:'Das Sprechen ist flüssig und gut verständlich.', teils:'Das Sprechen ist verlangsamt bzw. zeitweise schwer verständlich.', nein:'Das Sprechen ist kaum verständlich.' } },
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
        ] },
      { k:'verhalten', name:'Verhalten & psychische Situation', aspekte:[
          { k:'herausfordernd', l:'herausforderndes Verhalten', skala:'jn', ph:'z. B. wehrt die Körperpflege ab, abends gereizt',
            satz:{ ja:'Es zeigt sich herausforderndes Verhalten.', nein:'Herausforderndes Verhalten zeigt sich derzeit nicht.', unklar:'Ob sich herausforderndes Verhalten zeigt, ist weiter zu beobachten.' } },
          { k:'unruhe', l:'Unruhe / Hinlauftendenz', skala:'jn', ph:'z. B. sucht nachmittags den Ausgang, „muss zur Arbeit“',
            satz:{ ja:'{N} ist zeitweise unruhig bzw. zeigt eine Hinlauftendenz.', nein:'Unruhe oder eine Hinlauftendenz bestehen nicht.', unklar:'Hinweise auf Unruhe oder eine Hinlauftendenz sind weiter zu beobachten.' } },
          { k:'aengste', l:'Ängste / psychische Belastung', skala:'jn', ph:'z. B. Angst vor dem Alleinsein in der Nacht',
            satz:{ ja:'{N} äußert Ängste bzw. wirkt psychisch belastet.', nein:'Ängste oder psychische Belastungen sind derzeit nicht erkennbar.', unklar:'Ängste und psychische Belastungen sind im Gespräch weiter zu erfassen.' } }
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
            satz:{ selbst:'{N} verlässt das Haus selbstständig.', anleitung:'{N} verlässt das Haus nach Absprache.', unterstuetzung:'{N} geht nur in Begleitung nach draußen.', uebernahme:'{N} kommt nur im Rollstuhl mit Begleitung nach draußen.' } },
          { k:'gangbild', l:'Gangbild auffällig', skala:'jn', ph:'z. B. kleinschrittig, vornübergebeugt, unsicher beim Drehen',
            satz:{ ja:'Das Gangbild ist auffällig.', nein:'Das Gangbild ist unauffällig.', unklar:'Das Gangbild ist noch gezielt zu beobachten.' } }
        ] },
      { k:'sicherheit', name:'Hilfsmittel & Sturz', aspekte:[
          { k:'hilfsmittel', l:'Hilfsmittel zur Fortbewegung', skala:'jn', ph:'z. B. Rollator, bleibt im Zimmer oft stehen',
            satz:{ ja:'{N} nutzt ein Hilfsmittel zur Fortbewegung.', nein:'{N} nutzt kein Hilfsmittel zur Fortbewegung.', unklar:'Der Bedarf an einem Hilfsmittel zur Fortbewegung ist noch zu klären.' } },
          { k:'sturz', l:'Stürze in den letzten 12 Monaten', skala:'jn', ph:'z. B. zwei Stürze nachts auf dem Weg zur Toilette',
            satz:{ ja:'{N} ist in den letzten zwölf Monaten gestürzt.', nein:'{N} ist in den letzten zwölf Monaten nicht gestürzt.', unklar:'Zur Sturzgeschichte liegen keine verlässlichen Angaben vor.' } }
        ] },
      { k:'risiken', name:'Risiken & Schutz', aspekte:[
          { k:'einfluss', l:'gesundheitliche Einflüsse auf die Mobilität', skala:'jn', ph:'z. B. Schwindel unter neuer Medikation, Schmerz im Knie',
            satz:{ ja:'Gesundheitliche Faktoren schränken die Mobilität ein.', nein:'Gesundheitliche Einflüsse auf die Mobilität bestehen derzeit nicht.', unklar:'Gesundheitliche Einflüsse auf die Mobilität sind weiter abzuklären.' } },
          { k:'dekubitus', l:'dekubitusgefährdete Körperstellen', skala:'jn', ph:'z. B. Steiß und Fersen – Abgleich mit der Risikomatrix',
            satz:{ ja:'Es bestehen dekubitusgefährdete Körperstellen.', nein:'Dekubitusgefährdete Körperstellen bestehen derzeit nicht.', unklar:'Die Dekubitusgefährdung ist differenziert einzuschätzen.' } },
          { k:'kontraktur', l:'kontrakturgefährdete Gelenke', skala:'jn', ph:'z. B. Schulter rechts, Hüfte – ggf. Matrix „Sonstiges“',
            satz:{ ja:'Es bestehen kontrakturgefährdete Gelenke.', nein:'Eine Kontrakturgefährdung besteht derzeit nicht.', unklar:'Die Kontrakturgefährdung ist differenziert einzuschätzen.' } },
          { k:'fem', l:'freiheitsentziehende Maßnahmen', skala:'jn', ph:'z. B. Bettseitenteil nachts – Einwilligung bzw. Beschluss prüfen',
            satz:{ ja:'Es kommen freiheitsentziehende Maßnahmen zum Einsatz; Einwilligung bzw. richterlicher Beschluss sind aktuell zu halten.', nein:'Freiheitsentziehende Maßnahmen kommen nicht zum Einsatz.', unklar:'Der Einsatz freiheitsentziehender Maßnahmen ist zu klären.' } },
          { k:'vorlieben', l:'persönliche Vorlieben zur Mobilität', skala:'jn', ph:'z. B. dreht nachmittags eine Runde durch den Garten',
            satz:{ ja:'Für Bewegung und Aufenthalte im Freien bestehen persönliche Vorlieben.', nein:'Besondere Vorlieben zur Mobilität wurden bisher nicht benannt.', unklar:'Vorlieben rund um Bewegung sind noch zu erfragen.' } }
        ] }
    ] },

    /* ───────── TF3 · Krankheitsbezogene Anforderungen & Belastungen ───────── */
    tf3: { freitextProminent:true, gruppen:[
      { k:'behandlung', name:'Behandlung', aspekte:[
          { k:'medikation', l:'Medikamenteneinnahme', skala:'s', ph:'z. B. Marcumar nach Plan, lehnt abends gelegentlich ab',
            satz:{ selbst:'{N} nimmt die Medikamente selbstständig und zuverlässig ein.', anleitung:'{N} nimmt die Medikamente nach Erinnerung ein.', unterstuetzung:'Die Medikamente werden gestellt und die Einnahme wird begleitet.', uebernahme:'Die Medikamentengabe wird vollständig übernommen.' } },
          { k:'therapie', l:'laufende Therapien / Behandlungen', skala:'jn', ph:'z. B. Physiotherapie 2×/Woche, Insulin nach Schema',
            satz:{ ja:'Es laufen Behandlungen bzw. Therapien, die im Alltag Zeit und Begleitung brauchen.', nein:'Derzeit laufen keine Therapien über die Regelversorgung hinaus.', unklar:'Der Behandlungs- und Therapiestatus ist mit der Arztpraxis abzugleichen.' } },
          { k:'versorgungen', l:'besondere Versorgungen (Stoma, PEG, Port, Tracheostoma …)', skala:'jn', ph:'z. B. PEG, Sondenkost nach Plan; Kolostoma, versorgt sich selbst',
            satz:{ ja:'Es bestehen besondere Versorgungen wie Stoma, Sonde oder Port.', nein:'Besondere Versorgungen wie Stoma, Sonde oder Port bestehen nicht.', unklar:'Bestehende besondere Versorgungen sind mit der Arztpraxis abzugleichen.' } },
          { k:'katheter', l:'liegender Blasenkatheter', skala:'kath', ph:'z. B. zieht nachts am Katheter, Beinbeutel tags / Bettbeutel nachts',
            satz:{ nein:'Ein Blasenkatheter liegt nicht.', tuk:'Es liegt ein transurethraler Dauerkatheter', spk:'Es liegt ein suprapubischer Blasenkatheter' },
            details:{ bei:['tuk','spk'], felder:[
              { k:'groesse', l:'Größe', ph:'z. B. 14', t:'Ch {v}' },
              { k:'seit', l:'liegt seit', ph:'z. B. 03/2026, Klinik', t:'seit {v}' },
              { k:'wechsel', l:'Wechsel', ph:'z. B. alle 6 Wochen, zuletzt 14.10.', t:'Wechsel {v}' },
              { k:'grund', l:'Indikation', ph:'z. B. Harnverhalt bei Prostatahyperplasie', t:'Indikation: {v}' }
            ] } },
          { k:'allergien', l:'Allergien / Unverträglichkeiten', skala:'jn', ph:'z. B. Penicillin, Pflasterallergie',
            satz:{ ja:'Allergien bzw. Unverträglichkeiten sind bekannt.', nein:'Allergien oder Unverträglichkeiten sind nicht bekannt.', unklar:'Allergien und Unverträglichkeiten sind noch zu erfragen.' } },
          { k:'kooperation', l:'Mitwirkung bei Behandlung und Pflege', skala:'f', ph:'z. B. wirkt bei der Wundversorgung mit, lehnt Insulin zeitweise ab',
            satz:{ ja:'{N} wirkt bei Behandlung und Pflege mit.', teils:'{N} wirkt bei Behandlung und Pflege nur teilweise mit.', nein:'{N} lehnt Behandlung und Pflege häufig ab; daraus ergibt sich Handlungsbedarf.' } },
          { k:'gvp', l:'gesundheitliche Versorgungsplanung (GVP)', skala:'jn', ph:'z. B. Gespräch geführt am … – Bogen in der Dateiablage',
            satz:{ ja:'Eine gesundheitliche Versorgungsplanung wurde durchgeführt und ist auf gesondertem GVP-Bogen dokumentiert (siehe Dateiablage).', nein:'Eine gesundheitliche Versorgungsplanung liegt bisher nicht vor.', unklar:'Ob eine gesundheitliche Versorgungsplanung vorliegt, ist zu klären.' } }
        ] },
      { k:'symptome', name:'Symptome', aspekte:[
          { k:'schmerz', l:'Schmerzen', skala:'jn', ph:'z. B. Knie rechts bei Belastung, NRS 4, abends stärker',
            satz:{ ja:'{N} hat Schmerzen.', nein:'{N} äußert keine Schmerzen und zeigt keine Schmerzzeichen.', unklar:'Ob Schmerzen vorliegen, ist noch nicht sicher einzuschätzen.' } },
          { k:'haut', l:'Hautveränderungen (Rötung, Trockenheit, Ekzem …)', skala:'jn', ph:'z. B. Rötung am Steiß, Fingertest negativ; trockene Unterschenkel',
            satz:{ ja:'Es bestehen Hautveränderungen.', nein:'Hautveränderungen bestehen nicht.', unklar:'Der Hautzustand ist noch vollständig zu inspizieren.' } },
          { k:'wunden', l:'bestehende Wunden', skala:'jn', ph:'z. B. Schmerz beim Verbandwechsel, Wunddokumentation angelegt',
            satz:{ ja:'Es bestehen Wunden.', nein:'Wunden bestehen nicht.', unklar:'Ob Wunden bestehen, ist bei der Hautinspektion zu klären.' },
            details:{ bei:['ja'], mehrfach:true, einheit:'Wunde', satz:'Wunde{i}: {F}', felder:[
              { k:'art', l:'Art', ph:'z. B. Dekubitus Kategorie 2, Ulcus cruris venosum, OP-Wunde', t:'{v}' },
              { k:'lok', l:'Lokalisation', ph:'z. B. Steiß, Ferse links', t:'{v}' },
              { k:'groesse', l:'Größe / Zustand', ph:'z. B. 3 × 2 cm, Wundgrund belegt, nässend', t:'{v}' },
              { k:'seit', l:'besteht seit', ph:'z. B. 09/2026, Klinikaufenthalt', t:'seit {v}' },
              { k:'versorgung', l:'Versorgung', ph:'z. B. Hydrokolloid, Wechsel Mo/Do, ärztlich angeordnet', t:'Versorgung: {v}' }
            ] } },
          { k:'atmung', l:'Einschränkung der Atmung', skala:'jn', ph:'z. B. Luftnot beim Treppensteigen, Sauerstoff nachts',
            satz:{ ja:'Die Atmung ist beeinträchtigt.', nein:'Die Atmung ist unauffällig.', unklar:'Die Atmung ist noch gezielt zu beobachten.' } },
          { k:'schlucken', l:'Hinweise auf Schluckstörung', skala:'jn', ph:'z. B. hustet beim Trinken, feuchte Stimme nach dem Essen',
            satz:{ ja:'Es bestehen Hinweise auf eine Schluckstörung.', nein:'Das Schlucken ist unauffällig.', unklar:'Das Schlucken ist noch gezielt zu beobachten.' } },
          { k:'pneumonie', l:'Pneumonierisiko', skala:'jn', ph:'z. B. flache Atmung bei Bettlägerigkeit – ggf. Matrix „Sonstiges“',
            satz:{ ja:'Es besteht ein erhöhtes Pneumonierisiko.', nein:'Ein erhöhtes Pneumonierisiko besteht derzeit nicht.', unklar:'Das Pneumonierisiko ist differenziert einzuschätzen.' } }
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
            satz:{ selbst:'{N} trinkt selbstständig und ausreichend.', anleitung:'{N} trinkt nur nach Erinnerung ausreichend.', unterstuetzung:'{N} braucht beim Trinken Unterstützung.', uebernahme:'Getränke werden vollständig angereicht.' } },
          { k:'gewicht', l:'Gewichtsschwankungen in der Vergangenheit', skala:'jn', ph:'z. B. 4 kg Abnahme seit dem Klinikaufenthalt – Abgleich Matrix Ernährung',
            satz:{ ja:'In der Vergangenheit bestanden relevante Gewichtsschwankungen.', nein:'Das Gewicht war zuletzt stabil.', unklar:'Der Gewichtsverlauf ist noch zu erheben.' } },
          { k:'dehydratation', l:'Dehydratationsrisiko', skala:'jn', ph:'z. B. trinkt ohne Erinnerung zu wenig, Diuretika',
            satz:{ ja:'Es besteht ein erhöhtes Dehydratationsrisiko.', nein:'Ein erhöhtes Dehydratationsrisiko besteht derzeit nicht.', unklar:'Das Dehydratationsrisiko ist differenziert einzuschätzen.' } }
        ] },
      { k:'ausscheidung', name:'Ausscheidung', aspekte:[
          { k:'toilette', l:'Toilettengang', skala:'s', ph:'z. B. nachts Toilettenstuhl neben dem Bett',
            satz:{ selbst:'{N} geht selbstständig zur Toilette.', anleitung:'{N} geht nach Erinnerung bzw. mit Begleitung auf dem Weg zur Toilette.', unterstuetzung:'{N} braucht beim Toilettengang Unterstützung.', uebernahme:'Die Ausscheidung wird vollständig über Inkontinenzmaterial versorgt.' } },
          { k:'harn', l:'Harnkontinenz', skala:'f', ph:'z. B. Dranginkontinenz, nachts Vorlage – Kontinenzprofil ergänzen',
            satz:{ ja:'{N} ist harnkontinent.', teils:'{N} ist zeitweise harninkontinent.', nein:'{N} ist harninkontinent.' } },
          { k:'stuhl', l:'Stuhlkontinenz', skala:'f', ph:'z. B. bei Durchfall nicht kontinent, sonst unauffällig',
            satz:{ ja:'{N} ist stuhlkontinent.', teils:'{N} ist zeitweise stuhlinkontinent.', nein:'{N} ist stuhlinkontinent.' } }
        ] },
      { k:'besonderes', name:'Gewohnheiten & Nacht', aspekte:[
          { k:'kultur', l:'kulturelle / religiöse Besonderheiten', skala:'jn', ph:'z. B. isst kein Schweinefleisch, Pflege möglichst durch Frauen',
            satz:{ ja:'Bei Pflege und Ernährung sind kulturelle bzw. religiöse Besonderheiten zu beachten.', nein:'Kulturelle oder religiöse Besonderheiten für die Selbstversorgung wurden nicht benannt.', unklar:'Kulturelle und religiöse Besonderheiten sind noch zu erfragen.' } },
          { k:'schlaf', l:'Schlaf & nächtlicher Versorgungsbedarf', skala:'jn', ph:'z. B. schläft erst nach Mitternacht, nachts zweimal Toilettengang mit Hilfe',
            satz:{ ja:'Es besteht ein besonderer nächtlicher Versorgungsbedarf bzw. der Schlaf ist beeinträchtigt.', nein:'Der Schlaf ist unauffällig; nachts besteht kein besonderer Versorgungsbedarf.', unklar:'Schlaf und nächtlicher Versorgungsbedarf sind noch zu beobachten.' } }
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
        ] },
      { k:'sinn', name:'Biografie & Glaube', aspekte:[
          { k:'glaube', l:'Glaube / Konfession bedeutsam', skala:'jn', ph:'z. B. katholisch, Gottesdienst und Rosenkranz wichtig',
            satz:{ ja:'Glaube und Konfession sind für {Na} bedeutsam.', nein:'Glaube und Konfession spielen für {Na} nach eigener Aussage keine große Rolle.', unklar:'Welche Bedeutung Glaube und Konfession haben, ist noch zu erfragen.' } },
          { k:'biografie', l:'biografische Aspekte mit Pflegebezug', skala:'jn', ph:'z. B. Landwirtin, früh aufstehen gewohnt',
            satz:{ ja:'Biografische Aspekte prägen den Alltag und sind in der Pflege zu berücksichtigen.', nein:'Besondere biografische Aspekte mit Pflegebezug wurden bisher nicht benannt.', unklar:'Biografische Aspekte sind noch zu erheben.' } }
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
        ] },
      { k:'organisation', name:'Organisation & Ausstattung', aspekte:[
          { k:'gestaltung', l:'eigene Möbel / Zimmergestaltung', skala:'jn', ph:'z. B. eigener Sessel und Fotowand, wünscht Bett am Fenster',
            satz:{ ja:'Das Zimmer ist mit eigenen Möbeln bzw. nach eigenen Wünschen gestaltet.', nein:'Wünsche zur Zimmergestaltung wurden bisher nicht geäußert.', unklar:'Wünsche zur Zimmergestaltung sind noch zu erfragen.' } },
          { k:'waesche', l:'Wäscheversorgung geklärt', skala:'jn', ph:'z. B. über die Wäscherei; Wollsachen wäscht die Tochter',
            satz:{ ja:'Die Wäscheversorgung ist geregelt.', nein:'Die Wäscheversorgung ist noch nicht geregelt.', unklar:'Die Wäscheversorgung ist noch zu klären.' } },
          { k:'pflegeartikel', l:'Besorgung der Pflegeartikel geklärt', skala:'jn', ph:'z. B. Angehörige bringen Duschgel und Creme mit',
            satz:{ ja:'Die Besorgung der Pflegeartikel ist geregelt.', nein:'Die Besorgung der Pflegeartikel ist noch nicht geregelt.', unklar:'Die Besorgung der Pflegeartikel ist noch zu klären.' } },
          { k:'hilfen', l:'Orientierungshilfen im Einsatz', skala:'jn', ph:'z. B. Foto an der Zimmertür, großer Kalender, Uhr mit Datum',
            satz:{ ja:'Orientierungshilfen wie Türschild, Kalender oder Bilder sind im Einsatz.', nein:'Orientierungshilfen sind bisher nicht im Einsatz.', unklar:'Der Bedarf an Orientierungshilfen ist noch zu prüfen.' } }
        ] }
    ] }
  }
};
