export function getLuminance(hex: string): number {
  if (!hex) return 128;
  const color = hex.replace("#", "");
  const fullHex = color.length === 3 ? color.split('').map(c => c + c).join('') : color;
  const r = parseInt(fullHex.substring(0, 2), 16) || 0;
  const g = parseInt(fullHex.substring(2, 4), 16) || 0;
  const b = parseInt(fullHex.substring(4, 6), 16) || 0;
  return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

export function getContrastColor(hex: string): string {
  return getLuminance(hex) >= 140 ? "#000000" : "#ffffff";
}

export function getReadableTextColor(hex: string): string {
  const luminance = getLuminance(hex);
  const isDarkTheme = document.documentElement.classList.contains("dark");
  
  if (isDarkTheme && luminance < 80) {
    return "#e2e8f0"; // slate-200
  } else if (!isDarkTheme && luminance > 160) {
    return "#1e293b"; // slate-800
  }
  return hex;
}
