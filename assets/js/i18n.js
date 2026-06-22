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
      .replace(/ș/g, 'ş').replace(/Ș/g, 'Ş')   // ș Ș
      .replace(/ț/g, 'ţ').replace(/Ț/g, 'Ţ');  // ț Ț
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
    "FAQ": "ՀՏՀ",
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
    "Why this tour": "Ինչո՞ւ այս ճամփորդությունը",
    "Discover Romania with us 🇷🇴": "Բացահայտե՛ք Ռումինիան մեզ հետ 🇷🇴",
    "Join us on a fascinating educational tour to Romania. We will visit Bucharest, Brasov and Sinaia, explore the legendary castles of Dracula and Peles, the Slanic salt mine, Rasnov fortress and many other remarkable landmarks.": "Միացե՛ք հետաքրքիր կրթաճանաչողական ճամփորդությանը դեպի Ռումինիա։ Ծրագրի ընթացքում կայցելենք Բուխարեստ, Բրասով և Սինայա քաղաքներ, կբացահայտենք Դրակուլայի և Պելեշի հայտնի ամրոցները, Սլանիկի աղի հանքը, Ռաշնովի ամրոցը և բազմաթիվ այլ տեսարժան վայրեր։",
    "Participants can look forward to exciting excursions, cultural discoveries, entertainment, shopping and unforgettable memories in a unique European setting.": "Մասնակիցներին սպասում են հետաքրքիր էքսկուրսիաներ, մշակութային բացահայտումներ, ժամանց, գնումներ և անմոռանալի հիշողություններ՝ եվրոպական յուրահատուկ միջավայրում։",
    "What you gain": "Ի՞նչ եք ստանում",
    "International experience": "Միջազգային փորձառություն",
    "Discover Europe's culture, history and everyday life through real travel.": "Բացահայտեք Եվրոպայի մշակույթը, պատմությունը և առօրյանը՝ իրական ճամփորդության միջոցով։",
    "Educational value": "Կրթական արժեք",
    "Visits to museums, historic castles and science centers, turning learning into a living experience.": "Այցեր թանգարաններ, պատմական ամրոցներ և գիտական կենտրոններ՝ ուսուցումը դարձնելով կենդանի փորձառություն։",
    "New friendships": "Նոր ընկերություններ",
    "A chance to connect, collaborate and share memorable moments with peers.": "Հնարավորություն՝ շփվելու, համագործակցելու և հիշարժան պահեր կիսելու հասակակիցների հետ։",
    "Safe and organized": "Անվտանգ և կազմակերպված",
    "Experienced guides, a clear program and constant support throughout the journey.": "Փորձառու ուղեկցողներ, հստակ ծրագիր և մշտական աջակցություն ամբողջ ճամփորդության ընթացքում։",

    /* --- itinerary header --- */
    "The complete agenda": "Ամբողջական ծրագիր",
    "Eight days, hour by hour": "Ութ օր՝ ժամ առ ժամ",
    "Bucharest, Transylvania and back. Every day planned, every detail covered.": "Բուխարեստ, Տրանսիլվանիա և վերադարձ։ Ամեն օրը պլանավորված, ամեն մանրուքը՝ հոգացված։",
    "The meal which is included in our tour package is only a breakfast.": "Մեր տուրային փաթեթում ներառված միակ սնունդը նախաճաշն է։",

    /* --- itinerary day titles --- */
    "Arrival in Bucharest": "Ժամանում Բուխարեստ",
    "Bucharest guided city tour": "Բուխարեստի ուղեկցվող քաղաքային շրջայց",
    "Slanic Salt Mine & transfer to Brașov": "Սլանիկի աղահանք և տեղափոխում Բրաշով",
    "Bran Castle & Râșnov Fortress": "Բրանի ամրոց և Ռըշնովի բերդ",
    "Peleș Castle & Sinaia": "Պելեշի ամրոց և Սինայա",
    "Parliament, art & culture": "Խորհրդարան, արվեստ և մշակույթ",
    "Presidential Palace & Old Town": "Նախագահական պալատ և Հին քաղաք",
    "Departure": "Մեկնում",

    /* --- itinerary day metas --- */
    "Monday, October 26 · Overnight: Ibis Styles Bucharest City Center": "Երկուշաբթի, հոկտեմբերի 26 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Tuesday, October 27 · Overnight: Ibis Styles Bucharest City Center": "Երեքշաբթի, հոկտեմբերի 27 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Wednesday, October 28 · Overnight: Pensiunea Casa Bono, Brașov": "Չորեքշաբթի, հոկտեմբերի 28 · Գիշերակաց՝ Pensiunea Casa Bono, Բրաշով",
    "Thursday, October 29 · Overnight: Pensiunea Casa Bono, Brașov": "Հինգշաբթի, հոկտեմբերի 29 · Գիշերակաց՝ Pensiunea Casa Bono, Բրաշով",
    "Friday, October 30 · Overnight: Ibis Styles Bucharest City Center": "Ուրբաթ, հոկտեմբերի 30 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Saturday, October 31 · Overnight: Ibis Styles Bucharest City Center": "Շաբաթ, հոկտեմբերի 31 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Sunday, November 1 · Overnight: Ibis Styles Bucharest City Center": "Կիրակի, նոյեմբերի 1 · Գիշերակաց՝ Ibis Styles Bucharest City Center",
    "Monday, November 2 · Flight home": "Երկուշաբթի, նոյեմբերի 2 · Թռիչք տուն",

    /* --- itinerary schedule items --- */
    "Flight to Bucharest (2.5 hours, local times)": "Թռիչք դեպի Բուխարեստ (2.5 ժամ, տեղական ժամանակ)",
    "Passport control": "Անձնագրային հսկողություն",
    "Transfer to hotel (Ibis Styles Bucharest City Center)": "Տեղափոխում հյուրանոց (Ibis Styles Bucharest City Center)",
    "Check in": "Գրանցում",
    "Lunch and rest at hotel": "Ճաշ և հանգիստ հյուրանոցում",
    "Evening walk (Cișmigiu Garden, Revolution Square) and dinner": "Երեկոյան զբոսանք (Չիշմիջիու այգի, Հեղափոխության հրապարակ) և ընթրիք",
    "Lights out": "Քնելու ժամ",
    "Breakfast": "Նախաճաշ",
    "Guided city excursion with licensed guide": "Քաղաքային էքսկուրսիա լիցենզավորված գիդով",
    "Lunch": "Ճաշ",
    "Rest at hotel": "Հանգիստ հյուրանոցում",
    "Walk": "Զբոսանք",
    "Dinner and shopping at AFI Shopping Center": "Ընթրիք և գնումներ AFI Shopping Center-ում",
    "Depart Bucharest for Slanic Salt Mine and planetarium": "Մեկնում Բուխարեստից՝ Սլանիկի աղահանք և մոլորակացույց",
    "Arrive in Brașov": "Ժամանում Բրաշով",
    "Hotel check-in (Pensiunea Casa Bono)": "Հյուրանոցում գրանցում (Pensiunea Casa Bono)",
    "Dinner and evening walk": "Ընթրիք և երեկոյան զբոսանք",
    "Transfer to Bran Castle": "Տեղափոխում Բրանի ամրոց",
    "Excursion at Bran (Dracula's) Castle": "Էքսկուրսիա Բրանի (Դրակուլայի) ամրոցում",
    "Picnic lunch": "Պիկնիկ-ճաշ",
    "Râșnov Fortress": "Ռըշնովի բերդ",
    "Return to Brașov": "Վերադարձ Բրաշով",
    "City walking tour of Brașov": "Բրաշովի քայլող շրջայց",
    "Dinner": "Ընթրիք",
    "Transfer to Sinaia": "Տեղափոխում Սինայա",
    "Peleș Castle tour": "Պելեշի ամրոցի շրջայց",
    "Lunch (Restaurant Avalanche)": "Ճաշ (Restaurant Avalanche)",
    "City tour of Sinaia": "Սինայայի քաղաքային շրջայց",
    "Return to Bucharest": "Վերադարձ Բուխարեստ",
    "Hotel check-in": "Հյուրանոցում գրանցում",
    "Dinner and walk": "Ընթրիք և զբոսանք",
    "Bucharest National Art Gallery": "Բուխարեստի Ազգային արվեստի պատկերասրահ",
    "Guided tour of the Palace of the Parliament": "Խորհրդարանի պալատի ուղեկցվող շրջայց",
    "Lunch (Unirea Shopping Center)": "Ճաշ (Unirea Shopping Center)",
    "Cărturești Carusel, Europe's most beautiful bookstore": "Cărturești Carusel՝ Եվրոպայի ամենագեղեցիկ գրախանութը",
    "Return to hotel": "Վերադարձ հյուրանոց",
    "Rest and games night (dinner in rooms)": "Հանգիստ և խաղերի երեկո (ընթրիքը՝ սենյակներում)",
    "Visit to the Romanian President's residence (Cotroceni Palace)": "Այցելություն Ռումինիայի նախագահի նստավայր (Կոտրոչենի պալատ)",
    "Shopping at AFI Shopping Center": "Գնումներ AFI Shopping Center-ում",
    "Lunch (AFI Shopping Center)": "Ճաշ (AFI Shopping Center)",
    "Old Town walk and farewell dinner": "Հին քաղաքի զբոսանք և հրաժեշտի ընթրիք",
    "Pack and check out": "Իրերը հավաքել և դուրս գրվել",
    "Transfer to airport": "Տեղափոխում օդանավակայան",
    "Flight home (2.5 hours, local times)": "Թռիչք տուն (2.5 ժամ, տեղական ժամանակ)",

    /* --- itinerary tags --- */
    "Cișmigiu Garden": "Չիշմիջիու այգի",
    "Revolution Square": "Հեղափոխության հրապարակ",
    "Guided city tour": "Քաղաքային շրջայց",
    "Slanic Salt Mine": "Սլանիկի աղահանք",
    "Planetarium": "Մոլորակացույց",
    "Brașov": "Բրաշով",
    "Bran Castle": "Բրանի ամրոց",
    "Brașov walking tour": "Բրաշովի շրջայց",
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
    "Where you'll go": "Ուր էք գնալու",
    "Seven destinations across two regions": "Յոթ ուղղություն երկու տարածաշրջանում",
    "From the grand avenues of Bucharest to the medieval heart of Transylvania. Click any destination to explore its gallery and learn what awaits.": "Բուխարեստի շքեղ պողոտաներից մինչեվ Տրանսիլվանիայի միջնադարյան սիրտը։ Սեղմեք ցանկացած ուղղությունը՝ բացահայտելու նրա պատկերասրահը և իմանալու՝ թե ինչ է սպասում։",

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
    "Belle Époque boulevards, the colossal Parliament and a café-filled Old Town. Your base for five of the eight nights.": "Belle Époque-ի պողոտաներ, վիթխարի Խորհրդարանը և սրճարաններով լի Հին քաղաք։ Ձեր կացարանը ութ գիշերից հինգի համար։",
    "A cathedral of salt 200 metres underground, with a planetarium, sculptures and an illuminated lake.": "Աղի տաճար՝ 200 մետր ընդհատակ, մոլորակացույցով, քանդակներով և լուսավորված լճով։",
    "A medieval Saxon town under Tâmpa mountain. Pastel squares, Gothic spires and a lively promenade.": "Միջնադարյան սաքսոնական քաղաք Թամպա լեռան ստորոտին։ Պաստելային հրապարակներ, գոթական աշտարակներ և աշխույժ զբոսավայր։",
    "Romania's fairy-tale royal palace in the Carpathian forests above Sinaia.": "Ռումինիայի հեքիաթային արքայական պալատը Կարպատների անտառներում՝ Սինայայից վեր։",
    "The cliff-top fortress the world knows as Dracula's Castle.": "Ժայռի գագաթին կանգնած ամրոցը, որն աշխարհը ճանաչում է որպես Դրակուլայի ամրոց։",
    "The heaviest building on Earth. Over 1,000 rooms of marble, crystal and carved wood.": "Երկրի ամենածանր շենքը։ Ավելի քան 1000 սենյակ՝ մարմարից, բյուրեղից և փորագրված փայտից։",
    "Cobbled Lipscani lanes, grand arcades and the ornate CEC Palace. The farewell-night setting.": "Lipscani-ի սալարկված նրբանցքները, շքեղ սրահները և զարդարուն CEC պալատը։ Հրաժեշտի երեկոյի վայրը։",

    /* --- accommodation --- */
    "Where you'll stay": "Որտեղ եք մնալու",
    "Both properties are central, personally vetted, and include daily breakfast.": "Երկու կացարաններն ել կենտրոնական են, անդզամբ Ստուգված և նևրառում են ամենօրյա նախաղաշ։",
    "5 nights": "5 գիշեր",
    "2 nights": "2 գիշեր",
    "District 1, central Bucharest": "1-ին շրջան, կենտրոնական Բուխարեստ",
    "Centrul Nou, Brașov": "Centrul Nou, Բրաշով",
    "A modern hotel between Gara de Nord and the Old Town, with a restaurant, gym and lobby bar. Breakfast every morning.": "Գտնվում է 1-ին շրջանում՝ Gara de Nord-ի և Հին քաղաքի միջև։ նախաղաշ ամևն առավոտ։",
    "A family-run guesthouse of eight rooms, a short walk from Council Square. Quiet terrace and breakfast every morning.": "Ընտանեկան հյուրատուն՝ ընդամենը ութ սենյակով Centrul Nou-ում, մի քանի քայլ Խորհրդի հրապարակից։ Հանգիստ տերաս և նախաղաշ ամևն առավոտ։",
    "Breakfast included": "Նախաճաշը ներառված է",
    "Free Wi-Fi": "Անվճար Wi-Fi",
    "Central, walkable area": "Կենտրոնական, քայլելու հարմար տարածք",
    "Walkable to Old Town": "Քայլելու հեռավորության վրա Հին քաղաքից",

        /* --- safety --- */
    "Safety": "Անվտանգություն",
    "Why trust us with your child's journey?": "Ինչու՞ վստահել ձեր երեխայի չանաբարհորդությունն մեզ",
    "Your child's safety and your peace of mind are our top priority.": "Անվտանգություննն և ծնոլդների հանգստևթյևննն մեր արաժնահերթությունն են։",
    "Experienced supervisors": "Հատուկ ուղեկցողներ",
    "Specialists working with children, ensuring constant supervision and support throughout the journey.": "երեխաների հետ աշխատոգ մասնագես, որոնք աՊահում են մշտական վերահսկոգհություն և աժակցություն ամբոլ ուլևորիթյան նտացքում։",
    "Safe and vetted programme": "Անվտանգ և Ստուգված ցրագիր",
    "A carefully planned itinerary, trusted partners and pre-vetted services for children's safety.": "Մանկարկրետ Պլանավորված երթուգհի, վստահելի գործնկերն և նախաՊետսված ցարայություններ երեխաների անվտանգության համար։",
    "24/7 parent updates": "Ամենօրյա տեղեկություն ծնողներին",
    "Parents are kept informed about the group's location, programme progress and important events.": "Հծնոլդները մշտաՊես տեգեկարցված են խմբի գտնտսվելու վայրին, ցրագի նտացքին և կարևոր իրադարդությունների մասին։",
    "Individual attention": "Անհատական ուշադրություն",
    "Every child receives the care, support and attention they need throughout the journey.": "Հուրաքանչխյուր երեխա ստանում են անրաուշտ հոկեվորություն, աժակցություն և ուշադրություն չանաբարհորդության ոլժի նտացքում։",
    "Trusted accommodation and transport": "վստահելի կացություն և տրանսՊորտ",
    "Hand-picked hotels and comfortable transport meeting our safety standards.": "նտրվաս հյուրանոցներ և հարմարավետ տրանսՊորտ։",
    "Your coordinators": "Ձեր կազմակերգիչները",
    "Yura Barseghyan": "Յուրա Բարսեգհյան",
    "Founder & Director": "Հիմնադիր և տնորևն",
    "TNY Educational Centre": "TNY ուսումնակալ կենտրոն",
    "Narine Galoyan": "Նարինե Գալոյան",
    "Co-founder & Pedagogue": "Համահիմնադիր և մանկավարևժ",
    "Sargis Sargsyan": "Սարգիս Սարգսյան",
    "Tour Organiser": "տուրի կազմակերիչ",
    "Tourism Specialist": "տուրիզմի մասնագես",

        /* --- includes --- */
    "No surprises": "Առանց անակնկալների",
    "What's included, and what's not": "Ինչ է ներառված և ինչ՝ ոչ",
    "Included": "Ներառված է",
    "Not included": "Ներառված չէ",
    "Return flights (Armenia – Bucharest)": "Հետադարձ թռիչքներ (Հայաստան – Բուխարեստ)",
    "7 nights (Ibis Styles Bucharest & Casa Bono Brașov)": "7 գիշեր (Ibis Styles Bucharest և Casa Bono Brașov)",
    "Daily breakfast at the hotel": "Ամենօրյա նախաճաշ հյուրանոցում",
    "Private coach transport & airport transfers": "Մասնավոր ավտոբուսային փոխադրում և օդանավակայանի տեղափոխումներ",
    "Licensed guides and all entrance fees": "Լիցենզավորված գիդեր և բոլոր մուտքի վճարները",
    "Travel & medical insurance": "Ճանապարհորդական և բժշկական ապահովագրություն",
    "24/7 coordination and supervision": "24/7 համակարգում և հսկողություն",
    "Passport and any visa fees": "Անձնագիր և վիզայի վճարներ",
    "Lunches, dinners and snacks": "Ճաշ, ընթրիք և խորակներ",
    "Personal spending and souvenirs": "Անձնական ծախսեր և հուշանվերներ",
    "Optional activities and tips": "Լրացուցիչ զբաղմունքներ և թեյավճարներ",

    /* --- pricing --- */
    "One clear price": "Մեկ հստակ գին",
    "Simple, transparent": "Պարզ, թափանցիկ",
    "From": "Սկսած",
    "per student · flights included · shared room": "մեկ աշակերտի համար · թռիչքները ներառված · ընդհանուր սենյակ",
    "fully organised": "լիովին կազմակերպված",
    "deposit holds a place": "կանխավճարը պահում է տեղը",
    "Supervised": "Հսկվող",
    "the entire trip": "ողջ ճամփորդության ընթացքում",
    "Contact us for the full payment schedule and cancellation policy. Price is indicative; confirm final amount when reserving.": "Կապվեք մեզ հետ վճարման ամբողջական ժամանակացույցի և չեղարկման քաղաքականության համար։ Գինը մոտավոր է. վերջնական գումարը հաստատվում է ամրագրելիս։",

    /* --- testimonials --- */
    "From parents & students": "Ծնողներից և աշակերտներից",
    "Parents who were nervous, and glad they said yes": "Ծնողներ, ովքեր անհանգստանում էին, բայց ուրախ են, որ համաձայնեցին",
    "I was nervous about sending my 15-year-old abroad, but the daily WhatsApp photos and nightly check-ins meant I never worried for a second. Worth every penny.": "Անհանգստանում էի 15-ամյա երեխայիս արտերկիր ուղարկելու համար, բայց ամենօրյա WhatsApp լուսանկարներն ու ամենգիշերյա կապը նշանակում էին, որ ոչ մի վայրկյան չանհանգստացա։ Արժե յուրաքանչյուր կոպեկը։",
    "Standing inside Bran Castle and learning the real story of Vlad was unreal. Best week of my life with my friends.": "Բրանի ամրոցի ներսում կանգնելն ու Վլադի իրական պատմությունը սովորելն անհավատալի էր։ Կյանքիս լավագույն շաբաթը՝ ընկերներիս հետ։",
    "Everything was organised down to the hour. The guides were knowledgeable and genuinely cared about the kids.": "Ամեն ինչ կազմակերպված էր ժամ առ ժամ։ Գիդերը գիտակ էին և անկեղծորեն հոգ էին տանում երեխաների մասին։",
    "Parent": "Ծնող",
    "Student, 16": "Աշակերտ, 16",

    /* --- faq --- */
    "Good to know": "Օգտակար տեղեկություն",
    "Questions parents ask us": "Հարցեր, որ ծնողները տալիս են",
    "How closely are the students supervised?": "Որքա՞ն խստորեն են հսկվում աշակերտները",
    "Dedicated chaperones at all times, with evening headcounts, room curfews and a coordinator on call 24/7.": "Հատուկ ուղեկցողներ՝ մշտապես, երեկոյան հաշվառմամբ, սենյակային ռեժիմով և 24/7 հասանելի համակարգողով։",
    "How will I hear from my child during the trip?": "Ինչպե՞ս եմ կապ պահելու երեխայիս հետ ճամփորդության ընթացքում",
    "We run a private parents' WhatsApp group with a daily photo update, plus a dedicated emergency number. Hotels have Wi-Fi.": "Մենք վարում ենք ծնողների փակ WhatsApp խումբ՝ ամենօրյա լուսանկարներով, գումարած հատուկ արտակարգ համարով։ Հյուրանոցներն ունեն Wi-Fi։",
    "Are flights included?": "Թռիչքները ներառվա՞ծ են",
    "Yes, return flights from Armenia to Bucharest are included. The group flies together with chaperones on both legs.": "Այո, Հայաստանից Բուխարեստ հետադարձ թռիչքները ներառված են։ Խումբը թռչում է միասին՝ ուղեկցողների հետ, երկու ուղղություններով։",
    "What should my child pack?": "Ի՞նչ պետք է հավաքի երեխաս",
    "Comfortable walking shoes, warm layers (late October in Romania can be 5-15 C), a rain jacket, and a Type C/F 230V adapter. A full packing list is sent on booking.": "Հարմարավետ կոշիկներ, տաք հագուստ (հոկտեմբերի վերջը Ռումինիայում կարող է լինել 5-15 °C), անձրևանոց և Type C/F 230Վ ադապտեր։ Ամբողջական ցուցակն ուղարկվում է ամրագրումից հետո։",
    "What about dietary needs and allergies?": "Իսկ սննդային կարիքներն ու ալերգիանե՞րը",
    "Vegetarian, halal and allergy requirements are accommodated. Just tell us on the consent form before departure.": "Բուսակերական, հալալ և ալերգիկ պահանջները հաշվի են առնվում։ Պարզապես նշեք համաձայնության ձևում մեկնելուց առաջ։",
    "Do students need a passport or visa?": "Աշակերտներին անձնագիր կամ վիզա պե՞տք է",
    "A passport valid for at least 6 months is required. Visa requirements depend on nationality; we advise on this.": "Պահանջվում է առնվազն 6 ամիս վավեր անձնագիր։ Վիզայի պահանջները կախված են քաղաքացիությունից. մենք խորհրդատվություն ենք տալիս այս հարցում։",
    "What's the refund policy?": "Ո՞րն է գումարի վերադարձման քաղաքականությունը",
    "Contact us for full cancellation terms. We aim to be fair. Exact deadlines and percentages are shared when you reserve.": "Կապվեք մեզ հետ չեղարկման ամբողջական պայմանների համար։ Մենք ձգտում ենք արդար լինել։ Ճշգրիտ ժամկետներն ու տոկոսները տրամադրվում են ամրագրելիս։",

    /* --- contact --- */
    "Get in touch": "Կապ հաստատեք",
    "Ready to reserve your child's place?": "Պատրա՞ստ եք ամրագրել ձեր երեխայի տեղը",
    "Talk to a real person before you decide. We answer every question.": "Որոշելուց առաջ խոսեք իրական մարդու հետ։ Մենք պատասխանում ենք յուրաքանչյուր հարցի։",
    "Chat on WhatsApp": "Զրուցել WhatsApp-ով",

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
    "An immense salt mine more than 200 metres underground, on the road from Bucharest to Brașov. Vast cathedral-like chambers carved from rock salt, with a planetarium, sculptures, an illuminated lake and famously pure air.": "Հսկայական աղահանք՝ ավելի քան 200 մետր ընդհատակ, Բուխարեստից Բրաշով տանող ճանապարհին։ Ժայռային աղից փորված տաճարանման ընդարձակ դահլիճներ՝ մոլորակացույցով, քանդակներով, լուսավորված լճով և հանրահայտ մաքուր օդով։",
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
    "Region": "Տարածաշրջան",
    "On the tour": "Ճամփորդության ընթացքում",
    "Good for": "Հարմար է",
    "Type": "Տեսակ",
    "Typical visit": "Սովորական այց",
    "Built": "Կառուցված",
    "Completed": "Ավարտված",
    "Area": "Տարածք",
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
    "Previous photo": "Նախորդ լուսանկարը",
    "Next photo": "Հաջորդ լուսանկարը"
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
    try { return localStorage.getItem('tny-lang') === 'am' ? 'am' : 'en'; }
    catch (e) { return 'en'; }
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
