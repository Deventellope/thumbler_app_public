<<<<<<< HEAD
from flask import Flask , request, render_template, jsonify

from extract_image_link import *
# from flask_sock import Sock

app= Flask(__name__)



app = Flask(__name__)
# sock = Sock(app)

# @sock.route('/ws')
# def websocket(ws):
#     while True:
#         data = ws.receive()       # receive from client
#         ws.send(f"echo: {data}")  # send back to client


=======
from flask import Flask , request, render_template

app= Flask(__name__)

>>>>>>> 8dd7e0c39acd19ed37f421f1cfa424d8c795fd91
@app.route('/')
def index():
    return render_template('index.html')


<<<<<<< HEAD
@app.route("/serve", methods=["POST"])
def serve_image():

    response= request.get_json()
    return response


@app.route('/download', methods= ["POST"])
async def download():

    print("download endpoint reached !".upper())

    response= request.get_json() 

    print("user query ", response)

    if response:

        response_url= response.get("user_query", None)
        images= extract_image_urls(response_url)

        print("images:", images)

        if images== None:
            server_reponse={"content": "", "status": "bad"}
            print("no images available ".upper())   

        else:
            server_reponse= {
                "status": "good" ,
                "content": images 
            }
            print("sending available images to user".upper())

        return jsonify(server_reponse)
    
    else:        
        to_send= {
            "status": "good" ,
            "content": "invalid request!"
        }

        return jsonify(to_send)




=======
>>>>>>> 8dd7e0c39acd19ed37f421f1cfa424d8c795fd91
if __name__== "__main__":
    app.run(port=1000, debug=True)