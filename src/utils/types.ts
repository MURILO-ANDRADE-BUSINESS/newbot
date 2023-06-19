export type EventView = {
    success: number;
    results: {
        id: string;
        gameLink: string;
        firstHalfGoalChance?: number;
        sport_id: string;
        time: string;
        timer: { tm: number; ts: number; tt: string; ta: number; md: number };
        time_status: string;
        league: {
            id: string;
            name: string;
            cc: string;
        };
        home: {
            id: string;
            name: string;
            image_id: string;
            cc: string;
        };
        away: {
            id: string;
            name: string;
            image_id: string;
            cc: string;
        };
        ss: string;
        scores: {
            '2': {
                home: '1';
                away: '0';
            };
            '1': {
                home: '1';
                away: '0';
            };
        };
        stats: {
            // stat[0]  means home team stats, stat[1] means away team stats
            attacks: string[];
            ball_safe: string[];
            corners: string[];
            corner_f: string[];
            corner_h: string[];
            dangerous_attacks: string[];
            fouls: string[];
            freekicks: string[];
            goalattempts: string[];
            goalkicks: string[];
            goals: string[];
            injuries: string[];
            offsides: string[];
            off_target: string[];
            on_target: string[];
            penalties: string[];
            possession_rt: string[];
            redcards: string[];
            saves: string[];
            shots_blocked: string[];
            substitutions: string[];
            throwins: string[];
            yellowcards: string[];
        };
        extra: {
            away_manager: {
                id: string;
                name: string;
                cc: string;
            };
            home_manager: {
                id: string;
                name: string;
                cc: string;
            };
            length: '90';
            home_pos: '14';
            away_pos: '5';
            referee: {
                id: string;
                name: string;
                cc: string;
            };
            stadium: string;
            stadium_data: {
                id: string;
                name: string;
                city: string;
                country: string;
                capacity: string;
                googlecoords: string;
            };
            round: string;
        };
        events: {
            id: string;
            text: string;
        }[];
        has_lineup: number;
        inplay_created_at: string;
        inplay_updated_at: string;
        confirmed_at: string;
        bet365_id: string;
    }[];
};

export type TeamBetano = {
    _doc: string;
    _id: number;
    _sid: number;
    uid: number;
    virtual: false;
    name: string;
    mediumname: string;
    abbr: string;
    nickname: string;
    iscountry: boolean;
    haslogo: boolean;
};
