/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Button } from "../../stories/Button";
// import { TextArea } from '../../../stories/TextArea/TextArea';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import Layout from '../../Layout';
import { useSelector } from "react-redux";
import {
  getStudentChallengeQuestions,
  getStudentChallengeSubmittedResponse,
  updateStudentBadges,
} from "../../redux/studentRegistration/actions";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../helpers/Utils";
import {
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import axios from "axios";
import { KEY, URL } from "../../constants/defaultValues";
import CommonPage from "../../components/CommonPage";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import logout from "../../assets/img/logout.svg";
// import { cardData, subCategoryData } from './SDGData';
import moment from "moment";
import { getLanguage } from "../../constants/languageOptions";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { themes, themesList, focusareasList } from "./themesData";
import { use } from "i18next";
import { initiateIdea } from "../../redux/studentRegistration/actions";
const LinkComponent = ({ original, item, url, removeFileHandler, i }) => {
  let a_link;
  let count;
  if (url) {
    a_link = item.split("/");
    count = a_link.length - 1;
  }
  return (
    <>
      {original ? (
        <div className="badge mb-2 bg-info ms-3">
          <span className="p-2">{item.name}</span>
          {original && (
            <span className="pointer" onClick={() => removeFileHandler(i)}>
              <AiOutlineCloseCircle size={20} />
            </span>
          )}
        </div>
      ) : (
        <a
          className="badge mb-2 bg-info p-3 ms-3"
          href={item}
          target="_blank"
          rel="noreferrer"
        >
          {a_link[count]}
        </a>
      )}
    </>
  );
};
const IdeasPageNew = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const initialSizeData = {
    data: formData,
  };
  // console.log(initialSizeData,"111");
  // dispatch(
  //     initiateIdea(
  //         currentUser?.data[0]?.team_id,
  //         language,
  //         initialSizeData,
  //         // setShowChallenges,
  //         t
  //     )
  // );
  const showPage = false;
  //    console.log(props.theme,"11");
  const [isDisabled, setIsDisabled] = useState(false);
  const currentUser = getCurrentUser("current_user");

  const TeamId = currentUser?.data[0]?.team_id;

  const [currentSection, setCurrentSection] = useState(1);
  const goToNext = () => setCurrentSection(currentSection + 1);
  const goToBack = () => setCurrentSection(currentSection - 1);
  const [theme, setTheme] = useState(props?.theme);
  const [focusarea, setFocusArea] = useState(formData?.focusarea);
  const [files, setFiles] = useState([]);

  const [title, setTitle] = useState(formData?.title);
  // console.log(formData?.title,"tt");
  const initiatedBy =
 
  formData?.initiated_by;
  const [problemStatement, setProblemStatement] = useState(
    formData?.problemStatement
  );
  const [causes, setCauses] = useState(formData?.causes);
  const [effects, setEffects] = useState(formData?.effects);
  const [community, setCommunity] = useState(formData?.community);
  const [facing, setFacing] = useState(formData?.facing);
  const [Solution, setSolution] = useState(formData?.Solution);
  const [stakeholders, setStakeholders] = useState(formData?.stakeholders);
  const [problemSolving, setProblemSolving] = useState(
    formData?.problemSolving || []
  );
  const [feedback, setFeedback] = useState(formData?.feedback);
  const [prototypeImage, setPrototypeImage] = useState(
    formData?.prototypeImage ? formData?.prototypeImage.split(",") : []
  );
  const [prototypeLink, setPrototypeLink] = useState(formData?.prototypeLink);
  const [workbook, setWorkbook] = useState(formData?.workbook);
  const people = ["None", "2-4 people", "5+ people", "10+ people"];
  const submit = ["Yes", "No"];
  const journey = [
    "We did the full problem solving journey by ourselves.",
    "We got feedback on our problem and modified it",
    "We got feedback on our idea and modified it",
    "We got feedback on our prototype and modified it",
  ];
  const place = [
    "School",
    "Home",
    "Other places in the surroundings(Market/Park/Playground etc.)",
    "Others (Read in newspapers,saw on the internet etc.)",
  ];
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const dispatch = useDispatch();

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    setFocusArea("");
  };
