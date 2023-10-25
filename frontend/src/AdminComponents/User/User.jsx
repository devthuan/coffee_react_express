import classNames from "classnames/bind";
import styles from "./User.module.scss";
import { format, isValid } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  removeUser,
  addUser,
  setStatusUser,
} from "../../redux/features/user/userSlice";
import { useEffect, useMemo, useState } from "react";
import {
  GetUser,
  SearchUser,
  UpdateStatusAccount,
} from "../../services/UseServices";

const cx = classNames.bind(styles);

const User = () => {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.data);
  const memoizedUserData = useMemo(() => listUser, [listUser]);
  const [dataSearch, setDataSearch] = useState([]);

  const handleClickDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handleBlockAccount = async (userId) => {
    try {
      let newStatus = 0;
      const res = await UpdateStatusAccount(userId, newStatus);
      if (res && res.status === 200) {
        dispatch(setStatusUser({ userId, newStatus }));
        toast.success("Đã khóa tài khoản thành công.");
      }
    } catch (error) {}
  };
  const handleUnlockAccount = async (userId) => {
    try {
      let newStatus = 1;
      const res = await UpdateStatusAccount(userId, newStatus);
      if (res && res.status === 200) {
        dispatch(setStatusUser({ userId, newStatus }));
        toast.success("Đã mở khóa tài khoản thành công.");
      }
    } catch (error) {}
  };

  const handleSearchUser = async (event) => {
    let value = event.target.value;
    try {
      const res = await SearchUser(value);
      if (res && res.status === 200) {
        setDataSearch(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetUser(1);
        if (res && res.status === 200 && res.data.data) {
          const userData = res.data.data;
          userData.map((item) => dispatch(addUser(item)));
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (!memoizedUserData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Statistical User" />
        <div className={cx("box_search")}>
          <Input
            className={cx("input")}
            type="text"
            onChange={(event) => handleSearchUser(event)}
            placeholder="Tìm kiếm theo số điện thoại hoặc họ và tên"
          />
        </div>
        <div className={cx("box__table")}>
          {listUser && listUser.length > 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>STT</th>
                  <th className={cx("title__text")}>Họ và tên</th>
                  <th className={cx("title__text")}>số điện thoại</th>
                  <th className={cx("title__text")}>Địa chỉ</th>
                  <th className={cx("title__text")}>Quyền</th>
                  <th className={cx("title__text")}>Trạng thái</th>

                  <th className={cx("title__text")}>Ngày tạo</th>
                  <th className={cx("title__text")}>Thao tác</th>
                </tr>
                {dataSearch && dataSearch.length > 0
                  ? dataSearch.map((search, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{search.id}</td>
                          <td className={cx("item")}>{search.full_name}</td>
                          <td className={cx("item")}>{search.phone_number}</td>
                          <td className={cx("item")}>{search.address}</td>
                          <td className={cx("item")}>
                            {search.is_staff === "true" ? "Admin" : "Client"}
                          </td>
                          <td className={cx("item")}>
                            {search.is_active === 1 ? "Active" : "Blocked"}
                          </td>
                          <td className={cx("item")}>
                            {isValid(new Date(search.created_date))
                              ? format(
                                  new Date(search.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>

                          <td className={cx("item")}>
                            <Button
                              className={cx("btn", "update")}
                              text="sửa"
                            />
                            <Button
                              onClick={() => handleClickDelete(search.id)}
                              className={cx("btn", "delete")}
                              text="xoá"
                            />
                          </td>
                        </tr>
                      );
                    })
                  : listUser.map((user, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{user.id}</td>
                          <td className={cx("item")}>{user.full_name}</td>
                          <td className={cx("item")}>{user.phone_number}</td>
                          <td className={cx("item")}>{user.address}</td>
                          <td className={cx("item")}>
                            {user.is_staff === "true" ? "Admin" : "Client"}
                          </td>
                          <td className={cx("item")}>
                            {user.is_active === 1 ? "Active" : "Blocked"}
                          </td>
                          <td className={cx("item")}>
                            {isValid(new Date(user.created_date))
                              ? format(
                                  new Date(user.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>

                          <td className={cx("item")}>
                            <div className={cx("box_btn")}>
                              {user.is_active === 1 ? (
                                <Button
                                  className={cx("btn", "delete")}
                                  onClick={() => handleBlockAccount(user.id)}
                                  text="khoá"
                                />
                              ) : (
                                <Button
                                  className={cx("btn", "update")}
                                  onClick={() => handleUnlockAccount(user.id)}
                                  text="unlock"
                                />
                              )}
                              <Button
                                onClick={() => handleClickDelete(user.id)}
                                className={cx("btn", "delete")}
                                text="xoá"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          ) : (
            <Title
              className={cx("title")}
              text="No users registered for an account..."
            />
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default User;
