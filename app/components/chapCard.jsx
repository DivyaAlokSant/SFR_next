import Link from "next/link";

export default function ChapCard({ chapter, locale }) {
  const imageUrl = chapter.image
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${chapter.image}`
    : null;

  return (
    <Link href={`/${locale}/chap-summary/${chapter.chapterNumber}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg group-hover:shadow-2xl p-5 flex flex-col items-center text-center border border-purple-100 transition-all duration-300 cursor-pointer w-72 h-72 min-h-80 max-h-80 group-hover:-translate-y-3 group-hover:scale-105">
        {imageUrl && (
          <div className="mb-3 w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            <img
              src={imageUrl}
              alt={chapter.chapterName}
              width={80}
              height={80}
              className="object-cover w-20 h-20"
            />
          </div>
        )}
        <h3 className="font-semibold text-lg text-purple-900 mb-1 line-clamp-2">
          {chapter.chapterNumber ? `Chapter ${chapter.chapterNumber}: ` : ""}
          {chapter.chapterName}
        </h3>
        <p className="text-gray-600 text-sm flex-1 line-clamp-4">{chapter.description}</p>
      </div>
    </Link>
  );
}