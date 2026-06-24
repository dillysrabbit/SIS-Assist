# SIS Assist – Login & Bewohner-Verwaltung (Appwrite)

Login (Appwrite Auth) + Bewohner-Verwaltung (Appwrite Databases). Der API-Key für
die KI bleibt davon unberührt im Vercel-Proxy.

## Verwendete Appwrite-Konfiguration

In `index.html` (Konstante `APPWRITE`):

| Wert | Inhalt |
|------|--------|
| endpoint | `https://fra.cloud.appwrite.io/v1` (Frankfurt / EU) |
| projectId | `6a3bfb59000cc80cbacd` |
| databaseId | `6a3bfe100031c0e248d8` |
| collectionId | `bewohnerin` |

Diese Werte sind **nicht geheim** (reine Client-Config). Die Absicherung erfolgt über
die Web-Plattform (CORS) und die Collection-Permissions.

## Voraussetzungen in der Appwrite-Console

1. **Web-Plattform(en)** (Project → Platforms → Add platform → Web), Hostnamen:
   - `sis-assist.vercel.app` (Produktion)
   - `*.vercel.app` (Vercel-**Preview**-Deployments / PRs — sonst schlägt der Login in der Preview per CORS fehl)
   - `localhost` (lokal)
2. **Auth:** E-Mail/Passwort aktiv; eigenes Konto unter *Auth → Users* angelegt
   (keine offene Registrierung in der App).
3. **Collection `bewohnerin`** mit:
   - Attribut `name` — String, Größe 255, *required*
   - Attribut `data` — String, Größe ≥ 100000, *optional* (enthält das gesamte
     Formular als JSON)
   - **Document Security: an**
   - **Permission:** Rolle *Users* → *Create*
   - Lese-/Schreib-/Löschrechte pro Dokument setzt die App automatisch auf das
     eingeloggte Konto (nur du siehst deine Bewohner:innen).

## Verhalten

- Nicht eingeloggt → Login-Overlay.
- Eingeloggt → Bewohner-Leiste mit Auswahl + *Neu / Speichern / Löschen*; das
  Formular ist der Editor der gewählten Person; Auto-Save (debounced) auf den
  aktiven Datensatz; der Anzeigename in der Liste = Feld „Name der
  pflegebedürftigen Person".
- Abmelden über den Button oben rechts.
- System-Prompt liegt weiterhin pro Browser im localStorage.

## Offener Punkt (optionaler Schritt 2)

Der `/api/generate`-Proxy ist weiterhin öffentlich. Er lässt sich auf eingeloggte
Nutzer beschränken, indem das Appwrite-JWT (`account.createJWT()`) mitgeschickt und
serverseitig gegen Appwrite geprüft wird.
