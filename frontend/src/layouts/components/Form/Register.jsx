import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Title from "../../../components/Title/Title";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RegisterAPI } from "../../../services/UseServices";
import { validateRegisterData } from "../../../validations/validations";
const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const GroupInput = [
    { type: "text", label: "Họ và tên", placeholder: "Họ và tên" },
    { type: "text", label: "Số Điện thoại", placeholder: "Số điện thoại" },
    { type: "password", label: "Mật khẩu", placeholder: "Mật khẩu" },
  ];

  const [inputValues, setInputValues] = useState({});

  const handleInputValues = (e, index) => {
    const { value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const full_name = inputValues[0];
      const phone_number = inputValues[1];
      const password = inputValues[2];
      if (full_name && phone_number && password) {
        let validationErrors = validateRegisterData(password, phone_number);
        if (validationErrors) {
          validationErrors.forEach((item) => {
            toast.error(item);
          });
        }
        const res = await RegisterAPI(full_name, phone_number, password);
        if (res && res.status === 400 && res.data) {
          toast.error(res.data.error);
        }

        if (res && res.status === 200 && res.data) {
          toast.success(res.data.message);
          navigate("/login");
        }
      } else {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!!");
      }
    } catch (error) {
      console.log("check error: ", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content__right")}>
          <Title className={cx("content__right-title")} text="Đăng ký" />

          <div className={cx("group__input")}>
            {GroupInput.map((item, index) => {
              return (
                <Fragment key={index}>
                  <label htmlFor="" className={cx("title__input")}>
                    {item.label}
                  </label>
                  <Input
                    value={inputValues[item]}
                    key={index}
                    className={cx("input")}
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={(e) => handleInputValues(e, index)}
                  />
                </Fragment>
              );
            })}
            <Button
              onClick={() => handleRegister()}
              className={cx("btn")}
              text="Đăng Ký"
            />
          </div>
          <div className={cx("box__support")}>
            <p className={cx("not__number")}>
              Bạn đã có tài khoản ?
              <NavLink to="/login" className={cx("btn__register")}>
                {" "}
                Đăng Nhập
              </NavLink>
            </p>
          </div>
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
        theme="dark"
      />
    </div>
  );
};

export default Register;
