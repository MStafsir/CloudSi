import os
from pathlib import Path

# Paths
MEMBERS_PHOTO_DIR = Path(__file__).parent.parent / "public" / "members"

# Get all member IDs from 1001 to 1076
all_member_ids = set()

# ID ranges that exist (based on the structure of members-data.ts)
# 1001-1076, but not consecutive
member_ids_expected = [
    "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009",
    "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", 
    "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", 
    "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", 
    "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", 
    "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", 
    "1055", "1056", "1057", "1058", "1059", "1060", "1061", "1062", "1063", 
    "1064", "1065", "1066", "1067", "1068", "1069", "1070", "1071", "1072", 
    "1073", "1074", "1075", "1076"
]

# Get uploaded photos
uploaded_photos = set()
for file in MEMBERS_PHOTO_DIR.iterdir():
    if file.is_file() and file.suffix.lower() in ['.jpg', '.jpeg', '.png']:
        member_id = file.stem
        if member_id.isdigit() and len(member_id) == 4:
            uploaded_photos.add(member_id)

# Find missing photos
missing_photos = sorted([mid for mid in member_ids_expected if mid not in uploaded_photos])

print("📊 Status Upload Foto Member")
print("=" * 50)
print(f"Total member yang diharapkan: {len(member_ids_expected)}")
print(f"Total foto yang sudah diupload: {len(uploaded_photos)}")
print(f"Total foto yang masih missing: {len(missing_photos)}")
print("\n🔴 Member yang belum punya foto:")
print("-" * 50)

for mid in missing_photos:
    print(f"   - {mid}.jpg")

print("\n✅ Foto yang sudah ada:")
print("-" * 50)
for mid in sorted(uploaded_photos):
    print(f"   - {mid}.jpg")
