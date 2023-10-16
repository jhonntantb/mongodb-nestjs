import { Test } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserModel } from './suport/user.model';
import { FilterQuery } from 'mongoose';
import { userStub } from './stubs/user.stub';

describe('userRepository', () => {
  let userRepository: UserRepository;
  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        _id: userStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('finOde', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await userRepository.findOne(userFilterQuery);
        });

        test('then is should call the usermodel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {});
        });
        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
    describe('find', () => {
      describe('when find is called', () => {
        let users: User[];

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          users = await userRepository.find(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
        });

        test('then it should return a user', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await userRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStub(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
    describe('create operations', () => {
      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            UserRepository,
            {
              provide: getModelToken(User.name),
              useValue: UserModel,
            },
          ],
        }).compile();

        userRepository = moduleRef.get<UserRepository>(UserRepository);
      });

      describe('create', () => {
        describe('when create is called', () => {
          let newUser: User;
          let saveSpy: jest.SpyInstance;
          let constructorSpy: jest.SpyInstance;

          beforeEach(async () => {
            saveSpy = jest.spyOn(UserModel.prototype, 'save');
            constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
            newUser = await userRepository.create(userStub());
            console.log('tes create user', newUser);
          });

          test('then it should call the userModel', () => {
            expect(saveSpy).toHaveBeenCalled();
            expect(constructorSpy).toHaveBeenCalledWith(userStub());
          });

          test('then it should return a user', () => {
            expect(newUser).toEqual(userStub()._id);
          });
        });
      });
    });
  });
});
