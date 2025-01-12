/* static/js/main.js */
function showDeleteModal(resumeId) {
    const modal = document.getElementById('deleteModal');
    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');

    // Show modal
    modal.classList.remove('hidden');

    // Attach event listener to confirm button
    confirmButton.onclick = function () {
        fetch(`/delete-resume/${resumeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrf_token') // Ensure CSRF function is implemented
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.error || 'Error deleting resume');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the resume.');
        });

        // Hide modal after action
        modal.classList.add('hidden');
    };

    // Attach event listener to cancel button
    cancelButton.onclick = function () {
        modal.classList.add('hidden');
    };
}




// Get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// File upload preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('resume');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0].name;
            const fileLabel = document.querySelector('.custom-file-label');
            if (fileLabel) {
                fileLabel.textContent = fileName;
            }
        });
    }
});