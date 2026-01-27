import { registerAs } from "@nestjs/config";

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVaersion: process.env.API_VERSION,
}))