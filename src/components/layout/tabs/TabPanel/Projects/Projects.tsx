import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Schema } from 'mongoose';

interface Record {
  _id: Schema.Types.ObjectId
  name: string,
  position: string,
  level: string
}

interface Props {
  record: Record,
  deleteRecord: (_id: string) => void,
}
const Record = ({ record, deleteRecord }: Props) => (
  <tr>
    <td>{record.name}</td>
    <td>{record.position}</td>
    <td>{record.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          deleteRecord(record._id.toString())
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState<any[]>([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/project/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id: String) {
    await fetch(`http://localhost:project/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}