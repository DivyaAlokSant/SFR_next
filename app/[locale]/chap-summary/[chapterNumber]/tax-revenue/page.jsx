export default function TaxRevenuePage({ params }) {
  const { chapterNumber, locale } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 drop-shadow-lg">
          Tax Revenue Details
        </h1>
        <p className="text-purple-700 text-lg mb-6">
          This is a dummy page for Tax Revenue of Chapter {chapterNumber}.
        </p>
        <div className="bg-purple-100 rounded-lg p-6 shadow-inner">
          <p className="text-gray-700">
            Here you can display charts, tables, or any other information related to Tax Revenue for this chapter.
          </p>
        </div>
      </div>
    </div>
  );
}