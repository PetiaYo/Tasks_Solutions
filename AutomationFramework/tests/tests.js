const {Builder, By} = require('selenium-webdriver');
var assert = require('assert');
var driver;

var dropdownUrl = 'http://the-internet.herokuapp.com/dropdown';
var authUrl = 'http://admin:admin@the-internet.herokuapp.com/basic_auth';
var checkboxesUrl = 'http://the-internet.herokuapp.com/checkboxes';

var dropdown = By.id('dropdown');
var selectedInDropdown = By.css("option[selected]");

var authenticationText = By.css('div.example p');

var firstCheckbox = By.css("form#checkboxes > input:nth-child(1)");
var secondCheckbox = By.css("form#checkboxes > input:nth-child(3)");


describe('Example Tests', async function() {
    //Initialize driver before every test
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    //Quit driver after every test
    afterEach(async function() {
        await driver.quit();
    });

    it('Select Option 2 From Dropdown', async function() {
        //Navigate to web site containing dropdown
        await driver.get(dropdownUrl);

        //Select Option 2
        await driver.findElement(dropdown).sendKeys('Option 2');

        //Verify if option 2 is selected
        var selectedItemText = await driver.findElement(selectedInDropdown).getText();
        assert.equal(selectedItemText, 'Option 2', 'Option 2 is selected');
    });

    it('Authenticate with admin user', async function() {
        //Navigate to web site using basic authentication
        await driver.get(authUrl);

        //Verify if admin user is authenticated successfully
        var displayedText = await driver.findElement(authenticationText).getText();
        assert.equal(displayedText, 'Congratulations! You must have the proper credentials.', 'Admin user is authenticated successfully');
    });

    it('Check first checkbox and uncheck second checkbox', async function() {
        //Navigate to web site using basic authentication
        await driver.get(checkboxesUrl);

        //Check first checkbox
        await driver.findElement(firstCheckbox).click();

        //Uncheck second checkbox
        await driver.findElement(secondCheckbox).click();

        //Verify checkboxes state
        var isCheckBox1Checked = await driver.findElement(firstCheckbox).getAttribute('checked').then(isChecked => {return isChecked});
        var isCheckBox2Checked = await driver.findElement(secondCheckbox).getAttribute('checked').then(isChecked => {return isChecked});
        assert(isCheckBox1Checked, 'Checkbox 1 is checked');
        assert(!isCheckBox2Checked, 'Checkbox 2 is not checked');
    });
});