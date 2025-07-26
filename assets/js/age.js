$(document).ready(function() {
    getAge();
});

function getAge() {
    // Age calculation after the content is loaded
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const birthday = new Date(2001, 7, 28); // August 28, 2001
    $('#age').text(calculateAge(birthday));
}