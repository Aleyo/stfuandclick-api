import { Request, Response } from 'express';

import { TeamService } from '../services/TeamService';

const teamService = new TeamService();

export class ClickController {

  public async addClick(req: Request, res: Response) {
    if (req.body.team == undefined || req.body.team == '' ||
        req.body.session == undefined || req.body.session == '') {
      res.status(400).json({
        success: false,
        message: 'Invalid team or session',
      });
      return;
    }

    let team = await teamService.getTeam(req.body.team);

    if (team == undefined)
      await teamService.addTeam(req.body.team);

    team = await teamService.incrementScore(req.body.team, req.body.session);

    res.json({
      your_clicks: teamService.getSessionScore(team, req.body.session),
      team_clicks: teamService.getTeamScore(team),
    });
  }

}
