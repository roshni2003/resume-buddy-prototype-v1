import { IconContext } from "@phosphor-icons/react";
import { use } from "react";
import { cn } from "@/utils/style";
import type { ExtendedIconProps } from "../preview";

export function PageIcon({
    icon,
    className,
    ...props
}: { icon: string; className?: string } & React.ComponentProps<"i">) {
    const iconContext = use<ExtendedIconProps>(IconContext);

    if (!icon || iconContext.hidden) return null;

    // Icon Mapping (for common brand icons that miss the "-logo" suffix)
    const logoSuffixIcons = [
        "github",
        "linkedin",
        "facebook",
        "twitter",
        "instagram",
        "youtube",
        "whatsapp",
        "messenger",
        "telegram",
        "discord",
        "slack",
        "twitch",
        "tiktok",
        "snapchat",
        "pinterest",
        "reddit",
        "behance",
        "dribbble",
        "medium",
        "spotify",
    ];

    const iconName = logoSuffixIcons.includes(icon.toLowerCase()) ? `${icon}-logo` : icon;

    return (
        <i
            className={cn("ph shrink-0", `ph-${iconName}`, className)}
            style={{ fontSize: `${iconContext.size}px`, color: iconContext.color }}
            {...props}
        />
    );
}