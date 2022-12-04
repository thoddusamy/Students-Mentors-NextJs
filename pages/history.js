import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from "@mui/material/Tooltip";
import { api } from "./students/students";
import { mentorapi } from "./mentors/mentors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";

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

export default function History({ mentors, students }) {

    const router = useRouter()

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`${api}/${id}`)
            router.push('/history')
        } catch (error) {
            console.log(error);
        }
    };

    const style = {
        fontFamily: "Fuzzy Bubbles",
        letterSpacing: "1px",
        fontWeight: "900",
    };

    return (
        <div className={styles.table}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={style}>S.no</TableCell>
                            <TableCell align="center" style={style}>
                                Name
                            </TableCell>
                            <TableCell align="center" style={style}>
                                Surname
                            </TableCell>
                            <TableCell align="center" style={style}>
                                Email
                            </TableCell>
                            <TableCell align="center" style={style}>
                                Mentor
                            </TableCell>
                            <TableCell align="center" style={style}>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students?.map(({ name, surname, email, mentorId, _id }, index) => (
                            <Student
                                key={index}
                                name={name}
                                surname={surname}
                                email={email}
                                mentorid={mentorId}
                                mentors={mentors}
                                // delete
                                deleteButton={
                                    <Tooltip title="Delete">
                                        <IconButton
                                            aria-label="delete"
                                            style={{ marginLeft: "auto" }}
                                            onClick={() => {
                                                deleteStudent(_id);
                                            }}
                                            color="error"
                                        >
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                id={_id}
                                index={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

function Student({ name, surname, email, mentorid, deleteButton, index, mentors }) {
    const style = {
        fontFamily: "Fuzzy Bubbles",
        letterSpacing: "2px",
        fontWeight: "600",
    };
    const num = index + 1;

    const mentorname = mentors?.filter((mentor) => mentor.mentorId === mentorid).map((mentor) => mentor.name);

    return (
        <>
            <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell style={style} component="th" scope="row">
                    {num}
                </TableCell>
                <TableCell style={style} align="center">
                    {name}
                </TableCell>
                <TableCell style={style} align="center">
                    {surname}
                </TableCell>
                <TableCell style={style} align="center">
                    {email}
                </TableCell>
                <TableCell style={style} align="center">
                    {mentorname?.length !== 0 ? mentorname : "Mentor not assigned"}
                </TableCell>
                <TableCell style={style} align="center">
                    {deleteButton}
                </TableCell>
            </TableRow>
        </>
    );
}