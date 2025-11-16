/* LightDarkTheme toggle logic
 * for user adjustment to any theme-adjustable elements.
 * Theme-adjustable elements have class s-light-dark-theme--auto */
const lightDarkThemeToggle = document.querySelector('.s-light-dark-theme-toggle > input');

if (lightDarkThemeToggle) {
  /* fn to adjust any theme-adjustable element classes
  * according to current Toggle setting */
  const setLightDarkTheme = () => {
    Array.from(document.querySelectorAll('.s-light-dark-theme--auto, .s-light-dark-theme--auto-overridden'), (el) => {
      /* Light theme is default, i.e Toggle unchecked */
      el.classList.replace('s-light-dark-theme--auto', 's-light-dark-theme--auto-overridden');
      if (lightDarkThemeToggle.checked) {
        el.classList.add('s-light-dark-theme--dark');
        el.classList.remove('s-light-dark-theme');
      } else {
        el.classList.add('s-light-dark-theme');
        el.classList.remove('s-light-dark-theme--dark');
      }

      return true;
    });
  };

  /* Initialise toggle state according to previously stored user selection */
  if (localStorage.getItem('lightDarkTheme') === 'dark') {
    lightDarkThemeToggle.checked = true;
  } else if (localStorage.getItem('lightDarkTheme') === 'light') {
    lightDarkThemeToggle.checked = false;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    /* Else according to user browser prefs which defaults to their OS prefs */
    lightDarkThemeToggle.checked = true;
  }
  setLightDarkTheme();

  /* React to toggle change */
  lightDarkThemeToggle.addEventListener('change', () => {
    setLightDarkTheme();

    // Record new user pref
    localStorage.setItem('lightDarkTheme', `${lightDarkThemeToggle.checked ? 'dark' : 'light'}`);
  });
}
