import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';

import { AllExeptionFilter } from './common/filters/all-exception.filter';

import { corsOptions } from './common/config/cors';

async function bootstrap() {

    const helmetOptions = {
        crossOriginEmbedderPolicy: false,
    }

    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.getOrThrow('port');

    app.use(cookieParser())
    app.use(helmet(helmetOptions))
    app.use(compression())
    app.setGlobalPrefix('api')
    app.useGlobalFilters(new AllExeptionFilter())
    app.enableCors(corsOptions)

    const config = new DocumentBuilder()
        .setTitle('docs title')
        .setDescription('docs decription')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(port,
                     () => {
                         console.log(`Server is running http://localhost:${port}`)
                     });
}

bootstrap();
