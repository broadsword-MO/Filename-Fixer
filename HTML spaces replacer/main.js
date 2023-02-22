// REVIEW - Lines below don't work when this JavaScript is in a file separate from the HTML. Why? Or is it normal?
// const input = document.getElementById('input');
// const output = document.getElementById('output');
// const recResults = document.getElementById('recentResults');

const makeSelection = (elem) => window.getSelection().selectAllChildren(elem);
const getSelectedText = () => window.getSelection().toString();
const copyToClipboard = (text) =>
    navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
const recentResults = [];

function addResultToRecentWithBreak() {
    `${getSelectedText()}<br />` != recentResults[0] &&
        recentResults.unshift(`${getSelectedText()}<br />`);
    recentResults.length > 5 && recentResults.pop();
}

function selectStringCopy() {
    makeSelection(document.getElementById('output'));
    addResultToRecentWithBreak();
    copyToClipboard(getSelectedText());
    document.getElementById('recentResults').innerHTML = recentResults.join(' ');
    document.getElementById('input').select();
}

// .value only works to extract current text with 'input', 'form', 'textarea' etc.
function fillSpaces() {
    const filename = document.getElementById('input').value;
    const fixedFilename = filename
        .replace(/^"|"$/g, '')
        .trim()
        .replace(/\s/g, '%20');
    document.getElementById('output').innerHTML = fixedFilename;
    selectStringCopy(fixedFilename);
}

function removeSpaces() {
    const filename = document.getElementById('input').value;
    const fixedFilename = filename
        .replace(/^"|"$/g, '')
        .trim()
        .replace(/%20/g, ' ');
    document.getElementById('output').innerHTML = fixedFilename;
    selectStringCopy(fixedFilename);
}

function spinalCase() {
    const filename = document.getElementById('input').value;
    const fixedFilename = filename
        .replace(/^"|"$/g, '')
        .trim()
        .replace(/(\w)[ _]?([A-Z])| |%20/g, '$1-$2')
        .toLowerCase();
    document.getElementById('output').innerHTML = fixedFilename;
    selectStringCopy(fixedFilename);
}

function camelCase() {
    const filename = document.getElementById('input').value;
    const trimFilename = filename.replace(/^"|"$/g, '').trim();
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
    document.getElementById('output').innerHTML = fixedFilename;
    selectStringCopy(fixedFilename);
}

// This isYour%20other-file.html
