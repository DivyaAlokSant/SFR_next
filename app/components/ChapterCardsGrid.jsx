import { fetchChapterCards } from "@/app/api";
import ChapCard from "./chapCard";

export default async function ChapterCardsGrid({ locale }) {
  const cards = await fetchChapterCards(locale);
  console.log(cards);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {cards.map((item) => (
        <ChapCard
          key={item.id}
          chapter={{
            chapterName: item.chapterName,
            chapterNumber: item.chapterNumber,
            description: item.description,
            image: item.image?.url,
          }}
          locale={locale}
        />
      ))}
    </div>
  );
}