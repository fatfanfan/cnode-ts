import React, {FC, useState, useEffect} from 'react';
import Request from '../request/http'

import "../styles/listItem.less"
import {
  Link
} from "react-router-dom";

import Timer from "./Timer"
import Types from "./Types"






const  ListItem: FC<any> = ({item}) => {
  return <div className="listItem-container" key={item.id}>
    <Link className="avatar_wrapper" to={`/user/${item.author.loginname}`}>
      <img className="avatar"
           src={item.author.avatar_url}
           alt=""/>
    </Link>

    <Types item={ item }/>
    <span style={{paddingRight: "10px"}}>
        {item.reply_count}/{item.visit_count}
      </span>
    <Link className="title" to={`/artical/${item.id}`} style={{color: "black"}}>
      {item.title}
    </Link>
    <div style={{marginLeft:"auto",marginRight:"5px", minWidth:"50px"}}>
      {Timer(item.last_reply_at)}
    </div>
  </div>
}


export default ListItem;
