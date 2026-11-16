import { IconFileCv, IconHandClick, IconMailShare, IconPaperclip } from "@tabler/icons-react";

function HeaderWhite() {
  return (
    <div className="w-full flex justify-between items-center px-4 xl:px-40 py-4 3xl:py-6 sticky top-0 z-20">
      <a
        href="https://drive.google.com/file/d/1EqTXaWGWUnww93vrzTVQemVzjfPgMbs5/view?usp=sharing"
        rel="canonical"
        target="_blank"
        aria-label="Download CV"
        className="flex items-center text-purple-600 text-sm xl:text-base body-code-medium uppercase gap-2 bg-white rounded-lg px-2.5 py-2.5 md:px-4 md:py-2 xl:py-4 cursor-pointer border-4 border-purple-400"
      >
        <IconPaperclip size={18} />
        <span className="hidden md:inline">RESUME</span>

      </a>

      <a href="/" className="absolute left-1/2 -translate-x-1/2">
        <img
          src="/logos/ziel-logo-white.png"
          alt="Ziel home"
          className="w-8 xl:w-full h-auto"
        />
      </a>

      <a
        href="mailto:nurrahmathaniff@gmail.com"
        rel="canonical"
        target="_blank"
        aria-label="Get in touch"
        className="flex items-center text-white text-sm xl:text-base body-code-medium uppercase gap-2 bg-purple-600 rounded-lg px-2.5 py-2.5 md:px-4 md:py-2 xl:py-4 cursor-pointer border-4 border-purple-400"
      >
        <IconHandClick size={18} stroke={2} className="md:hidden" />
        <span className="hidden md:inline">Get in Touch</span>
      </a>
    </div>
  );
}

export default HeaderWhite;