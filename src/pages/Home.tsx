import { useState } from "react";
import { useApp } from "../context";
import logoImg from "../assets/logo.png";
import Counter from "../components/Counter";
import Qibla from "../components/Qibla";
import PrayerTimes from "../components/PrayerTimes";
import DailyAyah from "../components/DailyAyah";

export default function Home() {
  const { t, lang, setPage } = useApp();
  const [contactSent, setContactSent] = useState(false);
  const [admissionDone, setAdmissionDone] = useState(false);

  // State variables for admission inputs
  const [studentName, setStudentName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [targetClass, setTargetClass] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // State variables for contact inputs
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Target WhatsApp phone number in international format (without +)
    const targetPhoneNumber = "8801711962740"; 

    // Create the structured message text
    const formattedMessage = 
      `*নতুন ভর্তি আবেদন*\n\n` +
      `*শিক্ষার্থীর নাম:* ${studentName}\n` +
      `*পিতার নাম:* ${father}\n` +
      `*মাতার নাম:* ${mother}\n` +
      `*বয়স:* ${age}\n` +
      `*লিঙ্গ:* ${gender}\n` +
      `*শ্রেণী/বিভাগ:* ${targetClass}\n` +
      `*ঠিকানা:* ${address}\n` +
      `*ফোন নম্বর:* ${phone}`;

    // Construct the wa.me redirect URL
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new window/app
    window.open(whatsappUrl, "_blank");
    setAdmissionDone(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetPhoneNumber = "8801711962740"; 

    const formattedMessage = 
      `*নতুন বার্তা (যোগাযোগ)*\n\n` +
      `*নাম:* ${contactName}\n` +
      `*ইমেইল:* ${contactEmail}\n` +
      `*ফোন নম্বর:* ${contactPhone}\n` +
      `*বার্তা:* ${contactMessage}`;

    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

    window.open(whatsappUrl, "_blank");
    setContactSent(true);
  };

  const teacherNames =
    lang === "bn"
      ? ["আব্দুর রাজ্জাক","মো: ইয়াসীন আলি","মোঃ আবু সাঈদ  ","ক্বারী ইবরাহিম খলিল","মাসুদ রানা ","জোবায়ের আহমাদ ","মোঃরেজাউল করিম ","মোঃ শাহ আলম ইসলাম ","শরিফুল ইসলাম ","আল মামুন","তৌফিকুর রহমান আরেফিন","জোবায়ের আহমেদ"]
      : lang === "ar"
      ? ["مولانا عبدالله","مولانا إبراهيم","الحافظ يوسف","المفتي جمال","مولانا كمال","الحافظ لقمان","مولانا موسى","مولانا ناصر","الحافظ عمر","مولانا فاروق","المفتي قاسم","مولانا رفيق"]
      : ["Abdur Razzaque","Md Eyacin ali","Md Abu Said","Kari Ebrahim Khalil","Masud rana ","Jobayear ahmad","Hm. Rezaul Karim","Md. Sah alom Islam","Shariful islam","MD AL MAMUN","Towfiqur Rahman Arefin","Jobaer Ahmed"];

  const notices = [
    { d: "2026-01-15", title: lang==="bn"?"নতুন শিক্ষাবর্ষের ভর্তি শুরু":lang==="ar"?"بدء التسجيل للعام الدراسي الجديد":"New Academic Year Admission Open" },
    { d: "2025-12-20", title: lang==="bn"?"শীতকালীন ছুটির বিজ্ঞপ্তি":lang==="ar"?"إشعار العطلة الشتوية":"Winter Vacation Notice" },
    { d: "2025-11-10", title: lang==="bn"?"হিফজ পরীক্ষার সময়সূচি":lang==="ar"?"جدول امتحان الحفظ":"Hifz Examination Schedule" },
    { d: "2025-10-05", title: lang==="bn"?"অভিভাবক সভা":lang==="ar"?"اجتماع أولياء الأمور":"Parent Meeting" },
  ];

  const scholars =
    lang==="bn"?[
      { name:"মামুনুল হক", text:"মাদরাসা দারুল হুদার শিক্ষাব্যবস্থা প্রশংসনীয়।" },
      { name:"শায়খ আহমাদুল্লাহ", text:"একটি আদর্শ ইসলামিক প্রতিষ্ঠান।" },
      { name:"আল্লামা মাহমুদুল হাসান", text:"কুরআন ও সুন্নাহর শিক্ষায় অগ্রগণ্য।" },
      { name:"মুফতি আব্দুল মালেক", text:"আখলাকের প্রতি বিশেষ মনোযোগ লক্ষণীয়।" },
    ]:lang==="ar"?[
      { name:"المفتي تقي العثماني", text:"النظام التعليمي في مدرسة دار الهدى يستحق الثناء." },
      { name:"مولانا محمود الحسن", text:"مؤسسة إسلامية مثالية." },
      { name:"المفتي فيض الرحمن", text:"رائدة في تعليم القرآن والسنة." },
      { name:"مولانا سلمان الحسيني الندوي", text:"اهتمام خاص بالأخلاق." },
    ]:[
      { name:"Mamunul Haque", text:"The education system at Madrasah Darul Huda is commendable." },
      { name:"shaykh Ahmadullah", text:"An ideal Islamic institution." },
      { name:"Allama Mahmudul", text:"Leading in Quran and Sunnah education." },
      { name:"Muhammad Abdul Malek", text:"Special attention to character is notable." },
    ];

  const guardians =
    lang==="bn"?[
      { name:"আব্দুল করিম (অভিভাবক)", text:"আমার ছেলে এখানে এসে অসাধারণ পরিবর্তন এসেছে।" },
      { name:"রহিমা বেগম", text:"মেয়ের নিরাপত্তা ও পড়ালেখা—দুটোতেই আমি সন্তুষ্ট।" },
      { name:"মো. ইব্রাহিম", text:"শিক্ষকদের আন্তরিকতা ও যত্ন প্রশংসনীয়।" },
      { name:"সালমা খাতুন", text:"ইসলামিক ও আধুনিক শিক্ষার সুন্দর সমন্বয়।" },
    ]:lang==="ar"?[
      { name:"عبد الكريم", text:"حصل ابني على تغيير رائع هنا." },
      { name:"رحيمة بيغوم", text:"أنا راضٍ عن سلامة ابنتي ودراستها." },
      { name:"محمد إبراهيم", text:"إخلاص ورعاية المعلمين تستحق الثناء." },
      { name:"سلمى خاتون", text:"مزيج جميل من التعليم الإسلامي والحديث." },
    ]:[
      { name:"Abdul Karim (Guardian)", text:"My son has shown amazing change here." },
      { name:"Rahima Begum", text:"I'm satisfied with both my daughter's safety and studies." },
      { name:"Md. Ibrahim", text:"The teachers' sincerity and care are praiseworthy." },
      { name:"Salma Khatun", text:"Beautiful blend of Islamic and modern education." },
    ];

  const hafeezList =
    lang==="bn"?[
       { name: "হাফেজ জুলফিকার নাঈম", text: "২০২৬ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ আশিকুর রহমান", text: "২০২৬ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ মুজাহিদ হাসান", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ আব্দুল্লাহ আল মুন্তাসির", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ ইয়ানাত চৌধুরী শামীম", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ খালেদ বিন রাশেদ", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ আবু উবাইদ শেখ আবিদ", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ ওমর ফারুক", text: "২০২৫ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ মুহিবুল্লাহ", text: "২০২৪ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ ইয়াসিন আরাফাত", text: "২০২৪ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ রোকন মিয়া", text: "২০২৪ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ সায়্যিদুল মুরছালিন সাঈদ", text: "২০২৪ সালে হিফজ সম্পন্ন।" },
    { name: "হাফেজ রাকিব হাসান", text: "২০২৩ সালে হিফজ সম্পন্ন।" },
    ]:lang==="ar"?[
       { name: "الحافظ ذو الفقار نعيم", text: "أكمل الحفظ في 2026." },
    { name: "الحافظ عاشق الرحمن", text: "أكمل الحفظ في 2026." },
    { name: "الحافظ مجاهد حسن", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ عبد الله المنتصر", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ يانات تشودري شميم", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ خالد بن راشد", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ أبو عبيد شيخ عابد", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ عمر فاروق", text: "أكمل الحفظ في 2025." },
    { name: "الحافظ محب الله", text: "أكمل الحفظ في 2024." },
    { name: "الحافظ ياسين عرفات", text: "أكمل الحفظ في 2024." },
    { name: "الحافظ ركن ميا", text: "أكمل الحفظ في 2024." },
    { name: "الحافظ سيد المرسلين سعيد", text: "أكمل الحفظ في 2024." },
    { name: "الحافظ رقيب حسن", text: "أكمل الحفظ في 2023." },
    ]:[
     { name: "Hafiz Zulfiqar Naim", text: "Completed Hifz in 2026." },
    { name: "Hafiz Ashiqur Rahman", text: "Completed Hifz in 2026." },
    { name: "Hafiz Mujahid Hasan", text: "Completed Hifz in 2025." },
    { name: "Hafiz Abdullah Al Muntasir", text: "Completed Hifz in 2025." },
    { name: "Hafiz Yanat Chowdhury Shamim", text: "Completed Hifz in 2025." },
    { name: "Hafiz Khaled Bin Rashed", text: "Completed Hifz in 2025." },
    { name: "Hafiz Abu Ubaid Sheikh Abid", text: "Completed Hifz in 2025." },
    { name: "Hafiz Omar Farooq", text: "Completed Hifz in 2025." },
    { name: "Hafiz Muhibbullah", text: "Completed Hifz in 2024." },
    { name: "Hafiz Yasin Arafat", text: "Completed Hifz in 2024." },
    { name: "Hafiz Rokon Miah", text: "Completed Hifz in 2024." },
    { name: "Hafiz Sayyidul Mursalin Saeed", text: "Completed Hifz in 2024." },
    { name: "Hafiz Rakib Hasan", text: "Completed Hifz in 2023." },
    ];

  return (
    <div className="islamic-pattern">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
        
        {/* UPDATED: Increased bottom padding (pb-28 sm:pb-36 lg:pb-40) so CTA buttons clear the stats box */}
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-28 sm:pb-36 lg:px-8 lg:pt-24 lg:pb-40">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 animate-fade-up">
              <span className="inline-block rounded-full border border-emerald-300 bg-emerald-100/70 px-4 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                ✦ {t.hero.badge}
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPage("admission")} className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  ✦ {t.cta.admit}
                </button>
                <button onClick={() => setPage("about")} className="rounded-2xl border-2 border-emerald-700 bg-white px-6 py-3 font-bold text-emerald-800 transition-all hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700">
                  {t.cta.learnMore}
                </button>
                <a href="tel:01711962740" className="rounded-2xl bg-emerald-800 px-6 py-3 font-bold text-white shadow-lg hover:scale-105">📞 {t.cta.callNow}</a>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-emerald-400/30 via-amber-400/30 to-emerald-400/30 blur-2xl" />
              <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-2xl sm:h-96 sm:w-96 overflow-hidden p-4">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      {/* UPDATED: Added relative z-20 and increased negative top margin (-mt-16 sm:-mt-20 lg:-mt-24) to properly float over the hero */}
      <section className="relative z-20 mx-auto -mt-16 sm:-mt-20 lg:-mt-24 max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-emerald-200/60 bg-white p-6 shadow-2xl md:grid-cols-4 dark:border-emerald-800/50 dark:bg-slate-900">
          {[
            { n: 400, label: t.stats.students, icon: "👨‍🎓" },
            { n: 800, label: t.stats.graduates, icon: "🎓" },
            { n: 21,  label: t.stats.teachers,  icon: "👨‍🏫" },
            { n: 4,   label: t.stats.years,     icon: "📅" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl">{s.icon}</div>
              <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 sm:text-4xl">
                <Counter end={s.n} />
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      {/* UPDATED: Added relative z-10 and top padding (pt-20 sm:pt-24 lg:pt-32) to make room for the floating stats card */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:pt-24 lg:px-8 lg:pt-32 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.aboutTitle}</h2>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{t.sections.aboutText}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[t.stats.students, t.stats.graduates, t.stats.teachers].map((label, i) => (
                <div key={label} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-800 dark:bg-slate-800">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{[400, 800, 21][i]}+</div>
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-50 to-emerald-50 p-8 shadow-xl dark:border-amber-700/40 dark:from-slate-800 dark:to-slate-900">
            <div className="text-5xl">📜</div>
            <h3 className="mt-3 text-xl font-bold text-emerald-900 dark:text-emerald-200">{t.sections.muhtamimTitle}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">"{t.contact.muhtamimName}"</p>
            <p className="mt-4 text-sm italic text-slate-700 dark:text-slate-200">"{t.tagline}"</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-white py-16 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.whyTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.map((w, i) => (
              <div key={i} className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-emerald-900/40 dark:bg-slate-900">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-2xl text-white shadow-md group-hover:scale-110">
                  {["🎓","🤲","🏠","🛡️","📚","💰"][i]}
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.programsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.programs.map((p, i) => (
            <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm hover:shadow-lg dark:border-emerald-800 dark:bg-slate-900">
              <div className="text-3xl">{["📖","📕","📗","📘","💚","🎒","🏠","💪"][i]}</div>
              <h3 className="mt-2 font-bold">{p}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.departmentsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(["d1","d2","d3","d4","d5","d6"] as const).map((k, i) => (
            <div key={k} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-xl" />
              <div className="text-4xl">{["🧒","📖","📕","👧","🌙","📚"][i]}</div>
              <h3 className="mt-3 text-xl font-bold">{(t.depts as any)[k]}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* GIRLS SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-50 via-amber-50 to-emerald-50 p-8 shadow-xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="text-sm font-bold uppercase text-pink-600">🌸 Girls Section</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{t.sections.girlsTitle}</h2>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{t.sections.girlsText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.why.map((w, i) => (
                  <div key={i} className="rounded-2xl border border-pink-200 bg-pink-50/80 p-4 dark:border-pink-800/40 dark:bg-slate-800">
                    <div className="text-2xl">{["🌸","🤲","🏠","🛡️","📚","💝"][i]}</div>
                    <p className="mt-1 text-sm font-semibold">{w}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center text-9xl">🌷</div>
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="bg-gradient-to-b from-white to-emerald-50/30 py-16 dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">👨‍🏫 {t.nav.teachers}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teacherNames.map((n, i) => (
              <div key={i} className="group rounded-2xl border border-emerald-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-emerald-800 dark:bg-slate-900">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-3xl text-white shadow-md">👤</div>
                <h3 className="mt-3 font-bold">{n}</h3>
                <p className="text-xs text-slate-500">{lang==="bn"?"শিক্ষক":lang==="ar"?"مدرس":"Teacher"}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => setPage("teachers")} className="rounded-xl border-2 border-emerald-700 px-6 py-2 font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-slate-800">
              {t.cta.learnMore} →
            </button>
          </div>
        </div>
      </section>

      {/* NOTICE BOARD */}
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">📢 {t.nav.notice}</h2>
        <div className="space-y-3">
          {notices.map((n, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-emerald-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-900/30">📌</div>
              <div className="flex-1">
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-xs text-slate-500">{n.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ISLAMIC WIDGETS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.widgetsTitle}</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <PrayerTimes />
          <Qibla />
          <DailyAyah />
        </div>
      </section>

      {/* SCHOLARS */}
      <section className="bg-gradient-to-b from-emerald-50/30 to-white py-16 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">🎓 {t.nav.scholars}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {scholars.map((s, i) => (
              <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-emerald-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl dark:bg-emerald-900/30">🎓</div>
                  <h3 className="font-bold">{s.name}</h3>
                </div>
                <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-300">"{s.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARDIANS / TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">👨‍👩‍👧 {t.nav.guardians}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {guardians.map((g, i) => (
            <div key={i} className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm dark:border-amber-800/40 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl dark:bg-amber-900/30">👨‍👩‍👧</div>
                <h3 className="font-bold">{g.name}</h3>
              </div>
              <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-300">"{g.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* HAFEEZ GRADUATES */}
      <section className="bg-gradient-to-b from-white to-emerald-50/30 py-16 dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">📖 {t.nav.hafeez}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hafeezList.map((h, i) => (
              <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-5 text-center shadow-sm dark:border-emerald-800 dark:bg-slate-900">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-2xl text-white shadow-md">📖</div>
                <h3 className="mt-3 font-bold">{h.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT RESOURCES */}
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">🎒 {t.nav.student}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { t: lang==="bn"?"পাঠ্যসূচি":lang==="ar"?"المنهج":"Curriculum", i:"📋" },
            { t: lang==="bn"?"পরীক্ষার ফলাফল":lang==="ar"?"نتائج الامتحانات":"Exam Results", i:"📊" },
            { t: lang==="bn"?"অনলাইন রিসোর্স":lang==="ar"?"موارد عبر الإنترنت":"Online Resources", i:"💻" },
            { t: lang==="bn"?"সহশিক্ষা কার্যক্রম":lang==="ar"?"الأنشطة اللاصفية":"Co-curricular Activities", i:"⚽" },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm hover:shadow-lg dark:border-emerald-800 dark:bg-slate-900">
              <div className="text-4xl">{c.i}</div>
              <h3 className="mt-2 font-bold">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-500">Placeholder / Admin Editable</p>
            </div>
          ))}
        </div>
      </section>

      {/* ADMISSION CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 p-10 text-center text-white shadow-2xl sm:p-16">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize:'60px 60px'}}/>
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t.sections.admissionCTA}</h2>
          <p className="relative mt-2 text-emerald-100">{t.admission.subtitle}</p>
          <button onClick={() => setPage("admission")} className="relative mt-6 rounded-2xl bg-amber-500 px-8 py-3 font-bold text-white shadow-xl hover:scale-105 hover:bg-amber-600">{t.cta.admit} →</button>
        </div>
      </section>
      
      {/* ADMISSION FORM */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">🎓 {t.admission.title}</h2>
        {admissionDone ? (
          <div className="rounded-3xl border-2 border-green-300 bg-green-50 p-10 text-center dark:border-green-800 dark:bg-green-950">
            <div className="text-6xl">✅</div>
            <h2 className="mt-4 text-2xl font-bold text-green-800 dark:text-green-300">{t.admission.success}</h2>
          </div>
        ) : (
          <form onSubmit={handleAdmissionSubmit} className="grid gap-3 rounded-2xl border border-emerald-200 bg-white p-6 sm:grid-cols-2 dark:border-emerald-800 dark:bg-slate-900">
            <input required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder={t.admission.studentName} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required value={father} onChange={(e) => setFather(e.target.value)} placeholder={t.admission.father} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required value={mother} onChange={(e) => setMother(e.target.value)} placeholder={t.admission.mother} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder={t.admission.age} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <select required value={gender} onChange={(e) => setGender(e.target.value)} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800">
              <option value="">{t.admission.gender}</option>
              <option>{t.admission.male}</option>
              <option>{t.admission.female}</option>
            </select>
            <select required value={targetClass} onChange={(e) => setTargetClass(e.target.value)} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800">
              <option value="">{t.admission.class}</option>
              {(["d1","d2","d3","d4","d5"] as const).map((k) => (
                <option key={k}>{(t.depts as any)[k]}</option>
              ))}
            </select>
            <textarea required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.admission.address} rows={3} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.contact.phoneField} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 font-bold text-white shadow-lg sm:col-span-2 hover:opacity-90 transition-opacity"
            >
              {t.admission.submit}
            </button>
          </form>
        )}
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.galleryTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-200 to-amber-200 shadow-md transition-all hover:scale-105 dark:from-emerald-900 dark:to-amber-900">
              <div className="flex h-full items-center justify-center text-6xl opacity-70">
                {["🕌","📚","🤲","🎓","🌙","📖","✦","🌷","🧒","👧","🏫","📜","⭐","💫","🌸","🕋"][i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">📞 {t.nav.contact}</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-slate-900">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">{t.contact.address}</h3>
              <p className="mt-2 text-sm">📍 {t.contact.addressMain}</p>
              <p className="mt-1 text-sm">📍 {t.contact.addressSecond}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-slate-900">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">{t.contact.phone}</h3>
              <a href="tel:01711962740" className="mt-2 block hover:text-emerald-600">📞 01711-962740</a>
              <a href="tel:01805448500" className="block hover:text-emerald-600">📞 01805-448500</a>
              <a href="https://wa.me/8801711962740" className="mt-2 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">💬 WhatsApp</a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <iframe
                title="Map"
                src="https://maps.google.com/maps?q=Lalmonirhat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-64 w-full" loading="lazy"
              />
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-3 rounded-2xl border border-emerald-200 bg-white p-6 dark:border-emerald-800 dark:bg-slate-900">
            <h3 className="text-xl font-bold">{t.contact.sendMessage}</h3>
            <input 
              required 
              value={contactName} 
              onChange={(e) => setContactName(e.target.value)} 
              placeholder={t.contact.name} 
              className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" 
            />
            <input 
              type="email" 
              required 
              value={contactEmail} 
              onChange={(e) => setContactEmail(e.target.value)} 
              placeholder={t.contact.email} 
              className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" 
            />
            <input 
              required 
              value={contactPhone} 
              onChange={(e) => setContactPhone(e.target.value)} 
              placeholder={t.contact.phoneField} 
              className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" 
            />
            <textarea 
              required 
              rows={4} 
              value={contactMessage} 
              onChange={(e) => setContactMessage(e.target.value)} 
              placeholder={t.contact.message} 
              className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" 
            />
            <button 
              type="submit" 
              className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-800 py-3 font-bold text-white hover:opacity-90 transition-opacity"
            >
              {t.contact.send}
            </button>
            {contactSent && <p className="rounded-lg bg-green-50 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">{t.contact.sent}</p>}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.faqTitle}</h2>
        <div className="space-y-3">
          {t.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm transition-all open:shadow-lg dark:border-emerald-900/40 dark:bg-slate-900">
              <summary className="cursor-pointer list-none font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="me-2">❓</span>{f.q}
                <span className="float-end transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}