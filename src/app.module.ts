import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } })],
  controllers: [WeatherController],
  providers: [AuthService],
})
export class AppModule {}
