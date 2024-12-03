import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import 'dotenv/config'

const BASE_URL = 'https://klist.app'
const TIME_MILLISECONDS = 1_000

async function testRegisterListTask() {
    let driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_MILLISECONDS * 2)

        console.log('Entrando na página de login...')

        await efetuarLogin(driver)

        console.log('Entrando na página de dashboard...')

        await driver.sleep(TIME_MILLISECONDS * 2)

        // #

        console.log('Clicando no botão de criar lista...')

        const createListButton = await driver.wait(
            until.elementLocated(By.xpath(`//*[contains(text(),'Criar Lista')]`)),
            TIME_MILLISECONDS * 3
        )

        await createListButton.click()

        await driver.sleep(TIME_MILLISECONDS * 2)

        // #

        console.log('Informando o nome da lista...')

        const nameListField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='name']`)),
            TIME_MILLISECONDS * 3
        )

        await nameListField.sendKeys('Planos de Teste')

        await driver.sleep(TIME_MILLISECONDS * 2)

        // #

        console.log('Salvando a lista...')

        const saveListButton = await driver.wait(
            until.elementLocated(By.xpath(`//*[contains(text(),'Salvar')]`)),
            TIME_MILLISECONDS * 3
        )

        await saveListButton.click()

        // #

        await driver.sleep(TIME_MILLISECONDS * 10)

    } finally {
        console.log('Quit!')
        await driver.quit()
    }
}

async function efetuarLogin(driver: WebDriver) {
    const loginPageButton = await driver.wait(
        until.elementLocated(By.xpath(`//a[@href='/login']`)),
        TIME_MILLISECONDS * 3
    )

    await loginPageButton.click()

    await driver.sleep(TIME_MILLISECONDS * 2)

    // #

    console.log('Informando o nome...')

    const loginField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='email']`)),
        TIME_MILLISECONDS * 3
    )

    await loginField.sendKeys(process.env.AUTH_EMAIL || '', Key.RETURN)

    await driver.sleep(TIME_MILLISECONDS * 2)

    // #

    console.log('Informando a senha...')

    const passwordField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='password']`)),
        TIME_MILLISECONDS * 3
    )

    await passwordField.sendKeys(process.env.AUTH_PASSWORD || '')

    await driver.sleep(TIME_MILLISECONDS * 2)

    // #

    console.log('Logando...')

    const loginButton = await driver.wait(
        until.elementLocated(By.xpath(`//button[contains(@class, 'ms-Button--primary')]`)),
        TIME_MILLISECONDS * 3
    )

    await loginButton.click()

    await driver.sleep(TIME_MILLISECONDS * 5)
}

testRegisterListTask()