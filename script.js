document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeForms();
    initializeServiceTypeToggle();
    initializeDateValidation();
    initializeScrollAnimations(); 
});

function initializeCarousel() {
    const carousel = document.getElementById('productCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });

        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });

        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }
}

function initializeForms() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    const schedulingForm = document.getElementById('schedulingForm');
    if (schedulingForm) {
        schedulingForm.addEventListener('submit', handleSchedulingSubmit);
    }
}

function handleRegistrationSubmit(event) {
    event.preventDefault(); 

    const form = event.target;

    form.classList.add('was-validated');
    
    if (form.checkValidity()) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Cadastrando...';

        setTimeout(() => {
            const customerData = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                phone: form.phone.value,
                address: form.address.value,
                city: form.city.value,
                state: form.state.value, 
                zip: form.zip.value 
            };

            localStorage.setItem('customerData', JSON.stringify(customerData));

            showSuccessModal('Cadastro realizado com sucesso! Você já pode agendar seus serviços conosco.');
            form.reset(); 
            form.classList.remove('was-validated'); 
            
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    } else {
        
        event.stopPropagation();
    }
}

function handleSchedulingSubmit(event) {
    event.preventDefault(); 

    const form = event.target;

    form.classList.add('was-validated');

    if (form.checkValidity()) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Agendando...';

        setTimeout(() => {
            const serviceData = {
                customerEmail: form.customerEmail.value,
                serviceType: form.serviceType.value,
                serviceDate: form.serviceDate.value,
                serviceTime: form.serviceTime.value,
                deliveryAddress: form.querySelector('#deliveryAddressText')?.value || '', 
                specialInstructions: form.specialInstructions.value,
                orderItems: form.orderItems.value,
                timestamp: new Date().toISOString()
            };

            const existingServices = JSON.parse(localStorage.getItem('scheduledServices') || '[]');
            existingServices.push(serviceData);
            localStorage.setItem('scheduledServices', JSON.stringify(existingServices));

            const serviceTypeText = serviceData.serviceType === 'delivery' ? 'entrega' : 'retirada';
            const message = `Seu agendamento de ${serviceTypeText} foi marcado para ${formatDate(serviceData.serviceDate)} às ${formatTime(serviceData.serviceTime)}. Entraremos em contato em breve para confirmar seu pedido.`;
            
            showSuccessModal(message);
            form.reset(); 
            form.classList.remove('was-validated'); 
            
            const deliveryAddressDiv = document.getElementById('deliveryAddress');
            if (deliveryAddressDiv) {
                deliveryAddressDiv.style.display = 'none';
            }

            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    } else {
        event.stopPropagation();
    }
}

function initializeServiceTypeToggle() {
    const deliveryRadio = document.getElementById('delivery');
    const pickupRadio = document.getElementById('pickup');
    const deliveryAddressDiv = document.getElementById('deliveryAddress');
    const deliveryAddressTextarea = document.getElementById('deliveryAddressText');

    if (deliveryRadio && pickupRadio && deliveryAddressDiv && deliveryAddressTextarea) {
        deliveryRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryAddressDiv.style.display = 'block';
                deliveryAddressTextarea.setAttribute('required', 'required');
            }
        });

        pickupRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryAddressDiv.style.display = 'none';
                deliveryAddressTextarea.removeAttribute('required'); 
                deliveryAddressTextarea.value = ''; 
                deliveryAddressTextarea.setCustomValidity('');
                deliveryAddressTextarea.classList.remove('is-invalid', 'is-valid');
            }
        });

        if (deliveryRadio.checked) {
            deliveryAddressDiv.style.display = 'block';
            deliveryAddressTextarea.setAttribute('required', 'required');
        } else {
            deliveryAddressDiv.style.display = 'none';
            deliveryAddressTextarea.removeAttribute('required');
        }
    }
}

function initializeDateValidation() {
    const serviceDateInput = document.getElementById('serviceDate');
    if (serviceDateInput) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        serviceDateInput.setAttribute('min', today.toISOString().split('T')[0]);

        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30); 
        serviceDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

        serviceDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            selectedDate.setHours(0, 0, 0, 0); 

            this.setCustomValidity(''); 

            if (selectedDate < today) {
                this.setCustomValidity('Por favor, selecione uma data futura.');
            } else if (selectedDate.getDay() === 0) { 
                this.setCustomValidity('Não abrimos aos domingos. Por favor, selecione outra data.');
            }
            this.reportValidity(); 
        });
    }
}


function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = message;
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00'); 
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const timeSlots = {
        '09:00': '09:00 - 11:00',
        '11:00': '11:00 - 13:00',
        '13:00': '13:00 - 15:00',
        '15:00': '15:00 - 17:00',
        '17:00': '17:00 - 19:00'
    };
    return timeSlots[timeString] || timeString; 

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card, .category-section, .hero-section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

document.addEventListener('click', function(event) {
    if (event.target.textContent === 'Add to Cart') {
        event.preventDefault();
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Adicionado!'; 
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-primary');
        }, 2000);
    }
});

document.addEventListener('input', function(event) {
    if (event.target.type === 'tel' && event.target.id === 'phone') { 
        let value = event.target.value.replace(/\D/g, ''); 
        let formattedValue = '';

        if (value.length > 0) {
            formattedValue = `(${value.substring(0, 2)}`; 
            if (value.length > 2) {
                formattedValue += `) ${value.substring(2, 7)}`; 
                if (value.length > 7) {
                    formattedValue += `-${value.substring(7, 11)}`; 
                }
            }
        }
        event.target.value = formattedValue;
    } else if (event.target.id === 'zip') { 
        let value = event.target.value.replace(/\D/g, ''); 
        if (value.length > 5) {
            value = value.substring(0,5) + '-' + value.substring(5,8); 
        }
        event.target.value = value;
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
