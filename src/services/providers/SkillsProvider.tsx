import React, { useEffect, createContext, useContext } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material";
import react from '@/assets/skills/react.png';
import php from '@/assets/skills/php.png';
import mern from '@/assets/skills/mern.png';
import laravel from '@/assets/skills/laravel.png';
import mysql from '@/assets/skills/mysql.png';
import mongodb from '@/assets/skills/mongodb.png';
import tailwind from '@/assets/skills/tailwind.png';
import bootstrap from '@/assets/skills/bootstrap.png';
import docker from '@/assets/skills/docker.png';
import jira from '@/assets/skills/jira.png';
import aws from '@/assets/skills/aws.png';
import figma from '@/assets/skills/figma.png';
import htmljscss from '@/assets/skills/htmljscss.png';
import git from '@/assets/skills/git.png';
import mui from '@/assets/skills/mui.png';
import ts from '@/assets/skills/ts.png';
import tdd from '@/assets/skills/tdd.png';
import scrum from '@/assets/skills/scrum.png';

type Props = {
    children?: React.ReactNode;
};

interface SkillsData {
    id: number,
    name: string,
    image: string,
    experience: string,
}

interface SkillsDataContextValue {
    skills: SkillsData[],
    setSkills: (data: SkillsData[]) => void
}
const initialSkillsData: SkillsDataContextValue = {
    skills: [
        {
            id: 0,
            name: 'React',
            experience: 'React is the environment in wich I have the most experience. I have used it for the development of this website.',
            image: react,
        },
        {
            id: 1,
            name: 'MERN',
            experience: 'I don\'t have much experience with MERN, but I have used it to learn in this app to understand how works Node as a backend.',
            image: mern,
        },
        {
            id: 2,
            name: 'PHP',
            experience: 'I have used PHP to learn how POO oriented languages work and to learn how front-end applications interact with the backend.',
            image: php, 
        },
        {
            id: 3,
            name: 'Laravel',
            experience: 'I have used Laravel to learn how to use a framework in PHP. I created a web app to manage events from a organization.',
            image: laravel, 
        },
        {
            id: 4,
            name: 'MYSQL',
            experience:  'I have used MYSQL to learn how to use a database in PHP. and to understan how relational databases work.',
            image: mysql, 
        },
        {
            id: 5,
            name: 'MongoDB',
            experience:  'I builded the backend of this app using MongoDB. I have used it to learn how to use a NoSQL database.',
            image: mongodb, 
        },
        {
            id: 6,
            name: 'tailwindcss',
            experience:  'I used tailwind multiple times as a CSS framework. I prefer it over bootstrap because it is more customizable and it is easier to use.',
            image: tailwind, 
        },
        {
            id: 7,
            name: 'bootstrap',
            experience: 'Even though I prefer tailwind, I have used bootstrap multiple times to create responsive websites and I have a vast knowledge of it.',
            image: bootstrap, 
        },
        {
            id: 8,
            name: 'MaterialUI',
            experience: 'Is my favorite UI library. I have used it to create this website and I enjoy tweaking it to make it look better.',
            image: mui, 
        },
        {
            id: 9,
            name: 'html - js - css',
            experience: 'Vanilla js is the basics from wich I started to learn web development.',
            image: htmljscss, 
        },
        {
            id: 10,
            name: 'Typescript',
            experience: 'I am currently learning Typescript. I have used it to create this website and I am seeig the potencial to combine it with Test Driven Development',
            image: ts, 
        },
        {
            id: 11,
            name: 'TDD',
            experience: 'I am learning TDD to improve my code quality and to learn how to write better code.',
            image: tdd, 
        },
        {
            id: 12,
            name: 'git',
            experience: 'All my projects are hosted in github. I have used git to manage my projects and to learn how to work with a team.',
            image: git, 
        },
        {
            id: 13,
            name: 'Agile - scrum',
            experience: 'Almost all my projects have been developed using the scrum methodology.',
            image: scrum, 
        },
        {
            id: 14,
            name: 'jira',
            experience: 'I have used jira to manage my projects and work with my team.',
            image: jira, 
        },
        {
            id: 15,
            name: 'figma',
            experience: 'Although I prefer to code, I have used figma and I have a basic knowledge of it.',
            image: figma, 
        },
        {
            id: 16,
            name: 'docker',
            experience: 'I have used docker a few times to create a better development environment.',
            image: docker, 
        },
        {
            id: 17,
            name: 'aws',
            experience: 'I am currently learning how to use AWS to host my projects.',
            image: aws, 
        },
       
       
    ],
    setSkills: (data) => {},
}
export const SkillsContext = React.createContext<SkillsDataContextValue>(initialSkillsData)

export const SkillsProvider = ({ children }: Props) => {
    const [skills, setSkills] = React.useState<SkillsData[]>(initialSkillsData.skills);

    return (
        <SkillsContext.Provider value={{ skills, setSkills }}>
            {children}
        </SkillsContext.Provider>
    );
};

const useSkills = () => {
    const context = useContext(SkillsContext);

    if (context === undefined) {
        throw new Error("useSkills must be used within a SkillsProvider");
    }
    return context;
};

export default useSkills;