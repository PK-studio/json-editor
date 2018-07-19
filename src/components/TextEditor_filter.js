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
        let newString = part1.concat([part2, part3]);
        return newString;
    }
    function getIndicatorNum(){
        let iNum = tagsStorage.length - 1;
        switch (true){
            case (iNum < 10):
                iNum = "0" + iNum;
                break;
            default:
                break;
        }
        return iNum;
    }
    this.pullOutIcons = function(injectedString){
        let newContent = injectedString;
        function matchTagPatterns() {
            let runAgain = (pattern) => {
                console.log("can't call 'searchTagsInContnet' again to find rest of the tags in the same string. \n"
                            + "error: function 'tagExist' is undefined" + err);
            }
            let searchTagsInContnet = (pattern) => {
                let tag_start_index = newContent.indexOf(pattern.start);
                let tag_end_position = newContent.indexOf(pattern.end);
                let tag_end_index = Number(tag_end_position) + Number(pattern.end.length);
                function tagExist(){
                    if(tag_start_index !== -1 || tag_end_position !== -1){
                        return true;
                    }
                    // debugger;
                    return false;
                }
                function tagMatched(){
                    if(tag_start_index !== -1 && tag_end_position !== -1){
                        return true;
                    }
                    // debugger;
                    return false;
                }
                if(tagExist() && tagMatched()){
                    storeTag(newContent, tag_start_index, tag_end_index);
                    newContent = rebuildContent(newContent, tag_start_index, tag_end_index);
                    runAgain(pattern);
                }
            };

            for (let pattern of settings.tags){
                searchTagsInContnet(pattern)
            }
        }
        // matchTagPatterns = () => {
        //     // let contentChanged_loopAgain = false;
        //     async function loopingContent() {
        //         settings.tags.forEach((pairedTag) => {
        //             let tag_start_index = newContent.indexOf(pairedTag.start);
        //             let tag_end_position = newContent.indexOf(pairedTag.end);
        //             let tag_end_index = Number(tag_end_position) + Number(pairedTag.end.length);
        //             function tagExist(){
        //                 return tag_start_index !== -1 || tag_end_position !== -1
        //             }
        //             function tagMatched(){
        //                 return tag_start_index !== -1 && tag_end_position !== -1;
        //             }
        //             if(tagExist() && tagMatched()){
        //                 storeTag(newContent, tag_start_index, tag_end_index);
        //                 // contentChanged_loopAgain = true;
        //                 newContent = rebuildContent(newContent, tag_start_index, tag_end_index);
        //             }
        //             return Promise.resolve();
        //         });   
        //     }
        // }
            //=================================================
            // for(let i=0; i < settings.tags.length; i++){
            //     let tag_start = settings.tags[i].start
            //     let tag_end = settings.tags[i].end
            //     let tag_offset = settings.tags[i].end.length

            //     let tag_start_index = newContent.indexOf(tag_start);
            //     let tag_end_position = newContent.indexOf(tag_end);
            //     let tag_end_index = Number(tag_end_position) + Number(tag_offset);
                
            //     function tagExist(){
            //         return tag_start_index !== -1 || tag_end_position !== -1
            //     }
            //     function tagMatched(){
            //         return tag_start_index !== -1 && tag_end_position !== -1;
            //     }
            //     if(tagExist() && tagMatched()){
            //         storeTag(newContent, tag_start_index, tag_end_index);
            //         newContent = rebuildContent(newContent, tag_start_index, tag_end_index);
            //         contentChanged_loopAgain = true;
            //     }else{
            //         contentChanged_loopAgain = false;
            //     }
            // }
            // if(contentChanged_loopAgain){
            //     matchTagPatterns();
            // }
        // }
        matchTagPatterns();
        return newContent
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
