import Swal from "sweetalert2";

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

const samplePDF = async () => {
    const res = await Swal.fire({
        imageUrl : '/img/contohpdf.jpg',
        showCloseButton: true,
        confirmButtonText: 'Download',
        imageWidth: "310px",
        imageHeight: "397px"
    })
    if (res.isConfirmed) {
        const a = document.createElement('a');
        a.href = '/img/contohpdf.jpg'; 
        a.download = 'contohpdf.jpg'; 
        document.body.appendChild(a); 
        a.click();
        document.body.removeChild(a);
    } 
    else return false;
}

export default samplePDF;