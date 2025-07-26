$(document).ready(function() {
    mainSection();
});

function mainSection() {
    $.get('includes/hero.html', function(data) {
        $('#hero-section').append(data);

        // Reinitialize AOS (animations)
        if (typeof AOS !== 'undefined') {
            AOS.init();
        }
        // Reinitialize Typed.js
        if ($(".typed").length && typeof Typed !== 'undefined') {
            let typedStrings = $(".typed").data("typed-items");
            typedStrings = typedStrings.split(",");
            new Typed(".typed", {
                strings: typedStrings,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        }
    });
    
    $.get('includes/about.html', function(data) {
        $('#about-section').append(data);
    });

    $.get('includes/skills.html', function(data) {
        $('#skills-section').append(data);
    });

    $.get('includes/interests.html', function(data) {
        $('#interest-section').append(data);
    });

    $.get('includes/resume.html', function(data) {
        $('#resume-section').append(data);
    });
    
    $.get('includes/footer.html', function(data) {
        $('#footer-section').append(data);
    });

    $.get('includes/projects.html', function(data) {
        $('#project-section').append(data);
    });
}