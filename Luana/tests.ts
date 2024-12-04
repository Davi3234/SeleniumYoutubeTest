import { Builder, By, until } from 'selenium-webdriver';
import { loginGoogle } from '../utils';

async function testAssistirMaisTarde() {
    const chrome = require('selenium-webdriver/chrome');
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--start-fullscreen'))
        .build();

    try {
        // Abre o YouTube
        await driver.get('https://www.youtube.com');
        console.log("Página do YouTube carregada");
        await driver.sleep(2000);

        // Realiza login no Google
        await loginGoogle(driver);
        console.log("Login realizado");
        await driver.sleep(4000);

        console.log("Acessando o assistir maist arde");
        await driver.get('https://www.youtube.com/playlist?list=WL'); 
        await driver.sleep(4000);
        
        console.log("Acessando menu tres pontinhos")
        const menu = await driver.wait(
            until.elementLocated(By.xpath('/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-playlist-video-list-renderer/div[3]/ytd-playlist-video-renderer/div[3]/ytd-menu-renderer/yt-icon-button/button')),
            10000
        );
        console.log("Clicando menu tres pontinhos")
        await menu.click();

        await driver.sleep(4000);
    
         // Localiza o botão "Remover de Assistir mais tarde"
         console.log("Localizando menu Remover de assistir mais tarde")
         const removerButton = await driver.wait(
            until.elementLocated(By.css('#items > ytd-menu-service-item-renderer:nth-child(3) > tp-yt-paper-item')),
            10000
        );

        console.log("Botão 'Remover de Assistir mais tarde' localizado");

        // Clica no botão (tenta forçar o clique caso necessário)
        try {
            await driver.wait(until.elementIsVisible(removerButton), 5000);
            await removerButton.click();
        } catch {
            console.log("Tentando forçar o clique no botão...");
            await driver.executeScript("arguments[0].click();", removerButton);
        }

        console.log("'Remover de Assistir mais tarde' clicado");
        await driver.sleep(4000);

        console.log("Localizando Nenhum vídeo em assistir mais tarde")

        await driver.get('https://www.youtube.com/playlist?list=WL'); 
        await driver.sleep(4000);

        await driver.wait(
            until.elementLocated(By.xpath('//*[@id="page-manager"]/ytd-browse/ytd-playlist-header-renderer/div/div[2]/div[1]/div/div[1]/div[1]/ytd-playlist-byline-renderer/div/yt-formatted-string[1]')),
            10000
        );

        console.log("Localizado Nenhum vídeo em assistir mais tarde!")

    } catch (error) {
        console.error("Erro durante o teste:", error);
    } finally {
        await driver.quit();
        console.log("Driver encerrado");
    }
}

async function testHistorico() {
    const chrome = require('selenium-webdriver/chrome');
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--start-fullscreen'))
        .build();
    let idVideo = 'ohZip6AyGQY';

    try {
        // Abre o YouTube
        await driver.get('https://www.youtube.com');
        console.log("Página do YouTube carregada");
        await driver.sleep(2000);

        // Realiza login no Google
        await loginGoogle(driver);
        console.log("Login realizado");
        await driver.sleep(4000);

        console.log("Acessando o vídeo");
        await driver.get('https://www.youtube.com/watch?v='+ idVideo); 
        await driver.sleep(4000);

        console.log("Acessando o histórico");
        await driver.get('https://www.youtube.com/feed/history');
        await driver.sleep(4000);

        // Localiza os elementos do histórico
        const historicoVideos = await driver.findElements(By.xpath('//a[@id="video-title"]'));
        console.log("Elementos do histórico localizados");

        // Itera pelos vídeos do histórico e verifica se o ID ou título está presente
        let videoEncontrado = false;
        for (const video of historicoVideos) {
            const titulo = await video.getAttribute('title'); // Obtém o título
            const link = await video.getAttribute('href');   // Obtém o link do vídeo
            console.log(`Verificando vídeo: ${titulo} | ${link}`);

            // Verifica se o ID do vídeo aparece no link
            if (link && link.includes(idVideo)) {
                videoEncontrado = true;
                console.log(`Vídeo encontrado no histórico: ${titulo}`);
                break;
            }
        }

        // Garante que o vídeo foi encontrado
        if (!videoEncontrado) {
            throw new Error("O vídeo não apareceu no histórico.");
        }

        await driver.sleep(4000);

    } catch (error) {
        console.error("Erro durante o teste:", error);
    } finally {
        await driver.quit();
        console.log("Driver encerrado");
    }
}
// testHistorico()
testAssistirMaisTarde();