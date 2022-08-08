import { getLs, setLs, getSs, setSs } from "src/utils/ls";
import { v1 as uuidv1, v4 as uuidv4  } from 'uuid';


class User {
    public userId: string;
    public traceId: string;
    constructor(){
        this.userId = getLs("userId");
        this.traceId = getSs("traceId")
        // 获取用户名
        if (!this.userId) {
            this.userId = uuidv1();
            setLs("userId", this.userId)
        }
        // 获取traceId
        if (!this.traceId) {
            this.traceId = uuidv4();
            setSs("traceId", this.traceId)
        }
    }
}

export default User;