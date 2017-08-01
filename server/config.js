// grant all privileges on nodejs.* to 'cjing'@'%' identified by '123';
// use nodejs;
// FLUSH PRIVILEGES;// 修改权限
var config = {
    database: 'nodejs', // 使用哪个数据库
    username: 'cjing',// 用户名
    password: '123',// 口令
    host: 'localhost',// 主机名
    port: 3306 //端口号，MySQL默认3306
};

module.exports = config;
