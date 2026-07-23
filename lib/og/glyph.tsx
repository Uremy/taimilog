export function OgGlyph({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="6" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M11 8 L7 16 M13 8 L17 16" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}