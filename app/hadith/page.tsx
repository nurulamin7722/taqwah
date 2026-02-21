"use client";

import { useEffect, useState } from "react";

interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  ar: string;
  grade_id: number;
  grade: string;
  grade_color: string;
  note: string | null;
}

interface HadithBook {
  id: string;
  name: string;
  nameBn: string;
  folderName: string;
  totalHadiths: number;
}

const hadithBooks: HadithBook[] = [
  { id: "bukhari", name: "Sahih Bukhari", nameBn: "সহিহ বুখারী", folderName: "Bukhari", totalHadiths: 7563 },
  { id: "muslim", name: "Sahih Muslim", nameBn: "সহিহ মুসলিম", folderName: "Muslim", totalHadiths: 7563 },
  { id: "abudawud", name: "Sunan Abu Dawud", nameBn: "সুনানে আবু দাউদ", folderName: "AbuDaud", totalHadiths: 5274 },
  { id: "nasai", name: "Sunan an-Nasa'i", nameBn: "সুনানে আন-নাসায়ী", folderName: "Al-Nasai", totalHadiths: 5758 },
  { id: "tirmidzi", name: "Jami' at-Tirmidhi", nameBn: "জামি আত-তিরমিযী", folderName: "At-tirmizi", totalHadiths: 3956 },
  { id: "ibnmajah", name: "Sunan Ibn Majah", nameBn: "সুনানে ইবনে মাজাহ", folderName: "Ibne-Mazah", totalHadiths: 4341 },
];

