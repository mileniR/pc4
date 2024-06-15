new Vue({
    el: '#app',
    data: {
        titulo: 'Entrenadores Pokémon',
        entrenadores: [],
        entrenadoresSeleccionados: [],
        mensajeCombate: ''
    },
    mounted() {
        fetch('app/json/entrenadores.json')
            .then(response => response.json())
            .then(data => {
                this.entrenadores = data;
                this.entrenadores.forEach(entrenador => {
                    this.$set(entrenador, 'mostrarPokemones', false);
                });
            })
            .catch(error => console.error('Error al cargar los datos de los entrenadores:', error));
    },
    methods: {
        verPokemon(entrenador) {
            entrenador.mostrarPokemones = !entrenador.mostrarPokemones;
        },
        seleccionarEntrenador(entrenador) {
            if (this.entrenadoresSeleccionados.includes(entrenador)) {
                this.entrenadoresSeleccionados = this.entrenadoresSeleccionados.filter(e => e !== entrenador);
            } else if (this.entrenadoresSeleccionados.length < 2) {
                this.entrenadoresSeleccionados.push(entrenador);
            }
        },
        nuevoCombate() {
            if (this.entrenadoresSeleccionados.length === 2) {
                this.mensajeCombate = `Se realizará un nuevo combate entre ${this.entrenadoresSeleccionados[0].nombre} vs ${this.entrenadoresSeleccionados[1].nombre}`;
                alert(this.mensajeCombate);
                // Resetear selección después de mostrar el mensaje
                this.entrenadoresSeleccionados = [];
            }
        }
    }
});
