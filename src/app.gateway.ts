import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface OnlineUser {
  [key: string]: string;
}
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  onlineUsers: { [key: string]: any } = {};
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('sockets has beeen initilzized');
  }
  @SubscribeMessage('testingSocket')
  async getTestingOfSocket(client: Socket, payload: any) {
    this.server.to(client.id).emit('resultingSocket', `${client.id}`);
  }
  @SubscribeMessage('testing')
  Run(client: Socket, payload: any) {
    this.server.to(client.id).emit('result', 'Hurray 2nd socket');
  }
  handleDisconnect(client: Socket) {
    if (this.onlineUsers[client.id]) {
      delete this.onlineUsers[client.id];
    }
    this.logger.log(`Client disconnected: ${this.onlineUsers}`);
    console.log(this.onlineUsers);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.handshake.query.userNo);
    let { id } = client;

    this.onlineUsers[id] = { socketId: client.id };
  }
}
