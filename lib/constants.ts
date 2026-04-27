export const COLORS = {
  bg: "#0A0A0A",
  bgAlt: "#111111",
  gold: "#D4930D",
  goldLight: "#E8A825",
  goldDark: "#B87A0A",
  cream: "#F5E6C8",
  white: "#FAFAFA",
  gray: "#888888",
  grayDark: "#333333",
} as const;

export const COLORS_TERE = {
  bg: "#1C2A0A",
  bgAlt: "#172208",
  bgCard: "#243010",
  olive: "#3D5018",
  yellow: "#E8C419",
  golden: "#D4A815",
  goldenLight: "#E8A020",
  peach: "#E8A87C",
  red: "#8B1A1A",
  cream: "#F5EDD0",
  white: "#FAFAFA",
  gray: "#8A8A6A",
  grayDark: "#2E3D12",
} as const;

export const COLORS_BATUQUE = {
  bg: "#201F22",
  bgAlt: "#28262C",
  bgCard: "#2E2B34",
  blue: "#394C60",
  golden: "#E8B346",
  goldenDark: "#C09030",
  red: "#9E2126",
  olive: "#614F23",
  cream: "#F5EAD0",
  white: "#FAFAFA",
  gray: "#8A8A8A",
  grayDark: "#3A383F",
} as const;

export const SECTIONS = [
  "home",
  "coletivo",
  "imprensa",
  "blog",
  "contato",
] as const;

export type Section = (typeof SECTIONS)[number];
