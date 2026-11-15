interface ExperienceItemProps {
  logo: string;
  title: string;
  company: string;
  duration?: string;
  location?: string;
  descriptions: string[];
  badgeType?: "internship" | "contract" | "fulltime";
  badgeText?: string;
}

interface ColorDotProps {
  width?: string;
  height?: string;
  color: string;
}

interface BadgeProps {
  type: "internship" | "contract" | "fulltime";
  text?: string;
  className?: string;
  showIcon?: boolean;
}

// Badge configuration with variants
const badgeConfig = {
  internship: {
    icon: "/assets/badge-intern.png",
    textColor: "text-purple-800 tracking-tight",
    bgGradient: "bg-linear-to-b from-white to-[#FEF1FF]",
    borderColor: "border-purple-200",
    defaultText: "Internship",
  },
  contract: {
    icon: "/assets/badge-fulltime.png",
    textColor: "text-orange-600 tracking-tight",
    bgGradient: "bg-linear-to-b from-white to-[#FFF5E3]",
    borderColor: "border-orange-200",
    defaultText: "Contract",
  },
  fulltime: {
    icon: "/assets/badge-fulltime.png", // You can change this to a different icon
    textColor: "text-green-700 tracking-tight",
    bgGradient: "bg-linear-to-b from-white to-[#E3FFE3]",
    borderColor: "border-green-200",
    defaultText: "Full-time",
  },
} as const;

// Reusable Badge Component with variants
function Badge({ type, text, className = "", showIcon = true }: BadgeProps) {
  const config = badgeConfig[type];

  return (
    <div
      className={`flex w-fit h-fit gap-1.5 px-2 p-1 lg:p-1.5 lg:px-3 rounded-2xl ${config.bgGradient} border-2 ${config.borderColor} items-center justify-center ${config.textColor} body-code-regular text-sm ${className}`}
    >
      {showIcon && (
        <img src={config.icon} alt={`${type} badge`} className="w-3 h-3" />
      )}
      {text || config.defaultText}
    </div>
  );
}

// Reusable Color Dot Component
function ColorDot({
  width = "w-4 xl:w-6",
  height = "h-4 xl:h-6",
  color,
}: ColorDotProps) {
  return <div className={`${width} ${height} rounded-full ${color}`}></div>;
}

// Color Dots Component
function ColorDots() {
  return (
    <div className="flex w-full items-center justify-start gap-2 md:gap-4">
      <ColorDot
        width="w-12 xl:w-15"
        height="h-4 xl:h-6"
        color="bg-orange-500"
      />
      <ColorDot color="bg-blue-500" />
      <ColorDot color="bg-purple-500" />
    </div>
  );
}

// Reusable Experience Item Component
function ExperienceItem({
  logo,
  title,
  company,
  duration,
  location,
  descriptions,
  badgeType = "internship",
  badgeText,
}: ExperienceItemProps) {
  return (
    <div className="grid grid-cols-12">
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-10 xl:col-span-8 flex flex-col gap-6">
        {/* TOP LEFT */}
        <div className="flex gap-3 md:gap-6">
          <div className="w-12 h-12 flex items-center justify-center p-2.5 md:p-3 rounded-xl bg-linear-to-b from-white to-[#f3f3f3] border border-neutral-300">
            <img src={logo} alt={`${title} logo`} className="w-full" />
          </div>

          <div className="flex w-full justify-between">
            <div className="w-full flex flex-col gap-1">
              <h4 className="body-medium text-neutral-900 text-xl lg:text-2xl">
                {title}
              </h4>
              <p className="body-regular text-neutral-600 text-base">
                {company}
              </p>
              <p className="body-light text-neutral-600 text-base">
                {duration}
              </p>
              <p className="body-light text-neutral-600 text-base">
                {location}
              </p>
            </div>

            {/* Mobile Badge */}
            <div className="flex w-full justify-end lg:hidden">
              <Badge type={badgeType} text={badgeText} className="lg:hidden" />
            </div>
          </div>
        </div>
        {/* BOTTOM LEFT */}
        <div className="pl-6 md:pl-18 lg:pl-20">
          <ul className="body-light text-neutral-600 list-disc text-base">
            {descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Badge */}
      <div className="w-full hidden items-end col-span-2 xl:col-span-4 lg:flex flex-col">
        <Badge
          type={badgeType}
          text={badgeText}
          className="hidden lg:flex text-base"
        />
      </div>
    </div>
  );
}

