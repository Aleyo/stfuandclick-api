import { Request, Response, Application } from 'express';

import { ClickController } from './controller/ClickController';
import { LeaderboardController } from './controller/LeaderboardController';

export class Router {

  private clickController: ClickController = new ClickController();
  private leaderboardController: LeaderboardController = new LeaderboardController();

  public routes(app: Application): void {
    app.route('/leaderboard')
      .get(this.leaderboardController.getLeaderboard);

    app.route('/klik')
      .post(this.clickController.addClick);

    app.route('*')
      .all((req: Request, res: Response) => {
        res.status(400).send({
          success: false
        });
      });
  }

}
