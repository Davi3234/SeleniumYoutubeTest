import { Builder, By, Key, until } from 'selenium-webdriver';

async function testYouTube() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);

        const searchBox = await driver.wait(
            until.elementLocated(By.xpath('//input[@id="search" and @name="search_query"]')),
            10000
        );

        await searchBox.click();

        await driver.sleep(3000);

        await searchBox.sendKeys('Selenium tutorial', Key.RETURN);
        
        await driver.sleep(3000);
    } finally {
        await driver.quit();
    }
}

testYouTube();
