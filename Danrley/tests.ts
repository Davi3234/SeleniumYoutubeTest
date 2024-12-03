import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import 'dotenv/config'

const BASE_URL = 'https://klist.app'
const TIME_MILLISECONDS = 1_000
const TIME_DELAY_NEXT_STEP = TIME_MILLISECONDS * 2
const TIMEOUT_ELEMENT_LOCATED = TIME_MILLISECONDS * 3

async function testRegisterListTask() {
    let driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await efetuarLogin(driver)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const createListButton = await driver.wait(
            until.elementLocated(By.xpath(`//*[contains(text(),'Criar Lista')]`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await createListButton.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const nameListField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='name']`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await nameListField.sendKeys('Planos de Teste')

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const saveListButton = await driver.wait(
            until.elementLocated(By.xpath(`//*[contains(text(),'Salvar')]`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await saveListButton.click()

        await driver.sleep(TIME_MILLISECONDS * 10)

    } finally {
        await driver.close()
    }
}

async function testRegisterTask() {
    let driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await efetuarLogin(driver)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const task = await driver.wait(
            until.elementLocated(By.xpath('//li[@role="listitem" and .//i[@data-icon-name="Edit"]][1]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await task.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const loginField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='title']`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await loginField.sendKeys('Fazer o trabalho de Plano de Testes', Key.RETURN)

        await driver.sleep(TIME_MILLISECONDS * 10)

    } finally {
        await driver.close()
    }
}

async function efetuarLogin(driver: WebDriver) {
    const loginPageButton = await driver.wait(
        until.elementLocated(By.xpath(`//a[@href='/login']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginPageButton.click()

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    const loginField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='email']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginField.sendKeys(process.env.AUTH_EMAIL || '', Key.RETURN)

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    const passwordField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='password']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await passwordField.sendKeys(process.env.AUTH_PASSWORD || '')

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    const loginButton = await driver.wait(
        until.elementLocated(By.xpath(`//button[contains(@class, 'ms-Button--primary')]`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginButton.click()

    await driver.sleep(TIME_MILLISECONDS * 5)
}

// testRegisterListTask()
testRegisterTask()