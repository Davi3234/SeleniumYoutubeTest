import { By, Key, until, WebDriver } from "selenium-webdriver";

export async function loginGoogle(driver: WebDriver){
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