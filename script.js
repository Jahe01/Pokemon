// URLs de las imágenes de fondo
const backgroundImages = [
    'https://i.pinimg.com/564x/0e/3b/29/0e3b294beb09239a0625d82a2e2c0561.jpg',
    'https://i.pinimg.com/736x/bd/3c/0d/bd3c0d963aa1ed663a0b4e2141bcd938.jpg',
    'https://i.pinimg.com/564x/56/84/72/5684727d087ee4f173c2e989aa0903c0.jpg'
];

// Índice de la imagen actual
let currentImageIndex = 0;

// Función para cambiar la imagen de fondo
function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
}

// Cambiar la imagen de fondo cada 20 segundos
setInterval(changeBackgroundImage, 20000);

// Configurar la primera imagen de fondo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
});

// Función para actualizar el favicon
function updateFavicon(imageUrl) {
    const favicon = document.getElementById('favicon');
    favicon.href = imageUrl;
}

// Función para crear el gráfico de pastel
function createStatsChart(stats) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(stats),
            datasets: [{
                label: 'Estadísticas',
                data: Object.values(stats),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Función para obtener la información de una habilidad desde la API
async function fetchAbilityInfo(abilityUrl) {
    try {
        const response = await fetch(abilityUrl);
        const data = await response.json();
        return data.effect_entries.find(entry => entry.language.name === 'en').effect;
    } catch (error) {
        console.error('Error fetching ability data:', error);
        return 'No se pudo obtener la información de la habilidad.';
    }
}

// Función para mostrar la información de la habilidad
async function showAbilityInfo(event, abilityUrl) {
    const abilityInfoContainer = document.getElementById('ability-info');
    const abilityInfo = await fetchAbilityInfo(abilityUrl);
    abilityInfoContainer.innerText = abilityInfo;
    abilityInfoContainer.style.display = 'block';
    abilityInfoContainer.style.left = `${event.pageX}px`;
    abilityInfoContainer.style.top = `${event.pageY}px`;
}

// Función para ocultar la información de la habilidad
function hideAbilityInfo() {
    const abilityInfoContainer = document.getElementById('ability-info');
    abilityInfoContainer.style.display = 'none';
}

// Función para obtener la información de un movimiento desde la API
async function fetchMoveInfo(moveUrl) {
    try {
        const response = await fetch(moveUrl);
        const data = await response.json();
        return data.effect_entries.find(entry => entry.language.name === 'en').short_effect;
    } catch (error) {
        console.error('Error fetching move data:', error);
        return 'No se pudo obtener la información del movimiento.';
    }
}

// Función para mostrar la información del movimiento
async function showMoveInfo(event, moveUrl) {
    const moveInfoContainer = document.getElementById('ability-info');
    const moveInfo = await fetchMoveInfo(moveUrl);
    moveInfoContainer.innerText = moveInfo;
    moveInfoContainer.style.display = 'block';
    moveInfoContainer.style.left = `${event.pageX}px`;
    moveInfoContainer.style.top = `${event.pageY}px`;
}

// Función para ocultar la información del movimiento
function hideMoveInfo() {
    const moveInfoContainer = document.getElementById('ability-info');
    moveInfoContainer.style.display = 'none';
}

// Función para obtener los datos del Pokémon Kakuna
async function fetchPokemonData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/kakuna');
        const data = await response.json();

        // Asignar datos al DOM
        const spriteUrl = data.sprites.front_default;
        document.getElementById('pokemon-sprite').src = spriteUrl;
        document.getElementById('pokemon-name').innerText = `Nombre: ${data.name}`;

        // Descripción
        const description = "Aunque es casi incapaz de moverse, en caso de sentirse amenazado puede envenenar a los enemigos con su aguijón.";
        document.getElementById('pokemon-description').innerText = description;

        // Tipos
        const types = data.types.map(typeInfo => typeInfo.type.name);
        const typesContainer = document.getElementById('pokemon-types');
        typesContainer.innerHTML = '';
        types.forEach(type => {
            const typeBadge = document.createElement('span');
            typeBadge.classList.add('type-badge', type);
            typeBadge.innerText = type.charAt(0).toUpperCase() + type.slice(1);
            typesContainer.appendChild(typeBadge);
        });

        // Debilidades (esto es un ejemplo, normalmente se calcularía según las resistencias y debilidades del tipo)
        const weaknesses = ['fire', 'flying', 'psychic', 'rock'];
        const weaknessesContainer = document.getElementById('pokemon-weaknesses');
        weaknessesContainer.innerHTML = '';
        weaknesses.forEach(weakness => {
            const weaknessBadge = document.createElement('span');
            weaknessBadge.classList.add('weakness-badge', weakness);
            weaknessBadge.innerText = weakness.charAt(0).toUpperCase() + weakness.slice(1);
            weaknessesContainer.appendChild(weaknessBadge);
        });

        // Habilidades
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability);
        const abilitiesContainer = document.getElementById('pokemon-abilities');
        abilitiesContainer.innerHTML = '';
        abilities.forEach(ability => {
            const abilityBadge = document.createElement('span');
            abilityBadge.classList.add('ability-badge');
            abilityBadge.innerText = ability.name.charAt(0).toUpperCase() + ability.name.slice(1);
            abilityBadge.addEventListener('mouseover', (event) => showAbilityInfo(event, ability.url));
            abilityBadge.addEventListener('mouseout', hideAbilityInfo);
            abilitiesContainer.appendChild(abilityBadge);
        });

        // Movimientos
        const moves = data.moves.slice(0, 5).map(moveInfo => moveInfo.move);
        const movesContainer = document.getElementById('pokemon-moves');
        movesContainer.innerHTML = '';
        moves.forEach(move => {
            const moveBadge = document.createElement('span');
            moveBadge.classList.add('move-badge');
            moveBadge.innerText = move.name.charAt(0).toUpperCase() + move.name.slice(1);
            moveBadge.addEventListener('mouseover', (event) => showMoveInfo(event, move.url));
            moveBadge.addEventListener('mouseout', hideMoveInfo);
            movesContainer.appendChild(moveBadge);
        });

        // Estadísticas
        const stats = data.stats.reduce((acc, statInfo) => {
            acc[statInfo.stat.name] = statInfo.base_stat;
            return acc;
        }, {});
        const statsContainer = document.getElementById('pokemon-stats');
        statsContainer.innerHTML = '';
        Object.entries(stats).forEach(([key, value]) => {
            const statBadge = document.createElement('span');
            statBadge.classList.add('stat-badge');
            statBadge.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
            statsContainer.appendChild(statBadge);
        });

        // Crear el gráfico de pastel
        createStatsChart(stats);

        // Actualizar el favicon con la imagen del Pokémon
        updateFavicon(spriteUrl);

        // Animaciones con GSAP
        gsap.from("header h1", { duration: 1, opacity: 0, y: -50 });
        gsap.from(".pokemon-image img", { duration: 1, opacity: 0, x: -50, delay: 0.5 });
        gsap.from(".pokemon-details", { duration: 1, opacity: 0, x: 50, delay: 0.5 });
        gsap.from("#spotify", { duration: 1, opacity: 0, scale: 0.5, delay: 1 });
        gsap.from(".evolution-images img", { duration: 1, opacity: 0, scale: 0, delay: 1.5 });

        // Animación para la Pokébola al pasar el ratón
        const pokeball = document.getElementById('pokeball');
        pokeball.addEventListener('mouseover', () => {
            gsap.to(pokeball, { duration: 1, rotation: 360 });
        });
        pokeball.addEventListener('mouseleave', () => {
            gsap.to(pokeball, { duration: 1, rotation: 0 });
        });

        // Animación para el ícono de Kakuna
        const kakunaIcon = document.getElementById('kakuna-icon');
        gsap.to(kakunaIcon, {
            x: '+=5',
            yoyo: true,
            repeat: -1,
            duration: 0.5,
            ease: 'power1.inOut'
        });

        kakunaIcon.addEventListener('click', () => {
            const message = document.createElement('div');
            message.innerHTML = `N.º 0014`;
            message.style.position = 'fixed';
            message.style.bottom = '80px';
            message.style.right = '20px';
            message.style.padding = '10px';
            message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            message.style.color = 'white';
            message.style.borderRadius = '5px';
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();
            }, 5000);
        });

    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Llamar a la función para obtener los datos cuando se cargue la página
document.addEventListener('DOMContentLoaded', fetchPokemonData);
