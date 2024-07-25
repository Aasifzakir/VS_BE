import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<Users>;
@Schema({ timestamps: true })
export class Users {
  @Prop()
  first_name: String;

  @Prop()
  middle_name: String;

  @Prop()
  last_name: String;

  @Prop({ unique: true })
  email: String;

  @Prop()
  phone_number: String;

  @Prop()
  address: String;
  
  @Prop()
  country: String;

  @Prop()
  state: String;

  @Prop()
  city: String;

  @Prop()
  zip_code: String;

  @Prop()
  password: String;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
