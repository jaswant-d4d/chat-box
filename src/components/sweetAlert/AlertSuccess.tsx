import Swal from "sweetalert2";


const AlertSuccess = (message: string) => {
    if (message) {
        Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#81c14b",
        });
    } else {
        Swal.fire({
            title: "Success!",
            text: "Something went wrong!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#81c14b",
        });
    }

}
export default AlertSuccess;