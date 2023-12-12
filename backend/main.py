from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

app = FastAPI(
    debug=True,
    max_upload_size=100 * 1024 * 1024 
              )

# CORS configuration to allow all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    print(f"Content-Type: {file.content_type}")
    print(f"File size: {len(await file.read())} bytes")
    print(f"File content: {await file.read()}")  # Add this line to inspect file content
    
    try:
        contents = await file.read()
        save_directory = Path("Problem")
        save_directory.mkdir(parents=True, exist_ok=True)
        save_path = save_directory / file.filename
        
        with save_path.open("wb") as image_file:
            image_file.write(contents)
        
        return {"message": "Image uploaded and saved successfully", "filename": file.filename}
    except Exception as e:
        print(f"Error processing image: {e}")
        raise
