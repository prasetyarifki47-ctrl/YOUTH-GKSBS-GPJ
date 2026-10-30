"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Leaderboard from "./leaderboard";
import { supabase } from "@/lib/supabase";

type GameType = "quiz" | "character" | "word";
type SoundType = "click" | "select" | "correct" | "wrong" | "win" | "tick";
type FeedbackType = "correct" | "wrong" | "timeout" | null;

type Question = {
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
};

const NAME_KEY = "youth-gpj-player-name";
const QUESTION_TIME = 20;
const TOTAL_QUESTIONS = 10;

const BLOCKED_NAME_TERMS = [
  "kontol", "memek", "ngentot", "jembut", "bangsat",
  "bajingan", "fuck", "shit", "bitch", "asshole", "motherfucker",
];

const games: {
  id: GameType;
  title: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "quiz",
    title: "Kuis Alkitab",
    icon: "📖",
    description: "Uji pengetahuanmu tentang Alkitab.",
  },
  {
    id: "character",
    title: "Tebak Tokoh",
    icon: "👤",
    description: "Tebak tokoh Alkitab dari petunjuknya.",
  },
  {
    id: "word",
    title: "Acak Kata",
    icon: "🔤",
    description: "Susun huruf menjadi kata yang benar.",
  },
];

const questionBank: Record<GameType, Question[][]> = {
  // Paket berganti otomatis setiap hari Senin. Setelah paket ke-4, siklus kembali ke paket pertama.
  quiz: [
    [
      { question: "Siapakah manusia pertama yang diciptakan Allah?", answer: "Adam", options: ["Nuh", "Adam", "Abraham", "Ishak"] },
      { question: "Siapakah istri Abraham?", answer: "Sara", options: ["Ribka", "Rahel", "Sara", "Hana"] },
      { question: "Siapakah anak Abraham dan Sara?", answer: "Ishak", options: ["Ismael", "Yakub", "Yusuf", "Ishak"] },
      { question: "Siapakah yang menerima Sepuluh Perintah Allah?", answer: "Musa", options: ["Harun", "Musa", "Yosua", "Daud"] },
      { question: "Berapa hari Allah menciptakan langit dan bumi sebelum beristirahat pada hari ketujuh?", answer: "Enam", options: ["Lima", "Enam", "Tujuh", "Delapan"] },
      { question: "Siapakah saudara laki-laki Musa?", answer: "Harun", options: ["Harun", "Kaleb", "Yosua", "Gideon"] },
      { question: "Siapakah yang memimpin bangsa Israel memasuki tanah Kanaan setelah Musa?", answer: "Yosua", options: ["Harun", "Samuel", "Yosua", "Saul"] },
      { question: "Siapakah raja Israel yang terkenal karena hikmatnya?", answer: "Salomo", options: ["Saul", "Daud", "Salomo", "Hizkia"] },
      { question: "Kitab apakah yang berada tepat setelah kitab Mazmur?", answer: "Amsal", options: ["Ayub", "Amsal", "Pengkhotbah", "Yesaya"] },
      { question: "Siapakah murid yang dikenal sebagai orang yang meragukan kebangkitan Yesus sebelum melihat-Nya?", answer: "Tomas", options: ["Andreas", "Tomas", "Filipus", "Matius"] },
    ],
    [
      { question: "Siapakah ayah Ishak?", answer: "Abraham", options: ["Yakub", "Abraham", "Ishak", "Yusuf"] },
      { question: "Siapakah anak Yakub yang dijual oleh saudara-saudaranya?", answer: "Yusuf", options: ["Benyamin", "Ruben", "Yusuf", "Yehuda"] },
      { question: "Di sungai apakah bayi Musa dihanyutkan dalam sebuah peti?", answer: "Nil", options: ["Yordan", "Efrat", "Nil", "Tigris"] },
      { question: "Siapakah perempuan Moab yang menjadi nenek moyang Daud?", answer: "Rut", options: ["Ester", "Rut", "Debora", "Naomi"] },
      { question: "Siapakah nabi yang menantang nabi-nabi Baal di Gunung Karmel?", answer: "Elia", options: ["Elisa", "Yesaya", "Elia", "Yeremia"] },
      { question: "Siapakah raja yang membangun Bait Suci pertama di Yerusalem?", answer: "Salomo", options: ["Daud", "Salomo", "Saul", "Yosia"] },
      { question: "Siapakah yang membaptis Yesus?", answer: "Yohanes Pembaptis", options: ["Petrus", "Yohanes Pembaptis", "Yakobus", "Andreas"] },
      { question: "Di taman manakah Yesus berdoa sebelum ditangkap?", answer: "Getsemani", options: ["Eden", "Getsemani", "Karmel", "Siloam"] },
      { question: "Siapakah gubernur yang mengadili Yesus?", answer: "Pontius Pilatus", options: ["Herodes", "Pontius Pilatus", "Feliks", "Festus"] },
      { question: "Kitab terakhir dalam Perjanjian Baru adalah kitab apa?", answer: "Wahyu", options: ["Yudas", "Ibrani", "Wahyu", "Kisah Para Rasul"] },
    ],
    [
      { question: "Siapakah anak sulung Adam dan Hawa?", answer: "Kain", options: ["Habel", "Kain", "Set", "Enos"] },
      { question: "Siapakah yang membangun kembali tembok Yerusalem?", answer: "Nehemia", options: ["Ezra", "Nehemia", "Daniel", "Zerubabel"] },
      { question: "Siapakah raja yang melemparkan Daniel ke gua singa?", answer: "Darius", options: ["Koresh", "Nebukadnezar", "Darius", "Belsyazar"] },
      { question: "Siapakah nabi yang diutus Tuhan kepada Niniwe?", answer: "Yunus", options: ["Amos", "Yunus", "Mikha", "Hosea"] },
      { question: "Siapakah ibu Yohanes Pembaptis?", answer: "Elisabet", options: ["Maria", "Marta", "Elisabet", "Hana"] },
      { question: "Mukjizat pertama Yesus dalam Injil Yohanes terjadi di Kana. Apa yang diubah-Nya?", answer: "Air menjadi anggur", options: ["Air menjadi anggur", "Roti menjadi ikan", "Batu menjadi roti", "Anggur menjadi air"] },
      { question: "Siapakah pemungut cukai yang menjadi salah satu dari dua belas murid Yesus?", answer: "Matius", options: ["Matius", "Markus", "Lukas", "Yohanes"] },
      { question: "Siapakah yang membantu Yesus memikul salib?", answer: "Simon dari Kirene", options: ["Yusuf dari Arimatea", "Simon dari Kirene", "Nikodemus", "Bartimeus"] },
      { question: "Pada hari ke berapakah Yesus bangkit menurut kesaksian Injil?", answer: "Hari ketiga", options: ["Hari pertama", "Hari kedua", "Hari ketiga", "Hari ketujuh"] },
      { question: "Di kota manakah para pengikut Yesus pertama kali disebut Kristen?", answer: "Antiokhia", options: ["Roma", "Yerusalem", "Antiokhia", "Efesus"] },
    ],
    [
      { question: "Siapakah saudara laki-laki Habel yang membunuhnya?", answer: "Kain", options: ["Set", "Kain", "Lamekh", "Enos"] },
      { question: "Siapakah yang bergumul dengan seorang laki-laki sampai fajar dan kemudian dinamai Israel?", answer: "Yakub", options: ["Esau", "Ishak", "Yakub", "Yusuf"] },
      { question: "Siapakah perempuan yang menyelamatkan mata-mata Israel di Yerikho?", answer: "Rahab", options: ["Rahab", "Yael", "Debora", "Abigail"] },
      { question: "Siapakah hakim yang mengalahkan orang Midian dengan 300 orang?", answer: "Gideon", options: ["Simson", "Yefta", "Gideon", "Ehud"] },
      { question: "Siapakah nabi yang menegur Daud setelah peristiwa dengan Batsyeba?", answer: "Natan", options: ["Gad", "Natan", "Samuel", "Elia"] },
      { question: "Siapakah yang dikenal sebagai pemungut cukai sebelum mengikuti Yesus dan menulis Injil?", answer: "Matius", options: ["Markus", "Matius", "Lukas", "Tomas"] },
      { question: "Siapakah pasangan suami istri yang melayani bersama Paulus dan bekerja sebagai pembuat kemah?", answer: "Akwila dan Priskila", options: ["Ananias dan Safira", "Akwila dan Priskila", "Zakharia dan Elisabet", "Maria dan Marta"] },
      { question: "Di pulau manakah Paulus mengalami karam kapal dalam perjalanan menuju Roma?", answer: "Malta", options: ["Kreta", "Patmos", "Malta", "Siprus"] },
      { question: "Siapakah pemuda yang jatuh dari jendela ketika Paulus berkhotbah di Troas?", answer: "Eutikhus", options: ["Trofimus", "Eutikhus", "Onesimus", "Titus"] },
      { question: "Surat apakah yang berisi ajaran tentang perlengkapan senjata Allah?", answer: "Efesus", options: ["Roma", "Galatia", "Efesus", "Filipi"] },
    ],
  ],
  character: [
    [
      { question: "Aku adalah saudara perempuan Musa yang menjaga adiknya ketika masih bayi. Siapakah aku?", answer: "Miryam", hint: "Aku juga memimpin pujian setelah bangsa Israel menyeberangi laut." },
      { question: "Aku adalah anak bungsu Isai yang diurapi Samuel menjadi raja. Siapakah aku?", answer: "Daud", hint: "Aku pernah mengalahkan Goliat." },
      { question: "Aku adalah seorang perempuan yang menjadi hakim dan nabiah di Israel. Siapakah aku?", answer: "Debora", hint: "Aku memimpin bersama Barak." },
      { question: "Aku meminta hikmat kepada Tuhan ketika menjadi raja. Siapakah aku?", answer: "Salomo", hint: "Aku adalah anak Daud." },
      { question: "Aku adalah saudara Esau dan menerima berkat kesulungan melalui tipu daya. Siapakah aku?", answer: "Yakub", hint: "Namaku kemudian diubah menjadi Israel." },
      { question: "Aku menafsirkan tulisan di dinding pada pesta Raja Belsyazar. Siapakah aku?", answer: "Daniel", hint: "Aku pernah berada di gua singa." },
      { question: "Aku adalah janda dari Moab yang setia mengikuti Naomi. Siapakah aku?", answer: "Rut", hint: "Aku kemudian menikah dengan Boas." },
      { question: "Aku adalah imam yang membesarkan Samuel di rumah Tuhan. Siapakah aku?", answer: "Eli", hint: "Kedua anakku bernama Hofni dan Pinehas." },
      { question: "Aku adalah murid yang membawa Natanael kepada Yesus. Siapakah aku?", answer: "Filipus", hint: "Namaku termasuk dalam daftar dua belas murid." },
      { question: "Aku adalah perempuan yang menuangkan minyak wangi kepada Yesus di Betania. Siapakah aku?", answer: "Maria", hint: "Aku adalah saudara Marta dan Lazarus." },
    ],
    [
      { question: "Aku adalah pemimpin Israel yang menggantikan Musa. Siapakah aku?", answer: "Yosua", hint: "Aku memimpin bangsa Israel menyeberangi Sungai Yordan." },
      { question: "Aku adalah ratu yang mempertaruhkan keberanianku demi menyelamatkan bangsaku. Siapakah aku?", answer: "Ester", hint: "Aku dibesarkan oleh Mordekhai." },
      { question: "Aku adalah nabi yang naik ke surga dalam angin badai. Siapakah aku?", answer: "Elia", hint: "Jubahku kemudian dipungut oleh Elisa." },
      { question: "Aku adalah penerus pelayanan nabi Elia. Siapakah aku?", answer: "Elisa", hint: "Aku meminta dua bagian roh Elia." },
      { question: "Aku adalah ibu Samuel yang berdoa dengan sungguh-sungguh memohon seorang anak. Siapakah aku?", answer: "Hana", hint: "Aku menyerahkan Samuel untuk melayani Tuhan." },
      { question: "Aku adalah saudara perempuan Lazarus yang sibuk melayani ketika Yesus berkunjung. Siapakah aku?", answer: "Marta", hint: "Saudariku bernama Maria." },
      { question: "Aku adalah orang yang menyediakan kubur bagi Yesus. Siapakah aku?", answer: "Yusuf dari Arimatea", hint: "Aku adalah anggota Majelis Besar." },
      { question: "Aku adalah rekan Paulus yang masih muda dan menerima dua surat darinya. Siapakah aku?", answer: "Timotius", hint: "Ibuku bernama Eunike." },
      { question: "Aku adalah seorang perempuan penjual kain ungu dari Tiatira yang menerima Injil di Filipi. Siapakah aku?", answer: "Lidia", hint: "Rumahku menjadi tempat Paulus dan Silas singgah." },
      { question: "Aku adalah orang yang membantu Saulus memperoleh penglihatan kembali di Damsyik. Siapakah aku?", answer: "Ananias", hint: "Tuhan menyuruhku menemui Saulus." },
    ],
    [
      { question: "Aku adalah anak Abraham dari Hagar. Siapakah aku?", answer: "Ismael", hint: "Aku lahir sebelum Ishak." },
      { question: "Aku adalah istri Ishak dan ibu Yakub serta Esau. Siapakah aku?", answer: "Ribka", hint: "Aku berasal dari keluarga Betuel." },
      { question: "Aku adalah anak Yakub yang menerima jubah indah dan dijual oleh saudara-saudaraku. Siapakah aku?", answer: "Yusuf", hint: "Aku menjadi penguasa di Mesir." },
      { question: "Aku adalah perempuan yang membunuh Sisera dengan patok kemah. Siapakah aku?", answer: "Yael", hint: "Kisahku terdapat dalam kitab Hakim-hakim." },
      { question: "Aku adalah raja yang memerintahkan pembangunan kembali Bait Allah di Yerusalem. Siapakah aku?", answer: "Koresh", hint: "Aku adalah raja Persia." },
      { question: "Aku adalah nabi yang melihat lembah penuh tulang kering. Siapakah aku?", answer: "Yehezkiel", hint: "Namaku menjadi nama salah satu kitab nabi." },
      { question: "Aku adalah perempuan yang menyembunyikan dua mata-mata Israel di Yerikho. Siapakah aku?", answer: "Rahab", hint: "Rumahku berada di tembok kota." },
      { question: "Aku adalah seorang diaken yang menjelaskan Kitab Yesaya kepada seorang sida-sida Etiopia. Siapakah aku?", answer: "Filipus", hint: "Aku kemudian ditemukan di Asdod." },
      { question: "Aku adalah rekan Paulus yang disebut sebagai tabib yang kekasih. Siapakah aku?", answer: "Lukas", hint: "Aku menulis Injil dan Kisah Para Rasul." },
      { question: "Aku adalah murid yang menggantikan Yudas Iskariot. Siapakah aku?", answer: "Matias", hint: "Aku dipilih setelah Yesus naik ke surga." },
    ],
    [
      { question: "Aku adalah ayah Yohanes Pembaptis dan seorang imam. Siapakah aku?", answer: "Zakharia", hint: "Istriku bernama Elisabet." },
      { question: "Aku adalah perempuan yang mengunjungi Elisabet setelah menerima kabar dari malaikat Gabriel. Siapakah aku?", answer: "Maria", hint: "Aku adalah ibu Yesus." },
      { question: "Aku adalah orang yang memimpin pembangunan kembali tembok Yerusalem. Siapakah aku?", answer: "Nehemia", hint: "Aku pernah menjadi juru minuman raja Persia." },
      { question: "Aku adalah sahabat Ayub yang berasal dari Teman. Siapakah aku?", answer: "Elifas", hint: "Aku termasuk salah satu teman yang datang menghiburnya." },
      { question: "Aku adalah nabi yang menegur Raja Daud melalui sebuah perumpamaan. Siapakah aku?", answer: "Natan", hint: "Aku menyampaikan kisah tentang anak domba betina." },
      { question: "Aku adalah orang Samaria yang menolong seseorang yang dirampok dalam perumpamaan Yesus. Siapakah aku?", answer: "Orang Samaria", hint: "Kisahku mengajarkan kasih kepada sesama." },
      { question: "Aku adalah perempuan yang menjadi saksi pertama kebangkitan Yesus menurut Injil Yohanes. Siapakah aku?", answer: "Maria Magdalena", hint: "Yesus memanggil namaku di dekat kubur." },
      { question: "Aku adalah seorang pemuda yang tertidur saat Paulus berkhotbah panjang di Troas. Siapakah aku?", answer: "Eutikhus", hint: "Aku jatuh dari tingkat tiga." },
      { question: "Aku adalah kepala rumah ibadat yang anak perempuannya dibangkitkan Yesus. Siapakah aku?", answer: "Yairus", hint: "Aku memohon kepada Yesus agar anakku disembuhkan." },
      { question: "Aku adalah orang Farisi yang datang kepada Yesus pada malam hari. Siapakah aku?", answer: "Nikodemus", hint: "Yesus berbicara kepadaku tentang kelahiran kembali." },
    ],
  ],
  word: [
    [
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ABRAHAM", hint: "M A H R A B A" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ISHak".toUpperCase(), hint: "K A H I S" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YAKUB", hint: "B U K A Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MIRYAM", hint: "Y A M I R M" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "HARUN", hint: "N A R U H" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YOSUA", hint: "A U S O Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "SALOMO", hint: "O M A L O S" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ELIA", hint: "A I L E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ELISA", hint: "A S E L I" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "DEBORA", hint: "A R O B E D" },
    ],
    [
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "GIDEON", hint: "D O N E I G" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YUNUS", hint: "S U N U Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ESTER", hint: "R E T S E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "RAHAB", hint: "B A H A R" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NAOMI", hint: "I M A O N" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "BOAS", hint: "S O A B" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "DANIEL", hint: "L A D E N I" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NEHEMIA", hint: "M E H N A I E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "LIDIA", hint: "A I D L I" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MATIAS", hint: "S A T I M A" },
    ],
    [
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "TIMOTIUS", hint: "T I M U S O T I" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "PRISKILA", hint: "K I L A P R I S" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "AKWILA", hint: "A W I L A K" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NIKODEMUS", hint: "S U M E D O K I N" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ZAKHEUS", hint: "U Z K E S A H" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "BARTIMEUS", hint: "S U B A R T I M E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YOHANES", hint: "S E N A H O Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ANDREAS", hint: "S A N D R E A" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "FILIPUS", hint: "S U P I L I F" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "BARNABAS", hint: "A B R S N A B A" },
    ],
    [
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YEREMIA", hint: "A M E R I Y E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YEHEZKIEL", hint: "L E I K Z E H E Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ZAKHARIA", hint: "A R I A K H Z A" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ELISABET", hint: "T E B A S I L E" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YAIrus".toUpperCase(), hint: "S U R I A Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NATAN", hint: "A N T A N" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "GABRIEL", hint: "L E R I A B G" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MALAKHI", hint: "I H A L K A M" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YOEL", hint: "L O E Y" },
      { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "AMOS", hint: "S O M A" },
    ],
  ],
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}


