import React, {FC, useState, useEffect} from 'react';
import Request from '../request/http'

import {Tabs, Spin, Pagination} from "antd"
import ListItem from "./ListItem"
import "../styles/listview.less"

const {TabPane} = Tabs;


interface TopicData {
  page: number,
  limit: number,
  tab?: string
}

const ListView: FC = () => {
  const [results, setResults] = useState<Array<any>>([])
  const [tab, setTab] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const tabs = ["全部", "精华", "分享", "问答", "招聘"]

  useEffect(
    () => {
      if (tab) {
        handlePageChange({page: currentPage, tab, limit: 20})
      }
      else {
        handlePageChange({page: currentPage, limit: 20})
      }
    },
    [currentPage, tab]
  )


  const handlePageChange = (data: TopicData) => {
    Request.getTopics(data)
      .then(({data}: any) => {
        setResults(data.data)
      })
  }

  const handleCurrentChange = (page: number) => {
    setCurrentPage(page)
  }


  const handleTabChange = (key: string) => {
    switch (key) {
      case "1":
        setTab("good")
        setCurrentPage(1)
        break
      case "2":
        setTab("share")
        setCurrentPage(1)
        break
      case "3":
        setTab("ask")
        setCurrentPage(1)
        break
      case "4":
        setTab("job")
        setCurrentPage(1)
        break
      default:
        setTab("")
        setCurrentPage(1)
    }
  }
  if (!results.length) {
    return (
      <div className="listview-container" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Spin size="large"/>
      </div>
    )
  }
  return (
    <div className="listview-container">
      <Tabs style={{background: "#f6f6f6"}} defaultActiveKey="0" onChange={handleTabChange}>
        {
          tabs.map((tab: string, index: any) =>
            <TabPane tab={tab} key={index}>
              {results.map((item: any, index) =>
                <div key={item.id}>
                  <ListItem item={item}/>
                </div>
              )}
            </TabPane>
          )
        }
      </Tabs>
      <Pagination className="list-pagination"
                  defaultCurrent={1}
                  current={currentPage}
                  total={500}
                  onChange={handleCurrentChange}/>
    </div>
  )
}

export default ListView;
