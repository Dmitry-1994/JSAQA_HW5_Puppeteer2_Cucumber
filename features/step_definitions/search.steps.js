const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
    Given,
    When,
    Then,
    Before,
    After,
    setDefaultTimeout
} = require("cucumber");
const {
    openStartPage,
    clickElement,
    getText
} = require("../../lib/commands.js");

//Data
const dashBoardPage = "https://qamid.tmweb.ru/client/index.php";
const locatorChoiceOfDay = "a:nth-child(3)";
const locatorChoiceHall = "[data-seance-id='217']";
const locatorFirstFreeSeat =
    ".buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
const locatorButton = ".acceptin-button";
const locatorTextInformation = ".ticket__check-title";
const locatorChoiceHallVip = "[data-seance-id='225']";
const locatorFirstFreeSeatVip =
    ".buying-scheme__chair.buying-scheme__chair_vip:not(.buying-scheme__chair_taken)";
const locatorFirstBusySeat = ".buying-scheme__chair_taken";

setDefaultTimeout(300000);

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given("user is on page", async function () {
    return await openStartPage(this.page, dashBoardPage, {
        setTimeout: 5000
    });
});

When("user selects day", async function () {
    return await clickElement(this.page, locatorChoiceOfDay, {
        setTimeout: 5000
    });
});

When("user selects a standard hall", async function () {
    return await clickElement(this.page, locatorChoiceHall, {
        setTimeout: 5000
    });
});

When("user selects a standard seat", async function () {
    return await clickElement(this.page, locatorFirstFreeSeat, {
        setTimeout: 5000
    });
});

When("user selects booking", async function () {
    return await clickElement(this.page, locatorButton, {
        setTimeout: 5000
    });
});

Then("user should see {string}", async function (string) {
    const actualTextOfRezerv = await getText(this.page, locatorTextInformation);
    const expectedTextOfRezerv = await string;
    expect(actualTextOfRezerv).contains(expectedTextOfRezerv);
});

When("user get code", async function () {
    return await clickElement(this.page, locatorButton);
});

When("user selects a VIP hall", async function () {
    return await clickElement(this.page, locatorChoiceHallVip, {
        setTimeout: 5000
    });
});

When("user selects a VIP seat", async function () {
    return await clickElement(this.page, locatorFirstFreeSeatVip, {
        setTimeout: 5000
    });
});

Given("user is on a hall with a purchased seat", async function () {
    await openStartPage(this.page, dashBoardPage, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorChoiceOfDay, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorChoiceHall, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorFirstFreeSeat, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorButton, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorButton, {
        setTimeout: 5000
    });
    await openStartPage(this.page, dashBoardPage, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorChoiceOfDay, {
        setTimeout: 5000
    });
    await clickElement(this.page, locatorChoiceHall, {
        setTimeout: 5000
    });
});

When("user selects a purchased seat", async function () {
    return await clickElement(this.page, locatorFirstBusySeat);
});

Then("user should see inactive button", async function () {
    const isDisabled = await this.page.$eval(
        locatorButton,
        link => link.disabled
    );

    expect(isDisabled).to.be.true;
});
