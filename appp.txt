# app.py - Fixed for homepage navigation

from flask import Flask, send_from_directory, abort, redirect  # ← Added 'redirect'
from datetime import datetime

app = Flask(__name__, static_folder='assets', template_folder='.')

# === Logging ===
def log_visit(route):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"🎯 VISIT: {route} | Time: {timestamp}")

# === Home Page ===
@app.route('/')
@app.route('/index.html')
def home():
    log_visit("/")
    return send_from_directory('.', 'index.html')

# === Serve pages from /about.html, /gameplay.html, etc. ===
@app.route('/<page>')
def root_page(page):
    valid_pages = ['about.html', 'gameplay.html', 'download.html', 'contact.html']
    if page not in valid_pages:
        log_visit(f"404 - Invalid: /{page}")
        abort(404)
    log_visit(f"/{page}")
    return send_from_directory('pages', page)

# === Optional: Support /pages/about.html → redirect to /about.html ===
@app.route('/pages/<page>')
def pages_route(page):
    valid_pages = ['about.html', 'gameplay.html', 'download.html', 'contact.html']
    if page not in valid_pages:
        log_visit(f"404 - Invalid: /pages/{page}")
        abort(404)
    log_visit(f"/pages/{page} → /{page}")
    return redirect(f"/{page}", code=302)  # ✅ Now works

# === Static Files ===
@app.route('/css/<file>')
def css(file):
    log_visit(f"/css/{file}")
    return send_from_directory('css', file)

@app.route('/js/<file>')
def js(file):
    log_visit(f"/js/{file}")
    return send_from_directory('js', file)

@app.route('/assets/<path:filename>')
def assets(filename):
    log_visit(f"/assets/{filename}")
    return send_from_directory('assets', filename)

# === Favicon ===
@app.route('/favicon.ico')
def favicon():
    log_visit("/favicon.ico")
    return send_from_directory('assets/images', 'icon.png', mimetype='image/png')

# === Error Handler ===
@app.errorhandler(404)
def not_found(e):
    log_visit("404 - Not Found")
    return """
    <h1>Page not found</h1>
    <p>The requested page could not be found.</p>
    <p><a href='/' style='color: #ff6b6b;'>← Back to Home</a></p>
    """, 404

# === Run ===
if __name__ == '__main__':
    print("\n🟢 Shadow Realm Server Running")
    print("✅ Now supports: /, /index.html, /about.html, etc.")
    print("🌐 Visit: http://localhost:8000")
    print("🛑 Press Ctrl+C to stop\n")
    app.run(host='0.0.0.0', port=8000, debug=False)
