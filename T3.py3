import webbrowser
import json
from base64 import b64encode
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto import Random
from Crypto.Util.Padding import pad
import binascii

BLOCK_SIZE = 16

def format(data):#### modifica el tamaño mensaje, es la unica forma de conseguir el formato adecuado para decifrar en el js
    length = BLOCK_SIZE - (len(data) % BLOCK_SIZE)
    return data + chr(length)*length

def cifrar(message, key):#### Cifrar
    IV = Random.new().read(BLOCK_SIZE)
    aes = AES.new(key, AES.MODE_OFB, IV)
    asd=format(message)
    asd=bytearray(asd,'utf-8')
    return b64encode(IV+aes.encrypt(pad(asd,AES.block_size)))

def decifrar(encrypted, key):### Decifrar/SOLO TESTEO
    encrypted = b64decode(encrypted)
    IV = encrypted[:BLOCK_SIZE]
    aes = AES.new(key, AES.MODE_OFB, IV)
    return aes.decrypt(encrypted[BLOCK_SIZE:])
    

###interfaz simple para introducir mensaje y su clave NOTA: solo acepta llaves de 16 caracteres
print("introducir mensaje a cifrar")
mess=str(input())+" "
#mess="mensaje de prueba"
#key="testtesttesttest"
print("introducir llave de 16 caracteres")
key = str(input())
while len(key) != 16:
	print("llave no es del tamaño aceptable")
	key = input()
keyb= bytearray(key,'utf-8')
#print("mensaje:",mess," cifrada:",cifrar(mess,keyb).decode('utf-8')) TESTER

f = open('Tarea3.html','w')

message = """<script src="https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.js"></script>

<p>Este sitio contiene un mensaje secreto</p>
<div class="algorithm" id="""+cifrar(mess,keyb).decode('utf-8')+"""></div>
<div id="after"></div>
"""
f.write(message)
f.close()

webbrowser.open_new_tab("file:///home/alex/Desktop/Tarea3.html")
