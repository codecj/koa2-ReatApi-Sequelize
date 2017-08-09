const model = require('../model');
const reason = require('../common/codeReason');
const db = require('../db');

let Products = model.products;
function Product(name, price) {//创建产品
    this.name = name;
    this.price = price;
}
module.exports = {
    getProducts: (name,price) => {//获取产品和搜索功能
        let code;
        if(!name && !price){
           return (async () => {
                // products = [];
                var pets = await Products.findAll({
                    'order': [
                        ['id', 'DESC']//降序
                        // ['id', 'ASC']//默认升序
                    ] 
                    });

                code = reason.SUCCESS;
                return {pets,code};
            })();
        }else{
            if(name && !price){
                return (async () => {
                var pets = await Products.findAll({
                    where: {
                                name: { $like: '%'+name+'%'}
                        
                    }
                })
                if(pets == ""){

                    code = reason.RECORD_NOT_EXISTS_ERR_CODE
                }else{
                    code = reason.SUCCESS;
                }
                return {pets,code};
                })();
            }else if(!name && price){
                return (async () => {
                var pets = await Products.findAll({
                    where: {
                                price: { $like: '%'+price+'%'}
                        
                    }
                })
                if(pets == ""){

                    code = reason.RECORD_NOT_EXISTS_ERR_CODE
                }else{
                    code = reason.SUCCESS;
                }
                return {pets,code};
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
               if(pets == ""){

                    code = reason.RECORD_NOT_EXISTS_ERR_CODE
                }else{
                    code = reason.SUCCESS;
                }
                return {pets,code};
                })();
            }
        }
    },

    getProduct: (id) => {//获取带id的产品
        return (async () => {
            var pets = await Products.findAll({where:{id:id}});
            return pets;
        })();
    },

    createProduct: (name,price) => {//创建新产品
        let code;
        if(name && price){
            console.log(1)
            var p = new Product(name, price);
            return (async () => {
               var ppp= await Products.create(p);
                var pets = await Products.findAll({where:{name:name}});
                code = reason.SUCCESS;
                return {pets,code};
            })();
        }else{
            return (async () => {
                var pets = [];
                code = reason.RECORD_NOT_EXISTS_ERR_CODE;
                return {pets,code};
            })();
        }
       
    },
    editProduct: (id,name,price) => {//根据id编辑产品
        let code;
        return (async () => {
            var pets = await Products.findById(id);
            if(pets == null){
                pets=[];
                code = reason.RECORD_NOT_EXISTS_ERR_CODE
            }else{
                await pets.update({//直接操作sql
                    name :name,
                    price :price
                })
                code = reason.SUCCESS;
                }
            return {pets,code};
        })();
    },

    deleteProduct: (id) => {//根据id删除产品
        let code;
        return (async () => {
            var pets = await Products.findById(id);
            if(pets){
                await pets.destroy();
                code = reason.SUCCESS;
            }else{
                code = reason.RECORD_NOT_EXISTS_ERR_CODE
            }
         
            return {pets,code};
        })();
    }
};
