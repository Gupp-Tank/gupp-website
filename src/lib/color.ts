// "#0d5c73" -> [0.05, 0.36, 0.45]; falls back to black on anything unparseable.
export function hexToRgbUnit(hex: string): [number, number, number] {
  const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim())
  if (!match) return [0, 0, 0]
  return [match[1], match[2], match[3]].map((channel) => parseInt(channel, 16) / 255) as [number, number, number]
}
