# Mani uzdevumi — PD1

Praktiskais darbs: pirmā strādājošā lietotne ar MI. Projekts izmanto tikai HTML, CSS un JavaScript, darbojas pārlūkā bez servera un interneta.

Statuss: sākotnējā versija; pārbaudes un dokumentācija vēl tiks papildinātas.

## Pirmās versijas pārbaudes (pirms labojuma)

Pārlūka automatizācijā pārbaudītas desmit video uzskaitītās situācijas. Rezultāts: **9 PASS, 1 FAIL**.

- T2 #3: pēc ievades `   ` (trīs atstarpes) tika pievienota tukša rinda; gaidīts: jaunu uzdevumu nedrīkst pievienot.
- Pārējie deviņi scenāriji šajā pārbaudes vidē izpildījās bez kļūdām.
- T3 cēlonis: `addTask()` pārbauda `rawText`, neizmantojot `trim()`.

*Testa ierobežojums:* drošības politika automatizētajā Chromium bloķē tiešu `file://` un `localhost` navigāciju. Pārbaude izpildīta pārlūka DOM ar pilnu HTML/CSS/JS un izolētu `localStorage` imitāciju. Testa rezultāts neapliecina manuālu `file://` pārbaudi uz Windows.
