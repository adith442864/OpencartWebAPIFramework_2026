import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { RegisterPage } from "./RegisterPage.js";

export class LoginPage extends BasePage {

    //1. private Locators:
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly loginErrorMessage: Locator;
    private readonly registerLink: Locator;

    //2. constructor of the page class: init the locators:
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.getByRole('link', { name: 'Register' });
    }

    //3. public page actions(methods) / behaviour: Encapsulation
    async goToLoginPage(baseURL?: string): Promise<void> {
        await this.page.goto((baseURL ?? '') + 'opencart/index.php?route=account/login');
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        await this.registerLink.click();
        return new RegisterPage(this.page);
    }

    async isForgottenPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`app user creds: ${username} - ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        await this.loginErrorMessage.waitFor({ state: 'visible' });
        return await this.loginErrorMessage.isVisible();

    }

}