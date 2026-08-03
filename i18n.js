/* ==========================================================================
   Boss of the Block — string tables
   Romanian is the default. Every user-facing string lives here.
   Placeholders look like {name} and are filled by t('key', {name: 'x'}).
   ========================================================================== */
var I18N = {

/* ══════════════════════════════ ROMÂNĂ ══════════════════════════════ */
ro: {
  'lang.name': 'Română',
  'unit.customers': 'clienți',
  'unit.people': 'oameni',
  'unit.cents': 'cenți',
  'unit.items': 'produse vândute',
  'doc.title': 'Micul Antreprenor — Condu-ți propriul stand',

  /* ---------- start ---------- */
  'start.title': 'Micul Antreprenor',
  'start.sub': 'Tu ești fondatorul. Paisprezece zile. Un singur stand.<br>Cumpără deștept, pune prețul potrivit și ieși pe profit.',
  'start.nameLabel': 'Dă-i un nume standului tău',
  'start.namePlaceholder': 'ex. Colțul Vesel al Anei',
  'start.diffLabel': 'Alege-ți provocarea',
  'start.go': 'Deschide afacerea →',
  'start.how': 'Cum funcționează?',
  'start.defaultName': 'Standul din Colț',
  'start.fact1': '<b>Prețul</b> prea mare? Coada dispare.',
  'start.fact2': '<b>Cumperi</b> prea mult? Ajunge la gunoi.',
  'start.fact3': '<b>Profitul</b> e ce rămâne după absolut toate costurile.',
  'start.continue': 'Continuă „{name}" — ziua {day}',

  'diff.easy':        'Începător',
  'diff.easy.note':   '$200 la start · ajungi la $425 · chirie mică',
  'diff.normal':      'Fondator',
  'diff.normal.note': '$150 la start · ajungi la $475 · clienți mai pretențioși',
  'diff.hard':        'Magnat',
  'diff.hard.note':   '$100 la start · ajungi la $525 · clienți foarte pretențioși',

  /* ---------- topbar ---------- */
  'tb.role': 'Tu · Fondator și Șef',
  'tb.dayWord': 'Ziua',
  'tb.ofWord': 'din',
  'rp.dayWord': 'Ziua',
  'rp.closing': 'Ora închiderii',
  'lang.switch': 'Limbă',
  'tb.cash': 'Bani',
  'tb.rep': 'Reputație',
  'tb.how': 'Cum se joacă',
  'tb.menu': 'Setările standului',

  /* ---------- forecast ---------- */
  'fc.title': 'Prognoza de azi',
  'fc.hint': 'Citește asta înainte să cumperi orice',
  'fc.crowd': 'Aglomerație',
  'fc.thirst': 'Poftă de',
  'fc.tomorrow': 'Mâine',
  'fc.lastDay': 'Ultima zi!',

  'crowd.packed': 'Ticsit',
  'crowd.busy': 'Aglomerat',
  'crowd.steady': 'Constant',
  'crowd.slow': 'Liniștit',
  'crowd.dead': 'Foarte liniștit',
  'thirst.lem': 'Limonadă 🥤',
  'thirst.dog': 'Hot dog 🌭',
  'thirst.both': 'Ambele, la fel',

  /* ---------- menu & prices ---------- */
  'menu.title': 'Meniul și prețurile tale',
  'menu.hint': 'Rețeta îți stabilește costul. Prețul îți stabilește profitul.',
  'menu.recipe': 'Rețetă',
  'menu.yourPrice': 'Prețul tău',
  'menu.costs': 'Te costă',
  'menu.keep': 'Îți rămâne',
  'menu.margin': 'Marjă',
  'menu.lowerPrice': 'Scade prețul',
  'menu.raisePrice': 'Crește prețul',

  'demand.veryHigh': '😬 Mult peste cât se așteaptă lumea azi — mulți vor trece mai departe.',
  'demand.high':     '🤔 Cam scump pentru ziua de azi. Vor cumpăra mai puțini.',
  'demand.fair':     '👌 Exact cât se așteaptă lumea să plătească.',
  'demand.low':      '😃 Chilipir! Așteaptă-te la o coadă mai lungă.',
  'demand.veryLow':  '🔥 Foarte ieftin — coadă mare, dar profit mic la fiecare vânzare.',

  /* ---------- supplies ---------- */
  'sup.title': 'Fă aprovizionarea',
  'sup.hint': 'Cumperi la pachet. Comenzile mari primesc reducere.',
  'sup.autoTxt': 'Nu știi cât să iei? Alege un punct de plecare, apoi ajustează.',
  'sup.auto.light': 'Aprovizionare pentru o zi slabă',
  'sup.auto.normal': 'Aprovizionare pentru o zi normală',
  'sup.auto.heavy': 'Aprovizionare pentru îmbulzeală',
  'sup.autoDone': 'Coș umplut pentru o zi {kind} — acum ajustează!',
  'sup.kind.light': 'slabă',
  'sup.kind.normal': 'normală',
  'sup.kind.heavy': 'aglomerată',
  'sup.basket': 'Coșul de azi',
  'sup.bulk': 'Reducere de volum',
  'sup.after': 'Bani după cumpărături',
  'sup.inCart': 'Vei avea',
  'sup.pack': 'pachet',
  'sup.packs': 'pachete',
  'sup.perPack': '{price} pentru {n}',
  'sup.spoils': '{pct} se strică',
  'sup.buyLess': 'Cumpără mai puțin: {name}',
  'sup.buyMore': 'Cumpără mai mult: {name}',

  'sup.lemons.name': 'Lămâi',       'sup.lemons.unit': 'lămâi',
  'sup.sugar.name': 'Zahăr',        'sup.sugar.unit': 'linguri',
  'sup.cups.name': 'Pahare',        'sup.cups.unit': 'pahare',
  'sup.ice.name': 'Gheață',         'sup.ice.unit': 'cuburi',
  'sup.sausages.name': 'Crenvurști','sup.sausages.unit': 'crenvurști',
  'sup.buns.name': 'Chifle',        'sup.buns.unit': 'chifle',
  'sup.toppings.name': 'Toppinguri','sup.toppings.unit': 'porții',

  /* ---------- products & recipes ---------- */
  'prod.lemonade.name': 'Limonadă', 'prod.lemonade.sub': 'la pahar',
  'prod.hotdog.name': 'Hot Dog',    'prod.hotdog.sub': 'la bucată',

  'rec.lemonade.0.name': 'Slabă',   'rec.lemonade.0.note': '1 lămâie',
  'rec.lemonade.1.name': 'Clasică', 'rec.lemonade.1.note': '2 lămâi',
  'rec.lemonade.2.name': 'Premium', 'rec.lemonade.2.note': '3 lămâi',
  'rec.hotdog.0.name': 'Simplu',    'rec.hotdog.0.note': 'fără extra',
  'rec.hotdog.1.name': 'Clasic',    'rec.hotdog.1.note': '1 topping',
  'rec.hotdog.2.name': 'Încărcat',  'rec.hotdog.2.note': '3 toppinguri',

  /* ---------- growth ---------- */
  'grow.title': 'Dezvoltă afacerea',
  'grow.hint': 'Astea costă bani azi ca să aducă bani mai încolo',
  'grow.mk.name': 'Reclamă',
  'grow.mk.sub': 'Fluturași, afișe cu creta, o vorbă bună',
  'grow.mk.none': 'Fără reclamă azi. Te vor vedea doar cei care trec oricum pe stradă.',
  'grow.mk.some': 'Cam <b>{pct} mai multă lume</b> va auzi de tine. Observă cum fiecare dolar în plus adaugă tot mai puțin.',
  'grow.staff.name': 'Angajează un ajutor',
  'grow.staff.sub': 'Servește clienții ca să se miște coada',
  'grow.staff.perDay': '$25 / zi',
  'grow.staff.on': 'Angajat pentru azi',
  'grow.staff.off': 'Neangajat',
  'grow.staff.note': 'Singur poți servi cam <b>{alone}</b>. Un ajutor adaugă <b>+{extra}</b>.',
  'grow.upg': 'Îmbunătățiri',
  'grow.upgSub': 'cumperi o dată, te ajută în fiecare zi',
  'grow.owned': '✓ Cumpărat',
  'grow.buy': 'Cumpără · {price}',
  'grow.installed': '{emoji}  {name} — gata montat!',

  'upg.sign.name': 'Firmă pictată de mână',
  'upg.sign.desc': 'Te văd de la capătul străzii. +15% clienți, în fiecare zi.',
  'upg.register.name': 'Casă de marcat',
  'upg.register.desc': 'Dai restul rapid. Servești cu 15 clienți mai mult pe zi.',
  'upg.cooler.name': 'Ladă frigorifică mare',
  'upg.cooler.desc': 'Gheața și lămâile rezistă peste noapte. Se strică mult mai puțin.',
  'upg.bunbox.name': 'Cutie izolată pentru chifle',
  'upg.bunbox.desc': 'Chiflele rămân moi. Pierderile scad de la 25% la 8%.',
  'upg.grill.name': 'Al doilea grătar',
  'upg.grill.desc': 'Gătești două odată. Servești cu 25 de clienți mai mult pe zi.',
  'upg.umbrella.name': 'Umbrar și scaune',
  'upg.umbrella.desc': 'Lumea stă și povestește. Reputația crește cu 50% mai repede.',

  /* ---------- plan panel ---------- */
  'plan.title': 'Planul de azi',
  'plan.beK': 'Ca să ieși pe zero trebuie să vinzi',
  'plan.beUnit': 'produse azi',
  'plan.beSub': 'Chirie, ajutor și reclamă azi: {v}',
  'plan.beTip': 'Fiecare produs îți aduce cam {v} după ingrediente.',
  'plan.supplies': 'Provizii cumpărate',
  'plan.rent': 'Chiria standului',
  'plan.staff': 'Ajutor',
  'plan.marketing': 'Reclamă',
  'plan.total': 'Bani puși în joc azi',
  'plan.cups': 'pahare gata',
  'plan.dogs': 'hot dog gata',
  'plan.cap': 'maxim serviți',
  'plan.estK': 'Profit estimat',
  'plan.estBand': 'Probabil între {lo} și {hi}',
  'plan.open': 'Deschide standul! 🎪',

  'warn.broke': 'Nu-ți permiți coșul ăsta. Scoate ceva din el.',
  'warn.belowCost': 'Fiecare {name} vândut îți aduce pierdere — prețul e sub cât te costă să-l faci.',
  'warn.stockout': 'S-ar putea să rămâi fără marfă — cam {n} ar pleca cu mâna goală.',
  'warn.capacity': 'Prea mulți clienți pentru un singur om. Cam {n} nu vor fi serviți. Ia-n calcul un ajutor.',
  'warn.waste': 'Cumperi mai mult decât poți vinde — cam {v} s-ar putea strica la noapte.',
  'warn.ok': 'Planul arată bine. Deschide!',

  /* ---------- sim ---------- */
  'sim.skip': 'Sari la închidere ⏩',
  'sim.cups': 'Pahare vândute',
  'sim.dogs': 'Hot dog vândute',
  'sim.money': 'Bani încasați',
  'sim.soldOut': '😞 <b>S-a terminat marfa!</b> Au plecat cu mâna goală {n}.',
  'sim.queue': '⏱️ <b>Coada s-a făcut prea lungă.</b> {n} s-au plictisit și au plecat.',
  'sim.busy': '🎉 Dimineață aglomerată — coada crește!',
  'sim.steady': '🙂 Un flux constant de clienți.',
  'sim.quiet': '🍃 Liniște mare azi.',

  /* ---------- report ---------- */
  'rp.eyebrow': 'Ziua <span id="rpDay">1</span> · Ora închiderii',
  'rp.profitK': 'Profitul de azi',
  'rp.profitSub': 'Încasări minus absolut toate costurile',
  'rp.profitSubPct': '{n} profit din fiecare dolar încasat',
  'rp.noSales': 'Azi nu ai vândut nimic',
  'rp.title.great': 'Zi excepțională! 🤩',
  'rp.title.good': 'Profit frumos! 😀',
  'rp.title.ok': 'Ai făcut bani 🙂',
  'rp.title.small': 'O pierdere mică 😕',
  'rp.title.bad': 'Zi grea 😞',

  'pnl.title': 'Cifrele',
  'pnl.hint': 'Asta e o situație de profit și pierdere — afacerile adevărate o fac în fiecare zi',
  'pnl.in': 'Bani intrați',
  'pnl.revenue': 'Încasări totale',
  'pnl.cogs': 'Costul a ceea ce ai vândut',
  'pnl.cogsLem': 'Ingrediente limonadă',
  'pnl.cogsDog': 'Ingrediente hot dog',
  'pnl.cogsWhyLem': '{n} pahare × {v}',
  'pnl.cogsWhyDog': '{n} hot dog × {v}',
  'pnl.gross': 'Profit brut',
  'pnl.fixed': 'Costuri pe care le plătești oricum',
  'pnl.rent': 'Chiria standului',
  'pnl.staff': 'Ajutor',
  'pnl.marketing': 'Reclamă',
  'pnl.waste': 'Provizii stricate',
  'pnl.wasteWhy': 'topite, uscate sau expirate',
  'pnl.net': 'PROFIT NET',
  'pnl.each': '{n} × {v}',

  'cf.title': 'Banii tăi, pas cu pas',
  'cf.start': 'Bani la începutul zilei',
  'cf.supplies': 'Provizii cumpărate',
  'cf.revenue': 'Bani primiți de la clienți',
  'cf.rent': 'Chiria standului',
  'cf.staff': 'Ajutor',
  'cf.marketing': 'Reclamă',
  'cf.end': 'Banii pe care îi ai acum',
  'cf.repLine': '💰 Reputație {rep} &nbsp;·&nbsp; <b>{v}</b> provizii rămase în ladă pentru mâine.',
  'cf.unchanged': 'neschimbată',
  'cf.gapUp': '<br>🤔 Profitul spune <b>{profit}</b>, dar banii s-au mișcat doar cu <b>{cash}</b>. Diferența de <b>{gap}</b> sunt proviziile plătite azi și nevândute încă — stau în ladă și te așteaptă mâine.',
  'cf.gapDown': '<br>🤔 Banii s-au mișcat cu <b>{cash}</b>, dar profitul a fost doar <b>{profit}</b>. Asta pentru că ai vândut lucruri făcute din provizii plătite într-o zi anterioară.',

  'mf.title': 'Unde s-a dus fiecare dolar',
  'mf.hintProfit': 'Din <b>{v}</b> câți au intrat',
  'mf.hintLoss': 'Ai cheltuit <b>{spent}</b>, dar ai încasat doar <b>{got}</b>',
  'mf.ingredients': 'Ingrediente',
  'mf.rent': 'Chirie',
  'mf.staff': 'Ajutor',
  'mf.marketing': 'Reclamă',
  'mf.waste': 'Stricate',
  'mf.profit': 'Profitul tău',
  'mf.short': 'Lipsă',

  'coach.name': 'Antrenorul Ollie zice…',
  'chart.title': 'Profitul în fiecare zi',
  'chart.hint': 'Peste linie e profit, sub linie e pierdere',
  'chart.tipDay': 'Ziua {d}',
  'chart.tipProfit': 'Profit {v}',
  'chart.tipItems': '{n}',
  'rp.next': 'Planifică ziua de mâine →',
  'rp.finish': 'Vezi rezultatele finale →',

  /* ---------- finale ---------- */
  'fin.won': 'Ți-ai atins ținta!',
  'fin.close': 'Cât pe ce!',
  'fin.done': 'Sezon încheiat',
  'fin.wonSub': '<b>{name}</b> a terminat cu {cash} — peste ținta de {goal}. Ai condus o afacere adevărată și ai scos profit.',
  'fin.lostSub': '<b>{name}</b> a terminat cu {cash}. Ținta era {goal}. Uită-te mai jos la zilele proaste — ce ai schimba?',
  'fin.season': 'Cele 14 zile ale tale',
  'fin.seasonHint': 'Profitul în fiecare zi',
  'fin.badges': 'Insigne câștigate',
  'fin.replay': 'Mai încearcă o dată 🔁',
  'fin.stat.cash': 'Bani la final',
  'fin.stat.profit': 'Profit total',
  'fin.stat.items': 'Produse vândute',
  'fin.stat.best': 'Cea mai bună zi',
  'fin.stat.bestDay': '(ziua {d})',
  'fin.stat.rep': 'Reputație',
  'fin.stat.waste': 'Aruncat la gunoi',

  'badge.goal.name': 'Ținta doborâtă',      'badge.goal.desc': 'Termină peste ținta de bani',
  'badge.green.name': 'Mereu pe plus',      'badge.green.desc': 'Ieși pe profit în fiecare zi',
  'badge.fav.name': 'Favoritul cartierului','badge.fav.desc': 'Ajungi la 85 reputație',
  'badge.big.name': 'Zi mare',              'badge.big.desc': 'Faci $60+ profit într-o zi',
  'badge.waste.name': 'Zero risipă',        'badge.waste.desc': 'Arunci sub $25 în tot sezonul',
  'badge.empire.name': 'Constructor de imperiu', 'badge.empire.desc': 'Cumperi 3 sau mai multe îmbunătățiri',
  'badge.pricer.name': 'Ochi de comerciant','badge.pricer.desc': 'Marjă medie peste 30%',

  /* ---------- stand menu ---------- */
  'sm.title': 'Standul tău',
  'sm.rename': 'Redenumește-ți standul',
  'sm.save': 'Salvează',
  'sm.startOver': 'Ia-o de la capăt',
  'sm.progress': 'Ești în ziua {day} din {total}, cu {cash} în cutie.',
  'sm.restart': 'Reia sezonul',
  'sm.restartSub': 'același stand, de la ziua 1',
  'sm.newStand': 'Stand nou',
  'sm.newStandSub': 'alege alt nume și altă provocare',
  'sm.warn': 'Dacă o iei de la capăt, pierzi progresul curent.',
  'sm.renamed': 'De acum te numești „{name}"',
  'sm.restarted': 'Start proaspăt — iar ziua 1!',
  'sm.close': 'Închide',

  /* ---------- how-to ---------- */
  'how.title': 'Cum îți conduci standul',
  'how.1': '<b>Verifică prognoza.</b> Zi caniculară? Lumea vrea limonadă rece. Răcoare? Câștigă hot dogii.',
  'how.2': '<b>Cumpără proviziile.</b> Fiecare pahar și fiecare hot dog se face din ingrediente pe care le plătești. Prea puține și rămâi fără marfă. Prea multe și se strică.',
  'how.3': '<b>Pune prețurile.</b> Preț mai mare = mai mulți bani per vânzare, dar mai puțini clienți. Preț mai mic = coadă mai lungă, dar câștigi mai puțin la fiecare.',
  'how.4': '<b>Deschide</b> și urmărește cum decurge ziua.',
  'how.5': '<b>Citește-ți cifrele.</b> Află ce a mers, apoi fă mai bine mâine.',
  'how.words': 'Cuvinte pe care le folosește un fondator adevărat',
  'how.go': 'Am înțeles',
  'gl.revenue': 'Încasări',      'gl.revenue.d': 'Toți banii pe care ți-i dau clienții.',
  'gl.cogs': 'Costul mărfii',    'gl.cogs.d': 'Cât te-au costat ingredientele din ce ai <i>vândut</i>.',
  'gl.fixed': 'Costuri fixe',    'gl.fixed.d': 'Costuri pe care le plătești indiferent cât vinzi — chiria, ajutorul.',
  'gl.profit': 'Profit',         'gl.profit.d': 'Încasări minus <i>toate</i> costurile. Ăsta e ce îți rămâne cu adevărat.',
  'gl.margin': 'Marjă',          'gl.margin.d': 'Ce felie din fiecare dolar e profit. $0.50 profit la un pahar de $2.00 = marjă de 25%.',
  'gl.break': 'Prag de rentabilitate', 'gl.break.d': 'Cât trebuie să vinzi doar ca să-ți acoperi costurile. Sub el, pierzi bani.',
  'gl.rep': 'Reputație',         'gl.rep.d': 'Ce crede cartierul despre tine. Raportul bun calitate-preț o crește; rămasul fără marfă sau prețurile umflate o scad.',

  /* ---------- weather, days, events ---------- */
  'w.scorching': 'Caniculă', 'w.hot': 'Cald și însorit', 'w.warm': 'Cald',
  'w.mild': 'Plăcut', 'w.cloudy': 'Înnorat', 'w.rainy': 'Ploios',

  'dow.0': 'Sâmbătă', 'dow.1': 'Duminică', 'dow.2': 'Luni', 'dow.3': 'Marți',
  'dow.4': 'Miercuri', 'dow.5': 'Joi', 'dow.6': 'Vineri',

  'ev.parade.name': 'Paradă pe stradă',
  'ev.parade.text': 'O paradă trece chiar pe la colțul tău. Trotuarul va fi plin ochi.',
  'ev.game.name': 'Meci mare în parc',
  'ev.game.text': 'Finala de juniori la două străzi distanță. Familii flămânde toată după-amiaza.',
  'ev.trip.name': 'Excursie școlară',
  'ev.trip.text': 'Două autocare de copii trec pe la prânz — și le e sete.',
  'ev.market.name': 'Piața de legume',
  'ev.market.text': 'E zi de piață. Lume constantă, iar toate pachetele sunt cu 20% mai ieftine.',
  'ev.truck.name': 'Food truck rival',
  'ev.truck.text': 'Un food truck lucios a parcat peste drum. Îți va lua din clienți.',
  'ev.quiet.name': 'Weekend liniștit',
  'ev.quiet.text': 'Jumătate de cartier e plecat. Va fi o zi slabă — cumpără cu grijă.',
  'ev.heat.name': 'Avertizare de caniculă',
  'ev.heat.text': 'Radioul le-a spus tuturor să bea multe lichide. Limonada e la mare căutare.'
},

/* ══════════════════════════════ ENGLISH ══════════════════════════════ */
en: {
  'lang.name': 'English',
  'unit.customers': 'customers',
  'unit.people': 'people',
  'unit.cents': 'cents',
  'unit.items': 'items sold',
  'doc.title': 'Boss of the Block — Run Your Own Stand',

  'start.title': 'Boss of the Block',
  'start.sub': "You're the founder. Fourteen days. One stand.<br>Buy smart, price right, and turn a profit.",
  'start.nameLabel': 'Name your stand',
  'start.namePlaceholder': "e.g. Zoe's Zesty Corner",
  'start.diffLabel': 'Pick your challenge',
  'start.go': 'Open for Business →',
  'start.how': 'How does it work?',
  'start.defaultName': 'The Corner Stand',
  'start.fact1': '<b>Price</b> it too high and the line disappears.',
  'start.fact2': '<b>Buy</b> too much and it goes in the bin.',
  'start.fact3': '<b>Profit</b> is what\'s left after every single cost.',
  'start.continue': 'Continue "{name}" — Day {day}',

  'diff.easy':        'Rookie',
  'diff.easy.note':   '$200 to start · reach $425 · cheap rent',
  'diff.normal':      'Founder',
  'diff.normal.note': '$150 to start · reach $475 · fussier customers',
  'diff.hard':        'Tycoon',
  'diff.hard.note':   '$100 to start · reach $525 · very picky crowd',

  'tb.role': 'You · Founder & Boss',
  'tb.dayWord': 'Day',
  'tb.ofWord': 'of',
  'rp.dayWord': 'Day',
  'rp.closing': 'Closing Time',
  'lang.switch': 'Language',
  'tb.cash': 'Cash',
  'tb.rep': 'Reputation',
  'tb.how': 'How to play',
  'tb.menu': 'Stand settings',

  'fc.title': "Today's Forecast",
  'fc.hint': 'Read this before you buy anything',
  'fc.crowd': 'Crowd',
  'fc.thirst': 'Thirsty for',
  'fc.tomorrow': 'Tomorrow',
  'fc.lastDay': 'Last day!',

  'crowd.packed': 'Packed', 'crowd.busy': 'Busy', 'crowd.steady': 'Steady',
  'crowd.slow': 'Slow', 'crowd.dead': 'Very slow',
  'thirst.lem': 'Lemonade 🥤', 'thirst.dog': 'Hot dogs 🌭', 'thirst.both': 'Both, evenly',

  'menu.title': 'Your Menu & Prices',
  'menu.hint': 'Recipe sets your cost. Price sets your profit.',
  'menu.recipe': 'Recipe',
  'menu.yourPrice': 'Your price',
  'menu.costs': 'Costs you',
  'menu.keep': 'You keep',
  'menu.margin': 'Margin',
  'menu.lowerPrice': 'Lower price',
  'menu.raisePrice': 'Raise price',

  'demand.veryHigh': '😬 Way pricier than people expect today — most will walk on.',
  'demand.high':     '🤔 A bit expensive for today. Fewer will buy.',
  'demand.fair':     '👌 Right around what people expect to pay.',
  'demand.low':      '😃 A bargain! Expect a longer line.',
  'demand.veryLow':  '🔥 Super cheap — big line, but tiny profit per sale.',

  'sup.title': 'Stock Up',
  'sup.hint': 'Buy packs. Big orders get a bulk discount.',
  'sup.autoTxt': 'Not sure how much? Pick a starting point, then adjust.',
  'sup.auto.light': 'Stock for a slow day',
  'sup.auto.normal': 'Stock for a normal day',
  'sup.auto.heavy': 'Stock for a rush',
  'sup.autoDone': 'Cart filled for a {kind} day — now tweak it!',
  'sup.kind.light': 'slow', 'sup.kind.normal': 'normal', 'sup.kind.heavy': 'busy',
  'sup.basket': 'Basket today',
  'sup.bulk': 'Bulk discount',
  'sup.after': 'Cash after buying',
  'sup.inCart': "You'll have",
  'sup.pack': 'pack', 'sup.packs': 'packs',
  'sup.perPack': '{price} per {n}',
  'sup.spoils': '{pct} spoils',
  'sup.buyLess': 'Buy fewer {name}', 'sup.buyMore': 'Buy more {name}',

  'sup.lemons.name': 'Lemons',     'sup.lemons.unit': 'lemons',
  'sup.sugar.name': 'Sugar',       'sup.sugar.unit': 'scoops',
  'sup.cups.name': 'Cups',         'sup.cups.unit': 'cups',
  'sup.ice.name': 'Ice',           'sup.ice.unit': 'scoops',
  'sup.sausages.name': 'Sausages', 'sup.sausages.unit': 'sausages',
  'sup.buns.name': 'Buns',         'sup.buns.unit': 'buns',
  'sup.toppings.name': 'Toppings', 'sup.toppings.unit': 'servings',

  'prod.lemonade.name': 'Lemonade', 'prod.lemonade.sub': 'per cup',
  'prod.hotdog.name': 'Hot Dog',    'prod.hotdog.sub': 'per dog',

  'rec.lemonade.0.name': 'Light',   'rec.lemonade.0.note': '1 lemon',
  'rec.lemonade.1.name': 'Classic', 'rec.lemonade.1.note': '2 lemons',
  'rec.lemonade.2.name': 'Premium', 'rec.lemonade.2.note': '3 lemons',
  'rec.hotdog.0.name': 'Plain',     'rec.hotdog.0.note': 'no extras',
  'rec.hotdog.1.name': 'Classic',   'rec.hotdog.1.note': '1 topping',
  'rec.hotdog.2.name': 'Loaded',    'rec.hotdog.2.note': '3 toppings',

  'grow.title': 'Grow the Business',
  'grow.hint': 'These cost money today to earn money later',
  'grow.mk.name': 'Marketing',
  'grow.mk.sub': 'Flyers, chalk signs, a shout-out',
  'grow.mk.none': 'No marketing today. Only people already walking by will see you.',
  'grow.mk.some': 'About <b>{pct} more people</b> will hear about you. Note how each extra dollar adds a little less.',
  'grow.staff.name': 'Hire a Helper',
  'grow.staff.sub': 'Serves customers so your line moves',
  'grow.staff.perDay': '$25 / day',
  'grow.staff.on': 'Hired for today', 'grow.staff.off': 'Not hired',
  'grow.staff.note': 'You can serve about <b>{alone}</b> alone. A helper adds <b>+{extra}</b>.',
  'grow.upg': 'Upgrades',
  'grow.upgSub': 'bought once, help every day',
  'grow.owned': '✓ Owned',
  'grow.buy': 'Buy · {price}',
  'grow.installed': '{emoji}  {name} installed!',

  'upg.sign.name': 'Hand-Painted Sign',
  'upg.sign.desc': 'People spot you from down the block. +15% crowd, every day.',
  'upg.register.name': 'Cash Register',
  'upg.register.desc': 'Change made fast. Serve 15 more customers a day.',
  'upg.cooler.name': 'Big Cooler',
  'upg.cooler.desc': 'Ice and lemons survive the night. Far less spoils.',
  'upg.bunbox.name': 'Insulated Bun Box',
  'upg.bunbox.desc': 'Buns stay soft. Stale waste drops from 25% to 8%.',
  'upg.grill.name': 'Second Grill',
  'upg.grill.desc': 'Cook two at once. Serve 25 more customers a day.',
  'upg.umbrella.name': 'Shade & Stools',
  'upg.umbrella.desc': 'People stay and chat. Reputation grows 50% faster.',

  'plan.title': "Today's Plan",
  'plan.beK': 'To break even you must sell',
  'plan.beUnit': 'items today',
  'plan.beSub': 'Rent, helper and marketing today: {v}',
  'plan.beTip': 'Each item earns about {v} after ingredients.',
  'plan.supplies': 'Supplies bought',
  'plan.rent': 'Stand rent',
  'plan.staff': 'Helper',
  'plan.marketing': 'Marketing',
  'plan.total': 'Money at risk today',
  'plan.cups': 'cups ready', 'plan.dogs': 'dogs ready', 'plan.cap': 'max served',
  'plan.estK': 'Best guess profit',
  'plan.estBand': 'Likely between {lo} and {hi}',
  'plan.open': 'Open the Stand! 🎪',

  'warn.broke': 'You cannot afford this cart. Take something out.',
  'warn.belowCost': 'Every {name} you sell loses money — your price is below what it costs to make.',
  'warn.stockout': 'You may run out — about {n} could leave empty-handed.',
  'warn.capacity': 'Too many customers for one person. About {n} will not be served. Consider a helper.',
  'warn.waste': 'You are buying more than you can sell — about {v} could spoil tonight.',
  'warn.ok': 'This plan looks solid. Open up!',

  'sim.skip': 'Skip to closing ⏩',
  'sim.cups': 'Cups sold', 'sim.dogs': 'Dogs sold', 'sim.money': 'Money in',
  'sim.soldOut': '😞 <b>Sold out!</b> {n} left with nothing.',
  'sim.queue': '⏱️ <b>The line got too long.</b> {n} gave up waiting.',
  'sim.busy': '🎉 Busy morning — the line is growing!',
  'sim.steady': '🙂 A steady trickle of customers.',
  'sim.quiet': '🍃 Quiet out here today.',

  'rp.eyebrow': 'Day <span id="rpDay">1</span> · Closing Time',
  'rp.profitK': "Today's profit",
  'rp.profitSub': 'Revenue minus every cost',
  'rp.profitSubPct': '{n} profit out of every dollar you took in',
  'rp.noSales': 'You did not sell anything today',
  'rp.title.great': 'Outstanding day! 🤩',
  'rp.title.good': 'Solid profit! 😀',
  'rp.title.ok': 'You made money 🙂',
  'rp.title.small': 'A small loss 😕',
  'rp.title.bad': 'Rough day 😞',

  'pnl.title': 'The Numbers',
  'pnl.hint': 'This is a profit & loss statement — real businesses make one every day',
  'pnl.in': 'Money In',
  'pnl.revenue': 'Revenue',
  'pnl.cogs': 'Cost of what you sold',
  'pnl.cogsLem': 'Lemonade ingredients',
  'pnl.cogsDog': 'Hot dog ingredients',
  'pnl.cogsWhyLem': '{n} cups × {v}',
  'pnl.cogsWhyDog': '{n} dogs × {v}',
  'pnl.gross': 'Gross profit',
  'pnl.fixed': 'Costs you pay anyway',
  'pnl.rent': 'Stand rent',
  'pnl.staff': 'Helper',
  'pnl.marketing': 'Marketing',
  'pnl.waste': 'Spoiled supplies',
  'pnl.wasteWhy': 'melted, stale or past it',
  'pnl.net': 'NET PROFIT',
  'pnl.each': '{n} × {v}',

  'cf.title': 'Your Cash, Step by Step',
  'cf.start': 'Cash you started the day with',
  'cf.supplies': 'Supplies you bought',
  'cf.revenue': 'Money customers paid you',
  'cf.rent': 'Stand rent',
  'cf.staff': 'Helper',
  'cf.marketing': 'Marketing',
  'cf.end': 'Cash you have now',
  'cf.repLine': '💰 Reputation {rep} &nbsp;·&nbsp; <b>{v}</b> of supplies still in the cooler for tomorrow.',
  'cf.unchanged': 'unchanged',
  'cf.gapUp': '<br>🤔 Your profit says <b>{profit}</b> but your cash only moved <b>{cash}</b>. The difference is <b>{gap}</b> of supplies you paid for today but have not sold yet — they are in the cooler waiting for tomorrow.',
  'cf.gapDown': '<br>🤔 Your cash moved <b>{cash}</b> but profit was only <b>{profit}</b>. That is because you sold things made from supplies you had already paid for on an earlier day.',

  'mf.title': 'Where Every Dollar Went',
  'mf.hintProfit': 'Out of <b>{v}</b> that came in',
  'mf.hintLoss': 'You spent <b>{spent}</b> but only took in <b>{got}</b>',
  'mf.ingredients': 'Ingredients', 'mf.rent': 'Stand rent', 'mf.staff': 'Helper',
  'mf.marketing': 'Marketing', 'mf.waste': 'Spoiled', 'mf.profit': 'Your profit', 'mf.short': 'Short by',

  'coach.name': 'Coach Ollie says…',
  'chart.title': 'Profit Each Day',
  'chart.hint': 'Above the line is profit, below is a loss',
  'chart.tipDay': 'Day {d}',
  'chart.tipProfit': 'Profit {v}',
  'chart.tipItems': '{n}',
  'rp.next': 'Plan Tomorrow →',
  'rp.finish': 'See Your Final Results →',

  'fin.won': 'You hit your goal!',
  'fin.close': 'So close!',
  'fin.done': 'Season complete',
  'fin.wonSub': '<b>{name}</b> finished with {cash} — past your {goal} goal. You ran a real business and made it pay.',
  'fin.lostSub': '<b>{name}</b> finished with {cash}. Your goal was {goal}. Look at your worst days below — what would you change?',
  'fin.season': 'Your 14 Days',
  'fin.seasonHint': 'Profit each day',
  'fin.badges': 'Badges Earned',
  'fin.replay': 'Run It Again 🔁',
  'fin.stat.cash': 'Cash at the end',
  'fin.stat.profit': 'Total profit',
  'fin.stat.items': 'Items sold',
  'fin.stat.best': 'Best day',
  'fin.stat.bestDay': '(day {d})',
  'fin.stat.rep': 'Reputation',
  'fin.stat.waste': 'Thrown away',

  'badge.goal.name': 'Goal Crusher',   'badge.goal.desc': 'Finish above your cash goal',
  'badge.green.name': 'Never in the Red', 'badge.green.desc': 'Turn a profit every single day',
  'badge.fav.name': 'Neighbourhood Favourite', 'badge.fav.desc': 'Reach 85 reputation',
  'badge.big.name': 'Big Day',         'badge.big.desc': 'Make $60+ profit in one day',
  'badge.waste.name': 'Zero Waste Boss', 'badge.waste.desc': 'Throw away less than $25 all season',
  'badge.empire.name': 'Empire Builder', 'badge.empire.desc': 'Buy 3 or more upgrades',
  'badge.pricer.name': 'Sharp Pricer',  'badge.pricer.desc': 'Average margin above 30%',

  'sm.title': 'Your Stand',
  'sm.rename': 'Rename your stand',
  'sm.save': 'Save',
  'sm.startOver': 'Start over',
  'sm.progress': 'You are on day {day} of {total} with {cash} in the tin.',
  'sm.restart': 'Restart this season',
  'sm.restartSub': 'same shop, day 1',
  'sm.newStand': 'New stand',
  'sm.newStandSub': 'pick a new name & challenge',
  'sm.warn': 'Starting over erases your current progress.',
  'sm.renamed': 'Now trading as "{name}"',
  'sm.restarted': 'Fresh start — day 1 again!',
  'sm.close': 'Close',

  'how.title': 'How to run your stand',
  'how.1': '<b>Check the forecast.</b> Hot day? People want cold lemonade. Chilly? Hot dogs win.',
  'how.2': '<b>Buy your supplies.</b> Every cup and every dog is made from ingredients you pay for. Buy too little and you sell out. Buy too much and it spoils.',
  'how.3': '<b>Set your prices.</b> Higher price = more money per sale, but fewer customers. Lower price = a longer line, but less on each sale.',
  'how.4': '<b>Open up</b> and watch the day play out.',
  'how.5': '<b>Read your numbers.</b> Learn what worked, then do it better tomorrow.',
  'how.words': 'Words a real founder uses',
  'how.go': 'Got it',
  'gl.revenue': 'Revenue',       'gl.revenue.d': 'All the money customers hand you.',
  'gl.cogs': 'Cost of goods',    'gl.cogs.d': 'What the ingredients in the things you <i>sold</i> cost you.',
  'gl.fixed': 'Fixed costs',     'gl.fixed.d': 'Costs you pay no matter how much you sell — rent, your helper.',
  'gl.profit': 'Profit',         'gl.profit.d': 'Revenue minus <i>every</i> cost. This is what you actually keep.',
  'gl.margin': 'Margin',         'gl.margin.d': "The slice of each dollar that's profit. $0.50 profit on a $2.00 cup = 25% margin.",
  'gl.break': 'Break-even',      'gl.break.d': 'How much you must sell just to cover costs. Below it you lose money.',
  'gl.rep': 'Reputation',        'gl.rep.d': 'What the neighbourhood thinks. Great value grows it; selling out or overcharging hurts it.',

  'w.scorching': 'Scorching', 'w.hot': 'Hot & Sunny', 'w.warm': 'Warm',
  'w.mild': 'Mild', 'w.cloudy': 'Cloudy', 'w.rainy': 'Rainy',

  'dow.0': 'Saturday', 'dow.1': 'Sunday', 'dow.2': 'Monday', 'dow.3': 'Tuesday',
  'dow.4': 'Wednesday', 'dow.5': 'Thursday', 'dow.6': 'Friday',

  'ev.parade.name': 'Street Parade',
  'ev.parade.text': 'A parade marches right past your corner. The pavement will be packed.',
  'ev.game.name': 'Big Game at the Park',
  'ev.game.text': 'Little League finals two blocks away. Hungry families all afternoon.',
  'ev.trip.name': 'School Field Trip',
  'ev.trip.text': 'Two busloads of kids walk past at lunchtime — and they are thirsty.',
  'ev.market.name': 'Farmers Market',
  'ev.market.text': 'Market day. Steady crowds, and every supply pack is 20% cheaper.',
  'ev.truck.name': 'Rival Food Truck',
  'ev.truck.text': 'A shiny food truck parked across the road. It will pull customers away.',
  'ev.quiet.name': 'Quiet Weekend',
  'ev.quiet.text': 'Half the neighbourhood is away. Expect a slow one — buy carefully.',
  'ev.heat.name': 'Heat Advisory',
  'ev.heat.text': 'The radio told everyone to stay hydrated. Lemonade is in demand.'
}
};

