//only acceepts page id
function togglePage(pageToShow) {
  const currentPage = document.querySelector('.active');
  if (currentPage.classList.contains('individual-page') && currentPage.querySelector('.start-button').innerHTML === 'Stop') {
    currentPage.querySelector('.start-button').click();
  }
  
  document.querySelector('.active').classList.remove('active');
  
  const show = document.getElementById(pageToShow);
  show.classList.add('active');
}

//only accepts page id
function swapStartStop(buttonName) {
  if (document.getElementById(buttonName).innerText === 'Start') {
    document.getElementById(buttonName).innerText = 'Stop';
  } else {
    document.getElementById(buttonName).innerText = 'Start';
  }
}


/*
  Search Bar
*/

const practiceQuestions = document.getElementById('practice-page').querySelectorAll('.rp-button');
const search = document.getElementById('search-bar');
search.addEventListener('input', (event) => {
  let searchContent = search.value.trim().toLowerCase();

  if (searchContent === '') {
    practiceQuestions.forEach((question) => {
      question.style.display = 'inline-block';
    });
    return;
  } 
  
  practiceQuestions.forEach((question) => {
    if (question.innerHTML.toLowerCase().includes(searchContent)) {
      question.style.display = 'inline-block';
    } else {
      question.style.display = 'none';
    }
  });
});

