import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaCode,
  FaHtml5,
  FaJs,
  FaReact,
  FaPause,
  FaNodeJs,
  FaFireAlt,
  FaCarrot,
  FaRocket,
  FaGraduationCap,
  FaCalendar,
} from "react-icons/fa";
import Dangen from "../assets/dangenBanner.png";
import { BiCalendarAlt } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
const timelineEvents = [
  {
    week: 1,
    title: "스터디 소개 및 목표 설정 및 개발 환경 설정",
    icon: <FaCode />,
    description:
      "웹 개발 스터디 소개, 목표 설정, 그리고 개발에 필요한 도구 및 환경 설정",
    iconBg: "black",
  },
  {
    week: 2,
    title: "웹페이지 구성을 위한 HTML & CSS 기초",
    icon: <FaHtml5 />,
    description: "HTML 구조와 CSS 스타일링 기초 학습, 간단한 웹 페이지 제작",
    iconBg: "#F06595",
  },
  {
    week: 3,
    title: "동적인 웹페이지를 위한 JavaScript 기초",
    icon: <FaJs />,
    description: "JavaScript 기본 문법, DOM 조작, 이벤트 처리 등 학습",
    iconBg: "#FAB005",
  },
  {
    week: 4,
    title: "React의 기본 개념 및 구조 이해",
    icon: <FaReact />,
    description: "React 컴포넌트, JSX, state, props 등 기본 개념 학습",
    iconBg: "#4DABF7",
  },
  {
    week: "5~8",
    title: "중간고사 휴강",
    icon: <FaPause />,
    description: "중간고사 기간 동안 스터디 일시 중단",
    iconBg: "#CED4DA",
  },
  {
    week: 9,
    title: "nodejs 및 프론트와 연결",
    icon: <FaNodeJs />,
    description: "Node.js 기초, Express 서버 구축, React 프론트엔드와 연동",
    iconBg: "#69DB7C",
  },
  {
    week: 10,
    title: "firebase 기초",
    icon: <FaFireAlt />,
    description: "Firebase 소개, 인증, 실시간 데이터베이스 사용법 학습",
    iconBg: "#FFA94D",
  },
  {
    week: 11,
    title: "당근마켓 클론",
    icon: <FaCarrot />,
    description: "학습한 내용을 바탕으로 간단한 당근마켓 클론 프로젝트 시작",
    iconBg: "#FF922B",
  },
  {
    week: 12,
    title: "프로젝트 마무리 및 배포",
    icon: <FaRocket />,
    description: "클론 프로젝트 완성 및 웹 호스팅 서비스를 이용한 배포",
    iconBg: "#845EF7",
  },
  {
    week: "13~15",
    title: "기말고사 휴강",
    icon: <FaGraduationCap />,
    description: "기말고사 기간 동안 스터디 마무리 및 향후 학습 방향 논의",
    iconBg: "#CED4DA",
  },
];

const About = () => {
  return (
    <div className="bg-white font-pretendard min-h-screen">
      <div className="px-4 sm:px-6 h-[80vh] lg:px-8 max-w-7xl mx-auto pt-8 lg:pt-32 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex-1 text-center lg:text-left mb-4 lg:mb-0">
            <p className="text-lg text-blue-500 font-bold mb-4 lg:mb-8">
              24-2 FORIF
            </p>
            <h1 className="text-4xl lg:text-6xl text-gray-800 font-pretendard tracking-tighter">
              당근마켓 만들어보며 배우는
            </h1>
            <h1 className="text-4xl lg:text-6xl text-blue-600 font-extrabold tracking-tighter">
              웹 개발 기초
            </h1>
            <p className="text-base mt-4 font-semibold">멘토 | 김승희 신윤수</p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={Dangen}
              alt="Dangen Banner"
              className="w-60 h-60 lg:w-80 lg:h-80 object-contain"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-48 lg:h-96 bg-gradient-to-t from-orange-400 to-white flex items-center justify-start px-4 lg:px-64 mt-8 lg:mt-0">
        <p className="text-2xl lg:text-[3.5rem] items-center flex text-white font-extrabold">
          <BiCalendarAlt className="mr-2" /> 커리큘럼 주차 별 안내
        </p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <VerticalTimeline layout="1-column-left" lineColor="#FF922B">
          {timelineEvents.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                border: "1px solid #FF922B",
                padding: "1.5rem",
              }}
              contentArrowStyle={{ borderRight: "7px solid #FF922B" }}
              date={`${event.week}주차`}
              dateClassName="text-gray-600 font-semibold text-sm sm:text-base"
              iconStyle={{
                background: event.iconBg,
                color: "#fff",
                boxShadow:
                  "0 0 0 4px #FF922B, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)",
              }}
              icon={event.icon}
            >
              <h3 className="vertical-timeline-element-title font-bold text-lg text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <div className="w-full h-48 lg:h-96 bg-gradient-to-t from-orange-400 to-white flex items-center justify-start px-4 lg:px-64 mt-8 lg:mt-0">
        <p className="text-2xl lg:text-[3.5rem] items-center flex text-white font-extrabold">
          <FaPencil /> 수업자료
        </p>
      </div>
      <div className="h-80 flex items-center w-full justify-center">
        <Link
          to={"https://hforif.notion.site/1-4da567c3ca3a413b91077c80cdd37df6"}
          className="text-5xl"
        >
          1주차
        </Link>
      </div>
    </div>
  );
};

export default About;
