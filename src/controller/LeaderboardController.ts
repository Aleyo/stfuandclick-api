import { Request, Response } from 'express';

import { TeamService } from '../services/TeamService';

const teamService = new TeamService();

export class LeaderboardController {

  public async getLeaderboard(req: Request, res: Response) {
    const teams = await teamService.getTopTeams();
    res.json(teams);
  }

}
