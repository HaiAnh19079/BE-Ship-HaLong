// src/websocket.gateway.ts
import { Logger } from '@nestjs/common';

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

@WebSocketGateway({ cors: true })
export class WebsocketGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;
    handleConnection(client: any, ...args: any[]) {
        console.log('A client connected.');
        // console.log('A client', client);
    }

    handleDisconnect(client: any) {
        console.log('A client disconnected.');
    }

    @SubscribeMessage('message')
    handleMessage(client: any, data: string) {
        console.log('Received message:', data);
        // Broadcast the message to all connected clients
        this.server.emit('message', data);
    }

    @SubscribeMessage('getListOrder')
    handleGetListOrderEvent(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any,
    ) {
        console.log('Received data from client:', data);
        // console.log('Received  client:', client);

        // Process the data and emit a response back to the client
        this.server.on('getListOrder', () => {
            console.log(data);
            this.server.emit('returnListOrder', data);
        });
    }
}
