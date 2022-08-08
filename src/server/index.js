import { createServer } from 'miragejs';
import bikelanes from './dummy/bikelanes.json';

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
      this.get('/api/bikelanes/last_modification', () => ({
        last_changed_at: null,
      }));
    },
  });
}
