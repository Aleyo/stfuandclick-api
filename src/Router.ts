import { Request, Response, Application } from 'express';

import { ClickController } from './controller/ClickController';

export class Router {

  private clickController: ClickController = new ClickController();

  public routes(app: Application): void {
    app.route('/klik')
      .post(this.clickController.addClick);

    app.route('*')
      .get((req: Request, res: Response) => {
        res.status(400).send({
          success: false
        });
      });
  }

}