/* ---- coach advice, kept apart because the strings are long ---- */
I18N.ro['coach.nothing'] = 'N-ai vândut absolut nimic azi. Verifică două lucruri până mâine: chiar ai cumpărat ingredientele și e prețul tău mult peste cât se așteaptă lumea să plătească?';
I18N.ro['coach.nothing.t'] = '<b>Zero încasări</b>, dar costurile curg mai departe — ăsta e cel mai rapid mod de a rămâne fără bani. Chiria se plătește indiferent dacă vinzi sau nu.';
I18N.ro['coach.stockout'] = 'Ai rămas fără marfă! Cam {n} voiau să cumpere și n-ai avut ce să le dai — aproximativ {v} au plecat pe jos. Mâine cumpără mai multe provizii.';
I18N.ro['coach.stockout.t'] = '<b>Ruptură de stoc</b> — rămâi fără ce vor clienții. Te costă vânzarea de azi <i>și</i> puțină reputație, pentru că lumea ține minte drumul făcut degeaba.';
I18N.ro['coach.capacity'] = 'Coada ta a fost prea lungă. Cam {n} s-au plictisit și au plecat. Un ajutor costă {cost}, dar îți permite să servești cu {cap} mai mult — merită într-o zi aglomerată.';
I18N.ro['coach.capacity.t'] = '<b>Capacitatea</b> e cât poți efectiv să prepari și să servești. Cererea pe care n-o poți servi nu e o vânzare — e o vânzare pierdută.';
I18N.ro['coach.waste'] = 'Ai aruncat provizii stricate de {v}. Ăia sunt bani adevărați la gunoi. Cumpără mai aproape de cât poți vinde, sau ia o ladă frigorifică să se topească mai puțin.';
I18N.ro['coach.waste.t'] = '<b>Risipa</b> e marfa pe care ai plătit-o, dar n-ai vândut-o. De asta magazinele adevărate se uită la prognoză înainte să comande.';
I18N.ro['coach.priceHigh'] = 'Prețul tău la {name} e mare pentru o zi ca asta, așa că au cumpărat mai puțini. Uneori un preț mai mic aduce <i>mai mult</i> profit total, pentru că spun „da" mult mai mulți oameni.';
I18N.ro['coach.priceHigh.t'] = '<b>Sensibilitatea la preț</b> — când crești prețul, unii clienți pleacă. Șmecheria e să găsești prețul unde preț × clienți dă cel mai mult.';
I18N.ro['coach.priceLow'] = 'Ai avut clienți mulți, dar vinzi aproape la preț de cost. Încearcă să urci prețul la {name} cu 25 de cenți — vei pierde câțiva clienți și tot vei câștiga mai mult.';
I18N.ro['coach.priceLow.t'] = '<b>Marja</b> e profitul din fiecare vânzare. O coadă lungă cu marjă mică tot un profit mic înseamnă.';
I18N.ro['coach.loss'] = 'Azi ai pierdut {v}. {why}. Uită-te mâine la pragul de rentabilitate înainte să deschizi.';
I18N.ro['coach.loss.whyFixed'] = 'Vânzările n-au acoperit chiria și celelalte costuri fixe';
I18N.ro['coach.loss.whyCogs'] = 'Ingredientele au costat mai mult decât ai cerut pe produs';
I18N.ro['coach.loss.t'] = '<b>Pragul de rentabilitate</b> e numărul de produse pe care trebuie să le vinzi doar ca să-ți acoperi costurile. Vinde unul în plus și ești pe profit.';
I18N.ro['coach.mkROI'] = 'Reclama a adus lume, dar ai cheltuit {spent} ca să câștigi {net}. Încearcă mâine jumătate și vezi dacă profitul crește.';
I18N.ro['coach.mkROI.t'] = '<b>Randamentul investiției (ROI)</b> — banii cheltuiți au adus înapoi mai mult decât au costat? Dacă nu, cheltuie mai puțin.';
I18N.ro['coach.staff'] = 'Ajutorul tău a costat {cost}, dar ai servit doar {n} — te descurcai și singur. Angajează ajutor în zilele aglomerate, nu în cele liniștite.';
I18N.ro['coach.staff.t'] = '<b>Costurile fixe</b> se plătesc indiferent dacă ai treabă sau nu. Dacă adaugi unul într-o zi slabă, îți mănâncă profitul.';
I18N.ro['coach.great'] = 'Zi excelentă — ai păstrat {n} din fiecare dolar. Acum gândește mai în mare: o îmbunătățire costă o singură dată și te ajută în fiecare zi de atunci încolo.';
I18N.ro['coach.great.t'] = 'A <b>investi</b> înseamnă să cheltuiești azi ca să câștigi mai mult mai târziu. Firma și lada frigorifică se plătesc singure cam într-o săptămână.';
I18N.ro['coach.steady'] = 'O zi constantă și profitabilă. Încearcă mâine un singur experiment — schimbă doar <i>un</i> lucru, cum ar fi prețul sau rețeta, ca să știi ce anume a făcut diferența.';
I18N.ro['coach.steady.t'] = '<b>Testarea</b> e felul în care învață fondatorii adevărați. Schimbă câte un lucru pe rând, altfel nu vei ști niciodată care schimbare a funcționat.';

