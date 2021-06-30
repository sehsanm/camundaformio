
function convertForm(originalForm) {
    ret = {} ; 
    for(var name in originalForm) {
        if (originalForm.hasOwnProperty(name) && name !== 'submit') {
            ret[name] = {value : originalForm[name]}
        }
        //TODO: Remove submit property 
    }
    return ret ;
}

module.exports.convertForm =  convertForm