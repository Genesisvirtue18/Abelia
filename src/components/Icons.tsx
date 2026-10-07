type IconProps = { className?: string };

const S = ({ className = "h-6 w-6", children }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconHome = (p: IconProps) => (
  <S {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10.2V20h13v-9.8" />
    <path d="M9.7 20v-5.3h4.6V20" />
  </S>
);

export const IconOffice = (p: IconProps) => (
  <S {...p}>
    <path d="M3.5 20.5h17" />
    <path d="M6 20.5V5.6A1.6 1.6 0 0 1 7.6 4h6.2A1.6 1.6 0 0 1 15.4 5.6v14.9" />
    <path d="M15.4 9.5h3A1.6 1.6 0 0 1 20 11.1v9.4" />
    <path d="M8.7 7.7h1.6M12 7.7h1.6M8.7 11.2h1.6M12 11.2h1.6M8.7 14.7h1.6" />
  </S>
);

export const IconWindow = (p: IconProps) => (
  <S {...p}>
    <rect x="4.5" y="3" width="15" height="18" rx="1.4" />
    <path d="M12 3v18M4.5 12h15" />
    <path d="M19.8 7.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5Z" fill="currentColor" stroke="none" />
  </S>
);

export const IconBox = (p: IconProps) => (
  <S {...p}>
    <path d="M12 3.3 20 7.4v9.2l-8 4.1-8-4.1V7.4Z" />
    <path d="M4 7.4l8 4.1 8-4.1" />
    <path d="M12 11.5v9.2" />
    <path d="M8 5.4l8 4.1" />
  </S>
);

export const IconDeep = (p: IconProps) => (
  <S {...p}>
    <path d="M10.5 4.5c-2.8 3.9-4.7 6.3-4.7 9.1a4.7 4.7 0 0 0 9.4 0c0-2.8-1.9-5.2-4.7-9.1Z" />
    <path d="M17.6 12.6l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" fill="currentColor" stroke="none" />
    <path d="M18.8 5.4l.45 1.2 1.2.45-1.2.45-.45 1.2-.45-1.2-1.2-.45 1.2-.45Z" fill="currentColor" stroke="none" />
  </S>
);

export const IconHelmet = (p: IconProps) => (
  <S {...p}>
    <path d="M5 16.5a7 7 0 0 1 14 0" />
    <path d="M3.2 16.5h17.6a1 1 0 0 1 1 1v1.2a1 1 0 0 1-1 1H3.2a1 1 0 0 1-1-1v-1.2a1 1 0 0 1 1-1Z" />
    <path d="M10 9.4V6.6a2 2 0 0 1 4 0v2.8" />
    <path d="M12 9.4v7" />
  </S>
);

export const IconSparkle = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.1 6.2 6.2 2.1-6.2 2.1L12 19.1l-2.1-6.2-6.2-2.1 6.2-2.1Z" />
  </svg>
);

export const IconSparkleSmall = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-4 w-4"} fill="currentColor" aria-hidden="true">
    <path d="M12 4l1.6 5.4L19 11l-5.4 1.6L12 18l-1.6-5.4L5 11l5.4-1.6Z" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <S {...p}>
    <path d="M4.5 12.8 9.6 18 19.5 6.5" />
  </S>
);

export const IconStar = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-4 w-4"} fill="currentColor" aria-hidden="true">
    <path d="M12 3.4l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.6 9.5l5.8-.8Z" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <S {...p}>
    <path d="M5.6 4h2.9l1.5 3.9-2 1.5a11.8 11.8 0 0 0 5.6 5.6l1.5-2 3.9 1.5v2.9a1.9 1.9 0 0 1-2.1 1.9A16.3 16.3 0 0 1 3.7 6.1 1.9 1.9 0 0 1 5.6 4Z" />
  </S>
);

export const IconMail = (p: IconProps) => (
  <S {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="M4.5 7.5 12 13l7.5-5.5" />
  </S>
);

export const IconPin = (p: IconProps) => (
  <S {...p}>
    <path d="M12 21c-4-4.4-6.4-7.6-6.4-10.7a6.4 6.4 0 1 1 12.8 0C18.4 13.4 16 16.6 12 21Z" />
    <circle cx="12" cy="10.2" r="2.3" />
  </S>
);

export const IconClock = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3 2.1" />
  </S>
);

