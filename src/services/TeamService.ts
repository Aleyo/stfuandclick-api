import { model } from 'mongoose';

import { TeamSchema } from '../schema/TeamSchema';

export interface ITeam {
  name: string,
  clicks: [{
    session: string,
    clicks: number,
  }],
  createdAt: Date,
}

export class TeamService {

  private Team = model('Team', TeamSchema);

  public async getTeam(teamName: string): Promise<ITeam | undefined> {
    return (await this.Team.find({ name: teamName }))[0];
  }

  public async addTeam(teamName: string): Promise<ITeam> {
    const newTeam = new this.Team({ name: teamName });
    return await newTeam.save().catch(err => console.log('Team already exist or bad structure.'));
  }

  public async incrementScore(teamName: string, session: string): Promise<ITeam | undefined> {
    const searchValues = { name: teamName, 'clicks.session': session};
    const checkSession = await this.Team.find(searchValues);

    if (!checkSession.length)
      await this.Team.updateOne({
        name: teamName
      }, {
        $push: {
          'clicks': { session, clicks: 1 }
        }
      });
    else
      await this.Team.updateOne(searchValues, { $inc: { 'clicks.$.clicks': 1 } });

    return await this.getTeam(teamName);
  }

  public getSessionScore(team: ITeam, session: string): number {
    let counter = 0;

    team.clicks.forEach(click => {
      if (click.session == session) {
        counter = click.clicks;
        return;
      }
    });

    return counter;
  }

  public getTeamScore(team: ITeam): number {
    let counter = 0;
    team.clicks.forEach(click => counter += click.clicks);
    return counter;
  }

}
