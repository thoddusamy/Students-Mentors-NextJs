import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mentorapi } from "../mentors/mentors";
import { api } from "../students/students";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

export default function FindByMentor({ color, mentors, students }) {

    const [filterStudents, setFilterStudents] = useState([]);

    const [mentorId, setMentorId] = useState("");
    const handleMentorChange = (e) => {
        setMentorId(e.target.value);
    };

    const findByMentor = async () => {
        if (mentorId === "") {
            alert("please select a mentor");
        } else {
            setFilterStudents(students.filter((e) => e.mentorId === mentorId));
        }
    };

    const style = {
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: "1px",
    }

    return (
        <div style={{ marginTop: "90px" }}>
            <div className={styles.findmentorfromcontrol}>
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
                <Button
                    className={styles.button}
                    id="findStudents"
                    onClick={findByMentor}
                    variant="outlined"
                    color="primary"
                >
                    Find Students
                </Button>
            </div>

            {filterStudents?.length !== 0 ? (
                <div className={styles.table}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style}>S.no</TableCell>
                                    <TableCell style={style} align="center">Name</TableCell>

                                    <TableCell style={style} align="center">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterStudents?.map(
                                    ({ name, surname, email, mentorId, _id }, index) => (
                                        <FilterStudents
                                            key={index}
                                            name={name}
                                            surname={surname}
                                            email={email}
                                            mentorid={mentorId}
                                            color={color}
                                            id={_id}
                                            index={index}
                                        />
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

function FilterStudents({ name, surname, email, color, index }) {
    const num = index + 1;
    const style = {
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: "1px",
    }
    return (
        <>
            <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell style={style} component="th" scope="row">
                    {num}
                </TableCell>
                <TableCell style={style} align="center">{name + " " + surname}</TableCell>
                <TableCell style={style} align="center">{email}</TableCell>
            </TableRow>
        </>
    );
}