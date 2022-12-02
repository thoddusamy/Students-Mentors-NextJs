import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { api } from "../students/students";
import { mentorapi } from "../mentors/mentors";
import { useRouter } from "next/router";
import axios from "axios";
import styles from '../../styles/Home.module.css'

export const getStaticProps = async () => {
    try {
        let student = await axios.get(`${api}`)
        let mentor = await axios.get(`${mentorapi}`)
        return {
            props: {
                student: student.data,
                mentor: mentor.data
            },
            revalidate: 5
        }
    } catch (error) {
        res.statusCode = 404;
        return { props: {} };
    }
}

export default function ChangeMentor({ student, mentor }) {

    const router = useRouter();

    const [mentorId, setMentorId] = useState("");
    const handleMentorChange = (e) => {
        setMentorId(e.target.value);
    };
    const [studentId, setStudentId] = useState("");
    const handleStudentChange = (e) => {
        setStudentId(e.target.value);
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
            // function to change mentor for a student in axios API
            await axios.put(`${api}/${data.id}`, data1)
            router.push("/history")
        }
    };

    const style = {
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: "1px",
    }

    return (
        <div className={styles.changementorfromcontrol}>
            <h4 className={styles.addmentorcentent}>Change mentor</h4>
            <FormControl className={styles.changementorform} variant="standard">
                <InputLabel id="demo-simple-select-standard-label" style={style}>Select Student</InputLabel>
                <Select style={style}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select"
                    value={studentId}
                    label="Select Student"
                    onChange={handleStudentChange}
                >
                    {student.map((e, index) => (
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
                    {mentor.map((e, index) => (
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
                Change Mentor
            </Button>
        </div>
    );
}