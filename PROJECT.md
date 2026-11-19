# PROJECT.md — Mani uzdevumi (PD1 + PD2)

## Mērķis
Latviešu valodas uzdevumu saraksts pārlūkā, bez servera vai ārējām bibliotēkām. PD2 papildina PD1 ar uzdevuma termiņu, statistiku, kārtošanu A–Z un visu izpildīto uzdevumu dzēšanu.

## Faili
- `index.html` — lapa, formas, pogas un statistikas paneļa struktūra.
- `style.css` — skats, nokavēto uzdevumu sarkanais fons, progresa josla.
- `app.js` — dati, notikumi un DOM atjaunināšana.
- `PROJECT.md` — lietotnes īsais konteksts turpmākām MI sarunām.
- `skice.jpg` — **digitāla** statistikas paneļa skice, atveidota pēc PD2 video (nav paša studenta ar roku fotografēts zīmējums).
- `uzvednes.md` — PD1 un PD2 uzvedņu šabloni, labošanas piemēri.
- `README.md` — palaišana, testu pārskats, Git instrukcija.

## Dati
- `localStorage` atslēga: `pd1-uzdevumi` — **nemainīt**, lai saglabātos PD1 lietotāja dati.
- PD1 objekts: `{ id: number, text: string, done: boolean }`.
- PD2 objekts: `{ id: number, text: string, done: boolean, due: string | null }`.
- `due`: `YYYY-MM-DD`, vai `null`; PD1 vecajiem ierakstiem `due` nav obligāts.
- ID: `Date.now()`, dublikātu gadījumā palielina par 1.
- Nokavēts: `!task.done && due < todayISO()` vietējā kalendāra dienā.
- Datuma attēlojums: `DD.MM.GGGG`. Progress: `0`, ja nav ierakstu, citādi `Math.round(100 * done / total)`.

## Funkcijas `app.js` (katra vienā rindā, pārbaudītas pret kodu)
- `isValidDue` — validē ISO datumu.
- `loadTasks` — nolasa uzdevumus un pielāgo vecos PD1 ierakstus.
- `saveTasks` — saglabā uzdevumus.
- `newTaskId` — izveido unikālu skaitlisku ID.
- `todayISO` — šodienas vietējais datums.
- `isOverdue` — nosaka neizpildītu, nokavētu uzdevumu.
- `formatDue` — attēlo termiņu DD.MM.GGGG.
- `addTask` — pievieno uzdevumu un izvēles termiņu.
- `toggleTask` — maina izpildes statusu.
- `deleteTask` — dzēš vienu uzdevumu.
- `startEdit` — sāk teksta rediģēšanu ar dubultklikšķi.
- `finishEdit` — saglabā vai atceļ rediģēšanu (aizsargā pret atkārtotu `blur`).
- `getVisibleTasks` — atlasa filtrā redzamos uzdevumus.
- `createDueBadge` — veido termiņa vai nokavēšanas atzīmi.
- `createTaskRow` — izveido uzdevuma DOM rindu.
- `createTaskContent` — izveido teksta un termiņa saturu.
- `renderStats` — atjauno trīs rādītājus un progresa joslu.
- `renderTasks` — atjauno sarakstu, skaitītāju un statistiku.
- `sortTasks` — kārto `text.localeCompare(..., 'lv')` un saglabā.
- `clearDone` — dzēš izpildītos un saglabā izmaiņas.

## Konvencijas un elementu ID
- Bez servera, bibliotēkām un API atslēgām; `textContent`, ne `innerHTML`, lietotāja tekstam.
- ID: `task-input`, `due-input`, `add-btn`, `task-list`, `counter`, `sortBtn`, `clearDoneBtn`, `progressBar`.
- Saglabājot datu izmaiņas, jāizsauc `saveTasks()` un `renderTasks()`.
- Filtri: `all | active | completed`; A–Z kārto visu masīvu (ne tikai filtra skatu).
- Šī ir **reālā projekta koda** funkciju uzskaite (20 funkcijas); video demonstrācijā minētais PD1 funkciju skaits 13 attiecas uz citu pirmkodu.

## Git un modeļu salīdzinājuma robežas
- Zari: `main`, `kartosana-claude`, `kartosana-chatgpt`.
- Koda varianti izveidoti **ChatGPT vidē**, demonstrējot pareizu latviešu kārtošanu un kļūdainu/izlabotu alternatīvu. Atsevišķa Claude modeļa ģenerēšana un salīdzināšana **nav veikta**.
- `main` satur pareizo A–Z variantu, `clearDone` un rediģēšanas kļūdas labojumu.
