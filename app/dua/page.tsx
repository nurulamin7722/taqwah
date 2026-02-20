"use client";

import { useState } from "react";

interface Dua {
  id: number;
  title: string;
  titleBn: string;
  arabic: string;
  pronunciation?: string;
  meaning: string;
  category: string;
}

const duaCategories = [
  { id: "all", name: "সব", nameBn: "সব" },
  { id: "daily", name: "দৈনন্দিন দোয়া", nameBn: "দৈনন্দিন" },
  { id: "ibadah", name: "ইবাদত", nameBn: "ইবাদত" },
  { id: "darood", name: "দরুদ শরিফ", nameBn: "দরুদ শরিফ" },
  { id: "salat", name: "নামাজের দোয়া", nameBn: "নামাজের দোয়া" },
  { id: "fasting", name: "রোজার নিয়ত", nameBn: "রোজার নিয়ত" },
  { id: "iftar", name: "ইফতারের দোয়া", nameBn: "ইফতারের দোয়া" },
];

const duaList: Dua[] = [
  {
    id: 1,
    title: "Darood-e-Ibrahim",
    titleBn: "দরুদ ইব্রাহিম",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    pronunciation: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিউ ওয়া আলা আলি মুহাম্মাদিন কামা সাল্লাইতা আলা ইব্রাহিমা ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মাজিদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিউ ওয়া আলা আলি মুহাম্মাদিন কামা বারাকতা আলা ইব্রাহিমা ওয়া আলা আলি ইব্রাহিম, ইন্নাকা হামিদুম মাজিদ।",
    meaning: "হে আল্লাহ! আপনি মুহাম্মদ (সা.) এবং তাঁর বংশধরদের উপর রহমত বর্ষণ করুন, যেমন আপনি ইব্রাহিম (আ.) এবং তাঁর বংশধরদের উপর রহমত বর্ষণ করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! আপনি মুহাম্মদ (সা.) এবং তাঁর বংশধরদের উপর বরকত নাজিল করুন, যেমন আপনি ইব্রাহিম (আ.) এবং তাঁর বংশধরদের উপর বরকত নাজিল করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
    category: "darood",
  },
  {
    id: 2,
    title: "Takbir (Opening)",
    titleBn: "তাকবিরে তাহরিমা",
    arabic: "اللَّهُ أَكْبَرُ",
    pronunciation: "আল্লাহু আকবার",
    meaning: "আল্লাহ সবচেয়ে মহান।",
    category: "salat",
  },
  {
    id: 3,
    title: "Subhanaka",
    titleBn: "সানা",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    pronunciation: "সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারকাসমুকা ওয়া তা'আলা জাদ্দুকা ওয়া লা ইলাহা গাইরুক।",
    meaning: "হে আল্লাহ! আপনি পবিত্র এবং সকল প্রশংসা আপনার জন্য। আপনার নাম বরকতময়, আপনার মর্যাদা সর্বোচ্চ এবং আপনি ছাড়া কোন উপাস্য নেই।",
    category: "salat",
  },
  {
    id: 4,
    title: "Tashahhud",
    titleBn: "তাশাহুদ",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    pronunciation: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত তাইয়্যিবাতু। আস্‌সালামু আলাইকা আইয়্যুহান্নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ। আস্‌সালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহীন। আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ।",
    meaning: "সকল সম্মান, সকল নামাজ এবং সকল পবিত্রতা আল্লাহর জন্য। হে নবী! আপনার প্রতি শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক। আমাদের এবং আল্লাহর নেক বান্দাদের প্রতি শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই এবং আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মদ (সা.) আল্লাহর বান্দা ও রাসূল।",
    category: "salat",
  },
  {
    id: 5,
    title: "Fasting Intention",
    titleBn: "রোজার নিয়ত",
    arabic: "نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللَّهُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    pronunciation: "নাওয়াইতু আন আসুমা গাদাম মিন শাহরি রমাজানাল মুবারাকা ফারদাল লাকা ইয়া আল্লাহু ফা তাকাব্বাল মিন্নি ইন্নাকা আনতাস সামিউল আলিম।",
    meaning: "হে আল্লাহ! আমি আগামীকাল পবিত্র রমজান মাসের তোমার পক্ষ থেকে নির্ধারিত ফরজ রোজা রাখার নিয়ত করলাম। অতএব তুমি আমার পক্ষ থেকে (তা) কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞানী।",
    category: "fasting",
  },
  {
    id: 6,
    title: "Breaking Fast (Iftar)",
    titleBn: "ইফতারের দোয়া",
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    pronunciation: "আল্লাহুম্মা লাকা সুমতু ওয়া আলা রিজক্বিকা আফতারতু।",
    meaning: "হে আল্লাহ! আমি তোমার জন্যই রোজা রেখেছি এবং তোমার দেয়া রিজিক দিয়েই ইফতার করছি।",
    category: "iftar",
  },
  {
    id: 7,
    title: "After Breaking Fast",
    titleBn: "ইফতারের পর দোয়া",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    pronunciation: "যাহাবায যামাউ ওয়াবতাল্লাতিল উরুকু ওয়া সাবাতাল আজরু ইনশাআল্লাহ।",
    meaning: "পিপাসা দূর হয়েছে, শিরা-উপশিরা সিক্ত হয়েছে এবং ইনশাআল্লাহ পুরস্কার নির্ধারিত হয়েছে।",
    category: "iftar",
  },
  {
    id: 8,
    title: "Darood Sharif (Short)",
    titleBn: "দরুদ শরীফ (সংক্ষিপ্ত)",
    arabic: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
    pronunciation: "সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম",
    meaning: "আল্লাহ তাঁর (মুহাম্মদ সা.) উপর রহমত ও শান্তি বর্ষণ করুন।",
    category: "darood",
  },
  {
    id: 9,
    title: "Before Sleeping",
    titleBn: "ঘুমানোর দোয়া",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    pronunciation: "বিসমিকা আল্লাহুম্মা আমূতু ওয়া আহইয়া।",
    meaning: "হে আল্লাহ! তোমার নামে আমি মরি এবং বেঁচে থাকি।",
    category: "daily",
  },
  {
    id: 10,
    title: "Waking Up",
    titleBn: "ঘুম থেকে ওঠার দোয়া",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    pronunciation: "আলহামদুলিল্লাহিল্লাযি আহইয়ানা বা'দা মা আমাতানা ওয়া ইলাইহিন নুশুর।",
    meaning: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের মৃত্যুর পর পুনরায় জীবিত করেছেন এবং তাঁর কাছেই পুনরুত্থান।",
    category: "daily",
  },
  {
    id: 11,
    title: "Before Eating",
    titleBn: "খাওয়ার আগে দোয়া",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    pronunciation: "বিসমিল্লাহি ওয়া আলা বারাকাতিল্লাহ।",
    meaning: "আল্লাহর নামে এবং আল্লাহর বরকতের সাথে (শুরু করছি)।",
    category: "daily",
  },
  {
    id: 12,
    title: "After Eating",
    titleBn: "খাওয়ার পর দোয়া",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    pronunciation: "আলহামদুলিল্লাহিল্লাযি আত্বআমানা ওয়া সাক্বানা ওয়া জা'আলানা মুসলিমিন।",
    meaning: "সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানিয়েছেন।",
    category: "daily",
  },
  {
    id: 13,
    title: "Entering Toilet",
    titleBn: "বাথরুমে প্রবেশের দোয়া",
    arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    pronunciation: "বিসমিল্লাহ, আল্লাহুম্মা ইন্নি আউযুবিকা মিনাল খুবুসি ওয়াল খাবাইস।",
    meaning: "আল্লাহর নামে। হে আল্লাহ! আমি পুরুষ ও নারী শয়তান থেকে তোমার আশ্রয় প্রার্থনা করছি।",
    category: "daily",
  },
  {
    id: 14,
    title: "Leaving Toilet",
    titleBn: "বাথরুম থেকে বের হওয়ার দোয়া",
    arabic: "غُفْرَانَكَ",
    pronunciation: "গুফরানাকা।",
    meaning: "হে আল্লাহ! আমি তোমার ক্ষমা প্রার্থনা করছি।",
    category: "daily",
  },
  {
    id: 15,
    title: "Leaving Home",
    titleBn: "বাড়ি থেকে বের হওয়ার দোয়া",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    pronunciation: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহ, লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ।",
    meaning: "আল্লাহর নামে, আল্লাহর উপর ভরসা করলাম। আল্লাহ ছাড়া কোন শক্তি ও ক্ষমতা নেই।",
    category: "daily",
  },
  {
    id: 16,
    title: "Entering Home",
    titleBn: "বাড়িতে প্রবেশের দোয়া",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    pronunciation: "বিসমিল্লাহি ওয়ালাজনা, ওয়া বিসমিল্লাহি খারাজনা, ওয়া আলাল্লাহি রাব্বিনা তাওয়াক্কালনা।",
    meaning: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে বের হলাম এবং আমাদের রব আল্লাহর উপর ভরসা করলাম।",
    category: "daily",
  },
  {
    id: 17,
    title: "Ayatul Kursi",
    titleBn: "আয়াতুল কুরসি",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    pronunciation: "আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়ুম। লা তা'খুযুহু সিনাতুউ ওয়ালা নাউম। লাহু মা ফিস সামাওয়াতি ওয়া মা ফিল আরদ্ব। মান যাল্লাযি ইয়াশফাউ ইনদাহু ইল্লা বিইযনিহি। ইয়া'লামু মা বাইনা আইদিহিম ওয়া মা খালফাহুম। ওয়ালা ইউহিতুনা বিশাইয়িম মিন ইলমিহি ইল্লা বিমা শাআ। ওয়াসিআ কুরসিয়্যুহুস সামাওয়াতি ওয়াল আরদ্ব। ওয়ালা ইয়াউদুহু হিফজুহুমা ওয়া হুওয়াল আলিইয়্যুল আজিম।",
    meaning: "আল্লাহ, তিনি ছাড়া কোন উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তাঁকে তন্দ্রা ও নিদ্রা স্পর্শ করে না। আসমান ও জমিনে যা আছে সবই তাঁর। কে আছে এমন, যে তাঁর অনুমতি ব্যতীত তাঁর কাছে সুপারিশ করবে? তাদের সামনে ও পেছনে যা আছে তিনি তা জানেন। তাঁর জ্ঞানের কিছুই তারা আয়ত্ত করতে পারে না, কেবল যতটুকু তিনি ইচ্ছা করেন। তাঁর কুরসি আসমান ও জমিন পরিবেষ্টন করে আছে। আর সেগুলোর রক্ষণাবেক্ষণ তাঁর জন্য ক্লান্তিকর নয়। তিনি সুউচ্চ, মহান।",
    category: "ibadah",
  },
  {
    id: 18,
    title: "Tasbih",
    titleBn: "তাসবিহ",
    arabic: "سُبْحَانَ اللَّهِ",
    pronunciation: "সুবহানাল্লাহ",
    meaning: "আল্লাহ পবিত্র, মহান।",
    category: "ibadah",
  },
  {
    id: 19,
    title: "Tahmid",
    titleBn: "তাহমিদ",
    arabic: "الْحَمْدُ لِلَّهِ",
    pronunciation: "আলহামদুলিল্লাহ",
    meaning: "সকল প্রশংসা আল্লাহর জন্য।",
    category: "ibadah",
  },
  {
    id: 20,
    title: "Takbir",
    titleBn: "তাকবীর",
    arabic: "اللَّهُ أَكْبَرُ",
    pronunciation: "আল্লাহু আকবার",
    meaning: "আল্লাহ সর্বশ্রেষ্ঠ।",
    category: "ibadah",
  },
  {
    id: 21,
    title: "Tahlil",
    titleBn: "তাহলীল",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    pronunciation: "লা ইলাহা ইল্লাল্লাহ",
    meaning: "আল্লাহ ছাড়া কোন উপাস্য নেই।",
    category: "ibadah",
  },
  {
    id: 22,
    title: "Istighfar",
    titleBn: "ইস্তিগফার",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    pronunciation: "আস্তাগফিরুল্লাহ",
    meaning: "আমি আল্লাহর কাছে ক্ষমা চাই।",
    category: "ibadah",
  },
  {
    id: 23,
    title: "Sayyidul Istighfar",
    titleBn: "সাইয়্যিদুল ইস্তিগফার",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    pronunciation: "আল্লাহুম্মা আনতা রব্বি লা ইলাহা ইল্লা আনতা, খালাক্বতানি ওয়া আনা আবদুকা, ওয়া আনা আলা আহদিকা ওয়া ওয়া'দিকা মাস্তাত্বা'তু, আউযু বিকা মিন শাররি মা সানা'তু, আবুউ লাকা বিনি'মাতিকা আলাইয়া ওয়া আবুউ বিযানবি ফাগফিরলি, ফা ইন্নাহু লা ইয়াগফিরুয যুনুবা ইল্লা আনতা।",
    meaning: "হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া কোন উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার দাস। আমি যথাসাধ্য আপনার সাথে কৃত অঙ্গীকার ও প্রতিশ্রুতির উপর আছি। আমি আমার কৃত মন্দ কাজ থেকে আপনার কাছে আশ্রয় চাই। আমার প্রতি আপনার নিয়ামত স্বীকার করছি এবং আমার পাপ স্বীকার করছি। অতএব আমাকে ক্ষমা করুন, কারণ আপনি ছাড়া কেউ পাপ ক্ষমা করতে পারে না।",
    category: "ibadah",
  },
  {
    id: 24,
    title: "Morning & Evening",
    titleBn: "সকাল-সন্ধ্যার যিকির",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    pronunciation: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ, ওয়াল হামদুলিল্লাহ, লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকালাহু।",
    meaning: "আমরা সকালে উপনীত হয়েছি এবং সকল রাজত্ব আল্লাহর। সমস্ত প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি একক, তাঁর কোন শরিক নেই।",
    category: "ibadah",
  },
];