// Menghitung minggu berdasarkan kalender lokal (Senin–Minggu).
// Paket yang sama dipakai semua pemain selama minggu berjalan.
function getWeeklyQuestionSet<T>(weeklySets: T[][]): T[] {
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const mondayOffset = (localMidnight.getDay() + 6) % 7;
  localMidnight.setDate(localMidnight.getDate() - mondayOffset);

  const epochMonday = new Date(2024, 0, 1); // Senin
  const weeksSinceEpoch = Math.floor(
    (localMidnight.getTime() - epochMonday.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  const packageIndex = ((weeksSinceEpoch % weeklySets.length) + weeklySets.length) % weeklySets.length;
  return weeklySets[packageIndex];
}

function scramble(word: string): string {
  for (let i = 0; i < 15; i++) {
    const mixed = shuffle(word.split("")).join("");
    if (mixed !== word) return mixed;
  }

  return word.split("").reverse().join("");
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("id-ID").replace(/\s+/g, "");
}

function normalizeNameForModeration(value: string): string {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase("id-ID")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function isAppropriateName(value: string): boolean {
  const normalized = normalizeNameForModeration(value);

  if (normalized.length < 2 || normalized.length > 40) return false;

  return !BLOCKED_NAME_TERMS.some((term) =>
    normalized.includes(normalizeNameForModeration(term))
  );
}

export default function GamesPage() {
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [editingName, setEditingName] = useState(false);

  const [game, setGame] = useState<GameType | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const [saved, setSaved] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  const [wordOrder, setWordOrder] = useState<Record<number, string>>({});

  // Efek suara selalu aktif. Tidak ada tombol pengaturan suara.
  const audioContextRef = useRef<AudioContext | null>(null);
  const volumeRef = useRef(0.25);
  const soundEnabledRef = useRef(true);
  const timeoutHandledRef = useRef(false);
  const playEffectRef = useRef<(type: SoundType) => void>(() => {});

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) return null;

      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      duration: number,
      volumeAmount: number,
      wave: OscillatorType = "sine",
      endFrequency?: number
    ) => {
      const context = getAudioContext();

      if (!context || context.state !== "running") return;

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, now);

      if (endFrequency !== undefined) {
        oscillator.frequency.exponentialRampToValueAtTime(
          Math.max(20, endFrequency),
          now + duration
        );
      }

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.0001, volumeAmount * volumeRef.current),
        now + Math.min(0.025, duration / 3)
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.03);
    },
    [getAudioContext]
  );

  const playEffect = useCallback(
    (type: SoundType) => {
      if (!soundEnabledRef.current) return;

      const context = getAudioContext();

      if (!context) return;

      if (context.state === "suspended") {
        void context
          .resume()
          .then(() => {
            if (soundEnabledRef.current) {
              playEffectRef.current(type);
            }
          })
          .catch((error: unknown) => {
            console.warn("Efek suara tidak dapat diputar:", error);
          });

        return;
      }

      switch (type) {
        case "click":
          playTone(720, 0.07, 0.07, "sine", 520);
          break;

        case "select":
          playTone(440, 0.08, 0.08, "triangle");
          window.setTimeout(() => {
            if (soundEnabledRef.current) {
              playTone(660, 0.1, 0.07, "triangle");
            }
          }, 55);
          break;

        case "correct":
          playTone(523.25, 0.16, 0.17, "triangle");
          window.setTimeout(() => {
            if (soundEnabledRef.current) {
              playTone(659.25, 0.18, 0.15, "triangle");
            }
          }, 100);
          window.setTimeout(() => {
            if (soundEnabledRef.current) {
              playTone(783.99, 0.26, 0.13, "sine");
            }
          }, 200);
          break;

        case "wrong":
          playTone(300, 0.18, 0.12, "sawtooth", 230);
          window.setTimeout(() => {
            if (soundEnabledRef.current) {
              playTone(180, 0.22, 0.08, "triangle");
            }
          }, 130);
          break;

        case "tick":
          playTone(1100, 0.055, 0.065, "square", 800);
          break;

        case "win":
          [392, 523.25, 659.25, 783.99, 1046.5].forEach(
            (frequency, i) => {
              window.setTimeout(() => {
                if (soundEnabledRef.current) {
                  playTone(
                    frequency,
                    i === 4 ? 0.55 : 0.22,
                    0.13,
                    "triangle"
                  );
                }
              }, i * 140);
            }
          );
          break;
      }
    },
    [getAudioContext, playTone]
  );

  playEffectRef.current = playEffect;

  // AudioContext ditutup saat halaman dilepas.
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem(NAME_KEY);

      if (storedName) {
        setPlayerName(storedName);
        setNameInput(storedName);
      }
    } catch {
      // Aplikasi tetap berjalan jika localStorage tidak tersedia.
    }
  }, []);

  // TIMER BERLAKU UNTUK KETIGA GAME.
  useEffect(() => {
    if (
      !game ||
      !gameStarted ||
      !questions[index] ||
      finished ||
      feedback ||
      timeLeft <= 0
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [game, gameStarted, questions, index, finished, feedback, timeLeft]);

  // Waktu habis.
  useEffect(() => {
    if (
      !game ||
      !gameStarted ||
      !questions[index] ||
      finished ||
      feedback ||
      timeLeft > 0 ||
      timeoutHandledRef.current
    ) {
      return;
    }

    timeoutHandledRef.current = true;
    setFeedback("timeout");
    setAnswer("");
    playEffectRef.current("wrong");
  }, [game, gameStarted, questions, index, finished, feedback, timeLeft]);

  // Bunyi countdown lima detik terakhir.
  useEffect(() => {
    if (
      !game ||
      !gameStarted ||
      feedback ||
      finished ||
      timeLeft < 1 ||
      timeLeft > 5
    ) {
      return;
    }

    playEffectRef.current("tick");
  }, [timeLeft, game, gameStarted, feedback, finished]);

  function savePlayerName() {
    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError("Nama pemain wajib diisi.");
      return;
    }

    if (trimmed.length < 2 || trimmed.length > 40) {
      setNameError("Nama harus terdiri dari 2–40 karakter.");
      return;
    }

    if (!isAppropriateName(trimmed)) {
      setNameError(
        "Nama mengandung kata yang tidak diperbolehkan. Silakan gunakan nama lain."
      );
      return;
    }

    setNameError("");
    setPlayerName(trimmed);
    setNameInput(trimmed);
    setEditingName(false);

    try {
      localStorage.setItem(NAME_KEY, trimmed);
    } catch {
      // Nama tetap tersedia selama sesi.
    }

    playEffect("correct");
  }

  function changePlayerName() {
    setNameInput(playerName);
    setNameError("");
    setEditingName(true);
    setGame(null);
    setGameStarted(false);
    setFinished(false);
    setFeedback(null);
    setQuestions([]);
    playEffect("click");
  }

  function selectGame(selectedGame: GameType) {
    setGame(selectedGame);
    setGameStarted(false);
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setAnswer("");
    setFeedback(null);
    setFinished(false);
    setSaved(false);
    setSubmittingScore(false);
    setTimeLeft(QUESTION_TIME);
    timeoutHandledRef.current = false;

    playEffect("click");
  }

  function startGame() {
    if (!game) return;

    // Interaksi pengguna membantu mengaktifkan AudioContext di browser.
    const context = getAudioContext();

    if (context?.state === "suspended") {
      void context.resume().catch((error: unknown) => {
        console.warn("AudioContext tidak dapat diaktifkan:", error);
      });
    }

    const weeklyQuestions = getWeeklyQuestionSet(questionBank[game]);
    const chosen = shuffle(weeklyQuestions).slice(0, TOTAL_QUESTIONS);

    setQuestions(chosen);
    setIndex(0);
    setScore(0);
    setAnswer("");
    setFeedback(null);
    setFinished(false);
    setSaved(false);
    setSubmittingScore(false);
    setTimeLeft(QUESTION_TIME);
    timeoutHandledRef.current = false;

    setWordOrder(
      Object.fromEntries(
        chosen.map((question, i) => [
          i,
          game === "word" ? scramble(question.answer) : "",
        ])
      )
    );

    setGameStarted(true);
    playEffect("click");
  }

  function checkAnswer() {
    const currentQuestion = questions[index];

    if (!currentQuestion || feedback || !answer.trim() || timeLeft <= 0) {
      return;
    }

    const isCorrect =
      normalize(answer) === normalize(currentQuestion.answer);

    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((previous) => previous + 10);
      playEffect("correct");
    } else {
      playEffect("wrong");
    }
  }

  async function nextQuestion() {
    if (submittingScore || !game || !feedback) return;

    if (index + 1 < questions.length) {
      setIndex((previous) => previous + 1);
      setAnswer("");
      setFeedback(null);
      setTimeLeft(QUESTION_TIME);
      timeoutHandledRef.current = false;
      return;
    }

    setSubmittingScore(true);
    setSaved(false);

    let globalSaved = false;

    if (!supabase) {
      console.error("Supabase belum terkonfigurasi.");
    } else if (!playerName.trim()) {
      console.error("Nama pemain masih kosong.");
    } else {
      try {
        const { data, error } = await supabase.rpc(
          "submit_bible_game_score",
          {
            p_player_name: playerName.trim(),
            p_game_type: game,
            p_difficulty: "medium",
            p_score: score,
          }
        );

        if (error) {
          console.error("Gagal menyimpan skor global:", error);
        } else if (data === true) {
          globalSaved = true;
        } else {
          console.error("Penyimpanan skor belum dikonfirmasi:", data);
        }
      } catch (error) {
        console.error("Koneksi Supabase bermasalah:", error);
      }
    }

    setSaved(globalSaved);
    setSubmittingScore(false);
    setFinished(true);
    playEffect("win");
  }

  function goHome() {
    setGame(null);
    setGameStarted(false);
    setFinished(false);
    setFeedback(null);
    setAnswer("");
    setQuestions([]);
    setIndex(0);
    setTimeLeft(QUESTION_TIME);
    setSubmittingScore(false);
    timeoutHandledRef.current = false;

    playEffect("click");
  }

  const current = questions[index];
  const selectedGame = games.find((item) => item.id === game);
  const maxScore = questions.length * 10;
  const timerPercentage = (timeLeft / QUESTION_TIME) * 100;
  const timerUrgent = timeLeft <= 5;

  const buttonClass =
    "rounded-xl border border-[#D7C4AA] px-5 py-3 font-bold text-[#725D4B] transition hover:bg-[#F5EFE5]";

  return (
    <main
      className="min-h-screen bg-[#F5EFE5] px-4 pb-12 pt-32 text-[#4A3426] sm:px-6 sm:pt-36"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          onClick={() => playEffect("click")}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C7A77B] bg-[#E8DCC8] px-4 py-2 text-sm font-bold transition hover:bg-[#C7A77B]"
        >
          ← Kembali ke Beranda
        </Link>

        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8A6847]"></p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Bible <span className="text-[#9B754D]">Games</span>
          </h1>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C7A77B]" />

          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#725D4B]"></p>
        </header>

        {!playerName || editingName ? (
          <section className="mx-auto mb-8 max-w-xl rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-6 shadow-md sm:p-9">
            <div className="text-center">
              <span className="text-5xl">👋</span>

              <h2 className="mt-4 text-2xl font-extrabold">
                {editingName ? "Ubah Nama Pemain" : "Selamat Datang!"}
              </h2>

              <p className="mt-2 leading-relaxed text-[#725D4B]">
                Masukkan namamu agar hasil permainan dapat ditampilkan pada
                Leaderboard.
              </p>
            </div>

            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                savePlayerName();
              }}
            >
              <label htmlFor="player-name" className="mb-2 block font-bold">
                Nama pemain
              </label>

              <input
                id="player-name"
                type="text"
                value={nameInput}
                onChange={(event) => {
                  setNameInput(event.target.value);
                  setNameError("");
                }}
                maxLength={40}
                autoComplete="nickname"
                placeholder="Contoh: Rifki"
                className="w-full rounded-xl border border-[#D7C4AA] bg-white px-4 py-3 outline-none transition placeholder:text-[#A28E78] focus:border-[#967047] focus:ring-2 focus:ring-[#C7A77B]/30"
                required
                autoFocus
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
              />

              {nameError && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-2 text-sm font-bold text-rose-700"
                >
                  {nameError}
                </p>
              )}

              <button
                type="submit"
                disabled={!nameInput.trim()}
                className="mt-4 w-full rounded-xl bg-[#4A3426] px-5 py-3 font-bold text-[#F5EFE5] transition hover:bg-[#604735] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Simpan Nama & Mulai →
              </button>

              {editingName && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingName(false);
                    setNameInput(playerName);
                    setNameError("");
                  }}
                  className="mt-3 w-full rounded-xl border border-[#D7C4AA] px-5 py-3 font-bold hover:bg-[#F5EFE5]"
                >
                  Batal
                </button>
              )}
            </form>
          </section>
        ) : (
          <>
            <section className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8DCC8] text-2xl">
                  👤
                </div>

                <div>
                  <p className="text-sm text-[#725D4B]">Selamat bermain,</p>
                  <h2 className="text-xl font-extrabold">{playerName}!</h2>
                </div>
              </div>

              <button
                onClick={changePlayerName}
                className="rounded-xl border border-[#D7C4AA] px-4 py-2 text-sm font-bold transition hover:bg-[#F5EFE5]"
              >
                Ubah Nama
              </button>
            </section>

            {!game && (
              <>
                <div className="mb-8 grid gap-5 md:grid-cols-3">
                  {games.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectGame(item.id)}
                      className="group rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9B754D] hover:shadow-lg"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8DCC8] text-4xl transition group-hover:bg-[#C7A77B]">
                        {item.icon}
                      </span>

                      <h2 className="mt-5 text-xl font-bold">{item.title}</h2>

                      <p className="mt-2 leading-relaxed text-[#725D4B]">
                        {item.description}
                      </p>

                      <span className="mt-5 inline-block font-bold text-[#967047]">
                        Pilih permainan →
                      </span>
                    </button>
                  ))}
                </div>

                <Leaderboard />
              </>
            )}

            {game && !gameStarted && !finished && (
              <section className="mx-auto max-w-2xl rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-6 shadow-md sm:p-9">
                <div className="text-center">
                  <span className="text-6xl">{selectedGame?.icon}</span>

                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#8A6847]">
                    Persiapan Permainan
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold">
                    {selectedGame?.title}
                  </h2>

                  <p className="mt-3 leading-relaxed text-[#725D4B]">
                    Siap bermain, {playerName}? Baca aturan berikut sebelum
                    memulai.
                  </p>
                </div>

                {/* Tidak ada ikon atau tombol pengaturan suara. */}

                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4">
                    <span className="text-2xl">📝</span>
                    <div>
                      <p className="font-bold">10 soal</p>
                      <p className="text-sm text-[#725D4B]">
                        Permainan akan memberikan 10 pertanyaan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-bold">10 poin per jawaban benar</p>
                      <p className="text-sm text-[#725D4B]">
                        Skor maksimal adalah 100 poin.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="font-bold">20 detik per soal</p>
                      <p className="text-sm text-[#725D4B]">
                        Jawab sebelum waktu habis untuk mendapatkan poin.
                      </p>
                    </div>
                  </div>

                  {game === "character" && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="font-bold">Gunakan petunjuk</p>
                        <p className="text-sm text-[#725D4B]">
                          Baca petunjuk untuk menebak tokoh Alkitab.
                        </p>
                      </div>
                    </div>
                  )}

                  {game === "word" && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4">
                      <span className="text-2xl">🔤</span>
                      <div>
                        <p className="font-bold">Susun huruf</p>
                        <p className="text-sm text-[#725D4B]">
                          Gunakan huruf acak untuk menemukan jawaban.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={startGame}
                  className="mt-7 w-full rounded-xl bg-[#4A3426] px-5 py-4 text-lg font-extrabold text-[#F5EFE5] transition hover:bg-[#604735]"
                >
                  Mulai Permainan →
                </button>

                <button
                  onClick={goHome}
                  className="mt-4 w-full rounded-xl border border-[#D7C4AA] px-5 py-3 font-bold transition hover:bg-[#F5EFE5]"
                >
                  ← Pilih Permainan Lain
                </button>
              </section>
            )}

            {game && gameStarted && current && !finished && (
              <section className="mx-auto max-w-2xl rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-5 shadow-md sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#E8DCC8] px-4 py-2 font-bold">
                    {selectedGame?.title}
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      aria-live="polite"
                      className={`rounded-full border px-4 py-2 text-sm font-extrabold tabular-nums ${
                        timerUrgent
                          ? "animate-pulse border-rose-400 bg-rose-100 text-rose-800"
                          : "border-[#D7C4AA] bg-[#F5EFE5] text-[#725D4B]"
                      }`}
                    >
                      ⏱ {timeLeft} detik
                    </span>

                    <span className="rounded-full border border-[#D7C4AA] px-4 py-2 text-sm font-bold text-[#8A6847]">
                      Soal {index + 1}/{questions.length}
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8DCC8]">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      timerUrgent ? "bg-rose-500" : "bg-[#967047]"
                    }`}
                    style={{ width: `${timerPercentage}%` }}
                  />
                </div>

                <p className="mt-5 text-sm text-[#725D4B]">
                  Pemain: <strong>{playerName}</strong>
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-[#725D4B]">
                  <span>Progres permainan</span>
                  <span className="font-bold text-[#967047]">
                    Skor: {score}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8DCC8]">
                  <div
                    className="h-full rounded-full bg-[#967047] transition-all duration-300"
                    style={{
                      width: `${((index + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                <h2 className="mt-8 text-2xl font-bold leading-snug">
                  {current.question}
                </h2>

                {game === "word" && (
                  <div className="mt-5 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#725D4B]">
                      Huruf acak
                    </p>
                    <p className="mt-3 break-all text-2xl font-extrabold tracking-[0.2em] text-[#8A6847] sm:text-3xl">
                      {wordOrder[index]}
                    </p>
                  </div>
                )}

                {game === "character" && current.hint && (
                  <p className="mt-4 rounded-xl border border-[#D7C4AA] bg-[#F5EFE5] p-4 leading-relaxed text-[#725D4B]">
                    💡 <strong>Petunjuk:</strong> {current.hint}
                  </p>
                )}

                {game === "quiz" ? (
                  <div className="mt-5 grid gap-3">
                    {current.options?.map((option) => (
                      <button
                        key={option}
                        disabled={!!feedback || timeLeft <= 0}
                        onClick={() => {
                          setAnswer(option);
                          playEffect("select");
                        }}
                        className={`rounded-xl border p-4 text-left transition ${
                          answer === option
                            ? "border-[#967047] bg-[#E8DCC8] font-bold"
                            : "border-[#D7C4AA] bg-white hover:bg-[#F5EFE5]"
                        } disabled:cursor-default disabled:opacity-70`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !feedback &&
                        answer.trim() &&
                        timeLeft > 0
                      ) {
                        checkAnswer();
                      }
                    }}
                    disabled={!!feedback || timeLeft <= 0}
                    placeholder="Tulis jawabanmu..."
                    className="mt-5 w-full rounded-xl border border-[#D7C4AA] bg-white px-4 py-3 outline-none placeholder:text-[#A28E78] focus:border-[#967047] focus:ring-2 focus:ring-[#C7A77B]/30 disabled:opacity-70"
                  />
                )}

                {feedback && (
                  <div
                    aria-live="polite"
                    className={`mt-5 rounded-xl border p-4 ${
                      feedback === "correct"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : feedback === "timeout"
                          ? "border-amber-300 bg-amber-50 text-amber-900"
                          : "border-rose-300 bg-rose-50 text-rose-800"
                    }`}
                  >
                    <p className="font-bold">
                      {feedback === "correct"
                        ? "✓ Benar! +10 poin"
                        : feedback === "timeout"
                          ? "⏰ Waktu habis! 0 poin."
                          : "Belum tepat."}
                    </p>

                    {feedback !== "correct" && (
                      <p className="mt-1">
                        Jawaban yang benar: <strong>{current.answer}</strong>
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {!feedback ? (
                    <button
                      onClick={checkAnswer}
                      disabled={!answer.trim() || timeLeft <= 0}
                      className="flex-1 rounded-xl bg-[#4A3426] px-5 py-3 font-bold text-[#F5EFE5] transition hover:bg-[#604735] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Periksa Jawaban
                    </button>
                  ) : (
                    <button
                      onClick={() => void nextQuestion()}
                      disabled={submittingScore}
                      className="flex-1 rounded-xl bg-[#C7A77B] px-5 py-3 font-bold text-[#4A3426] transition hover:bg-[#B79567] disabled:cursor-wait disabled:opacity-60"
                    >
                      {submittingScore
                        ? "Menyimpan skor..."
                        : index + 1 === questions.length
                          ? "Lihat Hasil"
                          : "Soal Berikutnya →"}
                    </button>
                  )}

                  <button onClick={goHome} className={buttonClass}>
                    Keluar
                  </button>
                </div>
              </section>
            )}

            {finished && game && (
              <section className="mx-auto max-w-xl rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-6 text-center shadow-md sm:p-10">
                <p className="text-5xl">🎉</p>

                <h2 className="mt-5 text-3xl font-extrabold">
                  Hebat, {playerName}!
                </h2>

                <p className="mt-3 leading-relaxed text-[#725D4B]">
                  Kamu telah menyelesaikan {selectedGame?.title}. Terus belajar
                  dan bertumbuh dalam Firman Tuhan!
                </p>

                <div className="mt-7 rounded-2xl border border-[#D7C4AA] bg-[#F5EFE5] p-6">
                  <p className="text-[#725D4B]">Skor akhir {playerName}</p>
                  <p className="mt-2 text-5xl font-extrabold text-[#967047]">
                    {score}
                  </p>
                  <p className="mt-2 text-sm text-[#725D4B]">
                    dari maksimal {maxScore} poin
                  </p>

                  <div className="mx-auto my-5 h-px max-w-xs bg-[#D7C4AA]" />

                  <p className="font-bold">🏆 Leaderboard Global</p>

                  <p className="mt-2 text-sm text-[#725D4B]">
                    {saved
                      ? "✓ Skor berhasil dikirim ke leaderboard global!"
                      : "Skor belum berhasil dikirim ke leaderboard global. Periksa Console browser dan konfigurasi Supabase."}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={startGame}
                    className="flex-1 rounded-xl bg-[#4A3426] px-5 py-3 font-bold text-[#F5EFE5] transition hover:bg-[#604735]"
                  >
                    Main Lagi
                  </button>

                  <button
                    onClick={goHome}
                    className="flex-1 rounded-xl border border-[#C7A77B] bg-[#E8DCC8] px-5 py-3 font-bold transition hover:bg-[#C7A77B]"
                  >
                    Menu Utama
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        <footer className="mt-12 border-t border-[#D7C4AA] pt-6 text-center text-sm text-[#8A7560]">
          Youth GKSBS Gunung Pasir Jaya
          <p className="mt-1 italic">We Grow In Christ</p>
        </footer>
      </div>
    </main>
  );
}