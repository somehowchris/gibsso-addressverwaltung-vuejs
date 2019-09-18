import httpService from './httpService';

const getCountries = async () => {
  const { data } = await httpService.get('/countries');
  return data.map(el => ({ ...el, selected: false }));
};

const createCountry = async (name) => {
  const { data } = await httpService.post('/countries', { name });
  return { ...data, selected: false };
};

const updateCountry = async (country, id) => {
  const { data } = await httpService.put(`/countries/${id}`, country);
  return { ...data, selected: false };
};

const deleteCountry = (id) => {
  return httpService.delete(`/countries/${id}`);
};

export default {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};
