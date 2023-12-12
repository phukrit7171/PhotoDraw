from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/upload-image")