// Define TypeScript type for experiences data
interface ExperienceData {
  logo: string;
  title: string;
  company: string;
  location?: string;
  duration?: string;
  descriptions: string[];
  badgeType: "internship" | "contract" | "fulltime";
  badgeText?: string;
}

// Experiences Data
const experiencesData: ExperienceData[] = [
  {
    logo: "/logos/monash-logo.png",
    title: "UI Designer & UX Researcher",
    company: "Action Lab, Monash University",
    duration: "Jan 2026 - Present",
    location: "BSD City, Tangerang, Indonesia",
    descriptions: [
      "Worked in Kita Bersama project, designing and researching a youth-led, youth-centered digital platform aimed at preventing and reducing the mental health impacts of Adverse Childhood Experiences (ACEs) among Indonesian youth (10-24 years) in West Java and East Kalimantan. The project addresses the critical gap in helpseeking behavior (<11%) and rising mental health prevalence by developing a culturally relevant digital solution.",
      "Conducted iterative, agile-driven design based on co-design workshops with interdisciplinary research group (public health, psychology, physiotherapy) and direct community consultations. Designed a responsive web platform optimized for mobile-first users in Indonesia. ",
      "Architected the user experience and interface for multiple core modules resulted from co-design with intended users, collaboration with stakeholder advisory councils (ministry of health, mental health experts, project owners), qualitative research through emic-to-etic translation, and profound on-desk research. ",
      "Designed Scam Resilient Digital Finance to combat digital fraud in Indonesia's socio-technical context. Synthesized findings from a systematic literature review and primary qualitative research (interviews with fraud victims and institutional stakeholders) to address the psychological precision of deception tactics.",
    ],
    badgeType: "contract",
    badgeText: "Full Time", // Optional override
  },
  {
    logo: "/logos/cimb-logo.png",
    title: "UI/UX Designer",
    company: "PT Bank CIMB Niaga, Tbk",
    duration: "Oct 2025 - Dec 2025",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Designed Manpower Planning platform as anchor business process in HR Department. Conducted design reviews and workshops under an Agile squad structure.",
      "Collaborated with UI/UX Designers, Delivery Managers, and Product Owners to understand user requirements and improve design consistency across the Arjuna system.",
      "Conducted research and benchmarking for Headcount Management system interfaces to propose efficient and user-friendly UI layouts.",
      "Participated in Agile sprint processes within team of developers and designers for iterative development in large-scale corporate systems.",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
  {
    logo: "/logos/ecofix-logo.png",
    title: "Web Designer & Developer",
    company: "PT Gama Abyakta Sejahtera",
    duration: "Dec 2024 - Feb 2025",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Engineered strategic transition from conventional B2B business process to digital environment to support both B2B and B2C through crafting brand websites with focus on SEO and accessibility for users. ",
      "Supported digital marketing needs in enhancing search visibility and customer journey metrics through SEO improvements using Google Search Console, Semrush, Vercel Analytics, and Google Lighthouse. ",
      "Collaborated with digital marketing teams on market mapping and SEO auditing, while aligning design ideas with graphic designers and third-party partners to deliver a cohesive user experience. ",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
  {
    logo: "/logos/tth-logo.png",
    title: "UI/UX Designer",
    company: "Telkom Test House",
    duration: "Jul 2023 - Aug 2023",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Developed Telkom Test House Whistleblowing System web and mobile design with design thinking methodology, focusing on user experience and usability. ",
      "Strengthened service quality benchmarks through rigorous competitive analysis and meticulous data entry validation.",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
];

function Experiences() {
  return (
    // Experiences Section
    <div className="w-full flex flex-col bg-white rounded-t-0 md:rounded-t-[32px] mt-0 base:-mt-32 px-4 md:px-12 xl:px-32 pt-16 md:pt-20 z-20 gap-24">
      <div className="flex flex-col items-start justify-center gap-4 md:gap-8">
        <ColorDots />
        <h2 className="text-xl md:text-2xl 3xl:text-3xl text-neutral-900 body-medium w-full md:w-156.5 3xl:w-180 text-start leading-7">
          Evolving with every challenges and encounter with people in the field,
          I gather valuable experiences that shape my professional journey.
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {experiencesData.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </div>
  );
}

export default Experiences;
