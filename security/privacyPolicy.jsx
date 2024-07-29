import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.9', paddingBottom: '50px', padding: '25px', fontFamily: 'var(--poppins)', fontSize: '0.8rem', color: 'var(--primary)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Kebijakan Privasi Aplikasi Stresslo Ticket</h1>
      <p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '30px' }}>
        Terakhir diperbarui: 22 July 2024
      </p>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>1. Pengantar</h2>
        <p>Selamat datang di kebijakan privasi aplikasi Stresslo Ticket. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan aplikasi kami. Kami menghargai privasi Anda dan berkomitmen untuk melindunginya.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>2. Jenis Informasi yang Kami Kumpulkan</h2>
        <p>Kami dapat mengumpulkan beberapa atau semua informasi berikut saat Anda menggunakan aplikasi kami:</p>
        <ul>
          <li><strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon, dan informasi kontak lainnya.</li>
          <li><strong>Informasi Penggunaan:</strong> Data tentang cara Anda menggunakan aplikasi, seperti interaksi dengan fitur atau layanan kami.</li>
          <li><strong>Informasi Perangkat:</strong> Informasi tentang perangkat Anda, termasuk jenis perangkat keras dan perangkat lunak, informasi jaringan mobile, dan pengidentifikasi unik perangkat.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>3. Cara Kami Menggunakan Informasi Anda</h2>
        <p>Kami menggunakan informasi yang kami kumpulkan untuk:</p>
        <ul>
          <li>Menyediakan, mengoperasikan, dan memelihara aplikasi kami.</li>
          <li>Menyesuaikan dan meningkatkan pengalaman pengguna Anda.</li>
          <li>Mengelola akun Anda dan memberikan dukungan pelanggan.</li>
          <li>Mengirimkan pembaruan, pemberitahuan teknis, pembaruan keamanan, dan informasi administratif lainnya.</li>
          <li>Melakukan analisis data untuk memahami dan meningkatkan layanan kami.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>4. Bagaimana Kami Berbagi Informasi Anda</h2>
        <p>Kami dapat membagikan informasi pribadi Anda dalam situasi berikut:</p>
        <ul>
          <li>Dengan penyedia layanan, kontraktor, atau agen pihak ketiga yang membantu kami menyediakan layanan kami.</li>
          <li>Untuk mematuhi hukum, perintah pengadilan, atau peraturan pemerintah.</li>
          <li>Untuk melindungi hak dan properti kami, atau keselamatan pengguna kami.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>5. Keamanan Informasi</h2>
        <p>Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses yang tidak sah, penggunaan, atau pengungkapan yang tidak sah.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>6. Hak Anda</h2>
        <p>Anda memiliki hak untuk:</p>
        <ul>
          <li>Mengakses informasi pribadi yang kami simpan tentang Anda.</li>
          <li>Meminta perubahan atau perbaikan terhadap informasi pribadi yang tidak akurat atau tidak lengkap.</li>
          <li>Meminta penghapusan informasi pribadi Anda dalam beberapa situasi.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>7. Perubahan Kebijakan Privasi</h2>
        <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberitahukan Anda tentang perubahan material dengan memposting kebijakan yang diperbarui di situs web kami atau dengan mengirimkan pemberitahuan langsung.</p>
      </section>

      <section>
        <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '5px' }}>8. Cara Menghubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini atau cara kami mengelola data pribadi Anda, silakan hubungi kami melalui:</p>
        <p><strong>Alamat Email:</strong> stresslo.lab@gmail.com<br />
        <strong>Telepon Bisnis:</strong> +62 858 1354 9448</p>
      </section>

      <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '30px' }}>
        Terima kasih telah membaca kebijakan privasi kami. Dengan menggunakan aplikasi kami, Anda menyetujui pengumpulan dan penggunaan informasi seperti yang dijelaskan dalam kebijakan ini.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
