# SIS-Assist

**Pflegeprozess-Werkzeug nach Strukturmodell** – eine Single-File-HTML-App
(`index.html`) für Pflegekräfte: SIS → Maßnahmenplan → Bericht (Abweichung)
→ Evaluation, mit geführten Eingaben und „Warum?“-Erklärungen zu jedem
Element. Daten liegen im Browser (localStorage), Export/Import als JSON;
SIS-Bogen und Maßnahmenplan lassen sich drucken bzw. über den
Browser-Druckdialog als PDF speichern („Drucken / PDF“, A4-Layout).

- `index.html` – das Pflegeprozess-Werkzeug (keine Abhängigkeiten, offline lauffähig)
- `themenfelder.js` – Aspekt-Katalog der sechs SIS-Themenfelder (Checkbox-Aspekte,
  Skalen und Satzschablonen; die App baut daraus den Fließtext pro Themenfeld). Von Hand pflegbar,
  Aufbau und Textbau-Regeln stehen im Dateikopf.
- `kompendium.js` – Maßnahmenkompendium als Datendatei (Formulierungshilfe im
  Maßnahmen-Editor; generiert aus dem Health-Angels-Kompendium, nicht von Hand pflegen)
- `legacy.html` – die bisherige SIS-Formular-App mit Appwrite-Login und
  KI-Generierung (siehe `SETUP-APPWRITE.md`, `api/`)
- `r1/` – Rabbit-R1-Creation
