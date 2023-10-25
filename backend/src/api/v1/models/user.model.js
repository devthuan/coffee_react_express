// phần model thường đảm nhiệm việc tạo và quản lý cơ sở dữ liệu bằng SQL.
//  Một trong những công việc quan trọng của model là định nghĩa cấu trúc của
//  các bảng cơ sở dữ liệu và thực hiện các truy vấn SQL để tạo, cập nhật, xóa, và truy vấn dữ liệu trong cơ sở dữ liệu.

const { connection } = require("../../../config/db.config");
const { setDataIntoRedis } = require("../services/redis.services");

const AddUserToDatabase = (
  phone_number,
  password,
  full_name,
  is_staff,
  is_active,
  created_date,
  callback
) => {
  let sql = `insert into Users (phone_number, password, full_name, is_staff,is_active , created_date) 
  VALUES (?, ?, ?, ?, ?, ?) `;

  connection.query(
    sql,
    [phone_number, password, full_name, is_staff, is_active, created_date],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const Login = (phone_number, callback) => {
  let sql =
    "select id, phone_number, password, is_active, is_staff from Users where phone_number = ?";

  connection.query(sql, [phone_number], async (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const GetUser = (page, limit, callback) => {
  const offset = (page - 1) * limit;
  let sql =
    "select id, phone_number, full_name, is_staff, is_active, address, created_date from Users limit ?, ?";
  connection.query(sql, [offset, limit], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const getUserTotalPage = (callback) => {
  let sql = "select count(*) as total from Users";
  connection.query(sql, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const DeleteUsers = (id, callback) => {
  let sql = "update Users set is_active = ? where id = ?";
  connection.query(sql, [0, id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const SearchUser = (searchTerm, callback) => {
  const redisKey = `search:${searchTerm}`;

  const sql =
    "select id, phone_number, full_name, is_staff, is_active, address, created_date from Users where full_name like ? or phone_number like ?";
  const query = [`${searchTerm}%`, `%${searchTerm}%`];

  connection.query(sql, query, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
      setDataIntoRedis(redisKey, JSON.stringify(result), 3600);
    }
  });
};

const UpdateStatusAccount = (user_id, new_status, callback) => {
  let sql = `update Users set is_active = ? where id = ?`;
  connection.query(sql, [new_status, user_id], (error, result) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });
};

module.exports = {
  AddUserToDatabase,
  Login,
  GetUser,
  getUserTotalPage,
  DeleteUsers,
  SearchUser,
  UpdateStatusAccount,
};
