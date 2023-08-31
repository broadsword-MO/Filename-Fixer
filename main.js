// NOTE For PWA setup: Register the service worker JS file
window.onload = () => {
    // 'use strict'; // May be unnecessary here

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
};

// REVIEW - Lines just below don't work when this JavaScript is in a file separate from the HTML. Why? Or is it normal?
// const input = document.getElementById('input');
// const output = document.getElementById('output');
// const recResults = document.getElementById('recentResults');

// NOTE For PWA: local storage setup
// If 'recentResults' exists, get the string from localStorage and
// Convert the string back to an array using JSON.parse()
const recentResults = localStorage.getItem('recentResults')
    ? JSON.parse(localStorage.getItem('recentResults'))
    : [];

document.getElementById('recentResults').setHTML(recentResults.join(' '));

// ===================================================
//                   Functions
// ===================================================
const makeSelection = (elem) => window.getSelection().selectAllChildren(elem);
const getSelectedText = () => window.getSelection().toString();
const copyToClipboard = (text) =>
    navigator.clipboard?.writeText && navigator.clipboard.writeText(text);

function getAndTrimText() {
    // .value only works to extract current text with 'input', 'form', 'textarea' etc.
    const filename = document.getElementById('input').value;
    const trimFilename = filename.replace(/^"|"$/g, '').trim();
    return trimFilename;
}

function addResultToRecentWithHR() {
    if (getSelectedText() !== '') {
        `${getSelectedText()}<hr />` !== recentResults[0] &&
            recentResults.unshift(`${getSelectedText()}<hr />`);
        recentResults.length > 6 && recentResults.pop();

        // Store the string in localStorage under the 'recentResults' key
        // Convert the array to a string using JSON.stringify()
        localStorage.setItem('recentResults', JSON.stringify(recentResults));
    }
}

function selectStringCopy() {
    makeSelection(document.getElementById('output'));
    addResultToRecentWithHR();
    copyToClipboard(getSelectedText());
    document.getElementById('recentResults').innerHTML =
        recentResults.join(' ');
    document.getElementById('input').select();
}

function setHtmlSSC(filename) {
    document.getElementById('output').innerHTML = filename;
    selectStringCopy(filename);
}

// ================== Functions for buttons ===================
function fillSpaces() {
    const trimFilename = getAndTrimText();
    const fixedFilename = trimFilename.replace(/\s/g, '%20');
    setHtmlSSC(fixedFilename);
}

function removeSpaces() {
    const trimFilename = getAndTrimText();
    const fixedFilename = trimFilename.replace(/%20/g, ' ');
    setHtmlSSC(fixedFilename);
}

function snakeCase() {
    const trimFilename = getAndTrimText();
    let extension;
    const splitName = trimFilename.split('.');
    splitName.length > 1 && (extension = splitName.pop().toLowerCase());
    const name = splitName
        .join(' ')
        .trim()
        .replace(/(?:%20|[_\W])+/g, '_')
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .toLowerCase();
    const fixedFilename = extension ? `${name}.${extension}` : name;
    setHtmlSSC(fixedFilename);
}

function spinalCase() {
    const trimFilename = getAndTrimText();
    let extension;
    const splitName = trimFilename.split('.');
    splitName.length > 1 && (extension = splitName.pop().toLowerCase());
    const name = splitName
        .join(' ')
        .trim()
        .replace(/(?:%20|[_\W])+/g, '-')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
    const fixedFilename = extension ? `${name}.${extension}` : name;
    setHtmlSSC(fixedFilename);
}

function camelCase() {
    const trimFilename = getAndTrimText();
    let extension;
    const splitName = trimFilename.split('.');
    splitName.length > 1 && (extension = splitName.pop().toLowerCase());
    const name = splitName
        .join(' ')
        .replace(/(?:%20|[_\W])+/g, ' ')
        .replace(/\b\w/g, (char, index) =>
            index === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .replace(/\s+/g, '');
    const fixedFilename = extension ? `${name}.${extension}` : name;
    setHtmlSSC(fixedFilename);
}

function sanitize() {
    const trimFilename = getAndTrimText();
    let extension;
    const splitName = trimFilename.split('.');
    splitName.length > 1 && (extension = splitName.pop().toLowerCase());
    const name = splitName
        .join('.')
        .replace(/(_|%20|[^\w#&(),'.-])+/g, ' ')
        .replace(/([a-z0-9])([A-Z]|\()/g, '$1 $2')
        .trim();
    const fixedFilename = extension ? `${name}.${extension}` : name;
    setHtmlSSC(fixedFilename);
}

function clearAll() {
    localStorage.clear();
    window.location.reload();
}

// This _isYour%20other-file.html |[^#&()-]
