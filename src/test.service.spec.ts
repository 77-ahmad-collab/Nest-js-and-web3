import { Test } from '@nestjs/testing';
import { Authorization } from './user/auth.service';
import { UserService } from './user/user.service';

describe('Authorization', () => {
  let service: Authorization;

  beforeEach(async () => {
    const fakeUserService: Partial<UserService> = {
      create: (email: string, password: string) =>
        Promise.resolve({ email, password }),
      checkForData: () => {
        return {
          result: 'hello',
        };
      },
      test: () => 'dd',
    };
    const moduleRef = await Test.createTestingModule({
      providers: [
        Authorization,
        {
          provide: UserService,
          useValue: [fakeUserService],
        },
      ],
    }).compile();
    service = moduleRef.get(Authorization);
  });
  it('A Dummy tes', async () => {
    console.log(service, '=====>>>service');
    expect(await service.testRoute()).toBeDefined();
  });
  it('can call user service funtion Correctly', async () => {
    // console.log(service.testData(), 'hello worl');
    expect(service.testData()).toBeDefined();
  });
});
// describe('Authorization Service', () => {
//   let service: Authorization;
//   // beforeEach(async () => {
//   //   const fakeUserService: Partial<UserService> = {
//   //     // find: (email: string) => Promise.all(),
//   //     create: (email: string, password: string) =>
//   //       Promise.resolve({ email, password }),
//   //   };
//   //   const module = await Test.createTestingModule({
//   //     providers: [
//   //       Authorization,
//   //       {
//   //         provide: UserService,
//   //         useValue: fakeUserService,
//   //       },
//   //     ],
//   //   }).compile();
//   //   service = module.get(Authorization);
//   // });
//   it('can create instance of user Service', async () => {
//     expect(service).toBeDefined();
//   });
//   it('Check that testing file is okay', () => {
//     expect(2).toEqual(2);
//   });
//   it('chekc that password get hashed', async () => {
//     const module = await Test.createTestingModule({
//       providers: [Authorization],
//     }).compile();
//     console.log(service);
//     service = module.get(Authorization);
//     const message = await service.testRoute();
//     expect(message).toBeDefined();
//     // const user = await service.signUp('ahmad1232gmail.com', '1234567');
//     // expect(user.password).not.toEqual('1234567');
//     // const [hash, salt] = user.password.split('.');
//     // expect(hash).toBeDefined();
//     // expect(salt).toBeDefined();
//   });
// });
