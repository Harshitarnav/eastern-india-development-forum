"use client";

import { useState } from "react";

const synopses = [
  {
    id: "en",
    lang: "en",
    font: "",
    name: "English",
    title: "What EIDF is",
    paragraphs: [
      "The Eastern India Development Forum helps Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North Eastern states grow together. It brings state governments, companies, investors, and people of this region to one table, including those who now live away from home.",
      "The work is practical: skill centres for young people, roads and industry, heritage and tourism, and a fair chance for villages, tribal communities, and women. Umanand Eastern Foundation runs EIDF. It does not take the place of government. It helps a project, a person, and the right support find each other.",
    ],
  },
  {
    id: "hi",
    lang: "hi",
    font: "font-hi",
    name: "हिन्दी",
    title: "ईआईडीएफ क्या है",
    paragraphs: [
      "पूर्वी भारत विकास मंच बिहार, झारखंड, ओडिशा, पश्चिम बंगाल, असम और पूर्वोत्तर राज्यों को साथ आगे बढ़ाने में मदद करता है। यह राज्य सरकारों, कंपनियों, निवेशकों और इस क्षेत्र के लोगों को एक जगह लाता है, चाहे वे यहाँ रहते हों या घर से दूर।",
      "काम व्यावहारिक है: युवाओं के कौशल केंद्र, सड़क और उद्योग, विरासत और पर्यटन, और गाँव, आदिवासी समाज तथा महिलाओं के लिए बराबर का मौका। इसे उमानंद ईस्टर्न फाउंडेशन चलाता है। यह सरकार की जगह नहीं लेता। यह किसी काम, किसी व्यक्ति और सही मदद को एक-दूसरे तक पहुँचाता है।",
    ],
  },
  {
    id: "bn",
    lang: "bn",
    font: "font-bn",
    name: "বাংলা",
    title: "ইআইডিএফ কী",
    paragraphs: [
      "ইস্টার্ন ইন্ডিয়া ডেভেলপমেন্ট ফোরাম বিহার, ঝাড়খণ্ড, ওড়িশা, পশ্চিমবঙ্গ, আসাম ও উত্তর-পূর্ব রাজ্যগুলোকে একসঙ্গে এগিয়ে যেতে সাহায্য করে। এটি রাজ্য সরকার, কোম্পানি, বিনিয়োগকারী এবং এই অঞ্চলের মানুষকে এক টেবিলে আনে, তাঁরা এখন বাড়ি থেকে দূরে থাকলেও।",
      "কাজটি বাস্তব: তরুণদের দক্ষতা কেন্দ্র, রাস্তা ও শিল্প, ঐতিহ্য ও পর্যটন, এবং গ্রাম, আদিবাসী সমাজ ও নারীদের সমান সুযোগ। উমানন্দ ইস্টার্ন ফাউন্ডেশন ইআইডিএফ চালায়। এটি সরকারের জায়গা নেয় না। এটি একটি কাজ, একজন মানুষ এবং সঠিক সহায়তাকে একে অপরের কাছে পৌঁছে দেয়।",
    ],
  },
  {
    id: "or",
    lang: "or",
    font: "font-or",
    name: "ଓଡ଼ିଆ",
    title: "ଇଆଇଡିଏଫ୍ କ’ଣ",
    paragraphs: [
      "ଇଷ୍ଟର୍ଣ୍ଣ ଇଣ୍ଡିଆ ଡେଭଲପମେଣ୍ଟ ଫୋରମ୍ ବିହାର, ଝାଡ଼ଖଣ୍ଡ, ଓଡ଼ିଶା, ପଶ୍ଚିମବଙ୍ଗ, ଆସାମ ଓ ଉତ୍ତର-ପୂର୍ବ ରାଜ୍ୟମାନଙ୍କୁ ଏକାଠି ଆଗକୁ ବଢ଼ିବାରେ ସାହାଯ୍ୟ କରେ। ଏହା ରାଜ୍ୟ ସରକାର, କମ୍ପାନୀ, ନିବେଶକ ଓ ଏହି ଅଞ୍ଚଳର ଲୋକଙ୍କୁ ଗୋଟିଏ ଟେବୁଲକୁ ଆଣେ, ସେମାନେ ବର୍ତ୍ତମାନ ଘରୁ ଦୂରରେ ରହୁଥିଲେ ମଧ୍ୟ।",
      "କାମଟି ବାସ୍ତବ: ଯୁବକମାନଙ୍କ ଦକ୍ଷତା କେନ୍ଦ୍ର, ରାସ୍ତା ଓ ଶିଳ୍ପ, ଐତିହ୍ୟ ଓ ପର୍ଯ୍ୟଟନ, ଏବଂ ଗାଁ, ଆଦିବାସୀ ସମାଜ ଓ ମହିଳାଙ୍କ ସମାନ ସୁଯୋଗ। ଉମାନନ୍ଦ ଇଷ୍ଟର୍ଣ୍ଣ ଫାଉଣ୍ଡେସନ୍ ଇଆଇଡିଏଫ୍ ଚଳାଏ। ଏହା ସରକାରର ସ୍ଥାନ ନିଏ ନାହିଁ। ଏହା ଏକ କାମ, ଜଣେ ବ୍ୟକ୍ତି ଓ ଠିକ୍ ସାହାଯ୍ୟକୁ ପରସ୍ପର ପାଖରେ ପହଞ୍ଚାଏ।",
    ],
  },
  {
    id: "as",
    lang: "as",
    font: "font-bn",
    name: "অসমীয়া",
    title: "ইআইডিএফ কি",
    paragraphs: [
      "ইষ্টাৰ্ণ ইণ্ডিয়া ডেভেলপমেণ্ট ফ’ৰামে বিহাৰ, ঝাৰখণ্ড, ওড়িশা, পশ্চিমবঙ্গ, অসম আৰু উত্তৰ-পূব ৰাজ্যসমূহক একেলগে আগুৱাই নিয়াত সহায় কৰে। ই ৰাজ্য চৰকাৰ, কোম্পানী, বিনিয়োগকাৰী আৰু এই অঞ্চলৰ মানুহক এখন টেবুললৈ আনে, তেওঁলোক এতিয়া ঘৰৰ পৰা দূৰত থাকিলেও।",
      "কামটো ব্যৱহাৰিক: যুৱক-যুৱতীৰ দক্ষতা কেন্দ্ৰ, ৰাস্তা আৰু উদ্যোগ, ঐতিহ্য আৰু পৰ্যটন, আৰু গাঁও, জনজাতীয় সমাজ আৰু মহিলাৰ বাবে সমান সুযোগ। উমানন্দ ইষ্টাৰ্ণ ফাউণ্ডেশ্যনে ইআইডিএফ চলায়। ই চৰকাৰৰ ঠাই লোৱা নাই। ই এটা কাম, এজন মানুহ আৰু সঠিক সহায়ক ইজনে সিজনৰ ওচৰলৈ লৈ যায়।",
    ],
  },
] as const;

