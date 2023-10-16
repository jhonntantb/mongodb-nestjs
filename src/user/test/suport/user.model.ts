import { MockModel } from '../../../database/test/suport/mock.model';
import { User } from 'src/user/schemas/user.schema';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
