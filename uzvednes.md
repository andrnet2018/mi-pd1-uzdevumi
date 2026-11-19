# Uzdevuma apraksts

## Loma
Tu esi HTML, CSS un JavaScript izstrādātājs un pasniedzējs iesācējam.

## Mērķis
Izveido lietotni **Mani uzdevumi**: vienkāršu uzdevumu sarakstu, kas darbojas lokāli pārlūkā.

## Tehnoloģijas
Tikai `index.html`, `style.css` un `app.js`, bez bibliotēkām, servera, CDN un API.

## Funkcijas
1. Pievieno uzdevumu ar pogu vai Enter.
2. Atzīmē izpildītu, atcel izpildi, dzēs vienu uzdevumu.
3. Filtrē visus, aktīvos, izpildītos.
4. Rāda neizpildīto uzdevumu skaitītāju.
5. Saglabā uzdevumu sarakstu `localStorage` arī pēc F5.
6. Papildfunkcija otrajā posmā: rediģēšana ar dubultklikšķi; Enter saglabā, Escape atceļ.

## Ierobežojumi
- Lietotnes tekstiem jāatbalsta latviešu diakritiskās zīmes.
- Uzdevuma tekstu attēlo tikai kā tekstu (`textContent`), nevis HTML.
- Tukšs vai tikai no atstarpēm veidots uzdevums netiek pievienots; lieto `trim()`.
- Neatkarīgi no filtra skaitītājs atspoguļo visus neizpildītos uzdevumus.
- Dati: masīvs ar objektiem `{ id: string, text: string, completed: boolean }`.
- Svarīgi elementu ID: `taskInput`, `addBtn`, `taskList`, `remainingCount`, `clearAllBtn`.
- Filtru pogām lieto atribūtu `data-filter` ar vērtībām `all`, `active`, `completed`.

## Izvades formāts
Atgriez trīs atsevišķus, pilnus un savstarpēji saderīgus failus: `index.html`, `style.css`, `app.js`; pēc tam īsas palaišanas un testēšanas norādes.

## Pieņemšanas kritēriji
1. Poga pievieno “Nopirkt pienu” un notīra ievadi.
2. Enter pievieno uzdevumu.
3. Tukšs un tikai atstarpju teksts netiek pievienots.
4. Teksts ar garumzīmēm un mīkstinājumiem attēlojas korekti.
5. `<b>teksts</b>` attēlojas burtiski, nevis kā formatēts HTML.
6. Izpildes atzīmēšana pārsvītro tekstu un samazina skaitītāju.
7. Dzēšana aizvāc tikai izvēlēto.
8. Aktīvo un izpildīto filtri strādā un ir vizuāli atšķirami.
9. Pēc F5 saglabājas trīs uzdevumi un to izpildes stāvoklis.
10. Pārlūka Console nav JavaScript kļūdu.

*Piezīme:* šī uzvedne sastādīta pēc video transkripcijas; pedagoga uzdevuma 3. nodaļa un oriģinālā darba lapa nav pievienota.
