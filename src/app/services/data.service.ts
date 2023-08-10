// shared-data.service.ts
import { Observable, of, catchError, tap, switchMap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { CampaignInterface } from "../manage-campaign/types/campaign.interface";
import { MessageService } from "./message-service.service";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private campaignUrl = "api/campaigns"; // URL to web api

  /**
   * Description
   * @returns {Observable}
   */
  getCampaigns(): Observable<CampaignInterface[]> {
    return this.http.get<CampaignInterface[]>('api/campaigns').pipe(
      tap((_) => this.log("fetched heroes")),
      catchError((error: HttpErrorResponse)=>{
        this.messageService.handleHttpError(error)
        return throwError(error)})
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getCampaign(id: string): Observable<CampaignInterface> {
    const url = `${this.campaignUrl}/${id}`;
    return this.http.get<CampaignInterface>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError((error: HttpErrorResponse)=>{
        this.messageService.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * add new campaign
   * @param {any} campaign:CampaignInterface
   */
  addCampaign(campaign: CampaignInterface): Observable<CampaignInterface> {
    return this.http
      .post<CampaignInterface>("api/campaigns", campaign, this.httpOptions)
      .pipe(
        tap((newCampaign: CampaignInterface) =>
          this.log(`added campaign w/ id=${newCampaign.id}`)
        ),
        catchError((error: HttpErrorResponse)=>{
          this.messageService.handleHttpError(error);
          return throwError(error);
        })
      );
  }

  /**
   * update existing campaign
   * @param {any} campaign:CampaignInterface
   */
  updateCampaign(campaign: CampaignInterface): Observable<CampaignInterface> {
    return this.http
      .post<CampaignInterface>(
        `${this.campaignUrl}/${campaign.id}`,
        campaign,
        this.httpOptions
      )
      .pipe(
        switchMap(() =>
          this.http.get<CampaignInterface>(`${this.campaignUrl}/${campaign.id}`)
        ),
        tap((updatedCampaign) =>
          this.log(`updated campaign w/ id=${updatedCampaign.id}`)
        ),
        catchError(this.handleError<CampaignInterface>("updateCampaign"))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteCampaign(id: string): Observable<CampaignInterface> {
    const url = `${this.campaignUrl}/${id}`;
    return this.http.delete<CampaignInterface>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<CampaignInterface>("deleteHero"))
    );
  }
}
