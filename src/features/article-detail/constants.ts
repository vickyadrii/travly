import type { SocialMediaLink } from "./types";

export const socialMediaLink: SocialMediaLink[] = [
  {
    icon: "/assets/icons/ic_facebook.svg",
    link: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${window.location.pathname}`,
  },
  {
    icon: "/assets/icons/ic_x.svg",
    link: `https://twitter.com/intent/tweet?text=${window.location.origin}${window.location.pathname}`,
  },
  {
    icon: "/assets/icons/ic_whatsapp.svg",
    link: `whatsapp://send?text=${window.location.origin}${window.location.pathname}`,
  },
  {
    icon: "/assets/icons/ic_link.svg",
    link: `${window.location.origin}/${window.location.pathname}`,
    action: "copy",
  },
];
