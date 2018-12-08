const request = require('supertest');
const app = require('../../app');
const {
  createMockLocation,
  RESOURCE_CREATED_CODE,
  BAD_REQUEST_CODE,
  OK_CODE,
  RESOURCE_DELETED,
  NOT_FOUND,
  NOT_FOUND_ERROR,
} = require('../../../constants');

const server = app.listen();
describe('App', () => {
  afterEach(async () => {
    await server.close();
  });
  describe('POST/ locations/location ', () => {
    it('should create location', async () => {
      const data = createMockLocation();
      delete data.parentLocation;
      const { body, status } = await request(server)
        .post('/api/v1/locations/location')
        .send(data);
      body.data.createdAt = '';
      body.data.updatedAt = '';
      body.data.id = '';
      expect(status).toBe(RESOURCE_CREATED_CODE);
      expect(body).toMatchSnapshot();
    });
    it('should fail to create location', async () => {
      const { body, status } = await request(server)
        .post('/api/v1/locations/location')
        .send();
      expect(status).toBe(BAD_REQUEST_CODE);
      expect(body).toMatchSnapshot();
    });
  });

  describe('PATCH/ locations/:id ', () => {
    it('should update location', async () => {
      const data = createMockLocation();
      delete data.parentLocation;
      const { body } = await request(server)
        .post('/api/v1/locations/location')
        .send(data);
      const update = { maleResidents: 200, femaleResidents: 10 };
      const { body: updatedBody, status } = await request(server)
        .patch(`/api/v1/locations/${body.data.id}`)
        .send(update);
      expect(status).toBe(OK_CODE);
      expect(updatedBody.data.maleResidents).toBe(update.maleResidents);
      expect(updatedBody.data.femaleResidents).toBe(update.femaleResidents);
    });

    it('should return not found', async () => {
      const update = { maleResidents: 200, femaleResidents: 10 };
      const res = await request(server)
        .patch('/api/v1/locations/900000}')
        .send(update);
      expect(res.status).toBe(NOT_FOUND);
      expect(res.body.error.message).toBe(NOT_FOUND_ERROR);
    });
  });

  describe('DELETE/ locations/:id ', () => {
    it('should update location', async () => {
      const data = createMockLocation();
      delete data.parentLocation;
      const { body } = await request(server)
        .post('/api/v1/locations/location')
        .send(data);
      const res = await request(server).delete(
        `/api/v1/locations/${body.data.id}`,
      );
      expect(res.status).toBe(OK_CODE);
      expect(res.body.data.message).toBe(RESOURCE_DELETED);
    });

    it('should return not found', async () => {
      const res = await request(server).delete('/api/v1/locations/  oogjg}');
      expect(res.status).toBe(NOT_FOUND);
      expect(res.body.error.message).toBe(NOT_FOUND_ERROR);
    });
  });

  describe('GET/ locations/:id ', () => {
    it('should update location', async () => {
      const data = createMockLocation();
      delete data.parentLocation;
      const { body } = await request(server)
        .post('/api/v1/locations/location')
        .send(data);
      const res = await request(server).get(
        `/api/v1/locations/${body.data.id}`,
      );
      res.body.data.createdAt = '';
      res.body.data.updatedAt = '';
      res.body.data.id = '';
      expect(res.status).toBe(OK_CODE);
      expect(res.body).toMatchSnapshot();
    });
    it('should return not found', async () => {
      const res = await request(server).get('/api/v1/locations/iidjfjjff}');
      expect(res.status).toBe(NOT_FOUND);
      expect(res.body.error.message).toBe(NOT_FOUND_ERROR);
    });
  });
});
