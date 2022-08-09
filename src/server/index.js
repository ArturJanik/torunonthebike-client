import { createServer } from 'miragejs';
import bikelanes from './dummy/bikelanes.json';
import stations from './dummy/stations.json';

export default function () {
  createServer({
    routes() {
      this.urlPrefix = 'http://localhost:3001';

      this.get('/api/bikelanes', () => ([
        [ ...bikelanes ],
        {
          last_changed_at: null,
        },
      ]));

      this.get('/api/stations', () => ({
        stations: [ ...stations ],
        modificationDate: '2021-03-21 12:59:05',
      }));

      this.get('/api/bikelanes/last_modification', () => ({
        last_changed_at: null,
      }));

      this.post('/api/stations/verify_last_modification', () => ({
        upToDate: false,
      }));
    },
  });
}
