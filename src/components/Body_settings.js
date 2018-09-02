const ignoreDataProperties = [
        "menu",
        "keycolor",
        "animation", 
        "rules",
        "image",
        "audio",
        "keycolor",
        "type",
        "pagesToAdd",
        "tabType",
        "layout",
        "imagein",
        "poster",
        "src",
        "svg", 
        "fallbackImg",
        "style"
];        
const ignoreTypes = [
        "boolean", 
        "number"
];

const iconReplacer = {
    start: "[iconIsHere_",
    end: "]",
    regexp: /\[iconIsHere\_\d*\]/g,
    offset: 15
}

const tags = [
    /<img[^>]+>/g,
    /<span>[^>]+<\/span>/g
];

const checkhtml = [
    "<p>", 
    "<h"
];



export default {ignoreDataProperties, ignoreTypes, iconReplacer, tags, checkhtml};