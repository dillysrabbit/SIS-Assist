# SIS-Assist

**Pflegeprozess-Werkzeug nach Strukturmodell** – eine Single-File-HTML-App
(`index.html`) für Pflegekräfte: SIS → Maßnahmenplan → Bericht (Abweichung)
→ Evaluation, mit geführten Eingaben und „Warum?“-Erklärungen zu jedem
Element. Daten liegen im Browser (localStorage), Export/Import als JSON.

- `index.html` – das Pflegeprozess-Werkzeug (keine Abhängigkeiten, offline lauffähig)
- `legacy.html` – die bisherige SIS-Formular-App mit Appwrite-Login und
  KI-Generierung (siehe `SETUP-APPWRITE.md`, `api/`)
- `r1/` – Rabbit-R1-Creation
