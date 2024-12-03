import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { loginGoogle } from '../utils';
//import chrome from 'selenium-webdriver/chrome';
//import path from 'path';

async function testComentariosYouTube() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Passo 1: Usuário faz login no YouTube
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);
        await loginGoogle(driver);

        // Passo 2: Acessa a página de um vídeo
        await driver.sleep(4000);
        await driver.get('https://www.youtube.com/watch?v=R2l8KU-QWRU'); // Substitua pela URL do vídeo de teste
        await driver.sleep(4000);

         // Passo 3: Se inscreve no canal
        const subscribeButton = await driver.wait(
            until.elementLocated(By.id('subscribe-button')),
            10000
        );
        await subscribeButton.click();
        console.log('Inscrito no canal.');

        // Passo 4: Pausa o vídeo
        await driver.actions().sendKeys(Key.SPACE).perform();
        console.log('Pausou o vídeo.');

        // Passo 5: Adiciona um comentário
        const commentBox = await driver.wait(
            until.elementLocated(By.xpath('//div[@id="placeholder-area"]')),
            20000
        );
        await commentBox.click();

        const commentInput = await driver.wait(
            until.elementLocated(By.xpath('//div[@id="contenteditable-root"]')),
            30000
        );
        const comentario = 'Novo teste de comentário';
        await driver.sleep(5000);
        await commentInput.sendKeys(comentario);

        const submitButton = await driver.wait(
            until.elementLocated(By.id('submit-button')),
            10000
        );
        await submitButton.click();

        console.log('Comentário adicionado.');

        // Verifica se o comentário foi publicado
        await driver.sleep(5000);
        const addedComment = await driver.wait(
            until.elementLocated(By.xpath("//*[text()='Novo teste de comentário']")),
            5000
        );
        console.log('Comentário publicado com sucesso.');

        // Passo 5: Passar para o próximo vídeo
        await driver.sleep(10000);
        const nextButton = await driver.wait(
            until.elementLocated(By.className('ytp-next-button ytp-button')),
            10000
        );
        await nextButton.click();
        console.log('Passou para o próximo vídeo.');

    } finally {
        await driver.quit();
    }
}

testComentariosYouTube();
