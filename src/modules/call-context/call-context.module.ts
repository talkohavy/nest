import { AsyncLocalStorage } from 'async_hooks';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CallContextService } from './call-context.service';

interface CallContextModuleOptions {
  isGlobal?: boolean;
}

@Global()
@Module({})
export class CallContextModule {
  public static forRoot(options: CallContextModuleOptions = {}): DynamicModule {
    const { isGlobal = true } = options;

    const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

    const asyncContext = {
      provide: CallContextService,
      useValue: new CallContextService(asyncLocalStorage),
    };

    return {
      module: CallContextModule,
      providers: [asyncContext],
      exports: [asyncContext],
      global: isGlobal,
    };
  }
}
