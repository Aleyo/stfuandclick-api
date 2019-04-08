import { model } from 'mongoose';

import { TeamSchema } from '../schema/TeamSchema';

export interface ITeam {
  name: string,
  clicks?: number,
  clickers: [{
    session: string,
    clicks: number,
  }],
  createdAt: Date,
}

export interface ILeaderboardItem {
  order: number,
  team: string,
  clicks: number,
}

export class TeamService {

  private Team = model('Team', TeamSchema);

  public async getTeam(teamName: string): Promise<ITeam | undefined> {
    const team = await this.Team.aggregate([{
      $match: { name: teamName }
    }, {
      $addFields: {
        clicks: { $sum: "$clickers.clicks" }
      }
    }]);
    return team[0];
  }

  public async addTeam(teamName: string): Promise<ITeam> {
    const newTeam = new this.Team({ name: teamName });
    return await newTeam.save().catch(err => console.log('Team already exist or bad structure.'));
  }

  public async incrementScore(teamName: string, session: string): Promise<ITeam | undefined> {
    const searchValues = { name: teamName, 'clickers.session': session};
    const checkSession = await this.Team.find(searchValues);

    if (!checkSession.length)
      await this.Team.updateOne({
        name: teamName
      }, {
        $push: {
          'clickers': { session, clicks: 1 }
        }
      });
    else
      await this.Team.updateOne(searchValues, { $inc: { 'clickers.$.clicks': 1 } });

    return await this.getTeam(teamName);
  }

  public getSessionScore(team: ITeam, session: string): number {
    let counter = 0;

    team.clickers.forEach(click => {
      if (click.session == session) {
        counter = click.clicks;
        return;
      }
    });

    return counter;
  }

  public async getTopTeams(limit: number = 10): Promise<[ILeaderboardItem]> {
    const teams = await this.Team.aggregate([{
      $project: {
        _id: 0,
        order: "0",
        team: "$name",
        clicks: { $sum: "$clickers.clicks" }
      }
    }, {
      $sort: { clicks: -1 }
    }, {
      $limit: limit
    }]);

    let counter = 1;
    teams.forEach( e => e. order = counter++);
    return teams;
  }

}
