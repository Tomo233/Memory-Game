const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target;
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      setTimeout(() => {
        return stuffleCard();
      }, 1000);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img");
    console.log(cardOneImg);
    let cardTwoImg = cardTwo.querySelector("img");
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1.src === img2.src) {
    matchedCard++;
    if (matchedCard === 8) {
      return stuffleCard();
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function stuffleCard() {
  matchedCard = 0;

  cardOne = cardTwo = "";

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

stuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
