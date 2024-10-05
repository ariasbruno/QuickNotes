export function loadIcon () {
  const storedTheme = JSON.parse(localStorage.getItem("theme"));
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme) {
    changeTheme(storedTheme);
  } else {
    changeIcon(systemPrefersDark ? 'dark' : 'light');
  }

  function changeTheme (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", JSON.stringify(theme))
    changeIcon(theme)
  }

  function changeIcon (theme) {
    const icon = document.querySelector('#theme_toggle-svg');

    if (theme  === 'light') {
      icon.innerHTML = `
      <svg class="theme_toggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<g class="theme_toggle" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path class="theme_toggle" d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5" />
		<path class="theme_toggle" d="M12 21v1M21 12h1M12 3v-1M3 12h-1" />
		<path class="theme_toggle" d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
	</g>
</svg>
      `
    }else {
      icon.innerHTML = `
      <svg class="theme_toggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<path class="theme_toggle" d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z" fill="currentColor" />
	<path class="theme_toggle" d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z" fill="currentColor" />
	<g class="theme_toggle" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<g class="theme_toggle" opacity="0">
			<path class="theme_toggle" stroke-dasharray="2" stroke-dashoffset="2" d="M12 21v1M21 12h1M12 3v-1M3 12h-1" />
			<path class="theme_toggle" stroke-dasharray="2" stroke-dashoffset="2" d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
		</g>
		<path class="theme_toggle" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" />
	</g>
	<mask class="theme_toggle" id="lineMdSunnyOutlineToMoonTransition0">
		<circle class="theme_toggle" cx="12" cy="12" r="12" fill="#fff" />
		<circle class="theme_toggle" cx="12" cy="12" r="8" />
		<circle class="theme_toggle" cx="18" cy="6" r="12" fill="#fff" />
		<circle class="theme_toggle" cx="18" cy="6" r="10" />
	</mask>
	<circle class="theme_toggle" cx="12" cy="12" r="10" mask="url(#lineMdSunnyOutlineToMoonTransition0)" fill="currentColor" opacity="0" />
</svg>
      `
    }
  }
}