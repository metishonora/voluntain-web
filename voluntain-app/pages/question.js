import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Typography from '@material-ui/core/Typography';
import { url } from '../config/next.config' //url 가져오기

import { Divider } from '@material-ui/core'
import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { DiscussionEmbed } from "disqus-react"

export default function Page( { titles } ) {
    const disqusShortname = "voluntain-skku"
    const disqusConfig = {
        url: "https://localhost:3000/question",
        //identifier: course.lectures[lectureId].id, // Single post id
        title: "Question for everything" // Single post title
    }

    return (
        <div className={styles.container}>
            <NavigationBar titles={titles}/>
            <MainBanner/>
        {/*Q&A section*/} 
        <main className={styles.main}>
          {/*Q&A 타이틀 */}
            <Typography component="h1" variant="h2" align="center" color="textPrimary">
              Q&A
            </Typography>
            <Divider style={{ margin: 15, width: '5%', background: '#ffffff', borderTop: 'thin solid black' }} />
            {/*Q&A 문구 */}
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              If you have any questions, feel free to ask!
            </Typography>
        
            <br></br>
            {/*DISQUS 댓글 section */}
            <div style={{ width: 900, height: 90, alignItems: 'center' }}>
                <DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                />
            </div>
        </main>
        </div>
    )
}

// {url}/courses/title에 GET Request 보내 course title list 받아오기(id, title)
export const getStaticProps = async () => {

  const data0 = await fetch(`${url}/courses/title`);
  const titles = await data0.json();

  return {
    props: {  titles },
    revalidate: 1,
  };
};