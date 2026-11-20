import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@/components/ui/loader";

interface CaseStudyTag {
  label: string;
  borderColor: string;
  textColor: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: CaseStudyTag[];
  caseStudyUrl?: string;
}

const ITEMS_PER_PAGE = 6;

const COLOR_OPTIONS = [
  { border: "border-indigo-200", text: "text-indigo-600" },
  { border: "border-blue-200", text: "text-blue-600" },
  { border: "border-green-200", text: "text-green-600" },
  { border: "border-violet-200", text: "text-violet-600" },
  { border: "border-purple-200", text: "text-purple-600" },
  { border: "border-sky-200", text: "text-sky-600" },
];

// Deterministic color per label — same tag always gets the same color
function getTagColor(label: string) {
  const hash = [...label].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return COLOR_OPTIONS[hash % COLOR_OPTIONS.length];
}

function parseTags(tagField: string | string[] | undefined): CaseStudyTag[] {
  const arr = !tagField ? [] : Array.isArray(tagField) ? tagField : [tagField];
  const labels = arr.length > 0 ? arr : ["Case Study"];
  return labels.map((label) => {
    const color = getTagColor(label);
    return { label, borderColor: color.border, textColor: color.text };
  });
}

const ColorDots = ({
  colors = ["bg-orange-500", "bg-blue-500", "bg-purple-500"],
}: {
  colors?: string[];
}) => (
  <div className="flex w-full items-center justify-center gap-4">
    {colors.map((color, i) => (
      <div
        key={i}
        className={cn("rounded-full", color, i === 1 ? "w-12 h-5" : "w-5 h-5")}
      />
    ))}
  </div>
);

const TagBadge = ({ tag }: { tag: CaseStudyTag }) => (
  <Badge
    variant="outline"
    className={cn(
      "px-3 py-1.5 rounded-xl border-2",
      tag.borderColor,
      tag.textColor,
      "body-code-light tracking-tight font-light text-xs 3xl:text-sm leading-[normal]",
      "bg-transparent hover:bg-transparent",
    )}
  >
    {tag.label}
  </Badge>
);

const CaseStudyCard = ({ study }: { study: CaseStudy }) => (
  <a
    href={study.caseStudyUrl || "#"}
    className="block w-full bg-white p-4 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
  >
    <article className="w-full flex flex-col gap-4 cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={study.imageUrl}
          alt={`${study.subtitle} case study`}
          className="w-full aspect-video object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy" // Defers loading
          decoding="async" // Allows the browser to decode the image without blocking the main thread
        />
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {study.tags.map((tag) => (
          <TagBadge key={`${study.id}-${tag.label}`} tag={tag} />
        ))}
      </div>

      <div className="flex flex-col gap-0 md:gap-1">
        <h4 className="text-neutral-600 body-code-regular uppercase text-sm 3xl:text-base tracking-tight">
          {study.title}
        </h4>
        <p className="body-medium text-neutral-900 text-base 3xl:text-lg line-clamp-2">
          {study.subtitle}
        </p>
      </div>

      <div className="text-violet-500 text-base 3xl:text-lg body-regular text-end flex items-center justify-end gap-1 group-hover:text-violet-600 transition-colors">
        Read
        <ArrowRight
          size={16}
          className="inline-block group-hover:translate-x-1 transition-transform"
        />
      </div>
    </article>
  </a>
);

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border mr-10",
          currentPage === 1
            ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400",
        )}
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full text-base body-regular",
            currentPage === page
              ? "bg-violet-500 text-white"
              : "text-neutral-700 hover:bg-neutral-50",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border ml-10",
          currentPage === totalPages
            ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400",
        )}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const SectionHeader = () => (
  <div className="px-4 md:px-12 xl:px-24 flex flex-col items-center justify-center gap-3 max-w-4xl mx-auto">
    <h1 className="bg-linear-to-b from-indigo-700 to-blue-400 bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] body-semibold text-transparent text-3xl xl:text-5xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
      Case Studies
    </h1>
    <ColorDots />
    <p className="body-regular tracking-tight text-neutral-800 text-base lg:text-xl text-center leading-6 mt-2">
      Studies and works I have done in past few years. From segmented target
      into wide-range of users, I crafted designs fulfilling their needs.
    </p>
  </div>
);

function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchCaseStudies() {
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
              query GetProjects {
                projects(orderBy: publishDate_DESC) {
                  id
                  title
                  subtitle
                  slug
                  tag
                  publishDate
                  cardColor
                  featuredImage { url(transformation: { image: { resize: { width: 600, height: 400, fit: clip } } }) }
                }
              }
            `,
          }),
        });

        const json = await response.json();
        if (json.errors) throw new Error(json.errors[0].message);

        const projects = json.data?.projects ?? [];
        setCaseStudies(
          projects.map((item: any) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || item.title.split(" ")[0] || "Project",
            description: item.description,
            imageUrl: item.featuredImage?.url || "/images/fallback.png",
            tags: parseTags(item.tag),
            caseStudyUrl: `/studies/${item.slug}`,
          })),
        );
      } catch (err) {
        console.error("Error fetching case studies:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load case studies",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  const totalPages = Math.ceil(caseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedStudies = caseStudies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col bg-white gap-20 pb-10"
    >
      <SectionHeader />

      {/* Full-bleed blue section: bg is on the outer div, padding on the inner */}
      <div className="w-full bg-blue-100 py-10 rounded-4xl">
        <div className="px-4 md:px-12 xl:px-24 flex flex-col gap-4">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          )}

          {!isLoading && error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500">Error: {error}</div>
            </div>
          )}

          {!isLoading && !error && caseStudies.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <div className="text-neutral-500">No case studies found.</div>
            </div>
          )}

          {!isLoading && !error && caseStudies.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedStudies.map((study) => (
                  <CaseStudyCard key={study.id} study={study} />
                ))}
              </div>

              {totalPages > 1 && (
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}

              <div className="text-center text-neutral-800 body-medium text-sm">
                Showing {Math.min(startIndex + 1, caseStudies.length)}–
                {Math.min(endIndex, caseStudies.length)} of{" "}
                {caseStudies.length} case studies
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;