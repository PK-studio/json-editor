import settings from './TextEditor_settings';

function filterConstructor (){
    let tagsStorage = [];

    function storeTag(content, parameter1, parameter2){
        let extractedTag = content.substring(parameter1, parameter2);
        tagsStorage.push(extractedTag)
    }
    function rebuildContent(orginalString, parameter1, parameter2){
        let part1 = orginalString.substring(0, parameter1);
        let part2 = "[iconIsHere_" + getIndicatorNum()  + "]";
        let part3 = orginalString.substring(parameter2);
        let newString = part1.concat(part2).concat(part3);
        return newString;
    }
    function getIndicatorNum(){
        let iNum = tagsStorage.length - 1;
        switch (true){
            case (iNum < 10):
                iNum = "00" + iNum;
                break;
            case (iNum < 100):
                iNum = "0" + iNum;
                break;
            default:
                break;
        }
        return iNum;
    }
    this.pullOutIcons = function(injectedString){
        let newContent = injectedString;
        function matchTagPatterns(){
            let tag_start, tag_end, tag_offset;
            for(let i=0; i < settings.tags.length; i++){
                tag_start = settings.tags[i].start
                tag_end = settings.tags[i].end
                tag_offset = settings.tags[i].end.length
                searchInString()
            }
            function searchInString(){
                let tag_start_index = newContent.indexOf(tag_start);
                let tag_end_position = newContent.indexOf(tag_end);
                let tag_end_index = Number(tag_end_position) + Number(tag_offset);
                
                function tagExist(){
                    return tag_start_index !== -1 || tag_end_position !== -1
                }
                function catchError(){
                    if(tag_start_index !== -1 && tag_end_position === -1){
                        console.log("start Tag: ", tag_start);
                        console.log("missing Tag: ", tag_end);
                        console.log(newContent);
                        throw new Error("End of tag is missing in above contnet!");
                    };
                    return tag_start_index !== -1 && tag_end_position === -1;           
                }
                if(tagExist() && !catchError()){
                    console.log("tagExist, no error")
                    // storeTag(newContent, tag_start_index, tag_end_index)
                    // newContent = rebuildContent(newContent, tag_start_index, tag_end_index)
                    // searchInString() //look for further tags
                }
            }
        }
        matchTagPatterns();
        return newContent
    }
    this.getBackIcons = function(injectedString){
        let newContent = injectedString;
        if(tagsStorage.length > 0){
            matchIndicators()
        }
        function matchIndicators(){
            let indicatorPatern = "[iconIsHere_";   //regex:  /\[indicator_\d*\]/g
            let indicatorLength = 15;
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
            matchIndicators() //look for further indicators

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
