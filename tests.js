'use strict';

function testCodesMatch() {
    const allCodes = new Set();
    for (const [t, codes] of Object.entries(KeycodeLayoutData.keys)) {
        for (const c of codes) {
            if (allCodes.has(c)) {
                console.error('Duplicate code "' + c + '" in KeycodeLayoutData.keys.');
            } else {
                allCodes.add(c);
            }
        }
    }

    for (const [name, layout] of Object.entries(KeycodeLayoutData.layouts)) {
        for (const row of layout) {
            for (const [code] of row) {
                if (!allCodes.has(code))
                    console.error('Code "' + code + '" used in layout "' + name + '" not found in KeycodeLayoutData.keys.');
            }
        }
    }
}
