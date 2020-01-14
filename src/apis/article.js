import axios from '@/utils/Uaxios'
export const articleList = (params) => {
  return axios({
    url: `/post`,
    params
  })
}

export const articlePublish = data => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
