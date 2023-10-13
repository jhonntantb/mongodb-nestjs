import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../user.service');
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('getUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await userController.getUser(userStub()._id);
      });

      test('then it shoul call userService', () => {
        expect(userService.getUserById).toBeCalledWith(userStub()._id);
      });
      test('then it shoul return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
    describe('getUsers', () => {
      describe('getUsers is called', () => {
        let users: User[];
        beforeEach(async () => {
          users = await userController.getUsers();
        });
        test('then it shoul call userService', () => {
          expect(userService.getUsers).toHaveBeenCalled();
        });
        test('then it shoul return users', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('createUser', () => {
      describe('createUser is called', () => {
        let user: User;
        let createUserDto: CreateUserDto;
        beforeEach(async () => {
          createUserDto = {
            email: userStub().email,
            password: userStub().password,
            age: userStub().age,
          };
          user = await userController.createUser(createUserDto);
        });
        test('then it shoul call userService', () => {
          expect(userService.createUser).toBeCalledWith(createUserDto);
        });
        test('then it shoul return users', () => {
          expect(user).toEqual(userStub());
        });
      });
    });

    describe('updateUser', () => {
      describe('updateUser is called', () => {
        let user: User;
        let updateUserDto: UpdateUserDto;
        beforeEach(async () => {
          updateUserDto = {
            favoriteFoods: [],
            age: 30,
          };
          user = await userController.updateUser(userStub()._id, updateUserDto);
        });
        test('then it shoul call userService', () => {
          expect(userService.updateUser).toHaveBeenCalledWith(
            userStub()._id,
            updateUserDto,
          );
        });
        test('then it shoul return users', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});
