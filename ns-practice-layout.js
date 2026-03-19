function togglePage(pageToShowClass) {
  const pageToShow = document.querySelector(`.${pageToShowClass}`);
  const allPages = document.querySelectorAll('.page');

  for (let i = 0; i < allPages.length; i++) {
    allPages[i].classList.add('hidden');
  }
  pageToShow.classList.remove('hidden');
}