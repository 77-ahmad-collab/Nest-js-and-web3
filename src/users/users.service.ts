import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async findUser(username: string): Promise<{
    userId: number;
    username: string;
    password: string;
  }> {
    try {
      const user = await this.users.find((user) => user.username === username);
      if (!user)
        throw new NotFoundException('No user  found with this username');
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
