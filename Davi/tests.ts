import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';

async function testLoginGoogle() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        const searchBox = await driver.wait(
            until.elementLocated(By.xpath('//input[@id="search" and @name="search_query"]')),
            10000
        );

        await searchBox.click();

    } finally {
        await driver.quit();
    }
}

async function testAssistirMaisTarde(){

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        const assistirButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="endpoint" and @title="Assistir mais tarde"]')),
            10000
        );

        await assistirButton.click();

        await driver.sleep(4000);

        console.log('Procurando o botão...');

        const menuButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="button" and contains(@class, "yt-spec-button-shape-next")]')),
            10000
        );        
        
        console.log('Botão encontrado, clicando...');

        await menuButton.click();

        const addButton = await driver.wait(
            until.elementLocated(By.xpath('//yt-formatted-string[text()="Adicionar vídeos"]')),
            10000
        );

        await addButton.click();

        await driver.sleep(4000);

    } finally {
        await driver.quit();
    }
}

async function loginGoogle(driver: WebDriver){
    const loginButton = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="buttons"]/ytd-button-renderer/yt-button-shape/a')),
        10000
    );

    await loginButton.click();
    
    await driver.sleep(3000);

    const emailInput = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="identifierId"]')),
        10000
    );

    await emailInput.click();

    await driver.sleep(2000);

    await emailInput.sendKeys('teste.selenium.UDESC@gmail.com', Key.RETURN);

    await driver.sleep(2000);

    const passwordInput = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="password"]/div[1]/div/div[1]/input')),
        10000
    );

    await passwordInput.click();

    await driver.sleep(2000);

    await passwordInput.sendKeys('TesteSelenium', Key.RETURN);
}

testAssistirMaisTarde();