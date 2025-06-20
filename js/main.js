// === Плавный скролл и подсветка активного пункта меню ===

const links = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('section[id], .panel[data-title]');

// При клике по ссылке — плавно скроллим к нужному блоку
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth'
      });

      // Убираем active у всех и добавляем текущей
      links.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// === Отслеживание текущего раздела при прокрутке ===

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('data-title') || section.id;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Логика для скрытия .tab при прокрутке вниз
  const tab = document.querySelector('.tab');
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    tab.style.top = '-40px';
  } else {
    tab.style.top = '0';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});