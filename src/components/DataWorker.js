import settings from './TextEditor_settings';
import filter from './TextEditor_filter';

function dataWorker(jsonFile){
    let dataDepo = [];
    LoopObject("", jsonFile);
    
    function LoopObject (key, objToLoop){
        for (let property in objToLoop) {
            if (objToLoop.hasOwnProperty(property)) {
                let nestedObject = objToLoop[property];
                let referance = key + "." + property;
                if (skip(property) === false){
                    LoopContinuation (referance, nestedObject)
                }
            }
        }
    }
    function LoopContinuation (referance, currentObj){
        if(typeof currentObj === 'string'){
            if(!ignoreThis(currentObj) && !skip(currentObj) && !itsEmpty(currentObj)){
                let newObject = {};
                let filterObj = filter.pullOutIcons(currentObj);
                newObject.key = referance;
                newObject.value = filterObj;
                newObject.orginal = filterObj;
                dataDepo.push(newObject);
            }
        }
        else if(typeof currentObj !== 'string' && Array.isArray(currentObj) === true){
            LoopArrey(referance, currentObj);
        }
        else if(typeof currentObj !== 'string' && Array.isArray(currentObj) === false){
            LoopObject(referance, currentObj);
        }
    }         
    function LoopArrey(key, nestedArrey){
        if (nestedArrey.length === 1){
            let loverLvl = nestedArrey[0];
            let referance = key + "[0]";
            LoopContinuation (referance, loverLvl)
        }
        else {
            for(let i = 0; i < nestedArrey.length - 1; i++){
                let loverLvl = nestedArrey[i];
                let referance = key + "[" + i + "]";
                LoopContinuation (referance, loverLvl)
            }
        }
    }       
    function ignoreThis(Obj){
        let status = false
        settings.ignoreTypes.forEach(function (typeToIgnor){
            if(typeof Obj === typeToIgnor){
                status = true
            }
        })
        return status
    }
    function skip(propertyName){
        let status = false
        settings.ignoreDataProperties.forEach(function (propToIgnor){
            if(propertyName === propToIgnor){
                status = true
            }
        })        
        return status
    }
    function itsEmpty(thisObj){
        if(thisObj === ""){
            return true
        }else{
            return false
        }
    }
    return dataDepo
};

export default dataWorker;