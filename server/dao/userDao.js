
const model = require('../model');

let Users = model.user;

function User(name,password){
    this.name = name;
    this.password = password;
}

module.exports = {
    login: (username,password) => {//用户登录
        return (async () => {
            var user = await Users.findAll({
                where:{name:username,password:password}
            });
            if(user.length == 0){
                console.log("fail")
                // ctx.render('register.html', {
                //     title: '登录失败'
                // });
                //跳到注册页面
            }else{
                console.log("success")
                //跳到登录页面
            }
           
            return user;
        })();
       
    },
    register:(name,password)=>{
        var usr = new User(name, password);
        (async () => {
            await Users.create(usr);
        })();
        return usr;
    }
};
