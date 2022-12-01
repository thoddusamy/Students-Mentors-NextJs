import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { mentorapi } from "../mentors/mentors";
import axios from "axios";
import styles from '../../styles/Home.module.css'

export const formValidationSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(1, "Need a longer name 😄"),

    email: yup
        .string()
        .required("Email is required")
        .min(1, "Need a longer email 😄"),

    mentorId: yup
        .string()
        .required("MentorId is required")
        .min(2, "Need a longer mentorId 😄"),
});

export default function Addmentor() {

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mentorId: "",
        },
        validationSchema: formValidationSchema,
        onSubmit: (newdata) => addmentor(newdata),
    });

    const addmentor = async (newdata) => {
        try {
            await axios.post(`${mentorapi}`, [newdata])
            router.push("/mentors/mentors")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h4 className={styles.addmentorcentent}>Add new mentor</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.form}>
                    <TextField
                        label="Mentor Name"
                        variant="standard"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name}
                        helperText={
                            formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : ""
                        }
                    />
                    <TextField
                        label="Mentor Email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="standard"
                        error={formik.touched.email && formik.errors.email}
                        helperText={
                            formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""
                        }
                    />

                    <TextField
                        label="MentorId"
                        id="mentorId"
                        name="mentorId"
                        value={formik.values.mentorId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="standard"
                        error={formik.touched.mentorId && formik.errors.mentorId}
                        helperText={
                            formik.touched.mentorId && formik.errors.mentorId
                                ? formik.errors.mentorId
                                : ""
                        }
                    />

                    <Button variant="outlined" className={styles.button} type="submit">
                        Add mentor
                    </Button>
                </div>
            </form>
        </div>
    );
}