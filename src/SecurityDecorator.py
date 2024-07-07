from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.Admin import HalilsTaverneAdministration

def secured(function):
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        id_token = request.cookies.get("token")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims:
                    adm = HalilsTaverneAdministration()

                    google_user_id = claims.get("user_id")
                    first_name = claims.get("given_name", "")
                    last_name = claims.get("family_name", "")
                    nick_name = claims.get("name", "")

                    
                    user = adm.get_user_by_google_user_id(google_user_id)
                    if user:
                        
                        user.first_name = first_name
                        user.last_name = last_name
                        user.nick_name = nick_name
                        adm.save_user(user)
                    else:
                        
                        print("User Created")

                    return function(*args, **kwargs)
                else:
                    return 'Unauthorized', 401
            except ValueError as exc:
                
                print("Token verification error:", str(exc))
                return 'Unauthorized', 401

        return 'Unauthorized', 401

    return wrapper