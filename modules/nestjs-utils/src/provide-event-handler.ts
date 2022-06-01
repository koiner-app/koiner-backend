import { Provider } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';

export function provideEventHandler<TEventHandler extends DomainEventHandler>(
  eventHandlerClass: new (
    commandBus: CommandBus,
    logger?: Logger,
  ) => TEventHandler,
): Provider {
  return {
    provide: eventHandlerClass,
    useFactory: (commandBus: CommandBus, logger: Logger): TEventHandler => {
      const eventHandler = new eventHandlerClass(commandBus, logger);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, Logger],
  };
}

export function provideEventHandlers(
  eventHandlerClasses: Array<
    new (commandBus: CommandBus, logger?: Logger) => DomainEventHandler
  >,
): Provider[] {
  return eventHandlerClasses.map((eventHandlerClass) =>
    provideEventHandler(eventHandlerClass),
  );
}
