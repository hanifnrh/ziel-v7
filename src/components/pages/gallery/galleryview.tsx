import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { parseTags } from "@/lib/tags";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";
import { X } from "lucide-react";

interface HygraphImage {
  id: string;
  imageTitle: string;
  image: {
    thumbnail: string;
    full: string;
  };
  additionImage?: {
    thumbnail: string;
    full: string;
  };
  imageDescription?: string;
  imageTag: string[];
}

interface GalleryTag {
  label: string;
  border: string;
  text: string;
}

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;       // Thumbnail for grid
  fullImageUrl: string;   // High-res for modal
  additionImageUrl?: string;
  fullAdditionImageUrl?: string;
  description?: string;
  tags: GalleryTag[];
}

const ColorDots = () => (
  <div className="flex w-full items-center justify-center gap-4">
    <div className="w-5 h-5 rounded-full bg-orange-500" />
    <div className="w-12 h-5 rounded-full bg-blue-500" />
    <div className="w-5 h-5 rounded-full bg-purple-500" />
  </div>
);

const SectionHeader = () => (
  <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
    <h1 className="bg-linear-to-b from-indigo-700 to-blue-400 bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] body-semibold text-transparent text-3xl xl:text-5xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
      Gallery
    </h1>
    <ColorDots />
  </div>
);

const TagBadge = ({ tag }: { tag: GalleryTag }) => (
  <Badge
    variant="outline"
    className={cn(
      "px-3 py-1.5 rounded-xl border-2",
      tag.border,
      tag.text,
      "body-code-regular font-medium text-xs 3xl:text-sm tracking-tight leading-[normal]",
      "bg-transparent hover:bg-transparent",
    )}
  >
    {tag.label}
  </Badge>
);

const ImageModal = ({
  image,
  onClose,
}: {
  image: GalleryItem | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!image) return;
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="space-y-4 p-6">
          <h2 className="text-2xl body-semibold mb-4">{image.title}</h2>
          <img
            src={image.fullImageUrl}
            alt={image.title}
            className="w-full rounded-lg object-contain"
            decoding="async"
            fetchPriority="high"
          />
          {image.fullAdditionImageUrl && (
            <img
              src={image.fullAdditionImageUrl}
              alt={`${image.title} - additional`}
              className="w-full rounded-lg object-contain"
              decoding="async"
            />
          )}
        </div>

        {(image.description || image.tags.length > 0) && (
          <div className="bg-white/60 backdrop-blur-2xl p-6 sticky bottom-0 flex flex-col gap-4 rounded-b-2xl">
            {image.description && (
              <p className="text-neutral-800 whitespace-pre-wrap body-regular">
                {image.description}
              </p>
            )}
            {image.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                  <TagBadge key={tag.label} tag={tag} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryCard = ({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) => (
  <article
    onClick={onClick}
    className="w-full flex flex-col gap-2 xl:gap-4 group cursor-pointer hover:scale-[1.02] transition-transform duration-300 break-inside-avoid mb-8"
  >
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {item.tags.length > 0 && (
      <div className="flex items-center gap-2 flex-wrap">
        {item.tags.map((tag) => (
          <TagBadge key={`${item.id}-${tag.label}`} tag={tag} />
        ))}
      </div>
    )}
  </article>
);

function GalleryView() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      if (
        !import.meta.env.PUBLIC_HYGRAPH_URL ||
        !import.meta.env.PUBLIC_HYGRAPH_TOKEN
      ) {
        setError("Missing Hygraph configuration.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(import.meta.env.PUBLIC_HYGRAPH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.PUBLIC_HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query GetGallery {
                galleries {
                  id
                  imageTitle
                  image {
                    thumbnail: url(transformation: { image: { resize: { width: 800 }, quality: { value: 80 } } })
                    full: url(transformation: { image: { resize: { width: 1600 }, quality: { value: 90 } } })
                  }
                  additionImage {
                    thumbnail: url(transformation: { image: { resize: { width: 800 }, quality: { value: 80 } } })
                    full: url(transformation: { image: { resize: { width: 1600 }, quality: { value: 90 } } })
                  }
                  imageDescription
                  imageTag
                }
              }
            `,
          }),
        });

        const json = await response.json();
        if (json.errors) throw new Error(json.errors[0].message);

        const hygraphImages: HygraphImage[] = json.data?.galleries ?? [];
        setImages(
          hygraphImages.map((item) => ({
            id: item.id,
            title: item.imageTitle,
            imageUrl: item.image?.thumbnail || "/images/fallback.png",
            fullImageUrl: item.image?.full || "/images/fallback.png",
            additionImageUrl: item.additionImage?.thumbnail,
            fullAdditionImageUrl: item.additionImage?.full,
            description: item.imageDescription,
            tags: parseTags(item.imageTag).map((t) => ({
              label: t.label,
              border: t.border,
              text: t.text,
            })),
          })),
        );
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load gallery",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
      <SectionHeader />

      <div className="w-full">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center text-red-600 py-20">
            Failed to load gallery: {error}
          </div>
        )}

        {!isLoading && !error && images.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found in gallery.
          </div>
        )}

        {!isLoading && !error && images.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {images.map((image) => (
              <GalleryCard
                key={image.id}
                item={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

export default GalleryView;