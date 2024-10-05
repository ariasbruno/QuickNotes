export function loadTheme () {
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
      <g class="theme_toggle" fill="none" stroke="currentColor" stroke-dasharray="2" stroke-dashoffset="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path class="theme_toggle" d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
                  <animate class="theme_toggle" fill="freeze" attributeName="d" begin="1.2s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
                  <animate class="theme_toggle" fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="2;0" />
                </path>
                <path class="theme_toggle" d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
                  <animate class="theme_toggle" fill="freeze" attributeName="d" begin="1.4s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
                  <animate class="theme_toggle" fill="freeze" attributeName="stroke-dashoffset" begin="1.4s" dur="0.2s" values="2;0" />
                </path>
              </g>
              <g class="theme_toggle" fill="currentColor">
                <path class="theme_toggle" d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
                  <animate class="theme_toggle" fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0" />
                </path>
                <path class="theme_toggle" d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
                  <animate class="theme_toggle" fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0" />
                </path>
              </g>
              <path class="theme_toggle" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
                <set class="theme_toggle" fill="freeze" attributeName="opacity" begin="0.6s" to="0" />
              </path>
              <mask class="theme_toggle" id="lineMdMoonToSunnyOutlineTransition0">
                <circle class="theme_toggle" cx="12" cy="12" r="12" fill="#fff" />
                <circle class="theme_toggle" cx="12" cy="12" r="8">
                  <animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4" />
                </circle>
                <circle class="theme_toggle" cx="18" cy="6" r="12" fill="#fff">
                  <animate class="theme_toggle" fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                  <animate class="theme_toggle" fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                  <animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3" />
                </circle>
                <circle class="theme_toggle" cx="18" cy="6" r="10">
                  <animate class="theme_toggle" fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                  <animate class="theme_toggle" fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                  <animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1" />
                </circle>
              </mask>
              <circle class="theme_toggle" cx="12" cy="12" r="10" mask="url(#lineMdMoonToSunnyOutlineTransition0)" opacity="0" fill="currentColor">
                <animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6" />
                <set class="theme_toggle" fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
              </circle>
                  </svg>
      `
    }else {
      icon.innerHTML = `
     <svg class="theme_toggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<path class="theme_toggle" fill-opacity="0" d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z" fill="currentColor">
		<animate class="theme_toggle" fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.4s" values="0;1" />
	</path>
	<path class="theme_toggle" fill-opacity="0" d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z" fill="currentColor">
		<animate class="theme_toggle" fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.4s" values="0;1" />
	</path>
	<g class="theme_toggle" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<g>
			<path class="theme_toggle" stroke-dasharray="2" stroke-dashoffset="4" d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
				<animate class="theme_toggle" fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;2" />
			</path>
			<path class="theme_toggle" stroke-dasharray="2" stroke-dashoffset="4" d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
				<animate class="theme_toggle" fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="4;2" />
			</path>
			<set class="theme_toggle" fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
		</g>
		<path class="theme_toggle" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0">
			<set class="theme_toggle" fill="freeze" attributeName="opacity" begin="0.5s" to="1" />
		</path>
	</g>
	<mask class="theme_toggle" id="lineMdSunnyOutlineToMoonTransition0">
		<circle class="theme_toggle" cx="12" cy="12" r="12" fill="#fff" />
		<circle class="theme_toggle" cx="12" cy="12" r="4">
			<animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="4;8" />
		</circle>
		<circle class="theme_toggle" cx="22" cy="2" r="3" fill="#fff">
			<animate class="theme_toggle" fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18" />
			<animate class="theme_toggle" fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6" />
			<animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="3;12" />
		</circle>
		<circle class="theme_toggle" cx="22" cy="2" r="1">
			<animate class="theme_toggle" fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18" />
			<animate class="theme_toggle" fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6" />
			<animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="1;10" />
		</circle>
	</mask>
	<circle class="theme_toggle" cx="12" cy="12" r="6" mask="url(#lineMdSunnyOutlineToMoonTransition0)" fill="currentColor">
		<animate class="theme_toggle" fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="6;10" />
		<set class="theme_toggle" fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
	</circle>
</svg>
      `
    }
  }
}