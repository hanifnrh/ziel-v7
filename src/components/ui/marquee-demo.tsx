import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";

const reviews = [
  { img: "/icons/figma-icon.svg" },
  { img: "/icons/tailwind-icon.svg" },
  { img: "/icons/notion-icon.svg" },
  { img: "/icons/vscode-icon.svg" },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit cursor-pointer overflow-hidden rounded-full border flex items-center justify-center",
      )}
    >
      {/* Reduced size from 60x60 to 40x40 (48x48 on md) */}
      <img className="rounded-full size-10 md:size-12" alt="" src={img} />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}