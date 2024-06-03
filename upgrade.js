class Upgrade {
  constructor(
    cost,
    name,
    image,
    description,
    velocity,
    acceleration,
    click = 1,
    mult = 1.25
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.unlocked = false;
    this.bought = 0;
    this.cost = cost;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.click = click;
    this.mult = mult;

    this.build();
  }

  tick(dt) {
    this.unlocked = totalMoney >= this.cost;

    document.querySelector(
      `#${this.name.replaceAll(" ", "-").toLowerCase()}`
    ).style.border = this.unlocked ? "3px solid #fff" : "3px solid #ffffff66";

    if (this.bought > 0) {
      for (let i = 0; i < this.bought; i++) {
        this.velocity += this.acceleration * dt;
        totalMoney += this.velocity * dt;
      }
    }
  }

  buy() {
    if (totalMoney >= this.cost) {
      this.bought++;
      totalMoney -= this.cost;
      this.cost *= this.mult * (1 + (Math.random() - 0.5) / 4); // add variance
      this.cost = Number(this.cost.toFixed(2));
      clickMult *= this.click;

      document.querySelector(
        `#${this.name.replaceAll(" ", "-").toLowerCase()}-amount`
      ).innerHTML = this.bought;

      document.querySelector(
        `#${this.name.replaceAll(" ", "-").toLowerCase()}-cost`
      ).innerHTML = `&#128181; $${this.cost.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`;
    }
  }

  build() {
    const upgradeContainer = document.querySelector("#upgrades-list");

    const upgradeEl = document.createElement("div");
    upgradeEl.id = this.name.replaceAll(" ", "-").toLowerCase();
    let title = "";
    if (this.velocity != 0) title += `+ $${this.velocity}/sec\n`;
    if (this.click != 1) title += `Click x${this.click}\n`;
    if (this.acceleration != 0) title += `+ $${this.acceleration}/sec/sec\n`;
    upgradeEl.title = title;
    upgradeEl.classList.add("upgrade");
    upgradeContainer.append(upgradeEl);

    const masterContainer = document.createElement("div");
    masterContainer.classList.add("upgrade-master-container");
    upgradeEl.append(masterContainer);

    masterContainer.onclick = this.buy.bind(this);

    const upgradeImg = document.createElement("img");
    upgradeImg.src = this.image;
    upgradeImg.classList.add("upgrade-img");
    masterContainer.append(upgradeImg);

    const upgradeInfoContainer = document.createElement("div");
    upgradeInfoContainer.classList.add("upgrade-info-container");
    masterContainer.append(upgradeInfoContainer);

    const upgradeAmt = document.createElement("div");
    upgradeAmt.id = this.name.replaceAll(" ", "-").toLowerCase() + "-amount";
    upgradeAmt.classList.add("upgrade-amt");
    masterContainer.append(upgradeAmt);

    const upgradeName = document.createElement("div");
    upgradeName.classList.add("upgrade-name");
    upgradeName.innerHTML = this.name;
    upgradeInfoContainer.append(upgradeName);

    const upgradeCost = document.createElement("div");
    upgradeCost.id = this.name.replaceAll(" ", "-").toLowerCase() + "-cost";
    upgradeCost.classList.add("upgrade-cost");
    upgradeCost.innerHTML = `&#128181; $${this.cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}`;
    upgradeInfoContainer.append(upgradeCost);

    const upgradeDesc = document.createElement("div");
    upgradeDesc.classList.add("upgrade-desc");
    upgradeDesc.innerHTML = this.description;
    masterContainer.append(upgradeDesc);
  }

  getTotalVelocity() {
    return this.velocity * this.bought;
  }
}

const upgradesList = [
  new Upgrade(
    24.99,
    "Savings Bond",
    "bond.png",
    "Secure your earnings with the help of the government",
    0.5,
    0.0025,
    1,
    1.75
  ),
  new Upgrade(
    49.99,
    "Drug Store",
    "meds.png",
    "Buy and rennovate old drug stores and use them for bootlegging",
    1.25,
    0
  ),
  new Upgrade(
    99.99,
    "Invest in Stocks",
    "stock.png",
    "Invest your cash and watch your earnings grow",
    0,
    0,
    1.35,
    1.45
  ),
  new Upgrade(149.99, "Butler", "butler.png", "Hire a personal worker", 7.5, 0),
  new Upgrade(
    499.99,
    "Real Estate",
    "real_estate.png",
    "Purchase prime real estate all across New York",
    25,
    0.025,
    1,
    1.85
  ),
  new Upgrade(
    2499.99,
    "Mining Company",
    "mining.png",
    "Mine for gold and diamonds in the footsteps of Dan Cody",
    200,
    0,
    1,
    2
  ),
  new Upgrade(
    9999.99,
    "Oil Drilling",
    "oil.png",
    "Drill, refine, and distribute oil to expand your wealth",
    750,
    0,
    1,
    2.15
  ),
];
