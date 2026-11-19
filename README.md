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
- Datu glabāšana tikai lokāli pārlūka `localStorage` ar atslēgu `pd1-uzdevumi`.
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

Datu masīva objekta forma: `{ id: number, text: string, done: boolean }`. Identifikators tiek veidots ar `Date.now()` un dublikātu pārbaudi.

Elementu ID: `task-input`, `add-btn`, `task-list`, `counter`, `clearAllBtn`. Filtru pogām `data-filter="all|active|completed"`.

## MI izmantošana un izstrādes posmi

**Rīks:** ChatGPT, **modelis:** GPT-6. Sākotnējā un turpmākās darba uzvednes/apraksti ir failā `uzvednes.md`; tie ir fiksēti pēc darba gaitas un MP4 demonstrācijas, nevis uzdoti pedagoga oriģinālā teksta atstāsti.

Git vēsturē saglabāti sākotnējie seši posmi un atsevišķs labojumu komits pēc MP4 demonstrācijas salīdzinājuma:

1. Projekta izveide.
2. Sākotnējā lietotnes versija.
3. Sākotnējās pārbaudes un defekta fiksēšana: 9 PASS, 1 FAIL.
4. `Labots`: tukšu/atstarpju ievades kļūdas novēršana (`trim()`).
5. Rediģēšana ar Enter / Escape.
6. Sākotnējā dokumentācija.
7. Pēc video apskates: ID, glabāšanas atslēga, datu lauks `done`, unikāls ID un dokumentācija.

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

Uzdevums veidots pēc video “PD1 Pirmā strādājošā lietotne ar MI — demonstrācija soli pa solim” transkripcijas, https://www.youtube.com/watch?v=k70oa9Ivii0 (saņemta 2026-11-19). Pilnais MP4 (6:39) vēlāk tika pārskatīts. Redzamajā uzvednē 1:20–1:30 ir precīzi elementu ID, atslēga, datu struktūra, ID un funkciju apjoma ierobežojums; projekts tam pielāgots. Oriģinālā 3. nodaļa un pati pedagoga T1–T4 veidlapa joprojām nav pievienota. Video attēlā redzamā darba lapas forma ir tikai orientieris.

## Precizējumi pēc video apskates (19.11.2026)

- No MP4 apstiprināti precīzi ID: `task-input`, `add-btn`, `task-list`, `counter`.
- Glabāšanas atslēga ir `pd1-uzdevumi`, uzdevuma statuss ir `done`, bet `id` ir skaitlis ar dublikātu pārbaudi.
- Visas deklarētās JavaScript funkcijas ir īsākas par 30 koda rindām.
- Uzdevumu notīrīšanas poga izdzēš arī `pd1-uzdevumi` atslēgu.
- Vizuālais noformējums atšķiras no pedagoga demonstrācijas, taču lietotnes obligātās funkcijas ir tās pašas.
