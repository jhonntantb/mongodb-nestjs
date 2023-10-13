import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    _id: '651b30dafdc762d26a57006a',
    email: 'jhon@gmail.com',
    password: 'pass123',
    age: 15,
    favoriteFoods: ['orange', 'pizza'],
  };
};
