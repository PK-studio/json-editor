import settings from './Body_settings';

function filterConstructor (){
    let tagsStorage = [];
   
    function contentReplacer() {
        let iNum = tagsStorage.length - 1;
        if(iNum < 10) {
            iNum = "0" + iNum;
        }
        return settings.iconReplacer.start + iNum + settings.iconReplacer.end;
    }

    this.replaceIconWithTags = function(content) {        
        settings.tags.forEach((pattern) => {
            content = content.replace(new RegExp(pattern), (match) => {
                tagsStorage.push(match);
                return contentReplacer();
            });
        });
        return content;
    }

    this.removeHtmlTagsIfOrginalStringDoesntHave = function(orginalString, currentString){
        function checkIfshouldIRemoveHtmlTags(){
            let result = false;
            settings.checkhtml.forEach((pattern) =>{
                if (!orginalString.indexOf(pattern)){
                    result = true;
                }
            })
            return result;
        }
        if(checkIfshouldIRemoveHtmlTags()){
            currentString = currentString.replace(/(<p>)/g, "").replace(/(<\/p>)/g, "")
            currentString = currentString.replace(/(<h\d>)/g, "").replace(/(<\/h\d>)/g, "")
        }
        return currentString
    }

    this.getBackIcons = function(currentString){
        let indicatorExisit = (currentString.indexOf(settings.iconReplacer.start) >= 0);
        function matchAndReplaceIndicators(){
            const regexp = new RegExp(settings.iconReplacer.regexp);
            currentString = currentString.replace(regexp, (matchPart) => {
                let digit = matchPart.match(/[0-9]+/g).toString().replace(/^0/m, "");
                return tagsStorage[digit]
            });
        };
        if(indicatorExisit){
            matchAndReplaceIndicators();
        };
        return currentString;
    }
}

const filter = new filterConstructor();
export default filter;
