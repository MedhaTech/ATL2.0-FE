export const ADMIN_LOGIN_USER = "ADMIN_LOGIN_USER";
export const ADMIN_LOGIN_USER_SUCCESS = "ADMIN_LOGIN_USER_SUCCESS";
export const ADMIN_LOGIN_USER_ERROR = "ADMIN_LOGIN_USER_ERROR";
export const GET_STATES = "GET_STATES";
export const GET_FETCHDIST = "GET_FETCHDIST";

export const GET_TEACHERS_BY_ID = "GET_TEACHERS_BY_ID";
export const TEACHER_LOGIN_USER = "TEACHER_LOGIN_USER";
export const TEACHER_LOGIN_USER_SUCCESS = "TEACHER_LOGIN_USER_SUCCESS";
export const TEACHER_LOGIN_USER_ERROR = "TEACHER_LOGIN_USER_ERROR";
export const toggle_header = "toggle_header";
export const Layoutstyle_data = "Layoutstyle_data";

export const TEACHER_COURSES_DETAILS = "TEACHER_COURSES_DETAILS";
export const TEACHER_COURSES_ATTACHMENTS = "TEACHER_COURSES_ATTACHMENTS";
export const TEACHER_COURSES_DETAILS_SUCCESS =
  "TEACHER_COURSES_DETAILS_SUCCESS";
export const TEACHER_COURSES_DETAILS_ERROR = "TEACHER_COURSES_DETAILS_ERROR";

export const COORDINATOR_LOGIN_USER = "COORDINATOR_LOGIN_USER";
export const COORDINATOR_LOGIN_USER_SUCCESS = "COORDINATOR_LOGIN_USER_SUCCESS";
export const COORDINATOR_LOGIN_USER_ERROR = "COORDINATOR_LOGIN_USER_ERROR";

export const ADMIN_COURSES_DETAILS = "ADMIN_COURSES_DETAILS";
export const ADMIN_COURSES_DETAILS_SUCCESS = "ADMIN_COURSES_DETAILS_SUCCESS";
export const ADMIN_COURSES_DETAILS_ERROR = "ADMIN_COURSES_DETAILS_ERROR";

export const EVALUATOR_LOGIN_USER = "EVALUATOR_LOGIN_USER";
export const EVALUATOR_LOGIN_USER_SUCCESS = "EVALUATOR_LOGIN_USER_SUCCESS";
export const EVALUATOR_LOGIN_USER_ERROR = "EVALUATOR_LOGIN_USER_ERROR";
export const GET_SUBMITTED_IDEA_LIST = "GET_SUBMITTED_IDEA_LIST";
export const GET_INSTRUCTIONS = "GET_INSTRUCTIONS";
export const GET_L1_EVALUATED_IDEA = "GET_L1_EVALUATED_IDEA";
export const EVALUATOR_ADMIN_LOGIN_USER = "EVALUATOR_ADMIN_LOGIN_USER";
export const EVALUATOR_ADMIN_LOGIN_USER_SUCCESS =
  "EVALUATOR_ADMIN_LOGIN_USER_SUCCESS";
export const EVALUATOR_ADMIN_LOGIN_USER_ERROR =
  "EVALUATOR_ADMIN_LOGIN_USER_ERROR";
export const UPDATAE_EVALUATOR = "UPDATE_EVALUATOR";

export const GET_TEACHERS = "GET_TEACHERS";
export const MENTORS_GET_SUPPORT_TICKETS = "MENTORS_GET_SUPPORT_TICKETS";
export const MENTORS_GET_SUPPORT_TICKETS_BY_ID =
  "MENTORS_GET_SUPPORT_TICKETS_BY_ID";
export const MENTORS_GET_SUPPORT_TICKETS_RESPONSES_BY_ID =
  "MENTORS_GET_SUPPORT_TICKETS_RESPONSES_BY_ID";
export const MENTORS_SUPPORT_TICKETS_STATUS = "MENTORS_SUPPORT_TICKETS_STATUS";

export const GET_TEACHERS_PRESURVEY_STATUS = "GET_TEACHERS_PRESURVEY_STATUS";
export const MENTORS_CREATE = "MENTORS_CREATE";
export const MENTORS_CREATE_SUCCESS = "MENTORS_CREATE_SUCCESS";
export const MENTORS_CREATE_ERROR = "MENTORS_CREATE_ERROR";
export const MENTORS_LIST = "MENTORS_LIST";
export const MENTORS_LIST_SUCCESS = "MENTORS_LIST_SUCCESS";
export const MENTORS_LIST_ERROR = "MENTORS_LIST_ERROR";
export const MENTORS_DELETE = "MENTORS_DELETE";
export const MENTORS_DELETE_SUCCESS = "MENTORS_DELETE_SUCCESS";
export const MENTORS_DELETE_ERROR = "MENTORS_DELETE_ERROR";
export const MENTORS_LANGUAGE = "MENTORS_LANGUAGE";
export const MENTORS_EDIT = "MENTORS_EDIT";
export const MENTORS_EDIT_SUCCESS = "MENTORS_EDIT_SUCCESS";
export const MENTORS_EDIT_ERROR = "MENTORS_EDIT_ERROR";
export const TEAM_LOGIN_USER = "TEAM_LOGIN_USER";

export const TEAM_LOGIN_USER_SUCCESS = "TEAM_LOGIN_USER_SUCCESS";
export const TEAM_LOGIN_USER_ERROR = "TEAM_LOGIN_USER_ERROR";
export const ADMIN_TEAMS_LIST = "ADMIN_TEAMS_LIST";
export const ADMIN_TEAMS_LIST_SUCCESS = "ADMIN_TEAMS_LIST_SUCCESS";
export const ADMIN_TEAMS_LIST_ERROR = "ADMIN_TEAMS_LIST_ERROR";
export const ADMIN_TEAMS_MEMBERS_LIST = "ADMIN_TEAMS_MEMBERS_LIST";
export const ADMIN_TEAMS_MEMBERS_LIST_SUCCESS =
  "ADMIN_TEAMS_MEMBERS_LIST_SUCCESS";
export const ADMIN_TEAMS_MEMBERS_LIST_ERROR = "ADMIN_TEAMS_MEMBERS_LIST_ERROR";
export const TEAM_MEMBER_STATUS = "TEAM_MEMBER_STATUS";
export const TEAM_MEMBER_STATUS_ERROR = "TEAM_MEMBER_STATUS_ERROR";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';


export * from "../Team/store/action";
export * from './students/actions';
export * from "../Teacher/store/mentors/actions";
export * from "../Coordinators/store/Coordinator/actions";
export * from "../Admin/store/admin/actions";
export * from "./studentRegistration/actions";
export * from "../Teacher/store/teacher/actions";
export * from "../Evaluator/store/evaluator/action";
export * from "../Teacher/store/teams/actions";
export * from "../Admin/Courses/store/adminCourses/actions";
export * from "../Teacher/store/courses/actions";
