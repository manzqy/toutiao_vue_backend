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

export const articleDetail = id => {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

export const articleEdit = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_update/${id}`,
    data
  })
}
