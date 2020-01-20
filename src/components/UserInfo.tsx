import React, {FC, useState, useEffect} from 'react';
import Request from '../request/http'
import {useParams, Link, useHistory} from "react-router-dom";
import {Row, Col, Spin} from "antd"
import Timer from "./Timer"
import "../styles/userInfo.less"

const UserInfo: FC = () => {
  let {username}: any = useParams()
  const Location = useHistory()
  const [userInfo, setUserInfo] = useState<any>({})
  useEffect(() => {
    Request.getUserInfo(username)
      .then(({data}: any) => {
        setUserInfo(data.data)
      })

  }, [username])

  const toArtical = ( id: string) => {
    Location.push(`/artical/${id}`)
  }
  if (!userInfo.loginname) {
    return (
      <div className="userInfo-container" style={{textAlign: "center"}}>
        <Spin size="large"/>
      </div>
    )
  }
  return (
    <div className="userInfo-container">
      <Row style={{background: "white"}}>
        <Col style={{background: "#cfcfcf"}}>
          <h3>个人主页</h3>
        </Col>
        <Col span={24}>
          <img src={userInfo.avatar_url} alt={userInfo.loginname}/>
          {userInfo.loginname}
        </Col>

        <Col span={24} className="info">
          {userInfo.score}积分
        </Col>
        <Col span={24} className="info">
          注册时间： {Timer(userInfo.create_at)}
        </Col>
      </Row>

      <Row className="topics">
        <Col style={{background: "#cfcfcf"}}>
          <h3>创建的主题</h3>
        </Col>

        {
          userInfo.recent_topics && userInfo.recent_topics.slice(0, 5).map((topic: any) =>
            <Col className="title"
                 key={topic.id}
                 span={24}
                 onClick={() => toArtical(topic.id)}>
              {topic.title}
            </Col>
          )
        }
      </Row>

      <Row className="topics">
        <Col style={{background: "#cfcfcf"}}>
          <h3>回复的主题</h3>
        </Col>
        {
          userInfo.recent_replies && userInfo.recent_replies.slice(0, 5).map((topic:any) =>
            <Col className="title"
                 key={topic.id} span={24}
                 onClick={() => toArtical(topic.id)}>
              {topic.title}
            </Col>
          )
        }
      </Row>
    </div>
  )
}


export default UserInfo
