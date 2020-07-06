import { CONFIG } from '../config';

class CommonUtil {
  public static get publicFolderUrl() {
    const protocol = CONFIG.PUBLIC_FOLDER_HOST_SECURE === 'true' ? 'https://' : 'http://';

    return protocol + CONFIG.PUBLIC_FOLDER_HOST + CONFIG.PUBLIC_FOLDER_PATH;
  }
}

export default CommonUtil;
