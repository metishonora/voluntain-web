import React from 'react'
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden';
import { useCookies } from 'react-cookie'

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { Comment } from '../components/Comment'
import { LectureText } from '../components/LectureText'
import { SideBar } from '../components/SideBar'

export default function Page() {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
  const handleVideoEnd = () => {
    if (cookies.noCookie === undefined)
      setCookie('videoEnd', 1, { path: '/', maxAge: 31536000 });
  }
  const handleVideoStart = () => {
    if (cookies.noCookie == undefined) {
      setCookie('courseId', 1, { path: '/', maxAge: 31536000 });
      setCookie('lectureId', 1, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
    }
  }

  return (
    <div>
      <div className="Body">
        <h3>courseId: {cookies.courseId} // lectureID: {cookies.lectureId} // videoEnd: {cookies.videoEnd}</h3>

        <div className="RightSide" style={{ float: 'left', margin: 10 }}>
          <div className="LectureTitle" style={{ margin: 10 }}>
            <h1>Lecture 1</h1>
          </div>

          <div className="Buttons" style={{ marginBottom: 70 }}>
            <div style={{ float: 'left' }}><Button variant="light">{'< Prev'}</Button></div>

            <div style={{ float: 'right' }}><Button variant="dark">{'Next >'}</Button></div>
          </div>

          <div className="Player" style={{ clear: 'both' }}>
            <VideoPlayer videoId='_9RvpFdUQr0' startChecker={handleVideoStart} endChecker={handleVideoEnd} />
          </div>

          <div>
            <LectureText
              title="This course is ..."
              content="for beginners. Try it!"
            />
            <Divider style={{ background: 'black' }} variant='middle' />
            <LectureText
              title="Exercise "
              content="Do this exercise!"
            />
          </div>

          <div className="Comment">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  )
}
