// Mock user data
export const usersMockData = [
  {
    id: '1',
    username: 'admin',
    name: 'Administrator',
    role: 'admin' as const,
    email: 'admin@imomantap.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    username: 'perawat1',
    name: 'Dian Perawat',
    role: 'nurse' as const,
    email: 'dian@imomantap.com',
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    username: 'pasien1',
    name: 'Budi Santoso',
    role: 'patient' as const,
    email: 'budi@gmail.com',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
  }
];

// Mock patient data
export const patientsMockData = [
  {
    id: '3',
    name: 'Budi Santoso',
    age: 45,
    gender: 'Laki-laki',
    bloodPressure: '140/90',
    medicationAdherence: 85,
    assignedNurse: 'Dian Perawat',
    lastCheckup: '2023-06-15',
    medications: [
      { name: 'Amlodipine', dosage: '10mg', schedule: 'Pagi', status: 'taken' },
      { name: 'Lisinopril', dosage: '20mg', schedule: 'Malam', status: 'missed' }
    ]
  },
  {
    id: '4',
    name: 'Siti Rahayu',
    age: 52,
    gender: 'Perempuan',
    bloodPressure: '135/85',
    medicationAdherence: 95,
    assignedNurse: 'Dian Perawat',
    lastCheckup: '2023-06-10',
    medications: [
      { name: 'Losartan', dosage: '50mg', schedule: 'Pagi', status: 'taken' },
      { name: 'Hydrochlorothiazide', dosage: '25mg', schedule: 'Malam', status: 'taken' }
    ]
  },
  {
    id: '5',
    name: 'Agus Wijaya',
    age: 63,
    gender: 'Laki-laki',
    bloodPressure: '150/95',
    medicationAdherence: 65,
    assignedNurse: 'Dian Perawat',
    lastCheckup: '2023-06-05',
    medications: [
      { name: 'Metoprolol', dosage: '50mg', schedule: 'Pagi', status: 'missed' },
      { name: 'Amlodipine', dosage: '5mg', schedule: 'Malam', status: 'taken' }
    ]
  }
];

// Mock adherence data for charts
export const adherenceData = {
  weekly: {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Pagi',
        data: [1, 1, 0, 1, 1, 1, 0],
        backgroundColor: 'rgba(74, 222, 128, 0.6)',
      },
      {
        label: 'Malam',
        data: [1, 1, 1, 0, 1, 0, 1],
        backgroundColor: 'rgba(56, 189, 248, 0.6)',
      }
    ]
  },
  monthly: {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [
      {
        label: 'Kepatuhan (%)',
        data: [80, 75, 85, 95],
        backgroundColor: 'rgba(74, 222, 128, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      }
    ]
  }
};

// Mock blood pressure data
export const bloodPressureData = {
  labels: ['1 Jun', '8 Jun', '15 Jun', '22 Jun', '29 Jun', '6 Jul', '13 Jul'],
  datasets: [
    {
      label: 'Sistolik',
      data: [145, 140, 138, 142, 135, 130, 132],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderWidth: 2,
      tension: 0.3,
    },
    {
      label: 'Diastolik',
      data: [95, 90, 88, 92, 85, 80, 82],
      borderColor: 'rgb(56, 189, 248)',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      borderWidth: 2,
      tension: 0.3,
    }
  ]
};

