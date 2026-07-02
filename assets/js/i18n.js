/* ============================================================
   TNY Romania Tour - i18n (EN default, AM toggle)
   Translates by exact English text node, so no HTML markup
   needs restructuring. Choice persists in localStorage.
   ============================================================ */
(function () {
  'use strict';

  /* Normalize Romanian diacritic codepoint variants (comma-below vs
     cedilla) so lookups match regardless of which form the source used. */
  function norm(s) {
    return s
      .replace(/ș/g, 'ş').replace(/Ș/g, 'Ş')       // ș Ș
      .replace(/ț/g, 'ţ').replace(/Ț/g, 'Ţ')       // ț Ț
      .replace(/[\u2018\u2019]/g, "'")            // curly apostrophes -> '
      .replace(/[\u201C\u201D]/g, '"');           // curly quotes -> "
  }

  /* AM dictionary: key = exact English (as rendered), value = Armenian. */
  var AM_RAW = {
    /* --- nav / global --- */
    "Skip to content": "Անցնել բովանդակությանը",
    "About": "Մեր մասին",
    "Agenda": "Ծրագիր",
    "Destinations": "Ուղղություններ",
    "Stay": "Կեցություն",
    "Safety": "Անվտանգություն",
    "Pricing": "Գին",
    "Contact": "Կապ",
    "Reserve a Place": "Ամրագրել տեղ",
    "Explore": "Բացահայտել",
    "Follow": "Հետևեք",

    /* --- hero --- */
    "Discover": "Բացահայտի՛ր",
    "Romania": "Ռումինիան",

    /* --- trust bar --- */
    "26 Oct – 2 Nov": "հոկտ. 26 – նոյ. 2",
    "8 days": "8 օր",
    "7 nights": "7 գիշեր",

    /* --- about --- */
    "Discover Romania with us 🇷🇴": "Բացահայտե՛ք Ռումինիան TNY-ի հետ։ 🇷🇴",
    "Join us on a fascinating educational tour to Romania. We will visit Bucharest, Brasov and Sinaia, explore the legendary castles of Dracula and Peles, the Slanic salt mine, Rasnov fortress and many other remarkable landmarks.": "Այս յուրահատուկ կրթաճանաչողական ճամփորդության ընթացքում կայցելենք Ռումինիայի ամենահայտնի քաղաքներն ու տեսարժան վայրերը՝ Բուխարեստ, Բրասով, Սինայա, Դրակուլայի ամրոց, Պելեշի պալատ և Սլանիկի աղի հանք։ Մասնակիցներին սպասում են հետաքրքիր էքսկուրսիաներ, մշակութային բացահայտումներ, նոր ընկերներ և անմոռանալի փորձառություններ՝ TNY-ի փորձառու թիմի ուղեկցությամբ։",
    "Participants can look forward to exciting excursions, cultural discoveries, entertainment, shopping and unforgettable memories in a unique European setting.": "Այս ճամփորդությունը հիանալի հնարավորություն է համատեղելու ուսուցումը, ժամանցը և եվրոպական միջավայրի բացահայտումը։ ✨",
    "From our previous tours": "Մեր նախորդ տուրերից",
    "View more from previous tours": "Տեսնել ավելին նախորդ տուրերից",

    /* --- itinerary header --- */
    "The complete agenda": "Ամբողջական ծրագիր",
    "Bucharest, Transylvania and back. Every day planned, every detail covered.": "Բուխարեստ, Տրանսիլվանիա և վերադարձ։ Ամեն օրը պլանավորված, ամեն մանրուքը՝ հոգացված։",
    "Breakfast is included daily. All other meals are at your own arrangement.": "Մեր փաթեթում ներառված է միայն նախաճաշը։",

    /* --- itinerary day titles --- */
    "Arrival in Bucharest": "Ժամանում Բուխարեստ",
    "Bucharest guided city tour": "Բուխարեստի քաղաքային տուր",
    "Slanic Salt Mine & transfer to Brașov": "Սլանիկի աղի հանք և Բրասով",
    "Bran Castle & Râșnov Fortress": "Բրանի ամրոց և Ռաշովի բերդ",
    "Peleș Castle & Sinaia": "Պելեշի ամրոց և Սինայա",
    "Parliament, art & culture": "Խորհրդարանի շենք, արվեստի թանգարան",
    "Presidential Palace & Old Town": "Նախագահական պալատ և հին քաղաք",
    "Departure": "Մեկնում",

    /* --- itinerary day metas --- */
    "Monday, October 26 · Overnight: Ibis Styles Bucharest City Center": "Երկուշաբթի, հոկտեմբերի 26 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Tuesday, October 27 · Overnight: Ibis Styles Bucharest City Center": "Երեքշաբթի, հոկտեմբերի 27 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Wednesday, October 28 · Overnight: Pensiunea Casa Bono, Brașov": "Չորեքշաբթի, հոկտեմբերի 28 · Գիշերակաց՝ Pensiunea Casa Bono, Բրասով",
    "Thursday, October 29 · Overnight: Pensiunea Casa Bono, Brașov": "Հինգշաբթի, հոկտեմբերի 29 · Գիշերակաց՝ Pensiunea Casa Bono, Բրասով",
    "Friday, October 30 · Overnight: Ibis Styles Bucharest City Center": "Ուրբաթ, հոկտեմբերի 30 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Saturday, October 31 · Overnight: Ibis Styles Bucharest City Center": "Շաբաթ, հոկտեմբերի 31 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Sunday, November 1 · Overnight: Ibis Styles Bucharest City Center": "Կիրակի, նոյեմբերի 1 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Monday, November 2 · Flight home": "Երկուշաբթի, նոյեմբերի 2 · Թռիչք տուն",

    /* --- itinerary schedule items --- */
    "Flight to Bucharest (2.5 hours, local times)": "Թռիչք դեպի Բուխարեստ (2.5 ժամ, տեղական ժամանակ)",
    "Passport control": "Անձնագրային ստուգում",
    "Transfer to hotel (Ibis Styles Bucharest City Center)": "Տրանսֆեր դեպի հյուրանոց (Ibis Styles Bucharest City Center)",
    "Check in": "Check In",
    "Lunch and rest at hotel": "Սնվելու և հանգստի ժամ հյուրանոցում",
    "Evening walk (Cișmigiu Garden, Revolution Square) and dinner": "Զբոսանք ( Cișmigiu Garden, Piața Revoluției ) և ընթրիք",
    "Lights out": "Ինքնապատրաստության ժամ և քուն",
    "Breakfast": "Նախաճաշ",
    "Guided city excursion with licensed guide": "Քաղաքային Էքսկուրսիա գիդի ուղեկցությամբ",
    "Lunch": "Ճաշ",
    "Rest at hotel": "Հանգստի ժամ հյուրանոցում",
    "Walk": "Զբոսանք",
    "Dinner and shopping at AFI Shopping Center": "Ընթրիք և գնումներ AFI Shopping Center",
    "Depart Bucharest for Slanic Salt Mine and planetarium": "Մեկնում Բուխարեստից Սլանիկ Աղի հանք, պլանետորիում",
    "Arrive in Brașov": "ժամանում Բրասով",
    "Hotel check-in (Pensiunea Casa Bono)": "Hotel Check in (Pensiunea Casa Bono - Cazare Brasov)",
    "Dinner and evening walk": "Ընթրիք (Mc Donalds) և զբոսանք",
    "Transfer to Bran Castle": "Տրանսֆեր դեպի Դրակուլայի ամրոց",
    "Excursion at Bran (Dracula's) Castle": "էքսկուրսիա Դրակուլայի ամրոցում",
    "Picnic lunch": "Picnic with take away from MacDonalds",
    "Râșnov Fortress": "Rasnov Fortress",
    "Return to Brașov": "Վերադարձ Բրասով",
    "City walking tour of Brașov": "Քաղաքային էքսկուրսիա Բրասովում",
    "Dinner": "Ընթրիք",
    "Transfer to Sinaia": "Տրանսֆեր դեպի Սինայա",
    "Peleș Castle tour": "Պելեյի ամրոց",
    "Lunch (Restaurant Avalanche)": "Ճաշ (Restaurant Avalanche)",
    "City tour of Sinaia": "Քաղաքային տուր Սինայայում",
    "Return to Bucharest": "Վերադարձ Բուխարեստ",
    "Hotel check-in": "Hotel check in",
    "Dinner and walk": "Ընթրիք+ Զբոսանք",
    "Bucharest National Art Gallery": "Այցելություն Բուխարեստի Ազգային Պատկերասրահ",
    "Guided tour of the Palace of the Parliament": "Էքսկուրսիա Բուխարեստի Պարլամենտում",
    "Lunch (Unirea Shopping Center)": "Ճաշ (Unirea Shopping Center)",
    "Cărturești Carusel, Europe's most beautiful bookstore": "Այցելություն Եվրոպայի ամենագեղեցիկ գրախանութը",
    "Return to hotel": "Վերադարձ հյուանոց",
    "Rest and games night (dinner in rooms)": "Հանգիստ և ժամանցային խաղեր (ընթրիքը սենյակներում խաղերին զուգահեռ)",
    "Visit to the Romanian President's residence (Cotroceni Palace)": "Այցելություն Ռումինաիյի նախագահի նստավայր",
    "Shopping at AFI Shopping Center": "Գնումներ AFI Shopping Center",
    "Lunch (AFI Shopping Center)": "Ճաշ (AFI Shopping Center)",
    "Old Town walk and farewell dinner": "Զբոսանք Old Town-ում և ընթրիք",
    "Pack and check out": "Պատրաստվել և Check Out",
    "Transfer to airport": "Տրանսֆեր դեպի օդանավակայան",
    "Flight home (2.5 hours, local times)": "Թռիչք (2.5 ժամ տևողությամբ)",

    /* --- itinerary tags --- */
    "Cișmigiu Garden": "Չիշմիջիու այգի",
    "Revolution Square": "Հեղափոխության հրապարակ",
    "Guided city tour": "Քաղաքային շրջայց",
    "Slanic Salt Mine": "Սլանիկի աղահանք",
    "Planetarium": "Մոլորակացույց",
    "Brașov": "Բրասով",
    "Bran Castle": "Բրանի ամրոց",
    "Brașov walking tour": "Բրասովի շրջայց",
    "Peleș Castle": "Պելեշի ամրոց",
    "Sinaia": "Սինայա",
    "National Art Gallery": "Ազգային արվեստի պատկերասրահ",
    "Parliament": "Խորհրդարան",
    "Games night": "Խաղերի երեկո",
    "Cotroceni Palace": "Կոտրոչենի պալատ",
    "Old Town": "Հին քաղաք",
    "Farewell dinner": "Հրաժեշտի ընթրիք",
    "Airport transfer": "Տեղափոխում օդանավակայան",
    "Flight home": "Թռիչք տուն",

    /* --- destinations heading --- */
    "Where you'll go": "Ու՞ր եք գնալու",

    /* --- destinations panels --- */
    "Days 1–2, 5–8": "Օրեր 1–2, 5–8",
    "Day 3": "Օր 3",
    "Days 3–5": "Օրեր 3–5",
    "Day 5": "Օր 5",
    "Day 4": "Օր 4",
    "Day 6": "Օր 6",
    "Day 7": "Օր 7",
    "Bucharest": "Բուխարեստ",
    "Palace of the Parliament": "Խորհրդարանի պալատ",
    "Bucharest Old Town": "Բուխարեստի Հին քաղաք",
    "View gallery": "Տեսնել պատկերասրահը",
    "Belle Époque boulevards, the colossal Parliament and a café-filled Old Town. Your base for five of the eight nights.": "«Belle Époque»-ի նրբաճաշակ ճարտարապետությունը, լայն պողոտաները և աշխույժ եվրոպական մթնոլորտը Բուխարեստը դարձնում են Ռումինիայի ամենահմայիչ քաղաքներից մեկը։",
    "A cathedral of salt 200 metres underground, with a planetarium, sculptures and an illuminated lake.": "Սլանիկի աղի հանքը — Եվրոպայի ամենատպավորիչ ստորգետնյա հրաշալիքներից մեկը, որտեղ հսկայական աղե սրահները, յուրահատուկ միկրոկլիման և անսովոր տեսարանները ստեղծում են անմոռանալի փորձառություն։",
    "A medieval Saxon town under Tâmpa mountain. Pastel squares, Gothic spires and a lively promenade.": "Բրասով — Ռումինիայի ամենագեղեցիկ քաղաքներից մեկը, որտեղ միջնադարյան ճարտարապետությունը, սալահատակ փողոցներն ու Կարպատյան լեռների հիասքանչ տեսարանները ստեղծում են յուրահատուկ եվրոպական մթնոլորտ։",
    "Romania's fairy-tale royal palace in the Carpathian forests above Sinaia.": "Պելեշ ամրոց — Ռումինիայի թագավորական գոհարը։ Կարպատյան լեռների գրկում գտնվող այս շքեղ պալատը հիացնում է իր նրբաճաշակ ճարտարապետությամբ, հարուստ պատմությամբ և հեքիաթային գեղեցկությամբ։",
    "The cliff-top fortress the world knows as Dracula's Castle.": "Բրան ամրոց — պատմության և առեղծվածի կատարյալ համադրություն։ Ամպերին հասնող աշտարակներով և դարավոր լեգենդներով այն բացահայտում է Ռումինիայի ամենահետաքրքիր պատմություններից մեկը։",
    "The heaviest building on Earth. Over 1,000 rooms of marble, crystal and carved wood.": "Խորհրդարանի պալատ — ուժի, ճարտարապետության և պատմության տպավորիչ խորհրդանիշ։ Աշխարհի ամենամեծ վարչական շենքերից մեկը, որը հիացնում է իր հսկայական չափերով և շքեղ ինտերիերով։",
    "Cobbled Lipscani lanes, grand arcades and the ornate CEC Palace. The farewell-night setting.": "Բուխարեստի Հին Քաղաք — քաղաքի ամենահետաքրքիր և գունեղ անկյունը։ Սալահատակ փողոցները, պատմական շենքերն ու հարմարավետ սրճարանները ստեղծում են յուրահատուկ եվրոպական մթնոլորտ։",

    /* --- accommodation --- */
    "Where you'll stay": "ՈՐՏԵՂ ԷՔ ՄՆԱԼՈՒ",
    "5 nights": "5 գիշեր",
    "2 nights": "2 գիշեր",
    "District 1, central Bucharest": "1-ին շրջան, կենտրոնական Բուխարեստ",
    "Centrul Nou, Brașov": "Centrul Nou, Բրասով",
    "A modern hotel between Gara de Nord and the Old Town, with a restaurant, gym and lobby bar. Breakfast every morning.": "Ժամանակակից հյուրանոց՝ Gara de Nord-ի և Հին քաղաքի միջև։ Ռեստորան, մարզասրահ և լոբբի-բար։ Նախաճաշ ամեն առավոտ։",
    "A family-run guesthouse in the centre of Brașov. Quiet terrace and breakfast every morning.": "Ընտանեկան հյուրատուն՝ Բրասովի կենտրոնում։ Հանգիստ տեռաս և նախաճաշ ամեն առավոտ։",
    "Breakfast included": "Նախաճաշը ներառված է",
    "Free Wi-Fi": "Անվճար Wi-Fi",
    "Central, walkable area": "Կենտրոնական, քայլելու հարմար տարածք",
    "Walkable to Old Town": "Քայլելու հեռավորության վրա Հին քաղաքից",
    "*Hotels may change depending on availability or group size. Any replacement will be of equal or higher standard.": "*Հյուրանոցները կարող են փոխվել կախված խմբի չափից։ Փոխարինող հյուրանոցը կլինի հավասար կամ ավելի բարձր մակարդակի։",

        /* --- safety --- */
    "Why trust us with your child's journey?": "Ինչու՞ վստահել ձեր երեխայի ճանապարհորդություննը մեզ",
    "Experienced supervisors": "Փորձառու ուղեկցողներ",
    "Specialists working with children, ensuring constant supervision and support throughout the journey.": "Երեխաների հետ աշխատող մասնագետներ, որոնք ապահովում են մշտական վերահսկողություն և աջակցություն ամբողջ ուղևորության ընթացքում։",
    "Safe and vetted programme": "Անվտանգ և ստուգված ծրագիր",
    "A carefully planned itinerary, trusted partners and pre-vetted services for children's safety.": "Մանրակրկիտ պլանավորված երթուղի, վստահելի գործընկերներ և նախապես ստուգված ծառայություններ՝ երեխաների անվտանգության համար։",
    "24/7 parent updates": "24/7 կապ ծնողների հետ",
    "Parents are kept informed about the group's location, programme progress and important events.": "Ծնողները մշտապես տեղեկացված են խմբի գտնվելու վայրի, ծրագրի ընթացքի և կարևոր իրադարձությունների մասին։",
    "Individual attention": "Անհատական ուշադրություն",
    "Every child receives the care, support and attention they need throughout the journey.": "Յուրաքանչյուր երեխա ստանում է անհրաժեշտ հոգատարություն, աջակցություն և ուշադրություն՝ ճանապարհորդության ողջ ընթացքում։",
    "Trusted accommodation and transport": "Վստահելի կացություն և տրանսպորտ",
    "Hand-picked hotels and comfortable transport meeting our safety standards.": "Ընտրված հյուրանոցներ և հարմարավետ տրանսպորտ՝ համապատասխան անվտանգության չափանիշներին։",
    "Your coordinators": "Ձեր կոորդինատորները",
    "Yura Barseghyan": "Յուրա Բարսեղյան",
    "Founder & Director": "Հիմնադիր և տնօրեն",
    "TNY Educational Centre": "TNY ուսումնական կենտրոն",
    "Narine Galoyan": "Նարինե Գալոյան",
    "Co-founder & Pedagogue": "Համահիմնադիր և մանկավարժ",
    "Sargis Sargsyan": "Սարգիս Սարգսյան",
    "Tour Organiser": "Տուրի կազմակերպիչ",
    "Tourism Specialist": "Տուրիզմի մասնագետ",

        /* --- pricing & includes --- */
    "Price": "Արժեք",
    "8 days / 7 nights. €300 deposit *non-refundable": "8օր/7գիշեր. €300 կանխավճար *վերադարձի ենթակա չէ",
    "Included": "Ներառված է",
    "Not included": "Ներառված չէ",
    "Round-trip flights": "երկկողմանի ավիատոմս",
    "Visa support": "վիզայի աջակցություն",
    "Hotel": "հյուրանոց",
    "Private transport": "անհատական ուղևորապոխադրում",
    "Entrance fees per programme": "մուտքավճարներ ըստ ծրագրի",
    "Medical insurance": "բժշկական ապահովագրություն",
    "Lunch and dinner ~€30/day": "ճաշ և ընթրիք ~30 euro / օր",
    "Consular service fee ~€35": "հյուպատոսական ծառայության վճար ~35 euro",
    "Entrance fees and transport for off-programme visits": "ծրագրից դուրս վայրեր այցելությունների մուտքավճարներ և տրանսպորտ",
    "Contact us for the full payment schedule and cancellation policy.": "Կապվեք մեզ հետ վճարման ամբողճական ժամանակացույցի և չեղարկման քաղաքականության համար։",

        /* --- testimonials --- */
    "Parents who were nervous, and glad they said yes": "Կարծիքներ մեր նախորդ տուրի մասնակիցներից",

    /* --- contact --- */
    "For detailed information": "Մանրամասն տեղեկատվության համար",
    "Get in touch": "Կապ հաստատեք",

    /* --- footer --- */
    "Online and offline English education for students since 2014. Tour organized in partnership with Luna Tour.": "Առցանց և առկա անգլերենի կրթություն աշակերտների համար 2014 թվականից։ Ճամփորդությունը կազմակերպվում է Luna Tour-ի հետ համագործակցությամբ։",
    "Ejmiatsin:": "Էջմիածին՝",
    "Spandaryan St. 1b": "Սպանդարյան փ. 1բ",
    "Yerevan:": "Երևան՝",
    "Andraniki St. 10/3": "Անդրանիկի փ. 10/3",

    /* --- destination modal (built dynamically) --- */
    "Highlights": "Տեսարժան վայրեր",
    "Days 1–2 & 5–8": "Օրեր 1–2 և 5–8",
    "Romania's capital and your base for five of the eight nights. Belle Époque boulevards once earned it the nickname “Little Paris”; today grand institutions sit beside a lively, café-filled Old Town.": "Ռումինիայի մայրաքաղաքը և ձեր կացարանը ութ գիշերից հինգի համար։ Belle Époque-ի պողոտաները ժամանակին նրան բերել են «Փոքրիկ Փարիզ» մականունը. այսօր շքեղ շինությունները հարևանում են աշխույժ, սրճարաններով լի Հին քաղաքին։",
    "An immense salt mine more than 200 metres underground, on the road from Bucharest to Brașov. Vast cathedral-like chambers carved from rock salt, with a planetarium, sculptures, an illuminated lake and famously pure air.": "Հսկայական աղահանք՝ ավելի քան 200 մետր ընդհատակ, Բուխարեստից Բրասով տանող ճանապարհին։ Ժայռային աղից փորված տաճարանման ընդարձակ դահլիճներ՝ մոլորակացույցով, քանդակներով, լուսավորված լճով և հանրահայտ մաքուր օդով։",
    "A medieval Saxon town at the foot of Tâmpa mountain, and your base for two nights in Transylvania. Pastel merchant houses, Gothic spires and one of Europe's liveliest pedestrian streets.": "Միջնադարյան սաքսոնական քաղաք Թամպա լեռան ստորոտին և ձեր կացարանը Տրանսիլվանիայում երկու գիշերվա համար։ Պաստելային վաճառականական տներ, գոթական աշտարակներ և Եվրոպայի ամենաաշխույժ հետիոտնային փողոցներից մեկը։",
    "Romania's fairy-tale royal palace, built for King Carol I in the Carpathian forests above Sinaia. A Neo-Renaissance masterpiece of carved wood, stained glass and more than 160 rooms.": "Ռումինիայի հեքիաթային արքայական պալատը՝ կառուցված Կարոլ I թագավորի համար Կարպատների անտառներում՝ Սինայայից վեր։ Նեո-Վերածննդի գլուխգործոց՝ փորագրված փայտով, վիտրաժներով և ավելի քան 160 սենյակով։",
    "The cliff-top fortress known the world over as “Dracula's Castle.” The legend of Bram Stoker's count meets the real history of Vlad Țepeș and Queen Marie, perched between Transylvania and Wallachia.": "Ժայռի գագաթին կանգնած ամրոցը, որն ամբողջ աշխարհում հայտնի է որպես «Դրակուլայի ամրոց»։ Բրեմ Սթոքերի կոմսի լեգենդն այստեղ հանդիպում է Վլադ Ցեպեշի և Մարիա թագուհու իրական պատմությանը՝ Տրանսիլվանիայի և Վալախիայի սահմանին։",
    "The heaviest building on earth and one of the largest, with over 1,000 rooms of marble, crystal and carved wood. A guided tour reveals a fraction of its staggering scale.": "Երկրի ամենածանր և ամենամեծ շենքերից մեկը՝ ավելի քան 1000 սենյակով՝ մարմարից, բյուրեղից և փորագրված փայտից։ Ուղեկցվող շրջայցը բացահայտում է նրա ապշեցուցիչ մասշտաբի միայն մի մասը։",
    "Bucharest's historic Lipscani quarter: cobblestone lanes of cafés, bookshops and 19th-century arcades, crowned by the ornate dome of the CEC Palace. The setting for the farewell dinner walk.": "Բուխարեստի պատմական Lipscani թաղամասը՝ սրճարանների, գրախանութների և 19-րդ դարի սրահների սալարկված նրբանցքներ՝ պսակված CEC պալատի զարդարուն գմբեթով։ Հրաժեշտի ընթրիքի զբոսանքի վայրը։",
    "Guided city tour with a licensed guide": "Քաղաքային շրջայց լիցենզավորված գիդով",
    "The Romanian Athenaeum & Revolution Square": "Ռումինական Աթենեումը և Հեղափոխության հրապարակը",
    "Cișmigiu Garden in the city centre": "Չիշմիջիու այգին քաղաքի կենտրոնում",
    "National Art Gallery & Cărturești Carusel": "Ազգային արվեստի պատկերասրահը և Cărturești Carusel-ը",
    "Cathedral-sized salt chambers": "Տաճարի չափ աղի դահլիճներ",
    "An underground planetarium": "Ստորգետնյա մոլորակացույց",
    "Salt sculptures & an illuminated lake": "Աղի քանդակներ և լուսավորված լիճ",
    "Famously pure, salty air": "Հանրահայտ մաքուր, աղի օդ",
    "Council Square (Piața Sfatului)": "Խորհրդի հրապարակ (Piața Sfatului)",
    "The Gothic Black Church": "Գոթական Սև եկեղեցին",
    "The Strada Republicii promenade": "Strada Republicii զբոսայգին",
    "Mountain views from Tâmpa": "Լեռնային տեսարաններ Թամպայից",
    "Guided tour of the state rooms": "Պետական դահլիճների ուղեկցվող շրջայց",
    "Built for King Carol I, 1873–1914": "Կառուցված Կարոլ I թագավորի համար, 1873–1914",
    "Among the first castles with its own electricity": "Առաջին ամրոցներից, որ ունեցել է սեփական էլեկտրականություն",
    "The forests and town of Sinaia": "Սինայայի անտառներն ու քաղաքը",
    "Guided tour of the castle": "Ամրոցի ուղեկցվող շրջայց",
    "The Dracula legend & the real history": "Դրակուլայի լեգենդը և իրական պատմությունը",
    "Once Queen Marie's residence": "Ժամանակին Մարիա թագուհու նստավայրն էր",
    "Râșnov Fortress the same day": "Ռըշնովի բերդը՝ նույն օրը",
    "Guided tour of the interior": "Ներսի ուղեկցվող շրջայց",
    "Marble halls & crystal chandeliers": "Մարմարե դահլիճներ և բյուրեղյա ջահեր",
    "Around 1,100 rooms": "Շուրջ 1100 սենյակ",
    "Sweeping views from the terrace": "Լայն տեսարաններ տեռասից",
    "Strada Covaci & the Lipscani lanes": "Strada Covaci-ն և Lipscani-ի նրբանցքները",
    "The ornate CEC Palace": "Զարդարուն CEC պալատը",
    "Cafés and the farewell dinner": "Սրճարաններ և հրաժեշտի ընթրիք",
    "The Old Town after dark": "Հին քաղաքը մթնշաղից հետո",
    /* facts keys */
    /* facts values */
    "Wallachia · capital": "Վալախիա · մայրաքաղաք",
    "Days 1, 2, 5–8": "Օրեր 1, 2, 5–8",
    "History, architecture, shopping": "Պատմություն, ճարտարապետություն, գնումներ",
    "Salt mine · natural site": "Աղահանք · բնական վայր",
    "About 2½ hours": "Մոտ 2½ ժամ",
    "Transylvania": "Տրանսիլվանիա",
    "Medieval history, walking": "Միջնադարյան պատմություն, զբոսանք",
    "Royal castle": "Արքայական ամրոց",
    "Medieval castle": "Միջնադարյան ամրոց",
    "14th century": "14-րդ դար",
    "Civic landmark": "Քաղաքային խորհրդանիշ",
    "Lipscani · Old Town": "Lipscani · Հին քաղաք",
    "Dining, strolling": "Ճաշ, զբոսանք",
    /* captions */
    "The skyline at dusk": "Համայնապատկերը մթնշաղին",
    "The Romanian Athenaeum": "Ռումինական Աթենեումը",
    "Central University Library": "Կենտրոնական համալսարանական գրադարան",
    "The main underground hall": "Գլխավոր ստորգետնյա դահլիճը",
    "The planetarium dome": "Մոլորակացույցի գմբեթը",
    "Salt sculptures": "Աղի քանդակներ",
    "The illuminated lake": "Լուսավորված լիճը",
    "Council Square from above": "Խորհրդի հրապարակը վերևից",
    "Pastel merchant facades": "Պաստելային վաճառականական ճակատներ",
    "The Black Church": "Սև եկեղեցին",
    "The Black Church at sunset": "Սև եկեղեցին մայրամուտին",
    "Tampa mountain and the BRASOV sign": "Թամպա լեռը և BRASOV ցուցանակը",
    "Red rooftops below the hills": "Կարմիր տանիքները բլուրների ստորոտին",
    "Cobbled old-town lanes": "Հին քաղաքի սալարկված նրբանցքներ",
    "The old town in winter": "Հին քաղաքը ձմռանը",
    "Peleș Castle, Sinaia": "Պելեշի ամրոցը, Սինայա",
    "Bran Castle on its cliff": "Բրանի ամրոցը իր ժայռի վրա",
    "The Palace of the Parliament": "Խորհրդարանի պալատը",
    "Detail of the facade": "Ճակատի մանրամասն",
    "Unirii Boulevard from the Parliament terrace": "Unirii պողոտան Խորհրդարանի տեռասից",
    "The CEC Palace dome at dusk": "CEC պալատի գմբեթը մթնշաղին",
    "Old-town cafés": "Հին քաղաքի սրճարաններ",
    "The CEC Palace": "CEC պալատը",
    "The castle from the hillside": "Ամրոցը լեռից",
    "Aerial view amid the Carpathian forest": "Օդային տեսարանը Կարպատների անտառում",
    "The Neo-Renaissance towers": "Նեո-Վերածնունդյան աշտարակները",
    "Peleș in early autumn": "Պելեշը վաղ աշունին",
    "The castle from the garden": "Ամրոցը այգից",
    "The castle from below": "Ամրոցը ներքեվից",
    "Bran Castle at dusk": "Բրանի ամրոցը մթնշաղին",
    "Drone view of the tower": "Օդային տեսարանը աշտարակից",
    "Inside the courtyard": "Բակումի ներսը",
    "The castle in clear sky": "Ամրոցը պայծառ երկինքի տակ",
    "The Parliament from the boulevard": "Խորհրդարանը պողոտայից",
    "Unirii fountain and the Palace": "Unirii շատրվանը և պալատը",
    "The CEC dome from the lanes": "CEC գմբեթը նրբանցքներից",
    "Evening on the cobblestones": "Երեկո սալարկի վրա",
    "The vertical shaft": "Խոր շախտան",
    "Walkways deep underground": "Խոր ստորգետնյա անցքներ",

    /* --- control labels (aria) --- */
    "Menu": "Մենյու",
    "Close menu": "Փակել մենյուն",
    "Close gallery": "Փակել պատկերասրահը",
    "Parent reviews": "Ծնողների կարծիքներ",
    "Previous photo": "Նախորդ լուսանկարը",
    "Next photo": "Հաջորդ լուսանկարը",

    /* --- UI buttons, landmarks & gallery alts (audit) --- */
    "Back": "Հետ",
    "Next": "Հաջորդ",
    "Previous": "Նախորդ",
    "Primary": "Հիմնական",
    "Trip facts": "Ճամփորդության տվյալներ",
    "Group at castle ruins": "Խումբը ամրոցի ավերակների մոտ",
    "Group at palace": "Խումբը պալատի մոտ",
    "Scenic European town": "Գեղատեսիլ եվրոպական քաղաք",
    "European rooftops": "Եվրոպական տանիքներ",
    "Friends": "Ընկերներ",
    "Town square": "Քաղաքի հրապարակ"
  };

  /* Build a normalized lookup so diacritic codepoint variants still match. */
  var DICT = {};
  Object.keys(AM_RAW).forEach(function (k) { DICT[norm(k)] = AM_RAW[k]; });

  function translate(s) {
    var key = norm(s.trim());
    var t = DICT[key];
    if (t === undefined) return null;
    var lead = (s.match(/^\s*/) || [''])[0];
    var trail = (s.match(/\s*$/) || [''])[0];
    return lead + t + trail;
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };

  function walkText(root, toAm) {
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p || SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.classList && p.classList.contains('lang-toggle')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = tw.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (toAm) {
        if (node.__en === undefined) {
          var t = translate(node.nodeValue);
          if (t !== null) { node.__en = node.nodeValue; node.nodeValue = t; }
        }
      } else if (node.__en !== undefined) {
        node.nodeValue = node.__en;
        delete node.__en;
      }
    });
  }

  var ATTRS = ['aria-label', 'alt', 'title'];
  function walkAttrs(root, toAm) {
    var els = [root].concat([].slice.call(root.querySelectorAll('*')));
    els.forEach(function (el) {
      if (!el.getAttribute) return;
      ATTRS.forEach(function (a) {
        var key = '__en_' + a;
        if (toAm) {
          if (el[key] === undefined && el.hasAttribute(a)) {
            var v = el.getAttribute(a), t = translate(v);
            if (t !== null) { el[key] = v; el.setAttribute(a, t); }
          }
        } else if (el[key] !== undefined) {
          el.setAttribute(a, el[key]);
          delete el[key];
        }
      });
    });
  }

  var lang = (function () {
    try { return localStorage.getItem('tny-lang') === 'en' ? 'en' : 'am'; }
    catch (e) { return 'am'; }
  })();

  var btn = null;
  function apply() {
    var toAm = lang === 'am';
    document.documentElement.lang = toAm ? 'hy' : 'en';
    walkText(document.body, toAm);
    walkAttrs(document.body, toAm);
    if (btn) {
      btn.textContent = toAm ? 'EN' : 'ՀԱՅ';
      btn.setAttribute('aria-label', toAm ? 'Switch to English' : 'Անցնել հայերենի');
    }
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('tny-lang', l); } catch (e) {}
    apply();
  }

  function init() {
    btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', function () { setLang(lang === 'am' ? 'en' : 'am'); });

    // dynamic gallery modal: translate freshly built content while in AM
    var modal = document.getElementById('destModal');
    if (modal && 'MutationObserver' in window) {
      new MutationObserver(function (muts) {
        if (lang !== 'am') return;
        muts.forEach(function (m) {
          [].forEach.call(m.addedNodes, function (node) {
            if (node.nodeType === 1) { walkText(node, true); walkAttrs(node, true); }
            else if (node.nodeType === 3 && node.parentNode) {
              var t = translate(node.nodeValue);
              if (t !== null && node.__en === undefined) { node.__en = node.nodeValue; node.nodeValue = t; }
            }
          });
        });
      }).observe(modal, { childList: true, subtree: true });
    }

    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
