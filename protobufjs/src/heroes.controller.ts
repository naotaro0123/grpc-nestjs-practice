import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from 'grpc';
import { hero } from './types/index'

@Controller()
export class  HeroesService {
  @GrpcMethod()
  findOne(data: hero.IHeroById, metadata: Metadata, call: ServerUnaryCall<any>): hero.IHero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ] as hero.IHero[];
    return items.find(({ id }) => id === data.id);
  }
}
