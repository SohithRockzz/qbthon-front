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

export class EventDetails{
    id: string;
    date: Date;
    slot: string;
    skills: string;
    nomination: boolean;
    role:String

}