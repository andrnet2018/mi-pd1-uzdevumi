# PROJECT.md — Mani uzdevumi

## Mērķis
PD1 lietotne latviešu valodā, kas darbojas pārlūkā bez servera un saglabā uzdevumus `localStorage`. PD2 turpina šo pašu lietotni: termiņš, statistika, A–Z kārtošana un izpildīto dzēšana.

## Faili
- `index.html` — semantiskais HTML un formu elementi.
- `style.css` — noformējums, mobilā pielāgošana un stāvokļu krāsas.
- `app.js` — datu operācijas, DOM atjaunināšana un notikumu apstrāde.
- `uzvednes.md` — uzvednes, kļūdu labošanas šabloni un uzdevumu vēsture.
- `README.md` — lietošanas, testēšanas un Git norādījumi.
- `PROJECT.md` — konteksts īsām MI sarunām.
- `skice.jpg` — PD2 statistikas paneļa digitāla skice.

## Dati un glabāšana
- Atslēga: `pd1-uzdevumi`.
- PD1 uzdevums: `{ id: number, text: string, done: boolean }`.
- PD2 pievieno izvēles lauku `due: "YYYY-MM-DD" | null`.
- Vecie uzdevumi bez `due` ir derīgi un attēlojami bez datuma.
- `Date.now()` veido skaitlisku ID, dublikāta gadījumā ID tiek palielināts.

## Esošās funkcijas PD1
- `loadTasks` — lasa un pārbauda uzdevumu masīvu.
- `saveTasks` — saglabā uzdevumus.
- `newTaskId` — piešķir unikālu ID.
- `addTask` — pievieno uzdevumu.
- `toggleTask` — maina izpildes statusu.
- `deleteTask` — dzēš uzdevumu.
- `startEdit` — sāk uzdevuma teksta rediģēšanu.
- `finishEdit` — saglabā vai atceļ labojumu.
- `getVisibleTasks` — piemēro statusa filtru.
- `createTaskRow` — izveido HTML uzdevuma rindu.
- `renderTasks` — atjauno sarakstu un skaitītāju.

## Konvencijas
- Bez ārējām JS/CSS bibliotēkām un servera.
- Lietotāja tekstu ievieto ar `textContent`, ne `innerHTML`.
- Izmantot DOM elementu ID `task-input`, `task-list`, `counter`, `add-btn`.
- Notikumu apstrāde skaidri atdalīta no funkciju definīcijām.
- Katram datu labojumam: `saveTasks()` un `renderTasks()`.
- Datumu salīdzina vietējā kalendāra dienā; nokavēts tikai neizpildīts uzdevums.
