from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS Middleware ---
# This is crucial for allowing your frontend (on a different port)
# to communicate with your backend.
origins = [
    "http://localhost:3000", # The default port for Next.js
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------


@app.get("/")
def read_root():
    return {"Status": "API is running!"}

@app.get("/ping")
def send_ping():
    return {"message": "🏓 Pong! I am the backend speaking."}