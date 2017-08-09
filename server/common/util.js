const crypto = require('crypto');
exports.mdparam = function(data) {  //加密
	const hash = crypto.createHash('md5');
    return hash.update(data).digest('hex').toUpperCase();  
}