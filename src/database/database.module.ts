import { Module, DynamicModule } from '@nestjs/common';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?: any): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      // global:true, // <--- If you want to register a dynamic module in the global scope, set the global property to true. As mentioned before, making everything global is not a good design decision.
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

function createDatabaseProviders(options: any, entities: any) {
  console.log('props are:', { options, entities });
  return [];
}
