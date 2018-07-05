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
const unwantedCharacters = [
        {
            expresion: '&nbsp;', 
            newCharacter: ' '
        },
        {
            expresion: '\\n', 
            newCharacter: ' '
        },
];
const tags = [
        {
            start: "<span",
            end: "</span>",
        },
        {
            start: "<img",
            end: " />",
        }
];
const checkhtml = [/<\p>/g, /<\h\d>/g];



export default {ignoreDataProperties, ignoreTypes, unwantedCharacters, tags, checkhtml};