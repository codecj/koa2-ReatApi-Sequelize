  // store products as database:

const Sequelize = require('sequelize');//ORM框架
const uuid = require('node-uuid');//生成唯一id
const config = require('../config');

//创建一个sequelize对象实例：
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//定义模型Products，告诉Sequelize如何映射数据库表：
var User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    password: Sequelize.STRING(100)
    },
    {
        timestamps: false
    }
);

module.exports = {
    // register: (id) => {//注册用户
    //     (async () => {
    //         var pets = await Products.findById(id);
    //         await pets.destroy();

    //     })();
    //     // console.log(JSON.stringify(products))
    //     var
    //         index = -1,
    //         i;
    //     for (i = 0; i < products.length; i++) {
    //         if (products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }
    //     if (index >= 0) {
    //         return products.splice(index, 1)[0];
    //         // return products[index];
    //     }
    //     return null;
    // },   
    login: (user,password) => {//用户登录
        console.log(user)
        console.log(password)
        (async () => {
        //  	var user = await User.findAll({});
        //     console.log(JSON.stringify(user))
        })();
       
		// return user;
    }
};
 
