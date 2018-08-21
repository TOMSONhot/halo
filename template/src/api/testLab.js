import http from './http';

const testLab = {
  list(params) {
    return http.get('/front/userWidget/', params);
  },
  addTool(params) {
    return http.post('/front/toolbar/save', params);
  }
};
export default testLab;
