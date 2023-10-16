import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    _id: '651b30dafdc762d26a57006a',
    age: 15,
    email: 'jhon@gmail.com',
    favoriteFoods: ['orange', 'pizza'],
    password: 'pass123',
  };
};
