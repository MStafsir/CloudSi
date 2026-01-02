const fs = require('fs');
const path = require('path');

// Path configuration
const MEMBERS_PHOTO_DIR = path.join(__dirname, '../public/members');
const MEMBERS_DATA_FILE = path.join(__dirname, '../lib/members-data.ts');

console.log('🔍 Scanning untuk foto member...\n');

// Check if members photo directory exists
if (!fs.existsSync(MEMBERS_PHOTO_DIR)) {
  console.error(`❌ Folder ${MEMBERS_PHOTO_DIR} tidak ditemukan!`);
  console.log('💡 Buat folder tersebut dan upload foto dengan format: 1001.jpg, 1002.jpg, dst.');
  process.exit(1);
}

// Scan for photo files
const photoFiles = fs.readdirSync(MEMBERS_PHOTO_DIR)
  .filter(file => /^\d{4}\.(jpg|jpeg|png)$/i.test(file))
  .map(file => {
    const id = file.split('.')[0];
    const ext = file.split('.')[1];
    return { id, filename: file, ext };
  });

console.log(`✅ Ditemukan ${photoFiles.length} foto:\n`);
photoFiles.forEach(photo => {
  console.log(`   - ${photo.filename} → Member ID ${photo.id}`);
});

if (photoFiles.length === 0) {
  console.log('\n⚠️  Tidak ada foto yang ditemukan!');
  console.log('💡 Upload foto dengan format nama: 1001.jpg, 1002.jpg, dst ke folder public/members/');
  process.exit(0);
}

// Read members-data.ts file
console.log(`\n📝 Membaca file ${MEMBERS_DATA_FILE}...`);
let membersDataContent = fs.readFileSync(MEMBERS_DATA_FILE, 'utf-8');

// Track updates
let updateCount = 0;
const photoMap = {};
photoFiles.forEach(p => { photoMap[p.id] = p.filename; });

// Replace photoUrl for members that have photos
photoFiles.forEach(({ id, filename }) => {
  // Pattern to match the member entry with this ID
  const memberIdPattern = new RegExp(
    `(\\{[^}]*id:\\s*"${id}"[^}]*photoUrl:\\s*")([^"]+)("[^}]*\\})`,
    'gs'
  );
  
  const newPhotoUrl = `/members/${filename}`;
  
  membersDataContent = membersDataContent.replace(
    memberIdPattern,
    (match, prefix, oldUrl, suffix) => {
      if (oldUrl !== newPhotoUrl) {
        updateCount++;
        console.log(`   ✓ Updated Member ID ${id}: ${oldUrl} → ${newPhotoUrl}`);
      }
      return `${prefix}${newPhotoUrl}${suffix}`;
    }
  );
});

if (updateCount > 0) {
  // Write back to file
  fs.writeFileSync(MEMBERS_DATA_FILE, membersDataContent, 'utf-8');
  console.log(`\n✅ Berhasil update ${updateCount} member photoUrl di ${MEMBERS_DATA_FILE}`);
} else {
  console.log('\n⚠️  Tidak ada perubahan yang dilakukan.');
}

console.log(`\n📊 Summary:`);
console.log(`   - Total foto ditemukan: ${photoFiles.length}`);
console.log(`   - Total member di-update: ${updateCount}`);
console.log(`   - Member tanpa foto: ${76 - photoFiles.length}`);

if (photoFiles.length < 76) {
  console.log(`\n💡 Tip: Masih ada ${76 - photoFiles.length} member yang belum punya foto.`);
  console.log('   Upload foto dengan ID dari 1001 sampai 1076.');
}

console.log('\n✨ Selesai! Refresh browser Anda untuk melihat perubahan.\n');
