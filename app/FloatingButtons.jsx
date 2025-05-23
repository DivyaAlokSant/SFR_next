import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function getNavigationLinks(subChapters, currentSubChapterSlug) {
  const currentIndex = subChapters.findIndex(
    (subchapter) => subchapter.slug === currentSubChapterSlug
  );

  const previous = currentIndex > 0 ? subChapters[currentIndex - 1] : null;
  const next =
    currentIndex < subChapters.length - 1 ? subChapters[currentIndex + 1] : null;

  return { previous, next };
};

export default function FloatingActionButtons({ back, forward }) {
  return (
    <div className= "flex gap-2 justify-center items-center  z-50">
      {/* Back Button */}
      <Link href={back || "#"} passHref>
        <Button
          variant="ghost"
          size="icon"
          aria-label="back"
          className="p-3 rounded-full shadow bg-amber-500 hover:bg-gray-300"
          disabled={!back} // Disable the button if no back link
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      {/* Home Button */}
      <Link href={`/our-reports`} passHref>
        <Button
          variant="default"
          size="icon"
          aria-label="home"
          className="p-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          <Home className="h-5 w-5" />
        </Button>
      </Link>

      {/* Forward Button */}
      <Link href={forward || "#"} passHref>
        <Button
          variant="ghost"
          size="icon"
          aria-label="forward"
          className="p-3 rounded-full shadow bg-amber-500 hover:bg-gray-300"
          disabled={!forward} // Disable the button if no forward link
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}