$(document).ready(function () {
    $(window).on('load scroll', highlightNavOnScroll);
    isMobile();
    openMessenger();
    savedTheme();
    highlightNavOnScroll();
    getAge();
    $('#copyright-year').text(new Date().getFullYear());
    $('#copyright-year2').text(new Date().getFullYear());
    // sectionActive();
});

function downloadResumePDF() {
    const $progressContainer = $('#progressContainer');
    const $progressBar = $('#progressBar');
    const $progressText = $('#progressText');

    $progressContainer.show();
    $progressBar.css('width', '0%');
    $progressText.text('0%');

    let progress = 0;
    const interval = setInterval(() => {
        progress = Math.min(progress + Math.floor(Math.random() * 5) + 1, 90);
        $progressBar.css('width', progress + '%');
        $progressText.text(progress + '%');
    }, 200);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'letter');

    const $clone = $('#resume').clone();
    $clone.find('#resume-exclude').remove();
    $clone.find('.title-left').css('margin-top', '25%');
    $clone.find('.title-right').css('margin-top', '25%');

    $clone.css({
        'background-color': '#fff',
        'color': '#000',
        'position': 'absolute',
        'left': '-9999px',
        'width': $('#resume').width() + 'px',
        'padding': '20px',
        'box-sizing': 'border-box'
    });

    $clone.find('*').css('color', '#000');
    $('body').append($clone);

    html2canvas($clone[0], { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        clearInterval(interval);
        $progressBar.css('width', '100%');
        $progressText.text('100%');

        setTimeout(() => {
            doc.save('Tandoy Resume.pdf');
            $clone.remove();
            $progressContainer.hide();
            $progressBar.css('width', '0%');
            $progressText.text('0%');
        }, 300);
    }).catch(() => {
        clearInterval(interval);
        $progressContainer.hide();
        $progressBar.css('width', '0%');
        $progressText.text('0%');
        alert('Failed to generate PDF. Please try again.');
    });
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function openMessenger(e) {
    const messengerLink = $('#messenger_chat');

    if (isMobile()) {
        messengerLink.removeAttr('target');
        e.preventDefault();
        window.location.href = messengerLink.attr('href');
    } else {
        messengerLink.attr('target', '_blank');
    }
}

function lightMode() {
    const isChecked = $('#light-mode-switch').is(':checked');

    if (isChecked) {
        $('body').addClass('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        $('body').removeClass('light-mode');
        localStorage.setItem('theme', 'dark');
    }
}

function savedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        $('body').addClass('light-mode');
        $('#light-mode-switch').prop('checked', true);
    }
}

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