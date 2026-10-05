import React from "react";

type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

// 1. Surya (Sun / Sunrise / Dinapati)
export function SunIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2" />
      <path d="m5.28 5.28 1.56 1.56M17.16 17.16l1.56 1.56M5.28 18.72l1.56-1.56M17.16 6.84l1.56-1.56" />
    </svg>
  );
}

// 2. Sunset (Suryast)
export function SunsetIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 18a5 5 0 0 0-10 0" />
      <path d="M12 9v5m-3-2 3 3 3-3" />
      <path d="M3 18h18M3 21h18" />
    </svg>
  );
}

// 3. Chandra / Tithi (Moon / Moonrise)
export function MoonIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.41 2.26-4.4A8.93 8.93 0 0 0 12 3z" />
    </svg>
  );
}

// 4. Moonset (Chandra-Asta)
export function MoonsetIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 15a4.5 4.5 0 0 1-6.3-4.2c0-1.1.4-2.1 1.1-2.8A5 5 0 0 0 7 15" />
      <path d="M12 5v5m-2.5-2.5 2.5 2.5 2.5-2.5" />
      <path d="M3 19h18M3 22h18" />
    </svg>
  );
}

// 5. Nakshatra (Vedic 8-point auspicious star)
export function NakshatraIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l2.4 6.6L21 11l-5.6 4.4L17 22l-5-3.8L7 22l1.6-6.6L3 11l6.6-2.4L12 2z" />
    </svg>
  );
}

// 6. Muhurat (Auspicious Kalash / Sacred Jewel)
export function MuhuratIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
      <path d="M12 8v8M8.5 12h7" />
    </svg>
  );
}

// 7. Kaal / Rahukaal (Chakra / Time Hourglass / Solar shadow)
export function KaalIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
      <path d="M18.36 5.64l1.42-1.42M5.64 5.64L4.22 4.22" />
    </svg>
  );
}

// 8. Yoga (Celestial Harmony / Angular conjunction)
export function YogaIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M12 8.5v7" />
    </svg>
  );
}

// 9. Karana (Half-tithi / Balance scale)
export function KaranaIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v18M6 8l6-3 6 3M3 13l3-5 3 5a3 3 0 0 1-6 0zM15 13l3-5 3 5a3 3 0 0 1-6 0z" />
    </svg>
  );
}

// 10. Samvat / Kalachakra (Vedic Ephemeris Cycle)
export function SamvatIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="m5.6 5.6 4.3 4.3M14.1 14.1l4.3 4.3M5.6 18.4l4.3-4.3M14.1 9.9l4.3-4.3" />
    </svg>
  );
}

// 11. Calendar Patrika (Traditional Almanac Leaf)
export function CalendarPatrikaIcon({ className = "w-5 h-5", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="5" />
      <line x1="16" y1="2" x2="16" y2="5" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <circle cx="8" cy="17" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

// 12. Location Pin
export function LocationIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.5-7-11.5a7 7 0 1 1 14 0c0 5-7 11.5-7 11.5z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
