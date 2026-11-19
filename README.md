# Mani uzdevumi — PD1 + PD2

**PD2 — Lietotnes paplašināšana ar MI.** Turpina PD1 projektu, nemainot tā glabāšanas atslēgu. Lietotne ir statiska: HTML, CSS un JavaScript, bez servera un ārējām pakotnēm.

## Kā atvērt

Atver `index.html` pārlūkā (Chrome/Edge/Firefox), vai pēc publicēšanas GitHub Pages. Lai testētu ar saviem datiem, iepriekšējie PD1 uzdevumi glabājas `localStorage` atslēgā `pd1-uzdevumi`. **Nepārbaudi dzēšanas pogas ar vienīgajiem svarīgajiem datiem bez rezerves kopijas.**

## Jaunās PD2 funkcijas

1. **Termiņš:** datuma ievade pēc izvēles; uzdevumu rindās termiņš redzams `DD.MM.GGGG`. Neizpildīts uzdevums ar pagājušu termiņu tiek izcelts sarkani un apzīmēts „Nokavēts”. Izpildītajiem uzdevumiem brīdinājums pazūd. Veci PD1 ieraksti bez `due` tiek atbalstīti.
2. **Statistika:** Kopā, Izpildīti, Nokavēti, kā arī izpildes progresa josla procentos. Tukšam sarakstam 0%, nekad `NaN`.
3. **Kārtot A–Z:** funkcija `sortTasks()` izmanto `localeCompare` ar `lv`; kārto sarakstu un saglabā kārtību. Piemērs: `Ābols, Cukurs, Čipsi, Siers, Šķiņķis, Zemene`.
4. **Dzēst izpildītos:** funkcija `clearDone()` saglabā tikai aktīvos, atjauno skaitītāju un statistiku, izmaiņas saglabājas pēc pārlādes.

PD1 uzdevuma pievienošana, dzēšana, filtrēšana, rediģēšana ar Enter/Escape un `Notīrīt visu` ir saglabāta. Rediģēšanas dubultā `blur` pārzīmēšana papildus izlabota.

## Faili

| Fails | Saturs |
| --- | --- |
| `index.html` | Forma, termiņš, statistikas panelis, vadības pogas |
| `style.css` | Noformējums un nokavējuma stāvoklis |
| `app.js` | Datu glabāšana, UI un visas PD1/PD2 funkcijas |
| `PROJECT.md` | Precīza projekta konteksta specifikācija un 20 funkciju saraksts |
| `skice.jpg` | Digitāla skice no PD2 video parauga, ne fotografēta personīga skice |
| `uzvednes.md` | PD1 uzvednes, 3 PD2 uzvedņu šabloni, A–Z salīdzinājuma uzvedne |
| `README.md` | Šis apraksts |

Datu struktūra: `{ id: number, text: string, done: boolean, due?: string | null }`. Formāts `YYYY-MM-DD` glabāšanai, `DD.MM.GGGG` attēlošanai.

## Automātiskie testi

**21/21 PASS** Chromium pārlūka DOM vidē: tukšs saraksts un `NaN`, vecs PD1 uzdevums, uzdevumi bez/ ar termiņu, nokavējuma stāvoklis, izpildīts nokavējums, statistikas procenti, dzēšanas pārrēķins, latviešu A–Z un saglabāšanās, `clearDone` pēc pārlādes, rediģēšana Enter/Escape, filtri, tukša ievade, HTML teksta drošība, ID dublikāta novēršana un bez nekontrolētām JS kļūdām.

**Testēšanas ierobežojums:** šajā izolētajā vidē tieša lokālā `file://`/HTTP adrešu atvēršana ir bloķēta. Tāpēc testēts faktiskais JS reālā Chromium DOM ar `localStorage` aizstājēju un simulētu pārlādi. **Pirms nodošanas** pārbaudi savā Chrome pārlūkā `F5`, `F12 → Console` un `Application → Local Storage`.

## Darba secība un Git zari

- `main` — pilnībā strādājošais variants ar PD2 papildinājumiem.
- `kartosana-claude` — korektas A–Z kārtošanas **demonstrācijas** zars.
- `kartosana-chatgpt` — kļūdains salīdzinājums pēc rakstzīmju kodiem un atsevišķs labojuma komits ar `localeCompare`.

**Būtiska godprātības piezīme:** šie abi koda varianti tika sagatavoti ChatGPT vidē, nevis neatkarīgi ģenerēti divos modeļos. Faktisku Claude vs ChatGPT eksperimentu neuzrādi kā pabeigtu, kamēr neesi palaidis to pašu uzvedni Claude un salīdzinājis atbildi.

## Droša ievietošana esošajā GitHub repozitorijā

Video paredz paplašināt **esošo** repozitoriju `andrnet2018/mi-pd1-uzdevumi`. Tāpēc nenomaini esošās lokālās `.git` mapes saturu. Pievienotajā `PD2_Git_vesture.bundle` ir sagatavotā Git vēsture un visi trīs zari; to vēlāk var importēt esošajā lokālajā klonā. Precīzās komandas sniegsim pēc tam, kad pārbaudīsi, vai lokālā `main` zarā nav nepublicētu izmaiņu.

Parastai koda apskatei var izmantot arī ZIP **bez `.git` mapes**. `PROJECT.md`, `skice.jpg` un PDF darba lapa nav jāievieto Moodle citādi, kā norāda pasniedzējs; video prasa PDF Moodle iesniegšanai, bet `PROJECT.md` un `skice.jpg` — GitHub repozitorijā.

## Avots

PD2 video „Lietotnes paplašināšana ar MI – konteksts, skice un Claude pret ChatGPT” un lietotāja pievienotā SRT transkripcija (2026-11-19). T1–T5 tabulas un video demonstrācijā minētie tokenu skaitļi raksturo demonstrāciju, ne garantēti mūsu avota failu precīzu tokenizāciju.
