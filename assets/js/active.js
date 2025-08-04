$(document).ready(function () {
    $(window).on('load scroll', highlightNavOnScroll);
    highlightNavOnScroll();
    getAge();
    $('#copyright-year').text(new Date().getFullYear());
    $('#copyright-year2').text(new Date().getFullYear());
    // sectionActive();

    function isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    const messengerLink = $('.floating-messenger-btn');

    if (isMobile()) {
        messengerLink.removeAttr('target');
        messengerLink.off('click').on('click', function (e) {
            e.preventDefault();
            // Redirect in the same tab - triggers Messenger app or web
            window.location.href = messengerLink.attr('href');
        });
    } else {
        messengerLink.attr('target', '_blank');
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        $('body').addClass('light-mode');
        $('#light-mode-switch').prop('checked', true);
    }

    // Handle theme toggle
    $('#light-mode-switch').on('change', lightMode);
});

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

// function sectionActive() {
//     $('#interests').append(`
//         <div class="container section-title" data-aos="fade-up">
//             <h2>Skills</h2>
//         <div>
//             <span>I'm</span> <span class="description-title">interested in</span></div>
//         </div>
//         <div class="container">
//             <div class="row gy-3">
//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="100">
//                     <div class="features-item">
//                         <i class="devicon-javascript-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Javascript</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="200">
//                     <div class="features-item">
//                         <i class="devicon-php-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">PHP</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="700">
//                     <div class="features-item">
//                         <i class="devicon-flutter-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Flutter</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="400">
//                     <div class="features-item">
//                         <i class="devicon-mysql-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">MySQL</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="500">
//                     <div class="features-item">
//                         <i class="devicon-html5-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">HTML</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="600">
//                     <div class="features-item">
//                         <i class="devicon-npm-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">NPM</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="300">
//                     <div class="features-item">
//                         <i class="devicon-nodejs-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Node JS</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="800">
//                     <div class="features-item">
//                         <i class="devicon-laravel-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Laravel</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="900">
//                     <div class="features-item">
//                         <i class="devicon-css3-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">CSS</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1000">
//                     <div class="features-item">
//                         <i class="devicon-bootstrap-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Bootstrap</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1100">
//                     <div class="features-item">
//                         <i class="devicon-tailwindcss-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Tailwind</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1200">
//                     <div class="features-item">
//                         <i class="devicon-firebase-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Firebase</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1200">
//                     <div class="features-item">
//                         <i class="devicon-python-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Python</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1200">
//                     <div class="features-item">
//                         <i class="devicon-c-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">C Language</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1200">
//                     <div class="features-item">
//                         <i class="devicon-visualbasic-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Visual Basic</a></h3>
//                     </div>
//                 </div>

//                 <div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="1200">
//                     <div class="features-item">
//                         <i class="devicon-git-plain colored" style="font-size: 40px;"></i>
//                         <h3><a class="stretched-link">Git</a></h3>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `);

//     $('#resume').append(`
//         <div class="container section-title" data-aos="fade-up">
//             <h2>Details</h2>
//         <div>
//             <span>My</span> <span class="description-title">Resume</span></div>
//         </div>
//         <div class="container">
//             <div class="row">
//                 <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
//                     <h3 class="resume-title">Summary</h3>
//                     <div class="resume-item pb-0">
//                         <h4>Joshua Tandoy</h4>
//                         <p align="justify">
//                             <em>
//                             <!-- Systems Analyst and Full-Stack Software Engineer with a proven track record of designing and developing robust, 
//                             scalable web and mobile applications. Experienced in both frontend and backend technologies, 
//                             enabling end-to-end development of modern applications that are both efficient and user-friendly. 
//                             Passionate about optimizing the user experience and ensuring clean, 
//                             maintainable code for long-term scalability and ease of collaboration. -->
//                             Systems Analyst and Full-Stack Software Engineer with a strong background in building reliable, scalable web and mobile applications. 
//                             I have worked across the full stack—frontend to backend—giving me the flexibility to take projects from concept to launch. 
//                             What really drives me is creating smooth, intuitive user experiences and writing clean, maintainable code that teams can build on for the long run. 
//                             I enjoy turning business ideas into practical solutions, and I am always exploring new tools and technologies to stay sharp in a constantly changing industry. 
//                             I care deeply about performance, accessibility, and thoughtful design, and I love crafting products that not only work well but feel great to use. 
//                             Above all, I am passionate about taking on projects that challenge me and help expand my knowledge and experience.
//                             </em>
//                         </p>
//                         <p><i class="fas fa-map-marker-alt"></i>&nbsp; Maoyod, Legazpi City, Albay</p>
//                         <p><i class="fas fa-phone"></i>&nbsp; +63 9369258066</p>
//                         <p><i class="fas fa-envelope"></i>&nbsp; joshuafeliciano.tandoy@gmail.com</p>
//                     </div>