// console.log(focusarea,"ff");
  useEffect(() => {
    if (theme && focusareasList[theme]) {
      setFocusArea(focusareasList[theme]);
    } else {
      setFocusArea(""); // Reset if no theme is selected
    }
  }, [theme]);
  useEffect(() => {
    setFocusArea(formData?.focus_area);
    setTitle(formData?.title);
    setProblemStatement(formData?.problem_statement);
    setCauses(formData?.causes);
    setEffects(formData?.effects);
    setCommunity(formData?.community);
    setFacing(formData?.facing);
    setSolution(formData?.solution);
    setStakeholders(formData?.stakeholders);
    setProblemSolving(formData?.problem_solving);
    setFeedback(formData?.feedback);
    setPrototypeImage(formData?.prototype_image);
    setPrototypeLink(formData?.prototype_link? formData?.prototype_link.split(","):[]);
    setWorkbook(formData?.workbook);
  }, [formData]);
  const handleCheckboxChange = (item) => {
    // Check if the item is already selected
    if (problemSolving.includes(item)) {
      // If selected, remove it from the array
      setProblemSolving(problemSolving.filter((i) => i !== item));
    } else {
      // If not selected, add it to the array
      setProblemSolving([...problemSolving, item]);
    }
  };
  const [immediateLink, setImmediateLink] = useState(null);
  const handleUploadFiles = (addedFiles) => {
    const upload = [...files];

    addedFiles.some((item) => {
      if (upload.findIndex((i) => i.name === item.name) === -1)
        upload.push(item);
    });
    setFiles(upload);
    setImmediateLink(null);
  };
  const removeFileHandler = (i) => {
    const fileAdded = [...files];
    fileAdded.splice(i, 1);
    setFiles(fileAdded);
  };
  let maxFileSize = 10000000;
  const fileHandler = (e) => {
    let choosenFiles = Array.prototype.slice.call(e.target.files);
    e.target.files = null;
    let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
    const checkPat = choosenFiles.filter((item) => {
      let pat = item.name.split(".");
      pat.pop();
      return pat.join().search(pattern);
    });
    if (checkPat.length > 0) {
      openNotificationWithIcon(
        "error",
        "Only alphanumeric and '_' are allowed "
      );
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (
      choosenFiles.filter((item) => allowedTypes.includes(item.type) === false)
        .length > 0
    ) {
      openNotificationWithIcon("error", t("Choose .png/.jpg/.jpeg/.pdf Only"));
      return;
    }
    if (choosenFiles.filter((item) => item.size > maxFileSize).length > 0) {
      openNotificationWithIcon("error", t("student.less_10MB"));
      return;
    }
    handleUploadFiles(choosenFiles);
  };

  

  useEffect(() => {
    submittedApi();
  }, []);
  const submittedApi = () => {
    const Param = encryptGlobal(
      JSON.stringify({
        team_id: TeamId,
      })
    );
    var configidea = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetails?Data=${Param}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(configidea)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response, "11");
          if (response.data.data && response.data.data.length > 0) {
            const data = response.data.data[0]; // Store the data in state
            setFormData(data);
          } else {
            console.log("No data found");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const handle =()=>{
  //   console.log(submit,"hhhh");

  // };
  const handleSubmit = async (item, stats) => {
    // alert("hii");
    // e.preventDefault();
    if (files.length > 0) {
      console.log(files,"ff");
      const formeData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let fieldName = 'file' + i ? i : '';

        formeData.append(fieldName, files[i]);
      }
      // for (let pair of formeData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);  // Logs the key-value pairs in FormData
      // }
      console.log(formeData,"11");
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const subId = encryptGlobal(
        JSON.stringify({ team_id: currentUser?.data[0]?.team_id })
      );
      const result = await axios
        .post(`${URL.uploadFile}?Data=${subId}`, formeData, axiosConfig)
        .then((res) => res)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        setImmediateLink(result.data?.data[0]?.attachments);
        setPrototypeImage(result.data?.data[0]?.attachments);

        handleSubmitAll(item, stats, result.data?.data[0]?.attachments);
      } else {
        openNotificationWithIcon("error", `${result?.data?.message}`);
        return;
      }
    } 
    else {
      handleSubmitAll(item, stats);
      // console.log()
    }
  };
  const handleSubmitAll = async (item, stats, file) => {
    let attachmentsList = "";
    if (file) {
      attachmentsList = file.join(", ");
    }
    const body = {
      team_id: TeamId,
      theme: theme,
      focus_area: focusarea,
      title: title,
      problem_statement: problemStatement,
      causes: causes,
      effects: effects,
      community: community,
      facing: facing,
      Solution: Solution,
      stakeholders: stakeholders,
      problem_solving: problemSolving,
      feedback: feedback,
      prototype_link: prototypeLink,
      workbook: workbook,
    };
    if (attachmentsList !== "") {
      body["Prototype_image"] = attachmentsList;
    }
    var allques = true;
    if (stats === "SUBMITTED") {
      if (
     theme === "" ||
        focusarea === "" ||
        problemStatement === "" ||
        title === "" ||
        causes=== "" ||
        effects === "" ||
        community === "" ||
        facing === "" ||
        Solution === "" ||
        stakeholders === "" ||
      problemSolving === "" ||
      feedback === "" ||
      prototypeLink === "" ||
      workbook === "" 
      ) {
        allques = false;
      }
      if (
      
        attachmentsList.length === 0 &&
        prototypeImage.length === 0
    ) {
        allques = false;
    }

    
    }
    if (allques || stats === "DRAFT") {
      var config = {
        method: "put",
        url: `${process.env.REACT_APP_API_BASE_URL + "/ideas/ideaUpdate"}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: JSON.stringify(body),
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            // localStorage.setItem("condition", true);
            if (stats === "SUBMITTED") {
              openNotificationWithIcon("success", "Idea submission successful");
            } else {
              openNotificationWithIcon("success", "Save as Draft success");
              setIsDisabled(true);
              scroll();
            }
          }
        })
        .catch(function (error) {
          openNotificationWithIcon(
              'error',
              error?.response?.data?.message
          );
          console.log(error);
        });
    } else {
      openNotificationWithIcon("error", "Please fill all the questions");
    }
  };
  const scroll = () => {
    const section = document.querySelector("#start");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleEdit = () => {
    setIsDisabled(false);
    scroll();
  };
  const comingSoonText = t("dummytext.student_idea_sub");
  // const acceptedParamfileTypes =
  //     'Accepting only png,jpg,jpeg,pdf,mp4,doc,docx Only, file size should be below 10MB';
  const saveBtn = theme && focusarea && title && problemStatement;
  return (
    <div>
      {/* <div className='content'> */}
      {showPage ? (
        <CommonPage text={comingSoonText} />
      ) : (
        <Container className="presuervey mt-1" id="start">
          {/* <h2>{t('student_course.idea_submission')}</h2> */}
          <Col>
            <Row className=" justify-content-center">
              <div className="aside">
                <CardBody>
                  <Form className="form-row row" isSubmitting>
                  {initiatedBy &&
                                                initiatedBy ===
                                                    currentUser?.data[0]
                                                        ?.user_id &&
                                                formData
                                                    ?.status === 'DRAFT' && (
                                                    <div className="text-right">
                                                        {isDisabled ? (
                                                            <>
                                                                <Button
                                                                    type="button"
                                                                    btnClass="me-3 text-white"
                                                                    backgroundColor="#067DE1"
                                                                    onClick={
                                                                        handleEdit
                                                                    }
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.edit_idea'
                                                                    )}
                                                                />
                                                                <Button
                                                    type="button"
                                                    btnClass="primary"
                                                    onClick={(e) =>
                                                        handleSubmit(
                                                            e,
                                                            'SUBMITTED'
                                                        )
                                                    }
                                                    size="small"
                                                    label={t(
                                                        'teacher_teams.submit'
                                                    )}
                                                />
                                                            </>
                                                        ) : (
                                                            <div className="d-flex justify-content-between">
                                                                {/* <Button
                                                                    type="button"
                                                                    btnClass="secondary me-3"
                                                                    onClick={
                                                                        redirect
                                                                    }
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.discard'
                                                                    )}
                                                                /> */}
                                                                {/* <h3>
                                                                    {
                                                                        screenTitle
                                                                    }
                                                                </h3> */}

                                                                <div>
                                                                    {/* <Button
                                                                        type="button"
                                                                        btnClass="me-3 text-white"
                                                                        backgroundColor="#067DE1"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleSubmit(
                                                                                e,
                                                                                'DRAFT'
                                                                            )
                                                                        }
                                                                        size="small"
                                                                        label={`${
                                                                            loading.draft
                                                                                ? t(
                                                                                      'teacher_teams.loading'
                                                                                  )
                                                                                : t(
                                                                                      'teacher_teams.draft'
                                                                                  )
                                                                        }`}
                                                                    /> */}
                                                                    {/* <Button
                                                                        type="button"
                                                                        btnClass="primary"
                                                                        disabled={
                                                                            answerResponses &&
                                                                            answerResponses.length ===
                                                                                0
                                                                        }
                                                                        onClick={
                                                                            swalWrapper
                                                                        }
                                                                        size="small"
                                                                        label={`${
                                                                            loading.submit
                                                                                ? t(
                                                                                      'teacher_teams.loading'
                                                                                  )
                                                                                : t(
                                                                                      'teacher_teams.submit'
                                                                                  )
                                                                        }`}
                                                                    /> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                    {currentSection === 1 && (
                      <Row className="mb-2">
                        <b>Section 1: {t("ideaform_questions.section1")}</b>
                        <Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.themeq")}
                              </b>
                            </div>

                            <div className=" answers row flex-column p-4">
                              <select
                                onChange={handleThemeChange}
                                name="theme"
                                id="theme"
                              >
                                <option value={""}>
                                  Please select the Theme
                                </option>
                                {themesList.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item}
                                    selected={item === theme}
                                  >
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.focusareaq")}
                              </b>
                            </div>
                            {theme === "Others" ? (
                              <div className=" answers row flex-column">
                                <textarea
                                  disabled={isDisabled}
                                  placeholder="Enter the Focus Area"
                                  value={focusarea}
                                  maxLength={100}
                                  onChange={(e) => setFocusArea(e.target.value)}
                                />
                                <div className="text-end">
                                  {t("student_course.chars")} :
                                  {100 - (focusarea ? focusarea.length : 0)}
                                </div>
                              </div>
                            ) : (
                              <div className=" answers row flex-column p-4">
                                <select
                                  onChange={(e) => setFocusArea(e.target.value)}
                                  name="focusarea"
                                  id="focusarea"
                                >
                                  <option value={""}>
                                    Please select the Focus Area
                                  </option>
                                  {focusareasList[theme]?.map((item, i) => (
                                    <option
                                      key={i}
                                      value={item}
                                      selected={item === focusarea}
                                    >
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.ideatitleq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter Idea Title"
                                value={title}
                                maxLength={50}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 - (title ? title.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.problemstatementq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter Problem Statement"
                                value={problemStatement}
                                maxLength={100}
                                onChange={(e) =>
                                  setProblemStatement(e.target.value)
                                }
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 -
                                  (problemStatement
                                    ? problemStatement.length
                                    : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.causesq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter List of Causes"
                                value={causes}
                                maxLength={100}
                                onChange={(e) => setCauses(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 - (causes ? causes.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.effectsq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter List of Effects of the problem"
                                value={effects}
                                maxLength={100}
                                onChange={(e) => setEffects(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 - (causes ? causes.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.communityq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <div>
                                {place.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        value={item}
                                        disabled={isDisabled}
                                        checked={item === community}
                                        onChange={(e) =>
                                          setCommunity(e.target.value)
                                        }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.facingq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter List of Effects of the problem"
                                value={facing}
                                maxLength={100}
                                onChange={(e) => setFacing(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 - (facing ? facing.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <Col className="d-flex justify-content-end">
                              <button
                                className="btn btn-secondary"
                                onClick={goToNext}
                              >
                                Next
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </Row>
                    )}
                    {currentSection === 2 && (
                      <Row className="mb-2">
                        <b>Section 2: {t("ideaform_questions.section2")}</b>
                        <Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.solutiondetailsq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter the solution to the problem"
                                value={Solution}
                                maxLength={500}
                                onChange={(e) => setSolution(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (Solution ? Solution.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.stakeholdersq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <div>
                                {people.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        value={item}
                                        disabled={isDisabled}
                                        checked={item === stakeholders}
                                        onChange={(e) =>
                                          setStakeholders(e.target.value)
                                        }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.probsoljourneyq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <div>
                                {journey.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        value={item}
                                        checked={problemSolving.includes(item)}
                                        disabled={isDisabled}
                                        // checked={
                                        //     item ===
                                        //     problemSolving
                                        // }
                                        onChange={() =>
                                          handleCheckboxChange(item)
                                        }
                                        // onChange={(
                                        //     e
                                        // ) =>
                                        //     setProblemSolving(
                                        //         e
                                        //             .target
                                        //             .value
                                        //     )
                                        // }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))}
                              </div>
                            </div>
                          </Row>
                          <Row className="card comment-card card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.feedbackq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <textarea
                                disabled={isDisabled}
                                placeholder="Enter your Feedback"
                                value={feedback}
                                maxLength={100}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {100 - (feedback ? feedback.length : 0)}
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <button
                                className="btn btn-info"
                                onClick={goToBack}
                              >
                                Back
                              </button>
                            </Col>
                            <Col className="d-flex justify-content-end">
                              <button
                                className="btn btn-secondary"
                                onClick={goToNext}
                              >
                                Next
                              </button>
                            </Col>
                          </Row>
                          {/* <button className='btn btn-info' onClick={goToBack}>Back</button>
                                                    <button className='btn btn-secondary' onClick={goToNext}>Next</button>      */}
                        </Row>
                      </Row>
                    )}
                    {currentSection === 3 && (
                      <Row className="mb-2">
                        <b>Section 3: {t("ideaform_questions.section3")}</b>
                        <Row className="card comment-card card">
                          <div className="question quiz mb-0">
                            <b
                              style={{
                                fontSize: "1rem",
                              }}
                            >
                              {t("ideaform_questions.uploadq")}
                            </b>
                          </div>
                          <div className=" answers row flex-column">
                            {/* <FormGroup check className="answers"> */}
                              <div className="wrapper my-3 common-flex">
                                {/* <Button
                                                                            type="button"
                                                                            // btnClass={
                                                                            //     ? 'secondary'
                                                                            //     : 'primary'
                                                                            //     } me-3 pointer `}
                                                                            size="small"
                                                                            label={t(
                                                                                'student.upload_file'
                                                                            )}
                                                                        /> */}
                                <input
                                  type="file"
                                  name="file"
                                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                                  multiple
                                  onChange={(e) => fileHandler(e)}
                                />
                              </div>
                            {/* </FormGroup> */}
                            <div className="mx-4">
                              {immediateLink &&
                                immediateLink.length > 0 &&
                                immediateLink.map((item, i) => (
                                  <LinkComponent
                                    item={item}
                                    url={true}
                                    key={i}
                                  />
                                ))}
                              {!immediateLink &&
                                files.length > 0 &&
                                files.map((item, i) => (
                                  <LinkComponent
                                    original={true}
                                    item={item}
                                    i={i}
                                    key={i}
                                    removeFileHandler={removeFileHandler}
                                  />
                                ))}


                              {!immediateLink &&
                                files.length === 0 &&
                                Array.isArray(prototypeImage) &&
                                prototypeImage.map((item, i) => (
                                  <LinkComponent
                                    item={item}
                                    url={true}
                                    key={i}
                                  />
                                ))}
                            </div>
                          </div>
                          <div className=" answers row flex-column">
                            <textarea
                              disabled={isDisabled}
                              placeholder="Upload your Link"
                              value={prototypeLink}
                              maxLength={100}
                              onChange={(e) => setPrototypeLink(e.target.value)}
                            />
                            <div className="text-end">
                              {t("student_course.chars")} :
                              {100 - (prototypeLink ? prototypeLink.length : 0)}
                            </div>
                          </div>
                        </Row>
                        <Row className="card comment-card card">
                          <div className="question quiz mb-0">
                            <b
                              style={{
                                fontSize: "1rem",
                              }}
                            >
                              {t("ideaform_questions.communityq")}
                            </b>
                          </div>
                          <div className=" answers row flex-column">
                            <div>
                              {submit.map((item, i) => (
                                <>
                                  <label
                                    key={i}
                                    style={{
                                      margin: "1rem",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      value={item}
                                      disabled={isDisabled}
                                      checked={item === workbook}
                                      onChange={(e) =>
                                        setWorkbook(e.target.value)
                                      }
                                    />{" "}
                                    {item}
                                  </label>
                                  <br />
                                </>
                              ))}
                            </div>
                          </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-info " onClick={goToBack}>
                            Back
                          </button>
                        </div>
                      </Row>
                    )}
                   
                  </Form>
                  <div className="d-flex justify-content-start">
                      <button
                        className="btn btn-info"
                        onClick={(e) => handleSubmit(e, "DRAFT")}
                      >
                        Save As Draft
                      </button>
                    </div>
                </CardBody>
              </div>
            </Row>
          </Col>
        </Container>
      )}
      {/* </div> */}
    </div>
  );
};

export default IdeasPageNew;