export class Event{
    id: string;
    date: Date;
    slot: string;
    skills: string;
}

export class User{
    id: string;
    userName: string;
    password: string;
    buName: string;
    account: string;
    adminFlag: boolean;
}

export class Questionnaire{
    id: string;
    blooms: string;
    difficulty: string;
    category: string;
    stack: string;
    source: string;
    multiple: string;
    topic: string;
    description: string;
    optionOne: string;
    scoreOne: string;
    optionTwo: string;
    scoreTwo: string;
    optionThree: string;
    scoreThree: string;
    optionFour: string;
    scoreFour: string;
    assignedSme: string;
    type: string;
    status: string;
    comment: string;
    userId: string;
    eventId: string;
}
export class QuestionBuildTemplate{
    q_No: string;
    blooms_taxonomy: string;
    difficulty_level: string;
    category: string;
    multiple_answer: string;
    topic: string;
    question_text: string;
    option_1: string;
    score_1: string;
    option_2: string;
    score_2: string;
    option_3: string;
    score_3: string;
    option_4: string;
    score_4: string;
    source: string;

}
export class EventDetails{
    id: string;
    date: Date;
    slot: string;
    skills: string;
    nomination: boolean;
    role:String

}