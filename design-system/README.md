# SIS Assist – Design System ("Modern & Friendly")

Komponenten-Bibliothek für das überarbeitete SIS-Assist-Design.
Indigo-Primärfarbe (`#6366f1`), Pink/Cyan-Akzente, Inter + Plus Jakarta Sans,
runde Kanten und weiche Gradienten.

## Inhalt

| Datei | Gruppe | Inhalt |
|-------|--------|--------|
| `foundations/colors.html` | Foundations | Farb-Tokens & Brand-Gradient |
| `foundations/typography.html` | Foundations | Schrift-Skala (Headings/Body) |
| `components/buttons.html` | Components | Primary / Secondary / Accent / Icon |
| `components/inputs.html` | Components | Formularfelder & Fokus-Zustand |
| `components/cards.html` | Components | Themenfeld-Cards & O-Ton-Sektion |
| `components/feedback.html` | Components | Status-Badges & Toasts |

Jede Datei ist eigenständig lauffähig (im Browser öffnen) und trägt in der
ersten Zeile einen `@dsCard`-Marker, aus dem die Design-System-Ansicht in
claude.ai/design ihre Karten baut.

## Nach claude.ai/design syncen

Der direkte Upload braucht einen interaktiven Login und funktioniert daher
**nicht** aus einer Claude-Code-Web-Session, sondern lokal:

1. Repo lokal auschecken (Branch mit diesem Design).
2. In Claude Code (Desktop/CLI) `/design-login` ausführen, falls noch nicht
   für Design-Systeme autorisiert.
3. `/design-sync` starten – die Komponenten werden inkrementell, eine nach
   der anderen, in dein Design-System-Projekt geschrieben.

Alternativ in claude.ai/design „Send to Claude Code Web" nutzen, um ein
Projekt in den Workspace zu seeden.
