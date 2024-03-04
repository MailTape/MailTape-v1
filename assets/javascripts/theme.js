const loadTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark')
        document.querySelector('#themeSelector').classList.add('dark-mode')
        document.querySelector('#themeSelector').classList.remove('light-mode')
    } else {
        document.body.classList.remove('dark')
        document.querySelector('#themeSelector').classList.add('light-mode')
        document.querySelector('#themeSelector').classList.remove('dark-mode')
    }
}

const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark'
    loadTheme()
}

loadTheme()