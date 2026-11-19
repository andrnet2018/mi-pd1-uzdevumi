# Mani uzdevumi — PD1

**PD1 — Pirmā strādājošā lietotne ar MI.** Neliela uzdevumu saraksta lietotne latviešu valodā, kas darbojas tieši pārlūkā, bez servera, instalēšanas vai interneta.

## Palaišana

1. Lejupielādē projekta failus vienā mapē.
2. **Veic dubultklikšķi uz `index.html`** (Chrome, Edge vai Firefox).
3. Pievieno un pārvaldi uzdevumus. Lai apskatītu konsoli, nospied **F12 → Console**.
4. Pārbaudi saglabāšanu: izveido trīs uzdevumus, vienu atzīmē izpildītu un pārlādē ar **F5**.

Nav nepieciešams Live Server, Python serveris, `npm install` vai ārēji JavaScript pakotņu avoti.

## Funkcijas

- Uzdevuma pievienošana ar pogu **Pievienot** vai **Enter**; `trim()` ignorē tukšas ievades un noņem liekās atstarpes sākumā un beigās.
- Atzīmēšana kā izpildīts, atzīmes noņemšana un atsevišķa uzdevuma dzēšana.
- Filtri **Visi / Aktīvie / Izpildītie** ar aktīvās pogas vizuālu izcēlumu.
- Atlikušo neizpildīto uzdevumu skaits.
- Datu glabāšana tikai lokāli pārlūka `localStorage` ar atslēgu `mi-pd1-tasks-v1`.
- **Papildfunkcija A — rediģēšana:** dubultklikšķis uz uzdevuma teksta, **Enter** saglabā, **Escape** atceļ; klikšķis ārpus ievades atceļ.
- Poga **Notīrīt visu** saraksta atiestatīšanai.
- Droša HTML ievade: lietotāja teksts tiek attēlots ar `textContent`, nevis izpildīts kā HTML.

## Projekta struktūra — pieci faili

| Fails | Saturs |
|---|---|
| `index.html` | Lietotnes HTML struktūra |
| `style.css` | Noformējums un pielāgošanās šauriem ekrāniem |
| `app.js` | Funkcijas, filtrēšana, rediģēšana, saglabāšana |
| `uzvednes.md` | MI dotais uzdevums un pieņemšanas kritēriji |
| `README.md` | Šī dokumentācija |

Datu masīva objekta forma: `{ id: string, text: string, completed: boolean }`.

Elementu ID: `taskInput`, `addBtn`, `taskList`, `remainingCount`, `clearAllBtn`. Filtru pogām `data-filter="all|active|completed"`.

## MI izmantošana un izstrādes posmi

**Rīks:** ChatGPT, **modelis:** GPT-6. Sākotnējā uzvedne ir failā `uzvednes.md`, balstīta video transkripcijā.

Git vēsturē saglabāti seši posmi:

1. Projekta izveide.
2. Sākotnējā lietotnes versija.
3. Sākotnējās pārbaudes un defekta fiksēšana: 9 PASS, 1 FAIL.
4. `Labots`: tukšu/atstarpju ievades kļūdas novēršana (`trim()`).
5. Rediģēšana ar Enter / Escape.
6. Dokumentācija (šis posms).

## Pārbaudes

Video aprakstītas desmit pamatpārbaudes. Sākotnējā versijā 3. pārbaude neizdevās: trīs atstarpes izveidoja tukšu uzdevumu. Pēc `addTask()` labošanas automatizētā pārbaude dod **10/10 PASS**; papildfunkcijas scenārijs arī **PASS**.

**Pārbaudes metodes ierobežojums:** automātiskajā vidē Chromium pārlūka navigācija uz `file://` un `localhost` tika bloķēta. Tāpēc lietotnes HTML, CSS un JavaScript pārbaudīts reālā Chromium DOM ar `localStorage` aizstājēju, nevis tieši atverot `index.html` no diska. Saglabāšanās pārbaude simulē dokumenta pārlādi. Pirms iesniegšanas nepieciešama manuāla pārbaude savā pārlūkā, īpaši **F5** un **F12 → Console**. Visi faili izmanto relatīvas atsauces, nav tīkla pieprasījumu un nav servera atkarību.

Detalizētie rezultāti un T1–T4 tabulu **neoriģināls darba lapas projekts** ir atsevišķā PDF, kas paredzēts precizēšanai pēc pedagoga darba lapas.

## Publicēšana GitHub

Ja projekts iegūts arhīvā **ar `.git` mapi**, komitu vēsture jau ir saglabāta. GitHub izveido **tukšu** repozitoriju ar nosaukumu `mi-pd1-uzdevumi` (*neatzīmē* “Add README”, jo šis projekts jau satur README un Git vēsturi). PowerShell:

```powershell
cd "$env:USERPROFILE\Documents\GitHub\mi-pd1-uzdevumi"
git log --oneline
git remote add origin https://github.com/TAVS-LIETOTAJS/mi-pd1-uzdevumi.git
git push -u origin main
```

Aizvieto `TAVS-LIETOTAJS` ar savu GitHub lietotājvārdu. Ja remote `origin` jau eksistē, tā vietā izmanto `git remote set-url origin ...`.

**Piezīme par komitu autoru:** piemēra vēsture sagatavota ar tehnisku autoru `PD1 kursa paraugs <pd1-paraugs@example.invalid>`, nevis tavu GitHub identitāti. Ja iesniegšanas prasības paredz personīgu komitu autorību, tā pirms publicēšanas jāpielāgo. Jauniem komitiem iestati savu `git config user.name` un `git config user.email`.

## Avots un robežas

Uzdevums veidots pēc video “PD1 Pirmā strādājošā lietotne ar MI — demonstrācija soli pa solim” transkripcijas, https://www.youtube.com/watch?v=k70oa9Ivii0 (saņemta 2026-11-19). Oriģinālā uzdevuma **3. nodaļa** un pedagoga **T1–T4 darba lapa ar trim refleksijas jautājumiem** netika pievienota; to precīzs formulējums un prasītie ID vēl jāsalīdzina ar oriģinālu.