export function JoinSynopsis() {
  const [active, setActive] = useState<(typeof synopses)[number]["id"]>("en");
  const item = synopses.find((entry) => entry.id === active) ?? synopses[0];

  return (
    <section className="mx-auto max-w-lg px-4 py-8" aria-labelledby="idea-heading">
      <p className="section-eyebrow">The idea</p>
      <h2 id="idea-heading" className="mt-3 font-display text-2xl font-bold text-navy">
        Choose a language
      </h2>
      <p className="font-hi mt-1 text-base font-semibold text-navy/80">एक भाषा चुनें</p>

      <div role="tablist" aria-label="Language" className="mt-5 flex flex-wrap gap-2">
        {synopses.map((language) => {
          const selected = language.id === active;
          return (
            <button
              key={language.id}
              type="button"
              role="tab"
              id={`lang-tab-${language.id}`}
              aria-selected={selected}
              aria-controls="lang-panel"
              onClick={() => setActive(language.id)}
              className={`min-h-11 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy"
              }`}
            >
              {language.name}
            </button>
          );
        })}
      </div>

      <article
        id="lang-panel"
        role="tabpanel"
        lang={item.lang}
        aria-labelledby={`lang-tab-${item.id}`}
        className={`mt-4 rounded-2xl border border-line bg-white px-4 py-4 ${item.font}`}
      >
        <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-2 text-[15px] leading-relaxed text-navy/85">
            {paragraph}
          </p>
        ))}
      </article>
    </section>
  );
}
