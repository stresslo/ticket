import React from 'react'
import "./guide.css"
import { useNavigate } from 'react-router-dom'
import Back from '../src/components/control/back';
import samplePDF from '../utils/samplePDF';

const Guide = () => {

    const navigate = useNavigate();

    return (
        <>
        <Back/>
        <div className='scroll-content'>
            <div style={{width: '100%', height: 'max-content', marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: "center"}}>
               <div className='box-guide'>
                    <img src="/img/user.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Masuk / Daftar</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', lineHeight: '1.5', color: 'var(--primary)', fontSize: '0.8rem'}}>
                        Masuk atau Daftar ke akun StressLo Ticket untuk mengakses dan menyimpan data acara, detail ticket, dan informasi penting lainnya dengan aman.
                    </div>
               </div>
               <div className='box-guide'>
                    <img src="/img/event.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Buat Event</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', color: 'var(--primary)', lineHeight: '1.5', fontSize: '0.8rem'}}>
                        Buat event baru untuk memudahkan pengelolaan pada ticket yang akan dibuat nanti. Masukan nama event, tanggal mulai, dan upload Template PDF.
                    </div>
               </div>
               <div className='box-guide'>
                    <img src="/img/ticket.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Buat Ticket</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', color: 'var(--primary)', lineHeight: '1.5', fontSize: '0.8rem'}}>
                        Buat ticket berdasarkan event yang telah kamu buat sebelumnya, kamu akan diminta memasukan data nama pembeli ticket mu.
                    </div>
               </div>
               <div className='box-guide'>
                    <img src="/img/pdf.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Unduh File</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', color: 'var(--primary)', lineHeight: '1.5', fontSize: '0.8rem'}}>
                        QR Code akan di generate ke dalam Template PDF yang telah di upload sebelumnya, dan file ticket akan otomatis ter-download dan siap untuk di scan.
                    </div>
               </div>
               <div className='box-guide'>
                    <img src="/img/share.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Bagikan ticket</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', color: 'var(--primary)', lineHeight: '1.5', fontSize: '0.8rem'}}>
                        Setelah file ticket berhasil dibuat dan diunduh, kirim ticket kepada pembeli baik secara digital maupun secara bentuk fisik setelah file dicetak.
                    </div>
               </div>
               <div className='box-guide'>
                    <img src="/img/scan.png" width={45} alt="" />
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)'}}>Verifikasi ticket</div>
                    <div style={{fontFamily: 'var(--quicksand)', textAlign: 'center', color: 'var(--primary)', lineHeight: '1.5', fontSize: '0.8rem'}}>
                        Verifikasi ticket dengan menggunakan QR code untuk memastikan ticket valid dan ter-verifikasi pada saat event atau acara berlangsung.
                    </div>
               </div>
            </div>
            <ul>
                <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)', fontSize: "1rem", marginTop: '30px'}}>1. Buat Event</div>
                <li>Masukan data yang diperlukan untuk event baru e.g. nama event, tanggal, dll.</li>
                <li>Upload template ticket PDF dalam format <strong>.pdf</strong> dengan ukuran Maksimal <strong>5MB</strong>.</li>
                <li><strong>Sesuaikan</strong> template PDF mu dengan panduan disini <span onClick={() => samplePDF()}>contoh-template-pdf</span></li>
            </ul>
            <ul>
                <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)', fontSize: "1rem", marginTop: '20px'}}>2. Buat Ticket</div>
                <li><strong>Pastikan kamu telah melakukan transaksi dengan pembeli diluar platform.</strong></li>
                <li>Masukan data pembeli.</li>
                <li><strong>Pilih</strong> dan <strong>sesuaikan</strong> dengan event yang telah kamu buat.</li>
                <li>Setelah berhasil, File ticket akan otomatis ter-generate QR Code dan akan otomatis ter-download.</li>
                <li><strong>Kirim</strong> dan <strong>bagikan</strong> ticket kepada pembeli.</li>
            </ul>
            <ul>
                <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)', fontSize: "1rem", marginTop: '20px'}}>3. Verifikasi Ticket</div>
                <li>Kunjungi halaman <a onClick={() => navigate('/scanner')}><span>https://ticket.stresslo.com/scanner</span></a></li>
                <li>Klik tombol scan untuk memulai scanner.</li>
                <li>Lakukan scanning pada ticket yang akan di verifikasi.</li>
                <li>Hasil scan akan ditampilkan pada layar, dan kamu bisa lihat data hasil scan secara detail.</li>
            </ul>
        </div>
        <div style={{width: '100%', display: 'flex', color: 'var(--text)', fontSize: '0.8rem', justifyContent: 'center', alignItems: 'center', padding: '10px 0', fontFamily: 'var(--mono)', backgroundColor: 'var(--primary)'}}>
            Copyright © 2024 stresslo.
        </div>
        </>
    )
}

export default Guide