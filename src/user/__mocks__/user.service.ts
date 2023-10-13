import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userStub()),
  getUsers: jest.fn().mockResolvedValue([userStub()]),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  //removeUser: jest.fn().mockResolvedValue(userStub()),
});
