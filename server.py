"""Simple static server: run `python3 server.py` and open http://localhost:8000
This uses the standard library so no extra dependencies are required.
"""
import http.server
import socketserver

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down')
        httpd.server_close()
