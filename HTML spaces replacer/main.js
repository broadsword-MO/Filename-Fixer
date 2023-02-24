// REVIEW - Lines below don't work when this JavaScript is in a file separate from the HTML. Why? Or is it normal?
// const input = document.getElementById('input');
// const output = document.getElementById('output');
// const recResults = document.getElementById('recentResults');

const makeSelection = (elem) => window.getSelection().selectAllChildren(elem);
const getSelectedText = () => window.getSelection().toString();
const copyToClipboard = (text) =>
    navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
const recentResults = [];

function getAndTrimText() {
    const filename = document.getElementById('input').value;
    const trimFilename = filename.replace(/^"|"$/g, '').trim();
    return trimFilename;
}

function addResultToRecentWithBreak() {
    `${getSelectedText()}<br />` != recentResults[0] &&
        recentResults.unshift(`${getSelectedText()}<br />`);
    recentResults.length > 5 && recentResults.pop();
}

function selectStringCopy() {
    makeSelection(document.getElementById('output'));
    addResultToRecentWithBreak();
    copyToClipboard(getSelectedText());
    document.getElementById('recentResults').innerHTML =
        recentResults.join(' ');
    document.getElementById('input').select();
}

function setHtmlSSC(filename) {
    document.getElementById('output').innerHTML = filename;
    selectStringCopy(filename);
}

// .value only works to extract current text with 'input', 'form', 'textarea' etc.
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

function spinalCase() {
    const trimFilename = getAndTrimText();
    let extension;
    const splitName = trimFilename.split('.');
    splitName.length > 1 && (extension = splitName.pop().toLowerCase());
    const name = splitName
        .join(' ')
        .replace(/([a-z0-9])[ _-]*([A-Z])|%20/g, '$1-$2')
        .replace(/([a-z0-9])[ _-]+([a-z0-9])/g, '$1-$2')
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
        .replace(/[-_.]|%20/g, ' ')
        .replace(/\b\w/g, (char, index) =>
            index === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .replace(/\s+/g, '');
    const fixedFilename = extension ? `${name}.${extension}` : name;
    setHtmlSSC(fixedFilename);
}

// This isYour%20other-file.html
