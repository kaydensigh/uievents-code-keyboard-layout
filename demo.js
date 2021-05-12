'use strict';

function updateKeyboard() {
    const layout = KeycodeLayoutData.layouts[layoutList[likelyLayout]];
    keyboard.textContent = '';
    for (let row of layout) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-layout-row');
        keyboard.appendChild(rowDiv);
        for (const [code, _, offset, width] of row) {
            let keySpan = document.createElement('span');
            keySpan.classList.add('keyboard-layout-key');
            keySpan.style.setProperty("--key-rel-offset", offset);
            keySpan.style.setProperty("--key-rel-width", width);
            keySpan.textContent = code;
            rowDiv.appendChild(keySpan);
        }
    }
}

function chooseLayout() {
    // Pick the first layout that has all the codes seen so far.
    for (const [l, name] of layoutList.entries()) {
        const layoutLookup = KeycodeLookup.layouts.get(name);
        if (!layoutLookup) {
            console.log('Layout not found: ' + l);
            continue;
        }
        let ok = true;
        for (const code of codesSeen) {
            if (!layoutLookup.has(code)) {
                ok = false;
                break;
            }
        }
        if (ok) {
            likelyLayout = l;
            updateKeyboard();
            return true;
        }
    }
    console.log('No layout contains all codes seen: ');
    console.log(codesSeen);
    return false;
}

function identifyKey(code) {
    const layoutLookup = KeycodeLookup.layouts.get(layoutList[likelyLayout]);
    const position = layoutLookup.get(code);
    if (!position) {
        // Check if it's a function or media key.
        const keyType = KeycodeLookup.keyType.get(code);
        if (keyType == 'function' || keyType == 'media') {
            console.log('Got ' + keyType + ' code with no position: ' + code);
            return;
        }
        // Otherwise see if it's in another layout.
        codesSeen.add(code);
        if (chooseLayout()) return identifyKey(code);
    }
    return position;
}

let layoutList = ['Standard 101', 'Alternate 101', 'Standard 102', 'Korean 103', 'Brazilian 104', 'Japanese 106', 'Apple'];
let likelyLayout = 0; // Which of the list above is likely given the codes we've seen.
let codesSeen = new Set();

let keyboard = document.getElementById('keyboard');
updateKeyboard();

window.addEventListener('keydown', function (e) {
    const position = identifyKey(e.code);
    if (!position) return;
    // Highlight position.
    let keySpan = keyboard.children.item(position.rowIndex).children.item(position.keyIndex);
    keySpan.style.backgroundColor = 'lightyellow';
});

function testCode(code) { window.dispatchEvent(new KeyboardEvent('keydown', { code: code })); }
