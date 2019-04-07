import { model } from 'mongoose';

import { TeamSchema } from '../schema/TeamSchema';

export interface ITeam {
  name: string,
  clicks: number,
  createdAt: Date,
}


export class TeamService {

  private Team = model('Team', TeamSchema);

  public async getTeam(teamName: string): Promise<ITeam | undefined> {
    return (await this.Team.find({ name: teamName }))[0];
  }

  public async addTeam(teamName: string): Promise<ITeam> {
    const newTeam = new this.Team({ name: teamName });
    return await newTeam.save().catch(err => console.log("Team already exist or bad structure."));
  }

  public async incrementScore(teamName: string): Promise<ITeam | undefined> {
    await this.Team.update({ name: teamName }, { $inc: { clicks: 1 } });
    return await this.getTeam(teamName);
  }

}
