from fastapi import FastAPI, Request, WebSocket
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
import uvicorn
from pathlib import Path
import asyncio


app= FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class= HTMLResponse)
async def home(request: Request):
    print('request :', request.method)

    return templates.TemplateResponse(request= request, name="index.html", context={"title": "home page", "message": "loading index.html page"}
                                    #    {"request": request, "title": "home page",'message': 'loading index.html page'}
                                       )

<<<<<<< HEAD
=======
# @app.get("/info", response_class= HTMLResponse)
# async def info(request: Request):
#     print(' youve reached the info endpoint ')
>>>>>>> 8dd7e0c39acd19ed37f421f1cfa424d8c795fd91

    
if __name__ == "__main__":
    print('starting server at port 4000 _________________'.upper())
    uvicorn.run(app, port= 4000, host= '0.0.0.0')

else :
    # print(__name__)
    print('starting server at port 8000 _________________'.upper())