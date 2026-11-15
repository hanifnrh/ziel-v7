import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Types (same as before)
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

const DEFAULT_TAGS: CaseStudyTag[] = [
  {
    label: "UI Design",
    borderColor: "border-[#dbeafe]",
    textColor: "text-blue-600",
  },
  {
    label: "UX Research",
    borderColor: "border-[#ddd6ff]",
    textColor: "text-violet-600",
  },
  {
    label: "Case Study",
    borderColor: "border-[#a4f4cf]",
    textColor: "text-emerald-600",
  },
];

const COLOR_OPTIONS = [
  { name: "orange", border: "border-orange-200", text: "text-orange-600" },
  { name: "blue", border: "border-blue-200", text: "text-blue-600" },
  { name: "green", border: "border-green-200", text: "text-green-600" },
  { name: "purple", border: "border-purple-200", text: "text-purple-600" },
];

// Helper to convert tag field to CaseStudyTag[]
function parseTags(tagField: string | string[] | undefined): CaseStudyTag[] {
  let tagsArray: string[] = [];
  if (tagField) {
    tagsArray = Array.isArray(tagField) ? tagField : [tagField];
  }
  // If no tags are provided, add a default "Case Study" tag
  if (tagsArray.length === 0) {
    tagsArray = ["Case Study"];
  }
  return tagsArray.map((label) => {
    const randomIndex = Math.floor(Math.random() * COLOR_OPTIONS.length);
    const color = COLOR_OPTIONS[randomIndex];
    return {
      label,
      borderColor: color.border,
      textColor: color.text,
    };
  });
}

interface TagBadgeProps {
  tag: CaseStudyTag;
}

const TagBadge = ({ tag }: TagBadgeProps) => (
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

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard = ({ study }: CaseStudyCardProps) => {
  return (
    <article className="bg-white p-4 rounded-2xl w-full flex flex-col gap-4 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={study.imageUrl}
          alt={`${study.subtitle} case study`}
          className="w-full aspect-video object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
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

      <a
        href={study.caseStudyUrl || "#"}
        className="text-violet-500 text-base 3xl:text-lg body-regular text-end flex items-center justify-end gap-1 hover:text-violet-600 transition-colors"
      >
        Read
        <ArrowRight
          size={16}
          className="inline-block group-hover:translate-x-1 transition-transform"
        />
      </a>
    </article>
  );
};

interface SectionHeaderProps {
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const SectionHeader = ({
  title,
  description,
  ctaText = "See More",
  onCtaClick,
}: SectionHeaderProps) => (
  <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-start justify-between mb-8">
    <div className="w-full lg:w-115 flex flex-col gap-4">
      <img src="/icons/case-study.svg" alt="" className="w-16 h-16"/>
      <div className="flex flex-col gap-2">
        <h3 className="body-semibold text-neutral-800 text-2xl 3xl:text-3xl">
          {title}
        </h3>
        <p className="body-regular text-neutral-800 text-base 3xl:text-lg leading-6">
          {description}
        </p>
      </div>
    </div>

    <button
      onClick={onCtaClick}
      className="
        px-4 md:px-6 3xl:px-8 py-2 md:py-3 3xl:py-4 
        bg-white rounded-lg text-base 3xl:text-lg 
        text-sky-600 body-code-medium uppercase cursor-pointer 
        hover:bg-sky-600 transition-all duration-300
        border-3 border-sky-500 border-dashed
        whitespace-nowrap
      "
    >
      {ctaText}
    </button>
  </div>
);

// Main component (now with data fetching)
function CaseStudiesPreview() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCaseStudies() {
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
                projects(where:{ featured: true }, orderBy: publishDate_DESC, first: 3) {
                  title
                  subtitle
                  description
                  slug
                  tag
                  featuredImage {
                    url
                  }
                }
              }
            `,
          }),
        });

        const json = await response.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        const projects = json.data.projects ?? [];

        // Map projects to CaseStudy format
        const mappedStudies: CaseStudy[] = projects.map((item: any) => ({
          title: item.title,
          subtitle: item.subtitle || item.title.split(" ")[0] || "Project", // fallback for client
          description: item.description,
          imageUrl: item.featuredImage?.url || "/images/fallback.png",
          tags: parseTags(item.tag),
          caseStudyUrl: `/studies/${item.slug}`, // adjust to your actual route
        }));

        setCaseStudies(mappedStudies);
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

  const handleSeeMore = () => {
    // Navigate to full case studies page
    window.location.href = "/studies"; // adjust to your route
  };

  if (isLoading) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 py-20 bg-blue-50 rounded-4xl">
        <SectionHeader
          title="Case Studies"
          description="Studies and works I have done in past few years. From segmented target into wide-range of users, I crafted designs fulfilling their needs."
          onCtaClick={handleSeeMore}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-video mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 py-20 bg-blue-50 rounded-4xl">
        <SectionHeader
          title="Case Studies"
          description="Studies and works I have done in past few years. From segmented target into wide-range of users, I crafted designs fulfilling their needs."
          onCtaClick={handleSeeMore}
        />
        <div className="text-red-500">Error: {error}</div>
      </section>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 py-20 bg-blue-50 rounded-4xl">
        <SectionHeader
          title="Case Studies"
          description="Studies and works I have done in past few years."
          onCtaClick={handleSeeMore}
        />
        <div className="text-neutral-500">No case studies found.</div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 py-20 bg-blue-50 rounded-4xl">
      <SectionHeader
        title="Case Studies"
        description="Studies and works I have done in past few years. From segmented target into wide-range of users, I crafted designs fulfilling their needs."
        onCtaClick={handleSeeMore}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}

export default CaseStudiesPreview;
