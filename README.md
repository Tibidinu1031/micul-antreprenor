# 🍋 Șeful Cartierului / Boss of the Block

Un simulator de afaceri pentru copii de ~10 ani. Ești fondatorul și șeful unui
stand de limonadă și hot dog de la colțul străzii, și ai 14 zile ca să transformi
banii de start în profit adevărat.

*A business simulator for ~10-year-olds. The game ships in Romanian by default,
with a Română / English switch on the title screen and in the stand menu.*

## Cum se joacă / Playing it

Dublu-click pe **`index.html`**. Atât — fără instalare, fără server, fără internet.

Progresul se salvează automat. Închizi fila în mijlocul sezonului și te așteaptă
un buton **Continuă** când te întorci.

## Ciclul unei zile

1. **Citește prognoza.** Vremea, ziua săptămânii și evenimentele (o paradă, un
   food truck rival, o excursie școlară) schimbă câtă lume trece pe stradă și ce
   are chef să cumpere. Zi caniculară → limonadă. Răcoare → hot dog.
2. **Ia deciziile.** Alegi rețeta, pui prețurile, cumperi proviziile și hotărăști
   dacă dai bani pe reclamă, pe un ajutor sau pe o îmbunătățire permanentă.
3. **Deschide standul.** Urmărești ziua cum se desfășoară — clienții vin, cumpără,
   iar contorul de bani urcă.
4. **Citește cifrele.** O situație reală de profit și pierdere, banii urmăriți pas
   cu pas, și un sfat concret de la Antrenorul Ollie.

## Ce învață de fapt

Cifrele *sunt* lecția, deci toate sunt reale și toate se văd:

| Concept | Cum îl predă jocul |
|---|---|
| **Cost unitar** | Fiecare pahar și fiecare hot dog e făcut din ingrediente cumpărate. Schimbi rețeta, vezi costul cum se schimbă. |
| **Marjă** | Afișată live pe produs, în cenți și în procente. |
| **Prag de rentabilitate** | Panoul îți spune exact câte produse trebuie să vinzi ca să-ți acoperi costurile zilei. |
| **Costuri fixe vs variabile** | Chiria se plătește fie că vinzi 60 de produse, fie zero. Ingredientele nu. |
| **Sensibilitate la preț** | Crești prețul, cumpără mai puțini. Există un vârf real de profit — stă puțin *peste* cât se așteaptă clienții, iar găsirea lui e tot jocul. |
| **Ruptură de stoc** | Rămâi fără marfă și pierzi și vânzarea, și din reputație. |
| **Risipă** | Gheața se topește, chiflele se usucă, lămâile se strică. Cumperi prea mult = bani la gunoi. |
| **Capacitate** | Poți servi doar un număr limitat de oameni singur. O coadă prea lungă e venit pierdut. |
| **Bani vs profit** | Raportul arată profitul *și* mișcarea banilor, apoi explică de ce diferă. |
| **ROI** | Reclama și ajutorul trebuie să aducă înapoi mai mult decât costă, altfel antrenorul îți atrage atenția. |
| **Investiție** | Îmbunătățirile costă o dată și se amortizează în zilele rămase — dar doar dacă le cumperi devreme. |
| **Reputație** | Raportul bun calitate-preț și serviciul constant aduc mai mulți clienți mâine. |

## Dificultate

| Mod | Start | Țintă | Diferența |
|---|---|---|---|
| Începător | $200 | $425 | Chirie mică, clienți iertători |
| Fondator | $150 | $475 | Clienții îți observă prețurile |
| Magnat | $100 | $525 | Clienți foarte pretențioși — umfli prețul, pleacă |

Începător se câștigă jucând cu cap. Fondator cere să fii atent la prognoză și la
prețuri. Magnat presupune că ai învățat deja jocul.

## Meniul standului (butonul ⋯)

- **Redenumește standul** — se schimbă și firma pictată de pe stand.
- **Schimbă limba** — Română / English, fără să pierzi partida în curs.
- **Reia sezonul** — același stand, de la ziua 1, cu vreme nouă.
- **Stand nou** — înapoi la ecranul de start pentru alt nume și altă provocare.

## Fișiere

```
index.html    structura paginii
styles.css    tot sistemul vizual
i18n.js       textele, în română și engleză
game.js       simularea, economia, animația, graficele
```

Fără dependențe, fără build. Economia stă în blocul de configurare din capul lui
`game.js` — prețuri, rețete, îmbunătățiri, vreme și dificultate sunt date simple,
sigur de modificat. Textele se schimbă doar în `i18n.js`.

> **Notă despre monedă:** sumele sunt în dolari, pentru că economia e echilibrată
> pe aceste valori. Se pot converti în lei înmulțind uniform toate sumele din
> `game.js` (prețuri, costuri, chirie, ținte, îmbunătățiri) și împărțitorul
> `S.marketing / 20`.
