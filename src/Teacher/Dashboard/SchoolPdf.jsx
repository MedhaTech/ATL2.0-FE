/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Progress } from 'reactstrap';
import { Table } from 'antd';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import schoolpdfpage1 from '../../assets/img/schoolPDF/page_1.png';
import Footerimg from '../../assets/img/schoolPDF/Footer.png';

class Schoolpdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
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
                        <FaCheckCircle size={20} color="green" />
                    ) : (
                        <FaTimesCircle size={20} color="red" />
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
                        <div className="d-flex">
                            <div style={{ width: '80%' }}>
                                <Progress
                                    key={'25'}
                                    className="progress-height"
                                    animated
                                    color={
                                        percent
                                            ? percent <= 25
                                                ? 'danger'
                                                : percent > 25 && percent <= 50
                                                    ? 'info'
                                                    : percent > 50 && percent <= 75
                                                        ? 'warning'
                                                        : 'sucess'
                                            : 'danger'
                                    }
                                    value={percent}
                                />
                            </div>
                            <span className="ms-2">
                                {Math.round(percent)
                                    ? Math.round(percent)
                                    : '0'}
                                %
                            </span>
                        </div>
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
                        <FaCheckCircle size={20} color="green" />
                    ) : (
                        <FaTimesCircle size={20} color="red" />
                    )
            },
            {
                title: 'Post Survey',
                dataIndex: 'post_survey_status',
                align: 'center',
                width: '10rem',
                render: (_, record) =>
                    record?.post_survey_status ? (
                        <FaCheckCircle size={20} color="green" />
                    ) : (
                        <FaTimesCircle size={20} color="red" />
                    )
            },
            {
                title: 'Certificate',
                dataIndex: 'certificate',
                align: 'center',
                width: '10rem',
                render: (_, record) =>
                    record?.certificate ? (
                        <FaCheckCircle size={20} color="green" />
                    ) : (
                        <FaTimesCircle size={20} color="red" />
                    )
            }
        ];
        const mentorper = Math.round(
            (this?.props?.remMentor?.currentProgress /
                this?.props?.remMentor?.totalProgress) *
            100
        );
        return (
            <div className="container-fluid bg-white">
                <div className="row">
                    <div style={{ position: 'relative', padding: '0' }}>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '24rem',
                                left: '10rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.organization
                                    ?.organization_name
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '29rem',
                                left: '11rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.organization
                                    ?.organization_code
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '32rem',
                                left: '7rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.organization
                                    ?.state
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '34.8rem',
                                left: '30rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this?.props?.remMentor?.mentorData?.mobile}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '34.8rem',
                                left: '8rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.organization
                                    ?.district
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '31.8rem',
                                left: '30rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.user
                                    ?.username
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '37.6rem',
                                left: '31rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {mentorper}%
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '37.7rem',
                                left: '10rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.mentorData?.organization
                                    ?.category
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '29rem',
                                left: '34rem',
                                fontSize: '1.3rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this?.props?.remMentor?.mentorData?.full_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '51.2rem',
                                left: '15rem',
                                fontSize: '1.5rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this?.props?.remMentor?.teamsCount[0]?.teams_count}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '51.2rem',
                                left: '30rem',
                                fontSize: '1.5rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {
                                this?.props?.remMentor?.studentCount[0]
                                    ?.student_count
                            }
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '51.2rem',
                                left: '43rem',
                                fontSize: '1.5rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {/* {this?.props?.remMentor?.IdeaCount[0]?.idea_count} */}
                            0
                        </span>
                        <img
                            src={schoolpdfpage1}
                            alt="IdeaPage1"
                            style={{
                                height: '56rem',
                                width: '100%'
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <div
                            style={{
                                borderStyle: 'solid',
                                margin: '0 2rem',
                                padding: '2rem 5rem'
                            }}
                        >
                            <h2>Team Credentials</h2>
                             <table style={{ border: '1px solid black' , marginBottom:"2rem" }}>
                                <tr>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        S.No
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Team Names
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Team Login ID
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Team Password 
                                    </th>
                                </tr>
                                {this?.props?.teamCredentials?.map(
                                    (idea, i) => {
                                        return (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {i + 1}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.team_name}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.username}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.team_name.replace(/\s/g, '').toLowerCase()}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </table>
                            {this?.props?.tabledata?.map((value) => {
                                const team = value.slice(-1);
                                const tableList = value.slice(0, -1);
                                return (
                                    <>
                                        <h2>
                                            {team[0]?.name
                                                ? team[0]?.name
                                                : 'no name'}
                                        </h2>

                                        <Table
                                            bordered
                                            pagination={false}
                                            dataSource={tableList}
                                            columns={columns}
                                            style={{ paddingBottom: '3rem' }}
                                        />
                                    </>
                                );
                            })}
                            {/* <table style={{ border: '1px solid black' }}>
                                <tr>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        S.No
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Team Names
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Idea Submission
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid black',
                                            padding: '1rem'
                                        }}
                                    >
                                        Status
                                    </th>
                                </tr>
                                {this?.props?.ideaStatusDetails?.map(
                                    (idea, i) => {
                                        return (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {i + 1}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.team_name}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.ideaStatus
                                                        ? idea?.ideaStatus
                                                        : 'NOT INITIATED'}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '1rem'
                                                    }}
                                                >
                                                    {idea?.ideaStatus ===
                                                    'SUBMITTED' ? (
                                                        <FaCheckCircle
                                                            size={20}
                                                            color="green"
                                                        />
                                                    ) : (
                                                        <FaTimesCircle
                                                            size={20}
                                                            color="red"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </table> */}
                        </div>
                    </div>
                    <img
                        src={Footerimg}
                        alt="Footerimg"
                        style={{
                            width: '100%',
                            padding: '0'
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default Schoolpdf;
