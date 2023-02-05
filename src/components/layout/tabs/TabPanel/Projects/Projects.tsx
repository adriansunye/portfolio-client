import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Schema } from 'mongoose';

interface Project {
  _id: Schema.Types.ObjectId
  projectName: string,
  description: string,
  repositoryUrl: string
}

interface Props {
  project: Project
}
const Project = ({ project }: Props) => (
  <tr>
    <td>{project.projectName}</td>
    <td>{project.description}</td>
    <td>{project.repositoryUrl}</td>
  </tr>
);

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "projects/all");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const projects = await response.json();
      setProjects(projects);
    }

    getProjects();

    return;
  }, [projects.length]);

  // This method will map out the records on the table
  function projectList() {
    return projects.map((project) => {
      return (
        <Project
          project={project}
          key={project._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>{projectList()}</tbody>
      </table>
    </div>
  );
}