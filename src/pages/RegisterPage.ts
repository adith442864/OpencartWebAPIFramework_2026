import { Locator, Page, expect } from '@playwright/test';
// import { ElementUtil } from '../util/ElementUtil';


export class RegisterPage{

    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMsg: Locator;
    // private readonly eleUtil;

    constructor(page: Page) {
        this.page = page;
        // this.eleUtil = new ElementUtil(page);

        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        this.agreeCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByText('Your Account Has Been Created!', { exact: true });
    }


async registerUser(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribeNewsletter: string
    ): Promise<boolean> 
    {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        if (subscribeNewsletter === 'Yes') {
            await this.newsletterYesRadio.click();
        } 
        else {
            await this.newsletterNoRadio.click();
        }

        await this.agreeCheckbox.click();
        await this.continueButton.click({timeout:10000});

        await this.successMsg.waitFor({ state: 'visible', timeout: 10000 });
        return true;
    }

    // async verifyAccountCreated() {
    //     await expect(this.successMsg).toBeVisible();
    // }



}