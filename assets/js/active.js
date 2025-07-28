$(document).ready(function () {
    $(window).on('load scroll', highlightNavOnScroll);
    highlightNavOnScroll();
    getAge();
    $('#copyright-year').text(new Date().getFullYear());
    $('#copyright-year2').text(new Date().getFullYear());
});

function highlightNavOnScroll() {
    const scrollPosition = $(window).scrollTop();
    const sections = $("section[id]");
    const navLinks = $("#navmenu a");

    let found = false;

    sections.each(function () {
        const section = $(this);
        const sectionTop = section.offset().top - 120; // adjust if needed
        const sectionBottom = sectionTop + section.outerHeight();
        const sectionId = section.attr("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.removeClass("active");
            $(`#navmenu a[href="#${sectionId}"]`).addClass("active");
            found = true;
            return false; // break out of .each loop
        }
    });

    // If no section matches (e.g., top of the page), activate "Home"
    if (!found) {
        navLinks.removeClass("active");
        $('#navmenu a[href="#"]').addClass("active");
    }
}

function getAge() {
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const birthday = new Date(2001, 7, 28);
    $('#age').text(calculateAge(birthday));
}