import axios from 'axios'

axios.defaults.baseURL = "https://cnodejs.org/api/v1"


const Url = {
  getTopics: "/topics",
  getDetail: "/topic/",
  getUserInfo: "/user/"
};

const Request = {
  getTopics(data: object) {
    return new Promise((resolve, reject) => {
      axios.get(Url.getTopics, {
        params: data
      })
        .then((res: object) => {
          resolve(res)
        })
    })
  },
  getDetail(id: string) {
    return new Promise((resolve, reject) => {
      axios.get(Url.getDetail + id)
        .then((res: object) => {
          resolve(res)
        })
    })
  },
  getUserInfo(username: string) {
    return new Promise((resolve, reject) => {
      axios.get(Url.getUserInfo + username)
        .then((res: object) => {
          resolve(res)
        })
    })
  }
}

export default Request;