// Helper to load hadith from local JSON files
const loadHadithFromLocal = async (folderName: string, hadithId: number): Promise<Hadith | null> => {
  try {
    const response = await fetch(`/${folderName}/hadith/${hadithId}.json`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.hadith;
  } catch (error) {
    console.error(`Error loading hadith ${hadithId} from ${folderName}:`, error);
    return null;
  }
};

export default function HadithPage() {
  const [selectedBook, setSelectedBook] = useState("bukhari");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNumber, setSearchNumber] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const copyHadithToClipboard = async (hadith: Hadith) => {
    const selectedBookInfo = hadithBooks.find((b) => b.id === selectedBook);
    const textToCopy = `হাদিস #${hadith.hadith_id}
গ্রন্থ: ${selectedBookInfo?.nameBn || ''}
মান: ${hadith.grade}
${hadith.narrator ? `\nবর্ণনাকারী:\n${hadith.narrator}\n` : ''}
আরবি:\n${hadith.ar}

বাংলা অনুবাদ:\n${hadith.bn}${hadith.note ? `\n\nবিশেষ দ্রষ্টব্য:\n${hadith.note}` : ''}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(hadith.hadith_id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fetchHadiths = async (book: string, page: number) => {
    setLoading(true);
    setError(null);
    setIsSearchMode(false);
    
    try {
      const selectedBookInfo = hadithBooks.find((b) => b.id === book);
      if (!selectedBookInfo) {
        throw new Error("Book not found");
      }

      const start = (page - 1) * itemsPerPage + 1;
      const end = Math.min(start + itemsPerPage - 1, selectedBookInfo.totalHadiths);
      
      const hadithPromises = [];
      for (let i = start; i <= end; i++) {
        hadithPromises.push(loadHadithFromLocal(selectedBookInfo.folderName, i));
      }
      
      const loadedHadiths = await Promise.all(hadithPromises);
      const validHadiths = loadedHadiths.filter((h): h is Hadith => h !== null);
      
      if (validHadiths.length === 0) {
        throw new Error("No hadiths found");
      }
      
      setHadiths(validHadiths);
    } catch (err) {
      setError("হাদিস লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHadith = async () => {
    const hadithNum = parseInt(searchNumber);
    
    if (!searchNumber || isNaN(hadithNum) || hadithNum < 1) {
      setError("সঠিক হাদিস নম্বর দিন।");
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearchMode(true);
    
    try {
      const selectedBookInfo = hadithBooks.find((b) => b.id === selectedBook);
      if (!selectedBookInfo) {
        throw new Error("Book not found");
      }

      if (hadithNum > selectedBookInfo.totalHadiths) {
        throw new Error(`এই গ্রন্থে শুধুমাত্র ${selectedBookInfo.totalHadiths} টি হাদিস রয়েছে।`);
      }
      
      const hadith = await loadHadithFromLocal(selectedBookInfo.folderName, hadithNum);
      
      if (!hadith) {
        throw new Error("হাদিস খুঁজে পাওয়া যায়নি।");
      }
      
      setHadiths([hadith]);
    } catch (err: any) {
      setError(err.message || "হাদিস খুঁজে পাওয়া যায়নি।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      fetchHadiths(selectedBook, currentPage);
    }
  }, [selectedBook, currentPage]);

  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    setCurrentPage(1);
    setSearchNumber("");
    setError(null);
    setIsSearchMode(false);
  };

  const resetSearch = () => {
    setSearchNumber("");
    setError(null);
    setIsSearchMode(false);
    fetchHadiths(selectedBook, currentPage);
  };

  const handlePageChange = (newPage: number) => {
    const selectedBookInfo = hadithBooks.find((b) => b.id === selectedBook);
    const totalPages = selectedBookInfo ? Math.ceil(selectedBookInfo.totalHadiths / itemsPerPage) : 1;
    
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectedBookInfo = hadithBooks.find((b) => b.id === selectedBook);
  const totalPages = selectedBookInfo ? Math.ceil(selectedBookInfo.totalHadiths / itemsPerPage) : 1;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            হাদিস সংগ্রহ
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            সহিহ হাদিস গ্রন্থসমূহ থেকে
          </p>
        </div>

        {/* Book Selection */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {hadithBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookChange(book.id)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedBook === book.id
                    ? "bg-emerald-500 text-slate-900 shadow-lg"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{book.nameBn}</div>
                  <div className="text-[10px] sm:text-xs opacity-70 mt-0.5">
                    {book.totalHadiths} টি
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
              {selectedBookInfo?.nameBn} - মোট {selectedBookInfo?.totalHadiths} টি হাদিস
            </p>
            <div className="flex gap-2 sm:gap-3">
              <input
                type="number"
                placeholder="হাদিস নম্বর লিখুন..."
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchHadith()}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={searchHadith}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-500 text-slate-900 rounded-lg font-semibold text-sm sm:text-base hover:bg-emerald-600 transition-all"
              >
                খুঁজুন
              </button>
              {isSearchMode && (
                <button
                  onClick={resetSearch}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-slate-600 transition-all"
                >
                  সব দেখুন
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="space-y-4 sm:space-y-6 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-32 bg-slate-700/40 rounded"></div>
                  <div className="h-8 w-20 bg-slate-700/40 rounded"></div>
                </div>
                <div className="h-20 bg-slate-700/30 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-700/40 rounded"></div>
                  <div className="h-16 bg-slate-700/30 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-700/40 rounded"></div>
                  <div className="h-20 bg-slate-700/30 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4 sm:p-6 text-center">
            <p className="text-red-400 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Hadiths List */}
        {!loading && !error && hadiths.length > 0 && (
          <>
            <div className="space-y-4 sm:space-y-6">
              {hadiths.map((hadith) => (
                <div
                  key={hadith.hadith_id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-xl relative"
                >
                  {/* Copy Button */}
                  <button
                    onClick={() => copyHadithToClipboard(hadith)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-700 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all duration-200 group z-10"
                    title="হাদিস কপি করুন"
                  >
                    {copiedId === hadith.hadith_id ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Hadith Number and Grade */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2 pr-10 sm:pr-12">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border border-emerald-500/30">
                      হাদিস #{hadith.hadith_id}
                    </span>
                    <span 
                      className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border"
                      style={{
                        backgroundColor: `${hadith.grade_color}20`,
                        color: hadith.grade_color,
                        borderColor: `${hadith.grade_color}50`,
                      }}
                    >
                      {hadith.grade}
                    </span>
                  </div>

                  {/* Narrator */}
                  {hadith.narrator && (
                    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-amber-950/30 rounded-lg border border-amber-800/30">
                      <p className="text-xs sm:text-sm font-semibold text-amber-300 mb-1">
                        বর্ণনাকারী:
                      </p>
                      <p className="text-sm sm:text-base text-amber-100">
                        {hadith.narrator}
                      </p>
                    </div>
                  )}

                  {/* Arabic Text */}
                  <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <p className="text-xl sm:text-2xl md:text-3xl text-right text-white font-arabic leading-loose sm:leading-relaxed">
                      {hadith.ar}
                    </p>
                  </div>

                  {/* Bengali Translation */}
                  <div className="mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm font-semibold text-emerald-300 mb-2 sm:mb-3">
                      বাংলা অনুবাদ:
                    </p>
                    <p className="text-sm sm:text-base text-gray-100 leading-relaxed bg-emerald-950/30 p-3 sm:p-4 rounded-lg border border-emerald-800/30">
                      {hadith.bn}
                    </p>
                  </div>

                  {/* Note if available */}
                  {hadith.note && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm font-semibold text-blue-300 mb-2 sm:mb-3">
                        বিশেষ দ্রষ্টব্য:
                      </p>
                      <p className="text-sm sm:text-base text-blue-100 leading-relaxed bg-blue-950/30 p-3 sm:p-4 rounded-lg border border-blue-800/30">
                        {hadith.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !isSearchMode && (
              <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-lg text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all border border-slate-700"
                >
                  প্রথম
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-lg text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all border border-slate-700"
                >
                  পূর্ববর্তী
                </button>
                <span className="px-3 sm:px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-sm sm:text-base font-bold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-lg text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all border border-slate-700"
                >
                  পরবর্তী
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-lg text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all border border-slate-700"
                >
                  শেষ
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && hadiths.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-400 text-sm sm:text-base">কোন হাদিস পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </main>
  );
}
