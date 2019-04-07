import { model } from 'mongoose';
import { Request, Response } from 'express';

import { TeamSchema } from '../model/TeamSchema';

export class TeamController {
  private Team = model('Team', 'TeamSchema');


}
