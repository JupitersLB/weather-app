import Swal from 'sweetalert2'

const sweetError = err => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: err,
    customClass: {
      htmlContainer: 'text-green-800',
      title: 'text-green-800',
      confirmButton: 'bg-transparent hover:bg-green-600 text-green-800 font-semibold hover:text-gray py-2 px-4 w-3/12 border-2 border-green-600 hover:border-transparent rounded'
    },
    background: 'rgba(166,181,251, 0.8)',
    buttonsStyling: false
  })
}

export default sweetError;
