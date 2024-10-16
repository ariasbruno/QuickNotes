import { loadTheme } from "./loadTheme.js";

export function handlerTheme () {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme) {
    let theme = currentTheme === "light" ? "dark" : "light"
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", JSON.stringify(theme))
  } else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = systemPrefersDark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", JSON.stringify(theme))
  }
  loadTheme()
}