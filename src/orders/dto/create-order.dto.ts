import {
    IsString,
    IsNumber,
    IsObject,
    ValidateNested,
    IsEnum,
    IsArray,
    IsNotEmpty,
} from 'class-validator';
import {
    OrderStatusEnum,
    PaymentByEnum,
    PaymentMethodEnum,
} from '../schemas/order.schema';

class SenderInformationDto {
    senderName: string;

    @IsString()
    senderAddress: string;

    @IsString()
    senderPhoneNumber: string;
}

class receiverInformationDto {
    receiverName: string;

    @IsString()
    receiverAddress: string;

    @IsString()
    receiverPhoneNumber: string;
}

class DeliveryInformationDto {
    @ValidateNested()
    @IsObject()
    senderInformation: SenderInformationDto;

    @ValidateNested()
    @IsObject()
    receiverInformation: receiverInformationDto;
}
export enum sizeEnum {
    S = 'S',
    M = 'M',
    L = 'L',
}
class ItemDetailsDto {
    @IsString()
    detailedInformation: string;

    @IsNumber()
    quantity: number;

    @IsEnum(sizeEnum)
    size: sizeEnum;

    @IsNumber()
    weight: number;

    @IsString()
    typeItem: string;

    @IsNumber()
    itemValue: number;
}

export enum serviceTypeEnum {
    SUPERCHEAP = 'SUPERCHEAP',
    SUPERSPEED = 'SUPERSPEED',
}
class ServiceInformationDto {
    @IsEnum(serviceTypeEnum)
    ServiceType: serviceTypeEnum;

    @IsString()
    preferredDeliveryTime: string;
}

export class CreateOrderDto1 {
    @ValidateNested()
    @IsObject()
    deliveryInformation: DeliveryInformationDto;

    @ValidateNested()
    @IsObject()
    itemDetails: ItemDetailsDto;

    @ValidateNested()
    @IsObject()
    serviceInformation: ServiceInformationDto;

    @IsEnum(OrderStatusEnum)
    statusOrder: OrderStatusEnum = OrderStatusEnum.PROCESSING;

    @IsEnum(PaymentMethodEnum)
    paymentMethod: PaymentMethodEnum;

    @IsNumber()
    totalOrderValue: number;

    @IsNumber()
    shippingFee: number;

    distance: number;

    totalPaymentAmount: string;
}

export class CreateOrderDto {
    // information user address
    @IsNotEmpty()
    @IsString()
    senderName: string;

    @IsString()
    senderAddress: string;

    @IsString()
    senderPhoneNumber: string;

    @IsNotEmpty()
    @IsString()
    receiverName: string;

    @IsString()
    receiverAddress: string;

    @IsString()
    receiverPhoneNumber: string;

    // status order
    @IsEnum(OrderStatusEnum)
    statusOrder: OrderStatusEnum = OrderStatusEnum.PROCESSING;

    //payment
    @IsEnum(PaymentMethodEnum)
    paymentMethod: PaymentMethodEnum;

    @IsEnum(PaymentByEnum)
    paymentBy: PaymentByEnum;

    //note
    @IsString()
    note: string;

    // information product
    @IsNumber()
    quantity: number;

    @IsEnum(sizeEnum)
    size: sizeEnum;

    @IsNumber()
    weight: number;

    @IsArray()
    typeItem: string[];

    @IsNumber()
    codValue: number;

    // type service
    @IsEnum(serviceTypeEnum)
    ServiceType: serviceTypeEnum;

    @IsString()
    preferredDeliveryTime: string;

    // distance
    @IsNumber()
    distance: number;

    // price
    @IsNumber()
    totalOrderValue: number;

    @IsNumber()
    shippingFee: number;

    @IsNumber()
    totalPaymentAmount: number;
}
