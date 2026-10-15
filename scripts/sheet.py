#!/usr/bin/env python3
"""Lee y escribe filas en el Google Sheet "Biblioteca carruseles".

Usa una cuenta de servicio de Google. La clave JSON se lee de la variable de
entorno GOOGLE_SA_JSON: el contenido del .json, ese contenido en base64 (una
sola línea, lo recomendado para el formato .env) o la ruta al archivo.
La cuenta de servicio solo puede tocar los Sheets compartidos con su correo.

Uso:
  python3 scripts/sheet.py check                 # prueba la conexión
  python3 scripts/sheet.py read                  # imprime todas las filas (TSV)
  python3 scripts/sheet.py append fila.json      # agrega una fila (lista JSON)
  python3 scripts/sheet.py update 5 fila.json    # reemplaza la fila 5 (1 = encabezados)
"""
import base64
import json
import os
import sys
import time
import urllib.parse

import requests
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

SHEET_ID = "1O1vIfHdAsNxPzPEc77jyucCwQaA0lj94HewRIbE_lqU"
API = "https://sheets.googleapis.com/v4/spreadsheets/" + SHEET_ID
SCOPE = "https://www.googleapis.com/auth/spreadsheets"


def load_key():
    raw = os.environ.get("GOOGLE_SA_JSON", "").strip()
    if not raw:
        sys.exit("Falta GOOGLE_SA_JSON en el entorno (ver CLAUDE.md, sección Biblioteca).")
    if not raw.startswith("{"):
        if os.path.isfile(raw):
            with open(raw) as f:
                raw = f.read()
        else:
            # Clave en base64 (una sola línea): la forma más fácil de pegarla en formato .env.
            raw = base64.b64decode(raw + "=" * (-len(raw) % 4)).decode("utf-8-sig")
    return json.loads(raw)


def b64(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def token(key):
    now = int(time.time())
    header = b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64(json.dumps({
        "iss": key["client_email"], "scope": SCOPE,
        "aud": "https://oauth2.googleapis.com/token", "iat": now, "exp": now + 3600,
    }).encode())
    pk = serialization.load_pem_private_key(key["private_key"].encode(), password=None)
    sig = b64(pk.sign(f"{header}.{claims}".encode(), padding.PKCS1v15(), hashes.SHA256()))
    r = requests.post("https://oauth2.googleapis.com/token", data={
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": f"{header}.{claims}.{sig}",
    }, timeout=30)
    r.raise_for_status()
    return r.json()["access_token"]


def first_tab(headers):
    r = requests.get(API, headers=headers, params={"fields": "sheets.properties.title"}, timeout=30)
    r.raise_for_status()
    return r.json()["sheets"][0]["properties"]["title"]


def rng(tab, a1):
    return urllib.parse.quote(f"'{tab}'!{a1}", safe="")


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    key = load_key()
    headers = {"Authorization": "Bearer " + token(key)}
    tab = first_tab(headers)
    cmd = sys.argv[1]

    if cmd == "check":
        print(f"OK: conectado como {key['client_email']} a la pestaña '{tab}'")
    elif cmd == "read":
        r = requests.get(f"{API}/values/{rng(tab, 'A:Z')}", headers=headers, timeout=30)
        r.raise_for_status()
        for i, row in enumerate(r.json().get("values", []), start=1):
            print(i, *row, sep="\t")
    elif cmd == "append":
        row = json.load(open(sys.argv[2]))
        r = requests.post(f"{API}/values/{rng(tab, 'A1')}:append", headers=headers,
                          params={"valueInputOption": "USER_ENTERED", "insertDataOption": "INSERT_ROWS"},
                          json={"values": [row]}, timeout=30)
        r.raise_for_status()
        print("Fila agregada:", r.json()["updates"]["updatedRange"])
    elif cmd == "update":
        n, row = int(sys.argv[2]), json.load(open(sys.argv[3]))
        r = requests.put(f"{API}/values/{rng(tab, f'A{n}')}", headers=headers,
                         params={"valueInputOption": "USER_ENTERED"},
                         json={"values": [row]}, timeout=30)
        r.raise_for_status()
        print("Fila actualizada:", r.json()["updatedRange"])
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
