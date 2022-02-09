
const getFullYear = () => {
    return new Date().getFullYear();
}

const updateCopyrightYear = () => {
    const elecopyrightYear = document.querySelector('#copyrightYear');

    if (elecopyrightYear) {
        elecopyrightYear.textContent = getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});
