// Line below doesn't work when this JS is in a file separate from the HTML
// const output = document.getElementById('output');

// Works good!
function onInputChange() {
    // .value only works to extract current text with 'input', 'form', 'textarea' etc.
    const fileName = document.getElementById('input').value;
    document.getElementById('output').innerHTML = fileName.replace(/\s/g, '%20');
}

const makeSelection = (elem) => window.getSelection().selectAllChildren(elem);
const getSelectedText = () => window.getSelection().toString();
const copyToClipboard = (text) =>
    navigator.clipboard?.writeText && navigator.clipboard.writeText(text);

function selectStringCopy() {
    makeSelection(document.getElementById('output'));
    getSelectedText();
    copyToClipboard(getSelectedText());
}
