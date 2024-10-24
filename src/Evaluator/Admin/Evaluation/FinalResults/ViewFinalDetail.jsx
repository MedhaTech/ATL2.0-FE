/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import './ViewFinalSelectedideas.scss';
import { Button } from '../../../../stories/Button';
import LinkComponent from '../Pages/LinkComponent';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import RatedDetailCard from '../Pages/RatedDetailCard';
import jsPDF from 'jspdf';
import { FaDownload, FaHourglassHalf } from 'react-icons/fa';
import DetailToDownload from '../../Challenges/DetailToDownload';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import { Col, Container, Row } from 'reactstrap';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ViewDetail = (props) => {
    const { search } = useLocation();
    const level = new URLSearchParams(search).get('level');
    const [teamResponse, setTeamResponse] = React.useState({});
    const { t } = useTranslation();

    // React.useEffect(() => {
    //     if (props?.ideaDetails?.response) {
    //         setTeamResponse(
    //             Object.entries(props?.ideaDetails?.response).map((e) => e[1])
    //         );
    //     }
    // }, [props]);
    console.warn('detail', props);
    useEffect(() => {
        if (props?.ideaDetails) {
            setTeamResponse(props?.ideaDetails);
        }
    }, [props]);
    const [pdfLoader, setPdfLoader] = React.useState(false);
    const downloadPDF = async () => {
        setPdfLoader(true);
        const domElement = document.getElementById('pdfId');
        await html2canvas(domElement, {
            onclone: (document) => {
                document.getElementById('pdfId').style.display = 'block';
            },
            scale: 1.13
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'px', [2580, 3508]);
            pdf.addImage(
                imgData,
                'JPEG',
                20,
                20,
                2540,
                pdf.internal.pageSize.height,
                undefined,
                'FAST'
            );
            pdf.save(`${new Date().toISOString()}.pdf`);
        });
        setPdfLoader(false);
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${
            props?.ideaDetails?.team_name
                ? props?.ideaDetails?.team_name
                : 'temp'
        }_IdeaSubmission`
    });
    const files = teamResponse?.Prototype_file
        ? teamResponse?.Prototype_file.split(',')
        : [];
    const downloadFile = (item) => {
        // const link = document.createElement('a');
        // link.href = item;
        // link.download = 'upload.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        fetch(item)
            .then((response) => {
                // Convert the response to a blob
                return response.blob();
            })
            .then((blob) => {
                // Create a download link
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                const parts = item.split('/');
                link.setAttribute('download', parts[parts.length - 1]);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    };
    const problemSolvingArray = teamResponse?.problem_solving;

    return (
        <div>
            {teamResponse ? (
                <>
                    <div style={{ display: 'none' }}>
                        <DetailToDownload
                            ref={componentRef}
                            ideaDetails={teamResponse}
                            teamResponse={teamResponse}
                            level={'Draft'}
                        />
                    </div>
                    {/* <div id='pdfId' style={{display:'none'}}>
                        <DetailToDownload ideaDetails={props?.ideaDetails} teamResponse={teamResponse} level={level}/>
                    </div> */}
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <Row>
                                        <Col>
                                        <h4 className="mb-md-4 mb-3">
                                                Theme :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails?.theme?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h4>
                                        </Col>
                                        <Col>
                                        <h4 className="mb-md-4 mb-3">
                                                CID :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails.challenge_response_id ||
                                                        ''}
                                                </span>
                                            </h4>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Back to List"
                                            onClick={() =>
                                                props?.setIsDetail(false)
                                            }
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={
                                                props?.currentRow > 1
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            size="small"
                                            label={'Previous'}
                                            onClick={() => props?.handlePrev()}
                                            disabled={props?.currentRow == 1}
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={
                                                props?.dataLength !=
                                                props?.currentRow
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            size="small"
                                            label={'Next'}
                                            onClick={() => props?.handleNext()}
                                            disabled={
                                                props?.dataLength ==
                                                props?.currentRow
                                            }
                                        />
                                    </div>
                                    <div className="mx-2 pointer d-flex align-items-center">
                                        {/* {
                                            !pdfLoader?
                                            <FaDownload size={22} onClick={async()=>{await downloadPDF();}}/>:
                                            <FaHourglassHalf size={22}/>
                                        } */}
                                        {/* <FaDownload
                                            size={22}
                                            onClick={handlePrint}
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <Row className="col-lg-12">
                                        <Col className="md-6">
                                            <Card
                                                bg="light"
                                                text="dark"
                                                className="mb-4"
                                                // style={{ height: '150px' }}
                                            >
                                                  <Card.Body>
                                                    <label
                                                        htmlFor="teams"
                                                        className=""
                                                        style={{fontSize:"16px"}}
                                                    >
                                                          <b>Organization Details</b>
                                                    </label>
                                                    <Card.Text
                                                        style={{
                                                            // fontSize: '30px',
                                                            // fontWeight: 'bold',
                                                            marginTop: '10px',
                                                            marginBottom: '20px'
                                                        }}
                                                    >
                                                        {/* {regInst} */}
                                                        <span>
                                                        Organization Code :
                                                        </span>
                                                        <span>
                                                            &nbsp;
                                                            {
                                                                teamResponse.
                                                                organization_code
                                                                
                                                            }
                                                        </span>
                                                        <br />
                                                        <span>
                                                        Organization Name :
                                                        </span>
                                                        <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse.
                                                                organization_name
                                                            }
                                                        </span>
                                                        <br />
                                                        <span>Place :</span>
                                                        {/* <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse?.place_name
                                                            }
                                                        </span>
                                                        <br />
                                                        <span>Block :</span>
                                                        <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse?.block_name
                                                            }
                                                        </span>{' '}
                                                        <br />
                                                        <span>Taluk :</span>
                                                        <span className="fs-3">
                                                            &nbsp;
                                                            {teamResponse?.taluk_name
                                                                ? teamResponse?.taluk_name
                                                                : '-'}
                                                        </span>{' '}
                                                        <br /> */}
                                                        <span>District :</span>
                                                        <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse?.district
                                                            }
                                                        </span>
                                                        <br/>
                                                        <span>State :</span>
                                                        <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse.state
                                                            }
                                                        </span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            {/* <h2>
                                                <span
                                                    style={{
                                                        color: 'blue'
                                                    }}
                                                >
                                                    Institutions Details:{' '}
                                                </span>
                                                {/* <span className="text-capitalize fs-3">
                                                {props?.ideaDetails?.themes_problem?.problem_statement?.toLowerCase() ||
                                                    ''}
                                            </span> */}
                                            {/* </h2>  */}
                                        </Col>
                                        <Col className="md-6">
                                            <Card
                                                bg="light"
                                                text="dark"
                                                className="mb-4"
                                                style={{ height: '227px' }}
                                            >
                                                 <Card.Body>
                                                    <label
                                                        htmlFor="teams"
                                                        className=""
                                                        style={{fontSize:"16px"}}
                                                    >
                                                        <b>Team Details</b>
                                                    </label>
                                                    <Card.Text
                                                        style={{
                                                            // fontSize: '30px',
                                                            // fontWeight: 'bold',
                                                            marginTop: '10px',
                                                            marginBottom: '20px'
                                                        }}
                                                    >
                                                        {/* {regInst} */}
                                                        <span>Team Name :</span>
                                                        <span >
                                                            &nbsp;
                                                            {
                                                                teamResponse?.team_name
                                                            }
                                                        </span>
                                                        <br />
                                                        <span>
                                                            Team Members :
                                                        </span>
                                                        <span >
                                                            &nbsp;
                                                            {teamResponse &&
                                                                teamResponse.team_members &&
                                                                teamResponse.team_members.join(
                                                                    ', '
                                                                )}
                                                        </span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            {/* <h2>
                                                <span
                                                    style={{
                                                        color: 'blue'
                                                    }}
                                                >
                                                    Institutions Details:{' '}
                                                </span>
                                                {/* <span className="text-capitalize fs-3">
                                                {props?.ideaDetails?.themes_problem?.problem_statement?.toLowerCase() ||
                                                    ''}
                                            </span> */}
                                            {/* </h2>  */}
                                        </Col>
                                    </Row>
                                    {/* <Row className="col-lg-12">
                                        <h2>
                                            <span
                                                style={{
                                                    color: 'blue'
                                                }}
                                            >
                                                Problem Statement :{' '}
                                            </span>
                                            <span className="text-capitalize fs-3">
                                                {props?.ideaDetails?.sub_category?.toLowerCase() ||
                                                    ''}
                                            </span>
                                        </h2>
                                    </Row> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
                        <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            Idea Submission Language
                                            
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5 ">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.language
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            1.Theme
                                            
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.theme
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                           2.Focus Area
                                            {/* {item?.question_no || ''}.{' '}
                                                {item?.question || ''} */}
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.focus_area
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             3. Title of your idea (Think of a proper name. Don't describe
                                                the solution or problem statement here.)
                                           
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.title
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            4. Write down your Problem statement
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.problem_statement}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                              5. List the Causes of the problem
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.causes}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            6. List the Effects of the problem
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.effects}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             7. In which places in your community did you find this problem?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.community}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             8. Who all are facing this problem?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.facing}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                              9. Describe the solution to the problem your team found. Explain
                your solution clearly - how does it work, who is it helping, and
                how will it solve the problem.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             10. Apart from your teacher, how many people/stakeholders did you
                                             speak to to understand or improve your problem or solution?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.stakeholders}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             11. Pick the actions your team did in your problem solving
                                             journey (You can choose multiple options)
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                           {problemSolvingArray}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             12. Mention the feedback that your team got and the changes you
                                             have made, if any, to your problem or solution.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                          {teamResponse.feedback}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                          
                                    <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                        <div
                                            // key={index}
                                            className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                        >
                                            <div className="question quiz mb-0">
                                                <b
                                                    style={{
                                                        fontSize: '1.2rem'
                                                    }}
                                                >
                                                    13. Upload image of your prototype. (total size limit : 10mb)
                                                </b>
                                            </div>
                                            <div className="bg-light rounded p-5">
                                                {files.length > 0 &&
                                                    files.map((item, i) => (
                                                        <div key={i}>
                                                            {/* <CardTitle className="fw-bold">
                                                    {item.question}
                                                </CardTitle> */}
                                                            {/* <CardBody> */}
                                                            <a
                                                                key={i}
                                                                className="badge mb-2 bg-info p-3 ms-3"
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                onClick={() =>
                                                                    downloadFile(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                {item
                                                                    .split('/')
                                                                    .pop()}
                                                            </a>
                                                            {/* </CardBody> */}
                                                        </div>
                                                    ))}
                                                {/* <p
                                        style={{
                                            fontSize: '1.4rem'
                                        }}
                                    >
                                        {teamResponse?.Prototype_file}
                                    </p> */}
                                            </div>
                                        </div>
                                    </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            14. Upload documents & video links of your prototype.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.prototype_link}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            15. Did your team complete and submit the workbook to your
                                            school Guide teacher?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.workbook}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* {teamResponse?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                    >
                                        <div className="question quiz mb-0">
                                            <b
                                                style={{
                                                    fontSize: '1.6rem'
                                                }}
                                            >
                                                {item?.question_no || ''}.{' '}
                                                {item?.question || ''}
                                            </b>
                                        </div>
                                        <div className="bg-light rounded p-5">
                                            <p
                                                style={{
                                                    fontSize: '1.4rem'
                                                }}
                                            >
                                                {item?.question_type ===
                                                'MCQ' ? (
                                                    item?.selected_option?.map(
                                                        (data, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {data || ''}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : item?.question_type ===
                                                      'TEXT' ||
                                                  item?.question_type ===
                                                      'MRQ' ? (
                                                    item?.selected_option
                                                ) : item?.question_type ===
                                                  'DRAW' ? (
                                                    <LinkComponent
                                                        item={
                                                            item.selected_option
                                                        }
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })} */}
                        </div>
                       
                        <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3 status_info_col">
                            <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                                {teamResponse?.evaluation_status ? (
                                    <p
                                        className={`${
                                            teamResponse
                                                ?.evaluation_status ==
                                            'SELECTEDROUND1'
                                                ? 'text-success'
                                                : 'text-danger'
                                        } fs-3 fw-bold text-center`}
                                    >
                                        <span className="fs-3 text-info">
                                            L1:{' '}
                                        </span>
                                        {teamResponse
                                            ?.evaluation_status ==
                                        'SELECTEDROUND1'
                                            ? 'Accepted'
                                            : 'Rejected'}
                                    </p>
                                ) : (
                                    ''
                                )}

                                {teamResponse?.evaluated_name ? (
                                    <p className="text-center">
                                        <span className="text-bold">
                                            Evaluated By:{' '}
                                        </span>{' '}
                                        {teamResponse?.evaluated_name ||
                                            ''}
                                    </p>
                                ) : (
                                    ''
                                )}

                                {teamResponse?.evaluated_at ? (
                                    <p className="text-center">
                                        <span className="text-bold">
                                            Evaluated At:{' '}
                                        </span>{' '}
                                        {moment
                                            .utc(
                                                teamResponse?.evaluated_at
                                            )
                                            .format('DD-MM-YYYY ') || ''}
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                            {level !== 'L1' &&
                                teamResponse?.evaluator_ratings.length >
                                    0 && (
                                    <RatedDetailCard
                                        details={teamResponse}
                                    />
                                )}
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p
                            style={{ fontSize: '1.5rem', margin: '1rem' }}
                            className="fw-bold"
                        >
                            Submitted By :{' '}
                            {teamResponse.initiated_name
                                ? teamResponse.initiated_name
                                : '-'}
                        </p>
                        <p
                            style={{ fontSize: '1.5rem', margin: '1rem' }}
                            className="fw-bold"
                        >
                            Submitted At :{' '}
                            {teamResponse.submitted_at
                                ? moment(teamResponse.submitted_at).format(
                                      'DD-MM-YYYY'
                                  )
                                : '-'}
                        </p>
                    </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <p
                            style={{ fontSize: '1.5rem', margin: '1rem' }}
                            className="fw-bold"
                        >
                            Verified By :{' '}
                            {teamResponse.verified_name
                                ? teamResponse.verified_name
                                : '-'}
                        </p>
                        <p
                            style={{ fontSize: '1.5rem', margin: '1rem' }}
                            className="fw-bold"
                        >
                            Verified At :{' '}
                            {teamResponse.verified_at
                                ? moment(teamResponse.verified_at).format(
                                      'DD-MM-YYYY'
                                  )
                                : '-'}
                        </p>
                    </div>
                    <div>
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Back"
                            onClick={() => {
                                props?.setIsDetail(false);
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h2 className="my-auto text-center mt-5">
                        Details Not Available.
                    </h2>
                    <div className="text-center mt-5">
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Back"
                            onClick={() => {
                                props?.setIsDetail(false);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewDetail;
