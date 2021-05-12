// Conversion of KeycodeLayoutData for lookup by code.
const KeycodeLookup = function () {
    class KeyPosition {
        constructor(rowIndex, keyIndex, sectionIndex, absOffset, relOffset, width) {
            this.rowIndex = rowIndex;
            this.keyIndex = keyIndex;
            this.sectionIndex = sectionIndex;
            this.absOffset = absOffset;
            this.relOffset = relOffset;
            this.width = width;
        }
    }

    const keyType = new Map();
    for (const [t, codes] of Object.entries(KeycodeLayoutData.keys)) {
        for (const c of codes) keyType.set(c, t);
    }

    const layouts = new Map();
    for (const [name, layout] of Object.entries(KeycodeLayoutData.layouts)) {
        const lookup = new Map();
        for (const [ri, row] of layout.entries()) {
            let absOffset = 0;
            for (const [ki, [code, sectionIndex, relOffset, width]] of row.entries()) {
                absOffset += relOffset;
                lookup.set(code, new KeyPosition(ri, ki, sectionIndex, absOffset, relOffset, width));
            }
        }
        layouts.set(name, lookup);
    }

    return {
        // Map of code to type.
        keyType: keyType,
        // Map of layout name to Map of code to KeyPosition.
        layouts: layouts,
    };
}();