I18N.en['coach.nothing'] = 'You did not sell a single thing today. Check two things before tomorrow: did you actually buy the ingredients, and is your price wildly higher than what people expect to pay?';
I18N.en['coach.nothing.t'] = '<b>No revenue</b> with costs still going out is the fastest way to run out of cash. Every day the rent gets paid whether you sell or not.';
I18N.en['coach.stockout'] = 'You ran out! About {n} wanted to buy and you had nothing to sell them — roughly {v} walked away. Buy more supplies tomorrow.';
I18N.en['coach.stockout.t'] = '<b>Stockout</b> — running out of what customers want. It costs you today\'s sale <i>and</i> a bit of reputation, because people remember a wasted trip.';
I18N.en['coach.capacity'] = 'Your line was too long. About {n} gave up waiting. Hiring a helper costs {cost} but lets you serve {cap} more — worth it on a busy day.';
I18N.en['coach.capacity.t'] = '<b>Capacity</b> is how much you can actually make and serve. Demand you cannot serve is not a sale — it is a missed one.';
I18N.en['coach.waste'] = 'You threw away {v} of spoiled supplies. That is real money in the bin. Buy closer to what you can actually sell, or grab a cooler so less melts.';
I18N.en['coach.waste.t'] = '<b>Waste</b> is stock you paid for but never sold. It is why real shops watch the weather before ordering.';
I18N.en['coach.priceHigh'] = 'Your {name} price is high for a day like today, so fewer people bought. Sometimes a lower price makes <i>more</i> total profit because so many more people say yes.';
I18N.en['coach.priceHigh.t'] = '<b>Price sensitivity</b> — when you raise the price, some customers walk away. The trick is finding the price where price × customers is biggest.';
I18N.en['coach.priceLow'] = 'You had a great crowd, but you are selling almost at cost. Try nudging your {name} price up by 25¢ — you will lose a few customers and still make more money.';
I18N.en['coach.priceLow.t'] = '<b>Margin</b> is the profit in each sale. A long line at a tiny margin can still add up to a tiny profit.';
I18N.en['coach.loss'] = 'You lost {v} today. {why}. Look at the break-even number tomorrow before you open.';
I18N.en['coach.loss.whyFixed'] = 'Your sales did not cover rent and the other fixed costs';
I18N.en['coach.loss.whyCogs'] = 'Your ingredients cost more than what you charged';
I18N.en['coach.loss.t'] = '<b>Break-even</b> is the number of items you must sell just to cover costs. Sell one more than that and you are in profit.';
I18N.en['coach.mkROI'] = 'Marketing brought people in, but you spent {spent} to make {net}. Try half as much tomorrow and see if profit goes up.';
I18N.en['coach.mkROI.t'] = '<b>Return on investment (ROI)</b> — did the money you spent bring back more than it cost? If not, spend less.';
I18N.en['coach.staff'] = 'Your helper cost {cost} but you only served {n} — you could have handled that alone. Hire help on the busy days, not the quiet ones.';
I18N.en['coach.staff.t'] = '<b>Fixed costs</b> get paid whether you are busy or not. Adding one on a slow day eats your profit.';
I18N.en['coach.great'] = 'Excellent day — you kept {n} of every dollar. Now think bigger: an upgrade costs money once and helps you every single day after.';
I18N.en['coach.great.t'] = '<b>Investing</b> means spending today so you earn more later. The Sign and the Cooler pay for themselves in about a week.';
I18N.en['coach.steady'] = 'A steady, profitable day. Try one experiment tomorrow — change just <i>one</i> thing, like the price or the recipe, so you can tell what actually made the difference.';
I18N.en['coach.steady.t'] = '<b>Testing</b> is how real founders learn. Change one thing at a time or you will never know which change worked.';

