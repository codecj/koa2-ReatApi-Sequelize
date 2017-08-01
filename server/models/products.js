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
var Products = sequelize.define('prods', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    price: Sequelize.BIGINT
    },
    {
        timestamps: false
    }
);
var Users = sequelize.define('user', {
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
var products = [
//     new Product('iPhone 7', 6800),
//     new Product('ThinkPad T440',5999),
//     new Product('LBP2900', 1099)
];
// var users=[];
// (async () => {
//     var pets = await Pet.findAll({
//         'order': [
//             ['id', 'DESC']//降序
//             // ['id', 'ASC']//默认升序
//         ] 
//                     });
//     for (let p of pets) {
//         products.push(p);
//     };
// })();


var id = 0;
function nextId() {
    // id++;
    // return 'p' + id;//自己定义id
    return uuid.v4();//唯一id
}
function User(name,password){
    this.id = nextId();
    this.name = name;
    this.password = password;
}

function Product(name, price) {//创建产品
    this.id = nextId();
    this.name = name;
    this.price = price;
}
module.exports = {

    getProducts: (name,price) => {//获取产品和搜索功能
        // console.log("name-------"+name)
        // console.log("price-------"+price)
        if(!name && !price){
           return (async () => {
                products = [];
                var pets = await Products.findAll({
                    'order': [
                        ['id', 'DESC']//降序
                        // ['id', 'ASC']//默认升序
                    ] 
                                });
                for (let p of pets) {
                    products.push(p);
                };
                 return products;
            })();
        }else{
            if(name && !price){
                return (async () => {
                var pets = await Products.findAll({
                    where: {
                                name: { $like: '%'+name+'%'}
                        
                    }
                })
                return pets;
                })();
            }else if(!name && price){
                return (async () => {
                var pets = await Products.findAll({
                    where: {
                                price: { $like: '%'+price+'%'}
                        
                    }
                })
                return pets;
                })();
            }else if(name && price){
                return (async () => {
                var pets = await Products.findAll({
                    where: {
                        '$and': [
                            {
                                name: { $like: '%'+name+'%'}
                            },
                            {
                                price: { $like: '%'+price+'%'}
                            }
                        ]
                        
                    }
                })
                return pets;
                })();
            }
        }
    },

    getProduct: (id) => {//获取带id的产品
        var i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    },

    createProduct: (name,price) => {//创建新产品
        // console.log(name)
        var p = new Product(name, price);
        products.push(p);
        (async () => {
            await Products.create(p);
        })();
        console.log(p)
        return p;
    },
    editProduct: (id,name,price) => {//根据id编辑产品
        (async () => {
            var pets = await Products.findById(id);
            // pets.name = name;//更改数据
            // pets.price = price;
            // await pets.save();//执行save()操作sql
            await pets.update({//直接操作sql
                name :name,
                price :price

            })
        })();
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                products[index].name = name;
                products[index].price = price;
                break;
            }
        }
        if (index >= 0) {
            // console.log(products[index])
            return products[index];
        }
    },
    deleteProduct: (id) => {//根据id删除产品
        (async () => {
            var pets = await Products.findById(id);
            await pets.destroy();

        })();
        // console.log(JSON.stringify(products))
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return products.splice(index, 1)[0];
            // return products[index];
        }
        return null;
    }
    ,login: (username,password) => {//用户登录
        return (async () => {
            var user = await Users.findAll({
                where:{name:username,password:password}
            });
            if(user.length == 0){
                console.log("fail")
                //跳到注册页面
            }else{
                console.log("success")
                //跳到登录页面
            }
            // ctx.render('register.html', {
            //     title: '登录失败'
            // });
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
