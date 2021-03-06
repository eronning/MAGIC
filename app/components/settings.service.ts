import {Injectable}     from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Settings}       from '../models/settings';

@Injectable()
export class SettingsService {
	constructor (private http: Http) {}

	private _matchingUrl = 'settings/matching';

	getSettings () : Observable<Settings> {
		return this.http.get(this._matchingUrl)
		    .map(this.extractData)
		    .catch(this.handleError);
	}

	postSettings (settings: Settings) : void {
		//success and error catching later?
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let test = JSON.stringify(settings);
		console.log(test);
		this.http.post(this._matchingUrl, test, {
				headers: headers
			})
			.map(this.extractData)
			.catch(this.handleError)
			.subscribe(
				data => console.log(data),
				err => console.log(err)
			);
	}

	private extractData(res: Response) {
	    if (res.status < 200 || res.status >= 300) {
	      throw new Error('Bad response status: ' + res.status);
	    }
	    let body = res.json();
	    return body || [];
	}

	private handleError (error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}