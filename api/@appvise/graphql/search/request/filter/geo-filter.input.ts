import { Field, InputType } from '@nestjs/graphql';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';
import { GeoFilter } from '@appvise/domain';

@InputType('GeoFilter')
export class GeoFilterInput implements GeoFilter {
  @Field()
  @IsLatitude()
  latitude: number;

  @Field()
  @IsLongitude()
  longitude: number;

  @Field({ description: 'Radius in meters' })
  @IsNumber()
  radius: number;
}
