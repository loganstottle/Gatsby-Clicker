const netWorthEl = document.querySelector("#net-worth");
const subWorthEl = document.querySelector("#sub-worth");
const moneyImage = document.querySelector("#money-img");

let popupsList = [];

const POPUP_LIFE = 750;

let totalMoney = 0;
let totalVelocity = 0;
let totalAcceleration = 0;
let clickMult = 1;

const generatePopup = () => {
  const popup = document.createElement("div");
  const popupId = Math.random().toFixed(10);

  const moneyAdded = Number(
    (Math.random() * 1.35 * clickMult + 0.15 * (clickMult / 2 + 0.5)).toFixed(2)
  );

  totalMoney += moneyAdded;
  totalMoney = Number(totalMoney.toFixed(2));

  popup.id = popupId;
  popup.classList.add("popup");
  popup.innerHTML = `&#128181; +${moneyAdded.toFixed(2)}`;
  popup.style.position = "fixed";
  popup.style.textAlign = "center";
  popup.style.left = `${Math.floor(
    Math.random() * (window.innerWidth * 0.65 - 250) + 50
  )}px`;
  popup.style.top = `${
    Math.floor(Math.random() * (window.innerHeight - 250)) + 150
  }px`;
  popup.style.fontSize = 22;
  document.body.append(popup);

  return popupId;
};

const gameLoop = () => {
  for (const popup of popupsList) {
    const percentOfLife = (performance.now() - popup[1]) / POPUP_LIFE - 0.25;

    document.getElementById(popup[0]).style.opacity = 1 - percentOfLife;
    document.getElementById(popup[0]).style.transform = `scale(${
      1 - percentOfLife * 0.35 + 0.25
    })`;

    if (percentOfLife > 1) {
      document.getElementById(popup[0]).remove();
      popupsList = popupsList.filter((p) => p[0] !== popup[0]);
    }
  }

  totalMoney = Number(totalMoney.toFixed(2));

  netWorthEl.innerHTML = `Net Worth: $${totalMoney.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;

  if (totalVelocity > 0)
    subWorthEl.innerHTML = `$${Number(totalVelocity.toFixed(2)).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
      }
    )}/sec`;

  requestAnimationFrame(gameLoop);
};

gameLoop();

let lastTick = performance.now();

setInterval(() => {
  if (typeof upgradesList !== "undefined") {
    let dt = (performance.now() - lastTick) / 1000;
    lastTick = performance.now();

    for (const upgrade of upgradesList) upgrade.tick(dt);
  }

  let _totalVelocity = 0;
  for (const upgrade of upgradesList)
    _totalVelocity += upgrade.getTotalVelocity();

  totalVelocity = _totalVelocity;
}, 1000 / 60);

window.onclick = (e) => {
  const buttonRect = moneyImage.getBoundingClientRect();

  if (e.clientX >= buttonRect.left && e.clientX <= buttonRect.right)
    if (e.clientY >= buttonRect.top && e.clientY <= buttonRect.bottom)
      popupsList.push([generatePopup(), performance.now()]);
};