/* ---------------------------------------------------------------- */

var LANG_KEY = 'bossOfTheBlock.lang';
var LANG = (function () {
  try {
    var s = localStorage.getItem(LANG_KEY);
    if (s && I18N[s]) return s;
  } catch (e) {}
  return 'ro';
})();

function setLang(code) {
  if (!I18N[code]) return;
  LANG = code;
  try { localStorage.setItem(LANG_KEY, code); } catch (e) {}
}

/* Romanian puts "de" between a number and its noun once you pass 20:
   19 clienți, but 20 de clienți — and 101 clienți again. */
function nDe(n, noun) {
  if (!noun) return String(n);
  if (LANG !== 'ro') return n + ' ' + noun;
  var r = n % 100;
  return n + (n >= 20 && !(r >= 1 && r <= 19) ? ' de ' : ' ') + noun;
}

/* the game speaks Fahrenheit internally; Romanian readers get Celsius */
function temp(f) {
  return LANG === 'ro' ? Math.round((f - 32) * 5 / 9) + '°C' : f + '°F';
}

/* t('some.key', {n: 3}) — missing keys fall back to English, then to the key */
function t(key, vars) {
  var s = I18N[LANG][key];
  if (s === undefined) s = I18N.en[key];
  if (s === undefined) return key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, function (m, name) {
      return vars[name] !== undefined ? vars[name] : m;
    });
  }
  return s;
}

/* fill every element carrying a data-i18n* attribute */
function applyStaticStrings(root) {
  root = root || document;
  var q = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
  q('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
  q('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  q('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
  q('[data-i18n-title]').forEach(function (el) {
    var s = t(el.getAttribute('data-i18n-title'));
    el.title = s; el.setAttribute('aria-label', s);
  });
  document.title = t('doc.title');
  document.documentElement.lang = LANG;
}
