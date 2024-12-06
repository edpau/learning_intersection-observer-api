const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.5,
    // rootMargin: "-100px"
  }
);

cards.forEach((card) => {
  observer.observe(card);
});


// lazy loading, create new card when the scroll to the last card
// start with observe the last card
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  // do nothing when it is not on-screen
  if (!lastCard.isIntersecting) return;
  // below code only run if the last card is starting to be visible
  loadNewCards();
  // when new card is here, last card is no longer the last card, we don't observe it
  lastCardObserver.unobserve(lastCard.target);
  // we observe the new last card instead
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {
    // the lazy loading start earlier than the last card actually appear, as fetching from api may take longer
    rootMargin: "100px"
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

const cardContainer = document.querySelector(".card-container");
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
