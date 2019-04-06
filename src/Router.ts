import { Request, Response, Application } from 'express';

export class Router {
  public routes(app: Application): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'Hello world!'
        });
      });

    app.route('*')
      .get((req: Request, res: Response) => {
        res.status(400).send({
          success: false
        });
      });
  }
}
