

from HalilsTaverneAdministration import HalilsTaverneAdministration

from flask import request
from google.auth.transport import requests
import google.oauth2.id_token


"""Diese Datei sorgt dafür, dass nur über Google Firebase angemeldete User auf unsere Webanwendung zugreifen können."""
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

                if claims is not None:
                    """Sollte der User bereits existieren, wird eine seine Daten abgefragt"""
                    adm = HalilsTaverneAdministration()

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    first_name = claims.get("given_name", "")  # 'given_name' aus dem Firebase-Token
                    last_name = claims.get("family_name", "")  # 'family_name' aus dem Firebase-Token
                    nick_name = claims.get("name", "")  # 'name' --> oft als Nickname verwendet

                    user = adm.get_user_by_google_user_id(google_user_id)
                    if user is not None:
                        # Fall: Der Benutzer ist uns bereits bekannt.
                        user.first_name = first_name
                        user.last_name = last_name
                        user.nick_name = nick_name
                        adm.save_user(user)
                    else:
                        """Sollte der User neu sein, wird ein User erstellt"""
                        user = adm.create_user(first_name, last_name, nick_name, email, google_user_id)

                    print(request.method, request.path, "Requested by:", nick_name, email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED
            except ValueError as exc:
                # Fehlerbehandlung für abgelaufene oder ungültige Tokens.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED

        return '', 401  # UNAUTHORIZED

    return wrapper
