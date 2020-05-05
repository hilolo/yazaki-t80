import {User} from './user';
import {Indivcost} from './indivcost';
export class Cost {

        id: number;
        date_week: string;
        department: string;
        user_id: number;
        created_at?: any;
        updated_at?: any;
        users: User;
        indivcosts: Indivcost[];
    }
