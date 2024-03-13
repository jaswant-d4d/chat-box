import Swal from "sweetalert2";


const AlertError = (message: string) => {
    if (message) {
        Swal.fire({
            title: "Failed!",
            text: message,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#81c14b",
        });
    } else {
        Swal.fire({
            title: "Failed!",
            text: "Something went wrong!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#81c14b",
        });
    }

}
export default AlertError;