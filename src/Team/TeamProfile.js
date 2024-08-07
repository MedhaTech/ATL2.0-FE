/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
// import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../helpers/Utils";
import edit from "../assets/img/icons/edit-set.svg";
// import customer from "../assets/img/customer/customer5.jpg";
import { useNavigate } from "react-router-dom";
import female from "../assets/img/Female_Profile.png";
import male from "../assets/img/Male_Profile.png";
import team from "../assets/img/icons/team2.png";
import team1 from "../assets/img/icons/team.svg";

const TeacherProfile = () => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/mentoreditprofile", {
      state: {
        full_name: currentUser?.data[0]?.full_name,
        mentor_id: currentUser?.data[0]?.mentor_id,
        // mobile: teacher?.mobile,
        username: currentUser?.data[0]?.name,
        title: currentUser?.data[0]?.title,
        // gender: teacher?.gender,
        // whatapp_mobile: teacher?.whatapp_mobile
      },
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>My Profile</h4>
            {/* <h6>User Profile</h6> */}
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="profile-set">
              <div className="profile-head"></div>
              <div className="profile-top">
                <div className="profile-content">
                  <div className="profile-contentimg">
                    {/* <ImageWithBasePath
                      src="assets/img/customer/customer5.jpg"
                      alt="img"
                      id="blah"
                    /> */}
                    {/* <img src={customer} alt="Customer" id="blah" /> */}
                    {/* {currentUser?.data[0]?.gender === "Male" ? (
                      <img src={male} alt="Male" id="blah" />
                    ) : (
                      <img src={female} alt="Female" id="blah" />
                    )} */}
                    {currentUser?.data[0]?.role === "TEAM" ? (
                      <img src={team1} alt="Team" id="blah" style={{background:"white"}}/>
                    ) : currentUser?.data[0]?.role === "STUDENT" &&
                      currentUser?.data[0]?.Gender === "MALE" ? (
                      <img src={male} alt="Male" id="blah" />
                    ) : (
                      <img src={female} alt="Female" id="blah" />
                    )}

                    <div className="profileupload">
                      {/* <input type="file" id="imgInp" /> */}
                      {/* <Link 
                      onClick={handleEdit()}
                      >
                        <img src={edit} alt="Edit" />
                      </Link> */}
                    </div>
                  </div>
                  <div className="profile-contentname">
                    <h2>{currentUser?.data[0]?.team_name}</h2>
                    {/* <h4>Update Personal Details.</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Team Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.team_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Team Username</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.name}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Team Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.team_email}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">School Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.data[0]?.organization_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Guide Teacher</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.Teacher_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.state}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.district}
                    readOnly="readonly"
                  />
                </div>
              </div>
              {/* <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="pass-input form-control"
                    />
                    <span
                      className={`fas toggle-password ${
                        isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12">
                <Link to={"/teacher-dashboard"} className="btn btn-submit me-2">
                  Submit
                </Link>
                <Link className="btn btn-cancel" to={"/teacher-dashboard"}>
                  Cancel
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default TeacherProfile;
