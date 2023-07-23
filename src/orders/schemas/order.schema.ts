import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatusEnum {
    PROCESSING = 'PROCESSING',
    CONFIRMED = 'CONFIRMED',
    ON_THE_WAY = 'ON_THE_WAY',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
}
export enum PaymentMethodEnum {
    CASH = 'CASH',
    BANKING = 'BANKING',
}
export enum PaymentByEnum {
    BY_SENDER = 'BY_SENDER',
    BY_RECEIVER = 'BY_RECEIVER',
}
export enum sizeEnum {
    S = 'S',
    M = 'M',
    L = 'L',
}
export enum serviceTypeEnum {
    SUPERCHEAP = 'SUPERCHEAP',
    SUPERSPEED = 'SUPERSPEED',
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Object })
    deliveryInformation: {
        senderInformation: {
            senderName: string;
            senderAddress: string;
            senderPhoneNumber: string;
        };
        receiverInformation: {
            receiverName: string;
            receiverAddress: string;
            receiverPhoneNumber: string;
        };
    };

    @Prop({ type: Object })
    itemDetails: {
        size: sizeEnum; //enum
        weight: number;
        typeItem: string[];
        codValue: number; // estimated value of the items
    };

    @Prop({ type: Object })
    serviceInformation: {
        ServiceType: serviceTypeEnum; // enum
        preferredDeliveryTime: string | Date; // the requested delivery time to the receiver's address
    };

    @Prop({
        type: String,
        enum: PaymentMethodEnum,
        default: PaymentMethodEnum.CASH,
    })
    paymentMethod: PaymentMethodEnum; // enum

    @Prop({
        type: String,
        enum: PaymentByEnum,
        default: PaymentByEnum.BY_SENDER,
    })
    paymentBy: PaymentByEnum;

    @Prop({ type: Object })
    shipper: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        phoneNumber: string;
    };

    @Prop({
        type: String,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.PROCESSING,
    })
    statusOrder: OrderStatusEnum; //enum

    @Prop()
    note: string;

    @Prop()
    totalOrderValue: number;

    @Prop()
    shippingFee: number;

    @Prop()
    totalPaymentAmount: number;

    @Prop()
    distance: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        phoneNumber: string;
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        phoneNumber: string;
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        phoneNumber: string;
    };

    @Prop()
    canceledResult: string;

    @Prop()
    createAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
