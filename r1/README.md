# SIS® Assist — r1 Creation (BRAUN Design System)

SIS Assist als Creation für den rabbit r1: die komplette Strukturierte
Informationssammlung — Stammdaten, O-Ton, sechs Themenfelder, Risikomatrix
und KI-Maßnahmenplan — auf 240 × 282 px, bedienbar allein mit Scrollrad
und Taste.

Gestaltet nach dem **r1 Creations Design System v1.0** (Variante „Papier"):
warmes Grau `#E7E4DE`, Tinte `#1B1A17`, genau eine Akzentfarbe `#D75A1E`
für das jeweils aktive Element, Helvetica für Sprache, IBM Plex Mono für
Werte, 4-px-Raster, 16-px-Rand, Kopf 40 px, Aktion 48 px, Radius 2 px.

## Bedienung

| Eingabe | Wirkung |
|---|---|
| **Scrollrad** | Auswahl in Listen bewegen · Zelle in der Risikomatrix wählen · lange Texte lesen |
| **Taste (kurz)** | Öffnen / Bestätigen · Risikozelle weiterschalten (– → J → J! → N → N! → –) · Plan erstellen |
| **PTT halten** | Diktat in das geöffnete Eingabefeld (auf dem Gerät) |
| **Wortmarke „SIS® Assist" (Kopfzeile)** | Zurück |

Desktop-Vorschau: `▲/▼` = Rad, `Enter` = Taste, `Esc` = Zurück, Tippen mit
der Tastatur direkt ins geöffnete Feld.

## Screens

1. **Start** — oberste Zeile zeigt die aktive Bewohner:in (und die Anzahl
   im Verzeichnis), darunter alle Abschnitte mit Füllstand (○/●)
2. **Bewohner** — lokales Verzeichnis: *Neu anlegen* (öffnet direkt die
   Namenseingabe), Eintrag wählen → *Öffnen* macht ihn aktiv, *Löschen*
   fragt einmal nach („Wirklich löschen?"). ● markiert den aktiven Eintrag.
   Alle Daten bleiben auf dem Gerät — kein Abgleich mit der Web-App/Appwrite.
3. **Stammdaten** — Name, Geburtsdatum, Gesprächsdatum, Handzeichen
3. **Editor** — ein Feld pro Screen, Diktat oder Tastatur, blinkender Cursor
4. **Risikomatrix** — 6 Themenfelder × 6 Risiken (DK ST IK SZ ER SO),
   `!` = weitere Einschätzung notwendig (Ocker)
5. **Maßnahmenplan** — Zusammenfassung des Füllstands, Erstellen per Taste,
   Ergebnis als scrollbarer, kompakt gerenderter Plan

## Technik

- **Eine Datei:** `r1/index.html`, keine Build-Schritte, keine Abhängigkeiten
  außer dem IBM-Plex-Mono-Webfont (mit Monospace-Fallback).
- **KI:** primär der bestehende Vercel-Proxy
  `https://sis-assist.vercel.app/api/generate` (Claude, Key bleibt serverseitig;
  der Proxy sendet dafür CORS-Header). Schlägt das fehl und die Creation läuft
  auf dem r1, fällt sie auf das Geräte-LLM zurück
  (`PluginMessageHandler`, `useLLM: true`).
- **Speicherung:** `creationStorage.plain` auf dem r1 (Base64-JSON),
  sonst `localStorage`; Schlüssel `sis_r1_v2` (Verzeichnis mit mehreren
  Datensätzen + aktiver ID). Eine ältere Einzeldokumentation unter `sis_r1`
  wird beim ersten Start automatisch als erster Verzeichnis-Eintrag
  übernommen. Autosave bei jeder Änderung.
- **Hardware-Events:** `scrollUp` / `scrollDown` / `sideClick` /
  `longPressStart` / `longPressEnd`; zusätzlich Touch, Maus und Tastatur für
  die Vorschau im Browser.

## Auf den r1 bringen

1. Repo deployen (Vercel) — die Creation liegt dann unter
   `https://sis-assist.vercel.app/r1/`.
2. Auf dem r1 als Creation einbinden (rabbit hole → Creations) bzw. die URL
   im Creation-Webview öffnen.
