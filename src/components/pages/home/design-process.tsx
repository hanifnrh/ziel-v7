import { ChevronsDown, ChevronsRight } from "lucide-react";
import { Fragment } from "react";

const steps = [
  {
    icon: "/icons/research.svg",
    title: "Initial Research",
    description:
      "Main objectives of the research, data-collection, define success metrics, and coding transcriptions from user interviews.",
    cardClass: "bg-purple-50 border-purple-400",
    titleClass: "text-violet-500",
  },
  {
    icon: "/icons/insights.svg",
    title: "Digestible Insights",
    description:
      "Analyzing research data into digestible formats such as empathy map, user persona, problem statements, root causes, key insights, and prioritization matrix.",
    cardClass: "bg-orange-50 border-orange-400",
    titleClass: "text-orange-500",
  },
  {
    icon: "/icons/delivery.svg",
    title: "Design Delivery",
    description:
      "Executing research findings and insights into wireframes, high-fidelity designs, or prototypes. This goes iteratively cyclical to the whole process.",
    cardClass: "bg-blue-50 border-blue-400",
    titleClass: "text-blue-500",
  },
];

function DesignProcess() {
  return (
    <div className="w-full bg-white rounded-t-0 md:rounded-t-[32px] mt-0 base:-mt-32 px-4 md:px-12 xl:px-32 pt-16 md:pt-20 z-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <div className="flex w-full items-center justify-center gap-2 md:gap-4">
          <div className="w-12 xl:w-15 h-4 xl:h-6 rounded-full bg-orange-500" />
          <div className="w-4 xl:w-6 h-4 xl:h-6 rounded-full bg-blue-500" />
          <div className="w-4 xl:w-6 h-4 xl:h-6 rounded-full bg-purple-500" />
        </div>

        <h2 className="text-xl md:text-2xl 3xl:text-3xl text-neutral-900 body-semibold w-full md:w-156.5 3xl:w-180 text-center leading-7">
          Good design is comfortable. I build designs focusing on the purpose
          and turn user needs into intuitive experiences.
        </h2>
      </div>

      {/* Steps — items-stretch makes all cards equal height */}
      <div className="flex flex-col gap-3 lg:flex-row items-stretch justify-between py-12 xl:py-24">
        {steps.map((step, i) => (
          <Fragment key={step.title}>
            <div
              className={`w-full base:flex-1 flex flex-col gap-2 border-b-6 rounded-2xl p-4 xl:p-6 ${step.cardClass}`}
            >
              <img src={step.icon} alt="" className="w-16 h-16" />
              <h4 className={`body-medium text-base lg:text-xl 3xl:text-2xl ${step.titleClass}`}>
                {step.title}
              </h4>
              <p className="body-regular text-neutral-800 text-sm xl:text-base 3xl:text-lg">
                {step.description}
              </p>
            </div>

            {i < steps.length - 1 && (
              <>
                {/* Desktop / tablet: right arrow, vertically centered */}
                <div className="hidden base:flex self-center px-0 animate-bounce">
                  <ChevronsRight className="text-neutral-600" size={32} />
                </div>
                {/* Mobile: down arrow, horizontally centered */}
                <div className="inline-flex base:hidden self-center py-4 3xl:py-14 animate-bounce">
                  <ChevronsDown className="text-neutral-600" size={32} />
                </div>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default DesignProcess;