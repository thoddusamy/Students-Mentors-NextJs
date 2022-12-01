import React from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'

const Home = () => {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>NextJs App</title>
      </Head>
      <h1 className={styles.homepagetitle}>Welcome to Mentor and Student Assigning</h1>
      <div className={styles.list}>
        <div>
          <p>
            I. This Web App can be used to view the overall data of Mentors and
            Students Information.
          </p>
          <p>II. A new mentor and a new student can be added to the database</p>
          <p>III. For a selected Student mentor can be changed</p>
          <p>IV. For Students without mentors, mentors can be assigned easily.</p>
          <p>
            V. For a selected Mentor, pst of students assigned can be displayed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home