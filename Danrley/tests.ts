import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import 'dotenv/config'
import { ENV } from '../environment'

const BASE_URL = 'https://klist.app'
const TIME_MILLISECONDS = 1_000
const TIME_DELAY_NEXT_STEP = TIME_MILLISECONDS * 2
const TIMEOUT_ELEMENT_LOCATED = TIME_MILLISECONDS * 3

async function testRegisterListTask() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
        .build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await efetuarLogin(driver)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        console.log('Acessando tela de cadastro de lista de tarefas')

        const createListButton = await driver.wait(
            until.elementLocated(By.xpath(`//*[contains(text(),'Criar Lista')]`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await createListButton.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        console.log('Informando o nome')

        const nameListField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='name']`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await nameListField.sendKeys('Planos de Teste')

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        console.log('Confirmando envio do formulário')

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
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
        .build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await efetuarLogin(driver)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        console.log('Acessando tela de listagem de tarefas')

        const task = await driver.wait(
            until.elementLocated(By.xpath('//li[@role="listitem" and .//i[@data-icon-name="Edit"]][1]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await task.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        console.log('Informando o título da tarefa')

        const loginField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='title']`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        console.log('Pressionando o Enter')

        await loginField.sendKeys('Fazer o trabalho de Plano de Testes', Key.RETURN)

        await driver.sleep(TIME_MILLISECONDS * 10)

    } finally {
        await driver.close()
    }
}

async function testConfigTask() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome').Options)().addArguments('--start-fullscreen'))
        .build()

    try {
        await driver.get(BASE_URL)
        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await efetuarLogin(driver)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const list = await driver.wait(
            until.elementLocated(By.xpath('//li[@role="listitem" and .//i[@data-icon-name="Edit"]][1]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        await list.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const task = await driver.wait(
            until.elementLocated(By.xpath('//div[@role="listitem" and @data-list-index="0"]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await task.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const dateInput = await driver.wait(
            until.elementLocated(By.xpath('//input[@placeholder="Definir data"]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await dateInput.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const dateDayInput = await driver.wait(
            until.elementLocated(By.xpath('//table[contains(@class, "ms-DatePicker-table")]/tbody/td[1]/button')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await dateDayInput.click()

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const subtaskField = await driver.wait(
            until.elementLocated(By.xpath(`//input[@name='subtask']`)),
            TIMEOUT_ELEMENT_LOCATED
        )

        await subtaskField.sendKeys(ENV.AUTH_EMAIL || '', Key.RETURN)

        await driver.sleep(TIME_DELAY_NEXT_STEP)

        const addTaskButton = await driver.wait(
            until.elementLocated(By.xpath('//div[@id="subtasks"]/i[@data-icon-name="Add"]')),
            TIMEOUT_ELEMENT_LOCATED
        )

        await addTaskButton.click()

        await driver.sleep(TIME_MILLISECONDS * 10)

    } finally {
        await driver.close()
    }
}

async function efetuarLogin(driver: WebDriver) {
    console.log('Acessando tela de login')

    const loginPageButton = await driver.wait(
        until.elementLocated(By.xpath(`//a[@href='/login']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginPageButton.click()

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    console.log('Informando o email')

    const loginField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='email']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginField.sendKeys(ENV.AUTH_EMAIL || '', Key.RETURN)

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    console.log('Informando a senha')

    const passwordField = await driver.wait(
        until.elementLocated(By.xpath(`//input[@name='password']`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await passwordField.sendKeys(ENV.AUTH_PASSWORD || '')

    await driver.sleep(TIME_DELAY_NEXT_STEP)

    console.log('Confirmando envio de formulário')

    const loginButton = await driver.wait(
        until.elementLocated(By.xpath(`//button[contains(@class, 'ms-Button--primary')]`)),
        TIMEOUT_ELEMENT_LOCATED
    )

    await loginButton.click()

    await driver.sleep(TIME_MILLISECONDS * 5)
}

testRegisterListTask()
// testRegisterTask()
// testConfigTask()