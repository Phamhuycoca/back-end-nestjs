import { Prop, Schema } from '@nestjs/mongoose';
import { MongoCollection, RoloCollection } from '../collection';
import { MongoBaseSchema } from '../base.schema';
import { createSchemaForClass } from 'src/helpers/create.schema';
export type UserDocument = SchemaDocument<User>;
@Schema({
    timestamps: true,
    collection: MongoCollection.USERS,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
export class User extends MongoBaseSchema {
    @Prop({ type: String })
    fisrt_name?: string;
    @Prop({ type: String })
    last_name?: string;
    @Prop({ type: Boolean })
    gender?: boolean;
    @Prop({unique:true, required: true, type: String })
    email?:string;
    @Prop({ required: true, type: String })
    password?:string;
    @Prop({ type: String})
    refresh_token?:string
    @Prop({ required: true, type: String,default:RoloCollection.USER})
    role?:string
}

const UserSchema = createSchemaForClass(User);

export { UserSchema };
