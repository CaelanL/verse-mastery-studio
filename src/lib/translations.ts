export const translations = [
  { value: "esv", label: "ESV", full: "English Standard Version" },
  { value: "niv", label: "NIV", full: "New International Version" },
  { value: "nlt", label: "NLT", full: "New Living Translation" },
  { value: "kjv", label: "KJV", full: "King James Version" },
  { value: "nasb", label: "NASB", full: "New American Standard Bible" },
  { value: "nkjv", label: "NKJV", full: "New King James Version" },
];

export const DEFAULT_TRANSLATION = "esv";

export type Translation = (typeof translations)[number];
