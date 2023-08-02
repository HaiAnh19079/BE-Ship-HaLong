import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IUser } from 'src/users/users.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { OrderGateway } from './order.gateway';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private orderGateway: OrderGateway,
    ) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @User() user: IUser) {
        return this.ordersService.create(createOrderDto, user);
    }

    @Public()
    @Get()
    @ResponseMessage('get list order with paginate')
    findAll(
        @Query('current') page: string,
        @Query('pageSize') limit: string,
        @Query() qs: string,
    ) {
        return this.ordersService.findAll(+page, +limit, qs);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }
}
