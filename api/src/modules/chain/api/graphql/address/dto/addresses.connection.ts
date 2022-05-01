import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { AddressNode } from './address.node';

@ObjectType()
export class AddressesConnection extends Connection(AddressNode) {}