export default function DuaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDuas = duaList.filter((dua) => {
    const matchesCategory = selectedCategory === "all" || dua.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      dua.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.arabic.includes(searchQuery) ||
      dua.meaning.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            দোয়া সমূহ
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            প্রতিদিনের এবং বিশেষ দোয়া
          </p>
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="দোয়া খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {duaCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "bg-emerald-500 text-slate-900"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }`}
              >
                {category.nameBn}
              </button>
            ))}
          </div>
        </div>

        {/* Dua List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredDuas.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-400 text-sm sm:text-base">কোন দোয়া পাওয়া যায়নি</p>
            </div>
          ) : (
            filteredDuas.map((dua) => (
              <div
                key={dua.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-xl"
              >
                {/* Title */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-400 mb-1">
                    {dua.titleBn}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">{dua.title}</p>
                </div>

                {/* Arabic Text */}
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <p className="text-xl sm:text-2xl md:text-3xl text-right text-white font-arabic leading-relaxed">
                    {dua.arabic}
                  </p>
                </div>

                {/* Pronunciation */}
                {dua.pronunciation && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-emerald-300 mb-1">
                      উচ্চারণ:
                    </p>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {dua.pronunciation}
                    </p>
                  </div>
                )}

                {/* Meaning */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-300 mb-1">
                    অর্থ:
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {dua.meaning}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
