import { Controller } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { HeroById, Hero, HeroServiceController } from '../types/protos';
import { GrpcMethod, GrpcStreamCall } from '@nestjs/microservices';
import { ServerReadableStream } from 'grpc';

@Controller('hero')
export class HeroController implements HeroServiceController {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroService')
  unaryCall(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamCall('HeroService')
  clientStreamExample(stream: ServerReadableStream<HeroById>, callback: (err: unknown, res: HeroById) => void) {
    stream.on('data', (heroById: HeroById) => {
      console.log('clientStreamExample received %o', heroById);
    });
    stream.on('end', () => {
      console.log('clientStreamExample completed');
      callback(null, this.items[this.items.length - 1]);
    })
    // const hero$ = new Subject<Hero>();
    // const onNext = (heroById: HeroById) => {
    //   console.log('clientStreamExample received %o', heroById);
    //   const item = this.unaryCall(heroById);
    //   hero$.next(item);
    // };
    // const onComplete = () => {
    //   hero$.complete();
    //   console.log('clientStreamExample completed');
    // };
    // data$.subscribe({
    //   next: onNext,
    //   error: null,
    //   complete: onComplete
    // });
    // return hero$.asObservable();
  }

  @GrpcMethod('HeroService')
  serverStreamExample(data: HeroById): Observable<Hero> {
    const hero$ = new Subject<Hero>();
    const onNext = (hero: Hero): void => {
      console.log('serverStreamExample responses %o', hero);
    };
    const onComplete = (): void => {
      console.log('serverStreamExample completed');
    };
    hero$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });
    let i = 0;
    setInterval(() => {
      if (i >= this.items.length) {
        hero$.complete();
      } else {
        const item = this.items[i];
        hero$.next(item);
        i += 1;
      }
    }, 1000);
    return hero$.asObservable();
  }

  @GrpcMethod('HeroService')
  bidirectionalStreamExample(data$: Observable<Hero>): Observable<Hero> {
    const hero$ = new Subject<Hero>();
    const onNext = (heroById: HeroById) => {
      console.log('bidirectionalStreamExample received %o', heroById);
      const item = this.unaryCall(heroById);
      hero$.next(item);
    };
    const onComplete = (): void => {
      console.log('bidirectionalStreamExample completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete,
    });
    return hero$.asObservable();
  }
}
