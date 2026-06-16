from flask import Flask, request, render_template, jsonify, send_from_directory
from extract_image_link import *

app = Flask(__name__)


@app.route('/ads.txt')
def ads_txt():
    content = "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
    return content, 200, {'Content-Type': 'text/plain'}
    # return send_from_directory('static', 'ads.txt')

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/serve", methods=["POST"])
def serve_image():
    response = request.get_json()
    return response


@app.route('/download', methods=["POST"])
async def download():

    print("download endpoint reached !".upper())

    response = request.get_json()
    print("user query ", response)

    if response:
        response_url = response.get("user_query", None)
        images = extract_image_urls(response_url)

        print("images:", images)

        if images == None:
            server_reponse = {"content": "", "status": "bad"}
            print("no images available ".upper())

        else:
            server_reponse = {
                "status": "good",
                "content": images
            }
            print("sending available images to user".upper())

        return jsonify(server_reponse)

    else:
        to_send = {
            "status": "good",
            "content": "invalid request!"
        }
        return jsonify(to_send)


if __name__ == "__main__":
    app.run(port=1000, debug=True)