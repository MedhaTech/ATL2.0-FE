/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useLayoutEffect } from "react";
import { Row, Col, Form, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { InputBox } from "../stories/InputBox/InputBox";
import { Button } from "../stories/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/media/UPSHIFT_BLACK.png";
import CryptoJS from "crypto-js";
import { openNotificationWithIcon } from "../helpers/Utils";
import { adminLoginUser } from "../redux/actions";
import { connect } from "react-redux";

const LoginNew = (props) => {
  const history = useHistory();
  useLayoutEffect(() => {
    const moduleName = localStorage.getItem("module");
    const loginTime = localStorage.getItem("time");

    if (
      localStorage.getItem("current_user") &&
      localStorage.getItem("module")
    ) {
      moduleName === "MENTOR"
        ? history.push("/teacher/dashboard")
        : moduleName === "ADMIN"
        ? history.push("/admin/dashboard")
        : moduleName === "EVALUATOR"
        ? history.push("/evaluator/submitted-ideas")
        : moduleName === "EADMIN"
        ? history.push("/eadmin/dashboard")
        : history.push("/dashboard");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").required("required"),
      password: Yup.string().required("required"),
    }),
    onSubmit: (values) => {
      if (
        localStorage.getItem("current_user") &&
        localStorage.getItem("module")
      ) {
        openNotificationWithIcon(
          "error",
          `Another User(${localStorage.getItem(
            "module"
          )}) has already logged in`
        );
        return;
      }
      const key = CryptoJS.enc.Hex.parse("253D3FB468A0E24677C28A624BE0F939");
      const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
      const encrypted = CryptoJS.AES.encrypt(values.password, key, {
        iv: iv,
        padding: CryptoJS.pad.NoPadding,
      }).toString();
      const body = {
        username: values.email,
        password: encrypted,
        role: "ADMIN",
      };
      props.adminLoginUserAction(body, history, "ADMIN");
    },
  });

  const inputUserId = {
    type: "text",
    placeholder: "Enter admin email ",
  };

  const inputPassword = {
    placeholder: "Enter password",
    showEyeIcon: true,
  };

  const logInBtn = {
    label: "Login",
    size: "large",
  };

  return (
    <React.Fragment>
      <div
        className="container-fluid  "
        style={{ margin: "2rem", padding: "2rem" }}
      >
        {/* <UsersPage /> */}
        <Row className="row-flex height-100">
          <Col xs={12} sm={12} md={8} xl={8}>
            <Row className="logo">
              <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img src={logo} alt="Logo" className="logo-image" />
                </Col>
              </a>
            </Row>
            <Row>
              <h4 className="mb-4 d-flex justify-content-center align-elements-center">
                Super Admin Login
              </h4>
            </Row>
            <Row className="mt-5">
              <Col md={12}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Label className="mb-2" htmlFor="email">
                        Email
                      </Label>
                      <InputBox
                        {...inputUserId}
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />

                      {formik.touched.email && formik.errors.email ? (
                        <small className="error-cls">Required</small>
                      ) : null}
                    </Col>
                  </div>
                  <div className="w-100 clearfix" />

                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Label className="mb-2" htmlFor="Password">
                        Password
                      </Label>
                      <InputBox
                        {...inputPassword}
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />

                      {formik.touched.password && formik.errors.password ? (
                        <small className="error-cls">Required</small>
                      ) : null}
                    </Col>

                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      {/* <Row className="keepme_login">
                        <Col className="col-sm-8 ">
                          <Link
                            exact="true"
                            to="/admin/forgotpassword"
                            className="text-link pt-1"
                          >
                            Forgot password
                          </Link>
                        </Col>
                      </Row> */}
                    </Col>
                  </div>
                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Button
                        {...logInBtn}
                        type="submit"
                        btnClass={
                          !(formik.dirty && formik.isValid)
                            ? "default"
                            : "primary"
                        }
                        disabled={!(formik.dirty && formik.isValid)}
                        style={{
                          borderRadius: "0",
                          width: "7rem",
                          margin: "2rem",
                        }}
                      />
                    </Col>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ admin }) => {
  const { loading, error, currentUser } = admin;
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  adminLoginUserAction: adminLoginUser,
})(LoginNew);
