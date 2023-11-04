// file: script.js
const debugShortener = false;

/**
 * Starts the creation of a short URL from a common URL and lists it on the page.
 * It will show an error message on the page if the URL is not valid.
 */
const provideShortURL = () => {
    console.info('provideShortURL() called');
    const inputUrl = document.getElementById('input-url').value;

    // Check if the URL is valid
    if (!isValidURL(inputUrl)) { // further checks required
        console.log('The URL is invalid');
        showElement('errorViewer_invalidURL');
        return;
    } else {
        hideElement('errorViewer_invalidURL');
        console.log('The URL is valid');
    }

    const shortURL = createShortURL(inputUrl);
    const shortURLListItem = createListItem(inputUrl, shortURL);

    // Append the list item to the list
    document.getElementById('list-url').appendChild(shortURLListItem);
};

/**
 * Creates and returns a list item element with a link to the short URL and the input URL
 * @param {string} inputURL
 * @param {string} shortUrl
 * @returns list item element
 */
const createListItem = (inputURL, shortUrl) => {
    console.info('createListItem() called with inputURL: ' + inputURL + ' and shortUrl: ' + shortUrl);
    const listItem = document.createElement('li');

    // Create short URL link element
    const link = document.createElement('a');
    link.innerText = shortUrl;
    link.href = inputURL;
    link.target = "_blank"
    listItem.appendChild(link);

    // Create text element with the input URL
    const inputURLElement = document.createElement('span');
    inputURLElement.innerText = ` - ${inputURL}`;
    listItem.appendChild(inputURLElement);

    return listItem;
}

/**
 * Function to check if the URL is valid
 * @param {string} url - The URL to be checked
 * @returns {boolean} - Returns true if the URL is valid, false otherwise
 */
const isValidURL = (url) => {
    console.info(`isValidURL() called with url: ${url}`);

    // This regular expression checks for the general pattern of a valid URL (protocol://domain.tld/path?query=string#hash).
    // It's designed to match http, https, ftp protocols, and considers internationalized domain names and paths.
    // It does not work with all edge cases, but it's a good start.
    // Regex by chat gpt 4
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?(#[\w-]*)?(\?[^\s]*)?$/i;

    // Recommendation by Arina Ehunova (https://hyperskill.org/projects/328/stages/1840/implement#comment)
    //const pattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/;

    // Test the URL against the regular expression pattern
    // todo After finish of last workout stage use better validation like URL constructor or url module of node.js !
    if (pattern.test(url) === false) {
        console.info('The URL is invalid');
        return false;
    }
    console.info('The URL is valid');
    return true;
};

/**
 * Returns a short URL string for a given input URL string.
 * @param {string} inputUrl
 * @returns {string} - The short URL string
 */
const createShortURL = (inputUrl) => {
    console.info(`createShortUrl() called with inputUrl: ${inputUrl}`);

    return `localhost/${generateRandomString(5)}`;
};

/**
 * Generates a random string of a given length. Contains only english alphanumeric characters.
 * @param {number} length - The length of the string to be generated
 * @returns {string} - The generated string
 */
const generateRandomString = (length) => {
    // Define the characters that can be included in the string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ''; // Initialize the result string
    const charactersLength = characters.length; // Get the length of the characters string

    // Loop for the number of times equal to the desired length of the string
    for (let i = 0; i < length; i++) {
        // Select a random character from the 'characters' string and append it to the 'result'
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result; // Return the generated string
};

// Event Listener, der auf den DOMContentLoaded Event wartet
document.addEventListener("DOMContentLoaded", function () {
    console.info('DOMContentLoaded event fired');

    // Hide error message
    hideElement('errorViewer_invalidURL');

    // Button mit der ID 'button-create' selektieren
    const buttonID = 'button-create';
    let button = document.getElementById(buttonID);

    // Klick Event Listener hinzufügen, der die createShortURL Funktion aufruft
    button.addEventListener('click', provideShortURL);
    console.info(`click event listener added for button with id: ${buttonID}`);

    if (debugShortener) {
        // Add url to input-url element
        document.getElementById('input-url').value = 'https://www.google.com';
    }
});

// Function to show an element by its ID
const showElement = (elementId) => {
    const element = document.getElementById(elementId);
    // Check if the element exists and is currently hidden
    if (element && element.style.display === 'none') {
        element.style.display = ''; // Reset to default value or set to desired display style
    }
};

// Function to hide an element by its ID
const hideElement = (elementId) => {
    const element = document.getElementById(elementId);
    // Check if the element exists and is not already hidden
    if (element && element.style.display !== 'none') {
        element.style.display = 'none'; // Hide the element
    }
};
