const moment = require('moment');
const bcrypt = require('bcryptjs')
const { sequelize } = require('@core/db')
const { Sequelize, Model } = require('sequelize')

// 定义管理员模型
class Admin extends Model {

}

// 初始管理员模型
Admin.init({
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '管理员id'
  },
  email: {
    type: Sequelize.STRING(50),
    unique: 'admin_email_unique',
    allowNull: false,
    comment: '登录邮箱'
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue("password", psw);
    },
    allowNull: false,
    comment: '登录密码'
  },
  nickname: {
    type: Sequelize.STRING(50),
    // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
    // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
    allowNull: false,
    // 备注
    comment: '管理员昵称'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'admin',
  tableName: 'admin'
})


module.exports = {
  Admin
}
