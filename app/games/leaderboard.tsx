
"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GameType = "quiz" | "character" | "word";
type BoardMode = "weekly" | "total" | "archive";

type LeaderboardRow = {
  player_name: string;
  game_type?: GameType;
  best_score: number;
  total_score?: number;
  last_played?: string;
  week_start?: string;
  week_end?: string;
};

const games: { id: GameType | "all"; label: string }[] = [
  { id: "all", label: "Semua Game" },
  { id: "quiz", label: "Kuis Alkitab" },
  { id: "character", label: "Tebak Tokoh" },
  { id: "word", label: "Acak Kata" },
];

const modeOptions: { id: BoardMode; label: string }[] = [
  { id: "weekly", label: "Minggu Ini" },
  { id: "total", label: "Total Skor" },
  { id: "archive", label: "Arsip Mingguan" },
];

const gameLabels: Record<GameType, string> = {
  quiz: "Kuis Alkitab",
  character: "Tebak Tokoh",
  word: "Acak Kata",
};

function formatDate(date?: string) {
  if (!date) return "-";

  const parsed = new Date(`${date.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getRank(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
}

export default function Leaderboard() {
  const [mode, setMode] = useState<BoardMode>("weekly");
  const [selectedGame, setSelectedGame] = useState<GameType | "all">("all");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [availableWeeks, setAvailableWeeks] = useState<string[]>([]);
  const [scores, setScores] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadScores = useCallback(async () => {
    if (!supabase) {
      setErrorMessage(
        "Konfigurasi Supabase belum tersedia. Periksa file .env.local."
      );
      setScores([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      if (mode === "weekly") {
        let query = supabase
          .from("bible_game_weekly_leaderboard")
          .select(
            "player_name, game_type, best_score, total_score, last_played, week_start, week_end"
          );

        if (selectedGame !== "all") {
          query = query.eq("game_type", selectedGame);
        }

        const { data, error } = await query.order(
          selectedGame === "all" ? "total_score" : "best_score",
          { ascending: false }
        ).limit(10);

        if (error) throw error;

        setScores((data ?? []) as LeaderboardRow[]);
      } else if (mode === "total") {
        const { data, error } = await supabase
          .from("bible_game_total_leaderboard")
          .select("player_name, total_score")
          .order("total_score", { ascending: false })
          .limit(10);

        if (error) throw error;

        setScores(
          (data ?? []).map((item) => ({
            player_name: item.player_name,
            best_score: Number(item.total_score ?? 0),
            total_score: Number(item.total_score ?? 0),
          }))
        );
      } else {
        const { data, error } = await supabase
          .from("bible_game_weekly_archive")
          .select(
            "player_name, game_type, best_score, total_score, last_played, week_start, week_end"
          )
          .order("week_start", { ascending: false })
          .limit(200);

        if (error) throw error;

        const archiveRows = (data ?? []) as LeaderboardRow[];

        const weeks = Array.from(
          new Set(
            archiveRows
              .map((item) => item.week_start)
              .filter((value): value is string => Boolean(value))
          )
        );

        setAvailableWeeks(weeks);

        const activeWeek =
          selectedWeek && weeks.includes(selectedWeek)
            ? selectedWeek
            : weeks[0] ?? "";

        if (activeWeek !== selectedWeek) {
          setSelectedWeek(activeWeek);
        }

        const filtered = archiveRows.filter(
          (item) => item.week_start === activeWeek
        );

        const grouped = new Map<string, LeaderboardRow>();

        for (const item of filtered) {
          if (
            selectedGame !== "all" &&
            item.game_type !== selectedGame
          ) {
            continue;
          }

          const existing = grouped.get(item.player_name);

          if (!existing) {
            grouped.set(item.player_name, {
              ...item,
              total_score: Number(
                item.total_score ?? item.best_score ?? 0
              ),
            });
          } else {
            existing.total_score =
              Number(existing.total_score ?? 0) +
              Number(item.best_score ?? 0);
          }
        }

        const result = Array.from(grouped.values()).sort(
          (a, b) =>
            Number(
              selectedGame === "all"
                ? b.total_score
                : b.best_score
            ) -
            Number(
              selectedGame === "all"
                ? a.total_score
                : a.best_score
            )
        );

        setScores(result.slice(0, 10));
      }
    } catch (error) {
      console.error("Leaderboard error:", error);
      setScores([]);
      setErrorMessage(
        "Gagal memuat leaderboard. Pastikan view Supabase sudah dibuat dan akses datanya tersedia."
      );
    } finally {
      setLoading(false);
    }
  }, [mode, selectedGame, selectedWeek]);

  useEffect(() => {
    void loadScores();
  }, [loadScores]);

  return (
    <section className="mt-8 rounded-2xl border border-[#D8C5AB] bg-[#FFFCF7] p-5 shadow-sm sm:p-7">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9B7957]">
          Youth GKSBS GPJ
        </p>

        <h2 className="mt-1 text-2xl font-bold text-[#4A3426] sm:text-3xl">
          Leaderboard
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#725D4B]">
          Asah pengetahuan Alkitabmu, kumpulkan skor, dan raih posisi
          teratas bersama pemain lainnya.
        </p>
      </div>

      {/* Mode leaderboard */}
      <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {modeOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
              mode === item.id
                ? "border-[#4A3426] bg-[#4A3426] text-[#FFF9F0]"
                : "border-[#D8C5AB] bg-white text-[#4A3426] hover:bg-[#F5EFE5]"
            }`}
          >
            {item.id === "weekly" && "📅 "}
            {item.id === "total" && "🏆 "}
            {item.id === "archive" && "🗂️ "}
            {item.label}
          </button>
        ))}
      </div>

      {/* Filter game */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9B7957]">
          Pilih kategori
        </p>

        <div className="flex flex-wrap gap-2">
          {games.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => setSelectedGame(game.id)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                selectedGame === game.id
                  ? "border-[#9B7957] bg-[#E8DCC8] text-[#4A3426]"
                  : "border-[#D8C5AB] bg-white text-[#725D4B] hover:bg-[#F5EFE5]"
              }`}
            >
              {game.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter minggu arsip */}
      {mode === "archive" && (
        <div className="mb-5">
          <label
            htmlFor="archive-week"
            className="mb-2 block text-sm font-semibold text-[#4A3426]"
          >
            Pilih minggu arsip
          </label>

          <select
            id="archive-week"
            value={selectedWeek}
            onChange={(event) => setSelectedWeek(event.target.value)}
            className="w-full rounded-xl border border-[#D8C5AB] bg-white px-4 py-3 text-sm text-[#4A3426] outline-none focus:border-[#9B7957] sm:max-w-sm"
          >
            {availableWeeks.length === 0 && (
              <option value="">Belum ada arsip</option>
            )}

            {availableWeeks.map((week) => (
              <option key={week} value={week}>
                Minggu mulai {formatDate(week)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Keterangan */}
      <div className="mb-4 rounded-xl border border-[#E8DCC8] bg-[#F5EFE5] p-4">
        <p className="font-semibold text-[#4A3426]">
          {mode === "weekly"
            ? "📅 Peringkat Minggu Ini"
            : mode === "total"
              ? "🏆 Peringkat Total"
              : "🗂️ Arsip Mingguan"}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#725D4B]">
          {mode === "weekly"
            ? selectedGame === "all"
              ? "Peringkat berdasarkan gabungan skor terbaik tiap game pada minggu berjalan."
              : `Peringkat berdasarkan skor terbaik ${gameLabels[selectedGame]} pada minggu berjalan.`
            : mode === "total"
              ? "Peringkat berdasarkan akumulasi skor terbaik dari ketiga game sepanjang waktu."
              : "Pilih minggu untuk melihat peringkat dari arsip yang tersimpan."}
        </p>
      </div>

      {/* Isi leaderboard */}
      {loading ? (
        <div className="py-10 text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-[#E8DCC8] border-t-[#4A3426]" />
          <p className="text-sm text-[#725D4B]">
            Memuat leaderboard...
          </p>
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-[#D8C5AB] bg-[#F5EFE5] p-4 text-sm leading-6 text-[#725D4B]">
          <p>{errorMessage}</p>

          <button
            type="button"
            onClick={() => void loadScores()}
            className="mt-3 font-semibold text-[#4A3426] underline"
          >
            Coba lagi
          </button>
        </div>
      ) : scores.length === 0 ? (
        <div className="rounded-xl bg-[#F5EFE5] p-7 text-center">
          <p className="text-3xl">📖</p>
          <p className="mt-3 font-semibold text-[#4A3426]">
            Belum ada skor
          </p>
          <p className="mt-1 text-sm text-[#725D4B]">
            Mainkan game Alkitab dan jadilah yang pertama masuk
            leaderboard!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E8DCC8]">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="bg-[#F5EFE5]">
              <tr className="border-b border-[#D8C5AB] text-[#725D4B]">
                <th className="px-3 py-3 font-semibold">Rank</th>
                <th className="px-3 py-3 font-semibold">Pemain</th>
                {selectedGame === "all" && mode !== "total" && (
                  <th className="px-3 py-3 font-semibold">
                    Skor
                  </th>
                )}
                <th className="px-3 py-3 text-right font-semibold">
                  {selectedGame === "all"
                    ? "Total Skor"
                    : "Skor Terbaik"}
                </th>
              </tr>
            </thead>

            <tbody>
              {scores.map((item, index) => {
                const displayedScore =
                  selectedGame === "all"
                    ? item.total_score ?? item.best_score
                    : item.best_score;

                return (
                  <tr
                    key={`${item.player_name}-${item.game_type ?? "all"}-${index}`}
                    className={`border-b border-[#EEE3D4] last:border-0 ${
                      index < 3 ? "bg-[#FFFCF7]" : "bg-white"
                    }`}
                  >
                    <td className="px-3 py-4 font-bold text-[#9B7957]">
                      {getRank(index)}
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-semibold text-[#4A3426]">
                        {item.player_name}
                      </p>

                      {item.game_type && selectedGame !== "all" && (
                        <p className="mt-1 text-xs text-[#9B7957]">
                          {gameLabels[item.game_type]}
                        </p>
                      )}
                    </td>

                    {selectedGame === "all" && mode !== "total" && (
                      <td className="px-3 py-4 text-[#725D4B]">
                        {item.total_score ?? item.best_score}
                      </td>
                    )}

                    <td className="px-3 py-4 text-right font-bold text-[#4A3426]">
                      {Number(displayedScore ?? 0).toLocaleString("id-ID")}
                      <span className="ml-1 text-xs font-medium text-[#9B7957]">
                        pts
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        onClick={() => void loadScores()}
        disabled={loading}
        className="mt-5 rounded-lg border border-[#D8C5AB] px-4 py-2 text-sm font-semibold text-[#4A3426] transition hover:bg-[#F5EFE5] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Memuat..." : "↻ Perbarui skor"}
      </button>

      <p className="mt-4 text-xs leading-5 text-[#9B7957]">
        Catatan: skor dan arsip bergantung pada data yang tersimpan
        di database. Skor lama tidak otomatis menjadi arsip mingguan
        jika tanggal permainannya tidak tersedia.
      </p>
    </section>
  );
}
