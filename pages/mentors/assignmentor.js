import React, { useEffect, useState } from "react";
import { api } from "../students/students";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mentorapi } from "../mentors/mentors";
import { useRouter } from "next/router";
import axios from "axios";
import styles from '../../styles/Home.module.css'

export const getStaticProps = async () => {
    try {
        let studentRes = await fetch(`${api}`)
        let mentorRes = await fetch(`${mentorapi}`)
        let studentData = await studentRes.json()
        let mentorData = await mentorRes.json()
        return {
            props: {
                mentors: mentorData,
                students: studentData
            },
            revalidate: 5
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                mentors: [],
                students: []
            }
        }
    }
}

export default function AssignMentor({ mentors, students }) {

    const router = useRouter();

    const [mentorId, setMentorId] = useState("");
    const handleMentorChange = (event) => {
        setMentorId(event.target.value);
    };
    const [studentId, setStudentId] = useState("");
    const handleStudentChange = (event) => {
        setStudentId(event.target.value);
    };

    const changeMentor = async () => {
        if (studentId === "") {
            alert("please select a student");
        } else if (mentorId === "") {
            alert("please select a mentor");
        } else {
            const data = {
                id: studentId,
            };

            const data1 = {
                mentorId: mentorId,
            };
            await axios.put(`${api}/${data.id}`, data1)
            router.push("/history")
        }
    };

    let unassignedstudents = students?.filter((student) => !student.mentorId).map((s) => s);

    const style = {
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: "1px",
    }

    return (
        <div className={styles.changementorfromcontrol}>
            <h4 className={styles.addmentorcentent}>Assign Mentor</h4>
            <FormControl className={styles.changementorform} variant="standard">
                <InputLabel id="demo-simple-select-standard-label" style={style}>Select Student</InputLabel>
                <Select style={style}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select"
                    value={studentId}
                    label="Select Student"
                    onChange={handleStudentChange}
                >
                    {unassignedstudents?.map((e, index) => (
                        <MenuItem value={e._id} key={index} style={style}>
                            {" "}
                            {e.name} {e.surname}{" "}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label" style={style}>Select Mentor</InputLabel>
                <Select style={style}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select"
                    value={mentorId}
                    label="Select Mentor"
                    onChange={handleMentorChange}
                >
                    {mentors?.map((e, index) => (
                        <MenuItem value={e.mentorId} key={index} style={style}>
                            {e.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button className={styles.button}
                id="changeMentor"
                onClick={changeMentor}
                variant="outlined"
                color="primary"
            >
                Assign Mentor
            </Button>
        </div>
    );
}