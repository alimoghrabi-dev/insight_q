import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "relative flex items-center rounded-md gap-x-2 py-4 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        {
          "bg-sky-200/30 text-sky-700 hover:text-sky-700 hover:bg-sky-200/30":
            isActive,
        }
      )}>
      <div className="flex items-center gap-x-2">
        <Icon
          size={22}
          className={cn("text-slate-500", { "text-sky-700": isActive })}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto absolute rounded-r-md inset-y-0 right-0 opacity-0 border-2 border-sky-700 h-full transition-all",
          {
            "opacity-75": isActive,
          }
        )}
      />
    </button>
  );
};

export default SidebarItem;
