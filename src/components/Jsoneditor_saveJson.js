import settings from './Body_settings';
import filter from './Body_filter';

function saveJson(jsonInArray, jsonObj){
    let newObj = jsonObj;
    jsonInArray.forEach(function(object){
        let ref_key = object.key.substring(1).replace(/\./g, " ").replace(/\]/g, "").replace(/\[/g, " ").split(" ")
        let stringCheckout = filter.removeHtmlTagsIfOrginalStringDoesntHave(object.orginal, object.value)
        let newValue = filter.getBackIcons(stringCheckout)
        
        findPropertyInJson(ref_key,newValue)
    })
    function findPropertyInJson(ref_key,newValue){
        let iteration = 0;
        loopThrough(newObj);
        function loopThrough (objToLoop){
            for(let property in objToLoop){
                if(property == ref_key[iteration]){
                    if(iteration == ref_key.length - 1){
                        objToLoop[property] = newValue;
                    }
                    else{
                        iteration ++;
                        loopThrough(objToLoop[property]);
                    }
                }
            }
        }
    }
    return newObj;
}

export default saveJson;
