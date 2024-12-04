import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { loginGoogle } from '../utils';

async function testLoginGoogle() {
    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
    .build();

    try {
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        console.log('Login com sucesso!');

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

    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
    .build();

    try {
        await driver.get('https://www.youtube.com');

        await driver.sleep(2000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        const assistirButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="endpoint" and @title="Assistir mais tarde"]')),
            10000
        );

        console.log('Clicando no botão de assistir mais tarde');

        await assistirButton.click();

        await driver.sleep(4000);

        const menuButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment" and @aria-label="Menu de ações"]')),
            10000
        );
        
        console.log('Abrindo o menu de inserção');
        
        await driver.sleep(4000);

        await menuButton.click();

        await driver.sleep(4000);

        const addButton = await driver.wait(
            until.elementLocated(By.xpath('//yt-formatted-string[text()="Adicionar vídeos"]')),
            10000
        );

        console.log('Clicando no botão de adicionar');

        await addButton.click();

        await driver.sleep(4000);
        
        await driver.actions().sendKeys(Key.TAB).perform();

        console.log('Pesquisando vídeo para adicionar');

        await driver.sleep(4000);
        
        await driver.actions().sendKeys('Curso spring boot').perform();

        await driver.sleep(4000);
        
        await driver.actions().sendKeys(Key.ENTER).perform();
        
        await driver.sleep(4000);
        
        await driver.actions().sendKeys(Key.ENTER).perform();
        
        await driver.sleep(4000);

        await driver.actions().sendKeys(Key.TAB).perform();

        await driver.actions().sendKeys(Key.TAB).perform();

        console.log('Enviando');

        await driver.sleep(4000);

        await driver.actions().sendKeys(Key.ENTER).perform();

        await driver.sleep(4000);

    } finally {
        await driver.quit();
    }
}

async function testCriarPlaylist(){

    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
    .build();

    try {
        await driver.get('https://www.youtube.com');

        await driver.sleep(2000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        const voceButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="endpoint" and @href="/feed/you" and @title="Você"]')),
            10000
        );

        console.log('Clicando em minhas playlists');

        await driver.sleep(3000);

        await voceButton.click();

        const addButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="top-level-buttons-computed"]/yt-flexible-actions-view-model/div[1]/button-view-model/button')),
            10000
        );

        console.log('Adicionando playlist');

        await driver.sleep(3000);

        await addButton.click();

        await driver.sleep(3000);

        await driver.actions().sendKeys(Key.TAB).perform();

        console.log('Inserindo nome da playlist');

        await driver.sleep(4000);

        await driver.actions().sendKeys('Curso spring boot').perform();

        await driver.sleep(4000);
        
        const salvarButton = await driver.wait(
            until.elementLocated(By.xpath('/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog/yt-dialog-view-model/dialog-layout/div[2]/div[2]/span/yt-form-footer-view-model/yt-panel-footer-view-model/div/div[2]/button-view-model/button')),
            10000
        );

        console.log('Salvando playlist');

        await driver.sleep(4000);
        
        await salvarButton.click();
        
        await driver.sleep(4000);

    } finally {
        await driver.quit();
    }
}

async function testRemoverPlaylist(){

    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
    .build();

    try {
        await driver.get('https://www.youtube.com');

        await driver.sleep(2000);

        await loginGoogle(driver);

        await driver.sleep(4000);

        const playlistButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="endpoint" and @title="Playlists"]')),
            10000
        );

        console.log('Entrando nas playlists');

        await driver.sleep(3000);

        await playlistButton.click();

        const infoButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="content"]/yt-lockup-view-model/div/div/yt-lockup-metadata-view-model/div[2]/button-view-model/button')),
            10000
        );

        console.log('Abrindo ...');

        await driver.sleep(3000);

        await infoButton.click();

        await driver.sleep(3000);

        await driver.actions().sendKeys(Key.TAB).perform();

        await driver.sleep(4000);
        
        await driver.actions().sendKeys(Key.ENTER).perform();
        
        await driver.sleep(4000);

    } finally {
        await driver.quit();
    }
}

switch(process.argv[2]){
    case 'login':
        testLoginGoogle();
        break;
    case 'addAssistir':
        testAssistirMaisTarde();
        break;
    case 'addPlaylist':
        testCriarPlaylist();
        break;
    case 'removePlaylist':
        testRemoverPlaylist();
        break;
}