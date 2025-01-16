import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permitir solicitudes desde http://localhost:3001
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  });

  // Middleware para manejar solicitudes preflight
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      return res.sendStatus(204);
    }
    next();
  });

  // Prefijo global de rutas
  app.setGlobalPrefix('api');

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Iniciar el servidor
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
