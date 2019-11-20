import httpService from './httpService';

const exposeData = async (axiosPromise) => {
  const { data } = await axiosPromise;
  return data;
};
const loadPerson = async (id, filter) => {
  const data = await exposeData(httpService.post(`/people/search/${id || ''}`, filter));
  return {
    ...data,
    person: data.person
      ? { ...data.person, country: data.person.country || {}, town: data.person.town || {} }
      : {},
  };
};

const savePerson = async person => exposeData(httpService.post('/people/', person));

const updatePerson = async (id, person) => exposeData(httpService.put(`/people/${id}`, person));

const deletePerson = async id => httpService.delete(`/people/${id}`);


export default {
  loadPerson,
  savePerson,
  updatePerson,
  deletePerson,
};
