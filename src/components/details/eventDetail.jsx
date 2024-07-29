import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../control/back';
import axios from 'axios';
import moment from 'moment';
import Loader from '../../../utils/loader';
import swalert from '../../../utils/swalert';
import Swal from 'sweetalert2';

const EventDetail = () => {

    const endpoint = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const width = window.innerWidth;

    const [data, setData] = useState([])
    const [itemsPerPage] = useState(10);
    const [update, setUpdate] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); 
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newDirection);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.idcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.event.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const getDataTicket = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${endpoint}/tickets/events/${state.event}`)
            response.data.data && setData(response.data.data);
        } catch (error) {
            return false;
        } finally {
            setLoading(false)
        }
    }

    const donwloadFile = async (url) => {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            const blobUrl = URL.createObjectURL(new Blob([response.data]));

            const parts = url.split('/');
            const dynamicName = parts[parts.length - 1];

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = `${dynamicName}.pdf`; 

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        } catch (error) {
            return false;
        }
    }

    const deleteTicket = async (idcode) => {
        const res = await Swal.fire({
            icon                : "info",
            text                : "apakah kamu yakin ingin menghapus?",
            iconColor           : "var(--yellow)",
            color               : 'var(--yellow)',
            background          : 'var(--primary)',
            customClass         : { container: "alertext" },
            allowOutsideClick   : false,
            showDenyButton      : true,
            confirmButtonText   : "Batalkan",
            confirmButtonColor  : "var(--prime)",
            denyButtonText      : "Hapus",
        })
        if (res.isDenied) {
            try {
                const response = await axios.post(`${endpoint}/delete/ticket`, { idcode })
                response.data.data && swalert(response.data.data, 'success', 2000);
                return setUpdate(true);
            } catch (error) {
                error.response && swalert(error.response.data, 'error', 2000)
                return false;
            }
        } 
        return false;
    }

    const deleteEvent = async (event) => {
        const res = await Swal.fire({
            icon                : "info",
            text                : "apakah kamu yakin ingin menghapus?",
            iconColor           : "var(--yellow)",
            color               : 'var(--yellow)',
            background          : 'var(--primary)',
            customClass         : { container: "alertext" },
            allowOutsideClick   : false,
            showDenyButton      : true,
            confirmButtonText   : "Batalkan",
            confirmButtonColor  : "var(--prime)",
            denyButtonText      : "Hapus",
        })
        if (res.isDenied) {
            try {
                const response = await axios.post(`${endpoint}/delete/event`, { event })
                const res = await swalert(response.data.data, 'success', 2000);
                res.isDismissed && navigate('/events')
            } catch (error) {
                error.response && swalert(error.response.data, 'error', 2000)
                return false;
            }
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => { 
       update && getDataTicket(); 
       return setUpdate(false)
    }, [update])
    useEffect(() => { setTotalPages(Math.ceil(data.length / itemsPerPage)); }, [data, itemsPerPage]);


    if (loading) return <div style={{width: '100%', height: '100vh'}}><Loader/></div>

    return (
        <div className='global-page'>
            <Back/>
            <div style={{width: '90%', margin: 'auto', marginTop: '15px', fontFamily: 'var(--poppins)', fontSize: '0.9rem', color: 'var(--primary)', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {/* <div className='ititle'>{state.event}</div> */}
                <div style={{fontFamily: 'var(--quicksand)', color: 'var(--primary)'}}>{moment(state.start_date).format('DD MMM YYYY')} - {moment(state.end_date).format('DD MMM YYYY')}</div>
                <div style={{fontFamily: 'var(--quicksand)', fontWeight: 'bold'}}>Total : {data.length} ticket</div>
            </div>
            <div style={{width: '90%', margin: 'auto', display: 'flex', gap: '10px', alignItems: 'center'}}>
                {/* <div className='input-search-ticket' style={{width: 'max-content', margin: '10px auto', marginTop: '25px', padding: '10px 0px', boxSizing: 'border-box', fontSize: '0.9rem', borderRadius: '30px'}}>
                    <div className='fa-solid fa-circle-plus fa-2xl' onClick={() => navigate('/create/ticket', { state: { event: state.event } })} style={{color: 'var(--prime'}}></div>
                </div> */}
                <input 
                    className='input-search-ticket'
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Cari data..."
                    style={{ width: '100%', margin: '10px auto', marginTop: '25px', border: '1px solid var(--primary)', padding: '10px', boxSizing: 'border-box', fontSize: '0.9rem', borderRadius: '30px' }}
                />
            </div>
            <div style={{ width: '90%', overflow: 'scroll', margin: 'auto', fontFamily: 'var(--quicksand)' }}>
                <table>
                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>No</th>
                            <th style={{ padding: '10px' }}>Nama</th>
                            <th style={{ padding: '10px' }}>Code</th>
                            <th style={{ padding: '10px' }}>Event</th>
                            <th style={{ padding: '10px' }}>Tanggal Dibuat</th>
                            <th style={{ padding: '10px' }}>QR Format</th>
                            <th style={{ padding: '10px' }}>File</th>
                            <th style={{ padding: '10px' }}>Hapus</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {currentItems.length != 0 ? currentItems.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px' }}>{indexOfFirstItem + index + 1}</td>
                                <td style={{ padding: '10px' }}>{item.name}</td>
                                <td style={{ padding: '10px' }}>{item.idcode}</td>
                                <td style={{ padding: '10px' }}>{item.event}</td>
                                <td style={{ padding: '10px' }}>{item.date}</td>
                                <td style={{ padding: '10px' }}>{item.qrcode.substring(5, 21)}</td>
                                <td style={{ padding: '10px' }}><div className='fa-solid fa-download fa-md' onClick={() => donwloadFile(item.file)}></div></td>
                                <td style={{ padding: '10px' }}><div className='fa-solid fa-trash fa-md' onClick={() => deleteTicket(item.idcode)} style={{ color: '#ea5c5c' }}></div></td>
                            </tr>
                        )) :
                            <tr>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>belum ada ticket dibuat</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', width: '90%', margin: '20px auto' }}>
                <div style={{ margin: '0 10px', fontFamily: 'var(--quicksand)', fontSize: '0.9rem' }}>{currentPage} of {totalPages}</div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages || !data.length}>Next</button>
            </div>
            <div onClick={() => navigate('/create/ticket', { state: { event: state.event } })} className='button' style={{width: '90%', margin: 'auto', gap: '10px', marginTop: '50px'}}>
                <div className='fa-solid fa-circle-plus fa-md'></div>
                Buat ticket
            </div>
            <div onClick={() => deleteEvent(state.event)} className='button' style={{width: '90%', margin: 'auto', gap: '10px', marginTop: '10px', backgroundColor: 'unset', border: '1px solid #ccc', color: 'var(--primary)'}}>
                <div className='fa-solid fa-trash fa-md'></div>
                Hapus event
            </div>
        </div>
    )
}

export default EventDetail