// Mock health articles
export const articlesMockData = [
  {
    id: '1',
    title: 'Pentingnya Kepatuhan Minum Obat Hipertensi',
    summary: 'Mengetahui mengapa kepatuhan minum obat sangat penting untuk mengendalikan tekanan darah tinggi dan mencegah komplikasi jangka panjang.',
    content: `
      <h2>Pentingnya Kepatuhan Minum Obat Hipertensi</h2>
      
      <p>Hipertensi, atau tekanan darah tinggi, sering disebut sebagai "pembunuh diam-diam" karena sering tidak menunjukkan gejala yang jelas. Namun, jika tidak diobati atau dikendalikan dengan baik, hipertensi dapat menyebabkan kerusakan serius pada jantung, otak, ginjal, dan organ vital lainnya.</p>
      
      <p>Salah satu faktor kunci dalam pengelolaan hipertensi adalah kepatuhan dalam minum obat. Kepatuhan ini berarti mengonsumsi obat sesuai dengan dosis dan jadwal yang diresepkan oleh dokter. Sayangnya, banyak pasien hipertensi yang gagal dalam hal ini.</p>
      
      <h3>Mengapa Kepatuhan Minum Obat Sangat Penting?</h3>
      
      <ol>
        <li><strong>Pengontrolan Tekanan Darah yang Konsisten</strong> - Obat hipertensi bekerja dengan menjaga tekanan darah tetap dalam kisaran normal. Ketika dosis terlewat, tekanan darah dapat naik kembali, menempatkan pembuluh darah dan organ di bawah tekanan.</li>
        <li><strong>Mencegah Komplikasi</strong> - Hipertensi yang tidak terkontrol dapat menyebabkan stroke, serangan jantung, gagal jantung, gagal ginjal, dan bahkan kebutaan.</li>
        <li><strong>Mengurangi Risiko Kematian Dini</strong> - Penelitian menunjukkan bahwa pasien yang patuh dengan pengobatan hipertensi memiliki angka harapan hidup yang lebih tinggi.</li>
        <li><strong>Menghindari Efek "Rebound"</strong> - Berhenti minum obat hipertensi secara tiba-tiba dapat menyebabkan lonjakan tekanan darah yang berbahaya.</li>
      </ol>
      
      <h3>Tips Meningkatkan Kepatuhan Minum Obat</h3>
      
      <ul>
        <li>Gunakan pengingat harian seperti alarm atau aplikasi di ponsel</li>
        <li>Simpan obat di tempat yang mudah terlihat setiap hari</li>
        <li>Gunakan kotak obat mingguan untuk mengatur dosis</li>
        <li>Jadikan minum obat sebagai bagian dari rutinitas harian Anda</li>
        <li>Minta dukungan dari anggota keluarga</li>
        <li>Diskusikan dengan dokter jika Anda mengalami efek samping</li>
      </ul>
      
      <p>Ingat, pengobatan hipertensi umumnya merupakan perawatan jangka panjang. Banyak pasien perlu mengonsumsi obat seumur hidup untuk menjaga tekanan darah mereka tetap terkontrol. Jangan mengubah dosis atau berhenti minum obat tanpa berkonsultasi dengan dokter terlebih dahulu.</p>
      
      <p>Dengan memahami pentingnya kepatuhan dan mengikuti rejimen pengobatan yang diresepkan, Anda dapat secara efektif mengelola hipertensi dan menjalani kehidupan yang lebih sehat dan lebih lama.</p>
    `,
    image: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-06-10',
    author: 'dr. Handoko Wijaya',
    category: 'Kepatuhan Obat'
  },
  {
    id: '2',
    title: 'Makanan yang Harus Dihindari bagi Penderita Hipertensi',
    summary: 'Panduan lengkap tentang jenis makanan yang sebaiknya dibatasi atau dihindari untuk membantu mengelola tekanan darah tinggi.',
    content: `
      <h2>Makanan yang Harus Dihindari bagi Penderita Hipertensi</h2>
      
      <p>Pola makan memainkan peran penting dalam mengelola hipertensi atau tekanan darah tinggi. Beberapa makanan dapat meningkatkan tekanan darah, sementara yang lain dapat membantu menurunkannya. Artikel ini akan membahas makanan-makanan yang sebaiknya dihindari atau dibatasi jika Anda menderita hipertensi.</p>
      
      <h3>Makanan Tinggi Natrium (Garam)</h3>
      
      <p>Natrium adalah musuh utama bagi penderita hipertensi. Konsumsi natrium yang tinggi menyebabkan tubuh menahan air, yang meningkatkan volume darah dan tekanan pada dinding arteri. Batasi konsumsi:</p>
      
      <ul>
        <li>Garam meja</li>
        <li>Makanan olahan dan kemasan</li>
        <li>Makanan kaleng</li>
        <li>Daging olahan (sosis, ham, bacon)</li>
        <li>Makanan cepat saji</li>
        <li>Keripik asin dan makanan ringan</li>
        <li>Saus dan bumbu instan</li>
      </ul>
      
      <h3>Makanan Tinggi Lemak Jenuh dan Trans</h3>
      
      <p>Lemak jenuh dan trans dapat meningkatkan kadar kolesterol darah, yang dapat menyebabkan penumpukan plak di arteri dan meningkatkan risiko hipertensi. Batasi konsumsi:</p>
      
      <ul>
        <li>Daging berlemak</li>
        <li>Produk susu penuh lemak</li>
        <li>Minyak kelapa dan minyak kelapa sawit</li>
        <li>Makanan yang digoreng</li>
        <li>Kue kering, kue, dan pastry</li>
        <li>Margarin dan mentega</li>
      </ul>
      
      <h3>Minuman yang Perlu Dibatasi</h3>
      
      <ul>
        <li><strong>Alkohol</strong> - Konsumsi berlebihan dapat meningkatkan tekanan darah</li>
        <li><strong>Kafein</strong> - Kopi, teh, dan minuman energi dapat menyebabkan lonjakan tekanan darah jangka pendek</li>
        <li><strong>Minuman bersoda</strong> - Tinggi gula dan kadang-kadang kafein</li>
      </ul>
      
      <h3>Alternatif Sehat untuk Penderita Hipertensi</h3>
      
      <p>Sebagai gantinya, fokus pada pola makan DASH (Dietary Approaches to Stop Hypertension) yang meliputi:</p>
      
      <ul>
        <li>Buah-buahan dan sayuran segar</li>
        <li>Biji-bijian utuh</li>
        <li>Ikan, unggas, dan kacang-kacangan</li>
        <li>Produk susu rendah lemak</li>
        <li>Garam herbal dan bumbu tanpa natrium</li>
      </ul>
      
      <p>Ingat bahwa perubahan pola makan harus dilakukan secara bertahap. Selalu konsultasikan dengan dokter atau ahli gizi sebelum melakukan perubahan diet yang signifikan, terutama jika Anda sedang mengonsumsi obat-obatan tertentu.</p>
    `,
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-06-15',
    author: 'Anita Nugroho, S.Gz',
    category: 'Pola Makan'
  },
  {
    id: '3',
    title: 'Olahraga yang Aman untuk Penderita Hipertensi',
    summary: 'Panduan tentang jenis aktivitas fisik yang aman dan bermanfaat untuk membantu menurunkan dan mengendalikan tekanan darah tinggi.',
    content: `
      <h2>Olahraga yang Aman untuk Penderita Hipertensi</h2>
      
      <p>Aktivitas fisik yang teratur adalah komponen penting dalam mengelola hipertensi. Olahraga dapat membantu menurunkan tekanan darah, mengurangi stres, dan meningkatkan kesehatan jantung secara keseluruhan. Namun, penting untuk memilih jenis olahraga yang tepat dan aman, terutama jika Anda memiliki tekanan darah tinggi.</p>
      
      <h3>Manfaat Olahraga untuk Penderita Hipertensi</h3>
      
      <ul>
        <li>Menurunkan tekanan darah sistolik dan diastolik</li>
        <li>Menguatkan jantung sehingga dapat memompa darah lebih efisien</li>
        <li>Membantu menurunkan berat badan</li>
        <li>Mengurangi kadar stres dan kecemasan</li>
        <li>Meningkatkan sensitivitas insulin</li>
      </ul>
      
      <h3>Olahraga yang Direkomendasikan</h3>
      
      <h4>1. Aktivitas Aerobik Intensitas Sedang</h4>
      
      <p>Aktivitas aerobik intensitas sedang sangat cocok untuk penderita hipertensi karena meningkatkan detak jantung secara bertahap tanpa membebani sistem kardiovaskular:</p>
      
      <ul>
        <li><strong>Jalan cepat</strong> - Mudah dilakukan dan tidak memerlukan peralatan khusus</li>
        <li><strong>Bersepeda santai</strong> - Baik di luar ruangan atau menggunakan sepeda statis</li>
        <li><strong>Berenang</strong> - Memberi dukungan pada sendi dan mengurangi tekanan pada tubuh</li>
        <li><strong>Senam air</strong> - Menawarkan resistensi air tanpa membebani sendi</li>
        <li><strong>Menari</strong> - Menyenangkan dan dapat disesuaikan dengan berbagai tingkat intensitas</li>
      </ul>
      
      <h4>2. Latihan Kekuatan Ringan</h4>
      
      <p>Latihan kekuatan juga bermanfaat, tetapi harus dilakukan dengan beban ringan dan repetisi yang lebih banyak:</p>
      
      <ul>
        <li>Latihan dengan resistance band</li>
        <li>Latihan beban ringan dengan banyak repetisi</li>
        <li>Latihan menggunakan berat tubuh (push-up dinding, squat dengan kursi)</li>
      </ul>
      
      <h4>3. Aktivitas Fleksibilitas dan Keseimbangan</h4>
      
      <ul>
        <li><strong>Yoga</strong> - Terutama gaya yang lebih lembut seperti hatha atau yoga pemula</li>
        <li><strong>Tai Chi</strong> - Gerakan lambat dan mengalir dengan fokus pada pernapasan</li>
        <li><strong>Pilates dasar</strong> - Memperkuat otot inti tanpa meningkatkan tekanan darah secara signifikan</li>
      </ul>
      
      <h3>Panduan Berolahraga untuk Penderita Hipertensi</h3>
      
      <ol>
        <li><strong>Konsultasi dengan dokter terlebih dahulu</strong>, terutama jika Anda baru akan memulai program olahraga</li>
        <li><strong>Mulai perlahan</strong> dan tingkatkan intensitas secara bertahap</li>
        <li><strong>Pemanasan dan pendinginan</strong> sangat penting untuk mencegah lonjakan tekanan darah</li>
        <li><strong>Hindari menahan napas</strong> saat berolahraga, karena dapat meningkatkan tekanan darah</li>
        <li><strong>Pantau tekanan darah</strong> sebelum dan sesudah berolahraga</li>
        <li><strong>Berlatih secara teratur</strong> - Idealnya 150 menit aktivitas aerobik intensitas sedang per minggu</li>
        <li><strong>Hindari olahraga di cuaca ekstrem</strong> (terlalu panas atau terlalu dingin)</li>
      </ol>
      
      <h3>Olahraga yang Sebaiknya Dihindari</h3>
      
      <ul>
        <li>Aktivitas intensitas tinggi seperti sprinting</li>
        <li>Angkat beban berat</li>
        <li>Olahraga yang melibatkan Valsalva maneuver (menahan napas saat mengerahkan tenaga)</li>
        <li>Aktivitas yang menyebabkan perubahan posisi yang cepat</li>
      </ul>
      
      <p>Ingat, konsistensi lebih penting daripada intensitas. Olahraga teratur dengan intensitas sedang dapat memberikan manfaat yang signifikan untuk mengelola hipertensi dan meningkatkan kesehatan secara keseluruhan.</p>
    `,
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2023-06-20',
    author: 'Bima Pratama, Fisioterapis',
    category: 'Aktivitas Fisik'
  }
];