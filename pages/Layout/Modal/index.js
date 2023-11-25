/**
 * A function who controls a modal
 * @param {string} idOpenModalBtn - Says the id of the button to open the modal
 */
function activeModal(idOpenModalBtn) {
    document.addEventListener('DOMContentLoaded', () => {
        const openModalBtn = document.getElementById(idOpenModalBtn);
        const closeModalBtn = document.getElementsByClassName('close')[0];
        const modal = document.getElementById('modal');

        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block'
        })

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none'
        })

        window.addEventListener('click', event => {
            if (event.target === modal) {
                modal.style.display = 'none'
            }
        })
    })
}