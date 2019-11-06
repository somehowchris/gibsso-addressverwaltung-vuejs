import httpService from './httpService';

const exposeData = async (axiosPromise) => {
  const { data } = await axiosPromise;
  return data;
};
const loadPerson = async (id, filter) => {
  const data = await exposeData(httpService.post(`/people/search/${id ? id : ''}`, filter));
  if (id === undefined && data.next !== undefined) {
    return loadPerson(data.next, filter);
  }
  return data;
};


export default {
  loadPerson,
};
