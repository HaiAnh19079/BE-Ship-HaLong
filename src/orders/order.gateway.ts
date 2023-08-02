import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    handleConnection(client: any, ...args: any[]) {
        console.log('A client connected.', client.id);
        console.log('Connected!');
    }

    handleDisconnect(client: any) {
        console.log('A client disconnected.');
    }

    @SubscribeMessage('newMessage')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log(client.id, data);
        this.server.emit('message', {
            client: client.id,
            content: data,
        });
    }
}