//                     <h3 class="resume-title">Education</h3>
//                     <div class="resume-item">
//                         <h4>Bachelor of Science in Information Technology</h4>
//                         <h5>2020 - 2024</h5>
//                         <p><b>Bicol University</b> | Legazpi City, Albay</p>
//                         <ul>
//                             <li>Academic Scholar Award (2023 - 2024)</li>
//                             <li>Academic Scholar Award (2021 - 2022)</li>
//                         </ul>
//                     </div>

//                     <div class="resume-item">
//                         <h4>Senior Highschool</h4>
//                         <h5>2018 - 2020</h5>
//                         <p><b>Bicol College</b> | Daraga, Albay</p>
//                         <ul>
//                             <li>Academic Achievement Award (2019 - 2020)</li>
//                         </ul>
//                     </div>

//                     <div class="resume-item">
//                         <h4>Junior Highschool</h4>
//                         <h5>2014 - 2018</h5>
//                         <p><b>Ago Medical and Educational Center</b> | Legazpi City, Albay</p>
//                     </div>
                    
//                     <div class="resume-item">
//                         <h4>Elementary</h4>
//                         <h5>2008 - 2014</h5>
//                         <p><b>Albay Central School</b> | Legazpi City, Albay</p>
//                         <ul>
//                             <li>Academic Achievement Award (2013 - 2014)</li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
//                     <h3 class="resume-title">Work Experience</h3>
//                     <div class="resume-item">
//                         <h4>System Analyst | Food-TrIPID</h4>
//                         <h5>2023 - 2024</h5>
//                         <p>Legazpi City, Albay</p>
//                         <ul>
//                             <li>Designed and mapped out life-cycle data flows and processes.</li>
//                             <li>Managed the Database and improved the security.</li>
//                             <li>Analyzed the dataflow of the system.</li>
//                         </ul> 
//                     </div>

//                     <div class="resume-item">
//                         <h4>Backend Developer | Bicol University Library Intern</h4>
//                         <h5>2024</h5>
//                         <p>Daraga, Albay</p>
//                         <ul>
//                             <li>Developed web designs using Tailwind/CSS and Javascript.</li>
//                             <li>Utilized Laravel as main framework.</li>
//                             <li>Used MySQL for database management.</li>
//                         </ul>
//                     </div>

//                     <div class="resume-item">
//                         <h4>IT Programmer | Daily Overland Freight Forwarder</h4>
//                         <h5>2024 - Present</h5>
//                         <p>Daraga, Albay</p>
//                         <ul>
//                             <li>Developed UI/UX for mobile app using Flutter.</li>
//                             <li>Integrated API for mobile application.</li>
//                             <li>Developed web designs using Bootstrap/CSS and Javascript.</li>
//                             <li>Utilizes Laravel/PHP as tool for backend in creating projects.</li>
//                             <li>Used MySQL for database management and data storage solutions.</li>
//                         </ul>
//                     </div>

//                     <h3 class="resume-title">Certifications</h3>
//                     <div class="resume-item">
//                         <h4>Webinars</h4>
//                         <h5>2022</h5>
//                         <ul>
//                             <li><b>NFT's and Augmented Reality Webinar</b> (2022)</li>
//                             <li><b>Mechatronics Webinar 2022: “A Glimpse of Future: Mechatronics History and Development”</b> (2022)</li>
//                             <li><b>Cyber Security & Fuzzy Logic Webinar 2022: Transforming Action into Proactive Solution</b> (2022)</li>
//                             <li><b>IoT and Blockchain Technology Webinar Series: A Guide to Emerging Technology</b> (2022)</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `)
// }