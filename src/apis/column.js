import axios from '@/utils/Uaxios'
export const getColumn = () => {
  return axios('/category')
}