export const IconCalendar = (p: IconProps) => (
  <S {...p}>
    <rect x="3.8" y="5.5" width="16.4" height="14.7" rx="2" />
    <path d="M3.8 10h16.4M8.4 3.4v4M15.6 3.4v4" />
    <path d="M8 14h2.4M13.6 14H16M8 17h2.4" />
  </S>
);

export const IconShield = (p: IconProps) => (
  <S {...p}>
    <path d="M12 3.4 19 6v5.2c0 4.5-2.9 7.4-7 8.9-4.1-1.5-7-4.4-7-8.9V6Z" />
    <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
  </S>
);

export const IconLeaf = (p: IconProps) => (
  <S {...p}>
    <path d="M5 19C5 10.5 10.5 5 19 5c0 8.5-5.5 14-14 14Z" />
    <path d="M5 19c3.5-5.5 7-8.5 11-11" />
  </S>
);

export const IconTag = (p: IconProps) => (
  <S {...p}>
    <path d="M4 12.4V5.6A1.6 1.6 0 0 1 5.6 4h6.8l7.1 7.1a1.6 1.6 0 0 1 0 2.3l-5 5a1.6 1.6 0 0 1-2.3 0Z" />
    <circle cx="8.3" cy="8.3" r="1.3" />
  </S>
);

export const IconArrow = (p: IconProps) => (
  <S {...p}>
    <path d="M4.5 12h14M13.5 6.5 19 12l-5.5 5.5" />
  </S>
);

export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="currentColor" aria-hidden="true">
    <path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.3L3.3 20.7l4.4-1.1A8.8 8.8 0 1 0 12 3.2Zm0 1.7a7.1 7.1 0 1 1-3.7 13.2l-.3-.2-2.6.7.7-2.5-.2-.3A7.1 7.1 0 0 1 12 4.9ZM9.7 8c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.8 4.1 2.4.9 2.9.7 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4l-2-1c-.3-.1-.5-.1-.7.2l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.9-2.5c-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.1-.7l-1-2.2c-.1-.3-.3-.4-.5-.4h-.5Z" />
  </svg>
);

export const IconChat = (p: IconProps) => (
  <S {...p}>
    <path d="M4 6.6A2.6 2.6 0 0 1 6.6 4h10.8A2.6 2.6 0 0 1 20 6.6v6.8a2.6 2.6 0 0 1-2.6 2.6H9.2L5 19.8a.6.6 0 0 1-1-.5Z" />
    <path d="M8.4 10.5h7.2M8.4 13h4.4" />
  </S>
);

export const IconSend = (p: IconProps) => (
  <S {...p}>
    <path d="M4 11.5 20 4l-4.5 16-4-6.5Z" />
    <path d="M11.5 13.5 20 4" />
  </S>
);

export const IconX = (p: IconProps) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

export const IconMenu = (p: IconProps) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
);

export const IconInstagram = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFacebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.3-1.4 1.5-1.4h1.5V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v2.9h2.5V21Z" />
  </svg>
);

export const IconTikTok = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="currentColor" aria-hidden="true">
    <path d="M16.6 3.2c.4 2 1.7 3.3 3.7 3.5v2.7c-1.3.1-2.5-.2-3.7-1v6.1c0 3.7-2.7 5.9-5.7 5.5-2.6-.3-4.4-2.3-4.4-4.8 0-2.9 2.6-5 5.6-4.5v2.8c-.4-.1-.8-.2-1.2-.2-1.3.1-2.2 1.1-2.1 2.4.1 1.2 1.1 2.1 2.4 2 1.3 0 2.2-1 2.2-2.4V3.2Z" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5S14.1 18.2 12 20.5C9.9 18.2 8.8 15.4 8.8 12S9.9 5.8 12 3.5Z" />
  </S>
);

export const IconQuote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} fill="currentColor" aria-hidden="true">
    <path d="M9.6 6C6.7 7.3 5 9.6 5 12.6V18h5.4v-5.4H7.5c0-1.9 1-3.2 3-4.1ZM19 6c-2.9 1.3-4.6 3.6-4.6 6.6V18H19.8v-5.4h-2.9c0-1.9 1-3.2 3-4.1Z" />
  </svg>
);

export const SERVICE_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  home: IconHome,
  office: IconOffice,
  window: IconWindow,
  box: IconBox,
  deep: IconDeep,
  helmet: IconHelmet,
};
