import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from 'src/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(){}
  @InjectModel(Users.name)
  private UsersDocumentModel: Model<UserDocument>;

  async create(payload: any): Promise<any> {
    let user: any;
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    user = await this.UsersDocumentModel.create(payload);
    return user;
  }

  async findOne(payload) {
    const data = await this.UsersDocumentModel.findOne(payload)
    return data;
  }

  async delete(id: any): Promise<any> {
    let user: any;
    user = await this.UsersDocumentModel.findByIdAndDelete(id);
    return user;
  }
}
