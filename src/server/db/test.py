import mysql.connector as connector


db = connector.connect(
    host = "localhost",
    user = "root",
    password = "9902",
    database = "sopra",)


mycursor = db.cursor()

mycursor.execute("SELECT Groceries_ID FROM Groceries")
ergebnisse = mycursor.fetchall()
groceries_ids = [ergebnis[0] for ergebnis in ergebnisse]
print(groceries_ids)

