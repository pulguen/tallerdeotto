import os

def find_null_bytes(root_dir):
    for root, _, files in os.walk(root_dir):
        for fname in files:
            path = os.path.join(root, fname)
            try:
                data = open(path, 'rb').read()
            except Exception:
                continue
            if b'\x00' in data:
                print("❌ Null bytes in:", path)

if __name__ == "__main__":
    find_null_bytes("apps")
