import settings from './Body_settings';
import filter from './Body_filter';

function saveJson(jsonInArray){
    console.log("save")
    jsonInArray.forEach(function(object){
        const ref_key = object.key().substring(1).replace(/\./g, " ").replace(/\]/g, "").replace(/\[/g, " ").split(" ")
        const stringCheckout = filter.removeUnwantedHtmlTags(object.orginal, object.value())
        const textCheckout = filter.replaceUnwantedCharacters(stringCheckout)
        const newValue = filter.getBackIcons(textCheckout)
        
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
