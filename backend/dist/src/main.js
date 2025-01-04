"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const all_exception_filter_1 = require("./common/filters/all-exception.filter");
const cors_1 = require("./common/config/cors");
async function bootstrap() {
    const helmetOptions = {
        crossOriginEmbedderPolicy: false,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.getOrThrow('port');
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)(helmetOptions));
    app.use((0, compression_1.default)());
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new all_exception_filter_1.AllExeptionFilter());
    app.enableCors(cors_1.corsOptions);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('docs title')
        .setDescription('docs decription')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(port, () => {
        console.log(`Server is running http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map