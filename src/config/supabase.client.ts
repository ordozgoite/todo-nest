// import { createClient } from '@supabase/supabase-js';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export const supabase = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_KEY!
// );


// export class SUpabaseService {
//     private readonly SupabaseConfig: TSupabaseConfig;
//     constructor(configService: ConfigService) {
//         this.SupabaseConfig = configService.get<TSupabaseConfig>('supabase');
//     }



//     getClient(){
//         return createClient(
//             this.SupabaseConfig.url,
//             this.configService.get<TSupabaseConfig>('supabase.key')
//         );
//     }
// }
