import { Accomplishments, Certificates, Education, Experience, Overview, Projects, Skills, Settings } from "@/components/layout/tabs";
import React, { useEffect, createContext, useContext } from "react";
import codersConsultory from '@/assets/projects/codersConsultory.png';
import duckOrGoose from '@/assets/projects/duckOrGoose.png';
import portfolio from '@/assets/projects/portfolio.png';
import rankingApp from '@/assets/projects/rankingApp.png';
import replica from '@/assets/projects/replica.png';
import techEventsManager from '@/assets/projects/techEventsManager.png';

type Props = {
    children?: React.ReactNode;
};

interface Projects {
    id: number,
    projectName: string,
    description: string,
    repositoryUrl: string,
    deploymentUrl: string
    frameworks: string,
    imageUrl: string
}

interface ProjectsContextValue {
    projects: Projects[],
    setProjects: (data: Projects[]) => void
}

const initialProjects: ProjectsContextValue = {
    projects: [
        {
            id: 0,
            projectName: 'Sync web Replica',
            description: 'This was my first project, is a replica of the Sync web app that I created using Javascript vanilla, HTML and CSS. I used the same design and layout as the original app. I also used the same icons and fonts.',
            repositoryUrl: 'https://github.com/adriansunye/syncappreplica',
            deploymentUrl: 'https://syncapprecreation.netlify.app',
            frameworks: 'Javascript, HTML, CSS',  
            imageUrl: replica 
        },
        {
            id: 1,
            projectName: 'Portfolio Visual Studio',
            description: 'This web you are currently visiting is my portfolio. I created it using MERN, Typescript and Material UI. This web was a way to show all my technical skills and my projects.',
            repositoryUrl: 'https://github.com/adriansunye/portfolio-client',
            deploymentUrl: 'none',
            frameworks: 'React, Node, Express, MongoDB',  
            imageUrl: portfolio
        },
        {
            id: 2,
            projectName: 'Duck or Goose',
            description: 'This was a Halloween project. I created this game using vanilla Javascript and Bootstrap. Is a game where a duck chooses someone at random at random from a list of names.',
            repositoryUrl: 'https://github.com/adriansunye/Duck-or-Goose',
            deploymentUrl: 'https://duck-or-goose.netlify.app',
            frameworks: 'Javascript, Bootstrap',  
            imageUrl: duckOrGoose
        },
        {
            id: 3,
            projectName: 'Ranking App',
            description: 'This was my first project using React. I implemented a call to an API to get the data and I used React Router to navigate between the different pages.',
            repositoryUrl: 'https://github.com/adriansunye/rankingapp',
            deploymentUrl: 'https://rankingapp.vercel.app',
            frameworks: 'React, Bootstrap',  
            imageUrl: rankingApp
        },
        {
            id: 4,
            projectName: 'Tech Events Manager',
            description: 'This project was made using only Laravel. I created a CRUD to manage the events and I used the Laravel authentication system to manage the users. I used MySQL to store the data.',
            repositoryUrl: 'https://github.com/adriansunye/tech-events-manager-server',
            deploymentUrl: 'none',
            frameworks: 'Laravel, MySQL, TailwindCSS',  
            imageUrl: techEventsManager 
        },
        {
            id: 5,
            projectName: 'Coders Consultory',
            description: 'This project tries to be a platform where developers can share their knowledge and help other developers. I created this project using REACT and MySQL to store the data.',
            repositoryUrl: 'https://github.com/adriansunye/coders-consultory-client',
            deploymentUrl: 'https://coders-consultory-client.vercel.app',
            frameworks: 'React, MySQL, PHP',  
            imageUrl: codersConsultory
        },
    ],
    setProjects: (data: Projects[]) => {},
}
export const ProjectsContext = React.createContext<ProjectsContextValue>(initialProjects);

export const ProjectsProvider = ({ children }: Props) => {
    const [projects, setProjects] = React.useState<Projects[]>(initialProjects.projects);

    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
};

const useProjects = () => {
    const context = useContext(ProjectsContext);

    if (context === undefined) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
};

export default useProjects;