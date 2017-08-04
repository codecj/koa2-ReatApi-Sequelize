
const model = require('../model');
const reason = require('../common/codeReason');
const md5 = require('../common/util');
let Users = model.user;

function User(name,password){
    this.name = name;
    this.password = password;
}

module.exports = {
    login: (username,password) => {//用户登录
        // console.log(JSON.stringify(ctx.body))
        // console.log(res.genHttpResp(4,username))
        if(username && password){
              // let code = reason.DB_EXCEPTION_ERR_CODE;
                // isSuccess.processFail(code);
                 return (async () => {
                    let code = reason.SUCCESS;
                    // reason.getReason = ;
                    var user = await Users.findAll({
                        where:{name:username,password:password}
                    });
             
                    return {user,code};
                    
                })();
        }else{
            return "";
        }
    },
    register:(name,password)=>{
        // md5.mdparam(password)
        // console.log( md5.mdparam(password))
        var usr = new User(name, password);
        return (async () => {
            await Users.create(usr);
            let user = await Users.findAll({
                where:{name:name,password:password}
            });
            return user;
        })();
    }
};
