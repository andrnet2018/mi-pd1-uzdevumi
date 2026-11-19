# Uzdevuma apraksts

**Rīks un modelis:** ChatGPT (GPT-6).
**Avots:** PD1 mācību video (pilnais MP4 un transkripcija, 19.11.2026).
**Piezīme:** Šis dokuments apkopo uzdevuma formulējumus un darba gaitā izmantotos pieprasījumus. Pēc video pārskates tehniskie nosaukumi tika precizēti.

## 1. Sākotnējais uzdevums MI (sešas daļas)

**Loma:** Tu esi pieredzējis tīmekļa lietotņu izstrādātājs.

**Mērķis:** Izveido uzdevumu saraksta lietotni **Mani uzdevumi**.

**Tehnoloģijas:** Tīrs HTML, CSS un JavaScript. Tikai `index.html`, `style.css`, `app.js`; bez bibliotēkām, servera un interneta.

**Funkcijas:**
1. Pievieno uzdevumu ar pogu **Pievienot** vai Enter; pēc pievienošanas notīra lauku.
2. Nogriez atstarpes ar `trim()`; tukšs/atstarpju teksts nav pieņemams.
3. Atzīmē izpildītu vai atcel izpildi ar izvēles rūtiņu; izpildītu tekstu izsvītro.
4. Dzēs tikai izvēlēto uzdevumu.
5. Filtri **Visi**, **Aktīvie**, **Izpildītie**; aktīvā poga vizuāli izcelta.
6. Skaitītājs `Atlikuši N uzdevumi`, atjaunināts pēc katras izmaiņas.
7. Saglabā masīvu kā JSON `localStorage` ar atslēgu **`pd1-uzdevumi`**.

**Precīzie elementi un dati:**
- `h1` teksts **Mani uzdevumi**;
- teksta ievades ID `task-input`, vietturis **Jauns uzdevums...**;
- pogas ID `add-btn`;
- saraksta `<ul>` ID `task-list`;
- skaitītāja `<span>` ID `counter`;
- filtru pogu atribūts `data-filter`;
- masīvs ar objektiem `{ id, text, done }`;
- `id`: unikāls skaitlis no `Date.now()` ar pārbaudi pret dublikātiem.

**Ierobežojumi:** Saskarne un komentāri latviešu valodā; lietotāja teksts tiek attēlots ar `textContent`; neviena funkcija nav garāka par 30 rindām; Chrome un Firefox konsolē nav sarkanu kļūdu.

**Izvades formāts:** Trīs atsevišķi koda bloki ar failu nosaukumiem; pēc tam īsa palaišanas instrukcija. Ja prasības nav skaidras, pirms koda pajautā.

## 2. Kļūdas labošanas uzvedne

**Darbības:** Pievienoju trīs atstarpes un nospiežu **Pievienot**.
**Gaidītais:** Uzdevums netiek pievienots.
**Faktiskais sākotnējā variantā:** Parādās tukša rinda un skaitītājs palielinās.
**Konsoles kļūda:** Nav.
**Pieprasījums MI:** Izlabo tikai `addTask()`; lieto `trim()` pirms pārbaudes; izskaidro kļūdas cēloni vienā teikumā. Neskart pārējās funkcijas.

## 3. Papildfunkcijas A uzvedne

Pievieno uzdevuma teksta rediģēšanu ar dubultklikšķi. Vispirms parādi plānu. Pēc tam ievies `startEdit` un `finishEdit`: Enter saglabā apgrieztu netukšu tekstu, Escape atceļ. Jāsaglabā `localStorage`; jāstrādā pamatfunkcijām.

## 4. Labošana pēc paša MP4 noskatīšanās

Salīdzini gatavo projektu ar video ekrānā redzamo uzvedni. Izlabo precīzos elementu ID, `localStorage` atslēgu, objekta lauku `done` un ID veidošanu. Sadalī funkcijas tā, lai neviena nepārsniegtu 30 rindas. Saglabā iepriekšējo Git vēsturi un atkārto pamatpārbaudes.

## Pieņemšanas pārbaudes (T2)

1. Pievienošana ar pogu; lauks iztukšojas.
2. Pievienošana ar Enter.
3. Tukšs un tikai atstarpju teksts netiek pievienots.
4. Latviešu diakritiskās zīmes parādās pareizi.
5. `<b>teksts</b>` tiek parādīts kā teksts, nevis HTML.
6. Izpildes atzīmēšana izsvītro un samazina skaitītāju.
7. Dzēšana noņem tikai izvēlēto.
8. Filtri rāda atbilstošos, un poga ir izcelta.
9. Pēc F5 dati un atzīmes saglabājas.
10. Console nav JavaScript kļūdu.

**Svarīgi:** Šis ir pēc video pārskatīšanas precizēts darba formulējums. Tas neaizstāj pasniedzēja oriģinālo uzdevuma 3. nodaļu vai oriģinālo darba lapu.
