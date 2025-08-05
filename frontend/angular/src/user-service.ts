import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

type LoginResponse = {
  success: false
} | {
  success: true,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _isLoggedIn = signal(false)
  public readonly isLoggedIn = this._isLoggedIn.asReadonly()

  private readonly _authorizationHeader = signal("")
  public readonly authorizationHeader = this._authorizationHeader.asReadonly()

  constructor(private readonly http: HttpClient) { }

  public async login(username: string, password: string): Promise<boolean> {
    const response = await firstValueFrom(this.http.post<LoginResponse>("http://localhost:5000/api/auth/login", {
      username, password
    }))

    this._isLoggedIn.set(response.success)
    if (response.success) {
      this._authorizationHeader.set(`Bearer ${response.token}`)
    }

    return response.success
  }
}
