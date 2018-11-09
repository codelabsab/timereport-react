import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastConfig = {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
};

const notify = (errorMessage, successMessage) => {
    if(errorMessage)
        toast.error('🚨 ' + errorMessage, toastConfig);
    else
        toast.success('👌' + successMessage, toastConfig);
};

export class NotifyContainer extends ToastContainer { };
export const NotifyService = { notify: notify };
