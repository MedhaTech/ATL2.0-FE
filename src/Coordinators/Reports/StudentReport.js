/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";
// import {
//   getDistrictData,
//   getStateData,
//   getFetchDistData,
// } from "../../../redux/studentRegistration/actions";
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import axios from "axios";
// import '../reports.scss';
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import { categoryValue } from "../../Schools/constentText";
import { notification } from "antd";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { stateList, districtList } from "../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faFemale,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import { openNotificationWithIcon } from "../../helpers/Utils";

const StudentProgress = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const currentUser = getCurrentUser("current_user");
  
  const [isloader, setIsloader] = useState(false);
  const [selectstate, setSelectState] = React.useState(
    currentUser?.data[0]?.state_name
  );
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
    "All Categories",
    "Fully Aided-High School",
    "Fully Aided-Higher Secondary School",
    "Government-High School",
    "Government-Higher Secondary School",
    "Partially Aided-High School",
    "Partially Aided-Higher Secondary School",
    "Non ATL",
  ];

  const newstateList = ["All States", ...stateList];
  // const categoryData =
  //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];
  const [studentDetailedReportsData, setstudentDetailedReportsData] = useState(
    []
  );
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [doughnutChartDataBar, setDoughnutChartDataBar] = useState(null);

  const csvLinkRef = useRef();
  const csvLinkRefTable = useRef();
  const dispatch = useDispatch();
  const [combinedArray, setCombinedArray] = useState([]);
  const [downloadTableData, setDownloadTableData] = useState([]);
  const [newFormat, setNewFormat] = useState("");
  const [atl, setAtl] = useState("");
  const [nonAtl, setNonAtl] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [series3, setseries3] = useState([]);
  const [series4, setseries4] = useState([]);
  const [series5, setseries5] = useState([]);
  const [series6, setseries6] = useState([]);
  const [series7, setseries7] = useState([]);

  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart3Data, setBarChart3Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart2Data, setBarChart2Data] = useState({
    labels: [],
    datasets: [],
  });
  
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];
  // const fiterDistData = districtList[selectstate];
  // useEffect(() => {
  //     dispatch(getStateData());
  // }, []);
  useEffect(() => {
    // if (selectstate !== '') {
    //     dispatch(getFetchDistData(selectstate));
    // }
    // setdistrict('');
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${1 + newDate.getMonth()
      }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);
  const [totalCount, setTotalCount] = useState([]);

  const tableHeaders = [
    {
      label: "District Name",
      key: "district",
    },
    {
      label: "Total No.of Teams created",
      key: "totalTeams",
    },
    {
      label: "Total No.of Students enrolled",
      key: "totalStudents",
    },
    {
      label: "No.of Students Completed the Course",
      key: "courseCompleted",
    },
    {
      label: "No.of Students Course In Progress",
      key: "courseINprogesss",
    },
    {
      label: "No.of Students Not Started Course",
      key: "courseNotStarted",
    },
    {
      label: "Course Completion Percentage",
      key: "coursePercentage",
    },
    {
      label: 'No.of Teams Submitted Ideas',
      key: 'submittedCount'
  },
  {
      label: 'No.of Teams Ideas in Draft',
      key: 'draftCount'
  },
  {
      label: 'No.of Teams Not Stated Idea Submission',
      key: 'ideaNotStarted'
  },
 ];
  const teacherDetailsHeaders = [
    {
      label: "UDISE CODE",
      key: "organization_code",
    },
    // {
    //   label: "ATL CODE",
    //   key: "organization_code",
    // },
    {
      label: "School Name",
      key: "organization_name",
    },
    {
      label: "School Type/Category",
      key: "category",
    },
    {
      label: "State",
      key: "state",
    },
    {
      label: "District",
      key: "district",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "HM Name",
      key: "principal_name",
    },
    {
      label: "HM Contact",
      key: "principal_mobile",
    },
    {
      label: "Teacher Name",
      key: "full_name",
    },
    {
      label: "Teacher Email",
      key: "username",
    },
    {
      label: "Teacher Gender",
      key: "gender",
    },
    {
      label: "Teacher Contact",
      key: "mobile",
    },
    {
      label: "Teacher WhatsApp Contact",
      key: "whatapp_mobile",
    },

    {
      label: "Team Name",
      key: "team_name",
    },
    {
      label: "Team Username/Login",
      key: "team_username",
    },
    {
      label: "Student Name",
      key: "studentfullname",
    },

    {
      label: "Age",
      key: "Age",
    },
    {
      label: "Gender",
      key: "studentgender",
    },
    {
      label: "Class",
      key: "Grade",
    },
    {
      label: "Disability status",
      key: "disability",
    },
    {
      label: "Pre Survey Status",
      key: "pre_survey_status",
    },


    {
      label: "Course Completion%",
      key: "course_per",
    },
    {
      label: "Course Status",
      key: "user_count",
    },
    {
      label: "Idea Status",
      key: "idea_status",
    },
    {
      label: "Post Survey Status",
      key: "post_survey_status",
    },

    // {
    //     label: 'No.of Teams Idea Submitted',
    //     key: 'submittedcout'
    // },
    // {
    //     label: 'No.of Teams Idea in Draft',
    //     key: 'draftcout'
    // },
    // {
    //     label: 'No.of Teams Idea NOt Initiated',
    //     key: 'ideanotIN'
    // }
  ];

  // useEffect(() => {
  //     dispatch(getDistrictData());
  //     fetchChartTableData();
  //     const newDate = new Date();
  //     const formattedDate = `${newDate.getUTCDate()}/${
  //         1 + newDate.getMonth()
  //     }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  //     setNewFormat(formattedDate);
  // }, []);

  var chartOption = {
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["#36A2EB", "rgb(254, 176, 25)", "#FF6384",],
    labels: [
      "Submitted Ideas",
      "In Draft Ideas",
      "Not Started Idea Submission",
    ],
    series: [
      totalCount.submittedCount,
      totalCount.draftCount,
      totalCount.ideaNotStarted,
    ],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  var options = {
    chart: {
      height: 700,
      width:1000,
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "# Submitted Ideas",
        data: series1,
      },
      {
        name: "# Teams",
        data: series2,
      },
    ],

    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      labels: {
        formatter: (val) => {
          return val / 1;
        },
      },
    },

    xaxis: {
      categories: barChart1Data.labels,
      labels: {
        style: {
          fontSize: "10px",
        },
        formatter: (val) => {
          // Shorten long labels or wrap them by breaking lines
          if (val.length > 15) return val.substring(0, 15) + "..."; // Adjust as necessary
          return val;
        },
      },
      ticks: {
        maxRotation: 80,
        minRotation: 45,
        autoSkip: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  var sColStacked = {
    chart: {
      height: 700,
      width:1000,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 255, 0, 0.6)","rgba(0, 128, 0, 0.6)"],

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    series: [
      {
        name: "#Not started",
        data: series3,
      },
      {
        name: "#InProgress",
        data: series4,
      },
      {
        name: "#Completed",
        data: series5,
      },
    ],
    xaxis: {
      categories: barChart2Data.labels,
      labels: {
        style: {
          fontSize: "10px",
        },
        formatter: (val) => {
          // Shorten long labels or wrap them by breaking lines
          if (val.length > 15) return val.substring(0, 15) + "..."; // Adjust as necessary
          return val;
        },
      },
      ticks: {
        maxRotation: 80,
        minRotation: 45,
        autoSkip: false,
      },
    },
    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      labels: {
        formatter: (val) => {
          return val / 1;
        },
      },
    },

    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    fill: {
      opacity: 1,
    },
  };

  var optionsStudent = {
    chart: {
      height: 700,
      width:1000,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    series: [
      {
        name: "#NonATL Students",
        type: "column",
        data: series6,
      },
      {
        name: "#ATL Students",
        type: "line",
        data: series7,
      },
    ],
    stroke: {
      width: [0, 4],
    },

    xaxis: {
      categories: barChart3Data.labels,
      labels: {
        style: {
          fontSize: "10px",
        },
        formatter: (val) => {
          // Shorten long labels or wrap them by breaking lines
          if (val.length > 15) return val.substring(0, 15) + "..."; // Adjust as necessary
          return val;
        },
      },
      ticks: {
        maxRotation: 80,
        minRotation: 45,
        autoSkip: false,
      },
    },
    yaxis: [
      {
        title: {
          text: "NonATL Student",
        },
      },
      {
        opposite: true,
        title: {
          text: "ATL Student",
        },
      },
    ],
  };

  // var radialChart = {
  //   chart: {
  //     height: 350,
  //     type: "donut",
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   colors: ["rgb(0, 227, 150)", "rgb(254, 176, 25)", "rgb(255, 69, 96)"],
  //   plotOptions: {
  //     radialBar: {
  //       dataLabels: {
  //         name: {
  //           fontSize: "22px",
  //         },
  //         value: {
  //           fontSize: "16px",
  //         },
  //         total: {
  //           show: true,
  //           label: "Total",
  //           formatter: function () {
  //             return totalCount.totalStudents;
  //           },
  //         },
  //       },
  //     },
  //   },
  //   series: [
  //     Math.round((totalCount.courseCompleted * 100) / totalCount.totalStudents),
  //     Math.round(
  //       (totalCount.courseINprogesss * 100) / totalCount.totalStudents
  //     ),
  //     Math.round(
  //       ((totalCount.totalStudents -
  //         (totalCount.courseCompleted + totalCount.courseINprogesss)) *
  //         100) /
  //       totalCount.totalStudents
  //     ),
  //   ],
  //   labels: ["Completed", "InProgress", "NotStarted"],
  // };
  var radialChart = {
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 255, 0, 0.6)","rgba(0, 128, 0, 0.6)"],
    labels: [
      "Not Started ",
      "In Progress",
      "Completed",
    ],
    series: [
      totalCount.courseNotStarted,
      totalCount.courseINprogesss,
                  totalCount.courseCompleted,
    ],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // useEffect(() => {
  //     nonAtlCount();
  // }, []);
  const nonAtlCount = () => {
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL + `/reports/studentATLnonATLcount`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (res) {
        if (res.status === 200) {
          var mentorStuArray = [];
          res &&
            res.data &&
            res.data.data &&
            res.data.data.map((students, index) => {
              var key = index + 1;
              return mentorStuArray.push({ ...students, key });
            });
          setAtl(mentorStuArray);

          // setAtl(response.data.data);
          const barStudentData = {
            labels: mentorStuArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of  ATL Students",
                data: mentorStuArray.map((item) => item.ATL_Student_Count),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No.of Non ATL Students",
                data: mentorStuArray.map((item) => item.NONATL_Student_Count),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setBarChart3Data(barStudentData);
          // console.log(barStudentData,"barStudentData");
          setseries7(barStudentData.datasets[0].data);
          setseries6(barStudentData.datasets[1].data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDownload = () => {
    if (!selectstate || !district || !category) {
      notification.warning({
        message:
          "Please select a district, category type before Downloading Reports.",
      });
      return;
    }
    setIsDownload(true);
    fetchData();
  };
  useEffect(() => {
    if (studentDetailedReportsData.length > 0) {
      console.log("Performing operation with the updated data.");
      csvLinkRef.current.link.click();
    }
  }, [studentDetailedReportsData]);
  const fetchData = () => {
    const apiRes = encryptGlobal(
      JSON.stringify({
        state: selectstate,
        district: district,
        category: category,
      })
    );
    // console.log(selectstate,district,category);
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/reports/studentdetailsreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          
          const teamDataMap = response.data.data[0].teamData.reduce(
            (map, item) => {
              map[item.team_id] = item;
              return map;
            },
            {}
          );
          const teamUsernameMap = response.data.data[0].teamUsername.reduce(
            (map, item) => {
              map[item.teamuserId] = item.teamUsername;
              return map;
            },
            {}
          );
          const mentorMap = response.data.data[0].mentorData.reduce(
            (map, item) => {
              map[item.mentor_id] = item;
              return map;
            },
            {}
          );
          const mentorUsernameMap = response.data.data[0].mentorUsername.reduce(
            (map, item) => {
              map[item.user_id] = item.username;
              return map;
            },
            {}
          );
          const preSurveyMap = response.data.data[0].preSurvey.reduce(
            (map, item) => {
              map[item.user_id] = item.pre_survey_status;
              return map;
            },
            {}
          );
          const postSurveyMap = response.data.data[0].postSurvey.reduce(
            (map, item) => {
              map[item.user_id] = item.post_survey_status;
              return map;
            },
            {}
          );
          const ideaStatusDataMap = response.data.data[0].ideaStatusData.reduce(
            (map, item) => {
              map[item.team_id] = item.status;
              return map;
            },
            {}
          );
          const userTopicDataMap = response.data.data[0].userTopicData.reduce(
            (map, item) => {
              map[item.user_id] = item.user_count;
              return map;
            },
            {}
          );

          const studentAndteam = response.data.data[0].summary.map((item) => {
            return {
              ...item,
              pre_survey_status: preSurveyMap[item.user_id] || "Not started",
              post_survey_status: postSurveyMap[item.user_id] || "Not started",
              idea_status: ideaStatusDataMap[item.team_id] || "Not Initiated",
              user_count:
                (userTopicDataMap[item.user_id] === 0 || userTopicDataMap[item.user_id] === undefined)
                  ? "Not Started"
                  : userTopicDataMap[item.user_id] === 31
                    ? "Completed"
                    : "In Progress",
              course_per: userTopicDataMap[item.user_id] && typeof userTopicDataMap[item.user_id] === "number"
                ? `${Math.round((userTopicDataMap[item.user_id] / 31) * 100)}%`
                : `0%`,
              team_name: teamDataMap[item.team_id].team_name,
              team_email: teamDataMap[item.team_id].team_email,
              mentor_id: teamDataMap[item.team_id].mentor_id,
              teamuserId: teamDataMap[item.team_id].teamuserId
            };
          });

          const mentorAndOrg = studentAndteam.map((item) => {
            return {
              ...item,
              team_username: teamUsernameMap[item.teamuserId],
              category: mentorMap[item.mentor_id].category,
              district: mentorMap[item.mentor_id].district,
              full_name: mentorMap[item.mentor_id].full_name,
              gender: mentorMap[item.mentor_id].gender,
              mobile: mentorMap[item.mentor_id].mobile,
              organization_code: mentorMap[item.mentor_id].organization_code,
              organization_name: mentorMap[item.mentor_id].organization_name,
              state: mentorMap[item.mentor_id].state,
              whatapp_mobile: mentorMap[item.mentor_id].whatapp_mobile,
              mentorUserId: mentorMap[item.mentor_id].mentorUserId,
              city: mentorMap[item.mentor_id].city,
              principal_name: mentorMap[item.mentor_id].principal_name,
              principal_mobile: mentorMap[item.mentor_id].principal_mobile,
            };
          });
          const newdatalist = mentorAndOrg.map((item) => {
            return {
              ...item,
              username: mentorUsernameMap[item.mentorUserId]
            };
          });

          setstudentDetailedReportsData(newdatalist);
          if (response.data.data[0].summary.length > 0) {
            openNotificationWithIcon(
              "success",
              "Report Downloaded Successfully"
            );
          } else {
            openNotificationWithIcon("error", "No Data Found");
          }
          //   csvLinkRef.current.link.click();
          //   console.log(studentDetailedReportsData,"ttt");
          // openNotificationWithIcon("success", "Report Downloaded Successfully");
          setIsDownload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsDownload(false);
      });
  };

  const fetchChartTableData = () => {
    const staParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state_name,
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/reports/studentdetailstable?Data=${staParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setIsloader(true);
          // console.log(response,"view");
          const summary = response.data.data[0].summary;
          const studentCountDetails = response.data.data[0].studentCountDetails;

          const courseCompleted = response.data.data[0].courseCompleted;
          const courseINprogesss = response.data.data[0].courseINprogesss;
          const draftCount = response.data.data[0].draftCount;
          const submittedCount = response.data.data[0].submittedCount;
          const combinedArray = summary.map((summaryItem) => {
            const district = summaryItem.district;
            const totalTeams = summaryItem.totalTeams;
            // const teamCountItem = teamCount.find(
            //     (item) => item.state === state
            // );
            const draftCountItem = draftCount.find(
              (item) => item.district === district
            );
            const submittedCountItem = submittedCount.find(
              (item) => item.district === district
            );
            const studentCountItem = studentCountDetails.find(
              (item) => item.district === district
            );
            const courseCompletedItem = courseCompleted.find(
              (item) => item.district === district
            );
            const courseINprogesssItem = courseINprogesss.find(
              (item) => item.district === district
            );
            const ideaNotStarted =
              summaryItem.totalTeams -
              ((submittedCountItem ? submittedCountItem?.submittedCount : 0) +
                (draftCountItem ? draftCountItem?.draftCount : 0));
            // const courseNotStarted =
            //   summaryItem.totalTeams -
            //   ((courseCompletedItem
            //     ? courseCompletedItem?.studentCourseCMP
            //     : 0) +
            //     (courseINprogesssItem
            //       ? courseINprogesssItem?.studentCourseIN
            //       : 0));
            
              const courseNotStarted = (studentCountItem) ? (Math.abs(
    studentCountItem?.totalstudent  -
    (
      (courseCompletedItem ? courseCompletedItem?.studentCourseCMP : 0) +
      (courseINprogesssItem ? courseINprogesssItem?.studentCourseIN : 0)
    )
  )
  ): 0;
  

                  


            // const coursePercentage =
            //   studentCountItem && studentCountItem.totalstudent > 0
            //     ? Math.round(
            //       ((courseCompletedItem
            //         ? courseCompletedItem.studentCourseCMP
            //         : 0) /
            //         studentCountItem.totalstudent) *
            //       100
            //     )
            //     : 0;
                const coursePercentage = 
  studentCountItem && studentCountItem.totalstudent > 0
    ? Math.round(
        ((courseCompletedItem && courseCompletedItem.studentCourseCMP
          ? courseCompletedItem.studentCourseCMP
          : 0) / studentCountItem.totalstudent) * 100
      )
    : 0;
              console.log(coursePercentage,"11");

            return {
              district,
              coursePercentage,
              totalTeams,
              totalStudents: studentCountItem
                ? studentCountItem.totalstudent
                : 0,
              courseCompleted: courseCompletedItem
                ? courseCompletedItem.studentCourseCMP
                : 0,
              courseINprogesss: courseINprogesssItem
                ? courseINprogesssItem.studentCourseIN
                : 0,
              courseNotStarted,
              draftCount: draftCountItem ? draftCountItem.draftCount : 0,
              submittedCount: submittedCountItem
                ? submittedCountItem.submittedCount
                : 0,
              ideaNotStarted,
            };
          });
          const total = combinedArray.reduce(
            (acc, item) => {
              acc.district = "Total";
              // acc.totalReg += item.totalReg;
              acc.totalTeams += item.totalTeams;
              acc.totalStudents += item.totalStudents;
              acc.draftCount += item.draftCount;
              acc.submittedCount += item.submittedCount;
              acc.courseCompleted += item.courseCompleted;
              acc.courseINprogesss += item.courseINprogesss;
              acc.ideaNotStarted =
                acc.totalTeams - (acc.submittedCount + acc.draftCount);
              acc.courseNotStarted =
                acc.totalStudents -
                (acc.courseCompleted + acc.courseINprogesss);
              return acc;
            },
            {
              district: "None",
              // totalReg: 0,
              totalTeams: 0,
              totalStudents: 0,
              draftCount: 0,
              submittedCount: 0,
              ideaNotStarted: 0,
              // maleStudents: 0,
              // femaleStudents: 0,
              // otherStudents : 0,
              coursePercentage:0,
              courseCompleted: 0,
              courseINprogesss: 0,
              courseNotStarted: 0,
            }
          );

          const doughnutData = {
            labels: [
              "Draft Ideas",
              "Submitted Ideas",
              "Not Started Idea Submission",
            ],
            datasets: [
              {
                data: [
                  total.draftCount,
                  total.submittedCount,
                  total.ideaNotStarted,
                ],
                backgroundColor: ["#8bcaf4", "#ff99af"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          };
          const doughnutDataGraph = {
            labels: [
              "In progress",
              "Completed",
              "Not Started ",
            ],
            datasets: [
              {
                data: [
                  total.courseINprogesss,
                  total.courseCompleted,
                  total.courseNotStarted,
                ],
                backgroundColor: ["rgba(255, 0, 0, 0.6)", "rgba(255, 255, 0, 0.6)","rgba(0, 128, 0, 0.6)"],
                hoverBackgroundColor: ["#e60026", "#ffae42","#087830"],
              },
            ],
          };

          const barData = {
            labels: combinedArray.map((item) => item.district),
            datasets: [
              {
                label: "No.of Teams Enrolled",
                data: combinedArray.map((item) => item.totalTeams),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Ideas Submitted",
                data: combinedArray.map((item) => item.submittedCount),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setseries2(barData.datasets[0].data);
          setseries1(barData.datasets[1].data);

          const stackedBarChartData = {
            labels: combinedArray.map((item) => item.district),
            datasets: [
              {
                label: "No. of Students not started course",
                data: combinedArray.map((item) => item.courseNotStarted),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Students course IN progress",
                data: combinedArray.map((item) => item.courseINprogesss),
                backgroundColor: "rgba(255, 255, 0, 0.6)",
              },
              {
                label: "No. of Students Completed Course",
                data: combinedArray.map((item) => item.courseCompleted),
                backgroundColor: "rgba(0, 128, 0, 0.6)",
              },
            ],
          };
          total.coursePercentage = Math.round(
            (total.courseCompleted /
              total.totalStudents) *
            100
          );
          setseries3(stackedBarChartData.datasets[0].data);
          setseries4(stackedBarChartData.datasets[1].data);
          setseries5(stackedBarChartData.datasets[2].data);
          const newcombinedArray = [...combinedArray, total];
          setCombinedArray(combinedArray);
          setDownloadTableData(newcombinedArray);
          setDoughnutChartData(doughnutData);
          setDoughnutChartDataBar(doughnutDataGraph);

          setBarChart1Data(barData);
          setBarChart2Data(stackedBarChartData);
          setTotalCount(total);
          // console.log(total,"11");
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

  return (
    <div className="page-wrapper">
      <h4 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Reports
        </h4>
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Student Progress Detailed Report</h4>
              <h6>
                Student Progress - Presurvey , Course, Idea submission , Post survey
                Status Report
              </h6>
            </div>
          </div>
          {/* <div className="page-btn">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/reports")}
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div> */}
        </div>

        <Container className="RegReports userlist">
          <div className="reports-data mt-2 mb-2">
            <Row className="align-items-center mt-3 mb-2">
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <p>{selectstate}</p>
                  {/* <Select
                    list={fullStatesNames}
                    setValue={setSelectState}
                    placeHolder={"Select State"}
                    value={selectstate}
                  /> */}
                </div>
              </Col>
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={fiterDistData}
                    setValue={setdistrict}
                    placeHolder={"Select District"}
                    value={district}
                  />
                </div>
              </Col>
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  {/* <Select
                    list={categoryData}
                    setValue={setCategory}
                    placeHolder={"Select Category"}
                    value={category}
                  /> */}
                  {selectstate === "Tamil Nadu" ? (
                    <Select
                      list={categoryDataTn}
                      setValue={setCategory}
                      placeHolder={"Select Category"}
                      value={category}
                    />
                  ) : (
                    <Select
                      list={categoryData}
                      setValue={setCategory}
                      placeHolder={"Select Category"}
                      value={category}
                    />
                  )}
                </div>
              </Col>
              <Col
                md={3}
                className="d-flex align-items-center justify-content-center"
              >
                <button
                  onClick={handleDownload}
                  type="button"
                  disabled={isDownload}
                  className="btn btn-primary"
                >
                  {isDownload ? "Downloading" : "Download Report"}
                </button>
              </Col>
            </Row>
            {isloader ?
            <div className="chart mt-2 mb-2">
              {combinedArray.length > 0 && (
                <>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
                      <div className="card flex-fill default-cover w-100 mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title mb-0">Data Analytics</h4>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="view-all d-flex align-items-center"
                            >
                              View All
                              <span className="ps-2 d-flex align-items-center">
                                <ArrowRight className="feather-16" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                              <p>
                                <b>
                                  Idea Submission Status As of {newFormat}
                                </b>
                              </p>
                              {doughnutChartData && (
                                <div id="donut-chart">
                                  <ReactApexChart
                                    options={chartOption}
                                    series={chartOption.series}
                                    type="donut"
                                    height={330}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                              <p>
                                <b>Students Course Status As of {newFormat}</b>
                              </p>
                              {doughnutChartDataBar && (
                                <div id="donut-chart">
                                  <ReactApexChart
                                    options={radialChart}
                                    series={radialChart.series}
                                      type="donut"
                                    height={350}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
                      <div className="card flex-fill default-cover w-100 mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title mb-0">
                            District wise Students Progress Stats
                          </h4>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="view-all d-flex align-items-center"
                            >
                              <button
                                className="btn mx-2 btn-primary btn-sm"
                                type="button"
                                onClick={() => {
                                  if (downloadTableData) {
                                    // setIsDownloading(true);
                                    setDownloadTableData(null);
                                    csvLinkRefTable.current.link.click();
                                  }
                                }}
                              >
                                Get Statistics
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-border recent-transactions">
                              <thead>
                                <tr>
                                  <th style={{ color: "#36A2EB",fontWeight: "bold" }}>#No</th>
                                  <th style={{ color: "#36A2EB",fontWeight: "bold" }}>
                                    District Name
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Teams Created
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Students Enrolled
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Student Course Completed
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Student Course InProgress
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Student Course NotStarted
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faChalkboardTeacher}
                                    />{" "}
                                    Course Completion%
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Teams Submitted Ideas
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Teams Ideas in Draft
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",fontWeight: "bold"
                                    }}
                                  >
                                    #Teams Idea Not Started
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {combinedArray.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        maxWidth: "150px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: "crimson",
                                      }}
                                    >
                                      {item.district}
                                    </td>
                                    <td>{item.totalTeams}</td>
                                    <td>{item.totalStudents}</td>
                                    <td>{item.courseCompleted}</td>
                                    <td>{item.courseINprogesss}</td>
                                    <td>{item.courseNotStarted}</td>
                                    <td>{item.coursePercentage}%</td>
                                 
                                    <td>{item.submittedCount}</td>{" "}
                                    <td>{item.draftCount}</td>{" "}
                                    <td>{item.ideaNotStarted}</td>
           {/* { console.log(item.courseNotStarted,"course not")} */}
                                  </tr>
                                ))}
                                <tr>
                                  <td>{ }</td>
                                  <td
                                    style={{
                                      color: "crimson",
                                      textAlign: "left",
                                      maxWidth: "150px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {"Total Count"}
                                  </td>

                                  <td style={{ color: "crimson" }}>
                                    {totalCount.totalTeams}
                                  </td>
                                  <td style={{ color: "crimson" }}>
                                    {totalCount.totalStudents}
                                  </td>

                                  <td style={{ color: "crimson" }}>
                                    {totalCount.courseCompleted}
                                  </td>
                                  <td style={{ color: "crimson" }}>
                                    {totalCount.courseINprogesss}
                                  </td>
                                  <td style={{ color: "crimson" }}>
                                    {totalCount.courseNotStarted}
                                  </td>
                                  <td style={{ color: "crimson" }}>
                                    {Math.round(
                                      (totalCount.courseCompleted /
                                        totalCount.totalStudents) *
                                      100
                                    )}
                                    %
                                  </td>

                                 
                                  {/* <td style={{ color: "crimson" }}>
                                    {Math.round(
                                      (totalCount.courseCompleted /
                                        totalCount.totalStudents) *
                                      100
                                    )}
                                    %
                                  </td> */}
                                  <td style={{ color: "crimson" }}>{totalCount.submittedCount}</td>{" "}
                                  <td style={{ color: "crimson" }}>{totalCount.draftCount}</td>{" "}
                                  <td style={{ color: "crimson" }}>{totalCount.ideaNotStarted}</td>

                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">
                    Teams, Submitted Ideas As of {newFormat}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div id="s-line-area" />
                    <ReactApexChart
                      options={options}
                      series={options.series}
                       type="bar"
                      height={400}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">
                      Student Course Status As of {newFormat}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div id="s-col-stacked" />
                    <ReactApexChart
                      options={sColStacked}
                      series={sColStacked.series}
                      type="bar"
                      height={400}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-12">
                        <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">No.of Students Enrolled from ATL v/s Non ATL Schools{' '}{newFormat}</h5>
                        </div>
                        <div className="card-body">
                            <div id="mixed-chart" />
                            <ReactApexChart
                            options={optionsStudent}
                            series={optionsStudent.series}
                            type="line"
                            height={400}
                            />
                        </div>
                        </div>
                    </div> */}

           
            </div>
            :
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
             {downloadTableData && (
                <CSVLink
                  data={downloadTableData}
                  headers={tableHeaders}
                  filename={`StudentProgressSummaryReport_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRefTable}
                >
                  Download Table CSV
                </CSVLink>
              )}

              {studentDetailedReportsData && (
                <CSVLink
                  headers={teacherDetailsHeaders}
                  data={studentDetailedReportsData}
                  filename={`StudentProgressDetailedReport_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRef}
                >
                  Download Teacherdetailed CSV
                </CSVLink>
              )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentProgress;
