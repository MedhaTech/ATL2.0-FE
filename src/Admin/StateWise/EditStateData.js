/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from "react";
// import Layout from '../Layout';
import { Row, Col, FormGroup, Label, Form, Input } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../stories/Button";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import { useTranslation } from "react-i18next";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { useNavigate } from "react-router-dom";
import { stateList } from "../../RegPage/ORGData";

const EditStateData = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const newsID = JSON.parse(localStorage.getItem("resID"));
//   console.log(newsID);
  const currentUser = getCurrentUser("current_user");
  // const history = useHistory();
  const inputDICE = {
    type: "text",
    className: "defaultInput",
  };

  const formik = useFormik({
    initialValues: {
      role: newsID && newsID.role,
      mentor_note: newsID && newsID.mentor_note,

      student_note: newsID && newsID.student_note,

      whatapp_link: newsID && newsID.whatapp_link,
      state: newsID && newsID.state,

      //   new_status: newsID && newsID.new_status,
    },
    validationSchema: Yup.object({
      //   role: Yup.string()
      //     .optional()
      //     .oneOf(["mentor", "student"], "Role is Required"),
      //   state: Yup.string().required("Please Select State"),

      mentor_note: Yup.string()
        // .optional()
        .required("Mentor details is Required"),
      whatapp_link: Yup.string()
        // .optional()
        .required("Whatsapp Link is Required"),

      student_note: Yup.string()
        // .optional()
        .required("Student details is Required"),

      //   new_status: Yup.string()
      //     .optional()
      //     .oneOf(["0", "1"], "New Status type is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const body = {
          status: "ACTIVE",
          role: values.role,
          student_note: values.student_note,
          mentor_note: values.mentor_note,

          //   new_status: values.new_status,
        };

        if (values.whatapp_link !== "" && values.whatapp_link !== null) {
          body["whatapp_link"] = values.whatapp_link;
        }
        const newsId = encryptGlobal(
          JSON.stringify(newsID.state_coordinators_id)
        );
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/state_coordinators/${newsId}`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response, "edit");
          navigate("/state-wise");
          openNotificationWithIcon(
            "success",
            "State Status Updated Successfully"
          );
        } else {
          openNotificationWithIcon("error", "Opps! Something Wrong");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    marginRight: "10px",
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <Col className="col-xl-10 offset-xl-1 offset-md-0">
              <h3 className="mb-5">Edit State Specific Details</h3>

              <div>
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                  <div className="create-ticket register-block">
                    {/* <FormGroup className="form-group" md={12}> */}

                    <Row className="mb-3 modal-body-table search-modal-header">
                      <Label className="mb-2" htmlFor="details">
                        Teacher Instructions
                      </Label>
                      <Input
                        type="text"
                        {...inputDICE}
                        id="mentor_note"
                        name="mentor_note"
                        placeholder="Please enter mentor instructions"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mentor_note}
                      />
                      {formik.touched.mentor_note &&
                        formik.errors.mentor_note && (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.mentor_note}
                          </small>
                        )}
                    </Row>
                    <Row className="mb-3 modal-body-table search-modal-header">
                      <Label className="mb-2" htmlFor="details">
                        Student Instructions
                      </Label>
                      <Input
                        type="text"
                        {...inputDICE}
                        id="student_note"
                        name="student_note"
                        placeholder="Please enter student instructions"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.student_note}
                      />
                      {formik.touched.student_note &&
                        formik.errors.student_note && (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.student_note}
                          </small>
                        )}
                    </Row>
                    <Row className="mb-3 modal-body-table search-modal-header">
                      <Col md={8}>
                        <Label className="mb-2" htmlFor="url">
                          Whatsapp Link
                        </Label>
                        <Input
                          type="text"
                          name="whatapp_link"
                          id="whatapp_link"
                          placeholder="Please enter the Whatsapp Link"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.whatapp_link}
                        />
                        {formik.touched.whatapp_link && formik.errors.whatapp_link && (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.whatapp_link}
                          </small>
                        )}
                      </Col>
                    </Row>
                    {/* </FormGroup> */}
                  </div>

                  {/* <hr className="mt-4 mb-4" /> */}
                  <Row>
                    <div style={buttonContainerStyle}>
                      <button
                        className="btn btn-warning"
                        type="submit"
                        style={buttonStyle}
                      >
                        Submit details
                      </button>
                      <button
                        type="cancel"
                        onClick={() => navigate("/state-wise")}
                        className="btn btn-secondary"
                      >
                        Discard
                      </button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default EditStateData;