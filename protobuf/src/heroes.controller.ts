import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from 'grpc';
import { Hero, HeroById } from './types/hero_pb';

@Controller()
export class  HeroesService {
  @GrpcMethod()
  findOne(data: HeroById.AsObject, metadata: Metadata, call: ServerUnaryCall<any>): Hero.AsObject {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ] as Hero.AsObject[];
    return items.find(({ id }) => id === data.id);
  }
}
