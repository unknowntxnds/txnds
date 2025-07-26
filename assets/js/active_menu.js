$(document).ready(function () {
    $(window).on('load scroll', function () {
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
            return false;
        }
        });

        // If no section matches (like top of the page), activate "Home"
        if (!found) {
        navLinks.removeClass("active");
        $('#navmenu a[href="#"]').addClass("active");
        }
    });
});
