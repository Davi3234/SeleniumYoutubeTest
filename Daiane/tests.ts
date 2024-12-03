//npm run tests:daiane
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { loginGoogle } from '../utils';
//import chrome from 'selenium-webdriver/chrome';
//import path from 'path';

async function testYouTube() {
    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
    .build();

    try {
       
        //Realiza Login
        await driver.get('https://www.youtube.com');
        await driver.sleep(3000);
        await loginGoogle(driver);

        await driver.sleep(4000);
        await driver.get('https://www.youtube.com/watch?v=R2l8KU-QWRU'); // Substitua pela URL do vídeo de teste
        await driver.sleep(4000);


        //RF011: O sistema Youtube deve permitir que os usuários se inscrevam nos canais. 
        const subscribeButton = await driver.wait(
            until.elementLocated(By.id('subscribe-button')),
            10000
        );
        await subscribeButton.click();
        console.log('Inscrito no canal!');

        //RF012: O sistema Youtube deve permitir que os usuários pausem vídeos. 
        await driver.sleep(10000);
        await driver.actions().sendKeys(Key.SPACE).perform();
        console.log('Pausou o vídeo.');

        //RF013: O sistema Youtube deve permitir que os usuários consigam passar para o próximo vídeo da fila enquanto estejam assistindo a algum vídeo. 
        await driver.sleep(10000);
        const nextButton = await driver.wait(
            until.elementLocated(By.className('ytp-next-button ytp-button')),
            10000
        );
        await nextButton.click();
        console.log('Passou para o próximo vídeo!');

         //RF001: O sistema Youtube deve permitir que os usuários comentem nos vídeos.
         const commentBox = await driver.wait(
            until.elementLocated(By.xpath('//div[@id="placeholder-area"]')),
            20000
        );
        await commentBox.click();

        const commentInput = await driver.wait(
            until.elementLocated(By.xpath('//div[@id="contenteditable-root"]')),
            30000
        );
        const comentario = 'Teste com Selenium de comentário no YouTube';
        await driver.sleep(5000);
        await commentInput.sendKeys(comentario);

        const submitButton = await driver.wait(
            until.elementLocated(By.id('submit-button')),
            10000
        );
        await submitButton.click();
        console.log('Comentário adicionado!');

        await driver.sleep(5000);
        const addedComment = await driver.wait(
            until.elementLocated(By.xpath("//*[text()='Teste com Selenium de comentário no YouTube']")),
            5000
        );
        console.log('Comentário publicado com sucesso!');

    } finally {
        await driver.quit();
    }
}

testComentariosYouTube();
