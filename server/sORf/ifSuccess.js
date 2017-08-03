// var reason = require('../common/codeReason');
// exports.processFail = function(code){
//     return code;
// }
// exports.processParamsFailureResult = function(handler){
//     processFailureResult(handler, reason.REQ_PARAM_ERR_CODE, 'field name validation failed');
// };

// var processSuccessResult = exports.processSuccessResult = function(code){
    
// };

// var processFailureResult = exports.processFailureResult = function(handler, code, err){
//     if(!handler){
//         return;
//     }
//     if(typeof(handler) == 'function'){
//         handler(code, reason.getReason(code));
//     }
//     else{
//         handler.emit(constant.EVENT_FAILURE, resp.genHttpResp(code, null, err));
//     }
// };