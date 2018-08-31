import settings from './Body_settings';

function filterConstructor (){
    let tagsStorage = [];
   
    function contentReplacer(match) {
        let iNum = tagsStorage.length - 1;
        if(iNum < 10) {
            iNum = "0" + iNum;
        }
        return "[iconIsHere_" + iNum + "]";
    }

    this.replaceIconWithTags = function(content) {        
        settings.tags.forEach((pattern) => {
            content = content.replace(new RegExp(pattern), (match) => {
                tagsStorage.push(match);
                return contentReplacer(match);
            });
        });
        return content;
    }

    this.getBackIcons = function(injectedString){
        let newContent = injectedString;
        if(tagsStorage.length > 0){
            matchIndicators()
        }
        function matchIndicators(){
            let indicatorPatern = "[iconIsHere_";
            let indicatorLength = 15; //[iconIsHere_01]
            let indicator_start_index = newContent.indexOf(indicatorPatern);
            let indicator_end_index = Number(indicator_start_index) + Number(indicatorLength);
            
            if(indicator_start_index !== -1){
                replaceIndicatorForTag(indicator_start_index, indicator_end_index)
            }
        }
        function replaceIndicatorForTag(parameter1,parameter2){
            let part1 = newContent.substring(0, parameter1);
            let part2 = getBackATag()
            let part3 = newContent.substring(parameter2);
            newContent = part1.concat(part2).concat(part3);
            // matchIndicators() //look for further indicators !Error in async function

            function getBackATag(){
                let tagNum = newContent.substring(parameter1, parameter2).replace(/\[/m, "").replace(/\]/m, "").split("_")[1];
                let tagIndex = tagNum.replace(/^0/m, "")
                return tagsStorage[tagIndex]
            }
        }
        return newContent
    }
    this.removeUnwantedHtmlTags = function(orginalString, injectedString){
        let newContent = injectedString;

        function shouldIRemoveHtmlTags(){
            let removehtmltags = true;
            for(let i=0; i < settings.checkhtml.length; i++){
                if(orginalString.search(settings.checkhtml[i]) >= 0){
                    removehtmltags = false;
                }
            }
            return removehtmltags;
        }

        if(shouldIRemoveHtmlTags()){
            newContent = newContent.replace(/(<p>)/g, "").replace(/(<\/p>)/g, "")
            newContent = newContent.replace(/(<h\d>)/g, "").replace(/(<\/h\d>)/g, "")
        }
        return newContent
    }
    this.replaceUnwantedCharacters = function(injectedString){
        let newContent = injectedString;
        for(let i=0; i<settings.unwantedCharacters.length; i++){
            let character = settings.unwantedCharacters[i];
            let regexpObject = new RegExp(character.expresion,"g");
            newContent = newContent.replace(regexpObject, character.newCharacter)
        }
        return newContent;
    }
}

const filter = new filterConstructor();
export default filter;
