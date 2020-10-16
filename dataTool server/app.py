from flask import Flask, request, send_file, render_template
import sqlalchemy as sa
from flask_cors import CORS

from data import collect_data

app = Flask(__name__)
CORS(app)
ssl_args = {'ssl': {'ca': 'YOUR_SSL_CERT_PATH'}}
server = "localhost"
database = "salondb"
db_url = 'mysql://{}@{}/{}'.format("root", server, database)
print(db_url)

engine = sa.create_engine(db_url, echo=False)
cnx = engine.connect()

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/execute/db')
def db():
    filename = 'db.sql'
    fd = open(filename, 'r')
    sql_file = fd.read()
    fd.close()
    sql_commands = sql_file.split(';')
    exceptions = []
    for command in sql_commands:
        try:
            if command.strip() != '':
                engine.engine.execute(command)
        except IOError as error:
            exceptions.append({error: command})

    return {"exceptions": exceptions}



@app.route('/collectdata', methods=['POST'])
def login_salon():
    data = request.get_json(force=True)
    print(data)
    response = collect_data(data, engine)
    return response


if __name__ == '__main__':
    app.run(debug=True)
