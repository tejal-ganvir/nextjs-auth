import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const toaster = (term, msg) => {
    if(term){
        toast.success('🦄 '+msg, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }else{
        toast.error('🚀 '+msg, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export default toaster;