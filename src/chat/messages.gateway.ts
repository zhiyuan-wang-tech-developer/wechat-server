import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Client } from 'socket.io';
import {
  EVENT_CHAT_MESSAGE,
  INFO_SOCKET_SERVER_INIT,
  INFO_SOCKET_SERVER_CONNECT,
  INFO_SOCKET_SERVER_DISCONNECT,
} from 'src/utils/constants';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.send(INFO_SOCKET_SERVER_INIT);
    console.info(INFO_SOCKET_SERVER_INIT);
  }

  handleConnection(client: Client, ...args: any[]) {
    this.server.send(INFO_SOCKET_SERVER_CONNECT + client.id);
    console.info(INFO_SOCKET_SERVER_CONNECT + client.id);
  }

  handleDisconnect(client: Client) {
    this.server.send(INFO_SOCKET_SERVER_DISCONNECT + client.id);
    console.info(INFO_SOCKET_SERVER_DISCONNECT + client.id);
  }

  @SubscribeMessage(EVENT_CHAT_MESSAGE)
  broadcastMessage(@MessageBody() msg: string) {
    console.info(`Message from client: ${msg}`);
    this.server.emit(EVENT_CHAT_MESSAGE, msg);
  }
}
