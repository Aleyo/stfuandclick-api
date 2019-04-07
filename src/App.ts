import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import config from 'mikro-config';
import { Router } from './Router';

class App {

  public app: express.Application = express();
  public router: Router = new Router();

  constructor() {
    this.config();
    this.mongoSetup();
    this.router.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use((err, req, res, next) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }

      next();
    });
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`, { useNewUrlParser: true });
  }

}

export default new App().app;
