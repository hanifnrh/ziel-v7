import { Activity, CodeXml, Figma, UserSearch } from "lucide-react";
import Header from "../header-white";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getHeroBackgroundUrl } from "@/lib/cloudinary";

const socials = [
  { href: "https://www.instagram.com/ziel.works/", icon: "/icons/instagram.svg", label: "Instagram" },
  { href: "https://dribbble.com/ziel_works", icon: "/icons/dribbble.svg", label: "Dribbble" },
  { href: "https://github.com/hanifnrh", icon: "/icons/github.svg", label: "GitHub" },
  { href: "https://www.linkedin.com/in/nurrahmathanif/", icon: "/icons/linkedin.svg", label: "LinkedIn" },
];

const skillCards = [
  {
    title: "UI/UX Design",
    Icon: Figma,
    logos: [{ src: "/icons/figma-icon.svg", alt: "Figma" }],
  },
  {
    title: "User Research",
    Icon: UserSearch,
    logos: [
      { src: "/icons/maze.svg", alt: "Maze" },
      { src: "/icons/dovetail.svg", alt: "Dovetail" },
    ],
  },
  {
    title: "SEO & Lead Gen",
    Icon: Activity,
    logos: [
      { src: "/icons/semrush.svg", alt: "Semrush" },
      { src: "/icons/google-search-console.svg", alt: "Google Search Console" },
    ],
  },
  {
    title: "Web Development",
    Icon: CodeXml,
    logos: [
      { src: "/icons/react.svg", alt: "React" },
      { src: "/icons/tailwind-icon.svg", alt: "Tailwind CSS" },
    ],
  },
];

function AboutSection() {
    const backgroundUrl = getHeroBackgroundUrl('Unknown_Lifeform'); 

  return (
    // One provider for the whole section — delayDuration makes them snappy
    <TooltipProvider delayDuration={100}>
      <div className="w-full">
        <div className="relative w-full flex flex-col justify-center items-center gap-4 3xl:gap-10 overflow-hidden pb-20 base:pb-52 3xl:pb-60 px-4 md:px-12 xl:px-0">
          <Header />
          <img
            src={backgroundUrl}
            alt=""
            className="w-screen h-full absolute top-0 left-0 inset-0 object-cover"
          />

          <div className="w-full justify-start grid grid-cols-2 xs:grid-cols-2 md:grid-cols-12 lg:w-220 3xl:w-240 gap-4 z-20">
            <h1 className="col-span-2 md:col-span-12 text-start w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_70%,rgba(101,175,214,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] body-semibold text-transparent text-3xl xl:text-[56px] tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20 py-4 sm:py-0">
              About Me
            </h1>

            {/* Who Am I */}
            <div className="flex flex-col w-full h-full col-span-2 xs:col-span-2 md:col-span-8 bg-white rounded-[24px] p-4 gap-1">
              <div className="flex items-center gap-3">
                <h3 className="body-semibold text-neutral-900 text-base 3xl:text-xl">
                  Who Am I
                </h3>
              </div>
              <p className="body-regular text-neutral-800 leading-6 text-sm lg:text-base">
                I&rsquo;m Hanif, a design engineer based in Bekasi, Indonesia. I
                hold a degree in Computer Engineering from Universitas Diponegoro.
                I have experience designing interfaces across various fields,
                including corporate branding websites, internal banking systems,
                and user-first applications with in-depth user research.
              </p>
            </div>

            {/* Socials */}
            <div className="flex flex-col items-start justify-center w-full h-full col-span-2 xs:col-span-2 md:col-span-4 bg-white rounded-[24px] p-4 gap-1">
              <div className="w-full items-center justify-between flex md:grid md:grid-cols-2 lg:flex md:gap-4 lg:gap-0">
                {socials.map(({ href, icon, label }) => (
                  <div key={href} className="w-full items-center justify-center flex col-span-1">
                    <a href={href} rel="noopener noreferrer" target="_blank" aria-label={label}>
                      <img src={icon} alt={label} />
                    </a>
                  </div>
                ))}
              </div>

              <div className="w-fit flex items-center gap-3">
                <h3 className="body-semibold text-neutral-900 text-base 3xl:text-xl">
                  Socials
                </h3>
              </div>
              <p className="body-light text-neutral-600 leading-6 text-sm lg:text-base">
                Works, updates, and all.
              </p>
            </div>

            {/* Skill Cards */}
            {skillCards.map(({ title, Icon, logos }) => (
              <div
                key={title}
                className="col-span-1 md:col-span-3 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-4 md:gap-8 lg:gap-14"
              >
                <h3 className="text-white text-base 3xl:text-xl body-medium flex items-center justify-between w-full">
                  {title}
                  <Icon />
                </h3>
                <div className="w-full flex gap-2">
                  {logos.map(({ src, alt }) => (
                    <Tooltip key={src}>
                      <TooltipTrigger asChild>
                        <img
                          src={src}
                          alt={alt}
                          tabIndex={0}
                          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{alt}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AboutSection;