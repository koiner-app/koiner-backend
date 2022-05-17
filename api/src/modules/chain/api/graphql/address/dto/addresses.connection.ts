import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { AddressNode } from '.';

@ObjectType()
export class AddressesConnection extends Connection(AddressNode) {}
