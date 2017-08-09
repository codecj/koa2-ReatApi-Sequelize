
const model = require('../model');
const reason = require('../common/codeReason');
const md5 = require('../common/util');
const validator = require('../common/validator');

let Users = model.user;

function User(name,password){
    this.name = name;
    this.password = password;
}

module.exports = {
    login: (username,password) => {//用户登录
        let code ="";
        let pw = md5.mdparam(password);
        if(!validator.isNullOrEmpty(username) || !validator.isNullOrEmpty(password)){
            return (async () => {
                code = reason.SUCCESS;
                var user = await Users.findAll({
                    where:{name:username,password:pw}
                });
                if(user != ""){
                    return {user,code};

                }else{
                    code = reason.RECORD_NOT_EXISTS_ERR_CODE;
                    return {user,code};
                }
            })();
        }
    },
    register:(name,password)=>{
        let pw = md5.mdparam(password);
        var usr = new User(name,pw);
        return (async () => {
            await Users.create(usr);
            let user = await Users.findAll({
                where:{name:name,password:pw}
            });
            return user;
        })();
    }
};
