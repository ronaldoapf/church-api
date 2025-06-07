import { app } from ".";
import { env } from "./env";

app.listen({ 
  port: env.PORT, 
  host: '0.0.0.0' 
}).then(() => {
  console.log(`🚀 Server is running on ${env.API_BASE_URL}`);
  console.log(`📄 View all documentation on ${env.API_BASE_URL}/docs`);
})