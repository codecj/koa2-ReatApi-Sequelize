
const Sequelize = require('sequelize');//ORM框架
const config = require('./config');

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

//定义模型Pet，告诉Sequelize如何映射数据库表：
var Pet = sequelize.define('pet', {
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
//mysql中插入数据

(async () => {
    var dog = await Pet.create({
        id: 5,
	    name: 'mac',
	   	price:11110000
    });
})();
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'mac'
        }
    });
    for (let p of pets) {
    	p.name = "apple";
    	await p.save();//mysql更改数据
        if(p.price === 1111){
    		await p.destroy();//mysql删除数据

        }
    }

})();