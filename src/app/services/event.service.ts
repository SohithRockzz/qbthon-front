import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Event, User, Questionnaire, EventDetails } from './eventinfo.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    setNominated(arg0: boolean) {
      throw new Error("Method not implemented.");
    }

    private eve: EventDetails;
    private user: User;
    private selectedTab: string;
    private nominated: boolean;
    private id: string;

    private backendUrlEvent: string = 'http://localhost:9001/event';
    private backendUrlQuestion: string = 'http://localhost:9002/question';
    constructor(private httpClient: HttpClient) { }


    getId(): string{
        return this.id
    }
    setId(value: string){
        this.id = value;
    }
    getNomination(): boolean {
        return this.nominated;
    }

    setNomination(value: boolean) {
        this.nominated = value;
    }

    getSelectedTab(): string {
        return this.selectedTab;
    }

    setSelectedTab(value: string) {
        this.selectedTab = value;
    }
    setEvent(event: EventDetails) {
        this.eve = event;
    }
    getEvent(): EventDetails {
        return this.eve;
    }

    createEvent(files: FormData) {
        return this.httpClient.post(this.backendUrlEvent + '/create', files, { responseType: 'text' });
    }

    getEventsDetailsOfUser(userId):Observable<EventDetails[]> {
        let params = new HttpParams();
        params = params.append('userId', userId);
        return this.httpClient.get<EventDetails[]>(this.backendUrlEvent + '/getUserEvents',{ params: params });
    }

    getNominated(userId, eventId) {
        let params = new HttpParams();
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        params = params.append('eventId', eventId);
        params = params.append('userId', userId);
        return this.httpClient.get(this.backendUrlEvent + '/nominate', {headers, responseType: 'text', params: params })
    }

    getEarlyBirds(id: string):Observable<User[]>{
        let params = new HttpParams();
        params = params.append('eventId', id);
        return this.httpClient.get<User[]>(this.backendUrlQuestion + '/event/early/birds', { params: params });
    }

    getVoucherList(id: string):Observable<User[]>{
        return this.httpClient.get<User[]>(this.backendUrlEvent + '/evoucher/'+ id, {});
    }

    getAllEvents():Observable<Event[]>{
        return this.httpClient.get<Event[]>(this.backendUrlEvent + '/getAllEvents', {});
    }


    sendReminderMail(id: string){
        return this.httpClient.post(this.backendUrlEvent +'/sendReminderMail',id,{});
    }

    sendEducatorMail(id: string){
        return this.httpClient.post(this.backendUrlEvent +'/sendEducatorMail',id,{});
    }

    createQuestionnaire(files: FormData) {
        return this.httpClient.post(this.backendUrlQuestion + '/create', files, { responseType: 'text' });
    }

    validateUser(user: User):Observable<User> {
        return this.httpClient.post<User>(this.backendUrlEvent + '/validateUser', user, {});
    }

    setUser(user: User) {
        this.user = user;
    }
    getUser(): User {
        return this.user;
    }

    getQuestionsMapList(eventId):Observable<any>{
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        return this.httpClient.get<any>(this.backendUrlQuestion + '/all', { params: params });
    }

    getUserQuestionList(eventId,userId,category):Observable<Questionnaire[]>{
        let params = new HttpParams();
        params = params.append('eventId',eventId);
        params = params.append('userId',userId);
        params = params.append('category',category);
        return this.httpClient.get<Questionnaire[]>(this.backendUrlQuestion + '/getUserQuestionList',{params: params});
    }

    getSMEQuestionsList(eventId,smeId):Observable<Questionnaire[]>{
        let params = new HttpParams();
        params = params.append('eventId',eventId);
        params = params.append('smeId',smeId);
        return this.httpClient.get<Questionnaire[]>(this.backendUrlQuestion + '/getSMEQuestionsList',{params: params});
    }

    getQuestionsExcelList(eventId):Observable<any[]>{
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        return this.httpClient.get<any[]>(this.backendUrlQuestion + '/download/all', { params: params });
    }
    updateQuestion(question):Observable<any[]>{
        return this.httpClient.post<any[]>(this.backendUrlQuestion + '/update/question',question);
    }

    getChartData(eventId: string):Observable<any[]>{
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        return this.httpClient.get<any[]>(this.backendUrlQuestion + '/chart' ,{ params: params });
    }

    getEventsDetails(){
        return this.httpClient.get(this.backendUrlEvent +'/details',{});
    }


}