/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import female from "../../assets/img/Female_Profile.png";
import male from "../../assets/img/Male_Profile.png";
import team from "../../assets/img/icons/team.svg";
import user from "../../assets/img/icons/user-icon.svg";
import girl1 from "../../assets/img/girl1.png";
import girl2 from "../../assets/img/girl2.png";
import girl3 from "../../assets/img/girl3.png";
import girl4 from "../../assets/img/girl4.png";
import girl5 from "../../assets/img/girl5.png";
import girl6 from "../../assets/img/girl6.png";
import boy1 from "../../assets/img/boy1.png";
import boy2 from "../../assets/img/boy2.png";
import boy3 from "../../assets/img/boy3.png";
import boy4 from "../../assets/img/boy4.png";
import boy5 from "../../assets/img/boy5.png";
import boy6 from "../../assets/img/boy6.png";
import { FaUsers } from 'react-icons/fa';
import Table from "../../core/pagination/datatable";
import {  CheckCircle } from 'react-feather';
import { getTeamMemberStatus } from '../../Teacher/store/teams/actions';
import { setToogleHeader } from "../../core/redux/action";
import{ IoHelpOutline,
} from "react-icons/io5";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getCurrentUser, setCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeesGrid = () => {
  const route = all_routes;
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
  const [studentCount, setStudentCount] = useState([]);
  const [showDefault, setshowDefault] = useState(true);
  const { teamsMembersStatus, teamsMembersStatusErr } = useSelector(
    (state) => state.teams
  );
  const teamId = currentUser?.data[0]?.team_id;
  const mentorid = currentUser?.data[0]?.mentor_id;

  useEffect(() => {
    if(teamId){
        dispatch(getTeamMemberStatus(teamId, setshowDefault));
        //dispatch(getStudentChallengeSubmittedResponse(teamId));
    }
  }, [teamId, dispatch]);

  const percentageBWNumbers = (a, b) => {
    return (((a - b) / a) * 100).toFixed(2);
  };

  const columns = [
    {
        title: 'Name',
        dataIndex: 'full_name',
        width: '15rem'
    },
    {
        title: 'Pre Survey',
        dataIndex: 'pre_survey_status',
        align: 'center',
        width: '15rem',
        render: (_, record) =>
            record?.pre_survey_status ? (
                <CheckCircle size={20} color="#28C76F" />
            ) : (
                <IoHelpOutline size={20} color="#FF0000"/>
            )
    },
    {
        title: 'Lesson Progress',
        dataIndex: 'address',
        align: 'center',
        width: '30rem',
        render: (_, record) => {
            let percent =
                100 -
                percentageBWNumbers(
                    record.all_topics_count,
                    record.topics_completed_count
                );
            return (
                <div className="progress progress-sm progress-custom progress-animate"
                    role="progressbar"
                    aria-valuenow={Math.round(percent) ? Math.round(percent) : '0'}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className={percent
                                ? percent <= 25
                                    ?  "progress-bar bg-danger"
                                    : percent > 25 && percent <= 50
                                    ? "progress-bar bg-primary"
                                    : percent > 50 && percent <= 75
                                    ? "progress-bar bg-info"
                                    : "progress-bar bg-success"
                                : "progress-bar bg-danger"
                        } >
                      <div 
                        className= {percent
                          ? percent <= 25
                              ?  "progress-bar-value bg-danger"
                              : percent > 25 && percent <= 50
                              ? "progress-bar-value bg-primary"
                              : percent > 50 && percent <= 75
                              ? "progress-bar-value bg-info"
                              : "progress-bar-value bg-success"
                          : "progress-bar-value bg-danger"} >
                        {Math.round(percent) ? Math.round(percent) : '0'}%</div>
                    </div>
                </div>
              // bg-primary bg-success bg-info bg-danger
                // <div className="d-flex">
                //     <div style={{ width: '80%' }}>
                //         <Progress
                //             key={'25'}
                //             className="progress-height"
                //             animated
                //             color={
                //                 percent
                //                     ? percent <= 25
                //                         ? 'danger'
                //                         : percent > 25 && percent <= 50
                //                         ? 'info'
                //                         : percent > 50 && percent <= 75
                //                         ? 'warning'
                //                         : 'sucess'
                //                     : 'danger'
                //             }
                //             value={percent}
                //         />
                //     </div>
                //     <span className="ms-2">
                //         {Math.round(percent) ? Math.round(percent) : '0'}%
                //     </span>
                // </div>
            );
        }
    },
    {
        title: 'Idea Submission',
        dataIndex: 'idea_submission',
        align: 'center',
        width: '20rem',
        render: (_, record) =>
            record?.idea_submission ? (
              <CheckCircle size={20} color="#28C76F" />
            ) : (
              <IoHelpOutline size={20} color="#FF0000"/>
            )
    },
    {
        title: 'Post Survey',
        dataIndex: 'post_survey_status',
        align: 'center',
        width: '10rem',
        render: (_, record) =>
            record?.post_survey_status ? (
              <CheckCircle size={20} color="#28C76F" />
            ) : (
              <IoHelpOutline size={20} color="#FF0000"/>
            )
    },
    {
        title: 'Certificate',
        dataIndex: 'certificate',
        align: 'center',
        width: '10rem',
        render: (_, record) =>
            record?.certificate ? (
              <CheckCircle size={20} color="#28C76F" />
            ) : (
              <IoHelpOutline size={20} color="#FF0000"/>
            )
    }
  ];

  
  const navigate = useNavigate();

  const boys = [boy1,boy2,boy3,boy4,boy5,boy6];
  const girls = [girl1,girl2,girl3,girl4,girl5,girl6];

  useEffect(() => {
    if (currentUser?.data[0]?.team_id) {
      mentorTeamsCount(currentUser?.data[0]?.team_id);
    }
  }, [currentUser?.data[0]?.team_id]);
  const mentorTeamsCount = (id) => {
    const popParam = encryptGlobal(JSON.stringify(id));
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/studentsList/${popParam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setStudentCount(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleStudent = (student) => {
    console.log(student, "clicked Login");
    //alert("hii");
    const data = { ...student };
    currentUser.data[0].full_name = data?.full_name;
    currentUser.data[0].user_id = data?.user_id;
    currentUser.data[0].role = data?.role;
    setCurrentUser(currentUser);
    navigate("/studentpresurvey");
  };
  console.log(currentUser, "user");
  const getRandomImage = (imageArray) => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };
  const getProfileImage = (gender) => {
    console.log(gender);
    switch (gender) {
      case "MALE":
        return getRandomImage(boys);
      case "FEMALE":
        return getRandomImage(girls);
      default:
        return user;
    }
  };
  // const renderTooltip = (props) => (
  //   <Tooltip id="pdf-tooltip" {...props}>
  //     Pdf
  //   </Tooltip>
  // );
  // const renderExcelTooltip = (props) => (
  //   <Tooltip id="excel-tooltip" {...props}>
  //     Excel
  //   </Tooltip>
  // );
  // const renderPrinterTooltip = (props) => (
  //   <Tooltip id="printer-tooltip" {...props}>
  //     Printer
  //   </Tooltip>
  // );
  // const renderRefreshTooltip = (props) => (
  //   <Tooltip id="refresh-tooltip" {...props}>
  //     Refresh
  //   </Tooltip>
  // );
  // const renderCollapseTooltip = (props) => (
  //   <Tooltip id="refresh-tooltip" {...props}>
  //     Collapse
  //   </Tooltip>
  // );
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content"> 
        {/* Welcome user */}
          <div className="welcome d-lg-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center welcome-text">
                <h3 className="d-flex align-items-center">
                  <span style={{ fontSize: '30px' }}>👋</span>
                  &nbsp;Hi {currentUser?.data[0]?.full_name} Team &nbsp;
                </h3>
               
                <h6> here&apos;s what&apos;s happening with your School Innovation Marathon 2024 today.</h6>
              </div>
              <div className="dropdown">
                  <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                      {selectedLanguage}
                  </button>
                  <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('English')} to="#">
                              English
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Hindi')} to="#">
                              Hindi
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Telugu')} to="#">
                              Telugu
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Tamil')} to="#">
                              Tamil
                          </Link>
                      </li>
                  </ul>
              </div>
          </div>
          {/* Student Cards */}
          <div className="employee-grid-widget">
            <div className="row">
              {studentCount.map((student, i) => (
                <div key={i} className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                  <div className="employee-grid-profile">
                    <div className="profile-head">
                      <div className="profile-head-action">
                        <button
                          type="button"
                          className="btn btn-outline-warning text-center w-auto me-1"
                          onClick={() => handleStudent(student)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="profile-info">
                      <div className="profile-pic active-profile">
                        <img
                          src={getProfileImage(student.Gender)}
                          alt="Profile"
                        />
                      </div>
                      <h4 style={{color:"orange"}}>{student.full_name}</h4>
                     
                    </div>
                    <ul className="department">
                      <li>
                        Grade <span>{student.Grade}th class</span>{" "}
                      </li>
                      <li>
                        Age <span>{student.Age} yrs</span>{" "}
                      </li>
                    </ul>
                    <div className="departments">
                      <p>Instructions to students on their action items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Students Progress */}
          <div className="card table-list-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0"> <img src={team} style={{ marginRight:"6px", width: "7%", verticalAlign: "middle"}}/>Team Progress</h4>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      {showDefault && (
                            <div className="d-flex justify-content-center align-items-center">
                                <h4 className="text-primary">Loading</h4>
                            </div>
                        )}
                        {teamsMembersStatus.length > 0 && !showDefault ? (
                        <Table
                            //bordered
                            pagination={false}
                            dataSource={teamsMembersStatus}
                            columns={columns}
                        />
                        ) : teamsMembersStatusErr ? (
                            <div
                                className="d-flex justify-content-center align-items-center">
                                <h4 className="text-danger">
                                    There are no students in your Team
                                </h4>
                            </div>
                      ) : null}
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeesGrid;
