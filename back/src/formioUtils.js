
function convertForm(originalForm) {
    ret = {} ; 
    for(var name in originalForm) {
        if (originalForm.hasOwnProperty(name)) {
            ret[name] = {value : originalForm[name]}
        }
    }
    return ret ;
}

module.exports.convertForm =  convertForm