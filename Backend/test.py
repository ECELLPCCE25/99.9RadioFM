from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import pandas as pd
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def categorize(recipient: str) -> str:
    r = recipient.lower()
    if any(x in r for x in ["jio", "vi", "spotify", "tata sky", "data"]):
        return "Recharges"
    elif any(x in r for x in ["food", "zomato"]):
        return "Food"
    elif any(x in r for x in ["hotel", "hospitality", "hotels", "college"]):
        return "Education"
    elif "fuel" in r:
        return "Fuel"
    elif "electricity" in r:
        return "Electricity"
    elif any(x in r for x in ["ticket", "ticketing", "travel"]):
        return "Traveling"
    elif any(x in r for x in ["choco", "chocolate"]):
        return "Chocolates"
    else:
        return "Other"

@app.route('/process', methods=['POST'])
def process_html():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Parse the uploaded HTML file
        soup = BeautifulSoup(file.read(), "html.parser")
        blocks = soup.find_all("div", class_="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp")

        sent_data = []

        for block in blocks:
            try:
                service = block.find("p", class_="mdl-typography--title").get_text(strip=True)
                if "Google Pay" not in service:
                    continue

                content = block.find("div", class_="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1")
                if not content:
                    continue

                # Extract all lines in order
                lines = content.get_text(separator="\n", strip=True).split("\n")
                lines = [line.strip() for line in lines if line.strip()]

                # Join all lines and try to find amount + direction
                full_text = " ".join(lines)
                amount_match = re.search(r"₹[\d,]+(?:\.\d{2})?", full_text)
                amount = amount_match.group(0) if amount_match else ""

                # Identify if it's Paid
                direction = "Paid" if "Paid" in full_text else ""
                if direction != "Paid":
                    continue

                # Extract recipient
                to_match = re.search(r"to (.*?) using", full_text)
                recipient = to_match.group(1).strip() if to_match else "Unknown"

                # Join all lines to form a timestamp string and extract timestamp
                combined = " ".join(lines)
                ts_match = re.search(r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4},\s+\d{1,2}:\d{2}:\d{2}", combined)
                timestamp_start = ts_match.start() if ts_match else -1
                full_timestamp = combined[timestamp_start:].strip() if timestamp_start != -1 else ""

                # Extract clean date
                date_match = re.search(r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}", full_timestamp)
                clean_date = date_match.group(0).strip() if date_match else ""

                # Get transaction status
                caption = block.find("div", class_="content-cell mdl-cell mdl-cell--12-col mdl-typography--caption")
                caption_lines = caption.get_text(separator="\n", strip=True).split("\n")
                status = caption_lines[4] if len(caption_lines) > 4 else ""
                if status.lower() != "completed":
                    continue

                # Append data
                sent_data.append({
                    "moneyPaid": amount.replace("₹", ""),
                    "to": recipient,
                    "category": categorize(recipient),
                    "date": clean_date,
                    "fullTimestamp": full_timestamp
                })

            except Exception as e:
                print(f"❌ Error in a block: {e}")

        # Return the JSON response
        return jsonify(sent_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
