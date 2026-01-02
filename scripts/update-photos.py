import os
import re
from pathlib import Path

# Paths
MEMBERS_PHOTO_DIR = Path(__file__).parent.parent / "public" / "members"
MEMBERS_DATA_FILE = Path(__file__).parent.parent / "lib" / "members-data.ts"

print("🔍 Scanning for member photos...\n")

# Check if members photo directory exists
if not MEMBERS_PHOTO_DIR.exists():
    print(f"❌ Folder {MEMBERS_PHOTO_DIR} tidak ditemukan!")
    print("💡 Buat folder tersebut dan upload foto dengan format: 1002.jpg, 1003.jpg, dst.")
    exit(1)

# Scan for photo files
photo_files = []
for file in MEMBERS_PHOTO_DIR.iterdir():
    if file.is_file() and re.match(r'^\d{4}\.(jpg|jpeg|png)$', file.name, re.IGNORECASE):
        member_id = file.stem  # Get filename without extension
        photo_files.append({
            'id': member_id,
            'filename': file.name
        })

print(f"✅ Ditemukan {len(photo_files)} foto:\n")
for photo in sorted(photo_files, key=lambda x: x['id']):
    print(f"   - {photo['filename']} → Member ID {photo['id']}")

if len(photo_files) == 0:
    print("\n⚠️  Tidak ada foto yang ditemukan!")
    print("💡 Upload foto dengan format nama: 1002.jpg, 1003.jpg, dst ke folder public/members/")
    exit(0)

# Read members-data.ts file
print(f"\n📝 Membaca file {MEMBERS_DATA_FILE}...")
with open(MEMBERS_DATA_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Track updates
update_count = 0
original_content = content

# Create a mapping of ID to filename
photo_map = {p['id']: p['filename'] for p in photo_files}

# Update photoUrl for each member that has a photo
for member_id, filename in photo_map.items():
    new_photo_url = f"/members/{filename}"
    
    # Pattern to find the member object with this ID
    # Looking for: id: "XXXX", ... photoUrl: "anything"
    pattern = rf'(\bid:\s*"{member_id}",[\s\S]*?photoUrl:\s*\n?\s*")([^"]+)(")'
    
    matches = re.findall(pattern, content)
    if matches:
        for match in matches:
            old_url = match[1]
            if old_url != new_photo_url:
                update_count += 1
                print(f"   ✓ Updated Member ID {member_id}: {old_url[:50]}... → {new_photo_url}")
                # Replace in content
                old_str = f'{match[0]}{match[1]}{match[2]}'
                new_str = f'{match[0]}{new_photo_url}{match[2]}'
                content = content.replace(old_str, new_str, 1)


# Write back to file if there were changes
if update_count > 0:
    with open(MEMBERS_DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n✅ Berhasil update {update_count} member photoUrl di {MEMBERS_DATA_FILE.name}")
else:
    print("\n⚠️  Tidak ada perubahan yang dilakukan.")

print(f"\n📊 Summary:")
print(f"   - Total foto ditemukan: {len(photo_files)}")
print(f"   - Total member di-update: {update_count}")
print(f"   - Member tanpa foto: {76 - len(photo_files)}")

if len(photo_files) < 76:
    print(f"\n💡 Tip: Masih ada {76 - len(photo_files)} member yang belum punya foto.")
    print("   Upload foto dengan ID dari 1001 sampai 1076.")

print("\n✨ Selesai! Refresh browser Anda untuk melihat perubahan.\n")
