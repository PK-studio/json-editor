import settings from './Body_settings';
import filter from './Body_filter';

function saveJson(jsonInArray){
    console.log("save")
    jsonInArray.forEach(function(object){
        let ref_key = object.key.substring(1).replace(/\./g, " ").replace(/\]/g, "").replace(/\[/g, " ").split(" ")
        let stringCheckout = filter.removeHtmlTagsIfOrginalStringDoesntHave(object.orginal, object.value)
        let newValue = filter.getBackIcons(stringCheckout)
        
        find_property(jsonInArray)
        
        let iteration = 0
        function find_property(objToLoop){
            for(var property in objToLoop){
                if(property == ref_key[iteration]){
                    if(iteration == ref_key.length - 1){
                        objToLoop[property] = newValue;
                    }
                    else{
                        iteration ++;
                        find_property(objToLoop[property]);
                    }
                }
            }
        }
    })
}

export default saveJson;
