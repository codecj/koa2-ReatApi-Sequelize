// var crypto = require('crypto');
// //把参数对象拼接成支付宝要求的字符串格式
// var linkParams = exports.linkParams = function(obj) {
//     var params = [];
//     // remove sign && sign_type
//     for(var name in obj) {
//         if(name != 'sign' && name != 'sign_type') {
//             params.push(name + '=' + obj[name]);
//         }
//     }
//     params.sort();
//     return params.join('&');
// };
// //校验md5签名
// exports.verifyMd5 = function(params, key) {
//     var prestr = linkParams(params);
//     return md5(prestr + key) == params.sign;
// };
// //用md5签名
// exports.signMd5 = function(params, key) {
//     var prestr = linkParams(params);
//     return md5(prestr + key);
// };

// //用md5签名
// exports.signMd5ForStr = function(paramsLinkStr, key) {
//     return md5(paramsLinkStr + key);
// };

// function md5(str){
//     var buf = new Buffer(10240);
//     var len = buf.write(str, 0);
//     var result = buf.toString('binary', 0, len);
//     var md5_value = crypto.createHash('md5').update(result).digest('hex');
//     return md5_value;
// }



const crypto = require('crypto');
const hash = crypto.createHash('md5');
exports.mdparam = function(data) {  
    return hash.update(data).digest('hex').toUpperCase();  
}


//  exports.mdparam =function(data) {  
//     return crypto.createHash('md5').update(data).digest('hex').toUpperCase();  
// }  