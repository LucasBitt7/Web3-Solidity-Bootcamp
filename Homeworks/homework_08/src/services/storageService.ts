import { ipfsInitError } from "../shared/constants";
import { create, IPFS } from "ipfs-core";
import all from "it-all";

export default class StorageService {
  ipfs: IPFS | null = null;
  async init() {
    this.ipfs = await create();
  }

  async addText(text: string): Promise<string> {
    if (!this.ipfs) {
      throw new Error(ipfsInitError);
    }
    const result = await this.ipfs.add(text);
    return result.cid.toString();
  }

  async addImage(image: Buffer): Promise<string> {
    if (!this.ipfs) {
      throw new Error(ipfsInitError);
    }
    const buff = Buffer.from(image);
    const result = await this.ipfs.add(buff);
    return result.cid.toString();
  }

  async getImage(cid: string): Promise<string> {
    if (!this.ipfs) {
      throw new Error(ipfsInitError);
    }
    const result = await all(this.ipfs.cat(cid));
    return Buffer.concat(result).toString("base64");
  }

  async get(cid: string): Promise<string> {
    if(!this.ipfs) {
      throw new Error(ipfsInitError);
    }
    
    const result = await all(this.ipfs.cat(cid));
    return Buffer.concat(result).toString('base64');
  }
}
