from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path

app = FastAPI()

@app.post("/upload")
async def upload_image(file: UploadFile = File(...,content_type=["image/jpg","image/jpeg"])):
    # Process the uploaded image
    contents = await file.read()

    # Define the directory to save images (create it if it doesn't exist)
    save_directory = Path("Problem")
    save_directory.mkdir(parents=True, exist_ok=True)

    # Create a path for the saved image using the original filename
    save_path = save_directory / file.filename

    # Save the image to the specified directory
    with save_path.open("wb") as image_file:
        image_file.write(contents)

    return JSONResponse(content={"message": "Image uploaded and saved successfully", "filename": file.filename})
