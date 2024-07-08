/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import "./regcss.css";
import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { decryptGlobal } from "../constants/encryptDecrypt";
import OtpInput from "react-otp-input-rc-17";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/sim_logo.png";

import user from "../assets/img/icons/user-icon.svg";
import play from "../assets/img/playicon.png";
import copy from "../assets/img/copyrights.png";
import { ArrowRight } from "feather-icons-react";
import { stateList, districtList } from "./ORGData.js";
import { openNotificationWithIcon } from "../helpers/Utils.js";

const Register = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [districtData, setDistrictData] = useState([]);
  const [stateData, setStateData] = useState();
  const [diesCode, setDiesCode] = useState("");
  const [orgData, setOrgData] = useState({});
  const [data, setData] = useState(false);
  const [error, setError] = useState("");
  const [schoolBtn, setSchoolBtn] = useState(false);
  const [btnOtp, setBtnOtp] = useState(false);
  const [otpRes, setOtpRes] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [mentorData, setMentorData] = useState({});
  const [diceBtn, setDiceBtn] = useState(true);
  const [btn, setBtn] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [change, setChange] = useState("Send OTP");
  const [wtsNum, setWtsNum] = useState("");
  const [mobNum, setMobNum] = useState("");
  const [holdKey, setHoldKey] = useState(false);
  const [sendOtp, setSendOtp] = useState("");
  const [time] = useState("00");
  const [counter, setCounter] = useState(59);
  const [sec, setSec] = useState(59);
  const [buttonData, setButtonData] = useState("");
  const [disable, setDisable] = useState(false);
  const [areInputsDisabled, setAreInputsDisabled] = useState(false);
  const [dropdownbtn, setDropDownbtn] = useState("");
  const [timer, setTimer] = useState(0);
  const [person, setPerson] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [design, setDesign] = useState(false);

  const normalizeStateName = (stateName) => {
    return stateName
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleIconClick = () => {
    //e.preventDefault(); // Prevent the default action of the anchor tag
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOnChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const trimmedValue = numericValue.trim();

    setDiesCode(trimmedValue);

    if (trimmedValue.length === 11 && checkBox1) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }

    setOrgData();
    setError("");
  };

  const handleCheckbox1 = (e, click) => {
    if (click) {
      setCheckBox1(true);
      if (diesCode.length === 11) {
        setIsButtonEnabled(true);
      }
      //formik.setFieldValue("whatapp_mobile", formik.values.mobile);
      //setWtsNum(formik.values.mobile);
    } else {
      setCheckBox1(false);
      setIsButtonEnabled(false);
      //formik.setFieldValue("whatapp_mobile", "");
    }
  };

  localStorage.setItem("orgData", JSON.stringify(orgData));
  localStorage.setItem("diesCode", JSON.stringify(diesCode));

  const handleRegister = (e) => {
    const body = JSON.stringify({
      organization_code: diesCode,
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/organizations/checkOrg",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        // if (response?.status === 200) {
        //   console.log(response,"eivnir");
        //   if (
        //     response?.data?.data[0].mentor != null &&
        //     response?.data?.data[0].mentor != ""
        //   ) {
        //     setError("Another Teacher is already registered in given School");
        //   } else {
        //     if (Object.keys(response?.data?.data[0]).length) {
        //       setOrgData(response?.data?.data[0]);
        //       formik.setFieldValue(
        //         "organization_code",
        //         response?.data?.data[0].organization_code
        //       );

        //       setDiceBtn(false);
        //       setSchoolBtn(true);
        //     } else {
        //       setError("Oops..! UDISE Code seems incorrect");
        //     }
        //   }
        // }
        if (response?.status == 200) {
          if (response?.data.count === 0) {
            setError("Enter Valid School UDISE Code ");
          }
          if (
            response?.data?.data[0] &&
            process.env.REACT_APP_USEDICECODE == 1
          ) {
            if (Object.keys(response?.data?.data[0]).length) {
              setDropDownbtn(response?.data?.data[0].mentor != null);
              if (response?.data?.data[0].mentor != null) {
                formik.setFieldValue(
                  "district",
                  response?.data?.data[0].district
                );
              } else {
                formik.setFieldValue("district", "");
              }
              setOrgData(response?.data?.data[0]);
              formik.setFieldValue(
                "organization_code",
                response?.data?.data[0].organization_code
              );

              const fetchedstate = response?.data?.data[0].state;
              const normalizedState = normalizeStateName(fetchedstate);
              setStateData(normalizedState);
              setStateData(fetchedstate);
              setDistrictData(districtList[normalizedState] || []);

              setDiceBtn(false);
              setSchoolBtn(true);
            } else {
              // setError(
              //   "Entered Code belongs to Non-Atl school. Kindly register as Non-ATL"
              // );
            }
          }
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.status === 404) {
          navigate("/non-atl-register", { state: diesCode });

          // setError("Oops..!  UDISE Code seems incorrect");
        }
      });

    e.preventDefault();
  };
  useEffect(() => {
    if (!dropdownbtn) {
      setDesign(true);
    } else {
      setDesign(false);
    }
  }, [dropdownbtn]);
  async function apiCall() {
    // Dice code list API //
    // where list = diescode //
    const body = JSON.stringify({
      school_name: orgData.organization_name,
      atl_code: orgData.organization_code,
      // atl_code: mentorDaTa.organization_code,
      district: orgData.district,
      state: orgData.state,
      pin_code: orgData.pin_code,
      email: mentorData.username,
      mobile: mentorData.mobile,
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/mentors/triggerWelcomeEmail",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };

    await axios(config)
      .then(async function (response) {
        if (response.status == 200) {
          setButtonData(response?.data?.data[0]?.data);
          openNotificationWithIcon("success", "Email sent successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      full_name: "",
      organization_code: diesCode,
      // username: '',
      mobile: "",
      whatapp_mobile: "",
      role: "MENTOR",
      qualification: "-",
      reg_status: false,
      otp: "",
      password: "",
      gender: "",
      title: "",
      district: "",
      email: "",
      click: false,
      checkbox: false,
    },

    validationSchema: Yup.object({
      full_name: Yup.string()
        .trim()
        .min(2, <span style={{ color: "red" }}>Please Enter Full Name</span>)
        .matches(
          /^[aA-zZ\s]+$/,
          <span style={{ color: "red" }}>
            "Special Characters are not allowed"
          </span>
        )
        .required(<span style={{ color: "red" }}>Please Enter Full Name</span>),
      mobile: Yup.string()
        .required(
          <span style={{ color: "red" }}>Please Enter Mobile Number</span>
        )
        .trim()
        .matches(/^\d+$/, "Mobile number is not valid (Enter only digits)")
        .max(
          10,
          <span style={{ color: "red" }}>
            Please enter only 10 digit valid number
          </span>
        )
        .min(
          10,
          <span style={{ color: "red" }}>Number is less than 10 digits</span>
        ),
      email: Yup.string()
        .email(
          <span style={{ color: "red" }}>Please Enter Valid Email Address</span>
        )
        .max(255),
      whatapp_mobile: Yup.string()
        .required(
          <span style={{ color: "red" }}>Please Enter WhatsApp Number</span>
        )
        .trim()
        .matches(
          /^\d+$/,
          <span style={{ color: "red" }}>
            Mobile number is not valid (Enter only digit)
          </span>
        )
        .max(
          10,
          <span style={{ color: "red" }}>
            Please enter only 10 digit valid number
          </span>
        )
        .min(
          10,
          <span style={{ color: "red" }}>Number is less than 10 digits</span>
        ),
      gender: Yup.string().required(
        <span style={{ color: "red" }}>Please Select Gender</span>
      ),
      district: Yup.string().required(
        <span style={{ color: "red" }}>Please Select District</span>
      ),
      title: Yup.string().required(
        <span style={{ color: "red" }}>Please Select Title</span>
      ),
    }),

    onSubmit: async (values) => {
      if (values.otp.length < 5) {
        setErrorMsg(true);
      } else {
        var pass = values.email.trim();
        var myArray = pass.split("@");
        let newPassword = myArray[0];
        if (values.password !== newPassword) {
          setFieldValue("password", newPassword);
        }
        const key = CryptoJS.enc.Hex.parse("253D3FB468A0E24677C28A624BE0F939");
        const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        const encrypted = CryptoJS.AES.encrypt(newPassword, key, {
          iv: iv,
          padding: CryptoJS.pad.NoPadding,
        }).toString();
        const body = JSON.stringify({
          full_name: values.full_name.trim(),
          organization_code: values.organization_code.trim(),
          mobile: values.mobile.trim(),
          whatapp_mobile: values.whatapp_mobile.trim(),
          username: values.email.trim(),
          qualification: values.qualification.trim(),
          role: values.role.trim(),
          gender: values.gender,
          title: values.title,
          reg_status: values.reg_status,
          district: values.district,
          password: encrypted,
        });
        setMentorData(body);
        localStorage.setItem("mentorData", body);
        var config = {
          method: "post",
          url: process.env.REACT_APP_API_BASE_URL + "/mentors/register",
          headers: {
            "Content-Type": "application/json",
            Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
          },

          data: body,
        };
        await axios(config)
          .then((mentorRegRes) => {
            if (mentorRegRes?.data?.status == 201) {
              apiCall();
              navigate("/atl-success");
            }
          })
          .catch((err) => {
            openNotificationWithIcon("error", err.response.data?.message);
            // setBtn(false);
            formik.setErrors({
              check: err.response && err?.response?.data?.message,
            });
            return err.response;
          });
      }
    },
  });

  const handleCheckbox = (e, click) => {
    if (click) {
      setCheckBox(click);
      formik.setFieldValue("whatapp_mobile", formik.values.mobile);
      setWtsNum(formik.values.mobile);
    } else {
      setCheckBox(click);
      formik.setFieldValue("whatapp_mobile", "");
    }
  };
  useEffect(() => {
    setCheckBox(false);
    formik.setFieldValue("whatapp_mobile", "");
  }, [formik.values.mobile.length == 0]);
  const handleEmailChange = (e) => {
    formik.handleChange(e);
    const emailValue = e.target.value;
    const emailParts = emailValue.split("@");
    const newPassword = emailParts[0] || "";

    if (formik.values.password !== newPassword) {
      formik.setFieldValue("password", newPassword);
    }
  };
  const handleSendOtp = async (e) => {
    formik.setFieldValue("mobile", formik.values.mobile);
    setTimer(60);

    setOtpSent(true);
    setChange("Resend OTP");
    setDisable(false);
    setAreInputsDisabled(true);

    const body = JSON.stringify({
      username: formik.values.email,
      mobile: formik.values.mobile,
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/mentors/emailOtp",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response.status === 202) {
          const UNhashedPassword = decryptGlobal(response?.data?.data);
          console.log(UNhashedPassword, "111111111111111111111111111");
          setOtpRes(JSON.parse(UNhashedPassword));
          // openNotificationWithIcon("success", "Otp send to Email Id");
          setBtnOtp(true);
          setPerson(false);
          setTimeout(() => {
            setOtpSent("Resend OTP");
            setDisable(true);
            setHoldKey(false);
            setTimer(0);
          }, 60000);
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.status === 406) {
          setDisable(true);
          setAreInputsDisabled(false);
          setTimer(0);
          openNotificationWithIcon("error", "Email ID already exists");
          // setTimeout(() => {
          //   setDisable(true);
          //   setHoldKey(false);
          //   setTimer(0);
          // }, 1000);
        }
      });
    e.preventDefault();
  };
  const handleOtpChange = (e) => {
    formik.setFieldValue("otp", e);
    setErrorMsg(false);
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0 && otpSent) {
      setAreInputsDisabled(false);
      setOtpSent(false);
    }
  }, [timer, otpSent]);
  useEffect(() => {
    if (
      formik.values.title.length > 0 &&
      formik.values.full_name.length > 0 &&
      formik.values.gender.length > 0 &&
      formik.values.mobile.length > 0 &&
      formik.values.email.length > 0 &&
      formik.values.whatapp_mobile.length > 0 &&
      formik.values.district.length > 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    formik.values.title,
    formik.values.full_name,
    formik.values.gender,
    formik.values.username,
    formik.values.email,
    formik.values.district,
    formik.values.whatapp_mobile,
  ]);
  // const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper register-wrap bg-img">
          <div className="login-content">
            <form action="signin" onSubmit={formik.handleSubmit}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  {/* <ImageWithBasePath src="assets/img/logo.png" alt="img" /> */}
                  <img src={logo} alt="Logo" />
                </div>
                {/* <Link className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link> */}
                {person && (
                  <div className="login-userheading ">
                    <h3 className="icon-container ">
                      {" "}
                      School Teacher Registration{" "}
                      <a
                        href="https://www.youtube.com/watch?v=CiYa_iLdpXo" // Replace with the desired URL
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleIconClick}
                      >
                        <img
                          src={play}
                          className="icon"
                          alt="play"
                          style={{ verticalAlign: "middle", width: "7%" }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        />{" "}
                      </a>
                      {isTooltipVisible && (
                        <div className="tooltip">Watch Demo</div>
                      )}
                      {isModalVisible && (
                        <div
                          className="modal-overlay"
                          onClick={handleCloseModal}
                        >
                          <div
                            className="modal"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span
                              className="close-button"
                              onClick={handleCloseModal}
                            >
                              &times;
                            </span>
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/watch?v=CiYa_iLdpXo" // Replace with the desired video URL
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="YouTube video"
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </h3>
                    <h4>Register New Teacher account</h4>
                  </div>
                )}

                {diceBtn && (
                  <div className="form-login mb-3">
                    <label className="form-label">School UDISE Code</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="organization_code"
                        onChange={(e) => handleOnChange(e)}
                        value={diesCode}
                        maxLength={11}
                        minLength={11}
                        name="organization_code"
                        placeholder="Enter 11 digit UDISE Code"
                      />
                      <img src={user} alt="user" />
                    </div>

                    {error ? (
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        {error}
                      </p>
                    ) : null}

                    <div className="form-login authentication-check">
                      <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                          <div className="custom-control custom-checkbox">
                            <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="click"
                                disabled={
                                  9999999999 <
                                  formik.values.diesCode <
                                  99999999999
                                    ? false
                                    : true
                                }
                                checked={checkBox1}
                                onClick={(e) => handleCheckbox1(e, !checkBox1)}
                              />
                              <span className="checkmarks" />I agree to the
                              Terms & Privacy
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {diceBtn && (
                      <div className="form-login">
                        <button
                          type="button"
                          className="btn btn-login mb-3"
                          onClick={(e) => handleRegister(e)}
                          disabled={!isButtonEnabled}
                        >
                          {" "}
                          Proceed
                          <span> {/* <ArrowRight /> */}</span>
                        </button>
                        <p className="form-login mb-3">
                          Already have an account ?
                          <b>
                            <Link className="hover-a" to={"/login"}>
                              {"  "} Sign In
                            </Link>
                          </b>
                        </p>
                      </div>
                    )}

                    <br />
                    <p className="text-center">
                      Copyright{" "}
                      <img
                        src={copy}
                        className="copy"
                        alt="copy"
                        style={{ verticalAlign: "middle", width: "5%" }}
                      />{" "}
                      SIM 2024. All rights reserved
                    </p>
                  </div>
                )}
                {schoolBtn && (
                  <div className="col-xl-12">
                    {person && (
                      <div className="card">
                        <div className="card-body">
                          <div className="card-subtitle fw-semibold">
                            School Name : {""}
                            {orgData?.organization_name}
                            <br />
                            {/* City Name : {""}
                            {orgData?.city ? orgData?.city : " N/A"} <br /> */}
                            {/* District Name :{" "} */}
                            {/* {orgData?.district ? orgData?.district : " N/A"} */}
                            State Name :{" "}
                            {orgData?.state ? orgData?.state : " N/A"} <br />
                            PinCode :{" "}
                            {orgData?.pin_code
                              ? orgData?.pin_code
                              : " N/A"}{" "}
                            <br />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="card">
                      <div className="card-body">
                        <div className="row g-3 mt-0">
                          {/* {person && ( */}
                          <>
                            <div className="col-md-3">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Title
                              </label>
                              <select
                                id="inputState"
                                className="form-select"
                                // disabled={holdKey ? true : false}
                                disabled={areInputsDisabled}
                                name="title"
                                value={formik.values.title}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="">Title</option>
                                <option value="Dr">Dr</option>
                                <option value="Mr">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Mrs">Mrss</option>
                              </select>
                              {formik.touched.title && formik.errors.title ? (
                                <small className="error-cls">
                                  {formik.errors.title}
                                </small>
                              ) : null}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Full Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                id="full_name"
                                disabled={areInputsDisabled}
                                name="full_name"
                                // onChange={formik.handleChange}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const lettersOnly = inputValue.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                  );
                                  formik.setFieldValue(
                                    "full_name",
                                    lettersOnly
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.full_name}
                              />
                              {formik.touched.full_name &&
                              formik.errors.full_name ? (
                                <small className="error-cls">
                                  {formik.errors.full_name}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Gender
                              </label>
                              <select
                                id="inputState"
                                className="form-select"
                                disabled={areInputsDisabled}
                                name="gender"
                                value={formik.values.gender}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              {formik.touched.gender && formik.errors.gender ? (
                                <small className="error-cls">
                                  {formik.errors.gender}
                                </small>
                              ) : null}
                            </div>
                            {!dropdownbtn ? (
                              <div
                                // className="col-md-4"
                                className={`col-md-${design ? 4 : 0}`}
                              >
                                <label
                                  htmlFor="inputState"
                                  className="form-label"
                                >
                                  District
                                </label>
                                <select
                                  id="inputState"
                                  className="form-select"
                                  disabled={areInputsDisabled}
                                  name="district"
                                  value={formik.values.district}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                >
                                  <option value={""}>District</option>
                                  {districtData.map((item) => (
                                    <option key={item} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                                {formik.touched.district &&
                                formik.errors.district ? (
                                  <small className="error-cls">
                                    {formik.errors.district}
                                  </small>
                                ) : null}
                              </div>
                            ) : (
                              ""
                            )}
                            <div
                              // className="col-md-5"
                              className={`col-md-${design ? 5 : 6}`}
                            >
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="email"
                                onChange={handleEmailChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <small className="error-cls">
                                  {formik.errors.email}
                                </small>
                              ) : null}
                            </div>
                            <div
                              // className="col-md-3"
                              className={`col-md-${design ? 3 : 6}`}
                            >
                              <label
                                htmlFor="inputPassword4"
                                className="form-label"
                              >
                                Password
                              </label>
                              <input
                                type="text"
                                isDisabled={true}
                                name="password"
                                id="password"
                                defaultValue="readonly"
                                readOnly="readonly"
                                className="form-control"
                                value={formik.values.password}
                              />
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <small className="error-cls">
                                  {formik.errors.password}
                                </small>
                              ) : null}
                            </div>

                            <div
                              className="col-md-6"
                              style={{ marginTop: "2.5rem" }}
                            >
                              <label className="form-label">
                                Mobile Number
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="mobile"
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /\D/g,
                                    ""
                                  );
                                  formik.setFieldValue("mobile", numericValue);
                                }}
                                maxLength={10}
                                minLength={10}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                              />

                              {formik.touched.mobile && formik.errors.mobile ? (
                                <small className="error-cls">
                                  {formik.errors.mobile}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <span> Same </span>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="click"
                                    disabled={
                                      (formik.values.mobile.length > 0
                                        ? false
                                        : true) || areInputsDisabled
                                    }
                                    id="click"
                                    checked={checkBox}
                                    onClick={(e) =>
                                      handleCheckbox(e, !checkBox)
                                    }
                                  />
                                </div>
                              </div>
                              <label className="form-label">
                                WhatsApp Number
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="whatapp_mobile"
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /\D/g,
                                    ""
                                  );
                                  formik.setFieldValue(
                                    "whatapp_mobile",
                                    numericValue
                                  );
                                }}
                                maxLength={10}
                                minLength={10}
                                onBlur={formik.handleBlur}
                                value={formik.values.whatapp_mobile}
                              />

                              {formik.touched.whatapp_mobile &&
                              formik.errors.whatapp_mobile ? (
                                <small className="error-cls">
                                  {formik.errors.whatapp_mobile}
                                </small>
                              ) : null}
                            </div>
                          </>
                          {/* )} */}
                          {/* {person && ( */}
                          <div className="col-md-12">
                            <button
                              type="button"
                              className="btn btn-warning m-2"
                              onClick={(e) => handleSendOtp(e)}
                              disabled={
                                !formik.isValid || !formik.dirty || otpSent
                              }
                            >
                              {otpSent ? `Resend OTP (${timer})` : change}
                            </button>
                          </div>
                          {/* )} */}
                          {btnOtp && (
                            <>
                              <div className="Otp-expire text-center">
                                <p>
                                  {timer > 0
                                    ? `Access Resend OTP  00:${
                                        timer < 10 ? `0${timer}` : timer
                                      } seconds`
                                    : "Resend OTP enabled"}
                                  {/* {timer > 0
                                    ? `Otp will expire in 00:${
                                        timer < 10 ? `0${timer}` : timer
                                      } seconds`
                                    : "Otp expired"} */}
                                </p>
                              </div>

                              <div className="login-content user-login">
                                <div className="login-logo">
                                  {/* <ImageWithBasePath
                                    src="assets/img/logo.png"
                                    alt="img"
                                  /> */}
                                  {/* <Link className="login-logo logo-white">
                                    <ImageWithBasePath
                                      src="assets/img/logo-white.png"
                                      alt
                                    />
                                  </Link> */}
                                </div>
                                <div className="login-userset">
                                  <div className="login-userheading">
                                    <h3>Login With Your Email Address</h3>
                                    <h4 className="verfy-mail-content">
                                      We sent a verification code to your email.
                                      Enter the code from the email in the field
                                      below
                                    </h4>
                                  </div>

                                  <div className="wallet-add">
                                    <div className="otp-box">
                                      <div className="forms-block text-center">
                                        <OtpInput
                                          numInputs={6}
                                          isDisabled={false}
                                          errorStyle="error"
                                          onChange={handleOtpChange}
                                          separator={<span>{"-"}</span>}
                                          isInputNum={true}
                                          isInputSecure={false}
                                          shouldAutoFocus
                                          value={formik.values.otp}
                                          placeholder={""}
                                          inputStyle={{
                                            border: "1px solid",
                                            borderRadius: "8px",
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            fontSize: "2rem",
                                            color: "#000",
                                            fontWeight: "400",
                                            caretColor: "blue",
                                          }}
                                          focusStyle={{
                                            border: "1px solid #CFD3DB",
                                            outline: "none",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {formik.values.otp.length > 5 &&
                            otpRes != formik.values.otp && (
                              <div className="form-row row mb-5 text-center">
                                <span
                                  className=" w-100 mt-3 d-flex justify-content-center"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Invalid OTP
                                </span>
                              </div>
                            )}
                          {btnOtp && (
                            <div className="form-login mt-4">
                              <button
                                className="btn btn-login"
                                type="submit"
                                disabled={
                                  !(
                                    formik.values.otp.length === 6 &&
                                    formik.values.otp === otpRes
                                  )
                                }
                              >
                                Verify My Account
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
