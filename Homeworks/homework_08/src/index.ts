import app from "./server";
import logger from "./shared/Logger";
import './pre-start'; 
import StorageService from "./services/storageService";

const port = Number(process.env.PORT || 3000);
export const storage = new StorageService();

const init = async () => {
  await storage.init();
  await app.listen(port);
}

init().then(() => {
  logger.info("Running on port " + port);
});