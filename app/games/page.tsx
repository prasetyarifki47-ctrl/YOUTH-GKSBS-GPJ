
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
  { id: "quiz", title: "Kuis Alkitab", icon: "📖", description: "Uji pengetahuanmu tentang Alkitab." },
  { id: "character", title: "Tebak Tokoh", icon: "👤", description: "Tebak tokoh Alkitab dari petunjuknya." },
  { id: "word", title: "Acak Kata", icon: "🔤", description: "Susun huruf menjadi kata yang benar." },
];

const questionBank: Record<GameType, Question[]> = {
  quiz: [
    { question: "Siapakah ibu Yesus?", answer: "Maria", options: ["Marta", "Maria", "Rut", "Ester"] },
    { question: "Di kota manakah Yesus dilahirkan?", answer: "Betlehem", options: ["Nazaret", "Yerusalem", "Betlehem", "Yerikho"] },
    { question: "Siapakah yang membuat bahtera?", answer: "Nuh", options: ["Musa", "Nuh", "Daud", "Yusuf"] },
    { question: "Berapa jumlah murid Yesus?", answer: "12", options: ["7", "10", "12", "40"] },
    { question: "Siapakah yang mengalahkan Goliat?", answer: "Daud", options: ["Salomo", "Daud", "Simson", "Samuel"] },
    { question: "Siapakah yang menafsirkan mimpi Firaun?", answer: "Yusuf", options: ["Yusuf", "Daniel", "Musa", "Harun"] },
    { question: "Siapakah ibu Samuel?", answer: "Hana", options: ["Debora", "Hana", "Rut", "Elisabet"] },
    { question: "Siapakah yang memimpin Israel keluar dari Mesir?", answer: "Musa", options: ["Yosua", "Harun", "Musa", "Kaleb"] },
    { question: "Di pulau manakah Yohanes menerima penglihatan Wahyu?", answer: "Patmos", options: ["Kreta", "Patmos", "Siprus", "Malta"] },
    { question: "Siapakah pemungut cukai yang memanjat pohon?", answer: "Zakheus", options: ["Nikodemus", "Zakheus", "Bartimeus", "Filipus"] },
    { question: "Siapakah raja Salem yang menjadi imam Allah Yang Mahatinggi?", answer: "Melkisedek", options: ["Melkisedek", "Abimelekh", "Nebukadnezar", "Ahasyweros"] },
    { question: "Siapakah ayah Yohanes Pembaptis?", answer: "Zakharia", options: ["Yairus", "Zakharia", "Kornelius", "Kleopas"] },
    { question: "Siapakah hakim perempuan dalam kitab Hakim-hakim?", answer: "Debora", options: ["Debora", "Yael", "Hana", "Miryam"] },
    { question: "Siapakah rekan Paulus yang dikenal sebagai tabib?", answer: "Lukas", options: ["Markus", "Silas", "Lukas", "Titus"] },
    { question: "Siapakah yang menggantikan Yudas Iskariot sebagai rasul?", answer: "Matias", options: ["Barnabas", "Matias", "Stefanus", "Apolos"] },
  ],
  character: [
    { question: "Aku membangun bahtera sebelum air bah datang. Siapakah aku?", answer: "Nuh", hint: "Kisahku ada dalam Kejadian 6–9." },
    { question: "Aku mengalahkan Goliat dengan umban dan batu. Siapakah aku?", answer: "Daud", hint: "Aku kemudian menjadi raja Israel." },
    { question: "Aku ditelan ikan besar setelah melarikan diri dari tugas Tuhan.", answer: "Yunus", hint: "Namaku juga menjadi nama sebuah kitab." },
    { question: "Aku adalah ibu Yesus. Siapakah aku?", answer: "Maria", hint: "Aku menerima kabar dari malaikat Gabriel." },
    { question: "Aku memimpin Israel keluar dari Mesir. Siapakah aku?", answer: "Musa", hint: "Tuhan memanggilku melalui semak yang menyala." },
    { question: "Aku memanjat pohon ara untuk melihat Yesus.", answer: "Zakheus", hint: "Aku kepala pemungut cukai." },
    { question: "Aku berada di gua singa dan melayani Tuhan di Babel.", answer: "Daniel", hint: "Namaku menjadi nama sebuah kitab." },
    { question: "Aku adalah ratu yang berani membela bangsaku.", answer: "Ester", hint: "Namaku menjadi nama sebuah kitab." },
    { question: "Aku menyangkal Yesus tiga kali sebelum ayam berkokok.", answer: "Petrus", hint: "Aku seorang nelayan dan rasul." },
    { question: "Aku menemani Naomi kembali ke Betlehem.", answer: "Rut", hint: "Aku berasal dari Moab." },
    { question: "Aku dikenal karena kekuatanku dan rambutku.", answer: "Simson", hint: "Kisahku ada dalam kitab Hakim-hakim." },
    { question: "Aku menggantikan Elia sebagai nabi.", answer: "Elisa", hint: "Aku meminta dua bagian roh Elia." },
    { question: "Aku menolong Paulus dan dikenal sebagai tabib.", answer: "Lukas", hint: "Aku menulis satu Injil dan Kisah Para Rasul." },
    { question: "Aku adalah saudara perempuan Musa dan seorang nabiah.", answer: "Miryam", hint: "Aku ikut memimpin pujian setelah Israel menyeberangi laut." },
    { question: "Aku adalah rekan Paulus dari Listra.", answer: "Timotius", hint: "Paulus menulis dua surat yang memakai namaku." },
  ],
  word: [
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YESUS", hint: "Y S U S E" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MUSA", hint: "S A M U" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NUH", hint: "H U N" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "DAUD", hint: "U D A D" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "RUT", hint: "T U R" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "YUSUF", hint: "F U S Y U" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MARIA", hint: "A I M R A" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "PETRUS", hint: "S U P T E R" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "DANIEL", hint: "L A D E N I" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ESTER", hint: "R S E T E" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "MELKISEDEK", hint: "K E D M E S I L E K" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "NEHEMIA", hint: "M E H N A I E" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "BARNABAS", hint: "A B R S N A B A" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "ZAKHEUS", hint: "U Z K E S A H" },
    { question: "Susun huruf menjadi nama tokoh Alkitab.", answer: "TIMOTIUS", hint: "T I M U S O T I" },
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
  return value.normalize("NFKD")
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

  // Efek suara aktif sejak awal.
  const [soundEnabled] = useState(true);
  const [volume] = useState(0.25);

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

  const playTone = useCallback((
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
  }, [getAudioContext]);

  const playEffect = useCallback((type: SoundType) => {
    if (!soundEnabledRef.current) return;

    const context = getAudioContext();

    if (!context) return;

    if (context.state === "suspended") {
      void context.resume().then(() => {
        if (soundEnabledRef.current) {
          playEffectRef.current(type);
        }
      }).catch((error: unknown) => {
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
        [392, 523.25, 659.25, 783.99, 1046.5].forEach((frequency, i) => {
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
        });
        break;
    }
  }, [getAudioContext, playTone]);

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
      !soundEnabled ||
      feedback ||
      finished ||
      timeLeft < 1 ||
      timeLeft > 5
    ) {
      return;
    }

    playEffectRef.current("tick");
  }, [timeLeft, game, gameStarted, soundEnabled, feedback, finished]);

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

    // Interaksi pengguna mengaktifkan AudioContext di browser.
    const context = getAudioContext();

    if (context?.state === "suspended") {
      void context.resume().catch((error: unknown) => {
        console.warn("AudioContext tidak dapat diaktifkan:", error);
      });
    }

    const chosen = shuffle(questionBank[game]).slice(0, TOTAL_QUESTIONS);

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

    const isCorrect = normalize(answer) === normalize(currentQuestion.answer);

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
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8A6847]">
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Bible <span className="text-[#9B754D]">Games</span>
          </h1>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C7A77B]" />

          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#725D4B]">
          </p>
        </header>

        {!playerName || editingName ? (
          <section className="mx-auto mb-8 max-w-xl rounded-2xl border border-[#D7C4AA] bg-[#FFFCF7] p-6 shadow-md sm:p-9">
            <div className="text-center">
              <span className="text-5xl">👋</span>

              <h2 className="mt-4 text-2xl font-extrabold">
                {editingName ? "Ubah Nama Pemain" : "Selamat Datang!"}
              </h2>

              <p className="mt-2 leading-relaxed text-[#725D4B]">
                Masukkan namamu agar hasil permainan dapat ditampilkan pada Leaderboard.
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
                <p id="name-error" role="alert" className="mt-2 text-sm font-bold text-rose-700">
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
                    Siap bermain, {playerName}? Baca aturan berikut sebelum memulai.
                  </p>
                </div>

                {/* Ikon speaker statis; bukan tombol musik. */}
                <div className="mt-6 flex justify-center">
                  <div
                    role="img"
                    aria-label="Efek suara aktif"
                    title="Efek suara aktif"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D7C4AA] bg-[#F5EFE5]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-[#725D4B]"
                    >
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M19 5a10 10 0 0 1 0 14" />
                    </svg>
                  </div>
                </div>

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
                  <span className="font-bold text-[#967047]">Skor: {score}</span>
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

                  <button
                    onClick={goHome}
                    className={buttonClass}
                  >
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
