import Swal, { SweetAlertResult } from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function SuccessToast(
  message: string,
): Promise<SweetAlertResult<unknown>> {
  return Toast.fire({
    icon: "success",
    title: message,
  });
}

export function DeleteNoteDialog(): Promise<SweetAlertResult<unknown>> {
  return Swal.fire({
    title: "Kamu ingin menghapus catatan ini?",
    text: "Kamu tidak dapat mengembalikan ini!",
    icon: "warning",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });
}
