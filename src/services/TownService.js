/* eslint-disable arrow-parens */
import httpService from './httpService';

const getTowns = async (offset = 0, size = 25, search = '') => {
  const { data } = await httpService.get(`/towns?offset=${offset}&size=${size}&search=${encodeURIComponent(search)}`);
  return data;
};

const getTown = async (id) => {
  const { data } = await httpService.get(`/towns/${id}`);
  return data;
};

const createTown = async (town) => {
  const { data } = await httpService.post('/towns', town);
  return data;
};

const updateTown = async (town, id) => {
  const { data } = await httpService.put(`/towns/${id}`, town);
  return data;
};

const deleteTown = (id) => httpService.delete(`/towns/${id}`);

export default {
  createTown,
  getTowns,
  updateTown,
  deleteTown,
  getTown,
};
