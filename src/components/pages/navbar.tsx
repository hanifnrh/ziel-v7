import { Home, Info, BookText, Image, FileText, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/scramble-text";

interface NavbarProps {
  currentPath: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/",         label: "Home",    icon: Home },
  { href: "/about",    label: "About",   icon: Info },
  { href: "/studies",  label: "Studies", icon: BookText },
  { href: "/gallery",  label: "Gallery", icon: Image },
  { href: "/blog",     label: "Blog",    icon: FileText },
];

const baseItem =
  "inline-flex items-center gap-2 justify-center px-3 md:px-4 py-3 body-code-medium uppercase text-sm rounded-full transition-colors";
const inactiveItem = "text-white hover:text-white/80";
const activeItem =
  "bg-white text-neutral-900 px-4 md:px-6 shadow-black/25 shadow-lg";

function Navbar({ currentPath }: NavbarProps) {
  const isActive = (href: string) =>
    href === "/"
      ? currentPath === "/"
      : currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <nav className="fixed bottom-10 3xl:bottom-20 w-full flex justify-center z-50">
      <div className="w-fit flex items-center gap-2 rounded-full bg-[#525252]/40 backdrop-blur-sm p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              className={cn(baseItem, active ? activeItem : inactiveItem)}
            >
              <Icon className="md:hidden w-5 h-5" />
              <ScrambleText
                text={label}
                className="hidden md:inline"
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;